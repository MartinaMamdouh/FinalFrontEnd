import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import heartFill from '../../../assets/images/filled-heart.png';
import heartEmpty from '../../../assets/images/unfilled-heart.png';
import axios from 'axios';

const Favorite = ({ item }) => {

    const [favorite, setFavorite] = useState([])
    const params = { product_id: item }

    const fetchData = useCallback(() => {
        axios.get('/favorites').then(response => {
            const productIds = response.data.map((row) => row.product_id);
            setFavorite(productIds);
        })
            .catch(error => { console.error(error); });
    }, []);
    useFocusEffect(fetchData);

    const toggleWishlist = async () => {
        if (favorite.includes(item)) {
            //"item removed to wishlist"
            setFavorite(favorite.filter(id => id !== item));
            axios.post('/favorites/destroy', params).then(response => { console.log(response.data); })
                .catch(error => { console.error(error); });
        } else {
            //"item added to wishlist"
            setFavorite([...favorite, item]);
            axios.post('/favorites', params).then(response => { console.log(response.data); })
                .catch(error => { console.error(error); });
        }
    };

    return (
        <View style={styles.heartBar}>
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
        marginRight: 4,
        width: 40,
        height: 40,
        resizeMode: 'cover',
        marginLeft: 10,
        marginRight:10,
        marginBottom: 10,
        marginTop:10

    },

});
export default Favorite;
