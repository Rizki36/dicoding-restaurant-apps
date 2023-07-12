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
    // Puppeteer: {
    //   url: "http://127.0.0.1:9000",
    //   show: true,
    //   windowSize: "1200x900",
    // },
    WebDriver: {
      url: "http://127.0.0.1:9000",
      browser: "chrome",
      host: "127.0.0.1",
      port: 9000,
      restart: false,
      windowSize: "1920x1680",
      desiredCapabilities: {
        chromeOptions: {
          args: [/*"--headless",*/ "--disable-gpu", "--no-sandbox"],
        },
      },
      // path: "/",
    },
  },
  include: {
    I: "./steps_file",
  },
  name: "restaurant-apps",
  plugins: {
    wdio: {
      enabled: true,
      services: ["selenium-standalone"],
      seleniumArgs: {
        version: "3.141.5", // Selenium standalone server version
        drivers: {
          chrome: {
            version: "75.0.3770.140", // Chromedriver version
          },
        },
      },
      seleniumInstallArgs: {
        version: "3.141.5",
        baseURL: "https://selenium-release.storage.googleapis.com",
        drivers: {
          chrome: {
            version: "75.0.3770.140",
            arch: process.arch,
            baseURL: "https://chromedriver.storage.googleapis.com",
          },
        },
      },
    },
  },
};

exports.config = config;
