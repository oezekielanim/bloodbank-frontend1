import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    return (
        <SafeAreaView className="flex-1 justtify-items-center">
            <View className="self-center">
                <Image source={require('C:\Users\HP\Documents\bloodbank-frontend\assets\logo.png')}/>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;