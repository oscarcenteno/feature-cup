// Function to get all test suites that do not match any feature
const getTestSuitesNotAssociatedWithAnyFeature = (json, testSuiteNames) => {
    return testSuiteNames.filter((testSuiteName) => {
        const [moduleName, featureName] = testSuiteName.split(' / ');
        const lowerModuleName = moduleName.trim().toLowerCase();
        const lowerFeatureName = featureName.trim().toLowerCase();

        const isCovered = json.system.modules.some((module) => {
            ;
            if (module.name.trim().toLowerCase() === lowerModuleName) {
                return module.features.some((feature) => feature.name.trim().toLowerCase() === lowerFeatureName);
            }
            return false;
        });

        return !isCovered;
    });
};


module.exports = {
    getTestSuitesNotAssociatedWithAnyFeature
};