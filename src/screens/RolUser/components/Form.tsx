import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getAllMock as rolGet } from "../../../api/apiRol"; // 👈 servicio de Person
import { getAllMock as userGet } from "../../../api/apiUser"; // 👈 servicio de Person
import { IRolUser } from "../../../api/types/IRolUser";

interface Props {
  rolUser: IRolUser;
  handleChange: (field: keyof IRolUser, value: string | boolean | number) => void;
}

const FormCreate: React.FC<Props> = ({ rolUser, handleChange }) => {
  const [rols, setRol] = useState<{ id: number; name: string }[]>([]);
  const [users, setUser] = useState<{ id: number; username: string }[]>([]);

  useEffect(() => {
    const fetchRols = async () => {
      const data = await rolGet();
      setRol(data);
    };
    fetchRols();

    const fetchUsers = async () => {
      const data = await userGet();
      setUser(data);
    };
    fetchUsers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Relación con Person */}
      <Text style={styles.label}>Roles</Text>
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={rolUser.rolId}
          onValueChange={(value) => handleChange("rolId", value)}
          style={styles.picker}
          dropdownIconColor="#495057"
        >
          <Picker.Item label="Seleccione una persona" value="" />
          {rols.map((p) => (
            <Picker.Item key={p.id} label={p.name} value={p.id} />
          ))}
        </Picker>
      </View>
      {/* Relación con Person */}
      <Text style={styles.label}>Usuarios</Text>
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={rolUser.userId}
          onValueChange={(value) => handleChange("userId", value)}
          style={styles.picker}
          dropdownIconColor="#495057"
        >
          <Picker.Item label="Seleccione una persona" value="" />
          {users.map((p) => (
            <Picker.Item key={p.id} label={p.username} value={p.id} />
          ))}
        </Picker>
      </View>

      {/* Switch Activo */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Activo</Text>
        <Switch
          value={rolUser.isDelete} // 👈 activo = !isDelete
          onValueChange={(value) => handleChange("isDelete", !value)}
          thumbColor={!rolUser.isDelete ? "#4CAF50" : "#f4f3f4"}
          trackColor={{ false: "#ccc", true: "#81C784" }}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 18,
    fontSize: 15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingVertical: 10,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    fontSize: 15,
    color: "#555555ff",
  },
});

export default FormCreate;
