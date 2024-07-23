import React, { useEffect } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
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
import { DonateRef } from "../config/firebase";

const DonatePage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);


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
    appDate: yup.string().required('Appointment date is required'),
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>Schedule an appointment</Text>

          <Formik
            initialValues={{
              fullName: currentUser?.username || '',
              phoneNum: currentUser?.phoneNumber || '',
              bloodType: "",
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
                  <TextInputComponent
                    label={'Hospital'}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    id={'hospital'}
                    errors={errors}
                    touched={touched}
                  />
                  <SelectComponent
                    label={"Blood Type"}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    id={"bloodType"}
                    data={bloodtypedata}
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
