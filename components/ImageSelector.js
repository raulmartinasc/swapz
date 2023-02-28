import React from "react";
import { Button, Image, TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native-web";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={styles.buttonContainer}
        title="Pick an image from camera roll"
        onPress={handleSelectImages}
      >
        <FontAwesome name="camera" size={24} color="black" />
        <Text>Pick an image from camera roll</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 1,
  },
  buttonContainer: {
    flex: 0,
    width: 200,
    justifyContent: "center",
  },
});

//with this component, we still need to upload to db under the items collection or the user collection for user pfp
