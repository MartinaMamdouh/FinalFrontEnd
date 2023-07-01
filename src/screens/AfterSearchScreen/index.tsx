import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Modal, View, Image, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import ProductItem from '../../components/ProductItem';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ax from '../../../assets/images/axios-net.png';
import axios from 'axios';
import styles from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Drawer from '../../components/Drawer';

const AfterSearchScreen = ({ route }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [filter, setFilter] = useState({
    rating_eq: 0,
    price_lt: 0
  });

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
        // console.log(response)
        setPostCompleted(true);
      })
      .catch(error => {
        // console.log("in database")
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
          'filter[rating_eq]': filter.rating_eq[0],
          'filter[price_lteq]': filter.price_lt[1],
          'filter[price_gteq]': filter.price_lt[0],
          sort_column: sortBy === 'price_asc' || sortBy === 'price_desc' ? 'price' : 'rating',
          sort_order: sortBy.includes('asc') ? 'asc' : 'desc',

        },
      }).then(response => {
        setProducts(response.data);
        // get X-Total-Count header from response and take ceil of 
        setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
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
  }, [currentPage, postCompleted, filter]);
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
        setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
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

  const handleApplyFilter = (rating, price) => {
    setFilter((oldFilter) => {
      const newFilter = { ...oldFilter };
      newFilter.rating_eq = rating;
      newFilter.price_lt = price;
      setIsModalOpen(false)
      return newFilter;
    });
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
        {/* filter  */}
        <TouchableOpacity style={styles.filterContainer} onPress={() => setIsModalOpen(true)} >
          <Text style={styles.dropdownButtonText}> Filter</Text>
          <Ionicons name='options-sharp' color='grey' size={25} />
          {/* {isDrawerOpen &&  <Drawer navigation={navigation} />} */}
        </TouchableOpacity>
        <Modal visible={isModalOpen} animationType="slide"><Drawer navigation={navigation} handleApplyFilter={handleApplyFilter} /></Modal>

        {!hasInternetConnection && (
          <View>
            <Image source={ax} style={styles.axImg}
            />
            <Text style={styles.axiosErr}>Server can't be reached</Text>
            <Text style={styles.axiosErr2}>Please go back and try again later.</Text>
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
export default AfterSearchScreen; 