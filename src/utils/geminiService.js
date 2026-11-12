// Servicio de Integración con Google Gemini API (Gemini 2.5 Flash / 1.5 Flash)
// Permite generar preguntas inéditas con IA y dota a Arthur de inteligencia conversacional en vivo.

const STORAGE_KEY_GEMINI_KEY = 'englishlab_gemini_api_key';
const STORAGE_KEY_AI_QUESTIONS = 'englishlab_ai_generated_questions_v1';
const GEMINI_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODEL = 'gemini-1.5-flash';

// Obtener API Key (desde localStorage o variable de entorno Vercel/Vite)
export function getGeminiApiKey() {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem(STORAGE_KEY_GEMINI_KEY);
    if (localKey && localKey.trim()) return localKey.trim();
  }
  if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY.trim();
  }
  return '';
}

export function setGeminiApiKey(key) {
  if (typeof window === 'undefined') return;
  if (key && key.trim()) {
    localStorage.setItem(STORAGE_KEY_GEMINI_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_GEMINI_KEY);
  }
}

export function hasGeminiApiKey() {
  return Boolean(getGeminiApiKey());
}

// Probar si la API Key es válida
export async function testGeminiApiKey(apiKey) {
  const keyToTest = apiKey || getGeminiApiKey();
  if (!keyToTest) return { success: false, message: 'No se ingresó ninguna API Key.' };

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${keyToTest}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Responde únicamente con la palabra OK.' }] }]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        message: errData.error?.message || `Error HTTP ${response.status}: Clave inválida o sin permisos.` 
      };
    }

    return { success: true, message: '¡Conexión con Google Gemini exitosa!' };
  } catch (err) {
    return { success: false, message: `Error de red: ${err.message}` };
  }
}

// Helper para inferir Parcial y Clase según el tópico
export function detectParcialAndClassFromTopic(topic = '', defaultParcial = null, defaultClase = null) {
  const t = (topic || '').toLowerCase();

  if (defaultParcial) {
    let clase = defaultClase;
    if (!clase) {
      if (t.includes('cuantificador') || t.includes('quantifier') || t.includes('much') || t.includes('many') || t.includes('wearable') || t.includes('dispositivo')) clase = 8;
      else if (t.includes('comparativ') || t.includes('superlativ') || t.includes('python') || t.includes('java') || t.includes('lenguaje')) clase = 9;
      else if (t.includes('present perfect') || t.includes('cv') || t.includes('curriculum') || t.includes('martina')) clase = 10;
      else if (t.includes('futuro') || t.includes('future') || t.includes('will') || t.includes('going to') || t.includes('entrevista') || t.includes('smart glass')) clase = 12;
      else if (t.includes('conector') || t.includes('connector') || t.includes('openai') || t.includes('because') || t.includes('screenless')) clase = 13;
      else if (t.includes('adverb') || t.includes('adjetiv') || t.includes('modo') || t.includes('repaso')) clase = 14;
    }
    return { parcial: Number(defaultParcial), clase: clase ? Number(clase) : undefined };
  }

  // Inferencia por temática
  if (
    t.includes('cuantificador') || t.includes('quantifier') || t.includes('much') || t.includes('many') ||
    t.includes('wearable') || t.includes('dispositivo') || t.includes('comparativ') || t.includes('superlativ') ||
    t.includes('present perfect') || t.includes('cv') || t.includes('curriculum') || t.includes('martina') ||
    t.includes('futuro') || t.includes('future') || t.includes('will') || t.includes('going to') ||
    t.includes('entrevista') || t.includes('smart glass') || t.includes('conector') || t.includes('connector') ||
    t.includes('openai') || t.includes('adverb') || t.includes('2do parcial') || t.includes('segundo parcial') ||
    t.includes('unidad 3')
  ) {
    let clase = undefined;
    if (t.includes('cuantificador') || t.includes('quantifier') || t.includes('much') || t.includes('many') || t.includes('wearable') || t.includes('dispositivo')) clase = 8;
    else if (t.includes('comparativ') || t.includes('superlativ') || t.includes('python') || t.includes('java') || t.includes('lenguaje')) clase = 9;
    else if (t.includes('present perfect') || t.includes('cv') || t.includes('curriculum') || t.includes('martina')) clase = 10;
    else if (t.includes('futuro') || t.includes('future') || t.includes('will') || t.includes('going to') || t.includes('entrevista') || t.includes('smart glass')) clase = 12;
    else if (t.includes('conector') || t.includes('connector') || t.includes('openai') || t.includes('because') || t.includes('screenless')) clase = 13;
    else if (t.includes('adverb') || t.includes('adjetiv') || t.includes('modo') || t.includes('repaso')) clase = 14;
    return { parcial: 2, clase };
  }

  // 1er Parcial
  let clase = 1;
  if (t.includes('continuous') || t.includes('continuo')) clase = 3;
  else if (t.includes('past') || t.includes('pasado')) clase = 4;
  else if (t.includes('apollo') || t.includes('hamilton')) clase = 5;
  else if (t.includes('google') || t.includes('brin')) clase = 6;
  else if (t.includes('rol') || t.includes('saludo')) clase = 2;

  return { parcial: 1, clase };
}

