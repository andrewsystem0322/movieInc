import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const NavBar: React.FC = () => {
  const moviesLogo = require('../../../assets/png/Logo.png');
  const navigation = useNavigation();
  const [showNavBarOptions, setShowNavBarOptions] = useState(false);
  return (
    <>
      <View style={styles.navBarContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen' as never)}>
          <Image source={moviesLogo} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.navBarContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen' as never)}>
            <Text style={styles.title}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowNavBarOptions(!showNavBarOptions)}>
            <Text style={styles.title}>Movies</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showNavBarOptions && (
        <View style={styles.navBarContainerOptions}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NowPlayingMoviesScreen' as never)
            }>
            <Text style={styles.title}>Reproduciendo ahora</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
    paddingRight: 20,
  },
  navBarContainer: {
    width: 'auto',
    height: 55,
    dislpay: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f6a269',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingTop: 8,
  },
  navBarContainerOptions: {
    width: 'auto',
    height: 55,
    dislpay: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fadd8a',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: -5,
    paddingTop: 8,
  },
  optionsContainer: {
    dislpay: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    verticalAlign: 'middle',
  },
  logo: {
    width: 80,
    height: 80,
  },
});

export default NavBar;
