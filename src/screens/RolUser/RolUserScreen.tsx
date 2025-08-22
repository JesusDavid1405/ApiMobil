import { useIsFocused, useNavigation } from "@react-navigation/native";
import { deleteMock, getAllMock } from "../../api/apiRolUser";
import { useEffect, useState } from "react";
import { IRolUser } from "../../api/types/IRolUser";
import { View, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity, FlatList } from "react-native";
import { RootParamList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SimpleCard from "../../components/FormCard";
import CreateButton from "../../components/CreateButton";

type RolUserScreenNavigationProp = NativeStackNavigationProp<
    RootParamList,
    "RolUser"
>;

const RolUserScreen = () => {
    const navigation = useNavigation<RolUserScreenNavigationProp>();
    const [rolUsers, setRolUsers] = useState<IRolUser[]>([]);
    const [loading, setLoading] = useState(true);

    // 👀 Hook que detecta si la pantalla está activa
    const isFocused = useIsFocused();

    const fetchRolUsers = async () => {
        setLoading(true);
        const data = await getAllMock();
        if (Array.isArray(data)) {
            setRolUsers(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isFocused) {
            fetchRolUsers(); // 🔄 recarga cada vez que entras a la pantalla
        }
    }, [isFocused]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteMock(id);
            setRolUsers((prev) => prev.filter((item) => item.id !== id));
            Alert.alert("Éxito", "RolUsuario eliminado correctamente.");
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al eliminar el RolUsuario.");
        }
    };

    return (
        <View style={styles.container}>
            <CreateButton
                label="Nuevo RolUser"
                onPress={() => navigation.navigate("RolUserCreate")}
            />

            <FlatList
                data={rolUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SimpleCard
                        data={item}
                        onDelete={() => handleDelete(item.id)}
                        onEdit={() => navigation.navigate("UserEdit", { Id: item.id })}
                        excludeKeys={["id", "isDelete", "rolId", "userId"]}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    
});

export default RolUserScreen;