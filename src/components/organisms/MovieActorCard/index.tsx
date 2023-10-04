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
  actorUrlImage: ImageSourcePropType;
  actorName: string;
  actorCharacter: string;
}

const MovieActorCard: React.FC<Props> = ({
  actorUrlImage,
  actorName,
  actorCharacter,
}) => {
  return (
    <View style={styles.movieCardContainer}>
      <TouchableOpacity>
        <Image source={actorUrlImage} style={styles.moviImage} />
        <Text style={styles.name}>{actorName}</Text>
        <Text style={styles.character}>{actorCharacter}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: '700',
    paddingRight: 20,
    color: '#000000',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  character: {
    fontSize: 15,
    fontWeight: '700',
    paddingRight: 20,
    paddingHorizontal: 10,
  },
  movieCardContainer: {
    width: 150,
    height: 270,
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
    width: 150,
    height: 170,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default MovieActorCard;
