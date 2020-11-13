import { Command } from './command';

export class LearnCommand extends Command {
  constructor(id) {
    super();
    this.command = `LEARN ${id}`;
  }
}
