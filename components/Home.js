import { StyleSheet, Text, View } from "react-native";
import { auth } from "../firebaseConfig";

const Home = () => {
  <View>
    <Text>Email: {auth.currentUser?.email}</Text>
    <Text>Hello</Text>
  </View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
