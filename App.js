import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from "react-native";
import RestaurantCard from "./src/components/RestaurantCard";
import styles from "./src/styles";

const bgImage = {
  uri: "https://png.pngtree.com/background/20210709/original/pngtree-food-western-food-steak-tomato-picture-image_941801.jpg",
};

export default function App() {
  const [allRestaurants, setAllRestaurants] = useState();

  useEffect(() => {
    fetch("https://my-first-firestore-bc.web.app/restaurants/")
      .then((response) => response.json())
      .then(setAllRestaurants)
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={bgImage}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {!allRestaurants ? (
              <ActivityIndicator size="large" color="orange" />
            ) : (
              allRestaurants.map((singleRest) => (
                <RestaurantCard key={singleRest.id} singleRest={singleRest} />
              ))
            )}
          </ScrollView>
        </SafeAreaView>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}
