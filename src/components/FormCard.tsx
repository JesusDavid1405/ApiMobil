import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface SimpleCardProps {
  nombre: string;
  descripcion: string;
}

const SimpleCard: React.FC<SimpleCardProps> = ({ nombre, descripcion }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#007aff", // azul brillante
    borderRadius: 40,
    padding: 20,
    width: 172,
    height: 161,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
    marginTop: 3,
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
  },
});


export default SimpleCard;
