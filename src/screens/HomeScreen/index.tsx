import React, { useState, useEffect ,useCallback} from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import ProductItem from '../../components/ProductItem';
import connection from '../../router/connection';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen_API = () => {

   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [products, setProducts] = useState([]);
   const [maxPageLimit, setMaxPageLimit] = useState(5);
   const [minPageLimit, setMinPageLimit] = useState(0);
   const [totalPages, setTotalPages] = useState(0);

   let pageNumberLimit = 10;

   const onPrevClick = () => {
      if ((currentPage - 1) % pageNumberLimit === 0) {
         setMaxPageLimit(maxPageLimit - pageNumberLimit);
         setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage((prev) => prev - 1);
   };

   const onNextClick = () => {
      if (currentPage + 1 > maxPageLimit) {
         setMaxPageLimit(maxPageLimit + pageNumberLimit);
         setMinPageLimit(minPageLimit + pageNumberLimit);
      }
      setCurrentPage((prev) => prev + 1);
   };


   
   const fetchData= useCallback(() => {
      setLoading(true)

      connection.get('/products',{
         params: {
           page: currentPage,
           per_page: 10,
         },}).then(response => {
         console.log(response.data);
         setProducts(response.data);
         setTotalPages(response.data.totalPages);
         setLoading(false)
      }).catch(error => {
         console.error(error);
      });

   }, [currentPage]);
   useFocusEffect(fetchData);

   const loadMoreItems = () => {
      setLoading(true);
      if (currentPage * 10 < totalPages * 10) {
         // Fetch more data and update the state
         // ...
         setCurrentPage(currentPage + 1);
         setLoading(false);
      }
   };


   return (
      <View style={styles.page}>
         <View style={styles.pageContent}>
         <FlatList
            data={products} ListEmptyComponent={() => <ActivityIndicator size="large" />}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={({ id }) => id}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
            // mafeesh scroll indicator
            showsVerticalScrollIndicator={false}
         />

         <View style={styles.pageNumbers}>
            <TouchableOpacity
               style={styles.button}
               onPress={onPrevClick}
               disabled={currentPage === 1}
            >
               <Text>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.button}
               onPress={onNextClick}
               disabled={currentPage === totalPages}
            >
               <Text>Next</Text>
            </TouchableOpacity>
         </View>
      </View>
      </View>


   );
};

const styles = StyleSheet.create({
   page: {
      // width:'100%',
      //flex:1,
      padding: 10,
   },
   pageContent: {
     // position: 'absolute',
      zIndex:0,
      width: '100%',
      height: '100%',
   },
   root: {
      flexDirection: 'row',//one row and different columns 
      borderWidth: 1,
      borderColor: '#d1d1d1',
      borderRadius: 10,// to make border sharper
      backgroundColor: '#fff',
      width: '100%',
   },
   ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
   },
   starImgStyle: {
      margin: 2,
      width: 20,

      height: 20,
      resizeMode: 'cover',
   },
   image: {
      flex: 2,
      height: 150,
      resizeMode: 'contain',//cover the whole image even the image will not cover the whole page
      // width:150,
      // height:150, 
   },
   rightContainer: {
      padding: 10,// blank distance between text and image 
      // width:'100%',
      flex: 3,
   },
   oldPrice: {
      fontSize: 12,
      fontWeight: 'bold',
      textDecorationLine: 'line-through',
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   price: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   loadingcontainer: {
      flex: 10,
      justifyContent: 'center',
   },
   loadinghorizontal: {
      flexDirection: 'column',
      marginHorizontal: 30,

      padding: 10,
   },

   //////pagination 
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   mainData: {
      flex: 1,
      padding: 10,
   },
   item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
   },
   pagetitle: {
      fontSize: 16,
   },
   pageNumbers: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // marginVertical: 10,
      marginTop: 5,
      position: 'relative',
      zIndex: 1,
   },
   button: {
      backgroundColor: 'orange',
      padding: 10,
      marginHorizontal: 145,
      borderRadius: 10,
   },


});
export default HomeScreen_API; 