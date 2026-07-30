import type { CategoryId } from '../types/category';

export interface WordPack {
  id: CategoryId;
  nameKey: string;
  iconName: string;
  themeColor: string;
  words: Record<string, string[]>;
}

export const WORD_PACKS: Record<CategoryId, WordPack> = {
  nature: {
    id: 'nature',
    nameKey: 'category_nature',
    iconName: 'Leaf',
    themeColor: 'bg-emerald-100',
    words: {
      es: [
        'BOSQUE', 'HOJA', 'RAMA', 'FLOR', 'ROBLE',
        'MUSGO', 'VALLE', 'BRISA', 'RÍO', 'PINO',
        'NUBE', 'PRADO', 'FAUNA', 'FLORA', 'BRUMA'
      ],
      en: [
        'FOREST', 'LEAF', 'TREE', 'LAKE', 'OAK',
        'MOSS', 'RIVER', 'BREEZE', 'PINES', 'RAIN',
        'MEADOW', 'VALLEY', 'FAUNA', 'FLORA', 'STREAM'
      ],
      fr: [
        'BOIS', 'MOUSSE', 'CHÊNE', 'FLEUR', 'BRISE',
        'RIVIÈRE', 'ROCHELLE', 'PÉTALE', 'FORÊT', 'VALLÉE',
        'PIERRE', 'PLANTE', 'HERBE', 'FAUNE', 'FLORE'
      ],
      de: [
        'WALD', 'MOOS', 'EICHE', 'BLUME', 'BRISE',
        'FLUSS', 'FELSEN', 'BLATT', 'NATUR', 'TAL',
        'REGEN', 'WIESE', 'ZWEIG', 'FORST', 'STEIN'
      ],
      it: [
        'BOSCO', 'MUSCHIO', 'QUERCIA', 'FIORE', 'BREZZA',
        'FIUME', 'ROCCIA', 'PETALO', 'FORESTA', 'VALLE',
        'PIANTA', 'PRATO', 'PIOGGIA', 'FOGLIA', 'RAMO'
      ],
      pt: [
        'MATA', 'MUSGO', 'CARVALHO', 'FLOR', 'BRISA',
        'RIO', 'ROCHA', 'PÉTALA', 'FLORESTA', 'VALE',
        'PLANTA', 'PRADO', 'CHUVA', 'FOLHA', 'RAMO'
      ],
    },
  },
  bakery: {
    id: 'bakery',
    nameKey: 'category_bakery',
    iconName: 'Coffee',
    themeColor: 'bg-amber-100',
    words: {
      es: [
        'CAFÉ', 'PAN', 'MIEL', 'CANELA', 'MATCHA',
        'CACAO', 'TARTA', 'HARINA', 'CREMA', 'AZÚCAR',
        'PASTEL', 'GALLETA', 'POSTRE', 'MASA', 'VAINILLA'
      ],
      en: [
        'COFFEE', 'BREAD', 'HONEY', 'CINNAMON', 'MATCHA',
        'COCOA', 'TART', 'FLOUR', 'CREAM', 'SUGAR',
        'CAKE', 'COOKIE', 'PASTRY', 'DOUGH', 'VANILLA'
      ],
      fr: [
        'PAIN', 'GÂTEAU', 'MIEL', 'CACAO', 'CRÈME',
        'FARINE', 'CANNELE', 'BRIOCHE', 'SUCRE', 'FOUR',
        'TARTE', 'BISCUIT', 'PÂTE', 'CHOC', 'NAPPAGE'
      ],
      de: [
        'BROT', 'KUCHEN', 'HONIG', 'KAKAO', 'CREME',
        'MEHL', 'ZUCKER', 'BACKEN', 'KEKS', 'OFEN',
        'TORTE', 'TEIG', 'SAHNE', 'SEMME', 'KEKSE'
      ],
      it: [
        'PANE', 'TORTA', 'MIELE', 'CACAO', 'CREMA',
        'FARINA', 'DOCE', 'BRIOCHE', 'ZUCCHERO', 'FORNO',
        'PASTA', 'BISCOTTO', 'DOLCE', 'PANNA', 'SCONE'
      ],
      pt: [
        'PÃO', 'BOLO', 'MEL', 'CACAU', 'CREME',
        'FARINHA', 'DOCE', 'BRIOCHE', 'AÇÚCAR', 'FORNO',
        'TORTA', 'MASSA', 'BISCOITO', 'PASTEL', 'XAROPE'
      ],
    },
  },
  astral: {
    id: 'astral',
    nameKey: 'category_astral',
    iconName: 'Sparkles',
    themeColor: 'bg-indigo-100',
    words: {
      es: [
        'SOL', 'LUNA', 'ORBE', 'CIELO', 'ESTRELLA',
        'COMETA', 'COSMOS', 'AURA', 'ORBITA', 'NEBULA',
        'GALAXIA', 'ZODIACO', 'PLANETA', 'ECLIPSE', 'METEORO'
      ],
      en: [
        'SUN', 'MOON', 'ORB', 'SKY', 'STAR',
        'COMET', 'COSMOS', 'AURA', 'ORBIT', 'NEBULA',
        'GALAXY', 'ZODIAC', 'PLANET', 'ECLIPSE', 'METEOR'
      ],
      fr: [
        'ÉTOILE', 'ORBITE', 'LUNE', 'COMÈTE', 'ASTRE',
        'GALAXIE', 'ECLIPSE', 'COSMOS', 'AURORE', 'ESPACE',
        'SOLEIL', 'CIEL', 'ORBE', 'METEORE', 'NOVA'
      ],
      de: [
        'STERN', 'ORBIT', 'MOND', 'KOMET', 'NEBEL',
        'GALAXIE', 'EKLIPSE', 'KOSMOS', 'AURORA', 'RAUM',
        'SONNE', 'HIMMEL', 'ORB', 'METEOR', 'NOVA'
      ],
      it: [
        'STELLA', 'ORBITA', 'LUNA', 'COMETA', 'NEBULOSA',
        'GALASSIA', 'ECLIPSE', 'COSMO', 'AURORA', 'SPAZIO',
        'SOLE', 'CIELO', 'ORBE', 'METEORA', 'NOVA'
      ],
      pt: [
        'ESTRELA', 'ÓRBITA', 'LUA', 'COMETA', 'NEBULOSA',
        'GALÁXIA', 'ECLIPSE', 'COSMOS', 'AURORA', 'ESPAÇO',
        'SOL', 'CÉU', 'ORBE', 'METEORO', 'NOVA'
      ],
    },
  },
  animals: {
    id: 'animals',
    nameKey: 'category_animals',
    iconName: 'HeartHandshake',
    themeColor: 'bg-orange-100',
    words: {
      es: [
        'GATO', 'PERRO', 'OSO', 'LOBO', 'TIGRE',
        'CIERVO', 'ZORRO', 'LINCE', 'DELFÍN', 'ÁGUILA',
        'BÚHO', 'JIRAFA', 'LEÓN', 'PANTERA', 'KOALA'
      ],
      en: [
        'CAT', 'DOG', 'BEAR', 'WOLF', 'TIGER',
        'DEER', 'FOX', 'LYNX', 'DOLPHIN', 'EAGLE',
        'OWL', 'GIRAFFE', 'LION', 'PANTHER', 'KOALA'
      ],
      fr: [
        'LOUTRE', 'HIBOU', 'RENARD', 'CERF', 'LYNX',
        'DAUPHIN', 'CASTOR', 'PANDA', 'CHAT', 'OURS',
        'AIGLE', 'GIRAFE', 'LION', 'PANTHÈRE', 'KOALA'
      ],
      de: [
        'OTTER', 'EULE', 'FUCHS', 'HIRSCH', 'LUCHS',
        'DELPHIN', 'BIBER', 'PANDA', 'KATZE', 'BÄR',
        'ADLER', 'GIRAFFE', 'LÖWE', 'PANTHER', 'KOALA'
      ],
      it: [
        'LONTRA', 'GUFO', 'VOLPE', 'CERVO', 'LINCE',
        'DELFINO', 'CASTORO', 'PANDA', 'GATTO', 'ORSO',
        'AQUILA', 'GIRAFFA', 'LEONE', 'PANTERA', 'KOALA'
      ],
      pt: [
        'LONTRA', 'CORUJA', 'RAPOSA', 'VEADO', 'LINCE',
        'GOLFINHO', 'CASTOR', 'PANDA', 'GATO', 'URSO',
        'ÁGUIA', 'GIRAFA', 'LEÃO', 'PANTERA', 'KOALA'
      ],
    },
  },
  culture: {
    id: 'culture',
    nameKey: 'category_culture',
    iconName: 'Landmark',
    themeColor: 'bg-rose-100',
    words: {
      es: [
        'TEATRO', 'DANZA', 'MÚSICA', 'PINTURA', 'MUSEO',
        'RITO', 'MITO', 'FIESTA', 'LEYENDA', 'POESÍA',
        'HISTORIA', 'ARTE', 'TEMPLO', 'RITUAL', 'FOLCLORE'
      ],
      en: [
        'THEATER', 'DANCE', 'MUSIC', 'PAINTING', 'MUSEUM',
        'RITE', 'MYTH', 'FESTIVAL', 'LEGEND', 'POETRY',
        'HISTORY', 'ART', 'TEMPLE', 'HERITAGE', 'FOLKLORE'
      ],
      fr: [
        'THÉÂTRE', 'DANSE', 'MUSIQUE', 'PEINTURE', 'MUSÉE',
        'RITE', 'MYTHE', 'FÊTE', 'LÉGENDE', 'POÉSIE',
        'HISTOIRE', 'ART', 'TEMPLE', 'RITUEL', 'FOLKLORE'
      ],
      de: [
        'THEATER', 'TANZ', 'MUSIK', 'MALEREI', 'MUSEUM',
        'RITUS', 'MYTHOS', 'FEST', 'LEGENDE', 'POESIE',
        'KULTUR', 'KUNST', 'TEMPEL', 'RITUAL', 'FOLKLORE'
      ],
      it: [
        'TEATRO', 'DANZA', 'MUSICA', 'PITTURA', 'MUSEO',
        'RITO', 'MITO', 'FESTA', 'LEGGENDA', 'POESIA',
        'STORIA', 'ARTE', 'TEMPIO', 'RITUALE', 'FOLCLORE'
      ],
      pt: [
        'TEATRO', 'DANÇA', 'MÚSICA', 'PINTURA', 'MUSEU',
        'RITO', 'MITO', 'FESTA', 'LENDA', 'POESIA',
        'HISTÓRIA', 'ARTE', 'TEMPLO', 'RITUAL', 'FOLCLORE'
      ],
    },
  },
  general: {
    id: 'general',
    nameKey: 'category_general',
    iconName: 'Grid',
    themeColor: 'bg-cozy-tile',
    words: {
      es: [
        'CAFÉ', 'LANA', 'FUEGO', 'TAPIZ', 'HOJA',
        'CABAÑA', 'BOSQUE', 'MIEL', 'SUEÑO', 'BRISA',
        'MANTA', 'CHIMENEA', 'LINTERNA', 'TAZA', 'CALIDEZ'
      ],
      en: [
        'COZY', 'WARM', 'MINT', 'TEA', 'WOOD',
        'CABIN', 'FOREST', 'HONEY', 'SLEEP', 'WIND',
        'BLANKET', 'FIRESIDE', 'LANTERN', 'MUG', 'GLOW'
      ],
      fr: [
        'CAFÉ', 'LÈVRES', 'FEU', 'BOIS', 'DOUX',
        'CHALET', 'FORÊT', 'MIEL', 'SOMMEIL', 'VENT',
        'PLAID', 'BOUGIE', 'LANTERNE', 'TASSE', 'DOUCEUR'
      ],
      de: [
        'TEE', 'HOLZ', 'WARM', 'OFEN', 'HEISS',
        'HÜTTE', 'WALD', 'HONIG', 'SCHLAF', 'WIND',
        'DECKE', 'KAMIN', 'LATERNE', 'BECHER', 'GLAS'
      ],
      it: [
        'TÈ', 'LANA', 'FUOCO', 'NIDO', 'CACAO',
        'BAITA', 'BOSCO', 'MIELE', 'SONNO', 'VENTO',
        'COPERTA', 'CAMINO', 'LANTERNA', 'TAZZA', 'CALORE'
      ],
      pt: [
        'CHÁ', 'CAFÉ', 'FOGO', 'MEIA', 'DOCE',
        'CABANA', 'FLORESTA', 'MEL', 'SONO', 'VENTO',
        'MANTA', 'LAREIRA', 'LANTERNA', 'CHÁVENA', 'QUENTE'
      ],
    },
  },
};

/**
 * Retrieves word list for a category and language with English ('en') fallback.
 */
export function getCategoryWordList(category: CategoryId, lang: string): string[] {
  const pack = WORD_PACKS[category] || WORD_PACKS.general || WORD_PACKS.nature;
  return pack.words[lang] || pack.words['en'] || pack.words['es'] || [];
}

/**
 * Returns level chunks (5 words per level) for a given category and language.
 */
export function getCategoryLevels(category: CategoryId, lang: string, wordsPerLevel: number = 5): string[][] {
  const wordsList = getCategoryWordList(category, lang);
  if (wordsList.length === 0) return [];

  const levels: string[][] = [];
  for (let i = 0; i < wordsList.length; i += wordsPerLevel) {
    levels.push(wordsList.slice(i, i + wordsPerLevel));
  }

  return levels;
}
