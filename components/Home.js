import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import {doc, getDoc, collection, getDocs} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {useEffect, useState} from "react";

const Home = ({navigation}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "items")).then((result) => {
      setItems(
        result.docs.map((item) => {
          return item.data();
        })
      );
    });
  }, []);
  let key = 0;

  const navigateToItem = (item) => {
    // console.log(item);
    navigation.navigate("SingleItem", {item});
  };

  return (
    <View>
      {items.map((item) => {
        key++;
        // console.log(item, "CONSOLE LOG HERE");
        return (
          <View key={key}>
            <Text>{item.itemName}</Text>
            <TouchableOpacity
              onPress={() => {
                return navigateToItem(item);
              }}
            >
              <Image
                source={{uri: item.itemImg}}
                style={{width: 200, height: 200}}
              />
              {console.log(item.itemImg)}
            </TouchableOpacity>
          </View>
        );
      })}
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default Home;
