// https://github.com/hoaphantn7604/react-native-element-dropdown?tab=readme-ov-file
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DropdownComponent = ({labelText, renderData, onSelect, insideText}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelText}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#3498DB' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={renderData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? <Text style = {{color : '#454545'}}>{insideText}</Text> : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          if (onSelect) {
            onSelect(item.value);
          }
        }}
        dropdownPosition= 'top'
        containerStyle={{borderRadius: 8}} // This is to style the container of the dropdown !Like The List!

      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection : 'column',
    width: width * 0.30,
  },
  dropdown: {
    height: 50,
    borderColor: '#CED6E0',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    color : '#454545',
    position: 'static',
    paddingStart: 4,
    fontSize: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});