import {makeHashId} from '../functions/helper'

export default class Card {

    constructor  (Q, A, C)  {
        this.id         = makeHashId(8); 
        this.question   = Q;
        this.answer     = A;
        this.challenge  = C;
        
    }
}

Card.prototype.setBestTime = (time) => {
        this.bestTime   = time;
}

Card.prototype.setCard = (id, Q, A, C, BT) =>{
        this.id         = id; 
        this.question   = Q;
        this.answer     = A;
        this.challenge  = C;
        this.bestTime   = BT;
        return this;
}

Card.prototype.editCard = (Q, A, C) => {
    this.question   = Q;
    this.answer     = A;
    this.challenge  = C;
}