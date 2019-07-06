import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import { getDecks } from "../functions";
import SolidButton from "./comp/SolidButton";
import {Foreground, Background, white, lightBlue, lighterGray} from './comp/colors'
import gradient from '../../assets/gradient.png'


export default class Standard extends Component {
  state = {
    decks: undefined
  };

  async componentDidMount() {
    const decks = await getDecks();
    await this.setState({ decks });
  }

  render() {
    const { decks } = this.state;
    
    return (
          <View style={styles.fullScreen}>
            <ScrollView style={styles.scroll}>
              <View style={styles.container}>
                
                {decks !== undefined &&
                  decks !== null &&
                  decks.map(deck => (
                      
                        <TouchableOpacity
                          style={styles.viewCard}
                          key={deck.title}
                          onPress={() => Actions.deck({ id: deck.title })}
                        >
                          <ImageBackground source={gradient} style={{width: '100%', height: '100%'}}>
                            <View style={styles.info}>
                              <Text style={styles.txtBtn}>{deck.title}</Text>
                              <Text style={styles.txtCard}>
                                {deck.questions.length + " Cards"}
                              </Text>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                    
                  ))}
              </View>
              
            </ScrollView>
            <SolidButton pressed={() => Actions.newDeck()} buttonText='New Deck'/>
          </View>
            
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: Foreground,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  scroll: {
    flex: 5,
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    overflow: 'hidden'
  },
  viewCard: {
    width: 340,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 5,
    borderColor: white,
    marginVertical: 5
  },
  info: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: Foreground,
    opacity: .7,
    paddingHorizontal:20,
    paddingVertical: 20,
    marginTop:100
    
},
  txtBtn: {
    fontSize: 30,
    color: lightBlue,
  },
  txtCard: {
    color: lighterGray,
    fontSize: 14
  },
  bottomGradient: {

  }
});
