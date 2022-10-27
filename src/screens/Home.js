import React from "react";
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Draggable from 'react-native-draggable';
import EventEmitter from "react-native-eventemitter";

const GLOBAL = require("../constans/GLOBAL.js");

export default class Home extends React.Component {

  state = {
    commandList: [
      {id: 1, firstCommand: "move", secondCommand: "steps", input: "10"},
      {id: 2, firstCommand: "turn", secondCommand: "degrees", input: "10"},
      {id: 4, firstCommand: "go to", secondCommand: "x", input: "10"},
      {id: 5, firstCommand: "go to", secondCommand: "y", input: "10"},
      {id: 7, firstCommand: "change x", secondCommand: "by", input: "10"},
      {id: 8, firstCommand: "change y", secondCommand: "by", input: "10"},
      {id: 9, firstCommand: "set x", secondCommand: "to", input: "10"},
      {id: 10, firstCommand: "set y", secondCommand: "to", input: "10"},
      {id: 11, firstCommand: "say", secondCommand: "for 3 seconds", input: "Hello"}
    ],
    selectedCommandList: [],
    x: 0,
    y: 50,
    transformDegree: 0,
    greetingsText: "",
    spriteType: "cat",
    backgroundImage: "background1",
    selectedSprites: ["cat"],
    catX: 0,
    catY: 50,
    dogX: 0,
    dogY: 50,
    elephantX: 0,
    elephantY: 50,
    transformCat: 0,
    transformDog: 0,
    transformElephant: 0
  }

  componentDidMount() {
    EventEmitter.on("UPDATE_SPRITE", ()=>{
      var selectedSprites = this.state.selectedSprites
      selectedSprites.push(GLOBAL.SPRITE_IMAGE)
      this.setState({selectedSprites: selectedSprites})
    })
    EventEmitter.on("UPDATE_BACKGROUND", ()=>{
      this.setState({backgroundImage: GLOBAL.BACKGROUND_IMAGE})
    })
  }

  commandListInputChange = (text, index) => {
    var commandList = this.state.commandList
    commandList[index].input = text
    this.setState({commandList: commandList})
  }

  selectedCommandListInputChange = (text, index) => {
    var selectedCommandList = this.state.selectedCommandList
    selectedCommandList[index].input = text
    this.setState({selectedCommandList: selectedCommandList})
  }

  onCommandSelect = (index) => {
    var commandList = this.state.commandList
    var selectedCommand = JSON.parse(JSON.stringify(commandList[index]))
    var selectedCommandList = this.state.selectedCommandList
    selectedCommandList.push(selectedCommand)
    this.setState({selectedCommandList: selectedCommandList})
  }

