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
  },
  allmanStyle: {
    since: "1.0.0",
    category: CATEGORY_CSS,
    type: "boolean",
    default: false,
    description: "Puts the '{' on a new line.",
  },
  retainBlankLines :{
    since: "0.0.0",
    category: CATEGORY_CSS,
    type: "boolean",
    description: "keeps multiple blank lines instead of collapsing into a single blank line"
  },
  elseStatementNewLine: {
    since: "0.0.0",
    category: CATEGORY_CSS,
    type: "boolean",
    description: "puts else statement on a new line instead of on the same line as if statement right bracket.",
  }
};
