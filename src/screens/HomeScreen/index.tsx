import React, { useState, useEffect, useCallback } from 'react';
import {Modal, View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import ProductItem from '../../components/ProductItem';
import connection from '../../router/connection';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Drawer from '../../components/Drawer';

const HomeScreen_API = ({navigation}) => {

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [products, setProducts] = useState([]);
   const [maxPageLimit, setMaxPageLimit] = useState(5);
   const [minPageLimit, setMinPageLimit] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [sortBy, setSortBy] = useState('');
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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



   const fetchData = useCallback(() => {
      setLoading(true)

      connection.get('/products', {
         params: {
            page: currentPage,
            per_page: 10,
         },
      }).then(response => {
         console.log(response.data);
         setProducts(response.data);
         setTotalPages(response.data.totalPages);
         setLoading(false);
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
   
 
     const toggleDrawer = () => {
       setIsDrawerOpen(!isDrawerOpen);
     };

   return (
      <View style={styles.page}>
         <View style={styles.pageContent}>
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
               <Text style={styles.dropdownButtonText}>Sort By: {sortBy || ''}</Text>
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
            {/* filter  */}
              <TouchableOpacity style={styles.filterContainer} onPress={() => setIsModalOpen(true)} >
              <Text style={styles.dropdownButtonText}> Filter</Text>
               <Ionicons name='options-sharp' color='grey' size={25}/>
               {/* {isDrawerOpen &&  <Drawer navigation={navigation} />} */}
               </TouchableOpacity>
               <Modal visible={isModalOpen} animationType="slide"><Drawer navigation={navigation}/></Modal>

            <FlatList
               data={products} ListEmptyComponent={() => <ActivityIndicator size="large" />}
               renderItem={({ item }) => <ProductItem item={item} />}
               keyExtractor={({ id }) => id}
               onEndReached={loadMoreItems}
               onEndReachedThreshold={0.5}
               // mafeesh scroll indicator
               showsVerticalScrollIndicator={false}

               ListFooterComponent={() => (
                  <View style={styles.pageNumbers}>
                     <TouchableOpacity
                        style={styles.button}
                        onPress={onPrevClick}
                        disabled={currentPage === 1}
                     >
                        <Text style={styles.text}>Prev</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.button}
                        onPress={onNextClick}
                        disabled={currentPage === totalPages}
                     >
                        <Text style={styles.text}>Next</Text>
                     </TouchableOpacity>
                  </View>
               )}
            />

         </View>
      </View>


   );
};
export default HomeScreen_API; 