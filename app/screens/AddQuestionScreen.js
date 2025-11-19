import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

import FormInput from './components/FormInput';
import FormButton from './components/FormButton';

import { createQuestion } from '../utils/database';
import { storage } from '../utils/firebase';

import { COLORS } from '../constants/theme';

const AddQuestionScreen = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(
    route.params.currentQuizId,
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  const isNum = (val) => (/^(0|[1-9]\d*)(\.[0-9]*)?$/.test(val))

  const handleQuestionSave = async () => {
    if (
      title == '' ||
      description == '' ||
      !isNum(latitude) ||
      !isNum(longitude) ||
      question == '' ||
      correctAnswer == '' ||
      optionTwo == '' ||
      optionThree == '' ||
      optionFour == ''
    ) {
      ToastAndroid.show('Ошибка ввода', ToastAndroid.SHORT);
      return;
    }

    let currentQuestionId = Math.floor(
      100000 + Math.random() * 9000,
    ).toString();

    // Upload Image
    let imageUrl = '';

    if (imageUri != '') {
      const responce = await fetch(imageUri);
      const blob = await responce.blob();

      const reference = storage.ref().child(
        `/images/questions/${currentQuizId}_${currentQuestionId}`,
      );
      await reference.put(blob).then(() => {
        console.log('Изображение добавлено');
      })
      imageUrl = await reference.getDownloadURL();
    }

    // Add question to db
    await createQuestion(currentQuizId, currentQuestionId, {
      title: title,
      description: description,
      latitude: latitude,
      longitude: longitude,
      question: question,
      correct_answer: correctAnswer,
      incorrect_answers: [optionTwo, optionThree, optionFour],
      imageUrl: imageUrl,
    });
    ToastAndroid.show('Достопримечательнось сохранена', ToastAndroid.SHORT);

    // Reset
    setTitle('');
    setDescription('');
    setLatitude('');
    setLongitude('');
    setQuestion('');
    setCorrectAnswer('');
    setOptionTwo('');
    setOptionThree('');
    setOptionFour('');
    setImageUri('');
  };

  const selectImage = async () => {
    let result = await launchImageLibraryAsync(
      {
        mediaType: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }
    );
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}>
        <View style={{ padding: 20 }}>
          <Text
            style={styles.addQuestion}>
            Добавить достопримечательность
          </Text>

          <FormInput
            labelText="Название"
            onChangeText={val => setTitle(val)}
            value={title}
          />

          <FormInput
            labelText="Описание"
            onChangeText={val => setDescription(val)}
            value={description}
            multiline
            numberOfLines={4}
          />

          {/* Image upload */}
          {
            imageUri == '' ? (
              <TouchableOpacity
                style={styles.addImage}
                onPress={selectImage}>
                <Text style={{ opacity: 0.5, color: COLORS.primary }}>
                  + добавить фото
                </Text>
              </TouchableOpacity>
            ) : (
              <Image
                source={{
                  uri: imageUri,
                }}
                resizeMode={'cover'}
                style={styles.image}
              />
            )
          }

          <View style={{ marginTop: 20 }}>
            {/* Coordinates */}
            <FormInput
              labelText="Широта"
              onChangeText={val => setLatitude(val)}
              value={latitude}
            />
            <FormInput
              labelText="Долгота"
              onChangeText={val => setLongitude(val)}
              value={longitude}
            />

            {/* Question & Options */}
            <FormInput
              labelText="Вопрос"
              onChangeText={val => setQuestion(val)}
              value={question}
            />
            <FormInput
              labelText="Правильный ответ"
              onChangeText={val => setCorrectAnswer(val)}
              value={correctAnswer}
            />
            <FormInput
              labelText="Вариант 2"
              onChangeText={val => setOptionTwo(val)}
              value={optionTwo}
            />
            <FormInput
              labelText="Вариант 3"
              onChangeText={val => setOptionThree(val)}
              value={optionThree}
            />
            <FormInput
              labelText="Вариант 4"
              onChangeText={val => setOptionFour(val)}
              value={optionFour}
            />
          </View>

          <FormButton
            labelText="Сохранить"
            handleOnPress={handleQuestionSave}
          />
          <FormButton
            labelText="Вернуться на главную"
            isPrimary={false}
            handleOnPress={() => {
              setCurrentQuizId('');
              navigation.navigate('Home');
            }}
            style={{ marginVertical: 20 }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addQuestion: {
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: 20,
  },
  addImage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    backgroundColor: COLORS.primary + '20',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  }
})
