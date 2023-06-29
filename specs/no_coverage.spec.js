const assert = require('assert');
const { getTestSuitesNotAssociatedWithAnyFeature } = require('../src/business_logic/getTestSuitesNotAssociatedWithAnyFeature.js');

// Test cases
describe('getTestSuitesNotAssociatedWithAnyFeature', () => {
    const json = {
        system: {
            modules: [
                {
                    name: 'Module A',
                    features: [
                        { name: 'Feature 1' },
                        { name: 'Feature 2' },
                    ],
                },
                {
                    name: 'Module B',
                    features: [
                        { name: 'Feature 3' },
                        { name: 'Feature 4' },
                    ],
                },
            ],
        },
    };

    const testSuiteNames = [
        'Module A / Feature 1',
        'Module A / Feature 2',
        'Module B / Feature 3',
        'Module B / Feature 4',
        'Module C / Feature 5',
        'Module C / Feature 5 / Other text',
    ];

    it('should return test suites not associated with any feature', () => {
        const result = getTestSuitesNotAssociatedWithAnyFeature(json, testSuiteNames);
        assert.deepStrictEqual(result, ['Module C / Feature 5', 'Module C / Feature 5 / Other text']);
    });

    it('should return an empty array when all test suites are associated with features', () => {
        const result = getTestSuitesNotAssociatedWithAnyFeature(json, [
            'Module A / Feature 1',
            'Module A / Feature 2',
            'Module B / Feature 3',
            'Module B / Feature 4',
        ]);
        assert.deepStrictEqual(result, []);
    });

    it('should return all test suites when no features are defined in the JSON', () => {
        const result = getTestSuitesNotAssociatedWithAnyFeature({ system: { modules: [] } }, testSuiteNames);
        assert.deepStrictEqual(result, testSuiteNames);
    });
});
