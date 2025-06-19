#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, 'templates');

/**
 * A recursive function to find all files ending in .tpl,
 * process them by replacing placeholders, and then rename them.
 */
function processTemplates(directory, replacements) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processTemplates(filePath, replacements);
    } else if (filePath.endsWith('.tpl')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // --- THE FIX ---
      // A more robust loop that iterates through all provided replacements.
      // This avoids typos and ensures all placeholders are processed.
      for (const placeholder in replacements) {
        // We use a RegExp with the 'g' flag to ensure all instances are replaced.
        const regex = new RegExp(`{{${placeholder}}}`, 'g');
        content = content.replace(regex, replacements[placeholder]);
      }

      const newFilePath = filePath.replace('.tpl', '');
      fs.writeFileSync(newFilePath, content);
      fs.unlinkSync(filePath);
    }
  }
}

// Main function to run the CLI
async function run() {
  console.log(
    chalk.blue.bold('\n🍄 Welcome to the Mycelial Spore Creator! 🍄\n')
  );

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'sporeName',
      message:
        'What is the name of your new spore? (e.g., spore-analytics-dashboard)',
      validate: (input) => {
        if (/^([a-z0-9\-_]+)$/.test(input)) return true;
        return 'Please enter a valid, lowercase folder name.';
      },
    },
    {
      type: 'input',
      name: 'port',
      message: 'Which port should its preview server run on?',
      default: '5177',
      validate: (input) => {
        const portNum = parseInt(input, 10);
        if (Number.isInteger(portNum) && portNum > 1024) return true;
        return 'Please enter a valid port number.';
      },
    },
    {
      type: 'input',
      name: 'globalVar',
      message:
        'What will be its global variable name? (e.g., SporeAnalyticsDashboard)',
      default: (ans) => {
        return ans.sporeName
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
      },
    },
  ]);

  const { sporeName, port, globalVar } = answers;
  const targetDir = path.join(process.cwd(), sporeName);

  console.log(
    chalk.cyan(`\nCreating a new Mycelial Spore in ${chalk.bold(targetDir)}...`)
  );

  try {
    if (fs.existsSync(targetDir)) {
      throw new Error(`Directory ${sporeName} already exists!`);
    }

    fs.copySync(TEMPLATES_DIR, targetDir);

    // --- THE FIX ---
    // We now create a replacements object with keys that exactly match our placeholders.
    const replacements = {
      SPORE_NAME: sporeName,
      PORT: port,
      GLOBAL_VAR: globalVar,
    };

    processTemplates(targetDir, replacements);

    console.log(chalk.green.bold('\n✅ Success! Your new spore is ready.\n'));
    console.log('Next steps:');
    console.log(chalk.cyan(`  cd ${sporeName}`));
    console.log(chalk.cyan('  npm install'));
    console.log(chalk.cyan('  npm run build'));
    console.log(chalk.cyan('  npm run preview'));
  } catch (error) {
    console.error(chalk.red.bold('\n❌ An error occurred:'));
    console.error(chalk.red(error.message));
    if (fs.existsSync(targetDir)) {
      fs.removeSync(targetDir);
    }
  }
}

run();
