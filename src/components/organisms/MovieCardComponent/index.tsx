import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  movieUrlImage: ImageSourcePropType;
  movieTitle: string;
  movieDate: string;
  moviePercent: string;
  movieId: string;
  moviePath?: string;
  movieOverview?: string;
  movieGenres?: number[];
}

const MovieCardComponent: React.FC<Props> = ({
  movieUrlImage,
  movieTitle,
  movieDate,
  moviePercent,
  movieId,
  moviePath,
  movieOverview,
  movieGenres,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();

  const handlePressCard = () => {
    if (route.name !== 'HomeScreen' && route.name !== 'SimilarMoviesScreen') {
      navigation.navigate('MovieDetailScreen', {
        id: movieId,
        poster_path: moviePath,
        release_date: movieDate,
        title: movieTitle,
        vote_average: moviePercent,
        overview: movieOverview,
        genre_ids: movieGenres,
      });
    }
  };

  return (
    <View style={styles.movieCardContainer}>
      <TouchableOpacity onPress={() => handlePressCard()}>
        <Image source={movieUrlImage} style={styles.moviImage} />
        <Text style={styles.title}>{movieTitle}</Text>
        <Text style={styles.date}>{movieDate}</Text>
        {route.name !== 'SimilarMoviesScreen' && (
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{moviePercent}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    paddingRight: 20,
    color: '#000000',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
    paddingRight: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  score: {
    zIndex: 15,
    color: '#f86a09',
  },
  scoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 300,
    left: 10,
    backgroundColor: '#fadd8a',
    width: 35,
    height: 35,
    borderRadius: 50,
    zIndex: 10,
    borderWidth: 3,
    borderColor: '#f6a269',
  },
  movieCardContainer: {
    width: 250,
    height: 450,
    dislpay: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
  optionsContainer: {
    dislpay: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    verticalAlign: 'middle',
  },
  moviImage: {
    width: 250,
    height: 355,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default MovieCardComponent;
