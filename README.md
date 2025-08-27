# 🌊 Dashboard Hidrológico Río Claro - Pucón

> **Sistema de monitoreo en tiempo real para variables hidrológicas del Río Claro en Pucón, Chile.**

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-cyan)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-yellow)](https://vitejs.dev/)

## ✨ **Características Principales**

- 🌊 **Monitoreo en Tiempo Real** - Actualización automática cada 3 segundos
- 📊 **4 Variables Hidrológicas** - Flujo, Nivel, Caudal y Velocidad  
- 📈 **Gráficos Especializados** - Visualizaciones adaptadas por tipo de métrica
- 🗺️ **Mapa Interactivo** - Estaciones arrastrables para planificación de ubicaciones futuras
- 📱 **Totalmente Responsivo** - Optimizado para desktop, tablet y móvil
- 🎨 **Sistema de Temas** - Claro, oscuro y automático
- 📄 **Reportes con IA** - Generación automática de reportes PDF/Excel
- ⚡ **Rendimiento Optimizado** - Lazy loading y componentes optimizados

## 📋 Requisitos Previos

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

## ⚡ Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/leftra123/mock-pucon.git
cd mock-pucon
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 4. Abrir en el navegador
```
http://localhost:5173
```

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta el linter de código |

## 📊 Variables Monitoreadas

### Flujo (m³/s)
Volumen de agua que pasa por una sección del río por segundo. Representado con **gráfico de área** para mostrar el flujo continuo.

### Nivel (m)
Altura del agua sobre un punto de referencia. Visualizado con **gráfico de barras** para representar mediciones discretas.

### Caudal (L/s)
Cantidad específica de agua que fluye. Mostrado con **gráfico de líneas** para precisión en las mediciones.

### Velocidad (m/s)
Velocidad del flujo del agua. Representado con **gráfico de área suave** para mostrar el movimiento continuo.

## 🎨 Funcionalidades de la Interfaz

### Panel Lateral (Variables)
- **Navegación por métricas** con tooltips explicativos
- **Botón de colapso** para mostrar solo iconos
- **Estado del sistema** con indicador visual

### Dashboard Principal
- **Gráfico principal** con 4 tipos de visualización
- **Tarjetas de métricas** con sparklines de tendencia
- **Gráfico comparativo** entre estaciones
- **Tarjeta de temperatura** con mini-gráfico

### Controles
- **Rangos temporales**: 30m, 1h, 6h, 24h
- **Modo pantalla completa** para análisis detallado
- **Selector de tema**: Claro, Oscuro, Automático
- **Notificaciones** del sistema

## 🔧 Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **Recharts** para visualizaciones
- **Framer Motion** para animaciones
- **React CountUp** para animaciones numéricas
- **Lucide React** para iconos

## 📱 Responsividad

El dashboard está optimizado para:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 📁 **Estructura del Proyecto**

```
src/
├── 🧩 components/      # Componentes React organizados por función
│   ├── charts/         # Gráficos (TimeFlowChart, ComparisonGauge)
│   ├── dashboard/      # Dashboard principal (DashboardGrid, MetricsCards)
│   ├── layout/         # Layout (Header, Sidebar, MainContent)
│   ├── maps/           # Mapas interactivos (RioClaroWeatherMap)
│   ├── sidebar/        # Panel de reportes
│   └── ui/             # Componentes reutilizables (Cards, Tooltips, etc.)
├── 🔧 config/          # Configuración centralizada (constants.ts)
├── 🔄 contexts/        # Estado global (DashboardContext.tsx)
├── 🎣 hooks/           # Custom hooks (useOptimizedData.ts)
├── 📝 types/           # Definiciones TypeScript
├── 🛠️ utils/          # Funciones auxiliares
└── 📄 *.tsx           # Archivos principales (App, main)
```

## 📚 **Documentación Completa**

La documentación está organizada en módulos para fácil navegación:

- **[📖 Documentación Completa](/docs/README.md)** - Índice principal de documentación
- **[🏗️ Estructura del Proyecto](/docs/01-estructura-proyecto.md)** - Organización detallada
- **[🔧 Configuración](/docs/02-configuracion.md)** - Variables y configuraciones
- **[📊 Tipos de Datos](/docs/03-tipos-datos.md)** - Interfaces TypeScript
- **[🖼️ Layout y Navegación](/docs/04-layout-navegacion.md)** - Componentes de UI

## 🔧 **Configuración Rápida**

**Archivo principal:** `src/config/constants.ts`

```typescript
// Cambiar título de la aplicación
APP_CONFIG.name = 'Tu Dashboard Personalizado';

// Cambiar colores principales
VISUAL_CONFIG.colors.station1 = '#tu-color-estacion-1';
VISUAL_CONFIG.colors.station2 = '#tu-color-estacion-2';

// Personalizar textos
TEXTOS_INTERFACE.dashboard.titulo = 'Tu Título Personalizado';
```

## 📈 Datos Simulados

El dashboard utiliza datos simulados que:
- Se actualizan cada **3 segundos**
- Simulan **variaciones naturales** del río
- Incluyen **2 estaciones** de monitoreo
- Generan **tendencias realistas**

## 🚀 Despliegue

### Build para producción
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` listos para desplegar en cualquier servidor web estático.

## 📄 Licencia

MIT License

Copyright (c) 2025 Sensorificación del Río Claro - Pucón

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**Desarrollado para el monitoreo hidrológico del Río Claro, Pucón - Chile** 🇨🇱
