# 📁 Estructura del Proyecto

## 🗂️ **Organización General**

```
mock-pucon/
├── 📁 src/                    # Código fuente principal
├── 📁 docs/                   # Documentación del proyecto
├── 📁 public/                 # Archivos estáticos
├── 📄 package.json            # Dependencias y scripts
├── 📄 vite.config.ts         # Configuración de Vite
├── 📄 tailwind.config.js     # Configuración de Tailwind CSS
└── 📄 README.md              # Documentación principal
```

## 📂 **Detalle del directorio `src/`**

### 🧩 **Componentes (`src/components/`)**
```
components/
├── 📊 charts/           # Gráficos y visualizaciones
│   ├── TimeFlowChart.tsx      # Gráfico temporal principal
│   └── ComparisonGauge.tsx    # Gauge comparativo
├── 📋 dashboard/        # Componentes del dashboard
│   ├── DashboardGrid.tsx      # Grid principal de métricas
│   ├── DateFilter.tsx         # Filtro de fechas
│   └── MetricsCards.tsx       # Cards de métricas
├── 🖼️ layout/          # Estructura de la aplicación
│   ├── Layout.tsx             # Layout principal
│   ├── Header.tsx             # Barra superior
│   ├── Sidebar.tsx            # Barra lateral de navegación
│   ├── MainContent.tsx        # Contenido principal
│   └── LazyComponents.tsx     # Componentes con lazy loading
├── 🗺️ maps/            # Mapas interactivos
│   ├── RioClaroWeatherMap.tsx # Mapa principal del río
│   └── index.ts               # Exportaciones
├── 🎯 modals/          # Ventanas modales
│   └── FullscreenChartModal.tsx # Modal de gráfico ampliado
├── 📊 sidebar/         # Componentes de la barra lateral
│   └── ReportsPanel.tsx       # Panel de reportes
└── 🎨 ui/             # Componentes de interfaz reutilizables
    ├── MetricCard.tsx         # Card de métrica individual
    ├── TemperatureCard.tsx    # Card de temperatura
    ├── CustomTooltip.tsx      # Tooltip personalizado
    ├── ThemeSwitcher.tsx      # Selector de tema
    ├── UserMenu.tsx           # Menú de usuario
    ├── ErrorBoundary.tsx      # Manejo de errores
    └── Skeleton*.tsx          # Componentes de carga
```

### ⚙️ **Configuración (`src/config/`)**
```
config/
└── constants.ts        # 🎯 ARCHIVO CLAVE
                       # Contiene TODA la configuración:
                       # - Textos de la interfaz
                       # - Colores y temas
                       # - Configuración de gráficos
                       # - Rangos de tiempo
```

### 🔄 **Contexto y Estado (`src/contexts/`)**
```
contexts/
└── DashboardContext.tsx  # 🎯 CONTEXTO PRINCIPAL
                         # Maneja todo el estado global:
                         # - Métrica seleccionada
                         # - Rango temporal
                         # - Estado de paneles
```

### 🎣 **Hooks Personalizados (`src/hooks/`)**
```
hooks/
└── useOptimizedData.ts   # 🎯 HOOK PRINCIPAL
                         # Maneja la optimización de datos:
                         # - Carga de datos
                         # - Filtrado por tiempo
                         # - Transformaciones
```

### 🔧 **Utilidades (`src/utils/`)**
```
utils/
├── chartUtils.tsx       # Utilidades para gráficos
├── metricUtils.ts       # Manejo de métricas
├── mapUtils.ts          # Funciones para mapas
└── reportGenerator.ts   # Generación de reportes PDF
```

### 📝 **Tipos TypeScript (`src/types/`)**
```
types/
├── index.ts            # 🎯 TIPOS PRINCIPALES
│                       # Define todas las interfaces:
│                       # - MetricDataPoint, MetricType
│                       # - Theme, TimeRange
│                       # - Props de componentes
└── reports.ts          # Tipos específicos de reportes
```

## 🎯 **Archivos Clave para Desarrolladores**

| Archivo | Propósito | ¿Cuándo modificarlo? |
|---------|-----------|---------------------|
| `src/config/constants.ts` | **Configuración central** | Cambiar textos, colores, valores |
| `src/types/index.ts` | **Definiciones de tipos** | Agregar nuevos tipos de datos |
| `src/contexts/DashboardContext.tsx` | **Estado global** | Modificar lógica de estado |
| `src/hooks/useOptimizedData.ts` | **Lógica de datos** | Cambiar fuente o formato de datos |

## 📋 **Convenciones de Nomenclatura**

- **Componentes:** PascalCase (`MetricCard.tsx`)
- **Hooks:** camelCase con prefijo "use" (`useOptimizedData.ts`)
- **Utilidades:** camelCase (`chartUtils.ts`)
- **Tipos:** PascalCase para interfaces (`MetricDataPoint`)
- **Constantes:** UPPER_SNAKE_CASE (`APP_CONFIG`)

## 🔍 **Ubicación Rápida**

**¿Necesitas modificar...?**
- **Textos mostrados:** → `src/config/constants.ts` > `TEXTOS_INTERFACE`
- **Colores/temas:** → `src/config/constants.ts` > `VISUAL_CONFIG`
- **Un gráfico:** → `src/components/charts/`
- **La barra lateral:** → `src/components/layout/Sidebar.tsx`
- **Una métrica:** → `src/components/ui/MetricCard.tsx`
- **El estado global:** → `src/contexts/DashboardContext.tsx`

---
[← Volver al índice](./README.md) | [Siguiente: Configuración →](./02-configuracion.md)