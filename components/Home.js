import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import {doc, getDoc, collection, getDocs} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {useEffect, useState, useContext} from "react";
import {UserContext} from "../Context/UserContext";

const Home = ({navigation}) => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [displayUsername, setDisplayUsername] = useState("not loaded");
  useEffect(() => {
    getDocs(collection(db, "items")).then((result) => {
      setItems(
        result.docs.map((item) => {
          return item.data();
        })
      );
    });
  }, []);

  // useEffect(() => {
  //   setDisplayUsername(userInfo.username);
  // }, [items]);
  let key = 0;

  const navigateToItem = (item) => {
    navigation.navigate("SingleItem", {item});
  };

  const numColumns = 3; // change this to change number of columns
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth / numColumns - 20; // subtracting 20 for margin

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          return navigateToItem(item);
        }}
      >
        <View style={[styles.card, {width: cardWidth}]}>
          <Image source={{uri: item.itemImg}} style={styles.cardImage} />
          <Text style={styles.cardText}>{item.itemName} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
    flex: 1,
    backgroundColor: "#fff",
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
});

export default Home;
