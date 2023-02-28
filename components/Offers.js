import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {collection, query, where, getDocs} from "firebase/firestore";
import {Route, useNavigation} from "@react-navigation/native";
import {db} from "../firebaseConfig";
import React, {useEffect, useState, useContext} from "react";
import {UserContext} from "../Context/UserContext";

const Offers = () => {
  const {userInfo} = useContext(UserContext);
  const [offers, setOffers] = useState([]);
  //   console.log(userInfo);
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
    navigation.navigate("OtherUser", {user: offer.User});
  };

  console.log(offers);
  let key = 0;
  return (
    <ScrollView>
      <Text>Offers</Text>
      {offers.map((offer) => {
        key++;
        console.log(offer);
        return (
          <View key={key}>
            <Text>User: {offer.User}</Text>
            <Text>Posted at: {offer.Posted.toDate().toDateString()}</Text>
            <Text>Offer: {offer.Comment}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleNavigateToUser(offer);
              }}
            >
              <Text style={styles.buttonText}>View Profile</Text>
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
