import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,ScrollView} from 'react-native';
import connection from '../../router/connection';

const HistoryScreen = () => {
    const [productInfo, setProductInfo] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    //Get product IDs from history table
        connection.get('/histories').then((response) => {
        const productIds = response.data.map((row) => row.product_id);
        console.log(productIds);
        //Get product names and links from products table
        connection.get('/products').then((response) => {
            const productInfo = response.data.filter(row=> productIds.includes(row.id)).map((row) => ({
                id: row.id,
                name: row.name,
                image: row.img_url,
            }));
            // setProductInfo(productInfo);
            // console.log(productInfo);
            //Map productInfo to new array
            const sortedProductInfo = productIds.map((id) =>
            productInfo.find((info) => info.id === id)
             );
            //Sort new array by order of productIds
            sortedProductInfo.sort((a, b) =>
            productIds.indexOf(a.id) - productIds.indexOf(b.id)
            );
            // Step 3: Do something with the sorted product info
            console.log(sortedProductInfo);
            setProductInfo(sortedProductInfo);
                })
            .catch((error) => {
            console.error(error);
            });
        })
        .catch((error) => {
        console.error(error);
        });
        
    }, []);
    useEffect(() => {
        //Show "no history" message after 10 seconds if productInfo is still empty
        if (productInfo.length === 0) {
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
    return (
        <ScrollView>
         <View >
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
    empty:{
        fontSize: 40,
        fontWeight: "normal",
        marginTop: 245,
        marginLeft:110,
        marginRight:10,
    },
    rightContainer: {
        flex: 6,
    },


})
export default HistoryScreen;
