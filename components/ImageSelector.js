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
        // console.log(err);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        style={styles.buttonContainer}
        title="Pick an image from camera roll"
        onPress={handleSelectImages}
      >
        <Text style={styles.buttonText}>
          <FontAwesome name="camera" size={18} color="white"></FontAwesome>
          {"  "}
          Image select
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            marginTop: 10,
            width: 150,
            height: 150,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: "#ddd",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1.8,
            shadowRadius: 4,
            elevation: 5,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 1,
  },
  buttonContainer: {
    flex: 1,
    width: 150,
    marginTop: 15,
    backgroundColor: "#0782F9",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

//with this component, we still need to upload to db under the items collection or the user collection for user pfp
