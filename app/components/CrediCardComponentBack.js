import React, { useEffect } from 'react';

import {
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  Image, 
  ImageBackground, 
} from "react-native";

// Windows Dimensions //
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
  
  const imagesCard = {
    visa: require('../../assets/images/visa.png'),
    amex: require('../../assets/images/amex.png'),
    mastercard: require('../../assets/images/mastercard.png'),
    discover: require('../../assets/images/discover.png'),
    troy: require('../../assets/images/troy.png'),
  }
  


const CreditCardComponentBack = ({cvv, imageCard}) => {
    const [text, onChangeText] = React.useState('');
    const [ImageCard, setImageCard] = React.useState('');

    useEffect(() => {
      onChangeText(cvv || '***');
    }, [cvv]);
    
    // Sync card holder name with cardHolderProp prop
    useEffect(() => {
      setImageCard(imageCard || 'visa'); // default card is visa
    }, [imageCard]);

    return (
        <ImageBackground 
        source={require('../../assets/images/10.jpeg')}
        imageStyle={{ borderRadius: 20, resizeMode: 'stretch'}}
        style={styles.creditCard}
      >
        <View style={[styles.creditAndVisaView, {backgroundColor : 'black', height : 40, opacity : 0.8,}]}>
        </View> 
        <View style={{alignItems : 'flex-end', justifyContent : 'center', paddingHorizontal : 10}}>
          <Text style={[styles.crediText]}>CVV</Text>
          <View style = {{backgroundColor : "#ffffff", padding : 10, width: '100%', borderRadius : 4, justifyContent : 'center', alignItems : 'flex-end'}}>
            <Text style = {styles.crediTextText}>{text}</Text>
          </View>
        </View>
        <View style={styles.bottomNumbers}>
          <Image source = {imagesCard[ImageCard]} style={styles.crediCardLogo}/>
        </View>
      </ImageBackground>
    );
};

export default CreditCardComponentBack;

const styles = StyleSheet.create({
   creditCard:{
      width: width*0.85,
      height: height*0.25,
      backgroundColor: '#FF3366',
      borderRadius: 20,
      justifyContent: 'space-evenly',
      alignSelf: 'center',

      position: 'absolute', 
      top: '18%',           // 18% from the top, like a push down at 18%
      zIndex: 1,           // this component is on top of the other components
   },
   creditAndVisaView :{
    flexDirection : 'row',
    alignItems: 'center',
   },
   crediText: {
      color : '#000000',
      fontSize : 12,
      letterSpacing: 2,
      bottom: 1,
   },
   crediTextText: {
    color : '#000000',
    fontSize : 16,
    letterSpacing: 3,
  },
   
   crediCardLogo : {
    width: 50,
    height: 50,
    resizeMode: 'contain',
   },
   chipLogo : {
    width: 40,
    height: 40,
    resizeMode: 'contain',
   },
   mainNumbers : {
    //backgroundColor : '#2718f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    padding: 10,
   },
   numbersStyle : {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    letterSpacing: 3,
    textAlign : 'center',
   },
   bottomNumbers : {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor: '#e5a0ac',
   },
   cardHolder : {
    flexDirection: 'column',
    alignItems: 'flex-start',
    // This must be Dynamic
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingEnd: 5,
    paddingStart: 5,
   },
   cardExpire : {
    flexDirection: 'column',
    alignItems: 'flex-start',
    // This must be dynamic
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingEnd: 5,
    paddingStart: 5,
   },
   topText : {
    fontFamily: 'Optima',
    color: '#FFFFFF',
    fontWeight : 'bold',
    // make it transparent
    opacity: 0.8,
  
   },
   bottomText :{
      color: '#FFFFFF',
   },
  });