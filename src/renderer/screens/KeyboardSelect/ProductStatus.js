import React from "react";
import { marked } from "marked";

// Import the raw content of the markdown file
import markdownFile from "@root/product-status.md";

export const ProductStatus = () => {
  // Convert the raw markdown content to HTML
  const htmlContent = marked(markdownFile);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
