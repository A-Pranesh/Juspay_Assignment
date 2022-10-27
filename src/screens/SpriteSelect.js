import React from "react";
import {View, Image, TouchableOpacity, Text} from 'react-native'
import EventEmitter from "react-native-eventemitter";

const GLOBAL = require("../constans/GLOBAL.js");

export default class SpriteSelect extends React.Component {

    spriteSelected = (sprite) => {
        GLOBAL.SPRITE_IMAGE = sprite
        EventEmitter.emit("UPDATE_SPRITE")
        this.props.navigation.pop()
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity style={{marginTop: 150}} onPress={()=>{this.spriteSelected("cat")}}>
                        <Image source={require('../../asset/images/cat.png')} style={{height: 100, width: 100, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 150}} onPress={()=>{this.spriteSelected("dog")}}>
                        <Image source={require('../../asset/images/dog.png')} style={{height: 100, width: 100, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 150}} onPress={()=>{this.spriteSelected("elephant")}}>
                        <Image source={require('../../asset/images/elephant.png')} style={{height: 100, width: 100, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}