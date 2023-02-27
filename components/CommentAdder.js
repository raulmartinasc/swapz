import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {useEffect, useState, useContext} from "react";
import {UserContext} from "../Context/UserContext";

const CommentAdder = (documentId) => {
  console.log(documentId);
  const [commentText, setCommentText] = useState("");
  const {userInfo, setUserInfo} = useContext(UserContext);
  const time = Timestamp.now();
  const currTime = time.toDate();

  console.log(commentText);

  const submitComment = () => {
    const newCommentData = {
      User: userInfo.username,
      Comment: commentText,
      Posted: currTime,
    };
    const subColRef = collection(db, "items", documentId, "Comments");
    addDoc(subColRef, newCommentData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setCommentText("");
  };

  return (
    <ScrollView style={{marginTop: 70}}>
      <TextInput
        style={styles.textInput}
        placeholder="Add new comment"
        value={commentText}
        onChangeText={(commentText) => setCommentText(commentText)}
      />
      <TouchableOpacity onPress={submitComment} style={styles.button}>
        <Text style={styles.buttonText}>Submit Comment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CommentAdder;

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
