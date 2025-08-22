import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootParamList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { IPermission } from "../../api/types/IPermission";
import { View, StyleSheet, Text, Alert, TouchableOpacity, } from "react-native";
import Form from "./components/Form";
import { getByIdMock, updateMock } from "../../api/apiPermission";

type DetailsRouteProp = RouteProp<RootParamList, "PermissionEdit">;
type NavigationProp = NativeStackNavigationProp<RootParamList>;

export default function PermissionEdit() {
    const [permission, setForm] = useState<IPermission>({
        id: 0,
        name: "",
        description: "",
        isDelete: false,
    });

    const [originalForm, setOriginalForm] = useState<IPermission | null>(null);

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

    const handleChange = (name: keyof IPermission, value: string | boolean) => {
        setForm({ ...permission, [name]: value });
    };

    const requestUpdateForm = async () => {
        if (!originalForm) return;

        const hasChanges =
        permission.name.trim() !== originalForm.name.trim() ||
        permission.description.trim() !== originalForm.description.trim() ||
        permission.isDelete !== originalForm.isDelete;

        if (!hasChanges) {
            Alert.alert(
                "Sin cambios",
                "Debes realizar al menos un cambio real para actualizar."
            );
            return;
        }

        try {
            // ✅ Usamos updateMock
            const updated = await updateMock(permission.id, permission);

            if (updated) {
            // 👇 Mantengo la alerta de éxito
                Alert.alert("Éxito", "Permiso actualizado correctamente.", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert("Error", "No se pudo actualizar el Permiso.");
            }
        } catch (error) {
            console.error("Error completo:", error);
            Alert.alert("Error", "Hubo un problema al actualizar el Permiso.");
        }
    };


    return (
        <View style={styles.container}>
            <Form permission={permission} handleChange={handleChange} />

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

