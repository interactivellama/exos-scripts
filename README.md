<p align="center">
  <a href="https://github.com/nanovazquez/exos">
    <img alt="Exos" src="https://raw.githubusercontent.com/nanovazquez/exos/master/exos-logo.png" width="546">
  </a>
</p>

**🛡️Exos** is a JavaScript framework that helps you to create apps and micro frontends using [React](https://github.com/facebook/react) and [TypeScript](https://github.com/Microsoft/TypeScript).

It currently provides the following packages:

- [Exos CLI](https://github.com/exosjs/exos-cli): a CLI tool for building React + TypeScript applications.
- [Exos Script](https://github.com/exosjs/exos-scripts): a set of out-of-the-box extensible scripts that helps you with the lifecycle of your React + TypeScript applications.
- [Exos Core](https://github.com/exosjs/exos-core): a library with core scripts that helps you to develop your React + TypeScript application and micro frontends.

# Exos Scripts ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/exos-scripts.svg?style=flat)](https://www.npmjs.com/package/exos-scripts) ![Build status](https://github.com/exosjs/exos-scripts/workflows/CI-CD/badge.svg?branch=master&event=push)

This project contains a set of out-of-the-box extensible scripts that helps you with the lifecycle of your React + TypeScript applications. It is _heavily_ inspired in [Facebook' Create React App](https://github.com/facebookincubator/create-react-app) plugin.

It contains the following built-in features:

- `exos-scripts start`: A ready-to-be-used development experience as similar to production as it could be (more info [here](#start)).
- `exos-scripts build`: A build script for web applications, configured and optimized to provide the best performance (more info [here](#build)).
- `exos-scripts test`: A unit testing framework ([Jest](https://jestjs.io/)) already configured for you (more info [here](#test)).
- `exos-scripts lint`: a static analyzer tool configured with the best practices for development with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). **Also comes with a flavor for Node Libraries.** (more info [here](#lint)).
- `exos-scripts stylelint`: a static analyzer tool for your CSS files, configured with the best practices for development with [SCSS](https://sass-lang.com/guide) and [CSS Modules](https://github.com/css-modules/css-modules) (more info [here](#stylelint)).

> **Note:** For more information about the **🛡️Exos** initiative, click [here](https://github.com/nanovazquez/exos).

## Getting started

To use it in your projects, first install `exos-scripts` in your package by running:

```bash
npm i -D exos-scripts
```

Then, update your **package.json** with the following:

```json
{
  "name": "Your App",
  "version": "0.0.1",
  // ...
  "scripts": {
    "lint": "exos-scripts lint",
    "stylelint": "exos-scripts stylelint",
    "test": "exos-scripts test",
    "start": "exos-scripts start",
    "build": "exos-scripts build"
  }
}
```

## Scripts

### Start

It spins up a [Webpack DevServer[(https://webpack.js.org/configuration/dev-server/)] with your web app, configured with [Hot Module replacement](https://webpack.js.org/concepts/hot-module-replacement/) and [Cheap Module Source maps](https://webpack.js.org/configuration/devtool/).

It supports [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [SCSS](https://sass-lang.com/guide) and [CSS Modules](https://github.com/css-modules/css-modules). Plus, it automatically types your style files by using the [typings-for-css-modules-loader](https://github.com/TeamSupercell/typings-for-css-modules-loader) library.

You can create a **public** folder and put assets in there, [the same way Create React app works](https://create-react-app.dev/docs/using-the-public-folder/). Inside of this folder, you can set up an **index.ejs** file that acts as the mail **index.html** file.

### Build

In addition to what is explained above, this scripts provides the following:

- It hashes all the files to provide a new version in production.
- It versions your artifact, adding a version number in a meta tag of the **index.html** file.
- It bundles all your CSS/SCSS files into a single file using the **MiniCssExtractPlugin**.
- It externalizes the common libraries, like **React** and **ReactDOM**.
- It provides an optimized version of your assets, thanks to **webpack**.

### Test

It comes with a preconfigured ([Jest](https://jestjs.io/)) that support **React** unit tests with [Enzyme](https://enzymejs.github.io/enzyme/), adding the proper mocks for every other file (`.css`, `.scss`, `.jpg`, `.jpeg`, `.png`, `.svg`). It expects unit tests with named using the suffixes: `.spec`, `.test` or `.tests` (e.g. `Search.spec.tsx`).

It also has coverage support that is executed by default in any CI environments where the environment variable `CI=true` is set. Or you can trigger it by running `exos-scripts test --collectCoverage`.

It has with a **library mode** for Node Libraries using [TypeScript](https://www.typescriptlang.org/) and ([Jest](https://jestjs.io/)). To use it, run `exos-scripts test --type=Library`.

### Lint

It comes with with best practices for development with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) (see the rules [here](./src/scripts/lint/.eslintrc.react.js))

It has a **library mode** for Node Libraries using [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). To use it, run `exos-scripts lint --type=Library` (see the rules [here](./src/scripts/lint/.eslintrc.library.js))

### Stylelint

It comes with with best practices for development with [SCSS](https://sass-lang.com/guide) and [CSS Modules](https://github.com/css-modules/css-modules) (see the rules [here](./src/scripts/stylelint/.stylelintrc.js))

🚀!
