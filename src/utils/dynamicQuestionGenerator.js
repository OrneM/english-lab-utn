// Motor Generador Procedural de Preguntas Espontáneas e Inéditas
// Diseñado para Inglés Técnico I (UTN TUP) - Clases 1, 2, 4, 5 y 6.
// Permite generar cientos de preguntas aleatorias e infinitas de forma local y offline.

import { IRREGULAR_VERBS } from '../data/irregularVerbs';

// Utilidad Fisher-Yates para mezclar arrays sin sesgo
export function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Barajador dinámico de opciones para cualquier pregunta
// Reordena las opciones y actualiza la letra de 'correctAnswer' de forma transparente.
export function shuffleQuestionOptions(question) {
  if (!question || !question.options || question.options.length < 2) return question;

  const correctOptionText = question.options.find(o => o.id === question.correctAnswer)?.text;
  if (!correctOptionText) return question;

  const shuffledOptionTexts = shuffleArray(question.options.map(o => o.text));
  const newLetters = ['a', 'b', 'c', 'd', 'e', 'f'].slice(0, shuffledOptionTexts.length);

  let newCorrectLetter = 'a';
  const newOptions = shuffledOptionTexts.map((text, idx) => {
    const letter = newLetters[idx];
    if (text === correctOptionText) {
      newCorrectLetter = letter;
    }
    return { id: letter, text: text };
  });

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectLetter
  };
}

// ----------------------------------------------------------------------------
// BANCOS DE DATOS Y ELEMENTOS COMBINATORIOS PARA GENERACIÓN ESPONTÁNEA
// ----------------------------------------------------------------------------

const SUBJECTS_SINGULAR_3RD = [
  { text: "The senior frontend engineer", pronoun: "he/she" },
  { text: "The DevOps specialist", pronoun: "he/she" },
  { text: "Our database administrator (DBA)", pronoun: "he/she" },
  { text: "The system architect", pronoun: "he/she" },
  { text: "The cybersecurity analyst", pronoun: "he/she" },
  { text: "The lead software developer", pronoun: "he/she" },
  { text: "The QA automation tester", pronoun: "he/she" },
  { text: "The Scrum Master", pronoun: "he/she" },
  { text: "The project manager", pronoun: "he/she" },
  { text: "My teammate", pronoun: "he/she" },
  { text: "The mobile app developer", pronoun: "he/she" },
  { text: "The backend programmer", pronoun: "he/she" }
];

const SUBJECTS_PLURAL = [
  { text: "Software developers", pronoun: "they" },
  { text: "Full-stack engineers", pronoun: "they" },
  { text: "Junior programmers", pronoun: "they" },
  { text: "QA testers", pronoun: "they" },
  { text: "Database administrators", pronoun: "they" },
  { text: "Cloud architects", pronoun: "they" },
  { text: "DevOps teams", pronoun: "they" },
  { text: "Systems analysts", pronoun: "they" }
];

const FREQUENCY_ADVERBS = [
  { adverb: "always", pct: "100%", trans: "siempre" },
  { adverb: "usually", pct: "90%", trans: "usualmente / normalmente" },
  { adverb: "frequently", pct: "80%", trans: "frecuentemente" },
  { adverb: "often", pct: "70%", trans: "a menudo" },
  { adverb: "sometimes", pct: "50%", trans: "a veces" },
  { adverb: "rarely", pct: "20%", trans: "raramente" },
  { adverb: "seldom", pct: "10%", trans: "casi nunca / rara vez" },
  { adverb: "hardly ever", pct: "5%", trans: "casi nunca" },
  { adverb: "never", pct: "0%", trans: "nunca" }
];

