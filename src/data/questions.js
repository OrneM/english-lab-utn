// Banco de preguntas para el Simulador de Examen de Inglés Técnico I
// Basado estrictamente en los contenidos oficiales de Clases 1, 2, 4, 5 y 6 (UTN TUP).

export const EXAM_QUESTIONS = [
  // --- CLASE 1: SIMPLE PRESENT & ROUTINES ---
  {
    id: 1,
    topic: "Simple Present",
    question: "He _____ check emails at night.",
    options: [
      { id: "a", text: "isn't" },
      { id: "b", text: "don't" },
      { id: "c", text: "doesn't" },
      { id: "d", text: "not" }
    ],
    correctAnswer: "c",
    explanation: "En Presente Simple, para la tercera persona singular (He/She/It), el auxiliar negativo es 'doesn't' + verbo en infinitivo (check).",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 2,
    topic: "Simple Present",
    question: "As a front-end developer, I _____ to take care of the user interface.",
    options: [
      { id: "a", text: "need" },
      { id: "b", text: "needs" },
      { id: "c", text: "needed" },
      { id: "d", text: "needing" }
    ],
    correctAnswer: "a",
    explanation: "Con el pronombre 'I' en Presente Simple el verbo permanece en forma base ('need'). 'Needs' es solo para he/she/it.",
    source: "Unidad 1 Clase 1 Reading"
  },
  {
    id: 3,
    topic: "Simple Present",
    question: "What _____ you do for a living?",
    options: [
      { id: "a", text: "doing" },
      { id: "b", text: "do" },
      { id: "c", text: "done" },
      { id: "d", text: "are" }
    ],
    correctAnswer: "b",
    explanation: "Para formular preguntas en Presente Simple con el pronombre 'you', se utiliza el auxiliar 'do': 'What do you do...?'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 4,
    topic: "Simple Present",
    question: "What time _____ you start working in the morning?",
    options: [
      { id: "a", text: "do" },
      { id: "b", text: "is" },
      { id: "c", text: "does" },
      { id: "d", text: "are" }
    ],
    correctAnswer: "a",
    explanation: "Con el sujeto 'you' en preguntas de Presente Simple usamos 'do'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 5,
    topic: "Simple Present",
    question: "_____ programmers work in teams every day?",
    options: [
      { id: "a", text: "Do" },
      { id: "b", text: "Are" },
      { id: "c", text: "Does" },
      { id: "d", text: "Did" }
    ],
    correctAnswer: "a",
    explanation: "'Programmers' es plural (They), por lo que corresponde el auxiliar 'Do'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 6,
    topic: "Simple Present",
    question: "When a verb ends in consonant + 'y' (like 'study'), how do we form the 3rd person singular?",
    options: [
      { id: "a", text: "We just add -s (studys)" },
      { id: "b", text: "We change 'y' to -ies (studies)" },
      { id: "c", text: "We add -es (studyes)" },
      { id: "d", text: "The verb stays unchanged" }
    ],
    correctAnswer: "b",
    explanation: "Consonante + 'y' cambia a '-ies' en 3ra persona singular: study -> studies, modify -> modifies.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 7,
    topic: "Simple Present",
    question: "Where do frequency adverbs (always, usually, never) go with a main verb?",
    options: [
      { id: "a", text: "Before the main verb" },
      { id: "b", text: "At the very end of the sentence" },
      { id: "c", text: "After the direct object" },
      { id: "d", text: "Before the subject" }
    ],
    correctAnswer: "a",
    explanation: "Los adverbios de frecuencia van antes del verbo principal (ej: 'I usually check my emails', 'He often works from home').",
    source: "Unidad 1 Clase 1 Grammar"
  },

  // --- CLASE 2: IT JOBS & GREETINGS ---
  {
    id: 8,
    topic: "IT Vocabulary",
    question: "Which IT professional is primarily responsible for creating and testing code?",
    options: [
      { id: "a", text: "IT Support" },
      { id: "b", text: "Software Developer" },
      { id: "c", text: "UX Designer" },
      { id: "d", text: "Project Manager" }
    ],
    correctAnswer: "b",
    explanation: "Clase 2: 'Software Developer -> Creates and tests code'.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 9,
    topic: "IT Vocabulary",
    question: "A professional who designs easy-to-use interfaces is a...",
    options: [
      { id: "a", text: "UX Designer" },
      { id: "b", text: "Network Engineer" },
      { id: "c", text: "Systems Analyst" },
      { id: "d", text: "Data Analyst" }
    ],
    correctAnswer: "a",
    explanation: "Clase 2: 'UX Designer -> Designs easy-to-use interfaces'.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 10,
    topic: "IT Vocabulary",
    question: "Which professional helps with computer, hardware and network problems?",
    options: [
      { id: "a", text: "IT Support" },
      { id: "b", text: "Web Developer" },
      { id: "c", text: "Project Manager" },
      { id: "d", text: "Data Analyst" }
    ],
    correctAnswer: "a",
    explanation: "Clase 2: 'IT Support -> Helps with computer problems'.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 11,
    topic: "IT Vocabulary",
    question: "Which IT professional builds and maintains websites?",
    options: [
      { id: "a", text: "Web Developer" },
      { id: "b", text: "UX Designer" },
      { id: "c", text: "IT Support" },
      { id: "d", text: "Systems Analyst" }
    ],
    correctAnswer: "a",
    explanation: "Clase 2: 'Web Developer -> Builds and maintains websites'.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 12,
    topic: "Greetings & Communication",
    question: "Which of the following greetings is INFORMAL and suitable when meeting a friend?",
    options: [
      { id: "a", text: "Good morning, Mr. Smith." },
      { id: "b", text: "Hello, how can I help you?" },
      { id: "c", text: "Hey, what's up?" },
      { id: "d", text: "Nice to meet you, sir." }
    ],
    correctAnswer: "c",
    explanation: "'Hey, what's up?' y 'Hi there!' son saludos informales para amigos o compañeros.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 13,
    topic: "Greetings & Communication",
    question: "'Good morning, Mr. Smith' is an example of a greeting that is...",
    options: [
      { id: "a", text: "Formal (used when talking to your boss or in business meetings)" },
      { id: "b", text: "Informal (used only with friends)" },
      { id: "c", text: "Slang" },
      { id: "d", text: "Incorrect grammatically" }
    ],
    correctAnswer: "a",
    explanation: "Clase 2: 'Good morning, Mr. Smith' es Formal y se usa en situaciones laborales o con supervisores.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },

  // --- CLASE 4: PRESENT CONTINUOUS & CONTRAST ---
  {
    id: 14,
    topic: "Present Continuous",
    question: "We are _____ developing new projects now. They are too expensive!",
    options: [
      { id: "a", text: "no" },
      { id: "b", text: "not" },
      { id: "c", text: "don't" },
      { id: "d", text: "didn't" }
    ],
    correctAnswer: "b",
    explanation: "En Present Continuous la negación se forma con el verbo To Be + 'not' + verbo en -ing: 'We are not developing...'.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 15,
    topic: "Present Continuous",
    question: "They _____ fixing bugs at the moment.",
    options: [
      { id: "a", text: "not" },
      { id: "b", text: "doesn't" },
      { id: "c", text: "don't" },
      { id: "d", text: "aren't" }
    ],
    correctAnswer: "d",
    explanation: "La expresión 'at the moment' requiere Present Continuous con la forma negativa 'aren't' (are not) + fixing.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 16,
    topic: "Present Continuous",
    question: "Right now, she _____ a new app.",
    options: [
      { id: "a", text: "doesn't write" },
      { id: "b", text: "is writing" },
      { id: "c", text: "writes" },
      { id: "d", text: "wrote" }
    ],
    correctAnswer: "b",
    explanation: "'Right now' indica una acción en progreso en este instante exacto: 'is writing'.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 17,
    topic: "Simple Present vs Present Continuous",
    question: "I go to the office practically every day, but today I _____ from home.",
    options: [
      { id: "a", text: "working" },
      { id: "b", text: "is working" },
      { id: "c", text: "am working" },
      { id: "d", text: "work" }
    ],
    correctAnswer: "c",
    explanation: "Contraste entre rutina habitual ('every day' -> Simple Present) y una acción temporal hoy ('today' -> Present Continuous con 'am working').",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 18,
    topic: "Present Continuous",
    question: "What is the correct -ing form of the one-syllable verb 'sit' (consonant-vowel-consonant)?",
    options: [
      { id: "a", text: "siting" },
      { id: "b", text: "sitting" },
      { id: "c", text: "siteing" },
      { id: "d", text: "sitted" }
    ],
    correctAnswer: "b",
    explanation: "Verbo de 1 sílaba terminado en consonante + vocal + consonante duplica la consonante final: sit -> sitting.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 19,
    topic: "Present Continuous",
    question: "Which of the following verbs is a 'stative verb' and is NOT normally used in continuous (-ing) tenses?",
    options: [
      { id: "a", text: "code" },
      { id: "b", text: "know" },
      { id: "c", text: "write" },
      { id: "d", text: "watch" }
    ],
    correctAnswer: "b",
    explanation: "'Know', 'understand', 'need', 'want' son verbos de estado (stative verbs) que no se usan habitualmente con -ing.",
    source: "Unidad 1 Clase 4 Grammar"
  },

  // --- CLASE 5: PAST SIMPLE (REGULAR VERBS) & APONLO 11 / GRACE HOPPER ---
  {
    id: 20,
    topic: "Past Simple",
    question: "What is the correct past simple form of the regular verb 'stop'?",
    options: [
      { id: "a", text: "stoped" },
      { id: "b", text: "stopped" },
      { id: "c", text: "stopt" },
      { id: "d", text: "stopping" }
    ],
    correctAnswer: "b",
    explanation: "Verbos regulares de una sílaba terminados en C-V-C duplican la última consonante al agregar -ed: stop -> stopped, program -> programmed.",
    source: "Unidad 2 Clase 5 Grammar"
  },
  {
    id: 21,
    topic: "Past Simple",
    question: "Margaret Hamilton _____ mathematics at university and joined MIT in the 1960s.",
    options: [
      { id: "a", text: "study" },
      { id: "b", text: "studied" },
      { id: "c", text: "studying" },
      { id: "d", text: "studies" }
    ],
    correctAnswer: "b",
    explanation: "'Study' es un verbo regular que cambia la 'y' por 'i' + 'ed' en pasado simple: studied.",
    source: "Unidad 2 Clase 5 Reading"
  },
  {
    id: 22,
    topic: "Past Simple",
    question: "Margaret Hamilton led the team that created Apollo software and coined the term...",
    options: [
      { id: "a", text: "'software engineering'" },
      { id: "b", text: "'artificial intelligence'" },
      { id: "c", text: "'data science'" },
      { id: "d", text: "'cloud computing'" }
    ],
    correctAnswer: "a",
    explanation: "Margaret Hamilton acuñó el término 'software engineering' mientras desarrollaba el código de las misiones Apollo en el MIT.",
    source: "Unidad 2 Clase 5 Reading & Listening"
  },
  {
    id: 23,
    topic: "Past Simple",
    question: "How did Margaret Hamilton design the Apollo software to avoid system failure during overload?",
    options: [
      { id: "a", text: "As an asynchronous program with priority tasks" },
      { id: "b", text: "As a synchronous sequential loop" },
      { id: "c", text: "By shutting down the radar completely" },
      { id: "d", text: "By restarting the computer" }
    ],
    correctAnswer: "a",
    explanation: "Diseñó el software de forma asíncrona ('asynchronous') con pantallas de prioridad para que las tareas vitales interrumpieran a las secundarias.",
    source: "Unidad 2 Clase 5 Listening"
  },
  {
    id: 24,
    topic: "Past Simple",
    question: "Grace Hopper created one of the first compilers and helped develop the programming language...",
    options: [
      { id: "a", text: "COBOL" },
      { id: "b", text: "Python" },
      { id: "c", text: "JavaScript" },
      { id: "d", text: "C++" }
    ],
    correctAnswer: "a",
    explanation: "Grace Hopper desarrolló compiladores y fue clave en la creación del lenguaje COBOL.",
    source: "Unidad 2 Clase 5 Reading"
  },
  {
    id: 25,
    topic: "IT Vocabulary",
    question: "One reason Python became successful is its _____.",
    options: [
      { id: "a", text: "slowness" },
      { id: "b", text: "simplicity" },
      { id: "c", text: "confusion" },
      { id: "d", text: "difficulty" }
    ],
    correctAnswer: "b",
    explanation: "La historia de Python (Clase 5) resalta que su éxito se debe principalmente a su 'simplicity' (sintaxis simple y legible).",
    source: "Unidad 2 Clase 5 Reading"
  },
  {
    id: 26,
    topic: "IT Vocabulary",
    question: "To debug a program means...",
    options: [
      { id: "a", text: "to connect it to the internet" },
      { id: "b", text: "to find and fix errors" },
      { id: "c", text: "to delete all source files" },
      { id: "d", text: "to compile it into machine code" }
    ],
    correctAnswer: "b",
    explanation: "'Debug' (depurar) es el proceso de encontrar y solucionar errores (bugs) en el código.",
    source: "Unidad 2 Clase 5 Vocabulary"
  },
  {
    id: 27,
    topic: "IT Vocabulary",
    question: "To connect to a database means...",
    options: [
      { id: "a", text: "to link with a database or API" },
      { id: "b", text: "to compile a function" },
      { id: "c", text: "to close a program" },
      { id: "d", text: "to debug a file" }
    ],
    correctAnswer: "a",
    explanation: "Conectarse a una base de datos significa enlazar o comunicarse con la base de datos o API.",
    source: "Unidad 2 Clase 5 Vocabulary"
  },

  // --- CLASE 6: PAST SIMPLE (IRREGULAR VERBS) & GOOGLE EVOLUTION ---
  {
    id: 28,
    topic: "Past Simple",
    question: "I _____ the perfect job for me two years ago.",
    options: [
      { id: "a", text: "found" },
      { id: "b", text: "find" },
      { id: "c", text: "finded" },
      { id: "d", text: "was find" }
    ],
    correctAnswer: "a",
    explanation: "El pasado del verbo irregular 'find' es 'found'.",
    source: "Unidad 2 Clase 6 Grammar"
  },
  {
    id: 29,
    topic: "Past Simple",
    question: "Two years ago I _____ my company for 4 million dollars to a group of investors.",
    options: [
      { id: "a", text: "selled" },
      { id: "b", text: "sell" },
      { id: "c", text: "sold" },
      { id: "d", text: "was sold" }
    ],
    correctAnswer: "c",
    explanation: "El pasado simple del verbo irregular 'sell' es 'sold'.",
    source: "Unidad 2 Clase 6 Grammar"
  },
  {
    id: 30,
    topic: "Past Simple",
    question: "Sergey Brin and Larry Page _____ Google in 1998 after meeting at Stanford University.",
    options: [
      { id: "a", text: "began" },
      { id: "b", text: "becomed" },
      { id: "c", text: "became" },
      { id: "d", text: "created" }
    ],
    correctAnswer: "d",
    explanation: "En la lectura de la Clase 6 se señala que crearon Google ('created Google') tras conocerse en Stanford.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 31,
    topic: "Past Simple",
    question: "Which sentence is grammatically CORRECT in Past Simple negative?",
    options: [
      { id: "a", text: "She didn't wrote the documentation yesterday." },
      { id: "b", text: "She didn't write the documentation yesterday." },
      { id: "c", text: "She doesn't wrote the documentation yesterday." },
      { id: "d", text: "She not wrote the documentation yesterday." }
    ],
    correctAnswer: "b",
    explanation: "Con el auxiliar 'didn't' el verbo principal DEBE volver a su forma base infinitiva ('write', no 'wrote').",
    source: "Unidad 2 Clase 6 Grammar"
  },
  {
    id: 32,
    topic: "Business Vocabulary",
    question: "Before you _____ a new company, you need to have a clear idea of the product or service you want to offer to the market.",
    options: [
      { id: "a", text: "step down" },
      { id: "b", text: "launch" },
      { id: "c", text: "restructure" },
      { id: "d", text: "lack" }
    ],
    correctAnswer: "b",
    explanation: "'Launch' significa lanzar o poner en el mercado una empresa o producto.",
    source: "Unidad 2 Clase 6 Vocabulary"
  },
  {
    id: 33,
    topic: "Business Vocabulary",
    question: "If you want to start your own business and you're not a rich person, you need to _____ some money first!",
    options: [
      { id: "a", text: "raise" },
      { id: "b", text: "lack" },
      { id: "c", text: "launch" },
      { id: "d", text: "step down" }
    ],
    correctAnswer: "a",
    explanation: "'To raise money' significa recaudar o conseguir fondos de inversores.",
    source: "Unidad 2 Clase 6 Vocabulary"
  },
  {
    id: 34,
    topic: "Business Vocabulary",
    question: "The CEO of the company decided to _____ because he wanted to retire and spend time with his family.",
    options: [
      { id: "a", text: "raise" },
      { id: "b", text: "step down" },
      { id: "c", text: "restructure" },
      { id: "d", text: "purchase" }
    ],
    correctAnswer: "b",
    explanation: "'Step down' significa retirarse o renunciar a un cargo de liderazgo.",
    source: "Unidad 2 Clase 6 Vocabulary"
  },
  {
    id: 35,
    topic: "Business Vocabulary",
    question: "In 2006, Google _____ YouTube for $1.65 billion in stock.",
    options: [
      { id: "a", text: "purchased" },
      { id: "b", text: "stepped down" },
      { id: "c", text: "restructured" },
      { id: "d", text: "lacked" }
    ],
    correctAnswer: "a",
    explanation: "'To purchase' significa comprar o adquirir una compañía o activo.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 36,
    topic: "Business Vocabulary",
    question: "When a company's stock is made available for the general public to buy for the first time, it is called an...",
    options: [
      { id: "a", text: "Initial Public Offering (IPO)" },
      { id: "b", text: "Asynchronous meeting" },
      { id: "c", text: "IT Support ticket" },
      { id: "d", text: "API endpoint" }
    ],
    correctAnswer: "a",
    explanation: "Clase 6: Initial Public Offering (IPO) es la primera venta de acciones de una empresa al público general.",
    source: "Unidad 2 Clase 6 Vocabulary"
  }
];
