import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MetricDataPoint, MetricType, TimeRange, DateRange, Metrics } from '../types';
import { VISUAL_CONFIG } from '../config/constants';

/**
 * ===================================================================
 * === CONTEXTO GLOBAL DEL DASHBOARD HIDROLÓGICO ===
 * ===================================================================
 * 
 * Este contexto maneja TODO el estado global de la aplicación usando
 * el patrón Context + useReducer para escalabilidad
 * 
 * 🔧 HARDCODED: Los valores por defecto están definidos en initialState
 * 📊 DATOS: Los datos simulados se procesan con multiplicadores
 * 🎯 PATRÓN: Context + Reducer + Custom Hook
 */

// ===================================================================
// === INTERFAZ DEL ESTADO GLOBAL ===
// ===================================================================
interface DashboardState {
  selectedMetric: MetricType;    // Métrica seleccionada: 'flujo' | 'nivel' | 'caudal' | 'velocidad'
  timeRange: TimeRange;          // Rango temporal: '30m' | '1h' | '6h' | '24h'
  globalDateRange: DateRange;    // Rango de fechas personalizado
  isAsideCollapsed: boolean;     // Estado del sidebar (expandido/colapsado)
  isFullscreen: boolean;         // Modo pantalla completa para gráficos
  showReportsPanel: boolean;     // Panel de reportes visible/oculto
  data: MetricDataPoint[];       // Datos hidrológicos en tiempo real
  isLoading: boolean;            // Estado de carga de datos
}

// ===================================================================
// === ACCIONES DISPONIBLES (REDUCER PATTERN) ===
// ===================================================================
// Todas las formas de modificar el estado global del dashboard
type DashboardAction =
  | { type: 'SET_METRIC'; payload: MetricType }       // Cambiar métrica visible
  | { type: 'SET_TIME_RANGE'; payload: TimeRange }    // Cambiar rango temporal
  | { type: 'SET_DATE_RANGE'; payload: DateRange }    // Cambiar fechas personalizadas
  | { type: 'TOGGLE_ASIDE' }                          // Mostrar/ocultar sidebar
  | { type: 'TOGGLE_FULLSCREEN' }                     // Activar/desactivar pantalla completa
  | { type: 'TOGGLE_REPORTS' }                        // Mostrar/ocultar panel reportes
  | { type: 'SET_DATA'; payload: MetricDataPoint[] }  // Actualizar datos hidrológicos
  | { type: 'SET_LOADING'; payload: boolean };        // Cambiar estado de carga

// ===================================================================
// === ESTADO INICIAL DEL DASHBOARD ===
// ===================================================================
// 🔧 HARDCODED: Valores por defecto cuando se inicia la aplicación
const initialState: DashboardState = {
  selectedMetric: 'flujo',        // 🔧 HARDCODED: Métrica inicial mostrada
  timeRange: '30m',               // 🔧 HARDCODED: Rango temporal inicial (30 minutos)
  globalDateRange: {
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 🔧 HARDCODED: 7 días atrás
    endDate: new Date()                                          // 🔧 HARDCODED: Hasta ahora
  },
  isAsideCollapsed: false,        // 🔧 HARDCODED: Sidebar expandido por defecto
  isFullscreen: false,            // 🔧 HARDCODED: Ventana normal por defecto
  showReportsPanel: false,        // 🔧 HARDCODED: Panel reportes oculto por defecto
  data: [],                       // 🔧 HARDCODED: Sin datos iniciales (se cargan async)
  isLoading: true,                // 🔧 HARDCODED: Inicia en estado de carga
};

