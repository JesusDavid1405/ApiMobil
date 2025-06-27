import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BooktackParamsList } from "../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IForm } from "../api/types/IForm";
import { getAllBook } from "../api/apiForm";
import SimpleCard from "../components/FormCard";

type BookScreenNavigationProp = NativeStackNavigationProp<
  BooktackParamsList,
  "BookList"
>;

const HomeScreen = () => {
  const navigation = useNavigation<BookScreenNavigationProp>();
  const [books, setBooks] = useState<IForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBook();
      if (Array.isArray(data)) {
        setBooks(data);
        console.log("📚 Libros:", data);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <SimpleCard
            nombre={item.name}
            descripcion={item.description}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  touch: {
    margin: 5,
    backgroundColor: "#1e90ff", // azul tipo botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // sombra en Android
    width: 150,
  },
});

export default HomeScreen;
