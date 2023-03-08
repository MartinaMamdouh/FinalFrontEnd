import React ,{useState} from 'react';
import { View , StyleSheet,TouchableOpacity,Image} from 'react-native';
   
const Favorite = () => {
    const heartEmpty='https://www.citypng.com/public/uploads/preview/-51610329431xv3s3v3d9v.png';
    const heartFill='https://www.pngitem.com/pimgs/m/307-3070057_red-heart-outline-png-transparent-png.png';
    const [defaultFavorite, setdefaultFavorite] =React.useState(false);
    const [favorite, setFavorite] = useState([1])
return(
    <View style={styles.heartBar}>
            
                {favorite.map((item, key) => {
                    return (
                        <TouchableOpacity
                            // activeOpacity={0.7}
                            key={item}
                            onPress={() => setdefaultFavorite(item=>!item)}
                            
                        >
                            <Image
                                style={styles.heartImg}
                                source={
                                    item <= defaultFavorite ? { uri: heartFill } : { uri: heartEmpty }
                                }
                                
                            />
                        
                        </TouchableOpacity>
                        
                    )

                })
                }

            </View>
            
        );
    
        
    };
   
    const styles = StyleSheet.create({
        heartBar:{
            // justifyContent:'center',
            flexDirection:'row',
            marginTop:10
        },
        heartImg:{
            width:40,
            height:40,
            resizeMode:'cover',
            marginLeft: 10,
            marginBottom:10,
            
        },
        
    })
export default Favorite ;