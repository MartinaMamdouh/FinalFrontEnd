import React, { useState, useCallback, useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, BackHandler, Alert, SafeAreaView } from 'react-native';
import ProductItem from '../../components/ProductItem';
import { useFocusEffect } from '@react-navigation/native';
import ax from '../../../assets/images/axios-net.png';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar/SearchBar';
import axios from 'axios';
const HomeScreen_API = () => {
   let pageNumberLimit = 10;
   const flatListRef = useRef();
   const [currentPage, setCurrentPage] = useState(1);
   const [products, setProducts] = useState([]);
   const [maxPageLimit, setMaxPageLimit] = useState(5);
   const [minPageLimit, setMinPageLimit] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [sortBy, setSortBy] = useState('');
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [showButtons, setShowButtons] = useState(false);
   const [hasInternetConnection, setHasInternetConnection] = useState(true);
   const [reload, setReload] = useState(false);
   const [button, setButton] = useState(false);

   const handleBackPress = () => {
      Alert.alert(
         'Exit',
         'Do you want to exit the app?',
         [
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
            { text: 'No', onPress: () => console.log('NO Pressed') }
         ],
         { cancelable: false }
      );
      return true; // Return true to enable back button override
   };
   BackHandler.addEventListener('hardwareBackPress', handleBackPress);


   const onPrevClick = () => {
      if ((currentPage - 1) % pageNumberLimit === 0) {
         setMaxPageLimit(maxPageLimit - pageNumberLimit);
         setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage((prev) => prev - 1);
      setButton(true);
   };

   const onNextClick = () => {
      if (currentPage + 1 > maxPageLimit) {
         setMaxPageLimit(maxPageLimit + pageNumberLimit);
         setMinPageLimit(minPageLimit + pageNumberLimit);
      }
      setCurrentPage((prev) => prev + 1);
      setButton(true);
   };



   const fetchData = useCallback(() => {
      axios.get('/products', {
         params: {
            page: currentPage,
            per_page: 10,
            sort_column: sortBy === 'price_asc' || sortBy === 'price_desc' ? 'price' : 'rating',
            sort_order: sortBy.includes('asc') ? 'asc' : 'desc',
         },
      }).then(response => {
         setProducts(response.data);
         setTotalPages(response.data.totalPages);
         setHasInternetConnection(true);
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
         setShowButtons(true);
         if (button) {
            flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
            setButton(false);
         }
      }).catch(error => {
         console.error(error);
         setHasInternetConnection(false);
      });
   }, [currentPage]);
   useFocusEffect(fetchData);

   //sort
   const handleSortBy = (sortOption) => {
      setCurrentPage(1);
      setSortBy(sortOption);
      setIsDropdownOpen(false);

      let sortColumn = '';
      let sortOrder = '';

      if (sortOption === 'price_asc') {
         sortColumn = 'price';
         sortOrder = 'asc';
      } else if (sortOption === 'price_desc') {
         sortColumn = 'price';
         sortOrder = 'desc';
      } else if (sortOption === 'rating_asc') {
         sortColumn = 'rating';
         sortOrder = 'asc';
      } else if (sortOption === 'rating_desc') {
         sortColumn = 'rating';
         sortOrder = 'desc';
      }

      axios
         .get('/products', {
            params: {
               page: currentPage,
               per_page: 10,
               sort_column: sortColumn,
               sort_order: sortOrder,
            },
         })
         .then((response) => {
            setProducts(response.data);
            setTotalPages(response.data.totalPages);
         })
         .catch((error) => {
            console.error(error);
         });
   };

   const isSortActive = (sortOption) => {
      return sortBy === sortOption;
   };

   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };
   useEffect(() => {
      if (reload) {
         fetchData();
         setReload(false);

      }
   }, [reload]);

   const handleReload = () => {
      setReload(true);

   };
   //search
   const [searchValue, setSearchValue] = useState('');
   const HeaderComponent = ({ setSearchValue }) => {
      const navigation = useNavigation();
      const handleSearchResult = (result: string) => {
         console.log('Search result:', result);
         setSearchValue(result);
         // do something with the search result, such as filtering data or updating state
         navigation.navigate('AfterSearchScreen', { searchValue: result });
      }
      return (
         <SafeAreaView style={{ backgroundColor: '#009999' }}>
            <View style={{
               margin: 10,
               // padding:5,
               backgroundColor: 'white',
               flexDirection: 'row',
               alignItems: 'center',
            }}>

               <SearchBar onResult={handleSearchResult} />

            </View>

         </SafeAreaView>

      );
   };
   return (
      <View>
         <HeaderComponent setSearchValue={setSearchValue} />

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
               {!hasInternetConnection && (
                  <View>
                     <View style={{ maxHeight: 0 }}>
                        {reload && (
                           <ActivityIndicator size="large" />
                        )}
                     </View>

                     <Image source={ax} style={styles.axImg}
                     />
                     <Text style={styles.axiosErr}>Server can't be reached</Text>
                     <TouchableOpacity
                        style={styles.butn}
                        onPress={handleReload}

                     >
                        <Text style={{ fontSize: 17 }} >Reload</Text>
                     </TouchableOpacity>
                  </View>

               )}
               {hasInternetConnection && (
                  <FlatList
                     ref={flatListRef}
                     data={products} ListEmptyComponent={() => <ActivityIndicator size="large" />}
                     renderItem={({ item }) => <ProductItem item={item} />}
                     showsVerticalScrollIndicator={true}

                     ListFooterComponent={() => (
                        <View style={styles.pageNumbers}>
                           {showButtons && ( // check if products is not empty
                              <>
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
                              </>
                           )}
                        </View>
                     )}
                  />
               )}
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
      zIndex: 0,
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
   axImg: {
      width: '70%',
      // maxWidth:215,
      height: '60%',
      resizeMode: 'contain',
      alignSelf: "center",
      marginTop: 50,
   },
   axiosErr: {
      alignSelf: "center",
      fontSize: 18,
      fontWeight: 'light',

   },
   butn: {
      marginTop: 10,
      backgroundColor: '#b2d8d8',
      padding: 9,
      alignSelf: "center",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#008080",
      alignItems: 'center',
   },
   rightContainer: {
      padding: 10,// blank distance between text and image 
      // width:'100%',
      flex: 3,
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
      marginTop: 5,
      zIndex: 1,
   },
   button: {
      backgroundColor: '#b2d8d8',
      padding: 8,
      marginHorizontal: 145,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#008080",
   },
   text: {
      color: "#008080",
      fontSize: 15,
   },

   //sort
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
      marginRight: 260,
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