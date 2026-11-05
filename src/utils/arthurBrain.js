import { IRREGULAR_VERBS } from '../data/irregularVerbs';
import { THEORY_DATA } from '../data/theoryData';
import { EXAM_QUESTIONS } from '../data/questions';
import { getEvolutionMetrics } from './storageHistory';

// Diccionario bilingüe amplio enfocado en IT, Programación e Inglés General
const TRANSLATION_DICTIONARY = [
  // --- ROLES & PUESTOS IT ---
  { en: "software developer", es: "desarrollador de software / programador", cat: "Sustantivo (Rol IT)", ex: "The software developer creates and tests code." },
  { en: "developer", es: "desarrollador / programador", cat: "Sustantivo", ex: "She is a talented React developer." },
  { en: "programmer", es: "programador / programadora", cat: "Sustantivo", ex: "Grace Hopper inspired generations of programmers." },
  { en: "ux designer", es: "diseñador de experiencia de usuario (UX)", cat: "Sustantivo (Rol IT)", ex: "A UX designer builds intuitive interfaces." },
  { en: "it support", es: "soporte técnico / soporte IT", cat: "Sustantivo (Rol IT)", ex: "IT support helps resolve network issues." },
  { en: "project manager", es: "gerente / líder de proyecto", cat: "Sustantivo (Rol IT)", ex: "The project manager coordinates daily standups." },
  { en: "web developer", es: "desarrollador web", cat: "Sustantivo (Rol IT)", ex: "A web developer maintains responsive sites." },
  { en: "systems analyst", es: "analista de sistemas", cat: "Sustantivo (Rol IT)", ex: "The systems analyst designs system architecture." },
  { en: "data analyst", es: "analista de datos", cat: "Sustantivo (Rol IT)", ex: "The data analyst processes SQL records." },
  { en: "network engineer", es: "ingeniero de redes", cat: "Sustantivo (Rol IT)", ex: "The network engineer configured the firewall." },

  // --- CONCEPTOS TÉCNICOS & CÓDIGO ---
  { en: "debug", es: "depurar / corregir errores en el código", cat: "Verbo / Sustantivo", ex: "To debug means to find and fix errors." },
  { en: "compile", es: "compilar (traducir a lenguaje máquina)", cat: "Verbo", ex: "The compiler translates source code into machine language." },
  { en: "compiler", es: "compilador", cat: "Sustantivo", ex: "Grace Hopper created one of the first compilers." },
  { en: "database", es: "base de datos", cat: "Sustantivo", ex: "We connected the backend to a PostgreSQL database." },
  { en: "server", es: "servidor", cat: "Sustantivo", ex: "The cloud server handled thousands of requests." },
  { en: "server farm", es: "granja de servidores / centro de datos", cat: "Sustantivo", ex: "There are two big servers in the server farm." },
  { en: "code", es: "código / programar", cat: "Sustantivo / Verbo", ex: "She wrote clean, modular code." },
  { en: "bug", es: "error / fallo de software", cat: "Sustantivo", ex: "They are fixing bugs at the moment." },
  { en: "feature", es: "funcionalidad / característica", cat: "Sustantivo", ex: "We deployed a new search feature." },
  { en: "asynchronous", es: "asíncrono (procesos independientes que no se bloquean)", cat: "Adjetivo", ex: "Margaret Hamilton designed asynchronous software." },
  { en: "synchronous", es: "síncrono (procesos secuenciales que esperan)", cat: "Adjetivo", ex: "Early software ran in synchronous order." },
  { en: "fail-safe", es: "a prueba de fallos / seguro ante desastres", cat: "Adjetivo / Sustantivo", ex: "A fail-safe mechanism stops systems safely." },
  { en: "overload", es: "sobrecarga / sobrecargar", cat: "Sustantivo / Verbo", ex: "The Apollo computer avoided radar overload." },
  { en: "array", es: "arreglo / vector / lista", cat: "Sustantivo", ex: "The array contains 50 items." },
  { en: "function", es: "función", cat: "Sustantivo", ex: "The print function displays information on screen." },
  { en: "variable", es: "variable", cat: "Sustantivo", ex: "Declare a constant variable." },
  { en: "loop", es: "bucle / ciclo", cat: "Sustantivo", ex: "An infinite loop was causing the lag." },
  { en: "query", es: "consulta / petición a base de datos", cat: "Sustantivo / Verbo", ex: "The SQL query returned fast results." },
  { en: "deploy", es: "desplegar / publicar en producción", cat: "Verbo", ex: "We deployed the web application to Vercel." },
  { en: "commit", es: "confirmación de cambios en Git", cat: "Sustantivo / Verbo", ex: "Make a git commit before pushing." },
  { en: "branch", es: "rama (en Git)", cat: "Sustantivo", ex: "Switch to the main branch." },
  { en: "interface", es: "interfaz", cat: "Sustantivo", ex: "She takes care of the user interface." },
  { en: "keyboard", es: "teclado", cat: "Sustantivo", ex: "He typed quickly on his mechanical keyboard." },
  { en: "screen", es: "pantalla", cat: "Sustantivo", ex: "The print function shows output on the screen." },
  { en: "file", es: "archivo", cat: "Sustantivo", ex: "Save the configuration file." },
  { en: "folder", es: "carpeta / directorio", cat: "Sustantivo", ex: "Open the project folder." },
  { en: "library", es: "biblioteca / librería de código", cat: "Sustantivo", ex: "React is a popular UI library." },
  { en: "framework", es: "marco de trabajo / framework", cat: "Sustantivo", ex: "Next.js is a fullstack React framework." },

  // --- NEGOCIOS & EVOLUCIÓN IT (CLASE 6) ---
  { en: "launch", es: "lanzar / estreno / fundar una empresa", cat: "Verbo / Sustantivo", ex: "Brin and Page launched Google in 1998." },
  { en: "raise money", es: "recaudar fondos / juntar dinero", cat: "Frase Verbal", ex: "They raised $1 million from investors." },
  { en: "step down", es: "renunciar / retirarse de un cargo de liderazgo", cat: "Phrasal Verb", ex: "The CEO stepped down from his daily role." },
  { en: "purchase", es: "comprar / adquirir", cat: "Verbo / Sustantivo", ex: "Google purchased YouTube for $1.65 billion." },
  { en: "restructure", es: "reestructurar / reorganizar", cat: "Verbo", ex: "The divisions were restructured under Alphabet." },
  { en: "headquarters", es: "sede central / oficina principal", cat: "Sustantivo", ex: "Google's headquarters are in Silicon Valley." },
  { en: "initial public offering", es: "oferta pública inicial (IPO / salida a bolsa)", cat: "Sustantivo", ex: "Google held its Initial Public Offering in 2004." },
  { en: "ipo", es: "oferta pública inicial en bolsa", cat: "Sustantivo", ex: "The IPO made the founders billionaires." },
  { en: "shareholder", es: "accionista", cat: "Sustantivo", ex: "They remain the largest individual shareholders." },
  { en: "investor", es: "inversor / inversionista", cat: "Sustantivo", ex: "The startup secured backing from angel investors." },
  { en: "billionaire", es: "multimillonario (poseedor de +1.000 millones)", cat: "Sustantivo", ex: "The success turned the founders into billionaires." },
  { en: "lack of", es: "falta de / carencia de", cat: "Frase", ex: "The product had a lack of clear purpose." },
  { en: "success", es: "éxito", cat: "Sustantivo", ex: "Python achieved worldwide success." },
  { en: "parent company", es: "empresa matriz / casa matriz", cat: "Sustantivo", ex: "Alphabet is Google's parent company." },
  { en: "healthcare", es: "cuidado de la salud / sector sanitario", cat: "Sustantivo", ex: "Google Glass was applied in healthcare." },

  // --- ADJETIVOS & VOCABULARIO GENERAL ---
  { en: "dull", es: "aburrido / monótono / apagado", cat: "Adjetivo", ex: "Old languages have duller interfaces than modern ones." },
  { en: "safe", es: "seguro / confiable", cat: "Adjetivo", ex: "She wrote reliable and safe software." },
  { en: "reliable", es: "confiable / estable", cat: "Adjetivo", ex: "The server is fast and reliable." },
  { en: "simplicity", es: "simplicidad / sencillez", cat: "Sustantivo", ex: "Python became popular due to its simplicity." },
  { en: "expensive", es: "costoso / caro", cat: "Adjetivo", ex: "The new cloud instances are too expensive." },
  { en: "cheap", es: "económico / barato", cat: "Adjetivo", ex: "Open source tools are cheap and accessible." },
  { en: "routine", es: "rutina", cat: "Sustantivo", ex: "He described his daily routine as a developer." },
  { en: "meeting", es: "reunión", cat: "Sustantivo", ex: "We have a daily standup meeting at 9 a.m." },
  { en: "task", es: "tarea / asignación", cat: "Sustantivo", ex: "Each task had a unique priority." },
  { en: "assign", es: "asignar / encomendar", cat: "Verbo", ex: "The lead assigned jobs to team members." },
  { en: "warn", es: "advertir / avisar de peligro", cat: "Verbo", ex: "The display warned astronauts of emergencies." },
  { en: "ensure", es: "asegurar / garantizar", cat: "Verbo", ex: "We ran unit tests to ensure high quality." },
  { en: "regardless", es: "a pesar de / sin importar", cat: "Adverbio", ex: "The task executes regardless of network latency." },
  // --- UNIDAD 3: DISPOSITIVOS & HARDWARE (CLASE 8) ---
  { en: "touchpad", es: "panel táctil (mouse integrado en laptop)", cat: "Sustantivo (Hardware)", ex: "You move your finger on the touchpad to control the cursor." },
  { en: "touchscreen", es: "pantalla táctil", cat: "Sustantivo (Hardware)", ex: "Modern tablets and smartphones have a responsive touchscreen." },
  { en: "pen drive", es: "memoria USB / pendrive", cat: "Sustantivo (Hardware)", ex: "A pen drive stores files and plugs into a USB port." },
  { en: "flash drive", es: "memoria USB / pendrive", cat: "Sustantivo (Hardware)", ex: "Copy the database backup to a secure flash drive." },
  { en: "headphones", es: "auriculares", cat: "Sustantivo (Hardware)", ex: "Put on your headphones for the client meeting." },
  { en: "speaker", es: "parlante / altavoz", cat: "Sustantivo (Hardware)", ex: "The speaker makes sound louder on a computer." },
  { en: "attachment", es: "archivo adjunto en un correo", cat: "Sustantivo (Internet)", ex: "Please find the technical resume in the email attachment." },
  { en: "streaming", es: "transmisión online en directo", cat: "Sustantivo (Internet)", ex: "Streaming video without downloading saves disk space." },
  { en: "plug in", es: "enchufar / conectar a la corriente", cat: "Phrasal Verb", ex: "When you plug in the device, connect it with a wire." },
  { en: "unplug", es: "desenchufar / desconectar del cable", cat: "Verbo", ex: "Unplug the server before opening the motherboard." },
  { en: "charge", es: "cargar la batería de un dispositivo", cat: "Verbo", ex: "Connect your phone to charge the battery." },
  { en: "upload", es: "subir / cargar archivos a la nube o internet", cat: "Verbo", ex: "Upload the project code to GitHub." },
  { en: "download", es: "descargar archivos desde la nube a tu equipo", cat: "Verbo", ex: "Download the latest Node.js runtime installer." },
  { en: "scroll", es: "desplazarse por la pantalla (arriba o abajo)", cat: "Verbo", ex: "Scroll down to read the full terms of service." },

  // --- UNIDAD 3: WEARABLES & CONCEPTOS IT (CLASES 8 Y 9) ---
  { en: "wearable", es: "dispositivo tecnológico que se viste como accesorio", cat: "Sustantivo / Adjetivo", ex: "A smartwatch is a popular wearable device." },
  { en: "concurrency", es: "concurrencia (ejecutar múltiples tareas a la vez)", cat: "Sustantivo Técnico", ex: "Go has built-in concurrency with goroutines." },
  { en: "tooling", es: "herramientas de desarrollo (compiladores, linters, debuggers)", cat: "Sustantivo Técnico", ex: "Java has a mature tooling ecosystem." },
  { en: "garbage collection", es: "recolección automática de memoria / basura", cat: "Sustantivo Técnico", ex: "Garbage collection prevents memory leaks." },
  { en: "forgiving", es: "tolerante / indulgente con errores de sintaxis", cat: "Adjetivo", ex: "Python is more forgiving than C." },
  { en: "unforgiving", es: "estricto / poco tolerante ante errores", cat: "Adjetivo", ex: "C has an unforgiving syntax with memory pointers." },

  // --- UNIDAD 3: REDACCIÓN DE CV & SELECCIÓN IT (CLASE 10) ---
  { en: "qualifications", es: "títulos, certificaciones y acreditaciones oficiales", cat: "Sustantivo", ex: "She listed her university qualifications on her resume." },
  { en: "work experience", es: "experiencia laboral práctica", cat: "Sustantivo", ex: "I have practical work experience in technical support." },
  { en: "skills", es: "habilidades técnicas o blandas", cat: "Sustantivo", ex: "My technical skills include Python, SQL, and Docker." },
  { en: "achievement", es: "logro profesional o académico", cat: "Sustantivo", ex: "Developing a web app was my greatest achievement." },
  { en: "responsibilities", es: "responsabilidades y obligaciones del puesto", cat: "Sustantivo", ex: "My responsibilities included database indexing." },
  { en: "degree", es: "título universitario o terciario", cat: "Sustantivo", ex: "She is studying for a technical degree in software development." },
  { en: "internship", es: "pasantía profesional para estudiantes", cat: "Sustantivo", ex: "I am applying for a junior developer internship." },
  { en: "deadline", es: "fecha límite de entrega de un proyecto o sprint", cat: "Sustantivo", ex: "We worked overtime to meet the project deadline." },
  { en: "troubleshooting", es: "diagnóstico y resolución metódica de fallos", cat: "Sustantivo", ex: "Troubleshooting network bugs requires patience." },
  { en: "programming languages", es: "lenguajes de programación", cat: "Sustantivo", ex: "Python, C, and Java are programming languages." },

  // --- UNIDAD 3: NUEVOS DISPOSITIVOS & HARDWARE IA (CLASES 12 Y 13) ---
  { en: "prototype", es: "prototipo (primera versión de prueba)", cat: "Sustantivo", ex: "The screenless AI device is currently a prototype." },
  { en: "portable", es: "portátil (fácil de transportar)", cat: "Adjetivo", ex: "Laptops and smart glasses are portable gadgets." },
  { en: "hardware", es: "componentes físicos de un equipo", cat: "Sustantivo", ex: "OpenAI is now designing dedicated AI hardware." },
  { en: "microphone", es: "micrófono", cat: "Sustantivo", ex: "The device uses a sensitive microphone to hear voice commands." },
  { en: "smart glasses", es: "anteojos / gafas inteligentes con IA", cat: "Sustantivo", ex: "Ray-Ban Meta smart glasses record video hands-free." },
  { en: "down the road", es: "en el futuro / a futuro", cat: "Modismo / Idiom", ex: "More tech companies will release AI wearables down the road." },
  { en: "instead of", es: "en lugar de / en vez de", cat: "Preposición", ex: "We use voice commands instead of typing on a screen." },

];

