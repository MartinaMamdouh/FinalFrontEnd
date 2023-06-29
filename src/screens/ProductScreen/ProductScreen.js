import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import Favorite from '../../components/Favorite/Favorite';
import CustomButton from '../../components/CustomButton';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import sourceLogos from '../../../assets/images/source_logos';

const ProductScreen = (props) => {
  const [product, setProduct] = useState([]);
  const { myid } = props.route.params;
  const fetchData = useCallback(() => {
    axios.get('/products', {
      params: {
         per_page: 1000,
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
      {sourceLogos[product.source] && (
        <Image
          style={styles.sourceLogo}
          source={{ uri: sourceLogos[product.source] }}
        />
      )}
      <Favorite style={styles.heart} item={product.id} />
      <CustomButton text={`Go to ${product.source}`} onPress={onLinkPressed} />
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
    flex: 2,
    height: 200,
    resizeMode: 'contain',
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
  },
  sourceLogo: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
});

export default ProductScreen;