import en_US from './en_US';
import zh from './zh';
import getLocaleModel from './getModel';
import TranslationProvider from './TranslationProvider';
import translate from './translate';

export const DEFAULT_LOCALE = "en";

export const messages = {
  zh,
  en_US,
};

export {
  getLocaleModel,
  TranslationProvider,
  translate,
};