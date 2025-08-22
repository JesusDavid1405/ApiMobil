import React, { useEffect, useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { IPermission } from "../../api/types/IPermission"
import { RootParamList } from "../../navigations/types";
import SimpleCard from "../../components/FormCard";
import { FlatList, TouchableOpacity, View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { deleteMock, getAllMock } from "../../api/apiPermission";
import CreateButton from "../../components/CreateButton";

type PermissionScreenNavigationProp = NativeStackNavigationProp<
    RootParamList,
    "Permission"
>;

const PermissionScreen = () => {
    const [permission, setPermission] = useState<IPermission[]>([]);

    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<PermissionScreenNavigationProp>();

    // 👀 Hook que detecta si la pantalla está activa
    const isFocused = useIsFocused();

    const fetchBooks = async () => {
        setLoading(true);
        const data = await getAllMock();
        if (Array.isArray(data)) {
            setPermission(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isFocused) {
            fetchBooks(); // 🔄 recarga cada vez que entras a la pantalla
        }
    }, [isFocused]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteMock(id); 
            setPermission((prev) => prev.filter((item) => item.id !== id));
            Alert.alert("Éxito", "Formulario eliminado correctamente.");
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al eliminar el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            {/* 🔹 Botón para ir a FormCreate */}
            <CreateButton
                label="Nuevo Permiso"
                onPress={() => navigation.navigate("PermissionCreate")}
            />

            <FlatList
                data={permission}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SimpleCard
                        data={item}
                        onDelete={() => handleDelete(item.id)}
                        onEdit={() => navigation.navigate("PermissionEdit", { Id: item.id })}
                        excludeKeys={["id", "isDelete"]} // Excluye la clave 'id' y 'isDelete'
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
    },
    addButton: {
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
        width: 340,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default PermissionScreen