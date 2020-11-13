import { Command } from './command';

export class WaitCommand extends Command {
  constructor() {
    super();
    this.command = 'WAIT';
  }
}
