import { Asset } from 'expo-asset';
import Font from 'expo-font';
import Images from '../images';

const cacheFonts = () => {
  const fontAssets: string[] = [];
  return fontAssets.map((font) => Font.loadAsync(font));
};

const cacheImages = () => {
  return Images.map((image) => Asset.loadAsync(image));
};

export const loadAssetsAsync = async () => {
  await cacheFonts();
  await cacheImages();
};
