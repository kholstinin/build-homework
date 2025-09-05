# Задание

Добавьте поддержку CSP nonce для проекта в `tasks/project`. Сервер уже умеет проставлять заголовок `Content-Security-Polycy` и `nonce` с помощью подмены переменной {{NONCE_VALUE}} в html. Ваша задача настроить поддержку в сборщиках данной функциональности.

# Проверка

Запустите `yarn test:csp`.

# Подсказки

- [webpack csp](https://webpack.js.org/guides/csp/)
- [vite csp](https://vite.dev/guide/features#content-security-policy-csp)

По сути в каждом сборщике в его генерации html нужно добавить генерацию нового атрибута `{{NONCE_VALUE}}` который затем подменит сервер.
