import { StyleSheet } from "react-native";



export default StyleSheet.create({

  main: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fffdf5ff'
  },

  containerHeaderOne: {
    height: "20%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 50,
    paddingStart: 15,
    backgroundColor: '#06121c',
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },

  resizeModel: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 6,
    marginLeft: 10
  },

  containerHeaderTwo: {
    width: 'auto',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginStart: 30,
    marginEnd: 30,
    marginTop: -50,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    backgroundColor: '#ecf4f5ff',
  },

  textTitle: {
    color: '#44E8C3',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10
  },

  textDesc: {
    color: '#060630ff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  containerInfo: {
    height: 70,
    alignItems: 'center',
    backgroundColor: '#ecf4f5ff',
    marginTop: 10,
    paddingTop: 15
  },

  containerSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    padding: 10,
    marginTop: 10,
  },

  contentSearch: {
    backgroundColor: '#1c0c7aff',
    width: '40%',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#44E8C3',
  },

  containerProof: {
    marginTop: 50,
    padding: 10,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
    marginStart: 5,
    marginEnd: 5,
    borderRadius: 10,
    marginBottom: 'auto'
  },

  titleProof: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },

  textProof: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  containeEmpty2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 10,
    width: 'auto',
    height: 200,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    backgroundColor: '#0f2334',
    marginBottom: 'auto'
  },

  containeEmpty: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 200,
    backgroundColor: '#c8e7f3ff',
  },

  textInfo: {
    color: '#44E8C3',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10
  },

  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: 'auto',
    height: 'auto',
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
  },

   containerBtnFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom:40,
    borderRadius: 10,
    width: '100%',
    height: 'auto',     
    marginTop:"auto"
  },
 
  boxBtn: {
    height: 40,
    borderRadius: 10,
  },

  btn: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    padding: 10,
  },

  textBtn: {
    color: '#44E8C3',
    fontSize: 14,
    fontWeight: 'bold',
  },

  containerModal: {
    flex: 1,
    padding: 10,
    height: '100%',
  },

  infoModal: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1A1144',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
  },

  contentModal: {
    height: 'auto',
    width: '100%',
    padding: 10,
  },

  infoCheckBox: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1A1144',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
  },

  containerCheckBox: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#0c1037',
  },

  contentCheckBox: {
    width: 'auto',
    padding: 10,
    borderRadius: 10,
  },

  checkBox: {
    width: 50,
    height: 'auto',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#123a61',
  },

  boxCard: {
    width: '100%',
    height: 'auto',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    color: "black",
    backgroundColor: '#0c1037',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  input: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    color: "#44E8C3",
    backgroundColor: '#062531',
    fontSize: 16
  },

  containerList: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  contentCardList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: "100%",
    height: "auto",
    padding: 10,
    marginTop: 3,
    borderBottomWidth: 2,
    borderBottomColor: "#030f0cff",
    borderRadius: 10,
    backgroundColor: '#77a79bff'
  },

  textList: {
    fontSize: 16,
    color: '#0a0238ff',
    fontWeight: 'bold',
    marginBottom: 8
  },


});

