import { StyleSheet } from "react-native";

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
       marginBottom:135,
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
    curPage:{
       fontSize:17,
       fontWeight:'bold',
       color:'#008080',
    },
    nodata:{
       color: "#008080",
       fontSize: 20,
       alignSelf:'center',
       marginTop:20,
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
    backgroundColor: '#b3cccc',
    width: '48%',
    marginBottom:3,
    marginRight:225,
    
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
    backgroundColor: '#e6ffff',
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    zIndex: 2,
    marginRight:203,
 },
 //filter
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