import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import SingleItem from "./SingleItem";
import OtherUser from "./OtherUser";
const HomeStack = createNativeStackNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen name="SingleItem" component={SingleItem} />
      <HomeStack.Screen name="OtherUser" component={OtherUser} />
    </HomeStack.Navigator>
  );
}
