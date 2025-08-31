# 💻 Guía de Desarrollo Completa

## 🚀 **Primeros Pasos**

### Pre-requisitos de Desarrollo
- **Node.js** 18+ (recomendado: usar nvm)
- **npm** 8+ o **yarn** 1.22+
- **Visual Studio Code** (recomendado con extensiones)
- **Git** configurado

### Instalación Inicial
```bash
# 1. Clonar repositorio
git clone https://github.com/leftra123/mock-pucon.git
cd mock-pucon

# 2. Instalar dependencias
npm install

# 3. Configurar VSCode (opcional)
code . --install-extension bradlc.vscode-tailwindcss
code . --install-extension esbenp.prettier-vscode
code . --install-extension ms-vscode.vscode-typescript-next

# 4. Ejecutar en desarrollo
npm run dev

# 5. Abrir navegador
# http://localhost:5173
```

### Scripts Disponibles
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | ⚡ Servidor de desarrollo con hot reload |
| `npm run build` | 📦 Build para producción |
| `npm run preview` | 👀 Previsualizar build |
| `npm run lint` | 🔍 Linter de código |
| `npm run lint:fix` | 🔧 Corregir errores de linting automáticamente |
| `npm run type-check` | 📝 Verificación de tipos TypeScript |

## 🗂️ **Flujo de Desarrollo**

### 1. **Estructura de Trabajo**
```
Desarrollo típico:
1. Modificar configuración → src/config/constants.ts
2. Crear/editar componente → src/components/[categoria]/
3. Actualizar tipos (si necesario) → src/types/index.ts
4. Probar en navegador → http://localhost:5173
5. Build y deploy → npm run build
```

### 2. **Archivos Más Modificados**
- `src/config/constants.ts` - Configuración, textos, colores
- `src/components/ui/` - Componentes de interfaz
- `src/components/charts/` - Gráficos y visualizaciones
- `src/types/index.ts` - Definiciones TypeScript

## 🔧 **Tareas Comunes de Desarrollo**

### ➕ **Agregar Nueva Métrica**

1. **Actualizar tipos:**
```typescript
// EN: src/types/index.ts
export type MetricType = 'flujo' | 'nivel' | 'caudal' | 'velocidad' | 'presion';
```

2. **Agregar configuración:**
```typescript
// EN: src/config/constants.ts
TEXTOS_INTERFACE: {
  metricas: {
    presion: {
      nombre: 'Presión',
      unidad: 'bar',
      descripcion: 'Presión hidrostática del agua...'
    }
  }
}
```

3. **Actualizar utilidades:**
```typescript
// EN: src/utils/metricUtils.ts
export const getMetricIcon = (metric: MetricType) => {
  switch (metric) {
    case 'presion': return Gauge; // Nuevo icono
    // ... otros casos
  }
};
```

### 🎨 **Personalizar Colores**

```typescript
// EN: src/config/constants.ts
VISUAL_CONFIG: {
  colors: {
    station1: '#your-color-1',    // 🎯 Color principal estación 1
    station2: '#your-color-2',    // 🎯 Color principal estación 2
    temperature: '#your-temp-color'
  }
}
```

### 📊 **Modificar Gráfico**

```typescript
// EN: src/components/charts/TimeFlowChart.tsx
const TimeFlowChart = ({ data, metric }) => {
  const chartConfig = {
    line: {
      strokeWidth: 3,          // 🎯 Grosor de línea
      stroke: '#your-color',   // 🎯 Color personalizado
      fill: '#your-fill'       // 🎯 Color de relleno
    }
  };
  
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <Line {...chartConfig.line} />
        {/* Más configuración */}
      </LineChart>
    </ResponsiveContainer>
  );
};
```

### 🧩 **Crear Componente Personalizado**

```typescript
// EN: src/components/ui/MiComponente.tsx
import React from 'react';
import type { MiComponenteProps } from '../../types';

const MiComponente: React.FC<MiComponenteProps> = ({ 
  title, 
  value, 
  className = '' 
}) => {
  return (
    <div className={`p-4 bg-white rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default MiComponente;
```

## 🎯 **Patrones de Código**

### Convenciones de Nomenclatura
```typescript
// ✅ Correcto
const MetricCard = () => {};           // PascalCase para componentes
const useOptimizedData = () => {};     // camelCase para hooks
const VISUAL_CONFIG = {};             // UPPER_SNAKE_CASE para constantes
interface MetricCardProps {}          // PascalCase para tipos

