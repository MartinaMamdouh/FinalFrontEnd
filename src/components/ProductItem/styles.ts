import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    page:{
     // width:'100%',
     padding:10,
    },
    root :{
      flexDirection:'row',//one row and different columns 
      borderWidth:1,
      borderColor:'#d1d1d1',
      borderRadius:10,// to make border sharper
      backgroundColor:'#fff',
      marginVertical:5,

    },
    ratingContainer:{
     flexDirection:'row',
     alignItems:'center', 
     marginVertical:5,
    },
    starImgStyle:{
       margin:2,
       width:20,
       height:20,
       resizeMode:'cover',
    },
    image: {
       flex:2,
       height:150,
       resizeMode:'contain',//cover the whole image even the image will not cover the whole page
       // width:150,
       // height:150,
    },
    rightContainer:{
       padding:10,// blank distance between text and image 
       // width:'100%',
       flex:3,
    },
    oldPrice:{
     fontSize:12,
     fontWeight: 'bold',
     textDecorationLine:'line-through',   
    },
    title:{
      fontSize:18,
      fontWeight: 'bold',
    },
    price:{
       fontSize:18,
       fontWeight: 'bold',
    },
    heart:{
   },
   });

   export default styles; 