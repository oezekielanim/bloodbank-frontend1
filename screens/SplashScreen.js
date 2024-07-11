import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
            <View className="items-center">
                <Image source={require('../assets/logo.png')} className="mb-5"/>
                <Text className="text-red-500 text-xl font-bold mb-2">Join the Tribe</Text>
                <Text className="text-gray-700 mb-4">Donate & Save a life today</Text>
                <Image source={require('../assets/splash_screen_female.jpeg')} className="w-72 h-72 rounded-lg mb-8"/>
                <TouchableOpacity className="bg-red-500 w-80 py-4 rounded-lg mb-4"
                onPress={() => navigation.navigate('HomePage')}>
                    <Text className="text-center text-lg text-white">Login</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-500 w-80 py-4 rounded-lg mb-4"
                onPress={() => navigation.navigate('')}>
                    <Text className="text-center text-lg text-white">Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;