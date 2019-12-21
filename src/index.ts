import {Command, flags} from '@oclif/command'
import * as shell from 'shelljs'
import * as chalk from 'chalk'

class NodeCleanup extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    clean: flags.boolean({char: 'c'}),
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(NodeCleanup)

    const {clean} = flags

    if (!clean) {
      shell.exec(`pwd && find . -name "node_modules" -type d -prune -print | xargs du -chs`)
    } else {
      shell.exec("pwd && find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \+")
      console.log(chalk.green(`
Alrighty then all clean! 🚀
      `))
    }
  }
}

export = NodeCleanup
