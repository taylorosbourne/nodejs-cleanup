import {Command, flags} from '@oclif/command'
import * as shell from 'shelljs'
import * as chalk from 'chalk'

const inquirer = require('inquirer')

class NodeCleanup extends Command {
  static description = chalk.green('\n view the amount of storage taken up by node_modules in your project directories and have the option to remove them in one command')

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    clean: flags.boolean({char: 'c'}),
    force: flags.boolean({char: 'f'}),
  }

  async run() {
    const {flags} = this.parse(NodeCleanup)

    const {clean} = flags

    type Answers = {
      theme: string
    }

    const cleanUpModules = () => {
      console.log('\n ')
      shell.exec('pwd')
      console.log('\n ')
      shell.exec('find . -name "node_modules" -type d -prune -print -exec rm -rf "{}" \+')
      console.log('\n ')
      console.log(chalk.green('Alrighty then all clean! 🚀'))
      console.log('\n ')
    }

    if (!clean) {
      console.log('\n ')
      console.log(chalk.white.bold('🕵️‍♂️ checking for node_modules in:'))
      shell.exec('pwd')
      console.log('\n ')
      shell.exec('find . -name "node_modules" -type d -prune -print | xargs du -chs')
      console.log('\n ')
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'theme',
            message: 'Do you want to cleanup (delete) these node_modules?',
            choices: [
              'Yes, delete them please',
              'No, not now'
            ]
          }
        ])
        .then((answers: Answers) => {
          const { theme } = answers;
          if (theme === 'Yes, delete them please') {
            cleanUpModules()
          } else {
            console.log(chalk.green('\n Okay then bye, bye!'))
            return
          }
        })
    } else {
      cleanUpModules()
    }
  }
}

export = NodeCleanup
