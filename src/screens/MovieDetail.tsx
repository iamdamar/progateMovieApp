import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../components/movies/MovieItem'


const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const navigation = useNavigation()
  const [movieDetails, setMovieDetails] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    getMovieDetails()
    getMovieRecommendations()
    checkIsFavorite()
  }, [id])

  const getMovieDetails = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieDetails(response)
      })
      .catch((errorResponse) => {
        console.error('Error fetching movie details:', errorResponse)
      })
  }

  const getMovieRecommendations = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setRecommendations(response.results) 
      })
      .catch((errorResponse) => {
        console.error('Error fetching movie recommendations:', errorResponse)
      })
  }

  const checkIsFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites')
      if (favorites !== null) {
        const favArray = JSON.parse(favorites)
        setIsFavorite(favArray.some(favMovie => favMovie.id === id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites')
      let favArray = favorites ? JSON.parse(favorites) : []

      if (isFavorite) {
        favArray = favArray.filter(favMovie => favMovie.id !== id)
      } else {
        favArray.push({ id, ...movieDetails })
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favArray))
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error(error)
    }
  }

  if (!movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.movieDetail}>Movie Detail</Text>
      </View>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}` }} 
        style={styles.movieImage}
      />
      <Text style={styles.title}>{movieDetails.title}</Text>
      <View style={styles.ratingRow}>
        <FontAwesome name="star" size={24} color="#ffd700" style={styles.starIcon} />
        <Text style={styles.rating}>{movieDetails.vote_average.toFixed(1)}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={24} color="red" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.synopsis}>{movieDetails.overview}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.column}>
          <Text style={styles.detail}>Original Language: {movieDetails.original_language}</Text>
          <Text style={styles.detail}>Release Date: {movieDetails.release_date}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.detail}>Popularity: {movieDetails.popularity.toFixed(2)}</Text>
          <Text style={styles.detail}>Vote Count: {movieDetails.vote_count}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.recommendationsTitle}>Recommendations</Text> 
      </View>
      <FlatList
        horizontal
        data={recommendations} 
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={{ width: 100, height: 160 }} 
            coverType="poster" 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        style={styles.recommendationsList} 
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: -12,
  },
  backButton: {
    marginRight: 10,
  },
  movieDetail: {
    fontSize: 18,
    fontWeight: 'medium',
  },
  favoriteButton: {
    marginLeft: 'auto',
  },
  movieImage: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    marginBottom: 0,
    paddingLeft: 8,
  },
  synopsis: {
    fontSize: 12,
    marginBottom: 12,
  },
  detail: {
    fontSize: 12,
    marginBottom: 0,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendationsTitle: { 
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recommendationsList: { 
    paddingLeft: 4,
    
  },
  detailsContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  column: { 
    flex: 1,
  },
  purpleLabel: {
    width: 2,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  footer: {
    marginLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
})

export default MovieDetail
