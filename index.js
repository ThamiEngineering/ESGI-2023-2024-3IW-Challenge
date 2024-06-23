import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'node-html-parser';

const JSX_STRING = /\(\s*(<.*)>\s*\)/gs
const JSX_INTERPOLATION = /\{([^"]*)\}/gs
const QUOTED_STRING = /["|'](.*)["|']/
const ATTRS_STRING = /\w+="[^"]*"|\w+={[^"]*}/g

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

function parseText(txt) {

    let interpolations = txt.match(JSX_INTERPOLATION)
    if (!interpolations) {
        return `${txt}`;
    } else {
        txt = replaceInterpolations(txt)
        return txt;
    }
}

function replacer(k, v) {
    if (k) {
        let quoted = QUOTED_STRING.exec(v)
        if (quoted) {
            return parseText(quoted[1])
        }
        return (v)
    } else {
        return v
    }
}

function replaceInterpolations(txt, isOnJSON = false, surrounded = true) {
    let interpolations = null;
    txt = txt.replaceAll("\\\"", "");

    while (interpolations = JSX_INTERPOLATION.exec(txt)) {

        if (`{${interpolations[1]}}` === txt.replace(/[\s\uFEFF\xA0]+/g, '')) {
            return `{${interpolations[1]}}`;
        }

        if (isOnJSON) {
            txt = txt.replace(`"{${interpolations[1]}}"`, interpolations[1])
        } else {
            txt = txt.replace(`{${interpolations[1]}}`, `"+ ${interpolations[1]} +"`)
        }

    }

    if (surrounded) {
        return `"${txt}"`
    }
    return txt
}

function initialIsCapital(word) {
    return word[0] !== word[0].toLowerCase();
}

function formatAttributes(opts) {
    return replaceInterpolations(JSON.stringify(opts, replacer), true, false);
}

function translate(root) {
    if (Array.isArray(root) && root.length == 0) return
    let children = []
    if (root.childNodes.length > 0) {
        children = root.childNodes.map(child => translate(child)).filter(c => c != null)
        for (let i = 0; i < children.length; i++) {
            if (!children[i].startsWith('createElement')) {
                if (!(children[i].startsWith("{") && children[i].endsWith("}"))) {
                    children[i] = `"${children[i]}"`;
                } else {
                    children[i] = children[i].replace("{", "").replace("}", "");
                }
            }
        }
    }

    if (root.nodeType == 3) { //Textnodes
        if (root._rawText.trim() === "") return null
        return parseText(root._rawText)

    }
    let tagName = root.rawTagName

    let opts = getAttrs(root.rawAttrs)
    return `createElement(${initialIsCapital(tagName) ? tagName : `"${tagName}"`},${formatAttributes(opts)}${children.length !== 0 ? `, ${children}` : ''})`

}

async function parseJSXFile(fname, outputName = null) {
    let content = await fs.promises.readFile(fname);
    let str = content.toString();

    // Réinitialiser la position de l'expression régulière
    JSX_STRING.lastIndex = 0;
    let matches = JSX_STRING.exec(str);
    if (matches) {
        let HTML = matches[1] + ">";
        const root = parse(HTML);
        let translated = translate(root.firstChild);
        str = str.replace(matches[1] + ">", translated).replaceAll("createElement", "Blink.createElement");
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
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            fileList = listFiles(filePath, fileList); // Récursion pour les sous-dossiers
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
}



(async () => {
    const input = "src\\app";
    const output = "src\\outputs";

    try {
        const jsxFiles = listFiles(input);
        await jsxFiles.forEach(async function (file) {

            await parseJSXFile(file, file.replace(input, output).replace('jsx', 'js'));
        });
    } catch (err) {
        console.error('Erreur lors de la lecture du dossier ou du traitement des fichiers:', err);
    }
})()