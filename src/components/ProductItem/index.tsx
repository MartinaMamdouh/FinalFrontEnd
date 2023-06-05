import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Linking, SafeAreaView } from 'react-native';
import styles from './styles';
import Favorite from '../Favorite';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../Button/Button';
import HomeButton from '../HomeButton/HomeButton';
import { useNavigation } from '@react-navigation/native';
import connection from '../../router/connection';

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
    console.warn('item pressed');
    //.navigate('ProductDetails', { id: item.id });

    connection.post('/histories', { product_id: item.id })
      .then(response => console.log(response))
      .catch(error => console.log(error))


    navigation.navigate('ProductScreen', { myid: item.id });
  }

  const handlePress = () => {
    const url = item.link;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  //const item= props.item;
  const { item } = props;
  // const starImgFilled= 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
  // const starImgCorner='https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'


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
        <Favorite item={item.id}/>
      </Pressable>
      <View style={styles.Container}>
        <Text style={[styles.leftContainer, styles.price]}>{item.source.charAt(0).toUpperCase() + item.source.slice(1)}:  {item.price} EGP</Text>

        {/* if the item has an old price display it if condition using java script\
          {item.oldPrice && (<Text style={styles.oldPrice}> EGP {item.oldPrice}</Text>
          )}
         */}
        {/* <View style={styles.buttonContainer}> */}


        {/* <Text style={[styles.rightContainer,styles.price]}></Text> */}

        <HomeButton text=" Shop now "
          onPress={handlePress}></HomeButton>
      </View>
      <View>

      </View>
      {/* <View style={styles.Container}>
        <Text style={[styles.Container, styles.price]}>Jumia : EGP {item.price}</Text>
        <HomeButton text="  Jumia  "
          onPress={onPress}></HomeButton>
      </View> */}
      {/* </View> */}
      {/* <View style={styles.Container}>
        <Text style={[styles.Container, styles.price]}>Noon : EGP {item.price}</Text>
        <HomeButton text=" Noon "
          onPress={onPress}></HomeButton>
      </View> */}

    </View >





  );
};

export default ProductItem;