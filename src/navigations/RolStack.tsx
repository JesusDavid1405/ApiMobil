import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RolScreen from "../screens/Rol/RolList";

const Stack = createNativeStackNavigator();

export default function RolStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="RolList"
            component={RolScreen}
            options={{ headerShown: false }}
        />
      {/* Aquí puedes agregar más pantallas como RolUpdate */}
    
    </Stack.Navigator>
  );
}