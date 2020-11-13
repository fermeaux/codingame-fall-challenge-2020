class Action {
  constructor(inputs) {
    this.id = parseInt(inputs[0]); // the unique ID of this spell or recipe
    this.type = inputs[1]; // in the first league: BREW; later: CAST, OPPONENT_CAST, LEARN, BREW
    this.deltas = [
      parseInt(inputs[2]),
      parseInt(inputs[3]),
      parseInt(inputs[4]),
      parseInt(inputs[5]),
    ];
  }

  parse() {}

  apply() {}
}

class Spell extends Action {
  constructor(inputs) {
    super(inputs);
    this.tomeIndex = parseInt(inputs[7]); // in the first two leagues: always 0; later: the index in the tome if this is a tome spell, equal to the read-ahead tax
    this.taxCount = parseInt(inputs[8]); // in the first two leagues: always 0; later: the amount of taxed tier-0 ingredients you gain from learning this spell
    this.castable = inputs[9] !== '0'; // in the first league: always 0; later: 1 if this is a castable player spell
    this.repeatable = inputs[10] !== '0'; // for the first two leagues: always 0; later: 1 if this is a repeatable player spell
  }

  parse(player) {
    super.parse();
    this.nbRupees = this.deltas.reduce((prev, current) => {
      return prev + current;
    }, 0);
    this.playable =
      this.isPlayableBy(player) &&
      this.castable &&
      player.nbRupees + this.nbRupees <= 10;
  }

  apply() {
    super.apply();
    if (this.type === 'CAST') new CastCommand(this.id).apply();
  }

  isUsefull(recipe) {
    let firstPositiveValue = this.deltas.reduce((prev, current, index) => {
      return prev < 0 && current > 0 ? index : prev;
    }, -1);
    return (
      firstPositiveValue >= 0 && firstPositiveValue <= recipe.lastIndexMissing
    );
  }

  isNeeded(recipe) {
    let isNeeded = false;
    this.deltas.forEach((delta, index) => {
      if (delta > 0 && recipe.missing[index] < 0) {
        isNeeded = true;
      }
    });
    return isNeeded;
  }

  isPlayableBy(player) {
    return this.deltas.every((delta, index) => player.inv[index] + delta >= 0);
  }
}

class Recipe extends Action {
  constructor(inputs) {
    super(inputs);
    this.price = parseInt(inputs[6]); // the price in rupees if this is a potion
  }

  parse(me, you) {
    super.parse();
    this.playable = this.isPlayableBy(me);
    this.playableByYou = this.isPlayableBy(you);
    this.missing = this.deltas.map((delta, index) => me.inv[index] + delta);
    this.lastIndexMissing = this.missing.reduce((prev, current, index) => {
      return current < 0 ? index : prev;
    }, -1);
    this.nbRupees = this.deltas.reduce((prev, current) => {
      return prev - current;
    }, 0);
    this.score = this.price;
  }

  apply() {
    super.apply();
    new BrewCommand(this.id).apply();
  }

  isPlayableBy(player) {
    return this.deltas.every((delta, index) => player.inv[index] + delta >= 0);
  }
}

class Player {
  constructor(inputs, spells) {
    this.inv = [
      parseInt(inputs[0]),
      parseInt(inputs[1]),
      parseInt(inputs[2]),
      parseInt(inputs[3]),
    ];
    this.score = parseInt(inputs[4]); // amount of rupees
    this.spells = spells;
    this.nbRupees = this.inv.reduce((prev, current) => {
      return prev + current;
    }, 0);
  }

  parse() {
    this.spells.forEach((spell) => spell.parse(this));
  }
}

class Command {
  apply() {
    console.log(this.command);
  }
}

class WaitCommand extends Command {
  constructor() {
    super();
    this.command = 'WAIT';
  }
}

class BrewCommand extends Command {
  constructor(id) {
    super();
    this.command = `BREW ${id}`;
  }
}

class CastCommand extends Command {
  constructor(id) {
    super();
    this.command = `CAST ${id}`;
  }
}

class RestCommand extends Command {
  constructor() {
    super();
    this.command = 'REST';
  }
}

class ActionFactory {
  constructor() {}

  static create(inputs) {
    const type = inputs[1];
    if (type === 'CAST' || type === 'OPPONENT_CAST' || type === 'LEARN')
      return new Spell(inputs);
    else if (type === 'BREW') return new Recipe(inputs);
    return { type };
  }
}

class Main {
  constructor() {}

  getInputs() {
    const actionCount = parseInt(readline()); // the number of spells and recipes in play
    this.recipes = [];
    const mySpells = [];
    const yourSpells = [];
    this.shop = [];
    for (let i = 0; i < actionCount; i++) {
      const inputs = readline().split(' ');
      const action = ActionFactory.create(inputs);
      if (action.type === 'BREW') this.recipes.push(action);
      else if (action.type === 'CAST') mySpells.push(action);
      else if (action.type === 'OPPONENT_CAST') yourSpells.push(action);
      else if (action.type === 'LEARN') this.shop.push(action);
      else console.error('Action is not managed');
    }
    this.me = new Player(readline().split(' '), mySpells);
    this.you = new Player(readline().split(' '), yourSpells);
  }

  parse() {
    this.me.parse();
    this.you.parse();
    this.recipes.forEach((recipe) => {
      recipe.parse(this.me, this.you);
    });
  }

  process() {
    this.processRecipe();
    if (this.selectedAction) return;
    this.processSpell();
    if (this.selectedAction) return;
  }

  processRecipe() {
    this.selectedAction = null;
    this.targetRecipe = null;
    this.recipes.forEach((recipe) => {
      if (
        recipe.playable &&
        (!this.selectedAction || recipe.price > this.selectedAction.price)
      ) {
        this.selectedAction = recipe;
      }
      if (!this.targetRecipe || this.targetRecipe.score > recipe.score) {
        this.targetRecipe = recipe;
      }
    });
  }

  processSpell() {
    this.me.spells.forEach((spell) => {
      console.error('spell', spell.isUsefull(this.targetRecipe));
      if (
        spell.playable &&
        spell.isUsefull(this.targetRecipe) &&
        (!this.selectedAction || spell.isNeeded(this.targetRecipe))
      ) {
        this.selectedAction = spell;
      }
    });
  }

  apply() {
    if (!this.selectedAction) return new RestCommand().apply();
    this.selectedAction.apply();
  }

  log() {
    console.error('me', this.me, 'actions', this.recipes);
  }
}

while (true) {
  const main = new Main();
  main.getInputs();
  main.parse();
  main.process();
  main.apply();
}
