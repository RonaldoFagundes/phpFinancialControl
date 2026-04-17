
import React, { useEffect, useState, useContext, ref, useRef } from 'react';
import {
   ActivityIndicator,
   Pressable,
   FlatList,
   Text,
   TextInput,
   View,
   Modal,
   Image,
   Animated,
   StatusBar,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
   Dimensions,
}
   from 'react-native';

import { AuthContext } from '../../context/auth';

import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';

const h_max_hight = 215;
const h_min_hight = 205;
const h_scroll_distance = h_max_hight - h_min_hight;

export default function Home({ navigation }) {

   const {
      setLoad,
      load,
      user,
      endpoint,
      setBankData,
      bankData,
      setInfoDate,
      infoDate,
      setAccounts
   } = useContext(AuthContext);

   useEffect(() => {
      navigation.addListener('focus', () => setLoad(!load));
      getTime();
      getListBank();
   }, [load, navigation]);


   const getTime = () => {
      var dta = new Date();
      var hours = dta.getHours();
      var dd = dta.getDate().toString().padStart(2, '0');
      var mm = (dta.getMonth() + 1).toString().padStart(2, '0');
      var nxt = (dta.getMonth() + 2).toString().padStart(2, '0');
      var yyyy = dta.getFullYear();
      
      setInfoDate(
         {
            ...infoDate, 'day': dd,
            infoDate, 'month': mm,
            infoDate, 'nextMonth': nxt,
            infoDate, 'year': yyyy
         }
      );
      if (hours > 0 && hours < 12) {
         setWelcome("Bom dia")
      } else if (hours >= 12 && hours < 18) {
         setWelcome("Boa tarde")
      } else {
         setWelcome("Boa noite")
      }
   };


   //const imgUpdate = null;

   const scrollOffsetY = useRef(new Animated.Value(0)).current;
   const headerScrollHeight = scrollOffsetY.interpolate({
      inputRange: [0, h_scroll_distance],
      outputRange: [h_max_hight, h_min_hight],
      extrapolate: 'clamp'
   });

   const imageScaleHeight = scrollOffsetY.interpolate({
      inputRange: [0, h_max_hight],
      outputRange: [50, 24],
      extrapolate: 'clamp'
   });

   /*
   const dataTest = [
      { id: '1', title: 'item 1' },
      { id: '2', title: 'item 2' },
      { id: '3', title: 'item 3' },
      { id: '4', title: 'item 4' },
   ];
   */

   const [isLoading, setIsLoading] = useState(true);

   const [welcome, setWelcome] = useState();

   const [modalCadBank, setModalCadBank] = useState(false);

   const [modalUpdateBank, setModalUpdateBank] = useState(false);

   const [isList, setIsList] = useState(false);

   const [bank, setBank] = useState({
      id: 0,
      number: "",
      name: "",
      ein: "",
      contact: "",
      desc: "",
      img: null,
      base64: null,
   });


   const cleanFields = () => {
      setBank(
         {
            ...bank, 'id': 0,
            bank, 'number': "",
            bank, 'name': "",
            bank, 'ein': "",
            bank, 'contact': "",
            bank, 'desc': "",
            bank, 'img': null,
            bank, 'base64': null,
         }
      )
   };


   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
         base64: true,
         // includeBase64: true
      });
      if (!result.canceled) {
         //console.log(result)
         setBank(
            {
               ...bank, 'img': result.assets[0].uri,
               bank, 'base64': result.assets[0].base64,
            }
         );
      };
   };


   const removeImage = (atribute) => {
      setBank(
         {
            ...bank, [atribute]: null
         }
      )
   };


   const [listBank, setListBank] = useState([]);

   const [bankSelected, setBankSelected] = useState([]);

   const handleInputChange = (atribute, value) => {
      setBank(
         {
            ...bank, [atribute]: value
         }
      )
   };


   const insertBank = async () => {
      alert("implements cadBank " + bank.name);
      //setModalCadBank(false);
      // closeModal('cad');
      /*
     await fetch(endpoint + "?action=cadBank", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        // body:JSON.parse(JSON.stringify({bank}))
        body: JSON.stringify({
           bank
        })
     })
        .then((res) => res.json())
        .then(
           (result) => {
              //alert(result + " on api ");
              console.log(' insertBank => ' + result);
           })
        .catch((error) =>
           console.log(" type error => " + error));
      */
      closeModal('cad');
   };



   /*
    const getListBank2 = async () => {
     await fetch(endpointPhp + "?action=test", {
       method: "GET",      
       headers: {
         "X-RapidAPI-Key": "your-api-key",
         "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
       },   
     })
     .then(function(response) {
        response.text()
        .then(function(result) {
        console.log(result);
        })
        })
       .catch((error) => 
       // alert('Error no fetch'));
       console.log(" type => "+error));
   };
   */




   // let responseClone;
   const getListBank = async () => {
      await fetch(endpoint + "?action=listBank")
         .then(res => {
            //  responseClone = res.clone();
            return res.json();
         })
         .then(
            result => {
               // if (result !== "not found") {
               setIsLoading(false);
               setIsList(true);
               setListBank(result);
               //  console.log(result[0].accounts)
               /*
               } else {
                  //alert(result);
                  console.log(" return api listBank => " + result);
                  setIsLoading(false);
               }
               */
            })
         .catch(error => {
            console.log('erro => ' + error.message);
            /* 
           responseClone.text()
           .then(text=>console.log('erro => ', text))
           */
         });
   };


   const getListBankById = async (
      id,
      number,
      name,
      ein,
      contact,
      desc,
      img,
   ) => {

      setBank(
         {
            ...bank, ['id']: id,
            bank, ['number']: number,
            bank, ['name']: name,
            bank, ['ein']: ein,
            bank, ['contact']: contact,
            bank, ['desc']: desc,
            bank, ['base64']: img
         }
      );

      /*
      await fetch(endpointPhp + "?action=listBankById", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {

               if (result != "not found") {
                  setBankSelected(result);
                  console.log(" result getListBankById => " + result);
               } else {
                  alert(result);
               }
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
         */
      setModalUpdateBank(true);
   };






   const updateBank = async () => {
      alert("use this when dabase working");
      /* use this when dabase working
      await fetch(endpoint + "?action=updateBank", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            bank
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {
               console.log(result);
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
        */
      closeModal('update');
   };




   const deleteBank = async (id) => {
      alert("use this when dabase working");
      /* use this when dabase working
      await fetch(endpoint + "?action=deleteBank", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {
               if (result != "error") {
                  getListBank();
                  // console.log(result);
                  // alert(result);
               } else {
                  console.log(result);
                  // alert(result);
               }
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
        */
   };



   const closeModal = async (atribute) => {
      if (atribute == "cad") {
         setModalCadBank(false);
      } else {
         setModalUpdateBank(false);
      }
      getListBank();
      cleanFields();
   };



   const selectBanc = (id, name, img, backgrounddown, backgroundup, accounts) => {
      setBankData(
         {
            ...bankData, ['id']: id,
            bankData, ['name']: name,
            bankData, ['img']: img,
            bankData, ['backgrounddown']: backgrounddown,
            bankData, ['backgroundup']: backgroundup,
         }
      );
      setAccounts(accounts);
      navigation.navigate("SelectedBank");
   };



   




   if (isLoading) {
      return (
         <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
         </View>
      )
   };

   //const screenHeight = Dimensions.get('window').height;



   return (
      /* 
          <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'hight'}
                  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
               >
       */
      <View style={{ flex: 1 }} >

         {/* 
         <StatusBar
            // backgroundColor={"#121212"}          
            //  backgroundColor={"#02183a"}  
            // backgroundColor={"#e0edffff"} 
            barStyle={'light-content'}
            translucent={false}
         />
        */}

         <View style={{ height: h_max_hight , marginBottom:20}}>

            <Animated.View
               style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  zIndex: 99,
                  width: '100%',
                  backgroundColor: '#a5a4acff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: headerScrollHeight,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                  overflow: 'hidden',                                                  
               }}
            >
               <Animated.Image
                  //source={require('../logo_rfideia.png')}
                  source={require('../../../assets/icon.png')}
                  style={{
                     padding: imageScaleHeight,
                     width: 60,
                     height: imageScaleHeight,
                     borderRadius: 8,
                     marginTop: 20,                     
                  }}
                  resizeModel='contain'
               />
               <View style={{ marginTop: 5, borderRadius: 6 }}>
                  <Header user={`${welcome} ${user}`} />
               </View>
            </Animated.View>
         </View>


         {/*         
         <ScrollView style={{ flex: 1 }}>      
            {listBank.map((item) => (           
               <View style={styles.containerList} >
                        <LinearGradient                        
                           // colors={['#0a0439', '#170c7c']}
                           colors={['#02183a', '#021f4b']}
                           style={styles.contentList}>

                           <View>
                              <Image source={{ uri: `data:image/png;base64,${item.img_bnk}` }}
                                 style={styles.resizeModel}
                              />
                           </View>
                           <View>
                              <Text style={styles.textList}>
                                 {`ID  :  ${item.id_bnk}`}
                              </Text>
                              <Text style={styles.textList}>
                                 {`Nº :  ${item.number_bnk}`}
                              </Text>                         
                              <Text style={styles.textList}>
                                 {`Name :  ${item.name_bnk}`}
                              </Text>                         
                              <Text style={styles.textList}>
                                 {`Cnpj :  ${item.ein_bnk}`}
                              </Text>
                              <Text style={styles.textList}>
                                 {`Contact :  ${item.contact_bnk}`}
                              </Text>
                              <Text style={styles.textList}>
                                 {`Desk :  ${item.desc_bnk}`}
                              </Text>
                           </View>
                           <View style={styles.containerBtn}>
                              <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.boxBtn}>
                                 <Pressable style={styles.btnMenu}
                                    onPress={() => selectBanc(
                                       item.id_bnk,
                                       item.name_bnk,
                                       item.img_bnk
                                    )}
                                 >
                                    <FontAwesome name='eye' size={16} color={"#44E8C3"} />
                                    <Text style={styles.textBtn}>{` Select`}</Text>
                                 </Pressable>
                              </LinearGradient>
                              <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.boxBtn}>
                                 <Pressable style={styles.btnMenu}
                                    onPress={() => getListBankById(
                                       item.id_bnk,
                                       item.number_bnk,
                                       item.name_bnk,
                                       item.ein_bnk,
                                       item.contact_bnk,
                                       item.desc_bnk,
                                       item.img_bnk
                                    )}
                                 >
                                    <FontAwesome name='edit' size={16} color={"#44E8C3"} />
                                    <Text style={styles.textBtn}>{` Edit`}</Text>
                                 </Pressable>
                              </LinearGradient>
                              <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.boxBtn} >
                                 <Pressable style={styles.btnMenu}
                                    onPress={() => deleteBank(
                                       item.id_bnk
                                    )}
                                 >
                                    <FontAwesome name='trash' size={16} color={"#44E8C3"} />
                                    <Text style={styles.textBtn}>{` Delete`}</Text>
                                 </Pressable>
                              </LinearGradient>
                           </View>
                        </LinearGradient>
                  </View>                                 
            )      
          )            
        }
      </ScrollView>
 */}


         <FlatList
            showsVerticalScrollIndicator={false}
            data={listBank}
            renderItem={({ item }) =>
               <View style={styles.containerList} >
                  <LinearGradient
                     colors={['#52627aff', '#cfd5f5ff']}
                     style={styles.contentList}>
                     <View>
                        <Image source={{ uri: `data:image/png;base64,${item.img_bnk}` }}
                           style={styles.resizeModel}
                        />
                     </View>
                     <View>
                        <Text style={{ color: `${item.backgroundup}`, fontSize: 16, fontWeight: 'bold', }}>
                           {`ID  :  ${item.id_bnk}`}
                        </Text>
                        <Text style={{ color: `${item.backgroundup}`, fontSize: 16, fontWeight: 'bold', }}>
                           {`Nº :  ${item.number_bnk}`}
                        </Text>
                        <Text style={{ color: `${item.backgroundup}`, fontSize: 16, fontWeight: 'bold', }}>
                           {`Name :  ${item.name_bnk}`}
                        </Text>
                        <Text style={{ color: `${item.backgroundup}`, fontSize: 16, fontWeight: 'bold', }}>
                           {`Cnpj :  ${item.ein_bnk}`}
                        </Text>
                        <Text style={{ color: `${item.backgroundup}`, fontSize: 16, fontWeight: 'bold', }}>
                           {`Contact :  ${item.contact_bnk}`}
                        </Text>
                        <Text style={{ color: `${item.backgroundup}`, fontSize: 16, fontWeight: 'bold', }}>
                           {`Desk :  ${item.desc_bnk}`}
                        </Text>
                     </View>
                     <View style={styles.containerBtnCard}>
                        <LinearGradient colors={['#fdfdffff', `${item.backgroundup}`]} style={styles.boxBtn}>
                           <Pressable style={styles.btnMenu}
                              onPress={() => selectBanc(
                                 item.id_bnk,
                                 item.name_bnk,
                                 item.img_bnk,
                                 item.backgrounddown,
                                 item.backgroundup,
                                 item.accounts
                              )}
                           >
                              <FontAwesome name='eye' size={16} color={"#ffffff"} />
                              <Text style={styles.textBtn}>{` Select`}</Text>
                           </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#fdfdffff', `${item.backgroundup}`]} style={styles.boxBtn}>
                           <Pressable style={styles.btnMenu}
                              onPress={() => getListBankById(
                                 item.id_bnk,
                                 item.number_bnk,
                                 item.name_bnk,
                                 item.ein_bnk,
                                 item.contact_bnk,
                                 item.desc_bnk,
                                 item.img_bnk
                              )}
                           >
                              <FontAwesome name='edit' size={16} color={"#ffffff"} />
                              <Text style={styles.textBtn}>{` Edit`}</Text>
                           </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#fdfdffff', `${item.backgroundup}`]} style={styles.boxBtn} >
                           <Pressable style={styles.btnMenu}
                              onPress={() => deleteBank(
                                 item.id_bnk
                              )}
                           >
                              <FontAwesome name='trash' size={16} color={"#ffffff"} />
                              <Text style={styles.textBtn}>{` Delete`}</Text>
                           </Pressable>
                        </LinearGradient>
                     </View>
                  </LinearGradient>
               </View>
            }
            onScroll={Animated.event([
               {
                  nativeEvent: { contentOffset: { y: scrollOffsetY } }
               },
            ], { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
         >
         </FlatList>

         {/* 
               <View style={{
                  width: 'auto',
                  height: 'auto',
                  alignItems: 'center',
                  backgroundColor: '#0A0352',
                  marginStart: 10,
                  marginEnd: 10,
                  borderRadius: 10,
                  paddingTop: h_max_hight
               }}>
                  <Pressable style={styles.btnMenu}
                     onPress={() => setModalCadBank(true)}
                  >
                    <Text style={styles.textBtn}>Insert 1º Banc</Text>
                  </Pressable>
               </View>      
         */}

         {/*
        <View style={{          
         height:'auto',
         width:'100%',
         alignItems:'center',         
         backgroundColor:'red',      
         paddingTop: h_max_hight 
         }}>
          <Introduction/>          
              <Pressable style={styles.btn}
                 onPress={() => setModalCadBank(true)}
                 >                                             
                  <Text style={styles.textAlert}>Insert 1º Banc</Text>      
              </Pressable>     
         </View>          
      */}
         <LinearGradient colors={['#faffffff', '#97a1a1ff']} style={styles.containerBtnFooter}>
            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btnMenu}
                  onPress={() => setModalCadBank(true)}
               >
                  <FontAwesome name='plus' size={16} color={"#44E8C3"} />
                  <Text style={styles.textBtn}>{`  Add Banc`}</Text>
               </Pressable>
            </LinearGradient>
            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btnMenu}
                  onPress={() => navigation.navigate("CashPayment")}>
                  <FontAwesome name='money' size={16} color={"#44E8C3"} />
                  <Text style={styles.textBtn}>{`  Cash Payment`}</Text>
               </Pressable>
            </LinearGradient>
         </LinearGradient>

         <Modal
            animationType='fade'
            visible={modalCadBank}
         >
            <ScrollView>
               <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>
                  <View style={styles.contentModal} >
                     <Text style={styles.textInfo}>{` Register Bank`}</Text>
                  </View>
                  {
                     bank.img === null ?
                        <View style={styles.boxImg}>
                           <Pressable onPress={() => pickImage()}>
                              <FontAwesome name='image' size={40} color={"#44E8C3"} />
                           </Pressable>
                           <Text style={styles.textInfo}>Add Image</Text>
                        </View>
                        :
                        bank.img &&
                        <View style={styles.boxImg}>
                           <Image source={{ uri: bank.img }} style={styles.resizeModel} />

                           <Pressable onPress={() => removeImage('img')}>
                              <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                           </Pressable>
                        </View>
                  }
                  <View style={styles.formModal}>
                     <TextInput style={styles.input}
                        placeholder="Bank Nº "
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('number', valor)
                        }
                        value={bank.number}
                     />
                     <TextInput style={styles.input}
                        placeholder="Bank Name"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('name', valor)
                        }
                        value={bank.name}
                     />
                     <TextInput style={styles.input}
                        placeholder="CNPJ"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('ein', valor)
                        }
                        value={bank.ein}
                     />
                     <TextInput style={styles.input}
                        placeholder="Contact"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('contact', valor)
                        }
                        value={bank.contact}
                     />
                     <TextInput style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('desc', valor)
                        }
                        value={bank.desc}
                     />
                  </View>
                  <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtnFooter}>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable onPress={() => insertBank()} style={styles.btnMenu}>
                           <FontAwesome name='save' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Safe`}</Text>
                        </Pressable>
                     </LinearGradient>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable onPress={() => closeModal('cad')} style={styles.btnMenu}>
                           <FontAwesome name='close' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Cancel`}</Text>
                        </Pressable>
                     </LinearGradient>
                  </LinearGradient>
               </LinearGradient>
            </ScrollView>
         </Modal>

         <Modal animationType='fade'
            visible={modalUpdateBank}>
            <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>
               <View style={styles.contentModal} >
                  <Text style={styles.textInfo}>{` UPDATE BANK `}</Text>
               </View>
               <View style={styles.containerList}>
                  {
                     bank.base64 === null ?
                        <View style={styles.boxImg}>
                           <Pressable onPress={() => pickImage()}>
                              <FontAwesome name='image' size={40} color={"#fff"} />
                           </Pressable>
                           <Text style={styles.textInfo}>Chosse Image</Text>
                        </View>
                        :
                        <View style={styles.boxImg}>
                           {/*   
                                 <Image source={{ uri: bank.img }} style={styles.resizeModel} />  
                              */}
                           <Pressable onPress={() => pickImage()}>
                              <Image source={{ uri: `data:image/png;base64,${bank.base64}` }}
                                 style={styles.resizeModel}
                              />
                           </Pressable>
                           <Pressable onPress={() => removeImage('base64')}>
                              <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                           </Pressable>
                        </View>
                  }
                  <View style={styles.formModal}>
                     <TextInput style={styles.input}
                        placeholder={` ${bank.number}`}
                        placeholderTextColor="#cc0000"
                        type="text"
                        onChangeText={(valor) =>
                           handleInputChange('number', valor)
                        }
                        value={bank.number}
                     />
                     <TextInput style={styles.input}
                        placeholder={` ${bank.name}`}
                        placeholderTextColor="#cc0000"
                        type="text"
                        onChangeText={(valor) =>
                           handleInputChange('name', valor)
                        }
                        value={bank.name}
                     />
                     <TextInput style={styles.input}
                        placeholder={` ${bank.ein}`}
                        placeholderTextColor="#cc0000"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('ein', valor)
                        }
                        value={bank.ein}
                     />
                     <TextInput style={styles.input}
                        placeholder={` ${bank.contact}`}
                        placeholderTextColor="#cc0000"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('contact', valor)
                        }
                        value={bank.contact}
                     />
                     <TextInput style={styles.input}
                        placeholder={` ${bank.desc}`}
                        placeholderTextColor="#cc0000"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('desc', valor)
                        }
                        value={bank.desc}
                     />
                  </View>
                  <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtnCard}>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btnMenu}
                           onPress={() => updateBank()}>
                           <FontAwesome name='save' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Safe`}</Text>
                        </Pressable>
                     </LinearGradient>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btnMenu}
                           onPress={() => closeModal('update')}>
                           <FontAwesome name='close' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Cancel`}</Text>
                        </Pressable>
                     </LinearGradient>
                  </LinearGradient>
               </View>
               <FlatList
                  data={bankSelected}
                  renderItem={({ item }) =>
                     <View style={styles.containerList}>
                        <View style={styles.contentList}>
                           <View style={styles.boxAddImg}>
                              <Pressable onPress={() => pickImage()}>
                                 <FontAwesome name='image' size={40} color={"#fff"} />
                              </Pressable>
                              <Text style={styles.textInfo}>Chosse Image</Text>
                           </View>
                           <View style={styles.boxImg}>
                              {/*    <Image source={{ uri: bank.img }} style={styles.resizeModel} />   */}
                              <Image source={{ uri: `data:image/png;base64,${bank.base64}` }}
                                 style={styles.resizeModel}
                              />
                              <Pressable onPress={() => removeImage('base64')}>
                                 <FontAwesome name='remove' size={14} color={"#B8AAA7"} />
                              </Pressable>
                           </View>
                           {/* 
                              <TextInput style={styles.input}
                                 placeholder={` ${item.id_bnk}`}
                                 placeholderTextColor="#cc0000"
                                 type="text"
                                 onChangeText={
                                    (valor) => handleInputChange('id', valor)
                                 }
                                 value={bank.id}
                              />
                         */}
                           <TextInput style={styles.input}
                              placeholder={` ${item.number_bnk}`}
                              placeholderTextColor="#cc0000"
                              type="text"
                              onChangeText={
                                 (valor) => handleInputChange('number', valor)
                              }
                              value={bank.number}
                           />
                           <TextInput style={styles.input}
                              placeholder={` ${item.name_bnk}`}
                              placeholderTextColor="#cc0000"
                              type="text"
                              onChangeText={
                                 (valor) => handleInputChange('name', valor)
                              }
                              value={bank.name}
                           />
                           <TextInput style={styles.input}
                              placeholder={` ${item.ein_bnk}`}
                              placeholderTextColor="#cc0000"
                              type="text"
                              onChangeText={
                                 (valor) => handleInputChange('ein', valor)
                              }
                              value={bank.ein}
                           />
                           <TextInput style={styles.input}
                              placeholder={` ${item.contact_bnk}`}
                              placeholderTextColor="#cc0000"
                              type="text"
                              onChangeText={
                                 (valor) => handleInputChange('contact', valor)
                              }
                              value={bank.contact}
                           />
                           <TextInput style={styles.input}
                              placeholder={` ${item.desc_bnk}`}
                              placeholderTextColor="#cc0000"
                              type="text"
                              onChangeText={
                                 (valor) => handleInputChange('desc', valor)
                              }
                              value={bank.desc}
                           />
                           <View style={styles.containerBtnFooter}>
                              <View>
                                 <Pressable style={styles.btn}
                                    onPress={() => updateBank()}>
                                    <Text style={styles.textBtn}>Confirm</Text>
                                 </Pressable>
                              </View>
                              <View >
                                 <Pressable style={styles.btn}
                                    onPress={() => closeModal('update')}>
                                    <Text style={styles.textBtn}>Cancel</Text>
                                 </Pressable>
                              </View>
                           </View>
                        </View>
                     </View>
                  }
               >
               </FlatList>
            </LinearGradient>
         </Modal>
      </View>
      /*  </KeyboardAvoidingView> */
   )
}










