import React, { useEffect } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, Pressable, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import TextInputComponent from "../components/textInput";
import { sizes } from "../constants";
import TextAreaComponent from "../components/textarea";
import { useState } from "react";
import { useUserContext } from "../config/userContext";
import * as yup from 'yup';
import SelectComponent from "../components/selectComponent";
import DatePickerComponent from "../components/datepicker";
import { addDoc } from "firebase/firestore";
import { RequestRef } from "../config/firebase";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import hospitalData from '../hospitals.json';
import { debounce } from '../components/debounce'; 



const RequestPage = () => {
  const navigation = useNavigation();
  const { getItem } = useAsyncStorage("email");
    const [email, setEmail] = useState(''); 
    const [filteredHospitals,setFilteredHospitals]= useState(hospitalData);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    useEffect(() => {
        const fetchEmail = async () => {
          try {
            const storedEmail = await getItem();
            if (storedEmail !== null) {
              setEmail(storedEmail);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchEmail();
      }, []);

  const bloodtypedata = [
    { value: "A+" },
    { value: "A-" },
    { value: "B+" },
    { value: "B-" },
    { value: "O-" },
    { value: "O+" },
    { value: "AB+" },
    { value: "AB-" },
  ];



  const donorSchema = yup.object({
    FullName: yup.string().required('Full name is required'),
    phoneNum: yup.string().required('Phone number is required'),
    bloodType: yup.string().required('Blood type is required'),
    hospital: yup.string().required('Hospital is required'),
    requestDate: yup.string().required('Request date is required'),
  });
const request = async (data)=>{
  setLoading(true)
try {
await addDoc(RequestRef,{...data});
Alert.alert('Success', 'Request submitted successfully', [
  { text: 'OK', onPress: () => navigation.navigate('HomePage') }
]);
} catch (error) {
  console.log(error)
  Alert.alert('Error', 'Failed to submit request');
}finally{
  setLoading(false)
}
};

const {currentUser,fecthUserData,loading,setLoading}= useUserContext()
useEffect(()=>{
  fecthUserData(email)
},[])
console.log("here",currentUser);

const handleHospitalChange =debounce((text, setFieldValue) => {
  setFieldValue('hospital', text);
  if (text.length > 0) {
    const filtered = hospitalData.filter(hospital =>
      hospital.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredHospitals(filtered);
    setShowSuggestions(true);
  } else {
  setFilteredHospitals([]);
  setShowSuggestions(false);
  }
}, 300);



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>Make Blood Donation Request</Text>
          
          <Text className='mb-3 text-red-500 '>Ensure all the information provided (contact details, blood type, hospital) is accurate for quick processing.</Text>

          <Formik initialValues={{
            FullName: currentUser?.FullName,
            phoneNum: currentUser?.phoneNumber,
            email:currentUser?.email,
            bloodType: "",
            hospital: "",
            requestDate: "",
            notes: ""
          }}
            validationSchema={donorSchema}
            onSubmit={async (values) => {
               await request(values)
            }}>
            {({
              handleChange,
              handleBlur,
              faceSubmit,
              errors,
              values,
              touched,
              handleSubmit,
              setFieldValue,
            }) => (
              <View style={styles.form}>
                <View style={{flexDirection:"column",gap:20}}>
                <TextInputComponent
                  label={'Full name'}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={'FullName'}
                  errors={errors}
                  touched={touched}
                />
                <TextInputComponent
                  label={'Phone Number'}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={'phoneNum'}
                  errors={errors}
                  touched={touched}
                />
                <TextInputComponent
              label={'Email'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'email'}
              errors={errors}
              touched={touched}
            />

             <View style={styles.hospitalContainer}>
                      <TextInput
                        value={values.hospital}
                        onChangeText={text => handleHospitalChange(text, setFieldValue)}
                        onBlur={handleBlur('hospital')}
                        placeholder="Search for a hospital..."
                        style={styles.textInput}
                      />
                      {showSuggestions && (
                        <View style={styles.suggestionContainer}>
                          {filteredHospitals.map(hospital => (
                            <Pressable
                              key={hospital.id}
                              onPress={() => {
                                setFieldValue('hospital', hospital.name);
                                setShowSuggestions(false);
                              }}
                              style={styles.suggestionItem}
                            >
                              <Text style={styles.suggestionText}>{hospital.name}</Text>
                            </Pressable>
                          ))}
                        </View>
                      )}
                    </View>
               <Text className='text-red-500 mr-10'>Please refer to the map to find a nearby hospital where you'd like to donate blood.</Text>


                <SelectComponent
                  label={"Blood Type"}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={"bloodType"}
                  data={bloodtypedata}
                />
                <DatePickerComponent
                  label={'Request Date'}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={'requestDate'}
                  errors={errors}
                  Datemode={"date"}
                  touched={touched}
                />
                <TextAreaComponent
                  label={"Notes (Optional)"}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={"notes"}
                  errors={errors}
                  touched={touched}
                  placeholder="Any additional information"
                />

                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>{loading ? "Loading..." : "Submit"}</Text>
                </Pressable>
                </View>
              </View>
            )}
          </Formik>
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  form: {
    flex: 1,
    width: '100%',
  },
  textInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    
  },
  hospitalContainer:{
    position: 'relative',
    marginVertical: 10,
  
  },
  suggestionContainer: {
    marginTop: 5,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    maxHeight: 150,
    backgroundColor: '#fff',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
   suggestionItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  suggestionItemLast: {
    borderBottomWidth: 0,
  },
  suggestionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RequestPage;
