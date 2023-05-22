import React, { useState,useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import ProductItem from '../../components/ProductItem';
import products from '../../data/products';
import SearchBar from '../../components/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import connection from '../../router/connection';
import Button from '../../components/Button/Button';


  
const HomeScreen_API = ({searchValue}:{searchValue:string}) => {

  
   const [term, setTerm] = useState('');
   
   const [products, setProducts] = useState([]);
   const [page,setPage]=useState(1)
   useEffect(() => {
      connection.get('/products').then(response => {
        console.log(response.data);
        setProducts(response.data);
      }).catch(error => {
        console.error(error);
      });
    }, []);

  

  // console.log(searchValue); 
   
   return (
      <View style={styles.page}>
        
         {/* <SearchBar placeholder='Search' value='' /> */}
         {/* <Text>{term}</Text> */}
         {/* Render product component */}
         {/* data is array and flatlist will display components for each item in that array 
             custom components for each item  */}
         <FlatList
            data={products} ListEmptyComponent={()=><Text style={{fontSize:40,fontWeight:"bold",
            color:"black",textAlign:'center'}}>No Data</Text>}
            renderItem={({ item }) => <ProductItem item={item} />}
            // keyExtractor={({id}) =>id}

            // mafeesh scroll indicator
            showsVerticalScrollIndicator={false}
         />
         {/* <TabNav/> */}
      </View>
      
   );
};

const styles = StyleSheet.create({
   page: {
      // width:'100%',
      //flex:1,
      padding: 10,
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
});
export default HomeScreen_API; 
