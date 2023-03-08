import React  from 'react';
import { View } from 'react-native';
const Img='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/mouse1.jpg';
    
const ProductCard = () => {
    return(
        <View>
            <Image style ={styles.image} source={{uri:Img}}/>
        </View>
    )
}
export default ProductCard;