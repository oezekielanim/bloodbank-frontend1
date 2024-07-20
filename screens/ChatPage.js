import { GoogleGenerativeAI } from "@google/generative-ai";
import { Formik } from "formik";
import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MessageBubble from "../components/MessageBubble";
import { sizes } from "../constants";
import { useNavigation } from "@react-navigation/native";

const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const navigation = useNavigation();

  const genAI = new GoogleGenerativeAI('AIzaSyB9uDGL0hlXTRBIk03DGvy-WkaejUnBXGY');
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are supposed to only answer questions on blood,blood related,and health related  issues,health tips and sicknesses. if you are asked a question outside the scope give a simple feedback. When the user says a greeting reply and tell the user the scope of questions you can answer",
  });
  

  const SendMessage = async (input) => {
    if (input.trim() === "") return;

    setLoading(true);

    try{
      const result = await model.generateContent(input);
      const response = await result.response;

      setChatHistory([...chatHistory,
        {type:"user", message:input},
        {type:"bot",message: response.text()},
      ]);
console.log(chatHistory)
    }catch{
      console.error("Error sending message")

    }finally{
 
      setLoading("");

    }
  }

  return (
<SafeAreaView style={styles.container} >
  <Pressable className="ml-5 mt-2 " onPress={()=>navigation.navigate("HomePage")}>
    <Text>Back</Text>
  </Pressable>
<KeyboardAvoidingView style={{height:"100%"}}    behavior="padding" keyboardVerticalOffset={Platform.OS === "ios"?20 : 0}>
  
  <ScrollView contentContainerStyle={styles.chatContainer}>
 {
  chatHistory?.length === 0 ? (<View style={{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:sizes.screenHeight/2.3,}}>
    <Text style={{fontSize:sizes.fontSize[5]}}>Send <Text className="text-red-500 font-semibold">Hi</Text>  to start😊</Text>
  </View>):(   chatHistory.map((chat, index) => (
      <MessageBubble key={index} message={chat.message} isUser={chat.type === 'user'} />
    )))
 }
  </ScrollView>
  <Formik
    initialValues={{ question: '' }}
    onSubmit={async (values, { resetForm }) => {
      await SendMessage(values.question);
      resetForm();
    }}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={values.question}
          onChangeText={handleChange('question')}
          onBlur={handleBlur('question')}
        />
        <Pressable onPress={handleSubmit} className="p-3 rounded-lg bg-red-500 text-white ">
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.sendButtonText}>Send</Text>}
        </Pressable>
      </View>
    )}
  </Formik>

</KeyboardAvoidingView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },

  sendButtonText: {
    color: '#fff',
  },
});

export default ChatPage;
