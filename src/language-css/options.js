"use strict";

const commonOptions = require("../common/common-options.js");

const CATEGORY_CSS = "css";

// format based on https://github.com/prettier/prettier/blob/main/src/main/core-options.js
module.exports = {
  singleQuote: commonOptions.singleQuote,
  selectorsSameLine: {
    since: "1.0.0",
    category: CATEGORY_CSS,
    type: "boolean",
    default: false,
    description: "allow multiple css selectors to be on the same line"
  }
};
