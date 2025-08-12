import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAllBook } from "../../api/apiForm";
import SimpleCard from "../../components/FormCard";
import { FormtackParamsList, ModuletackParamsList } from "../../navigations/types";
import { IForm } from "../../api/types/IForm";


type BookScreenNavigationProp = NativeStackNavigationProp<
  ModuletackParamsList,
  "ModuleList"
>;

const ModuleScreen = () => {

    return (
        <View>
            <Text>Module Screen</Text>
            {/* Aquí puedes agregar más contenido o componentes específicos para el módulo */}
        </View>
    );
}

export default ModuleScreen;