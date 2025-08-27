// ===================================================================
// === CONFIGURACIÓN CENTRALIZADA DEL DASHBOARD HIDROLÓGICO ===
// ===================================================================
// Este archivo contiene TODAS las configuraciones principales del sistema
// IMPORTANTE: Los valores hardcodeados están marcados con "🔧 HARDCODED"

export const APP_CONFIG = {
  // 🔧 HARDCODED: Información básica de la aplicación
  name: 'Sensorificación Río Claro - Pucón', // Nombre del sistema - cambiar aquí para toda la app
  description: 'Dashboard de monitoreo en tiempo real', // Descripción mostrada en headers
  version: '2.0.0', // Versión actual - incrementar con cada release
  updateInterval: 3000, // 🔧 HARDCODED: Intervalo de actualización en milisegundos (3 segundos)
} as const;

// ===================================================================
// === CONFIGURACIÓN VISUAL Y COLORES ===
// ===================================================================
export const VISUAL_CONFIG = {
  // 🔧 HARDCODED: Multiplicadores para simular datos realistas de cada estación
  // Estos valores transforman los datos base para mostrar diferencias entre estaciones
  multipliers: {
    flujo: { 
      station1: 1.2,    // Estación 1 muestra 20% más flujo (simula ubicación río arriba)
      station2: 1.1     // Estación 2 muestra 10% más flujo
    },
    nivel: { 
      station1: 1/50,   // 🔧 HARDCODED: Convierte valores grandes a metros (divisor 50)
      station2: 1/48    // 🔧 HARDCODED: Ligera variación entre estaciones (divisor 48)
    },
    caudal: { 
      station1: 15,     // 🔧 HARDCODED: Multiplica por 15 para obtener L/s realistas
      station2: 14      // 🔧 HARDCODED: Estación 2 ligeramente menor
    },
    velocidad: { 
      station1: 1/60,   // 🔧 HARDCODED: Convierte a m/s realistas (divisor 60)
      station2: 1/58    // 🔧 HARDCODED: Velocidad ligeramente mayor en estación 2
    },
  },
  
  // 🔧 HARDCODED: Esquema de colores del sistema (según especificación turquesa)
  colors: {
    // Colores principales de las estaciones - cambiar aquí para toda la app
    station1: '#34d399',  // Verde esmeralda para Estación 1
    station2: '#38bdf8',  // Azul cielo para Estación 2  
    temperature: '#f97316', // Naranja para temperatura del agua
    
    // Fondos y gradientes - usados en todo el dashboard
    background: {
      gradient: 'from-cyan-50/30 via-transparent to-transparent',     // Modo claro
      darkGradient: 'from-cyan-950/20 via-transparent to-transparent', // Modo oscuro
    }
  },
  
  // 🔧 HARDCODED: Configuración de apariencia de gráficos
  charts: {
    // Márgenes de los gráficos Recharts - ajustar si se cortan las etiquetas
    margin: { top: 5, right: 20, left: -10, bottom: 0 },
    
    // Grosor de líneas - aumentar para mejor visibilidad
    strokeWidth: { 
      line: 3,  // Líneas principales (tendencias)
      area: 2   // Bordes de áreas rellenas
    },
    
    // Transparencias - valores entre 0 (transparente) y 1 (opaco)
    opacity: { 
      area: 0.8, // Áreas de los gráficos
      bar: 0.8   // Barras si se usan
    },
  }
} as const;

// ===================================================================
// === CONFIGURACIÓN DE RANGOS TEMPORALES ===
// ===================================================================
export const TIME_RANGES = {
  // 🔧 HARDCODED: Rangos de tiempo disponibles en los selectores
  // Los minutos se usan para filtrar datos, las labels se muestran al usuario
  '30m': { 
    minutes: 30,                    // 🔧 HARDCODED: 30 minutos = 1800 segundos
    label: 'Últimos 30 minutos'     // Texto mostrado en botones y selectores
  },
  '1h': { 
    minutes: 60,                    // 🔧 HARDCODED: 1 hora = 3600 segundos  
    label: 'Última hora' 
  },
  '6h': { 
    minutes: 360,                   // 🔧 HARDCODED: 6 horas = 21600 segundos
    label: 'Últimas 6 horas' 
  },
  '24h': { 
    minutes: 1440,                  // 🔧 HARDCODED: 24 horas = 86400 segundos
    label: 'Últimas 24 horas' 
  },
} as const;

