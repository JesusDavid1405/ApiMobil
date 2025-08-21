import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SimpleCardProps {
  nombre: string;
  descripcion: string;
  onEdit: () => void;    // función para editar
  onDelete: () => void;  // función para eliminar
}

const SimpleCard: React.FC<SimpleCardProps> = ({ nombre, descripcion, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>

      {/* Contenedor de botones */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={onEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#007aff",
    borderRadius: 20,
    padding: 20,
    width: 320,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#34c759", // verde
  },
  deleteButton: {
    backgroundColor: "#ff3b30", // rojo
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SimpleCard;
