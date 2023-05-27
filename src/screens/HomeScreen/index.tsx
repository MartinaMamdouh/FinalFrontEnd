import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, ScrollView } from 'react-native';
import ProductItem from '../../components/ProductItem';
import CustomButton from '../../components/CustomButton';

import products from '../../data/products';
import Favorite from '../../components/Favorite/Favorite';
import SearchBar from '../../components/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import connection from '../../router/connection';

const HomeScreen_API = ({ searchValue }: { searchValue: string }) => {
  const [sortBy, setSortBy] = useState(''); 
  const [term, setTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await connection.get('/products');
        let sortedProducts = response.data;

        if (sortBy === 'price_asc') {
          sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating_asc') {
          sortedProducts = sortedProducts.sort((a, b) => a.rating - b.rating);
        } else if (sortBy === 'rating_desc') {
          sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating);
        }

        setProducts(sortedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [sortBy]);

  const handleSortBy = (sortOption) => {
    setSortBy(sortOption);
    setIsDropdownOpen(false);
  };

  const isSortActive = (sortOption) => {
    return sortBy === sortOption;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownButtonText}>Sort By: {sortBy || 'Select an option'}</Text>
        <Text style={styles.dropdownButtonArrow}>{isDropdownOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <ScrollView style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.sortButton, isSortActive('price_asc') && styles.activeSortButton]}
            onPress={() => handleSortBy('price_asc')}
          >
            <Text style={styles.sortButtonText}>Price (Low to High)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, isSortActive('price_desc') && styles.activeSortButton]}
            onPress={() => handleSortBy('price_desc')}
          >
            <Text style={styles.sortButtonText}>Price (High to Low)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, isSortActive('rating_asc') && styles.activeSortButton]}
            onPress={() => handleSortBy('rating_asc')}
          >
            <Text style={styles.sortButtonText}>Rating (Low to High)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, isSortActive('rating_desc') && styles.activeSortButton]}
            onPress={() => handleSortBy('rating_desc')}
          >
            <Text style={styles.sortButtonText}>Rating (High to Low)</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <FlatList
        data={products}
        ListEmptyComponent={() => <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>No Data</Text>}
        renderItem={({ item }) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
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
   
  sortButtonsContainer: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   paddingVertical: 10,
   borderBottomWidth: 1,
   borderBottomColor: '#ccc',
 },
 sortButton: {
   paddingHorizontal: 10,
   paddingVertical: 5,
   borderRadius: 5,
   borderWidth: 1,
   borderColor: '#ccc',
 },
 activeSortButton: {
   backgroundColor: '#ccc',
 },
 sortButtonText: {
   fontSize: 14,
 },
 
 dropdownButton: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   paddingVertical: 10,
   backgroundColor: '#e0e0e0',
   marginBottom: 10,
 },
 dropdownButtonText: {
   fontSize: 16,
   fontWeight: 'bold',
   marginRight: 10,
 },
 dropdownButtonArrow: {
   fontSize: 18,
 },
 dropdownContainer: {
   backgroundColor: '#e0e0e0',
   maxHeight: 150,
 },
});
export default HomeScreen_API; 
