import React, { useEffect, useState, useContext } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    FlatList,
    Text,
    TextInput,
    View,
    Modal,
    Image,
    ScrollView,
} from 'react-native';


//import  SelectList  from 'react-native-dropdown-select-list';


import { AuthContext } from '../../context/auth';


import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header';





export default function CashPayment({ navigation }) {




    const {
        endpoint,
        user,
    } = useContext(AuthContext);





    useEffect(() => {

        getAmount();

    }, []);



    const [showAmount, setShowAmount] = useState(false);


    const [modalPost, setModalPost] = useState(false);

    const [cashMov, setCashMov] = useState({
        date: "",
        type: "",
        category: "",
        source: "",
        desc: "",
        value: 0,
        fktrs: null,
    });


    const handleInputChange = (atribute, value) => {

        setCashMov(
            {
                ...cashMov, [atribute]: value
            }
        )
    }


    const mov = [
        { key: '1', value: 'out' },
        { key: '2', value: 'in' },
    ];


    const [checkBox, setCheckBox] = useState([]);
    const [randomCheckBox, setRandomCheckBox] = useState(null);
    const [statusCheckBox, setStatusCheckBox] = useState(null);



    const selectStatus = (index, item) => {

        setStatusCheckBox(index);
        if (statusCheckBox !== index && checkBox[index] !== undefined) {
            checkBox[index] = undefined;
        } else {
            checkBox[index] = item;
            setStatusCheckBox(index);
        }
        setRandomCheckBox(Math.random());

        setCashMov(
            {
                ...cashMov, 'type': item
            }
        )
    }





    const [showProof, setShowProof] = useState(false);

    const [resultPost, setResultPost] = useState();

    const [proof, setProof] = useState({});

    const [amount, setAmount] = useState();






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
                    setResultPost(result);
                    cleanFields();
                    setModalPost(false);
                    proofPost();


                })
            .catch(function (error) {
                console.log('erro => ' + error.message);
            });


    }





    const proofPost = async () => {

        await fetch(endpoint + "?action=proofCashMov", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    console.log(result);


                    {
                        result.map((item) => {
                            setProof(
                                {
                                    ...proof, 'id': item.id_cm,
                                    proof, 'date': item.date_cm,
                                    proof, 'type': item.type_cm,
                                    proof, 'category': item.category_cm,
                                    proof, 'source': item.source_cm,
                                    proof, 'desc': item.desc_cm,
                                    proof, 'value': item.value_cm,
                                }
                            )
                        }

                        )
                    }

                    setShowProof(true);
                    getAmount();

                })
            .catch(function (error) {
                console.log('erro => ' + error.message);
            });

    }







    const getAmount = async () => {

         setAmount(27.75);

         /*
        await fetch(endpoint + "?action=cashAmount", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    console.log(result);

                    setAmount(result);

                })
            .catch(function (error) {
                console.log('erro => ' + error.message);
            });
        */
    }















    const cleanFields = () => {

        setCashMov(
            {
                ...cashMov, 'date': "",
                cashMov, 'type': "",
                cashMov, 'category': "",
                cashMov, 'source': "",
                cashMov, 'desc': "",
                cashMov, 'value': 0,
            }
        )

        setStatusCheckBox(null);
    }



    const backHome = () => {

        showProof ? setShowProof(false) : setShowProof(false);
        navigation.navigate("Home")

    }





    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.main}>

            <LinearGradient colors={['#83838bff', '#20244bff']} style={styles.containerHeader}>
                <View style={styles.contentHeaderTitle}>
                    <Header user={`${user}`} />
                </View>
            </LinearGradient>


            <View style={styles.containerInfo}>
                {showAmount ?
                    <Pressable style={styles.btn}
                        onPress={() => setShowAmount(false)}>
                        {/*  <Text style={styles.textInfo}>{` AMOUNT = ${accountData.amount}`}</Text> */}
                        <Text style={styles.textDesc}>{` AMOUNT R$ ${amount.toFixed(2)}`}</Text>
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
                        <Text style={styles.textProof}>{`ID : ${proof.id}  `}</Text>
                        <Text style={styles.textProof}>{`Date : ${proof.date}  `}</Text>
                        <Text style={styles.textProof}>{`Type : ${proof.type}  `}</Text>
                        <Text style={styles.textProof}>{`Category : ${proof.category}  `}</Text>
                        <Text style={styles.textProof}>{`Source : ${proof.source}  `}</Text>
                        <Text style={styles.textProof}>{`Desc : ${proof.desc}  `}</Text>
                        <Text style={styles.textProof}>{`Value : R$ ${proof.value}  `}</Text>
                    </View>
                    :
                    <View style={styles.containeEmpty}>
                        <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                            <Pressable style={styles.btnMenu}
                                onPress={() => setModalPost(true)}>
                                <FontAwesome name='barcode' size={18} color={"#44E8C3"} />
                                <Text style={styles.textBtn}>{`  Registrar Movimentação`}</Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
            }          

            <LinearGradient colors={['#83838bff', '#20244bff']} style={styles.containerBtnFooter}>
                <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                    <Pressable style={styles.btnMenu}
                        onPress={() => setShowProof(false) & setModalPost(true)}>
                        <FontAwesome name='barcode' size={16} color={"#44E8C3"} />
                        <Text style={styles.textBtn}>{`  Post`}</Text>
                    </Pressable>
                </LinearGradient>

                <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                    <Pressable style={styles.btnMenu}
                        onPress={() => backHome()}>
                        <FontAwesome name='home' size={16} color={"#44E8C3"} />
                        <Text style={styles.textBtn}>{`  Home`}</Text>
                    </Pressable>
                </LinearGradient>
            </LinearGradient>    

           
            <Modal
                animationType='fade'
                visible={modalPost}
            >

                <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerModal}>

                    <View style={styles.infoModal} >
                        <Text style={styles.textInfo}>{` Register PostCashMov `}</Text>
                    </View>

                    <ScrollView style={styles.contentModal} >

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

                            <TextInput style={styles.input}
                                placeholder="Date"
                                placeholderTextColor="#44E8C3"
                                type="text"
                                onChangeText={
                                    (valor) => handleInputChange('date', valor)
                                }
                                value={cashMov.date}
                            />

                            <TextInput style={styles.input}
                                placeholder="Category"
                                placeholderTextColor="#44E8C3"
                                type="text"
                                onChangeText={
                                    (valor) => handleInputChange('category', valor)
                                }
                                value={cashMov.category}
                            />

                            <TextInput style={styles.input}
                                placeholder="Source"
                                placeholderTextColor="#44E8C3"
                                type="text"
                                onChangeText={
                                    (valor) => handleInputChange('source', valor)
                                }
                                value={cashMov.source}
                            />

                            <TextInput style={styles.input}
                                placeholder="Description"
                                placeholderTextColor="#44E8C3"
                                type="text"
                                onChangeText={
                                    (valor) => handleInputChange('desc', valor)
                                }
                                value={cashMov.desc}
                            />

                            <TextInput style={styles.input}
                                placeholder="Value"
                                placeholderTextColor="#44E8C3"
                                type="text"
                                onChangeText={
                                    (valor) => handleInputChange('value', valor)
                                }
                                value={cashMov.value}
                            />

                        </View>

                        <LinearGradient colors={['#08042F', '#050b3d']} style={styles.containerBtn}>

                            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                                <Pressable style={styles.btnMenu}
                                    onPress={() => safeCashMov()}>
                                    <FontAwesome name='save' size={16} color={"#44E8C3"} />
                                    <Text style={styles.textBtn}>{`  Safe`}</Text>
                                </Pressable>
                            </LinearGradient>

                            <LinearGradient colors={['#08042F', '#413f56']} style={styles.boxBtn}>
                                <Pressable style={styles.btnMenu}
                                    onPress={() => setModalPost(false)}>
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





