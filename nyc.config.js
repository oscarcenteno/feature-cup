module.exports = {
    exclude: ['**/*.spec.js'],
    reporter: ['text', 'html', 'lcov'],
    all: true,
    'check-coverage': true,
    'per-file': true,
    include: ['src/**/*.js'],
}