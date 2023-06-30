import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import ProductItem from '../../components/ProductItem';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ax from '../../../assets/images/axios-net.png';
import axios from 'axios';

const AfterSearchScreen = ({ route }) => {
  const flatListRef = useRef();
  const [sortOptionLabel, setSortOptionLabel] = useState('Sort By');
  const navigation = useNavigation();
  const { searchValue } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  //  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hasInternetConnection, setHasInternetConnection] = useState(true);
  //  const [reload, setReload] = useState(false);
  const [button, setButton] = useState(false);
  const [nodata, setNoData] = useState(false);
  let pageNumberLimit = 10;

  const [postCompleted, setPostCompleted] = useState(false);

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

  useEffect(() => {
    //setLoading(true);
    axios.post('/products', { search_key: searchValue })
      .then(response => {
        console.log(response)
        setPostCompleted(true);
      })
      .catch(error => {
        console.log("in database")
        setPostCompleted(true);
      });
  }, [searchValue]);


  const fetchData = useCallback(() => {
    if (postCompleted) {
      // setLoading(true)
      axios.get('/products', {
        params: {
          page: currentPage,
          per_page: 10,
          'filter[name_i_cont]': searchValue,
          sort_column: sortBy === 'price_asc' || sortBy === 'price_desc' ? 'price' : 'rating',
          sort_order: sortBy.includes('asc') ? 'asc' : 'desc',

        },
      }).then(response => {
        setProducts(response.data);
        //console.log("getting data")
        setTotalPages(response.data.totalPages);
        //  setLoading(false);
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
        if (response.data.length === 0) {
          setNoData(true);
          setShowButtons(false);
        }
      }).catch(error => {
        console.error(error);
        setHasInternetConnection(false);
      });
    }
  }, [currentPage, postCompleted]);
  useFocusEffect(fetchData);

  const handleSortBy = (sortOption) => {
    setCurrentPage(1);
    setSortBy(sortOption);
    setIsDropdownOpen(false);
    let sortColumn = '';
    let sortOrder = '';
    let label = '';
    if (sortOption === 'price_asc') {
      sortColumn = 'price';
      sortOrder = 'asc';
      label = 'Sorting by Price: Low to high';
    } else if (sortOption === 'price_desc') {
      sortColumn = 'price';
      sortOrder = 'desc';
      label = 'Sorting by Price: High to low';
    } else if (sortOption === 'rating_asc') {
      sortColumn = 'rating';
      sortOrder = 'asc';
      label = 'Sorting by Rating: Low to high';
    } else if (sortOption === 'rating_desc') {
      sortColumn = 'rating';
      sortOrder = 'desc';
      label = 'Sorting by Rating: High to low';
    }

    axios
      .get('/products', {
        params: {
          page: currentPage,
          per_page: 10,
          'filter[name_i_cont]': searchValue,
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

  return (
    <View style={styles.page}>

      <View style={styles.newheader}>
        <Feather
          name="arrow-left"
          size={25}
          color="white"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <Text style={styles.headerText}>{searchValue}</Text>
       </View >

  <View style={styles.pageContent}>
    <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
      <Text style={styles.dropdownButtonText}>{sortOptionLabel}</Text>
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
        <Image source={ax} style={styles.axImg}
        />
        <Text style={styles.axiosErr}>        Server can't be reached{"\n"}Please go back and try again later.</Text>

        <TouchableOpacity
          style={styles.butn}
          onPress={() => navigation.navigate('HomeScreen')}

        >
          <Feather
            name="arrow-left"
            size={25}
            color="black"
          />
          <Text style={{ fontSize: 17 }} >Home </Text>
        </TouchableOpacity>
      </View>

    )}
    {hasInternetConnection && (
      <FlatList
        ref={flatListRef}
        data={products} ListEmptyComponent={() => (
          nodata ? <Text style={styles.nodata}>No data available</Text> : <ActivityIndicator size="large" />
        )}
        renderItem={({ item }) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}

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
                <Text style={styles.curPage}> {currentPage}/{totalPages}</Text>
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
    </View >


 );
};

const styles = StyleSheet.create({
  newheader: {
    backgroundColor: "#009999",
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },

  page: {
    flex: 1,
  },

  pageContent: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    padding: 10,
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
    padding: 8,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#008080",
    alignItems: 'center',
    flexDirection: 'row',
  },
  nodata: {
    color: "#008080",
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
  },

  //////pagination 
  pageNumbers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 55,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#b2d8d8',
    padding: 8,
    marginHorizontal: 110,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#008080",
  },
  text: {
    color: "#008080",
    fontSize: 15,
  },
  curPage: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#008080',
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
  fontSize: 16,
},

dropdownButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: '#b3cccc',
  width: '100%',

},
dropdownButtonText: {
fontSize: 16,
fontWeight: 'bold',
marginRight: 10,
color: '#476b6b',
},
dropdownButtonArrow: {
fontSize: 18,
color: '#476b6b',

},
dropdownContainer: {

   backgroundColor: '#e0ffff',
   position: 'absolute',
   top: 55,
   left: 0,
   right: 0,
   zIndex: 2,

},
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 20,
},
title: {
  fontSize: 36,
  fontWeight: 'bold',
  textAlign: 'center',
},
});

export default AfterSearchScreen; 