import React, { useEffect, useState, useContext, useRef } from 'react';
import {
   Pressable,
   FlatList,
   Text,
   TextInput,
   View,
   Modal,
   Image,
   Animated,
   StatusBar,
   ScrollView
} from 'react-native';

import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';




// expo install expo-screen-capture
//import * as ScreenCapture from 'expo-screen-capture';


//npm install react-native-view-shot






export default function Login({ navigation }) {

/* 
  useEffect(() => {
      
   }, []);

 */


  
  const handleBlockCapture = () => {
   // ScreenCapture.preventScreenCaptureAsync();
    console.log('Captura de tela bloqueada');
  };


  const handleAllowCapture = () => {
   // ScreenCapture.allowScreenCaptureAsync();
    console.log('Captura de tela permitida');
  };
 


  const viewShotRef = useRef(null);

  const [uri, setUri] = useState(null);

  
  const captureScreen = () => {
    viewShotRef.current.capture().then((uri) => {
      setUri(uri);  // Captura a imagem e armazena o URI
      console.log('Imagem capturada!', uri);
    }).catch(err => {
      console.log('Erro ao capturar:', err);
    });
  };





return(
   <View style={styles.main}>   


   <Text style={styles.textTitle}>Capture Screen</Text>   

      <View style={styles.container}>          
           
            <Pressable  style={styles.btnMenu}
                onPress={() => handleBlockCapture()}>
                  <Text style={styles.textBtn}>{` BlockCapture`}</Text>
            </Pressable>

            <Pressable  style={styles.btnMenu}
                onPress={() => handleAllowCapture()}>
                  <Text style={styles.textBtn}>{` AllowCapture`}</Text>
            </Pressable>
            
             {/*   
            <Pressable  style={styles.btnMenu}
                onPress={() => captureScreen()}>
                  <Text style={styles.textBtn}>{` Capture`}</Text>
                  {uri && <Image source={{ uri }} style={styles.capturedImage} />}
            </Pressable>
            */}
      </View>



</View>

)}











/*
const styles = StyleSheet.create({

   main:{   
    backgroundColor:'#000000',    
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    height: '100%',
    width: '100%',    
   },


   container:{
      width: '94%',
      height: 'auto',
      padding: 14,
      backgroundColor: '#08042F',
      alignItems:'center',
      borderRadius: 10,  
   },


   input: {
      width: '100%',
      height: 50,
      marginBottom: 20,
      padding: 6,
      borderBottomWidth: 1,
      borderBottomColor: "#44E8C3",
      borderRadius: 10,
      color: "#44E8C3",
      backgroundColor: '#062531',
      fontSize: 16
   },


   btn: {
      width: 'auto',
      height: 'auto',
      padding: 14,
      alignItems:'center',    
      borderRadius: 10,      
      backgroundColor: '#062531',       
   },
        
    
   textBtn: {
      color: '#44E8C3',
      fontSize: 14,
      fontWeight: 'bold',
   },

}) 
 */  