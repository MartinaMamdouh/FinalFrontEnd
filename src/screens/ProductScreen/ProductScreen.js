import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import Favorite from '../../components/Favorite/Favorite';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import connection from '../../router/connection';
import { useFocusEffect } from '@react-navigation/native';

const ProductScreen = (props) => {

  const [product, setProduct] = useState([]);
  const { myid } = props.route.params;
  const fetchData = useCallback(() => {
   
    connection.get(`/products`).then(response => {
      setProduct(response.data.find(item => item.id === myid));
    })
      .catch(error => { console.error(error); });
  }, []);
  useFocusEffect(fetchData);

  const navigation = useNavigation();

  const onbuypressed = () => {
    //validate user first
    const url = product.link;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  return (
    <ScrollView style={styles.root}>
      {/* <Text> product screen </Text> */}
      <Text style={styles.description}>{product.name}</Text>
      {/* image carsousel */}
      {/* <ImageCarousel images={product.img_url} /> */}
      <Image style={styles.image} source={{ uri: product.img_url }} />
      {/* price */}
      <Text style={styles.price}>Price: {product.price} EGP</Text>
      {/* add to wishlist */}
      <Favorite style={styles.heart} item={product.id} />
      {/* Button */}
      <CustomButton text={product.source}
        onPress={onbuypressed} style={styles.button} />
    </ScrollView>


  );
}



const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  image: {

    // padding:30,
    // backgroundColor:'grey',
    flex: 2,
    height: 200,
    resizeMode: 'contain',//cover the whole image even the image will not cover the whole page
    //  width:150,
    //  height:150,
  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  heart: {
    marginLeft: 100,
  },
  button: {
    marginBottom: 100,
    color: 'orange',
  }
});
export default ProductScreen;