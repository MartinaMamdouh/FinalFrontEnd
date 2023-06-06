import React, { useState, useEffect,useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import connection from '../../router/connection';
import heartFill from '../../../assets/images/filled-heart.png';
import heartEmpty from '../../../assets/images/unfilled-heart.png';

const Favorite = ({ item }) => {
  
    const [favorite, setFavorite] = useState([])
    const baseURL = 'http://localhost:3000/api/v1/products/';
    const params = {
        product_id: item
    }
    const headers = {
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.7xGXdq5PJHMYyvqCCV0hwA2lCCde9LrUZkyFTX2Bc0s',
        'Content-Type': 'application/json'
    }

    const fetchData=useCallback(() => {
        connection.get('/favorites').then(response => {
            // console.log(response.data);
            const productIds = response.data.map((row) => row.product_id);
           // console.log(productIds);
            setFavorite(productIds);
            // console.log(favorite);
        })
            .catch(error => { console.error(error); });
    }, []);
    useFocusEffect(fetchData);
    const toggleWishlist = async () => {
        //console.warn(item.id);

        if (favorite.includes(item)) {
            setFavorite(favorite.filter(id => id !== item));
            //console.log("favorite items removed", item)
            connection.post('/favorites/destroy', params).then(response => { console.log(response.data); })
                .catch(error => { console.error(error); });
        } else {

            setFavorite([...favorite, item]);
            //console.log("favorite items added", item);
            connection.post('/favorites', params).then(response => { console.log(response.data); })
                .catch(error => { console.error(error); });
        }

    };

    return (

        <View style={styles.heartBar}>
            {/* {ProductItem.map((item)=>( */}

            <Pressable onPress={toggleWishlist}>
                <Image
                    style={styles.heartImg}
                    source={favorite.includes(item) ? heartFill : heartEmpty}
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
        marginRight:4,
        width: 40,
        height: 40,
        resizeMode: 'cover',
        marginLeft: 10,
        marginBottom: 10,

    },

});
export default Favorite;
