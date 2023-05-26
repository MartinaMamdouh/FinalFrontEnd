import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions, FlatList } from 'react-native';
import products from '../../data/products';
import product from '../../data/product';
import ProductItem from '../../components/ProductItem';
import ImageCarousel from '../../components/ImageCarousel';
import Favorite from '../../components/Favorite/Favorite';
import { getStateFromPath } from '@react-navigation/native';
import connection from '../../router/connection';

const WishlistScreen = () => {
    
    const [productInfo, setProductInfo] = useState([]);
    //   Get product IDs from history table
    useEffect(() => {
        connection.get('/favorites')
            .then((response) => {
                const productIds = response.data.map((row) => row.product_id);
                console.log(productIds);
                //Get product names and links from products table
                connection.get('/products')
                    .then((response) => {
                        const productInfoss = response.data.filter(row => productIds.includes(row.id)).map((row) => ({
                            id: row.id,
                            name: row.name,
                            image: row.img_url,
                            price: row.price,
                        }));
                        setProductInfo(productInfoss);
                        console.log(productInfoss);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        // <View>
       
       
        <ScrollView>
        <Text style={styles.container}>My WishlistScreen: </Text>
            {productInfo.map((product) => (

                <View style={styles.root} key={product.id}>
                    <Image style={styles.image} source={{ uri: product.image }} />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title} numberOfLines={3}>
                            {product.name}
                        </Text>
                        <View style={styles.raw}>
                        <Text style={styles.price} numberOfLines={3}>
                            {product.price} EGP
                        </Text>
                        <Text style={styles.heart} >
                            <Favorite item={product.id} />
                        </Text>
                        </View>
                    </View>
                </View>

            ))}
        </ScrollView>
        // </View>
        
    );
};
const styles = StyleSheet.create({
    raw:{
         flexDirection: 'row',
    },
    container: {
       
        marginBottom: 20,
        marginLeft: 40,
        marginTop: 20,
        color: '#f75d59',
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
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
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
        color: 'orange',
        marginLeft: 10,
        marginTop:7,
    },
    oldPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
    },
    heart: {
        flex: 2,
        //height: 150,
        marginLeft: 30,
        resizeMode: 'contain',
    },
})
export default WishlistScreen;