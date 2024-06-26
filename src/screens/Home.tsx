import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function Home(): JSX.Element {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>
                Home
            </Text>
            <Button
                title='Go to Movie Detail'
                onPress={() => navigation.navigate('MovieDetail')}
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