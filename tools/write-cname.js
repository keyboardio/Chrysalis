const fs = require('fs');
const path = require('path');

// Path to the package.json file
const packageJsonPath = path.join(__dirname, '..','package.json');

// Read the package.json file
fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading package.json:', err);
    return;
  }

  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing package.json:', parseErr);
    return;
  }

  // Check if the homepage field exists
  if (!jsonData.homepage) {
    console.error('No homepage field found in package.json');
    return;
  }

  // Extract the domain name from the homepage URL
  const url = new URL(jsonData.homepage);
  const domainName = url.hostname;

  // Write the domain name to the CNAME file
  fs.writeFile('CNAME', domainName, (writeErr) => {
    if (writeErr) {
      console.error('Error writing to CNAME:', writeErr);
      return;
    }

    console.log(`CNAME file created with domain: ${domainName}`);
  });
});
