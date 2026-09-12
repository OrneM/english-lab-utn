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
];

export function getArthurResponse(userInput) {
  const rawText = userInput.trim();
  const text = rawText.toLowerCase();
  
  if (!text) {
    return {
      text: "¡Hola! Soy Arthur, tu tutor de inglés técnico. ¿En qué tema de las Clases 1 a 6 te gustaría profundizar hoy?",
      suggestedQuestions: [
        "¿Cómo van mis métricas y scoring?",
        "¿Cómo sé cuándo usar Present Simple o Continuous?",
        "¿Cuál es el pasado del verbo 'meet'?",
        "Traducir 'software developer' o 'debug'"
      ]
    };
  }

  // 1. SALUDOS / IDENTIDAD
  if (/^(hola|buenas|hey|hi|hello|buenos d[ií]as|buenas tardes|buenas noches)/i.test(text)) {
    return {
      text: "¡Un gusto saludarte! Soy **Arthur**, tu asistente y tutor de inglés para la carrera de Programación (UTN). Conozco a la perfección todos los temas de las unidades 1 y 2. Puedes preguntarme sobre gramática, pedirme traducciones, consultar tus **métricas de rendimiento** o realizar ejercicios.",
      suggestedQuestions: [
        "¿Cómo van mis métricas y scoring?",
        "Traducir 'step down' o 'raise money'",
        "Diferencia entre Present Simple y Continuous",
        "Ponme a prueba con una pregunta"
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
