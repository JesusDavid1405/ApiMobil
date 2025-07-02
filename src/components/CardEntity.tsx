import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Icono de lupa

interface infoCard{
    title: string;
    description: string;
    count: string;
    onPress: () => void;
}

const InfoCard: React.FC<infoCard> = ({ title, description, count, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.count}>{count}</Text>
        <TouchableOpacity style={styles.iconButton} onPress={onPress}>
          <Feather name="search" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#345093', // Azul similar al de la imagen
    borderRadius: 20,
    padding: 16,
    width: 180,
    height: 140,
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    color: '#D0D0D0',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconButton: {
    backgroundColor: '#1F2A38', // Fondo del botón de lupa
    padding: 10,
    borderRadius: 20,
  },
});


export default InfoCard;
