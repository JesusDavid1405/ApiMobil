
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations/types";
import React, { useEffect, useState } from "react";
import { IRol } from "../../api/types/IRol";
import { deleteMock, getAllMock, getAllRol } from "../../api/apiRol";
import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator, FlatList } from "react-native";
import SimpleCard from "../../components/FormCard";

type RolScreenNavigationProp = NativeStackNavigationProp<
    RootParamList,
    "Rol"
>

const RolScreen = () => {
    const navigation = useNavigation<RolScreenNavigationProp>();
    const [Roles, setRoles] = useState<IRol[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchRoles = async () => {
            const data = await getAllMock();
            
            if(Array.isArray(data)) {
                setRoles(data);
                // console.log("Roles:", data);
            }
            setLoading(false);
        };

        fetchRoles();
    }, []);

    if(loading){
        return (
            <View>
                <ActivityIndicator size="large" color="fff" />
            </View>
        );
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteMock(id); 
            setRoles((prev) => prev.filter((item) => item.id !== id));
        Alert.alert("Éxito", "Formulario eliminado correctamente.");
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al eliminar el formulario.");
        }
    };

    return(
        <View style={styles.container}>
            {/* 🔹 Botón para ir a FormCreate */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("RolCreate")}
            >
                <Text style={styles.addButtonText}>➕ Nuevo Rol</Text>
            </TouchableOpacity>

            <FlatList
                data={Roles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SimpleCard
                        data={item}
                        onDelete={() => handleDelete(item.id)}
                        onEdit={() => navigation.navigate("RolEdit", { Id: item.id })}
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

export default RolScreen;

