import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image,StyleSheet} from 'react-native';
import { SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useUserContext } from "../config/userContext";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { UserRef } from '../config/firebase';
import { where, query, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import BloodCompatibilityTable from '../components/BloodCompatibilityTable';


const HomePage = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getItem } = useAsyncStorage("email");
    const [ email, setEmail] = useState('');
    const { currentUser, fecthUserData } = useUserContext();
    

    var greeting = null
    var data = [
        [0, 11, "Good morning"],          
        [12, 17, "Good afternoon"],
        [18, 24, "Good evening"]
    ],
        hr = new Date().getHours();
    
    for(var i = 0; i < data.length; i++){
        if(hr >= data[i][0] && hr <= data[i][1]){
            greeting = data[i][2]
        }
    }
    
    useEffect(() => {
        const fetchEmail = async () => {
          try {
            const storedEmail = await getItem();
            if (storedEmail !== null) {
              setEmail(storedEmail);
              fecthUserData(storedEmail); 
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchEmail();
    }, []);

 useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.fullName);
    }
  }, [currentUser]);

    useEffect(() => {
        navigation.setOptions({
            gestureEnabled: false,
        });
    }, [navigation]);




    return (
        <SafeAreaView className = 'flex-1 bg-white'>
            <ScrollView className ='px-4 pt-4'>
                <View className="w-90 h-10 flex-row-reverse pt-3">
                    <TouchableOpacity className="w-10 h-10 rounded-full justify-center items-center mr-4"
                       onPress={ () => navigation.navigate('ProfilePage')} >
                        <Image source={require('../assets/User.png')} className="mb-5 h-12 w-12"/>
                    </TouchableOpacity>
                </View>
                <Text className='text-xl font-bold mt-8'>Hi {username} 👋,</Text>
                <Text className='text-2xl font-bold'>{greeting}.</Text>
                
                <View className ='mt-8'>
                    <View className ='flex-row justify-between'>
                        <TouchableOpacity className= 'w-1/2 bg-red-100 p-4 rounded-lg mr-2' onPress={ () => navigation.navigate('DonatePage')}>
                            <Text style={styles.donateText} >Donate Blood{'\uD83D\uDC89'}</Text>
                            <Text className='text-sm text-gray-600 mt-2'>
                            Schedule your appointment today and be a hero in someone's story. Every drop counts!
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className ='w-1/2 bg-blue-100 p-4 rounded-lg' onPress={ () => navigation.navigate('MapPage')}>
                            <Text style={styles.findHospitalsText}>Find nearby hospitals{'\uD83D\uDCDD'}</Text>
                            <Text className='text-sm text-gray-600 mt-2'>
                            Get directions and contact information to ensure you receive timely care when you need it the most.
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className='flex-row justify-between mt-4'>
                        <TouchableOpacity className='w-1/2 bg-purple-100 p-4 rounded-lg mr-2' onPress={ () => navigation.navigate('RequestPage') }>
                            <Text  style={styles.requestText}>Request Blood{'\uD83E\uDE78'}</Text>
                            <Text className='text-sm text-gray-600 mt-2'>
                            In urgent need of blood? Submit a request 
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {navigation.navigate("ChatPage")}} className='w-1/2 bg-yellow-100 p-4 rounded-lg'>
                            <Text style={styles.chatText} >ChatBox{'\uD83D\uDCAC'}</Text>
                            <Text className='text-sm text-gray-600 mt-2'>
                                Have questions or need assistance?We're happy to help you 24/7.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='mt-8'>
                    <Text className='text-xl font-bold '>Benefits of donating blood?</Text>

                    <View className='mt-4'>
                        <View className='flex-row items-center mb-4'>
                            <View className='w-8 h-8 rounded-full bg-black justify-center items-center mr-4'>
                                <Text className='text-white text-lg'>❤️</Text>
                            </View>
                            <View>
                                <Text className='font-bold'>Lower risk of cancer</Text>
                                <Text className='text-gray-600 mr-10'>
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
                                <Text className='text-gray-600 mr-10'>
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
                                <Text className='text-gray-600 mr-10'>
                                    The body tries to adjust to the loss of red blood the cells we donate blood, these adjustments also help in accelerating the wound healing process.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className='mt-5 '>
                    <Text  className='text-xl font-bold mb-4'>Blood Compatibility Types</Text>
                    <BloodCompatibilityTable />
                </View>


                

            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    donateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F87171',
    },

    findHospitalsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3B82F6',
    },
    requestText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8B5CF6',
    },
    chatText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FBBF24',
    },
});


export default HomePage;
