import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { setDoc, getDoc, doc  } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";



const Registration = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const username = 'test'

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential
        console.log(`registered with with ${user._tokenResponse.email}`)
        setDoc(doc(db, 'users', username), {
          firstName: firstName,
          lastName: lastName,
          email: auth.currentUser?.email
      }).then(()=>{
          const docRef = doc(db, 'users', username)
          return docRef
      }).then((docRef)=>{
          const userInfo = getDoc(docRef)
          return userInfo
      }).then((userInfo)=>{
          //this is where it would be added to global context
          console.log(userInfo.data())
          navigation.replace('Home')
      })
      .catch((err)=>{
          console.log(err)
      })
    })
    .catch((err)=>{
        console.log(err)
    })
}



  const [reg, setReg] = useState({});
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Register</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Firstname"
          value={firstName}
          onChangeText={firstName => setFirstname(firstName)}
        />
        <TextInput
        style={styles.textInput}
        placeholder="Lastname" 
        value={lastName}
        onChangeText={lastName=>setLastname(lastName)}
        />
        <TextInput
        style={styles.textInput} 
        placeholder="Email" 
        value={email} 
        onChangeText={email => setEmail(email)} 
        />
        <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={password=>setPassword(password)}
        />
        <Button style={styles.button} title="Register" onPress={handleSignUp}/>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 12,
    padding: 10,
    height: 40,
    width: 170,
  },
  button: {},
});

export default Registration;
