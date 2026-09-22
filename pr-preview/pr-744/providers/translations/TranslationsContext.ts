import React from 'react';
import defaultTranslations from '../../translations/en';
import type { Translations } from './Translations.types';

const TranslationsContext = React.createContext<Translations>(defaultTranslations);

export default TranslationsContext;
