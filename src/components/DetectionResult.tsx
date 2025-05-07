/** Hiển thị kết quả nhận dạng */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

interface Props {
  result: any;
}

const DetectionResult = ({result}: Props) => {
  if (!result) return null;

  return (
    <View style={styles.resultBox}>
      <Text style={styles.text}>Kết quả:</Text>
      <Text>{JSON.stringify(result, null, 2)}</Text>
    </View>
  );
};

export default DetectionResult;

const styles = StyleSheet.create({
  resultBox: {marginTop: 12},
  text: {fontWeight: 'bold', fontSize: 16},
});
