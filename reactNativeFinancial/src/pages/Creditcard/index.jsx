
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
   //UIManager, LayoutAnimation
} from 'react-native';

import { AuthContext } from '../../context/auth';

import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';

import Header from '../../components/Header';


import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

//const USE_LITE_CREDIT_CARD_INPUT = false;


import { Feather } from '@expo/vector-icons';



export default function CreditCard({ navigation }) {



   //const endpointPhp = 'http://localhost:3322/php-api-financial';
   //const accountData_id = 4;

   const {
      setLoad,
      load,
      endpoint,
      user,
      accountData,
      bankData,
      setCreditCardData,
      creditCardData,

      creditcard,
      setPostCreditcard,

   } = useContext(AuthContext);



   useEffect(() => {
      navigation.addListener('focus', () => setLoad(!load));
      //  amountCreditCard();
      //  getListCreditCardByAccount(accountData.id);


      var count = Object.keys(creditcard).length;       
      if(count != 0  ){
           setIsList(true);
        }else{
           setIsList(false);
        }

   }, [load, navigation]);



   //const [useLiteCreditCardInput, setUseLiteCreditCardInput] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [modalCreditCard, setModalCreditCard] = useState(false);

   const [modalUpdate, setModalUpdate] = useState(false);

   const [cadCreditCard, setCadCreditCard] = useState({
      id: 0,
      number: "",
      type: "",
      format: "",
      desc: "",
      fromDate: "",
      expiry: "",
      due: "",
      limit: 0,
      idac: accountData.id
   });



   const [listCreditCard, setListCreditCard] = useState([]);

   //const [selectedCreditCard, setSelectedCreditCard] = useState([]);

   const [isList, setIsList] = useState(false);


   /*
   const [postCreditCard, setPostCreditCard] = useState({
      number: "",     
      desc: "",
      date: "",
      user: "",
      parcel: 0,
      value: 0
   });
  */



   /*
    const handleInputChangePost = (atribute, value) => {    
       setPostCreditCard(
          {
            ...postCreditCard, [atribute]: value
          }
       )    
    }
   */




   const handleInputChangeCad = (atribute, value) => {
      setCadCreditCard(
         {
            ...cadCreditCard, [atribute]: value
         }
      )
   }



   // const [amount, setAmount] = useState();

   /*
     const getListAllCreditCard = async () => {  
        await fetch(endpointPhp + "?action=listAllCreditCard")
           .then((res) => res.json())
           .then(
              (result) => {  
                 //   if (result === 'not found') {
                 //     console.log("empty array");
                 //   } else {
                 console.log(result);
                 //setListAccount(result);
                 //  }  
              })
           .catch(() => {
              alert('Erro', 'Não foi possível carregar os dados ');
           });  
     }
    */




   /*
   const getListCreditCardByAccount = async (id) => {      
        console.log(" tela creditCard listCreditCardByAccount idAccount "+id);     
        await fetch(endpoint + "?action=creditCardByAccount", {
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
                  // setIsLoading(false); 
                  setIsList(true);
                  setListCreditCard(result);
                  // console.log(" result getListCreditCardByAccount => " + result);
               }
               setIsLoading(false);
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });      
   }
   */






   const postCreditCard = async () => {
      alert("use this when dabase working");

      /* use this when dabase working     
      console.log(" dados para api => " +
         cadCreditCard.number + "  " +
         cadCreditCard.type + "  " +
         cadCreditCard.format + "  " +
         cadCreditCard.desc + "  " +
         cadCreditCard.fromDate + "  " +
         cadCreditCard.expiry + "  " +
         cadCreditCard.limit + " " +
         cadCreditCard.idac
      );      
     */
      /*
       await fetch(endpoint + "?action=cadCreditCard", {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             cadCreditCard
          })
       })
          .then((res) => res.json())
          .then(
             (result) => {
                if (result !== "error") {
                   getListCreditCardByAccount(accountData.id);
                   cleanFields();
                   //  alert(result+" cad success");
                   //  console.log(' insertBank => ' + result);
                } else {
                   console.log(' insertBank => ' + result);
                   // alert(result+" on api ");
                }
             })
          .catch(function (error) {
             console.log('erro => ' + error.message);
          });
       */
      setModalCreditCard(false);
   }






   const selectCreditCard = (id, number, type, ex, due, post) => {
      setCreditCardData(
         {
            ...creditCardData, ['id']: id,
            creditCardData, ['number']: number,
            creditCardData, ['type']: type,
            creditCardData, ['expiry']: ex,
            creditCardData, ['due_day']: due,
         }
      );
      setPostCreditcard(post);
      navigation.navigate("SelectedCreditCard");
   }




   const getListCreditCard = async (id, number, type, format, desc, fromDate, expiry, due, limit) => {
      // console.log(" update id getListAccountById  id account " + id + " id do banco " + account.fkbnk);
      setCadCreditCard(
         {
            ...creditCardData, ['id']: id,
            creditCardData, ['number']: number,
            creditCardData, ['type']: type,
            creditCardData, ['format']: format,
            creditCardData, ['desc']: desc,
            creditCardData, ['fromDate']: fromDate,
            creditCardData, ['expiry']: expiry,
            creditCardData, ['due']: due,
            creditCardData, ['limit']: limit,
           // creditCardData, ['idac']: fk_bac,
         }
      )
      setModalUpdate(true);
   }






   const updateCreditCard = async () => {
      alert("use this when dabase working");
      /* use this when dabase working
      await fetch(endpoint + "?action=updateCreditCard", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            cadCreditCard
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {
               if (result !== "error") {
                  getListCreditCardByAccount(accountData.id);
                  //  alert(result+" cad success");
               } else {
                  console.log(' updateCreditCard => ' + result);
                  // alert(result+" on api ");
               }
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
       */
      setModalUpdate(false);
   }








   const deleteCreditCard = async (id) => {
      alert("use this when dabase working");
      /* use this when dabase working
      await fetch(endpoint + "?action=deleteCreditCard", {
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
                  getListCreditCardByAccount(accountData.id);
                  alert(result);
               } else {
                  alert(result);
               }
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
      */
   }




   /*
   const insertPostCreditCard = async () => {
      await fetch(endpointPhp + "?action=postCreditCard", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            postCreditCard
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {
             //  setAmount(result);
             console.log(result);             
            })
         .catch(() => {
            alert('Erro', 'Não foi possível carregar os dados ');
         });
   }
   */



   /*
    const amountCreditCard = async () => { 
       await fetch(endpointPhp + "?action=amountCreditCard", {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             //creditCard
          })
       })
          .then((res) => res.json())
          .then(
             (result) => {
                setAmount(result);
                console.log(result);
             })
          .catch(() => {
             alert('Erro', 'Não foi possível carregar os dados ');
          });
    }
   */





   /*
   const insertCreditCard2 = async () => {
      const params = new URLSearchParams({
         creditCard
     });
   fetch(endpointPhp, {
      method: 'POST',
      body: params,
  })
      .then(async function (fdata) {
          var data = await fdata.json();
          // var data = JSON.parse(fdata);   
          console.log(data)       
      })
      .catch(error => {
          console.log('error', error);
  })
}
*/




   //const [cadCreditCardT, setCadCreditCardT] = useState([]);

   /*
   _onChange = formData => {
      //  console.log(JSON.stringify(formData, null, " "));
      //*
       setCadCreditCardT(formData); 
       setCadCreditCard(
         {
            ...cadCreditCard, ['number']: cadCreditCardT.values.number,
               cadCreditCard, ['type']: cadCreditCardT.values.type,
         }
      ) 
     //
      setCadCreditCard(
         {
            ...cadCreditCard, ['number']: formData.values.number,
            cadCreditCard, ['type']: formData.values.type,
            cadCreditCard, ['expiry']: formData.values.expiry,
         }
      )
      //console.log(formData);
   };
  */

   /*
   _onFocus = field => {
      // console.log(" focus "+field);
   }
   */



   /*
    if (Platform.OS === "android") {
      // UIManager.setLayoutAnimationEnabledExperimental &&
         UIManager.setLayoutAnimationEnabledExperimental(true);         
    }
   */


   //UIManager.setLayoutAnimationEnabledExperimental(true);





   const cleanFields = () => {
      setCadCreditCard(
         {
            ...creditCardData, 'number': "",
            creditCardData, 'type': "",
            creditCardData, 'format': "",
            creditCardData, 'desc': "",
            creditCardData, 'fromDate': "",
            creditCardData, 'expiry': "",
            creditCardData, 'due': "",
            creditCardData, 'limit': 0,
         }
      )
   }






   if (isLoading) {
      return (
         <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
         </View>
      )
   }





   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.main}
      >
         <LinearGradient colors={['#686779ff', '#050b3d']} style={styles.containerHeader}>
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
         </View>
         {/* 
        <View style={styles.containerInfo}>
          <Text style={styles.textInfo}>{` Banc = ${bankData.name}`}</Text>
          <Text style={styles.textInfo}>{` ID ACC= ${accountData.id}`}</Text>
          <Text style={styles.textInfo}>{` TYPE = ${accountData.type}`}</Text>
          <Text style={styles.textInfo}>{` NUMBER = ${accountData.number}`}</Text>
        </View>
        */}
           
         {isList?  
            <FlatList
               /* data={listCreditCard} */
               data={creditcard}
               renderItem={({ item }) =>
                  
                  <View style={styles.containerCard}>

                     <View style={styles.contentCard}>
                       
                          {/*  
                           <View style={styles.dataContent}>
                              <Text style={styles.textList}>
                                 {` ${item.type_cc} `}
                              </Text>
                           </View>
                         */}

                        <View>
                              <Text style={styles.textCard}>
                                 {/*   {` ${item.number_cc} `} */}
                                 {` ${item.number_ccr} `}
                              </Text>
                        </View>

                        <View> 
                              <Text style={styles.textCard}>
                                 {/* {` ${item.expery_date_cc} `} */}
                                 {` ${item.expiry_ccr} `}
                              </Text>
                        </View>

                         <View style={styles.flegCard}>

                               <Text style={styles.textCard}>
                                {/*  {` ${item.format_cc} `} */}
                                 {`${user} `}
                              </Text>

                              {/*  {item.type_cc == "visa" */}
                              {item.type_ccr == "visa"
                                 ?
                                 <FontAwesome name='cc-visa' size={42} color={"white"} />
                                 :
                                 <FontAwesome name='cc-mastercard' size={42} color={"white"} />
                              }
                        </View>

                     </View>

                     <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>
                        <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>                          
                           <Pressable style={styles.btn}
                                 onPress={() => selectCreditCard(
                                    /*
                                    item.id_cc,
                                    item.number_cc,
                                    item.type_cc,
                                    item.expery_date_cc,
                                    item.due_day_cc
                                    */
                                    item.id_ccr,
                                    item.number_ccr,
                                    item.type_ccr,
                                    item.expiry_ccr,
                                    item.due_ccr ,
                                    item.posts                                )}>
                                 <FontAwesome name='eye' size={16} color={"#44E8C3"} />
                                 <Text style={styles.textBtn}>{`  Select`}</Text>
                           </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                           <Pressable style={styles.btn}
                                 onPress={() => getListCreditCard(
                                    /*
                                    item.id_cc,
                                    item.number_cc,
                                    item.type_cc,
                                    item.format_cc,
                                    item.desc_cc,
                                    item.from_date_cc,
                                    item.expery_date_cc,
                                    item.due_day_cc,
                                    item.limit_cc,
                                    item.fk_bac
                                     */
                                    item.id_ccr,
                                    item.number_ccr,
                                    item.type_ccr,
                                    item.format_ccr,
                                    item.desc_ccr,
                                    item.fromDate_ccr,
                                    item.expiry_ccr,
                                    item.due_ccr,
                                    item.limit_ccr,  
                                 )}>
                                 <FontAwesome name='edit' size={16} color={"#44E8C3"} />
                                 <Text style={styles.textBtn}>{`  Update`}</Text>
                           </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                           <Pressable style={styles.btn}
                              onPress={() => deleteCreditCard(item.id_cc)}>
                              <FontAwesome name='trash' size={16} color={"#44E8C3"} />
                              <Text style={styles.textBtn}>{`  Delete`}</Text>
                           </Pressable>
                        </LinearGradient>
                     </LinearGradient>
                  </View>
                  }>
            </FlatList>
          :
          <View style={styles.containerNoList}>
               <Text style={styles.textInfo}>{`${user} Ainda não existem cartões na conta ${accountData.number}`}</Text>
          </View>    
         }



         <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.containerBtnFooter}>
            {!isList
               ?
               <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                  <Pressable style={styles.btn}
                     onPress={() => setModalCreditCard(true)}>
                     <Text style={styles.textBtn}>{`  Adcione o 1º cartao`}</Text>
                  </Pressable>
               </LinearGradient>
               :
               <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                  <Pressable style={styles.btn}
                     onPress={() => setModalCreditCard(true)}>
                     <FontAwesome name='plus' size={16} color={"#44E8C3"} />
                     <Text style={styles.textBtn}>{`  Add Credit Card`}</Text>
                  </Pressable>
               </LinearGradient>
            }
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
            visible={modalCreditCard}
         >
            <ScrollView>
               <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>
                  <View style={styles.contentModal} >
                     <Text style={styles.textDesc}>{` Register Credit Card `}</Text>
                  </View>
                  <View style={styles.boxCard}>
                     <LiteCreditCardInput
                        autoFocus
                        inputStyle={styles.textInfo}
                        requireCVC
                        requirePostalCode
                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"#110846ff"}
                        style={{ backgroundColor: '#e0e0f7ff' }}
                     //onFocus={this._onFocus}
                     //onChange={this._onChange}
                     />
                  </View>
                  <View style={styles.boxCard}>
                     <TextInput style={styles.input}
                        placeholder="Format"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChangeCad('format', valor)
                        }
                        value={cadCreditCard.format}
                     />
                     <TextInput style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChangeCad('desc', valor)
                        }
                        value={cadCreditCard.desc}
                     />
                     <TextInput style={styles.input}
                        placeholder="From Date"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChangeCad('fromDate', valor)
                        }
                        value={cadCreditCard.fromDate}
                     />
                     <TextInput style={styles.input}
                        placeholder="Due-Day"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChangeCad('due', valor)
                        }
                        value={cadCreditCard.due}
                     />
                     <TextInput style={styles.input}
                        placeholder="Limit"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChangeCad('limit', valor)
                        }
                     value={cadCreditCard.limit}
                     />
                  </View>
                  <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn} onPress={() => postCreditCard()}>
                           <FontAwesome name='save' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Safe`}</Text>
                        </Pressable>
                     </LinearGradient>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn} onPress={() => setModalCreditCard(false)}                  >
                           <FontAwesome name='close' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Cancel`}</Text>
                        </Pressable>
                     </LinearGradient>
                  </LinearGradient>
               </LinearGradient>
            </ScrollView>
         </Modal>
         
         <Modal
            animationType='fade'
            visible={modalUpdate}
         >
            <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>
               <View style={styles.contentModal} >
                  <Text style={styles.textDesc}>{` Update Credit Card `}</Text>
               </View>
               {/* 
               <View style={styles.boxCard}>
                  <LiteCreditCardInput
                     autoFocus
                     inputStyle={styles.textInfo}
                     requireCVC
                     requirePostalCode
                     validColor={"black"}
                     invalidColor={"red"}
                     placeholderColor={"#44E8C3"}                     
                     onFocus={this._onFocus}
                     onChange={this._onChange}                     
                  />                
               </View> 
             */}
               <View style={styles.containerList}>
                  <ScrollView>
                     <View style={styles.contentList}>
                        <TextInput style={styles.input}
                           placeholder={` ${creditCardData.id}`}
                           placeholderTextColor="#44E8C3"
                           //type="text"
                           editable={false}
                           /*
                           onChangeText={
                              (valor) => handleInputChangeCad('id', valor)
                           }   
                           */
                           value={cadCreditCard.id}
                        />
                        <TextInput style={styles.input}
                           placeholder={` ${creditCardData.number}`}
                           placeholderTextColor="#44E8C3"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChangeCad('number', valor)
                           }
                           value={cadCreditCard.number}
                        />
                        <TextInput style={styles.input}
                           placeholder={` ${creditCardData.type}`}
                           placeholderTextColor="#44E8C3"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChangeCad('type', valor)
                           }
                           value={cadCreditCard.type}
                        />
                        <TextInput style={styles.input}
                           placeholder={` ${creditCardData.format}`}
                           placeholderTextColor="#44E8C3"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChangeCad('format', valor)
                           }
                           value={cadCreditCard.format}
                        />
                        <TextInput style={styles.input}
                           placeholder={` ${creditCardData.desc}`}
                           placeholderTextColor="#44E8C3"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChangeCad('desc', valor)
                           }
                           value={cadCreditCard.desc}
                        />
                        <TextInput style={styles.input}
                           placeholder={` ${creditCardData.fromDate}`}
                           placeholderTextColor="#44E8C3"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChangeCad('fromDate', valor)
                           }
                           value={cadCreditCard.fromDate}
                        />
                        <TextInput style={styles.input}
                           placeholder={` ${creditCardData.expiry}`}
                           placeholderTextColor="#44E8C3"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChangeCad('expiry', valor)
                           }
                           value={cadCreditCard.expiry}
                        />
                        <TextInput style={styles.input}
                           placeholder={` ${creditCardData.due}`}
                           placeholderTextColor="#44E8C3"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChangeCad('due', valor)
                           }
                           value={cadCreditCard.due}
                        />
                        <TextInput style={styles.input}
                           placeholder={` ${cadCreditCard.limit}`}
                           placeholderTextColor="#44E8C3"
                           type="text"
                           onChangeText={
                              (valor) => handleInputChangeCad('limit', valor)
                           }
                           value={cadCreditCard.limit}
                        />
                     </View>
                  </ScrollView>
               </View>
               <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>
                  <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                     <Pressable style={styles.btn} onPress={() => updateCreditCard()}>
                        <FontAwesome name='save' size={16} color={"#44E8C3"} />
                        <Text style={styles.textBtn}>{`  Confirm`}</Text>
                     </Pressable>
                  </LinearGradient>
                  <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                     <Pressable style={styles.btn} onPress={() => setModalUpdate(false)}>
                        <FontAwesome name='close' size={16} color={"#44E8C3"} />
                        <Text style={styles.textBtn}>{`  Cancel`}</Text>
                     </Pressable>
                  </LinearGradient>
               </LinearGradient>
            </LinearGradient>
         </Modal>
      </KeyboardAvoidingView>
   )
}



