import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import { auth } from '../utils/firebase'
import { getUsers, getDataByUid } from '../utils/database';

import { COLORS, IMAGES } from '../constants/theme';

const Table = ({ text, value }) => (
  <View style={{ flexDirection: 'row', }}>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 22, color: COLORS.black }}>{text}</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 22, color: COLORS.black }}>{value}</Text>
    </View>
  </View>
)

const DetailsScreen = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const getAllDataOfUid = async () => {
    const quizzes = await getDataByUid(auth.currentUser?.uid);

    quizzes.onSnapshot(async docs => {
      console.log('change Statistics');
      const quizzesDocs = docs.docs;
      let quiz = 0;
      let correct = 0;
      let incorrect = 0;
      let total = 0;
  
      await quizzesDocs.forEach(async res => {
        let currentQuiz = res.data();
        quiz++;
        correct += currentQuiz.correctCount;
        incorrect += currentQuiz.incorrectCount;
        total += currentQuiz.total;
      });
  
      setQuizCount(quiz);
      setCorrectCount(correct);
      setIncorrectCount(incorrect);
      setTotalCount(total);
    })
  }

  const getAllUsers = async () => {
    const users = await getUsers();

    users.onSnapshot(async docs => {
      const usersDocs = docs.docs;
      console.log('change TOP10');

      let tempUsers = [];

      for (const user of usersDocs) {
        await tempUsers.push(user.data());
      }

      setAllUsers(
        tempUsers
          .filter(user => user?.role != 'admin')
          .sort((a, b) => {
            if (a.xp > b.xp) return -1;
            if (a.xp < b.xp) return 1;
            return 0;
          })
      )
    })
  }

  useEffect(() => {
    getAllDataOfUid();
    getAllUsers();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Statistics */}
        <Text style={styles.text}>Статистика</Text>
        <View style={styles.statistics}>
          <Table text={'Всего'} value={totalCount}></Table>
          <Table text={'Правильных'} value={correctCount}></Table>
          <Table text={'Неправильных'} value={incorrectCount}></Table>
          <Table text={'Квестов'} value={quizCount}></Table>
        </View>

        {/* Top */}
        <Text style={styles.text}>ТОП</Text>
        {
          allUsers.map((user, index) => {
            index++;

            if (index === 10) {
              return;
            }

            let backgroundColor = COLORS.white;

            if (index === 1) {
              backgroundColor = COLORS.gold;
            } else if (index === 2) {
              backgroundColor = COLORS.silver;
            } else if (index === 3) {
              backgroundColor = COLORS.bronze;
            }

            return (
              <View key={user.uid}>
                <View style={[
                  backgroundColor = { backgroundColor },
                  styles.item,
                  user.uid === auth.currentUser?.uid ? styles.borderCurrentUser : null
                ]}>
                  <Text style={{ fontSize: 20 }}>{index}</Text>
                  <Image
                    source={{ uri: user.imageUrl ? user.imageUrl : IMAGES.noAvatar }}
                    style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                  />
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={{ fontSize: 20, color: COLORS.black }}>
                      {user.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 20, color: COLORS.primary }}>{user.xp} очков</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 5,
  },
  statistics: {
    width: '100%',
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20
  },
  item: {
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  borderCurrentUser: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.primary,
  }
});
