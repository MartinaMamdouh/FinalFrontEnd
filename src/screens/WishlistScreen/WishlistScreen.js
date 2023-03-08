import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import product from '../../data/product';
import ImageCarousel from '../../components/ImageCarousel';
import Favorite from '../../components/Favorite/Favorite';

const WishlistScreen = () => {

    const Img = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/mouse1.jpg';
    const heartEmpty='https://www.citypng.com/public/uploads/preview/-51610329431xv3s3v3d9v.png';
    const heartFill='https://www.pngitem.com/pimgs/m/307-3070057_red-heart-outline-png-transparent-png.png';
    return (
        <View >
            <Text style={styles.container}>My Wishlist</Text>
            <View style={styles.root}>

                <Image style={styles.image} source={{ uri: Img }} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title} numberOfLines={3}>
                        {product.title}
                    </Text>
                    <Text style={styles.price}>
                        from ${product.price.toFixed(2)}
                        {product.oldPrice && (
                            <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
                        )}
                    </Text>
                    <Favorite/>

                </View>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {

        marginBottom: 20,
        marginLeft: 40,
        marginTop: 20,
        color:'#f75d59',
        fontSize: 20,
        fontWeight: 'bold',

    },
    root: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        padding:10,
        marginLeft:10,
        marginRight:10,
    },
    image: {
        flex: 2,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontWeight: 'bold',
        padding: 10,

    },
    rightContainer: {
        padding: 10,
        flex: 3,
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
    heart:{
        flex: 2,
        height: 150,
        marginRight:150,
        resizeMode: 'contain',
    },
})
export default WishlistScreen;