// ===================================================================
// === REDUCER - LÓGICA DE ACTUALIZACIÓN DEL ESTADO ===
// ===================================================================
// Función pura que define CÓMO se modifica el estado según cada acción
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_METRIC':
      // Cambiar la métrica hidrológica seleccionada (flujo, nivel, caudal, velocidad)
      return { ...state, selectedMetric: action.payload };
      
    case 'SET_TIME_RANGE':
      // Actualizar rango temporal de los gráficos (30m, 1h, 6h, 24h)
      return { ...state, timeRange: action.payload };
      
    case 'SET_DATE_RANGE':
      // Establecer rango de fechas personalizado para reportes
      return { ...state, globalDateRange: action.payload };
      
    case 'TOGGLE_ASIDE':
      // Alternar visibilidad del panel lateral (sidebar)
      return { ...state, isAsideCollapsed: !state.isAsideCollapsed };
      
    case 'TOGGLE_FULLSCREEN':
      // Activar/desactivar modo pantalla completa para gráficos
      return { ...state, isFullscreen: !state.isFullscreen };
      
    case 'TOGGLE_REPORTS':
      // Mostrar/ocultar panel de generación de reportes
      return { ...state, showReportsPanel: !state.showReportsPanel };
      
    case 'SET_DATA':
      // Actualizar datos hidrológicos (se ejecuta cada 3 segundos)
      return { ...state, data: action.payload };
      
    case 'SET_LOADING':
      // Cambiar estado de carga (spinner/loading indicators)
      return { ...state, isLoading: action.payload };
      
    default:
      // Si la acción no existe, devolver estado sin cambios
      return state;
  }
}

// ===================================================================
// === CONTEXTO DE REACT ===
// ===================================================================
// Definición del contexto que se compartirá en toda la aplicación
const DashboardContext = createContext<{
  state: DashboardState;                              // Estado actual del dashboard
  dispatch: React.Dispatch<DashboardAction>;         // Función para ejecutar acciones
  getMetrics: (data: MetricDataPoint[]) => Metrics;  // Función para procesar datos
} | null>(null);

// ===================================================================
// === PROVIDER - COMPONENTE QUE PROVEE EL CONTEXTO ===
// ===================================================================
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // ===================================================================
  // === FUNCIÓN DE PROCESAMIENTO DE DATOS HIDROLÓGICOS ===
  // ===================================================================
  // 🔧 HARDCODED: Los multiplicadores están definidos en VISUAL_CONFIG
  // Esta función convierte datos base en métricas realistas para cada estación
  const getMetrics = (data: MetricDataPoint[]): Metrics => {
    // Si no hay datos, devolver valores en cero para evitar errores
    if (data.length === 0) {
      return {
        flujo: { station1: 0, station2: 0 },
        nivel: { station1: 0, station2: 0 },
        caudal: { station1: 0, station2: 0 },
        velocidad: { station1: 0, station2: 0 },
      };
    }

    // Tomar el dato más reciente (último elemento del array)
    const latest = data[data.length - 1];
    
    // 🔧 HARDCODED: Los multiplicadores vienen de constants.ts
    // Se usan para simular diferencias realistas entre estaciones
    const { multipliers } = VISUAL_CONFIG;

    return {
      // Flujo en m³/s - Estación 1 simula ser río arriba (más flujo)
      flujo: {
        station1: latest.station1 * multipliers.flujo.station1, // x1.2
        station2: latest.station2 * multipliers.flujo.station2, // x1.1
      },
      // Nivel en metros - Convertir valores grandes a metros realistas
      nivel: {
        station1: latest.station1 * multipliers.nivel.station1, // ÷50
        station2: latest.station2 * multipliers.nivel.station2, // ÷48
      },
      // Caudal en L/s - Multiplicar para obtener valores típicos
      caudal: {
        station1: latest.station1 * multipliers.caudal.station1, // x15
        station2: latest.station2 * multipliers.caudal.station2, // x14
      },
      // Velocidad en m/s - Convertir a velocidades realistas del agua
      velocidad: {
        station1: latest.station1 * multipliers.velocidad.station1, // ÷60
        station2: latest.station2 * multipliers.velocidad.station2, // ÷58
      },
    };
  };

  // Proveer el contexto a todos los componentes hijos
  return (
    <DashboardContext.Provider value={{ state, dispatch, getMetrics }}>
      {children}
    </DashboardContext.Provider>
  );
};

// ===================================================================
// === HOOK PERSONALIZADO PARA USAR EL CONTEXTO ===
// ===================================================================
// 🔧 HARDCODED: Validación automática para evitar errores de uso
// Este hook debe usarse DENTRO de <DashboardProvider>
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  
  // Validar que el hook se usa dentro del Provider correcto
  if (!context) {
    throw new Error(
      '❌ ERROR: useDashboard debe usarse dentro de un <DashboardProvider>.\n' +
      '💡 SOLUCIÓN: Envuelve tu componente con <DashboardProvider> en App.tsx'
    );
  }
  
  return context;
};