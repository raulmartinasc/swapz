import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { setDoc, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Registration = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [activeUsernames, setActiveUsernames] = useState([]);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "CurrentUsernames", "currentUsernames"))
      .then((res) => {
        setActiveUsernames(res.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const returnToLogin = () => {
    navigation.replace("Login");
  };

  const handleSignUp = () => {
    if (activeUsernames.usernames.includes(username)) {
      setUsernameTaken(true);
      return;
    } else {
      setUsernameTaken(false);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential;
          console.log(`registered with with ${user._tokenResponse.email}`);
          setDoc(doc(db, "users", email.toLowerCase()), {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: auth.currentUser?.email,
            avatarImg:
              "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png",
          })
            .then(() => {
              setIsEmailCorrect(true);
              updateDoc(doc(db, "CurrentUsernames", "currentUsernames"), {
                usernames: arrayUnion(username),
              });
              const docRef = doc(db, "users", auth.currentUser?.email);
              return docRef;
            })
            .then((docRef) => {
              const userInfo = getDoc(docRef);
              return userInfo;
            })
            .then((userInfoData) => {
              setUserInfo(userInfoData.data());
            })
            .then(() => {
              navigation.replace("Home");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          setIsEmailCorrect(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Register</Text>
        {usernameTaken ? (
          <TextInput
            style={[styles.textInput, { borderColor: "red" }]}
            placeholder="username"
            value={username}
            onChangeText={(username) => setUsername(username)}
          />
        ) : (
          <TextInput
            style={[
              styles.textInput,
              { borderColor: "black", alignSelf: "center" },
            ]}
            placeholder="username"
            value={username}
            onChangeText={(username) => setUsername(username)}
          />
        )}

        {/* style this and make it red */}
        {usernameTaken ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: -10 }}>
            Username is already taken
          </Text>
        ) : null}

        <TextInput
          style={[styles.textInput, { alignSelf: "center" }]}
          placeholder="Firstname"
          value={firstName}
          onChangeText={(firstName) => setFirstname(firstName)}
        />
        <TextInput
          style={[styles.textInput, { alignSelf: "center" }]}
          placeholder="Lastname"
          value={lastName}
          onChangeText={(lastName) => setLastname(lastName)}
        />
        {isEmailCorrect ? (
          <TextInput
            style={[styles.textInput, { borderColor: "black" }]}
            placeholder="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        ) : (
          <TextInput
            style={[
              styles.textInput,
              { borderColor: "red", alignSelf: "center" },
            ]}
            placeholder="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        )}
        {isEmailCorrect ? (
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        ) : (
          <View>
            <TextInput
              style={[
                styles.textInput,
                { borderColor: "red", alignSelf: "center" },
              ]}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
            <Text style={{ textAlign: "center" }}>E-mail must be valid</Text>
            <Text style={{ textAlign: "center" }}>
              Password must have at least 6 characters
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={returnToLogin} style={styles.button}>
          <Text style={styles.buttonText}>Already signed up?</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginTop: 80,
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
});

export default Registration;
