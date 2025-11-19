import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LogBox } from 'react-native';

import AddQuestionScreen from './screens/AddQuestionScreen';
import ChangeEmailScreen from './screens/ChangeEmailScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ImgScreen from './screens/ImgScreen';
import LoginScreen from './screens/LoginScreen';
import MainContainer from './screens/MainContainer';
import PlayQuizScreen from './screens/PlayQuizScreen';
import QuizScreen from './screens/QuizScreen';
import RegistrationScreen from './screens/RegistrationScreen';

import { COLORS } from './constants/theme';

const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();

// firebases logs
LogBox.ignoreLogs([`Warning: Async Storage has been extracted from react-native core`]);
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function App() {
  return (
    // <NavigationContainer>
      <NativeStack.Navigator>
        <NativeStack.Screen options={styles.quiz} name="Login" component={LoginScreen} />
        <Stack.Screen options={styles.quiz} name="Registration" component={RegistrationScreen} />
        <NativeStack.Screen options={{ headerShown: false }} name="Main" component={MainContainer} />
        <Stack.Screen options={styles.quiz} name="ImgScreen" component={ImgScreen} />
        <Stack.Screen options={styles.quiz} name="QuizScreen" component={QuizScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AddQuestionScreen" component={AddQuestionScreen} />
        <Stack.Screen options={{ headerShown: false }} name="PlayQuizScreen" component={PlayQuizScreen} />
        <Stack.Screen options={styles.quiz} name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen options={styles.quiz} name="ChangeEmailScreen" component={ChangeEmailScreen} />
        <Stack.Screen options={styles.quiz} name="ChangePasswordScreen" component={ChangePasswordScreen} />
      </NativeStack.Navigator>
    // </NavigationContainer>
  );
}

const styles = {
  quiz: {
    headerStyle: { backgroundColor: COLORS.primary },
    headerTintColor: COLORS.white,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25
    },
    headerTitleAlign: 'center'
  } as any
};
