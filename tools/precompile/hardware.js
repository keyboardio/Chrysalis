const fs = require("fs");
const path = require("path");

const generateHardwareIndex = () => {
  const srcDir = path.join(__dirname, "../../src/api");
  
  // Find all hardware-* directories
  const hardwareDirs = fs.readdirSync(srcDir)
    .filter(dir => dir.startsWith('hardware-') && 
      fs.statSync(path.join(srcDir, dir)).isDirectory());

  // Collect imports and devices
  const imports = [];
  const devices = new Set();

  hardwareDirs.forEach(dir => {
    const indexPath = path.join(srcDir, dir, 'index.js');
    if (!fs.existsSync(indexPath)) return;

    const content = fs.readFileSync(indexPath, 'utf8');
    
    // Look for both named exports and export default
    const exportPatterns = [
      /export\s+(?:const|let|var)\s+(\w+)/g,
      /export\s*{\s*([^}]+)}/g,
      /export\s+default\s+(\w+)/g
    ];

    let deviceNames = [];
    
    exportPatterns.forEach(pattern => {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          // Handle multiple exports in a single statement (e.g., export { Model01, Model100 })
          const names = match[1].split(',').map(name => name.trim());
          deviceNames.push(...names);
        }
      }
    });

    if (deviceNames.length > 0) {
      // Add import
      imports.push(`import { ${deviceNames.join(', ')} } from "@api/${dir}";`);
      deviceNames.forEach(name => devices.add(name));
    }
  });

  const content = `// This file is auto-generated. Do not edit manually.
${imports.join('\n')}

export const Hardware = {
  devices: [${Array.from(devices).join(', ')}],
};
`;

  fs.writeFileSync(
    path.join(__dirname, "../../src/api/hardware/devices.js"),
    content
  );
};

exports.generateHardwareIndex = generateHardwareIndex;