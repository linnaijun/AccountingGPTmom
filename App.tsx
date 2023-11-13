import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

const App = () => {
  const [buttonColor, setButtonColor] = useState<string>('white');

  return (
    <View style={styles.container}>
      <Button
        title="Press me"
        color={buttonColor}
        onPress={() => setButtonColor(buttonColor === 'white' ? 'red' : 'white')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
