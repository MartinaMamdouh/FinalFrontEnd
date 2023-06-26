import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import Logo from '../../../assets/images/piclogo.png';

const About = () => {
  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.mainHeader}> PriceSmart </Text>
      <Text style={styles.paraStyle}> Shop Smarter, Not Harder </Text>

      <View>
        <Image
          style={styles.imgStyle}
          source={Logo}
        />
      </View>

      <View style={styles.aboutLayout}>
        <Text style={styles.aboutSubHeader}> About Us </Text>
        <Text style={[styles.paraStyle, styles.aboutPara]}>
        PriceSmart creates a user-friendly platform that allows you to easily compare prices from multiple online stores, saving you time and money.{"\n"}
              We are passionate about providing our users with accurate, up-to-date information so that they can make informed purchasing decisions. Our goal is to help you save money, time, and hassle by providing you with the tools and information you need to make a wise decision.
        </Text>
      </View>

      <Text style={styles.mainHeader}> Follow me on Social Network </Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            Linking.openURL("https://www.instagram.com/thapatechnical/")
          }>
          <Image
            style={styles.iconStyle}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            Linking.openURL(
              "https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
            )
          }>
          <Image
            style={styles.iconStyle}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/187/187210.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => Linking.openURL("https://discord.gg/AN8ThRBXtY")}>
          <Image
            style={styles.iconStyle}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/906/906361.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
    padding:3,
  },

  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 50,
    marginBottom: 10,
    fontFamily: "JosefinSans_700Bold",
  },
  paraStyle: {
    fontSize: 15,
    color: "#7d7d7d",
    paddingBottom: 20,
  },
  aboutLayout: {
    backgroundColor: "#248f8f",
    paddingHorizontal: 30,
    marginVertical: 30,
    borderRadius:10,
    
  },
  aboutSubHeader: {
    fontSize: 18,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    marginVertical: 15,
    fontFamily: "JosefinSans_700Bold",
    alignSelf: "center",
  },
  aboutPara: {
    color: "#fff",
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  iconStyle: {
    width: "100%",
    height: 50,
    aspectRatio: 1,
  },
});

export default About;