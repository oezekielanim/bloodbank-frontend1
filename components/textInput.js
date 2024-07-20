import { sizes } from "../constants";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Eye, EyeSlash } from "iconsax-react-native";
import { StyleSheet } from "react-native";

export default function TextInputComponent({
  label,
  values,
  handleChange,
  handleBlur,
  id,
  errors,
  touched,
  placeholder,
  type = "text",
}) {

  const [show, setShow] = React.useState(false);
  return (
    <View style={{ flexDirection: "column", gap: 12, width: "100%", position: "relative" }}>
      {label && (
        <Text style={{ fontSize: sizes.fontSize[3], color: "black" }}>
          {label}
        </Text>
      )}
      <TextInput
        style={{
      width:"100%",
          borderColor: errors[id] ? "#F44336" : "transparent",
          height: 40,
          borderColor: '#D1D5DB',
          borderWidth: 1,
          borderRadius: 4,
          paddingHorizontal: 8,
          color: '#1F2937',
        }}
        secureTextEntry={type == "password" && !show}
        placeholder={placeholder}
        value={values[id]}
        onChangeText={handleChange(id)}
        onBlur={handleBlur(id)}
      />
      <Pressable
          style={[{
            position: "absolute",
            right: sizes.marginSM /2,
            height: "60%",
            alignItems: "center",
            justifyContent: "center",
            bottom: 0, 
          }]}
          onPress={() => {
            setShow(!show);
          }}
        >
          {type == "password" && (
            <>
              {show && type == "password" ? (
                <Eye size={24} color={"#a9a9a8"}/>
              ) : (
                <EyeSlash size={24} color={"#a9a9a8"}/>
              )}
            </>
          )}
        </Pressable>
      {errors[id] && touched[id] && (
        <Text style={{ color: "#f5564a", marginTop: 5 }}>{errors[id]}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  focusRing: {
    borderWidth: 2,
    borderColor: "blue",
  },
});