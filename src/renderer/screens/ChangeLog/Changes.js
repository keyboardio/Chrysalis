import React from "react";
import Markdown from "react-markdown";

// Import the raw content of the markdown file
import markdownFile from "@root/changes.md";

export const Changes = () => {
  // Convert the raw markdown content to HTML
  return <Markdown>{markdownFile}</Markdown>;
};