{/* 

       <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          <View style={styles.main}>
          </View>

       </KeyboardAvoidingView>   

       https://www.youtube.com/watch?v=iiqea8lTM6A
       
        <View style={{flex:1}}> 
         <StatusBar backgroundColor={"#121212"} barStyle={'light-content'} translucent={false}/>
          <Animated.View          
            style={{
               position:'absolute',
               top:0,
               left:0,
               right:0,
               zIndex:99,
               width: '100%',
               padding: 10,  
               backgroundColor: '#121212',
               alignItems:'center',
               justifyContent:'center',
               height:headerScrollHeight,
               overflow:'hidden'
            }}
          >
             <Text style={styles.textHeader}>Tela Home</Text>
          </Animated.View>  
        <FlatList
          style={{paddingTop:h_max_hight}}
          data={dataTest}
          keyExtractor={(item)=>item.id}
          showsVerticalScrollIndicator={false}
          renderItem={( {item} ) => (
             <View style={styles.itemFlatList}>
                  <Text>{item.title}</Text>
             </View>  
          )}                    
          onScroll={Animated.event([
             {
              nativeEvent:{contentOffset:{y:scrollOffsetY}}
             },
            ], { useNativeDriver:false}
          )}
           scrollEventThrottle={16}

          >
         </FlatList>
         */}


