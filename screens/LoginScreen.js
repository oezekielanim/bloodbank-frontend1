import React from "react";
import { View, SafeAreaView, Text, TouchableOpacity, Image,TextInput,StyleSheet,Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const LoginScreen = () =>{
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Handle sign in logic here
        Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
      };
  
    return(
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
           <View className="items-center">
                {/* Header */}
                <Image source={require('../assets/logo.png')} className="mb-5"/>
                <Text className="text-red-500 text-xl font-bold mb-2">Welcome Back😊</Text>
                <Text className="text-gray-700 mb-2">Enter your credentials to log in</Text>

                {/* Login Form */}
                <View className="flex-1">
                    <View className="mt-4">
                        <View className="flex-col m-4">
                        <Text style={styles.label}>Email address</Text>
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
                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Password</Text>
                            <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password reset link will be sent to your email.')}>
                            <Text style={styles.forgotPassword}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
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
                    </View>
                    {/* Login Button */}
                    <TouchableOpacity className="bg-red-500 w-90 py-4 mt-4 rounded-lg mb-4"
                    onPress={() => navigation.navigate('HomePage')}>
                        <Text className="text-center text-lg text-white">Login</Text>
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

export default LoginScreen;