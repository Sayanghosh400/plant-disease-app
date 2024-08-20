import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Image, ImageSourcePropType, Easing } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface RotatingLoaderProps {
    imageSource: ImageSourcePropType;
}

const RotatingLoader: React.FC<RotatingLoaderProps> = ({ imageSource }) => {
    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        animation.start();

        return () => animation.stop();
    }, [rotateValue]);

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.loadingContainer}>
            <Animated.Image
                source={imageSource}
                style={[styles.loader, { transform: [{ rotate }] }]}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: hp('111%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        width: 100,
        height: 100,
    },
});

export default RotatingLoader;
