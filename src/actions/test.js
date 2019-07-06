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

export async function newDeck(title, desc){
    let id = await (+new Date).toString(36).slice(-4)
    return {
        type:           NEW_DECK, 
        id:             id, 
        title:          title, 
        description:    desc
    };
}