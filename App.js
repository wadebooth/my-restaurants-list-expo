import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import styles from "./src/styles";

const image = {
  uri: "https://png.pngtree.com/background/20210709/original/pngtree-food-western-food-steak-tomato-picture-image_941801.jpg",
};

export default function App() {
  const [allRestaurants, setAllRestaurants] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://my-first-firestore-st.web.app/restaurants/"
        );
        const data = await response.json();
        setAllRestaurants(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={image}
        style={styles.container}
      >
        <ScrollView>
          {allRestaurants ? (
            allRestaurants?.map((singleRest) => (
              <>
                <Text style={styles.restaurantsName} key={singleRest.id}>
                  {singleRest.name} / {singleRest.cuisine}
                </Text>
                <Image
                  source={{ uri: singleRest.img }}
                  style={{ width: "100%", height: 100 }}
                />
              </>
            ))
          ) : (
            <ActivityIndicator size="large" color="orange" />
          )}
        </ScrollView>
        <Text style={{ color: "white", marginBottom: 20 }}>
          Hey class whats up test
        </Text>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}
