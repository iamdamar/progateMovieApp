import React, { useState } from 'react'
import {
  View, 
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native'
import { Movie } from '../../types/app';
import { getMovieList } from '../../types/movie';
import MovieItem from '../movies/MovieItem';

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    const url = `search/movie?query=${keyword}`;
    const moviesResponse = await getMovieList(url);
    setMovies(moviesResponse.data.results);
    setIsLoading(false);
    console.log("fetchMovies Search : ", movies);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 10, alignItems: "center" }}>
        <TextInput
          placeholder="Search movies..."
          value={keyword}
          onChangeText={setKeyword}
          style={{
            flex: 1,
            height: 40,
            borderColor: "#8978A4", 
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 20, 
            backgroundColor: "#FFF", 
            shadowColor: "#000", 
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, 
          }}
        />
        {isLoading ? (
          <ActivityIndicator style={{ marginLeft: 10 }} />
        ) : (
          <TouchableOpacity
            onPress={fetchMovies}
            style={{
              marginLeft: 10,
              backgroundColor: "#8978A4", 
              padding: 10,
              borderWidth: 0, 
              borderRadius: 20, 
              shadowColor: "#000", 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5, 
            }}
          >
            <Text style={{ color: "#FFF" }}>Search</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : movies.length > 0 ? (
        <FlatList
          data={movies}
          numColumns={3}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No movies found.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default KeywordSearch;