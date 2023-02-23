import Home from "./Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddItem from "./AddItem";
import { AntDesign } from "@expo/vector-icons";
const User = () => {};
const Offers = () => {};
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
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
