import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
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
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image
          source={{ uri: itemDetails.itemImg }}
          style={[styles.image, { alignSelf: "center" }]}
        />
        <View style={styles.row}>
          <Text style={styles.bold}>Posted by: </Text>
          <TouchableOpacity onPress={handleNavigateToUser}>
            <Text>{itemDetails.username}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Location: </Text>
          <Text>{itemDetails.itemLocation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Tags: </Text>
          <Text>{itemDetails.itemTags}</Text>
        </View>
        <Text style={styles.description}>{itemDetails.itemDescription}</Text>
        {Comments(item)}
      </View>
    </ScrollView>
  );
};

export default SingleItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 210,
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 20,
    borderWidth: 5,
    borderColor: "#ddd",
  },
  detailsContainer: {
    marginTop: 26,
    margin: 10,
    padding: 20,
    borderRadius: 5,
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  description: {
    margin: -40,
  },
});
