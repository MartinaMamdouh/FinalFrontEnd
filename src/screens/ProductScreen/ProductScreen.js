import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import product from '../../data/product';
import products from '../../data/products';
import { useRoute } from '@react-navigation/native';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button/Button';
import ImageCarousel from '../../components/ImageCarousel';
import Favorite from '../../components/Favorite/Favorite';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const ProductScreen = () => {
  const navigation = useNavigation();

  const onbuypressed = () => {
    // console.warn("sign in");

    //validate user first
    () => { console.console.warn('Buy Now'); }
    navigation.navigate('RatingScreen');
  }




  const [selectedOption, setSelectedOption] = useState(product.options);
  //  const [quantity,setQuantity]=useState(1);
  // const [favorite,setFavorite]=useState(1);

  //sending the id of which product
  const route = useRoute();
  console.log(route.params);


  return (

    <ScrollView style={styles.root}>
      {/* <Text> product screen </Text> */}
      <Text style={styles.title}>{product.title}</Text>
      {/* image carsousel */}
      <ImageCarousel images={product.images} />
      {/* price */}
      <Text style={styles.price}>
        from ${product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
        )}
      </Text>
      {/* description  */}
      <Text style={styles.description}> {product.description}</Text>
      {/* add to wishlist */}
      <Favorite item={route} style={styles.heart} />
      {/* Button */}
      <CustomButton text="amazon"
        onPress={onbuypressed} />
        <CustomButton text="jumia"
        onPress={onbuypressed} />
        <CustomButton text="noon"
        onPress={onbuypressed} />

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
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  title: {

  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  heart: {
    marginLeft: 100,
  },
  button: {
    marginBottom: 100,
  }
});
export default ProductScreen;