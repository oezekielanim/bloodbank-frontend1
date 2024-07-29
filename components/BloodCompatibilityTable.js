// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';

// const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

// const compatibilityData = [
//   { bloodType: 'O-', compatibleWith: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] },
//   { bloodType: 'O+', compatibleWith: ['O+', 'A+', 'B+', 'AB+'] },
//   { bloodType: 'A-', compatibleWith: ['A-', 'A+', 'AB-', 'AB+'] },
//   { bloodType: 'A+', compatibleWith: ['A+', 'AB+'] },
//   { bloodType: 'B-', compatibleWith: ['B-', 'B+', 'AB-', 'AB+'] },
//   { bloodType: 'B+', compatibleWith: ['B+', 'AB+'] },
//   { bloodType: 'AB-', compatibleWith: ['AB-', 'AB+'] },
//   { bloodType: 'AB+', compatibleWith: ['AB+'] },
// ];

// const BloodCompatibilityTable = () => {
//   const renderHeader = () => (
//     <View style={styles.header}>
//       <Text style={styles.headerText}>Recipient Blood Type</Text>
//       {BLOOD_TYPES.map((type) => (
//         <Text key={type} style={styles.headerText}>{type}</Text>
//       ))}
//     </View>
//   );

//   const renderRow = ({ item }) => (
//     <View style={styles.row}>
//       <Text style={styles.rowText}>{item.bloodType}</Text>
//       {BLOOD_TYPES.map((type) => (
//         <Text key={type} style={[
//           styles.cellText,
//           item.compatibleWith.includes(type) ? styles.compatible : styles.incompatible
//         ]}>
//           {item.compatibleWith.includes(type) ? '✔' : '✘'}
//         </Text>
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {renderHeader()}
//       <FlatList
//         data={compatibilityData}
//         renderItem={renderRow}
//         keyExtractor={(item) => item.bloodType}
//         style={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingBottom: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     marginBottom: 8,
//   },
//   headerText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     flex:1,
//     paddingHorizontal:1,
    
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
    
//   },
//   rowText: {
//     fontSize: 14,
//     textAlign: 'center',
//     flex: 1,
//     paddingHorizontal: 4,
//   },

//   cellText: {
//     fontSize: 14,
//     textAlign: 'center',
//     flex: 1,
//   },
//   compatible: {
//     color: 'green',
//   },
//   incompatible: {
//     color: 'red',
//   },
//   list: {
//     marginTop: 16,
//   },
// });

// export default BloodCompatibilityTable;



import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

const compatibilityData = [
  { bloodType: 'O-', compatibleWith: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] },
  { bloodType: 'O+', compatibleWith: ['O+', 'A+', 'B+', 'AB+'] },
  { bloodType: 'A-', compatibleWith: ['A-', 'A+', 'AB-', 'AB+'] },
  { bloodType: 'A+', compatibleWith: ['A+', 'AB+'] },
  { bloodType: 'B-', compatibleWith: ['B-', 'B+', 'AB-', 'AB+'] },
  { bloodType: 'B+', compatibleWith: ['B+', 'AB+'] },
  { bloodType: 'AB-', compatibleWith: ['AB-', 'AB+'] },
  { bloodType: 'AB+', compatibleWith: ['AB+'] },
];

const BloodCompatibilityTable = () => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Recipient</Text>
      {BLOOD_TYPES.map((type) => (
        <Text key={type} style={styles.headerText}>{type}</Text>
      ))}
    </View>
  );

  const renderRow = (item) => (
    <View key={item.bloodType} style={styles.row}>
      <Text style={styles.rowText}>{item.bloodType}</Text>
      {BLOOD_TYPES.map((type) => (
        <Text
          key={type}
          style={[
            styles.cellText,
            item.compatibleWith.includes(type) ? styles.compatible : styles.incompatible,
          ]}
        >
          {item.compatibleWith.includes(type) ? '✔' : '✘'}
        </Text>
      ))}
    </View>
  );

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {renderHeader()}
        {compatibilityData.map((item) => renderRow(item))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  cellText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  compatible: {
    color: 'green',
  },
  incompatible: {
    color: 'red',
  },
});

export default BloodCompatibilityTable;
