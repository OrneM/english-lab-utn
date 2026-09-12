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
  },
  // --- PREGUNTAS EXPANDIDAS (CLASES 1 A 6) ---
  {
    id: 37,
    topic: "Simple Present vs Present Continuous",
    question: "Listen! The server alarm _____ . We need to check the logs immediately.",
    options: [
      { id: "a", text: "rings" },
      { id: "b", text: "is ringing" },
      { id: "c", text: "rang" },
      { id: "d", text: "ring" }
    ],
    correctAnswer: "b",
    explanation: "El llamado de atención 'Listen!' indica una acción que está sucediendo en este preciso momento, por lo que se utiliza Present Continuous: 'is ringing'.",
    source: "Unidad 1 Clase 4 Contrast"
  },
  {
    id: 38,
    topic: "Simple Present vs Present Continuous",
    question: "I _____ how this algorithm works, but I am still testing edge cases.",
    options: [
      { id: "a", text: "am understanding" },
      { id: "b", text: "understand" },
      { id: "c", text: "understood" },
      { id: "d", text: "understands" }
    ],
    correctAnswer: "b",
    explanation: "'Understand' es un Stative Verb (verbo de estado/pensamiento) y NO se utiliza con terminación -ing en tiempos continuos.",
    source: "Unidad 1 Clase 4 Stative Verbs"
  },
  {
    id: 39,
    topic: "Simple Present",
    question: "The junior developer _____ the database backup every Friday afternoon.",
    options: [
      { id: "a", text: "run" },
      { id: "b", text: "runs" },
      { id: "c", text: "is running" },
      { id: "d", text: "running" }
    ],
    correctAnswer: "b",
    explanation: "'The junior developer' es 3ra persona singular (He/She) y 'every Friday' indica hábito/rutina, por lo que el verbo lleva '-s': 'runs'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 40,
    topic: "Past Simple",
    question: "Where _____ Grace Hopper invent the first compiler?",
    options: [
      { id: "a", text: "did" },
      { id: "b", text: "was" },
      { id: "c", text: "does" },
      { id: "d", text: "had" }
    ],
    correctAnswer: "a",
    explanation: "En preguntas de Pasado Simple con verbo principal de acción ('invent'), el auxiliar correcto es 'did'.",
    source: "Unidad 2 Clase 5 Grammar"
  },
  {
    id: 41,
    topic: "Past Simple",
    question: "They _____ the new version to production because the automated tests failed.",
    options: [
      { id: "a", text: "didn't deployed" },
      { id: "b", text: "didn't deploy" },
      { id: "c", text: "not deploy" },
      { id: "d", text: "weren't deploy" }
    ],
    correctAnswer: "b",
    explanation: "Regla fundamental del Pasado Simple: después del auxiliar 'didn't', el verbo principal SIEMPRE va en su forma base/infinitivo ('deploy').",
    source: "Unidad 2 Clase 5 Grammar"
  },
  {
    id: 42,
    topic: "Irregular Verbs",
    question: "What is the past simple form of the verb 'TEACH'?",
    options: [
      { id: "a", text: "teached" },
      { id: "b", text: "taught" },
      { id: "c", text: "thought" },
      { id: "d", text: "took" }
    ],
    correctAnswer: "b",
    explanation: "El verbo irregular 'teach' (enseñar) conjuga en Pasado Simple como 'taught'.",
    source: "Unidad 2 Clase 5 Irregular Verbs"
  },
  {
    id: 43,
    topic: "Irregular Verbs",
    question: "What is the past simple form of the verb 'BUILD'?",
    options: [
      { id: "a", text: "builded" },
      { id: "b", text: "built" },
      { id: "c", text: "bolted" },
      { id: "d", text: "bought" }
    ],
    correctAnswer: "b",
    explanation: "El verbo irregular 'build' (construir/compilar) cambia la 'd' por 't' en Pasado Simple: 'built'.",
    source: "Unidad 2 Clase 5 Irregular Verbs"
  },
  {
    id: 44,
    topic: "Irregular Verbs",
    question: "What is the past simple form of the verb 'BECOME'?",
    options: [
      { id: "a", text: "becomed" },
      { id: "b", text: "became" },
      { id: "c", text: "becoming" },
      { id: "d", text: "began" }
    ],
    correctAnswer: "b",
    explanation: "El verbo 'become' (convertirse en/llegar a ser) conjuga en Pasado Simple como 'became'.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 45,
    topic: "Present Continuous",
    question: "Select the correct spelling of 'RUN' with the -ing ending:",
    options: [
      { id: "a", text: "runing" },
      { id: "b", text: "running" },
      { id: "c", text: "runneing" },
      { id: "d", text: "runnying" }
    ],
    correctAnswer: "b",
    explanation: "Regla CVC (Consonante-Vocal-Consonante): un verbo monosilábico terminado en CVC duplica la consonante final antes de -ing: run -> running.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 46,
    topic: "Present Continuous",
    question: "Select the correct spelling of 'DIE' with the -ing ending:",
    options: [
      { id: "a", text: "dieing" },
      { id: "b", text: "dying" },
      { id: "c", text: "dyeing" },
      { id: "d", text: "diing" }
    ],
    correctAnswer: "b",
    explanation: "Los verbos terminados en '-ie' cambian esa terminación por 'y' antes de agregar '-ing': die -> dying, lie -> lying.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 47,
    topic: "Present Continuous",
    question: "Select the correct spelling of 'DEVELOP' with the -ing ending:",
    options: [
      { id: "a", text: "developping" },
      { id: "b", text: "developing" },
      { id: "c", text: "developying" },
      { id: "d", text: "developin" }
    ],
    correctAnswer: "b",
    explanation: "En 'develop', el acento recae en la segunda sílaba (de-VE-lop), no en la última; por lo tanto, NO se duplica la 'p' final: 'developing'.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 48,
    topic: "IT Reading (Apollo 11)",
    question: "Why was Margaret Hamilton's software described as 'asynchronous'?",
    options: [
      { id: "a", text: "Because it ran without any electricity" },
      { id: "b", text: "Because tasks could run independently based on priority rather than a fixed order" },
      { id: "c", text: "Because it only operated when the astronauts were asleep" },
      { id: "d", text: "Because it was written in Python" }
    ],
    correctAnswer: "b",
    explanation: "Clase 5: El software asíncrono permitía ejecutar tareas en función de su prioridad en tiempo real en lugar de esperar una secuencia rígida.",
    source: "Unidad 2 Clase 5 Reading"
  },
  {
    id: 49,
    topic: "IT Reading (Apollo 11)",
    question: "What happened to the radar during Apollo 11's lunar descent in 1969?",
    options: [
      { id: "a", text: "It broke down completely and caught fire" },
      { id: "b", text: "It was in the wrong switch position, overloading the computer with unwanted data" },
      { id: "c", text: "It lost connection with the Earth station" },
      { id: "d", text: "It deleted the navigation program" }
    ],
    correctAnswer: "b",
    explanation: "Clase 5: El interruptor del radar de aproximación estaba en una posición incorrecta, enviando datos innecesarios y sobrecargando el ordenador.",
    source: "Unidad 2 Clase 5 Reading"
  },
  {
    id: 50,
    topic: "IT Reading (Apollo 11)",
    question: "What award did President Barack Obama give to Margaret Hamilton in 2016?",
    options: [
      { id: "a", text: "The Nobel Prize in Physics" },
      { id: "b", text: "The Presidential Medal of Freedom" },
      { id: "c", text: "The Turing Award" },
      { id: "d", text: "The Apollo Gold Trophy" }
    ],
    correctAnswer: "b",
    explanation: "Clase 5: En 2016, Margaret Hamilton recibió la Presidential Medal of Freedom por sus aportes pioneros al alunizaje y a la ingeniería de software.",
    source: "Unidad 2 Clase 5 Reading"
  },
  {
    id: 51,
    topic: "IT Reading (Google)",
    question: "Where were Larry Page and Sergey Brin studying when they conceived the idea of Google?",
    options: [
      { id: "a", text: "MIT" },
      { id: "b", text: "Harvard University" },
      { id: "c", text: "Stanford University" },
      { id: "d", text: "University of Oxford" }
    ],
    correctAnswer: "c",
    explanation: "Clase 6: Brin y Page eran estudiantes de posgrado en Stanford University (California) cuando desarrollaron el motor de búsqueda.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 52,
    topic: "IT Reading (Google)",
    question: "What was the initial name of Google's search engine project before adopting the name Google?",
    options: [
      { id: "a", text: "Backrub" },
      { id: "b", text: "PageRanker" },
      { id: "c", text: "WebCrawler" },
      { id: "d", text: "StanfordSearch" }
    ],
    correctAnswer: "a",
    explanation: "Clase 6: El proyecto inicial se llamó 'Backrub' porque analizaba los enlaces hacia atrás (backlinks) de las páginas web.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 53,
    topic: "IT Reading (Google)",
    question: "How much initial money did Brin and Page raise from investors, family, and friends in 1998?",
    options: [
      { id: "a", text: "$100,000" },
      { id: "b", text: "$1 million" },
      { id: "c", text: "$50 million" },
      { id: "d", text: "$1.65 billion" }
    ],
    correctAnswer: "b",
    explanation: "Clase 6: Recaudaron aproximadamente $1 millón de dólares (incluyendo el famoso cheque de Andy Bechtolsheim) para fundar Google Inc.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 54,
    topic: "IT Reading (Google)",
    question: "In 2015, Google restructured its operations and created a parent company called...",
    options: [
      { id: "a", text: "Meta" },
      { id: "b", text: "Alphabet" },
      { id: "c", text: "Omnicom" },
      { id: "d", text: "Silicon Holdings" }
    ],
    correctAnswer: "b",
    explanation: "Clase 6: En 2015, Google creó 'Alphabet Inc.' como empresa matriz de Google y sus subsidiarias de innovación.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 55,
    topic: "IT Roles & Vocabulary",
    question: "A professional whose main responsibility is designing user interfaces, mockups, and wireframes is a...",
    options: [
      { id: "a", text: "Database Administrator" },
      { id: "b", text: "UX/UI Designer" },
      { id: "c", text: "Network Engineer" },
      { id: "d", text: "Systems Analyst" }
    ],
    correctAnswer: "b",
    explanation: "Clase 2: El UX/UI Designer es el encargado de la experiencia visual y diseño de interfaz de usuario.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 56,
    topic: "IT Roles & Vocabulary",
    question: "Who is responsible for organizing daily standup meetings, tracking deadlines, and coordinating team tasks?",
    options: [
      { id: "a", text: "Project Manager" },
      { id: "b", text: "Junior Developer" },
      { id: "c", text: "IT Support Technician" },
      { id: "d", text: "QA Intern" }
    ],
    correctAnswer: "a",
    explanation: "Clase 2: El Project Manager gestiona el cronograma, entregables y asignación de tareas del equipo.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 57,
    topic: "Greetings & Register",
    question: "Which greeting is the most appropriate and formal when addressing a professor or prospective client?",
    options: [
      { id: "a", text: "What's up, bro?" },
      { id: "b", text: "Dear Professor Johnson," },
      { id: "c", text: "Hey there!" },
      { id: "d", text: "See ya later!" }
    ],
    correctAnswer: "b",
    explanation: "Clase 2: 'Dear + Título/Apellido' es el saludo formal estándar por escrito para ámbitos académicos y profesionales.",
    source: "Unidad 1 Clase 2 Register"
  },
  {
    id: 58,
    topic: "Greetings & Register",
    question: "Which informal phrase is commonly used by developers to say goodbye on Slack or Discord?",
    options: [
      { id: "a", text: "Yours faithfully," },
      { id: "b", text: "Catch you later!" },
      { id: "c", text: "To whom it may concern," },
      { id: "d", text: "Sincerely," }
    ],
    correctAnswer: "b",
    explanation: "Clase 2: 'Catch you later!' es una despedida casual e informal entre colegas de trabajo.",
    source: "Unidad 1 Clase 2 Register"
  },
  {
    id: 59,
    topic: "Simple Present",
    question: "The software tester _____ bugs before the sprint deadline.",
    options: [
      { id: "a", text: "report" },
      { id: "b", text: "reports" },
      { id: "c", text: "is reporting" },
      { id: "d", text: "reported" }
    ],
    correctAnswer: "b",
    explanation: "'The software tester' (3ra persona singular) requiere la desinencia '-s' en Presente Simple: 'reports'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 60,
    topic: "Simple Present",
    question: "He _____ his work computer every evening before leaving the office.",
    options: [
      { id: "a", text: "locks" },
      { id: "b", text: "lock" },
      { id: "c", text: "locking" },
      { id: "d", text: "is locking" }
    ],
    correctAnswer: "a",
    explanation: "Para 'He' en Presente Simple afirmativo añadimos '-s': 'locks'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 61,
    topic: "Simple Present",
    question: "She _____ multiple servers using Docker containers.",
    options: [
      { id: "a", text: "manage" },
      { id: "b", text: "manages" },
      { id: "c", text: "managing" },
      { id: "d", text: "are manage" }
    ],
    correctAnswer: "b",
    explanation: "Sujeto 'She' + verbo terminado en 'e' (manage) -> agrega '-s': 'manages'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 62,
    topic: "Simple Present",
    question: "Why _____ the application crash when handling large datasets?",
    options: [
      { id: "a", text: "is" },
      { id: "b", text: "does" },
      { id: "c", text: "do" },
      { id: "d", text: "are" }
    ],
    correctAnswer: "b",
    explanation: "'The application' es 'It' (3ra persona singular), por lo que la pregunta en Presente Simple utiliza 'does'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 63,
    topic: "Present Continuous",
    question: "Right now, our team _____ the legacy database to PostgreSQL.",
    options: [
      { id: "a", text: "migrates" },
      { id: "b", text: "is migrating" },
      { id: "c", text: "migrated" },
      { id: "d", text: "migrate" }
    ],
    correctAnswer: "b",
    explanation: "'Right now' expresa una acción en desarrollo actual: 'is migrating' (Present Continuous).",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 64,
    topic: "Present Continuous",
    question: "Why are you _____ at your monitor with that confused face?",
    options: [
      { id: "a", text: "look" },
      { id: "b", text: "looking" },
      { id: "c", text: "looks" },
      { id: "d", text: "looked" }
    ],
    correctAnswer: "b",
    explanation: "La estructura interrogativa en Present Continuous es: 'Wh + are + sujeto + verbo-ing': 'Why are you looking...'.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 65,
    topic: "Past Simple",
    question: "In 1998, Google _____ only a few queries per day from a small garage.",
    options: [
      { id: "a", text: "processed" },
      { id: "b", text: "processes" },
      { id: "c", text: "is processing" },
      { id: "d", text: "process" }
    ],
    correctAnswer: "a",
    explanation: "'In 1998' es una fecha pasada específica que exige Pasado Simple: 'processed' (verbo regular + ed).",
    source: "Unidad 2 Clase 6 Grammar"
  },
  {
    id: 66,
    topic: "Past Simple",
    question: "We _____ that our unit tests would catch all memory leaks, but we were wrong.",
    options: [
      { id: "a", text: "thinked" },
      { id: "b", text: "thought" },
      { id: "c", text: "thinks" },
      { id: "d", text: "thinking" }
    ],
    correctAnswer: "b",
    explanation: "El pasado irregular de 'think' (pensar/creer) es 'thought'. 'Thinked' no existe en inglés.",
    source: "Unidad 2 Clase 5 Irregular Verbs"
  },
  {
    id: 67,
    topic: "Past Simple",
    question: "The engineer _____ the pull request after reviewing the code changes.",
    options: [
      { id: "a", text: "merged" },
      { id: "b", text: "merge" },
      { id: "c", text: "merging" },
      { id: "d", text: "merges" }
    ],
    correctAnswer: "a",
    explanation: "Verbo regular terminado en 'e' (merge) -> solo agrega '-d' para formar el pasado simple: 'merged'.",
    source: "Unidad 2 Clase 5 Regular Verbs"
  },
  {
    id: 68,
    topic: "Past Simple",
    question: "Did you _____ the error message in the console before restarting the server?",
    options: [
      { id: "a", text: "saw" },
      { id: "b", text: "see" },
      { id: "c", text: "seen" },
      { id: "d", text: "seeing" }
    ],
    correctAnswer: "b",
    explanation: "En preguntas con 'Did', el verbo principal siempre vuelve a su forma base 'see'.",
    source: "Unidad 2 Clase 5 Grammar"
  },
  {
    id: 69,
    topic: "Irregular Verbs",
    question: "What is the past simple form of 'FIND'?",
    options: [
      { id: "a", text: "finded" },
      { id: "b", text: "found" },
      { id: "c", text: "founded" },
      { id: "d", text: "fond" }
    ],
    correctAnswer: "b",
    explanation: "El verbo irregular 'find' (encontrar) conjuga en Pasado Simple como 'found'. ('Founded' es el pasado de 'found', que significa fundar).",
    source: "Unidad 2 Clase 5 Irregular Verbs"
  },
  {
    id: 70,
    topic: "Irregular Verbs",
    question: "What is the past simple form of 'SELL'?",
    options: [
      { id: "a", text: "selled" },
      { id: "b", text: "sold" },
      { id: "c", text: "sale" },
      { id: "d", text: "saled" }
    ],
    correctAnswer: "b",
    explanation: "El verbo irregular 'sell' (vender) conjuga en Pasado Simple como 'sold'.",
    source: "Unidad 2 Clase 6 Irregular Verbs"
  },
  {
    id: 71,
    topic: "Irregular Verbs",
    question: "What is the past simple form of 'RUN'?",
    options: [
      { id: "a", text: "runned" },
      { id: "b", text: "ran" },
      { id: "c", text: "run" },
      { id: "d", text: "ron" }
    ],
    correctAnswer: "b",
    explanation: "El verbo irregular 'run' (ejecutar/correr) conjuga en Pasado Simple como 'ran'.",
    source: "Unidad 2 Clase 5 Irregular Verbs"
  },
  {
    id: 72,
    topic: "Irregular Verbs",
    question: "What is the past simple form of 'SPEAK'?",
    options: [
      { id: "a", text: "speaked" },
      { id: "b", text: "spoke" },
      { id: "c", text: "spoken" },
      { id: "d", text: "spaked" }
    ],
    correctAnswer: "b",
    explanation: "El verbo irregular 'speak' (hablar) conjuga en Pasado Simple como 'spoke'.",
    source: "Unidad 2 Clase 5 Irregular Verbs"
  },
  {
    id: 73,
    topic: "Irregular Verbs",
    question: "What is the past simple form of 'HOLD'?",
    options: [
      { id: "a", text: "holded" },
      { id: "b", text: "held" },
      { id: "c", text: "halt" },
      { id: "d", text: "hold" }
    ],
    correctAnswer: "b",
    explanation: "El verbo irregular 'hold' (llevar a cabo / sostener / 'hold an IPO') conjuga en Pasado Simple como 'held'.",
    source: "Unidad 2 Clase 6 Irregular Verbs"
  },
  {
    id: 74,
    topic: "Stative Verbs",
    question: "Which of the following verbs is a STATIVE VERB (does NOT take -ing)?",
    options: [
      { id: "a", text: "program" },
      { id: "b", text: "belong" },
      { id: "c", text: "type" },
      { id: "d", text: "deploy" }
    ],
    correctAnswer: "b",
    explanation: "'Belong' (pertenecer) es un verbo de posesión/estado y no se conjuga en tiempos continuos.",
    source: "Unidad 1 Clase 4 Stative Verbs"
  },
  {
    id: 75,
    topic: "Stative Verbs",
    question: "Which sentence is grammatically CORRECT according to English rules?",
    options: [
      { id: "a", text: "I am knowing the answer to this exam question." },
      { id: "b", text: "I know the answer to this exam question." },
      { id: "c", text: "I knowing the answer to this exam question." },
      { id: "d", text: "I am know the answer to this exam question." }
    ],
    correctAnswer: "b",
    explanation: "'Know' es un Stative Verb de conocimiento y nunca lleva forma continua: 'I know' es la forma correcta.",
    source: "Unidad 1 Clase 4 Stative Verbs"
  },
  {
    id: 76,
    topic: "Adverbs of Frequency",
    question: "Select the sentence with the CORRECT adverb placement:",
    options: [
      { id: "a", text: "She tests always her code before committing." },
      { id: "b", text: "She always tests her code before committing." },
      { id: "c", text: "Always she tests her code before committing." },
      { id: "d", text: "She tests her code always before committing." }
    ],
    correctAnswer: "b",
    explanation: "Los adverbios de frecuencia (always, usually, often, never) se colocan ANTES del verbo principal: 'She always tests...'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 77,
    topic: "Adverbs of Frequency",
    question: "Where does the adverb 'often' go when the main verb is 'TO BE'?",
    options: [
      { id: "a", text: "Before 'to be' (He often is late)" },
      { id: "b", text: "AFTER 'to be' (He is often late)" },
      { id: "c", text: "At the beginning of the question only" },
      { id: "d", text: "Frequency adverbs cannot be used with 'to be'" }
    ],
    correctAnswer: "b",
    explanation: "Con el verbo 'to be' (am, is, are, was, were), el adverbio de frecuencia se coloca DESPUÉS del verbo: 'The server is often overloaded'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 78,
    topic: "Business Vocabulary",
    question: "The Google Glass wearable project failed with everyday consumers due to a _____ clear everyday purpose.",
    options: [
      { id: "a", text: "step down of" },
      { id: "b", text: "lack of" },
      { id: "c", text: "raise of" },
      { id: "d", text: "purchase of" }
    ],
    correctAnswer: "b",
    explanation: "Clase 6: 'Lack of' significa falta o carencia de algo ('lack of clear purpose').",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 79,
    topic: "Business Vocabulary",
    question: "Although consumer sales were discontinued, Google Glass found practical applications in...",
    options: [
      { id: "a", text: "Space rocket launches" },
      { id: "b", text: "Healthcare and factory manufacturing" },
      { id: "c", text: "Undersea cable maintenance" },
      { id: "d", text: "Video game consoles" }
    ],
    correctAnswer: "b",
    explanation: "Clase 6: El texto señala que Google Glass encontró un nicho productivo en 'healthcare' (medicina) e industrias manufactureras.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 80,
    topic: "IT Reading (Google)",
    question: "Who were the largest individual shareholders when Google went public in 2004?",
    options: [
      { id: "a", text: "Bill Gates and Steve Jobs" },
      { id: "b", text: "Larry Page and Sergey Brin" },
      { id: "c", text: "Andy Bechtolsheim and Eric Schmidt" },
      { id: "d", text: "Stanford University Board" }
    ],
    correctAnswer: "b",
    explanation: "Clase 6: Brin y Page eran y continuaron siendo los mayores accionistas individuales tras la IPO de 2004.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 81,
    topic: "Simple Present",
    question: "_____ your company provide health insurance for software developers?",
    options: [
      { id: "a", text: "Do" },
      { id: "b", text: "Does" },
      { id: "c", text: "Is" },
      { id: "d", text: "Are" }
    ],
    correctAnswer: "b",
    explanation: "'Your company' es singular (It), por lo que la pregunta en Presente Simple se construye con el auxiliar 'Does'.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 82,
    topic: "Past Simple",
    question: "When Margaret Hamilton _____ the software, she created prioritized task management.",
    options: [
      { id: "a", text: "design" },
      { id: "b", text: "designed" },
      { id: "c", text: "designing" },
      { id: "d", text: "is designing" }
    ],
    correctAnswer: "b",
    explanation: "Relato histórico en Pasado Simple: verbo regular 'design' + 'ed' -> 'designed'.",
    source: "Unidad 2 Clase 5 Reading"
  },
  {
    id: 83,
    topic: "Simple Present vs Present Continuous",
    question: "I usually _____ coffee while coding, but today I _____ green tea.",
    options: [
      { id: "a", text: "drink / am drinking" },
      { id: "b", text: "am drinking / drink" },
      { id: "c", text: "drinks / drinks" },
      { id: "d", text: "drank / drink" }
    ],
    correctAnswer: "a",
    explanation: "'Usually' marca rutina en Present Simple ('I drink'), mientras que 'today' marca la excepción temporal en Present Continuous ('I am drinking').",
    source: "Unidad 1 Clase 4 Contrast"
  },
  {
    id: 84,
    topic: "IT Roles & Vocabulary",
    question: "An engineer who sets up routers, switches, firewalls, and subnets is called a...",
    options: [
      { id: "a", text: "UX Designer" },
      { id: "b", text: "Network Engineer" },
      { id: "c", text: "Frontend Developer" },
      { id: "d", text: "Scrum Master" }
    ],
    correctAnswer: "b",
    explanation: "Clase 2: El Network Engineer (ingeniero de redes) se encarga de la infraestructura de conectividad y seguridad de red.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 85,
    topic: "Past Simple",
    question: "Sergey Brin and Larry Page _____ in 1995 during a campus tour at Stanford.",
    options: [
      { id: "a", text: "meet" },
      { id: "b", text: "met" },
      { id: "c", text: "meeting" },
      { id: "d", text: "meeted" }
    ],
    correctAnswer: "b",
    explanation: "El verbo irregular 'meet' (conocerse/reunirse) conjuga en Pasado Simple como 'met'.",
    source: "Unidad 2 Clase 6 Reading"
  }
];

