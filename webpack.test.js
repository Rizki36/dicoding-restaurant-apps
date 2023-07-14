const { merge } = require("webpack-merge");
const common = require("./webpack.common");

delete common.optimization.splitChunks;

module.exports = merge(common, {});
