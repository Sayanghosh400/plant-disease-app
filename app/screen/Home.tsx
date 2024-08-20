import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import BigButton from '../components/BigButton';
import RotatingLoader from '../components/RotatingLoader';

const Home = () => {

    const [plantImage, setPlantImage] = useState('')

    const [diseaseResult, setDiseaseResult] = useState('')

    const [loading, setLoading] = useState(false)

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPlantImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const handleSubmit = async () => {
        if (!plantImage) {
          alert("No file selected");
          return;
        }
    
        setLoading(true);
        const formData = new FormData();
        formData.append('file', plantImage);
    
        try {
          const response = await fetch('https://leaf-disease-detection-backend.onrender.com/process_input', {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          console.log('Result:', result);
          setDiseaseResult(result.result);
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Failed to upload file');
        } finally {
          setLoading(false);
        }
      };

    return (
        <ScrollView>
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={pickImageAsync}
                    style={[styles.imgContainer,
                    plantImage ?
                        { opacity: 1 } :
                        { opacity: 0.7 }
                    ]}
                >
                    <Text style={[styles.text, { fontSize: 25, position: 'absolute', marginTop: hp('36%'), alignSelf: 'center' }]}>Upload Image</Text>
                    <Image
                        source=
                        {plantImage ?
                            { uri: plantImage } :
                            require('../../assets/images/unnamed.png')
                        }
                        style={styles.img}
                    />
                </TouchableOpacity>

                <BigButton
                    buttontxt="Detect Disease"
                    onPress={() => handleSubmit()}
                    styling={{ marginTop: hp('5%') }}
                    isDisabled={plantImage ? false : true}
                />

                <View style={styles.resultContainer}>
                    <Text style={[styles.text, { color: '#355E3B', marginBottom: hp('2%') }]}>Result will be displayed here</Text>
                    <Text style={[styles.text, { color: '#2E8B57' }]}>Detected Disease:</Text>
                    <Text style={[styles.text, { color: '#2E8B57' }]}>{diseaseResult}</Text>
                    <Text style={[styles.text, { color: '#2E8B57' }]}>Solution :</Text>
                    <Text style={[styles.text, { color: '#2E8B57' }]}>loremsadsadsadada</Text>
                </View>

            </View>
            {loading && <RotatingLoader imageSource={require('../../assets/images/loader.jpg')} />}
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
    img: {
        width: wp('90%'),
        height: hp('45%'),
        borderRadius: 20,
        elevation: 10,
    },
    imgContainer: {
        marginTop: hp('10%'),
        alignSelf: 'center',
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
    },
    text: {
        fontFamily: 'monospace',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    resultContainer: {
        marginTop: hp('5%'),
        marginBottom: hp('5%'),
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
    },
    sameArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

})