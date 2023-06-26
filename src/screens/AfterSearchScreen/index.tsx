import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ProductItem from '../../components/ProductItem';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AfterSearchScreen = ({ route }) => {
  const flatListRef = useRef();
  const navigation = useNavigation();
  const { searchValue } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let pageNumberLimit = 10;

  const [postCompleted, setPostCompleted] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    axios
      .post('/products', { search_key: searchValue })
      .then((response) => {
        console.log(response);
        setPostCompleted(true);
      })
      .catch((error) => {
        console.log('in database');
        setPostCompleted(true);
      });
  }, [searchValue]);

  useEffect(() => {
    if (postCompleted) {
      setLoading(true);
      axios
        .get('/products', {
          params: {
            page: currentPage,
            per_page: 10,
            'filter[name_i_cont]': searchValue,
          },
        })
        .then((response) => {
          setProducts(response.data);
          console.log('getting data');
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

          const amazonProducts = response.data.filter(
            (product) => product.source === 'amazon'
          );
          const newProducts = response.data.map((product) => {
            if (product.source !== 'amazon') {
              const randomProduct =
                amazonProducts[Math.floor(Math.random() * amazonProducts.length)];
              return { ...product, img_url: randomProduct.img_url };
            }
            return product;
          });
          setProducts(newProducts);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentPage, postCompleted, sortBy]);

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
      </View>

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

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            ref={flatListRef}
            data={products}
            ListEmptyComponent={() => (
              <View style={styles.container}>
                <Text style={styles.title}>No products found</Text>
              </View>
            )}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={({ id }) => id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() =>
              products.length !== 0 && (
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
              )
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newheader: {
    backgroundColor: '#009999',
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
    marginHorizontal: 145,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#008080',
  },
  text: {
    color: '#008080',
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
    marginBottom: 5,
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
