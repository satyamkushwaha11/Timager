import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './navigation/tabNavigation';
import StopwatchScreen from './screens/StopwatchScreen';
import StackNavigation from './navigation/stackNavigation';

function App() {
  return (
    <NavigationContainer>
      {/* <TabNavigation /> */}
      <StackNavigation/>
    </NavigationContainer>
  );
}



export default App;
