import React from "react";
import { Text, TextInput, View } from "react-native";

import { StyleSheet } from "react-native";
import { sizes } from "../constants";


export default function TextAreaComponent({
  label,
  values,
  handleChange,
  handleBlur,
  id,
  errors,
  touched,
  placeholder,
}) {
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
      <TextInput


        style={{
          borderWidth: 1,
          height:200,
          borderColor: errors[id] ? "#F44336" : "#D1D5DB",
    
        }}
        placeholder={placeholder}
        placeholderTextColor={"#D1D5DB"}
        value={values[id]}
        onChangeText={(text) => handleChange(id)(text)} // Pass the field name and then the value
        onBlur={handleBlur(id)}
      />
      {errors[id] && touched[id] && (
        <Text style={{ color: "#f5564a", marginTop: 5 }}>{errors[id]}</Text>
      )}
    </View>
  );
}

