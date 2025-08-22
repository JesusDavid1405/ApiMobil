import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations/types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { IRolUser } from "../../api/types/IRolUser";
import { Alert, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { createMock } from "../../api/apiRolUser";
import Form from "./components/Form";

type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function RolUserCreate() {
    const navigation = useNavigation<NavigationProp>();

    const [rolUser, setRolUser] = useState<IRolUser>({
        id: 0,
        rolId: 0,
        userId: 0,
        isDelete: false,
    });

    const handleChange = (field: keyof IRolUser, value: string | boolean | number) => {
        setRolUser({ ...rolUser, [field]: value });
    };

    const requestCreateForm = async () => {
        if (!rolUser.rolId || !rolUser.userId) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        try {
            // Aquí deberías llamar a la función para crear el rolUsuario, similar a createMock en UserCreate.tsx
            await createMock(rolUser); // 👈 simula creación
            Alert.alert("Éxito", "RolUsuario creado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al crear el RolUsuario.");
        }
    };

    return (
        <View style={styles.container}>
            <Form rolUser={rolUser} handleChange={handleChange} />

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