// Base de datos de Teoría y Gramática
// Diseñada 100% en base a los contenidos oficiales de Clase 1 a Clase 6 de Inglés I (UTN TUP)

export const THEORY_DATA = {
  simplePresent: {
    title: "Presente Simple (Simple Present Tense)",
    subtitle: "Uso para rutinas, hechos generales, especificaciones técnicas y hábitos cotidianos de un desarrollador.",
    overview: {
      definition: "El Presente Simple se utiliza para describir hábitos, rutinas diarias, verdades generales y estados permanentes. En el contexto de IT, describe lo que hacen los sistemas, las tareas habituales de un rol tecnológico y las funciones del código.",
      timeExpressions: ["always (siempre)", "usually (usualmente)", "often (frecuentemente)", "sometimes (a veces)", "hardly ever (casi nunca)", "never (nunca)", "every day / week / month", "once / twice a week", "on Mondays"]
    },
    structures: [
      {
        type: "Afirmativo (Affirmative)",
        color: "emerald",
        formula: "Sujeto + Verbo en forma base / (+ -s / -es / -ies para He, She, It) + Complemento",
        rules: [
          "Para I, You, We, They: el verbo permanece en su forma base (infinitivo sin 'to').",
          "Para He, She, It (3ra persona singular): se añade regla ortográfica al verbo."
        ],
        spellingRules: [
          { rule: "Regla general: Añadir -s", examples: ["work -> works", "code -> codes", "test -> tests", "need -> needs"] },
          { rule: "Verbos terminados en -ch, -sh, -ss, -x, -z, -o: Añadir -es", examples: ["watch -> watches", "fix -> fixes", "pass -> passes", "go -> goes", "do -> does"] },
          { rule: "Consonante + 'y': Cambiar la 'y' por -ies", examples: ["study -> studies", "modify -> modifies", "apply -> applies"] },
          { rule: "Vocal + 'y': Solo añadir -s", examples: ["play -> plays", "deploy -> deploys", "buy -> buys"] }
        ],
        examples: [
          { en: "I wake up at 8 a.m., check my emails, and start coding by 9.", es: "Me despierto a las 8 a.m., reviso mis correos y comienzo a programar a las 9." },
          { en: "As a front-end developer, I need to take care of the user interface.", es: "Como desarrollador front-end, necesito ocuparme de la interfaz de usuario." },
          { en: "The server processes thousands of API requests per second.", es: "El servidor procesa miles de peticiones a la API por segundo." },
          { en: "She fixes bugs and reviews other developers' code every morning.", es: "Ella corrige errores y revisa el código de otros desarrolladores cada mañana." }
        ]
      },
      {
        type: "Negativo (Negative)",
        color: "rose",
        formula: "Sujeto + Auxiliar Negativo (don't / doesn't) + Verbo en forma base + Complemento",
        rules: [
          "I / You / We / They + DO NOT (don't) + Verbo en base",
          "He / She / It + DOES NOT (doesn't) + Verbo en base (¡el verbo pierde la -s/-es porque ya está en el auxiliar!)"
        ],
        examples: [
          { en: "He doesn't check emails at night.", es: "Él no revisa correos por la noche." },
          { en: "I don't have many meetings, and I often work from home.", es: "No tengo muchas reuniones y a menudo trabajo desde casa." },
          { en: "They don't write legacy code in this project.", es: "Ellos no escriben código heredado en este proyecto." },
          { en: "The database doesn't crash under high load.", es: "La base de datos no se cae bajo alta carga." }
        ]
      },
      {
        type: "Preguntas (Questions / Interrogative)",
        color: "indigo",
        formula: "(Wh- Word) + Auxiliar (Do / Does) + Sujeto + Verbo en forma base + Complemento + ?",
        rules: [
          "Yes/No Questions: Do/Does + Sujeto + Verbo base?",
          "Wh- Questions: Wh-word + do/does + Sujeto + Verbo base?",
          "Wh-words clave: What (Qué/Cuál), Where (Dónde), When (Cuándo), Who (Quién), Why (Por qué), How (Cómo), What time (A qué hora)."
        ],
        examples: [
          { en: "Do programmers work in teams every day?", es: "¿Los programadores trabajan en equipos todos los días?" },
          { en: "What do you do for a living?", es: "¿A qué te dedicas para ganarte la vida?" },
          { en: "What time do you start working in the morning?", es: "¿A qué hora comienzas a trabajar por la mañana?" },
          { en: "Where does the systems analyst store project requirements?", es: "¿Dónde almacena el analista de sistemas los requerimientos del proyecto?" }
        ]
      },
      {
        type: "Respuestas Cortas (Short Answers)",
        color: "amber",
        formula: "Yes, [Pronombre] + do/does.  |  No, [Pronombre] + don't/doesn't.",
        rules: [
          "Nunca se repite el verbo principal en una respuesta corta.",
          "Respuestas afirmativas usan la forma completa del auxiliar (Yes, I do / Yes, she does).",
          "Respuestas negativas usan la forma contraída (No, I don't / No, he doesn't)."
        ],
        examples: [
          { q: "Do you like watching movies or series?", aAff: "Yes, I do.", aNeg: "No, I don't." },
          { q: "Does the compiler display the error stack?", aAff: "Yes, it does.", aNeg: "No, it doesn't." },
          { q: "Do they maintain cloud servers?", aAff: "Yes, they do.", aNeg: "No, they don't." }
        ]
      }
    ],
    vocabularySection: {
      title: "Vocabulario IT de Unidad 1: Roles & Saludos",
      roles: [
        { role: "Software Developer", desc: "Creates, tests and maintains application source code." },
        { role: "UX Designer", desc: "Designs easy-to-use, intuitive user interfaces." },
        { role: "IT Support", desc: "Helps with hardware, software and network problems." },
        { role: "Project Manager", desc: "Manages and plans tech projects, sprints and timelines." },
        { role: "Web Developer", desc: "Builds and maintains responsive websites and web apps." },
        { role: "Systems Analyst", desc: "Analyzes system architecture and user requirements." },
        { role: "Data Analyst", desc: "Inspects, cleans and transforms data to discover insights." },
        { role: "Network Engineer", desc: "Sets up and manages local and wide area network infrastructure." }
      ],
      greetings: [
        { text: "Good morning, Mr. Smith.", type: "Formal", situation: "Talking to your boss / formal business meeting." },
        { text: "Hey, what's up?", type: "Informal", situation: "Greeting a friend or colleague casually." },
        { text: "Hello, how can I help you?", type: "Formal", situation: "Answering a call or ticket at work." },
        { text: "Hi there!", type: "Informal", situation: "Greeting a teammate or classmate." },
        { text: "Nice to meet you.", type: "Formal / Neutral", situation: "First-time meeting in a work or study setting." }
      ]
    },
    miniQuiz: [
      {
        q: "She _____ (review) pull requests every afternoon.",
        options: ["reviews", "review", "reviewing", "is review"],
        correct: 0,
        exp: "Para 3ra persona singular (She) se agrega '-s': reviews."
      },
      {
        q: "_____ you usually work from home on Fridays?",
        options: ["Do", "Does", "Are", "Did"],
        correct: 0,
        exp: "Con el pronombre 'you' en preguntas de Presente Simple usamos el auxiliar 'Do'."
      },
      {
        q: "A frontend developer _____ (not / manage) physical database cables.",
        options: ["doesn't manage", "don't manage", "isn't manage", "not manages"],
        correct: 0,
        exp: "'A developer' es 3ra persona singular, por lo que lleva 'doesn't manage'."
      },
      {
        q: "Our team _____ (catch) bugs during unit testing every sprint.",
        options: ["catches", "catchs", "catching", "catched"],
        correct: 0,
        exp: "Verbos terminados en -ch (como catch) agregan '-es' en 3ra persona: catches."
      },
      {
        q: "The senior architect always _____ (study) new cloud patterns on weekends.",
        options: ["studies", "studys", "study", "is studying"],
        correct: 0,
        exp: "Verbos terminados en consonante + 'y' cambian a '-ies': study -> studies."
      },
      {
        q: "Where _____ the DevOps engineer store the SSL certificates?",
        options: ["does", "do", "is", "has"],
        correct: 0,
        exp: "El sujeto 'the DevOps engineer' es singular (he/she), usamos el auxiliar 'does'."
      },
      {
        q: "We _____ (not / deploy) new updates to production on Friday afternoons.",
        options: ["don't deploy", "doesn't deploy", "aren't deploy", "not deploy"],
        correct: 0,
        exp: "Para el pronombre 'We' en Presente Simple se usa 'don't' + verbo base."
      },
      {
        q: "What time _____ the daily stand-up meeting start?",
        options: ["does", "do", "is", "are"],
        correct: 0,
        exp: "'The daily meeting' es 'It' (3ra persona singular), por lo tanto el auxiliar correcto es 'does'."
      },
      {
        q: "Mark and Sarah _____ (write) clean documentation for the API.",
        options: ["write", "writes", "writing", "are write"],
        correct: 0,
        exp: "'Mark and Sarah' es plural (They), por lo que el verbo va en forma base sin '-s'."
      },
      {
        q: "Which greeting is most appropriate when answering a formal business call?",
        options: ["Hello, how can I help you?", "Hey, what's up?", "Hi dude!", "Yo!"],
        correct: 0,
        exp: "'Hello, how can I help you?' es la fórmula formal y profesional adecuada."
      },
      {
        q: "A Database Administrator (DBA) _____ backups every midnight.",
        options: ["runs", "run", "running", "is run"],
        correct: 0,
        exp: "Sujeto singular en presente de rutina ('every midnight') requiere '-s': runs."
      },
      {
        q: "How often _____ your company organize tech talks?",
        options: ["does", "do", "is", "are"],
        correct: 0,
        exp: "'Your company' es una entidad singular (it), por lo que lleva el auxiliar 'does'."
      },
      {
        q: "He never _____ (fix) CSS bugs without checking mobile viewports.",
        options: ["fixes", "fix", "fixs", "fixing"],
        correct: 0,
        exp: "Verbos terminados en -x añaden '-es' en tercera persona singular: fixes."
      },
      {
        q: "QA Testers _____ (test) the software to ensure there are no critical errors.",
        options: ["test", "tests", "testing", "are test"],
        correct: 0,
        exp: "'QA Testers' es plural (They), usamos la forma base del verbo: test."
      },
      {
        q: "_____ your server crash when traffic spikes?",
        options: ["Does", "Do", "Is", "Are"],
        correct: 0,
        exp: "'Your server' es singular (it), usamos 'Does' para formular la pregunta."
      }
    ]
  },

  presentContinuous: {
    title: "Presente Continuo (Present Continuous Tense)",
    subtitle: "Uso para acciones que suceden ahora mismo, proyectos en curso y situaciones temporales.",
    overview: {
      definition: "El Presente Continuo expresa acciones que están ocurriendo en el momento exacto del habla ('right now', 'at the moment') o situaciones temporales que difieren de la rutina habitual ('today', 'this week').",
      timeExpressions: ["now (ahora)", "right now (ahora mismo)", "at the moment (en este momento)", "currently (actualmente)", "today (hoy)", "this week / month", "Look! / Listen!"]
    },
    structures: [
      {
        type: "Afirmativo (Affirmative)",
        color: "emerald",
        formula: "Sujeto + Verbo TO BE (am / is / are) + Verbo principal con -ING + Complemento",
        rules: [
          "I + AM (I'm) + Verb-ing",
          "He / She / It + IS (He's, She's, It's) + Verb-ing",
          "You / We / They + ARE (You're, We're, They're) + Verb-ing"
        ],
        spellingRules: [
          { rule: "Regla general: Añadir -ing", examples: ["work -> working", "code -> coding (drop e)", "test -> testing", "watch -> watching"] },
          { rule: "Verbos terminados en -e muda: Eliminar la -e y añadir -ing", examples: ["write -> writing", "make -> making", "create -> creating", "use -> using"] },
          { rule: "Verbos de 1 sílaba (Consonante-Vocal-Consonante): Duplicar la consonante", examples: ["sit -> sitting", "run -> running", "stop -> stopping", "plan -> planning"] },
          { rule: "Verbos terminados en -ie: Cambiar -ie por -y y añadir -ing", examples: ["lie -> lying", "die -> dying"] }
        ],
        examples: [
          { en: "Right now, I am sitting in a café, enjoying a coffee and writing you this email.", es: "Ahora mismo, estoy sentado en una cafetería, disfrutando un café y escribiéndote este email." },
          { en: "She is writing a new app for mobile devices.", es: "Ella está escribiendo una nueva aplicación para dispositivos móviles." },
          { en: "The server is responding to user requests smoothly.", es: "El servidor está respondiendo a las solicitudes de usuarios sin problemas." },
          { en: "We are learning modern fullstack web technologies this semester.", es: "Estamos aprendiendo tecnologías web fullstack modernas este semestre." }
        ]
      },
      {
        type: "Negativo (Negative)",
        color: "rose",
        formula: "Sujeto + Verbo TO BE + NOT (am not / isn't / aren't) + Verbo con -ING",
        rules: [
          "I + am not + Verb-ing",
          "He / She / It + is not (isn't) + Verb-ing",
          "You / We / They + are not (aren't) + Verb-ing"
        ],
        examples: [
          { en: "They aren't fixing bugs at the moment; they are testing features.", es: "Ellos no están corrigiendo errores en este momento; están probando funcionalidades." },
          { en: "We are not developing new projects now. They are too expensive!", es: "No estamos desarrollando nuevos proyectos ahora. ¡Son demasiado costosos!" },
          { en: "I am not writing code today because I finished the big project yesterday.", es: "Hoy no estoy escribiendo código porque ayer terminé el gran proyecto." },
          { en: "The server isn't leaking memory anymore.", es: "El servidor ya no está teniendo fugas de memoria." }
        ]
      },
      {
        type: "Preguntas (Questions / Interrogative)",
        color: "indigo",
        formula: "(Wh- Word) + Verbo TO BE (Am / Is / Are) + Sujeto + Verbo con -ING + Complemento + ?",
        rules: [
          "Yes/No Questions: Are you coding? / Is she testing?",
          "Wh- Questions: What are you doing these days? / Why is the server restarting?"
        ],
        examples: [
          { en: "What are Phoebe and Rachel trying to keep secret in the clip?", es: "¿Qué están intentando mantener en secreto Phoebe y Rachel en el fragmento?" },
          { en: "What game are Sheldon, Penny, and Amy playing?", es: "¿A qué juego están jugando Sheldon, Penny y Amy?" },
          { en: "Are you working from home today?", es: "¿Estás trabajando desde casa hoy?" },
          { en: "Why is the backend throwing timeout exceptions?", es: "¿Por qué el backend está lanzando excepciones de tiempo de espera?" }
        ]
      },
      {
        type: "Respuestas Cortas (Short Answers)",
        color: "amber",
        formula: "Yes, [Pronombre] + am/is/are.  |  No, [Pronombre] + 'm not / isn't / aren't.",
        rules: [
          "Las respuestas afirmativas nunca se contraen: 'Yes, I am' (NO 'Yes, I'm').",
          "Las respuestas negativas suelen contraerse: 'No, I'm not' / 'No, she isn't' / 'No, they aren't'."
        ],
        examples: [
          { q: "Are you enjoying your programming course?", aAff: "Yes, I am.", aNeg: "No, I'm not." },
          { q: "Is the system deploying right now?", aAff: "Yes, it is.", aNeg: "No, it isn't." },
          { q: "Are they fixing the production bug?", aAff: "Yes, they are.", aNeg: "No, they aren't." }
        ]
      }
    ],
    contrastMatrix: {
      title: "Contraste Fundamental: Simple Present vs Present Continuous",
      rows: [
        {
          aspect: "Uso Principal",
          presentSimple: "Hábitos, rutinas diarias, verdades universales, hechos permanentes.",
          presentContinuous: "Acciones ocurriendo ahora, acciones en progreso, situaciones temporales."
        },
        {
          aspect: "Palabras Clave",
          presentSimple: "always, usually, often, sometimes, never, every day, on Mondays.",
          presentContinuous: "now, right now, at the moment, currently, today, this week."
        },
        {
          aspect: "Ejemplo Comparativo",
          presentSimple: "I go to the office practically every day... (Rutina)",
          presentContinuous: "...but today I am working from home. (Excepción temporal)"
        },
        {
          aspect: "Auxiliares",
          presentSimple: "Do / Does (en preguntas y negaciones don't / doesn't)",
          presentContinuous: "Am / Is / Are (verbo to be + verbo con -ing)"
        }
      ]
    },
    stativeVerbs: {
      title: "Verbos de Estado (Stative Verbs)",
      desc: "Son verbos que describen estados, pensamientos, emociones o posesiones y NO se utilizan comúnmente en formas continuas (-ing), incluso si ocurren ahora mismo:",
      categories: [
        { name: "Pensamiento & Conocimiento", verbs: "know, understand, believe, remember, think (opinar), recognize" },
        { name: "Emociones & Preferencias", verbs: "like, love, hate, want, need, prefer" },
        { name: "Posesión & Pertenencia", verbs: "have (poseer), own, belong, possess" },
        { name: "Sentidos & Apariencia", verbs: "seem, look (parecer), hear, smell, taste" }
      ],
      warning: "Correcto: 'I need to check the code now.' (INCORRECTO: 'I am needing to check...')"
    },
    miniQuiz: [
      {
        q: "Look! The automated build pipeline _____ (run) right now.",
        options: ["is running", "runs", "are running", "running"],
        correct: 0,
        exp: "'Right now' y 'Look!' indican acción en curso con sujeto singular (pipeline): 'is running'."
      },
      {
        q: "They _____ (not / work) on the legacy database this week.",
        options: ["aren't working", "don't working", "isn't working", "not working"],
        correct: 0,
        exp: "Para 'They' en situación temporal ('this week') usamos 'aren't working'."
      },
      {
        q: "I usually _____ (drink) tea, but today I _____ (drink) coffee.",
        options: ["drink / am drinking", "am drinking / drink", "drinks / drink", "drinking / is drinking"],
        correct: 0,
        exp: "Rutina ('usually') -> drink (Simple Present); excepción hoy ('today') -> am drinking (Present Continuous)."
      },
      {
        q: "Be quiet! The lead developer _____ (debug) a critical production issue.",
        options: ["is debugging", "is debuging", "debugs", "are debugging"],
        correct: 0,
        exp: "'Debug' duplica la consonante final 'g' antes de -ing: is debugging."
      },
      {
        q: "Right now, we _____ (migrate) our microservices to Kubernetes.",
        options: ["are migrating", "is migrating", "migrate", "are migrateing"],
        correct: 0,
        exp: "'Migrate' elimina la '-e' muda final: are migrating."
      },
      {
        q: "Listen! Why _____ the alarm in the server room _____ (ring)?",
        options: ["is / ringing", "are / ringing", "does / ring", "is / ring"],
        correct: 0,
        exp: "'The alarm' es singular, por lo que usamos 'is' + sujeto + 'ringing'."
      },
      {
        q: "I _____ (understand) the technical requirements clearly now.",
        options: ["understand", "am understanding", "understands", "am understand"],
        correct: 0,
        exp: "'Understand' es un Stative Verb (verbo de estado/mente) y no se usa en tiempos continuos."
      },
      {
        q: "What _____ you _____ (do) at the moment?",
        options: ["are / doing", "do / do", "is / doing", "did / do"],
        correct: 0,
        exp: "'At the moment' requiere Present Continuous con 'you': 'are you doing'."
      },
      {
        q: "The security team _____ (investigate) a suspicious login attempt today.",
        options: ["is investigating", "investigates", "are investigate", "is investigate"],
        correct: 0,
        exp: "Situación temporal ('today') en progreso: 'is investigating'."
      },
      {
        q: "She _____ (not / write) code today because she is attending a conference.",
        options: ["isn't writing", "doesn't write", "not writing", "aren't writing"],
        correct: 0,
        exp: "Acción temporal negativa para 'she': 'isn't writing'."
      },
      {
        q: "They _____ (plan) the new release roadmap right now.",
        options: ["are planning", "are planing", "plans", "is planning"],
        correct: 0,
        exp: "'Plan' tiene estructura consonante-vocal-consonante (CVC), por lo que duplica la 'n': planning."
      },
      {
        q: "Currently, the company _____ (hire) junior cloud architects.",
        options: ["is hiring", "hires", "are hiring", "is hireing"],
        correct: 0,
        exp: "'Currently' señala un proceso temporal en curso con sujeto 'company' (it): is hiring."
      },
      {
        q: "I _____ (need) access to the repository right now.",
        options: ["need", "am needing", "needs", "am need"],
        correct: 0,
        exp: "'Need' es un stative verb de necesidad/deseo; no lleva -ing aunque sea 'right now'."
      },
      {
        q: "_____ the frontend devs _____ (test) the dark mode layout at this time?",
        options: ["Are / testing", "Do / test", "Is / testing", "Were / testing"],
        correct: 0,
        exp: "'The frontend devs' es plural (they), requiere 'Are ... testing'."
      },
      {
        q: "The database latency _____ (increase) every minute.",
        options: ["is increasing", "increases", "are increasing", "increase"],
        correct: 0,
        exp: "Un cambio gradual o tendencia en progreso se expresa con Present Continuous: is increasing."
      }
    ]
  },

  pastSimple: {
    title: "Pasado Simple & Verbos Irregulares (Past Simple Tense)",
    subtitle: "Uso para acciones finalizadas en un momento específico del pasado, hitos históricos y evolución tecnológica.",
    overview: {
      definition: "El Pasado Simple describe acciones concluidas en el pasado que no tienen conexión directa con el presente. Se acompaña comúnmente de marcadores temporales pasados ('yesterday', 'two years ago', 'in 1998', 'in the 1960s').",
      timeExpressions: ["yesterday (ayer)", "last night / week / year", "two years ago (hace dos años)", "in 1998 / in 2016", "when I was a student", "in the 1960s"]
    },
    regularVsIrregular: {
      regular: {
        title: "Verbos Regulares (Regular Verbs)",
        rule: "Forman el pasado simple añadiendo el sufijo -ED a la forma base del verbo.",
        spelling: [
          { rule: "Regla general: Añadir -ed", examples: ["work -> worked", "develop -> developed", "program -> programmed", "start -> started", "connect -> connected"] },
          { rule: "Terminados en -e: Solo añadir -d", examples: ["create -> created", "receive -> received", "name -> named", "translate -> translated", "separate -> separated"] },
          { rule: "Consonante + 'y': Cambiar por -ied", examples: ["study -> studied", "apply -> applied", "marry -> married"] },
          { rule: "Consonante-Vocal-Consonante (1 sílaba): Duplicar consonante", examples: ["stop -> stopped", "plan -> planned"] }
        ]
      },
      irregular: {
        title: "Verbos Irregulares (Irregular Verbs)",
        rule: "No siguen la regla del -ED; tienen formas únicas de pasado que deben memorizarse.",
        keyExamples: [
          { base: "be", past: "was / were", trans: "ser / estar" },
          { base: "find", past: "found", trans: "encontrar" },
          { base: "sell", past: "sold", trans: "vender" },
          { base: "buy", past: "bought", trans: "comprar" },
          { base: "meet", past: "met", trans: "conocer / encontrarse" },
          { base: "write", past: "wrote", trans: "escribir" },
          { base: "make", past: "made", trans: "hacer" },
          { base: "become", past: "became", trans: "convertirse" }
        ]
      }
    },
    structures: [
      {
        type: "Afirmativo (Affirmative)",
        color: "emerald",
        formula: "Sujeto + Verbo en Pasado Simple (regular con -ed o irregular) + Complemento",
        rules: [
          "El verbo en pasado simple es idéntico para todas las personas gramaticales (I, you, he, she, it, we, they), excepto con el verbo 'to be' (I/he/she/it was, you/we/they were)."
        ],
        examples: [
          { en: "Margaret Hamilton developed software for NASA's Apollo space program in the 1960s.", es: "Margaret Hamilton desarrolló software para el programa espacial Apolo de la NASA en los años 60." },
          { en: "Sergey Brin met Larry Page at Stanford University, and the two created Google.", es: "Sergey Brin conoció a Larry Page en la Universidad de Stanford y ambos crearon Google." },
          { en: "Two years ago I sold my company for 4 million dollars to a group of investors.", es: "Hace dos años vendí mi compañía por 4 millones de dólares a un grupo de inversores." },
          { en: "In 2016, President Barack Obama awarded Margaret Hamilton the Presidential Medal of Freedom.", es: "En 2016, el presidente Barack Obama le otorgó a Margaret Hamilton la Medalla Presidencial de la Libertad." }
        ]
      },
      {
        type: "Negativo (Negative)",
        color: "rose",
        formula: "Sujeto + Auxiliar DID NOT (didn't) + Verbo en forma BASE (infinitivo) + Complemento",
        rules: [
          "El auxiliar 'didn't' ya indica tiempo pasado.",
          "¡REGLA DE ORO!: El verbo principal DEBE volver a su forma infinitivo/base (ej: 'She didn't write', NO 'didn't wrote').",
          "Para el verbo 'to be', la negación es 'wasn't' / 'weren't' (sin auxiliar did)."
        ],
        examples: [
          { en: "The software didn't fail during the Apollo 11 lunar landing.", es: "El software no falló durante el alunizaje del Apolo 11." },
          { en: "They didn't launch the company with their own money; they raised funds from investors.", es: "No lanzaron la compañía con su propio dinero; recaudaron fondos de inversores." },
          { en: "Sergey Brin was not born in the USA; he was born in Moscow, Russia.", es: "Sergey Brin no nació en EE.UU.; nació en Moscú, Rusia." },
          { en: "The developers didn't find any critical bugs during the QA sprint.", es: "Los desarrolladores no encontraron ningún error crítico durante el sprint de QA." }
        ]
      },
      {
        type: "Preguntas (Questions / Interrogative)",
        color: "indigo",
        formula: "(Wh- Word) + Auxiliar DID + Sujeto + Verbo en forma BASE + Complemento + ?",
        rules: [
          "Yes/No Questions: Did + Sujeto + Verbo base?",
          "Wh- Questions: Wh-word + did + Sujeto + Verbo base?",
          "Para 'to be': Was / Were + Sujeto + Complemento?"
        ],
        examples: [
          { en: "What did a software engineer do in the 1960s?", es: "¿Qué hacía un ingeniero de software en los años 60?" },
          { en: "Where did Sergey Brin and Larry Page meet?", es: "¿Dónde se conocieron Sergey Brin y Larry Page?" },
          { en: "Did Margaret Hamilton study mathematics at university?", es: "¿Margaret Hamilton estudió matemáticas en la universidad?" },
          { en: "When did Google hold its initial public offering?", es: "¿Cuándo realizó Google su oferta pública inicial?" }
        ]
      },
      {
        type: "Respuestas Cortas (Short Answers)",
        color: "amber",
        formula: "Yes, [Pronombre] + did.  |  No, [Pronombre] + didn't.",
        rules: [
          "Para preguntas con 'Did': Yes, I did / No, I didn't.",
          "Para preguntas con 'Was/Were': Yes, he was / No, he wasn't / Yes, they were / No, they weren't."
        ],
        examples: [
          { q: "Did the Apollo 11 mission succeed?", aAff: "Yes, it did.", aNeg: "No, it didn't." },
          { q: "Was Sergey Brin born in Russia?", aAff: "Yes, he was.", aNeg: "No, he wasn't." },
          { q: "Did you push your commits yesterday?", aAff: "Yes, I did.", aNeg: "No, I didn't." }
        ]
      }
    ],
    readingCaseStudies: [
      {
        title: "Margaret Hamilton: The First Software Engineer (Apollo 11)",
        content: "Margaret Hamilton was born in 1936 in Indiana, USA. She studied mathematics and joined MIT in the 1960s to develop software for NASA's Apollo space program. She coined the term 'software engineering'. Her team designed asynchronous flight software with priority displays that detected unexpected radar overload during Apollo 11 and prevented an abort, allowing Neil Armstrong and Buzz Aldrin to land safely on the Moon. In 2016, she received the Presidential Medal of Freedom.",
        tags: ["Apollo 11", "NASA", "MIT", "Asynchronous Software", "Software Engineering"]
      },
      {
        title: "Grace Hopper: The Queen of Code (COBOL)",
        content: "Grace Hopper was born in 1906 in New York. She studied mathematics and physics, earning a PhD from Yale University. During World War II, she joined the U.S. Navy and worked on the Harvard Mark I. She created one of the first compilers and helped develop the COBOL programming language. In 2016, the U.S. Navy named a guided-missile destroyer after her: the USS Hopper.",
        tags: ["COBOL", "Compiler", "U.S. Navy", "Yale", "Harvard Mark I"]
      },
      {
        title: "Sergey Brin, Larry Page and the Creation of Google",
        content: "Sergey Brin emigrated from Moscow in 1979. He met Larry Page while completing doctorates at Stanford University. In 1998, after raising $1 million from investors, they launched Google. Google held its initial public offering (IPO) in 2004, purchased YouTube in 2006 for $1.65 billion, and reorganized under parent company Alphabet in 2015. Brin and Page stepped down from daily roles in 2019.",
        tags: ["Google", "Stanford", "IPO", "Alphabet", "YouTube Acquisition", "Step down"]
      }
    ],
    businessGlossary: [
      { term: "To raise money", meaning: "Recaudar fondos o capital para un negocio.", example: "They raised $1 million from angel investors." },
      { term: "To launch", meaning: "Lanzar un producto o compañía al mercado.", example: "The founders launched Google in 1998." },
      { term: "Headquarters", meaning: "Oficina central o sede principal.", example: "Google's headquarters are located in California's Silicon Valley." },
      { term: "Initial Public Offering (IPO)", meaning: "Oferta pública inicial de acciones en bolsa.", example: "The company held its IPO in August 2004." },
      { term: "To purchase", meaning: "Comprar / adquirir.", example: "Google purchased YouTube for $1.65 billion in stock." },
      { term: "To step down", meaning: "Renunciar o retirarse de un cargo ejecutivo.", example: "The CEO stepped down from his day-to-day role in 2019." },
      { term: "To restructure", meaning: "Reorganizar la estructura de una empresa.", example: "The divisions were restructured under Alphabet." }
    ],
    miniQuiz: [
      {
        q: "Grace Hopper _____ (develop) one of the first compilers in computing history.",
        options: ["developed", "develops", "was develop", "developt"],
        correct: 0,
        exp: "'Develop' es un verbo regular que en pasado añade '-ed': developed."
      },
      {
        q: "They _____ (not / buy) the cloud servers yesterday.",
        options: ["didn't buy", "didn't bought", "don't buy", "weren't buy"],
        correct: 0,
        exp: "La negación en pasado es 'didn't' + verbo en forma base (buy)."
      },
      {
        q: "Where _____ Sergey Brin and Larry Page _____ (meet)?",
        options: ["did / meet", "did / met", "were / met", "do / meet"],
        correct: 0,
        exp: "En preguntas de pasado usamos 'did' + sujeto + verbo en base (meet)."
      },
      {
        q: "Margaret Hamilton _____ (be) the director of software engineering for Apollo 11.",
        options: ["was", "were", "is", "been"],
        correct: 0,
        exp: "El pasado del verbo To Be para 3ra persona singular (She) es 'was'."
      },
      {
        q: "In 2006, Google _____ (purchase) YouTube for $1.65 billion.",
        options: ["purchased", "purchase", "purchases", "purchaised"],
        correct: 0,
        exp: "Verbo regular que termina en -e sólo añade '-d': purchased."
      },
      {
        q: "The startup _____ (raise) $1 million from angel investors in 1998.",
        options: ["raised", "rose", "raise", "raising"],
        correct: 0,
        exp: "'To raise money' es regular y en pasado toma '-d': raised."
      },
      {
        q: "She _____ (write) the flight operating software that prevented an abort.",
        options: ["wrote", "written", "writed", "did write"],
        correct: 0,
        exp: "'Write' es un verbo irregular cuyo pasado simple es 'wrote'."
      },
      {
        q: "_____ the team _____ (find) the memory leak during yesterday's stress test?",
        options: ["Did / find", "Did / found", "Were / find", "Do / find"],
        correct: 0,
        exp: "Con el auxiliar 'Did' en preguntas, el verbo principal siempre va en forma base: find."
      },
      {
        q: "The founders _____ (step) down from their daily roles in 2019.",
        options: ["stepped", "steped", "stept", "stepping"],
        correct: 0,
        exp: "'Step' duplica la 'p' por ser monosílabo consonante-vocal-consonante: stepped."
      },
      {
        q: "We _____ (not / know) the API password last week.",
        options: ["didn't know", "didn't knew", "weren't know", "don't knew"],
        correct: 0,
        exp: "Negativo en pasado simple: 'didn't' + forma base 'know'."
      },
      {
        q: "Grace Hopper _____ (earn) a PhD in mathematics from Yale University.",
        options: ["earned", "earnt", "earns", "was earn"],
        correct: 0,
        exp: "'Earn' es un verbo regular: earned."
      },
      {
        q: "Google _____ (hold) its Initial Public Offering (IPO) in August 2004.",
        options: ["held", "holded", "hold", "holding"],
        correct: 0,
        exp: "'Hold' es un verbo irregular con pasado simple 'held'."
      },
      {
        q: "Why _____ the production servers _____ (fail) last night?",
        options: ["did / fail", "did / failed", "were / failed", "do / fail"],
        correct: 0,
        exp: "Wh- question en pasado: 'Why did' + sujeto + verbo base 'fail'."
      },
      {
        q: "In 2015, Google _____ (restructure) its operations under Alphabet Inc.",
        options: ["restructured", "restructed", "restructuring", "restruct"],
        correct: 0,
        exp: "Verbo regular que termina en -e añade '-d': restructured."
      },
      {
        q: "They _____ (spend) two years optimizing the compiler algorithm.",
        options: ["spent", "spended", "spend", "spending"],
        correct: 0,
        exp: "'Spend' es un verbo irregular cuyo pasado simple es 'spent'."
      }
    ]
  }
};
