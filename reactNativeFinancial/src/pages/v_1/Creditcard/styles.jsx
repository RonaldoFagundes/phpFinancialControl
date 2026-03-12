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
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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

  contentHeaderItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },

  textDesc: {
    color: '#44E8C3',
    fontSize: 14,
    fontWeight: 'bold',
  },

  textInfo: {
    color: '#060324ff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10
  },

  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
    height: 'auto',
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    marginTop: 'auto',
  },

  containerBtnFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    width: 'auto',
    height: 'auto',
    marginTop: 'auto',
    paddingBottom:40,    
  },

  boxBtn: {
    height: 'auto',
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

  containerNoList: {
    marginTop: 100,
    width: '100%',
    height: '40%',
    alignItems: 'center',
  },

  scrollView: {
    width: '100%',
    padding: 10
  },

  containerCard: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#1e2c46ff',
    width: "auto",
    height: "auto",
    padding: 10,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
  },

  contentCard: {
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
    elevation: 4,
    padding: 10,
    paddingStart: 30,
    paddingEnd: 30,
    marginBottom: 10,
    backgroundColor: '#374d77ff',
    borderWidth: 2,
    borderColor: '#10bebeff'
  },

  dataCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },

  textCard: {
    fontSize: 16,
    color: '#a2eaf1',
    fontWeight: 'bold',
    marginTop: 7
  },

  flegCard: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  containerList: {
    height: "100%",
    marginBottom: 10
  },

  contentList: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    width: "auto",
    height: '100%',
    padding: 6,
    marginTop: 12,
  },

  containerModal: {
    flex: 1,
    padding: 10,
    height: '100%',
    paddingBottom: '50%'
  },

  contentModal: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1A1144',
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
  },

  boxCard: {
    width: '100%',
    height: 'auto',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    backgroundColor: 'transparent',
    marginTop: 20,
    marginBottom: 20
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

