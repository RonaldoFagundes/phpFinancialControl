import {
   Text,
   View,
   KeyboardAvoidingView,
   Platform,
   FlatList,
} from 'react-native';

import React, { useEffect, useState, useContext, ref, useRef } from 'react';
import { AuthContext } from '../../context/auth';




export default function Home({ navigation }) {


   const {
      endpoint,
   } = useContext(AuthContext);


   useEffect(() => {
      getListBank();
   }, [navigation]);


   const [data, setData] = useState([]);


   const DATA = [
      { id: '1', title: 'First Item' },
      { id: '2', title: 'Second Item' },
      { id: '3', title: 'Third Item' },
   ];



   const [listBank, setListBank] = useState([]);



   const getListBank = async () => {

      await fetch(endpoint + "?action=listBank")
         .then(res => {
            return res.json();            
         })
         .then(
            result => {
               
               /*
               var count = Object.keys(result).length;
               let bank = [];
                  for (var i = 0; i < count; i++) {
                     bank.push({
                         value:result[i].name_bnk,
                     })
                  }
               */

              
               setListBank(result);

             
            })
         .catch(error => {
            console.log('erro => ' + error.message);
         });
   }





   const getListBank3 = async () => {
      fetch(endpoint + "?action=listBank")
         .then((response) => response.json())
         .then((json) => setData(json))
         .catch((error) => console.error(error));
   }



  const getListBank1 = async () => {   
      try {
        const response = await fetch(endpoint + "?action=listBank");
        const jsonResponse = await response.json(); // Automatically parses JSON
       
        setData(jsonResponse);       

       // console.log(data);      

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
       // setLoading(false);
      }
    };
  

   const renderItem = ({ item }) => (
      <View>
         <Text>{item.id}</Text> {/* Assumindo que sua API retorna objetos com a propriedade 'nome' */}
      </View>
   );





   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >

         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }} >

            <View style={{ width: 200, height: 200, backgroundColor: 'gray' }} >
  
           
            <FlatList
               data={listBank}
                   renderItem={({ item }) =>
                   <View style={{width:'auto', backgroundColor:'orange'}}>
                        <View>
                           <Text>
                              {`ID  :  ${item.name_bnk}`}
                           </Text>
                            <Text>
                              {`Nº :  ${item.number_bnk}`}
                            </Text>
                           </View>
                        </View>     
                       }
                      >            
            </FlatList>        
 
            </View>

         </View>





      </KeyboardAvoidingView>

   )

}








 








