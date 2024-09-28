import { StyleSheet, View } from 'react-native';

export default () => {
  return <View style={styles.division} />;
};

const styles = StyleSheet.create({
  division: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'lightgray',
    marginTop: 15,
    marginBottom: 12,
  },
});