  executeCommand = () => {
    console.log(this.state.spriteType)
    this.state.selectedCommandList.forEach((item) => {
      if(item.firstCommand == "move") {
        if(this.state.spriteType == "cat") {
          this.setState({catX: this.state.catX + parseInt(item.input)})
        } else if(this.state.spriteType == "dog") {
          this.setState({dogX: this.state.dogX + parseInt(item.input)})
        } else {
          this.setState({elephantX: this.state.elephantX + parseInt(item.input)})
        }
      } else if(item.firstCommand == "turn") {
        if(this.state.spriteType == "cat") {
          this.setState({transformCat: this.state.transformCat + item.input})
        } else if(this.state.spriteType == "dog") {
          this.setState({transformDog: this.state.transformDog + item.input})
        } else {
          this.setState({transformElephant: this.state.transformElephant + item.input})
        }
      } else if(item.secondCommand == "x") {
        if(this.state.spriteType == "cat") {
          this.setState({catX: this.state.catX + parseInt(item.input)})
        } else if(this.state.spriteType == "dog") {
          this.setState({dogX: this.state.dogX + parseInt(item.input)})
        } else {
          this.setState({elephantX: this.state.elephantX + parseInt(item.input)})
        }
      } else if(item.secondCommand == "y") {
        if(this.state.spriteType == "cat") {
          this.setState({catY: this.state.catY + parseInt(item.input)})
        } else if(this.state.spriteType == "dog") {
          this.setState({dogY: this.state.dogY + parseInt(item.input)})
        } else {
          this.setState({elephantY: this.state.elephantY + parseInt(item.input)})
        }
      } else if(item.firstCommand == "change x" || item.firstCommand == "set x") {
        if(this.state.spriteType == "cat") {
          this.setState({catX: this.state.catX + parseInt(item.input)})
        } else if(this.state.spriteType == "dog") {
          this.setState({dogX: this.state.dogX + parseInt(item.input)})
        } else {
          this.setState({elephantX: this.state.elephantX + parseInt(item.input)})
        }
      } else if(item.firstCommand == "change y" || item.firstCommand == "set y") {
        if(this.state.spriteType == "cat") {
          this.setState({catY: this.state.catY + parseInt(item.input)})
        } else if(this.state.spriteType == "dog") {
          this.setState({dogY: this.state.dogY + parseInt(item.input)})
        } else {
          this.setState({elephantY: this.state.elephantY + parseInt(item.input)})
        }
      } else if(item.firstCommand == "say") {
        this.setState({greetingsText: item.input + " " + this.state.spriteType})
        setTimeout(() => {
          this.setState({greetingsText: ""})
        }, 3000);
      }
    })
  }

  deleteSprite = (spriteName) => {
    var selectedSprites = this.state.selectedSprites
    selectedSprites.map((item, index)=>{
      if(item == spriteName) {
        selectedSprites.splice(index, 1)
      }
    })
    if (spriteName == "cat") {
      this.setState({catX: 0, catY: 50, transformCat: 0})
    } else if(spriteName == "dog") {
      this.setState({dogX: 0, dogY: 50, transformDog: 0})
    } else {
      this.setState({elephantX: 0, elephantY: 50, transformElephant: 0})
    }
    this.setState({selectedSprites: selectedSprites, spriteType: selectedSprites[0]})
  }

  deleteCommand = (index) => {
    var selectedCommandList = this.state.selectedCommandList
    selectedCommandList.splice(index, 1)
    this.setState({selectedCommandList: selectedCommandList})
  }

  spriteSelected = (sprite) => {
    this.setState({spriteType: sprite})
  }

