import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchArtworkDetail } from '../../services/artworks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import ImageCharging from '../../components/ImageCharging';
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
} from 'native-base';
import { IArtwork } from '../../interfaces/artwork';
import { buildImageUri, buildRawImageUri } from '../../utils/image';
import { styles } from './styles';

export type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({ route }: DetailProps) {
  const { id } = route.params;
  const { data: artwork, isLoading } = useQuery({
    queryKey: ['fetchArtworkDetail', id],
    queryFn: () => fetchArtworkDetail(id),
  });
  const artworkDetail: IArtwork = artwork?.data?.data;

  return (
    <Box flex="1">
      {isLoading ? (
        <Box flex="1" height="full" alignItems="center" mt="4">
          <ActivityIndicator />
        </Box>
      ) : (
        <Box alignItems="center" mt="4">
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _light={styles.cardContainer}>
            <Box>
              <AspectRatio w="100%" ratio={4 / 3}>
                <ImageCharging
                  source={buildImageUri(artworkDetail?.image_id, 843)}
                  small={false}
                  imageThumbnailSource={buildRawImageUri(
                    artworkDetail?.thumbnail?.lqip,
                  )}
                  style={styles.coverImage}
                />
              </AspectRatio>
              <Center
                bg="violet.500"
                _text={styles.artworkType}
                position="absolute"
                bottom="0"
                px="3"
                py="1.5">
                {artworkDetail?.artwork_type_title?.toUpperCase()}
              </Center>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {artworkDetail?.title}
                </Heading>
                <Text
                  fontSize="xs"
                  _light={styles.artistName}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1">
                  {artworkDetail?.artist_title || 'Unknown'}
                </Text>
              </Stack>
              <Text fontWeight="400">
                <Text bold>Description:</Text>
                {artworkDetail?.thumbnail?.alt_text}
              </Text>
              <Text fontWeight="400">
                <Text bold>Origin:</Text>{' '}
                {artworkDetail?.place_of_origin || 'Unknown'}
              </Text>
              <Text fontWeight="400">
                <Text bold>Dimensions:</Text> {artworkDetail?.dimensions}
              </Text>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between">
                <HStack alignItems="center">
                  <Text color="coolGray.600" fontWeight="400">
                    <Text bold>Made on:</Text> {artworkDetail?.date_display}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
}
