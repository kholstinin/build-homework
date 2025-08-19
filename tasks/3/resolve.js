import fs from "node:fs";
import path from "node:path";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const { imports } = packageJSON;
const rootDir = path.resolve(".");

const extensionsToResolve = ["js", "ts", "json"];

function applyImports(importPath) {
  const [alias, ...rest] = importPath.split("/");
  const restPath = rest.join("/");
  for (const [key, target] of Object.entries(imports)) {
    const baseAlias = key.split("/*")[0];
    if (alias === baseAlias) {
      const mapped = target.replace("*", restPath);
      return path.resolve(rootDir, mapped);
    }
  }

  return null;
}


export function resolve(importPath, parentPath) {

  let resolvedPath = null;
  if (importPath.startsWith("#")) {
    resolvedPath = applyImports(importPath);
    if (!resolvedPath) {
      return null;
    }
  } else {
    resolvedPath = path.resolve(path.dirname(parentPath), importPath)
  }

  if(path.extname(resolvedPath)){
    return isFileExists(resolvedPath)
  }


  const getResolvedPathWithExt = (ext) => {
    return path.format({
      dir: path.dirname(resolvedPath),
      name: path.basename(resolvedPath),
      ext: ext
    })
  }

  const pathExt = extensionsToResolve.find((ext) => {
    const resolvedPathWithExt = getResolvedPathWithExt(ext)
    return isFileExists(resolvedPathWithExt)
  })
  if(!pathExt){
    return null
  }
  return getResolvedPathWithExt(pathExt);
}

function isFileExists(filePath) {
  try {
    fs.readFileSync(filePath);
    return filePath;
  } catch (err) {
    return null;
  }
}
