import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

export default function ImageSelector({ image, setImage }) {
  const [selectedImages, setSelectedImages] = useState([]);
  // console.log(selectedImages);
  const handleSelectImages = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((response) => {
        // console.log(response);
        if (!response.canceled) {
          return response.assets[0].uri;
          // return selectedImages;
        }
      })
      .then((imageUri) => {
        console.log(imageUri);
        uploadImage(imageUri);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadImage = async (uri) => {
    // console.log(uri, "uri");
    const storage = getStorage();
    const filename = uri.split("/").pop();
    const imageRef = storageRef(storage, `images/${filename}`);
    const response = await fetch(uri);
    const blob = await response.blob();
    return uploadBytes(imageRef, blob).catch((error) => {
      console.log("Error uploading image: ", error);
      return null;
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Pick an image from camera roll"
        onPress={handleSelectImages}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

//with this component, we still need to upload to db under the items collection or the user collection for user pfp
