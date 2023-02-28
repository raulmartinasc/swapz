import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Route } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const OtherUser = ({ route }) => {
  const { user } = route.params;
  const [userInfo, setUserInfo] = useState([]);
  const [items, setUserItems] = useState([]);
  useEffect(() => {
    const userQ = query(collection(db, "users"), where("username", "==", user));
    getDocs(userQ).then((res) => {
      res.forEach((doc) => {
        setUserInfo(doc.data());
      });
    });
  }, []);
  useEffect(() => {
    const itemQ = query(collection(db, "items"), where("username", "==", user));
    getDocs(itemQ).then((res) => {
      setUserItems(
        res.docs.map((doc) => {
          return doc.data();
        })
      );
    });
  }, []);

  const numColumns = 3; // change this to change number of columns
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth / numColumns - 20; // subtracting 20 for margin

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          return navigateToItem(item);
        }}
      >
        <View style={[styles.card, { width: cardWidth }]}>
          <Image source={{ uri: item.itemImg }} style={styles.cardImage} />
          <Text style={styles.cardText}>{item.itemName} </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Image
        source={{ uri: userInfo.avatarImg }}
        style={{ width: 200, height: 200 }}
      />
      <Text>You are currently at {userInfo.firstName}'s page</Text>
      <Text>{userInfo.username}</Text>
      <Text>Email: {userInfo.email}</Text>
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
    </View>
  );
};

export default OtherUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  card: {
    width: "30%",
    margin: 6,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    elevation: 9,
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardText: {
    fontSize: 10.1,
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  refreshButton: {
    backgroundColor: "#00ADEF",
    padding: 10,
    borderRadius: 50,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "center",
  },
  refreshButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
