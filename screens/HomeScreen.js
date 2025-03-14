import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function HomeScreen() {
    const [search, setSearch] = useState('');

    const handleSearchChange = (text) => {
        setSearch(text);
      };

  return ( <View style={styles.container}>
    <TextInput
      style={styles.searchBar}
      placeholder="Hae..."
      value={search}
      onChangeText={handleSearchChange}
    />
    
    <Text style={styles.content}>Hakutulokset</Text>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#006A66',
},
searchBar: {
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 10,
  marginBottom: 20,
  backgroundColor:"white"
},
content: {
  fontSize: 18,
},
});
