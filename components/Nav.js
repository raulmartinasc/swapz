import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";

const AddBtn = () => {};
const Offers = () => {};
const User = () => {};

const Tab = createBottomTabNavigator();

const Nav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="+" component={AddBtn} />
      <Tab.Screen name="Offers" component={Offers} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export default Nav;
