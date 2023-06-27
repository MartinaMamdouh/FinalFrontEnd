import React, { useState , useRef} from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity} from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Slider from '@ptomasroos/react-native-multi-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { values } from "lodash";
import HomeScreen from "../../screens/HomeScreen";
import AfterSearchScreen from "../../screens/AfterSearchScreen";

type DrawerProps = {
  navigation: any;
  handleApplyFilter: (name: any, rating: any, price: any, page: any, perPage: any, sortColumn: any, sortOrder: any) => void;
};
const Drawer:React.FC<DrawerProps> = ({navigation,handleApplyFilter}) => {

    const [price, setPrice] = useState(0);
    const [range, setRange] = useState([0, 5000]);

    const touchableOpacityRef = useRef(null);
   // const navigation = useNavigation();
    // const handleGoBack = () => {
    //     navigation.navigate('HomeScreen');
    //   };
    const handleFilter = async (name, rating, price, page, perPage, sortColumn, sortOrder) => {
        try {
          const response = await axios.get('https://10.0.2.2:3000/api/v1/products/', {
            params: {
              'filter[name_i_cont]': name,
              'filter[rating_eq]': rating,
              'filter[price_lt]': price,
              page,
              per_page: perPage,
              sort_column: sortColumn,
              sort_order: sortOrder,
            },
          });
      
          // Handle the response data
          const filteredProducts = response.data;
      
          // Do something with the filtered products
        } catch (error) {
          // Handle the error
          console.error('Error filtering products:', error);
        }
        handleFilter(
          name,
          rating,
          price,
          page,
          perPage,
          sortColumn,
          sortOrder
        );
        handleApplyFilter( name,
          rating,
          price,
          page,
          perPage,
          sortColumn,
          sortOrder);
        navigation.navigate('AfterSearchScreen');
      };
      

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
                      //  ref={touchableOpacityRef}
                      //  onPress={handleApplyFilter(name, rating, price, page, perPage, sortColumn, sortOrder)}
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