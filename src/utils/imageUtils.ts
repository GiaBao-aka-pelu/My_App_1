/** Resize, xử lý ảnh */
import {Image} from 'react-native-compressor';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

/**
 * Resize ảnh về kích thước phù hợp với YOLOv8
 */
export const resizeImage = async (uri: string, width = 640, height = 640): Promise<string> => {
  try {
    const resizedUri = await Image.compress(uri, {
      maxWidth: width,
      maxHeight: height,
      quality: 1,
      returnableOutputType: 'uri',
    });

    return resizedUri;
  } catch (error) {
    console.error('Resize image error:', error);
    return uri; // fallback nếu resize lỗi
  }
};

/**
 * Đọc ảnh thành mảng byte (Uint8Array) từ đường dẫn
 */
export const readImageAsByteArray = async (uri: string): Promise<Uint8Array> => {
  try {
    const path = Platform.OS === 'android' && uri.startsWith('file://') ? uri.replace('file://', '') : uri;
    const base64 = await RNFS.readFile(path, 'base64');
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch (error) {
    console.error('Read image as byte array failed:', error);
    return new Uint8Array();
  }
};