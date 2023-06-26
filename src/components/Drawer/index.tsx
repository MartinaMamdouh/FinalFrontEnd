import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity} from "react-native";
import styles from "./styles";
//import RangeSlider from 'react-native-range-slider';

import Slider from '@ptomasroos/react-native-multi-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { values } from "lodash";


const Drawer = ({ navigation }) => {

    const [price, setPrice] = useState(0);
    const [range, setRange] = useState([0, 100]);

    const handleRangeChange = (newRange) => {
      setRange(newRange);
    };
    const handleSliderChange = (value) => {
        setPrice(value);
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>PRICE RANGE (EGP)</Text>
                    <MultiSlider
                        values={range}
                        sliderLength={300}
                        onValuesChange={handleRangeChange}
                        min={0}
                        max={100}
                        step={1}
                        allowOverlap={false}
                        snapped={true}
                        
                      />
                      <Text>Range: {range[0]} - {range[1]}</Text>
                 
                    </View>
                    <View style={styles.item}>
                    <Text style={styles.title}>Rating</Text>
                    <Slider
                        min={0} 
                        max={5}
                        //handleColor='#f52d56'
                        //tintColor='#072F4A'
                       // handleDiameter={20}
                       // tintColorBetweenHandles='#072F4A'
                        //lineHeight={5}
                    //nChange={(min, max) => {}}
                    values={[price]} // Pass an array with a single value
                     sliderLength={300}
                     onValuesChange={handleSliderChange}
                    
                    />
                     <Text>Rating:{[price]}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.closeDrawer();
                        }}
                    >
                        <Text style={styles.buttonTxt}>Apply Filters</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default Drawer;