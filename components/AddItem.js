import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { db } from "../firebaseConfig";
import ImageSelector from "./ImageSelector";

const AddItem = () => {
  const time = Timestamp.now();
  const currTime = time.toDate();
  const [itemName, setItemName] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemTags, setItemTags] = useState("");
  const [image, setImage] = useState(null);

  const submitItem = () => {
    //future idea, split the tags by commas and post an array, would need to find a way to index through and query maybe we can use .includes()
    const itemData = {
      username: "username",
      itemName: itemName,
      itemLocation: itemLocation,
      itemDesc: itemDesc,
      itemTags: itemTags,
      itemImg: image,
      time: currTime,
    };
    addDoc(collection(db, "items"), itemData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //navigate to single item page once uploaded
  };
  useEffect(() => {
    const uploadImage = async (uri) => {
      const storage = getStorage();
      const filename = uri.split("/").pop();
      const imageRef = storageRef(storage, `images/${filename}`);
      const response = await fetch(uri);
      console.log(uri);
      const blob = await response.blob();
      return uploadBytes(imageRef, blob).catch((error) => {
        console.log("Error uploading image: ", error);
        return null;
      });
    };
  }, [image]);

  return (
    <ScrollView>
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
      {/* <TextInput
        style={styles.textInput}
        placeholder="image url"
        value={itemImg}
        onChangeText={(itemImg) => setItemImg(itemImg)}
      /> */}
      <TextInput
        style={styles.textInput}
        placeholder="Tags/Category"
        value={itemTags}
        onChangeText={(itemTags) => setItemTags(itemTags)}
      />
      <ImageSelector image={image} setImage={setImage} />
      <TouchableOpacity
        onPress={(image) => uploadImage(image)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>upload image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={submitItem} style={styles.button}>
        <Text style={styles.buttonText}>Submit Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddItem;

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