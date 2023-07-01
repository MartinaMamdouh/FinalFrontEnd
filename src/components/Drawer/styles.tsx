import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    item: {
        marginVertical:10,
        marginHorizontal:10,
    },
    title: {
        color:'#009999',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 5,
        
       
    },
    button: {
        marginTop: 30,
        backgroundColor:'#009999',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTxt: {
        color:'#FFFFFF',
        fontWeight: 'bold',
        fontSize:16,
    }

});
export default styles;