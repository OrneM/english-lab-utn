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
    ? 'una mezcla variada de todos los temas oficiales: Present Simple, Present Continuous, Stative Verbs, Simple Past (regulares e irregulares), Lectura de Margaret Hamilton (Apollo 11), Lectura de Sergey Brin & Google, y Vocabulario IT.'
    : `específicamente sobre el tema: "${topic}".`;

  const prompt = `Actúa como un profesor universitario de inglés técnico para la carrera de Programación de la UTN (Inglés Técnico I).
Genera exactamente ${count} preguntas inéditas de opción múltiple (Multiple Choice) para el primer parcial basadas en ${topicPrompt}.

REGLAS OBLIGATORIAS:
1. Las preguntas deben estar en inglés, contextualizadas en informática, programación o rutinas de desarrollo.
2. Cada pregunta debe tener exactamente 4 opciones identificadas con "a", "b", "c" y "d".
3. Solo una opción debe ser la correcta.
4. La explicación debe estar en español y explicar claramente la regla gramatical o el dato del texto.
5. Los temas permitidos son estrictamente:
   - "Simple Present" (rutinas, 3ra persona -s/-es/-ies, doesn't/don't, adverbios de frecuencia)
   - "Present Continuous" (-ing spelling rules, acciones en progreso, stative verbs)
   - "Simple Present vs Continuous" (contraste, temporales vs permanentes)
   - "Past Simple" (verbos irregulares como meet/met, write/wrote, buy/bought, sell/sold, run/ran, find/found; negación didn't + base form)
   - "Lectura Apollo 11 & Margaret Hamilton" (software asíncrono, pantallas de prioridad, alunizaje 1969)
   - "Lectura Google & Sergey Brin" (lanzamiento 1998, Stanford, $1M recaudado, IPO 2004, step down)
   - "Vocabulario IT & Roles" (software developer, systems analyst, UX designer, database, server farm, debug)

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

CONOCIMIENTO DEL PROGRAMA ACADÉMICO (Clases 1 a 6):
1. Present Simple: Rutinas de desarrolladores, reglas de 3ra persona (-s, -es, -ies), negación con don't/doesn't, adverbios de frecuencia (always, usually, never) antes del verbo principal.
2. Present Continuous: -ing spelling rules (cvc doubling, drop e, ie->y), acciones en progreso vs rutinas, Stative Verbs (know, need, want, understand, belong - NO llevan -ing).
3. Simple Past: Reglas de -ed regulares, negación y preguntas con DID/DIDN'T + verbo en forma base (¡nunca en pasado!), verbos irregulares clave (meet->met, write->wrote, build->built, buy->bought, find->found, sell->sold, teach->taught, run->ran, speak->spoke, become->became, hold->held, see->saw, think->thought).
4. Textos de Lectura IT:
   - Margaret Hamilton (Apollo 11, MIT, software asíncrono, pantallas de prioridad, medalla de la libertad 2016).
   - Sergey Brin y Larry Page (Google 1998, Stanford, inversión de $1M, compra de YouTube en 2006, IPO en 2004, Alphabet 2015).
5. Traducción de términos IT (Español <-> Inglés) y roles (Software developer, Systems analyst, UX designer, Network engineer, IT support, Project manager).

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
