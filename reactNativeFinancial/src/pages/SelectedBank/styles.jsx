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
    backgroundColor: '#06121c',
    height: '100%',
  },

  containerListModal: {
    height: '100%',
    padding: 10,
    marginTop: 6,
  },

  containerList: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  contentList: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    width: "auto",
    height: 'auto',
    padding: 6,
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

  dataList: {
    borderRadius: 6,
    shadowColor: 'black',
    elevation: 4,
    margin: 4,
  },

  cardList: {
    flexDirection: 'column',
    alignItems: 'center',
    width: "auto",
    height: "auto",
    backgroundColor: 'rgba(215, 202, 165, 0.2)',
    padding: 22,
    margin: 2,
  },

  resizeModel: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },

  textList: {
    fontSize: 16,
    color: '#a2eaf1',
    fontWeight: 'bold',
    marginBottom: 10
  },

  textAlert: {
    fontSize: 22,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },

  textInfo: {
    color: '#44E8C3',
    fontSize: 18
  },

  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    flexWrap: 'wrap',
    width: '100%',
    height: 'auto',
  },

  containerBtnFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    width: 'auto',
    height: 'auto',
    marginTop: 20,
    marginBottom: 50
  },

  boxBtn: {
    height: 'auto',
    borderRadius: 8,
  },

  btn: {
    width: 'auto',
    height: 'auto',
    padding: 12,
  },

  btnMenu: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    padding: 14,
  },

  textBtn: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  containerModal: {
    flex: 1,
    padding: 10,
    height: '100%',
    paddingBottom: '50%',
  },

  contentModal: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1A1144',
    marginTop: 30,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
  },

  formModal: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    padding: 20,
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
  },

  boxSurch: {
    flexDirection: 'column',
    width: 'auto',
    height: 'auto',
    backgroundColor: '#11132f',
    alignItems: "center",
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10
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

