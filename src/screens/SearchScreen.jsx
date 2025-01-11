// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
// } from "react-native";
// import axios from "axios";

// export default function SearchScreen({ navigation }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = () => {
//     axios
//       .get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
//       .then((response) => {
//         setSearchResults(response.data);
//       });
//   };

//   const renderMovie = ({ item }) => (
//     <TouchableOpacity
//       style={styles.movieContainer}
//       onPress={() => navigation.navigate("Details", { movie: item.show })}
//     >
//       <Image
//         source={{ uri: item.show.image?.medium || "https://via.placeholder.com/150" }}
//         style={styles.thumbnail}
//       />
//       <Text style={styles.title}>{item.show.name}</Text>
//       <Text style={styles.summary} numberOfLines={2}>
//         {item.show.summary?.replace(/<[^>]+>/g, "") || "No summary available"}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search movies..."
//         placeholderTextColor="#888"
//         value={searchTerm}
//         onChangeText={(text) => setSearchTerm(text)}
//         onSubmitEditing={handleSearch}
//       />
//       <FlatList
//         data={searchResults}
//         keyExtractor={(item) => item.show.id.toString()}
//         renderItem={renderMovie}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#141414",
//     padding: 10,
//   },
//   searchBar: {
//     backgroundColor: "#1f1f1f",
//     borderRadius: 10,
//     padding: 10,
//     color: "white",
//     marginBottom: 10,
//   },
//   movieContainer: {
//     marginBottom: 20,
//     backgroundColor: "#1f1f1f",
//     borderRadius: 10,
//     padding: 10,
//   },
//   thumbnail: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//   },
//   title: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//     fontFamily: "Roboto_700Bold"
//   },
//   summary: {
//     color: "#ccc",
//     marginTop: 5,
//     fontFamily: "Roboto_400Regular",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return; // Don't search if the input is empty
    setLoading(true);
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#E50914" style={styles.loader} />}

      {/* Movie List */}
      {!loading && movies.length > 0 && (
        <FlatList
          data={movies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      {/* No Results Message */}
      {!loading && movies.length === 0 && searchTerm.trim() !== "" && (
        <Text style={styles.noResults}>No results found for "{searchTerm}"</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B2B2B",
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
  searchButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#E50914",
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
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
  loader: {
    marginTop: 20,
  },
  noResults: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
});

export default SearchScreen;
