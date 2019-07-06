import { combineReducers } from 'redux';
import {makeHashID} from '../functions/helper';
import { 
        NEW_DECK,
        GET_DECKS,
        GET_DECK, 
        EDIT_DECK, 
        DELETE_DECK, 
        FAVORITE_DECK, 
        ADD_CARD,
        DELETE_CARD,
        EDIT_CARD
      } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { decks: [], cards: [], deck: {}, loading:true };

const deck = (state= dataState, action) =>{
    console.log('deck reducer: passou aqui')
    switch (action.type){
        case NEW_DECK:
            return{
                id:             action.id,
                title:          action.title,
                description:    action.description,
                createdAt:      new Date,
                favorite:       false,
                cards:          [],
                records:        []
            }

        // case GET_DECK:
        //     return action.deck

        // case EDIT_DECK:
        //     if (state.id !== action.id){
        //         return state;
        //     }
        //     return {
        //        ...state,
        //        title:           action.title,
        //        description:     action.description
        //     }

        // case FAVORITE_DECK:
        //     return{
        //         ...state,
        //         favorite: !state.favorite
        //     }

        // case ADD_CARD:
        //     if(state.id !== action.deckId){
        //         return state;
        //     }
        //     return {
        //         ...state,
        //         cards: state.cards.push(action.card.id)
        //     }

        // case DELETE_CARD:
        //     if(state.id !== action.deckId){
        //         return state;
        //     }
        //     return{
        //         ...state,
        //         cards: state.cards.filter(c => c !== action.id)
        //     }

        default:
            return state
    }
}
const decks = (state = dataState, action) => {
    console.log('decks reducer: passou aqui')
    switch (action.type) {
        case NEW_DECK:
            return [...decks, deck(undefined, action)]

        // case GET_DECKS:
        //     return {...state,decks: action.decks, loading:false };

        // case EDIT_DECK:
        //     return state.map(d => deck(d, action))
            
        // case DELETE_DECK:
        //     return state.map(d => {
        //         if(d.id !== action.id){
        //             return d
        //         }
        //     })
        
        // case FAVORITE_DECK:
        //     return state.map(d => deck(d, action))
        
        // case ADD_CARD:
        //     return state.map(d => deck(d, action))
        
        // case DELETE_CARD:
        //         return state.map(d => deck(d, action))
                       
        default:
            return state;
    }
};

// const card = (state = dataState, action) => {
//     switch(action.type) {
//         case ADD_CARD:
//             return{
//                 id: makeHashID(6),
//                 question: action.question,
//                 answer: action.answer,
//                 challenge: action.challenge
//             }
//         case EDIT_CARD:
//                 if (state.id !== action.id){
//                     return state;
//                 }
//                 return {
//                    ...state,
//                    question:       action.question,
//                    answer:         action.answer,
//                    challenge: action.challenge
//                 }
//         default:
//             return state;
//     }
// }
// const cards = (state = dataState, action) => {
//     switch (action.type) {
//         case ADD_CARD:
//             return [...state, card(undefined, action)];

//         case GET_CARDS:
//             return {
//                     ...state,
//                     cards: action.cards
//                     };

//         case DELETE_CARD:
//             return state.map(c => {
//                 if(c.id !== action.id){
//                     return c
//                 }
//             })
        
//         case EDIT_CARD:
//             return state.map(c => card(c, action))
//         default:
//             return state;
//     }
// }

function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

const rootReducer = combineReducers({
    // card,
    decks,
    deck,
    // cards,
    
})

export default rootReducer;