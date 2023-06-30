import React, { useState, useCallback, useRef} from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity,ScrollView, SafeAreaView } from 'react-native';
import ProductItem from '../../components/ProductItem';
import connection from '../../router/connection';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
// import { UserAuthContext } from '../../context/UserAuthContext';

const HomeScreen_API = () => {
   //const flatListRef = useRef();
   const flatListRef = useRef(null);

   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(false);
//   const {userData} = useContext(UserAuthContext)
// console.log(userData);
  
   const [term, setTerm] = useState('');
   const [sortOptionLabel, setSortOptionLabel] = useState('Sort By');

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
      setTimeout(() => {
         
        flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
      }, 200);
   };

   const onNextClick = () => {
      if (currentPage + 1 > maxPageLimit) {
         setMaxPageLimit(maxPageLimit + pageNumberLimit);
         setMinPageLimit(minPageLimit + pageNumberLimit);
      }
      setCurrentPage((prev) => prev + 1);
        setTimeout(() => {
        flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
      }, 200);
   };


   
   const fetchData= useCallback(() => {
      setLoading(true)
      
    
      axios.get('/products',{
         params: {
           page: currentPage,
           per_page: 10,
           sort_column: sortBy === 'price_asc' || sortBy === 'price_desc' ? 'price' : 'rating',
        sort_order: sortBy.includes('asc') ? 'asc' : 'desc',
         },}).then(response => {
         setProducts(response.data);
         setTotalPages(response.data.totalPages);
         setLoading(false);
        
      }).catch(error => {
         console.error(error);
      });
    //   setTimeout(() => {
    //     flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    //   }, 100);
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
      let sortColumn = '';
      let sortOrder = '';
      let label = '';
      


      if (sortOption === 'price_asc') {
         sortColumn = 'price';
         sortOrder = 'asc';
         label  = 'Sorting by Price: Low to high';

      } else if (sortOption === 'price_desc') {
         sortColumn = 'price';
         sortOrder = 'desc';
         label  = 'Sorting by Price: High to low';

      } else if (sortOption === 'rating_asc') {
         sortColumn = 'rating';
         sortOrder = 'asc';
         label  = 'Sorting by Rating: Low to high';

      } else if (sortOption === 'rating_desc') {
         sortColumn = 'rating';
         sortOrder = 'desc';
         label  = 'Sorting by Rating: High to low';

      }
      setSortBy(sortOption);
      setIsDropdownOpen(false);
      setCurrentPage(1);
      setSortOptionLabel(label);
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
            setLoading(false);
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

   return (
      <View style={styles.page}>
         <View style={styles.pageContent}>
         <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
         <Text style={styles.dropdownButtonText}>{sortOptionLabel}</Text>
        <Text style={styles.dropdownButtonArrow}>{isDropdownOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <ScrollView style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.sortButton, isSortActive('price') && styles.activeSortButton]}
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
            ref={flatListRef}
            data={products} ListEmptyComponent={() => <ActivityIndicator size="large" />}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={({ id }) => id}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={true}

            ListFooterComponent={() => (
               <View style={styles.pageNumbers}>
                  <TouchableOpacity
                     style={styles.button}
                     onPress={onPrevClick}
                     disabled={currentPage === 1}
                  >
                     <Text style= {styles.text}>Prev</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.button}
                     onPress={onNextClick}
                     disabled={currentPage === totalPages}
                  >
                     <Text style= {styles.text}>Next</Text>
                  </TouchableOpacity>
               </View>
                 )}
         />
         
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
      borderColor:"#008080",
   },
   text: {
      color:"#008080",
      fontSize: 15,
   },

//sort
sortButton: {
   paddingHorizontal: 10,
   paddingVertical: 5,
   borderRadius: 5,
   borderWidth: 1,
   borderColor: '#ccc',
   textcolor: 'white',
 },
activeSortButton: {
backgroundColor: '#fff',
},
sortButtonText: {
fontSize: 16,
textcolor: '#fff',
},

dropdownButton: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingVertical: 10,
   paddingHorizontal: 20,
   backgroundColor: '#009999',
   width: '100%',
   
},
dropdownButtonText: {
fontSize: 16,
fontWeight: 'bold',
marginRight: 10,
color: 'black',
},
dropdownButtonArrow: {
fontSize: 18,
color: 'white',

},
dropdownContainer: {
   backgroundColor: '#e0ffff',
   position: 'absolute',
   top: 55,
   left: 0,
   right: 0,
   zIndex: 2,
},
});
export default HomeScreen_API; 