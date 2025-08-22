import React from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { IPermission } from "../../../api/types/IPermission";


interface Props {
    permission: IPermission;
    handleChange: (field: keyof IPermission, value: string | boolean) => void;
}

const Form: React.FC<Props> = ({ permission, handleChange }) =>{
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el nombre"
                value={permission.name}
                onChangeText={(text) => handleChange("name", text)}
            />
            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ingrese la descripción"
                multiline
                numberOfLines={4}
                value={permission.description}
                onChangeText={(text) => handleChange("description", text)}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Activo</Text>
                <Switch
                value={permission.isDelete}
                onValueChange={(value) => handleChange("isDelete", value)}
                thumbColor={permission.isDelete ? "#4CAF50" : "#f4f3f4"}
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
        marginBottom: 16,
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
        marginBottom: 16,
        paddingVertical: 10,
    },
});

export default Form;