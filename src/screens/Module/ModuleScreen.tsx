import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SimpleCard from "../../components/FormCard";
import { RootParamList } from "../../navigations/types";
import { IModule } from "../../api/types/IModule";
import { getAllMock, deleteMock, getAll, deleted} from "../../api/apiModule";
import CreateButton from "../../components/CreateButton";


type BookScreenNavigationProp = NativeStackNavigationProp<
  RootParamList,
  "Module"
>;

const ModuleScreen = () => {
    const [module, setBooks] = useState<IModule[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<BookScreenNavigationProp>();

    const isFocused = useIsFocused();

    const fetchBooks = async () => {
        setLoading(true);
        const data = await getAllMock();
        if (Array.isArray(data)) {
            setBooks(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isFocused){
            fetchBooks();
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
            setBooks((prev) => prev.filter((item) => item.id !== id));
        Alert.alert("Éxito", "Formulario eliminado correctamente.");
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al eliminar el formulario.");
        }
    };

    return (
        <View style={styles.container}>
            <CreateButton
                label="Nuevo Modulo"
                onPress={() => navigation.navigate("ModuleCreate")}
            />
            <FlatList
                data={module}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SimpleCard
                        data={item}
                        onDelete={() => handleDelete(item.id)}
                        onEdit={() => navigation.navigate("ModuleEdit", { Id: item.id })}
                        excludeKeys={["id", "isDelete"]} // Excluye la clave 'id' y 'isDelete'
                    />
                )}
            />
        </View>
    );
}

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

export default ModuleScreen;