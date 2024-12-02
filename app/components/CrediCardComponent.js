import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';

// Windows Dimensions //
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// UTILS //  !!FIXED!!
const renderCardNumberWithSpaces = (text) => {
  const cardArray = [];
  let amexExp = false;
  if (text[0] === '3'  && (text[1] === '4' || text[1] === '7')) {
    amexExp = true;
  }
  for (let index = 0; index < (amexExp ? 15 : 16); index++) {    
    cardArray.push(text[index] || '#');
    // render with spaces if it's not an amex card then add space every 4 digits
    // if amex then add space after 4th and 10th digit
    if ((amexExp && (index === 3 || index === 9)) || (!amexExp && index % 4 === 3 && index < 15)) {
      cardArray.push(' '); // added space
    }
  }

  return cardArray;
};

const getTypeCard = (text) => {
  let number = text;
  let re = new RegExp('^4');
  if (number.match(re) != null) return 'visa';
  re = new RegExp('^(34|37)');
  if (number.match(re) != null) return 'amex';
  re = new RegExp('^5[1-5]');
  if (number.match(re) != null) return 'mastercard';
  re = new RegExp('^6011');
  if (number.match(re) != null) return 'discover';
  re = new RegExp('^9792');
  if (number.match(re) != null) return 'troy';
  return 'visa'; // default type
};

const imagesCard = {
  visa: require('../../assets/images/visa.png'),
  amex: require('../../assets/images/amex.png'),
  mastercard: require('../../assets/images/mastercard.png'),
  discover: require('../../assets/images/discover.png'),
  troy: require('../../assets/images/troy.png'),
};

const CreditCardComponent = ({ MonthExpire, yearExpire, textCardNumber, textCardHolder }) => {
  const [digits, setDigits] = React.useState(renderCardNumberWithSpaces(''));
  const [cardHolder, setCardHolder] = React.useState('');
  const animationRefs = useRef(digits.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    const newDigits = renderCardNumberWithSpaces(textCardNumber || '');
    const animations = [];

    newDigits.forEach((digit, index) => {
      if (digit !== digits[index]) {
        // Animate out
        animations.push(
          Animated.timing(animationRefs[index], {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          })
        );
      }
    });

    Animated.stagger(10, animations).start(() => {
      setDigits(newDigits);

      // Animate in the updated digits
      const fadeInAnimations = newDigits.map((_, index) =>
        Animated.timing(animationRefs[index], {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      );
      Animated.stagger(50, fadeInAnimations).start();
    });
  }, [textCardNumber]);

  useEffect(() => {
    setCardHolder(textCardHolder || '');
  }, [textCardHolder]);

  return (
    <ImageBackground
      source={require('../../assets/images/10.jpeg')}
      imageStyle={{ borderRadius: 20, resizeMode: 'stretch' }}
      style={styles.creditCard}
    >
      <View style={styles.creditAndVisaView}>
        <Image source={require('../../assets/images/chip.png')} style={styles.chipLogo} />
        {textCardNumber ? (
          <Image source={imagesCard[getTypeCard(textCardNumber)]} style={styles.crediCardLogo} />
        ) : (
          <Image source={require('../../assets/images/visa.png')} style={styles.crediCardLogo} />
        )}
      </View>
      <View style={styles.mainNumbers}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {digits.map((digit, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.numbersStyle,
                {
                  opacity: animationRefs[index],
                  transform: [{ scale: animationRefs[index] }],
                },
              ]}
            >
              {digit}
            </Animated.Text>
          ))}
        </View>
      </View>
      <View style={styles.bottomNumbers}>
        <View style={styles.cardHolder}>
          <Text style={styles.topText}>Card Holder</Text>
          {cardHolder ? (
            <Text style={styles.bottomText}>{cardHolder}</Text>
          ) : (
            <Text style={styles.bottomText}>FULL NAME</Text>
          )}
        </View>
        <View style={styles.cardExpire}>
          <Text style={styles.topText}>Expires</Text>
          {MonthExpire && yearExpire ? (
            <Text style={styles.bottomText}>{MonthExpire + '/' + yearExpire}</Text>
          ) : MonthExpire && !yearExpire ? (
            <Text style={styles.bottomText}>{MonthExpire + '/YY'}</Text>
          ) : !MonthExpire && yearExpire ? (
            <Text style={styles.bottomText}>{'MM/' + yearExpire}</Text>
          ) : (
            <Text style={styles.bottomText}>MM/YY</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default CreditCardComponent;

const styles = StyleSheet.create({
  creditCard: {
    width: width * 0.85,
    height: height * 0.25,
    backgroundColor: '#FF3366',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
    position: 'absolute',
    top: '18%',
    zIndex: 1,
  },
  creditAndVisaView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crediCardLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  chipLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  mainNumbers: {
    height: "30%",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  numbersStyle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    letterSpacing: 1,
    textAlign: 'center',
    marginHorizontal: 2,
  },
  bottomNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHolder: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingEnd: 5,
    paddingStart: 5,
  },
  cardExpire: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingEnd: 5,
    paddingStart: 5,
  },
  topText: {
    fontFamily: 'Optima',
    color: '#FFFFFF',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  bottomText: {
    color: '#FFFFFF',
  },
});
