import React, { useEffect, useState, useContext,} from 'react';
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

import { AuthContext } from '../../context/auth';


import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';






export default function Login({ navigation }) {




const {   
    endpoint,
    setLoad,
    load,
    setUser,
    user
} = useContext(AuthContext);




/* 
  useEffect(() => {
      getUser();
   }, []);

 */







const [cadUser, setCadUser] = useState({
   id: 0,     
   name: "",
   email: "",
   password: "",
   profile: "",
   img: null,
   base64: null,
});





const [credencials, setCredencials] = useState({
   name: "",   
   password: "",  
});






const [listUser, setListUser] = useState([]);

const [isUser, setIsUser] = useState(false);



const [modalCadUser, setModalCadUser] = useState(false);

const [modalUpdateUser, setModalUpdateUser] = useState(false);






const handleInputChange = (atribute, value) => {

      setCredencials(
         {
            ...credencials, [atribute]: value
         }
      )
   }









const insertUser = async () => {

   console.log(' => insertUser ');
   
/*
   await fetch(endpoint + "?action=cadBank", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      // body:JSON.parse(JSON.stringify({bank}))

      body: JSON.stringify({
         user
      })

   })
      .then((res) => res.json())
      .then(
         (result) => {

            console.log(' => ' + result);
         })
      .catch((error) =>
         // alert('Error no fetch'));
         console.log(" type error => " + error));
*/   
}








const login = async () => {      
    
      await fetch(endpoint + "?action=login", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         // body:JSON.parse(JSON.stringify({bank}))
         body: JSON.stringify({
            credencials
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {

               if (result != "error") {

                 //console.log(result);
                 setUser(result);
                 navigation.navigate("Home");   
               
               }else{
                  console.log(result);
               }              
            })
         .catch((error) =>
            console.log(" type error => " + error));         
   }







const logIn2 = async () => {

    navigation.navigate("Home"); 
   
    await fetch(endpoint + "?action=login", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },       
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











return(
   <View style={styles.main}>   


   <Text style={styles.textTitle}>Login</Text>   

      <View style={styles.container}>          

         <TextInput  style={styles.input}
            placeholder={"user"}
            placeholderTextColor="#0a1311ff"
            type="text"
            onChangeText={(valor) =>
               handleInputChange('name',valor)
         }/> 


          <TextInput  style={styles.input}
            placeholder={"password"}
            placeholderTextColor="#0a1311ff"
            secureTextEntry={true}
            type="text"
            onChangeText={(valor) =>
               handleInputChange('password',valor)
         }/>           

         <View >
            <Pressable style={styles.btn}
               onPress={() => login()}>
               <Text style={styles.textBtn}>Confirm</Text>
            </Pressable>
         </View>


      </View>



       

{/* 
       <View >
          <Pressable style={styles.btn}
            onPress={() => setModalCadUser(true)}>
            <Text style={styles.textBtn}>Ainda não tem cadastro...Cadastre-se</Text>
          </Pressable>
       </View>

 */}
     




      <View>


         <Modal
          animationType='fade'
          visible={modalCadUser}
         >


        <ScrollView>


         <View style={styles.containerModal}>

           <View style={styles.contentModal} >
             <Text style={styles.textInfo}>{` Register User`}</Text>
           </View>


         {/*
      
          {
            bank.img === null ?

              <View style={styles.boxAddImg}>

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

        */}




           <View style={styles.formModal}>


             <TextInput style={styles.input}
               placeholder="User Name"
               placeholderTextColor="#44E8C3"
               type="text"
               onChangeText={
                  (valor) => handleInputChange('name', valor)
               }
               value={cadUser.name}
             />



             {/* 
             <TextInput style={styles.input}
               placeholder="E-mail"
               placeholderTextColor="#44E8C3"
               type="text"
               onChangeText={
                  (valor) => handleInputChange('email', valor)
               }
               value={user.email}
             />
            */}



             <TextInput style={styles.input}
               placeholder="Password"
               placeholderTextColor="#44E8C3"
               type="text"
               secureTextEntry={true}
               onChangeText={
                  (valor) => handleInputChange('password', valor)
               }
               value={cadUser.password}
             />



            {/* 
             <TextInput style={styles.input}
               placeholder="Perfil"
               placeholderTextColor="#44E8C3"
               type="text"
               onChangeText={
                  (valor) => handleInputChange('profile', valor)
               }
               value={user.profile}
             />
            */}

          </View>


          <View style={styles.containerBtn}>


            <View>
               <Pressable onPress={() => insertUser()} style={styles.btn}                 >
                  <Text style={styles.textBtn}>Confirm</Text>
               </Pressable>
            </View>



            <View>
               <Pressable onPress={() => setModalCadUser(false)} style={styles.btn}                 >
                  <Text style={styles.textBtn}>Cancel</Text>
               </Pressable>
            </View>


         </View>



      </View>



    </ScrollView>

   </Modal>

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