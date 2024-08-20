import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface BigButtonProps {
    buttontxt: string
    isDisabled?: boolean
    onPress: () => void
    styling?: any
}

const BigButton = ({ buttontxt, onPress, isDisabled, styling }: BigButtonProps) => {
    return (
        <TouchableOpacity
            disabled={isDisabled}
            onPress={onPress}
            style={{ ...styles.button, ...styling, 
                ['shadowColor']: isDisabled ? 'grey' : ['#FEBB1B'], 
                ['backgroundColor']: isDisabled ? '#C1E1C1' : '#2C5417'
            }}
        >
            <Text style={{ ...styles.buttonText, fontSize: buttontxt.length > 15 ? 15 : 18 }}>{buttontxt}</Text>
        </TouchableOpacity>
    )
}

export default BigButton

const styles = StyleSheet.create({
    button: {
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
        height: 60,
        width: wp('90%'),
        borderRadius: 30,
        backgroundColor: '#2C5417',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FEBB1B',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 10,
    },
    buttonText: {
        fontFamily: 'monospace',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
})