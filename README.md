# feature-cup [![Tests](https://github.com/oscarcenteno/feature-cup/actions/workflows/nodejs.yml/badge.svg)](https://github.com/oscarcenteno/feature-cup/actions/workflows/nodejs.yml) [![Coverage Status](https://coveralls.io/repos/github/oscarcenteno/feature-cup/badge.svg?branch=main)](https://coveralls.io/github/oscarcenteno/feature-cup?branch=main) [![npm version](https://badge.fury.io/js/feature-cup.svg)](https://badge.fury.io/js/feature-cup) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Create feature coverage reports for your test automation system. We are aware that reporting is a key component for test automation suites, however one important question that is usually not answered is "how much of your system is covered by these tests?" or "what features are not covered and we should verify manually?".

**feature-cup** allows us to specify the functional structure of the system-under-test and then match the test automation code to the functional structure. The result is a feature coverage report that shows how much of our system is covered by those tests.

Note that feature-cup does not require tests to run, as it does a static analysis of the test code.

## Installation

```bash
npm install feature-cup --save-dev
```

## Usage

Find the help by running:

```bash
feature-cup --help
```

Here is a basic usage of the reporter:

```bash
feature-cup --features ./demo/features.json --tests "./demo/specs/**/*.spec.js" --output console
```

### features.json

The features.json file is a json file that contains the system functional structure. It is used to create the feature coverage report. The file is a json array of module objects, such as:

```json
{
  "system": {
    "name": "My System",
    "modules": [
      {
        "name": "Module A",
        "features": [
          {
            "name": "Feature 1",
            "description": "This is feature 1 of module A"
          }
        ]
      }
    ]
  }
}
```

### Tests

The tests are the files that contain the test automation code. They may be written for mocha, jasmine or jest test runners. This reporter will parse all the "describe" blocks in the test files and match them to the features in the features.json file. The reporter will then output the feature coverage report.

The tests are specified using the --tests option. The tests are specified using the glob pattern. For example, to specify all the files in the "specs" folder, use:

```bash
--tests "./specs/**/*.spec.js"
```

In the demo folder, we have the following test files:

``` text
./demo
├──demo.js // usage through a NodeJS file
├──features.json // the functional structure of the system
├──reports
│  ├──feature-coverage-report.html // sample html report
└──specs // the test files
   ├──module_a.spec.js
   ├──module_b // feature-cup will find all test files recursively
   │  ├──module_b.spec.js
   │  ├──module_b_feature_4.spec.js
   │  └──module_b_feature_6.spec.js
   ├──module_c.spec.js
   └──module_f
      └──module_f.spec.js // all "describe" blocks in files will be matched to the features in the features.json file
```

### Output

The output is specified using the --output option. The output can be "console" or "html". 

If the output is "html", then the --report option may be specified. The report option is the path where report will be generated. If not specified, report will be saved in "reports" folder. For example:

```bash
--output console
--output html --report feature-coverage
```

## Examples

Find the source of examples in the repo: https://github.com/oscarcenteno/feature-cup-example

```bash
# Sample output report to console
feature-cup --features ./demo/features.json --tests "./demo/specs/**/*.spec.js" --output console
```

![Alt text](https://github.com/oscarcenteno/feature-cup/blob/main/demo/reports/console.png?raw=true)

```bash
# Sample output report to html file
feature-cup --features ./demo/features.json --tests "./demo/specs/**/*.spec.js" --output html --report feature-coverage
```

will output as an html report at demo/reports/feature-coverage.html:

![Alt text](https://github.com/oscarcenteno/feature-cup/blob/main/demo/reports/html.png?raw=true))

## Development

### Install dependencies

```bash
npm install
```

### Run tests

Business and presentation logic are covered by unit tests.

```bash
npm test
```

### Static code checking

```bash
npm run typecheck # check typescript types
npm run lint # check code style
```

### Get code coverage report

```bash
npm run coverage
```

Coverage information is reported to coveralls.io and can be found at [https://coveralls.io/github/oscarcenteno/feature-cup](https://coveralls.io/github/oscarcenteno/feature-cup).

```bash
# Command used by github actions to report coverage on each commit to main branch, see .github/workflows/nodejs.yml
npm run ci:coverage
```

### End to End testing

Here, make sure everything works together.

```bash
npm run demo:console # check no errors are shown in the console
npm run demo:html #check the report in the "reports" folder

```

## Contributors

* [Oscar Centeno] (https://github.com/oscarcenteno)

## License

MIT

## References

* [Mocha](https://mochajs.org/)
* [Jasmine](https://jasmine.github.io/)
* [Jest](https://jestjs.io/)
* [Istanbul](https://istanbul.js.org/)
* [Chai](https://www.chaijs.com/)
* [ESLint](https://eslint.org/)
