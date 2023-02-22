import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    });
  };
  const navigateToHome = () => {
    navigation.replace("AddItem");
  };

  return (
    <View>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>Hello</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToHome} style={styles.button}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default Home;
