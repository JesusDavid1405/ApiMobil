import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAllBook } from "../../api/apiForm";
import SimpleCard from "../../components/FormCard";
import { FormtackParamsList } from "../../navigations/types";
import { IForm } from "../../api/types/IForm";


type BookScreenNavigationProp = NativeStackNavigationProp<
  FormtackParamsList,
  "FormList"
>;

const FormScreen = () => {
    const navigation = useNavigation<BookScreenNavigationProp>();
    const [books, setBooks] = useState<IForm[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
        const data = await getAllBook();
        if (Array.isArray(data)) {
            setBooks(data);
            console.log("📚 Form:", data);
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
}

export default FormScreen();