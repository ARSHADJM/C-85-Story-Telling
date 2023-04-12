import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import {createStackNvaigator} from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/Register"; 
import { firebaseConfig } from "./config";
import * as firebase from "firebase"

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app();
}

const Stack = createStackNvaigator() 
const StackNav = ()=>{
  return(
    <Stack.Navigator initialRouteName="Login" screenOptions={{
      headerShown:false,
      gestureEnabled:false,
    }} > 
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen}></Stack.Screen>
      <Stack.Screen name="DashBoard" component={DrawerNavigator}></Stack.Screen>
     </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}