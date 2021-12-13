import React, { FC, useEffect, useState, useContext, createContext } from 'react';
import { Dimensions } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { getItem, setItem, StorageKey } from './Storage';
import themes from '../assets/themes';
import { Style } from './Types';

/* Setup
------------------------------------------------------------------- */
const { height, width } = Dimensions.get('screen');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const SCREEN_MARGIN = scale(15) * 2;
const CORE_THEME = {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_MARGIN,
  CONTENT_HEIGHT: SCREEN_HEIGHT - SCREEN_MARGIN,
  CONTENT_WIDTH: SCREEN_WIDTH - SCREEN_MARGIN,
};
const themeCollection = themes.map((theme) => ({ ...theme, ...CORE_THEME }));
const defaultTheme = themeCollection[0];

type ThemeType = typeof defaultTheme & typeof CORE_THEME;
export interface Theme extends ThemeType {}
export type SetTheme = (themeId: string) => void;
export type StylesCreator = (
  theme: Theme,
  scale: (size: number) => number,
  moderateScale: (size: number, factor?: number) => number,
  props?: any,
) => { [key: string]: Style };

function getTheme(themeKey?: string): ThemeType {
  return {
    ...CORE_THEME,
    ...(themes.find((theme) => theme.key === themeKey) || themes[0]),
  };
}

const getThemeKey = async (): Promise<string | null> => getItem(StorageKey.APP_THEME);

const setThemeKey = async (themeKey: string): Promise<boolean> =>
  setItem(StorageKey.APP_THEME, themeKey);

const ThemeContext = createContext({
  theme: defaultTheme,
  setThemeID: (() => {}) as SetTheme,
});

/* Them Provider
------------------------------------------------------------------- */
export const ThemeProvider: FC = ({ children }) => {
  const [themeID, setThemeID] = useState(themes[0].key);

  useEffect(() => {
    (async () => {
      const storedThemeID = await getThemeKey();
      if (storedThemeID) {
        setThemeID(storedThemeID);
      } else {
        setThemeID(themes[0].key);
      }
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: getTheme(themeID), setThemeID }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* useTheme Hook
------------------------------------------------------------------- */
export function useTheme(
  stylesCreator?: StylesCreator,
  props?: any,
): [ReturnType<StylesCreator>, ThemeType, ThemeType[], SetTheme] {
  const { theme, setThemeID } = useContext(ThemeContext);
  const setTheme = async (themeID: string) => {
    await setThemeKey(themeID);
    setThemeID(themeID);
  };
  const styles = stylesCreator ? stylesCreator(theme, scale, moderateScale, props) : {};
  return [styles, theme, themeCollection, setTheme];
}

export default {
  ThemeProvider,
  useTheme,
};
