import { AsyncStorage } from 'react-native'

const createDeck = async (deck) => {
    const newDeck = Deck(deck.title, deck.description);

    try {
        await AsyncStorage.setItem('DECK', JSON.stringify(newDeck));
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
}

const editDeck = async (deck) => {
    const newDeck = deck
}