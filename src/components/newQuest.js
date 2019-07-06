import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { saveDeckTitle } from "../functions";
import { Actions } from "react-native-router-flux";
import { Body, Header, Left, Icon, Title } from "native-base";
import SolidButton from "./comp/SolidButton";
import { lighterGray, lightBlue, Background, Foreground, lightGray, gray } from "./comp/colors";

export default class NewQuest extends Component {
  state = {
    question: "",
    answer: ""
  };

  async recordDeck() {
    const newDeck = {
      title: this.props.title,
      questions: [
        {
          question: this.state.question,
          answer: this.state.answer
        }
      ]
    };

    await saveDeckTitle(newDeck, this.props.edit);
    await Actions.deck({ id: this.props.title });
  }

  onBlur = () => {
    const state = { ...this.state };
    state.style_input = {};

    this.setState(state);
  }
  onFocus = () =>{
    const state = { ...this.state };
    state.style_input = styles.textInput_onFocus;

    this.setState(state);
  }

  render() {
    const { title } = this.props;
    const { question, answer, style_input } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={{flex: .8}}>
          <Left style={styles.left}>
            <Icon
              type="SimpleLineIcons"
              name="arrow-left"
              style={styles.icon}
              onPress={() => Actions.standard()}
            />
          </Left>
        </View>

        <View style={{flex: 8, alignContent: 'center', justifyContent: 'center', alignItems:"center"}}>
          <Text style={[styles.title, {fontSize:30}]}>New Quest</Text>
          <Text style={{color:lighterGray}}>Create cards for your <Text style={{color:lightBlue}}>{title}</Text> deck</Text>

          <TextInput
            style={[ styles.textInput , style_input]}
            placeholder="Question"
            value={this.state.question}
            onChangeText={evt => this.setState({ question: evt })}
            onFocus={() => this.onFocus()} 
            onBlur={() => this.onBlur()}
          />
          <TextInput
            style={[ styles.textInput , style_input]}
            value={this.state.answer}
            placeholder="Answer"
            onChangeText={evt => this.setState({ answer: evt })}
            onFocus={() => this.onFocus()} 
            onBlur={() => this.onBlur()}
          />
        </View>
        <View style={{flex: 1}}>
          {title !== '' ? 
              <SolidButton  pressed={() => this.recordDeck()} buttonText='Add Card' color={lightBlue}/>
            : 
              <SolidButton   pressed={() => console.log('not really')}buttonText='Add Card' color={lighterGray}/>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    backgroundColor: Background,
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    color: lightBlue,
    paddingVertical: 15,
    textShadowColor: Foreground,
    textShadowOffset: {
        width: 0,
        height: 2,
    },
    textShadowRadius: 5

  },
  txtBtn: {
    fontSize: 27
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 3,
    width: "80%"
  },
  textInput: {
    width: '90%',
    paddingLeft: '5%',
    height: 40,
    marginVertical: 25,
    borderRadius: 25,
    backgroundColor: lightGray,
    color: Background,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textInput_onFocus: {
    backgroundColor: lighterGray,
    color: gray,
    height: 40,
    padding: 0
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    paddingLeft: 10,
    backgroundColor: Foreground,
    width: '100%',
    height: 20
  },
  icon: { margin: 5, color: lightBlue },
});
