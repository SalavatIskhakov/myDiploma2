import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';

import Img from './components/Img';
import FormButton from './components/FormButton';

import { getQuestionsByQuizId } from '../utils/database';

import { COLORS, SIZES, IMAGES } from '../constants/theme';

const QuizScreen = ({ navigation, route }) => {
  const { title, id, description, imageUrl, user } = route.params;
  const [points, setPoints] = useState([]);

  const getQuizDetails = async () => {
    // Get Questions for current quiz
    const points = await getQuestionsByQuizId(id);

    points.onSnapshot(async docs => {
      console.log('change QuizScreen');
      const pointsDocs = docs.docs;
      let tempQuestions = [];

      pointsDocs.forEach(async res => {
        let question = res.data();
        question.id = res.id;
        // img question
        if (!question.imageUrl) {
          question.imageUrl = IMAGES.noImage;
        }

        // Create Single array of all options and shuffle it
        question.allOptions = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];

        await tempQuestions.push(question);
      });

      setPoints([...tempQuestions]);
    })
  };

  useEffect(() => {
    navigation.setOptions({ title })
    getQuizDetails();
  }, []);

  return (
    <ScrollView>
      {
        imageUrl ?
          <Image
            source={{ uri: imageUrl }}
            style={styles.img}
          /> :
          null
      }
      <View style={styles.container}>
        <Text style={{ textAlign: 'justify', fontSize: 18 }}>{description}</Text>
        {/* Points on the map */}
        {
          points.map(point => (
            <Img point={point} user={user} quizId={id} key={point.title} />
          ))
        }
        {
          user.role == 'admin' ?
            <TouchableOpacity
              style={styles.addImage}
              onPress={() => {
                navigation.navigate('AddQuestionScreen', {
                  currentQuizId: id,
                });
              }}
            >
              <Text style={{ color: COLORS.white }}>
                + добавить
              </Text>
            </TouchableOpacity>
            : null
        }
        <View style={{ alignItems: 'center' }}>
          <FormButton
            labelText='Сдать тест'
            style={styles.btn}
            handleOnPress={() => {
              navigation.navigate('PlayQuizScreen', {
                quizId: id,
              });
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.border,
    padding: 10,
    alignItems: 'center',
    paddingTop: 0,
  },
  img: {
    width: SIZES.width,
    height: SIZES.width / 4 * 3,
    marginBottom: 15,
  },
  btn: {
    width: '30%',
    borderRadius: 30,
    marginBottom: 5,
  },
  addImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    borderColor: 'grey',
    borderWidth: 3,
    borderRadius: 50,
  },
});

