import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,ScrollView} from 'react-native';
import connection from '../../router/connection';


const HistoryScreen = () => {
    const [productInfo, setProductInfo] = useState([]);
//   Get product IDs from history table
  useEffect(() => {
    connection.get('/histories')
        .then((response) => {
        const productIds = response.data.map((row) => row.product_id);
        console.log(productIds);
        //Get product names and links from products table
        connection.get('/products')
            .then((response) => {
            const productInfo = response.data.filter(row=> productIds.includes(row.id)).map((row) => ({
                id: row.id,
                name: row.name,
                image: row.img_url,
            }));
            setProductInfo(productInfo);
            console.log(productInfo);
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
        <ScrollView>
         {productInfo.map((product) => (
            <View style={styles.root} key={product.id}>
                    <Image style={styles.image} source={{ uri: product.image }} />
                    <View style={styles.rightContainer}>
                    <Text style={styles.title} numberOfLines={3}>
                        {product.name}
                    </Text>
                    </View>
                </View>
            ))}
            </ScrollView>
        
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
        marginTop: 8,
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