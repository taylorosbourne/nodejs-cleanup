import * as shell from 'shelljs';
import * as chalk from 'chalk';

const inquirer = require('inquirer');

type Answers = {
  choice: string
}

export const cleanUpModules = (): void => {
  shell.exec('pwd');
  shell.exec('find . -name "node_modules" -type d -prune -print -exec rm -rf "{}" \+');
  console.log(chalk.green('\n Alrighty then all clean! 🚀'));
}

export const promptCleanUp = (): void => {
  console.log(chalk.white.bold('\n 🕵️‍♂️ checking for node_modules in:'))
  shell.exec('pwd')
  shell.exec('find . -name "node_modules" -type d -prune -print | xargs du -chs')
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Do you want to cleanup (delete) these node_modules?',
        choices: [
          'Yes, delete them please',
          'No, not now',
        ]
      }
    ])
    .then((answers: Answers) => {
      const { choice } = answers;
      if (choice === 'Yes, delete them please') {
        cleanUpModules();
      } else {
        console.log(chalk.green('\n Okay then bye, bye!'));
        return;
      }
    });
}
