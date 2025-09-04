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
const codeAllFiles = [];

export function bundle(entryPath) {
  const entryData = fs.readFileSync(entryPath, "utf-8");
  codeAllFiles.push(entryData);
  const entryRequireCalls = searchRequireCalls(entryData);

  for (let reqPath of entryRequireCalls) {
    if (reqPath.startsWith("./")) {
      const fileName = reqPath.replace("./", "");
      bundle(path.resolve(import.meta.dirname, "src", fileName));
    }
  }
}

// bundle(path.resolve(import.meta.dirname, "src", "entry.cjs"));
const res = codeAllFiles.reverse().join("");
console.log(res)

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
