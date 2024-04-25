import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons/'
import { Home } from './pages/index'
import { Jogo } from './pages/paginaJogo'
import { Serie } from './pages/paginaSérie'
import { Recomendacao } from './pages/paginaFilme'

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="egg" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="egg-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="Jogo"
                component={Jogo}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="barbell" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="barbell-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="Série"
                component={Serie}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="football" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="football-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="recomendacao"
                component={Recomendacao}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="videocam" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="videocam-outline" />)
                    }
                }}
            />
        </Tab.Navigator>
    )
}