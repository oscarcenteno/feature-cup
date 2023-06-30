const table = require('table');
const { colorizeFeatureCoverageReport } = require('./console_presentation_logic.js');
const printer = require('./printer.js');

// Function to print the feature coverage report
const printFeatureCoverageReport = (featureCoverageReport) => {
    const coloredReport = colorizeFeatureCoverageReport(featureCoverageReport);

    const config = {
        columns: {
            0: { alignment: 'left' },
            1: { alignment: 'left' },
            2: { alignment: 'center' }
        }
    };

    // @ts-ignore
    const output = table.table(coloredReport, config);
    printer.log(output);
};

const printNoCoverageReport = (noCoverageReport) => {
    printer.log('Test suites not associated with any expected feature:');
    noCoverageReport.forEach(row => {
        printer.log(`- "${row}"`);
    });
};

module.exports = {
    printFeatureCoverageReport,
    printNoCoverageReport
};