{/*     
         <View style={styles.boxCard}>


            <LiteCreditCardInput
               autoFocus
               inputStyle={styles.textInfo}

               requireCVC
               requirePostalCode

               validColor={"black"}
               invalidColor={"red"}
               placeholderColor={"darkgray"}

               onFocus={this._onFocus}
               onChange={this._onChange}
            />

           
            <CreditCardInput
             // autoFocus

             // requiresName
              requiresCVC
              requiresPostalCode

             // labelStyle={s.label}
            //  inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

             // onFocus={this._onFocus}
             // onChange={this._onChange}
           />
       
                        
         <CreditCardInput
          autoFocus
          requireName
          requireCVC
          requirePostalCode
          validColor="black"
          invalidColor="red"
          placeholderColor='darkgray'
          labelStyle={{color:'black', fontSize:12}}
          inputStyle={{color:'black', fontSize:16}}
          //onFocusField={focus()}
          //onChange={dataCreditCard()}
         />        
       

          <LiteCreditCardInput 
            autoFocus
            requireName
            requireCVC
            requirePostalCode
            validColor="black"
            invalidColor="red"
            placeholderColor='darkgray'
            labelStyle={{color:'black', fontSize:12}}
            inputStyle={{color:'black', fontSize:16}}          
          /> 
        
         </View>

          */}


