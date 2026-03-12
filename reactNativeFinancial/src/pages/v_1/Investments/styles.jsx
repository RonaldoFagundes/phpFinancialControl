import { StyleSheet } from "react-native";



export default StyleSheet.create({

  containerLoading: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },

  main: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fffdf5ff'
  },

  containerHeader: {
    height: "20%",
    width: 'auto',
    padding: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  resizeModel: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 6,
    marginLeft: 10
  },

  contentHeaderTitle: {
    alignItems: 'flex-start'
  },

  textDesc: {
    color: '#44E8C3',
    fontSize: 14,
    fontWeight: 'bold',
  },

  containerInfo: {
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    marginStart: 10,
    marginEnd: 10,
    marginTop: -24,
    marginStart: 30,
    marginEnd: 30,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    backgroundColor: '#ecf4f5ff',
  },

  textInfo: {
    color: '#060324ff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10
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

  containeEmpty: {
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
    width: 'auto',
    height: 200,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    backgroundColor: '#2c4254',
  },

  containerList: {
    height: '100%',
    padding: 10,
    marginTop: 6,
  },

  contentList: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    width: "auto",
    height: 'auto',
    padding: 6,
    backgroundColor: '#150c4bff',
    marginBottom: 10
  },

  containerSimulator: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    padding: 10,
    marginBottom: 10
  },

  contentSimulator: {
    width: '100%',
  },

  contentCardList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: "100%",
    height: "auto",
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },

  textList: {
    fontSize: 16,
    color: '#a2eaf1',
    fontWeight: 'bold',
    marginBottom: 10
  },

  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    height: 'auto',
    marginTop: 'auto',
    marginBottom: 40
  },

  containerBtnFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom:50,
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

  /*
  infoCheckBox: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1A1144',
    marginTop: 10,
    marginBottom:10,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
  },
  */

  /*
  containerCheckBox:{
    width:'100%',
    padding:10,
    alignItems:'center',
    borderRadius: 10,
    backgroundColor:'#0c1037',
  },
  */

  /*
  contentCheckBox:{
    width:'auto',
    padding:10, 
    borderRadius: 10,  
  },
  */

  /*
  checkBox: {
    width:50,
    height:'auto',
    borderRadius: 6,  
    padding:10,
    alignItems:'center', 
    backgroundColor:'#123a61',
  },
  */

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

});

