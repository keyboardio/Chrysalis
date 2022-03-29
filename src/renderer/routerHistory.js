import { createMemorySource, createHistory } from "@gatsbyjs/reach-router";

const source = createMemorySource("/keyboard-select");
export const history = createHistory(source);
export const navigate = history.navigate;
