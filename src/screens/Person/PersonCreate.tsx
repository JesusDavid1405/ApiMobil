import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations/types";
import { useNavigation } from "@react-navigation/native";
import { IPerson } from "../../api/types/IPerson";
import { useState } from "react";
import { View, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import { createMock, getAllMock } from "../../api/apiPerson";
import Form from "./components/Form";

type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function PersonCreate() {
    const navigation = useNavigation<NavigationProp>();

    // Estado inicial vacío
    const [person, setForm] = useState<IPerson>({
        id: 0, // El mock/servidor debe asignar el id real
        name: "",
        lastName: "",
        description: "",
        typeDocument: "",
        documentNumber: "",
        phone: "",
        address: "",
        isDelete: false,
    });

    const handleChange = (field: keyof IPerson, value: string | boolean) => {
        setForm({ ...person, [field]: value });
    };

    const requestCreateForm = async () => {
        if (!person.name.trim() || !person.description.trim() || !person.lastName.trim() || !person.documentNumber.trim() || !person.typeDocument.trim() || !person.phone.trim() || !person.address.trim()) {
            Alert.alert("Error", "todos los campos son obligatorios.");
            return;
        }

        try { 
            await createMock(person); // 👈 simula creación
            Alert.alert("Éxito", "Formulario creado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
            console.log("Persona creada:", person);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al crear el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            <Form person={person} handleChange={handleChange} />

            <TouchableOpacity style={styles.button} onPress={requestCreateForm}>
                <Text style={styles.buttonText}>Crear persona</Text>
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

