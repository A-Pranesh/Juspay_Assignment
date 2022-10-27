import React from "react";
import {View, Image, TouchableOpacity, Text} from 'react-native'
import EventEmitter from "react-native-eventemitter";

const GLOBAL = require("../constans/GLOBAL.js");
 
export default class BackgroundSelect extends React.Component {

    backgroundSelected = (background) => {
        GLOBAL.BACKGROUND_IMAGE = background
        EventEmitter.emit("UPDATE_BACKGROUND")
        this.props.navigation.pop()
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity style={{marginTop: 150}} onPress={()=>{this.backgroundSelected("background1")}}>
                        <Image source={require('../../asset/images/background1.jpeg')} style={{height: 100, width: 100, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 150}} onPress={()=>{this.backgroundSelected("background2")}}>
                        <Image source={require('../../asset/images/background2.webp')} style={{height: 100, width: 100, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 150}} onPress={()=>{this.backgroundSelected("background3")}}>
                        <Image source={require('../../asset/images/background3.jpeg')} style={{height: 100, width: 100, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}