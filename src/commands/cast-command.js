import { Command } from './command';

export class CastCommand extends Command {
  constructor(id, nbTime) {
    super();
    this.command = `CAST ${id}` + (nbTime ? ` ${nbTime}` : '');
  }
}
