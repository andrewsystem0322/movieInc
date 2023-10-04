import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Title from '../../atoms/Title';
import Input from '../../atoms/Input';
import ButtonAction from '../../atoms/ButtonAction';
import {useNavigation} from '@react-navigation/native';
import {useHandleLoadingScreen} from '../../../hooks/Shared/useHandleLoadingScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import useGetGuestSession from '../../../hooks/auth/useGetActorsSelectedMovie';

const SignInScreen: React.FC = () => {
  const BackgroundMoviesInc = require('../../../assets/png/MoviesIncLogo.png');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const {setIsLoading, isLoading} = useHandleLoadingScreen();
  const {getGuestSession} = useGetGuestSession();
  const navigation = useNavigation();

  const handleSignInPress = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const respSignIn = await getGuestSession();
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          username: userEmail,
          sessionId: respSignIn.guest_session_id,
        }),
      );
      if (
        userEmail.toLowerCase() === 'moviesinccliente@yopmail.com' &&
        userPassword === '12345678'
      ) {
        setTimeout(() => {
          navigation.navigate('HomeScreen' as never);
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerWrapper}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={BackgroundMoviesInc} style={styles.image} />
          <View style={styles.titleContainer}>
            <Title title="Ingrese su usuario y contraseña" fontSize={20} />
          </View>
          <View style={styles.inputsContainer}>
            <Input
              inputType={userEmail}
              keyboardType="email-address"
              placeholder="Ingrese su email"
              onChangeText={setUserEmail}
              inputWidth={300}
            />
            <Input
              inputType={userPassword}
              keyboardType="phone-pad"
              placeholder="Ingrese su contraseña"
              onChangeText={setUserPassword}
              inputWidth={300}
            />
          </View>
          <ButtonAction
            onPressButton={handleSignInPress}
            isLoading={isLoading}
            title="Iniciar sesión"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  titleContainer: {
    maxWidth: '80%',
    marginTop: -20,
  },
  inputsContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default SignInScreen;
