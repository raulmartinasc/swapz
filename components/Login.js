import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { Image } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../Context/UserContext";
const logo = require("../swap.png");

const Login = ({ navigation }) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegister = () => {
    navigation.replace("Registration");
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.email);
        getDoc(docRef).then((res) => {
          setUserInfo(res.data());
        });
        navigation.replace("Main");
      }
    });
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential;
      const docRef = doc(db, "users", user._tokenResponse.email);
      getDoc(docRef).then((res) => {
        setUserInfo(res.data());
      });
      console.log(`Logged in with ${user._tokenResponse.email}`);
      setLoggedIn(true);
    });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles}>You are in Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>New user? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 12,
    padding: 10,
    height: 40,
    width: 170,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "500",
    fontSize: 16,
  },
  logo: {
    height: 100,
    width: 350,
  },
});

export default Login;
