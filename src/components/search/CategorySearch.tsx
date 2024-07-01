import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import MovieItem from '../movies/MovieItem';
import { Movie, MovieGenre } from '../../types/app';
import { getGenreList, getMovieByGenre } from '../../types/movie';

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
};

export default function Search(): JSX.Element {
  const [isGenresLoading, setIsGenresLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsGenresLoading(true);
      const genresResponse = await getGenreList();
      setGenres(genresResponse.responseData);
      setIsGenresLoading(false);
    };
    fetchGenres();
    console.log("fetchGenres", genres);
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const fetchMovies = async () => {
        setIsLoading(true);
        const moviesResponse = await getMovieByGenre(selectedGenre);
        setMovies(moviesResponse.responseData);
        setIsLoading(false);
      };
      fetchMovies();
    }
  }, [selectedGenre]);

  return (
    <View>
      {isGenresLoading ? (
        <ActivityIndicator size="large" style={{ marginTop: 15 }} />
      ) : (
        <ScrollView style={{ marginTop: 10 }} horizontal>
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              onPress={() => setSelectedGenre(genre.id)}
              style={{
                backgroundColor: selectedGenre === genre.id ? "#8978A4" : "#C0B4D5",
                padding: 10,
                margin: 5,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white' }}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={{ marginTop: 10 }}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              coverType="poster"
              size={coverImageSize.poster}
            />
          )}
          numColumns={3}
        />
      )}
    </View>
  );
};