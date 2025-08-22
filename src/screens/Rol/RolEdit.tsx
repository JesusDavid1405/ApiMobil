import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getByIdMock, updateMock } from "../../api/apiRol"; // 👈 ahora usas el mock
import Form from "./components/Form";
import { RootParamList } from "../../navigations/types";
import { IRol } from "../../api/types/IRol";

// Tipos de navegación y ruta
type DetailsRouteProp = RouteProp<RootParamList, "RolEdit">;
type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function RolEdit() {
    const [rol, setRol] = useState<IRol>({
        id: 0,
        name: "",
        description: "",
        isDelete: false,
    });

    const [originalRol, setOriginalRol] = useState<IRol | null>(null);

    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { Id } = route.params; // 👈 viene desde navigate("RolEdit", { Id: item.id })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getByIdMock(Number(Id)); // 👈 usamos mock
                if (response) {
                    setRol(response);
                    setOriginalRol(response);
                } else {
                    Alert.alert("Error", "Formulario no encontrado en mock.");
                }
            } catch (error) {
                Alert.alert("Error", "No se pudo obtener el formulario.");
            }
        };

        fetchData();
    }, [Id]);

    const handleChange = (name: keyof IRol, value: string | boolean) => {
        setRol({ ...rol, [name]: value });
    };

    const requestUpdateForm = async () => {
        if (!originalRol) return;

        const hasChanges =
        rol.name.trim() !== originalRol.name.trim() ||
        rol.description.trim() !== originalRol.description.trim() ||
        rol.isDelete !== originalRol.isDelete;

        if (!hasChanges) {
            Alert.alert(
                "Sin cambios",
                "Debes realizar al menos un cambio real para actualizar."
            );
            return;
        }

        try {
            const update = await updateMock(rol.id, rol);

            if (update){
                Alert.alert("Éxito", "Rol actualizado correctamente.", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else{
                Alert.alert("Error", "No se pudo actualizar el Rol.")
            }
        } catch (error) {
            console.error("Error completo:", error);
            Alert.alert("Error", "Hubo un problema al actualizar el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            <Form rol={rol} handleChange={handleChange} />

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

