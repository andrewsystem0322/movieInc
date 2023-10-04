import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  title: string;
  fontSize: number;
  marginTop?: number;
}

const Title: React.FC<Props> = ({title, fontSize, marginTop}) => {
  return <Text style={styles(fontSize, marginTop).title}>{title}</Text>;
};

const styles = (fontSize: number, marginTop?: number) =>
  StyleSheet.create({
    title: {
      fontSize: fontSize,
      fontWeight: '700',
      color: 'black',
      textAlign: 'center',
      marginTop: marginTop,
    },
  });

export default Title;
