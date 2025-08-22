import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations/types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { IUser } from "../../api/types/IUser";
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import Form from "./components/FormCreate";
import { createMock } from "../../api/apiUser";

type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function UserCreate() {
    const navigation = useNavigation<NavigationProp>();

    // Estado inicial vacío
    const [user, setForm] = useState<IUser>({
        id: 0, // El mock/servidor debe asignar el id real
        email: "",
        password: "",
        personId: 0,
        isDelete: false,
    });

    const handleChange = (field: keyof IUser, value: string | boolean | number) => {
        setForm({ ...user, [field]: value });
    };

    const requestCreateForm = async () => {
        if (!user.email.trim() || !user.password.trim() || !user.personId) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        try {
            await createMock(user); // 👈 simula creación
            Alert.alert("Éxito", "Formulario creado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al crear el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            <Form user={user} handleChange={handleChange} />

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