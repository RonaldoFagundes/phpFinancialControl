import {} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

//import {Feather} from '@expo/vector-icons';
//import { LinearGradient } from 'expo-linear-gradient';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight +22 : 64 ;




export default function Header({user , info}){



    return(

      <View style={styles.container}>
       
         <View style={styles.content}>

            <Text style={styles.text}>{info}</Text>

              {/* 
              <TouchableOpacity style={styles.buttonUser}>
                 <Feather name='user' size={27} color={'blue'} />
              </TouchableOpacity>
             */}              
       
            <Text style={styles.text}>{user}</Text>            
        </View>


      </View>



    )

}


const styles = StyleSheet.create({

     container:{
      
         width:'auto',
         height:'auto',
        // alignItems:'center',      
         padding:5,
        
         
        // marginTop:5,
        // marginBottom:5,          
         
      /*        
        paddingTop:statusBarHeight,
        paddingStart:16,
        paddingEnd:16,
        paddingBottom:30
        */
     },


     content:{
         borderRadius: 6,
        // backgroundColor:'#172b49',
         width:'auto',
         height:'auto',
        // flexDirection:'row',
        
         alignItems:'center',
       //  justifyContent:'space-around',
         padding:5,        
         
         /*
         flex:1,
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between',         
         */
     },


     text: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign:'center',       
     },
  

     /*
      buttonUser:{
         width:44,
         height:44,
         backgroundColor:'rgba(255,255,255,0.9)',
         justifyContent:'center',
         alignItems:'center',
         borderRadius: 44 / 2,
      },
     */


})
