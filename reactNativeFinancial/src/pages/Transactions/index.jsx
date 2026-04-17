
import React, { useEffect, useState, useContext } from 'react';
import {
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
} from 'react-native';


import { SelectList } from 'react-native-dropdown-select-list';

import { AuthContext } from '../../context/auth';

import { FontAwesome } from '@expo/vector-icons';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

import Header from '../../components/Header';
import PdfReport from '../../components/PdfTransactions'; 





export default function Transactions({ navigation }) {

   const {
      setLoad,
      load,
      endpoint,
      user,
      accountData,
      bankData,
      setAmountAccount,
      amountAccount,
      transactionsType,
      infoDate,

      accounts,
      reports,  
   } = useContext(AuthContext);


   const [listReport, setListReport] = useState(false);

   useEffect(() => {
      navigation.addListener('focus', () => setLoad(!load));
      //listAccounts(accountData.id);

      /*
      if( accountData.type == "Investimentos" ){
       checkInvest();
       }

      */
      //console.log(accountData.type)
    
      var count = Object.keys(reports).length;     
        if(count != 0  ){
           setListReport(true);
            setListReports(reports);
        }else{
           setListReport(false);
        }
     
   }, [load, navigation]);


   //const [isList, setIsList] = useState(false);

   const [modalTransaction, setModalTransaction] = useState(false);

   const [transaction, setTransaction] = useState({
      move: "",
      date: "",
      type: "",
      source: "",
      form: "",
      desc: "",
      valuet: 0,
      account: accountData.type,
      number: accountData.number,
      moveway: "",
      accountway: "",
      numberway: "",
      idac: accountData.id,
   });


   



   const [showAmount, setShowAmount] = useState(false);

   const [proof, setProof] = useState({});

   const [showProof, setShowProof] = useState(false);

   const [resultPost, setResultPost] = useState();




   const handleInputChangeCad = (atribute, value) => {

      setTransaction(
         {
            ...transaction, [atribute]: value
         }
      )
   }



   const [searchVisible, setSearchVisible] = useState(false);
   const [listReports, setListReports] = useState([]);    
   const [reportSearch, setReportSearch] = useState('');
   
      const handleReport = (value) => {
       setReportSearch(value);   
       const filters = reports.filter((item) =>   
        item.date_rpt.toLowerCase().includes(removeString(value.toLowerCase()))
       );
       setListReports(filters);    
     };
      
   
       const removeString = (value) => {
       return value.replace(/[^0-9]/g, '');
      }






       var today = infoDate.year + "-" + infoDate.month + "-" + infoDate.day;
       var title = accountData.type+" Nº "+accountData.number;
             
          const pdfReport = () => {
            PdfReport(
              bankData.img, 
              title,              
              listReports,
              today);
        }







   // const [selectedType, setSelectedType] = useState("");

   /*
    const type = [
       { key: '1', value: 'Pix Pessoal' },
       { key: '2', value: 'Pix Outros' },
       { key: '3', value: 'Ted Pessoal' },
       { key: '4', value: 'Ted Outros' },
       { key: '5', value: 'Payment' },
       { key: '6', value: 'Deposito' },
       { key: '7', value: 'Saque' },
    ]
   */




   const listIn = [
      { key: '2', value: 'Pix Outros' },
      { key: '4', value: 'Ted Outros' },
      { key: '6', value: 'Deposito' },
   ]


   const listOut = [
      { key: '1', value: 'Pix Pessoal' },
      { key: '2', value: 'Pix Outros' },
      { key: '3', value: 'Ted Pessoal' },
      { key: '4', value: 'Ted Outros' },
      { key: '5', value: 'Payment' },
      { key: '6', value: 'Deposito' },
      { key: '7', value: 'Saque' },
   ]


   const mov = [
      { key: '1', value: 'out' },
      { key: '2', value: 'in' },
   ]

   const [checkBox, setCheckBox] = useState([]);
   const [randomCheckBox, setRandomCheckBox] = useState(null);
   const [statusCheckBox, setStatusCheckBox] = useState(null);

   const [account, setAccount] = useState([]);

   //const [selectedAccount, setSelectedAccount] = useState("");



   //const accounts = [];

  
   /* use this when dabase working
   const listAccounts = async (id) => {
      await fetch(endpoint + "?action=listAccountById", {
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
               var count = Object.keys(result).length;             
               for (var i = 0; i < count; i++) {
                  accounts.push(
                     {
                        value:
                           result[i].id_bka + " " +
                           result[i].name_bnk + ", " +
                           result[i].type_bka + ", " +
                           result[i].number_bka,
                     }
                  )
               }
               setAccount(accounts);              
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
   }
    */



   /*
   const [cashMov, setCashMov] = useState({
          date: "",
          type: "",
          source: "",
          desc: "",
          value: 0,
          fktrs: null,
      });
   */


   /*
   const checkInvest = () => { 
        setTransaction(
           {
              ...transaction, 'move': 'out',
                 transaction, 'moveway': 'in',
                 transaction, 'source': accountData.type,
                 transaction, 'type': 'Resgate',

                 transaction, 'accountway': 'Digital',
                 transaction, 'numberway': '83724-5',

                 transaction, 'form': 'Digital'
           }
        )      
  }
 */







   const selectedAccount = (val) => {
      const accountSelected = val;
      const accountSlice = accountSelected.split(", ");
      setTransaction(
         {
            ...transaction, 'idacf': val.substr(0, 2),
            transaction, 'moveway': 'in',
            transaction, 'source': accountData.type + " " + accountData.number,
            transaction, 'accountway': accountSlice[1],
            transaction, 'numberway': accountSlice[2],
         }
      )
   };



   const checkData = () => {  
      /*     
       resgate será necessário :
         - setar a conta digital como conta destino 
         - out para conta origem
         - in para conta destino
      */
      if (transaction.move == "out") {
         if (parseFloat(amountAccount) >= parseFloat(transaction.value)) {
            safePost();
         } else {
            console.log(" transação " + transaction.value + " Saldo insuficiente " + amountAccount);
         }
      } else {
         safePost();
      };
   };




  /* use this when dabase working
   const safePost = async () => {
      await fetch(endpoint + "?action=postTransaction", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            transaction
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {              
               setShowProof(true);
               setResultPost(result);
               setModalTransaction(false);
               cleanFields();
               updateAmount(accountData.id);
               proofPost(accountData.id);
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
   }
   */





   /*
   const proofPost = async (fkac) => {
      await fetch(endpoint + "?action=proofTransaction", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            fkac
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {
               console.log(result);
               {
                  result.map((item) => {
                     setProof(
                        {
                           ...proof, 'id': item.id_trs,
                           proof, 'move': item.mov_trs,
                           proof, 'date': item.date_trs,
                           proof, 'type': item.type_trs,
                           proof, 'source': item.source_trs,
                           proof, 'form': item.form_trs,
                           proof, 'desc': item.desc_trs,
                           proof, 'value': item.value_trs,
                        }
                     )
                     //
                    if(item.type_trs === "Saque"){                        
                        setCashMov(
                          {
                              ...cashMov, ['date']: item.date_trs,
                              cashMov, ['type']: 'in',
                              cashMov, ['source']: item.type_trs,
                              cashMov, ['desc']: bankData.name+" "+accountData.type+" "+accountData.number,
                              cashMov, ['value']: item.value_trs,
                              cashMov, ['fktrs']: item.id_trs
                          }
                      )  
                       safeCashMov();  
                     }
                    //
                  }
                 )
               }
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
      }
   */




   /*
   const safeCashMov = async () => {      
      await fetch(endpoint + "?action=postCashMov", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              cashMov
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
     }
    */




   /*
   const updateAmount = async (id) => {
      await fetch(endpoint + "?action=amountAccountById", {
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
               console.log(result);
               setAmountAccount(result)
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
   }
   */





   const cleanFields = () => {
      setTransaction(
         {
            ...transaction, 'move': "",
            transaction, 'date': "",
            transaction, 'type': "",
            transaction, 'source': "",
            transaction, 'form': "",
            transaction, 'desc': "",
            transaction, 'valuet': 0,
         }
      )
      setStatusCheckBox(null);
   };





   const selectStatus = (index, item) => {
      setStatusCheckBox(index);
      if (statusCheckBox !== index && checkBox[index] !== undefined) {
         checkBox[index] = undefined;
      } else {
         checkBox[index] = item;
         setStatusCheckBox(index);
      }
      setRandomCheckBox(Math.random());
      setTransaction(
         {
            ...transaction, 'move': item,
            transaction, 'type': '',
            transaction, 'moveway': '',
            transaction, 'source': '',
         }
      )
   };





   const cancel = () => {
      setModalTransaction(false);
      cleanFields();
   };


   const back = () => {
      showProof ? setShowProof(false) : setShowProof(false);
      navigation.navigate("SelectedAccount");
   };


   const getReport = () => {
      console.log("gerar relatorio/extrato")
   };







   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.main}>

         <View style={styles.containerHeaderOne}>
            <View>
               <Image source={{ uri: `data:image/png;base64,${bankData.img}` }} style={styles.resizeModel} />
            </View>
            <Text style={styles.textTitle}>{user}</Text>
         </View>

         <View style={styles.containerHeaderTwo}>
            <Text style={styles.textDesc}>{`Conta ${accountData.type}  `}</Text>
            <Text style={styles.textDesc}>{`${accountData.number}`}</Text>
         </View>

         <View style={styles.containerInfo}>
            {showAmount 
               ?
               <Pressable style={styles.btn}
                  onPress={() => setShowAmount(false)}>
                  {/*  <Text style={styles.textInfo}>{` AMOUNT = ${accountData.amount}`}</Text> */}
                  <Text style={styles.textDesc}>{`R$ ${amountAccount}`}</Text>
               </Pressable>
               :
               <Pressable style={styles.btn}
                  onPress={() => setShowAmount(true)}>
                  <FontAwesome name='eye' size={30} color={"#060630ff"} />
               </Pressable>
            }
         </View>

         <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>
            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btn}
                  onPress={() => setShowProof(false) & setModalTransaction(true)}>
                  <FontAwesome name='barcode' size={16} color={"#44E8C3"} />
                  <Text style={styles.textBtn}>{`  Post`}</Text>
               </Pressable>
            </LinearGradient>

            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btn}
                   onPress={() =>  {!searchVisible? setSearchVisible(true):setSearchVisible(false) }}>
                 <FontAwesome name='search' size={16} color={"#44E8C3"} />
                 <Text style={styles.textBtn}>{`  Search`}</Text>
               </Pressable>
            </LinearGradient>

            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btn}
                  onPress={() => pdfReport()}>
                  <FontAwesome name='file-pdf-o' size={16} color={"#44E8C3"} />
                   <Text style={styles.textBtn}>{`  Pdf`}</Text>
               </Pressable>
            </LinearGradient>

         </LinearGradient>









          {
           listReport ?

           <View>

              {searchVisible?         
               <View style={styles.containerSearch}>                
                  <View style={styles.contentSearch} >
                    <TextInput  style={{color:"#C0C0C0"}}                                          
                       placeholder="Pesquisar..."
                       placeholderTextColor="#C0C0C0"
                       value={reportSearch}
                       onChangeText={handleReport}                      
                     />   
                  </View>
               </View>  
                :
               <View></View>
              }

               <FlatList
                      showsVerticalScrollIndicator={false}
                      data={listReports}
                      renderItem={({ item }) =>                         
                         <View style={styles.containerList}>
                            <View style={styles.contentCardList}>
                              <Text style={styles.textList}>{`Data :  ${item.date_rpt}`}</Text>
                              <Text style={styles.textList}>{`Desc :  ${item.desc_rpt}`}</Text>
                              <Text style={styles.textList}>{`R$   :  ${item.value_rpt}`}</Text>   
                            </View>
                         </View>
                      }
                   >               
               </FlatList>
            </View> 
            
            
             :
            <View style={styles.containerList}>
               <Text style={styles.textList}>{`Não existem transações na conta  ${accountData.number}`}</Text>
            </View>
           }


         {/* 
            <Text style={styles.textInfo}>{` Banc = ${bankData.name}`}</Text>
            <Text style={styles.textInfo}>{` ID = ${accountData.id}`}</Text>
            <Text style={styles.textInfo}>{` NUMBER = ${accountData.number}`}</Text>
            <Text style={styles.textInfo}>{` AMOUNT = ${accountData.amount}`}</Text>
         */}


         {/* 
         {
            showProof
               ?
               <View style={styles.containerProof}>
                  <View>
                     <FontAwesome name='check-circle-o' size={30} color={"#09e33b"} />
                  </View>
                  <View>
                     <Text style={styles.titleProof}>{` ${resultPost} `}</Text>
                  </View>
                  <Text style={styles.textProof}>{`ID :  ${proof.id}  `}</Text>
                  <Text style={styles.textProof}>{`Date :  ${proof.date}  `}</Text>
                  <Text style={styles.textProof}>{`Origem :  ${proof.source}  `}</Text>
                  <Text style={styles.textProof}>{`Tipo :  ${proof.type}  `}</Text>
                  <Text style={styles.textProof}>{`Detalhes :  ${proof.desc}  `}</Text>
                  <Text style={styles.textProof}>{`Valor : R$ ${proof.value}  `}</Text>
               </View>
               :
               <View style={styles.containeEmpty}>
                  <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                     <Pressable style={styles.btn}
                        onPress={() => setModalTransaction(true)}>
                        <FontAwesome name='barcode' size={18} color={"#44E8C3"} />

                        // { accountData.type == "Investimentos" ?  //

                        {transactionsType == "Investir" 
                           ?
                           <Text style={styles.textBtn}>{`  Registrar Investimento`}</Text>
                           :
                           transactionsType == "Resgate"
                           ?
                           <Text style={styles.textBtn}>{`  Registrar Resgate`}</Text>
                           :
                           <Text style={styles.textBtn}>{`  Registrar movimentações`}</Text>
                        }
                     </Pressable>
                  </LinearGradient>
               </View>
         }
         */}


         <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtnFooter}>
            {/*      
            <Pressable style={styles.btn}
               onPress={() => checkType()}>
               <Text style={styles.textBtn}>checkType</Text>
            </Pressable>

            <Pressable style={styles.btn}
               onPress={() => checkAccount()}>
               <Text style={styles.textBtn}>checkAccount</Text>
            </Pressable>

            <Pressable style={styles.btn}
               onPress={() => checkMov()}>
               <Text style={styles.textBtn}>checkMov</Text>
            </Pressable>
           */}

            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btn}
                  onPress={() => back()}>
                  <FontAwesome name='backward' size={16} color={"#44E8C3"} />
                  <Text style={styles.textBtn}>{`  Back`}</Text>
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
            visible={modalTransaction}
         >
            <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>

               <View style={styles.infoModal} >
                  <Text style={styles.textInfo}>{` Register Post `}</Text>
               </View>

               <ScrollView style={styles.contentModal}>
                  {
                     accountData.type == "Investimentos"
                      ?
                        <View></View>
                      :
                        <View>
                           <View style={styles.infoCheckBox} >
                              <Text style={styles.textInfo}>{` Mov Type `}</Text>
                           </View>
                           <View style={styles.containerCheckBox}>

                              <FlatList
                                 horizontal={true}
                                 data={mov}
                                 renderItem={({ item, index }) =>

                                    <View style={styles.contentCheckBox}>

                                       <Pressable onPress={() => selectStatus(index, item.value)}>
                                          {
                                             statusCheckBox !== index 
                                             ?
                                                // checkBox[index] === undefined ?

                                                <View style={styles.checkBox}>

                                                   <View>
                                                      <Text style={styles.textInfo}>{item.value}</Text>
                                                   </View>

                                                   <View>
                                                      <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="white" />
                                                   </View>

                                             {/*   
                                              <Text style={styles.textInfo}>{` index : ${index} -key  ${item.key}`}</Text>
                                              <Text style={styles.textInfo}>{` index : ${index} -value  ${item.value}`}</Text>
                                             */}

                                                </View>
                                                :
                                                <View style={styles.checkBox}>
                                                   <View>
                                                      <Text style={styles.textInfo}>{item.value}</Text>
                                                   </View>
                                                   <View>
                                                      <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="white" />
                                                   </View>
                                                </View>
                                          }

                                       </Pressable>

                                    </View>

                                 }
                              >
                              </FlatList>

                           </View>

                           <View style={styles.boxCard}>

                              <View>
                                 <SelectList
                                    // setSelected={(val) => setTest(val)} 
                                    // setSelected={(val) => setSelected(val.replace(/[^0-9]/g, ''))}

                                    // setSelected={(val) => setSelectedType(val)}

                                    setSelected={(val) => {
                                       val == "Saque" 
                                       ?
                                          setTransaction(
                                             {
                                                ...transaction, 'type': val,
                                                transaction, 'source': bankData.name
                                             }
                                          )
                                       :
                                          setTransaction(
                                             {
                                                ...transaction, 'type': val,
                                                transaction, 'source': ""
                                             }
                                          )

                                    }
                                 }
                                    /*  data={type} */
                                    data={transaction.move == 'in' ? listIn : listOut}
                                    save="value"
                                    placeholder='Select Type'

                                    // placeholderTextColor='#44E8C3'
                                    // boxStyles={{color:'#44E8C3'}}        
                                    //  dropdownItemStyles={{color:'#44E8C3'}}
                                    boxStyles={{
                                       backgroundColor: '#314452',
                                       width: 'auto',
                                       marginBottom: 10
                                    }}

                                    inputStyles={{ color: '#44E8C3' }}
                                    dropdownTextStyles={{ color: '#44E8C3' }}
                                 />

                              </View>
                              {
                                 // selectedType == "Pix Pessoal" || selectedType == "Ted Pessoal"

                                 transaction.type == "Pix Pessoal" ||
                                 transaction.type == "Ted Pessoal"
                                    ?
                                    <View>
                                       <SelectList

                                          // setSelected={(val) => setTest(val)} 
                                          // setSelected={(val) => setSelected(val.replace(/[^0-9]/g, ''))} 

                                          //setSelected={ (key) => setSelectedAccount(key.substr(0, 2))}

                                          setSelected={(val) =>

                                             selectedAccount(val)

                                             /* 
                                              setTransaction(
                                                 {
                                                    ...transaction, 'idacf': val.substr(0, 2),
                                                       transaction,  'moveway':'in',                                             
                                                       transaction,  'source':accountData.type+" "+accountData.number,
                                                       transaction, 'accountway':val,
                                                       transaction, 'numberway':val
          
                                                 }
                                              )
                                             */
                                          }

                                          data={account}
                                          save="value"
                                          placeholder='Select Account'

                                          // placeholderTextColor='#44E8C3'
                                          //  boxStyles={{color:'#44E8C3'}}        
                                          //  dropdownItemStyles={{color:'#44E8C3'}}
                                          boxStyles={{
                                             backgroundColor: '#314452',
                                             width: 'auto'
                                          }}

                                          inputStyles={{ color: '#44E8C3' }}
                                          dropdownTextStyles={{ color: '#44E8C3' }}
                                       />

                                    </View>
                                    :
                                    <View></View>
                              }

                           </View>
                        </View>
                  }

                  <View style={styles.boxCard}>

                     <TextInput style={styles.input}
                        placeholder="Date"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                        (valor) => handleInputChangeCad('date', valor)
                        }
                        value={transaction.date}
                     />

                     {/* 
                      {
                       transaction.type == "Saque" || 
                       transaction.type == "Pix Pessoal" ||
                       transaction.type == "Ted Pessoal" 
                        ?
                        <TextInput style={styles.input}
                         editable={false}
                         placeholder={bankData.name}
                         placeholderTextColor="#44E8C3"
                         type="text"          
                         value={bankData.name}
                       />               
                        :
                       <TextInput style={styles.input}
                        placeholder="Origem"
                        placeholderTextColor="#44E8C3"
                        type="text"  
                        onChangeText={
                           (valor) => handleInputChangeCad('source', valor)
                        }
                        value={transaction.source}
                       />
                      }                   
                     */}

                     {
                        transaction.type == "Saque" ||
                        transaction.type == "Pix Pessoal" ||
                        transaction.type == "Ted Pessoal"
                           ?
                           <TextInput style={styles.input}
                              editable={false}
                              placeholder={bankData.name}
                              placeholderTextColor="#44E8C3"
                              type="text"
                              value={bankData.name}
                           />
                           :
                           accountData.type == "Investimentos"
                           ?
                              <TextInput style={styles.input}
                                 editable={false}
                                 placeholder={accountData.number}
                                 placeholderTextColor="#44E8C3"
                                 type="text"
                                 value={accountData.number}
                              />
                           :
                              <TextInput style={styles.input}
                                 placeholder="Origem"
                                 placeholderTextColor="#44E8C3"
                                 type="text"
                                 onChangeText={
                                 (valor) => handleInputChangeCad('source', valor)
                                 }
                                 value={transaction.source}
                              />
                     }

                     {/* 
                     <TextInput style={styles.input}
                        placeholder="Origem"
                        placeholderTextColor="#44E8C3"
                        type="text"                      

                        onChangeText={
                           (valor) => handleInputChangeCad('source', valor)
                        }

                        value={transaction.source}
                     />
                   */}

                     {
                        accountData.type == "Investimentos"
                           ?
                           <TextInput style={styles.input}
                              editable={false}
                              placeholder={"Resgate"}
                              placeholderTextColor="#44E8C3"
                              type="text"
                           // value={"Resgate"}
                           />
                           :
                           <TextInput style={styles.input}
                              placeholder="Tipo de Transação"
                              placeholderTextColor="#44E8C3"
                              type="text"
                              onChangeText={
                              (valor) => handleInputChangeCad('form', valor)
                              }
                              value={transaction.form}
                           />
                     }

                     <TextInput style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChangeCad('desc', valor)
                        }
                        value={transaction.desc}
                     />

                     <TextInput style={styles.input}
                        placeholder="Value"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChangeCad('valuet', valor)
                        }
                        value={transaction.valuet}
                     />
                  </View>

                  <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn} onPress={() => checkData()}>
                           <FontAwesome name='save' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Safe`}</Text>
                        </Pressable>
                     </LinearGradient>
                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn} onPress={() => cancel()}                  >
                           <FontAwesome name='close' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Cancel`}</Text>
                        </Pressable>
                     </LinearGradient>
                  </LinearGradient>

               </ScrollView>

            </LinearGradient>

         </Modal>

      </KeyboardAvoidingView>

   )
}



