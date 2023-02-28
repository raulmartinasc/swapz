import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ImageSelector from "./ImageSelector";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NavigationContainer } from "@react-navigation/native";
import { UserContext } from "../Context/UserContext";

const AddItem = ({ navigation }) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const time = Timestamp.now();
  const currTime = time.toDate();
  const [itemName, setItemName] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemTags, setItemTags] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
  );
  const uploadImage = async () => {
    const storage = getStorage();
    const filename = image.split("/").pop();
    const imageRef = ref(storage, `items/${filename}`);

    // Upload the image to Firebase Storage
    const response = await fetch(image);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);

    // Get the download URL of the uploaded image
    const url = await getDownloadURL(imageRef);
    console.log(url, "image url in upload image func");
    setImageURL(url);
  };

  const submitItem = () => {
    //future idea, split the tags by commas and post an array, would need to find a way to index through and query maybe we can use .includes()
    const itemData = {
      username: userInfo.username,
      itemName: itemName,
      itemLocation: itemLocation,
      itemDesc: itemDesc,
      itemTags: itemTags,
      itemImg: imageURL,
      time: currTime,
    };
    addDoc(collection(db, "items"), itemData)
      .then((res) => {
        navigation.navigate("Home");
        setItemName("");
        setItemLocation("");
        setItemDesc("");
        setItemTags("");
      })
      .catch((err) => {
        console.log(err, "catch block addDoc in addItem.js");
      });

    setImage(null);
  };
  return (
    <ScrollView style={{ marginTop: 70 }}>
      <View></View>
      <TextInput
        style={styles.textInput}
        placeholder="Item Name"
        value={itemName}
        onChangeText={(itemName) => setItemName(itemName)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Item Location"
        value={itemLocation}
        onChangeText={(itemLocation) => setItemLocation(itemLocation)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Item Description"
        value={itemDesc}
        onChangeText={(itemDesc) => setItemDesc(itemDesc)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Tags/Category"
        value={itemTags}
        onChangeText={(itemTags) => setItemTags(itemTags)}
      />
      <ImageSelector image={image} setImage={setImage} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={(image) => uploadImage(image)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Upload image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitItem} style={styles.button}>
          <Text style={styles.buttonText}>Submit Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 9,
    marginVertical: 10,
    padding: 12,
    height: 40,
    marginBottom: 15,
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
