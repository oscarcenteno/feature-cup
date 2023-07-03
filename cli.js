#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');

// Import your feature-cup logic here
const { runFeatureCup } = require('./src/feature_cup.js');

program
    .option('-f, --features [file]', 'Path to the features JSON file', './features.json')
    .option('-t, --tests [glob]', 'Glob pattern for test files', './specs/**/*.spec.js')
    .option('-o, --output [type]', 'Output type: console, file, etc.', 'console')
    .option('-r, --report [path]', 'Report path: path to the report folder', './reports');

program.parse(process.argv);

const options = program.opts();

// Resolve file paths
const featuresJson = path.resolve(options['features']);
const testsPattern = path.resolve(options['tests']);

// Run the feature-cup logic with the provided options
runFeatureCup({ testsPattern, featuresJson, output: options['output'], reportPath: options['report'] });
