import type { LanguageCode } from '../i18n/i18nConfig';

export interface LevelData {
  id: number;
  displayName: Record<LanguageCode, string>;
  words: string[];
  memorizeTime: number; // Duration in seconds for memorization phase
  searchTime?: number;  // Duration in seconds for searching phase
}

export const LOCALIZED_LEVELS: Record<LanguageCode, LevelData[]> = {
  en: [
    {
      id: 1,
      displayName: { en: "Cozy Hearth", es: "Hogar Acogedor", fr: "Foyer Douillet", de: "Gemütlicher Herd", pt: "Lareira Aconchegante", it: "Focolare Accogliente" },
      words: ["COZY", "WARM", "MINT", "TEA", "WOOD"],
      memorizeTime: 10,
    },
    {
      id: 2,
      displayName: { en: "Forest Cabin", es: "Cabaña del Bosque", fr: "Chalet en Forêt", de: "Waldhütte", pt: "Cabana na Floresta", it: "Baita nel Bosco" },
      words: ["CABIN", "FOREST", "HONEY", "SLEEP", "WIND"],
      memorizeTime: 15,
    },
    {
      id: 3,
      displayName: { en: "Autumn Evening", es: "Tarde de Otoño", fr: "Soirée d'Automne", de: "Herbstabend", pt: "Tarde de Outono", it: "Sera d'Autunno" },
      words: ["BLANKET", "FIRESIDE", "LANTERN", "MUG", "GLOW"],
      memorizeTime: 20,
    }
  ],
  es: [
    {
      id: 1,
      displayName: { en: "Cozy Hearth", es: "Hogar Acogedor", fr: "Foyer Douillet", de: "Gemütlicher Herd", pt: "Lareira Aconchegante", it: "Focolare Accogliente" },
      words: ["CAFÉ", "LANA", "FUEGO", "TAPIZ", "HOJA"],
      memorizeTime: 10,
    },
    {
      id: 2,
      displayName: { en: "Forest Cabin", es: "Cabaña del Bosque", fr: "Chalet en Forêt", de: "Waldhütte", pt: "Cabana na Floresta", it: "Baita nel Bosco" },
      words: ["CABAÑA", "BOSQUE", "MIEL", "SUEÑO", "BRISA"],
      memorizeTime: 15,
    },
    {
      id: 3,
      displayName: { en: "Autumn Evening", es: "Tarde de Otoño", fr: "Soirée d'Automne", de: "Herbstabend", pt: "Tarde de Outono", it: "Sera d'Autunno" },
      words: ["MANTA", "CHIMENEA", "LINTERNA", "TAZA", "CALIDEZ"],
      memorizeTime: 20,
    }
  ],
  fr: [
    {
      id: 1,
      displayName: { en: "Cozy Hearth", es: "Hogar Acogedor", fr: "Foyer Douillet", de: "Gemütlicher Herd", pt: "Lareira Aconchegante", it: "Focolare Accogliente" },
      words: ["CAFÉ", "LÈVRES", "FEU", "BOIS", "DOUX"],
      memorizeTime: 10,
    },
    {
      id: 2,
      displayName: { en: "Forest Cabin", es: "Cabaña del Bosque", fr: "Chalet en Forêt", de: "Waldhütte", pt: "Cabana na Floresta", it: "Baita nel Bosco" },
      words: ["CHALET", "FORÊT", "MIEL", "SOMMEIL", "VENT"],
      memorizeTime: 15,
    },
    {
      id: 3,
      displayName: { en: "Autumn Evening", es: "Tarde de Otoño", fr: "Soirée d'Automne", de: "Herbstabend", pt: "Tarde de Outono", it: "Sera d'Autunno" },
      words: ["PLAID", "BOUGIE", "LANTERNE", "TASSE", "DOUCEUR"],
      memorizeTime: 20,
    }
  ],
  de: [
    {
      id: 1,
      displayName: { en: "Cozy Hearth", es: "Hogar Acogedor", fr: "Foyer Douillet", de: "Gemütlicher Herd", pt: "Lareira Aconchegante", it: "Focolare Accogliente" },
      words: ["TEE", "HOLZ", "WARM", "OFEN", "HEISS"],
      memorizeTime: 10,
    },
    {
      id: 2,
      displayName: { en: "Forest Cabin", es: "Cabaña del Bosque", fr: "Chalet en Forêt", de: "Waldhütte", pt: "Cabana na Floresta", it: "Baita nel Bosco" },
      words: ["HÜTTE", "WALD", "HONIG", "SCHLAF", "WIND"],
      memorizeTime: 15,
    },
    {
      id: 3,
      displayName: { en: "Autumn Evening", es: "Tarde de Otoño", fr: "Soirée d'Automne", de: "Herbstabend", pt: "Tarde de Outono", it: "Sera d'Autunno" },
      words: ["DECKE", "KAMIN", "LATERNE", "BECHER", "GLAS"],
      memorizeTime: 20,
    }
  ],
  pt: [
    {
      id: 1,
      displayName: { en: "Cozy Hearth", es: "Hogar Acogedor", fr: "Foyer Douillet", de: "Gemütlicher Herd", pt: "Lareira Aconchegante", it: "Focolare Accogliente" },
      words: ["CHÁ", "CAFÉ", "FOGO", "MEIA", "DOCE"],
      memorizeTime: 10,
    },
    {
      id: 2,
      displayName: { en: "Forest Cabin", es: "Cabaña del Bosque", fr: "Chalet en Forêt", de: "Waldhütte", pt: "Cabana na Floresta", it: "Baita nel Bosco" },
      words: ["CABANA", "FLORESTA", "MEL", "SONO", "VENTO"],
      memorizeTime: 15,
    },
    {
      id: 3,
      displayName: { en: "Autumn Evening", es: "Tarde de Otoño", fr: "Soirée d'Automne", de: "Herbstabend", pt: "Tarde de Outono", it: "Sera d'Autunno" },
      words: ["MANTA", "LAREIRA", "LANTERNA", "CHÁVENA", "QUENTE"],
      memorizeTime: 20,
    }
  ],
  it: [
    {
      id: 1,
      displayName: { en: "Cozy Hearth", es: "Hogar Acogedor", fr: "Foyer Douillet", de: "Gemütlicher Herd", pt: "Lareira Aconchegante", it: "Focolare Accogliente" },
      words: ["CACAO", "LANA", "FUOCO", "NIDO", "CACAO"],
      memorizeTime: 10,
    },
    {
      id: 2,
      displayName: { en: "Forest Cabin", es: "Cabaña del Bosque", fr: "Chalet en Forêt", de: "Waldhütte", pt: "Cabana na Floresta", it: "Baita nel Bosco" },
      words: ["BAITA", "BOSCO", "MIELE", "SONNO", "VENTO"],
      memorizeTime: 15,
    },
    {
      id: 3,
      displayName: { en: "Autumn Evening", es: "Tarde de Otoño", fr: "Soirée d'Automne", de: "Herbstabend", pt: "Tarde de Outono", it: "Sera d'Autunno" },
      words: ["COPERTA", "CAMINO", "LANTERNA", "TAZZA", "CALORE"],
      memorizeTime: 20,
    }
  ],
};
