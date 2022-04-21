import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../misc/colors';
import Home from './Home';
import Logs from './Logs';
import Messages from './Messages';
import TimerScreen from './TimerScreen';

const Tab = createBottomTabNavigator();


function Main() {
  //const [a, seta] = useState(1);
  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.MAIN,
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: colors.MAIN
      }}
    >
      <Tab.Screen name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-home" size={24} color={color} />
        }}
      />
      <Tab.Screen name="TimerScreen" component={TimerScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="timer" size={24} color={color} />
        }}
      />
      <Tab.Screen name="Messages" component={Messages}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="notifications-sharp" size={24} color={color} />
        }} />
      <Tab.Screen name="Logs" component={Logs}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="history" size={24} color={color} />
        }}
      />
    </Tab.Navigator>

  );
}

export default Main;
