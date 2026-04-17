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

  containerHeaderOne: {
    height: "20%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 50,
    paddingStart: 15,
    backgroundColor: '#9da2a7ff',
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },

  resizeModel: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 6
  },

  containerHeaderTwo: {
    width: 'auto',
    flexDirection: 'column',
    padding: 10,
    marginStart: 30,
    marginEnd: 30,
    marginTop: -50,
    borderWidth: 1,
    borderBottomColor: "#44E8C3",
    borderRadius: 10,
    backgroundColor: '#ecf4f5ff',
  },

  contentHeaderBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },

  contentHeaderTwo: {
    height: 100,
    width: "auto",
    padding: 10,
    borderRadius: 6,
    alignItems: "flex-end"
  },

  contentList: {
    height: 40,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    borderWidth: 1,
    borderColor: "#060630ff",
    borderRadius: 10,
    marginBottom: 5
  },

  textList: {
    fontSize: 12,
    color: '#060630ff',
    fontWeight: 'bold',
    marginBottom: 10
  },

  containerInfo: {
    height: 'auto',
    padding: 10,
    alignItems: 'center',
    marginTop: 10
  },

  containerCarrousel: {
    height: 140,
    width: "100%",
    padding: 20,
    marginTop: 20,
    paddingTop: 10,
    borderRadius: 10
  },

  contentCarrousel: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  boxBtnCarrousel: {
    height: 80,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 20
  },

  textInfo: {
    color: '#060630ff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10
  },

  textTitle: {
    color: '#103030ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },

  textHidden: {
    color: '#032d3dff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10
  },

  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    flexWrap: 'wrap',
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
    marginBottom: 40
  },

  boxBtn: {
    height: 'auto',
    borderRadius: 10,
  },

  btn: {
    width: 'auto',
    height: 'auto',
    padding: 14,
  },

  btnMenu: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    padding: 14,
  },

  textBtn: {
    color: '#44E8C3',
    fontSize: 14,
    fontWeight: 'bold',
  },

});

