/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';

if (!__DEV__) {
  console.log = () => null;
  console.warn = () => null;
  console.error = () => null;
}

AppRegistry.registerComponent(appName, () => App);
