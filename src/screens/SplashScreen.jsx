import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Animated } from "react-native";
import { useRef } from 'react';




export default function SplashScreen({ navigation }) {

const fadeAnim = useRef(new Animated.Value(0)).current;
useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("HomeTabs");
    }, 2000); // 2 seconds
  }, []);

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      {/* <Image source={{ uri: "https://via.placeholder.com/300" }} style={styles.logo} /> */}
      <Image
  source={require("../../assets/netflix-logo.png")} style={styles.logo}
  style={{ width: 100, resizeMode: "contain" }}
/>

      <Text style={styles.text}>Welcome to MovieApp</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto_700Bold"
  },
});
