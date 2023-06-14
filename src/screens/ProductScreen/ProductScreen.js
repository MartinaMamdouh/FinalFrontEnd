import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, Button, TouchableOpacity } from 'react-native';
import Favorite from '../../components/Favorite/Favorite';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import connection from '../../router/connection';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

const ProductScreen = (props) => {

  const [product, setProduct] = useState([]);
  const { myid } = props.route.params;
  const fetchData = useCallback(() => {

    axios.get(`/products`).then(response => {
      // connection.get(`/products`).then(response => {
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
        <Feather
          name="arrow-left"
          size={25}
          color="grey"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <Text style={styles.backButtonText}>  back</Text>
      </TouchableOpacity>
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
        onPress={onbuypressed} />

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
    fontSize: 16,
  },
  heart: {
    marginLeft: 100,
  },
  button: {
    marginBottom: 100,
    color: '#008080',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 1,
    // color:'black',
  },
});
export default ProductScreen;