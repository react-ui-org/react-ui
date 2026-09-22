import React from 'react';
import en from '../../translations/en';
import type { Translations } from './Translations.types';

const TranslationsContext = React.createContext<Translations>(en);

export default TranslationsContext;
