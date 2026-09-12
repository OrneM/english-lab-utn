import { IRREGULAR_VERBS } from '../data/irregularVerbs';
import { THEORY_DATA } from '../data/theoryData';
import { EXAM_QUESTIONS } from '../data/questions';

export function getArthurResponse(userInput) {
  const text = userInput.trim().toLowerCase();
  
  if (!text) {
    return {
      text: "¡Hola! Soy Arthur, tu tutor de inglés técnico. ¿En qué tema de las Clases 1 a 6 te gustaría profundizar hoy?",
      suggestedQuestions: [
        "¿Cómo sé cuándo usar Present Simple o Continuous?",
        "¿Cuál es el pasado del verbo 'meet'?",
        "¿Qué hizo Margaret Hamilton en Apollo 11?",
        "Dame un ejercicio de práctica"
      ]
    };
  }

  // 1. SALUDOS / IDENTIDAD
  if (/^(hola|buenas|hey|hi|hello|buenos d[ií]as|buenas tardes|buenas noches)/i.test(text)) {
    return {
      text: "¡Un gusto saludarte! Soy **Arthur**, tu asistente y tutor de inglés para la carrera de Programación (UTN). Conozco a la perfección todos los temas de las unidades 1 y 2. Puedes preguntarme sobre gramática, verbos irregulares, vocabulario IT o pedirme ejercicios.",
      suggestedQuestions: [
        "Diferencia entre Present Simple y Continuous",
        "Reglas de 3ra persona singular (-s, -es, -ies)",
        "¿Qué significa 'step down' o 'raise money'?",
        "Ponme a prueba con una pregunta"
      ]
    };
  }

  if (/(qui[eé]n eres|tu nombre|qui[eé]n sos|presentate|arthur)/i.test(text) && !text.includes("margaret")) {
    return {
      text: "Soy **Arthur**, tu tutor virtual de inglés técnico en **EnglishLab**. Mi misión es ayudarte a promocionar el parcial de inglés de la UTN TUP explicándote cualquier regla gramatical con ejemplos claros de código y desarrollo de software. 🎩✨",
      suggestedQuestions: [
        "¿Cómo se forman las preguntas en Pasado Simple?",
        "Verbos de estado (Stative Verbs)",
        "Historia de Google y Sergey Brin",
        "Dame un ejercicio de examen"
      ]
    };
  }

  // 2. CONSULTAS ESPECÍFICAS DE VERBOS IRREGULARES
  // Ej: "pasado de sell", "past of find", "como es el pasado de write", "buy en pasado"
  const verbMatch = text.match(/(?:pasado|past|conjugaci[oó]n|forma)\s*(?:de|del|of)?\s*([a-zA-Z]+)/i) ||
                    text.match(/([a-zA-Z]+)\s*(?:en pasado|in past)/i);
  
  if (verbMatch && verbMatch[1]) {
    const candidate = verbMatch[1].toLowerCase();
    const foundVerb = IRREGULAR_VERBS.find(v => v.base.toLowerCase() === candidate || v.past.toLowerCase().includes(candidate));
    if (foundVerb) {
      return {
        text: `🎩 **Verbo Irregular: ${foundVerb.base.toUpperCase()}**\n\n` +
              `• **Infinitivo / Forma Base:** \`${foundVerb.base}\`\n` +
              `• **Pasado Simple:** \`${foundVerb.past}\`\n` +
              `• **Participio Pasado:** \`${foundVerb.participle}\`\n` +
              `• **Traducción:** ${foundVerb.translation}\n\n` +
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

  // Búsqueda directa si el usuario ingresó solo el verbo (ej: "found", "sold", "met", "write")
  const directVerb = IRREGULAR_VERBS.find(v => v.base.toLowerCase() === text || v.past.toLowerCase() === text);
  if (directVerb) {
    return {
      text: `🎩 **Verbo Irregular: ${directVerb.base.toUpperCase()}**\n\n` +
            `• **Forma Base:** \`${directVerb.base}\`\n` +
            `• **Pasado Simple:** \`${directVerb.past}\`\n` +
            `• **Participio:** \`${directVerb.participle}\`\n` +
            `• **Significado:** ${directVerb.translation}\n\n` +
            `💻 **Ejemplo:** *"${directVerb.example}"*`,
      suggestedQuestions: [
        "¿Cómo se formula una pregunta con este verbo?",
        "Verbos regulares terminados en -ED",
        "Dame un ejercicio de pasado simple"
      ]
    };
  }

  // 3. CONTRASTE: SIMPLE PRESENT VS PRESENT CONTINUOUS
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

  // 4. VERBOS DE ESTADO (STATIVE VERBS)
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

  // 5. REGLAS DE 3RA PERSONA (-s, -es, -ies) EN PRESENTE SIMPLE
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

  // 6. NEGACIÓN Y PREGUNTAS EN PASADO SIMPLE (DID / DIDN'T)
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

  // 7. LECTURAS Y PERSONAJES IT: MARGARET HAMILTON (APOLLO 11)
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

  // 8. LECTURAS IT: GRACE HOPPER & COBOL
  if (/(grace hopper|cobol|compilador|compiler|uss hopper)/i.test(text)) {
    return {
      text: `🎩 **Grace Hopper: 'The Queen of Code' (Clase 5):**\n\n` +
            `• Doctora en Matemáticas de Yale y oficial de la Marina de EE.UU.\n` +
            `• Desarrolló uno de los **primeros compiladores** de la historia (herramienta que traduce código a lenguaje máquina).\n` +
            `• Fue pionera en la creación del lenguaje **COBOL**.\n` +
            `• En 2016, la Marina nombró un buque de guerra en su honor: el *USS Hopper*.`,
      suggestedQuestions: [
        "Historia de Google y Sergey Brin",
        "Verbos regulares en pasado simple (-ed)",
        "Ponme un ejercicio de examen"
      ]
    };
  }

  // 9. LECTURAS IT: GOOGLE, SERGEY BRIN & LARRY PAGE
  if (/(sergey brin|larry page|google|alphabet|ipo|stanford|youtube|1998)/i.test(text)) {
    return {
      text: `🎩 **Historia de Google & Vocabulario Empresarial (Clase 6):**\n\n` +
            `• **Orígenes:** Sergey Brin nació en Moscú y emigró a EE.UU. Conoció a Larry Page en Stanford University mientras hacían su doctorado.\n` +
            `• **Lanzamiento:** Crearon Google en **1998** tras recaudar $1 millón de dólares (*raised money*) de inversores.\n` +
            `• **Hitos:** En 2004 realizaron su Oferta Pública Inicial (*IPO*), en 2006 compraron YouTube (*purchased YouTube*) por $1.65B y en 2015 se reestructuraron bajo la empresa matriz **Alphabet**.\n` +
            `• En 2019, ambos se retiraron de sus cargos ejecutivos (*stepped down*).`,
      suggestedQuestions: [
        "¿Qué significa 'step down'?",
        "¿Qué significa 'raise money'?",
        "Glosario de negocios IT completo"
      ]
    };
  }

  // 10. VOCABULARIO IT Y GLOSARIO DE NEGOCIOS
  if (/(step down|raise money|launch|restructure|headquarters|ipo|purchase|shareholder|lack of)/i.test(text)) {
    return {
      text: `🎩 **Glosario de Negocios y Evolución IT (Clase 6):**\n\n` +
            `• **To launch:** Lanzar un producto o fundar una empresa al mercado.\n` +
            `• **To raise money:** Recaudar fondos o capital de inversores.\n` +
            `• **To step down:** Renunciar o retirarse de un puesto de liderazgo (CEO).\n` +
            `• **To purchase:** Comprar o adquirir formalmente activos o compañías.\n` +
            `• **To restructure:** Reorganizar la estructura de una compañía.\n` +
            `• **Initial Public Offering (IPO):** Salida a la bolsa de valores por primera vez.\n` +
            `• **Headquarters:** Sede central u oficina principal.\n` +
            `• **Shareholders:** Accionistas.`,
      suggestedQuestions: [
        "Roles y puestos IT (Clase 2)",
        "Diferencia entre saludos formales e informales",
        "Dame un ejercicio de vocabulario"
      ]
    };
  }

  // 11. ROLES IT & SALUDOS FORMALES / INFORMALES
  if (/(roles it|puestos|software developer|ux designer|it support|project manager|greetings|saludos|good morning|what's up)/i.test(text)) {
    return {
      text: `🎩 **Roles IT & Saludos (Clase 2):**\n\n` +
            `• **Software Developer:** *Creates and tests code*.\n` +
            `• **UX Designer:** *Designs easy-to-use, intuitive interfaces*.\n` +
            `• **IT Support:** *Helps with computer and hardware problems*.\n` +
            `• **Project Manager:** *Manages and plans tech projects*.\n` +
            `• **Web Developer:** *Builds and maintains websites*.\n\n` +
            `💬 **Saludos:**\n` +
            `• **Formales:** *"Good morning, Mr. Smith"* (con tu jefe), *"Hello, how can I help you?"* (en soporte).\n` +
            `• **Informales:** *"Hey, what's up?"*, *"Hi there!"* (con amigos o compañeros).`,
      suggestedQuestions: [
        "¿Cómo describo la rutina diaria de un programador?",
        "Preguntas en Presente Simple",
        "Dame un ejercicio de práctica"
      ]
    };
  }

  // 12. GENERADOR DE EJERCICIO / RETO INTERACTIVO
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
        "Explícame la regla de este tema"
      ],
      activeChallenge: randomQ
    };
  }

  // 13. RESPUESTA A OPCIONES (A, B, C, D)
  if (/^[a-d]$/i.test(text) || /^(opcion|opción|letra|la)\s*([a-d])/i.test(text)) {
    return {
      text: `¡Excelente intento! Para comprobar tus respuestas en un entorno cronometrado y con scoring oficial (0-10), te sugiero abrir la pestaña **"Práctica de Examen"** en la barra superior. ¿Te gustaría que repasemos la teoría de este tema antes?`,
      suggestedQuestions: [
        "Dame otro ejercicio de práctica",
        "Reglas de Presente Simple vs Continuo",
        "Buscador de verbos irregulares"
      ]
    };
  }

  // 14. DEFAULT / FALLBACK INTELIGENTE
  return {
    text: `Entiendo tu consulta sobre **"${userInput}"**. En el programa de Inglés Técnico I evaluamos:\n\n` +
          `1. **Presente Simple:** Rutinas, 3ra persona (\`-s\`, \`-es\`, \`-ies\`), \`don't / doesn't\` y preguntas con \`do / does\`.\n` +
          `2. **Presente Continuo:** Acciones temporales (\`am/is/are + ing\`), excepciones y contraste vs Simple.\n` +
          `3. **Pasado Simple:** Verbos regulares (\`-ed\`), irregulares (\`found, sold, met, bought\`), \`didn't\` y las historias de Margaret Hamilton y Google.\n\n` +
          `¿Sobre cuál de estos puntos te gustaría que te dé una explicación o ejercicio?`,
    suggestedQuestions: [
      "¿Cómo sé cuándo usar Present Simple o Continuous?",
      "Buscar pasado de un verbo irregular",
      "Historia de Apollo 11 y Margaret Hamilton",
      "Dame un ejercicio de práctica"
    ]
  };
}
