# Задание

Ваша задача написать простейший трансформер кода с помощью `acorn`, `estree-walker` и `astring`. Трансформер должен преобразовывать `let` и `const` в `var`. Обвязка для осуществления трансформации уже написана в `main.js`, ваша задача написать сам трансформер в `transformer.js` (вам понадобится фукнция walk из пакета [estree-walker](https://github.com/Rich-Harris/estree-walker)).

# Проверка

Для проверки запустите `yarn test`.

# Дополнительно

Добавьте в builder реализованный трансформер, он должен преобразовывать код подключаемого модуля. Для этого каждый модуль перед добавлением в конечный бандл пропустите через функцию трансформации.

Для проверки запустит `yarn test:ast`.
