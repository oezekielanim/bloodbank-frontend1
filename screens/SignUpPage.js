import React from "react";
import { View, SafeAreaView, Text, TouchableOpacity, Image,TextInput,StyleSheet,Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const SignUpPage = () =>{
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   
    return(
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
             <View className="items-center">
                {/* Header */}
                <Image source={require('../assets/logo.png')} className="mb-5"/>
                <Text className="text-red-500 text-xl font-bold mb-2">Create your account</Text>
                <Text className="text-gray-700 mb-2">Register now to create new account</Text>

                {/* Login Form */}
                <View className="flex-1">
                    <View className="mt-4">
                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80 "
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            value={email}
                            onChangeText={setEmail}
                            required
                        />
                        </View>

                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80 "
                            placeholder="Username"
                            keyboardType="name"
                            autoCapitalize="none"
                            autoCompleteType="name"
                            textContentType="name"
                            value={email}
                            onChangeText={setEmail}
                            required
                        />
                        </View>

                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80 "
                            placeholder="Phone"
                            keyboardType="name"
                            autoCapitalize="none"
                            autoCompleteType="name"
                            textContentType="name"
                            value={email}
                            onChangeText={setEmail}
                            required
                        />
                        </View>
                        
                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80"
                            placeholder="Password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCompleteType="password"
                            textContentType="password"
                            value={password}
                            onChangeText={setPassword}
                            required
                        />
                        </View>

                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80"
                            placeholder="Confirm Password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCompleteType="password"
                            textContentType="password"
                            value={password}
                            onChangeText={setPassword}
                            required
                        />
                        </View>
                    </View>
                    {/* Login Button */}
                    <TouchableOpacity className="bg-red-500 w-90 py-4 mt-4 rounded-lg mb-4"
                    onPress={() => navigation.navigate('LoginScreen')}>
                        <Text className="text-center text-lg text-white">Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 5,
      backgroundColor: '#fff',
    },
    form: {
      marginTop: 0,
      alignSelf: 'center',
      width: '100%',
      maxWidth: 400,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#1F2937',
      marginBottom: 4,
    },
    input: {
      height: 40,
      borderColor: '#D1D5DB',
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 8,
      color: '#1F2937',
    },
    passwordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    forgotPassword: {
      fontSize: 12,
      color: '#6366F1',
      fontWeight: '600',
    },
    button: {
      backgroundColor: '#6366F1',
      paddingVertical: 12,
      borderRadius: 4,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default SignUpPage;