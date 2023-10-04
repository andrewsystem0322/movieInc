import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Title from '../../atoms/Title';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../../molecules/NavBar';
import MovieCardComponent from '../../organisms/MovieCardComponent';
import {MovieCard} from '../../../models/MovieCard';
import {ActorCard} from '../../../models/actorCard';
import useGetActorsSelectedMovie from '../../../hooks/Movies/useGetActorsSelectedMovie';
import MovieActorCard from '../../organisms/MovieActorCard';
import StarRating from 'react-native-star-rating-widget';
import EncryptedStorage from 'react-native-encrypted-storage';
import usePostRatingMovie from '../../../hooks/Movies/usePostRatingMovie';
import useGetMoviesGenres from '../../../hooks/Movies/useGetMoviesGenres';
import {MovieGenres} from '../../../models/movieGenres';
import ButtonAction from '../../atoms/ButtonAction';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const MovieDetailScreen: React.FC = () => {
  //global hooks
  const {getActorsSelectedMovie} = useGetActorsSelectedMovie();
  const {getMoviesGenres} = useGetMoviesGenres();
  const {postRatingMovie} = usePostRatingMovie();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const routeState = navigation.getState();
  const [rating, setRating] = useState(0);

  //local data
  const paramsMovieDetailScreen = routeState.routes.find(element => {
    return element.key.includes('MovieDetailScreen');
  });
  const movieCardData =
    paramsMovieDetailScreen && (paramsMovieDetailScreen.params as MovieCard);
  const [actorsMovieSelected, setActorsMovieSelected] = useState<ActorCard[]>(
    [],
  );
  const [genresMovieSelected, setGenresMovieSelected] = useState<MovieGenres[]>(
    [],
  );

  //local functions
  const handleGetUpcomingMovies = async (): Promise<void> => {
    const upcomingMoviesResponse = await getActorsSelectedMovie(
      movieCardData?.id ?? '1',
    );
    setActorsMovieSelected(upcomingMoviesResponse.cast);
  };

  const handleGetGenres = async (): Promise<void> => {
    const genresResponse = await getMoviesGenres();
    if (movieCardData?.genre_ids !== undefined) {
      for (const elemento of genresResponse.genres) {
        if (movieCardData.genre_ids.includes(elemento.id as never)) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          setGenresMovieSelected(genresMovieSelected => [
            ...genresMovieSelected,
            elemento,
          ]);
        }
      }
    }
  };

  const handleSetRate = async (
    idMovie: string,
    rate: number,
  ): Promise<void> => {
    const session = await EncryptedStorage.getItem('user_session').then(req =>
      JSON.parse(req ?? ''),
    );
    setRating(rate);
    await postRatingMovie(idMovie, session.sessionId, rate);
    Alert.alert('Hemos enviado su calificación, gracias por su opinión.');
  };

  useEffect(() => {
    handleGetUpcomingMovies();
    handleGetGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerWrapper}>
      <ScrollView>
        <NavBar />
        <View style={styles.container}>
          {movieCardData !== undefined ? (
            <>
              <MovieCardComponent
                movieUrlImage={{
                  uri: `https://www.themoviedb.org/t/p/w440_and_h660_face${movieCardData.poster_path}`,
                }}
                movieDate={movieCardData.release_date}
                movieTitle={movieCardData.title}
                moviePercent={movieCardData.vote_average}
                movieId={movieCardData.id}
                movieOverview={movieCardData.overview}
              />
              <Title title="Genero:" fontSize={20} />
              <TouchableOpacity style={styles.genreContainer}>
                {genresMovieSelected.length > 0 ? (
                  genresMovieSelected.map((genre: MovieGenres) => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })
                ) : (
                  <ActivityIndicator size={55} color="yellow" />
                )}
              </TouchableOpacity>
              <StarRating
                rating={rating}
                onChange={rate => handleSetRate(movieCardData.id, rate)}
                style={styles.rate}
              />
            </>
          ) : (
            <ActivityIndicator size={95} color="yellow" />
          )}
          <Title title="Descripción:" fontSize={20} />
          <Text style={styles.subtitle}>{movieCardData?.overview}</Text>
          <Title
            title="¿Quiere ver peliculas similares?"
            fontSize={20}
            marginTop={30}
          />
          <ButtonAction
            onPressButton={() =>
              navigation.navigate('SimilarMoviesScreen', {
                title: movieCardData?.title,
                id: movieCardData?.id,
              })
            }
            title="Ver"
          />
          <Title title="Casting:" fontSize={20} marginTop={40} />
          {actorsMovieSelected.length > 0 ? (
            actorsMovieSelected.map((actor: ActorCard) => {
              return (
                <MovieActorCard
                  actorUrlImage={{
                    uri: `https://www.themoviedb.org/t/p/w276_and_h350_face/${actor.profile_path}`,
                  }}
                  actorName={actor.character}
                  actorCharacter={actor.name}
                  key={actor.id}
                />
              );
            })
          ) : (
            <ActivityIndicator size={95} color="yellow" />
          )}
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
  rate: {
    marginBottom: 20,
  },
  containerWrapper: {
    flex: 1,
  },
  genreContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  genre: {
    fontSize: 14,
    fontWeight: '700',
    paddingLeft: 10,
  },
});

export default MovieDetailScreen;
