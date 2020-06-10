import {Command, flags} from '@oclif/command';
import * as chalk from 'chalk';

import { promptCleanUp, cleanUpModules } from './utils';

class NodeCleanup extends Command {
  static description = chalk.green('\n view the amount of storage taken up by node_modules in your project directories and have the option to remove them in one command');

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    clean: flags.boolean({ char: 'c' }),
    force: flags.boolean({ char: 'f' }),
  }

  async run() {
    const { flags } = this.parse(NodeCleanup);
    const { clean } = flags;

    if (!clean) {
      promptCleanUp();
    } else {
      cleanUpModules();
    }
  }
}

export = NodeCleanup
