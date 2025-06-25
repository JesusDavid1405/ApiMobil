import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeStackNavigatorProp = NativeStackNavigationProp<
    RootStackParamList,
    "Home"
>;

const Home = () => {
    const navigation = useNavigation<HomeStackNavigatorProp>();
    return (
        <View>
            <TouchableOpacity
                style={styles.touch}
                onPress={() => navigation.navigate("Rol")}
            >
                <Text>Rol</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.touch}
                onPress={() => navigation.navigate("Form")}
            >
                <Text>Form</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  touch: {
    margin: 5,
    backgroundColor: "#1e90ff", // azul tipo botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // sombra en Android
    width: 150,
  },
});

export default Home;