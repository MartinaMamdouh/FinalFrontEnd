import React ,{useState,useEffect}from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import connection from '../../router/connection';


const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [products, setProducts] = useState([]);
   const [maxPageLimit, setMaxPageLimit] = useState(5);
   const [minPageLimit, setMinPageLimit] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
const Pagination = () => {
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
 };
 let pageNumberLimit =10;

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
 return (
  <View style={styles.pageNumbers}>
  <>
  <TouchableOpacity
     style={styles.button}
     onPress={onPrevClick}
     disabled={currentPage === 1}
  >
     <Text >Prev</Text>
  </TouchableOpacity>
  {/* {pageDecremenEllipses}
  {pageNumbers}
  {pageIncrementEllipses} */}
     <TouchableOpacity
        style={styles.button}
        onPress={onNextClick}
        disabled={currentPage === totalPages}
     >
        <Text>Next</Text>
     </TouchableOpacity>
     </>
  </View>
 );
 

}
const styles = StyleSheet.create({

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
title: {
  fontSize: 16,
},
pageNumbers: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
},
button: {
  backgroundColor: '#f9c2ff',
  padding: 10,
  marginHorizontal: 3,
},
});
export default Pagination;