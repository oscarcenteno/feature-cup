const assert = require('assert');
const { colorizeFeatureCoverageReport } = require('../src/presentation/console_presentation_logic.js');

describe('colorizeFeatureCoverageReport', () => {
  it('should colorize the feature coverage report correctly', () => {
    const featureCoverageReport = [
      ['Module', 'Feature', 'Covered'],
      ['Module A', 'Feature 1', 'Yes'],
      ['Module A', 'Feature 2', 'No'],
      ['Module B', 'Feature 3', 'Yes'],
      ['Module B', 'Feature 4', 'Yes']
    ];

    const expectedColoredReport = [
      ['Module', 'Feature', 'Covered'],
      ['Module A', 'Feature 1', '\u001b[42m Yes \u001b[49m'], // Green background
      ['Module A', 'Feature 2', '\u001b[41m No \u001b[49m'], // Red background
      ['Module B', 'Feature 3', '\u001b[42m Yes \u001b[49m'], // Green background
      ['Module B', 'Feature 4', '\u001b[42m Yes \u001b[49m'] // Green background
    ];

    const coloredReport = colorizeFeatureCoverageReport(featureCoverageReport);

    assert.deepStrictEqual(coloredReport, expectedColoredReport);
  });
});
