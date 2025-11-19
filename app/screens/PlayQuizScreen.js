import Ionicons from '@expo/vector-icons/Ionicons';
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
import { getQuestionsByQuizId, getQuizById } from '../utils/database';

import FormButton from './components/FormButton';
import ResultModal from './components/ResultModal';

import { addQuizForUser, getDataByUid, updateXp } from '../utils/database';
import { auth } from '../utils/firebase';

import { COLORS } from '../constants/theme';

const PlayQuizScreen = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate random number
      let j = Math.floor(Math.random() * (i + 1));

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const getQuizAndQuestionDetails = async () => {
    // Get Quiz
    let currentQuiz = await getQuizById(currentQuizId);
    currentQuiz = currentQuiz.data();
    setTitle(currentQuiz.title);

    // Get Questions for current quiz
    const questions = await getQuestionsByQuizId(currentQuizId);

    questions.onSnapshot(async docs => {
      console.log('change PlayQuizScreen')
      const questionsDocs = docs.docs;
      let tempQuestions = [];

      await questionsDocs.forEach(async res => {
        let question = res.data();
  
        // Create Single array of all options and shuffle it
        question.allOptions = shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]);
        await tempQuestions.push(question);
      });
  
      setQuestions([...tempQuestions]);
    })
  };

  const pushDataInDb = async () => {
    await addQuizForUser(auth.currentUser?.uid, currentQuizId, {
      correctCount,
      incorrectCount,
      total: questions.length
    })
    updateUserXp()
  };

  const updateUserXp = async () => {
    const quizzes = await getDataByUid(auth.currentUser?.uid).get();
    let xp = 0;

    await quizzes.docs.forEach(async res => {
      let currentQuiz = res.data();
      xp += currentQuiz.correctCount;
    });

    await updateXp(auth.currentUser?.uid, xp)
  }

  useEffect(() => {
    getQuizAndQuestionDetails();
  }, []);

  const getOptionBgColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        if (currentOption == currentQuestion.correct_answer) {
          return COLORS.success;
        } else {
          return COLORS.error;
        }
      } else {
        return COLORS.white;
      }
    } else {
      return COLORS.white;
    }
  };

  const getOptionTextColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        return COLORS.white;
      } else {
        return COLORS.black;
      }
    } else {
      return COLORS.black;
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, position: 'relative', }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {/* Top Bar */}
      <View
        style={styles.topBar}>
        {/* Back Icon */}
        <Ionicons name="arrow-back" size={24} onPress={() => navigation.goBack()} />

        {/* Title */}
        <Text style={styles.topBarText}>{title}</Text>

        {/* Correct and incorrect count */}
        <View
          style={styles.viewCount}>
          {/* Correct */}
          <View
            style={styles.correct}>
            <Ionicons name="checkmark" size={14} style={{ color: COLORS.white }} />
            <Text style={{ color: COLORS.white, marginLeft: 6 }}>
              {correctCount}
            </Text>
          </View>

          {/* Incorrect */}
          <View
            style={styles.incorrect}>
            <Ionicons name="close" size={14} style={{ color: COLORS.white }} />
            <Text style={{ color: COLORS.white, marginLeft: 6 }}>
              {incorrectCount}
            </Text>
          </View>
        </View>
      </View>

      {/* Questions and Options list */}
      <FlatList
        data={questions}
        style={{ flex: 1, backgroundColor: COLORS.background }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question}
        renderItem={({ item, index }) => (
          <View
            style={styles.question}>
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 16 }}>
                {index + 1}. {item.question}
              </Text>
              {item.imageUrl != '' ? (
                <Image
                  source={{
                    uri: item.imageUrl,
                  }}
                  resizeMode={'contain'}
                  style={styles.img}
                />
              ) : null}
            </View>

            {/* Options */}
            {item.allOptions.map((option, optionIndex) => {
              return (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.option,
                    { backgroundColor: getOptionBgColor(item, option) }
                  ]}
                  onPress={() => {
                    if (item.selectedOption) {
                      return null;
                    }
                    // Increase correct/incorrect count
                    if (option == item.correct_answer) {
                      setCorrectCount(correctCount + 1);
                    } else {
                      setIncorrectCount(incorrectCount + 1);
                    }

                    let tempQuestions = [...questions];
                    tempQuestions[index].selectedOption = option;
                    setQuestions([...tempQuestions]);
                  }}>
                  <Text
                    style={[
                      styles.optionText,
                      { color: getOptionTextColor(item, option) }
                    ]}>
                    {optionIndex + 1}
                  </Text>
                  <Text style={{ color: getOptionTextColor(item, option) }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        ListFooterComponent={() => (
          <FormButton
            labelText="Отправить"
            style={{ margin: 10 }}
            handleOnPress={() => {
              // Show Result modal
              setIsResultModalVisible(true);
            }}
          />
        )}
      />

      {/* Result Modal */}
      <ResultModal
        isModalVisible={isResultModalVisible}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        totalCount={questions.length}
        handleOnClose={() => {
          setIsResultModalVisible(false);
        }}
        handleRetry={() => {
          setCorrectCount(0);
          setIncorrectCount(0);
          getQuizAndQuestionDetails();
          setIsResultModalVisible(false);
          pushDataInDb();
        }}
        handleBack={() => {
          navigation.goBack();
          setIsResultModalVisible(false);
          pushDataInDb();
        }}
      />
    </SafeAreaView>
  );
};

export default PlayQuizScreen;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  topBarText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  correct: {
    backgroundColor: COLORS.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  incorrect: {
    backgroundColor: COLORS.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  question: {
    marginTop: 14,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    elevation: 2,
    borderRadius: 2,
  },
  img: {
    width: '80%',
    height: 150,
    marginTop: 20,
    marginLeft: '10%',
    borderRadius: 5,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionText: {
    width: 25,
    height: 25,
    padding: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    textAlign: 'center',
    marginRight: 16,
    borderRadius: 25,
  },
})
