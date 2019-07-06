import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image
} from "react-native";
import { Header, Left, Icon, Body } from "native-base";
import { getDeck } from "../functions";
import { Actions } from "react-native-router-flux";
import SolidButton from "./comp/SolidButton";
import { lighterGray, lightBlue, lightGreen, Background, Foreground, lightGray, gray } from "./comp/colors";

export default class Deck extends Component {
  state = {
    deck: undefined,
    opacity: new Animated.Value(0)
  };

  async componentDidMount() {
    const deck = await getDeck(this.props.id);
    await this.setState({ deck });
    const { opacity } = this.state;
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start();
  }

  render() {
    const { deck } = this.state;
    const { opacity } = this.state;
    return (
      <Animated.View style={[styles.container,{ opacity }]}>
        
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

        {deck !== undefined ? (
          <View style={{flex: 8, alignContent: 'center', justifyContent: 'center', alignItems:"center"}}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.subtitle}>
              {deck.questions.length + " Cards"}
            </Text>
            <SolidButton pressed={() => Actions.newQuest({ title: deck.title, edit: true})} buttonText='Add Card' color={lightBlue}/>
            <SolidButton pressed={() => Actions.quiz({ id: deck.title })} buttonText='Start Quizz' color={lightGreen} />
            

          
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.title}>Sem Dados</Text>
          </View>
        )}
      </Animated.View>
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
  subtitle: {
    color: lighterGray
  }
});