{/*            
            <View style={styles.boxBtnOut}>
               <View >
                  <Pressable style={styles.btn}
                     onPress={() => setModalCadBank(true)}
                  >
                     {
                        !isList
                           ?
                           <Text style={styles.textAlert}>Insert 1º Banc</Text>
                           :
                           <Text style={styles.textAlert}>Insert New Banc</Text>
                     }
                  </Pressable>
               </View>
               <View >
                  <Pressable style={styles.btn}
                     onPress={() => screenCashPost()}
                  >
                     <Text style={styles.textAlert}>Insert Cash Payment</Text>
                  </Pressable>
               </View>
            </View>
          */}

{/* 
               {
               !isList
                  ?
                  <View></View>
                  :
                */}
{/* 
                  <View>
                     <FlatList
                        style={{ paddingTop: h_max_hight }}
                        //showsVerticalScrollIndicator={false}
                        data={listBank}
                        renderItem={({ item }) =>
                           //  <View style={styles.dataList}>
                           <View style={styles.cardList}>
                              <View>
                                 <Image source={{ uri: `data:image/png;base64,${item.img_bnk}` }}
                                    style={styles.resizeModel}
                                 />
                              </View>
                              <View style={styles.contentCardList}>
                                 <Text style={styles.textList}>
                                    {`ID  :  ${item.id_bnk}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Nº :  ${item.number_bnk}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Name :  ${item.name_bnk}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Cnpj :  ${item.cnpj_bnk}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Contact :  ${item.contact_bnk}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Desk :  ${item.desc_bnk}`}
                                 </Text>
                              </View>
                              <View style={styles.boxBtn}>
                                 <View >
                                    <Pressable style={styles.btn}
                                       onPress={() => selectBanc(
                                          item.id_bnk,
                                          item.name_bnk,
                                          item.img_bnk
                                       )}
                                    >
                                       <Text style={styles.textAlert}>Select</Text>
                                    </Pressable>
                                 </View>
                                 <View >
                                    <Pressable style={styles.btn}
                                       onPress={() => deleteBank(
                                          item.id_bnk
                                       )}
                                    >
                                       <Text style={styles.textAlert}>Delete</Text>
                                    </Pressable>
                                 </View>
                                 <View >
                                    <Pressable style={styles.btn}
                                       onPress={() => getListBankById(
                                          item.id_bnk,
                                          item.number_bnk,
                                          item.name_bnk,
                                          item.cnpj_bnk,
                                          item.contact_bnk,
                                          item.desc_bnk,
                                          item.img_bnk
                                       )}
                                    >
                                       <Text style={styles.textAlert}>Update</Text>
                                    </Pressable>
                                 </View>
                              </View>
                           </View>
                    //   </View>
                        }
                        onScroll={Animated.event([
                           {
                              nativeEvent: { contentOffset: { y: scrollOffsetY } }
                           },
                        ], { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                     >
                     </FlatList>
                  </View>
               */}






