import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoltackParamsList } from "../../navigations/types";
import { useEffect, useState } from "react";
import { IRol } from "../../api/types/IRol";
import { getAllRol } from "../../api/apiRol";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { ActivityIndicator, FlatList } from "react-native";
import SimpleCard from "../../components/FormCard";

type RolScreenNavigationProp = NativeStackNavigationProp<
    RoltackParamsList,
    "RolList"
>

const RolScreen = () => {
    const navigation = useNavigation<RolScreenNavigationProp>();
    const [Roles, setRoles] = useState<IRol[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchRoles = async () => {
            const data = await getAllRol();
            
            if(Array.isArray(data)) {
                setRoles(data);
                console.log("Libros:", data);
            }
            setLoading(false);
        };

        fetchRoles();
    }, []);

    if(loading){
        return (
            <View>
                <ActivityIndicator size="large" color="fff" />
            </View>
        );
    }

    return(
        <View>
            <FlatList
                data={Roles}
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

export default RolScreen;

