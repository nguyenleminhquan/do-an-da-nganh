import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import LogoutBtn from '../components/LogoutBtn';
import colors from '../misc/colors';

const Messages = () => {

  const handleLogout = () => { }
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Messages</Text>
          <LogoutBtn onPress={handleLogout} />
        </View>
      </View>
    </>
  );
}

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLANK
  },
  header: {
    paddingTop: 10,
    height: 50,
    width: '100%',
    backgroundColor: colors.MAIN,
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: 5
  },
  headerText: {
    color: colors.BRIGHTTEXT,
    fontSize: 24,
    fontWeight: 'bold',
    width: '92%'
  },
});