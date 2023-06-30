import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HistoryScreen = () => {
    const [productInfo, setProductInfo] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [netErr, setNetERR] = useState(false)

    useEffect(() => {
        //Get product IDs from history table
        axios.get('/histories').then((response) => {
            const productIds = response.data.map((row) => row.product_id);
            //Get product names and links from products table
            axios.get('/products', {
                params: {
                    per_page: 1000,
                },
            }).then((response) => {
                const productInfo = response.data.filter(row => productIds.includes(row.id)).map((row) => ({
                    id: row.id,
                    name: row.name,
                    image: row.img_url,
                }));
                //Map productInfo to new array
                const sortedProductInfo = productIds.map((id) =>
                    productInfo.find((info) => info.id === id)
                );
                //Sort new array by order of productIds
                sortedProductInfo.sort((a, b) =>
                    productIds.indexOf(a.id) - productIds.indexOf(b.id)
                );
                // Step 3: Do something with the sorted product info
                setProductInfo(sortedProductInfo);
            })
                .catch((error) => {
                    console.error(error);
                });
        })
            .catch((error) => {
                if (error.request) {
                    setNetERR(true)
                  }
            });

    }, []);
    useEffect(() => {
        //Show "no history" message after 10 seconds if productInfo is still empty
        if (productInfo.length === 0 && netErr===0) {
            const timer = setTimeout(() => {
                setShowMessage(true);
            
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [productInfo]);

    if (showMessage) {
        return (
            <View>
                <Text style={styles.empty} >No History</Text>
            </View>
        );
    }

    if(netErr){
        return (
            <View>
                <Text style={styles.network} >Please check your internet connection</Text>
            </View>
        );

    }

    const navigation = useNavigation();
    const onPress = (itemID) => {
        axios.post('/histories', { product_id: itemID })
            .then(response => console.log(response))
            .catch(error => console.log(error))
        navigation.navigate('ProductScreen', { myid: itemID });

    }
    return (
        <ScrollView>
            <View >
                {productInfo.map((product) => (
                    <Pressable onPress={() => onPress(product.id)} >
                        <View style={styles.root} key={product.id}>
                            <Image style={styles.image} source={{ uri: product.image }} />
                            <View style={styles.rightContainer}>
                                <Text style={styles.title} numberOfLines={3}>
                                    {product.name}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        padding: 10,
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        flex: 2,
        height: 60,
        resizeMode: 'contain',
        marginTop: 10,
    },
    title: {
        fontWeight: 'bold',
        padding: 15,
        marginLeft: 10,
        // fontSize: 15,
        // flex: 2,

    },
    empty: {
        fontSize: 40,
        fontWeight: "normal",
        marginTop: 245,
        marginLeft: 110,
        marginRight: 10,
    },
    network:{
        fontSize: 17,
       
        fontWeight: "normal",
        marginTop: 245,
        alignSelf:"center",
    },
    rightContainer: {
        flex: 6,
    },


})
export default HistoryScreen;
