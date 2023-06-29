const { generateConsoleFeatureCoverageReport } = require('../src/feature_cup.js');

// Usage example
generateConsoleFeatureCoverageReport('./specs/**/*.spec.js', './features.json');
