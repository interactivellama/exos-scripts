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

- `exos-scripts start`: A ready-to-be-used development experience as similar to production as it could be.
- `exos-scripts build`: A build script for web applications, configured and optimized to provide the best performance.
- `exos-scripts test`: A unit testing framework ([Jest](https://jestjs.io/)) already configured for you.
  - `CI=true exos-scripts test`: Also comes with coverage configured that will be executed by default in CI environments. You can trigger it this way or by running `exos-scripts test --collectCoverage`.
- `exos-scripts lint`: a static analyzer tool configured with the best practices for development with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
  - `exos-scripts lint --type=Library`: Also comes with a flavor for Node Libraries using [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
- `exos-scripts stylelint`: a static analyzer tool for your CSS files, configured with the best practices for development with [SCSS](https://sass-lang.com/guide) and [CSS Modules](https://github.com/css-modules/css-modules).

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

🚀!
