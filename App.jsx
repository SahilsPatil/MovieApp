import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import SplashScreen from "./src/screens/SplashScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import AppLoading from "expo-app-loading";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { useFonts, } from "expo-font";

// const [fontsLoaded] = useFonts({
//   Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
//   RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
// });



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else{
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: {
      backgroundColor: "#141414", // Netflix dark background
    },
    headerTintColor: "#fff", // White text for titles and icons
    headerTitleStyle: {
      fontFamily: "Roboto_700Bold",
    },}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

const HomeTabs = () => (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === "Home") {
        iconName = "home";
      } else if (route.name === "Search") {
        iconName = "search";
      }
      return <Icon name={iconName} size={size} color={color} />;
    },
    headerStyle: {
      backgroundColor: "#141414", // Netflix dark background
    },
    headerTintColor: "#fff", // White text for titles and icons
    headerTitleStyle: {
      fontFamily: "Roboto_700Bold",
    },
    tabBarActiveTintColor: "red",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: { backgroundColor: "#141414", borderTopWidth: 0 },
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Search" component={SearchScreen} />
</Tab.Navigator>
);

