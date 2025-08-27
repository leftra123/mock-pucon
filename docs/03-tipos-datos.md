# 📊 Tipos de Datos TypeScript

## 📍 **Ubicación Principal**

**Archivos clave:**
- `src/types/index.ts` - Tipos principales
- `src/types/reports.ts` - Tipos de reportes

## 🔢 **Tipos Fundamentales**

### Datos de Métricas
```typescript
export type MetricDataPoint = {
  time: Date;           // Timestamp del dato
  station1: number;     // Valor en estación 1
  station2: number;     // Valor en estación 2
};

export type MetricType = 'flujo' | 'nivel' | 'caudal' | 'velocidad';
export type StationName = 'station1' | 'station2';
export type TimeRange = '1h' | '6h' | '24h' | '30m';
```

### Configuración de Métricas
```typescript
export interface MetricConfig {
  unit: string;                        // Unidad de medida (m³/s, m, etc.)
  icon: React.ComponentType<any>;      // Componente de icono
  tooltip: string;                     // Texto explicativo
}

export interface MetricValue {
  station1: number;
  station2: number;
}

export interface Metrics {
  flujo: MetricValue;
  nivel: MetricValue;
  caudal: MetricValue;
  velocidad: MetricValue;
}
```

## 📈 **Tipos de Gráficos**

### Datos para Sparklines
```typescript
export interface SparklineData {
  value: number;     // Valor numérico
  time: Date;        // Timestamp
}

export interface ChartData {
  station1: SparklineData[];  // Datos de la estación 1
  station2: SparklineData[];  // Datos de la estación 2
}
```

### Configuración de Gráficos
```typescript
export interface TimeFlowChartProps {
  data: MetricDataPoint[];               // Datos del gráfico
  metric: string;                        // Tipo de métrica
  timeRange: TimeRange;                  // Rango temporal seleccionado
  setTimeRange: (range: TimeRange) => void;
  unit: string;                          // Unidad de medida
  isFullscreen: boolean;                 // Estado pantalla completa
  setIsFullscreen: (fullscreen: boolean) => void;
}
```

## 🎨 **Tipos de Componentes UI**

### MetricCard
```typescript
export interface MetricCardProps {
  icon: React.ComponentType<any>;        // Icono de la métrica
  title: string;                         // Título (Flujo, Nivel, etc.)
  value: number;                         // Valor actual
  unit: string;                          // Unidad (m³/s, m, L/s)
  tooltipContent: string;                // Texto del tooltip
  colorClass?: string;                   // Clase CSS para color
  trend?: TrendDirection;                // Tendencia (up, down, stable)
  stationName?: string;                  // Nombre de la estación
  sparklineData?: SparklineData[];       // Datos para mini-gráfico
  sparklineColor?: string;               // Color del sparkline
}

export type TrendDirection = 'up' | 'down' | 'stable';
```

### Tooltips
```typescript
export interface CustomTooltipProps {
  title: string;                         // Título del tooltip
  content: string;                       // Contenido descriptivo
  children: React.ReactNode;             // Elemento que activa el tooltip
  position?: TooltipPosition;            // Posición (top, bottom, left, right)
  icon?: React.ComponentType<any>;       // Icono opcional
  value?: number;                        // Valor numérico opcional
  unit?: string;                         // Unidad opcional
  trend?: TrendDirection;                // Tendencia opcional
}

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
```

## 🌐 **Tipos del Sistema**

### Tema y Configuración
```typescript
export type Theme = 'light' | 'dark' | 'system';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
```

### Modal de Pantalla Completa
```typescript
export interface FullscreenChartModalProps {
  isOpen: boolean;                       // Estado del modal
  onClose: () => void;                   // Función para cerrar
  data: MetricDataPoint[];               // Datos del gráfico
  metric: string;                        // Tipo de métrica
  timeRange: TimeRange;                  // Rango temporal
  setTimeRange: (range: TimeRange) => void;
  unit: string;                          // Unidad de medida
}
```

## 📄 **Tipos de Reportes** 

*(Definidos en `src/types/reports.ts`)*

```typescript
export interface ReportData {
  title: string;                         // Título del reporte
  dateRange: DateRange;                  // Rango de fechas
  metrics: Metrics;                      // Datos de métricas
  summary: string;                       // Resumen ejecutivo
  insights: string[];                    // Insights de IA
  recommendations: string[];             // Recomendaciones
}

export interface ReportConfig {
  format: 'pdf' | 'excel' | 'csv';      // Formato de exportación
  includeCharts: boolean;                // Incluir gráficos
  includeInsights: boolean;              // Incluir análisis IA
  dateRange: DateRange;                  // Rango temporal
}
```

## 🔍 **Uso de Tipos en Componentes**

### Ejemplo: Componente con Tipos
```typescript
// ✅ Ejemplo de componente bien tipado
import { MetricCardProps, SparklineData } from '../types';

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  title,
  value,
  unit,
  tooltipContent,
  colorClass = 'text-gray-600',
  trend = 'stable',
  stationName,
  sparklineData = [],
  sparklineColor = '#3b82f6'
}) => {
  // Componente implementation...
};
```

### Ejemplo: Hook con Tipos
```typescript
// ✅ Hook personalizado con tipos
export const useOptimizedData = (): {
  fullData: MetricDataPoint[];
  isLoading: boolean;
  error: string | null;
} => {
  // Hook implementation...
};
```

## 📋 **Guía de Extensión de Tipos**

### ➕ **Agregar Nueva Métrica**

1. **Actualizar `MetricType`:**
   ```typescript
   export type MetricType = 'flujo' | 'nivel' | 'caudal' | 'velocidad' | 'presion';
   ```

2. **Actualizar interface `Metrics`:**
   ```typescript
   export interface Metrics {
     flujo: MetricValue;
     nivel: MetricValue;
     caudal: MetricValue;
     velocidad: MetricValue;
     presion: MetricValue;  // ✅ Nueva métrica
   }
   ```

3. **Actualizar configuración en `constants.ts`:**
   ```typescript
   metricas: {
     // ... métricas existentes
     presion: {
       nombre: 'Presión',
       unidad: 'bar',
       descripcion: 'Presión del agua...',
     }
   }
   ```

### ➕ **Agregar Nueva Propiedad a Componente**

```typescript
// ❌ Antes
export interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: number;
}

// ✅ Después
export interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: number;
  isHighPriority?: boolean;  // Nueva propiedad opcional
}
```

## ⚠️ **Consideraciones de TypeScript**

1. **Constantes con `as const`:** Preserva tipos literales
2. **Props opcionales:** Usar `?` para props no requeridas
3. **Union types:** Para valores limitados (`'up' | 'down' | 'stable'`)
4. **Interfaces vs Types:** Usar interfaces para objetos, types para uniones

---
[← Anterior: Configuración](./02-configuracion.md) | [Siguiente: Layout y Navegación →](./04-layout-navegacion.md)