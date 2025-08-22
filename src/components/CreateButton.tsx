import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface CreateButtonProps {
    label: string;
    onPress: () => void;
    icon?: string; // nombre del ícono Feather
}

const CreateButton: React.FC<CreateButtonProps> = ({ label, onPress, icon }) => {
    return (
        <TouchableOpacity style={[styles.addButton]} onPress={onPress}>
            {icon && <Feather name={icon} size={18} color="#fff" style={{ marginRight: 6 }} />}
            <Text style={[styles.addButtonText]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "#467594ff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default CreateButton;