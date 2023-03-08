import React from 'react';
import {View,Text,Image,Pressable} from 'react-native';
import styles from './styles';
import Favorite from '../Favorite';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
//INTERFACE FOR HOW OUR OB JECT LOOKS
//? for optional properties
//pressable to register user clicks 
interface ProductItemProps{
 item:{
    id:string;
    title:string;
    image:string;
    avgRating:number;
    ratings:number;
    price:number;
    oldPrice?:number;
    
 }
}
//props: receive function properties 
const ProductItem =(props:ProductItemProps)=>{
  const navigation=useNavigation();
  const onPress=()=>{
    console.warn('item pressed');
    navigation.navigate('ProductDetails',{id:item.id});
  }
  //const item= props.item;
  const{item}=props;
  // const starImgFilled= 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
  // const starImgCorner='https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'
  
  
return (

    <Pressable onPress={onPress} style={styles.root}>
    <Image style = {styles.image} source ={{uri:item.image}}/> 
    {/* <Image source={Logo} style={[styles.image]} resizeMode="contain"/> */}
  {/* 3amalna view gedida for different row */}
  <View style={styles.rightContainer}>
      <Text style={styles.title}numberOfLines={3}>{item.title}</Text>
      {/* Rating  */}
      <View style={styles.ratingContainer}>
       {/* <AntDesign name="star"size={18}color={"#e47911"}/> */}
       {[0,0,0,0,0].map((el,i)=>
         <Entypo
         style={styles.starImgStyle}
         key={`${item.id}-${i}`}
         name={
          i<Math.floor(item.avgRating)? 'star':'star-outlined'}
          size={20}
          color={'#e47911'}
         
      

         />
       )
       }
       <Text>{item.ratings}</Text>
      </View>
      <Text style={styles.price}> EGP {item.price}
       {/* if the item has an old price display it if condition using java script\ */}
      {item.oldPrice && (<Text style={styles.oldPrice}> EGP {item.oldPrice}</Text>
      )}
      </Text>
      
      </View>
      <Favorite />
  </Pressable>


);
};

export default ProductItem;