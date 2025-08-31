# 🧩 Documentación de Componentes - Dashboard Hidrológico

> **Referencia completa de todos los componentes React del sistema de monitoreo**

---

## 📋 Índice de Componentes

1. [🏗️ Layout Components](#️-layout-components)
2. [📊 Chart Components](#-chart-components)  
3. [📈 Metric Components](#-metric-components)
4. [🗺️ Map Components](#️-map-components)
5. [🔔 Alert Components](#-alert-components)
6. [📄 Report Components](#-report-components)
7. [🎨 UI Components](#-ui-components)
8. [🔧 Utility Components](#-utility-components)

---

## 🏗️ Layout Components

### `Layout.tsx`
**Propósito**: Contenedor principal de la aplicación con animaciones y estructura base.

```typescript
interface LayoutProps {
  children: React.ReactNode;
}
```

**Características**:
- Animaciones Framer Motion con `staggerChildren: 0.1`
- Estructura flex responsiva
- Gestión de estados fullscreen
- Dark mode support integrado

**Uso**:
```tsx
<Layout>
  <Header />
  <div className="flex">
    <Sidebar />
    <MainContent />
  </div>
</Layout>
```

---

### `Header.tsx`
**Propósito**: Barra superior con controles globales y información del sistema.

```typescript
interface HeaderProps {
  // No props - usa Context interno
}
```

**Características**:
- Logo y título de la aplicación
- Controles de tema (claro/oscuro/automático)
- Indicador de estado del sistema
- Botón fullscreen
- Información de última actualización

**Estado interno**:
- `lastUpdate`: Timestamp de última actualización
- `isOnline`: Estado de conexión simulado

---

### `Sidebar.tsx`
**Propósito**: Panel lateral de navegación con métricas y controles.

```typescript
interface SidebarProps {
  // Usa DashboardContext para estado global
}
```

**Características**:
- Lista de métricas con tooltips explicativos
- Modo colapsado (solo iconos)
- Animaciones de hover y selección
- Integración con `ReportsPanel`
- Responsive: se oculta en mobile

**Métricas disponibles**:
- 🌊 **Flujo** (m³/s): Volumen de agua por segundo
- 📏 **Nivel** (m): Altura del agua sobre referencia  
- 🚰 **Caudal** (L/s): Cantidad de agua que fluye
- ⚡ **Velocidad** (m/s): Velocidad del flujo

---

### `MainContent.tsx`
**Propósito**: Área principal donde se renderizan los dashboards y contenido.

```typescript
interface MainContentProps {
  children: React.ReactNode;
}
```

**Características**:
- Container responsive con padding adaptativo
- Soporte para modo fullscreen
- Transiciones suaves entre vistas
- Grid layout para componentes del dashboard

---

## 📊 Chart Components

### `TimeFlowChart.tsx`
**Propósito**: Gráfico principal que visualiza datos temporales según el tipo de métrica.

```typescript
interface TimeFlowChartProps {
  data: MetricDataPoint[];
  selectedMetric: MetricType;
  timeRange: TimeRange;
  isFullscreen?: boolean;
}

interface MetricDataPoint {
  timestamp: number;
  station1: number;
  station2: number;
  metric: MetricType;
  temperature?: number;
}
```

**Tipos de gráficos por métrica**:
- **Flujo**: `AreaChart` - Representa el flujo continuo del agua
- **Nivel**: `BarChart` - Mediciones discretas de altura
- **Caudal**: `LineChart` - Precisión en mediciones puntuales  
- **Velocidad**: `AreaChart` con `curveMonotoneX` - Movimiento fluido

**Características**:
- Colores diferenciados por estación
- Tooltips personalizados con `CustomTooltip`
- Animación de entrada con `animationDuration={1000}`
- Grid y ejes configurables
- Responsive design con `ResponsiveContainer`

**Uso**:
```tsx
<TimeFlowChart
  data={filteredData}
  selectedMetric="flow"
  timeRange="1h"
  isFullscreen={false}
/>
```

---

### `ComparisonGauge.tsx`
**Propósito**: Gráfico de comparación tipo gauge entre las dos estaciones.

```typescript
interface ComparisonGaugeProps {
  data: MetricDataPoint[];
  selectedMetric: MetricType;
}
```

**Características**:
- `RadialBarChart` de Recharts
- Comparación visual entre Station 1 y Station 2
- Colores temáticos: verde esmeralda (#34d399) y azul cielo (#38bdf8)
- Valores promedio calculados con `calculateAverage()`
- Leyenda personalizada con valores formateados

**Cálculos internos**:
```typescript
const avg1 = calculateAverage(data.map(d => d.station1));
const avg2 = calculateAverage(data.map(d => d.station2));

const gaugeData = [
  { name: 'Station 1', value: avg1, fill: '#34d399' },
  { name: 'Station 2', value: avg2, fill: '#38bdf8' }
];
```

---

### `FullscreenChartModal.tsx`
**Propósito**: Modal que muestra el gráfico principal en modo fullscreen para análisis detallado.

```typescript
interface FullscreenChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MetricDataPoint[];
  selectedMetric: MetricType;
  timeRange: TimeRange;
}
```

**Características**:
- Modal overlay con `fixed inset-0`
- Componente lazy-loaded para optimización
- `TimeFlowChart` en tamaño completo
- Botón de cierre con `X` icon de Lucide
- Animaciones de entrada/salida
- Escape key para cerrar

**Animaciones Framer Motion**:
```tsx
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};
```

---

## 📈 Metric Components

### `MetricCard.tsx`
**Propósito**: Tarjeta que muestra una métrica específica con valor, tendencia y sparkline.

```typescript
interface MetricCardProps {
  metric: MetricType;
  value: number;
  unit: string;
  trend: number;
  data: number[];
  isLoading?: boolean;
}
```

**Características visuales**:
- **Valor principal**: Animado con `CountUp` component
- **Trend indicator**: Porcentaje con flecha ↗️ ↘️ 
- **Sparkline**: Mini-gráfico de tendencia con `Sparkline` component
- **Loading state**: `SkeletonCard` mientras carga
- **Responsive typography**: Texto adaptativo por breakpoint

**Estados de trend**:
```typescript
const trendColor = trend >= 0 
  ? 'text-green-600 dark:text-green-400' 
  : 'text-red-600 dark:text-red-400';

const trendIcon = trend >= 0 ? '↗️' : '↘️';
```

**Ejemplo de uso**:
```tsx
<MetricCard
  metric="flow"
  value={245.67}
  unit="m³/s"
  trend={12.5}
  data={[100, 120, 95, 245, 230, 245]}
  isLoading={false}
/>
```

---

### `Sparkline.tsx`
**Propósito**: Mini-gráfico lineal que muestra la tendencia de una métrica en espacio reducido.

```typescript
interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}
```

**Características**:
- SVG renderizado para máximo performance
- Normalización automática de datos
- Path suave con curvas
- Colores temáticos por defecto
- Responsive width/height

**Algoritmo de renderizado**:
```typescript
const normalizedData = data.map((value, index) => ({
  x: (index / (data.length - 1)) * width,
  y: height - ((value - min) / (max - min)) * height
}));

const path = normalizedData.reduce((acc, point, index) => {
  return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
}, '');
```

---

### `MetricsCards.tsx`
**Propósito**: Grid container que organiza y gestiona todas las `MetricCard` del dashboard.

```typescript
interface MetricsCardsProps {
  data: MetricDataPoint[];
  selectedMetric: MetricType;
  timeRange: TimeRange;
  isLoading?: boolean;
}
```

**Características**:
- Grid responsivo: `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`
- Cálculo automático de métricas desde datos
- Animaciones staggered con Framer Motion
- Manejo de estados de carga
- Integración con hook `useOptimizedData`

**Cálculos de métricas**:
```typescript
const latestData = data[data.length - 1];
const prevData = data[data.length - 2];
const trend = ((latestData.station1 - prevData.station1) / prevData.station1) * 100;
```

---

## 🗺️ Map Components

### `RioClaroWeatherMap.tsx`
**Propósito**: Mapa interactivo que muestra las estaciones de monitoreo con capacidad de arrastrar y soltar.

```typescript
interface RioClaroWeatherMapProps {
  // No props - gestiona estado interno
}
```

**Tecnologías utilizadas**:
- **Leaflet**: Motor de mapas
- **React Leaflet**: Componentes React para Leaflet
- **OpenStreetMap**: Tiles del mapa

**Características principales**:
- **Estaciones arrastrables**: Los marcadores se pueden mover
- **Toast notifications**: Confirma cuando se reposiciona una estación
- **Zoom controls**: Controles de zoom personalizados
- **Attribution**: Créditos de OpenStreetMap
- **Responsive**: Se adapta al contenedor

**Estados internos**:
```typescript
const [stations, setStations] = useState([
  {
    id: 'station1',
    name: 'Estación Río Claro Norte',
    position: [-39.2919, -71.9720] as LatLngTuple,
    color: '#34d399'
  },
  {
    id: 'station2', 
    name: 'Estación Río Claro Sur',
    position: [-39.2950, -71.9750] as LatLngTuple,
    color: '#38bdf8'
  }
]);
```

**Event handlers**:
```typescript
const handleDragEnd = (stationId: string, newPosition: LatLng) => {
  setStations(prev => prev.map(station => 
    station.id === stationId 
      ? { ...station, position: [newPosition.lat, newPosition.lng] }
      : station
  ));
  
  toast.success(`Estación ${stationId} reposicionada correctamente`);
};
```

---

## 🔔 Alert Components

### `CustomTooltip.tsx`
**Propósito**: Tooltip personalizado para gráficos de Recharts con información detallada.

```typescript
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name: string;
  }>;
  label?: string | number;
}
```

**Características**:
- Background con blur effect: `backdrop-blur-sm`
- Formato de fecha/hora inteligente
- Colores diferenciados por estación
- Valores formateados según métrica
- Border y shadow sutil

**Formato condicional**:
```typescript
const formatValue = (value: number, dataKey: string) => {
  const units = {
    station1: selectedMetric === 'flow' ? 'm³/s' : 
              selectedMetric === 'level' ? 'm' : 'L/s',
    temperature: '°C'
  };
  
  return `${value.toFixed(2)} ${units[dataKey] || ''}`;
};
```

---

### `TemperatureCard.tsx`
**Propósito**: Tarjeta especializada que muestra la temperatura ambiente con mini-gráfico.

```typescript
interface TemperatureCardProps {
  data: MetricDataPoint[];
  isLoading?: boolean;
}
```

**Características únicas**:
- Ícono de termómetro de Lucide React
- Color naranja temático (#f97316)
- Mini-chart con área rellena
- Trend calculation específico para temperatura
- Formato con un decimal: `XX.X°C`

**Mini-chart interno**:
```tsx
<ResponsiveContainer width="100%" height={60}>
  <AreaChart data={tempData}>
    <Area 
      type="monotone" 
      dataKey="temp" 
      stroke="#f97316" 
      fill="#f97316" 
      fillOpacity={0.3}
    />
  </AreaChart>
</ResponsiveContainer>
```

---

## 📄 Report Components

### `ReportsPanel.tsx`
**Propósito**: Panel lateral que permite generar reportes en diferentes formatos.

```typescript
interface ReportsPanelProps {
  data: MetricDataPoint[];
  isVisible: boolean;
  onClose: () => void;
}
```

**Funcionalidades**:
- **Generación PDF**: Usando `jsPDF` + `jsPDF-AutoTable`
- **Export Excel**: Usando biblioteca `xlsx`
- **Análisis con IA**: Texto descriptivo automático
- **Filtros temporales**: Selección de rango de fechas
- **Vista previa**: Preview antes de generar

**Tipos de reporte**:
```typescript
type ReportFormat = 'pdf' | 'excel' | 'csv';
type ReportType = 'summary' | 'detailed' | 'analysis';
```

**Generación de PDF**:
```typescript
const generatePDFReport = (data: MetricDataPoint[], type: ReportType) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Dashboard Hidrológico - Río Claro', 20, 20);
  
  // Table data
  const tableData = data.map(point => [
    formatDate(point.timestamp),
    point.station1.toFixed(2),
    point.station2.toFixed(2)
  ]);
  
  // Auto table
  (doc as any).autoTable({
    head: [['Timestamp', 'Estación 1', 'Estación 2']],
    body: tableData,
    startY: 30
  });
  
  doc.save('reporte-hidrologico.pdf');
};
```

---

## 🎨 UI Components

### `ThemeSwitcher.tsx` 
**Propósito**: Selector de tema con opciones claro, oscuro y automático.

```typescript
interface ThemeSwitcherProps {
  // No props - usa hook useTheme interno
}
```

**Estados de tema**:
- **Light**: Forzar tema claro
- **Dark**: Forzar tema oscuro  
- **System**: Seguir preferencia del sistema

**Hook personalizado**:
```typescript
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (theme === 'system') {
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);
  
  return { theme, setTheme };
};
```

---

### `SkeletonCard.tsx`, `SkeletonChart.tsx`, `SkeletonGauge.tsx`
**Propósito**: Componentes de loading state que imitan la estructura real mientras se cargan datos.

```typescript
interface SkeletonProps {
  className?: string;
}
```

**Patrones de skeleton**:
- **SkeletonCard**: Rectángulos animados que imitan `MetricCard`
- **SkeletonChart**: Placeholder para gráficos con aspectos similares
- **SkeletonGauge**: Círculos animados para gráficos radiales

**Animación CSS**:
```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton {
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
}
```

---

### `Button.tsx` (UI Base)
**Propósito**: Componente button reutilizable con variantes y estados.

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}
```

**Variantes de estilo**:
```typescript
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  ghost: 'bg-transparent hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base', 
  lg: 'px-6 py-3 text-lg'
};
```

---

## 🔧 Utility Components

### `ErrorBoundary.tsx`
**Propósito**: Captura errores de React y muestra una UI de fallback amigable.

```typescript
interface ErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: Error }>;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
```

**Implementación clase**:
```typescript
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultErrorFallback;
      return <Fallback error={this.state.error!} />;
    }

    return this.props.children;
  }
}
```

**Uso recomendado**:
```tsx
<ErrorBoundary fallback={ChartErrorFallback}>
  <TimeFlowChart data={data} />
</ErrorBoundary>
```

---

### `LoadingSpinner.tsx`
**Propósito**: Indicador de carga animado reutilizable.

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}
```

**Animación SVG**:
```tsx
<svg 
  className={`animate-spin ${sizeClass}`}
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24"
>
  <circle 
    className="opacity-25" 
    cx="12" 
    cy="12" 
    r="10" 
    stroke="currentColor" 
    strokeWidth="4"
  />
  <path 
    className="opacity-75" 
    fill="currentColor" 
    d="m12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8z"
  />
</svg>
```

---

## 📊 Resumen de Props y Performance

### Props más utilizadas

| Prop | Componentes | Propósito |
|------|-------------|-----------|
| `data: MetricDataPoint[]` | Charts, MetricCard, ReportsPanel | Datos hidrológicos |
| `selectedMetric: MetricType` | Charts, MetricCard | Métrica activa |
| `timeRange: TimeRange` | Charts | Rango temporal |
| `isLoading?: boolean` | Cards, Charts | Estado de carga |
| `className?: string` | UI Components | Estilos personalizados |

### Componentes con optimizaciones

| Componente | Optimización | Impacto |
|------------|--------------|---------|
| `TimeFlowChart` | `useMemo` para data processing | Alto |
| `MetricCard` | `CountUp` con duration control | Medio |
| `RioClaroWeatherMap` | Lazy loading de Leaflet | Alto |
| `ReportsPanel` | `React.lazy` + `Suspense` | Alto |
| `FullscreenChartModal` | Portal rendering | Medio |

### Patrones de composición

```tsx
// Patrón: Container + Presenter
<DashboardContainer>
  <MetricsCards data={data} />
  <ChartsGrid>
    <TimeFlowChart />
    <ComparisonGauge />
  </ChartsGrid>
</DashboardContainer>

// Patrón: Render Props
<DataProvider>
  {({ data, isLoading }) => (
    <MetricCard data={data} isLoading={isLoading} />
  )}
</DataProvider>

// Patrón: Higher-Order Component
const WithErrorBoundary = (Component) => (props) => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
);
```

---

**Total de componentes**: 24  
**Componentes reutilizables**: 12  
**Componentes específicos**: 12  
**Hooks personalizados utilizados**: 8  

**Última actualización**: Agosto 2025  
**Versión**: 1.2.0