const IT_VERB_PAIRS = [
  { base: "debug", third: "debugs", es: "depurar / corregir errores", context: "code in the test environment" },
  { base: "compile", third: "compiles", es: "compilar", context: "the TypeScript application" },
  { base: "deploy", third: "deploys", es: "desplegar", context: "microservices to AWS cloud" },
  { base: "manage", third: "manages", es: "administrar / gestionar", context: "relational database clusters" },
  { base: "optimize", third: "optimizes", es: "optimizar", context: "SQL queries and indexing" },
  { base: "configure", third: "configures", es: "configurar", context: "CI/CD pipelines on GitLab" },
  { base: "monitor", third: "monitors", es: "monitorear", context: "server latency and uptime" },
  { base: "test", third: "tests", es: "probar", context: "RESTful API endpoints" },
  { base: "fix", third: "fixes", es: "arreglar", context: "critical runtime vulnerabilities" },
  { base: "modify", third: "modifies", es: "modificar", context: "the React component state" },
  { base: "study", third: "studies", es: "estudiar / analizar", context: "machine learning algorithms" },
  { base: "watch", third: "watches", es: "observar / supervisar", context: "traffic logs in Grafana" },
  { base: "backup", third: "backups", es: "hacer copia de seguridad", context: "production data every night" },
  { base: "update", third: "updates", es: "actualizar", context: "package dependencies" },
  { base: "release", third: "releases", es: "lanzar / publicar", context: "a new software patch" }
];

const CONTINUOUS_VERBS = [
  { base: "debug", ing: "debugging", rule: "doble consonante al acentuar la última sílaba", context: "a memory leak in Node.js" },
  { base: "run", ing: "running", rule: "duplica la 'n' por ser monosílabo Consonante-Vocal-Consonante (CVC)", context: "integration tests in Jenkins" },
  { base: "stop", ing: "stopping", rule: "duplica la 'p' por ser monosílabo CVC", context: "the Docker container" },
  { base: "write", ing: "writing", rule: "elimina la 'e' final antes de añadir -ing", context: "unit tests for the authentication module" },
  { base: "create", ing: "creating", rule: "elimina la 'e' final", context: "a new database migration" },
  { base: "configure", ing: "configuring", rule: "elimina la 'e' final", context: "the Kubernetes ingress controller" },
  { base: "program", ing: "programming", rule: "duplica la 'm' final en inglés", context: "a microservice in Go" },
  { base: "deploy", ing: "deploying", rule: "mantiene la 'y' al añadir -ing (vocal + y)", context: "the hotfix to production" },
  { base: "study", ing: "studying", rule: "mantiene la 'y' al añadir -ing", context: "the new cloud architecture" },
  { base: "set up", ing: "setting up", rule: "duplica la 't' en 'setting'", context: "the virtual private cloud (VPC)" }
];

const STATIVE_VERBS = [
  { verb: "understand", third: "understands", meaning: "comprender / entender", context: "the complex legacy codebase" },
  { verb: "know", third: "knows", meaning: "saber / conocer", context: "the root cause of the server outage" },
  { verb: "need", third: "needs", meaning: "necesitar", context: "additional server memory" },
  { verb: "prefer", third: "prefers", meaning: "preferir", context: "using Linux over Windows" },
  { verb: "contain", third: "contains", meaning: "contener", context: "sensitive customer credentials" },
  { verb: "consist of", third: "consists of", meaning: "consistir en", context: "five independent microservices" },
  { verb: "belong to", third: "belongs to", meaning: "pertenecer a", context: "the DevOps department" },
  { verb: "remember", third: "remembers", meaning: "recordar", context: "the encryption master key" }
];

const TIME_MARKERS_CONTINUOUS = [
  "right now",
  "at the moment",
  "currently",
  "today",
  "this afternoon",
  "as we speak"
];

// ----------------------------------------------------------------------------
// GENERADORES PROCEDURALES TEMÁTICOS
// ----------------------------------------------------------------------------

