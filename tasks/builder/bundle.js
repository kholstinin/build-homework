import fs from "node:fs";
import path from "node:path";

/**
 * Примерный алгоритм работы бандлера:
 * 1. Прочитать entry и собрать список всех вызовов require
 * 2. Пройтись по полученным require (они могут быть вложенными)
 * 3. На выходе получится массив с исходным кодом всех модулей
 * 4. Склеить всё воедино обернув модули и entry в новый рантайм
 * 
 * Для чтения файлов используйте fs.readFileSync
 * Для резолва пути до модуля испльзуйте path.resolve (вам нужен путь до родителя где был вызван require)
 * Пока что сборщик упрощен, считаем что require из node_modules нет
 */

/**
 * @param {string} entryPath - путь к entry бандлинга
 */
export function bundle(entryPath) {
  const resolvedPath = path.resolve(entryPath)
  const { result, deps } = concatModule(resolvedPath, {})

  const setup = `
  const modules = {};
  const deps = ${JSON.stringify(deps)};
  
  function customRequire(id) {
    const module = { exports: {} }
    function localRequire(spec) {
      const nextId = deps[id][spec]
      return customRequire(nextId)
    }
    modules[id](localRequire, module, module.exports)
    return module.exports
  };
  `

  const requiredModules = Object.entries(result).map(([modulePath, codeFromModule]) => {
    return `
    modules[${JSON.stringify(modulePath)}] = (require, module, exports) => {
        ${codeFromModule}
    };
    `
  }).join('\n')

  return `
  ${setup}
  ${requiredModules}
  customRequire(${JSON.stringify(resolvedPath)});
  `
}

const concatModule = (resolvedPath, deps) => {
  const parsedFile = fs.readFileSync(resolvedPath, 'utf-8')
  const rawRequireModules = searchRequireCalls(parsedFile)
  const requireModules = rawRequireModules.map((module) => path.resolve(path.dirname(resolvedPath), module))
  deps[resolvedPath] = Object.assign(
      deps[resolvedPath] || {},
      ...rawRequireModules.map((spec, i) => ({ [spec]: requireModules[i] }))
  )

  let result =   {[resolvedPath]: parsedFile}
  const children = requireModules.map((m) => concatModule(m, deps))
  if (children.length) {
    result = Object.assign(result, ...children.map((c) => c.result))
  }

  return { result, deps }
}



/**
 * Функция для поиска в файле вызовов require
 * Возвращает id модулей
 * @param {string} code 
 */
function searchRequireCalls(code) {
  return [...code.matchAll(/require\(('|")(.*)('|")\)/g)].map(
    (item) => item[2]
  );
}
