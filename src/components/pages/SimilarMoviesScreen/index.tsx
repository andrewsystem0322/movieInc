import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Title from '../../atoms/Title';
import EncryptedStorage from 'react-native-encrypted-storage';
import ButtonAction from '../../atoms/ButtonAction';
import {useNavigation} from '@react-navigation/native';
import {useHandleLoadingScreen} from '../../../hooks/Shared/useHandleLoadingScreen';
import NavBar from '../../molecules/NavBar';
import MovieCardComponent from '../../organisms/MovieCardComponent';
import {MovieCard} from '../../../models/MovieCard';
import useGetSimilarMovies from '../../../hooks/Movies/useGetSimilarMovies';

const SimilarMoviesScreen: React.FC = () => {
  const moviesLogo = require('../../../assets/png/MoviesIncLogo.png');
  const [upcomingMovies, setUpcomingMovies] = useState<MovieCard[]>([]);
  const {setIsLoading} = useHandleLoadingScreen();
  const navigation = useNavigation();
  const {getSimilarMovies} = useGetSimilarMovies();
  const routeState = navigation.getState();

  const paramsSimilarMoviesScreen = routeState.routes.find(element => {
    return element.key.includes('SimilarMoviesScreen');
  });

  const movieCardData =
    paramsSimilarMoviesScreen &&
    (paramsSimilarMoviesScreen.params as MovieCard);

  const removeUserSession = async () => {
    await EncryptedStorage.removeItem('user_session');
  };

  const handleLogOutPress = async (): Promise<void> => {
    setIsLoading(true);
    removeUserSession();
    setTimeout(() => {
      navigation.navigate('SignInScreen' as never);
      setIsLoading(false);
    }, 1500);
  };

  const handleGetUpcomingMovies = async (): Promise<void> => {
    const upcomingMoviesResponse = await getSimilarMovies(
      movieCardData?.id ?? '',
    );
    setUpcomingMovies(upcomingMoviesResponse.results);
  };

  useEffect(() => {
    handleGetUpcomingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerWrapper}>
      <ScrollView>
        <NavBar />
        <View style={styles.container}>
          <Image source={moviesLogo} style={styles.image} />
          <Title
            title={`Peliculas similares a: ${movieCardData?.title}`}
            fontSize={20}
          />
          {upcomingMovies.length > 0 ? (
            upcomingMovies.map((movie: MovieCard) => {
              return (
                <MovieCardComponent
                  movieUrlImage={{
                    uri: `https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`,
                  }}
                  movieDate={movie.release_date}
                  movieTitle={movie.title}
                  moviePercent={movie.vote_average}
                  movieId={movie.id}
                  moviePath={movie.poster_path}
                  movieOverview={movie.overview}
                  movieGenres={movie.genre_ids}
                  key={movie.id}
                />
              );
            })
          ) : (
            <ActivityIndicator size={95} color="yellow" />
          )}
          <ButtonAction
            onPressButton={handleLogOutPress}
            title="Cerrar sesión"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  containerWrapper: {
    flex: 1,
  },
});

export default SimilarMoviesScreen;
