// Banco de preguntas para el Simulador de Examen de Inglés Técnico
// Extraído estrictamente del archivo 'formato de ejercicios.pdf' (Primer Parcial UTN TUP)
// y complementado con los contenidos de las Clases 1, 2, 4, 5 y 6.

export const EXAM_QUESTIONS = [
  // --- PREGUNTAS DEL ARCHIVO OFICIAL FORMATO DE EJERCICIOS (1 a 25) ---
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
    explanation: "En Simple Present, para la tercera persona del singular (He/She/It), el auxiliar negativo es 'doesn't' seguido del verbo en forma base (check).",
    source: "Primer Parcial - Pregunta 1"
  },
  {
    id: 2,
    topic: "Vocabulary IT / Business",
    question: "Before you _____ a new company, you need to have a clear idea of the product or service you want to offer to the market.",
    options: [
      { id: "a", text: "step down" },
      { id: "b", text: "launch" },
      { id: "c", text: "restructure" },
      { id: "d", text: "lack" }
    ],
    correctAnswer: "b",
    explanation: "'Launch' significa lanzar o comenzar un producto o compañía al mercado. 'Step down' es renunciar o retirarse, y 'restructure' es reorganizar.",
    source: "Primer Parcial - Pregunta 2 / Unidad 2 Clase 6"
  },
  {
    id: 3,
    topic: "Past Simple",
    question: "I _____ the perfect job for me two years ago.",
    options: [
      { id: "a", text: "found" },
      { id: "b", text: "find" },
      { id: "c", text: "finded" },
      { id: "d", text: "was find" }
    ],
    correctAnswer: "a",
    explanation: "'Find' es un verbo irregular cuyo pasado simple es 'found' ('finded' no existe). La expresión 'two years ago' indica pasado simple.",
    source: "Primer Parcial - Pregunta 3 / Unidad 2 Clase 6"
  },
  {
    id: 4,
    topic: "Grammar / Existence",
    question: "_____ are two big servers in the server farm.",
    options: [
      { id: "a", text: "It" },
      { id: "b", text: "There" },
      { id: "c", text: "The" },
      { id: "d", text: "They" }
    ],
    correctAnswer: "b",
    explanation: "Para indicar existencia en plural se utiliza la estructura 'There are' (Hay).",
    source: "Primer Parcial - Pregunta 4"
  },
  {
    id: 5,
    topic: "Vocabulary IT / Python",
    question: "The function print in Python is used to...",
    options: [
      { id: "a", text: "display information on the screen" },
      { id: "b", text: "calculate complex numbers only" },
      { id: "c", text: "save files" },
      { id: "d", text: "open a database" }
    ],
    correctAnswer: "a",
    explanation: "En Python y programación general, la función 'print()' se utiliza para mostrar información o salidas en la pantalla / consola.",
    source: "Primer Parcial - Pregunta 5 / Unidad 2 Clase 5"
  },
  {
    id: 6,
    topic: "Simple Present",
    question: "As a front end developer, I _____ to take care of the user interface.",
    options: [
      { id: "a", text: "need" },
      { id: "b", text: "needs" },
      { id: "c", text: "needed" },
      { id: "d", text: "needing" }
    ],
    correctAnswer: "a",
    explanation: "Con el pronombre 'I' en Presente Simple, el verbo va en forma base ('need'). La forma 'needs' es exclusiva para 3ra persona (he/she/it).",
    source: "Primer Parcial - Pregunta 6 / Unidad 1 Clase 1"
  },
  {
    id: 7,
    topic: "Simple Present / Questions",
    question: "What _____ you do for a living?",
    options: [
      { id: "a", text: "doing" },
      { id: "b", text: "do" },
      { id: "c", text: "done" },
      { id: "d", text: "are" }
    ],
    correctAnswer: "b",
    explanation: "Para formular preguntas en Presente Simple con 'you', se utiliza el auxiliar 'do': 'What do you do for a living?' (¿A qué te dedicas?).",
    source: "Primer Parcial - Pregunta 7 / Unidad 1 Clase 1"
  },
  {
    id: 8,
    topic: "Comparatives & Superlatives",
    question: "How do we form the superlative of short adjectives?",
    options: [
      { id: "a", text: "Use 'very' before the adjective" },
      { id: "b", text: "Add 'most' before the adjective" },
      { id: "c", text: "Add '-est' and use 'the'" },
      { id: "d", text: "Add 'more' before the adjective and use 'the'" }
    ],
    correctAnswer: "c",
    explanation: "Para formar el superlativo de adjetivos cortos (una sílaba), se antepone el artículo 'the' y se añade el sufijo '-est' (ej: the fastest, the dullest, the oldest).",
    source: "Primer Parcial - Pregunta 8"
  },
  {
    id: 9,
    topic: "Modals / Abilities",
    question: "My brother _____ swim very well.",
    options: [
      { id: "a", text: "can" },
      { id: "b", text: "cans" },
      { id: "c", text: "to can" },
      { id: "d", text: "is can" }
    ],
    correctAnswer: "a",
    explanation: "El verbo modal 'can' no cambia en 3ra persona (nunca lleva 's' ni 'to'): siempre es 'can' seguido del verbo en infinitivo sin 'to'.",
    source: "Primer Parcial - Pregunta 9"
  },
  {
    id: 10,
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
    source: "Primer Parcial - Pregunta 10 / Unidad 1 Clase 4"
  },
  {
    id: 11,
    topic: "Simple Present / Questions",
    question: "What time _____ you start working in the morning?",
    options: [
      { id: "a", text: "do" },
      { id: "b", text: "is" },
      { id: "c", text: "does" },
      { id: "d", text: "are" }
    ],
    correctAnswer: "a",
    explanation: "Con el pronombre 'you' en preguntas de Presente Simple se emplea el auxiliar 'do'.",
    source: "Primer Parcial - Pregunta 11 / Unidad 1 Clase 1"
  },
  {
    id: 12,
    topic: "Comparatives & Superlatives",
    question: "How do we generally form comparatives for one-syllable adjectives?",
    options: [
      { id: "a", text: "Add 'more' before the adjective and 'than'" },
      { id: "b", text: "Use 'most' before the adjective" },
      { id: "c", text: "Add '-er' to the adjective" },
      { id: "d", text: "Add '-est' to the adjective" }
    ],
    correctAnswer: "c",
    explanation: "Los adjetivos de una sílaba forman el comparativo añadiendo la terminación '-er' (ej: fast -> faster, dull -> duller, old -> older).",
    source: "Primer Parcial - Pregunta 12"
  },
  {
    id: 13,
    topic: "Comparatives & Superlatives",
    question: "Old languages like COBOL have _____ interfaces than modern languages.",
    options: [
      { id: "a", text: "the dullest" },
      { id: "b", text: "more dull" },
      { id: "c", text: "duller" },
      { id: "d", text: "dull" }
    ],
    correctAnswer: "c",
    explanation: "'Dull' (apagado/monótono) es un adjetivo corto de una sílaba; su comparativo de superioridad con 'than' es 'duller'.",
    source: "Primer Parcial - Pregunta 13 / Unidad 2 Clase 5"
  },
  {
    id: 14,
    topic: "Present Continuous",
    question: "They _____ fixing bugs at the moment.",
    options: [
      { id: "a", text: "not" },
      { id: "b", text: "doesn't" },
      { id: "c", text: "don't" },
      { id: "d", text: "aren't" }
    ],
    correctAnswer: "d",
    explanation: "La expresión 'at the moment' requiere Present Continuous. Para 'They', la forma negativa es 'aren't' (are not) + verbo en -ing (fixing).",
    source: "Primer Parcial - Pregunta 14 / Unidad 1 Clase 4"
  },
  {
    id: 15,
    topic: "Quantifiers",
    question: "How _____ people are there on your team?",
    options: [
      { id: "a", text: "many" },
      { id: "b", text: "much" },
      { id: "c", text: "money" },
      { id: "d", text: "any" }
    ],
    correctAnswer: "a",
    explanation: "'People' es un sustantivo contable en plural, por lo que se utiliza 'How many' (¿Cuántas personas...?). 'Much' se usa para incontables.",
    source: "Primer Parcial - Pregunta 15"
  },
  {
    id: 16,
    topic: "Vocabulary IT",
    question: "To connect to a database means...",
    options: [
      { id: "a", text: "to link with a database or API" },
      { id: "b", text: "to compile a function" },
      { id: "c", text: "to close a program" },
      { id: "d", text: "to debug a file" }
    ],
    correctAnswer: "a",
    explanation: "Conectarse a una base de datos significa establecer enlace o comunicación con la base de datos o API correspondiente.",
    source: "Primer Parcial - Pregunta 16 / Unidad 2 Clase 5"
  },
  {
    id: 17,
    topic: "Quantifiers",
    question: "How _____ people are there in your office?",
    options: [
      { id: "a", text: "many" },
      { id: "b", text: "much" },
      { id: "c", text: "number" },
      { id: "d", text: "lot" }
    ],
    correctAnswer: "a",
    explanation: "Nuevamente, 'people' es contable plural, requiriendo 'How many'.",
    source: "Primer Parcial - Pregunta 17"
  },
  {
    id: 18,
    topic: "Simple Present vs Present Continuous",
    question: "I go to the office practically every day, but today I _____ from home.",
    options: [
      { id: "a", text: "working" },
      { id: "b", text: "is working" },
      { id: "c", text: "am working" },
      { id: "d", text: "work" }
    ],
    correctAnswer: "c",
    explanation: "El contraste entre la rutina ('every day' -> Simple Present) y una acción temporal hoy ('today' -> Present Continuous con 'I am working').",
    source: "Primer Parcial - Pregunta 18 / Unidad 1 Clase 4"
  },
  {
    id: 19,
    topic: "Vocabulary IT / Reading",
    question: "One reason Python became successful is its _____.",
    options: [
      { id: "a", text: "slowness" },
      { id: "b", text: "simplicity" },
      { id: "c", text: "confusion" },
      { id: "d", text: "difficulty" }
    ],
    correctAnswer: "b",
    explanation: "En la lectura de la historia de Python (Clase 5), se destaca que una de las razones principales de su éxito mundial es su 'simplicity' (simplicidad y legibilidad).",
    source: "Primer Parcial - Pregunta 19 / Unidad 2 Clase 5"
  },
  {
    id: 20,
    topic: "Vocabulary IT",
    question: "To debug a program means...",
    options: [
      { id: "a", text: "to connect it to the internet" },
      { id: "b", text: "to find and fix errors" },
      { id: "c", text: "to delete all source code" },
      { id: "d", text: "to compile it into machine code" }
    ],
    correctAnswer: "b",
    explanation: "'Debug' (depurar) es el proceso fundamental de buscar, encontrar y solucionar errores (bugs) en el código fuente.",
    source: "Primer Parcial - Pregunta 20 / Unidad 2 Clase 5"
  },
  {
    id: 21,
    topic: "Wh- Questions",
    question: "_____ is our new project leader's name?",
    options: [
      { id: "a", text: "What" },
      { id: "b", text: "Who" },
      { id: "c", text: "Where" },
      { id: "d", text: "When" }
    ],
    correctAnswer: "a",
    explanation: "Al preguntar por el nombre ('name') de algo o alguien, en inglés se utiliza 'What': 'What is your name?' / 'What is our new project leader's name?'.",
    source: "Primer Parcial - Pregunta 21 / Unidad 1 Clase 2"
  },
  {
    id: 22,
    topic: "Past Simple",
    question: "Two years ago I _____ my company for 4 million dollars to a group of investors.",
    options: [
      { id: "a", text: "selled" },
      { id: "b", text: "sell" },
      { id: "c", text: "sold" },
      { id: "d", text: "was sold" }
    ],
    correctAnswer: "c",
    explanation: "El pasado simple del verbo irregular 'sell' (vender) es 'sold'. 'Selled' es una forma incorrecta.",
    source: "Primer Parcial - Pregunta 22 / Unidad 2 Clase 6"
  },
  {
    id: 23,
    topic: "Vocabulary IT / Business",
    question: "If you want to start your own business and you're not a rich person, you need to _____ some money first!",
    options: [
      { id: "a", text: "raise" },
      { id: "b", text: "lack" },
      { id: "c", text: "launch" },
      { id: "d", text: "step down" }
    ],
    correctAnswer: "a",
    explanation: "'To raise money' significa juntar o recaudar fondos/capital para iniciar o financiar un proyecto o empresa.",
    source: "Primer Parcial - Pregunta 23 / Unidad 2 Clase 6"
  },
  {
    id: 24,
    topic: "Present Continuous",
    question: "Right now, she _____ a new app.",
    options: [
      { id: "a", text: "doesn't write" },
      { id: "b", text: "is writing" },
      { id: "c", text: "writes" },
      { id: "d", text: "wrote" }
    ],
    correctAnswer: "b",
    explanation: "'Right now' es una expresión de tiempo que indica una acción ocurriendo en el momento exacto, exigiendo Present Continuous: 'is writing'.",
    source: "Primer Parcial - Pregunta 24 / Unidad 1 Clase 4"
  },
  {
    id: 25,
    topic: "Simple Present / Questions",
    question: "_____ programmers work in teams every day?",
    options: [
      { id: "a", text: "Do" },
      { id: "b", text: "Are" },
      { id: "c", text: "Does" },
      { id: "d", text: "Did" }
    ],
    correctAnswer: "a",
    explanation: "'Programmers' es un sujeto en plural (They), por lo que en Presente Simple se utiliza el auxiliar 'Do'.",
    source: "Primer Parcial - Pregunta 25 / Unidad 1 Clase 1"
  },

  // --- PREGUNTAS COMPLEMENTARIAS DE LAS CLASES 1 A 6 ---
  {
    id: 26,
    topic: "IT Jobs & Roles",
    question: "Which professional is primarily responsible for creating and testing code?",
    options: [
      { id: "a", text: "IT Support" },
      { id: "b", text: "Software Developer" },
      { id: "c", text: "UX Designer" },
      { id: "d", text: "Project Manager" }
    ],
    correctAnswer: "b",
    explanation: "Según el vocabulario de la Clase 2: 'Software Developer -> Creates and tests code'.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 27,
    topic: "IT Jobs & Roles",
    question: "A professional who designs easy-to-use interfaces is a...",
    options: [
      { id: "a", text: "UX Designer" },
      { id: "b", text: "Network Engineer" },
      { id: "c", text: "Systems Analyst" },
      { id: "d", text: "Data Analyst" }
    ],
    correctAnswer: "a",
    explanation: "En la Clase 2: 'UX Designer -> Designs easy-to-use interfaces'.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 28,
    topic: "Formal vs Informal Greetings",
    question: "Which of the following greetings is INFORMAL and suitable for a friend or classmate?",
    options: [
      { id: "a", text: "Good morning, Mr. Smith." },
      { id: "b", text: "Hello, how can I help you?" },
      { id: "c", text: "Hey, what's up?" },
      { id: "d", text: "Nice to meet you, sir." }
    ],
    correctAnswer: "c",
    explanation: "'Hey, what's up?' e 'Hi there!' son saludos informales. 'Good morning, Mr. Smith' es formal.",
    source: "Unidad 1 Clase 2 Vocabulary"
  },
  {
    id: 29,
    topic: "Simple Present / 3rd Person Rules",
    question: "When a verb ends in consonant + 'y' (such as 'study'), how do we form the 3rd person singular in Simple Present?",
    options: [
      { id: "a", text: "We just add -s (studys)" },
      { id: "b", text: "We change 'y' to -ies (studies)" },
      { id: "c", text: "We add -es without changing 'y' (studyes)" },
      { id: "d", text: "The verb does not change" }
    ],
    correctAnswer: "b",
    explanation: "Si el verbo termina en consonante + 'y', se elimina la 'y' y se añade '-ies': study -> studies, fly -> flies.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 30,
    topic: "Frequency Adverbs",
    question: "Where do frequency adverbs (always, usually, never) typically go in a sentence with a main verb?",
    options: [
      { id: "a", text: "Before the main verb" },
      { id: "b", text: "At the very end of every sentence" },
      { id: "c", text: "After the direct object" },
      { id: "d", text: "Before the subject" }
    ],
    correctAnswer: "a",
    explanation: "Los adverbios de frecuencia van antes del verbo principal (ej: 'I usually work from home', 'He never writes messy code'), excepto con el verbo 'to be' donde van después.",
    source: "Unidad 1 Clase 1 Grammar"
  },
  {
    id: 31,
    topic: "Present Continuous / Spelling",
    question: "What is the correct -ing form of the one-syllable verb 'sit' (consonant-vowel-consonant)?",
    options: [
      { id: "a", text: "siting" },
      { id: "b", text: "sitting" },
      { id: "c", text: "siteing" },
      { id: "d", text: "sitted" }
    ],
    correctAnswer: "b",
    explanation: "Cuando un verbo de una sílaba termina en consonante + vocal + consonante, se duplica la última consonante antes de agregar '-ing': sit -> sitting, run -> running.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 32,
    topic: "Stative Verbs",
    question: "Which of the following verbs is a 'stative verb' and is NOT normally used in continuous tenses?",
    options: [
      { id: "a", text: "code" },
      { id: "b", text: "know" },
      { id: "c", text: "write" },
      { id: "d", text: "watch" }
    ],
    correctAnswer: "b",
    explanation: "'Know', 'understand', 'need', 'want', 'belong' son verbos de estado (stative verbs) que expresan conocimiento o pertenencia y no suelen usarse con -ing.",
    source: "Unidad 1 Clase 4 Grammar"
  },
  {
    id: 33,
    topic: "Past Simple / Margaret Hamilton",
    question: "Margaret Hamilton led the software team for NASA's Apollo 11 mission and coined the term...",
    options: [
      { id: "a", text: "'artificial intelligence'" },
      { id: "b", text: "'software engineering'" },
      { id: "c", text: "'data science'" },
      { id: "d", text: "'cloud computing'" }
    ],
    correctAnswer: "b",
    explanation: "Margaret Hamilton acuñó el término 'software engineering' (ingeniería de software) mientras desarrollaba el código de navegación de las misiones Apollo en el MIT.",
    source: "Unidad 2 Clase 5 Reading & Listening"
  },
  {
    id: 34,
    topic: "Past Simple / Margaret Hamilton",
    question: "How did Margaret Hamilton design the Apollo software to handle unexpected overloads?",
    options: [
      { id: "a", text: "As a synchronous sequential loop" },
      { id: "b", text: "As an asynchronous program with priority tasks" },
      { id: "c", text: "By turning off the radar completely" },
      { id: "d", text: "By restarting the computer every minute" }
    ],
    correctAnswer: "b",
    explanation: "Diseñó el software de forma asíncrona ('asynchronous') con prioridades, permitiendo que las tareas cruciales interrumpieran a las menos importantes para evitar catástrofes.",
    source: "Unidad 2 Clase 5 Listening Comprehension"
  },
  {
    id: 35,
    topic: "Past Simple / Grace Hopper",
    question: "Grace Hopper developed one of the first compilers and helped create the programming language...",
    options: [
      { id: "a", text: "Python" },
      { id: "b", text: "COBOL" },
      { id: "c", text: "JavaScript" },
      { id: "d", text: "C++" }
    ],
    correctAnswer: "b",
    explanation: "Grace Hopper creó uno de los primeros compiladores y participó en el desarrollo del lenguaje COBOL.",
    source: "Unidad 2 Clase 5 Reading"
  },
  {
    id: 36,
    topic: "Past Simple / Irregular Verbs",
    question: "Sergey Brin and Larry Page _____ Google in 1998 after meeting at Stanford University.",
    options: [
      { id: "a", text: "began" },
      { id: "b", text: "becomed" },
      { id: "c", text: "became" },
      { id: "d", text: "created" }
    ],
    correctAnswer: "d",
    explanation: "En la lectura de la Clase 6 se señala: 'they created Google' y 'launched the company in 1998'. El pasado de become es 'became', pero el verbo correspondiente a crear es 'created'.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 37,
    topic: "Vocabulary IT / Business",
    question: "The CEO of the company decided to _____ because he wanted to retire and spend time with his family.",
    options: [
      { id: "a", text: "raise" },
      { id: "b", text: "step down" },
      { id: "c", text: "restructure" },
      { id: "d", text: "purchase" }
    ],
    correctAnswer: "b",
    explanation: "'Step down' significa renunciar o dejar un cargo ejecutivo / de liderazgo.",
    source: "Unidad 2 Clase 6 Vocabulary"
  },
  {
    id: 38,
    topic: "Vocabulary IT / Business",
    question: "In 2006, Google _____ YouTube for $1.65 billion in stock.",
    options: [
      { id: "a", text: "purchased" },
      { id: "b", text: "stepped down" },
      { id: "c", text: "restructured" },
      { id: "d", text: "lacked" }
    ],
    correctAnswer: "a",
    explanation: "'To purchase' significa comprar o adquirir formalmente activos o compañías.",
    source: "Unidad 2 Clase 6 Reading"
  },
  {
    id: 39,
    topic: "Past Simple / Regular Verbs Spelling",
    question: "What is the correct past simple form of the regular verb 'stop'?",
    options: [
      { id: "a", text: "stoped" },
      { id: "b", text: "stopped" },
      { id: "c", text: "stopt" },
      { id: "d", text: "stopping" }
    ],
    correctAnswer: "b",
    explanation: "Los verbos regulares de una sílaba terminados en consonante-vocal-consonante duplican la consonante final al agregar '-ed': stop -> stopped, program -> programmed.",
    source: "Unidad 2 Clase 5 Grammar"
  },
  {
    id: 40,
    topic: "Past Simple / Negative Structure",
    question: "Which sentence is grammatically CORRECT in Past Simple negative?",
    options: [
      { id: "a", text: "She didn't wrote the documentation yesterday." },
      { id: "b", text: "She didn't write the documentation yesterday." },
      { id: "c", text: "She doesn't wrote the documentation yesterday." },
      { id: "d", text: "She not wrote the documentation yesterday." }
    ],
    correctAnswer: "b",
    explanation: "El auxiliar 'didn't' ya expresa el pasado; el verbo que le sigue debe estar obligatoriamente en su forma base / infinitivo ('write', no 'wrote').",
    source: "Unidad 2 Clase 5 & 6 Grammar"
  }
];
