import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useState } from "react";

const Registration = () => {
  const [reg, setReg] = useState({});
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Register</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Firstname"
          onChangeText={reg.firstname}
        />
        <TextInput style={styles.textInput} placeholder="Lastname" />
        <TextInput style={styles.textInput} placeholder="Email" />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Password"
        />
        <Button style={styles.button} title="Register" />
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
