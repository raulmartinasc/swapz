import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { auth } from "../firebaseConfig";
import {signOut} from "firebase/auth"
import { NavigationContainer } from "@react-navigation/native";


const Home = () => {


const Home = ({navigation}) => {


  const handleSignOut = () => {
    signOut(auth).then(() => {
        navigation.replace('Login')
    })

  }

return (

  <View>
    <Text>Email: {auth.currentUser?.email}</Text>
    <Text>Hello</Text>
    <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  </View>
)
}};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
