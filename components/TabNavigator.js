import Home from "./Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddItem from "./AddItem";
const User = () => {};
const Offers = () => {};
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add Item" component={AddItem} />
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="Offers" component={Offers} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
