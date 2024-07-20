import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { sizes } from '../constants';
import { useState } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function DatePickerComponent({
  label,
  values,
  handleChange,
  handleBlur,
  id,
  errors,
  touched,
  placeholder,
  Datemode
}) {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      handleChange(id)(selectedDate.toISOString());
    }
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View style={{ flexDirection: "column", gap: 12, width: "100%" }}>
      {label && (
        <Text
          style={{
            fontSize: sizes.fontSize[3],
     
        
          }}
        >
          {label}
        </Text>
      )}

      <View style={{ position: "relative" }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errors[id] && touched[id] ? "#F44336" : "#D1D5DB",
            fontSize: 16,
            borderRadius: 8,
      
            paddingVertical: 11,
            paddingHorizontal: 16,
           
          }}
          value={
            date
              ? Datemode === "date"
                ? date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
                : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
              : 'Not set'
          }
          editable={false}
        />
        <Pressable
          onPress={showMode}
          style={{
            position: "absolute",
            right: 15,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Datemode === "date" ? (
            <Fontisto name="date" size={24} color={"#D1D5DB"} />
          ) : (
            <Ionicons name="time-outline" size={24} color={"#D1D5DB"} />
          )}
        </Pressable>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode={Datemode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {errors && touched && touched[id] && errors[id] ? (
        <Text style={{ color: "#f5564a", marginTop: 5 }}>{errors[id]}</Text>
      ) : null}
    </View>
  );
}