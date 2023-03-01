import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Route, useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const OtherUser = ({ route }) => {
  const navigation = useNavigation();
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

  const navigateToItem = (item) => {
    navigation.navigate("SingleItem", { item });
  };

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
        style={{
          alignSelf: "center",
          marginTop: 30,
          margin: 5,
          width: 210,
          height: 200,
          borderRadius: 200,
          borderWidth: 2,
          borderColor: "#ddd",
        }}
      />
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        You are currently at{" "}
        <Text style={{ fontWeight: "bold" }}>{userInfo.firstName}'s</Text> page
      </Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        {userInfo.username}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Email:</Text> {userInfo.email}
      </Text>

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          margin: 5,
        }}
      >
        Your Items
      </Text>
      <FlatList
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

export default OtherUser;

const styles = StyleSheet.create({
  container: {
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
