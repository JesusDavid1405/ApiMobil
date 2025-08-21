import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Form from "./components/Form";
import { RootParamList } from "../../navigations/types";
import { IModule } from "../../api/types/IModule";
import { getByIdMock } from "../../api/apiModule";

// Tipos de navegación y ruta
type DetailsRouteProp = RouteProp<RootParamList, "ModuleEdit">;
type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function ModuleEdit() {
    const [module, setModule] = useState<IModule>({
        id: 0,
        name: "",
        description: "",
        isDelete: false,
    });

    const [originalForm, setOriginalForm] = useState<IModule | null>(null);

    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { Id } = route.params; // 👈 viene desde navigate("FormEdit", { Id: item.id })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getByIdMock(Number(Id)); // 👈 usamos mock
                if (response) {
                    setModule(response);
                    setOriginalForm(response);
                } else {
                    Alert.alert("Error", "Modulos no encontrado.");
                }
            } catch (error) {
                Alert.alert("Error", "No se pudo obtener el Modulos.");
            }
        };

        fetchData();
    }, [Id]);

    const handleChange = (name: keyof IModule, value: string | boolean) => {
        setModule({ ...module, [name]: value });
    };

    const requestUpdateForm = async () => {
        if (!originalForm) return;

        const hasChanges =
        module.name.trim() !== originalForm.name.trim() ||
        module.description.trim() !== originalForm.description.trim() ||
        module.isDelete !== originalForm.isDelete;

        if (!hasChanges) {
            Alert.alert(
                "Sin cambios",
                "Debes realizar al menos un cambio real para actualizar."
            );
            return;
        }

        try {
            // Aquí puedes simular que se actualizó:
            Alert.alert("Éxito", "Modulo actualizado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
            } catch (error) {
            console.error("Error completo:", error);
            Alert.alert("Error", "Hubo un problema al actualizar el Modulo.");
        }
    };

    return (
        <View style={styles.container}>
            <Form module={module} handleChange={handleChange} />

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

