// Description: This file is the entry point for the module.
// It exposes the generateAndPrintFeatureCoverageReport function.
// This function is the only function that should be used by the user of the module.
// It is responsible for:
// - Data access logic: getting the json file and the test suite names
// - Business logic: generating the feature coverage report
// - Presentation logic: printing the feature coverage report
//
// The other functions are private and should not be used by the user of the module.

// Data Access Logic
const { getFeaturesFromJsonSource, parseTestSuiteNamesFromFiles } = require('./data_access/data_access_logic');
// Business Logic
const { generateFeatureCoverageReport } = require('./business_logic/generateFeatureCoverageReport');
const { getTestSuitesNotAssociatedWithAnyFeature } = require('./business_logic/getTestSuitesNotAssociatedWithAnyFeature.js');

// Presentation Logic
const { createFeatureCoverageReportWithModuleHierarchy } = require('./presentation/console_presentation_logic');
const { printFeatureCoverageReport } = require('./presentation/console_output');
const { printNoCoverageReport } = require('./presentation/console_output.js');
const { outputCoverageReportToHTML } = require('./presentation/html_output.js');

// Function to generate and print the feature coverage report
const generateConsoleFeatureCoverageReport = (pattern, jsonFileName) => {

    // Data access logic
    const json = getFeaturesFromJsonSource(jsonFileName);
    const testSuiteNames = parseTestSuiteNamesFromFiles(pattern);

    // Business logic
    const report = generateFeatureCoverageReport(json, testSuiteNames);
    outputToConsole(report, json, testSuiteNames);
};

const generateHtmlFeatureCoverageReport = (pattern, jsonFileName, reportPath) => {
    // Data access logic
    const json = getFeaturesFromJsonSource(jsonFileName);
    const testSuiteNames = parseTestSuiteNamesFromFiles(pattern);

    // Business logic
    const report = generateFeatureCoverageReport(json, testSuiteNames);

    // Presentation logic
    outputCoverageReportToHTML(report, reportPath);

};

const runFeatureCup = ({ testsPattern, featuresJson, output, reportPath }) => {

    if (output === 'console') {
        generateConsoleFeatureCoverageReport(testsPattern, featuresJson);
    }
    else if (output === 'html') {
        generateHtmlFeatureCoverageReport(testsPattern, featuresJson, reportPath);
    }
    else {
        console.error(`Unsupported output type: ${output}`);
        process.exit(1);
    }
};

module.exports = {
    generateConsoleFeatureCoverageReport,
    runFeatureCup
};
function outputToConsole(report, json, testSuiteNames) {
    const modifiedReport = createFeatureCoverageReportWithModuleHierarchy(report);
    printFeatureCoverageReport(modifiedReport);

    const noCoverageReport = getTestSuitesNotAssociatedWithAnyFeature(json, testSuiteNames);
    printNoCoverageReport(noCoverageReport);
}