{/* 
            <View>

               <Modal
                  animationType='fade'
                  visible={modalCadBank}
               >

                  <View style={styles.containerModal}>

                     <View style={styles.titleModal} ><Text style={styles.textInfo}>{` Register MODAL`}</Text></View>

                     {
                        bank.img === null ?

                           <View style={styles.boxAddImg}>

                              <Pressable onPress={() => pickImage()}>
                                 <FontAwesome name='image' size={40} color={"#fff"} />
                              </Pressable>

                              <Text style={styles.textInfo}>Add Image</Text>

                           </View>


                           :

                           bank.img &&

                           <View style={styles.boxImg}>

                              <Image source={{ uri: bank.img }} style={styles.resizeModel} />

                              <Pressable onPress={() => removeImage('img')}>

                                 <FontAwesome name='remove' size={14} color={"#B8AAA7"} />

                              </Pressable>

                           </View>

                     }


                     <View style={styles.formModal}>

                        <TextInput style={styles.input}
                           placeholder="Bank Nº "
                           placeholderTextColor="#cc0000"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChange('number', valor)
                           }
                           value={bank.number}
                        />

                        <TextInput style={styles.input}
                           placeholder="Bank Name"
                           placeholderTextColor="#cc0000"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChange('name', valor)
                           }
                           value={bank.name}
                        />

                        <TextInput style={styles.input}
                           placeholder="CNPJ"
                           placeholderTextColor="#cc0000"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChange('cnpj', valor)
                           }
                           value={bank.cnpj}
                        />

                        <TextInput style={styles.input}
                           placeholder="Contact"
                           placeholderTextColor="#cc0000"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChange('contact', valor)
                           }
                           value={bank.contact}
                        />

                        <TextInput style={styles.input}
                           placeholder="Description"
                           placeholderTextColor="#cc0000"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChange('desc', valor)
                           }
                           value={bank.desc}
                        />


                     </View>


                     <View style={styles.boxModalBtn}>

                        <View>
                           <Pressable onPress={() => insertBank()} style={styles.btn}                 >
                              <Text style={styles.textBtn}>Confirm</Text>
                           </Pressable>
                        </View>

                        <View>
                           <Pressable onPress={() => closeModal('cad')} style={styles.btn}                 >
                              <Text style={styles.textBtn}>Cancel</Text>
                           </Pressable>
                        </View>

                     </View>

                  </View>

               </Modal>

            </View>

          */}









