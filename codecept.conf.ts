const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

const config: CodeceptJS.MainConfig = {
  tests: "e2e/**/*.spec.ts",
  output: "e2e/outputs",
  helpers: {
    Puppeteer: {
      url: "http://127.0.0.1:9000",
      show: true,
      windowSize: "1200x900",
    },
  },
  include: {
    I: "./steps_file",
  },
  name: "restaurant-apps",
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};

exports.config = config;
