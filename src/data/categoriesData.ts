import type { LanguageCode } from '../i18n/i18nConfig';
import type { CategoryId } from '../types/category';

export const CATEGORY_WORDS: Record<CategoryId, Record<LanguageCode, string[][]>> = {
  general: {
    es: [
      ['CAFÉ', 'LANA', 'FUEGO', 'TÉ', 'HOJA'],
      ['CABAÑA', 'BOSQUE', 'MIEL', 'SUEÑO', 'BRISA'],
      ['MANTA', 'CHIMENEA', 'LINTERNA', 'TAZA', 'CALIDEZ'],
    ],
    en: [
      ['COZY', 'WARM', 'MINT', 'TEA', 'WOOD'],
      ['CABIN', 'FOREST', 'HONEY', 'SLEEP', 'WIND'],
      ['BLANKET', 'FIRESIDE', 'LANTERN', 'MUG', 'GLOW'],
    ],
    fr: [
      ['CAFÉ', 'LÈVRES', 'FEU', 'BOIS', 'DOUX'],
      ['CHALET', 'FORÊT', 'MIEL', 'SOMMEIL', 'VENT'],
      ['COUVERTURE', 'CHEMINÉE', 'BOUGIE', 'TASSE', 'DOUCEUR'],
    ],
    de: [
      ['TEE', 'HOLZ', 'WARM', 'OFEN', 'HEISS'],
      ['HÜTTE', 'WALD', 'HONIG', 'SCHLAF', 'WIND'],
      ['DECKE', 'KAMIN', 'LATERNE', 'BECHER', 'GLAS'],
    ],
    pt: [
      ['CHÁ', 'CAFÉ', 'FOGO', 'MEIA', 'DOCE'],
      ['CABANA', 'FLORESTA', 'MEL', 'SONO', 'VENTO'],
      ['MANTA', 'LAREIRA', 'LANTERNA', 'CHÁVENA', 'QUENTINHO'],
    ],
    it: [
      ['TÈ', 'LANA', 'FUOCO', 'NIDO', 'CACAO'],
      ['BAITA', 'BOSCO', 'MIELE', 'SONNO', 'VENTO'],
      ['COPERTA', 'CAMINETTO', 'LANTERNA', 'TAZZA', 'CALORE'],
    ],
  },
  nature: {
    es: [
      ['BOSQUE', 'HOJA', 'RAMA', 'FLOR'],
      ['ROBLE', 'MUSGO', 'VALLE', 'BRISA'],
      ['RÍO', 'PINO', 'NUBE', 'PRADO'],
    ],
    en: [
      ['FOREST', 'LEAF', 'TREE', 'LAKE'],
      ['OAK', 'MOSS', 'RIVER', 'BREEZE'],
      ['PINES', 'RAIN', 'MEADOW', 'VALLEY'],
    ],
    fr: [
      ['FORÊT', 'FEUILLE', 'ARBRE', 'LAC'],
      ['CHÊNE', 'MOUSSE', 'RIVIÈRE', 'BRISE'],
      ['PIN', 'PLUIE', 'PRAIRIE', 'VALLEE'],
    ],
    de: [
      ['WALD', 'BLATT', 'BAUM', 'SEE'],
      ['EICHE', 'MOOS', 'FLUSS', 'BRISE'],
      ['KIEFER', 'REGEN', 'WIESE', 'TAL'],
    ],
    pt: [
      ['FLORESTA', 'FOLHA', 'ÁRVORE', 'LAGO'],
      ['CARVALHO', 'MUSGO', 'RIO', 'BRISE'],
      ['PINHO', 'CHUVA', 'PRADO', 'VALE'],
    ],
    it: [
      ['BOSCO', 'FOGLIA', 'ALBERO', 'LAGO'],
      ['QUERCIA', 'MUSCHIO', 'FIUME', 'BREZZA'],
      ['PINO', 'PIOGGIA', 'PRATO', 'VALLE'],
    ],
  },
  bakery: {
    es: [
      ['CAFÉ', 'MOKA', 'PAN', 'MIEL'],
      ['CANELA', 'MATCHA', 'CACAO', 'TARTA'],
      ['HARINA', 'CREMA', 'AZÚCAR', 'PASTEL'],
    ],
    en: [
      ['COFFEE', 'MOCHA', 'BREAD', 'HONEY'],
      ['CINNAMON', 'MATCHA', 'COCOA', 'TART'],
      ['FLOUR', 'CREAM', 'SUGAR', 'CAKE'],
    ],
    fr: [
      ['CAFÉ', 'MOKA', 'PAIN', 'MIEL'],
      ['CANELLE', 'MATCHA', 'CACAO', 'TARTE'],
      ['FARINE', 'CRÈME', 'SUCRE', 'GÂTEAU'],
    ],
    de: [
      ['KAFFEE', 'MOKA', 'BROT', 'HONIG'],
      ['ZIMT', 'MATCHA', 'KAKAO', 'TORTE'],
      ['MEHL', 'SAHNE', 'ZUCKER', 'KUCHEN'],
    ],
    pt: [
      ['CAFÉ', 'MOKA', 'PÃO', 'MEL'],
      ['CANELA', 'MATCHA', 'CACAU', 'TORTA'],
      ['FARINHA', 'CREME', 'AÇÚCAR', 'BOLO'],
    ],
    it: [
      ['CAFFÈ', 'MOKA', 'PANE', 'MIELE'],
      ['CANNELLA', 'MATCHA', 'CACAO', 'TORTA'],
      ['FARINA', 'CREMA', 'ZUCCHERO', 'DOLCE'],
    ],
  },
  astral: {
    es: [
      ['SOL', 'LUNA', 'ORBE', 'CIELO'],
      ['ESTRELLA', 'COMETA', 'COSMOS', 'AURA'],
      ['ORBITA', 'NEBULA', 'GALAXIA', 'ZODIACO'],
    ],
    en: [
      ['SUN', 'MOON', 'ORB', 'SKY'],
      ['STAR', 'COMET', 'COSMOS', 'AURA'],
      ['ORBIT', 'NEBULA', 'GALAXY', 'ZODIAC'],
    ],
    fr: [
      ['SOLEIL', 'LUNE', 'ORBE', 'CIEL'],
      ['ÉTOILE', 'COMÈTE', 'COSMOS', 'AURA'],
      ['ORBITE', 'NÉBULEUSE', 'GALAXIE', 'ZODIAQUE'],
    ],
    de: [
      ['SONNE', 'MOND', 'ORB', 'HIMMEL'],
      ['STERN', 'KOMET', 'KOSMOS', 'AURA'],
      ['ORBIT', 'NEBEL', 'GALAXIE', 'ZODIAK'],
    ],
    pt: [
      ['SOL', 'LUA', 'ORBE', 'CÉU'],
      ['ESTRELA', 'COMETA', 'COSMOS', 'AURA'],
      ['ÓRBITA', 'NEBULOSA', 'GALÁXIA', 'ZODÍACO'],
    ],
    it: [
      ['SOLE', 'LUNA', 'ORBE', 'CIELO'],
      ['STELLA', 'COMETA', 'COSMO', 'AURA'],
      ['ORBITA', 'NEBULA', 'GALASSIA', 'ZODIACO'],
    ],
  },
  animals: {
    es: [
      ['GATO', 'PERRO', 'OSO', 'LOBO'],
      ['TIGRE', 'CIERVO', 'ZORRO', 'LINCE'],
      ['DELFÍN', 'ÁGUILA', 'BÚHO', 'JIRAFA'],
    ],
    en: [
      ['CAT', 'DOG', 'BEAR', 'WOLF'],
      ['TIGER', 'DEER', 'FOX', 'LYNX'],
      ['DOLPHIN', 'EAGLE', 'OWL', 'GIRAFFE'],
    ],
    fr: [
      ['CHAT', 'CHIEN', 'OURS', 'LOUP'],
      ['TIGRE', 'CERF', 'RENARD', 'LYNX'],
      ['DAUPHIN', 'AIGLE', 'HIBOU', 'GIRAFE'],
    ],
    de: [
      ['KATZE', 'HUND', 'BÄR', 'WOLF'],
      ['TIGER', 'HIRSCH', 'FUCHS', 'LUCHS'],
      ['DELPHIN', 'ADLER', 'EULE', 'GIRAFFE'],
    ],
    pt: [
      ['GATO', 'CÃO', 'URSO', 'LOBO'],
      ['TIGRE', 'VEADO', 'RAPOSA', 'LINCE'],
      ['GOLFINHO', 'ÁGUIA', 'CORUJA', 'GIRAFA'],
    ],
    it: [
      ['GATTO', 'CANE', 'ORSO', 'LUPO'],
      ['TIGRE', 'CERVO', 'VOLPE', 'LINCE'],
      ['DELFINO', 'AQUILA', 'GUFO', 'GIRAFFA'],
    ],
  },
};
