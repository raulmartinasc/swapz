import Home from "./Home";
import User from "./User";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AddItem from "./AddItem";
import {FontAwesome, MaterialIcons, Ionicons} from "@expo/vector-icons";
import SingleItem from "./SingleItem";
import HomeScreen from "./HomeScreen";
import Offers from "./Offers";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Add Item"
        component={AddItem}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="add-circle" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name="user" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Swaps"
        component={Offers}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <MaterialIcons
                name="swap-horizontal-circle"
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
