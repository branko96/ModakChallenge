export const buildImageUri = (imageId: string, size: number) => {
  return {
    uri: `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`,
  };
};

export const buildRawImageUri = (imageUrl: string) => {
  return {
    uri: imageUrl,
  };
};
