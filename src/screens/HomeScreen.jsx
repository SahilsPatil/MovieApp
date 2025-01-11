// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
// import axios from "axios";
// import * as Animatable from "react-native-animatable";
// import { LinearGradient } from "expo-linear-gradient";
// import Loading from "../components/Loading";


// export default function HomeScreen({ navigation }) {
//   const [loading, setLoading] = useState(true);
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     axios.get("https://api.tvmaze.com/search/shows?q=all").then((response) => {
//       setMovies(response.data);
//     });
//     setLoading(false)
//   }, []);

// //   const renderMovie = ({ item }) => (
// //     <TouchableOpacity
// //       style={styles.movieContainer}
// //       onPress={() => navigation.navigate("Details", { movie: item.show })}
// //     >
// //       <Image
// //         source={{ uri: item.show.image?.medium || "https://via.placeholder.com/150" }}
// //         style={styles.thumbnail}
// //       />
// //       <Text style={styles.title}>{item.show.name}</Text>
// //       <Text style={styles.summary} numberOfLines={2}>
// //         {item.show.summary?.replace(/<[^>]+>/g, "") || "No summary available"}
// //       </Text>
// //     </TouchableOpacity>
// //   );



// const renderMovie = ({ item }) => (
//     <Animatable.View animation="pulse" duration={1500} easing="ease-out">
//       <TouchableOpacity
//         style={styles.movieContainer}
//         onPress={() => navigation.navigate("Details", { movie: item.show })}
//       >
//         <Image
//           source={{ uri: item.show.image?.medium || "https://via.placeholder.com/150" }}
//           style={styles.thumbnail}
//         />
//         <LinearGradient
//         colors={["transparent", "rgba(0,0,0,0.8)"]}
//         style={styles.gradient}
//       />
//         <Text style={styles.title}>{item.show.name}</Text>
//       </TouchableOpacity>
//     </Animatable.View>
//   );

//   if (loading) {
//     return <Loading />;
//   }
//   else{

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={movies}
//         keyExtractor={(item) => item.show.id.toString()}
//         renderItem={renderMovie}
//       />
//     </View>
//   );
// }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#141414",
//     padding: 10,
//   },
//   movieContainer: {
//     marginBottom: 20,
//     backgroundColor: "#1f1f1f",
//     borderRadius: 10,
//     padding: 10,
//   },
// //   thumbnail: {
// //     width: "100%",
// //     height: 200,
// //     borderRadius: 10,
// //   },
// //   title: {
// //     color: "white",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     marginTop: 10,
// //     fontFamily: "Roboto_700Bold"
// //   },
//   summary: {
//     color: "#ccc",
//     marginTop: 5,
//     fontFamily: "Roboto_400Regular",
//   },
//   movieContainer: {
//     position: "relative",
//     margin: 10,
//   },
//   thumbnail: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//   },
//   gradient: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 10,
//   },
//   title: {
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//     color: "white",
//     fontSize: 18,
//     fontFamily: "Roboto_700Bold",
//   },
// });


import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://api.tvmaze.com/search/shows?q=all");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate("Details", { movie: item.show })}
    >
      <Image
        source={{ uri: item.show.image?.medium || "https://via.placeholder.com/150" }}
        style={styles.thumbnail}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.show.name}</Text>
        <Text style={styles.summary}>
          {item.show.summary
            ? item.show.summary.replace(/<[^>]*>/g, "").slice(0, 100) + "..."
            : "No summary available."}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.searchPlaceholder}>Search for movies...</Text>
      </TouchableOpacity>

      {/* Movie List */}
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  searchBar: {
    backgroundColor: "#2B2B2B",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  searchPlaceholder: {
    color: "#888",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
  list: {
    paddingBottom: 20,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    margin: 10,
    overflow: "hidden",
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    marginBottom: 5,
  },
  summary: {
    color: "#ccc",
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
  },
});

export default HomeScreen;