function generatePresentSimple3rdPerson() {
  const subj = SUBJECTS_SINGULAR_3RD[Math.floor(Math.random() * SUBJECTS_SINGULAR_3RD.length)];
  const verbPair = IT_VERB_PAIRS[Math.floor(Math.random() * IT_VERB_PAIRS.length)];
  const adv = FREQUENCY_ADVERBS[Math.floor(Math.random() * 4)]; // always, usually, etc.

  const question = `${subj.text} ${adv.adverb} _____ ${verbPair.context}.`;
  
  // Opciones: 3ra persona correcta, infinitivo base, -ing, pasado
  const options = [
    { text: verbPair.third },
    { text: verbPair.base },
    { text: `${verbPair.base}ing` },
    { text: `${verbPair.base}ed` }
  ];

  return {
    topic: "Simple Present",
    question: question,
    options: options,
    correctAnswer: "a", // se mezclará después
    explanation: `En Presente Simple con sujeto singular de tercera persona (${subj.text}), el verbo principal debe llevar la terminación de 3ra persona: '${verbPair.third}'.`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generatePresentSimpleNegative() {
  const isSingular = Math.random() > 0.5;
  const subj = isSingular 
    ? SUBJECTS_SINGULAR_3RD[Math.floor(Math.random() * SUBJECTS_SINGULAR_3RD.length)]
    : SUBJECTS_PLURAL[Math.floor(Math.random() * SUBJECTS_PLURAL.length)];
  const verbPair = IT_VERB_PAIRS[Math.floor(Math.random() * IT_VERB_PAIRS.length)];

  const correctAux = isSingular ? "doesn't" : "don't";
  const question = `${subj.text} _____ ${verbPair.base} ${verbPair.context}.`;

  const options = isSingular ? [
    { text: "doesn't" },
    { text: "don't" },
    { text: "isn't" },
    { text: "not" }
  ] : [
    { text: "don't" },
    { text: "doesn't" },
    { text: "aren't" },
    { text: "not" }
  ];

  return {
    topic: "Simple Present",
    question: question,
    options: options,
    correctAnswer: "a",
    explanation: `Para formar la negación en Presente Simple con sujeto ${isSingular ? 'singular (He/She/It)' : 'plural (They)'}, usamos el auxiliar '${correctAux}' seguido del verbo en su forma base infinitiva ('${verbPair.base}').`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generateFrequencyAdverbPosition() {
  const subj = SUBJECTS_SINGULAR_3RD[Math.floor(Math.random() * SUBJECTS_SINGULAR_3RD.length)];
  const verbPair = IT_VERB_PAIRS[Math.floor(Math.random() * IT_VERB_PAIRS.length)];
  const adv = FREQUENCY_ADVERBS[Math.floor(Math.random() * FREQUENCY_ADVERBS.length)];

  const correctSentence = `${subj.text} ${adv.adverb} ${verbPair.third} ${verbPair.context}.`;
  const wrong1 = `${subj.text} ${verbPair.third} ${adv.adverb} ${verbPair.context}.`;
  const wrong2 = `${adv.adverb.charAt(0).toUpperCase() + adv.adverb.slice(1)} ${subj.text} ${verbPair.third} ${verbPair.context}.`;
  const wrong3 = `${subj.text} ${verbPair.third} ${verbPair.context} ${adv.adverb}.`;

  return {
    topic: "Simple Present",
    question: `¿Cuál es la posición sintáctica correcta del adverbio de frecuencia '${adv.adverb}'?`,
    options: [
      { text: correctSentence },
      { text: wrong1 },
      { text: wrong2 },
      { text: wrong3 }
    ],
    correctAnswer: "a",
    explanation: `Regla de oro de la UTN: Los adverbios de frecuencia (${adv.adverb}) se colocan SIEMPRE ANTES del verbo principal (${verbPair.third}) y DESPUÉS del verbo To Be.`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generatePresentContinuousAction() {
  const isSingular = Math.random() > 0.5;
  const subj = isSingular 
    ? SUBJECTS_SINGULAR_3RD[Math.floor(Math.random() * SUBJECTS_SINGULAR_3RD.length)]
    : SUBJECTS_PLURAL[Math.floor(Math.random() * SUBJECTS_PLURAL.length)];
  const v = CONTINUOUS_VERBS[Math.floor(Math.random() * CONTINUOUS_VERBS.length)];
  const timeMarker = TIME_MARKERS_CONTINUOUS[Math.floor(Math.random() * TIME_MARKERS_CONTINUOUS.length)];

  const beAux = isSingular ? "is" : "are";
  const question = `${subj.text} _____ ${v.context} ${timeMarker}.`;

  const correctOpt = `${beAux} ${v.ing}`;
  const wrong1 = `${beAux} ${v.base}`;
  const wrong2 = isSingular ? v.base : `${v.base}s`;
  const wrong3 = `${beAux === 'is' ? 'are' : 'is'} ${v.ing}`;

  return {
    topic: "Present Continuous",
    question: question,
    options: [
      { text: correctOpt },
      { text: wrong1 },
      { text: wrong2 },
      { text: wrong3 }
    ],
    correctAnswer: "a",
    explanation: `El marcador temporal '${timeMarker}' indica una acción en progreso. En Presente Continuo la estructura es sujeto + verbo To Be (${beAux}) + verbo principal con -ing ('${v.ing}'). Regla ortográfica: ${v.rule}.`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generateStativeVerbTrap() {
  const stative = STATIVE_VERBS[Math.floor(Math.random() * STATIVE_VERBS.length)];
  const subj = SUBJECTS_SINGULAR_3RD[Math.floor(Math.random() * SUBJECTS_SINGULAR_3RD.length)];
  const timeMarker = TIME_MARKERS_CONTINUOUS[Math.floor(Math.random() * TIME_MARKERS_CONTINUOUS.length)];

  const question = `At this moment, ${subj.text} _____ ${stative.context}.`;

  return {
    topic: "Present Continuous",
    question: question,
    options: [
      { text: stative.third },
      { text: `is ${stative.verb}ing` },
      { text: `are ${stative.verb}ing` },
      { text: stative.verb }
    ],
    correctAnswer: "a",
    explanation: `¡Trampa clásica de examen! El verbo '${stative.verb}' (${stative.meaning}) es un Stative Verb (verbo de estado/percepción mental) y NUNCA se utiliza en tiempos continuos (-ing). Se conjuga obligatoriamente en Presente Simple: '${stative.third}'.`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generateSimpleVsContinuousContrast() {
  const subj = SUBJECTS_SINGULAR_3RD[Math.floor(Math.random() * SUBJECTS_SINGULAR_3RD.length)];
  const v1 = IT_VERB_PAIRS[Math.floor(Math.random() * 5)];
  const v2 = CONTINUOUS_VERBS[Math.floor(Math.random() * 5)];

  const question = `${subj.text} usually _____ ${v1.context}, but today he/she _____ ${v2.context}.`;

  const correct = `${v1.third} / is ${v2.ing}`;
  const wrong1 = `is ${v1.base}ing / ${v2.base}s`;
  const wrong2 = `${v1.base} / is ${v2.ing}`;
  const wrong3 = `${v1.third} / ${v2.base}s`;

  return {
    topic: "Simple Present vs Present Continuous",
    question: question,
    options: [
      { text: correct },
      { text: wrong1 },
      { text: wrong2 },
      { text: wrong3 }
    ],
    correctAnswer: "a",
    explanation: `'Usually' indica una rutina permanente (Presente Simple -> '${v1.third}'), mientras que 'today' indica una situación temporal/excepcional en progreso (Presente Continuo -> 'is ${v2.ing}').`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generatePastSimpleIrregular() {
  const verb = IRREGULAR_VERBS[Math.floor(Math.random() * IRREGULAR_VERBS.length)];
  const subj = SUBJECTS_SINGULAR_3RD[Math.floor(Math.random() * SUBJECTS_SINGULAR_3RD.length)];

  const timeExpressionsPast = [
    "yesterday",
    "last week",
    "two days ago",
    "in 2021",
    "during the previous sprint",
    "last month"
  ];
  const timeExpr = timeExpressionsPast[Math.floor(Math.random() * timeExpressionsPast.length)];

  const question = `${subj.text} _____ (${verb.base} - ${verb.translation}) the project requirements ${timeExpr}.`;

  // Crear distractores inteligentes: participio, base + ed errónea, base + s
  const wrongEd = `${verb.base}ed`;
  const wrongBase = verb.base;
  const wrongParticiple = verb.participle !== verb.past ? verb.participle : `${verb.base}s`;

  return {
    topic: "Past Simple",
    question: question,
    options: [
      { text: verb.past },
      { text: wrongEd },
      { text: wrongBase },
      { text: wrongParticiple }
    ],
    correctAnswer: "a",
    explanation: `'${verb.base}' es un verbo irregular. Su conjugación en Pasado Simple (Past) es '${verb.past}' (no '${wrongEd}').`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generatePastSimpleNegative() {
  const verb = IRREGULAR_VERBS[Math.floor(Math.random() * IRREGULAR_VERBS.length)];
  const subj = SUBJECTS_SINGULAR_3RD[Math.floor(Math.random() * SUBJECTS_SINGULAR_3RD.length)];

  const question = `${subj.text} didn't _____ (${verb.translation}) any errors in the deployment log.`;

  return {
    topic: "Past Simple",
    question: question,
    options: [
      { text: verb.base },
      { text: verb.past },
      { text: `${verb.base}ing` },
      { text: `${verb.base}s` }
    ],
    correctAnswer: "a",
    explanation: `Regla crítica de examen: En oraciones negativas en Pasado Simple con el auxiliar 'didn't', el verbo principal SIEMPRE va en su forma base infinitiva ('${verb.base}'), NUNCA en pasado ('${verb.past}').`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generatePastSimpleQuestion() {
  const verb = IRREGULAR_VERBS[Math.floor(Math.random() * IRREGULAR_VERBS.length)];
  
  const question = `_____ you _____ (${verb.translation}) the server backup before the maintenance?`;

  return {
    topic: "Past Simple",
    question: question,
    options: [
      { text: `Did / ${verb.base}` },
      { text: `Did / ${verb.past}` },
      { text: `Do / ${verb.past}` },
      { text: `Were / ${verb.base}` }
    ],
    correctAnswer: "a",
    explanation: `Para formular preguntas en Pasado Simple se utiliza el auxiliar 'Did' + sujeto + verbo en su forma base infinitiva ('${verb.base}').`,
    source: "Generador Espontáneo UTN 🎲"
  };
}

function generateITBusinessReading() {
  const readings = [
    {
      q: "What term describes when founders collect capital from investors before launching a startup?",
      correct: "Raise money",
      distractors: ["Step down", "Go bankrupt", "Go public"],
      exp: "'Raise money' significa recaudar fondos o capital de inversores para financiar una empresa o proyecto tecnológico."
    },
    {
      q: "In 2019, Larry Page and Sergey Brin decided to _____ as CEO and President of Alphabet, handing control to Sundar Pichai.",
      correct: "step down",
      distractors: ["raise money", "launch", "go bankrupt"],
      exp: "'Step down' es un phrasal verb que significa renunciar o dejar un cargo de liderazgo."
    },
    {
      q: "When a private tech company sells shares to the public on the stock market for the first time, it:",
      correct: "Goes public (IPO)",
      distractors: ["Steps down", "Goes bankrupt", "Merges"],
      exp: "'Go public' (hacer una IPO) significa comenzar a cotizar en la bolsa de valores."
    },
    {
      q: "Margaret Hamilton coined the term 'Software Engineering' while leading the software development for:",
      correct: "The Apollo 11 Lunar Module (AGC)",
      distractors: ["The ENIAC Computer", "Google Search Engine", "The IBM System/360"],
      exp: "Margaret Hamilton lideró el equipo del MIT que programó el software asíncrono del Apollo 11 de la NASA en 1969."
    },
    {
      q: "What was the initial name of Google's search engine algorithm developed at Stanford University?",
      correct: "BackRub",
      distractors: ["PageRanker", "AlphaSearch", "GooGleBot"],
      exp: "Sergey Brin y Larry Page crearon originalmente el motor de búsqueda bajo el nombre de 'BackRub' en 1996."
    },
    {
      q: "Why didn't the Apollo 11 computer crash when overloaded by radar signals during lunar landing in 1969?",
      correct: "Because Margaret Hamilton's software had an asynchronous priority scheduling mechanism",
      distractors: [
        "Because the computer had 128GB of RAM",
        "Because the radar was completely disconnected",
        "Because they restarted the operating system in mid-air"
      ],
      exp: "El software de Margaret Hamilton descartaba tareas de baja prioridad para concentrar los ciclos de CPU en los propulsores del alunizaje."
    },
    {
      q: "In business IT terminology, what does 'headquarters' mean?",
      correct: "The main office / primary central building of a company",
      distractors: [
        "A small branch office in another country",
        "A data storage server farm",
        "A group of four programmers"
      ],
      exp: "'Headquarters' (HQ) es la sede central o edificio principal de una compañía."
    }
  ];

  const r = readings[Math.floor(Math.random() * readings.length)];

  return {
    topic: "Historia IT & Vocabulario Empresarial",
    question: r.q,
    options: [
      { text: r.correct },
      ...r.distractors.map(d => ({ text: d }))
    ],
    correctAnswer: "a",
    explanation: r.exp,
    source: "Lecturas Oficiales UTN (Clases 5 y 6) 📚"
  };
}

// ----------------------------------------------------------------------------
// GENERADOR PRINCIPAL DE LOTE DE PREGUNTAS ESPONTÁNEAS
// ----------------------------------------------------------------------------

export function generateSpontaneousQuestions(count = 10, topic = 'all') {
  const generators = [];

  if (topic === 'all' || topic === 'Simple Present') {
    generators.push(generatePresentSimple3rdPerson);
    generators.push(generatePresentSimpleNegative);
    generators.push(generateFrequencyAdverbPosition);
  }

  if (topic === 'all' || topic === 'Present Continuous') {
    generators.push(generatePresentContinuousAction);
    generators.push(generateStativeVerbTrap);
  }

  if (topic === 'all' || topic === 'Simple Present vs Continuous' || topic === 'Simple Present vs Present Continuous') {
    generators.push(generateSimpleVsContinuousContrast);
  }

  if (topic === 'all' || topic === 'Past Simple') {
    generators.push(generatePastSimpleIrregular);
    generators.push(generatePastSimpleNegative);
    generators.push(generatePastSimpleQuestion);
  }

  if (topic === 'all' || topic.includes('Apollo') || topic.includes('Google') || topic.includes('Vocabulario')) {
    generators.push(generateITBusinessReading);
  }

  if (generators.length === 0) {
    generators.push(
      generatePresentSimple3rdPerson,
      generatePresentContinuousAction,
      generatePastSimpleIrregular,
      generateSimpleVsContinuousContrast,
      generateITBusinessReading
    );
  }

  const generatedList = [];
  for (let i = 0; i < count; i++) {
    const genFn = generators[Math.floor(Math.random() * generators.length)];
    const rawQuestion = genFn();
    
    // Asignar ID único dinámico y mezclar opciones
    const uniqueQuestion = {
      ...rawQuestion,
      id: 500000 + Math.floor(Math.random() * 400000) + i
    };

    // Barajar opciones aleatoriamente
    const finalizedQuestion = shuffleQuestionOptions(uniqueQuestion);
    generatedList.push(finalizedQuestion);
  }

  return generatedList;
}
