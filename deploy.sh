#!/usr/bin/env sh

# This file is used to deploy Vue.js App into GitHub Pages
# ref. https://cli.vuejs.org/guide/deployment.html#github-pages

#abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:suzuri-note/suzuri.git master:gh-pages

cd -