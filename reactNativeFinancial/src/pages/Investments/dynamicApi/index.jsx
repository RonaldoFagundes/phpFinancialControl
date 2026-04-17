
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




export default function Investments({ navigation }) {

   const {
      setLoad,
      load,
      endpoint,
      user,
      accountData,
      bankData,
      setAmountAccount,
      amountAccount,
      infoDate    
   } = useContext(AuthContext);

   const today = infoDate.day+"/"+infoDate.month+"/"+infoDate.year;

   useEffect(() => {
      navigation.addListener('focus', () => setLoad(!load));
     // listAccounts(accountData.id);   
   //   getListInvestmentsByAc(accountData.id);
   }, [load, navigation]);

  
   const [isLoading, setIsLoading] = useState(true);
   const [listInvestments, setListInvestments] = useState([]);
   const [isList, setIsList] = useState(false);
   const [modalInvestments, setModalInvestments] = useState(false);
   const [modalRescue, setModalRescue] = useState(false);
 
   const [indicators, setIndicators] = useState({
       ir_0_180_d : 0.225,
       ir_181_360_d : 0.20,
       ir_361_720_d : 0.175,
       ir_720_d : 0.15,
       selic:  0.135,
       ipca :  0.065      
   });



   const [profitability, setProfitability] = useState([]);
   const [isProfit, setIsProfit] = useState(false);   
   const [amountProfitability, setAmountProfitability] = useState(0);
   const [typeInvestments, setTypeInvestments] = useState("");     



   const [investments, setInvestments] = useState({
      id:0,
      move:"",  
      trans:"", 
      form:"Digital", 
      broker: "",
      cat: "",
      type: "",
      open: "",
      expery: "",
      date: today,
      rate_type: "",
      rate: "",
      rate_value:0,
      valuei: 0,
      valuet: 0,
      amount:0,
      desc: "",
      status:"",
      idac: accountData.id,
   });



   const [showAmount, setShowAmount] = useState(false);
   const [proof, setProof] = useState({});
   const [showProof, setShowProof] = useState(false);
   const [resultPost, setResultPost] = useState();



   const handleInputChange = (atribute, value) => {
      setInvestments(
         {
            ...investments, [atribute]: value
         }
      )
   }



   /* use this when dabase working
   const getListInvestmentsByAc = async (idac) => {
      await fetch(endpoint + "?action=listInvestmentsByAc", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            idac
         })
      })
         .then((res) => res.json())
         .then(
         (result) => {                
            if(result != "not found"){             
               setIsList(true);
               setListInvestments(result);
            if(infoDate.day == "26"){   
              console.log(" today is "+today+" dia de lançar os rendimentos "); 
             // selectTypeInvestiment();
              loadValues(result);               
              //
               if(!isProfit){   
                  loadValues(result); 
               }else{
                  console.log(" já lançado!!");
               }
               //
            }else{
               console.log(" today is "+today);
            }        
         }else{
             console.log(result," listInvestmentsByAc ");
         }       
       })
         .catch(function (error) {
            console.log('erro => ' + error.message);
      });
     setIsLoading(false);
   }
   */




/* use this when dabase working
   const values_invest = [];
   const loadValues =  (result) => {   
      var amount;
      var count = Object.keys(result).length;        
       for (var i = 0; i < count; i++) {
         let rate_type = result[i].rate_type_ivt;
         let value = result[i].value_ivt ;
         let rate = (result[i].rate_ivt / 100 );
        // console.log(" rate type "+rate_type+" rate "+rate+" value "+value);
         let calc_value_aa = value * rate ;
         //console.log(" calc_value_aa "+calc_value_aa);             
         let calc_value_am = calc_value_aa / 12 ;
        // console.log(" calc_value_am "+calc_value_am);
        // selectTypeInvestiment(rate_type);
        setTypeInvestments(rate_type);
        // console.log(typeInvestments);
         if(rate_type == "Pré fixado"){
           console.log("Pré fixado");
           // amount = (calc_value_am).toFixed(2);
         }else if (typeInvestments == "Selic"){
            console.log("Selic");
           // amount = (indicators.selic * calc_value_am).toFixed(2);
         }else if (typeInvestments == "IPCA"){
            console.log("IPCA");
           // let fix_money = indicators.ipva * calc_value_am ;
           // amount = (calc_value_am + fix_money).toFixed(2);
         } 
        // console.log(" amount "+amount);

         //
         values_invest.push(         
           {
              id:result[i].id_ivt,          
              value:amount,
              date : infoDate.day+"/"+infoDate.month+"/"+infoDate.year                                                
           }
         )         
         // 

        //
         if(rate_type == "Pré fixado"){         
            //let calc_values = (result[i].rate_ivt / 100 ) * result[i].value_ivt ;            
            console.log("pré")
         }else if(rate_type == "Selic"){
           // let calc_values = ( (result[i].rate_ivt / 100 ) * (indicators.selic/100) * result[i].value_ivt ) / 12 ;
           console.log("selic")
         }else if(rate_type == "Ipca"){
            console.log("ipca")
         }
        //
         //let format_values = (calc_values / 12).toFixed(2);
       }
       //  setProfitability(values_invest); 
     }
 */





   
   const selectTypeInvestiment = (type) => {
      Alert.alert(
         "Select an option",
         "Choose from the following:",
         [
           {
             text: type,
             onPress: () => handleSelection(type),
           },
            /*
           {
             text: "Selic",
             onPress: () =>  handleSelection("selic"),
           },

           {
            text: "Ipca +",
            onPress: () =>  handleSelection("ipca"),
          },
           */

           {
             text: "Cancel",
             onPress: () => console.log("Cancel Pressed"),
             style: "cancel",
           },

         ],
         { cancelable: false }
       );
   }

   


   const handleSelection = (option) => {
      setTypeInvestments(option);
     // Alert.alert(`You selected: ${option}`);
    };

   



   const selectTypeInvestiment2 = (type) => {}


   const safeIncome = async () => {
      await fetch(endpoint + "?action=postRendimentos", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({    
            profitability
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {
              console.log(result);               
              setIsProfit(true);
            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
    
   }


   

   const postInvestment =(type)=>{
      setInvestments(
         {
            ...investments, 'move': type,
               investments, 'trans': 'Investment' ,
               investments, 'status': 'Active'
         }
      )    
      setModalInvestments(true); 
    }



   const safePostInvestment = async () => {
      cleanFields();
      setModalInvestments(false);
      await fetch(endpoint + "?action=postInvestments", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            investments
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {             
               setIsList(false);
               setShowProof(true);
               setResultPost(result);  
               updateAmount(accountData.id);
               proofPost(accountData.id);           

            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
   }




   const proofPost = async (fkac) => {
      await fetch(endpoint + "?action=proofInvestment", {
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
             
               {
                  result.map((item) => {

                     setProof(
                        {
                           ...proof, 'id': item.id_ivt,
                           proof, 'broker': item.broker_name_ivt,
                           proof, 'cat': item.cat_ivt,
                           proof, 'type': item.type_ivt,
                           proof, 'open': item.open_ivt,
                           proof, 'expery': item.expery_ivt,
                           proof, 'rate_type': item.rate_type_ivt,
                           proof, 'rate': item.rate_ivt,
                           proof, 'value': item.value_ivt,
                           proof, 'desc': item.desc_ivt,
                           
                        }
                     )

                  }

               )
             }

            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
   }



   const getAmountProfitability = async (id) => {

      await fetch(endpoint + "?action=amountProfitability", {
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
                  setAmountProfitability(result);

              })
          .catch(function (error) {
              console.log('erro => ' + error.message);
          });

  }



  
   const postRescue = async (id, type , source, amount, open) => {

      getAmountProfitability(id);
                
      setInvestments(
         {
            ...investments, 'id': id,
               investments, 'move': type,
               investments, 'trans': 'Rescue',
               investments, 'broker': source,
               investments, 'amount': amount,
               investments, 'open': open,
         }
      )
      setModalRescue(true);
   }



   const validationRescue= (value)=>{    
      
      const percent = value / investments.amount;
      const ref_value = amountProfitability * percent ;
      const ir = ref_value * indicators.ir_720_d;
      const value_t = value - ir;
         
      setInvestments(
         {
            ...investments, 'valuei': value,
               investments, 'valuet': value_t.toFixed(2),
               investments, 'rate_value': ir.toFixed(2)
         }
      )

      if(investments.amount === value){
        
         setInvestments(
             {
                ...investments, 'status': 'inactive',
             }
          )
          // console.log(investments.amount," === ",investments.valuei) 
       }
   
   }



   const safePostRescue = async () => {

      cleanFields();
      setModalRescue(false);
           
      await fetch(endpoint + "?action=postRescue", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            investments
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {  
               
               console.log(result);
             
             ///  setIsList(false);

              // setShowProof(true);
              // setResultPost(result);             
              
             ///  updateAmount(accountData.id);

             //  proofPost(accountData.id);

            ///  proofPostRescue(investments.id);   

            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
       
   }





   const proofPostRescue = async (id) => {

      await fetch(endpoint + "?action=proofRescue", {
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
             
             /*
               {
                  result.map((item) => {

                     setProof(
                        {
                           ...proof, 'id': item.id_ivt,
                           proof, 'broker': item.broker_name_ivt,
                           proof, 'cat': item.cat_ivt,
                           proof, 'type': item.type_ivt,
                           proof, 'open': item.open_ivt,
                           proof, 'expery': item.expery_ivt,
                           proof, 'rate_type': item.rate_type_ivt,
                           proof, 'rate': item.rate_ivt,
                           proof, 'value': item.value_ivt,
                           proof, 'desc': item.desc_ivt,
                           
                        }
                     )

                  }

               )
             }
            */


            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });
   }



  
   const closeProof = () => {
     setShowProof(false);
     getListInvestmentsByAc(accountData.id);
   }





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



   
      const cleanFields = () => {
   
         setInvestments(
            {
               ...investments, 'broker': "",
               investments, 'mov': "",
               investments, 'trans': "",
               investments, 'cat': "",
               investments, 'type': "",
               investments, 'open': "",
               investments, 'expery': "",
               investments, 'rateType': "",
               investments, 'rate': "",
               investments, 'valuei': 0,
               investments, 'amount': 0,
               investments, 'desc': "",
               investments, 'status': "",
            }
         )
      }
    



  
   const cancel = () => {

      modalRescue ?  setModalRescue(false) :

      modalInvestments? setModalInvestments(false):

      cleanFields();
   }
  




   const back = () => {
      showProof ? setShowProof(false) : setShowProof(false);
      navigation.navigate("SelectedAccount");
   }




   const getReport = () => {
      console.log("gerar relatorio/extrato")
   }



   const selectBanc = () => {
      console.log("resgate/details")
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
         style={styles.main} >


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
                  <Text style={styles.textInfo}>{` AMOUNT R$ ${amountAccount}`}</Text>
               </Pressable>
            :
               <Pressable style={styles.btn}
                  onPress={() => setShowAmount(true)}>
                  <FontAwesome name='eye' size={30} color={"#060324ff"} />
               </Pressable>
            }
         </View>





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
     <Text style={styles.textProof}>{`Broker :  ${proof.broker}  `}</Text>
     <Text style={styles.textProof}>{`Category :  ${proof.cat}  `}</Text>                
     <Text style={styles.textProof}>{`Type :  ${proof.type}  `}</Text>
     <Text style={styles.textProof}>{`Open Date :  ${proof.open}  `}</Text>
     <Text style={styles.textProof}>{`Expery :  ${proof.expery}  `}</Text>
     <Text style={styles.textProof}>{`Rate Type :  ${proof.rate_type}  `}</Text>
     <Text style={styles.textProof}>{`Rate :  ${proof.type}  `}</Text>
     <Text style={styles.textProof}>{`Value : R$ ${proof.value}  `}</Text>
     <Pressable style={styles.btn}
       onPress={() => closeProof()}>
       <Text style={styles.textBtn}>{` ok `}</Text>
    </Pressable>
</View>      
: 
   <ScrollView>

      <FlatList
                    // style={{ paddingTop: h_max_hight }}
                    // showsVerticalScrollIndicator={false}
         data={listInvestments}
         renderItem={({ item }) =>

         <View style={styles.containerList} >

                <LinearGradient
                        colors={['#0a0439', '#170c7c']}
                        style={styles.contentList}>

                              <View style={styles.contentCardList}>
                                 <Text style={styles.textList}>
                                    {`ID  :  ${item.id_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Broker :  ${item.broker_name_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Cat :  ${item.cat_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Type :  ${item.type_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Open :  ${item.open_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Expery :  ${item.expery_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Rate Type :  ${item.rate_type_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Rate :  ${item.rate_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Amount :  ${item.value_ivt}`}
                                 </Text>
                                 <Text style={styles.textList}>
                                    {`Desk :  ${item.desc_ivt}`}
                                 </Text>
                                 <View style={styles.containerBtn}>
                                    <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                                       <Pressable style={styles.btn}
                                          onPress={() => 
                                           //  getAmountProfitability(item.id_ivt) &
                                             postRescue(item.id_ivt, 'in' , item.broker_name_ivt , item.value_ivt, item.open_ivt ) 
                                            }
                                       >
                                          <FontAwesome name='eye' size={16} color={"#44E8C3"} />
                                          <Text style={styles.textBtn}>{`  Resgatar`}</Text>
                                       </Pressable>
                                    </LinearGradient>

                                    <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                                       <Pressable style={styles.btn}
                                          onPress={() => selectBanc()}
                                       >
                                          <FontAwesome name='eye' size={16} color={"#44E8C3"} />
                                          <Text style={styles.textBtn}>{`  Details`}</Text>
                                       </Pressable>
                                    </LinearGradient>
                                 </View>
                              </View>
               </LinearGradient>
         </View>
       }>
      </FlatList>
   </ScrollView>        
             


         /* 
               <View style={styles.containeEmpty}>

                  <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.boxBtn}>

                     <Pressable style={styles.btn}

                        onPress={() => transaction("Invest")}>

                        <FontAwesome name='barcode' size={18} color={"#44E8C3"} />

                       <Text style={styles.textBtn}>{` Ainda não existe investimentos!!! Investir ? `}</Text>
                 
                     </Pressable>

                  </LinearGradient>

               </View>
         */
      }

         <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.containerBtn}>

            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btn}
                  onPress={() =>postInvestment("out")}>
                  <FontAwesome name='barcode' size={16} color={"#44E8C3"} />
                  <Text style={styles.textBtn}>{`  Investir`}</Text>
               </Pressable>
            </LinearGradient>
            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btn}                
                   onPress={() =>showAlert()}>

                  {/* onPress={() => getReport()}> */}

                  <FontAwesome name='list-alt' size={16} color={"#44E8C3"} />
                  <Text style={styles.textBtn}>{`  Extrato`}</Text>
               </Pressable>
            </LinearGradient>
            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
               <Pressable style={styles.btn}
                  onPress={() => back()}>
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

               <ScrollView style={styles.contentModal} >

                  <View style={styles.boxCard}>

                     <TextInput style={styles.input}
                        placeholder="Broker"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('broker', valor)
                        }
                        value={investments.broker}
                     />

                     <TextInput style={styles.input}
                        placeholder="Categoria"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('cat', valor)
                        }
                        value={investments.cat}
                     />

                     <TextInput style={styles.input}
                        placeholder="Type"
                        placeholderTextColor="#44E8C3"
                        type="text"

                        onChangeText={
                           (valor) => handleInputChange('type', valor)
                        }
                        value={investments.type}
                     />

                     <TextInput style={styles.input}
                        placeholder="Open"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('open', valor)
                        }
                        value={investments.open}
                     />

                     <TextInput style={styles.input}
                        placeholder="Expery"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('expery', valor)
                        }
                        value={investments.expery}
                     />

                     <TextInput style={styles.input}
                        placeholder="Rate Type"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('rate_type', valor)
                        }
                        value={investments.rate_type}
                     />

                     <TextInput style={styles.input}
                        placeholder="Rate"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('rate', valor)
                        }
                        value={investments.rate}
                     />

                     <TextInput style={styles.input}
                        placeholder="Amount"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('valuei', valor)
                        }
                       // value={investments.valuei}
                     />

                     <TextInput style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('desc', valor)
                        }
                        value={investments.desc}
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
                        <Pressable style={styles.btn} onPress={() => cancel()}                  >
                           <FontAwesome name='close' size={16} color={"#44E8C3"} />
                           <Text style={styles.textBtn}>{`  Cancel`}</Text>
                        </Pressable>
                     </LinearGradient>

                  </LinearGradient>

               </ScrollView>

            </LinearGradient>

         </Modal>

         <Modal
            animationType='fade'
            visible={modalRescue}
         >

            <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>

               <View style={styles.infoModal} >
                  <Text style={styles.textDesc}>{` Register Rescue `}</Text>
               </View>

               <View style={styles.boxCard}>

                       <TextInput style={styles.input}
                         placeholder={investments.id}
                         editable={false}
                         placeholderTextColor="#44E8C3"
                         type="text"
                         onChangeText={
                           (valor) => handleInputChange('id', valor)
                         }
                       //  value={investments.i}
                      />

                       <TextInput style={styles.input}
                         placeholder={investments.broker}
                         editable={false}
                         placeholderTextColor="#44E8C3"
                         type="text"
                         onChangeText={
                           (valor) => handleInputChange('broker', valor)
                         }
                        // value={investments.valuei}
                      />

                      <Text style={styles.input}>{`Amount R$ ${investments.amount}`}</Text>

                      <TextInput style={styles.input}
                         placeholder="Rescue value"
                         placeholderTextColor="#44E8C3"
                         type="text"
                       
                         onChangeText={
                          // (valor) => handleInputChange('valuei', valor)
                           (valor) => validationRescue(valor)
                         }                              
                        // value={investments.valuei}
                      />

                     <TextInput style={styles.input}
                        placeholder={investments.date}
                        placeholderTextColor="#44E8C3"
                        type="text"
                        
                        onChangeText={     
                           (valor) => handleInputChange('date', valor) 
                        }
                        value={investments.date}
                     />

                     <TextInput style={styles.input}
                        placeholder="Desc"
                        placeholderTextColor="#44E8C3"
                        type="text"
                        onChangeText={
                           (valor) => handleInputChange('desc', valor)
                        }
                        value={investments.desc}
                     />                    
                   
               </View>

                  <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>

                     <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                        <Pressable style={styles.btn} onPress={() => safePostRescue()}>
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

            </LinearGradient>

         </Modal> 

      </KeyboardAvoidingView>

   )
}





 {/* 
                                    <View style={styles.containerBtn}>
         
                                       <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.boxBtn}>
                                          <Pressable style={styles.btn}
                                             onPress={() => selectBanc(
                                                item.id_bnk,
                                                item.name_bnk,
                                                item.img_bnk
                                             )}
                                          >
                                             <FontAwesome name='eye' size={16} color={"#44E8C3"} />
                                             <Text style={styles.textBtn}>Select</Text>
                                          </Pressable>
                                       </LinearGradient> 


         
                                       <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.boxBtn}>
                                          <Pressable style={styles.btn}
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
                                             <Text style={styles.textBtn}>Edit</Text>
                                          </Pressable>
                                       </LinearGradient>

         
                                       <LinearGradient colors={['#08042F', '#B1B2AB']} style={styles.boxBtn} >
                                          <Pressable style={styles.btn}
                                             onPress={() => deleteBank(
                                                item.id_bnk
                                             )}
                                          >
                                             <FontAwesome name='trash' size={16} color={"#44E8C3"} />
                                             <Text style={styles.textBtn}>Delete</Text>
                                          </Pressable>
                                       </LinearGradient>

         
                                    </View>

 */}









