import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/netflix-logo.png")} // Replace with a free Lottie JSON file
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  animation: {
    width: 150,
    height: 150,
  },
});

export default Loading;
