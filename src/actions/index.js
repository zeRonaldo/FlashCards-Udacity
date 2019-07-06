export const NEW_DECK               = 'NEW_DECK'
export const GET_DECKS              = 'GET_DECKS'
export const GET_DECK               = 'GET_DECK'
export const EDIT_DECK              = 'EDIT_DECK'
export const DELETE_DECK            = 'DELETE_DECK'
export const FAVORITE_DECK          = 'FAVORITE_DECK'
export const ADD_CARD               = 'ADD_CARD'
export const DELETE_CARD            = 'DELETE_CARD'
export const EDIT_CARD              = 'EDIT_CARD'
export const GET_CARDS              = 'GET_CARDS'

import {AsyncStorage} from 'react-native'


//>>> DECK
export function newDeck(title,description){
    return (dispatch) => {
        makeHashID(4).then(res => {
            return {
                type:   NEW_DECK,
                id:     res,
                title:  title,
                description: description
            }
        }
        )
    }
    // console.log('hello new deck:', idHash)
    // return {
    //         type: NEW_DECK, 
    //         id: idHash, 
    //         title:title, 
    //         description:description
    //     };
        
        // AsyncStorage.getItem('Decks', (err, decks) => {
        //     if (decks !== null){
        //         decks = JSON.parse(decks);
        //         let deck = new Deck(title, description);
        //         decks.unshift(deck);
        //         AsyncStorage.setItem('Decks', JSON.stringify(decks), () => {
        //             dispatch({type: NEW_DECK, deck: deck});
        //         });
        //     }
        // });
};

export function getDecks(){
    // return (dispatch) => {
    //     AsyncStorage.getItem('Decks', (err, decks) => {
    //         if (decks !== null){
    //             dispatch({type: GET_DECKS, decks: JSON.parse(decks)});
    //         }
    //     });
    // };
}

export function editDeck(title, description, id){
    return {}
    return (dispatch) => {
        AsyncStorage.getItem('Decks', (err, decks) => {
            if (decks !== null){
                decks = JSON.parse(decks);
                 
                let oldValue = fetchDeckFromStorage(decks, id); 
                if(!oldValue.isEmpty()){
                    let index = getIndex(decks, id);
                    oldValue.editDeck(title,description);
                    decks.splice(index, 1, oldValue)
                }
                AsyncStorage.setItem('Decks', JSON.stringify(decks), () => {
                    dispatch({type: EDIT_DECK, deck:deck});
                });
            }
        });
    };
}

export function deleteDeck(id){
    return (dispatch) => {
        AsyncStorage.getItem('Decks', (err, decks) => {
            if (decks !== null){
                decks = JSON.parse(decks);

                let index = getIndex(decks, id); 
                if(index !== -1) decks.splice(index, 1);
                AsyncStorage.setItem('Decks', JSON.stringify(decks), () => {
                    dispatch({type: DELETE_DECK, id:id});
                });
            }
        });
    };
}

export function toggleFavorite(id){
    return (dispatch) => {
        AsyncStorage.getItem('Decks', (err, decks) => {
            if(decks !== null){
                decks= JSON.parse(decks);
                let deck = fetchDeckFromStorage(decks, id);

                if(!deck.isEmpty()){
                    let index = getIndex(decks, id); 
                    deck.toggleFavorite()
                    decks.splice(index, 1, deck)
                    AsyncStorage.setItem('Decks', JSON.stringify(decks), () => {
                        dispatch({type: FAVORITE_DECK, deck:deck});
                    });

                }
            }
        })
    }
}

export function addCardToDeck(id, cardId){
    return (dispatch) => {
        AsyncStorage.getItem('Decks', (err, decks) => {
            if(decks !== null){
                decks= JSON.parse(decks);
                let deck = fetchDeckFromStorage(decks, id);
                if(!deck.isEmpty()){
                    let index = getIndex(decks, id); 
                    deck.pushCard(cardId)
                    decks.splice(index, 1, deck)
                    AsyncStorage.setItem('Decks', JSON.stringify(decks), () => {
                        dispatch({type: ADD_CARD_TO_DECK, deck:deck});
                    });
                }
            }
        })
    }
}


export function removeCardFromDeck(id, cardId){
    return (dispatch) => {
        AsyncStorage.getItem('Decks', (err, decks) => {
            if(decks !== null){
                decks= JSON.parse(decks);
                let deck = fetchDeckFromStorage(decks, id);
                if(!deck.isEmpty()){
                    let index = getIndex(decks, id); 
                    deck.popCard(cardId)
                    decks.splice(index, 1, deck)
                    AsyncStorage.setItem('Decks', JSON.stringify(decks), () => {
                        dispatch({type: REMOVE_CARD_FROM_DECK, deck:deck});
                    });
                }
            }
        })
    }
}

//>>> Card
export function addCard({question , answer, challenge, deckId}){
    return (dispatch) => {
        AsyncStorage.getItem('Cards', (err, cards) => {
            if (cards !== null){
                let storage = JSON.parse(cards);
                let card = new Card(question, answer, challenge);
                
                storage.unshift(card);
                AsyncStorage.setItem('Cards', JSON.stringify(cards), () => {
                    dispatch({type: ADD_CARD, card: card});
                }).then( () => {
                    addCardToDeck(deckId,card.id);
                });
            }
        });
    };
}


export function getCards(){
    return (dispatch) => {
        AsyncStorage.getItem('Cards', (err, cards) => {
            if (cards !== null){
                dispatch({type: GET_CARDS, cards: JSON.parse(cards)});
            }
        });
    };
}

export function getCardsByDeck(deckId){
    return (dispatch) => {
        AsyncStorage.getItem('Cards', (err, cards) => {
            
        })
    }
}
//>>> SUPPORTING FUNCTIONS
function fetchDeckFromStorage(decks, id) {
    let storage = decks[getIndex(decks, id)];
    storage = JSON.parse(storage);
    let deck = new Deck();
    if (index !== -1) {
        deck.setDeck(storage.id,storage.title,storage.description, storage.createdAt, storage.lastUse,storage.cards, storage.favorite);
    }
    return deck
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

function makeHashId(length) {
    (+new Date).toString(36).slice(-length);
 }
 