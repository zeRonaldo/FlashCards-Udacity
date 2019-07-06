import {makeHashId} from '../functions/helper'

export default class Deck {

    constructor  (N='', D='')  {
        this.id             = makeHashId(6);
        this.title          = N;
        this.description    = D;
        this.createdAt      = new Date();
        this.lastUse        = null;
        this.cards          = [];
        this.favorite       = false;
        this.records        = [];
    }
}

Deck.prototype.setLastUse = (time) => {
        this.lastUse   = time;
}

Deck.prototype.setDeck = (id,n,d,ca,lu,c,f) =>{
        this.id         = id;
        this.title      = n;
        this.description = d;
        this.createdAt = ca;
        this.lastUse = lu;
        this.cards = c;
        this.favorite = f;
        return this;
}
Deck.prototype.editDeck = (title,description) => {
        this.title = title
        this.description = description
}

Deck.prototype.pushCard = (id) => {
    this.cards = this.cards.push(id)
}

Deck.prototype.popCard = (exc) => {
    this.cards = this.cards.filter( card => card.id !== exc.id)
}

Deck.prototype.pushRecord = (record) =>{
    if (this.records.length < 5){
        this.records.length.push(record);
        this.records.sort((reca, recb) => reca.points > recb.points ? 1: -1);
    } else{
        let index = 0
        let last = 0
        for(rec in this.records){
            if (rec.points < record.points && last === 0){
                this.records.unshift(record)
            }else if (rec.points < record.points){
                if(last.points > record.points){
                    this.records.splice(index, 1, record);
                }
            }
            else{
                index ++
                last = rec
            }
        }
        this.records.pop()
        return true
    }  
}

Deck.prototype.toggleFavorite = () => {
    this.favorite = !this.favorite
}

Deck.prototype.isEmpty = () =>{
    if(this.title ===''){
        return true
    }
    return false
}