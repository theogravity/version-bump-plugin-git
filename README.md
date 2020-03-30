# version-bump-plugin-git

[![npm version](https://badge.fury.io/js/version-bump-plugin-git.svg)](https://badge.fury.io/js/version-bump-plugin-git) [![CircleCI](https://circleci.com/gh/theogravity/version-bump-plugin-git.svg?style=svg)](https://circleci.com/gh/theogravity/version-bump-plugin-git)

A version strategy for [version-bump](https://github.com/theogravity/version-bump).

Uses the last git commit subject to determine the bump level. Will bump based on the following text:

* `[major]`
* `[minor]`
* `[patch]`
* `[pre-major]`
* `[pre-minor]`
* `[pre-patch]`
* `[pre-release]`
* `[build-release]`

Default is the lowest version possible.

<!-- TOC -->

## Install

Make sure you have [version-bump](https://github.com/theogravity/version-bump) installed, then
install the strategy with:

`npm i version-bump-plugin-git --dev`

## Usage

From command line:

`$ version-bump git-commit-msg`

As a [config file](https://github.com/theogravity/version-bump#custom-configuration-file):

```js
// save as .version-bump.js in the root of your project
module.exports = {
  strategy: 'git-commit-subj'
}
```
