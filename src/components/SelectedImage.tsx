/** Hiển thị ảnh được chọn */
import React from 'react';
import {Image, StyleSheet} from 'react-native';

interface Props {
  uri: string;
}

const SelectedImage = ({uri}: Props) => {
  return <Image source={{uri}} style={styles.image} />;
};

export default SelectedImage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    marginVertical: 16,
  },
});
