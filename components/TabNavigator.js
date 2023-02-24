import Home from "./Home";
import User from "./User";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddItem from "./AddItem";
import { AntDesign } from "@expo/vector-icons";
import SingleItem from "./SingleItem";
import HomeScreen from "./HomeScreen";

const Offers = () => {};
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Add Item"
        component={AddItem}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="pluscircle" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="user" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Swaps"
        component={Offers}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="swap" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
