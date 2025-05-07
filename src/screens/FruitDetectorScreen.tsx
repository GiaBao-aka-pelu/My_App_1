/** Màn hình chính */
/*import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePickerButton from '../components/ImagePickerButton';
import SelectedImage from '../components/SelectedImage';
import DetectionResult from '../components/DetectionResult';
import {runModelOnImage, loadModel} from '../utils/modelUtils';

const FruitDetectorScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handlePickImage = async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (res.assets && res.assets[0]) {
      const uri = res.assets[0].uri!;
      setImageUri(uri);

      const output = await runModelOnImage(uri); // gọi hàm xử lý ảnh và chạy model
      setResult(output);
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerButton onPick={handlePickImage} />
      {imageUri && <SelectedImage uri={imageUri} />}
      <DetectionResult result={result} />
    </View>
  );
};

export default FruitDetectorScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
});
*/
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { runModelOnImage } from '../utils/modelUtils';

const FruitDetector = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    setResult(null);
    const res = await launchImageLibrary({ mediaType: 'photo' });

    if (res.assets && res.assets.length > 0) {
      const uri = res.assets[0].uri!;
      setImageUri(uri);

      setLoading(true);
      const output = await runModelOnImage(uri);
      setLoading(false);

      setResult(output);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nhận diện trái cây</Text>

      <TouchableOpacity style={styles.button} onPress={handlePickImage}>
        <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
      )}

      {loading && <ActivityIndicator size="large" color="#ff9900" style={{ marginTop: 20 }} />}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>📋 Kết quả nhận diện:</Text>
          <Text style={styles.resultText}>{JSON.stringify(result, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default FruitDetector;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 16,
    marginVertical: 20,
  },
  resultBox: {
    marginTop: 16,
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
  },
  resultText: {
    color: '#222',
    fontFamily: 'monospace',
  },
});