{/*  
                          
                          <Pressable onPress={() => selectStatus(key , value)}>

                              {

                                 statusCheckBox !== key
                                    ?

                                    <View>
                                      <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="white" />
                                      <Text>{key}</Text>
                                    </View>

                                    :

                                    <View>
                                      <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="white" />
                                      <Text>{key}</Text>
                                    </View>

                              }

                           </Pressable> 
                           
                         */}



{/* 
         {listCreditCard == "not found"

            ?

            <View>

               <View style={styles.boxBtn}>

                  <View >
                     <Pressable style={styles.btn}
                        onPress={() => setModalCreditCard(true)}

                     // onPress={() => insertCadCreditCard()}
                     >
                        <Text style={styles.textBtn}>Adcione o 1º cartao</Text>
                     </Pressable>
                  </View>

               </View>

            </View>

            :            


          <View>
         
           <View style={styles.boxBtn}>

               <View >
                  <Pressable style={styles.btn}
                     onPress={() => setModalCreditCard(true)}

                  // onPress={() => insertCadCreditCard()}
                  >
                     <Text style={styles.textBtn}>Add Credit Card</Text>
                  </Pressable>
               </View>

            </View>         
         

              <FlatList
                  data={listCreditCard}
                  renderItem={({ item }) =>

                   <View style={styles.dataContainer}>

                        <View style={styles.dataList}>

                           <View>
                              {item.type_cc == "visa"
                                 ?
                                 <FontAwesome name='cc-visa' size={42} color={"white"} />
                                 :
                                 <FontAwesome name='cc-mastercard' size={42} color={"red"} />
                              }
                           </View>

                           <View style={styles.dataContent}>
                              <Text style={styles.textList}>
                                 {` ${item.number_cc} `}
                              </Text>
                           </View>

                           <View style={styles.dataContent}>
                              <Text style={styles.textList}>
                                 {` user `}
                              </Text>

                              <Text style={styles.textList}>
                                 {` ${item.expery_date_cc} `}
                              </Text>                            
                           </View>                           

                        </View>

                       <View style={styles.boxBtn}>

                           <View >
                              <Pressable style={styles.btn}
                                 onPress={() => selectCreditCard(
                                    item.id_cc,
                                    item.number_cc,
                                    item.type_cc,
                                    item.expery_date_cc
                                 )}
                              >
                                 <Text style={styles.textAlert}>Select</Text>
                              </Pressable>
                           </View>

                           <View >
                              <Pressable style={styles.btn}
                                 onPress={() => updateCreditCard(item.id_cc)}
                              >
                                 <Text style={styles.textAlert}>Update</Text>
                              </Pressable>
                           </View>

                           <View >
                              <Pressable style={styles.btn}
                                 onPress={() => deleteCreditCard(item.id_cc)}
                              >
                                 <Text style={styles.textAlert}>Delete</Text>
                              </Pressable>
                           </View>

                        </View>

                     </View>
                  }
               >
               </FlatList> 

             </View>                        
          }

       </View>

   */}



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