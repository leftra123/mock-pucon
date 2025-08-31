# 🛠️ Guía de Desarrollo - Dashboard Hidrológico Río Claro

> **Guía completa para desarrolladores que trabajen en el proyecto de monitoreo hidrológico**

---

## 📋 Tabla de Contenidos

1. [🚀 Inicio Rápido para Desarrolladores](#-inicio-rápido-para-desarrolladores)
2. [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
3. [📦 Gestión de Estado](#-gestión-de-estado)
4. [🎨 Sistema de Diseño](#-sistema-de-diseño)
5. [⚡ Optimización de Performance](#-optimización-de-performance)
6. [🧪 Testing Guidelines](#-testing-guidelines)
7. [📝 Estándares de Código](#-estándares-de-código)
8. [🔧 Herramientas de Desarrollo](#-herramientas-de-desarrollo)
9. [🚀 Deployment y CI/CD](#-deployment-y-cicd)
10. [🐛 Debugging y Troubleshooting](#-debugging-y-troubleshooting)

---

## 🚀 Inicio Rápido para Desarrolladores

### Pre-requisitos de Desarrollo
- **Node.js** 18+ (recomendado: usar nvm)
- **npm** 8+ o **yarn** 1.22+
- **Visual Studio Code** (recomendado con extensiones)
- **Git** configurado

### Setup del Entorno de Desarrollo
```bash
# 1. Clonar y configurar
git clone https://github.com/leftra123/mock-pucon.git
cd mock-pucon
npm install

# 2. Configurar VSCode (opcional)
code . --install-extension bradlc.vscode-tailwindcss
code . --install-extension esbenp.prettier-vscode
code . --install-extension ms-vscode.vscode-typescript-next

# 3. Iniciar desarrollo
npm run dev
```

### Variables de Entorno (Desarrollo)
```bash
# .env.development (crear si necesario)
VITE_DEV_MODE=true
VITE_API_BASE_URL=http://localhost:3000
VITE_REFRESH_INTERVAL=3000
```

---

## 🏗️ Arquitectura del Proyecto

### Patrón Arquitectónico Principal
**Context + Reducer Pattern** para gestión de estado global, con **Component Composition** para UI.

```typescript
// Flujo de datos simplificado
Componentes → useContext(DashboardContext) → dispatch(action) → reducer → nuevo estado → re-render
```

### Estructura Organizacional

#### 🧩 **Components/** 
Organización funcional (no por tipo):
```
components/
├── alerts/          # Componentes de alertas y notificaciones
├── charts/          # Todo lo relacionado con visualizaciones
├── dashboard/       # Lógica específica del dashboard
├── layout/          # Estructura general de la app
├── maps/            # Componentes de mapas interactivos  
├── metrics/         # Tarjetas y displays de métricas
├── modals/          # Ventanas modales
├── reports/         # Generación de reportes
├── sidebar/         # Panel lateral y navegación
└── ui/              # Componentes reutilizables base
```

#### 🔄 **Contexts/**
Estado global centralizado:
```typescript
// DashboardContext.tsx
const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}>({ state: initialState, dispatch: () => null });
```

#### 🎣 **Hooks/**
Lógica de negocio extraída:
- `useOptimizedData.ts` - Manejo eficiente de datos en tiempo real
- `useTheme.ts` - Gestión de temas con persistencia
- `useReports.ts` - Generación de reportes PDF/Excel
- `usePersistentState.ts` - Estado persistente en localStorage

#### 📝 **Types/**
TypeScript strict con interfaces bien definidas:
```typescript
interface MetricDataPoint {
  timestamp: number;
  station1: number;
  station2: number;
  metric: MetricType;
  temperature?: number;
}
```

---

## 📦 Gestión de Estado

### Context + Reducer Pattern

#### Estado Global (`DashboardState`)
```typescript
interface DashboardState {
  selectedMetric: MetricType;      // Métrica activa
  timeRange: TimeRange;            // 30m, 1h, 6h, 24h
  globalDateRange: DateRange;      // Rango personalizado
  isAsideCollapsed: boolean;       // UI: panel lateral
  isFullscreen: boolean;           // UI: modo fullscreen
  showReportsPanel: boolean;       // UI: panel reportes
  data: MetricDataPoint[];         // Datos hidrológicos
  isLoading: boolean;              // Estado de carga
}
```

#### Acciones del Reducer
```typescript
type DashboardAction =
  | { type: 'SET_METRIC'; payload: MetricType }
  | { type: 'SET_TIME_RANGE'; payload: TimeRange }
  | { type: 'SET_GLOBAL_DATE_RANGE'; payload: DateRange }
  | { type: 'TOGGLE_ASIDE' }
  | { type: 'TOGGLE_FULLSCREEN' }
  | { type: 'TOGGLE_REPORTS_PANEL' }
  | { type: 'SET_DATA'; payload: MetricDataPoint[] }
  | { type: 'SET_LOADING'; payload: boolean };
```

### Best Practices para Estado

1. **Single Source of Truth**: Todo el estado crítico en DashboardContext
2. **Immutable Updates**: Usar spread operator y estructural cloning
3. **Performance**: Memoización en selectors pesados
4. **Persistencia**: Solo para preferencias de UI (tema, collapsed state)

```typescript
// ✅ Correcto: Update inmutable
case 'SET_METRIC':
  return { ...state, selectedMetric: action.payload };

// ❌ Incorrecto: Mutación directa  
case 'SET_METRIC':
  state.selectedMetric = action.payload;
  return state;
```

---

## 🎨 Sistema de Diseño

### Design Tokens (Tailwind Extended)

#### Paleta de Colores
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Estaciones
        station: {
          1: '#34d399',    // Verde esmeralda
          2: '#38bdf8',    // Azul cielo
        },
        // Métricas
        flow: '#34d399',
        level: '#38bdf8', 
        discharge: '#f97316',
        velocity: '#a855f7',
        // Sistema
        surface: {
          primary: '#ffffff',
          secondary: '#f8fafc',
        }
      }
    }
  }
}
```

#### Typography Scale
```css
/* Jerarquía tipográfica */
.text-display    → 4xl, font-bold     /* Títulos principales */
.text-heading    → 2xl, font-semibold /* Sección headers */
.text-subheading → xl, font-medium    /* Sub-headers */
.text-body       → base, font-normal  /* Texto cuerpo */
.text-caption    → sm, font-normal    /* Texto auxiliar */
.text-label      → xs, font-medium    /* Labels */
```

#### Spacing & Layout
- **Base unit**: 4px (0.25rem)
- **Component spacing**: 16px (4 units)
- **Section spacing**: 24px (6 units)
- **Page spacing**: 32px (8 units)

### Componentes Base Reutilizables

#### Card System
```tsx
// Componente base Card
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

// Uso consistente
<Card variant="elevated" size="md">
  <CardHeader title="Flujo del Río" />
  <CardContent>{children}</CardContent>
</Card>
```

#### Animation System
```tsx
// Framer Motion presets
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Responsive Design Guidelines

#### Breakpoints Strategy
- **Mobile First**: Comenzar desde 320px
- **Progressive Enhancement**: Agregar features en breakpoints mayores
- **Content First**: El contenido dicta los breakpoints, no dispositivos específicos

```typescript
// Breakpoints personalizados
const breakpoints = {
  xs: '320px',
  sm: '640px', 
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};
```

#### Layout Patterns
```tsx
// Grid responsivo para métricas
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  {metrics.map(metric => <MetricCard key={metric.id} {...metric} />)}
</div>

// Stack responsivo
<div className="flex flex-col lg:flex-row gap-6">
  <aside className="lg:w-64" />
  <main className="flex-1" />
</div>
```

---

## ⚡ Optimización de Performance

### Estrategias Implementadas

#### 1. Memoización Inteligente
```typescript
// Hook optimizado para datos
export const useOptimizedData = (timeRange: TimeRange) => {
  const [data, setData] = useState<MetricDataPoint[]>([]);
  
  const filteredData = useMemo(() => {
    return data.filter(point => 
      point.timestamp >= getTimeRangeStart(timeRange)
    );
  }, [data, timeRange]);
  
  return { data: filteredData, isLoading };
};
```

#### 2. Lazy Loading Estratégico
```typescript
// Carga diferida de componentes pesados
const FullscreenChartModal = lazy(() => 
  import('./FullscreenChartModal').then(module => ({
    default: module.FullscreenChartModal
  }))
);

const ReportsPanel = lazy(() => 
  import('./ReportsPanel').then(module => ({
    default: module.ReportsPanel  
  }))
);
```

#### 3. Debouncing para Updates Frecuentes
```typescript
// Evitar renders excesivos en inputs
const useDebouncedValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

### Performance Monitoring

#### Métricas Clave
- **Initial Load**: < 3s en 3G
- **Time to Interactive**: < 5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

#### Herramientas de Medición
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## 🧪 Testing Guidelines

### Estrategia de Testing (Para implementar)

#### 1. Unit Tests (Jest + React Testing Library)
```typescript
// Ejemplo: Componente MetricCard
describe('MetricCard', () => {
  it('should display metric value with correct formatting', () => {
    render(
      <MetricCard 
        metric="flow" 
        value={125.67} 
        unit="m³/s" 
      />
    );
    
    expect(screen.getByText('125.67 m³/s')).toBeInTheDocument();
  });
  
  it('should animate value changes', async () => {
    const { rerender } = render(<MetricCard value={100} />);
    rerender(<MetricCard value={200} />);
    
    await waitFor(() => {
      expect(screen.getByText('200')).toBeInTheDocument();
    });
  });
});
```

#### 2. Integration Tests
```typescript
// Ejemplo: Dashboard completo
describe('Dashboard Integration', () => {
  it('should update all charts when metric changes', () => {
    render(<Dashboard />);
    
    fireEvent.click(screen.getByText('Nivel'));
    
    expect(screen.getByTestId('time-flow-chart')).toHaveAttribute(
      'data-metric', 
      'level'
    );
  });
});
```

#### 3. E2E Tests (Playwright - Recomendado)
```typescript
// tests/e2e/dashboard.spec.ts
test('should navigate between metrics and update visualizations', async ({ page }) => {
  await page.goto('/');
  
  // Cambiar métrica
  await page.click('[data-testid="metric-flow"]');
  
  // Verificar actualización
  await expect(page.locator('[data-testid="main-chart"]')).toContainText('Flujo');
  
  // Cambiar rango temporal
  await page.click('[data-testid="time-range-1h"]');
  
  await page.waitForLoadState('networkidle');
});
```

### Configuración de Testing

#### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

---

## 📝 Estándares de Código

### Code Style Guidelines

#### 1. TypeScript Strict Rules
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

#### 2. Naming Conventions
```typescript
// ✅ Componentes: PascalCase
const MetricCard = () => {};

// ✅ Hooks: camelCase + 'use' prefix  
const useOptimizedData = () => {};

// ✅ Types/Interfaces: PascalCase
interface DashboardState {}
type MetricType = 'flow' | 'level';

// ✅ Constants: UPPER_SNAKE_CASE
const APP_CONFIG = {};
const TIME_RANGES = {};

// ✅ Functions: camelCase
const calculateAverage = () => {};
const formatMetricValue = () => {};
```

#### 3. File Organization
```
// ✅ Co-location por funcionalidad
components/
├── MetricCard/
│   ├── MetricCard.tsx
│   ├── MetricCard.types.ts
│   ├── MetricCard.test.tsx
│   └── index.ts

// ✅ Index files para exports limpios
// components/MetricCard/index.ts
export { MetricCard } from './MetricCard';
export type { MetricCardProps } from './MetricCard.types';
```

#### 4. Import Organization
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. External libraries
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// 3. Internal imports (absolute paths)
import { DashboardContext } from '@/contexts/DashboardContext';
import { MetricCard } from '@/components/ui/MetricCard';

// 4. Relative imports
import './Dashboard.css';
```

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    // React
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    
    // TypeScript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    
    // General
    'prefer-const': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
```

### Code Documentation Standards

#### 1. Component Documentation
```typescript
/**
 * MetricCard - Displays a hydrological metric with value, trend and sparkline
 * 
 * @param metric - Type of metric to display (flow, level, discharge, velocity)
 * @param value - Current numeric value 
 * @param unit - Display unit for the metric
 * @param trend - Percentage change from previous period
 * @param data - Time series data for sparkline visualization
 * @param isLoading - Loading state for skeleton display
 */
interface MetricCardProps {
  metric: MetricType;
  value: number;
  unit: string;
  trend?: number;
  data?: number[];
  isLoading?: boolean;
}
```

#### 2. Complex Logic Documentation  
```typescript
// 🔧 HARDCODED: Multiplicadores para simulación de datos
// Estos valores representan variaciones típicas entre estaciones
const STATION_MULTIPLIERS = {
  flow: { station1: 1.0, station2: 0.85 },     // Estación 2: 15% menos flujo
  level: { station1: 1.0, station2: 1.12 },    // Estación 2: 12% más nivel
  discharge: { station1: 1.0, station2: 0.93 }, // Estación 2: 7% menos caudal
  velocity: { station1: 1.0, station2: 1.08 }   // Estación 2: 8% más velocidad
};
```

---

## 🔧 Herramientas de Desarrollo

### VSCode Recommended Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode", 
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.sublime-keybindings"
  ]
}
```

### VSCode Settings
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### Development Scripts Enhancement

```json
// package.json - Scripts recomendados
{
  "scripts": {
    "dev": "vite --host",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "analyze": "npx vite-bundle-analyzer"
  }
}
```

### Git Hooks (Recomendado)
```json
// package.json - Husky setup
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run type-check && npm run test"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## 🚀 Deployment y CI/CD

### Build Optimization

#### Vite Configuration Production
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          maps: ['leaflet', 'react-leaflet'],
          utils: ['date-fns', 'lodash']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
```

### GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check  
      - run: npm run test:coverage
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Environment Management

```typescript
// src/config/environment.ts
const config = {
  development: {
    API_BASE_URL: 'http://localhost:3000',
    REFRESH_INTERVAL: 1000, // Más frecuente en dev
    LOG_LEVEL: 'debug'
  },
  production: {
    API_BASE_URL: 'https://api.pucon-sensors.cl',
    REFRESH_INTERVAL: 3000,
    LOG_LEVEL: 'error'
  }
};

export const ENV = config[import.meta.env.MODE as keyof typeof config];
```

---

## 🐛 Debugging y Troubleshooting

### React DevTools Optimization

```typescript
// Configurar nombres para DevTools  
const MetricCard = ({ metric, value }: MetricCardProps) => {
  // ... component logic
};

MetricCard.displayName = 'MetricCard';

// Custom hook naming
export const useOptimizedData = (timeRange: TimeRange) => {
  // ...
};
```

### Performance Profiling

```typescript
// Profiler para componentes pesados
import { Profiler } from 'react';

const onRenderCallback = (id: string, phase: 'mount' | 'update', actualDuration: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${id} ${phase} took ${actualDuration}ms`);
  }
};

<Profiler id="TimeFlowChart" onRender={onRenderCallback}>
  <TimeFlowChart data={data} />
</Profiler>
```

### Common Issues & Solutions

#### 1. Memory Leaks
```typescript
// ❌ Problema: Timer sin cleanup
useEffect(() => {
  const interval = setInterval(updateData, 3000);
  // Missing cleanup
}, []);

// ✅ Solución: Cleanup adecuado
useEffect(() => {
  const interval = setInterval(updateData, 3000);
  return () => clearInterval(interval);
}, []);
```

#### 2. Context Performance
```typescript
// ❌ Problema: Re-renders innecesarios
const contextValue = {
  state,
  dispatch,
  helpers: { formatValue, calculateTrend } // New object cada render
};

// ✅ Solución: Memoization
const contextValue = useMemo(() => ({
  state,
  dispatch,
  helpers: { formatValue, calculateTrend }
}), [state]);
```

#### 3. Bundle Size Issues
```bash
# Analizar bundle
npm run build
npx vite-bundle-analyzer dist/assets/*.js

# Identificar imports pesados
npx webpack-bundle-analyzer dist/assets/*.js
```

### Logging Strategy

```typescript
// utils/logger.ts
export const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🐛 ${message}`, ...args);
    }
  },
  info: (message: string, ...args: unknown[]) => {
    console.info(`ℹ️ ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`⚠️ ${message}`, ...args);
  },
  error: (message: string, error?: Error) => {
    console.error(`❌ ${message}`, error);
    // En producción: enviar a servicio de monitoring
  }
};
```

---

## 🎯 Best Practices Summary

### Do's ✅
- **State Management**: Usar Context + Reducer para estado global
- **Performance**: Implementar memoization donde sea crítico
- **TypeScript**: Tipado strict en toda la aplicación
- **Testing**: Cobertura mínima 80% en componentes críticos
- **Accessibility**: ARIA labels y keyboard navigation
- **Error Boundaries**: Captura de errores en componentes críticos

### Don'ts ❌
- **No prop drilling**: Usar Context para estado compartido
- **No mutaciones**: Siempre immutable updates
- **No console.log**: Usar sistema de logging estructurado
- **No hardcoding**: Centralizar configuración
- **No CSS inline**: Usar Tailwind classes o styled-components
- **No key={index}**: Usar IDs únicos y estables

### Performance Checklist
- [ ] Lazy loading implementado para rutas/componentes pesados
- [ ] Memoization en cálculos costosos
- [ ] Bundle splitting configurado
- [ ] Images optimizadas (WebP, lazy loading)
- [ ] Service Worker para caché (PWA)
- [ ] Métricas Web Vitals monitoreadas

---

**Última actualización**: Agosto 2025  
**Versión**: 1.2.0  
**Mantenido por**: Team Frontend - Pucón Sensors