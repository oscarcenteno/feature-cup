const { isTestSuiteCoveringFeature } = require('./isTestSuiteCoveringFeature');

// Function to generate the feature coverage report
const generateFeatureCoverageReport = (json, testSuites) => {
  return json.system.modules.reduce((report, module) => {
    const moduleFeatures = module.features.map(feature => {
      const covered = testSuites.some(testSuite => isTestSuiteCoveringFeature(testSuite, module, feature));
      const coveredText = covered ? 'Yes' : 'No';

      return [module.name, feature.name, coveredText];
    });
    return report.concat(moduleFeatures);
  }, [['Module', 'Feature', 'Covered']]);
};

module.exports = {
  generateFeatureCoverageReport
};
