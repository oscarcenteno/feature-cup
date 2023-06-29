// Function to remove duplicates from report and improve presentation appearance
const createFeatureCoverageReportWithModuleHierarchy = (report) => {
  const modifiedReport = [];
  let currentModule = null;

  for (const [moduleName, featureName, coveredText] of report) {
    if (currentModule !== moduleName) {
      currentModule = moduleName;
      modifiedReport.push([moduleName, featureName, coveredText]);
    } else {
      modifiedReport.push(['', featureName, coveredText]);
    }
  }

  return modifiedReport;
};

// Function to apply coloring to the feature coverage report
const colorizeFeatureCoverageReport = (featureCoverageReport) => {
  const coloredReport = featureCoverageReport.map(row => {
    const coloredRow = row.map(cell => {
      if (cell.trim() === 'Yes') {
        return `\u001b[42m ${cell} \u001b[49m`; // Green background
      }

      if (cell.trim() === 'No') {
        return `\u001b[41m ${cell} \u001b[49m`; // Red background
      }
      return cell;
    });
    return coloredRow;
  });

  return coloredReport;
};

module.exports = {
  createFeatureCoverageReportWithModuleHierarchy,
  colorizeFeatureCoverageReport,
};
