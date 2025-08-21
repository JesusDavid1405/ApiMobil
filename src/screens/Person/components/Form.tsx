import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IForm } from "../../../api/types/IForm";
import { IPerson } from "../../../api/types/IPerson";

interface Props {
    person: IPerson;
    handleChange: (field: keyof IPerson, value: string | boolean) => void;
}
const Form: React.FC<Props> = ({ person, handleChange }) =>{
    const [selectedValue, setSelectedValue] = useState(person.typeDocument || "CC");

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nombres</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese los nombres"
                value={person.name}
                onChangeText={(text) => handleChange("name", text)}
            />
            <Text style={styles.label}>Apellidos</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese los apellidos"
                value={person.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
            />
            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ingrese la descripción"
                multiline
                numberOfLines={4}
                value={person.description}
                onChangeText={(text) => handleChange("description", text)}
            />
            <Text style={styles.label}>Tipo de Documento</Text>
            <View style={styles.selectContainer}>
                <Picker
                    selectedValue={person.typeDocument}
                    onValueChange={(itemValue) => handleChange("typeDocument", itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#495057"
                >
                    <Picker.Item label="Cedula de Ciudadania" value="CC" />
                    <Picker.Item label="Tarjeta de Identidad" value="TI" />
                    <Picker.Item label="Pasaporte" value="PP" />
                    <Picker.Item label="Registro Civil" value="RC" />
                </Picker>
            </View>
            <Text style={styles.label}>Numero de Documento</Text>
            <TextInput
                style={[styles.input]}
                placeholder="Ingrese el numero de documento"
                multiline
                value={person.documentNumber}
                onChangeText={(text) => handleChange("documentNumber", text)}
            />
            <Text style={styles.label}>Telefono</Text>
            <TextInput
                style={[styles.input]}
                placeholder="Ingrese el numero de Telefono"
                multiline
                value={person.phone}
                onChangeText={(text) => handleChange("phone", text)}
            />
            <Text style={styles.label}>Dirección</Text>
            <TextInput
                style={[styles.input]}
                placeholder="Ingrese la dirección"
                multiline
                value={person.address}
                onChangeText={(text) => handleChange("address", text)}
            />
            <View style={styles.switchContainer}>
                <Text style={styles.label}>Activo</Text>
                <Switch
                value={person.isDelete}
                onValueChange={(value) => handleChange("isDelete", value)}
                thumbColor={person.isDelete ? "#4CAF50" : "#f4f3f4"}
                trackColor={{ false: "#ccc", true: "#81C784" }}
                />
            </View>
        </ScrollView>
    );
}


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
    textArea: {
        height: 100,
        textAlignVertical: "top",
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
        borderColor: "#ddd", // gris bootstrap
        borderRadius: 6,
        marginBottom: 16,
        backgroundColor: "#fff",
        overflow: "hidden", // hace que el Picker no se salga del borde redondeado
    },
    picker: {
        fontSize: 15,
        color: "#555555ff", // texto negro bootstrap
    },
});

export default Form;