import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import React from "react";
import {useContext, useState} from "react";
import {auth, db} from "../firebaseConfig";
import {signOut} from "firebase/auth";
import {UserContext} from "../Context/UserContext";
import {doc, updateDoc} from "firebase/firestore";

const User = ({navigation}) => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [update, setUpdate] = useState(false);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    });
  };

  const updateAvatarImg = () => {
    const userRef = doc(db, "users", auth.currentUser.email);
    updateDoc(userRef, {
      avatarImg:
        "https://i.pinimg.com/originals/cf/35/76/cf35760687430b2228bc55ac2b182227.jpg",
    });
  };

  console.log(userInfo);
  return (
    <View>
      <Image
        source={{uri: userInfo.avatarImg}}
        style={{width: 200, height: 200}}
      />
      <Text>Hello {userInfo.firstName}!</Text>
      <Text>You are currently signed in as: {userInfo.username}</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={updateAvatarImg} style={styles.button}>
        <Text style={styles.buttonText}>update to cool image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
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

export default User;