// ❌ Incorrecto
const metricCard = () => {};          // camelCase para componentes
const UseOptimizedData = () => {};    // PascalCase para hooks
const visualConfig = {};             // camelCase para constantes
```

### Estructura de Componentes
```typescript
// ✅ Estructura recomendada
import React from 'react';
import type { ComponentProps } from '../types';

interface ComponentProps {
  // Props específicas del componente
}

const Component: React.FC<ComponentProps> = ({ 
  prop1, 
  prop2,
  className = ''    // Valores por defecto
}) => {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Funciones
  const handleAction = () => {};
  
  // 3. Render
  return (
    <div className={`base-classes ${className}`}>
      {/* Contenido */}
    </div>
  );
};

export default Component;
```

### Manejo de Estado
```typescript
// ✅ Usar contexto para estado global
const { state, dispatch } = useDashboard();

// ✅ useState para estado local
const [isLoading, setIsLoading] = useState(false);

// ✅ Hooks personalizados para lógica compleja
const { data, loading, error } = useOptimizedData();
```

## 🏗️ **Arquitectura del Proyecto**

### Patrón Arquitectónico Principal
**Context + Reducer Pattern** para gestión de estado global, con **Component Composition** para UI.

```typescript
// Flujo de datos simplificado
Componentes → useContext(DashboardContext) → dispatch(action) → reducer → nuevo estado → re-render
```

### Gestión de Estado Global
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

## ⚡ **Optimizaciones de Performance**

### Lazy Loading Implementado
```typescript
// Componentes de reportes (no críticos para carga inicial)
const ReportsPanel = lazy(() => 
  import('./ReportsPanel').then(module => ({
    default: module.ReportsPanel
  }))
);

// Modal fullscreen (solo se usa cuando se activa)
const FullscreenChartModal = lazy(() => 
  import('./FullscreenChartModal').then(module => ({
    default: module.FullscreenChartModal
  }))
);
```

### Memoización Inteligente
```typescript
// Memoización de cálculos costosos
const chartData = useMemo(() => {
  return data
    .filter(point => point.timestamp >= rangeStart)
    .map(point => ({
      ...point,
      formattedTime: formatTime(point.timestamp)
    }));
}, [data, rangeStart]); // Dependencias estables
```

## 🛠️ **Herramientas de Desarrollo**

### Extensiones VS Code Recomendadas
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode", 
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Configuración de Editor
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

## 🔍 **Debugging**

### Console Utilities
```typescript
// ✅ Debug de datos
console.log('📊 Metric data:', data);
console.table(chartData);          // Ver datos en tabla
console.group('🔍 Component State'); 
console.log('Selected metric:', selectedMetric);
console.log('Time range:', timeRange);
console.groupEnd();
```

### React DevTools
1. Instalar extensión React Developer Tools
2. Inspeccionar componentes en pestaña "Components"
3. Ver estado y props en tiempo real
4. Profiler para optimización de rendimiento

### TypeScript Debugging
```typescript
// ✅ Verificar tipos en desarrollo
type DebugType<T> = T extends infer R ? R : never;
type MetricTypeDebug = DebugType<MetricType>; // Ver tipo real
```

## 🚀 **Build y Deployment**

### Build para Producción
```bash
# 1. Generar build
npm run build

# 2. Los archivos se crean en dist/
ls dist/

# 3. Previsualizar build
npm run preview
```

### Optimizaciones Automáticas
- **Tree shaking** - Elimina código no usado
- **Code splitting** - Divide bundle en chunks
- **Asset optimization** - Comprime imágenes y assets
- **CSS purging** - Elimina clases CSS no utilizadas

### Variables de Entorno
```bash
# .env.local
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=2.0.0
```

```typescript
// Usar en código
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📋 **Checklist de Desarrollo**

### Antes de Commit
- [ ] ✅ Código compila sin errores TypeScript
- [ ] 🎨 Componentes tienen estilos correctos
- [ ] 📱 Funciona en responsive (mobile/desktop)
- [ ] 🔍 No hay errores en consola
- [ ] 🚀 Build de producción funciona

### Antes de Deploy
- [ ] ✅ Build exitoso (`npm run build`)
- [ ] 🧪 Preview funciona (`npm run preview`)
- [ ] 📊 Todas las métricas se muestran correctamente
- [ ] 🎭 Temas (claro/oscuro) funcionan
- [ ] 📱 Responsive en diferentes pantallas

---
[← Previous: UI Components](./ui-components.md) | [Next: Advanced Documentation →](./development-reference.md)