
import React, { useEffect, useState, useContext } from 'react';
import {
   ActivityIndicator,
   KeyboardAvoidingView,
   Platform,
   Image,
   Pressable,
   FlatList,
   Text,
   TextInput,
   View,
   Modal,
   ScrollView,
   TurboModuleRegistry,
   Alert,
} from 'react-native';


import { SelectList } from 'react-native-dropdown-select-list';

import { AuthContext } from '../../context/auth';

import { FontAwesome } from '@expo/vector-icons';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

import Header from '../../components/Header';

import Footer from '../../components/Footer';

export default function Investments({ navigation }) {

   const {
      endpoint,
      setLoad,
      load,
      user,
      accountData,
      bankData,
      amountAccount,
      setAmountAccount,
      infoDate
   } = useContext(AuthContext);


   const today = infoDate.day + "/" + infoDate.month + "/" + infoDate.year;

   useEffect(() => {
      navigation.addListener('focus', () => setLoad(!load));
      getIndicators();
      getInvestments();
   }, [load, navigation]);


   const [safeInvestments, setSafeInvestments] = useState({
      type: "",
      rate: 0,
      value: 0,
   });


   


   const [indicators, setIndicators] = useState([]);

   const [investments, setInvestments] = useState([]);

   const [showAmount, setShowAmount] = useState(false);

   const [simulator, setSimulator] = useState();

   const [showSimulator, setShowSimulator] = useState(false);

   const [modalInvestments, setModalInvestments] = useState(false);



   const getIndicators = async () => {
      await fetch(endpoint + "?action=indicators")
         .then(res => {
            return res.json();
         })
         .then(
            result => {
               setIndicators(result);
            })
         .catch(error => {
            console.log('erro => ' + error.message);
         });
   };


   const getInvestments = async () => {
      await fetch(endpoint + "?action=investments")
         .then(res => {
            return res.json();
         })
         .then(
            result => {
               setInvestments(result);
            })
         .catch(error => {
            console.log('erro => ' + error.message);
         });
   };



   const getSimulator = () => {

      //let aporte = investments.value /  indicators.selic;
      //let imposto = investments.value * indicators.ir_720_d;
      let all = simulator * 12 * (1 + indicators.ir_720_d);
      let aporte = all / indicators.selic;

      setSafeInvestments(
         {
            ...safeInvestments, ['value']: aporte.toFixed(2),           
               safeInvestments, ['type']: indicators.ir_720_d * 100, 
               safeInvestments, ['rate']: indicators.selic * 100, 
         }
      )

      setShowSimulator(true);

      // aa setAmount(investments.value /  indicators.selic);
      //am setAmount((investments.value * 12 ) /  indicators.selic);
   };


   const invest = (name, tx) => {
      setShowSimulator(false);      
      setModalInvestments(true);
      setSafeInvestments(
         {
            ...safeInvestments, ['type']: name,
            safeInvestments, ['rate']: tx
         }
      )
   };


   const handleInputChange = (atribute, value) => {
      setSafeInvestments(
         {
            ...safeInvestments, [atribute]: value
         }
      )
   };


   const safePostInvestment = () => {
      setModalInvestments(false);
      setAmountAccount(amountAccount - safeInvestments.value);
      alert(safeInvestments);
   };




   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.main}>

         <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerHeader}>
            <View>
               <Image source={{ uri: `data:image/png;base64,${bankData.img}` }} style={styles.resizeModel} />
            </View>
            <View style={styles.contentHeaderTitle}>
               <Header user={`${user}`} />
            </View>
         </LinearGradient>


         <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>{`Conta ${accountData.type}  `}</Text>
            <Text style={styles.textInfo}>{`${accountData.number}`}</Text>

            {showAmount
               ?
               <Pressable style={styles.btn}
                  onPress={() => setShowAmount(false)}>
                  {/*  <Text style={styles.textInfo}>{` AMOUNT = ${accountData.amount}`}</Text> */}
                  <Text style={styles.textInfo}>{` R$ ${amountAccount}`}</Text>
               </Pressable>
               :
               <Pressable style={styles.btn}
                  onPress={() => setShowAmount(true)}>
                  <FontAwesome name='eye' size={30} color={"#060324ff"} />
               </Pressable>
            }
         </View>


         <View style={styles.containerSimulator}>

            <Text style={styles.textInfo}>{` Simulador `}</Text>  

            <View style={styles.contentSimulator}>
               <TextInput style={styles.input}
                 placeholder="digite o valor que você planeja receber? "
                 placeholderTextColor="#44E8C3"
                 type="text"
                  onChangeText={
                 (valor) => setSimulator(valor)
                }            
               />                   
            </View>     
           
            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
              <Pressable style={styles.btn}
                onPress={() => getSimulator()}>
               <Text style={styles.textBtn}>{` Calcular `}</Text>             
              </Pressable>
            </LinearGradient>

            {showSimulator?
            <View>
              <Text style={styles.textInfo}>{`Valor do Investimento ${safeInvestments.value}`}</Text>  
              <Text style={styles.textInfo}>{`Taxa do Investimento  ${safeInvestments.type}%`}</Text> 
              <Text style={styles.textInfo}>{`Imposto de Renda ${safeInvestments.rate}%`}</Text> 
            </View> 
            :
            <View></View>
             }
        </View>        

         <View style={{height:360}}>

           <View style={styles.containerList}>
             
              <FlatList
              
                  data={investments}
                  renderItem={({ item }) =>

                      <View style={styles.contentList}>
                        <Text style={styles.textList}> {`Tipo : ${item.name}`}</Text>
                        <Text style={styles.textList}> {`Rentabilidade : ${item.tx}${item.details}`}</Text>


                         <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn}
                           onPress={() =>
                              invest(item.name, item.tx)
                           }
                        >
                           <Text style={styles.textBtn}>{`Investir`}</Text>
                        </Pressable>
                     </LinearGradient>
                      </View>

                  }
              
              >
              </FlatList>


           </View>

         </View>

