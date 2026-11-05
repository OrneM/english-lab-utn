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

// Generador de Preguntas de Examen Inéditas con Gemini
export async function generateExamQuestionsWithAI({ topic = 'all', count = 5 }) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('Debes configurar tu API Key gratuita de Google Gemini para generar preguntas inéditas.');
  }

  const topicPrompt = topic === 'all' 
    ? 'una mezcla variada de todos los temas oficiales de Inglés Técnico I (1er y 2do Parcial · Clases 1 a 14): Present Simple, Present Continuous, Simple Past, Cuantificadores (much/many/few/little/some/any), Comparativos y Superlativos (Python vs C, Java vs Go), Present Perfect Tense, Redacción de CV y Entrevista IT, Futuro (Will vs Going To), Conectores Básicos (And, But, Or, So, Because), Adverbios de Modo y Repaso Integral.'
    : `específicamente sobre el tema: "${topic}".`;

  const prompt = `Actúa como un profesor universitario de inglés técnico para la carrera de Programación de la UTN (Inglés Técnico I).
Genera exactamente ${count} preguntas inéditas de opción múltiple (Multiple Choice) para examen universitario basadas en ${topicPrompt}.

REGLAS OBLIGATORIAS:
1. Las preguntas deben estar en inglés, contextualizadas en informática, programación, desarrollo de software o entrevistas laborales IT.
2. Cada pregunta debe tener exactamente 4 opciones identificadas con "a", "b", "c" y "d".
3. Solo una opción debe ser la correcta.
4. La explicación debe estar en español y explicar claramente la regla gramatical o el dato del texto.
5. Los temas permitidos incluyen:
   - "Simple Present" (rutinas, 3ra persona -s/-es/-ies, doesn't/don't, adverbios de frecuencia)
   - "Present Continuous" (-ing spelling rules, acciones en progreso, stative verbs)
   - "Past Simple" (verbos regulares e irregulares, negación didn't + base form)
   - "Cuantificadores" (much, many, little, few, a little, a few, some, any, a lot of, too much/many)
   - "Dispositivos IT & Wearables" (laptop, touchpad, flash drive, iTBra, Heartguide, SmartSleep, smart jacket)
   - "Comparativos & Superlativos" (easier, faster, more powerful, most common; Python vs C, Java vs Go, concurrency, garbage collection)
   - "Present Perfect Tense" (have/has + past participle, since, for, ever, never, just, already, yet, been vs gone)
   - "Vocabulario CV & Entrevista IT" (develop, maintain, solve, qualifications, internship, degree, troubleshooting, deadline, 5 DOs & 5 DON'Ts)
   - "Futuro: Will vs Going To" (predicciones con opinión vs evidencia visual; decisiones espontáneas vs planes previos)
   - "Conectores Básicos" (And, But, Or, So, Because; paralelismo sintáctico; oraciones negativas con 'or')
   - "Adverbios de Modo & Adjetivos" (carefully, quickly, well, -ly adjectives like friendly/lovely)
   - "Lecturas IT" (Apollo 11, Google/Sergey Brin, OpenAI new screenless device, AI Smart Glasses)

Devuelve ÚNICAMENTE un array JSON válido con la siguiente estructura sin bloques de código markdown adicionales:
[
  {
    "id": number (número aleatorio único mayor a 1000),
    "topic": string (uno de los temas mencionados),
    "question": string (la pregunta o frase a completar),
    "options": [
      { "id": "a", "text": string },
      { "id": "b", "text": string },
      { "id": "c", "text": string },
      { "id": "d", "text": string }
    ],
    "correctAnswer": "a" | "b" | "c" | "d",
    "explanation": string (en español),
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
        temperature: 0.7
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
  
  // Guardar en caché local de preguntas generadas
  saveGeneratedQuestions(questions);

  return questions;
}

// Guardar y recuperar preguntas generadas por IA
export function getSavedAIQuestions() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AI_QUESTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveGeneratedQuestions(newQuestions) {
  if (typeof window === 'undefined' || !Array.isArray(newQuestions)) return;
  try {
    const existing = getSavedAIQuestions();
    const combined = [...newQuestions, ...existing];
    // Evitar duplicados por id
    const unique = Array.from(new Map(combined.map(q => [q.id, q])).values()).slice(0, 100);
    localStorage.setItem(STORAGE_KEY_AI_QUESTIONS, JSON.stringify(unique));
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
