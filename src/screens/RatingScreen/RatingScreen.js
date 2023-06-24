import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView , StyleSheet , Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RatingScreen = () => {

    const [defaultRating, setdefaultRating] = useState(2)
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])

    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgEmpty = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
    const CustomRatingBar = () => {

    

        return (
            <View style={styles.RatingBar}>
            
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setdefaultRating(item)}
                        >
                            <Image
                                style={styles.starImg}
                                source={
                                    item <= defaultRating ? { uri: starImgFilled } : { uri: starImgEmpty }
                                }
                            />
                        </TouchableOpacity>
                    )
                })
                }

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>About us:</Text>
                <Text style={styles.aboutStyle}>
                Welcome to PriceSmart! {"\n"}PriceSmart creates a user-friendly platform that allows you to easily compare prices from multiple online stores, saving you time and money.{"\n"}
                We are passionate about providing our users with accurate, up-to-date information so that they can make informed purchasing decisions.{"\n"}
            At PriceSmart, we are dedicated to providing our users with a smooth, efficient, and cost-effective experience. {"\n"}Our goal is to help you save money, time, and hassle by providing you with the tools and information you need to make a wise decision.
            {"\n"}Thank you for choosing PriceSmart.{"\n"}We look forward to serving you and helping you find the best prices online!
            </Text>
            
            <Text style={styles.textStyle}> Please Rate Us </Text>
            <CustomRatingBar/>
            <Text style={styles.textStyle}>
                {defaultRating + '/' + maxRating.length}
            </Text>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => alert(defaultRating)}
            >
                <Text style={styles.subStyle}> Submit </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container:{    
        margin:20,
        justifyContent:'center',
    },
    textStyle:{
        textAlign:'center',
        fontSize:23,
        marginTop:20,
    },
    aboutStyle:{
        color:"black",
        fontSize:14,
        padding: 3,

    },
    title:{
        color:"black",
        fontSize:25,
    },
    RatingBar:{
        justifyContent:'center',
        flexDirection:'row',
        marginTop:30
    },
    starImg:{
        width:40,
        height:40,
        resizeMode:'cover'
    },
    buttonStyle:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        padding:15,
        backgroundColor:'#008080'
    },
    subStyle:{
     fontSize: 16,
     color: 'white',
    }
})

export default RatingScreen;