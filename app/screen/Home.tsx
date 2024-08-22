import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import BigButton from '../components/BigButton';
import RotatingLoader from '../components/RotatingLoader';
import * as FileSystem from 'expo-file-system';

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

        try {
            const fileInfo = await FileSystem.getInfoAsync(plantImage);
            const fileUri = fileInfo.uri;
            const fileName = fileUri.split('/').pop() || 'uploaded_image';
            const fileType = fileName.split('.').pop() || 'jpeg';

            // Create a FormData object and append the file information
            const formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                name: fileName,
                type: `image/${fileType}`,
            } as any);  // Cast to `any` to bypass TypeScript error

            const response = await fetch('https://leaf-disease-detection-backend.onrender.com/process_input', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await response.json();
            console.log("Result", result.result);
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
                    <Text style={[styles.text, { fontSize: 25, position: 'absolute', marginTop: hp('32%'), alignSelf: 'center' }]}>Upload Image</Text>
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
                    styling={[{ marginBottom: hp('10%') }]}
                    isDisabled={plantImage ? false : true}
                />

                <View style={!loading ? [{ height: hp('60%') }]: [{ height: hp('45%') }]}>
                    {diseaseResult && !loading &&
                        <View style={styles.resultContainer}>

                            <Text style={[styles.text, { color: '#2E8B57' }]}>{diseaseResult}</Text>
                            <Text style={[styles.text, { color: '#2E8B57', marginTop: hp('2%'), marginBottom: hp('2%') }]}>Here are some solutions:</Text>

                            <Text style={styles.solutionText}>a. Ensure proper watering and avoid overwatering.</Text>
                            <Text style={styles.solutionText}>b. Remove and dispose of infected leaves.</Text>
                            <Text style={styles.solutionText}>c. Apply organic fungicide if necessary.</Text>
                            <Text style={styles.solutionText}>d. Maintain good air circulation around the plants.</Text>

                        </View>
                    }
                </View>

            </View>
            {loading &&
                <RotatingLoader imageSource={require('../../assets/images/loader.png')}
                />
            }
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
        width: wp('80%'),
        height: hp('40%'),
        borderRadius: 20,
        elevation: 10,
    },
    imgContainer: {
        marginTop: hp('5%'),
        borderRadius: 10,
        alignSelf: 'center',
        elevation: 10,
        shadowColor: 'green',
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
        marginTop: hp('2%'),
        marginBottom: hp('10%'),
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'green',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
    },
    sameArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    solutionText: {
        fontSize: 17,
        color: '#478778',
        marginTop: hp('1%'),
        width: wp('70%'),
    },

})