import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Import Location from expo-location
import hospitalsData from '../hospitals.json';

const INITIAL_REGION = {
  latitude: 7.9465,
  longitude: 1.0232,
  // latitudeDelta: 0.5,
  // longitudeDelta: 0.5,
};

const MapPage = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [closestHospitals, setClosestHospitals] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
    findClosestHospitals(location.coords);
  };

  const findClosestHospitals = (userLocation) => {
    const hospitalsWithDistance = hospitalsData.map(hospital => {
      const distance = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        hospital.latitude,
        hospital.longitude
      );
      return { ...hospital, distance };
    });

    // Sort hospitals by distance and get the closest ones (e.g., top 5)
    const sortedHospitals = hospitalsWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 5);
    setClosestHospitals(sortedHospitals);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 - Math.cos(dLat) / 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const focusMap = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...INITIAL_REGION,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Pressable className="ml-5 mt-2 " onPress={() => navigation.navigate("HomePage")}>
          <Text>Back</Text>
        </Pressable>
        <MapView
          style={styles.map}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          ref={mapRef}
        >
          {closestHospitals.map((hospital, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: hospital.latitude, longitude: hospital.longitude }}
              title={hospital.name}
              description={hospital.address}
            />
          ))}
        </MapView>
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
