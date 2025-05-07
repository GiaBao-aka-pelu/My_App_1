import { Platform } from 'react-native';
import { loadTensorflowModel } from 'react-native-fast-tflite';
import { resizeImage, readImageAsByteArray } from './imageUtils';


let model: any = null;

export const loadModel = async () => {
  if (model) return model;

  const modelPath = Platform.OS === 'android'
    ? 'best_float32.tflite'
    : 'best_float32.tflite'; // iOS sẽ tìm trong mainBundle

  model = await loadTensorflowModel({ url: modelPath });
  return model;
};
export const runModelOnImage = async (imageUri: string) => {
    try {
      const resizedUri = await resizeImage(imageUri, 640, 640); // resize ảnh
      const inputData = await readImageAsByteArray(resizedUri); // chuyển sang Uint8Array
  
      const model = await loadModel(); // load model
  
      const output = await model.run(inputData); // chạy infer
      return output;
    } catch (error) {
      console.error('runModelOnImage error:', error);
      return null;
    }
  };