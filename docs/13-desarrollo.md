# 💻 Guía de Desarrollo

## 🚀 **Primeros Pasos**

### Instalación Inicial
```bash
# 1. Clonar repositorio
git clone https://github.com/leftra123/mock-pucon.git
cd mock-pucon

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir navegador
# http://localhost:5173
```

### Scripts Disponibles
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | ⚡ Servidor de desarrollo con hot reload |
| `npm run build` | 📦 Build para producción |
| `npm run preview` | 👀 Previsualizar build |
| `npm run lint` | 🔍 Linter de código |

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

## 🛠️ **Herramientas de Desarrollo**

### Extensiones VS Code Recomendadas
- **ES7+ React/Redux/React-Native snippets** - Snippets útiles
- **TypeScript Importer** - Auto imports
- **Tailwind CSS IntelliSense** - Autocompletado de clases
- **Prettier** - Formato automático
- **ESLint** - Detección de errores

### Configuración de Editor
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
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
[← Anterior: Layout y Navegación](./04-layout-navegacion.md) | [Siguiente: Debugging →](./14-debugging.md)