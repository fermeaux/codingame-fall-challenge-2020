import { Command } from './command';

export class BrewCommand extends Command {
  constructor(id) {
    super();
    this.command = `BREW ${id}`;
  }
}
