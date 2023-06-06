import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image ,Linking} from 'react-native';
import product from '../../data/product';
import { useRoute } from '@react-navigation/native';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button/Button';
import ImageCarousel from '../../components/ImageCarousel';
import Favorite from '../../components/Favorite/Favorite';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import connection from '../../router/connection';
import HomeButton from '../../components/HomeButton/HomeButton';

const ProductScreen = (props) => {
  const [product, setProduct] = useState([]);
  const { myid } = props.route.params;
  //const product=useState([]);
  useEffect(() => {
    // connection.get(`/products?id=${myid}`).then(response => {
    //   const productInfo = response.data;
    // })
    connection.get(`/products`).then(response => {
      setProduct(response.data.find(item => item.id === myid));
      //console.log("productinfo=", product);

    })
      .catch(error => { console.error(error); });
  }, []);
  const navigation = useNavigation();

  const onbuypressed = () => {
    // console.warn("sign in");

    //validate user first
    const url = product.link;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  // const route = useRoute();
  // console.log(route.params);


  return (
    // <ScrollView>


    //     <View style={styles.root} >
    //       <Text> product screen </Text>
    //       <Text >{product.id}</Text>
    //       {/* <Text>{`Product for id ${myid}`}</Text> */}
    //       <Text style={styles.price}></Text>
    //     </View>

    // </ScrollView>


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
      {/* <CustomButton text="jumia"
        onPress={onbuypressed} />
      <CustomButton text="noon"
        onPress={onbuypressed} /> */}

      {/* quantity selector */}
      {/* <QuantitySelector quantity={quantity} setQuantity={setQuantity}/> */}
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
    flex:2,
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
  }
});
export default ProductScreen;