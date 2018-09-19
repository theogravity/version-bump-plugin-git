# version-bump-plugin-git

A versioning strategy for [version-bump](https://github.com/theogravity/version-bump).

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

## Install

Make sure you have [version-bump](https://github.com/theogravity/version-bump) installed, then
install the strategy with:

`npm i version-bump-plugin-git --dev`

## Usage

`$ version-bump git-commit-msg`

