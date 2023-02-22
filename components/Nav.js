import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";

const addBtn = () => {};
const offers = () => {};
const user = () => {};

const Tab = createBottomTabNavigator();

const Nav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="add" component={addBtn} />
      <Tab.Screen name="offers" component={offers} />
      <Tab.Screen name="user" component={user} />
    </Tab.Navigator>
  );
};

export default Nav;
