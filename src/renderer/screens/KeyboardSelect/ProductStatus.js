import React from "react";
import Markdown from "react-markdown";

// Import the raw content of the markdown file
import markdownFile from "@root/product-status.md";

export const ProductStatus = () => {
  // Convert the raw markdown content to HTML
  return <Markdown>{markdownFile}</Markdown>;
};
