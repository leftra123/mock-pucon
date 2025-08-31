# 🔧 Configuración del Proyecto

## 📍 **Ubicación Principal**

**Archivo clave:** `src/config/constants.ts`

Este archivo contiene **TODA** la configuración centralizada del proyecto. Todos los valores hardcodeados están claramente marcados con `🔧 HARDCODED`.

## 🏷️ **APP_CONFIG - Información Básica**

```typescript
export const APP_CONFIG = {
  name: 'Sensorificación Río Claro - Pucón',    // Título de la aplicación
  description: 'Dashboard de monitoreo en tiempo real',
  version: '2.0.0',
  updateInterval: 3000,  // Actualización cada 3 segundos
} as const;
```

**¿Qué modificar aquí?**
- Cambiar el nombre del proyecto
- Ajustar intervalo de actualización de datos
- Versión para releases

## 🎨 **VISUAL_CONFIG - Colores y Apariencia**

### Multiplicadores de Datos
```typescript
multipliers: {
  flujo: { station1: 1.2, station2: 1.1 },      // Simulan diferencias entre estaciones
  nivel: { station1: 1/50, station2: 1/48 },    // Convierten a valores realistas
  caudal: { station1: 15, station2: 14 },
  velocidad: { station1: 1/60, station2: 1/58 },
}
```

### Colores del Sistema
```typescript
colors: {
  station1: '#34d399',    // 🟢 Verde esmeralda - Estación 1
  station2: '#38bdf8',    // 🔵 Azul cielo - Estación 2
  temperature: '#f97316', // 🟠 Naranja - Temperatura
}
```

### Configuración de Gráficos
```typescript
charts: {
  margin: { top: 5, right: 20, left: -10, bottom: 0 },
  strokeWidth: { line: 3, area: 2 },    // Grosor de líneas
  opacity: { area: 0.8, bar: 0.8 },     // Transparencias
}
```

## ⏰ **TIME_RANGES - Rangos Temporales**

```typescript
export const TIME_RANGES = {
  '30m': { minutes: 30, label: 'Últimos 30 minutos' },
  '1h': { minutes: 60, label: 'Última hora' },
  '6h': { minutes: 360, label: 'Últimas 6 horas' },
  '24h': { minutes: 1440, label: 'Últimas 24 horas' },
} as const;
```

**Para agregar nuevos rangos:**
1. Agregar entrada con formato `'código': { minutes: X, label: 'Texto' }`
2. Actualizar tipo `TimeRange` en `src/types/index.ts`

## 📝 **TEXTOS_INTERFACE - Todos los Textos**

### Dashboard Principal
```typescript
dashboard: {
  titulo: 'Sensorificación Río Claro - Pucón',
  subtitulo: 'Dashboard de monitoreo en tiempo real',
  estadoSistema: 'Todos los sensores operativos',
}
```

### Métricas Hidrológicas
```typescript
metricas: {
  flujo: {
    nombre: 'Flujo',
    unidad: 'm³/s',
    descripcion: 'El flujo representa el volumen de agua...',
  },
  // ... más métricas
}
```

### Estaciones de Monitoreo
```typescript
estaciones: {
  station1: 'Estación 1',  // 🔧 CAMBIAR por nombre real
  station2: 'Estación 2',  // 🔧 CAMBIAR por nombre real
}
```

## 🎭 **ANIMATION_CONFIG - Animaciones**

```typescript
export const ANIMATION_CONFIG = {
  stagger: {
    delayChildren: 0.2,    // Retraso inicial
    staggerChildren: 0.1,  // Tiempo entre animaciones
  },
  item: {
    duration: 0.6,         // Duración de animación
    ease: "easeOut",       // Tipo de transición
  },
  countUp: {
    duration: 1.5,         // Duración para contadores numéricos
    decimals: 1,           // Decimales a mostrar
  }
} as const;
```

## 👤 **USER_CONFIG - Usuario Demo**

```typescript
export const USER_CONFIG = {
  defaultUser: {
    name: 'Luis Loyola',    // 🔧 CAMBIAR por usuario real
    avatar: 'https://...',  // 🔧 URL de imagen de perfil
    status: 'En línea',
  }
} as const;
```

## 📋 **Guía de Modificación Rápida**

### ✏️ **Cambios Comunes**

| Quiero cambiar... | Ubicación | Propiedad |
|-------------------|-----------|-----------|
| Nombre de la app | `APP_CONFIG` | `.name` |
| Color de estación 1 | `VISUAL_CONFIG.colors` | `.station1` |
| Texto de botón | `TEXTOS_INTERFACE` | `.dashboard.titulo` |
| Nombre de métrica | `TEXTOS_INTERFACE.metricas` | `.flujo.nombre` |
| Usuario demo | `USER_CONFIG.defaultUser` | `.name` |

### 🎯 **Ejemplo: Cambiar Colores de Estaciones**

```typescript
// EN: src/config/constants.ts
colors: {
  station1: '#ff6b6b',    // ❌ Cambiar de verde a rojo
  station2: '#4ecdc4',    // ❌ Cambiar de azul a turquesa
  temperature: '#f97316', // ✅ Mantener naranja
}
```

### 🏷️ **Ejemplo: Cambiar Nombres de Estaciones**

```typescript
// EN: src/config/constants.ts
estaciones: {
  station1: 'Puente Los Arrayanes',     // ✅ Nombre real
  station2: 'Desembocadura Lago Villarrica', // ✅ Nombre real
}
```

## ⚠️ **Consideraciones Importantes**

1. **Reiniciar servidor:** Después de cambios en `constants.ts`
2. **TypeScript:** Los tipos están marcados como `as const` para mayor seguridad
3. **Coherencia:** Cambiar colores también requiere actualizar referencias en CSS
4. **Testing:** Verificar que los cambios se reflejen en todos los componentes

---
[← Anterior: Estructura](./01-estructura-proyecto.md) | [Siguiente: Tipos de Datos →](./03-tipos-datos.md)