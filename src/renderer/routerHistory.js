import { createMemorySource, createHistory } from "@reach/router";

const source = createMemorySource("/keyboard-select");
export const history = createHistory(source);
export const navigate = history.navigate;
