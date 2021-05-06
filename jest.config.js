module.exports = {
    rootDir: './tests',
    testRegex: '.*\\.tests?\\.[tj]s',
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [
                    'TS151001' // ignore 'you should consider setting `esModuleInterop` to `true`'; it's triggered by importing a JS file in setup'
                ]
            }
        }
    },
    moduleDirectories: [
        'src',
        '<rootDir>',
        'node_modules'
    ],
    moduleNameMapper: {
        '\\.(s?css|svg|html)$': '<rootDir>/utils/empty-module.ts'
    },
    setupFiles: [
        '<rootDir>/setup/index.ts'
    ],
    moduleFileExtensions: [
        'js',
        'ts',
        'vue'
    ],
    transform: {
        '\\.ts': 'ts-jest',
        '\\.vue$': 'vue-jest'
    }
};