  render() {
    return (
      <View style={{flex: 1,marginTop: 50}}>
        <View>
        <FlatList
        data={this.state.commandList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>{return(
          <TouchableOpacity onPress={()=>{this.onCommandSelect(index)}}>
            <View style={styles.container}>
              <Text style={styles.commandText}>{item.firstCommand}</Text>
              <TextInput style={styles.commandInput} value={item.input} onChangeText={(text)=>{this.commandListInputChange(text, index)}}/>
              <Text style={styles.commandText}>{item.secondCommand}</Text>
            </View>
          </TouchableOpacity>
        )}}
        >
        </FlatList>
        </View>
        {this.state.backgroundImage == "background1" ? 
          <ImageBackground source={require('../../asset/images/background1.jpeg')} style={{resizeMode: "cover", height: "100%"}}>
          <View style={{flexDirection: "row"}}>
              {this.state.selectedSprites.map((item)=>{return(
                item == "cat" ? 
                <View style={{flexDirection: "row"}}>
                  <Draggable>
                    <TouchableOpacity onPress={()=>{this.spriteSelected("cat")}}>
                  <Image source={require("../../asset/images/cat.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.catX, marginTop: this.state.catY, borderColor: "red", borderWidth: this.state.spriteType == "cat" ? 1 : 0, transform: [{rotate: `${this.state.transformCat}deg`}]}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("cat")}}>
                    <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
                  </TouchableOpacity>
                  </Draggable>
                  </View>
                  : item == "dog" ? 
                  <View style={{flexDirection: "row"}}>
                    <Draggable>
                    <TouchableOpacity onPress={()=>{this.spriteSelected("dog")}}>
                  <Image source={require("../../asset/images/dog.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.dogX, marginTop: this.state.dogY, borderColor: "red", borderWidth: this.state.spriteType == "dog" ? 1 : 0, transform: [{rotate: `${this.state.transformDog}deg`}]}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("dog")}}>
                    <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
                  </TouchableOpacity>
                  </Draggable>
                  </View>
                  :<View style={{flexDirection: "row"}}>
                    <Draggable>
                    <TouchableOpacity onPress={()=>{this.spriteSelected("elephant")}}>
                  <Image source={require("../../asset/images/elephant.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.elephantX, marginTop: this.state.elephantY, borderColor: "red", borderWidth: this.state.spriteType == "elephant" ? 1 : 0, transform: [{rotate: `${this.state.transformElephant}deg`}]}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("elephant")}}>
                    <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
                  </TouchableOpacity> 
                  </Draggable>
                  </View>
              )})}
            <View style={{marginTop: 30}}>
              <Text style={{fontWeight: "bold", fontSize: 20, color: "red"}}>{this.state.greetingsText}</Text>
            </View>
          </View>
        </ImageBackground> : 
        this.state.backgroundImage == "background2" ?
        <ImageBackground source={require('../../asset/images/background2.webp')} style={{resizeMode: "cover", height: "100%"}}>
          <View style={{flexDirection: "row"}}>
          {this.state.selectedSprites.map((item)=>{return( 
            item == "cat" ? 
            <View style={{flexDirection: "row"}}>
              <Draggable>
              <TouchableOpacity onPress={()=>{this.spriteSelected("cat")}}>
              <Image source={require("../../asset/images/cat.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.catX, marginTop: this.state.catY, borderColor: "red", borderWidth: this.state.spriteType == "cat" ? 1 : 0, transform: [{rotate: `${this.state.transformCat}deg`}]}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("cat")}}>
              <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
            </TouchableOpacity>
              </Draggable>
              </View>
              : item == "dog" ? 
              <View style={{flexDirection: "row"}}>
                <Draggable>
                <TouchableOpacity onPress={()=>{this.spriteSelected("dog")}}>
              <Image source={require("../../asset/images/dog.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.dogX, marginTop: this.state.dogY, borderColor: "red", borderWidth: this.state.spriteType == "dog" ? 1 : 0, transform: [{rotate: `${this.state.transformDog}deg`}]}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("dog")}}>
              <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
            </TouchableOpacity>
              </Draggable>
              </View>
              :
              <View style={{flexDirection: "row"}}>
                <Draggable>
                <TouchableOpacity onPress={()=>{this.spriteSelected("elephant")}}>
              <Image source={require("../../asset/images/elephant.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.elephantX, marginTop: this.state.elephantY, borderColor: "red", borderWidth: this.state.spriteType == "elephant" ? 1 : 0, transform: [{rotate: `${this.state.transformElephant}deg`}]}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("elephant")}}>
              <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
            </TouchableOpacity>
              </Draggable>
              </View>
          )})}
            <View style={{marginTop: 30}}>
              <Text style={{fontWeight: "bold", fontSize: 20, color: "red"}}>{this.state.greetingsText}</Text>
            </View>
          </View>
        </ImageBackground> :
        <ImageBackground source={require('../../asset/images/background3.jpeg')} style={{resizeMode: "cover", height: "100%"}}>
        <View style={{flexDirection: "row"}}>
          {this.state.selectedSprites.map((item)=>{return(
            item == "cat" ? 
            <View style={{flexDirection: "row"}}>
              <Draggable>
              <TouchableOpacity onPress={()=>{this.spriteSelected("cat")}}>
              <Image source={require("../../asset/images/cat.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.catX, marginTop: this.state.catY, borderColor: "red", borderWidth: this.state.spriteType == "cat" ? 1 : 0, transform: [{rotate: `${this.state.transformCat}deg`}]}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("cat")}}>
              <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
            </TouchableOpacity>
              </Draggable>
              </View>
              : item == "dog" ? 
              <View style={{flexDirection: "row"}}>
                <Draggable>
                <TouchableOpacity onPress={()=>{this.spriteSelected("dog")}}>
              <Image source={require("../../asset/images/dog.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.dogX, marginTop: this.state.dogY, borderColor: "red", borderWidth: this.state.spriteType == "dog" ? 1 : 0, transform: [{rotate: `${this.state.transformDog}deg`}]}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("dog")}}>
                <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
              </TouchableOpacity>
              </Draggable>
              </View>
              : 
              <View style={{flexDirection: "row"}}>
                <Draggable>
                <TouchableOpacity onPress={()=>{this.spriteSelected("elephant")}}>
              <Image source={require("../../asset/images/elephant.png")} style={{height: 100, width: 100, resizeMode: "contain", marginLeft: this.state.elephantX, marginTop: this.state.elephantY, borderColor: "red", borderWidth: this.state.spriteType == "elephant" ? 1 : 0, transform: [{rotate: `${this.state.transformElephant}deg`}]}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: "red", width: 20, height: 20, borderRadius: 10, alignSelf: "center", right: 0, position: "absolute", top: 50}} onPress={()=>{this.deleteSprite("elephant")}}>
                <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
              </TouchableOpacity>
              </Draggable>
              </View>
           )})}
          <View style={{marginTop: 30}}>
            <Text style={{fontWeight: "bold", fontSize: 20, color: "red"}}>{this.state.greetingsText}</Text>
          </View>
        </View>
      </ImageBackground>
        }
        {this.state.selectedCommandList.length > 0 && this.state.selectedCommandList.map((item, index)=> {
          return (
            <Draggable x={50} y={200}>
              <View style={{flexDirection: 'row'}}>
              <View style={styles.container}>
                <Text style={styles.commandText}>{item.firstCommand}</Text>
                <TextInput style={styles.commandInput} value={item.input} onChangeText={(text)=>{this.selectedCommandListInputChange(text, index)}}/>
                <Text style={styles.commandText}>{item.secondCommand}</Text>
              </View>
              <TouchableOpacity style={{backgroundColor: "red", height: 20, width: 20, borderRadius: 10, marginTop: -8, marginLeft: -10}} onPress={()=>{this.deleteCommand(index)}}> 
                <Text style={{color: "white", fontWeight: "bold", textAlign: "center", marginTop: 2}}>X</Text>
              </TouchableOpacity>
              </View>
            </Draggable>
          )
        })}
        <TouchableOpacity style={{height: 100, width: 100, borderRadius: 50, borderColor: "black", borderWidth: 1, backgroundColor: "green", bottom: 16, position: "absolute", right: 16, justifyContent: "center", alignItems: "center"}} onPress={this.executeCommand}>
          <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Play</Text>
        </TouchableOpacity>
        <View style={{flexDirection: "row", bottom: 32, left: 32, position: "absolute"}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("SpriteSelect")}}>
              <Text style={{fontWeight: "bold", color: "red"}}>Sprite Select</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("BackgroundSelect")}} style={{marginLeft: 16}}>
              <Text style={{fontWeight: "bold", color: "red"}}>Background Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    backgroundColor: "blue", 
    width: 150, 
    height: 30, 
    marginLeft: 8, 
    borderWidth: 1, 
    borderColor: "black", 
    borderRadius: 60, 
    justifyContent: "center"
  },
  commandText: {
    color: "white", 
    alignSelf: "center"
  },
  commandInput: {
    backgroundColor: "white", 
    width: 30, 
    height: 20,
    alignSelf: "center", 
    textAlign: "center", 
    borderColor: "black", 
    borderWidth: 1, 
    borderRadius: 15
  },
})