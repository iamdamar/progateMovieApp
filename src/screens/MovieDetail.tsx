import React from 'react'
import { View, Text, Button } from 'react-native'

const MovieDetail = ({ navigation }: any): any => {
  const fetchData = (): void => {
    // Gantilah dengan akses token Anda
    const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWU4MmIxYzk0MDMwMDIxZjRjNGYyMThkYjdiOWU5ZSIsIm5iZiI6MTcxOTQ1MjczMi41NTkzMTQsInN1YiI6IjY2N2FjNzg3NWNhZmFjYmMwNzNiNjZkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lPX_vmo_8xZKvD_Cx83BRkvsKzgL8Pvf_qx3lX03k1Y'

    const url =
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Movie Detail Page</Text>
      <Button
        title="Fetch Data"
        onPress={() => {
          fetchData()
        }}
      />
    </View>
  )
}

export default MovieDetail