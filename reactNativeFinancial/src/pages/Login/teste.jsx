/*
 npm install react-native-view-shot
    ou
 yarn add react-native-view-shot
*/


import React, { useRef, useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';




function Login(){

    const viewShotRef = useRef();
    const [snapshot, setSnapshot] = useState(null);


    const handleCapture = async () => {
    try {
      // Captura a imagem da View e obtém o resultado
      const result = await viewShotRef.current.capture();
      setSnapshot(result);
    } catch (e) {
      console.error('Oops, snapshot failed', e);
    }
  };



    return(

    <View style={styles.container}>
      {/* A View que será capturada */}
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
        <View style={styles.content}>
          <Text style={styles.title}>Conteúdo para Capturar</Text>
          <Text>Este é o texto que será incluído na imagem.</Text>
        </View>
      </ViewShot>

      <Button title="Capturar Tela" onPress={handleCapture} />

      {/* Exibe a prévia da captura */}
      {snapshot && (
        <View>
          <Text>Prévia da Captura:</Text>
          <Image
            source={{ uri: snapshot }}
            style={styles.imagePreview}
            resizeMode="contain"
          />
        </View>
      )}
    </View> 
    
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Login;