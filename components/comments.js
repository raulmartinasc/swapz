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
  deleteDoc,
} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {useEffect, useState, useContext} from "react";
import {UserContext} from "../Context/UserContext";

const Comments = (itemDetails) => {
  const [comments, setComments] = useState([]);
  const item = itemDetails.route.params.item.itemName;
  const {userInfo} = useContext(UserContext);
  const [documentId, setDocumentId] = useState("");
  const [shouldShow, setShouldShow] = useState(false);

  const handleDelete = (id) => {
    deleteDoc(doc(db, `comments`, id)).then((res) => {
      console.log(res);
    });
  };

  const CommentAdder = () => {
    const [commentText, setCommentText] = useState("");
    const time = Timestamp.now();
    const currTime = time.toDate();

    const submitComment = () => {
      console.log(userInfo);
      const newCommentData = {
        itemId: documentId,
        User: userInfo.username,
        Comment: commentText,
        Posted: currTime,
        matches: false,
      };
      addDoc(collection(db, `comments`), newCommentData)
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
            submitComment();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit Comment</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  useEffect(() => {
    console.log(userInfo);
    const getDocumentId = async () => {
      const q = query(
        collection(db, "items"),
        where("itemName", "==", `${item}`)
      );
      const querySnapshot = await getDocs(q);
      const documentId = querySnapshot.docs[0].id;
      return documentId;
    };
    getDocumentId().then((docId) => {
      setDocumentId(docId);
      const commentQ = query(
        collection(db, "comments"),
        where("itemId", "==", `${docId}`)
      );
      getDocs(commentQ).then((querySnapshot) => {
        setComments(
          querySnapshot.docs.map((doc) => {
            let commentData = doc.data();
            commentData.id = doc.id;
            if (commentData.User === userInfo.username) {
              commentData.matches = true;
              console.log(doc.id);
            }
            console.log(commentData);
            return commentData;
          })
        );
      });
    });
  }, []);
  let key = 0;
  return (
    <View>
      {CommentAdder()}
      <Text>Comments and Offers :</Text>
      {comments.map((comment) => {
        key++;
        return (
          <View key={key}>
            <Text>User: {comment.User}</Text>
            <Text>Posted at: {comment.Posted.toDate().toDateString()}</Text>
            <Text>Comment: {comment.Comment}</Text>
            {comment.matches ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleDelete(comment.id);
                }}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        );
      })}
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
