const fs = require('fs');

const outputCoverageReportToFile = (report, filePath) => {
    const reportString = report.map(row => row.join(',')).join('\n');
    fs.writeFileSync(filePath, reportString);
};

module.exports = {
    outputCoverageReportToFile,
};
