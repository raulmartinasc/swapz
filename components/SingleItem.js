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
import React, { useState, useEffect, useContext } from "react";
import { signOut } from "firebase/auth";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import Comments from "./comments";
import { db } from "../firebaseConfig";
import { UserContext } from "../Context/UserContext";

const SingleItem = (item) => {
  const [documentId, setDocumentId] = useState("");
  const itemDetails = item.route.params.item;
  const navigation = useNavigation();
  const [isOwnPost, setIsOwnPost] = useState(false);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const getDocumentId = async () => {
      const q = query(
        collection(db, "items"),
        where("itemName", "==", `${itemDetails.itemName}`)
      );
      const querySnapshot = await getDocs(q);
      const documentId = querySnapshot.docs[0].id;
      return documentId;
    };
    getDocumentId().then((docId) => {
      setDocumentId(docId);
    });
  }, []);

  const handleDelete = () => {
    console.log(documentId);
    deleteDoc(doc(db, `items`, documentId))
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        console.log("item deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNavigateToUser = () => {
    navigation.navigate("OtherUser", { user: itemDetails.username });
  };

  useEffect(() => {
    if (userInfo.username === itemDetails.username) {
      console.log("own post");
      setIsOwnPost(true);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image source={{ uri: itemDetails.itemImg }} style={styles.image} />
        <View style={styles.row}>
          <Text style={styles.bold}>Posted by: </Text>
          <Text>{itemDetails.username}</Text>
        </View>
        {isOwnPost ? (
          <TouchableOpacity onPress={handleDelete} style={styles.button}>
            <Text style={styles.buttonText}>Delete Item</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleNavigateToUser} style={styles.button}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.bold}>Location: </Text>
          <Text>{itemDetails.itemLocation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Tags: </Text>
          <Text>{itemDetails.itemTags}</Text>
        </View>
        <Text style={styles.description}>{itemDetails.itemDescription}</Text>
      </View>
      {Comments(item)}
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
    width: 211,
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 20,
    borderWidth: 5,
    borderColor: "#ddd",
    alignSelf: "center",
  },
  detailsContainer: {
    marginTop: 26,
    margin: 3,
    padding: 20,
    borderRadius: 5,
  },
  bold: { fontWeight: "bold" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  description: {
    margin: -40,
  },
  button: {
    backgroundColor: "#0782f9",
    width: 115,
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
