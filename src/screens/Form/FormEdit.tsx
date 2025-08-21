import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IForm } from "../../api/types/IForm";
import { getByIdMock } from "../../api/apiForm"; // 👈 ahora usas el mock
import Form from "./components/Form";
import { RootParamList } from "../../navigations/types";

// Tipos de navegación y ruta
type DetailsRouteProp = RouteProp<RootParamList, "FormEdit">;
type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function FormEdit() {
    const [form, setForm] = useState<IForm>({
        id: 0,
        url: "",
        name: "",
        description: "",
        isDelete: false,
    });

    const [originalForm, setOriginalForm] = useState<IForm | null>(null);

    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { Id } = route.params; // 👈 viene desde navigate("FormEdit", { Id: item.id })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getByIdMock(Number(Id)); // 👈 usamos mock
                if (response) {
                    setForm(response);
                    setOriginalForm(response);
                } else {
                    Alert.alert("Error", "Formulario no encontrado en mock.");
                }
            } catch (error) {
                Alert.alert("Error", "No se pudo obtener el formulario.");
            }
        };

        fetchData();
    }, [Id]);

    const handleChange = (name: keyof IForm, value: string | boolean) => {
        setForm({ ...form, [name]: value });
    };

    const requestUpdateForm = async () => {
        if (!originalForm) return;

        const hasChanges =
        form.name.trim() !== originalForm.name.trim() ||
        form.description.trim() !== originalForm.description.trim() ||
        form.isDelete !== originalForm.isDelete;

        if (!hasChanges) {
            Alert.alert(
                "Sin cambios",
                "Debes realizar al menos un cambio real para actualizar."
            );
            return;
        }

        try {
            // Aquí puedes simular que se actualizó:
            Alert.alert("Éxito", "Formulario actualizado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
            } catch (error) {
            console.error("Error completo:", error);
            Alert.alert("Error", "Hubo un problema al actualizar el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            <Form form={form} handleChange={handleChange} />

            <TouchableOpacity style={styles.button} onPress={requestUpdateForm}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
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
        backgroundColor: "#4a90e2",
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

