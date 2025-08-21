import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations/types";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IRol } from "../../api/types/IRol";
import Form from "./components/Form";
import { createMock } from "../../api/apiRol";

type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function RolCreate() {
    const navigation = useNavigation<NavigationProp>();
    
        // Estado inicial vacío
    const [rol, setRol] = useState<IRol>({
        id: 0, 
        name: "",
        description: "",
        isDelete: false,
    });

    const handleChange = (field: keyof IRol, value: string | boolean) => {
        setRol({ ...rol, [field]: value });
    };

    const requestCreateForm = async () => {
        if (!rol.name.trim() || !rol.description.trim()) {
            Alert.alert("Error", "El nombre y la descripción son obligatorios.");
            return;
        }

        try {
            await createMock(rol); // 👈 simula creación
            Alert.alert("Éxito", "Rol creado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al crear el formulario.");
        }
    };

   return (
        <View style={styles.container}>
            <Form rol={rol} handleChange={handleChange} />

            <TouchableOpacity style={styles.button} onPress={requestCreateForm}>
                <Text style={styles.buttonText}>Crear Rol</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});