import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { UserContext } from "../Context/UserContext";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

const User = ({ navigation }) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [items, setUserItems] = useState([]);

  useEffect(() => {
    const itemQ = query(
      collection(db, "items"),
      where("username", "==", userInfo.username)
    );
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
        Welcome <Text style={{ fontWeight: "bold" }}>{userInfo.firstName}</Text>
        !{" "}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        You are currently signed in as: {userInfo.username}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Your Email:</Text> {userInfo.email}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          title="Pick an image from camera roll"
          onPress={handleSelectImages}
        >
          <Text style={styles.buttonText}>
            <FontAwesome name="camera" size={18} color="white"></FontAwesome>
            {"  "}
            Image select
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={updateAvatarImg} style={styles.button}>
          <Text style={styles.buttonText}>Apply Avatar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          margin: 15,
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
  avatarContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: 150,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
export default User;
