import { useEffect, useState } from "react";
import { IUser } from "../../api/types/IUser";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootParamList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getByIdMock, updateMock } from "../../api/apiUser";
import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FormEdit from "./components/FormEdit";

type DetailsRouteProp = RouteProp<RootParamList, "UserEdit">;
type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function UserEdit() {
    const [user, setForm] = useState<IUser>({
        id: 0, 
        username: "",
        personId: 0,
        personName: "",
        email: "",
        password: "",
        isDelete: false,
        createdDate: "",
        active: true,
    });

    const [originalForm, setOriginalForm] = useState<IUser | null>(null);

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

    const handleChange = (name: keyof IUser, value: string | boolean | number) => {
        setForm({ ...user, [name]: value });
    };

    const requestUpdateForm = async () => {
        if (!originalForm) return;

        const hasChanges =
        user.username.trim() !== originalForm.username.trim() ||
        user.email.trim() !== originalForm.email.trim() ||
        user.personId != originalForm.personId;

        if (!hasChanges) {
            Alert.alert(
                "Sin cambios",
                "Debes realizar al menos un cambio real para actualizar."
            );
            return;
        }

        try {
            // ✅ Usamos updateMock
            const updated = await updateMock(user.id, user);

            if (updated) {
            // 👇 Mantengo la alerta de éxito
                Alert.alert("Éxito", "Formulario actualizado correctamente.", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert("Error", "No se pudo actualizar el formulario.");
            }
        } catch (error) {
            console.error("Error completo:", error);
            Alert.alert("Error", "Hubo un problema al actualizar el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            <FormEdit user={user} handleChange={handleChange} />

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