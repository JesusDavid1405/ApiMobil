import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations/types";
import Form from "./components/Form"; 
import { createMock } from "../../api/apiModule"; // 👈 servicio simulado para crear
import { IModule } from "../../api/types/IModule";

type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function ModuleCreate() {
    const navigation = useNavigation<NavigationProp>();

    // Estado inicial vacío
    const [module, setModule] = useState<IModule>({
        id: 0, // El mock/servidor debe asignar el id real
        name: "",
        description: "",
        isDelete: false,
    });

    const handleChange = (field: keyof IModule, value: string | boolean) => {
        setModule({ ...module, [field]: value });
    };

    const requestCreateForm = async () => {
        if (!module.name.trim() || !module.description.trim()) {
            Alert.alert("Error", "El nombre y la descripción son obligatorios.");
            return;
        }

        try {
            await createMock(module); // 👈 simula creación
            Alert.alert("Éxito", "Modulo creado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al crear el Modulo.");
        }
    };

    return (
        <View style={styles.container}>
            <Form module={module} handleChange={handleChange} />

            <TouchableOpacity style={styles.button} onPress={requestCreateForm}>
                <Text style={styles.buttonText}>Crear Formulario</Text>
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
