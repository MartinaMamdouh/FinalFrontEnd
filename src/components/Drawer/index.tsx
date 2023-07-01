import React, { useState , useRef} from "react";
import { SafeAreaView, View, Text, ScrollView,TouchableOpacity} from "react-native";
import styles from "./styles";
import Slider from '@ptomasroos/react-native-multi-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


type DrawerProps = {
  navigation: any;
  handleApplyFilter: (rating: any, price: any) => void;
};


const Drawer:React.FC<DrawerProps> = ({navigation,handleApplyFilter}) => {

    const [rating, setRating] = useState(0);
    const [range, setRange] = useState([0, 100000]);

    const touchableOpacityRef = useRef(null);

    const handleFilter = () => {
        handleApplyFilter(rating, range);
       
      };
      

    const handleRangeChange = (newRange) => {
      setRange(newRange);
    };
    const handleRatingChange = (value) => {
        setRating(value);
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>PRICE RANGE (EGP)</Text>
                    <MultiSlider
                        values={range}
                        sliderLength={350}
                        onValuesChange={handleRangeChange}
                        min={0}
                        max={100000}
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
                        step={0.1}
                    values={[rating]} // Pass an array with a single value
                     sliderLength={350}
                     onValuesChange={handleRatingChange}
                    
                    />
                     <Text>Rating:{[rating]}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleFilter}
                        
                    >
                        <Text style={styles.buttonTxt}>Apply Filters</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default Drawer;