{/* 
            <View>

               {USE_LITE_CREDIT_CARD_INPUT ?
                  (<LiteCreditCardInput

                     onChange={this._onChange}
                     _onFocus={this._onFocus}

                  />) : (<CreditCardInput

                     requiresName
                     requiresPostalCode

                     onChange={this._onChange}
                     _onFocus={this._onFocus}

                  />
                  )
               }

            </View>

        */}


{/* 
        <CreditCardInput
        autoFocus
        requireName
        requireCVC
        requirePostalCode
        validColor="black"
        invalidColor="red"
        placeholderColor='darkgray'
        labelStyle={{color:'black', fontSize:12}}
        inputStyle={{color:'black', fontSize:16}}
        onFocusField={focus()}
        onChange={dataCreditCard()}
        />
        */}
{/*  <LiteCreditCardInput /> */ }


{/*   
          <View style={styles.boxCard}>
             <Text style={styles.textInfo}>{` Saldo R$ ${amount}`}</Text>
          </View>
        
         <TextInput style={styles.input}
            placeholder="Nº do cartão"
            placeholderTextColor="#cc0000"
            type="text"
            onChangeText={
               (valor) => handleInputChangePost('number', valor)
            }
            value={postCreditCard.number}
         />         

         <TextInput style={styles.input}
            placeholder="tipo"
            placeholderTextColor="#cc0000"
            type="text"
            onChangeText={
               (valor) => handleInputChangePost('desc', valor)
            }
            value={postCreditCard.desc}
         />

         <TextInput style={styles.input}
            placeholder="data"
            placeholderTextColor="#cc0000"
            type="text"
            onChangeText={
               (valor) => handleInputChangePost('date', valor)
            }
            value={postCreditCard.date}
         />

         <TextInput style={styles.input}
            placeholder="user"
            placeholderTextColor="#cc0000"
            type="text"
            onChangeText={
               (valor) => handleInputChangePost('user', valor)
            }
            value={postCreditCard.user}
         />

         <TextInput style={styles.input}
            placeholder="parcela"
            placeholderTextColor="#cc0000"
            type="text"
            onChangeText={
               (valor) => handleInputChangePost('parcel', valor)
            }
            value={postCreditCard.parcel}
         />

         <TextInput style={styles.input}
            placeholder="valor"
            placeholderTextColor="#cc0000"
            type="text"
            onChangeText={
               (valor) => handleInputChangePost('value', valor)
            }
            value={postCreditCard.value}
         />

        <View style={styles.boxBtn}>
         
          <Pressable style={styles.btn} onPress={() => insertPostCreditCard()}                  >
             <Text style={styles.textBtn}>Lançar</Text>
          </Pressable>

          <Pressable style={styles.btn} onPress={() => setModalCreditCard(true)}                  >
             <Text style={styles.textBtn}>Cadastrar Cartão</Text>
          </Pressable> 

       </View>
       */}