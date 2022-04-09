import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Logs from './Logs';
import Messages from './Messages';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import colors from '../misc/colors';

const Tab = createBottomTabNavigator();


function Main() {
  //const [a, seta] = useState(1);
  return (

        <Tab.Navigator
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: colors.MAIN,
                tabBarInactiveTintColor:'white',
                tabBarActiveBackgroundColor: 'white',
                tabBarInactiveBackgroundColor: colors.MAIN
            }}
        >
            <Tab.Screen name="Home" 
              component={Home}
              options={{
                tabBarIcon:({color}) => <Ionicons name="ios-home" size={24} color={color} />
              }}
            />
            <Tab.Screen name="Messages" component={Messages} 
             options={{
              tabBarIcon:({color}) => <Ionicons name="notifications-sharp" size={24} color={color}/>
            }}/>
            <Tab.Screen name="Logs" component={Logs} 
              options={{
                tabBarIcon:({color}) => <FontAwesome name="history" size={24} color={color}/>
            }}
            />
        </Tab.Navigator>

  );
}

export default Main;
