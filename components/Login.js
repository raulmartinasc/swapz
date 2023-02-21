import { StyleSheet, Text, View } from "react-native";
const Login = () => {
  return (
    <View style={styles}>
      <Text style={styles}>You are in Login</Text>
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
});

export default Login;
