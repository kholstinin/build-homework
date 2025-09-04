#!/bin/bash
mkdir -p dist
dist/entry.js

cat src/jquery.js src/index.js | tr -d '\t\n' > dist/entry.js