import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   page: {
      // width:'100%',
      padding: 10,
   },
   root: {
      flexDirection: 'row',//one row and different columns 
     // borderWidth: 1,
      borderColor: '#d1d1d1',
      borderRadius: 10,// to make border sharper
      backgroundColor: '#fff',
      marginVertical: 5,

   },
   random: {
      flexDirection: 'column',//one row and different columns 
      borderWidth: 1,
      borderColor: '#d1d1d1',
      borderRadius: 3,// to make border sharper
      backgroundColor: '#fff',
      marginVertical: 5,
   },
   ratingContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 5,
   },
   Container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 5,
      marginHorizontal:10,
   },
   starImgStyle: {
      margin: 2,
      width: 20,
      height: 20,
      resizeMode: 'cover',
   },
   image: {
      padding:25,
      flex:2,
      height: 120,
      resizeMode: 'contain',//cover the whole image even the image will not cover the whole page
      // width:150,
      // height:150,
   },
   rightContainer: {
      padding: 10,// blank distance between text and image 
      // width:'100%',
      flex:5,
   },
   leftContainer: {
      padding: 10,// blank distance between text and image 
      // width:'100%',
      flex: 8,
   },
   ButtonContainer: {
     // elevation: 8,
      //backgroundColor: "#009688",
      //borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 20,
      //justifyContent:'space-evenly',
      
    },
   oldPrice: {
      fontSize: 12,
      fontWeight: 'bold',
      textDecorationLine: 'line-through',
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
      justifyContent:"flex-start",
   },
   price: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   heart: {
   },
});

export default styles; 