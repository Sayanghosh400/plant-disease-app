import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Home = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Home</Text>
            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        marginTop: hp('5%'),
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
    },

})