// Generador de Preguntas de Examen Inéditas con Gemini
export async function generateExamQuestionsWithAI({ 
  topic = 'all', 
  count = 5, 
  parcial = null, 
  clase = null 
}) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('Debes configurar tu API Key gratuita de Google Gemini para generar preguntas inéditas.');
  }

  let targetParcial = parcial !== null && parcial !== undefined 
    ? (parcial === 'all' ? 2 : Number(parcial))
    : (topic.includes('2do') || topic.includes('segundo') ? 2 : null);
  let targetClase = clase !== null && clase !== undefined && clase !== 'all' ? Number(clase) : null;

  let topicPrompt = '';
  if (topic === 'all') {
    if (targetParcial === 2) {
      topicPrompt = 'exclusivamente sobre contenidos del 2do Parcial (Unidad 3 de la UTN · Clases 8 a 14: Cuantificadores much/many/few/little, Dispositivos IT & Wearables, Comparativos y Superlativos en Python/C/Java/Go, Present Perfect Tense, CV y Entrevistas IT, Futuro con Will vs Going To, Conectores Básicos y Adverbios de Modo).';
    } else {
      topicPrompt = 'una mezcla variada de todos los temas oficiales de Inglés Técnico I (1er y 2do Parcial · Clases 1 a 14).';
    }
  } else if (topic === '2do Parcial Completo') {
    targetParcial = 2;
    topicPrompt = 'exclusivamente sobre contenidos del 2do Parcial (Unidad 3 · Clases 8 a 14: Cuantificadores, Comparativos y Superlativos de lenguajes de programación, Present Perfect, CV y Entrevistas IT, Futuro Will vs Going To, Conectores lógicos y Adverbios de modo).';
  } else if (targetClase) {
    targetParcial = 2;
    topicPrompt = `específicamente sobre la Clase ${targetClase} del 2do Parcial de la UTN (tema: "${topic}").`;
  } else {
    topicPrompt = `específicamente sobre el tema: "${topic}".`;
  }

  const prompt = `Actúa como un profesor universitario de inglés técnico para la carrera de Programación de la UTN (Inglés Técnico I).
Genera exactamente ${count} preguntas inéditas y originales de opción múltiple (Multiple Choice) para examen universitario basadas en ${topicPrompt}.

REGLAS OBLIGATORIAS:
1. Las preguntas deben estar en inglés, redactadas profesionalmente y contextualizadas en informática, programación, desarrollo de software, cloud, bases de datos o entrevistas laborales IT.
2. Cada pregunta debe tener exactamente 4 opciones ("a", "b", "c", "d"), claras y plausibles.
3. Solo una opción debe ser la correcta.
4. La explicación (explanation) debe estar en español y explicar claramente la regla gramatical o el dato técnico.
5. Los temas oficiales son:
   - "Cuantificadores" (Clase 8): much, many, few, a few, little, a little, some, any, a lot of, too much/many.
   - "Dispositivos IT & Wearables" (Clase 8): hardware y wearables de salud (Heartguide, SmartSleep, smart jacket, iTBra).
   - "Comparativos & Superlativos" (Clase 9): -er / more than, the -est / the most, irregulars (better/worse); lecturas de Python vs C y Java vs Go (JVM, concurrency, goroutines, tooling, garbage collection).
   - "Present Perfect Tense" (Clase 10): have/has + past participle; since/for; ever/never; just, already, yet; been vs gone; contraste con Past Simple.
   - "Vocabulario CV & Entrevista IT" (Clases 10 y 12): action verbs (develop, maintain, solve, improve), qualifications, skills, degree, internship, troubleshooting, deadline, 5 DOs & 5 DON'Ts.
   - "Futuro: Will vs Going To" (Clase 12): predicciones con opinión vs evidencia visual; decisiones espontáneas vs planes previos; AI Smart Glasses.
   - "Conectores Básicos" (Clase 13): And, But, Or, So, Because; paralelismo sintáctico; oraciones negativas con 'or'; nuevo dispositivo OpenAI sin pantalla.
   - "Adverbios de Modo & Adjetivos" (Clase 14): cuidadosamente, rápidamente (carefully, quickly, well); adjetivos en -ly (friendly, lovely); repaso de tiempos verbales.
   - "1er Parcial" (Clases 1 a 6): Simple Present, Present Continuous, Past Simple, Margaret Hamilton (Apollo 11), Google (Sergey Brin).
6. Evita preguntas repetitivas o triviales: crea situaciones y oraciones nuevas, modernas e interesantes.

Devuelve ÚNICAMENTE un array JSON válido sin bloques de código markdown:
[
  {
    "id": number (número aleatorio único mayor a 10000),
    "parcial": number (1 o 2),
    "clase": number (ej: 8, 9, 10, 12, 13 o 14),
    "topic": string,
    "question": string,
    "options": [
      { "id": "a", "text": string },
      { "id": "b", "text": string },
      { "id": "c", "text": string },
      { "id": "d", "text": string }
    ],
    "correctAnswer": "a" | "b" | "c" | "d",
    "explanation": string,
    "source": "Generado por Gemini AI ✨"
  }
]`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.75
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error en la API de Gemini (${response.status})`);
  }

  const data = await response.json();
  const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!rawJsonText) {
    throw new Error('Gemini no devolvió contenido.');
  }

  const cleanJson = rawJsonText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const questions = JSON.parse(cleanJson);
  const now = Date.now();
  
  // Procesar y enriquecer las preguntas asegurando parcial, clase y timestamps
  const processedQuestions = questions.map((q, idx) => {
    const detected = detectParcialAndClassFromTopic(q.topic || topic, targetParcial, targetClase);
    return {
      ...q,
      id: q.id || (now + idx * 10 + Math.floor(Math.random() * 9000)),
      parcial: targetParcial || q.parcial || detected.parcial,
      clase: targetClase || q.clase || detected.clase,
      isAiGenerated: true,
      createdAt: now + idx,
      source: q.source || "Generado por Gemini AI ✨"
    };
  });
  
  // Guardar en caché local de preguntas generadas (las nuevas van primero)
  saveGeneratedQuestions(processedQuestions);

  return processedQuestions;
}

// Guardar y recuperar preguntas generadas por IA
export function getSavedAIQuestions() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AI_QUESTIONS);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];

    // Normalizar y sanear preguntas guardadas
    return list.map(q => {
      const detected = detectParcialAndClassFromTopic(q.topic);
      return {
        ...q,
        parcial: q.parcial || detected.parcial || 2,
        clase: q.clase || detected.clase,
        isAiGenerated: true,
        createdAt: q.createdAt || Date.now()
      };
    });
  } catch (e) {
    return [];
  }
}

export function saveGeneratedQuestions(newQuestions) {
  if (typeof window === 'undefined' || !Array.isArray(newQuestions)) return;
  try {
    const existing = getSavedAIQuestions();
    // Poner las preguntas NUEVAS PRIMERO para que tengan la mayor prioridad temporal
    const combined = [...newQuestions, ...existing];
    // Evitar duplicados por id o por texto de pregunta
    const seen = new Set();
    const unique = [];
    for (const q of combined) {
      const key = (q.id || '') + (q.question || '');
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(q);
      }
    }
    localStorage.setItem(STORAGE_KEY_AI_QUESTIONS, JSON.stringify(unique.slice(0, 150)));
  } catch (e) {}
}

export function clearSavedAIQuestions() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_AI_QUESTIONS);
  } catch (e) {}
}

// Conversación inteligente con Arthur potenciado por Gemini
export async function askArthurWithGemini(userPrompt, chatHistory = []) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return null; // Fallback al motor local
  }

  const systemInstruction = `Eres Arthur 🎩✨, el tutor virtual de inglés técnico para estudiantes de Programación de la UTN TUP (Materia: Inglés Técnico I).
