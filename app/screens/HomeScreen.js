import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import {
  deleteQuiz,
  getDataByUidAndQuizId,
  getQuizzes,
  getUserById
} from '../utils/database';
import { auth } from '../utils/firebase';

import { COLORS, IMAGES } from '../constants/theme';

const HomeScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState({})

  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getUserInfo = async () => {
    const userInfo = await getUserById(auth.currentUser?.uid);
    userInfo.onSnapshot(data => {
      const userData = data.data();
      setUser(userData)
    })
  }

  const getAllQuizzes = async () => {

    setRefreshing(true);
    const quizzes = await getQuizzes();

    // Transform quiz data
    let tempQuizzes = [];
    for (quiz of quizzes.docs) {
      const userQuizzes = await getDataByUidAndQuizId(auth.currentUser?.uid, quiz.id);
      const userInfo = userQuizzes.data()
      await tempQuizzes.push({ id: quiz.id, userInfo, ...quiz.data() });
    }

    await setAllQuizzes([...tempQuizzes]);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllQuizzes();
    getUserInfo();
  }, []);

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      {/* Quiz list */}
      <FlatList
        data={allQuizzes}
        onRefresh={getAllQuizzes}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: 20 }}
        renderItem={({ item: quiz }) => (
          <>
            <View style={styles.item}>
              <Image
                source={{ uri: quiz.imageUrl ? quiz.imageUrl : IMAGES.noAvatar }}
                style={{ width: 60, height: 60, borderRadius: 30, marginRight: 20 }}
              />
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={{ fontSize: 16, color: COLORS.black }}>
                  {quiz.title}
                </Text>
                {
                  quiz.userInfo ? (
                    <Text style={{ opacity: 0.5 }}>
                      {quiz.userInfo.correctCount}/{quiz.userInfo.total}
                    </Text>
                  ) : null
                }
              </View>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => { navigation.navigate('QuizScreen', {...quiz, user}) }}
              >
                <Text style={{ color: COLORS.primary }}>Начать</Text>
              </TouchableOpacity>
              {
                user?.role == 'admin' ?
                  <TouchableOpacity
                    onPress={() => {
                      deleteQuiz(quiz.id);
                      getAllQuizzes()
                    }
                    }
                  >
                    <Ionicons name='close-circle' style={{fontSize: 35, color: COLORS.error}}/>
                  </TouchableOpacity>
                  : null
              }
            </View>
          </>
        )}
      />
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  item: {
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  touchableOpacity: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: COLORS.primary + '20',
  }
});
