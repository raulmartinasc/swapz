import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import firebase from "firebase/compat/app";
import Comments from "./comments";
import { db } from "../firebaseConfig";

const SingleItem = (item) => {
  const itemDetails = item.route.params.item;
  const navigation = useNavigation();

  const handleNavigateToUser = () => {
    navigation.navigate("OtherUser", { user: itemDetails.username });
  };

  return (
    <View styles={styles.container}>
      <Text>Item: {itemDetails.itemName}</Text>
      <Image
        source={{ uri: itemDetails.itemImg }}
        style={{ width: 200, height: 200 }}
      />
      <TouchableOpacity onPress={handleNavigateToUser}>
        <Text>Posted by {itemDetails.username}</Text>
      </TouchableOpacity>
      <Text>Location:{itemDetails.itemLocation}</Text>
      <Text>Decription:{itemDetails.itemDescription}</Text>
      <Text>Tags: {itemDetails.itemTags}</Text>
      {Comments(item)}
    </View>
  );
};

export default SingleItem;

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
});
