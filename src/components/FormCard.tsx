import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SimpleCardProps<T> {
  data: T;
  onEdit: () => void;
  onDelete: () => void;
  excludeKeys?: (keyof T)[];
}

function SimpleCard<T extends object>({
  data,
  onEdit,
  onDelete,
  excludeKeys = [],
}: SimpleCardProps<T>) {
  if (!data) {
    
    return (
      <View style={styles.card}>
        <Text style={styles.text}>⚠️ Datos no disponibles</Text>
      </View>
    );
  }

  // 🔹 Convertimos el objeto en array de [clave, valor]
  const entries = Object.entries(data).filter(
    ([key]) => !excludeKeys.includes(key as keyof T)
  );

  if (entries.length === 0) {
    return null; // si no hay nada que mostrar
  }

  // 🔹 Buscar el campo "name" si existe, sino el primer campo
  const titleEntry =
    entries.find(([key]) => key === "name") ?? entries[0];

  // 🔹 Filtrar el resto (los que no son el título)
  const otherEntries = entries.filter(([key]) => key !== titleEntry[0]);

  return (
    <View style={styles.card}>
      {/* Título en negrilla */}
      <Text style={styles.nombre}>{String(titleEntry[1])}</Text>

      {/* Resto de atributos */}
      {otherEntries.map(([key, value]) => (
        <Text key={key} style={styles.descripcion}>
          {String(value)}
        </Text>
      ))}

      {/* Acciones */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={onEdit}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#c1e9e9ff",
    borderRadius: 20,
    padding: 20,
    width: 320,
    minHeight: 160,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
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
    marginBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#34bdc7ff", // verde
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