export function getArthurResponse(userInput) {
  const rawText = userInput.trim();
  const text = rawText.toLowerCase();
  
  if (!text) {
    return {
      text: "¡Hola! Soy Arthur, tu tutor de inglés técnico en EnglishLab. Conozco todos los contenidos del 1er Parcial y del nuevo **2do Parcial (Unidad 3 · Clases 8 a 14)**. ¿En qué te gustaría profundizar hoy?",
      suggestedQuestions: [
        "¿Qué temas entran en el 2do Parcial?",
        "¿Cómo se usan los Cuantificadores (much, many, few)?",
        "Diferencia entre Will y Going To",
        "¿Cómo funciona el Present Perfect (been vs gone)?",
        "Consejos para una entrevista IT (DOs and DON'Ts)"
      ]
    };
  }

  // 1. SALUDOS / IDENTIDAD
  if (/^(hola|buenas|hey|hi|hello|buenos d[ií]as|buenas tardes|buenas noches)/i.test(text)) {
    return {
      text: "¡Un gusto saludarte! Soy **Arthur**, tu asistente y tutor de inglés para la carrera de Programación (UTN). Conozco a la perfección todos los temas del 1er Parcial (Unidades 1 y 2) y del **2do Parcial (Unidad 3 · Clases 8 a 14)**: Cuantificadores, Comparativos, Present Perfect, Futuro, Conectores, Adverbios, CV IT y Entrevistas Laborales. ¡Pregúntame lo que necesites!",
      suggestedQuestions: [
        "¿Cuáles son los temas del 2do Parcial?",
        "¿Cuándo se usa 'been' o 'gone' en Present Perfect?",
        "Diferencia entre Will y Be Going To",
        "Traducir 'troubleshooting' o 'internship'"
      ]
    };
  }

  if (/(qui[eé]n eres|tu nombre|qui[eé]n sos|presentate|arthur)/i.test(text) && !text.includes("margaret")) {
    return {
      text: "Soy **Arthur**, tu tutor virtual de inglés técnico en **EnglishLab**. Mi misión es ayudarte a promocionar el parcial de inglés de la UTN TUP explicándote cualquier regla gramatical, traduciendo términos de programación y analizando tus métricas de resolución para asegurar tu mejor nota. 🎩✨",
      suggestedQuestions: [
        "Analiza mis métricas de examen",
        "Traducir palabras de IT",
        "¿Cómo se forman las preguntas en Pasado Simple?",
        "Dame un ejercicio de examen"
      ]
    };
  }

  // 2. CONSULTA DE MÉTRICAS & SCORING HISTÓRICO
  if (/(m[eé]tricas|scoring|progreso|rendimiento|estad[ií]sticas|historial|c[oó]mo voy|cu[aá]nto saqu[eé]|mis notas|mis resultados)/i.test(text)) {
    const metrics = getEvolutionMetrics();
    
    if (!metrics.hasData) {
      return {
        text: `🎩 **Análisis de Métricas y Scoring:**\n\n` +
              `Aún no tienes simulacros guardados en este navegador. \n\n` +
              `💡 **Consejo:** Realiza tu primer intento en la pestaña **"Práctica de Examen"**. Apenas termines, registraré tu calificación, tiempo de resolución por pregunta y desglose por temas para darte métricas de evolución.`,
        suggestedQuestions: [
          "Ir a Práctica de Examen",
          "Dame un ejercicio rápido ahora",
          "Repasar Presente Simple vs Continuo"
        ]
      };
    }

    const trendText = metrics.improvementPct > 0 
      ? `📈 **Tendencia de Evolución:** ¡Has mejorado un **+${metrics.improvementPct}%** desde tu primer intento!`
      : metrics.improvementPct < 0
      ? `📊 **Tendencia:** Tuviste una ligera variación de **${metrics.improvementPct}%**. ¡Sigue practicando para estabilizar la nota alta!`
      : `🎯 **Tendencia:** Rendimiento constante en tus simulacros.`;

    const statusRecommendation = Number(metrics.avgScore) >= 8
      ? `🌟 *Estado Actual:* Nivel de **Promoción Directa (≥ 8/10)**. ¡Excelente dominio técnico!`
      : Number(metrics.avgScore) >= 6
      ? `✅ *Estado Actual:* Nivel de **Aprobado**. Refuerza los verbos irregulares para alcanzar la promoción.`
      : `⚠️ *Estado Actual:* Nivel **A Recuperar**. Te sugiero repasar las tarjetas de gramática antes de tu próximo simulacro.`;

    return {
      text: `🎩 **Tus Métricas de Rendimiento & Scoring:**\n\n` +
            `• 📝 **Simulacros Completados:** \`${metrics.totalExams}\`\n` +
            `• 🎯 **Calificación Promedio:** \`${metrics.avgScore} / 10\`\n` +
            `• 🏆 **Mejor Calificación (Récord):** \`${metrics.bestScore} / 10\`\n` +
            `• ⚡ **Velocidad de Resolución Promedio:** \`${metrics.avgSpeed} segundos / pregunta\`\n\n` +
            `${trendText}\n\n` +
            `${statusRecommendation}`,
      suggestedQuestions: [
        "Dame un ejercicio de práctica",
        "Traducir un término IT",
        "Verbos de estado (Stative Verbs)"
      ]
    };
  }

  // 3. MÓDULO DE TRADUCCIÓN DE PALABRAS Y TÉRMINOS (ESPAÑOL <-> INGLÉS)
  const isTranslationIntent = 
    /(?:traduce|traducir|traducci[oó]n|c[oó]mo se dice|c[oó]mo traduzco|qu[eé] significa|meaning of|translate|what does .* mean)/i.test(text);

  let wordToSearch = '';

  if (isTranslationIntent) {
    wordToSearch = text
      .replace(/(?:por favor|arthur|puedes|podr[ií]as|me ayudas a)/gi, '')
      .replace(/(?:traduce|traducir|traducci[oó]n de|c[oó]mo se dice|c[oó]mo traduzco|qu[eé] significa|meaning of|translate|what does|mean|en ingl[eé]s|en espa[nñ]ol|al ingl[eé]s|al espa[nñ]ol)/gi, '')
      .replace(/["'¿?¡!:]/g, '')
      .trim();
  }

  const searchCandidate = wordToSearch || (text.split(' ').length <= 3 ? text.replace(/["'¿?¡!:]/g, '').trim() : '');

  if (searchCandidate) {
    const dictMatch = TRANSLATION_DICTIONARY.find(item => 
      item.en.toLowerCase() === searchCandidate ||
      item.es.toLowerCase().includes(searchCandidate) ||
      searchCandidate.includes(item.en.toLowerCase())
    );

    if (dictMatch) {
      return {
        text: `🎩 **Traducción de Término IT:**\n\n` +
              `🇬🇧 **Inglés:** \`${dictMatch.en}\`\n` +
              `🇪🇸 **Español:** **${dictMatch.es}**\n` +
              `📌 **Categoría:** *${dictMatch.cat}*\n\n` +
              `💻 **Ejemplo de uso:**\n` +
              `*"${dictMatch.ex}"*`,
        suggestedQuestions: [
          `¿Cómo uso '${dictMatch.en}' en una oración?`,
          "Dame otro término relacionado",
          "Dame un ejercicio de vocabulario"
        ]
      };
    }

    const verbMatch = IRREGULAR_VERBS.find(v => 
      v.base.toLowerCase() === searchCandidate ||
      v.past.toLowerCase().includes(searchCandidate) ||
      v.translation.toLowerCase().includes(searchCandidate)
    );

    if (verbMatch) {
      return {
        text: `🎩 **Traducción de Verbo: ${verbMatch.base.toUpperCase()}**\n\n` +
              `• **Infinitivo (Forma Base):** \`${verbMatch.base}\`\n` +
              `• **Pasado Simple:** \`${verbMatch.past}\`\n` +
              `• **Participio Pasado:** \`${verbMatch.participle}\`\n` +
              `• **Traducción al Español:** **${verbMatch.translation}**\n\n` +
              `💻 **Ejemplo en programación:**\n` +
              `*"${verbMatch.example}"*`,
        suggestedQuestions: [
          `¿Cómo formulo una pregunta con '${verbMatch.base}'?`,
          "¿Cuál es la regla de 'didn't'?",
          "Dame otro verbo irregular"
        ]
      };
    }
  }

  // 4. CONSULTAS ESPECÍFICAS DE VERBOS IRREGULARES
  const verbQueryMatch = text.match(/(?:pasado|past|conjugaci[oó]n|forma)\s*(?:de|del|of)?\s*([a-zA-Z]+)/i) ||
                         text.match(/([a-zA-Z]+)\s*(?:en pasado|in past)/i);
  
  if (verbQueryMatch && verbQueryMatch[1]) {
    const candidate = verbQueryMatch[1].toLowerCase();
    const foundVerb = IRREGULAR_VERBS.find(v => v.base.toLowerCase() === candidate || v.past.toLowerCase().includes(candidate));
    if (foundVerb) {
      return {
        text: `🎩 **Verbo Irregular: ${foundVerb.base.toUpperCase()}**\n\n` +
              `• **Infinitivo / Forma Base:** \`${foundVerb.base}\`\n` +
              `• **Pasado Simple:** \`${foundVerb.past}\`\n` +
              `• **Participio Pasado:** \`${foundVerb.participle}\`\n` +
              `• **Traducción:** **${foundVerb.translation}**\n\n` +
              `💻 **Ejemplo en contexto IT:**\n` +
              `*"${foundVerb.example}"*`,
        suggestedQuestions: [
          `¿Cómo sería en negativo con '${foundVerb.base}'?`,
          "¿Cuál es la regla de 'didn't'?",
          "Dame otro verbo irregular de programación"
        ]
      };
    }
  }

  // 5. CONTRASTE: SIMPLE PRESENT VS PRESENT CONTINUOUS
  if (/(diferencia|vs|versus|cuando usar|cu[aá]ndo uso|comparaci[oó]n|diferencias).*(presente|simple|continuo|continuous)/i.test(text) ||
      /(simple vs continuo|present simple vs present continuous)/i.test(text)) {
    return {
      text: `🎩 **Present Simple vs. Present Continuous: Regla de Oro**\n\n` +
            `1. **Present Simple (Rutinas y Hechos):**\n` +
            `   • Usado para hábitos diarios, especificaciones y cosas permanentes.\n` +
            `   • *Palabras clave:* \`always\`, \`usually\`, \`often\`, \`every day\`, \`on Mondays\`.\n` +
            `   • *Ejemplo:* *"I go to the office practically every day..."*\n\n` +
            `2. **Present Continuous (Acción en progreso / Temporal):**\n` +
            `   • Usado para lo que pasa ahora mismo o una excepción a la rutina.\n` +
            `   • *Estructura:* \`am / is / are + verbo-ING\`.\n` +
            `   • *Palabras clave:* \`now\`, \`right now\`, \`at the moment\`, \`today\`, \`this week\`.\n` +
            `   • *Ejemplo:* *"...but today I am working from home."*`,
      suggestedQuestions: [
        "¿Cuáles son los verbos de estado (Stative Verbs)?",
        "¿Cuáles son las reglas de ortografía de -ING?",
        "Ponme un ejercicio de contraste"
      ]
    };
  }

  // 6. VERBOS DE ESTADO (STATIVE VERBS)
  if (/(stative|verbos de estado|no llevan ing|sin ing|know|understand|need|want)/i.test(text)) {
    return {
      text: `🎩 **Verbos de Estado (Stative Verbs)**\n\n` +
            `Son verbos que expresan pensamientos, emociones o posesiones y **NO se usan comúnmente con -ING**, incluso si ocurren en este momento:\n\n` +
            `• **Pensamiento/Conocimiento:** \`know\`, \`understand\`, \`believe\`, \`remember\`.\n` +
            `• **Necesidad/Deseo:** \`need\`, \`want\`, \`like\`, \`love\`, \`prefer\`.\n` +
            `• **Posesión:** \`have\` (poseer), \`belong\`.\n\n` +
            `⚠️ **En el examen:**\n` +
            `✅ Correcto: *"As a front-end developer, I need to take care of the UI."*\n` +
            `❌ Incorrecto: *"I am needing..."*`,
      suggestedQuestions: [
        "¿Cómo funciona la 3ra persona en Presente Simple?",
        "Dame un ejercicio de Stative Verbs",
        "Estructura de preguntas en Presente Continuo"
      ]
    };
  }

  // 7. REGLAS DE 3RA PERSONA (-s, -es, -ies) EN PRESENTE SIMPLE
  if (/(3ra persona|tercera persona|he she it|reglas de s|cuando lleva s|-es|-ies|terminaci[oó]n s)/i.test(text)) {
    return {
      text: `🎩 **Reglas de Ortografía para 3ra Persona Singular (He / She / It):**\n\n` +
            `1. **Regla general:** Añadir \`-s\` (ej: \`work -> works\`, \`code -> codes\`, \`need -> needs\`).\n` +
            `2. **Terminados en -ch, -sh, -ss, -x, -z, -o:** Añadir \`-es\` (ej: \`watch -> watches\`, \`fix -> fixes\`, \`go -> goes\`).\n` +
            `3. **Consonante + 'y':** Cambiar la 'y' por \`-ies\` (ej: \`study -> studies\`, \`modify -> modifies\`).\n` +
            `4. **Vocal + 'y':** Solo añadir \`-s\` (ej: \`play -> plays\`, \`deploy -> deploys\`).\n\n` +
            `⚠️ *¡Ojo!* En oraciones **negativas** e **interrogativas**, el verbo vuelve a su forma base porque la 's' ya la tiene el auxiliar (\`doesn't\` o \`does\`).`,
      suggestedQuestions: [
        "¿Cómo se forma la negación con 'doesn't'?",
        "¿Cuáles son los adverbios de frecuencia?",
        "Dame un ejercicio de 3ra persona"
      ]
    };
  }

  // 8. NEGACIÓN Y PREGUNTAS EN PASADO SIMPLE (DID / DIDN'T)
  if (/(didn't|did not|preguntas en pasado|did|negativo en pasado|c[oó]mo negar en pasado)/i.test(text)) {
    return {
      text: `🎩 **Estructura Negativa e Interrogativa en Pasado Simple**\n\n` +
            `• **Negativo:** \`Sujeto + didn't + Verbo en FORMA BASE\`\n` +
            `  *Regla crucial:* Como \`didn't\` ya marca el pasado, el verbo principal NO lleva -ed ni forma irregular.\n` +
            `  ✅ *"She didn't write the documentation yesterday."*\n` +
            `  ❌ *"She didn't wrote..." (¡ERROR común en parciales!)*\n\n` +
            `• **Preguntas:** \`(Wh-) + Did + Sujeto + Verbo en FORMA BASE + ?\`\n` +
            `  ✅ *"Where did Sergey Brin meet Larry Page?"*\n` +
            `  • *Respuesta corta:* \`Yes, he did.\` / \`No, he didn't.\``,
      suggestedQuestions: [
        "¿Cuáles son las reglas de los verbos regulares -ed?",
        "¿Cómo fue la historia de Google y Sergey Brin?",
        "Dame un ejercicio de didn't"
      ]
    };
  }

  // 9. LECTURAS Y PERSONAJES IT: MARGARET HAMILTON (APOLLO 11)
  if (/(margaret hamilton|apollo|apollo 11|luna|moon|nasa|mit|asynchronous|as[ií]ncrono)/i.test(text)) {
    return {
      text: `🎩 **Margaret Hamilton & Apollo 11 (Clase 5):**\n\n` +
            `• **¿Quién fue?** Directora de software del MIT para el programa espacial Apollo de la NASA. Ella **acuñó el término 'software engineering'**.\n` +
            `• **El hito de programación:** Creó un sistema de software **asíncrono** (*asynchronous*) con pantallas de prioridad (*priority displays*).\n` +
            `• **El alunizaje:** Durante el descenso del Apollo 11 en 1969, el radar sobrecargó la computadora; gracias al diseño de Margaret, el software descartó tareas secundarias y priorizó la navegación, evitando el aborto de la misión.\n` +
            `• **Reconocimiento:** En 2016, el presidente Barack Obama le otorgó la *Presidential Medal of Freedom*.`,
      suggestedQuestions: [
        "¿Quién fue Grace Hopper?",
        "¿Qué significa 'fail safe' o 'overload'?",
        "Dame una pregunta sobre Margaret Hamilton"
      ]
    };
  }

  // 10. GENERADOR DE EJERCICIO / RETO INTERACTIVO
  if (/(ejercicio|practicar|prueba|test|pregunta|retame|evaluame|quiz|examen)/i.test(text)) {
    const randomQ = EXAM_QUESTIONS[Math.floor(Math.random() * EXAM_QUESTIONS.length)];
    const optionsText = randomQ.options.map(o => `   **${o.id.toUpperCase()})** ${o.text}`).join('\n');

    return {
      text: `🎩 **¡Desafío Rápido de Examen!**\n\n` +
            `📌 *Tema: ${randomQ.topic}*\n` +
            `**${randomQ.question}**\n\n` +
            `${optionsText}\n\n` +
            `💡 *Pista:* Respóndeme con la letra que consideres correcta (A, B, C o D) o pide la solución.`,
      suggestedQuestions: [
        "¿Cuál es la respuesta correcta?",
        "Dame otro ejercicio",
        "¿Cómo van mis métricas y scoring?"
      ]
    };
  }

  
  // ==========================================
  // INTENCIONES DEL SEGUNDO PARCIAL (UNIDAD 3)
  // ==========================================

  // A. TEMAS GENERALES DEL 2DO PARCIAL / UNIDAD 3
  if (/(segundo parcial|2do parcial|unidad 3|unidad iii|qu[eé] entra en el segundo|temas del parcial|programa segundo parcial)/i.test(text)) {
    return {
      text: `🎩 **Temas Oficiales del 2do Parcial (Unidad 3 · Clases 8 a 14):**\n\n` +
            `• ⚖️ **Clase 8:** Cuantificadores (\`much, many, little, few, some, any, a lot of\`), partes de la computadora, internet, verbos IT y lectura de *Wearable Technologies* (*iTBra, Heartguide, SmartSleep*).\n` +
            `• 🚀 **Clase 9:** Comparativos y Superlativos (\`-er, more than, the -est, the most\`), adjetivos irregulares (\`good->better->best\`), lecturas de *Python vs C* y *Java vs Go* (\`concurrency, tooling, garbage collection\`).\n` +
            `• 🎯 **Clase 10:** *Present Perfect Tense* (\`have/has + past participle\`), marcadores (\`since, for, ever, never, just, already, yet\`), \`have been\` vs \`have gone\`, redacción de CV para IT (\`qualifications, degree, internship, deadline, troubleshooting\`) y CV de Martina López.\n` +
            `• 🔮 **Clase 12:** Futuro con \`Will\` vs \`Be Going To\` (predicciones y decisiones), 10 *DOs & DON'Ts* en entrevistas IT y reporte de *AI Smart Glasses*.\n` +
            `• 🔗 **Clase 13:** Conectores Básicos (\`And, But, Or, So, Because\`), paralelismo sintáctico y lectura del nuevo dispositivo de hardware AI de OpenAI.\n` +
            `• ⚡ **Clase 14:** Adverbios de modo (*Adverbs of manner*: \`carefully, quickly, well\`), adjetivos en \`-ly\` que NO son adverbios (\`friendly, lovely, silly\`) y Repaso Integral de Todos los Tiempos Verbales.`,
      suggestedQuestions: [
        "¿Cómo se usan los Cuantificadores?",
        "Diferencia entre Will y Going To",
        "Reglas de Present Perfect (been vs gone)",
        "¿Cuáles son los 5 DOs de una entrevista IT?"
      ]
    };
  }

  // B. CUANTIFICADORES (QUANTIFIERS - CLASE 8)
  if (/(cuantificador|cuantificadores|quantifier|quantifiers|much vs many|few vs little|some vs any|too much|too many|a lot of)/i.test(text)) {
    return {
      text: `🎩 **Reglas de Cuantificadores (Quantifiers - Clase 8):**\n\n` +
            `1. **Much vs. Many:**\n` +
            `   • \`Many\` + Contables plurales (\`many servers, many bugs\`) en (-) y (?).\n` +
            `   • \`Much\` + Incontables (\`much RAM, much data\`) en (-) y (?).\n` +
            `   • *Con 'Too':* SÍ se usan en afirmativas (\`too much latency\`, \`too many open tabs\`).\n\n` +
            `2. **A lot of / Lots of:**\n` +
            `   • Se usan en afirmativas con contables e incontables. Al final de la oración va SIN 'of' (*I coded a lot*).\n\n` +
            `3. **Few / A few  vs.  Little / A little:**\n` +
            `   • **CON 'A' (Sentido Positivo, suficientes):** \`a few\` (contables) / \`a little\` (incontables).\n` +
            `   • **SIN 'A' (Sentido Negativo, casi nada/nadie):** \`few\` (contables) / \`little\` (incontables).\n\n` +
            `4. **Some vs. Any:**\n` +
            `   • \`Some\` en afirmativas y en **pedidos/ofrecimientos** amables (*Would you like some help?*).\n` +
            `   • \`Any\` en oraciones negativas (*don't have any bugs*) y preguntas comunes.`,
      suggestedQuestions: [
        "Dame un ejercicio de cuantificadores",
        "¿Cuáles son los dispositivos de la Clase 8?",
        "¿Qué es el iTBra o Heartguide?"
      ]
    };
  }

  // C. COMPARATIVOS Y SUPERLATIVOS (CLASE 9)
  if (/(comparativo|superlativo|comparative|superlative|easier|faster|more readable|the best|python vs c|java vs go)/i.test(text)) {
    return {
      text: `🎩 **Comparativos y Superlativos (Clase 9):**\n\n` +
            `• **Comparativo (2 entidades):**\n` +
            `  - Cortos (1 sílaba): \`Adjetivo-er + than\` (*faster than, easier than*).\n` +
            `  - Largos (2+ sílabas): \`more + Adjetivo + than\` (*more readable than, more powerful than*).\n` +
            `  - Irregulares: \`good -> better than\`, \`bad -> worse than\`.\n` +
            `  - Estructura: \`(not) as + adj + as\` (*C is not as forgiving as Python*).\n\n` +
            `• **Superlativo (3 o más entidades):**\n` +
            `  - Cortos: \`the + Adjetivo-est\` (*the fastest, the smartest*).\n` +
            `  - Largos: \`the most + Adjetivo\` (*the most common language in the world*).\n` +
            `  - Irregulares: \`the best\`, \`the worst\`.\n\n` +
            `• **En IT:** *Python* es interpretado y más fácil de aprender; *C* es compilado, de bajo nivel y super veloz; *Go* destaca por concurrencia nativa (\`goroutines\`) y *Java* por su madurez empresarial y portabilidad sobre la JVM.`,
      suggestedQuestions: [
        "¿Qué significa concurrency y tooling?",
        "Dame un ejercicio de comparativos",
        "¿Por qué C es 'less forgiving'?"
      ]
    };
  }

  // D. PRESENT PERFECT (CLASE 10)
  if (/(present perfect|presente perfecto|been vs gone|have been|have gone|since.*for|ever.*never|just.*already.*yet)/i.test(text)) {
    return {
      text: `🎩 **Present Perfect Tense (Clase 10):**\n\n` +
            `• **Fórmula:** \`Sujeto + HAVE / HAS + Pasado Participio (V3 / -ed)\`\n\n` +
            `• **Los 4 Usos Principales:**\n` +
            `  1. Acciones que empezaron en el pasado y siguen hoy (\`since\` = desde cuándo, \`for\` = duración).\n` +
            `  2. Experiencias de vida (*Have you ever...? / I have never...*).\n` +
            `  3. Acción pasada con resultado importante en el presente (*I've lost my keys*).\n` +
            `  4. Hechos recientes con marcadores (\`just\` = recién, \`already\` = ya, \`yet\` = aún no / ya).\n\n` +
            `• **Diferencia Vital: 'Been' vs. 'Gone':**\n` +
            `  - \`Have been\`: Fue a un lugar Y YA REGRESÓ (*I've been to the server room*).\n` +
            `  - \`Have gone\`: Fue a un lugar Y TODAVÍA NO VOLVIÓ (*She has gone to San Francisco*).\n\n` +
            `⚠️ **¡Error prohibido en el examen!:** NUNCA uses Present Perfect con tiempo cerrado pasado (*yesterday, in 2017, last week*). Con esos marcadores se usa OBLIGATORIAMENTE **Past Simple**.`,
      suggestedQuestions: [
        "¿Cuándo se usa Past Simple en vez de Present Perfect?",
        "¿Cómo se redacta un CV para IT?",
        "Dame un ejercicio de Present Perfect"
      ]
    };
  }

  // E. FUTURO: WILL VS BE GOING TO (CLASE 12)
  if (/(will vs going to|will vs be going to|futuro en ingl[eé]s|cu[aá]ndo uso will|cu[aá]ndo uso going to)/i.test(text)) {
    return {
      text: `🎩 **Futuro: Will vs. Be Going To (Clase 12):**\n\n` +
            `1. **En Predicciones:**\n` +
            `   • \`WILL\`: Predicciones basadas en lo que uno CREE u opina (*I think AI will help every developer*).\n` +
            `   • \`BE GOING TO\`: Predicciones con **evidencia visual presente** (*Look at the CPU at 100%! The server is going to crash!*).\n\n` +
            `2. **En Decisiones:**\n` +
            `   • \`WILL\`: Decisiones **espontáneas / instantáneas** en el momento de hablar (*Oh, no sugar? I'll buy some now*).\n` +
            `   • \`BE GOING TO\`: Decisiones **ya tomadas / planes previos** antes de la charla (*I'm going to look for an IT internship this summer*).\n\n` +
            `3. **Ofertas y Promesas:** Se utiliza \`will\` (*I'll help you with that error, I promise*).`,
      suggestedQuestions: [
        "¿Cuáles son los 5 DOs y DON'Ts para entrevistas?",
        "¿Qué son las AI Smart Glasses?",
        "Dame un ejercicio de Will vs Going to"
      ]
    };
  }

  // F. ENTREVISTAS IT & DOs / DON'Ts (CLASE 12 & CLASE 10)
  if (/(entrevista|job interview|dos and donts|consejos de entrevista|writing a cv|cv it|curriculum)/i.test(text)) {
    return {
      text: `🎩 **Guía Oficial para Entrevistas IT & CV (Clases 10 y 12):**\n\n` +
            `• **Los 5 DOs:**\n` +
            `  1. *Do your research:* Investiga sobre la empresa y sus tecnologías.\n` +
            `  2. *Do talk about your skills:* Detalla tu experiencia con Python, SQL, Git, etc.\n` +
            `  3. *Do mention your achievements:* Comparte proyectos universitarios o personales.\n` +
            `  4. *Do prepare answers:* Practica fortalezas, debilidades y objetivos.\n` +
            `  5. *Do ask questions:* Pregunta sobre el equipo y el crecimiento profesional.\n\n` +
            `• **Los 5 DON'Ts:**\n` +
            `  6. *Don't arrive late:* Conéctate unos minutos antes.\n` +
            `  7. *Don't lie:* Si no sabes un lenguaje, sé honesto y muestra ganas de aprender.\n` +
            `  8. *Don't speak negatively:* No hables mal de compañeros o jefes anteriores.\n` +
            `  9. *Don't give very short answers:* Explica tu rol, herramientas y resultados.\n` +
            `  10. *Don't forget body language:* Mantén una postura atenta y profesional.\n\n` +
            `• **Palabras clave en el CV:** \`qualifications\` (títulos), \`degree\` (carrera), \`internship\` (pasantía), \`deadline\` (fecha límite), \`troubleshooting\` (resolución de fallos).`,
      suggestedQuestions: [
        "¿Cómo responder sobre una debilidad en una entrevista?",
        "¿Qué verbos de acción van en el CV?",
        "Dame una pregunta sobre DOs and DON'Ts"
      ]
    };
  }

  // G. CONECTORES BÁSICOS (CLASE 13)
  if (/(conector|conectores|connectors|and but or so because|basic connectors)/i.test(text)) {
    return {
      text: `🎩 **Conectores Básicos (Basic Connectors - Clase 13):**\n\n` +
            `• \`AND\` (Y): Para añadir información similar (*too / in addition*). Se omite el sujeto repetido y requiere paralelismo (*coding and designing*).\n` +
            `• \`BUT\` (Pero): Para contrastar información opuesta (*I studied a lot, but I failed*).\n` +
            `• \`OR\` (O): Para opciones y alternativas. ¡Ojo!: En oraciones **negativas** se usa OR para decir 'ni una cosa ni la otra' (*I don't know Java or C*).\n` +
            `• \`SO\` (Por lo tanto / Así que): Introduce la **consecuencia o resultado** (*The query was slow, so we created an index*).\n` +
            `• \`BECAUSE\` (Porque): Introduce la **razón o motivo** (*We created an index because the query was slow*).`,
      suggestedQuestions: [
        "¿Qué es el nuevo dispositivo de OpenAI?",
        "Dame un ejercicio de conectores",
        "Regla de paralelismo con 'and'"
      ]
    };
  }

  // H. ADVERBIOS DE MODO & REPASO INTEGRAL (CLASE 14)
  if (/(adverbio|adverbios|adverbs of manner|adjetivos en ly|friendly|posici[oó]n de los adverbios|repaso de tiempos)/i.test(text)) {
    return {
      text: `🎩 **Adverbios de Modo & Adjetivos (Clase 14):**\n\n` +
            `1. **Uso:** Describen al **verbo** (cómo se hace algo). Los adjetivos describen al sustantivo.\n` +
            `   • *Robert is a good programmer.* (Adjetivo)\n` +
            `   • *Robert programs well.* (Adverbio de modo)\n\n` +
            `2. **Posición:** Se ubican después del verbo o después de verbo + objeto (*She plays the guitar well*). **NUNCA entre el verbo y el objeto**.\n\n` +
            `3. **¡Trampa de Examen! Adjetivos terminados en -ly:**\n` +
            `   Palabras como \`friendly\` (amistoso), \`lovely\` (encantador) y \`silly\` (tonto) son **ADJETIVOS**, NO adverbios. No se transforman en adverbios de modo.`,
      suggestedQuestions: [
        "¿Cuáles son los 6 tiempos verbales del examen?",
        "Dame un ejercicio de adverbios de modo",
        "Simular examen del 2do parcial"
      ]
    };
  }

  // 11. DEFAULT / FALLBACK INTELIGENTE
  return {
    text: `Entiendo tu consulta sobre **"${userInput}"**. Como tu tutor de Inglés Técnico I, puedo ayudarte con:\n\n` +
          `1. 📊 **Tus Métricas & Scoring:** Pregúntame *"¿Cómo van mis métricas?"* para analizar tu promedio y velocidad.\n` +
          `2. 🌐 **Traducción de palabras:** Pregúntame *"traduce developer"*, *"qué significa step down"*, etc.\n` +
          `3. ⚡ **Presente Simple vs Continuo:** Cuándo usar cada uno, reglas de 3ra persona y verbos de estado.\n` +
          `4. 📜 **Pasado Simple:** Verbos irregulares (\`found, sold, met, bought\`) e historias de Margaret Hamilton y Google.\n\n` +
          `¿Qué te gustaría consultar?`,
    suggestedQuestions: [
      "¿Cómo van mis métricas y scoring?",
      "Traducir 'database' o 'debug'",
      "¿Cómo sé cuándo usar Present Simple o Continuous?",
      "Dame un ejercicio de práctica"
    ]
  };
}
