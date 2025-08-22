import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations/types";
import { useNavigation } from "@react-navigation/native";
import { IPermission } from "../../api/types/IPermission";
import { useState } from "react";
import { Alert, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { createMock } from "../../api/apiPermission";
import Form from "./components/Form";

type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function PermissionCreate() {
    const navigation = useNavigation<NavigationProp>();

    const [permission, setForm] = useState<IPermission>({
        id: 0,
        name: "",
        description: "",
        isDelete: false,
    });

    const handleChange = (field: keyof IPermission, value: string | boolean) => {
        setForm({ ...permission, [field]: value });
    };

    const requestCreateForm = async () => {
        if (!permission.name.trim() || !permission.description.trim()) {
            Alert.alert("Error", "El nombre y la descripción son obligatorios.");
            return;
        }

        try {
            await createMock(permission); // 👈 simula creación
            Alert.alert("Éxito", "Formulario creado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al crear el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            <Form permission={permission} handleChange={handleChange} />

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

