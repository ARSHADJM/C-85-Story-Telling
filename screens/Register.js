import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
import { firebaseConfig } from "../config";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/logo.png");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirm_password: "",
      fontsLoaded: false
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  registerUser=(email,password,confirmPassword,first_name,last_name)=>{
    if(password==confirmPassword){
      firebase.auth().createUserWithEmailAndPassword(email,password).then((userCredential)=>{
        Alert.alert("User Registered")
        this.props.navigation.replace("Login")
        firebase.database().ref("/users/"+userCredential.user.uid).set({
          email:userCredential.user.email,first_name:first_name,last_name:last_name,current_theme:"dark"
        })
      })
      .catch(error=>{Alert.alert(error.message)})
    }else{
      Alert.alert("Password doesn't match")
    }
  }


  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password} = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.appTitleText}>Register</Text>

          {/* Add code to create two more text inputs for first name and last name */}
          
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ firstName: text })}
            placeholder={"Enter your First Name"}
            placeholderTextColor={"#FFFFFF"}

          />
           <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ lastName: text })}
            placeholder={"Enter your Last Name"}
            placeholderTextColor={"#FFFFFF"}

          />
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ email: text })}
            placeholder={"Enter Email"}
            placeholderTextColor={"#FFFFFF"}

          />
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ password: text })}
            placeholder={"Enter Password"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />
           <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ confirm_password: text })}
            placeholder={"ReEnter PassWord"}
            placeholderTextColor={"#FFFFFF"}

          />
          {/* Add code to create one more text input to confirm the password */}


          <TouchableOpacity
            onpress={()=>{this.registerUser(email,password,confirmPassword,first_name,last_name)}} style={[styles.button, { marginTop: 20 }]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=>{this.props.navigation.replace("Login")}}><Text style={styles.buttonText}>Login ?</Text></TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20)
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginBottom: RFValue(20)
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: 'underline'
  }
});
