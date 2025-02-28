<lov-code>
import { useState, useEffect } from "react";
import {
  AtSign,
  BarChart3,
  ChevronDown,
  FileUp,
  Image,
  PaperclipIcon,
  Send,
  Settings,
  Sparkles,
  User,
  Command,
  ArrowUp,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Bot,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { agents, companies, users } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Define el tipo para los mensajes
interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

// Define el tipo para las conversaciones
interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  model: string;
  messages: ChatMessage[];
}

const Chat = () => {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [selectedAgent, setSelectedAgent] = useState(agents[0].id);
  const [selectedCompany, setSelectedCompany] = useState(companies[0].id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>("chat-extensive");
  const isMobile = useIsMobile();

  // Auto-colapsar sidebar en móvil
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setShowSidebarMobile(false);
    }
  }, [isMobile]);

  // Cerrar sidebar mobile al seleccionar un chat
  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    if (isMobile) {
      setShowSidebarMobile(false);
    }
  };

  const llmModels = [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
    { id: "grok-1", name: "Grok", provider: "xAI" },
    { id: "deepseek", name: "DeepSeek", provider: "DeepSeek" },
  ];

  // Ejemplos de conversaciones activas
  const activeConversations: Conversation[] = [
    {
      id: "chat1",
      title: "Análisis financiero Q2",
      preview: "¿Puedes analizar los resultados del segundo trimestre?",
      timestamp: "10:30 AM",
      model: "GPT-4",
      messages: [
        {
          id: "1",
          content: "¿Puedes analizar los resultados financieros del segundo trimestre y destacar las áreas de crecimiento?",
          sender: "user",
          timestamp: "10:30 AM"
        },
        {
          id: "2",
          content: "He analizado los resultados del Q2. Veo un crecimiento del 15% en ingresos por servicios digitales, mientras que los costos operativos se han reducido un 5%. Las áreas con mayor potencial son el segmento de comercio electrónico y los servicios de consultoría. ¿Te gustaría un desglose más detallado de algún área específica?",
          sender: "ai",
          timestamp: "10:31 AM"
        }
      ]
    },
    {
      id: "chat2",
      title: "Plan de marketing digital",
      preview: "Quiero crear una campaña para redes sociales...",
      timestamp: "Ayer",
      model: "Claude 3",
      messages: [
        {
          id: "1",
          content: "Quiero crear una campaña para redes sociales que aumente nuestro engagement en un 20% en los próximos 3 meses. ¿Puedes ayudarme?",
          sender: "user",
          timestamp: "Ayer"
        },
        {
          id: "2",
          content: "Para aumentar el engagement en un 20% en 3 meses, recomendaría una estrategia con estos componentes: 1) Contenido de formato corto en TikTok y Reels con tendencias actuales, 2) Publicaciones interactivas semanales (encuestas, cuestionarios), 3) Colaboraciones con micro-influencers del sector, y 4) Una campaña de hashtag único. ¿Te gustaría que desarrolle alguno de estos puntos?",
          sender: "ai",
          timestamp: "Ayer"
        }
      ]
    },
    {
      id: "chat3",
      title: "Optimización de procesos internos",
      preview: "Necesitamos mejorar el flujo de trabajo...",
      timestamp: "Lun 15",
      model: "Gemini Pro",
      messages: [
        {
          id: "1",
          content: "Necesitamos mejorar el flujo de trabajo entre los departamentos de desarrollo y marketing. ¿Qué herramientas y procesos recomiendas?",
          sender: "user",
          timestamp: "Lun 15"
        },
        {
          id: "2",
          content: "Para mejorar la colaboración entre desarrollo y marketing, recomendaría: 1) Implementar una herramienta de gestión de proyectos como Asana o Jira con paneles compartidos, 2) Reuniones semanales de sincronización entre los equipos, 3) Un sistema de documentación centralizado como Notion, y 4) Definir SLAs claros para las solicitudes entre departamentos. La clave está en la transparencia y comunicación constante.",
          sender: "ai",
          timestamp: "Lun 15"
        }
      ]
    },
    {
      id: "chat-extensive",
      title: "Desarrollo estratégico 2024",
      preview: "Conversación extensa sobre estrategia...",
      timestamp: "Hoy",
      model: "GPT-4",
      messages: [
        {
          id: "1",
          content: "Hola, estoy preparando el plan estratégico para 2024 y necesito ideas para expandir nuestro negocio a nuevos mercados internacionales. ¿Qué enfoques recomiendas?",
          sender: "user",
          timestamp: "09:15 AM"
        },
        {
          id: "2",
          content: "Hola, para la expansión internacional en 2024, recomendaría considerar estos enfoques:\n\n1. **Análisis de mercado profundo**: Identifica 3-5 mercados potenciales basados en:\n   - Tamaño del mercado y crecimiento proyectado\n   - Regulaciones y barreras de entrada\n   - Competencia local e internacional\n   - Afinidad cultural con tu modelo de negocio\n\n2. **Estrategia de entrada por fases**:\n   - Fase 1: Asociación con distribuidores/socios locales\n   - Fase 2: Establecimiento de oficina de ventas\n   - Fase 3: Operaciones completas\n\n3. **Localización de producto/servicio**:\n   - Adapta tu oferta a necesidades locales\n   - Considera pricing diferenciado por región\n\n4. **Estructura legal y fiscal**:\n   - Evalúa diferentes modelos (subsidiaria vs. branch office)\n   - Optimiza la estructura para repatriación de beneficios\n\n¿Hay alguna región específica que estés considerando prioritaria?",
          sender: "ai",
          timestamp: "09:17 AM"
        },
        {
          id: "3",
          content: "Estamos considerando principalmente Latinoamérica y Europa. Para Latinoamérica, nos interesan México, Colombia y Chile. Para Europa, estamos pensando en España como punto de entrada por el idioma, y luego expandirnos a Alemania y Francia. ¿Cómo deberíamos priorizar?",
          sender: "user",
          timestamp: "09:22 AM"
        },
        {
          id: "4",
          content: "Excelente selección de mercados potenciales. Vamos a analizar cada región para ayudarte a priorizar:\n\n**Latinoamérica**:\n\n1. **México**:\n   - Ventajas: Gran mercado (126M habitantes), proximidad a EE.UU., parte del T-MEC\n   - Consideraciones: Alta competencia en varios sectores, diferencias regulatorias por estado\n   - Estrategia recomendada: Iniciar en Ciudad de México/Monterrey/Guadalajara\n\n2. **Colombia**:\n   - Ventajas: Economía en crecimiento, regulaciones favorables para negocios extranjeros\n   - Consideraciones: Diferentes dinámicas entre regiones, infraestructura variable\n   - Estrategia: Enfoque inicial en Bogotá y Medellín\n\n3. **Chile**:\n   - Ventajas: Economía estable, mayor facilidad para hacer negocios en Latam\n   - Consideraciones: Mercado más pequeño (19M), pero alto poder adquisitivo\n   - Estrategia: Buena opción como mercado de prueba inicial\n\n**Europa**:\n\n1. **España**:\n   - Ventajas: Puente cultural/lingüístico, acceso al mercado europeo\n   - Consideraciones: Recuperación económica más lenta post-pandemia\n   - Estrategia: Madrid/Barcelona como hubs iniciales\n\n2. **Alemania**:\n   - Ventajas: Mayor economía de Europa, consumidores con alto poder adquisitivo\n   - Consideraciones: Mayor competencia, expectativas de calidad muy altas\n   - Estrategia: Requiere mayor inversión inicial pero potencial retorno más alto\n\n3. **Francia**:\n   - Ventajas: Gran mercado, diversificado\n   - Consideraciones: Barreras culturales y administrativas significativas\n\n**Recomendación de priorización**:\n\n1. **Primera fase**: Chile (mercado de prueba) y España (punto de entrada europeo)\n2. **Segunda fase**: México y Colombia\n3. **Tercera fase**: Alemania y Francia\n\nEsta priorización te permite:\n- Probar y ajustar tu modelo con inversión controlada\n- Establecer presencia en ambas regiones simultáneamente\n- Usar las lecciones aprendidas para las expansiones siguientes\n\n¿Te parece adecuado este enfoque?",
          sender: "ai",
          timestamp: "09:28 AM"
        },
        {
          id: "5",
          content: "Me parece un enfoque muy razonable. ¿Qué estructura recomiendas para los equipos iniciales en cada país? ¿Y qué consideraciones legales y fiscales deberíamos tener en cuenta, especialmente para España que sería nuestra puerta de entrada a Europa?",
          sender: "user",
          timestamp: "09:35 AM"
        },
        {
          id: "6",
          content: "**Estructura de equipos iniciales por país**:\n\n**Chile y España (Fase 1)**:\n\n*Equipo mínimo viable*:\n- 1 Country Manager (responsable de la operación completa)\n- 1-2 Ejecutivos de Ventas/Desarrollo de Negocios\n- 1 Especialista en Marketing/Comunicación (con enfoque local)\n- Soporte administrativo/legal (puede ser outsourcing inicialmente)\n\nEsta estructura ligera te permite tener presencia efectiva con una inversión controlada, aproximadamente 4-5 personas por país.\n\n**Consideraciones legales y fiscales para España**:\n\n1. **Estructura legal**:\n   - **Sociedad Limitada (S.L.)**: La opción más común para filiales extranjeras\n     - Capital mínimo: 3.000€\n     - Procedimiento relativamente sencillo\n     - Responsabilidad limitada al capital aportado\n\n2. **Impuestos clave**:\n   - Impuesto de Sociedades: 25% (tipo general)\n   - IVA: 21% (tipo general)\n   - Retenciones por pagos a no residentes: Varían según país de origen y convenios\n\n3. **Consideraciones laborales**:\n   - Contratos laborales muy regulados\n   - Indemnizaciones por despido significativas\n   - Vacaciones mínimas de 30 días naturales/año\n   - Convenios colectivos por sector que pueden afectar salarios y condiciones\n\n4. **Ventajas fiscales**:\n   - Régimen de Holding (ETVE): Exención para dividendos y plusvalías de participaciones extranjeras\n   - Deducciones por I+D+i\n   - Incentivos para startups y nuevas empresas\n\n5. **Como puerta a Europa**:\n   - Pasaporte comunitario para servicios financieros/regulados\n   - Acceso al mercado único (libre circulación de bienes/servicios)\n   - Legislación armonizada en muchos aspectos\n\n6. **Trámites específicos**:\n   - Inscripción en el Registro Mercantil\n   - Obtención de NIF (Número de Identificación Fiscal)\n   - Registro ante autoridades laborales y Seguridad Social\n   - Declaración de inversión extranjera (en algunos casos)\n\n7. **Consideraciones prácticas**:\n   - Servicios bancarios: Apertura de cuentas para no residentes cada vez más compleja\n   - Representantes fiscales: Necesarios en algunas circunstancias\n   - Protección de datos: Cumplimiento del RGPD muy estricto\n\n¿Necesitas detalles específicos sobre algún aspecto en particular o información sobre los otros mercados?",
          sender: "ai",
          timestamp: "09:42 AM"
        },
        {
          id: "7",
          content: "Esta información es muy valiosa. Ahora, respecto al marketing y posicionamiento de marca, ¿cómo recomiendas que adaptemos nuestra estrategia para cada mercado? ¿Deberíamos mantener una identidad de marca global coherente o permitir adaptaciones significativas por región?",
          sender: "user",
          timestamp: "09:50 AM"
        },
        {
          id: "8",
          content: "**Estrategia de marketing y posicionamiento para expansión internacional**\n\nRecomiendo un enfoque de **'Coherencia global con flexibilidad local'**, también conocido como 'Glocalización'. Esto implica:\n\n**Elementos que mantener coherentes globalmente**:\n\n1. **Identidad visual central**:\n   - Logo, paleta de colores y elementos de diseño principales\n   - Tipografía y sistema de diseño básico\n   - Posicionamiento fundamental de la marca\n\n2. **Propuesta de valor principal**:\n   - Misión y visión de la empresa\n   - Beneficios centrales del producto/servicio\n   - Historia y origen de la marca\n\n3. **Estándares de calidad y experiencia**:\n   - Nivel de servicio al cliente\n   - Políticas de garantía/devoluciones\n   - Valores de marca\n\n**Elementos a adaptar localmente**:\n\n1. **Comunicación y mensajes**:\n   - Adaptación lingüística (más allá de la traducción literal)\n   - Referencias culturales y ejemplos locales\n   - Tonalidad ajustada a expectativas culturales\n\n2. **Canales y mix de marketing**:\n   - Plataformas predominantes por país (ej. diferentes redes sociales)\n   - Mix de medios offline/online según hábitos locales\n   - Estrategias de precios adaptadas al mercado\n\n3. **Oferta de productos/servicios**:\n   - Personalización de características según necesidades locales\n   - Adaptación de packaging si es necesario\n   - Posibles variaciones en la gama de productos\n\n**Recomendaciones específicas por mercado**:\n\n**Chile**:\n- Comunicación directa y profesional\n- Énfasis en calidad y relación precio-valor\n- Importancia de credenciales internacionales\n\n**España**:\n- Marketing relacional fuerte (las relaciones personales importan)\n- Adaptación a dinámicas regionales (diferencias culturales dentro del país)\n- Reconocimiento de tradiciones y festividades locales\n\n**México** (fase posterior):\n- Comunicación cálida y personalizada\n- Consideración a diferencias socioeconómicas significativas\n- Potencial sensibilidad a comparaciones con EE.UU.\n\n**Colombia** (fase posterior):\n- Énfasis en innovación y modernidad\n- Comunicación optimista y orientada a soluciones\n- Adaptación a diferencias regionales marcadas\n\n**Estructura organizativa recomendada**:\n\n1. **Equipo global de marca**:\n   - Define directrices y estrategia central\n   - Crea activos principales y plantillas adaptables\n   - Supervisa coherencia general\n\n2. **Equipos de marketing locales**:\n   - Adaptan y ejecutan campañas localmente\n   - Aportan conocimiento cultural y de mercado\n   - Gestionan relaciones con medios y partners locales\n\n3. **Proceso de aprobación eficiente**:\n   - Sistema claro para aprobaciones de nuevas adaptaciones\n   - Biblioteca central de activos aprobados\n   - Reuniones periódicas de coordinación global-local\n\n**Ejemplos de marcas que han ejecutado bien este balance**:\n\n- **Coca-Cola**: Campañas globales con ejecuciones locales distintivas\n- **Netflix**: Contenido y comunicación adaptados localmente, experiencia coherente\n- **Spotify**: Personalización por mercado manteniendo identidad de marca clara\n\n¿Te gustaría profundizar en algún aspecto específico de esta estrategia de marketing internacional?",
          sender: "ai",
          timestamp: "09:58 AM"
        },
        {
          id: "9",
          content: "Excelente estrategia de glocalización. La implementaremos de esa manera. Ahora, pensando en métricas de éxito, ¿qué KPIs recomiendas que midamos en los primeros 6 meses para evaluar el progreso en cada mercado? Y luego, ¿cómo deberíamos ajustar estos KPIs para los primeros 2 años?",
          sender: "user",
          timestamp: "10:05 AM"
        },
        {
          id: "10",
          content: "**KPIs para expansión internacional**\n\n**Primeros 6 meses (Fase de establecimiento)**\n\nLos KPIs iniciales deben enfocarse en establecer presencia y tracción básica:\n\n1. **Penetración de mercado**:\n   - Número de clientes/usuarios adquiridos\n   - Tasa de conversión de prospectos a clientes\n   - Distribución geográfica dentro del país\n\n2. **Eficiencia operativa**:\n   - Tiempo para completar trámites administrativos/legales\n   - Tiempo de contratación para posiciones clave\n   - Cumplimiento del cronograma de establecimiento\n\n3. **Reconocimiento de marca**:\n   - Menciones en medios locales\n   - Consultas/solicitudes de información\n   - Tráfico web desde la región objetivo\n   - Engagement en redes sociales locales\n\n4. **Adaptación del producto/servicio**:\n   - Feedback inicial de usuarios/clientes\n   - Número de adaptaciones requeridas\n   - Valoraciones del producto/NPS inicial\n\n5. **Financieros iniciales**:\n   - Costo de adquisición de cliente (CAC)\n   - Gastos de establecimiento vs. presupuesto\n   - Primeras señales de ingresos\n\n**Primeros 2 años (Fase de crecimiento y consolidación)**\n\nAquí los KPIs evolucionan hacia rentabilidad y crecimiento sostenible:\n\n1. **Crecimiento**:\n   - Tasa de crecimiento mensual/trimestral\n   - Cuota de mercado alcanzada\n   - Expansión a nuevas áreas dentro del país\n   - Tasa de adopción por segmentos target\n\n2. **Rentabilidad**:\n   - Punto de equilibrio por mercado\n   - Margen de contribución\n   - Retorno sobre inversión de marketing (ROMI)\n   - Período de recuperación de la inversión inicial\n\n3. **Retención y lealtad**:\n   - Tasa de retención de clientes\n   - Valor del tiempo de vida del cliente (LTV)\n   - Ratio LTV:CAC (debería mejorar con el tiempo)\n   - NPS/Índice de satisfacción consolidado\n   - Tasa de recomendación/referidos\n\n4. **Eficiencia operativa evolucionada**:\n   - Productividad por empleado\n   - Costos operativos como % de ingresos\n   - Velocidad de respuesta a incidencias/solicitudes\n\n5. **Integración regional**:\n   - Sinergias entre mercados\n   - Economías de escala logradas\n   - Eficiencia en marketing entre mercados\n\n**Dashboards de seguimiento recomendados**:\n\n1. **Dashboard ejecutivo mensual**:\n   - KPIs principales con tendencias\n   - Comparativo entre mercados\n   - Alertas sobre desviaciones significativas\n\n2. **Dashboard operativo semanal**:\n   - Métricas de actividad comercial\n   - Indicadores de servicio/soporte\n   - Pipeline de ventas\n\n3. **Reunión trimestral de revisión estratégica**:\n   - Análisis profundo de tendencias\n   - Ajustes estratégicos necesarios\n   - Actualización de objetivos según aprendizajes\n\n**Ajustes sugeridos en la evolución de KPIs**:\n\n- **Mes 1-3**: Enfoque en KPIs de establecimiento y primeros contactos\n- **Mes 4-6**: Transición hacia KPIs de primeras ventas y feedback\n- **Mes 7-12**: Mayor peso a KPIs de crecimiento y optimización\n- **Mes 13-24**: Consolidación con énfasis en rentabilidad y escalabilidad\n\n**Recomendación de herramientas**:\n\n- **HubSpot/Salesforce**: Seguimiento de pipeline comercial\n- **Tableau/Power BI**: Visualización de datos cross-mercado\n- **Mixpanel/Amplitude**: Análisis de comportamiento de usuarios\n- **Databox/Geckoboard**: Dashboards compartidos para equipos\n\n¿Necesitas que profundice en algún tipo particular de métrica o en cómo establecer objetivos específicos para alguno de estos indicadores?",
          sender: "ai",
          timestamp: "10:15 AM"
        },
        {
          id: "11",
          content: "Este es un excelente marco de KPIs. Ahora, para cerrar nuestra planificación, ¿podrías proporcionarme un cronograma tentativo de implementación para los próximos 6 meses, considerando que queremos iniciar operaciones en Chile y España simultáneamente?",
          sender: "user",
          timestamp: "10:22 AM"
        },
        {
          id: "12",
          content: "**Cronograma de implementación: Primeros 6 meses**\n**Expansión simultánea a Chile y España**\n\n**MES 1: PREPARACIÓN Y PLANIFICACIÓN**\n\n**Semana 1-2: Finalización de análisis y planificación**\n- Completar estudios de mercado detallados para ambos países\n- Finalizar presupuestos de expansión\n- Definir estructura legal óptima para cada mercado\n- Establecer equipo central de expansión internacional\n\n**Semana 3-4: Inicio de trámites legales**\n- Contratar asesores legales y fiscales en ambos países\n- Iniciar trámites de constitución de entidades legales\n- Comenzar búsqueda de ubicaciones de oficina\n- Preparar descripciones de puestos para contrataciones clave\n\n**Paralelamente: Adaptación de producto/oferta**\n- Iniciar traducción y localización de materiales\n- Ajustar características del producto según análisis de necesidades locales\n- Revisar estrategia de precios para cada mercado\n\n**MES 2: ESTABLECIMIENTO LEGAL Y PRIMERAS CONTRATACIONES**\n\n**Semana 1-2: Continuación legal y operativa**\n- Completar constitución de entidades (o avanzar significativamente)\n- Abrir cuentas bancarias corporativas\n- Firmar contratos de arrendamiento para oficinas\n- Iniciar proceso de contratación para Country Managers\n\n**Semana 3-4: Infraestructura básica**\n- Configurar sistemas informáticos y comunicaciones\n- Establecer procesos financieros y administrativos básicos\n- Realizar primeras entrevistas para puestos clave\n- Desarrollar plan detallado de marketing de entrada\n\n**MES 3: EQUIPO INICIAL Y PREPARACIÓN DE LANZAMIENTO**\n\n**Semana 1-2: Formación de equipos**\n- Contratar y onboarding de Country Managers\n- Finalizar contrataciones iniciales (ventas/marketing)\n- Preparar oficinas y equipamiento\n- Establecer KPIs específicos por país\n\n**Semana 3-4: Preparación comercial**\n- Entrenar equipos locales sobre producto/servicios\n- Finalizar adaptación de materiales de marketing\n- Identificar y contactar primeros clientes potenciales\n- Planificar eventos de lanzamiento\n\n**MES 4: SOFT LAUNCH Y PRIMERAS OPERACIONES**\n\n**Semana 1-2: Soft launch**\n- Lanzamiento con clientes seleccionados/beta\n- Activación de canales digitales locales\n- Primeras reuniones con clientes potenciales clave\n- Ajustes basados en feedback inicial\n\n**Semana 3-4: Optimización inicial**\n- Analizar métricas iniciales de respuesta\n- Ajustar pitch/mensajes según reacciones\n- Establecer procesos de soporte y atención al cliente\n- Comenzar relaciones con medios locales\n\n**MES 5: EXPANSIÓN DE OPERACIONES**\n\n**Semana 1-2: Ampliación de alcance**\n- Expandir actividades comerciales a más prospectos\n- Implementar campañas de marketing digital más amplias\n- Optimizar procesos basados en aprendizajes iniciales\n- Revisar y ajustar previsiones financieras\n\n**Semana 3-4: Desarrollo de partnerships**\n- Identificar y contactar potenciales socios estratégicos locales\n- Ajustar estrategia de canales según rendimiento inicial\n- Revisar necesidades de personal adicional\n- Preparar primer informe de rendimiento para headquarters\n\n**MES 6: CONSOLIDACIÓN Y PLANIFICACIÓN DE CRECIMIENTO**\n\n**Semana 1-2: Análisis profundo**\n- Realizar primera revisión exhaustiva de KPIs\n- Identificar obstáculos y oportunidades específicas por mercado\n- Optimizar estructura de costos basada en experiencia real\n- Finalizar contrataciones adicionales necesarias\n\n**Semana 3-4: Planificación de fase siguiente**\n- Desarrollar plan para los siguientes 6 meses\n- Preparar propuesta para asignación de recursos adicionales\n- Planificar actividades de marketing Q3-Q4\n- Comenzar preparativos para expansión a fase 2 (México/Colombia)\n\n**CONSIDERACIONES ESPECÍFICAS POR PAÍS**\n\n**Chile - Aspectos particulares**\n- Enfoque en cierre de año financiero (diciembre)\n- Consideración de período vacacional (enero-febrero)\n- Priorizar Santiago inicialmente, con plan para regiones en fase posterior\n\n**España - Aspectos particulares**\n- Adaptación a posible ralentización en agosto (período vacacional)\n- Consideración de diferencias regionales (si relevante para el negocio)\n- Plan específico para aprovechamiento de condición de miembro UE\n\n**FACTORES CRÍTICOS DE ÉXITO**\n\n1. **Contratación adecuada**: Los Country Managers son decisiones cruciales\n2. **Flexibilidad**: Preparación para ajustes rápidos según primeros aprendizajes\n3. **Comunicación**: Reuniones semanales entre equipos locales y central\n4. **Gestión de expectativas**: Alineación clara sobre objetivos realistas a 6 meses\n5. **Soporte central fuerte**: Disponibilidad de recursos centrales para apoyar\n\n**PLAN DE CONTINGENCIA**\n\nPreparar respuestas para posibles escenarios como:\n- Retrasos significativos en trámites legales\n- Dificultades en contratación de personal clave\n- Respuesta de mercado inferior a lo esperado\n- Necesidades de adaptación de producto mayores a las previstas\n\n¿Te gustaría que profundice en alguna fase específica o en los planes de contingencia?",
          sender: "ai",
          timestamp: "10:35 AM"
        },
        {
          id: "13",
          content: "Este cronograma es exactamente lo que necesitábamos. Has sido de gran ayuda para nuestra planificación estratégica. ¿Podrías resumir los puntos más críticos que debemos vigilar durante esta expansión para asegurar su éxito?",
          sender: "user",
          timestamp: "10:40 AM"
        },
        {
          id: "14",
          content: "**PUNTOS CRÍTICOS A VIGILAR DURANTE LA EXPANSIÓN INTERNACIONAL**\n\n**1. Selección y gestión del talento local**\n   - La calidad de tus Country Managers determinará en gran medida el éxito\n   - Busca perfiles con experiencia en startups/scaleups y conocimiento local\n   - Establece procesos de onboarding estructurados y acompañamiento continuo\n   - Clave: Balance entre autonomía local y alineación con visión global\n\n**2. Adaptación cultural efectiva**\n   - Más allá de traducción: entendimiento profundo de contextos culturales\n   - Presta atención a señales sutiles de desajuste cultural en la recepción\n   - Mantén ciclos cortos de feedback para ajustar rápidamente enfoque\n   - Clave: Escucha activa a equipos y clientes locales\n\n**3. Cumplimiento regulatorio riguroso**\n   - Errores legales/fiscales pueden ser costosos y dañar reputación\n   - Asegura asesoramiento legal experto, no economices aquí\n   - Mantén sistema de monitoreo de cambios regulatorios\n   - Clave: Documentación y diligencia impecables\n\n**4. Gestión de expectativas financieras**\n   - Las expansiones internacionales típicamente toman más tiempo/recursos de lo previsto\n   - Prepara modelos financieros con escenarios conservadores\n   - Reserva buffer de capital para imprevistos (recomendado: +25% sobre presupuesto)\n   - Clave: Comunicación clara con stakeholders sobre objetivos realistas\n\n**5. Coherencia en experiencia de cliente**\n   - Mantén estándares de calidad consistentes entre mercados\n   - Implementa sistemas de medición de satisfacción desde el día uno\n   - Desarrolla protocolos claros para manejo de incidentes/crisis\n   - Clave: Procesos para transferir buenas prácticas entre mercados\n\n**6. Velocidad de aprendizaje y adaptación**\n   - Establece ciclos rápidos de retroalimentación y ajuste\n   - Documenta sistemáticamente aprendizajes para expansiones futuras\n   - Promueve cultura de experimentación calculada y mejora continua\n   - Clave: Reuniones periódicas dedicadas específicamente a capturar lecciones\n\n**7. Escalabilidad tecnológica y operativa**\n   - Asegura que sistemas técnicos soporten operación multi-país\n   - Anticipa necesidades de localización técnica (idioma, moneda, normativas)\n   - Evalúa continuamente si procesos manuales iniciales requieren automatización\n   - Clave: Arquitectura técnica y operativa diseñada para expansión\n\n**8. Sinergias entre mercados**\n   - Busca activamente oportunidades de aprendizaje cruzado\n   - Identifica economías de escala potenciales\n   - Desarrolla comunidades de práctica entre equipos de diferentes países\n   - Clave: Mecanismos formales para compartir conocimiento\n\n**9. Equilibrio entre control central y autonomía local**\n   - Define claramente qué decisiones son locales vs. centrales\n   - Establece mecanismos de coordinación eficientes (no burocráticos)\n   - Revisa periódicamente este balance según evolución de mercados\n   - Clave: Estructura de gobierno clara y adaptativa\n\n**10. Salud y cohesión de equipos distribuidos**\n    - Implementa rituales de conexión entre equipos de diferentes países\n    - Atención a posibles silios por ubicación geográfica\n    - Invierte en tecnología de colaboración efectiva\n    - Clave: Cultura organizacional inclusiva para equipos remotos\n\n**SISTEMA DE ALERTAS TEMPRANAS RECOMENDADO**\n\nEstablece un dashboard con indicadores clave que señalen problemas potenciales:\n\n- **Ventas**: Ciclos de venta significativamente más largos que lo proyectado\n- **Marketing**: Costos de adquisición >30% sobre lo presupuestado\n- **Producto**: Tasas de adopción o retención por debajo de umbrales definidos\n- **Equipo**: Rotación temprana de personal clave\n- **Financiero**: Desviaciones de gastos >15% sobre presupuesto\n- **Regulatorio**: Cualquier notificación o incidencia con autoridades\n\nPrograma revisiones quincenales especiales durante los primeros 3 meses, luego mensuales, enfocadas exclusivamente en estos indicadores de alerta.\n\n**RECORDATORIO FINAL**\n\nLa expansión internacional exitosa generalmente resulta de un balance entre:\n\n- Ambición estratégica clara\n- Disciplina en ejecución\n- Humildad cultural\n- Agilidad para ajustar el rumbo\n\nManteniendo vigilancia especial sobre estos puntos críticos, maximizarás las probabilidades de éxito en esta emocionante fase de crecimiento internacional.",
          sender: "ai",
          timestamp: "10:52 AM"
        }
      ]
    }
  ];

  const handleSendMessage = () => {
    // Aquí iría la lógica para enviar el mensaje
    console.log("Enviando mensaje:", {
      content: message,
      model: selectedModel,
      agent: selectedAgent,
      company: selectedCompany,
    });
    setMessage("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file);
    }
  };

  // Función para obtener el nombre del modelo seleccionado
  const getSelectedModelName = () => {
    const model = llmModels.find(m => m.id === selectedModel);
    return model ? `${model.name}` : "Seleccionar modelo";
  };

  // Función para obtener el nombre del agente seleccionado
  const getSelectedAgentName = () => {
    const agent = agents.find(a => a.id === selectedAgent);
    return agent ? agent.name : "Seleccionar agente";
  };

  // Obtener la conversación activa
  const getCurrentChat = () => {
    return activeConversations.find(chat => chat.id === activeChat) || null;
  };

  const currentChat = getCurrentChat();

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden relative">
      {/* Capa de overlay para móvil cuando el sidebar está abierto */}
      {isMobile && showSidebarMobile && (
