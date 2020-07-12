let value = false;

const SuspendingComponent = () => {
  if (!value) {
    throw Promise.resolve().then(() => {
      value = true;
    });
  }

  return null;
};

import React, {Suspense, useState, useEffect} from 'react';
import {TextInput, SafeAreaView} from 'react-native';

const App = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setValue('After 6 sec I trigger a rerender setting this value');
    }, 6000);
  }, []);

  return (
    <Suspense fallback={null}>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SuspendingComponent />
        <TextInput
          placeholder="Test placeholder"
          value={value}
          style={{width: '100%', paddingLeft: 20, borderWidth: 1}}
        />
      </SafeAreaView>
    </Suspense>
  );
};

export default App;
