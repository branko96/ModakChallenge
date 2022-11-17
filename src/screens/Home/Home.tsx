import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack, IconButton, Spacer, Text } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../App';
import HeartIcon from '../../components/HeartIcon';
import ImageCharging from '../../components/ImageCharging';
import { getItem, saveItem } from '../../utils/storage';
import { IArtwork } from '../../interfaces/artwork';
import { fetchArtworks } from '../../services/artworks';
import { buildImageUri, buildRawImageUri } from '../../utils/image';
import { styles } from './styles';

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: HomeProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const { data: artworks, isLoading } = useQuery({
    queryKey: ['fetchArtworks'],
    queryFn: fetchArtworks,
  });

  useEffect(() => {
    getItem('favorites').then(items => {
      const savedFavorites = items ? JSON.parse(items) : [];
      setFavorites(savedFavorites);
    });
  }, []);

  const toggleFavorite = async (itemId: number) => {
    let newFavorites: number[] = [];

    if (favorites.includes(itemId)) {
      const itemIndex = favorites.indexOf(itemId);
      newFavorites = favorites.slice(0, itemIndex);
    } else {
      newFavorites = [...favorites];
      newFavorites.push(itemId);
    }

    await saveItem(JSON.stringify(newFavorites), 'favorites');
    setFavorites(newFavorites);
  };

  return (
    <Box flex="1">
      {isLoading ? (
        <Box flex="1" height="full" alignItems="center" mt="4">
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList<IArtwork>
          data={artworks?.data?.data}
          keyExtractor={item => `artwork_${item.id}`}
          renderItem={({ item }) => {
            return (
              <Box borderBottomWidth="1" borderColor="muted.300" px="2" py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Detail', { id: item.id });
                    }}>
                    <ImageCharging
                      source={buildImageUri(item?.image_id, 200)}
                      imageThumbnailSource={buildRawImageUri(
                        item?.thumbnail?.lqip,
                      )}
                      style={styles.itemAvatar}
                    />
                  </Pressable>
                  <Box flex="8">
                    <Text
                      color="coolGray.800"
                      numberOfLines={2}
                      pr={70}
                      flex="1"
                      ellipsizeMode="tail"
                      bold>
                      {item.title}
                    </Text>
                    <Text color="coolGray.600">
                      {item.artist_title || 'Unknown'} - {item.date_display}
                    </Text>
                  </Box>
                  <Box flex="1" justifyContent="center">
                    <IconButton
                      size={10}
                      variant="ghost"
                      onPress={() => toggleFavorite(item.id)}
                      _icon={{
                        as: HeartIcon({ filled: favorites.includes(item.id) }),
                      }}
                    />
                  </Box>
                  <Spacer />
                </HStack>
              </Box>
            );
          }}
        />
      )}
    </Box>
  );
}
