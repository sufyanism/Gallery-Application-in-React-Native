import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Animated,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";

// Sample image data with id, uri, category and title
const imageData = [
  {
    id: "1",
    uri: "https://picsum.photos/id/10/300/300",
    category: "Nature",
    title: "Beautiful Forest",
  },
  {
    id: "2",
    uri: "https://picsum.photos/id/20/300/300",
    category: "Urban",
    title: "City Lights",
  },
  {
    id: "3",
    uri: "https://picsum.photos/id/30/300/300",
    category: "Nature",
    title: "Misty Mountain",
  },
  {
    id: "4",
    uri: "https://picsum.photos/id/40/300/300",
    category: "Nature",
    title: "Green Woods",
  },
  {
    id: "5",
    uri: "https://picsum.photos/id/50/300/300",
    category: "Nature",
    title: "Sunny Beach",
  },
  {
    id: "6",
    uri: "https://picsum.photos/id/60/300/300",
    category: "Other",
    title: "Outer Space",
  },
];

// Number of columns in FlatList grid layout
const numColumns = 2;

export default function App() {
  // State to control visibility of image modal
  const [modalVisible, setModalVisible] = useState(false);

  // Holds the URI of the image selected to view in full screen modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Text typed in search input to filter images by title
  const [searchText, setSearchText] = useState("");

  // Selected filter category ("All", "Nature", "Urban", etc.)
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Array of image ids marked as favorites
  const [favorites, setFavorites] = useState([]);

  // Animated value for scaling the heart icon on like/unlike
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Load custom font Nunito
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  // Show loading spinner while font is loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  // Render each image card in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Touchable image to open modal */}
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(item.uri); // Set selected image URI for modal
          setModalVisible(true);       // Open modal
        }}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
      </TouchableOpacity>

      {/* Heart icon to like/unlike with animation */}
      <Animated.View
        style={[styles.heartIcon, { transform: [{ scale: scaleAnim }] }]}
      >
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          {/* Show filled heart if favorite, else outline */}
          <Text style={{ fontSize: 22 }}>
            {favorites.includes(item.id) ? "❤️" : "🤍"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  // Function to close the image modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  // Filter images by category, search text, and favorites
  const filteredImages = imageData.filter((item) => {
    if (selectedCategory === "Favorites") {
      // Show only favorite images matching search text
      return (
        favorites.includes(item.id) &&
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Check if category matches selected or "All"
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    // Check if title includes search text
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });

  // Function to toggle like/unlike and animate heart icon
  const handleLike = (id) => {
    // Animate heart scaling up and back to normal
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Update favorites list: add if not present, remove if present
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Top Bar with app name */}
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>By Zeba Academy</Text>
        </View>

        {/* Search input to filter images by title */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search images..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Filter buttons for categories */}
        <View style={styles.filterContainer}>
          {["All", "Nature", "Urban", "Other", "Favorites"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterButton,
                selectedCategory === cat && styles.activeFilter,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={{
                  color: selectedCategory === cat ? "#fff" : "#333",
                  fontFamily: "Nunito_400Regular",
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FlatList showing filtered images in grid */}
        <FlatList
          data={filteredImages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
        />

        {/* Modal for displaying full screen selected image */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>X</Text>
            </Pressable>
          </View>
        </Modal>

        {/* Bottom bar with copyright */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomText}>
            © {new Date().getFullYear()} zeba.academy, All rights reserved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 6,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    fontFamily: "Nunito_400Regular",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeFilter: {
    backgroundColor: "green",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    borderRadius: 15,
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  bottomBar: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  bottomText: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: "#666",
  },

  topBar: {
    paddingVertical: 12,
    backgroundColor: "#4caf50",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#388e3c",
    marginBottom: 10,
  },
  topBarText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Nunito_400Regular",
    fontWeight: "600",
  },
});