{/* 
         <View style={styles.containerList}>
            <FlatList
               data={investments}
               renderItem={({ item }) =>
                  <View style={styles.contentList}>
                     <View><Text style={styles.textList}> {`Tipo : ${item.name}`} </Text></View>
                     <View>
                        <Text style={styles.textList}> {`Rentabilidade : ${item.tx}${item.details}`}</Text>
                     </View>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn}
                           onPress={() =>
                              invest(item.name, item.tx)
                           }
                        >
                           <Text style={styles.textBtn}>{`Investir`}</Text>
                        </Pressable>
                     </LinearGradient>
                  </View>
               }
            >
            </FlatList>
         </View>

 */}



         <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtnFooter}>
                     
            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                  <Pressable style={styles.btn}
                           onPress={() => navigation.navigate("SelectedAccount")}>
                           <FontAwesome name='backward' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Voltar`}</Text>
                  </Pressable>
            </LinearGradient>
            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn}
                           onPress={() => navigation.navigate("Home")}>
                           <FontAwesome name='home' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Home`}</Text>
                        </Pressable>
            </LinearGradient>
         </LinearGradient>
       
         <Modal
            animationType='fade'
            visible={modalInvestments}
         >
            <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>
               <View style={styles.infoModal} >
                  <Text style={styles.textDesc}>{` Register Investment `}</Text>
               </View>
               <View style={styles.contentModal}>
                  <View style={styles.boxCard}>
                     <Text style={styles.input}>{safeInvestments.type}</Text>
                     <Text style={styles.input}>{safeInvestments.rate}</Text>
                     <TextInput style={styles.input}
                        placeholder="Valor"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('value', valor)
                        }
                        value={safeInvestments.value}
                     />
                  </View>
                  <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn} onPress={() => safePostInvestment()}>
                           <FontAwesome name='save' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Safe`}</Text>
                        </Pressable>
                     </LinearGradient>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn} onPress={() => setModalInvestments(false)}                  >
                           <FontAwesome name='close' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Cancel`}</Text>
                        </Pressable>
                     </LinearGradient>
                  </LinearGradient>
               </View>
            </LinearGradient>
         </Modal>
      </KeyboardAvoidingView>
   )
}














