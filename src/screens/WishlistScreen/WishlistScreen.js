import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Favorite from '../../components/Favorite/Favorite';
import connection from '../../router/connection';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const WishlistScreen = ({navigation}) => {

    const [productInfo, setProductInfo] = useState([]);
useFocusEffect(
    React.useCallback(() => {
        axios.get('/favorites')
            .then((response) => {
                const productIds = response.data.map((row) => row.product_id);
                console.log(productIds);
                //Get product names and links from products table
                axios.get('/products', {
                    params: {
                        per_page: 1000,
                    },
                })
                    .then((response) => {
                        const productInfo = response.data.filter(row => productIds.includes(row.id)).map((row) => ({
                            id: row.id,
                            name: row.name,
                            image: row.img_url,
                            price: row.price,
                        }));
                        const sortedProductInfo = productIds.map((id) =>
                            productInfo.find((info) => info.id === id)
                        );
                        //Sort new array by order of productIds
                        sortedProductInfo.sort((a, b) =>
                            productIds.indexOf(b.id) - productIds.indexOf(a.id)
                        );
                        // Step 3: Do something with the sorted product info
                        setProductInfo(sortedProductInfo);

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });

    }, [navigation])
)
    const onPress = (itemID) => {
        axios.post('/histories', { product_id: itemID })
            .then(response => console.log(response))
            .catch(error => console.log(error))
        navigation.navigate('ProductScreen', { myid: itemID });
    }

    return (
        <ScrollView>
            <Text/>
            {productInfo.map((product) => (
                <Pressable onPress={() => onPress(product.id)} >
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
                </Pressable>

            ))}
        </ScrollView>


    );
};

const styles = StyleSheet.create({
    raw: {
        flexDirection: 'row',
    },
    container: {

        marginBottom: 20,
        marginLeft: 40,
        marginTop: 20,
        color: '#009999',
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
        color: '#00cc99',
        marginLeft: 10,
        marginTop: 7,
    },
    oldPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
    },
    heart: {
        flex: 2,
        marginLeft: 30,
        resizeMode: 'contain',
    },
})
export default WishlistScreen;
