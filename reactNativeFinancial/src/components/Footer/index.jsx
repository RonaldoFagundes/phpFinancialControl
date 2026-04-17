import {} from 'react';
import {View, StyleSheet} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';


export default function Footer(){

return(
  <LinearGradient colors={['#08042F', '#050b3d']} style={styles.container}></LinearGradient>
 )

};

const styles = StyleSheet.create({  
 container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,    
    width: 'auto',
    height: 400,  
    marginTop: 'auto',
    marginBottom: 50
  },
});
