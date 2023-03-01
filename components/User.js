import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useContext, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { UserContext } from "../Context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

const User = ({ navigation }) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [image, setImage] = useState("");

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    });
  };

  const handleSelectImages = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0,
      });
      if (!response.canceled) {
        setImage(response.assets[0].uri);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          avatarImg: response.assets[0].uri,
        }));
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const updateAvatarImg = async () => {
    const userRef = doc(db, "users", auth.currentUser.email);
    try {
      await updateDoc(userRef, {
        avatarImg: image,
      });

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        avatarImg: image,
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: userInfo.avatarImg }} style={styles.image} />
      <Text style={styles.text}>Hello {userInfo.firstName}!</Text>
      <Text style={styles.text}>
        You are currently signed in as: {userInfo.username}
      </Text>
      <Text style={styles.text}>Email: {auth.currentUser?.email}</Text>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleSelectImages} style={styles.button}>
          <FontAwesome name="camera" size={18} color="white">
            {"   Select Avatar "}
          </FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateAvatarImg} style={styles.button}>
          <Text style={styles.buttonText}>Apply Avatar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    textAlign: "center",
  },
  image: {
    width: 210,
    height: 200,
    borderRadius: 500,
    marginBottom: 30,
    borderWidth: 5,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0782f9",
    width: "51%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
export default User;
