import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MovieItem from '../components/movies/MovieItem';

export default function Favorite(): JSX.Element {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites !== null) {
        setFavorites(JSON.parse(favorites));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = (id: number) => {
    navigation.navigate('MovieDetail', { id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item.id)}>
              <MovieItem movie={item} size={{ width: 100, height: 160 }} coverType="poster" />
            </TouchableOpacity>
          )}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorites added yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noFavoritesText: {
    fontSize: 16,
    color: 'gray',
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
});
