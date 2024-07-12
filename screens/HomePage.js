import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className = 'flex-1 bg-white'>
            <ScrollView className ='px-4 pt-4'>
                <Text className='text-xl font-bold mt-8'>Hi Phoebe,</Text>
                <Text className='text-2xl font-bold'>Good afternoon.</Text>
                
                <View className ='mt-8'>
                    <View className ='flex-row justify-between'>
                        <TouchableOpacity className= 'w-1/2 bg-red-100 p-4 rounded-lg mr-2'>
                            <Text className='text-lg font-bold text-red-500'>Donate Blood</Text>
                            <Text className='text-sm text-gray-600 mt-2'>
                            Schedule your appointment today and be a hero in someone's story. Every drop counts!
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className ='w-1/2 bg-blue-100 p-4 rounded-lg'>
                            <Text className='text-lg font-bold text-blue-500'>Find nearby hospitals</Text>
                            <Text className='text-sm text-gray-600 mt-2'>
                            Get directions and contact information to ensure you receive timely care when you need it the most.
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className='flex-row justify-between mt-4'>
                        <TouchableOpacity className='w-1/2 bg-purple-100 p-4 rounded-lg mr-2' onPress={ () => navigation.navigate('RequestPage') }>
                            <Text className='text-lg font-bold text-purple-500'>Request for Blood</Text>
                            <Text className='text-sm text-gray-600 mt-2'>
                            In urgent need of blood? Submit a request 
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='w-1/2 bg-yellow-100 p-4 rounded-lg'>
                            <Text className='text-lg font-bold text-yellow-500'>ChatBox</Text>
                            <Text className='text-sm text-gray-600 mt-2'>
                                Have questions or need assistance?We're happy to help you 24/7.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='mt-8'>
                    <Text className='text-xl font-bold'>Benefits of donating blood?</Text>

                    <View className='mt-4'>
                        <View className='flex-row items-center mb-4'>
                            <View className='w-8 h-8 rounded-full bg-black justify-center items-center mr-4'>
                                <Text className='text-white text-lg'>❤️</Text>
                            </View>
                            <View>
                                <Text className='font-bold'>Lower risk of cancer</Text>
                                <Text className='text-gray-600'>
                                    By donating blood regularly the iron level in the blood is balanced and the risk of cancer-related to the liver, lungs, and intestine gets lower.
                                </Text>
                            </View>
                        </View>

                        <View className='flex-row items-center mb-4'>
                            <View className='w-8 h-8 rounded-full bg-black justify-center items-center mr-4'>
                                <Text className='text-white text-lg'>😊</Text>
                            </View>
                            <View>
                                <Text className='font-bold'>Psychological upliftment</Text>
                                <Text className='text-gray-600}'>
                                    Besides all the healthy benefits that we obtain by donating blood, we also get the powerful benefit psychologically by helping the one in need.
                                </Text>
                            </View>
                        </View>

                        <View className='flex-row items-center mb-4'>
                            <View className='w-8 h-8 rounded-full bg-black justify-center items-center mr-4'>
                                <Text className='text-white text-lg'>⏳</Text>
                            </View>
                            <View>
                                <Text className='font-bold'>Speeds up healing</Text>
                                <Text className='text-gray-600'>
                                    The body tries to adjust to the loss of red blood the cells we donate blood, these adjustments also help in accelerating the wound healing process.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomePage;
