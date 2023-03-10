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
import { db } from "../firebaseConfig";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";

const Comments = (itemDetails) => {
  const [comments, setComments] = useState([]);
  const item = itemDetails.route.params.item.itemName;
  const { userInfo } = useContext(UserContext);
  const [documentId, setDocumentId] = useState("");
  const [shouldShow, setShouldShow] = useState(false);
  const navigation = useNavigation();

  // console.log(itemDetails.route.params);

  const handleDelete = (id) => {
    deleteDoc(doc(db, `comments`, id)).then((res) => {});
  };

  const CommentAdder = () => {
    const [commentText, setCommentText] = useState("");
    const time = Timestamp.now();
    const currTime = time.toDate();

    const submitComment = (boolean) => {
      const newCommentData = {
        itemId: documentId,
        User: userInfo.username,
        Comment: commentText,
        Posted: currTime,
        matches: false,
        isOffer: boolean,
        OriginalPoster: itemDetails.route.params.item.username,
      };
      addDoc(collection(db, `comments`), newCommentData)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err);
        });
      setCommentText("");
    };

    return (
      <ScrollView style={{ marginTop: 70, padding: 20 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Add new comment/offer"
          value={commentText}
          onChangeText={(commentText) => setCommentText(commentText)}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              submitComment(false);
            }}
            style={{
              backgroundColor: "white",
              width: 145,
              margin: 10,
              borderWidth: 2,
              borderColor: "#0782f9",
              padding: 6,
              borderRadius: 10,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#0782f9" }}>Submit Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              submitComment(true);
            }}
            style={{
              backgroundColor: "#0782f9",
              width: 145,
              margin: 10,
              padding: 8,
              borderRadius: 10,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "white" }}>Submit Offer</Text>
          </TouchableOpacity>
        </View>
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
            }
            return commentData;
          })
        );
      });
    });
  }, []);

  // useEffect(()=>{
  //   console.log(comments)
  // })
  const handleNavigateToUser = (comment) => {
    // console.log(comment.User);
    navigation.navigate("OtherUser", { user: comment.User });
  };
  let key = 0;
  return (
    <View>
      {CommentAdder()}
      <Text>Comments and Offers:</Text>
      {comments.map((comment) => {
        key++;
        return (
          <View key={key} style={styles.commentBox}>
            <View style={styles.commentDetails}>
              <Text>
                <Text style={{ fontWeight: "bold" }}>User: </Text>{" "}
                {comment.User}
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Posted at: </Text>{" "}
                {comment.Posted.toDate().toDateString()}
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Comment: </Text>{" "}
                {comment.Comment}
              </Text>
            </View>
            <View style={styles.commentActions}>
              {comment.isOffer ? (
                <TouchableOpacity
                  onPress={() => {
                    handleNavigateToUser(comment);
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>View Profile</Text>
                </TouchableOpacity>
              ) : null}
              {comment.matches ? (
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: "red", marginLeft: 80 },
                  ]}
                  onPress={() => {
                    handleDelete(comment.id);
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              ) : null}
            </View>
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
  },
  button: {
    backgroundColor: "#0782f9",
    width: 115,
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  commentBox: {
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    elevation: 10,
  },
  commentDetails: {
    flex: 1,
    marginRight: 10,
  },
  commentActions: {
    flexShrink: 0,
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Comments;
