import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootParamList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import { IPerson } from "../../api/types/IPerson";
import { getByIdMock } from "../../api/apiPerson";

type DetailsRouteProp = RouteProp<RootParamList, "PersonEdit">;
type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function PersonEdit() {
    const [person, setPerson] = useState<IPerson>({
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

    const [originalForm, setOriginalForm] = useState<IPerson | null>(null);

    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { Id } = route.params; // 👈 viene desde navigate("FormEdit", { Id: item.id })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getByIdMock(Number(Id)); // 👈 usamos mock
                if (response) {
                    setPerson(response);
                    setOriginalForm(response);
                } else {
                    Alert.alert("Error", "Persona no encontrado.");
                }
            } catch (error) {
                Alert.alert("Error", "No se pudo obtener la Persona.");
            }
        };

        fetchData();
    }, [Id]);

    const handleChange = (name: keyof IPerson, value: string | boolean) => {
        setPerson({ ...person, [name]: value });
    };

    const requestUpdateForm = async () => {
        if (!originalForm) return;

        const hasChanges =
        person.name.trim() !== originalForm.name.trim() ||
        person.description.trim() !== originalForm.description.trim() ||
        person.lastName.trim() !== originalForm.lastName.trim() ||
        person.documentNumber.trim() !== originalForm.documentNumber.trim() ||
        person.typeDocument.trim() !== originalForm.typeDocument.trim() ||
        person.phone.trim() !== originalForm.phone.trim() ||
        person.address.trim() !== originalForm.address.trim() ||
        person.isDelete !== originalForm.isDelete;

        if (!hasChanges) {
            Alert.alert(
                "Sin cambios",
                "Debes realizar al menos un cambio real para actualizar."
            );
            return;
        }

        try {
            // Aquí puedes simular que se actualizó:
            Alert.alert("Éxito", "persona actualizado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
            } catch (error) {
            console.error("Error completo:", error);
            Alert.alert("Error", "Hubo un problema al actualizar la Persona.");
        }
    };

    return (
        <View style={styles.container}>
            <Form person={person} handleChange={handleChange} />

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
