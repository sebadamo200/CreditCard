import React from 'react';

import {
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Dimensions, 
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Animated,  
} from "react-native";


import DropdownComponent from '../components/CustomDropDownMenu';
import CreditCardComponent from '../components/CrediCardComponent';
import CreditCardComponentBack from '../components/CrediCardComponentBack';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const dataMonths = () => {
  let months = [];
  for (let index = 1; index < 13; index++) {
    months.push({label: ''+index, value: ''+index});
  }
  return months;
}

const dataYears = () => {
  let years = [];
  for (let index = 0; index < 10; index++) {
    years.push({label: '202'+index, value: '202'+index});
  }
  for (let index = 0; index < 10; index++) {
    years.push({label: '203'+index, value: '203'+index});
  }
  return years;
};

const getTypeCard = (text : any) => {
  let number = text; 
  let re = new RegExp("^4");
  if (number.match(re) != null)
      return "visa";
  re = new RegExp("^(34|37)");
  if (number.match(re) != null)
      return "amex";
  re = new RegExp("^5[1-5]");
  if (number.match(re) != null)
      return "mastercard";
  re = new RegExp("^6011");
  if (number.match(re) != null)
      return "discover";
  re = new RegExp("^9792");
  if (number.match(re) != null)
      return "troy";
  return "visa"; // default type
};

export default function Index() {

  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [selectedYear, setSelectedYear] = React.useState(null);
  const [selectedCardNumber, setselectedCardNumber] = React.useState('');
  const [selectedCardHolder, setselectedCardHolder] = React.useState('');
  const [selectedCvv, setselectedCvv] = React.useState('');

  const [isFocusedNumber, setIsFocusedNumber] = React.useState(false);
  const [isFocusedName, setIsFocusedName] = React.useState(false);
  const [isFocusedCvv, setIsFocusedNameCvv] = React.useState(false);



  const onSelectMonth = (item : any) => {
    setSelectedMonth(item);
  };
  const onSelectYear = (item : any) => {
    setSelectedYear(item);
  };
  const createData =  (CardNumber: any, Card : any, month : any, year : any, cvv : any) =>{
    return {
      CardNumber : CardNumber,
      Card : Card,
      month : month,
      year : year,
      cvv : cvv,
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style = {styles.container}>
          {/* Credit Card component*/}
          {isFocusedCvv ? (
           <CreditCardComponentBack cvv = {selectedCvv} imageCard = {getTypeCard(selectedCardNumber)}/>
          ): (
            <CreditCardComponent MonthExpire={selectedMonth} yearExpire={selectedYear} textCardNumber={selectedCardNumber} textCardHolder={selectedCardHolder}/>
          )}
          <View style={styles.inputView}>
            <View style={styles.inputViewText}>
              <View style = {styles.inputVieuwCard}>
                    <Text style={{fontSize: 12, color :"#454545"}}>Card Number</Text>
                    <TextInput
                  onFocus={() => setIsFocusedNumber(true)}
                  onBlur={() => setIsFocusedNumber(false)}
                  style={[
                    styles.input,
                    { borderColor: isFocusedNumber ? "#3498DB" : "#CED6E0" },
                  ]}
                  onChangeText={(text) => setselectedCardNumber(text)} // Update state when text changes
                  value={selectedCardNumber}
                  keyboardType="numeric" 
                  maxLength={16}
                />
              </View>
              <View style = {styles.inputVieuwCard}>
                    <Text style={{fontSize: 12, color :"#454545"}}>Card Name</Text>
                    <TextInput
                    onFocus = {() => setIsFocusedName(true)}
                    onBlur={() => setIsFocusedName(false)}
                    style={[styles.input, {borderColor: isFocusedName ? '#3498DB' : '#CED6E0'}]}

                    onChangeText={(text) => setselectedCardHolder(text)}
                    value={selectedCardHolder}
                    />
              </View>
              <View style = {{flexDirection: 'row', alignItems : 'flex-end'}}>
                <View style={{marginRight: 8 }}>
                  <DropdownComponent labelText={'Expiration Months'} renderData={dataMonths()} onSelect={onSelectMonth} insideText={'Month'}/>
                </View>
                <View style={{marginRight: 20 }}>
                  <DropdownComponent labelText={'Expiration Year'} renderData={dataYears()} onSelect={onSelectYear} insideText={'Year'}/>
                </View>
                <View style = {{flex : 1}}>
                  <Text style={{fontSize : 10, paddingStart : 2,}}>CVV</Text>
                  <TextInput
                    style={[styles.input, {borderColor: isFocusedCvv ? '#3498DB' : '#CED6E0'}]}
                    keyboardType="numeric"
                    maxLength={3}
                    onFocus={() => setIsFocusedNameCvv(true)}
                    onBlur={() => setIsFocusedNameCvv(false)}
                    
                    onChangeText={(text) => setselectedCvv(text)}
                    value={selectedCvv}
                  />
                </View>
              </View>
            </View>
              <TouchableOpacity 
                style = {styles.submitButton}
                // This will be used to send card DATA
                onPress={() => {console.log(createData(selectedCardNumber, selectedCardHolder, selectedMonth, selectedYear, selectedCvv))}}
              >
                  <Text style = {{fontSize : 18, color : "white"}}>
                    Submit
                  </Text>
              </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor:"#D4EAFD",
    justifyContent:'center',
    alignItems:'center',
  },

  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    paddingTop : "15%", 
    paddingBottom : '8%',
    width: width * 0.95,
    height: height * 0.60,
    backgroundColor: "#FEFEFE",
    borderRadius: 10,
    justifyContent: 'space-evenly',
    position: 'absolute', // This is the Box position
    bottom: 0,
  },
  inputViewText: {
    height: '90%',
    justifyContent: 'space-evenly', // Ensures text starts at the top
    paddingTop: 20, // Adds spacing from the top
    //backgroundColor: '#92a685', // !!!!!!! TO BE REMOVED !!!!!!!
    borderRadius: 20,
    paddingHorizontal: 20,
  },

  inputVieuwCard : {
    marginVertical: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CED6E0',
    padding: 10,
    borderRadius: 8,
    color : "black",
  },
  
  submitButton : {
    backgroundColor : '#0055D4', 
    marginHorizontal : '5%',
    alignItems : "center",
    justifyContent : 'center',
    padding : 4,
    borderRadius : 8,
    height : 50, 
  },
});
