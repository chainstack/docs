# Contributing to Chainstack Documentation

Get involved! Whether you want to report an issue, fix a typo, or have an idea on what should be covered in the Chainstack documentation, we welcome everyone.

## Table of Contents

* [Documentation](#docs)
* [Working with Issues](#issues)
* [Pull Requests](#pulls)
* [Building](#build)
* [Communication](#communication)

## Documentation <a name="docs"></a>

The [Chainstack documentation](https://github.com/chainstack/docs) website is based on [VuePress](https://github.com/vuejs/vuepress).

Install dependencies after cloning:

``` sh
$ npm install
```

## Working with Issues <a name="issues"></a>

### Issue tracker

Click [Issues](https://github.com/chainstack/docs/issues) in the repository to see the reported issues.

Feel free to look around and comment.

### Submitting an Issue

Hit [New issue](https://github.com/chainstack/docs/issues/new).

You are welcome to submit any issue:

* Bug
* Typo
* Feature request
* Topic idea

## Pull Requests <a name="pulls"></a>

### Intent

The goals of contributing to the Chainstack documentation:

* Maintain the documentation quality, developer experience, user experience
* Fix issues that are important to developers and users
* Engage the community to make the best possible Chainstack experience

### Instructions

#### Branching

* Do work in a branch with a descriptive name
* Update your local branch and do an interactive rebase before pushing your work and making a Pull Request
* Resolve potential conflicts while rebasing and before making a Pull Request
* Do a local build/run before making a Pull Request. See [Building](#build).

#### Commit messages

Based on [Chris Beam's How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/).

* Provide a meaningful subject
* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Wrap the body at 72 characters
* Use keywords to reference Issues. See [Closing issues using keywords](https://help.github.com/en/articles/closing-issues-using-keywords).

## Building <a name="build"></a>

### Doing a local build

``` sh
$ npm run build
```

The assets will be generated in `docs/.vuepress/dist`.

### Doing a local run

``` sh
$ npm run dev
```

The website will be running on `http://127.0.0.1:8080`.

## Communication <a name="communication"></a>

[Talk to us on Discord](https://discord.gg/Cymtg2f7pX).
