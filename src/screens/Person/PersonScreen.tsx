import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations/types";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IPerson } from "../../api/types/IPerson";
import { getAllMock, deleteMock } from "../../api/apiPerson";
import SimpleCard from "../../components/FormCard";
import CreateButton from "../../components/CreateButton";

type PersonScreenNavigationProp = NativeStackNavigationProp<
  RootParamList,
  "Person"
>;

const PersonScreen = () => {
  const navigation = useNavigation<PersonScreenNavigationProp>();
  const [Person, setRoles] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState(true);

  // 👀 Hook que detecta si la pantalla está activa
  const isFocused = useIsFocused();

  const fetchRoles = async () => {
    setLoading(true);
    const data = await getAllMock();
    if (Array.isArray(data)) {
      setRoles(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchRoles(); // 🔄 recarga cada vez que entras a la pantalla
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
      setRoles((prev) => prev.filter((item) => item.id !== id));
      Alert.alert("Éxito", "Formulario eliminado correctamente.");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al eliminar el formulario.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Botón para ir a PersonCreate */}
      <CreateButton
        label="Nueva Persona"
        onPress={() => navigation.navigate("PersonCreate")}
      />

      <FlatList
        data={Person}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SimpleCard
            data={item}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => navigation.navigate("PersonEdit", { Id: item.id })}
            excludeKeys={["id", "isDelete"]}
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
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PersonScreen;