Tu personalidad es la de un distinguido caballero inglés: muy educado, cordial, inteligente, pedagógico y alentador. Ocasionalmente usas el emoji 🎩 o ✨.

CONOCIMIENTO DEL PROGRAMA ACADÉMICO (Clases 1 a 14 - 1er y 2do Parcial):
1. Present Simple: Rutinas de desarrolladores, reglas de 3ra persona (-s, -es, -ies), negación con don't/doesn't, adverbios de frecuencia antes del verbo principal.
2. Present Continuous: -ing spelling rules, acciones en progreso vs rutinas, Stative Verbs (know, need, want, understand - sin -ing).
3. Simple Past: Reglas de -ed regulares, negación y preguntas con DID/DIDN'T + verbo en forma base, verbos irregulares (meet->met, write->wrote, buy->bought, find->found, sell->sold, run->ran, hold->held, spend->spent).
4. Cuantificadores (Clase 8): Much vs Many, Too much / Too many, A lot of, Few vs A few, Little vs A little, Some vs Any (en ofertas/peticiones).
5. Dispositivos & Wearables (Clase 8): Laptop, desktop, tablet, touchpad, flash drive; Fitbits, iTBra, Heartguide, SmartSleep.
6. Comparativos & Superlativos (Clase 9): -er / more than, the -est / the most, irregulars (good/better/best, bad/worse/worst); lecturas de Python vs C (interpreted vs compiled, memory control) y Java vs Go (JVM, concurrency, goroutines, tooling, garbage collection).
7. Present Perfect Tense (Clase 10): Have/has + past participle; 4 usos (iniciadas en pasado que siguen hoy con since/for; experiencia de vida con ever/never; acción pasada con resultado presente; eventos recientes con just, already, yet, recently); been vs gone; contraste con Past Simple (prohibido usar present perfect con yesterday o in 2017).
8. Redacción de CV para IT (Clase 10): Verbos de acción (develop, design, manage, maintain, solve, improve, create, test, collaborate, support); sustantivos (qualifications, work experience, skills, achievement, responsibilities, degree, internship, deadline, troubleshooting); CV de Martina López.
9. Futuro: Will vs Be Going To (Clase 12): Predicciones (will para opiniones vs be going to para evidencia visible); Decisiones (will para decisiones espontáneas en el momento vs be going to para planes o intenciones previas); AI Smart Glasses de Meta & Snap.
10. Consejos para Entrevistas IT (Clase 12): 5 DOs (investigar empresa, hablar de skills, mencionar logros, preparar respuestas, preguntar al final) y 5 DON'Ts (no llegar tarde, no mentir sobre tecnologías, no hablar mal de otros, no dar respuestas monosilábicas, cuidar lenguaje corporal).
11. Conectores Básicos (Clase 13): And (adición, paralelismo sintáctico), But (contraste), Or (alternativas, oraciones negativas 'not X or Y'), So (consecuencia/resultado), Because (causa/motivo); Dispositivo AI de OpenAI (sin pantalla, tamaño iPod Shuffle, io Products, ayuda por voz para coders).
12. Adverbios de Modo & Adjetivos (Clase 14): Adverbios describen verbos (carefully, quickly, well); posición después del verbo o después de verbo+objeto; palabras en -ly que son ADJETIVOS (friendly, lovely, silly); Repaso integral de todos los tiempos verbales.
13. Textos Históricos IT: Margaret Hamilton (Apollo 11, software asíncrono) y Google (Sergey Brin, Larry Page, IPO 2004, Alphabet).

