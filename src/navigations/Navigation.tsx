import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Rol from "../screens/Rol/Rol";
import Form from "../screens/Form/Form";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStackNavigator = createNativeStackNavigator();

function MyStacks(){
    return(
        <HomeStackNavigator.Navigator initialRouteName="Home">
            <HomeStackNavigator.Screen name="Home" component={Home}/>
            <HomeStackNavigator.Screen name="Rol" component={Rol}/>
            <HomeStackNavigator.Screen name="Form" component={Form}/>
        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{tabBarActiveTintColor: "blue"}}
        >
            <Tab.Screen
                name="Home"
                component={MyStacks}
                options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={24} color="black" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}