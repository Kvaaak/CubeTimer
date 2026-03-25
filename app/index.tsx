import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View>
        <Text style={{fontSize: 60, color: '#eee'}}>STATS</Text>
        <Text style={{fontSize: 60, color: '#eee'}}>CUBE</Text>
        <Text style={{fontSize: 60, color: '#eee'}}>SETTINGS</Text>
      </View>
      <Text style={{fontSize: 60, color: '#eee'}}>SCRAMBLE</Text>
      <Text style={{fontSize: 60, color: '#eee'}}>0:00.00</Text>
      <Text style={{fontSize: 60, color: '#eee'}}>Avg etc</Text>
      <Text style={{fontSize: 60, color: '#eee'}}>Scrambled cube</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#111'
  },
})