INSTRUCCIONES DE RESPUESTA:
- Responde de forma clara, concisa y estructurada usando Markdown (negritas para conceptos clave, \`código\` para términos en inglés, listas con viñetas).
- Si te piden traducir una palabra u oración, proporciona la traducción exacta al inglés o español, categoría gramatical y un ejemplo en contexto de programación.
- Si el estudiante te consulta sobre un ejercicio o duda gramatical, dale la explicación con la regla y ejemplos correctos e incorrectos.
- Al final de tu respuesta, añade 2 o 3 sugerencias de preguntas breves que el alumno pueda hacer a continuación, con el formato exacto:
SUGGESTIONS: [Pregunta 1] | [Pregunta 2] | [Pregunta 3]`;

  // Construir historial reciente de mensajes
  const contents = [];
  
  // Agregar historial previo (últimos 6 mensajes)
  const recentHistory = chatHistory.slice(-6);
  for (const msg of recentHistory) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  // Mensaje actual del usuario
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }]
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      console.warn('Gemini API error, falling back to local brain:', response.status);
      return null;
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!rawText) return null;

    // Extraer sugerencias de preguntas si existen
    let cleanText = rawText;
    let suggestedQuestions = [];

    const suggestionsMatch = rawText.match(/SUGGESTIONS:\s*(.*)$/i);
    if (suggestionsMatch && suggestionsMatch[1]) {
      cleanText = rawText.replace(/SUGGESTIONS:\s*.*$/i, '').trim();
      suggestedQuestions = suggestionsMatch[1]
        .split('|')
        .map(s => s.replace(/[\[\]]/g, '').trim())
        .filter(Boolean);
    }

    if (suggestedQuestions.length === 0) {
      suggestedQuestions = [
        "Dame un ejercicio sobre esto",
        "¿Cómo se aplica en un parcial?",
        "Traducir otro término IT"
      ];
    }

    return {
      text: cleanText,
      suggestedQuestions,
      isAI: true
    };
  } catch (err) {
    console.error('Error contacting Gemini:', err);
    return null;
  }
}
