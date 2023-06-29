// Function to check if a test suite name matches a feature
const isTestSuiteCoveringFeature = (testSuiteName, module, feature) => {
    const pattern = new RegExp(`^${module.name} / ${feature.name}(?:$|\\b)`, 'i');
    return pattern.test(testSuiteName);
};

module.exports = {
    isTestSuiteCoveringFeature
};
