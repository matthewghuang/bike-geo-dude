#!/bin/bash
yarn build
git add .
git commit -m "deploy: `date`"
git subtree push --prefix build origin gh-pages
git push