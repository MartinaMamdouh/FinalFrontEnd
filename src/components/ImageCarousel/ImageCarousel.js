import React, { useState , useCallback} from 'react';
import {View , Text, Image , FlatList , StyleSheet, useWindowDimensions }from 'react-native';

const ImageCarousel =({images}:{ images: string[] }) => {
    const [activeIndex,setActiveIndex]=useState(1);
    const windowWidth = useWindowDimensions().width;

    const onFlatListUpdate = useCallback(({viewableItems}) =>{
        if(viewableItems.length>0){
            setActiveIndex(viewableItems[0].index || 0 );
        }
        console.log(viewableItems);
    },[]);
    return(
        <View>
            <FlatList
              data={images}
              renderItem={({item}) => (
                <Image style={[styles.image , {width:windowWidth -40}]} source={{uri:item}}/>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment={'center'}
              snapToInterval={windowWidth-20}
              decelerationRate={'fast'}
              viewabilityConfig={{
                viewAreaCoveragePercentThreshold:50,
              }}
              onViewableItemsChanged={onFlatListUpdate} 
            />
            <View style={styles.dots}>
                {images.map((image,index)=>(
                    <View style={[styles.dot , {backgroundColor: index == activeIndex?'#c9c9c9':'#ededed'}]}/>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root:{

    },
    image:{
        margin:10,
        height:250,
        resizeMode:'contain',
    },
    dot:{
        width:10,
        height:10,
        borderRadius:25,
        borderColor:'#c9c9c9',
        borderWidth:1,
        margin:5,
    },
    dots:{
        flexDirection:'row',
        justifyContent:'center',
    }
})
export default ImageCarousel;