import { StyleSheet } from "react-native";
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
   width: '48%',
   marginBottom:3,
 
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
    marginLeft:10,
    marginRight:215,
 
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
 export default styles;