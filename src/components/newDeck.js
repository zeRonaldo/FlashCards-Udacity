import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Animated,
  Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import SolidButton from "./comp/SolidButton";
import { lighterGray, lightBlue, Background, Foreground, lightGray, gray } from "./comp/colors";
import { Icon, Left } from "native-base";
import { newDeck } from "../actions/test";
import { withFormik } from 'formik';

class NewDeck extends Component {
  state = {
    title: '',
    description: ''
  };
  
  onBlur = () => {
   this.setState({ ...this.state, style_input: {} });
  }

  onFocus = () =>{
    this.setState({ ...this.state, style_input:  styles.textInput_onFocus });
  }

  onInputChange = (e, f) => {
    this.setState({
      [f]: e.value
   });
  }

  onSubmitForm = () =>{
    const {title, description} = this.state;

    newDeck(title, description);
    Actions.newQuest({title: title});
  }

  render() {
    const { title,description, style_input } = this.state;
    const {setFieldValue, handleSubmit, values} = this.props;

    return (
      <View style={styles.container}>
        <View style={{flex: .8}}>
          <Left style={styles.left}>
            <Icon
              type="SimpleLineIcons"
              name="arrow-left"
              style={styles.icon}
              onPress={() => Actions.pop()}
            />
          </Left>
        </View>
        
        <View style={{flex:5, alignContent: 'center', justifyContent: 'center', alignItems:"center"}}>
            <Text style={styles.title}>Create a New Deck</Text>
            <Text   style={{color:lighterGray}}> Add a name for your Deck, it may be the subject or theme of the quizz</Text>
            <TextInput
              placeholder="Deck Title"
              style={[ styles.textInput , style_input]}
              onChangeText={ text => setFieldValue('title', text)}
              value={values.title}
              
            />
            <TextInput
              placeholder="Description"
              style={[ styles.textInput , style_input]}
              onChangeText={ text => setFieldValue('description', text)}
              value={values.description}
              onFocus={() => this.onFocus()} 
              onBlur={() => this.onBlur()}
            />
        </View>
        
        <View style={{flex: 1}}>
         
              <SolidButton  pressed={handleSubmit} buttonText='Create Deck' color={lightBlue}/>
            
        </View>
        
      </View>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({ title: '', description: '' }),

  handleSubmit: (values) => {
    console.log(values);
    newDeck(values.title, values.description)
  }
})(NewDeck);




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
