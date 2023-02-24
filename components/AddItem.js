import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, {useEffect} from "react";
import {useState} from "react";
import {collection, addDoc, Timestamp} from "firebase/firestore";
import {db} from "../firebaseConfig";
import ImageSelector from "./ImageSelector";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {NavigationContainer} from "@react-navigation/native";

const AddItem = () => {
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
      username: "username",
      itemName: itemName,
      itemLocation: itemLocation,
      itemDesc: itemDesc,
      itemTags: itemTags,
      itemImg: imageURL,
      time: currTime,
    };
    addDoc(collection(db, "items"), itemData)
      .then((res) => {
        navitation.replace("SingleItem");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //navigate to single item page once uploaded
  };
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
      <Image source={{uri: imageURL}} style={{width: 200, height: 200}} />
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
