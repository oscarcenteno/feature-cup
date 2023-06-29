const table = require('table');
const { colorizeFeatureCoverageReport } = require('./console_presentation_logic.js');

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
    // eslint-disable-next-line no-console
    console.log(output);
};

const printNoCoverageReport = (noCoverageReport) => {
    console.log('Test suites not associated with any expected feature:');
    noCoverageReport.forEach(row => {
        console.log(`- "${row}"`);
    });
};

module.exports = {
    printFeatureCoverageReport,
    printNoCoverageReport
};
