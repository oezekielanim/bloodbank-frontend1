import React, { useEffect,useState } from "react";
import { View, SafeAreaView, TextInput,Text, TouchableOpacity, KeyboardAvoidingView,StyleSheet,Platform, Alert, Pressable, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import TextInputComponent from "../components/textInput";
import { sizes } from "../constants";
import TextAreaComponent from "../components/textarea";
import { useUserContext } from "../config/userContext";
import * as yup from 'yup';
import SelectComponent from "../components/selectComponent";
import DatePickerComponent from "../components/datepicker";
import { addDoc } from "firebase/firestore";
import { DonateRef } from "../config/firebase";
import hospitalData from '../hospitals.json';
import { debounce } from '../components/debounce'; 

const DonatePage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [filteredHospitals,setFilteredHospitals]= useState(hospitalData);
  const [showSuggestions, setShowSuggestions] = useState(false);


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
    fullName: yup.string().required('Full name is required'),
    phoneNum: yup.string().required('Phone number is required'),
    bloodType: yup.string().required('Blood type is required'),
    hospital: yup.string().required('Hospital is required'),
    appDate: yup.string().typeError('Age must be a number').required('Appointment date is required'),
    age: yup.number().required('Age is required').min(17, 'You must be at least 17 years old to donate blood'),
    weight: yup.number().required('Weight is required').min(50, 'You must weigh at least 50 kg to donate blood'),
  });

  const request = async (data) => {
    setLoading(true);
    try {
      await addDoc(DonateRef, { ...data });
      Alert.alert('Success', 'Donation request submitted successfully');
      navigation.navigate('HomePage'); // Navigate back or perform any other action after successful submission
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to submit donation request');
    } finally {
      setLoading(false);
    }
  };

  const { currentUser, fecthUserData } = useUserContext();

  useEffect(() => {
    fecthUserData("");
  }, []);

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
       <KeyboardAvoidingView style={styles.container}  behavior="padding" keyboardVerticalOffset={Platform.OS === "ios"?20 : 0}>
      <ScrollView >
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>Schedule an appointment</Text>
          <View>
                    <Text className='text-xl font-bold '>Health Tips(Please Take note of these)</Text>

                    <View className='mt-4'>
                        <View className='flex-row items-center mb-4'>
                            <View className='w-8 h-8 rounded-full bg-black justify-center items-center mr-4'>
                                <Text className='text-white text-lg'>❗</Text>
                            </View>
                            <View>
                                <Text className='font-bold'>Before Donating Blood,</Text>
                                <Text className='text-gray-600 mr-10'>1.Stay hydrated in the days closer to your donation.</Text>
                                <Text className='text-gray-600 mr-10'>2.Avoid donating on an empty stomach.</Text>
                                <Text className='text-gray-600 mr-10'>3. Ensure you rest before your appointment.</Text>
                                <Text className='text-gray-600 mr-10'>4.Inform the donation center of any medications you're taking.</Text>
                                <Text className='text-gray-600 mr-10'>5.Bring identification</Text>
                            </View>
                        </View>

                        <View className='flex-row items-center mb-4'>
                            <View className='w-8 h-8 rounded-full bg-black justify-center items-center mr-4'>
                                <Text className='text-white text-lg'>❗</Text>
                            </View>
                            <View>
                                <Text className='font-bold'>After Donating Blood,</Text>
                                <Text className='text-gray-600 mr-10'>1.Replenish lost fluids by drinking water</Text>
                                <Text className='text-gray-600 mr-10'>2.Consume iron-rich foods to replenish iron levels.</Text>
                                <Text className='text-gray-600 mr-10'>3. Rest and avoid heavy lifting for the rest of the day.</Text>
                                <Text className='text-gray-600 mr-10'>4. Watch for any unusual symptoms or reactions.</Text>
                            </View>
                        </View>
                    </View>
                </View>
          <Formik
            initialValues={{
              fullName: currentUser?.FullName || '',
              phoneNum: currentUser?.phoneNumber || '',
              bloodType: "",
              age:"",
              weight:"",
              hospital: "",
              appDate: "",
            }}
            validationSchema={donorSchema}
            onSubmit={async (values) => {
              await request(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              values,
              touched,
              setFieldValue,
            }) => (
              <View style={styles.form}>
                <View style={{ flexDirection: "column", gap: 20 }}>
                  <TextInputComponent
                    label={'Full name'}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    id={'fullName'}
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
                    <TextInputComponent
                    label={'Age'}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    id={'age'}
                    errors={errors}
                    touched={touched}
                  />
                   <TextInputComponent
                    label={'Weight(Value must be in kg)'}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    id={'weight'}
                    errors={errors}
                    touched={touched}
                  />
                  <DatePickerComponent
                    label={'Appointment Date'}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    id={'appDate'}
                    errors={errors}
                    Datemode={"date"}
                    touched={touched}
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
      </KeyboardAvoidingView>
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

export default DonatePage;
