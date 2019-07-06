import React, { Component } from "react";

import { setLocalNotification } from "./src/functions";

import { Root, Container, Text } from "native-base";
import { Constants } from 'expo';

import { Router, Scene } from "react-native-router-flux";
import { StyleSheet } from "react-native";

import Deck from "./src/components/deck";
import NewDeck from "./src/components/newDeck";
import NewQuest from "./src/components/newQuest";
import AfterMatch from "./src/components/afterMatch";
import Standard from "./src/components";
import Game from "./src/components/game";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers';
import middleware from './src/middlewares';
import { Foreground } from './src/components/comp/colors'


export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer,)}>
      <Container style={styles.container}>
        <Root>
          <Router>
            <Scene key="root">
              <Scene
                key="standard"
                component={Standard}
                hideNavBar
                direction="horizontal"
                initial
                panHandlers={null}
              />
              <Scene
                key="deck"
                component={Deck}
                hideNavBar
                direction="vertical"
              />
              <Scene
                key="quiz"
                component={Game}
                hideNavBar
                direction="vertical"
                panHandlers={null}
              />
              <Scene
                key="results"
                component={AfterMatch}
                hideNavBar
                direction="vertical"
                panHandlers={null}
              />
              <Scene
                key="newDeck"
                component={NewDeck}
                hideNavBar
                direction="horizontal"
              />
              <Scene
                key="newQuest"
                component={NewQuest}
                hideNavBar
                direction="horizontal"
              />
            </Scene>
          </Router>
        </Root>
      </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Foreground
  }
});
