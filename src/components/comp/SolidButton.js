import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { white, lightBlue } from './colors';


export default class SolidButton extends Component{
    constructor (props) {
        super(props);
        this.state = {
            text : '',
            style_input : {},
            color: this.props.color
        }
    }

   

    render(){
        const {style_input, color} = this.state;
        let btnColor ;

        if (typeof color !== 'undefined'){
            btnColor = {backgroundColor : color}
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, btnColor ]} onPress={()=> this.props.pressed()}>
                    <Text style={styles.buttonText}>{this.props.buttonText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        

        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        width: '70%',
        height: 45,
        margin: 15,
        borderRadius: 25,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: lightBlue,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: white,
        fontWeight: 'bold',
        fontSize: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 2,
    }

  })