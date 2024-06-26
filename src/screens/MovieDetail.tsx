import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function MovieDetail(): JSX.Element {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>
                Movie Detail
            </Text>
            <Button
                title='Go to Home'
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})