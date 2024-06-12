import * as fs from 'fs';
import { parse } from 'node-html-parser';


const JSX_STRING = /\(\s*(<.*)>\s*\)/gs
const JSX_INTERPOLATION = /\{([a-zA-Z0-9]+)\}/gs
const QUOTED_STRING = /["|'](.*)["|']/gs

function getAttrs(attrsStr) {
    if (attrsStr.trim().length == 0) return {}
    let objAttrs = {}
    let parts = attrsStr.split(" ")
    parts.forEach(p => {
        const [name, value] = p.split("=")
        // console.log(name)
        // console.log(value)
        objAttrs[name] = (value)
    })
    return objAttrs
}

function parseText(txt) {
    let interpolations = txt.match(JSX_INTERPOLATION)
    if (!interpolations) {
        console.log("no inerpolation found: ", txt)
        return `"${txt}"`
    } else {
        console.log("inerpolation found!", txt)
        txt = replaceInterpolations(txt)
        // interpolations.shift()
        // interpolations.forEach( v => {
        //     txt = txt.replace(`{${v}}`, `" + (${v}) + "`)
        // })
        return `"${txt}"`
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

function replaceInterpolations(txt, isOnJSON = false) {
    let interpolations = null;

    while (interpolations = JSX_INTERPOLATION.exec(txt)) {
        // console.log("fixing interpolation for ", txt)
        // console.log(interpolations)
        if (isOnJSON) {
            txt = txt.replace(`"{${interpolations[1]}}"`, interpolations[1])
        } else {
            txt = txt.replace(`{${interpolations[1]}}`, `"+ ${interpolations[1]} +"`)
        }
    }
    return txt
}

function translate(root) {
    if (Array.isArray(root) && root.length == 0) return
    // console.log("Current root: ")
    // console.log(root)
    let children = []
    if (root.childNodes.length > 0) {
        children = root.childNodes.map(child => translate(child)).filter(c => c != null)
    }
    if (root.nodeType == 3) { //Textnodes
        if (root._rawText.trim() === "") return null
        return parseText(root._rawText)

    }
    let tagName = root.rawTagName

    let opts = getAttrs(root.rawAttrs)
    // console.log("Opts: ")
    // console.log(opts)
    // console.log(JSON.stringify(opts))

    return `createElement("${tagName}", ${replaceInterpolations(JSON.stringify(opts, replacer), true)} ${children.length !== 0 ? `, ${children}` : ''})`

}

async function parseJSXFile(fname, outputName = null) {
    let content = await fs.promises.readFile(fname);
    let str = content.toString();

    console.log(fname, outputName);
    console.log(str);

    // Réinitialiser la position de l'expression régulière
    JSX_STRING.lastIndex = 0;
    let matches = JSX_STRING.exec(str);
    if (matches) {
        let HTML = matches[1] + ">";
        const root = parse(HTML);
        let translated = (translate(root.firstChild));
        str = str.replace(matches[1] + ">", translated);
    }

    const outputFileName = outputName ? outputName : fname.replace('.jsx', '.js');
    await fs.promises.writeFile(outputFileName, str);
}


(async () => {
    try {
        const pagesPath = "./src/pagesJSX/";
        await fs.readdir(pagesPath, async function (err, files) {
            await files.forEach(async function (file) {
                await parseJSXFile(pagesPath + file, "./src/outputs/" + file.replace('jsx', 'js'));
            });
        });
    } catch (err) {
        console.error('Erreur lors de la lecture du dossier ou du traitement des fichiers:', err);
    }
})()