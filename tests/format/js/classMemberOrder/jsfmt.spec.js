run_spec(__dirname, ["babel", "flow", "typescript"], {classMemberOrder:"none"});
run_spec(__dirname, ["babel", "flow", "typescript"], {classMemberOrder:"public first"});
run_spec(__dirname, ["babel", "flow", "typescript"], {classMemberOrder:"private first"});