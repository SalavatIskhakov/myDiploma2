import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';

import { COLORS } from '../constants/theme';

import { getUserById } from '../utils/database';
import { auth } from '../utils/firebase';

import { onSnapshot } from "firebase/firestore";
import CreateQuizScreen from './CreateQuizScreen';
import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  const [user, setUser] = useState({})

  const getUserInfo = async () => {
  console.log("change MainContainer");
  const userRef = getUserById(auth.currentUser?.uid); // это doc(db, "Users", uid)

  // подписка на realtime
  return onSnapshot(userRef, (snapshot) => {
    if (snapshot.exists()) {
      setUser(snapshot.data());
    }
  });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === 'Home') {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === 'Details') {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === 'CreateQuiz') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';

          } else if (rn === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';

          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >

      <Tab.Screen options={{ title: 'Главная', headerShown: false, screenOptions: COLORS.primary }} name={'Home'} component={HomeScreen} />
      <Tab.Screen options={{ title: 'Рейтинг', headerShown: false, screenOptions: COLORS.primary }} name={'Details'} component={DetailsScreen} />
      {
        user?.role == 'admin' ?
          <Tab.Screen options={{ title: 'Добавить', headerShown: false, screenOptions: COLORS.primary }} name={'CreateQuiz'} component={CreateQuizScreen} />
          : null
      }
      <Tab.Screen options={{ title: 'Настройки', headerShown: false, screenOptions: COLORS.primary }} name={'Settings'} component={SettingsScreen} />

    </Tab.Navigator>
  );
}

export default MainContainer;
