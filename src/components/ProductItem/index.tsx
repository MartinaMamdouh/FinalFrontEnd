import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Linking, SafeAreaView } from 'react-native';
import styles from './styles';
import Favorite from '../Favorite';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeButton from '../HomeButton/HomeButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import sourceLogos from '../../../assets/images/source_logos';

//INTERFACE FOR HOW OUR OB JECT LOOKS
//? for optional properties
//pressable to register user clicks 
interface ProductItemProps {
  item: {
    id: string;
    name: string;
    img_url: string;
    rating: number;
    reviews_count: number;
    price: number;
    link: string,
    source: string,

  }
}

//props: receive function properties 
const ProductItem = (props: ProductItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ProductScreen', { myid: item.id });
    console.log(typeof navigation, navigation);
    axios.post('/histories', { product_id: item.id })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  const handlePress = () => {
    const url = item.link;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  const { item } = props;

  return (
    <View style={styles.random}>
      <Pressable onPress={onPress} style={styles.root}>
        <Image style={styles.image} source={{ uri: item.img_url }} />
        {/* <Image source={Logo} style={[styles.image]} resizeMode="contain"/> */}
        {/* 3amalna view gedida for different row */}
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>{item.name}</Text>
          {/* Rating  */}
          <View style={styles.ratingContainer}>
            {/* <AntDesign name="star"size={18}color={"#e47911"}/> */}
            {[0, 0, 0, 0, 0].map((el, i) =>
              <Entypo
                style={styles.starImgStyle}
                key={`${item.id}-${i}`}
                name={
                  i < Math.floor(item.rating) ? 'star' : 'star-outlined'}
                size={20}
                color={'#e47911'}
              />
            )
            }
            <Text>{item.reviews_count}</Text>
          </View>
        </View>
        <Favorite item={item.id} />
      </Pressable>
      <View style={styles.Container}>
       
          {sourceLogos[item.source] && (
            <Image
              style={styles.sourceLogo}
              source={{ uri: sourceLogos[item.source] }}
            />
          )}
          <Text style={styles.price}>
              {item.price} EGP
          </Text>
        
        <HomeButton text=" Shop " onPress={handlePress} />
      </View>
      <View></View>
    </View>
  );
};

export default ProductItem;