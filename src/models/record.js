import {makeHashId} from '../functions/helper'

export default class Game {
    constructor  (P='')  {
        this.id             = makeHashId(6);
        this.date           = new Date();
        this.points         = null;
    }
}

Game.prototype.setGame = (id,d,p) => {
    this.id         = id;
    this.date       = d;
    this.points     = p;
}