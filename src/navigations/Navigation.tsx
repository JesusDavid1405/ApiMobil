// Navigation.tsx
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";

// import icons
import AntDesign from "@expo/vector-icons/AntDesign";

// import screens
import BookListScreen from "../screens/Home";
import BookRegisterScreen from "../screens/BookRegisterScreen";

// import components
import Header from "../components/Header";
import Sidebar from "../components/sidebar"; 
import RolScreen from "../screens/Rol/RolList";

const BookStackNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="BookList"
          screenOptions={{ tabBarActiveTintColor: "purple" }}
        >
          <Tab.Screen
            name="BookList"
            component={BookListScreen}
            options={{
              header: () => <Header title="Form" onMenuPress={toggleSidebar} />,
              tabBarIcon: ({ color }) => (
                <AntDesign name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="BookRegister"
            component={BookRegisterScreen}
            options={{
              headerShown: false,
              tabBarLabel: "BookRegister",
              tabBarIcon: ({ color }) => (
                <AntDesign name="setting" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>

        {sidebarVisible && (
          <View style={StyleSheet.absoluteFill}>
            <Sidebar
              activeItem="Inicio"
              title="Panel"
              username="jesus"
              role="admin"
              onSelect={(item) => {
                console.log("Seleccionaste:", item);
                setSidebarVisible(false);
              }}
              onClose={
                () => setSidebarVisible(false)
              }
            />
          </View>
        )}
      </View>
    </NavigationContainer>
  );
}
