import React from 'react';
import { Grid, Leaf, Coffee, Sparkles, HeartHandshake, Landmark } from 'lucide-react';
import { CATEGORIES, type CategoryId } from '../../types/category';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';
import { getCategoryLevels } from '../../data/wordPacks';

interface CategorySelectProps {
  onSelectCategory?: (id: CategoryId) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ onSelectCategory }) => {
  const { currentCategory, setCurrentCategory, language, t } = useGame();
  const { playButtonClick } = useCozyAudio();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf size={20} className="text-emerald-600" />;
      case 'Coffee':
        return <Coffee size={20} className="text-amber-600" />;
      case 'Sparkles':
        return <Sparkles size={20} className="text-indigo-600" />;
      case 'HeartHandshake':
        return <HeartHandshake size={20} className="text-orange-600" />;
      case 'Landmark':
        return <Landmark size={20} className="text-rose-600" />;
      case 'Grid':
      default:
        return <Grid size={20} className="text-cozy-mint-dark" />;
    }
  };

  const handleCategoryClick = (id: CategoryId) => {
    playButtonClick();
    setCurrentCategory(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2.5 px-2 select-none">
      <span className="text-xs font-black text-cozy-muted uppercase tracking-widest px-1">
        {t('categoriesTitle', 'Categorías de Palabras')}
      </span>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.id;
          const totalLevels = getCategoryLevels(cat.id, language).length;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`
                p-3.5 rounded-tile flex items-center gap-3 border transition-all cursor-pointer text-left
                ${isActive
                  ? 'bg-white border-cozy-mint shadow-md ring-2 ring-cozy-mint/30 scale-102'
                  : 'bg-cozy-card hover:bg-cozy-tile/60 border-cozy-tile-shadow/15 text-cozy-text/80'
                }
              `}
            >
              <div className={`p-2.5 rounded-full ${cat.themeColor} flex items-center justify-center shrink-0 shadow-xs`}>
                {getIcon(cat.iconName)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold truncate text-cozy-text leading-tight">
                  {t(`category_${cat.id}`, t(`category.${cat.id}`, cat.id.charAt(0).toUpperCase() + cat.id.slice(1)))}
                </span>
                <span className="text-[10px] font-bold text-cozy-muted uppercase tracking-wider mt-0.5">
                  {totalLevels} Nivel{totalLevels > 1 ? 'es' : ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
