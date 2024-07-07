import fs from 'fs';
import path, { extname } from 'path';
import { parse } from 'node-html-parser';
import { exit } from 'process';

const JSX_STRING = /\(\s*(<.*)>\s*\)/sm
const JSX_INTERPOLATION = /\{([^]*)\}/gsm
const QUOTED_STRING = /["|'](.*)["|']/
const ATTRS_STRING = /\w+="[^"]*"|\w+={[^"]*}/gsm

function getAttrs(attrsStr) {
    if (attrsStr.trim().length == 0) return {}
    let objAttrs = {}
    let parts = attrsStr.match(ATTRS_STRING);

    if (parts) {
        parts.forEach(p => {
            const [name, value] = p.split("=")
            objAttrs[name] = (value)
        })
    }
    return objAttrs
}

function removeLastSpecificChar(str, charToRemove) {
    // Trouver la position du dernier caractère spécifique
    let lastIndex = str.lastIndexOf(charToRemove);
    return str.substring(0, lastIndex);
}

function parseText(txt) {
    let interpolations = txt.match(JSX_INTERPOLATION)
    if (!interpolations) {
        let tempTxt = txt.replaceAll("\\\"", "").replace(/[\s\r\n]+/g, '');
        if (tempTxt.endsWith("}") && !tempTxt.startsWith("{")) {
            return removeLastSpecificChar(txt, '}');
        }

        return `"${txt}"`;
    } else {
        txt = replaceInterpolations(txt)
        return txt;
    }
}

// function replacer(k, v) {
//     if (k) {
//         let quoted = QUOTED_STRING.exec(v)
//         if (quoted) {
//             return parseText(quoted[1])
//         }
//         return (v)
//     } else {
//         return v
//     }
// }

function replaceInterpolations(txt) {
    let tempTxt = txt.replaceAll("\\\"", "").replace(/[\s\r\n]+/g, '');

    if (tempTxt.startsWith("{") && !tempTxt.endsWith("}")) {
        return txt.replace("{", "");
    }

    if (tempTxt.startsWith("{") && tempTxt.endsWith("}")) {
        return removeLastSpecificChar(txt.replace("{", ""), '}');
    }

    let interpolationTxt = null, interpolations = null;
    while (interpolations = JSX_INTERPOLATION.exec(txt)) {
        if (interpolations) {
            txt = txt.replace(`{${interpolations[1]}}`, `\${${interpolations[1]}}`);
            interpolationTxt = txt;
        }
    }
    if (interpolationTxt) return "`" + interpolationTxt + "`";

    return txt;

    while (interpolations = JSX_INTERPOLATION.exec(txt)) {
        if (`{${interpolations[1]}}` === txt) {
            if (interpolations[1]) {
                return `\${${interpolations[1]}}`;
            }
            return `{${interpolations[1]}}`;
        }

        txt = txt.replace(`"{${interpolations[1]}}"`, interpolations[1])

    }

    return txt
}



function formatChildren(txt) {
    if (!txt) return "null";
    //if (txt.startsWith('createElement')) return txt;

    return txt;

    txt = txt.replaceAll("\\\"", "");

    let interpolations = JSX_INTERPOLATION.exec(txt);
    if (interpolations) {
        return `${interpolations[1]}`;
    }

    return txt;
}



function initialIsCapital(word) {
    return word[0] !== word[0].toLowerCase();
}

function formatAttributes(opts) {
    let finalTxt = "{", isFirstAttr = true;
    for (const [key, value] of Object.entries(opts)) {
        if (!isFirstAttr) {
            finalTxt += `,`;
        }
        isFirstAttr = false;

        finalTxt += ` "${key}":`;

        let interpolations = JSX_INTERPOLATION.exec(value);
        if (interpolations) {
            finalTxt += `${interpolations[1]}`;
            continue;
        }

        finalTxt += `${value} `;
    }

    return (finalTxt + "}");
    //return replaceInterpolations(txt, true, false);
}

function translate(root) {
    if (Array.isArray(root) && root.length == 0) return
    let children = []
    if (root.childNodes.length > 0) {

        let childTxt = root.innerHTML;
        let tempChildTxt = childTxt.replace(/[\s\r\n]+/g, '');

        children = root.childNodes.map(child => translate(child)).filter(c => c != null)
        if (tempChildTxt.startsWith("{") && tempChildTxt.endsWith("}")) {
            let finalChildren = "";
            for (let i = 0; i < children.length; i++) {
                finalChildren += formatChildren(children[i]);
            }
            children = [finalChildren];
            // childTxt = childTxt.replace("{", "");
            // childTxt = removeLastSpecificChar(childTxt, '}');
            // children = [childTxt];
        } else {
            for (let i = 0; i < children.length; i++) {
                children[i] = formatChildren(children[i]);
            }
        }

    }

    if (root.nodeType == 3) { //Textnodes
        if (root._rawText.trim() === "") return null
        return parseText(root._rawText)
    }

    let tagName = root.rawTagName

    let opts = getAttrs(root.rawAttrs)
    return `createElement(${initialIsCapital(tagName) ? tagName : `"${tagName}"`}, ${formatAttributes(opts)}${children.length !== 0 ? `, ${children}` : ''})`

}

async function parseJSXFile(fname, outputName = null) {
    let content = await fs.promises.readFile(fname);
    let str = content.toString();

    // Réinitialiser la position de l'expression régulière
    JSX_STRING.lastIndex = 0;
    let matches = JSX_STRING.exec(str);
    if (matches) {
        let HTML = matches[1] + ">";
        HTML = HTML.replace(/[\n\r]+/g, '');

        const root = parse(HTML);
        let translated = translate(root.firstChild);
        str = str.replace(matches[1] + ">", translated).replaceAll("createElement", "Blink.createElement");
        str = str.replaceAll('.jsx', '.js');
    }

    const outputFileName = outputName ? outputName : fname.replace('.jsx', '.js');
    const outputDir = path.dirname(outputFileName);

    // Créer les répertoires intermédiaires si nécessaire
    await fs.promises.mkdir(outputDir, { recursive: true });

    // Écrire le fichier de sortie
    await fs.promises.writeFile(outputFileName, str);
}


/**
 * Fonction récursive pour lister les fichiers et dossiers
 * @param {string} dir - Le répertoire à lister
 * @param {array} fileList - La liste accumulée des fichiers et dossiers
 * @returns {array} - La liste des fichiers et dossiers
 */
function listFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        //let ext = path.extname(file);
        //if (!['js', 'jsx'].includes(ext)) return;

        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            fileList = listFiles(filePath, fileList); // Récursion pour les sous-dossiers
        } else {
            fileList.push({
                path: filePath,
                extname: path.extname(file)
            });
        }
    });

    return fileList;
}



(() => {
    // let filePath = "src/app/pages/PageHome.jsx";
    // parseJSXFile(filePath, filePath.replace("src", "www").replace('jsx', 'js'));
    const input = "src";
    const output = "www";

    try {
        const files = listFiles(input);
        files.forEach(async function (file) {
            let fileInputPath = file.path;
            let fileOutputPath = fileInputPath.replace(input, output);

            if (file.extname === ".jsx") {
                parseJSXFile(fileInputPath, fileOutputPath.replace('jsx', 'js'));
            } else {
                let content = await fs.promises.readFile(fileInputPath);
                const outputDir = path.dirname(fileOutputPath);
                await fs.promises.mkdir(outputDir, { recursive: true });
                await fs.promises.writeFile(fileOutputPath, content);
            }

        });
    } catch (err) {
        console.error('Erreur lors de la lecture du dossier ou du traitement des fichiers:', err);
    }
})()
