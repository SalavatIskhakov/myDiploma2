import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../constants/theme';

const ResultModal = ({
  isModalVisible,
  correctCount,
  incorrectCount,
  totalCount,
  handleOnClose,
  handleRetry,
  handleBack,
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}>
      <View
        style={styles.resultView}>
        <View
          style={styles.bg}>
          <Text style={{ fontSize: 28, color: COLORS.black }}>Результат</Text>
          <View
            style={styles.answers}>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ color: COLORS.success, fontSize: 30 }}>
                {correctCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Правильно</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ color: COLORS.error, fontSize: 30 }}>
                {incorrectCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Неправильно</Text>
            </View>
          </View>
          <Text style={{ opacity: 0.8 }}>
            {totalCount - (incorrectCount + correctCount)} без ответа
          </Text>

          {/* Try agian */}
          <TouchableOpacity
            style={styles.tryAgain}
            onPress={handleRetry}>
            <Ionicons name="refresh" style={{ color: COLORS.white, transform: [{ rotateY: '180deg' }] }} />
            <Text
              style={styles.tryAgainText}>
              Попробуйте еще раз
            </Text>
          </TouchableOpacity>
          {/* Go Back */}
          <TouchableOpacity
            style={styles.goBack}
            onPress={handleBack}>
            <Ionicons name="home" style={{ color: COLORS.primary }} />
            <Text
              style={styles.goBackText}>
              Вернуться назад
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
  resultView: {
    flex: 1,
    backgroundColor: COLORS.black + '90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 5,
    padding: 40,
    alignItems: 'center',
  },
  answers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tryAgain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    backgroundColor: COLORS.primary,
    marginTop: 20,
    borderRadius: 50,
  },
  tryAgainText: {
    textAlign: 'center',
    color: COLORS.white,
    marginLeft: 10,
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    backgroundColor: COLORS.primary + '20',
    marginTop: 20,
    borderRadius: 50,
  },
  goBackText: {
    textAlign: 'center',
    color: COLORS.primary,
    marginLeft: 10,
  },
});

