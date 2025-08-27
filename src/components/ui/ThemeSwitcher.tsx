import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import type { Theme } from '../../types';

interface ThemeSwitcherProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const themes: Theme[] = ['system', 'light', 'dark'];
  
  const getThemeInfo = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'light':
        return {
          icon: Sun,
          title: 'Tema Claro',
          description: 'Modo claro - Ideal para uso durante el día con buena iluminación'
        };
      case 'dark':
        return {
          icon: Moon,
          title: 'Tema Oscuro', 
          description: 'Modo oscuro - Reduce la fatiga visual en ambientes con poca luz'
        };
      default:
        return {
          icon: Monitor,
          title: 'Tema Automático',
          description: 'Automático - Se adapta a la configuración de tu sistema operativo'
        };
    }
  };

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const currentThemeInfo = getThemeInfo(theme);
  const Icon = currentThemeInfo.icon;
  
  return (
    <CustomTooltip
      title={currentThemeInfo.title}
      content={`${currentThemeInfo.description}. Haz clic para cambiar entre temas.`}
      icon={Icon}
      position="bottom"
    >
      <button 
        onClick={cycleTheme}
        className="p-2 rounded-full transition-colors bg-gray-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 hover:bg-gray-200 dark:hover:bg-slate-700 shadow"
      >
        <Icon size={16} />
      </button>
    </CustomTooltip>
  );
};

export default ThemeSwitcher;