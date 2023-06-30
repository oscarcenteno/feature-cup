const glob = require('glob');
const fs = require('fs');

// Function to parse files and extract Mocha test suite names
const parseTestSuiteNamesFromFiles = (pattern) => {
  const files = glob.sync(pattern);

  // raise error if no files found
  if (files.length === 0) {
    throw new Error(`No test files were found for pattern: ${pattern}`);
  }

  const testSuiteNames = [];

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /describe\(['"]([^'"]+)['"][\s\S]*?\)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      testSuiteNames.push(match[1].toLowerCase());
    }
  });

  return testSuiteNames;
};

function getFeaturesFromJsonSource(jsonFileName) {
  // raise error if file not found
  if (!fs.existsSync(jsonFileName)) {
    throw new Error(`Provided JSON file with Features was not found: ${jsonFileName}`);
  }

  return require(jsonFileName);
}

module.exports = {
  parseTestSuiteNamesFromFiles,
  getFeaturesFromJsonSource
};