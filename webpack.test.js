const { merge } = require("webpack-merge");
const common = require("./webpack.common");

common.optimization.splitChunks = undefined;

module.exports = merge(common);
