
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
}
   from 'react-native';



import { AuthContext } from '../../context/auth';

//import { SelectList } from 'react-native-dropdown-select-list'
//npm i react-native-dropdown-select-list

import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../components/Header';


const h_max_hight = 215;
const h_min_hight = 205;
const h_scroll_distance = h_max_hight - h_min_hight;



export default function SelectedBank({ navigation }) {


   // const testBankDataId = 10; 
   // const endpointPhp = 'http://localhost:3322/php-api-financial';

   const {
      setLoad,
      load,
      endpoint,
      user,
      bankData,      
      setAccountData,
      accountData,
      setAmountAccount,
      // amountAccount,
      accounts,
      setReports,
      setCreditCard
   } = useContext(AuthContext);



   useEffect(() => {
      navigation.addListener('focus', () => setLoad(!load));
      // getListAccount();
      // console.log(' bankData.id ', bankData.id)
      // getListAccountByBank(bankData.id);
      // getAccountType();

      /*
      var count = Object.keys(accounts).length;
      console.log(count);
      for (var i = 0; i < count; i++) {
      console.log(accounts[i].type_act)
      }
      */

   }, [load, navigation]);



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


   const [isLoading, setIsLoading] = useState(false);

   const [modalCadAccount, setModalCadAccount] = useState(false);

   const [titleModal, setTitleModal] = useState("Cadastre uma Conta!");

   const [modalUpdateAccount, setModalUpdateAccount] = useState(false);

   const [listAccount, setListAccount] = useState([]);

   const [isList, setIsList] = useState(false);

   const [showAmount, setShowAmount] = useState(false);

   const [account, setAccount] = useState({
      id: 0,
      number: "",
      type: "",
      open: "",
      desc: "",
      amount: 0,
      fkbnk: bankData.id
   });



   /*
   const [testData, setTestData] = useState([]);
   const DATA = [
      { id: '1', title: 'First Item' },
      { id: '2', title: 'Second Item' },
      { id: '3', title: 'Third Item' },
   ];
   */



   /*
      const [selected, setSelected] = useState("");   
      const [test, setTest] = useState("");   
      const data3 = [
         { key: '1', value: 'Mobiles', disabled: true },
         { key: '2', value: 'Appliances' },
         { key: '3', value: 'Cameras' },
         { key: '4', value: 'Computers', disabled: true },
         { key: '5', value: 'Vegetables' },
         { key: '6', value: 'Diary Products' },
         { key: '7', value: 'Drinks' },
      ]
   */


   //const [listBank, setListBank] = useState([]);


   const handleInputChange = (atribute, value) => {
      setAccount(
         {
            ...account, [atribute]: value
         }
      )
   };



   /* use this when dabase working
   const bank = [];
   const getListBank = async () => {
      await fetch(endpointPhp + "?action=listBankDropdown")
         .then((res) => res.json())
         .then(
            (result) => {
               if (result === 'not found') {
                  console.log("empty array");
               } else {
                  var count = Object.keys(result).length;
                  //console.log(result);
                  // let bank = [];
                  for (var i = 0; i < count; i++) {
                     bank.push({
                        // value:result[i].name_bnk,
                        // label:result[i].id_bnk,                        
                        // id:result[i].id_bnk+result[i].name_bnk,
                        value: result[i].id_bnk + " " + result[i].name_bnk,
                        // value:result[i].id_bnk+" "+result[i].name_bnk,   
                        // key:result[i].name_bnk, 
                        //  value:result[i].id_bnk,                  
                     })
                  }
                  //console.log(bank[0].id);
                  setListBank(bank);
                  //
                result.map(
                  (item)=> 
                     data = {key:item.id_bnk, value:item.name_bnk},
                     setListBank(
                       {
                          ...listBank,[key]:item.id_bnk,
                             listBank,[value]:item.name_bnk
                       }
                     )                    
                     setListBank(
                       {
                          ...listBank,['id']:item.id_bnk,
                             listBank,['name']:item.name_bnk
                       }
                     )  
                   )
                   //
               }
            })
        .catch(function (error) {
               console.log('erro => ' + error.message);
         }); 
      }
    */


   /*
    const [selected, setSelected] = useState("");
    const type2 = [
       { key: '1', value: 'Conta Corrente' },
       { key: '2', value: 'Digital' },
       { key: '3', value: 'Poupança' },
       { key: '4', value: 'Investimentos' }
    ];
   */

   const type = [
      { value: 'Corrente' },
      { value: 'Digital' },
      { value: 'Poupança' },
      { value: 'Investimentos' }
   ];


   /*
   const [accountType, setAccountType] = useState([]);
   let difenedType = ['Conta Corrente','Digital','Poupança','Investimentos'];
   let type = [];
 
    const getAccountType = async () => {   
       await fetch(endpoint + "?action=listAccountType")
          .then((res) => res.json())
          .then(
             (result) => {              
                if (result != "not found"){                
                   var count = Object.keys(result).length;
                   for (var i = 0; i < count; i++) {
                      type.push({
                        value: result[i].type_bka,
                      })
                   }          
                }else{                 
                   for (var i = 0; i < difenedType.length ; i++) {
                      type.push({
                        value: difenedType[i],
                      })
                   }  
               }
               setAccountType(type);              
             //  console.log(accountType);
             })
          .catch(function (error) {
             console.log('erro => ' + error.message);
          });
      }
   */



   /*
      const getListAccount = async () => {   
         await fetch(endpoint + "?action=listAccount")
            .then((res) => res.json())
            .then(
               (result) => {   
                  console.log(result);
               })
            .catch(function (error) {
               console.log('erro => ' + error.message);
            });
      }
   */





   const getListAccountByBank = async (idBank) => {

      /* use this when dabase working
      await fetch(endpoint + "?action=listAccountByBank", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            idBank
         })
      })
         .then(res => {
            // responseClone = res.clone();
            return res.json();
         })
         .then(
            result => {
               setIsLoading(false);
               setListAccount(result);
               setIsList(true);
               //setIsList(false);                  
               //setTitleModal("Abra a sua 1ª Conta!");
            })
         .catch(error => {
            console.log('erro => ' + error.message);
         });
      */
   };




   // let responseClone;
   const getListAccountByBank2 = async (idBank) => {
      // console.log(" tela selectedBank getListAccountByBank  id bank " + idBank)
      await fetch(endpoint + "?action=listAccountByBank", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            idBank
         })
      })
         .then(res => {
            // responseClone = res.clone();
            return res.json();
         })
         .then(
            result => {
               if (result != "not found") {
                  setIsLoading(false);
                  setListAccount(result);
                  setIsList(true);
                  // console.log(" result getListAccountByBank => " + result);
               } else {
                  setIsLoading(false);
                  setIsList(false);
                  //setModalCadAccount(true);
                  setTitleModal("Abra a sua 1ª Conta!");
               }
            })
         .catch(error => {
            console.log('erro => ' + error.message);
            /*  
            responseClone.text()
            .then(text=>console.log('erro => ', text))
             */
         });
   };




   const getListAccountById = async (id, number, type, open, desc, amount ) => {      
       setAccount(
         {
            ...account, ['id']: id,
            account, ['number']: number,
            account, ['type']: type,
            account, ['open']: open,
            account, ['desc']: desc,
            account, ['amount']: amount,
         }
      );    
      /*
      await fetch(endpointPhp + "?action=listAccountById", {
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
               if (result != "not found"){  
                  setListAccount(result); 
                  console.log(" result getListAccountByBank => " + result);
               }else{
                   alert(result);
              }
            })
            .catch(function (error) {
               console.log('erro => ' + error.message);
         });          
         */
      setModalUpdateAccount(true)
   };




   /* 
      const safe = () => {
         var numsStr = account.idbk.replace(/[^0-9]/g,'');       
         console.log(" id "+parseInt(numsStr));
      }
    */



   const insertAccount = async () => {
      alert("use this when dabase working");
      /* use this when dabase working
      await fetch(endpoint + "?action=cadAccount", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            account
         })
      })
         .then(res => res.json())
         .then(
            (result) => {
               //alert(result+" on api ");
               console.log(' insertAccount => ' + result);
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
      */
      closeModal('cad');
   };



   const updateAccount = async () => {
      alert("use this when dabase working");
      /* use this when dabase working
      await fetch(endpoint + "?action=updateAccount", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            account
         })
        })
         .then(res => res.json())
         .then(
            (result) => {
               // alert(result);
               console.log(result);
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
       */
      closeModal('update');
   };




   const deleteAccount = async (id) => {
      alert("use this when dabase working");
      /* use this when dabase working
      await fetch(endpoint + "?action=deleteAccount", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id
         })
        })
         .then(res => res.json())
         .then(
            (result) => {
               if (result != "error") {
                  getListAccountByBank(bankData.id);
                  alert(result);
               } else {
                  alert(result);
               }
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
      */
   };




   const closeModal = (atribute) => {
      if (atribute == "cad") {
         setModalCadAccount(false);
      } else {
         setModalUpdateAccount(false);
      }
      getListAccountByBank(bankData.id);
      cleanFields();
   };



   /*
    const removeString =(value)=>{
       //let formatStr =   value.replace(/[^0-9]/g, '');
        return value.replace(/[^0-9]/g, '');
    }
   */



   const selectAccount = (id, type, number, amount, reports, creditcards) => {
      setAccountData(
         {
            ...accountData, ['id']: id,
            accountData, ['type']: type,
            accountData, ['number']: number,
            // accountData, ['amount']: amount,
         }
      )  
       const report = reports !== null && reports !== undefined ? reports : {};
       const creditcard = creditcards !== null && creditcards !== undefined ? creditcards : {};
       setReports(report);
       setCreditCard(creditcard);   
       setAmountAccount(amount);
       navigation.navigate("SelectedAccount");
   };



   const cleanFields = () => {
      setAccount(
         {
            ...account, ['id']: 0,
            account, ['number']: "",
            account, ['type']: "",
            account, ['open']: "",
            account, ['desc']: "",
            account, ['amount']: "",
            account, ['id']: 0,
         }
      )
   };





   /*
  const  sendDataAccount = (id ,type , number, amount)=>{   
        setAccountData(
             {
               ...accountData,['id']:id                  
             }
         ) 
         setTestData(
            {
               ...testData,['id']:id ,   
                  testData,['type']:type,
                  testData,['number']:number,
                  testData,['amount']:amount,
            }
          )
          // chamar tela credit card
         // setTestData(id,img);
        // setAccountData(id,img);
  }
*/



   if (isLoading) {
      return (
         <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
         </View>
      )
   };





   return (
      <View style={{ flex: 1 }} >
         <View style={{ height: h_max_hight,  marginBottom:20 }}>
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
                  source={{ uri: `data:image/png;base64,${bankData.img}` }}
                  style={{
                     padding: imageScaleHeight,
                     width: 60,
                     height: imageScaleHeight,
                     borderRadius: 8,
                     marginTop: 20    
                  }}
                  resizeModel='contain'
               />
               <View style={{ marginTop: 10, marginBottom: 10, borderRadius: 6, backgroundColor: `${bankData.backgroundup}` }}>
                  <Header info={bankData.name} user={`${user}`} />
               </View>
            </Animated.View>
         </View>

         {/* 
        <View style={styles.containerHeader}>
           <View>          
            <Image source={{ uri: `data:image/png;base64,${bankData.img}` }}
             style={styles.resizeModel}
             />            
           </View>
           <View ><Text style={styles.textAlert}>{bankData.name}</Text></View> 
        </View>
        */}

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
                  <Text style={styles.textAlert}>Ainda não existe conta cadastrada</Text>
               </View>
         */}

         <FlatList
            showsVerticalScrollIndicator={false}
            data={accounts}
            renderItem={({ item }) =>

               <View style={styles.containerList} >
                  <LinearGradient colors={[`${bankData.backgroundup}`, `${bankData.backgrounddown}`]} style={styles.contentList}>
                     <View style={styles.contentCardList}>
                        {/*
                           <Text style={styles.textList}>
                             {`Bank Name : ${item.name_bnk}`}
                           </Text>
                        */}
                        <Text style={styles.textList}>
                           {/*   {`Type :  ${item.type_bka}`} */}
                           {`Conta :  ${item.type_act}`}
                        </Text>
                        <Text style={styles.textList}>
                           {/*  {`Nº :  ${item.number_bka}`} */}
                           {`Nº   :  ${item.number_act}`}
                        </Text>


                            
                       
                                   {showAmount ?                       
                                      <Pressable style={styles.btn}
                                         onPress={() => setShowAmount(false)}>                                       
                                         <Text style={styles.textList}>{`R$ ${item.saldo_act}`}</Text>
                                      </Pressable>                       
                                      :
                                      <Pressable style={styles.btn}
                                         onPress={() => setShowAmount(true)}>
                                         <FontAwesome name='eye' size={30} color={"#02dee6ff"} />
                                      </Pressable>
                                   }
                       
                              
                     


                     </View>
                     <View style={styles.containerBtn}>
                        <LinearGradient colors={['#fdfdffff', `${bankData.backgroundup}`]} style={styles.boxBtn}>
                           <Pressable style={styles.btnMenu}
                              onPress={() => selectAccount(
                                 /* 
                                  item.id_bka,
                                  item.type_bka,
                                  item.number_bka,
                                  item.amount_bka,
                                   */
                                 item.id_act,
                                 item.type_act,
                                 item.number_act,
                                 item.saldo_act,
                                 item.reports,
                                 item.creditcard
                              )}
                           >
                              <FontAwesome name='eye' size={18} color={"#ffffff"} />
                              <Text style={styles.textBtn}>{`  Select`}</Text>
                           </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#fdfdffff', `${bankData.backgroundup}`]} style={styles.boxBtn}>
                           <Pressable style={styles.btnMenu}
                              onPress={() => getListAccountById(
                                 item.id_act,
                                 item.number_act,
                                 item.type_act,
                                 item.open_date_bka,
                                 item.desc_act,
                                 item.saldo_act                                 
                              )}
                           /*
                               onPress={() => getListAccountById(
                               item.id_bka,
                               item.number_bka,
                               item.type_bka,
                               item.open_date_bka,
                               item.desc_bka,
                               item.amount_bka,
                            )}
                            */
                           >
                              <FontAwesome name='edit' size={18} color={"#ffffff"} />
                              <Text style={styles.textBtn}>{`  Edit`}</Text>
                           </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#fdfdffff', `${bankData.backgroundup}`]} style={styles.boxBtn}>
                           <Pressable style={styles.btnMenu}
                              onPress={() => deleteAccount(item.id_bka)}
                           >
                              <FontAwesome name='trash' size={18} color={"#ffffff"} />
                              <Text style={styles.textBtn}>{`  Delete`}</Text>
                           </Pressable>
                        </LinearGradient>
                     </View>
                  </LinearGradient>
               </View>
            }
            onScroll={Animated.event([
               { nativeEvent: { contentOffset: { y: scrollOffsetY } } },],
               { useNativeDriver: false })}
            scrollEventThrottle={16}
         >
         </FlatList>

         <LinearGradient colors={['#97a1a1ff', '#ffececff']} style={styles.containerBtnFooter}>
            <LinearGradient colors={['#fdfdffff', `${bankData.backgroundup}`]} style={styles.boxBtn}>
               <Pressable style={styles.btnMenu}
                  onPress={() => setModalCadAccount(true)}
               >
                  <FontAwesome name='plus' size={16} color={"#ffffff"} />
                  <Text style={styles.textBtn}>{`  Add Account`}</Text>
               </Pressable>
            </LinearGradient>
            <LinearGradient colors={['#fdfdffff', `${bankData.backgroundup}`]} style={styles.boxBtn}>
               <Pressable style={styles.btnMenu}
                  onPress={() => navigation.navigate("Home")}
               >
                  <FontAwesome name='home' size={16} color={"#ffffff"} />
                  <Text style={styles.textBtn}>{`  Home`}</Text>
               </Pressable>
            </LinearGradient>
         </LinearGradient>


         <Modal
            animationType='fade'
            visible={modalCadAccount}
         >
            <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>
               <View style={styles.contentModal} >
                  <Text style={styles.textInfo}>{titleModal}</Text>
               </View>
               <View style={styles.formModal}>
                  <TextInput style={styles.input}
                     placeholder="Account Number"
                     placeholderTextColor="#44E8C3"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('number', valor)
                     }
                     value={account.number}
                  />
                  {/* 
                  <TextInput style={styles.input}
                     placeholder="type"
                     placeholderTextColor="#44E8C3"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('type', valor)
                     }
                     value={account.type}
                  />
                  */}
                  <View style={styles.boxSurch}>
                     <SelectList
                        //setSelected={setSelected}
                        setSelected={(value) =>
                           setAccount(
                              {
                                 ...account, 'type': value
                              }
                           )
                        }
                        data={type}
                        placeholder="Choose a account type"
                        searchPlaceholder="Search account..."
                        boxStyles={{ backgroundColor: '#314452' }}
                        inputStyles={{ color: '#44E8C3' }}
                        dropdownTextStyles={{ color: '#44E8C3' }}
                        //dropdownStyles={styles.dropdownList} // Custom style for the dropdown list
                        //dropdownItemStyles={styles.dropdownItem} // Custom style for each item
                        arrowicon={<Text style={{ fontSize: 18, color: '#44E8C3' }}>  ▼</Text>} // Custom arrow icon
                     />
                     {/* 
                     <SelectList
                        setSelected={(value) =>
                           setAccount(
                              {
                                 ...account, 'type': value
                              }
                           )
                        }
                        // data={type}
                        data={accountType}
                        placeholder='Select Type'
                        onPress={getAccountType()}
                        // onSelect={getAccountType()}
                        boxStyles={{ backgroundColor: '#314452' }}
                        inputStyles={{ color: '#44E8C3' }}
                        dropdownTextStyles={{ color: '#44E8C3' }}
                     />
                    */}
                  </View>
                  <TextInput style={styles.input}
                     placeholder="open date"
                     placeholderTextColor="#44E8C3"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('open', valor)
                     }
                     value={account.open}
                  />
                  <TextInput style={styles.input}
                     placeholder="description"
                     placeholderTextColor="#44E8C3"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('desc', valor)
                     }
                     value={account.desc}
                  />
                  <TextInput style={styles.input}
                     placeholder="Saldo"
                     placeholderTextColor="#44E8C3"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('amount', valor)
                     }
                  // value={account.amount}
                  />
               </View>
               <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>
                  <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                     <Pressable style={styles.btnMenu}
                        onPress={() => insertAccount()}
                     >
                        <FontAwesome name='save' size={16} color={"#44E8C3"} />
                        <Text style={styles.textBtn}>{`  Safe`}</Text>
                     </Pressable>
                  </LinearGradient>
                  <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                     <Pressable style={styles.btnMenu}
                        onPress={() => closeModal('cad')}>
                        <FontAwesome name='close' size={16} color={"#44E8C3"} />
                        <Text style={styles.textBtn}>{`  Cancel`}</Text>
                     </Pressable>
                  </LinearGradient>
               </LinearGradient>
            </LinearGradient>
         </Modal>

         <Modal
            animationType='fade'
            visible={modalUpdateAccount}
         >
            <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>
               <View style={styles.contentModal} >
                  <Text style={styles.textInfo}>{` UPDATE ACCOUNT `}</Text>
               </View>
               <View style={styles.containerListModal}>
                  <View style={styles.contentList}>
                     <TextInput style={styles.input}
                        placeholder={` ${account.number}`}
                        type="text"
                        placeholderTextColor="#cc0000"
                        onChangeText={(valor) =>
                           handleInputChange('number', valor)
                        }
                        value={account.number}
                     />
                     <TextInput style={styles.input}
                        placeholder={` ${account.type}`}
                        placeholderTextColor="#cc0000"
                        type="text"
                        onChangeText={(valor) =>
                           handleInputChange('type', valor)
                        }
                        value={account.type}
                     />
                     {/* 
                      <TextInput style={styles.input}
                        placeholder={` ${account.open}`}
                        placeholderTextColor="#cc0000"
                        type="text"
                        onChangeText={(valor) =>
                           handleInputChange('open', valor)
                        }
                        value={account.open}
                     /> 
                     */}
                     <TextInput style={styles.input}
                        placeholder={` ${account.desc}`}
                        placeholderTextColor="#cc0000"
                        type="text"
                        onChangeText={(valor) =>
                           handleInputChange('desc', valor)
                        }
                        value={account.desc}
                     />
                     <TextInput style={styles.input}
                        placeholder={` R$ ${account.amount}`}
                        placeholderTextColor="#0db1a9ff"
                        type="text"
                        onChangeText={(valor) =>
                           handleInputChange('amount', valor)
                        }
                        value={account.amount}
                     />
                     <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>
                        <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                           <Pressable style={styles.btnMenu}
                              onPress={() => updateAccount()}>
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
               </View>
            </LinearGradient>
         </Modal>
      </View>
   )
}






  {/*
           <FlatList

               data={listAccount}

                renderItem={({ item }) =>               

                <View style={styles.dataList}>

                  <View style={styles.cardList}>

                     <TextInput style={styles.input}
                        placeholder={` ${item.number_bka}`}
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('number', valor)
                        }
                        value={account.number}
                     />

                     <TextInput style={styles.input}
                        placeholder={` ${item.type_bka}`}
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('type', valor)
                        }
                        value={account.type}
                     />

                     <TextInput style={styles.input}
                        placeholder={` ${item.open_date_bka}`}
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('open', valor)
                        }
                        value={account.open}
                     />

                     <TextInput style={styles.input}
                        placeholder={` ${item.desc_bka}`}
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('desc', valor)
                        }
                       value={account.desc}
                     />

                     <TextInput style={styles.input}
                        placeholder={` ${item.amount_bka}`}
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('amount', valor)
                        }
                        value={account.amount}
                     />

              
                   <View style={styles.contentBtn}>
                                    
                     <View>
                        <Pressable style={styles.btn}
                           onPress={() => updateAccount()}>
                           <Text style={styles.textBtn}>Confirm</Text>
                        </Pressable>
                     </View>


                     <View>
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
    */}












   {/*     
            <SelectList
               //setSelected={(val) => setTest(val)} 
               // setSelected={(val) => handleInputChange('idbk', val)}  
               //setSelected={(val) => handleInputChange('fkbnk', val.replace(/[^0-9]/g, ''))}
               setSelected={(val) => handleInputChange('fkbnk', removeString(val))}
               data={listBank}
               save="value"
           
              onChange={item => {
                 {
                 handleInputChange('idbk', item.value)            
                 }
               }}  

            //
             onChangeText={
              (valor) => handleInputChange('idbk', valor)
            }
            value={account.idbk}
            //

            //
            onValueChange={
              (valor) => handleInputChange('idbk', valor)
           }
            value={account.idbk}
            //
         />
   */}


   {/* 
         <View>
              <SelectList
                data={listBank}

                boxStyles={{backgroundColor:'blue', marginHorizontal:50}}
                inputStyles={{fontSize:10}}
                dropdownStyles={{backgroundColor:'blue'}}
                dropdownItemStyles={{marginHorizontal:50}}
                dropdownTextStyles={{color:'white'}}
                placeholder="Select Banc"              
                           
                onChangeText={
                  (valor) => handleInputChange('idbk', valor)
                }
                value={account.idbk}
               
                onValueChange={
                  (valor) => handleInputChange('idbk', valor)
               }
                value={account.idbk}
                
              />
           </View>
     */}


