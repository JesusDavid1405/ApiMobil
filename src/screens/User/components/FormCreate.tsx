import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { IUser } from "../../../api/types/IUser";
import { Picker } from "@react-native-picker/picker";
import { getAllMock } from "../../../api/apiPerson"; // 👈 servicio de Person

interface Props {
    user: IUser;
    handleChange: (field: keyof IUser, value: string | boolean | number) => void;
}

const FormCreate: React.FC<Props> = ({ user, handleChange }) => {
    const [persons, setPersons] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const fetchPersons = async () => {
            const data = await getAllMock();
            setPersons(data);
        };
        fetchPersons();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Email */}
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el correo electrónico"
                value={user.email}
                onChangeText={(text) => handleChange("email", text)}
            />

            {/* Password */}
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese la contraseña"
                secureTextEntry
                value={user.password}
                onChangeText={(text) => handleChange("password", text)}
            />

            {/* Relación con Person */}
            <Text style={styles.label}>Persona asociada</Text>
            <View style={styles.selectContainer}>
                <Picker
                    selectedValue={user.personId}
                    onValueChange={(value) => handleChange("personId", value)}
                    style={styles.picker}
                    dropdownIconColor="#495057"
                >
                    <Picker.Item label="Seleccione una persona" value="" />
                    {persons.map((p) => (
                        <Picker.Item key={p.id} label={p.name} value={p.id} />
                    ))}
                </Picker>
            </View>

            {/* Switch Activo */}
            <View style={styles.switchContainer}>
                <Text style={styles.label}>Activo</Text>
                <Switch
                value={!user.isDelete} // 👈 activo = !isDelete
                onValueChange={(value) => handleChange("isDelete", !value)}
                thumbColor={!user.isDelete ? "#4CAF50" : "#f4f3f4"}
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
