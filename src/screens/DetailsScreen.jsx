// // import React from "react";
// // import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

// // export default function DetailsScreen({ route }) {
// //   const { movie } = route.params;

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Image
// //         source={{ uri: movie.image?.original || "https://via.placeholder.com/300" }}
// //         style={styles.image}
// //       />
// //       <Text style={styles.title}>{movie.name}</Text>
// //       <Text style={styles.details}>
// //         <Text style={styles.label}>Language: </Text>
// //         {movie.language || "N/A"}
// //       </Text>
// //       <Text style={styles.details}>
// //         <Text style={styles.label}>Genres: </Text>
// //         {movie.genres?.join(", ") || "N/A"}
// //       </Text>
// //       <Text style={styles.details}>
// //         <Text style={styles.label}>Premiered: </Text>
// //         {movie.premiered || "N/A"}
// //       </Text>
// //       <Text style={styles.details}>
// //         <Text style={styles.label}>Rating: </Text>
// //         {movie.rating?.average || "N/A"}
// //       </Text>
// //       <Text style={styles.summary}>
// //         {movie.summary?.replace(/<[^>]+>/g, "") || "No summary available"}
// //       </Text>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#141414",
// //     padding: 10,
// //   },
// //   image: {
// //     width: "100%",
// //     height: 300,
// //     borderRadius: 10,
// //     marginBottom: 20,
// //   },
// //   title: {
// //     color: "white",
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     fontFamily: "Roboto_700Bold",
// //     marginBottom: 10,
// //   },
// //   details: {
// //     color: "#ccc",
// //     fontSize: 16,
// //     marginBottom: 5,
// //   },
// //   label: {
// //     fontWeight: "bold",
// //     color: "white",
// //   },
// //   summary: {
// //     color: "#ccc",
// //     fontSize: 16,
// //     marginTop: 20,
// //     fontFamily: "Roboto_400Regular"
// //   },
// // });

// import React from "react";
// import { View, Text, ImageBackground, StyleSheet, ScrollView } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// const DetailsScreen = ({ route }) => {
//   const { movie } = route.params;

//   return (
//     <ScrollView style={styles.container}>
//       <ImageBackground
//         source={{ uri: movie.image?.original || "https://via.placeholder.com/300" }}
//         style={styles.background}
//       >
//         <LinearGradient
//           colors={["transparent", "rgba(0,0,0,0.8)", "black"]}
//           style={styles.overlay}
//         />
//         <Text style={styles.title}>{movie.name}</Text>
//       </ImageBackground>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.heading}>Summary</Text>
//         <Text style={styles.text}>
//           {movie.summary
//             ? movie.summary.replace(/<[^>]*>/g, "") // Remove HTML tags
//             : "No summary available."}
//         </Text>
//         {movie.genres?.length > 0 && (
//           <>
//             <Text style={styles.heading}>Genres</Text>
//             <Text style={styles.text}>{movie.genres.join(", ")}</Text>
//           </>
//         )}
//         {movie.language && (
//           <>
//             <Text style={styles.heading}>Language</Text>
//             <Text style={styles.text}>{movie.language}</Text>
//           </>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#141414",
//   },
//   background: {
//     width: "100%",
//     height: 300,
//     justifyContent: "flex-end",
//   },
//   overlay: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//   },
//   title: {
//     color: "#fff",
//     fontSize: 28,
//     fontFamily: "Roboto_700Bold",
//     padding: 20,
//   },
//   detailsContainer: {
//     padding: 20,
//   },
//   heading: {
//     color: "#fff",
//     fontSize: 18,
//     fontFamily: "Roboto_700Bold",
//     marginTop: 20,
//   },
//   text: {
//     color: "#ccc",
//     fontSize: 16,
//     fontFamily: "Roboto_400Regular",
//     marginTop: 5,
//   },
// });

// export default DetailsScreen;


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Movie Banner */}
      <Image
        source={{ uri: movie.image?.original || "https://via.placeholder.com/300" }}
        style={styles.banner}
      />

      {/* Movie Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.name}</Text>
        <View style={styles.meta}>
          <Text style={styles.rating}>
            ⭐ {movie.rating?.average || "N/A"}
          </Text>
          <Text style={styles.genre}>
            {movie.genres?.join(", ") || "Unknown Genre"}
          </Text>
          <Text style={styles.release}>
            {movie.premiered ? `Released: ${movie.premiered}` : "Release Date: N/A"}
          </Text>
        </View>

        <Text style={styles.summary}>
          {movie.summary
            ? movie.summary.replace(/<[^>]*>/g, "")
            : "No summary available."}
        </Text>

        {/* CTA Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Watch Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Watchlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  banner: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    fontFamily: "Roboto_700Bold",
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  rating: {
    color: "#E50914",
    fontSize: 14,
    marginRight: 10,
    fontFamily: "Roboto_400Regular",
  },
  genre: {
    color: "#ccc",
    fontSize: 14,
    marginRight: 10,
    fontFamily: "Roboto_400Regular",
  },
  release: {
    color: "#ccc",
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
  },
  summary: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: "Roboto_400Regular",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E50914",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
});

export default DetailsScreen;