{/* 
            <View>

               <Modal animationType='fade'
                  visible={modalUpdateBank}
               >

                  <View style={styles.containerModal}>

                     <View style={styles.titleModal} ><Text style={styles.textInfo}>{` UPDATE MODAL`}</Text></View>

                     <FlatList

                        data={bankSelected}

                        renderItem={({ item }) =>

                           <View style={styles.dataList}>

                              <View style={styles.cardList}>



                                 <View style={styles.boxAddImg}>
                                    <Pressable onPress={() => pickImage()}>
                                       <FontAwesome name='image' size={40} color={"#fff"} />
                                    </Pressable>
                                    <Text style={styles.textInfo}>Chosse Image</Text>
                                 </View>

                                 <View style={styles.boxImg}>
                                    /   <Image source={{ uri: bank.img }} style={styles.resizeModel} />  /
                                    <Image source={{ uri: `data:image/png;base64,${bank.base64}` }}
                                       style={styles.resizeModel}
                                    />

                                    <Pressable onPress={() => removeImage('base64')}>
                                       <FontAwesome name='remove' size={14} color={"#B8AAA7"} />
                                    </Pressable>

                                 </View>





                                 <TextInput style={styles.input}
                                    placeholder={` ${item.id_bnk}`}
                                    placeholderTextColor="#cc0000"
                                    type="text"
                                    onChangeText={
                                       (valor) => handleInputChange('id', valor)
                                    }
                                    value={bank.id}
                                 />





                                 <TextInput style={styles.input}
                                    placeholder={` ${item.number_bnk}`}
                                    placeholderTextColor="#cc0000"
                                    type="text"
                                    onChangeText={
                                       (valor) => handleInputChange('number', valor)
                                    }
                                    value={bank.number}
                                 />

                                 <TextInput style={styles.input}
                                    placeholder={` ${item.name_bnk}`}
                                    placeholderTextColor="#cc0000"
                                    type="text"
                                    onChangeText={
                                       (valor) => handleInputChange('name', valor)
                                    }
                                    value={bank.name}
                                 />

                                 <TextInput style={styles.input}
                                    placeholder={` ${item.cnpj_bnk}`}
                                    placeholderTextColor="#cc0000"
                                    type="text"
                                    onChangeText={
                                       (valor) => handleInputChange('cnpj', valor)
                                    }
                                    value={bank.cnpj}
                                 />

                                 <TextInput style={styles.input}
                                    placeholder={` ${item.contact_bnk}`}
                                    placeholderTextColor="#cc0000"
                                    type="text"
                                    onChangeText={
                                       (valor) => handleInputChange('contact', valor)
                                    }
                                    value={bank.contact}
                                 />

                                 <TextInput style={styles.input}
                                    placeholder={` ${item.desc_bnk}`}
                                    placeholderTextColor="#cc0000"
                                    type="text"
                                    onChangeText={
                                       (valor) => handleInputChange('desc', valor)
                                    }
                                    value={bank.desc}
                                 />


                                 <View style={styles.boxBtn}>

                                    <View>
                                       <Pressable style={styles.btn}
                                          onPress={() => updateBank()}>
                                          <Text style={styles.textAlert}>Confirm</Text>
                                       </Pressable>
                                    </View>


                                    <View >
                                       <Pressable style={styles.btn}
                                          onPress={() => closeModal('update')}>
                                          <Text style={styles.textBtn}>Cancel</Text>
                                       </Pressable>
                                    </View>

                                 </View>


                              </View>

                           </View>
                        }
                     >
                     </FlatList>

                  </View>

               </Modal>

            </View>

          */}