{/* 
         
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

                                       statusCheckBox !== index ?

                                          // checkBox[index] === undefined ?

                                          <View style={styles.checkBox}>

                                            <View>
                                              <Text style={styles.textInfo}>{item.value}</Text>
                                            </View>

                                            <View>
                                              <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="white" />
                                            </View> 

                                        
                                         // <Text style={styles.textInfo}>{` index : ${index} -key  ${item.key}`}</Text>
                                         // <Text style={styles.textInfo}>{` index : ${index} -value  ${item.value}`}</Text>
                                         

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

             */}







{/* 
               <View style={styles.boxCard}>

                     <View>

                        <SelectList

                           // setSelected={(val) => setTest(val)} 
                           // setSelected={(val) => setSelected(val.replace(/[^0-9]/g, ''))}

                           // setSelected={(val) => setSelectedType(val)}

                           setSelected={(val) =>


                                 setTransaction(
                                    {
                                       ...transaction, 'type': val ,
                                          transaction, 'source': bankData.name
                                    }
                                 )            
                             
                           }                           

                           
                           

                          data={ transaction.move == 'in' ? listIn : listOut}


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

                

                    

                           <View>

                              <SelectList

                                 // setSelected={(val) => setTest(val)} 
                                 // setSelected={(val) => setSelected(val.replace(/[^0-9]/g, ''))} 

                                 //setSelected={ (key) => setSelectedAccount(key.substr(0, 2))}


                                 setSelected={(val) =>                                   
                                  
                                    setTransaction(
                                       {
                                          ...transaction, 'idacf': val.substr(0, 2),
                                             transaction,  'moveway':'in',                                             
                                             transaction,  'source':accountData.type+" "+accountData.number,
                                       }
                                    )
                                    
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

                      </View>

                  */}




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


   /*
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
 */




  // const [account, setAccount] = useState([]);

   //const [selectedAccount, setSelectedAccount] = useState("");



   /*
   const accounts = [];

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
               //  console.log(" count " + count);

               for (var i = 0; i < count; i++) {

                  accounts.push(

                     {
                        value:
                           result[i].id_bka + " " +
                           result[i].name_bnk + " " +
                           result[i].type_bka + " " +
                           result[i].number_bka,
                     }

                  )

               }

               setAccount(accounts);
               // console.log(" listUserCC " + accounts);

            })
         .catch(function (error) {
            console.log('erro => ' + error.message);
         });

   }
  */




   /*
   const safePostTr = async () => {
                     
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

               //console.log(result);
              
               /
               setShowProof(true);               
               setResultPost(result);
               setModalTransaction(false);
               cleanFields();
               updateAmount(accountData.id);
               proofPost(accountData.id);
               /

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
   const checkData = async () => {

      console.log(investments)
    
      if(transaction.move == "out"){ 
      
         if( parseFloat(amountAccount) >= parseFloat(transaction.value) ){  

             safePost();

         }else{  
            console.log(" transação "+transaction.value+" Saldo insuficiente "+amountAccount); 
         }  

      }else{

            safePost();

      }  

   }
  */


     //const [isList, setIsList] = useState(false);

  // const [modalTransaction, setModalTransaction] = useState(false);

   /*
   const [transaction, setTransaction] = useState({
      move: "",
      date: "",
      type: "",
      source: bankData.name,
      form: "",
      desc: "",
      value: 0,
      account: accountData.type,
      number: accountData.number,
      moveway: "",
      accountway: "",
      numberway: "",
      idac: accountData.id,
   });
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

  }
 */