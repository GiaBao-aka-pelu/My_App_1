/* Nút chọn ảnh */
import React from 'react';
import {Button} from 'react-native';

interface Props {
  onPick: () => void;
}

const ImagePickerButton = ({onPick}: Props) => {
  return <Button title="Chọn ảnh từ thư viện" onPress={onPick} />;
};

export default ImagePickerButton;
