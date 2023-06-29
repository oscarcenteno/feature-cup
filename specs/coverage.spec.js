const assert = require('assert');
const { generateFeatureCoverageReport } = require('../src/business_logic/generateFeatureCoverageReport.js');

describe('generateFeatureCoverageReport', () => {
  it('should generate the correct feature coverage report', () => {
    const json = {
      system: {
        modules: [
          {
            name: 'Module A',
            features: [
              { name: 'Feature 1' },
              { name: 'Feature 2' }
            ]
          },
          {
            name: 'Module B',
            features: [
              { name: 'Feature 3' },
              { name: 'Feature 4' }
            ]
          }
        ]
      }
    };

    const testSuites = [
      'Module A / Feature 1 / Other Text',
      'Module B / Feature 3 / Other Text',
      'Module B / Feature 4 / Other Text'
    ];

    const expectedReport = [
      ['Module', 'Feature', 'Covered'],
      ['Module A', 'Feature 1', 'Yes'],
      ['Module A', 'Feature 2', 'No'],
      ['Module B', 'Feature 3', 'Yes'],
      ['Module B', 'Feature 4', 'Yes']
    ];

    const report = generateFeatureCoverageReport(json, testSuites);

    assert.deepStrictEqual(report, expectedReport);
  });
});
