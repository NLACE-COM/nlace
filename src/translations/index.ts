
import es from './es';
import en from './en';

// Tipo para las traducciones
type TranslationsType = {
  [key: string]: string;
};

// Objeto con todos los idiomas disponibles
const translations: {
  [key: string]: TranslationsType;
} = {
  es,
  en
};

export default translations;
