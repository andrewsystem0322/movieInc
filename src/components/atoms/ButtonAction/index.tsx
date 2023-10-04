import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  onPressButton: () => void;
  title: string;
  isLoading?: boolean;
}

const ButtonAction: React.FC<Props> = ({onPressButton, title, isLoading}) => {
  return (
    <TouchableOpacity
      onPress={() => onPressButton()}
      style={isLoading ? styles.buttonSelected : styles.button}>
      {isLoading ? (
        <ActivityIndicator size={25} color="yellow" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    color: 'white',
    fontWeight: '700',
  },
  button: {
    width: 200,
    height: 40,
    dislpay: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f04400',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  buttonSelected: {
    width: 200,
    height: 40,
    dislpay: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f6a269',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
});

export default ButtonAction;
