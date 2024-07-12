import React from "react";
import { View, SafeAreaView, Text, TouchableOpacity, Image,TextInput,StyleSheet,Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const RequestPage = () =>{
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   
    return(
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
             <View className="items-center mt-10">
                {/* Header */}
                <Text className="text-gray-700 mb-2">Make Blood Donation Request</Text>

                {/* Login Form */}
                <View className="flex-1">
                    <View className="mt-4">
                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80 "
                            placeholder="Fullname"
                            // keyboardType="email-address"
                            autoCapitalize="none"
                            // autoCompleteType="email"
                            // textContentType="emailAddress"
                            // value={email}
                            // onChangeText={setEmail}
                            required
                        />
                        </View>

                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80 "
                            placeholder="Phone Number"
                            keyboardType="name"
                            autoCapitalize="none"
                            autoCompleteType="name"
                            textContentType="name"
                            // value={email}
                            // onChangeText={setEmail}
                            required
                        />
                        </View>

                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80 "
                            placeholder="Input Blood Type"
                            keyboardType="name"
                            autoCapitalize="none"
                            autoCompleteType="name"
                            textContentType="name"
                            // value={email}
                            // onChangeText={setEmail}
                            required
                        />
                        </View>
                        
                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80"
                            placeholder="Hospital"
                            autoCapitalize="none"
                            // value={password}
                            // onChangeText={setPassword}
                            required
                        />
                        </View>

                        <View className="flex-col m-4">
                        <TextInput
                            style={styles.input}
                            className="w-80"
                            placeholder="Request Date"
                            autoCapitalize="none"
                            // value={password}
                            // onChangeText={setPassword}
                            required
                        />
                        </View>
                        <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Notes (optional)"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                        />
                        </View>
                    </View>
                    {/* Login Button */}
                    <TouchableOpacity className="bg-red-500 w-90 py-4 mt-4 rounded-lg mb-4">
                        <Text className="text-center text-lg text-white">Make Request</Text>
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
    textAreaContainer: {
        borderColor: '#808080',
        borderWidth: 1,
        padding: 5
    },
      textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
  });

export default RequestPage;