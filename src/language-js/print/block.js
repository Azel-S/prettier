"use strict";

const { printDanglingComments } = require("../../main/comments.js");
const { isNonEmptyArray } = require("../../common/util.js");
const {
  builders: { hardline, indent },
} = require("../../document/index.js");
const {
  hasComment,
  CommentCheckFlags,
  isNextLineEmpty,
} = require("../utils/index.js");
const { printHardlineAfterHeritage } = require("./class.js");

const { printBody } = require("./statement.js");

/** @typedef {import("../../document").Doc} Doc */

function printBlock(path, options, print) {
  const node = path.getValue();
  const parts = [];

  if (node.type === "StaticBlock") {
    parts.push("static ");
  }

  if (node.type === "ClassBody" && isNonEmptyArray(node.body)) {
    const parent = path.getParentNode();
    parts.push(printHardlineAfterHeritage(parent));
  }

  if (options.allmanStyle) {
    parts.push(hardline);
  }

  parts.push("{");

  if (isNonEmptyArray(node.body) && options.multiEmptyLine) {
    const blockStartingLine = node.loc.start.line;
    const statementStartingLine = node.body[0].loc.start.line;

    if (hasComment(node.body[0])){
        const commentStartLine = node.body[0].comments[0].loc.start.line;

        for (let i = blockStartingLine + 1; i < commentStartLine; i++) {
          parts.push(hardline);
        }
    }
    else {

      for (let i = blockStartingLine + 1; i < statementStartingLine; i++) {
        parts.push(hardline);
      }  
    }
  }

  const printed = printBlockBody(path, options, print);
  if (printed) {
    parts.push(indent([hardline, printed]), hardline);
  } else {
    const parent = path.getParentNode();
    const parentParent = path.getParentNode(1);
    if (
      !(
        parent.type === "ArrowFunctionExpression" ||
        parent.type === "FunctionExpression" ||
        parent.type === "FunctionDeclaration" ||
        parent.type === "ObjectMethod" ||
        parent.type === "ClassMethod" ||
        parent.type === "ClassPrivateMethod" ||
        parent.type === "ForStatement" ||
        parent.type === "WhileStatement" ||
        parent.type === "DoWhileStatement" ||
        parent.type === "DoExpression" ||
        (parent.type === "CatchClause" && !parentParent.finalizer) ||
        parent.type === "TSModuleDeclaration" ||
        parent.type === "TSDeclareFunction" ||
        node.type === "StaticBlock" ||
        node.type === "ClassBody"
      )
    ) {
      parts.push(hardline);
    }
  }

  if (isNonEmptyArray(node.body) && options.multiEmptyLine) {
    const blockEndingLine = node.loc.end.line;
    const bodyCount = node.body.length;
    const lastBody = node.body[bodyCount - 1];
    const statementEndingLine = lastBody.loc.end.line;

    if (hasComment(node.body[bodyCount - 1])){
      const commentCount = lastBody.comments.length;
      const commentStartLine = lastBody.comments[commentCount - 1].loc.end.line;
      for (let i = commentStartLine + 1; i < blockEndingLine; i++) {
        parts.push(hardline);
      }

    }
    else {
      for (let i = statementEndingLine + 1; i < blockEndingLine; i++) {
        parts.push(hardline);
      }  
    }
  }

  parts.push("}");

  return parts;
}

function printBlockBody(path, options, print) {
  const node = path.getValue();

  const nodeHasDirectives = isNonEmptyArray(node.directives);
  const nodeHasBody = node.body.some((node) => node.type !== "EmptyStatement");
  const nodeHasComment = hasComment(node, CommentCheckFlags.Dangling);

  if (!nodeHasDirectives && !nodeHasBody && !nodeHasComment) {
    return "";
  }

  const parts = [];
  // Babel 6
  if (nodeHasDirectives) {
    path.each((childPath, index, directives) => {
      parts.push(print());
      if (index < directives.length - 1 || nodeHasBody || nodeHasComment) {
        parts.push(hardline);
        if (isNextLineEmpty(childPath.getValue(), options)) {
          parts.push(hardline);
        }
      }
    }, "directives");
  }

  if (nodeHasBody) {
    parts.push(printBody(path, options, print));
  }

  if (nodeHasComment) {
    parts.push(printDanglingComments(path, options, /* sameIndent */ true));
  }

  if (node.type === "Program") {
    const parent = path.getParentNode();
    if (!parent || parent.type !== "ModuleExpression") {
      parts.push(hardline);
    }
  }

  return parts;
}

module.exports = { printBlock, printBlockBody };
