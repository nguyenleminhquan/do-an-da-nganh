import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Login from "./Login"
import Register from "./Register"
import Main from "./Main"

const Stack = createNativeStackNavigator()

function RootScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default RootScreen
