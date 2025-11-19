import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import FormButton from './components/FormButton';
import Img from './components/Img';

import { getQuestionsByQuizId } from '../utils/database';

import { COLORS, IMAGES, SIZES } from '../constants/theme';

const QuizScreen = ({ navigation, route }) => {
  const { title, id, description, imageUrl, user } = route.params;
  const [points, setPoints] = useState([]);

  const getQuizDetails = async () => {
    const pointsRef = getQuestionsByQuizId(id);  // collection(db, "Quizzes", id, "QNA")

    onSnapshot(pointsRef, (docs) => {
      console.log("change QuizScreen");
      let tempQuestions = [];

      docs.forEach((res) => {
        const question = {
          id: res.id,
          ...res.data(),
        };
      
        // image
        if (!question.imageUrl) {
          question.imageUrl = IMAGES.noImage;
        }
      
        // shuffle options
        question.allOptions = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
      
        tempQuestions.push(question);
      });
     
      setPoints(tempQuestions);
    });
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

