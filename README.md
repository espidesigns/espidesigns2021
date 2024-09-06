# espidesigns//2021 from BIZAR.RO

[![JS Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

[![Screenshot of Website](espidesigns2021.jpg)](https://espi.design/)

This is the repository of [espidesigns//2021](https://espi.design/) forked from [Bizarro](http://bizar.ro/) portfolio. 

# Overview

The front end of the portfolio was made entirely with plain JavaScript code using ECMAScript 2015+ features without any frameworks like Angular, React or Vue. It's using libraries such as [GSAP](https://greensock.com/), [Lodash](https://lodash.com/) and [ogl](https://github.com/oframe/ogl). To generate our static files that will be uploaded to the environment, we're using [Webpack](https://webpack.js.org/).

# Getting Started

You need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed in your machine, these are our only dependencies to run the project locally.

```sh
## switch to latest node
$ nvm use 18

# Clone the project.
git clone https://github.com/lhbzr/bizar.ro.git

# Install npm depedencies.
npm install

# Configure .env variables and run the website.
npm start

# "npm run deploy" did not work for me (because local and remote gh-pages pages must not exist first)

## if build shows Error: error:0308010C:digital envelope routines::unsupported: 
$ export NODE_OPTIONS=--openssl-legacy-provider

# below worked to deploy build site to github pages
1. npm run build

## you can avoid this line if you are in main...
2. git checkout main 

## create a local gh-pages branch containing the splitted output folder
3. git subtree split --prefix public -b gh-pages 

## force the push of the gh-pages branch to the remote gh-pages branch at origin
4. git push -f origin gh-pages:gh-pages 

## delete the local gh-pages because you will need it: ref
5. git branch -D gh-pages 

```


when npm start doesn't work:
Delete node_modules
Remove node-sass from package.json
npm install
npm uninstall node-sass
npm install sass
npm audit fix
npm start
