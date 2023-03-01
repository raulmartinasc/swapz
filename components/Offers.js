import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Route, useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Offers = () => {
  const { userInfo } = useContext(UserContext);
  const [offers, setOffers] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const offersQ = query(
      collection(db, "comments"),
      where("OriginalPoster", "==", userInfo.username)
    );
    getDocs(offersQ).then((res) => {
      setOffers(
        res.docs.map((doc) => {
          return doc.data();
        })
      );
    });
  }, []);

  const handleNavigateToUser = (offer) => {
    console.log(offer.User);
    navigation.navigate("OtherUser", { user: offer.User });
  };

  console.log(offers);
  let key = 0;
  return (
    <ScrollView>
      <Text>Offers</Text>
      {offers.map((offer) => {
        key++;
        // console.log(offer);
        return (
          <View key={key} style={styles.commentBox}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>User: </Text>
              {offer.User}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Posted at:</Text>{" "}
              {offer.Posted.toDate().toDateString()}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Offer: </Text>{" "}
              {offer.Comment}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#0782f9",
                width: 110,
                margin: 10,
                padding: 8,
                borderRadius: 10,
                alignItems: "center",
                alignSelf: "center",
              }}
              onPress={() => {
                handleNavigateToUser(offer);
              }}
            >
              <Text style={{ color: "white" }}>View Profile</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Offers;

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
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    height: 40,
  },
  commentBox: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    elevation: 9,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
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
