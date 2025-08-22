import React from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { IUser } from "../../../api/types/IUser";


interface Props {
    user: IUser;
    handleChange: (field: keyof IUser, value: string | boolean) => void;
}

const FormEdit: React.FC<Props> = ({ user, handleChange }) =>{
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Correo Electronico</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el correo electronico"
                value={user.email}
                onChangeText={(text) => handleChange("email", text)}
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={[styles.input]}
                placeholder="Ingrese la contraseña"
                multiline
                numberOfLines={4}
                value={user.password}
                onChangeText={(text) => handleChange("password", text)}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Activo</Text>
                <Switch
                value={user.isDelete}
                onValueChange={(value) => handleChange("isDelete", value)}
                thumbColor={user.isDelete ? "#4CAF50" : "#f4f3f4"}
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

export default FormEdit;