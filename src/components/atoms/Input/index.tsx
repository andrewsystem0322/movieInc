import React, {Dispatch} from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput} from 'react-native';
// import {
//   FooterContent,
//   BottomRow,
//   LearnMoreText,
//   StyledSafeArea,
//   FooterOptions,
//   IconContainer,
// } from './styles';

interface Props {
  inputType: string;
  keyboardType: KeyboardTypeOptions;
  placeholder: string;
  onChangeText: Dispatch<string>;
  inputWidth: number;
}

const Input: React.FC<Props> = ({
  inputType,
  keyboardType,
  placeholder,
  onChangeText,
  inputWidth,
}) => {
  return (
    <TextInput
      value={inputType}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      style={styles(inputWidth).input}
    />
  );
};

const styles = (inputWidth: number) =>
  StyleSheet.create({
    input: {
      fontSize: 19,
      fontWeight: '500',
      color: 'black',
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 7,
      marginVertical: 10,
      width: inputWidth,
    },
  });

export default Input;
