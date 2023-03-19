import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native'
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';

const Goals = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        'Lemon-Milk': require('./fonts/LEMONMILK-Regular.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    function formatPercent(num) {
        var formatted;

        if (num == 'NaN') {
            formatted = 0;
        }

        formatted = Math.floor(num * 100)

        if (formatted > 100) {
            formatted = 100;
        }

        return formatted;
    }

    function colorPicker(num) {
        var color;
        
        if (num <= 33)
            color = '#F1A7B0'
        else if (num <= 67)
            color = '#FFEA7F'
        else
            color = '#BCF4A6'

        return color
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView style={styles.container}>
                <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                }}></LinearGradient>
                <View style={{
                    top: '5%'
                }}>
                    <Text style={[styles.shadowProp, {
                        fontFamily: 'Lemon-Milk',
                        textAlign: 'center',
                        color: '#ffffff',
                        fontSize: 60,
                    }]}>Goals</Text>
                    <View style={[styles.shadowProp, {
                        marginRight: '70%',
                    }]}>
                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                            style={[styles.navButtons, { backgroundColor: 'transparent' }]}>
                            <Image source={require('./images/globalButtons/home.png')} style={{ marginTop: '-150%', tintColor: 'white', width: '70%', height: '70%', resizeMode: 'contain', alignSelf: 'center', top: '15%' }} />
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.shadowProp, styles.goalContainer, {
                    marginTop: '10%',
                }]}>
                    <Text style={[styles.goalText, { textAlign: 'center' }]}>Exercise</Text>
                    <Progress.Bar progress={global.progressToGoals[0]} width={300} height={20} borderColor={'#b5e8ff'} color={colorPicker(formatPercent(global.progressToGoals[0]))} style={[styles.shadowProp, {
                        alignSelf: 'center',
                        marginTop: '3%'
                    }]} />
                    <Text style={[styles.goalText, { alignSelf: 'center', fontSize: 20, marginTop: 5 }]}>{`${formatPercent(global.progressToGoals[0])}%`}</Text>

                </View>
                <View style={[styles.shadowProp, styles.goalContainer, {
                    marginTop: '5%',
                }]}>
                    <Text style={[styles.goalText, { textAlign: 'center' }]}>Nutrition</Text>
                    <Progress.Bar progress={global.progressToGoals[1]} width={300} height={20} borderColor={'#b5e8ff'} color={colorPicker(formatPercent(global.progressToGoals[1]))} style={[styles.shadowProp, {
                        alignSelf: 'center',
                        marginTop: '3%'
                    }]} />
                    <Text style={[styles.goalText, { alignSelf: 'center', fontSize: 20, marginTop: 5 }]}>{`${formatPercent(global.progressToGoals[1])}%`}</Text>

                </View>
                <View style={[styles.shadowProp, styles.goalContainer, {
                    marginTop: '5%',
                }]}>
                    <Text style={[styles.goalText, { textAlign: 'center' }]}>Water</Text>
                    <Progress.Bar progress={global.progressToGoals[2]} width={300} height={20} borderColor={'#b5e8ff'} color={colorPicker(formatPercent(global.progressToGoals[2]))} style={[styles.shadowProp, {
                        alignSelf: 'center',
                        marginTop: '3%'
                    }]} />
                    <Text style={[styles.goalText, { alignSelf: 'center', fontSize: 20, marginTop: 5 }]}>{`${formatPercent(global.progressToGoals[2])}%`}</Text>

                </View>
                <View style={[styles.shadowProp, styles.goalContainer, {
                    marginTop: '5%',
                }]}>
                    <Text style={[styles.goalText, { textAlign: 'center' }]}>Sleep</Text>
                    <Pressable
                    onPress={() => navigation.navigate('Goal Calendar')}
                    style={[styles.shadowProp, styles.smallButton, {
                        marginTop: -40,
                        marginLeft: '10%',
                        alignSelf: 'right'
                    }]}
                    >
                    <Image source={require('./images/homeButtons/calendar.png')} style={[styles.buttonImage, { height: '60%', width: '60%', top: '17%' }]} />
                </Pressable>
                    <Progress.Bar progress={global.progressToGoals[3]} width={300} height={20} borderColor={'#b5e8ff'} color={colorPicker(formatPercent(global.progressToGoals[3]))} style={[styles.shadowProp, {
                        alignSelf: 'center',
                        marginTop: '3%'
                    }]} />
                    <Text style={[styles.goalText, { alignSelf: 'center', fontSize: 20, marginTop: 5 }]}>{`${formatPercent(global.progressToGoals[3])}%`}</Text>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default Goals

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    navButtons: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },
    goalContainer: {
        width: '90%',
        height: 150,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        alignSelf: 'center'
    },
    goalText: {
        fontFamily: 'Lemon-Milk',
        color: '#b5e8ff',
        fontSize: 35,
        marginTop: 20
    },
    smallButton: {
        backgroundColor: '#FFFFFF',
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    buttonImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
        alignSelf: 'center',
        top: '15%'
    }
})