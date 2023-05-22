import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Pressable } from 'react-native';
import axios from "axios";
//import AsyncStorage from '@react-native-community/async-storage'
import products from '../../data/products';
import ProductItem from '../ProductItem';
import WishlistScreen from '../../screens/WishlistScreen';
import { it } from 'node:test';
import { faV } from '@fortawesome/free-solid-svg-icons';
import connection from '../../router/connection';
const Favorite = ({ item }) => {

    const heartEmpty = 'https://www.citypng.com/public/uploads/preview/-51610329431xv3s3v3d9v.png';
    const heartFill = 'https://www.pngitem.com/pimgs/m/307-3070057_red-heart-outline-png-transparent-png.png';
    const [favorite, setFavorite] = useState([])
    const baseURL = 'http://localhost:3000/api/v1/products/';
    const params = {
        product_id: item
    }
    const headers = {
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.7xGXdq5PJHMYyvqCCV0hwA2lCCde9LrUZkyFTX2Bc0s',
        'Content-Type': 'application/json'
    }

    useEffect(() => {
        connection.get('/favorites').then(response => {
            // console.log(response.data);
            const productIds = response.data.map((row) => row.product_id);
            console.log(productIds);
            setFavorite(productIds);
            console.log(favorite);
        })
            .catch(error => { console.error(error); });
    }, []);
    const toggleWishlist = async () => {
        //console.warn(item.id);

        if (favorite.includes(item)) {
            setFavorite(favorite.filter(id => id !== item));
            console.log("favorite items removed", item)
            connection.post('/favorites/destroy', params).then(response => { console.log(response.data); })
                .catch(error => { console.error(error); });
        } else {

            setFavorite([...favorite, item]);
            console.log("favorite items added", item);
            connection.post('/favorites', params).then(response => { console.log(response.data); })
                .catch(error => { console.error(error); });


            //   <WishlistScreen item={item}/>

        }

    };
    //   useEffect(() => {
    //     AsyncStorage.setItem('wishlist', JSON.stringify(favorite));
    //   }, [favorite]);
    return (

        <View style={styles.heartBar}>
            {/* {ProductItem.map((item)=>( */}

            <Pressable onPress={toggleWishlist}>
                <Image
                    style={styles.heartImg}
                    source={
                        favorite.includes(item) ? { uri: heartFill } : { uri: heartEmpty }
                    }

                />
            </Pressable>

        </View>

    );

};

const styles = StyleSheet.create({
    heartBar: {
        // justifyContent:'center',
        flexDirection: 'row',
        marginTop: 10
    },
    heartImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        marginLeft: 10,
        marginBottom: 10,

    },

});
export default Favorite;
