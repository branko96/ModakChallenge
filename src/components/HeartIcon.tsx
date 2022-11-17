import React from 'react';
import { Center, Icon } from 'native-base';
import { Path } from 'react-native-svg';

export type HeartIconProps = {
  filled?: boolean;
};

export default function HeartIcon({ filled = false }: HeartIconProps) {
  return (
    <Center>
      <Icon size="xl" viewBox="0 0 24 24">
        {filled ? (
          <Path d="M12 4.435C10.011-.964 0-.162 0 8.003 0 12.071 3.06 17.484 12 23c8.94-5.516 12-10.929 12-14.997C24-.115 14-.996 12 4.435z" />
        ) : (
          <Path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021C19.784 3.01 22 4.319 22 7.192c0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13C2 4.516 3.965 2.999 6.28 3zm.001-2C3.098 1 0 3.187 0 7.192 0 11.853 5.57 16.619 12 23c6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238C10.715 2.042 8.478 1 6.281 1z" />
        )}
      </Icon>
    </Center>
  );
}
