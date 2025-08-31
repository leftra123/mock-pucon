# 📊 Gráficos y Visualización

> **Documentación completa de componentes de gráficos y visualización de datos**

## 📋 **Componentes de Gráficos**

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

#### **Tipos de gráficos por métrica**:
- **Flujo**: `AreaChart` - Representa el flujo continuo del agua
- **Nivel**: `BarChart` - Mediciones discretas de altura
- **Caudal**: `LineChart` - Precisión en mediciones puntuales  
- **Velocidad**: `AreaChart` con `curveMonotoneX` - Movimiento fluido

#### **Características**:
- Colores diferenciados por estación
- Tooltips personalizados con `CustomTooltip`
- Animación de entrada con `animationDuration={1000}`
- Grid y ejes configurables
- Responsive design con `ResponsiveContainer`

#### **Uso**:
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

#### **Características**:
- `RadialBarChart` de Recharts
- Comparación visual entre Station 1 y Station 2
- Colores temáticos: verde esmeralda (#34d399) y azul cielo (#38bdf8)
- Valores promedio calculados con `calculateAverage()`
- Leyenda personalizada con valores formateados

#### **Cálculos internos**:
```typescript
const avg1 = calculateAverage(data.map(d => d.station1));
const avg2 = calculateAverage(data.map(d => d.station2));

const gaugeData = [
  { name: 'Station 1', value: avg1, fill: '#34d399' },
  { name: 'Station 2', value: avg2, fill: '#38bdf8' }
];
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

#### **Características**:
- SVG renderizado para máximo performance
- Normalización automática de datos
- Path suave con curvas
- Colores temáticos por defecto
- Responsive width/height

#### **Algoritmo de renderizado**:
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

## 📈 **Componentes de Métricas**

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

#### **Características visuales**:
- **Valor principal**: Animado con `CountUp` component
- **Trend indicator**: Porcentaje con flecha ↗️ ↘️ 
- **Sparkline**: Mini-gráfico de tendencia con `Sparkline` component
- **Loading state**: `SkeletonCard` mientras carga
- **Responsive typography**: Texto adaptativo por breakpoint

#### **Estados de trend**:
```typescript
const trendColor = trend >= 0 
  ? 'text-green-600 dark:text-green-400' 
  : 'text-red-600 dark:text-red-400';

const trendIcon = trend >= 0 ? '↗️' : '↘️';
```

#### **Ejemplo de uso**:
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

### `TemperatureCard.tsx`
**Propósito**: Tarjeta especializada que muestra la temperatura ambiente con mini-gráfico.

```typescript
interface TemperatureCardProps {
  data: MetricDataPoint[];
  isLoading?: boolean;
}
```

#### **Características únicas**:
- Ícono de termómetro de Lucide React
- Color naranja temático (#f97316)
- Mini-chart con área rellena
- Trend calculation específico para temperatura
- Formato con un decimal: `XX.X°C`

#### **Mini-chart interno**:
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

## 🔧 **Configuración y Personalización**

### Configuración de Colores
```typescript
// En src/config/constants.ts
VISUAL_CONFIG: {
  colors: {
    station1: '#34d399',    // Verde esmeralda
    station2: '#38bdf8',    // Azul cielo
    temperature: '#f97316'  // Naranja
  }
}
```

### Configuración de Gráficos por Métrica
```typescript
const getChartComponent = (metric: MetricType) => {
  switch (metric) {
    case 'flow':
    case 'velocity':
      return AreaChart; // Continuidad
    case 'level': 
      return BarChart;  // Discreto
    case 'discharge':
      return LineChart; // Precisión
  }
};
```

### Responsive Configuration
```tsx
// Breakpoints para gráficos
const chartHeight = {
  mobile: 200,
  tablet: 300,
  desktop: 400
};

<ResponsiveContainer 
  width="100%" 
  height={isFullscreen ? 600 : chartHeight[breakpoint]}
>
```

---

## 🎨 **Estilos y Animaciones**

### Animaciones Recharts
```typescript
const animationConfig = {
  animationDuration: 1000,
  animationEasing: "ease-out",
  animationBegin: 0
};

<Area {...animationConfig} />
```

### Transiciones Framer Motion
```typescript
const chartVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

<motion.div variants={chartVariants}>
  <TimeFlowChart />
</motion.div>
```

---

## 🔧 **Utilidades de Gráficos**

### Formateo de Datos
```typescript
// utils/chartUtils.ts
export const formatChartData = (data: MetricDataPoint[]) => {
  return data.map(point => ({
    ...point,
    formattedTime: format(new Date(point.timestamp), 'HH:mm'),
    formattedDate: format(new Date(point.timestamp), 'dd/MM')
  }));
};
```

### Cálculo de Promedios
```typescript
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Number((sum / values.length).toFixed(2));
};
```

### Detección de Tendencias
```typescript
export const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return Number(((current - previous) / previous * 100).toFixed(1));
};
```

---

## 📊 **Optimización de Performance**

### Memoización de Datos
```typescript
const chartData = useMemo(() => {
  return data
    .filter(point => point.timestamp >= rangeStart)
    .map(formatChartData);
}, [data, rangeStart]);
```

### Debouncing de Updates
```typescript
const debouncedData = useDebounce(rawData, 300);
```

### Lazy Loading
```typescript
const ComparisonGauge = lazy(() => 
  import('./ComparisonGauge').then(module => ({
    default: module.ComparisonGauge
  }))
);
```

---

## 🧪 **Testing de Componentes**

### Test de TimeFlowChart
```typescript
describe('TimeFlowChart', () => {
  it('should render correct chart type based on metric', () => {
    render(<TimeFlowChart metric="flow" data={mockData} />);
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });
  
  it('should update when metric changes', () => {
    const { rerender } = render(
      <TimeFlowChart metric="flow" data={mockData} />
    );
    rerender(<TimeFlowChart metric="level" data={mockData} />);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});
```

---

## 🔍 **Troubleshooting**

### Problemas Comunes

#### Gráfico no se muestra
```typescript
// ✅ Solución: Verificar ResponsiveContainer
<ResponsiveContainer width="100%" height={400}>
  <AreaChart data={data}>
    {/* Chart content */}
  </AreaChart>
</ResponsiveContainer>
```

#### Animaciones no funcionan
```typescript
// ✅ Solución: Verificar animationDuration
<Area 
  animationDuration={1000}
  isAnimationActive={true}
/>
```

#### Tooltips no aparecen
```typescript
// ✅ Solución: Configurar Tooltip correctamente
<Tooltip 
  content={<CustomTooltip />}
  cursor={{ strokeDasharray: '3 3' }}
/>
```

---

**Ubicación de archivos**: `/src/components/charts/`  
**Dependencias principales**: Recharts, Framer Motion, React CountUp  
**Última actualización**: Agosto 2025

---
[← Previous: Layout & Navigation](./layout-navigation.md) | [Next: UI Components →](./ui-components.md)