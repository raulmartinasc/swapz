import React from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageSelector({ image, setImage }) {
  const handleSelectImages = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0,
    })
      .then((response) => {
        if (!response.canceled) {
          return response.assets[0].uri;
        }
      })
      .then((imageUri) => {
        setImage(imageUri);
        console.log(image, "image in imageselector.js");
      })
      .catch((err) => {
        console.log(err);
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
