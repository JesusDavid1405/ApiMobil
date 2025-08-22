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
import FormEdit from "../screens/Form/FormEdit";
import FormCreate from "../screens/Form/FormCreate";
import RolEdit from "../screens/Rol/RolEdit";
import RolCreate from "../screens/Rol/RolCreate";
import ModuleEdit from "../screens/Module/ModuleEdit";
import ModuleCreate from "../screens/Module/ModuleCreate";
import PersonScreen from "../screens/Person/PersonScreen";
import PersonCreate from "../screens/Person/PersonCreate";
import PersonEdit from "../screens/Person/PersonEdit";
import PermissionScreen from "../screens/Permission/PermissionScreen";
import PermissionEdit from "../screens/Permission/PermissionEdit";
import PermissionCreate from "../screens/Permission/PermissionCreate";
import UserScreen from "../screens/User/UserScreen";
import UserCreate from "../screens/User/UserCreate";
import UserEdit from "../screens/User/UserEdit";
import RolUserScreen from "../screens/RolUser/RolUserScreen";
import RolUserCreate from "../screens/RolUser/RolUserCreate";



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
            name="ModuleEdit" 
            component={ModuleEdit} 
            options={{
              headerShown: true,
              header: () => (
                <Header title="Editar Modulo" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen 
            name="ModuleCreate" 
            component={ModuleCreate} 
            options={{
              headerShown: true,
              header: () => (
                <Header title="Crear Modulo" onMenuPress={toggleSidebar} />
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
            name="RolEdit"
            component={RolEdit}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Editar Rol" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="RolCreate"
            component={RolCreate}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Crear Rol" onMenuPress={toggleSidebar} />
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
          <Stack.Screen
            name="FormEdit"
            component={FormEdit}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Editar Formulario" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="FormCreate"
            component={FormCreate}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Crear Formulario" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Personas" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="PersonCreate"
            component={PersonCreate}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Crear Persona" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="PersonEdit"
            component={PersonEdit}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Editar Persona" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="Permission"
            component={PermissionScreen}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Permisos" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="PermissionEdit"
            component={PermissionEdit}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Editar Permiso" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="PermissionCreate"
            component={PermissionCreate}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Crear Permiso" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="User"
            component={UserScreen}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Usuarios" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="UserCreate"
            component={UserCreate}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Crear Usuario" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="UserEdit"
            component={UserEdit}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Editar Usuario" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="RolUser"
            component={RolUserScreen}
            options={{
              headerShown: true,
              header: () => (
                <Header title="RolUser" onMenuPress={toggleSidebar} />
              ),
            }}
          />
          <Stack.Screen
            name="RolUserCreate"
            component={RolUserCreate}
            options={{
              headerShown: true,
              header: () => (
                <Header title="Crear RolUser" onMenuPress={toggleSidebar} />
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
                // console.log("Seleccionaste:", item);
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
