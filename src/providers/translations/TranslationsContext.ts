import React from 'react';
import defaultTranslations from '../../translations/en';
import type { Translations } from './Translations.types';

const RUIContext = React.createContext<Translations>(defaultTranslations);

export default RUIContext;
