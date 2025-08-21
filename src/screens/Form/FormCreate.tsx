import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IForm } from "../../api/types/IForm";
import { RootParamList } from "../../navigations/types";
import Form from "./components/Form"; 
import { createMock } from "../../api/apiForm"; // 👈 servicio simulado para crear

type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function FormCreate() {
    const navigation = useNavigation<NavigationProp>();

    // Estado inicial vacío
    const [form, setForm] = useState<IForm>({
        id: 0, // El mock/servidor debe asignar el id real
        url: "",
        name: "",
        description: "",
        isDelete: false,
    });

    const handleChange = (field: keyof IForm, value: string | boolean) => {
        setForm({ ...form, [field]: value });
    };

    const requestCreateForm = async () => {
        if (!form.name.trim() || !form.description.trim()) {
            Alert.alert("Error", "El nombre y la descripción son obligatorios.");
            return;
        }

        try {
            await createMock(form); // 👈 simula creación
            Alert.alert("Éxito", "Formulario creado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al crear el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            <Form form={form} handleChange={handleChange} />

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
