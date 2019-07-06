import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import { lighterGray, lightBlue, Background, Foreground, lightGray, gray, white, red, lightGreen } from "./comp/colors";
import { Icon, Left, Right } from "native-base";
import { getDeck } from "../functions";
import cardque from '../../assets/cardque.png'
import cardans from '../../assets/cardans.png'

export default class Game extends Component {
    state = {
        hit: 0,
        isAnswer: false,
        prg: 0,
        deck: undefined
      };
    
       async componentDidMount () {
        await getDeck(this.props.id).then(  deck => {
             this.setState({ deck });
        })
      }
      
      componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
        this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
        })
      }

      async nextQuestion(answer) {
        const { hit, prg, deck } = this.state;
        this.setState({
          isAnswer: false
        });
        await this.setState({
          hit: answer ? hit + 1 : hit
        });
    
        if (this.state.prg + 1 >= deck.questions.length) {
          Actions.results({
            tot: deck.questions.length,
            hit: this.state.hit,
            title: this.props.id
          });
        } else {
          this.setState({
            prg: prg + 1
          });
        }
      }

      goBack = () => {
          const {deck} = this.state
          Actions.deck({ id: deck.title });
      }

      flipCard() {
            this.setState({ isAnswer: true })
            if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
            } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
            }
      }

  render() {
    const { deck, prg, isAnswer } = this.state;

    const frontAnimatedStyle = {
        transform: [
          { rotateX: this.frontInterpolate}
        ]
    }
    const backAnimatedStyle = {
        transform: [
          { rotateX: this.backInterpolate }
        ]
    }


    return (
      <View style={styles.container}>
        <View style={{flex: .8}}>
          <Left style={styles.left}>
            <Icon
              type="SimpleLineIcons"
              name="close"
              style={[styles.icon]}
              onPress={() => this.goBack()}
            />
             <Text style={[styles.icon, {fontSize: 30}]}>
                1/1
                {/* {(prg + 1) + "/" + deck.questions.length} */}
            </Text>
          </Left>
        </View>
        
        <View style={{flex:7, alignContent: 'center', justifyContent: 'center', alignItems:"center"}}>
            <View style={styles.cardContainer}>
                <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <ImageBackground source={cardque} style={{width: '100%', height: '100%'}}>
                            <TouchableOpacity onPress={() => this.flipCard()} style={styles.cardContent} >
                                <Text style={styles.cardText}>
                                    {/* {deck.questions[prg].question} */}Question
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </Animated.View>

                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <ImageBackground source={cardans} style={{width: '100%', height: '100%'}}>
                        <TouchableOpacity onPress={() => this.flipCard()} style={styles.cardContent}>
                            <Text style={styles.cardText}>
                                {/* {deck.questions[prg].answer} */}answer
                            </Text>
                        </TouchableOpacity>
                        </ImageBackground>
                    </Animated.View>
                </View>
            </View>
        </View>
        
        <View style={{flex: 2}}>
          {!isAnswer ? (
                <View>
                    <TouchableOpacity style={styles.fab} onPress={() => this.flipCard()}>
                        <Icon
                            type="SimpleLineIcons"
                            name="refresh"
                            style={styles.fabIcon}
                        />
                    </TouchableOpacity>
                </View>
          ):(
              <View style={styles.fabContainer}> 
                    <TouchableOpacity style={[styles.fab, {backgroundColor: red}]} onPress={() => this.nextQuestion(false)}>
                        <Icon
                            type="Feather"
                            name="x"
                            style={styles.fabIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.fab, {backgroundColor: lightGreen}]} onPress={() => this.nextQuestion(true)}>
                        <Icon
                            type="Feather"
                            name="check"
                            style={styles.fabIcon}
                        />
                    </TouchableOpacity>
              </View>
          )}
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
    backgroundColor: Foreground,
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
    justifyContent:"space-between",
    paddingHorizontal: 10,
    backgroundColor: Foreground,
    width: '100%',
    height: 20
  },
  icon: { margin: 5, color: lightBlue },
  fab: {
      backgroundColor: lightBlue,
      width: 90,
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,

  },
  fabIcon: {
    color: white, 
    fontSize: 60,
    textShadowColor: lightGray,
    textShadowOffset: {
        width: 0,
        height: 1,
    },
    textShadowRadius: 4
  },
  fabContainer: {
      flexDirection: "row",
      alignContent: 'center',
      justifyContent: 'space-evenly'
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 340,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    marginVertical: -10,
    borderRadius: 15,
    borderWidth: 7,
    borderColor: white,
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
  },
  cardContent: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 40,
    padding: 10,
    backgroundColor: white,
    textAlign:'center',
    width: '100%',
    color: Background,
    textShadowColor: lightGray,
    textShadowOffset: {
        width: 0,
        height: 1,
    },
    textShadowRadius: 1
  }
});
