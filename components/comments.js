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
  docRef,
  where,
  query,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {useEffect, useState, useContext} from "react";
import {UserContext} from "../Context/UserContext";

const Comments = (itemDetails) => {
  const [comments, setComments] = useState([]);
  const item = itemDetails.route.params.item.itemName;
  const {userInfo, setUserInfo} = useContext(UserContext);
  // console.log(item);
  const [documentId, setDocumentId] = useState("");

  const CommentAdder = () => {
    const [commentText, setCommentText] = useState("");
    const time = Timestamp.now();
    const currTime = time.toDate();

    console.log(commentText);

    const submitComment = (documentId) => {
      const newCommentData = {
        User: userInfo.username,
        Comment: commentText,
        Posted: currTime,
      };
      console.log(documentId);
      // const subColRef = collection(doc(db, "items", documentId), "Comments");
      addDoc(collection(db, `items/${documentId}/Comments`), newCommentData)
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
        <TouchableOpacity
          onPress={() => {
            submitComment(documentId);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit Comment</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  useEffect(() => {
    const getDocumentId = async () => {
      const q = query(
        collection(db, "items"),
        where("itemName", "==", `${item}`)
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs[0].id);
      const documentId = querySnapshot.docs[0].id;
      return documentId;
    };
    getDocumentId().then((docId) => {
      setDocumentId(docId);
      console.log(docId);
      getDocs(collection(db, `items/${docId}/Comments`)).then(
        (querySnapshot) => {
          console.log(querySnapshot);
          setComments(querySnapshot.docs.map((doc) => doc.data()));
        }
      );
    });
  }, []);

  return (
    <View>
      {CommentAdder()}
      <Text>Comments and Offers :</Text>
      {console.log(comments)}
      {comments.map((comment) => (
        <View key={comment.comment}>
          {/* {console.log(comment)} */}
          {/* {console.log(comment.Posted.toDate().toDateString())} */}
          <Text>User: {comment.User}</Text>
          <Text>Posted at: {comment.Posted.toDate().toDateString()}</Text>
          <Text>Comment: {comment.Comment}</Text>
        </View>
      ))}
    </View>
  );
};

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

export default Comments;
