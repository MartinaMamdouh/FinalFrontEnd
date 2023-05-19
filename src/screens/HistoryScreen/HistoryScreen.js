import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import product from '../../data/product';
const HistoryScreen = () => {
    const [productInfo, setProductInfo] = useState([]);

    const Img = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/mouse1.jpg';
    return (
        <View >
            {/* <Text style={styles.container}>My History</Text> */}
            <View style={styles.root}>

                <Image style={styles.image} source={{ uri: Img }} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title} numberOfLines={3}>
                        {product.title}
                    </Text>
                    
                  

                </View>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    // container: {

    //     marginBottom: 20,
    //     marginLeft: 130,
    //     marginTop: 20,
    //     color:'#FE8113',
    //     fontSize: 30,
    //     fontWeight: 'bold',

    // },
    root: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        padding:10,
        marginTop: 20,
        marginLeft:10,
        marginRight:10,
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
        marginLeft:10,
        // fontSize: 15,
        // flex: 2,

    },
    rightContainer: {
        flex: 6,
    },


})
export default HistoryScreen;