import React, { useRef,useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View,mapRef, SafeAreaView, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, Pressable, ScrollView, KeyboardAvoidingView } from 'react-native';
import MapView from 'react-native-maps';


const INITIAL_REGION={
    latitude:7.9465 ,
    longitude:1.0232,
};


const MapPage = () => {
  // const mapRef = userRef<any>();
    //const navigation = useNavigation();
    const mapRef = useRef(null);
    const navigation = useNavigation();

     useEffect(() => {
      navigation.setOptions({
        headerRight:() => (
          <TouchableOpacity onPress={focusMap}>
            <View style={{padding:10}}>
              <Text>Focus</Text>
            </ View>
          </TouchableOpacity>
        ),
      });
    }, []);

    const focusMap = () => {
      const Ghana = {
      latitude:7.9465 ,
      longitude:1.0232,
      };

      mapRef.current?.animateToRegion(Ghana)

    };

    return (
        
            <SafeAreaView style={styles.container} >
              <View style={{flex: 1}}>
            <Pressable className="ml-5 mt-2 " onPress={()=>navigation.navigate("HomePage")}>
            <Text>Back</Text>
            </Pressable>
            <MapView 
            style={styles.map} 
            initialRegion={INITIAL_REGION} 
            showsUserLocation
            showsMyLocationButton
            ref={mapRef} 
            />
            </View>
            </SafeAreaView>
            
            
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
  
  

export default MapPage;
