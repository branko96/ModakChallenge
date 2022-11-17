// Libraries
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle,
  Source,
} from 'react-native-fast-image';
import DefaultImage from '../assets/defaultImage.png';
import DefaultImageBig from '../assets/defaultImageBig.png';

export interface ImageChargingProps extends FastImageProps {
  children?: React.ReactNode[];
  imageThumbnailSource: number | Source | undefined;
  small?: boolean;
}
const imageOverlay: ImageStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
};

const ImageCharging = ({
  children,
  imageThumbnailSource,
  small = true,
  ...rest
}: ImageChargingProps) => {
  const [error, setError] = useState(false);
  const ImageDefault = small ? DefaultImage : DefaultImageBig;

  return (
    <View style={rest.style}>
      <FastImage
        {...rest}
        source={error ? ImageDefault : imageThumbnailSource}
        style={StyleSheet.absoluteFill}
      />
      <FastImage
        onError={() => {
          console.log('error');
          setError(true);
        }}
        {...rest}
        style={imageOverlay}
      />
      {children}
    </View>
  );
};

export default ImageCharging;
