# enzyme-matchers

![License](https://img.shields.io/npm/l/chai-enzyme.svg)
[![Travis CI](https://travis-ci.org/FormidableLabs/enzyme-matchers.svg?branch=master)](https://travis-ci.org/FormidableLabs/enzyme-matchers)
[![Maintenance Status][maintenance-image]](#maintenance-status)


## Overview

This is an assertion library for [enzyme](https://github.com/airbnb/enzyme/) to simplify your tests, and make them more readable.

This library supports several testing frameworks including [Jest](https://github.com/facebook/jest) and [Jasmine](http://jasmine.github.io/).

> _Want to add support for another testing framework? Check out our [contributing](#contributing) doc!_

### Readme's for each package:

* [jasmine-enzyme](/packages/jasmine-enzyme/README.md)
* [jest-enzyme](/packages/jest-enzyme/README.md)

## Development

#### Setup

```shell
$ git clone <this repo>
$ cd enzyme-matchers
$ npm install
$ lerna bootstrap
```

#### Tests

Linters:

```shell
$ npm run lint
```

Tests:

```shell
$ npm test
```

## Contributing

We want to make this assertion library as robust and complete as possible. If you think that there are missing features/assertions, please open a GitHub issue or even better - a PR.

This project uses [lerna](https://github.com/lerna/lerna)

Bug reports and pull requests are welcome on GitHub. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License

```
 _________________
< The MIT License >
 -----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```


## Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome. 

[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg

## Publishing Steps

1. Create a branch with version name. e.g., `Release7.1.1`
2. Edit CHANGELOG.md with entries (associating change to each github username to credit changes!)
3. Commit change as "Changelog 7.1.1'
4. Push branch to github
5. Deploy by running `lerna publish` and follow prompts. Always publish all packages.
6. Create PR in github for `Release7.1.1` branch
7. PR description should follow the template of `:tada: Thanks @_users_who_contributed_, ... :tada:`. [Here is an example](https://github.com/FormidableLabs/enzyme-matchers/pull/326)
8. Squash and merge (otherwise we get 2 commits)
