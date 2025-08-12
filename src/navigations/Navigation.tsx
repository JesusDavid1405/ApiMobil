// Navigation.tsx
import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";

// import icons
import AntDesign from "@expo/vector-icons/AntDesign";

// import screens
import RolScreen from "../screens/Rol/RolScreen";
import FormScreen from "../screens/Form/FormScreen";

// import components
import Header from "../components/Header";
import Sidebar from "../components/sidebar"; 
import { navigationRef } from "./rootNavigate";
import ModuleScreen from "../screens/Module/ModuleScreen";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <NavigationContainer ref={navigationRef }>
      <View style={{ flex: 1 }}>

        <Stack.Navigator screenOptions={{ headerShown: false  }}>
          <Stack.Screen name="Tabs">
            {() => (
              <Tab.Navigator
                initialRouteName="Rol"
                screenOptions={{ tabBarActiveTintColor: "purple" }}
              >
                <Tab.Screen
                  name="Rol"
                  component={RolScreen}
                  options={{
                    header: () => (
                      <Header title="Roles" onMenuPress={toggleSidebar} />
                    ),
                    tabBarIcon: ({ color }) => (
                      <AntDesign name="home" size={24} color={color} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Form"
                  component={FormScreen}
                  options={{
                    header: () => (
                      <Header title="Formularios" onMenuPress={toggleSidebar} />
                    ),
                    tabBarLabel: "Form",
                    tabBarIcon: ({ color }) => (
                      <AntDesign name="setting" size={24} color={color} />
                    ),
                  }}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>

          <Stack.Screen 
            name="Module" 
            component={ModuleScreen} 
            options={{
              headerShown: true,
              header: () => (
                <Header title="Modulos" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="Rol"
            component={RolScreen}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Roles" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="Form"
            component={FormScreen}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Formularios" onMenuPress={toggleSidebar} />
              ),
            }}
          />
        </Stack.Navigator>

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
              onClose={() => setSidebarVisible(false)}
            />
          </View>
        )}
      </View>
    </NavigationContainer>
  );
}
