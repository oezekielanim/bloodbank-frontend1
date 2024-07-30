import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const SplashScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
                <View style={tw`items-center`}>
                <Image source={require('../assets/logo.png')} style={tw`mb-5`} />
                <Text style={tw`text-red-500 text-xl font-bold mb-2`}>Join the Tribe❤️</Text>
                <Text style={tw`text-gray-700 mb-4`}>Donate & Save a life today</Text>
                <Image source={require('../assets/splash_screen_female.jpeg')} style={tw`w-72 h-72 rounded-lg mb-8`} />
                <TouchableOpacity
                    style={tw`bg-red-500 w-80 py-4 rounded-lg mb-4`}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={tw`text-center text-lg text-white`}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`bg-gray-500 w-80 py-4 rounded-lg mb-4`}
                    onPress={() => navigation.navigate('SignUpPage')}
                >
                    <Text style={tw`text-center text-lg text-white`}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SplashScreen;