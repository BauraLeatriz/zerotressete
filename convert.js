import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { Transform } from 'sucrase';

const files = globSync('{client,server,shared,drizzle}/**/*.{ts,tsx}', {
  ignore: ['**/node_modules/**']
});

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Decide transforms based on extension
  const ext = path.extname(file);
  const transforms = ['typescript'];
  if (ext === '.tsx') {
    transforms.push('jsx');
  }

  try {
    const result = Transform(content, {
      transforms,
      filePath: file,
      disableESTransforms: true // Keep modern ES syntax like import/export
    });

    const newExt = ext === '.tsx' ? '.jsx' : '.js';
    const newFile = file.replace(new RegExp(`${ext}$`), newExt);
    
    fs.writeFileSync(newFile, result.code);
    fs.unlinkSync(file);
    console.log(`Converted ${file} -> ${newFile}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}