// ===================================================================
// === TEXTOS DE LA INTERFAZ DE USUARIO ===
// ===================================================================
// 🔧 HARDCODED: Todos los textos mostrados en la aplicación
// Cambiar aquí para modificar etiquetas, descripciones y mensajes
export const TEXTOS_INTERFACE = {
  // Textos del dashboard principal
  dashboard: {
    titulo: 'Sensorificación Río Claro - Pucón',        // 🔧 HARDCODED: Título principal
    subtitulo: 'Dashboard de monitoreo en tiempo real',  // 🔧 HARDCODED: Subtítulo
    estadoSistema: 'Todos los sensores operativos',      // 🔧 HARDCODED: Estado del sistema
  },
  
  // 🔧 HARDCODED: Información de cada métrica hidrológica
  metricas: {
    flujo: {
      nombre: 'Flujo',
      unidad: 'm³/s',  // Metros cúbicos por segundo
      descripcion: 'El flujo representa el volumen de agua que pasa por una sección del río en un segundo. Un flujo alto puede indicar crecidas.',
    },
    nivel: {
      nombre: 'Nivel', 
      unidad: 'm',     // Metros sobre nivel de referencia
      descripcion: 'El nivel mide la altura del agua del río sobre un punto de referencia. Niveles altos son señal de alerta por posibles desbordes.',
    },
    caudal: {
      nombre: 'Caudal',
      unidad: 'L/s',   // Litros por segundo
      descripcion: 'El caudal es la cantidad de agua que fluye. Es crucial para la gestión de recursos hídricos y la prevención de inundaciones.',
    },
    velocidad: {
      nombre: 'Velocidad',
      unidad: 'm/s',   // Metros por segundo
      descripcion: 'La velocidad del agua. Una velocidad alta, combinada con un nivel alto, aumenta el poder erosivo y el riesgo del río.',
    },
    temperatura: {
      nombre: 'Temperatura del Agua',
      unidad: '°C',    // Grados Celsius
      descripcion: 'Temperatura promedio del agua del río medida por sensores termométricos en ambas estaciones.',
    }
  },
  
  // 🔧 HARDCODED: Nombres de las estaciones de monitoreo
  estaciones: {
    station1: 'Estación 1',  // Cambiar por nombre real (ej: "Puente Los Arrayanes")
    station2: 'Estación 2',  // Cambiar por nombre real (ej: "Desembocadura Lago")
  },
  
  // 🔧 HARDCODED: Descripciones de los rangos temporales para tooltips
  rangos: {
    '30m': 'Últimos 30 minutos - Vista detallada para monitoreo inmediato',
    '1h': 'Última hora - Ideal para detectar cambios recientes', 
    '6h': 'Últimas 6 horas - Análisis de tendencias a corto plazo',
    '24h': 'Últimas 24 horas - Vista completa del comportamiento diario',
  }
} as const;

// ===================================================================
// === CONFIGURACIÓN DE ANIMACIONES (FRAMER MOTION) ===
// ===================================================================
export const ANIMATION_CONFIG = {
  // 🔧 HARDCODED: Configuración para animaciones escalonadas (stagger)
  stagger: {
    delayChildren: 0.2,     // 🔧 HARDCODED: Espera 0.2s antes de empezar animaciones hijas
    staggerChildren: 0.1,   // 🔧 HARDCODED: 0.1s entre cada elemento hijo (efecto cascada)
  },
  
  // 🔧 HARDCODED: Configuración para elementos individuales
  item: {
    duration: 0.6,          // 🔧 HARDCODED: Duración de animación en segundos
    ease: "easeOut" as const, // Tipo de transición (suave al final)
  },
  
  // 🔧 HARDCODED: Configuración para animaciones de números (contadores)
  countUp: {
    duration: 1.5,          // 🔧 HARDCODED: Duración para contar números (1.5 segundos)
    decimals: 1,            // 🔧 HARDCODED: Número de decimales a mostrar
  }
} as const;

// ===================================================================
// === CONFIGURACIÓN DE USUARIO DEMO ===
// ===================================================================
export const USER_CONFIG = {
  // 🔧 HARDCODED: Usuario de demostración para el header
  // En producción, estos datos vendrían de autenticación real
  defaultUser: {
    name: 'Luis Loyola',    // 🔧 HARDCODED: Nombre del operador del sistema
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1', // 🔧 HARDCODED: URL de imagen de perfil
    status: 'En línea',     // 🔧 HARDCODED: Estado del usuario
  }
} as const;