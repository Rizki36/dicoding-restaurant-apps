// Karma configuration
// Generated on Fri Jul 03 2020 20:15:52 GMT+0700 (Western Indonesia Time)
module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: ".",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine", "karma-typescript"],

    // list of files / patterns to load in the browser
    files: ["specs/**/*.spec.ts"],

    // list of files / patterns to exclude
    exclude: [
      "src/index.ts", // untestable main "boot" file
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "specs/**/*.spec.ts": ["webpack", "sourcemap", "karma-typescript"],
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
      devtool: "inline-source-map",
      mode: "development",
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: "errors-only",
    },

    karmaTypescriptConfig: {
      tsconfig: "tsconfig.json",
      bundlerOptions: {
        // Because of the way Karma works, Jasmine's focus specs (fdescribe, fit)
        //   will only focus tests for their own file.
        // Use the "entrypoints" property to restrict the test files that are run.
        // entrypoints: /date\.spec\.ts$/
      },
      // Modify the "coverageOptions" and "reports" as desired.
      coverageOptions: {
        threshold: {
          global: {
            statements: 95,
            branches: 95,
            functions: 95,
            lines: 95,
          },
        },
        exclude: [/^test[\/\\]/], // forward slash on *nix/Mac, backslash on Windows
      },
      reports: {
        html: "coverage",
        "text-summary": "",
      },
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "karma-typescript"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    /* possible values: config.LOG_DISABLE || config.LOG_ERROR
    || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
