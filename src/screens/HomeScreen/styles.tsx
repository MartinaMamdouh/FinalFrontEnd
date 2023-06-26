import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    page: {
       padding: 10,
    },
    pageContent: {
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
    },
    rightContainer: {
       padding: 10,// blank distance between text and image 
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
    footer: {
       // Add any desired styles for the footer, for example:
       backgroundColor: '#f8f9fa',
       padding: 10,
       marginBottom: 10,
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
    filterContainer:{          
       borderBottomColor: 'grey',
       backgroundColor: '#e0e0e0',
       position: 'absolute',
       right: 5,
       flexDirection: 'row',
       alignItems: 'center',
       height: 45,
       paddingVertical: 5,
       paddingHorizontal:15,
       marginBottom:10,
       
    },
 });






export default styles;