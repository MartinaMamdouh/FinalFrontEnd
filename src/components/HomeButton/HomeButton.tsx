<<<<<<< HEAD
import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

interface ButtonProps {
  text: string;
  onPress: () => void;
  containerStyles?: object;
}

const HomeButton = ({ text, onPress, containerStyles }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyles]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e47911',
    marginVertical: 2,
    marginHorizontal: 10,
    height: 35,
    width: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a15e1b',
    flexDirection: 'row',
    alignItems: 'center',
    //alignContent: 'space-around',
    justifyContent: 'center',
   //marginBottome: 30,
    flex:4,
  },
  text: {
    fontSize: 16,

  },
})

=======
import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

interface ButtonProps {
  text: string;
  onPress: () => void;
  containerStyles?: object;
}

const HomeButton = ({ text, onPress, containerStyles }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyles]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e47911',
    marginVertical: 2,
    marginHorizontal: 10,
    height: 35,
    width: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a15e1b',
    flexDirection: 'row',
    alignItems: 'center',
    //alignContent: 'space-around',
    justifyContent: 'center',
   //marginBottome: 30,
    flex:4,
  },
  text: {
    fontSize: 16,

  },
})

>>>>>>> 0a0b655cd1afbd44e9a3ee80d51f1c25dde1b711
export default HomeButton;