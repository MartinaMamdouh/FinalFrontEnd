import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, Button, TouchableOpacity } from 'react-native';
import Favorite from '../../components/Favorite/Favorite';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import connection from '../../router/connection';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { CurrentPageContext } from '../../context/CurrentPageContext';
const ProductScreen = (props) => {

  const { currentPage } = useContext(CurrentPageContext);
  const [product, setProduct] = useState([]);
  const { myid } = props.route.params;
  const fetchData = useCallback(() => {
    axios.get('/products', {
      params: {
         page: currentPage,
         per_page: 10,
      },
   }).then(response => {
      setProduct(response.data.find(item => item.id === myid));
    })
      .catch(error => { console.error(error); });
  }, []);
  useFocusEffect(fetchData);

  const onLinkPressed = () => {
    //validate user first
    const url = product.link;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.description}>{product.name}</Text>
      <Image style={styles.image} source={{ uri: product.img_url }} />
      <Text style={styles.price}>Price: {product.price} EGP</Text>
      <Favorite style={styles.heart} item={product.id} />
      <CustomButton text={product.source} onPress={onLinkPressed} />
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