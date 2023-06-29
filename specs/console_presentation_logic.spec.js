const assert = require('assert');
const { createFeatureCoverageReportWithModuleHierarchy } = require('../src/presentation/console_presentation_logic.js');


describe('createFeatureCoverageReportWithModuleHierarchy', () => {
    it('should modify the report structure to avoid repeating module names', () => {
        const report = [
            ['Module A', 'Feature 1', 'Yes'],
            ['Module A', 'Feature 2', 'No'],
            ['Module A', 'Feature 3', 'Yes'],
            ['Module B', 'Feature 4', 'No'],
            ['Module B', 'Feature 5', 'Yes'],
            ['Module B', 'Feature 6', 'Yes'],
        ];

        const expectedModifiedReport = [
            ['Module A', 'Feature 1', 'Yes'],
            ['', 'Feature 2', 'No'],
            ['', 'Feature 3', 'Yes'],
            ['Module B', 'Feature 4', 'No'],
            ['', 'Feature 5', 'Yes'],
            ['', 'Feature 6', 'Yes'],
        ];

        const modifiedReport = createFeatureCoverageReportWithModuleHierarchy(report);
        assert.deepStrictEqual(modifiedReport, expectedModifiedReport);
    });

    it('should handle an empty report', () => {
        const report = [];

        const expectedModifiedReport = [];

        const modifiedReport = createFeatureCoverageReportWithModuleHierarchy(report);
        assert.deepStrictEqual(modifiedReport, expectedModifiedReport);
    });
});
