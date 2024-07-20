import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from '@expo/vector-icons';
import { sizes } from "../constants";
export default function SelectComponent({
  label,
  data,
  values,
  handleChange,
  handleBlur,
  id,
  errors,
  touched,
}) {


  return (
    <View style={{ flexDirection: "column", gap: 12, width: "100%" }}>
      <Text
        style={{
          fontSize: sizes.fontSize[3],
     
        }}
      >
        {label}
      </Text>
      <SelectList
        setSelected={(val) => handleChange(id)(val)}
        data={data}
        save="value"
       // onBlur={() => handleBlur(id)}
        boxStyles={{borderColor:"#D1D5DB"}}
        inputStyles={{color:"black"}}
        dropdownStyles={{backgroundColor:"white"}}
        dropdownTextStyles={{color:"black"}}
        search={false} 
        arrowicon={<Ionicons name="chevron-down-outline" size={24} color="#D1D5DB" />}
        defaultOption={{ key: "", value: values[id] }}
      />
      {touched && touched[id] && errors && errors[id] ? (
        <Text style={{ color: "#f5564a", marginTop: 5 }}>{errors[id]}</Text>
      ) : null}
    </View>
  );
}