// Base de datos de Teoría y Gramática para la Unidad 3 (Segundo Parcial - Clases 8 a 14)
// Diseñada 100% en base a los materiales oficiales de Inglés Técnico I (UTN TUP)

export const UNIT3_THEORY = {
  title: "Unidad 3: Segundo Parcial de Inglés Técnico I",
  subtitle: "Contenidos oficiales completos de Clases 8 a 14: Cuantificadores, Comparativos/Superlativos, Present Perfect, Futuro, Conectores, Adverbios y Repaso General.",
  
  // ==========================================
  // CLASE 8: QUANTIFIERS & TECHNOLOGY
  // ==========================================
  clase8: {
    id: "clase-8",
    classNumber: 8,
    title: "Clase 8: Cuantificadores & Dispositivos Tecnológicos",
    subtitle: "Quantifiers (much, many, little, few, some, any), vocabulario de dispositivos y lectura de Wearable Technologies.",
    grammar: {
      topic: "Quantifiers (Cuantificadores)",
      definition: "Un cuantificador es una palabra o frase que se coloca antes de un sustantivo para indicar su cantidad. Los sustantivos pueden ser contables (countable: books, developers, servers, bug/bugs) o incontables (uncountable: water, code, memory, traffic, data, information).",
      rules: [
        {
          name: "Much vs. Many",
          formula: "Many + Sustantivos Contables Plurales  |  Much + Sustantivos Incontables",
          explanation: "Se usan principalmente en oraciones NEGATIVAS y PREGUNTAS. No se usan normalmente en oraciones afirmativas comunes (donde preferimos 'a lot of').",
          examples: [
            { en: "There isn't much RAM memory left on the cloud server.", es: "No queda mucha memoria RAM en el servidor cloud. (RAM = incontable, negativo)" },
            { en: "Were there many developers in the retrospective meeting?", es: "¿Había muchos desarrolladores en la reunión retrospectiva? (developers = contable, pregunta)" },
            { en: "How many pull requests did you review today?", es: "¿Cuántos pull requests revisaste hoy? (How many = contable)" },
            { en: "How much data is stored in the PostgreSQL database?", es: "¿Cuánta información está almacenada en la base PostgreSQL? (How much = incontable)" }
          ]
        },
        {
          name: "Too much vs. Too many",
          formula: "Too much + Incontable  |  Too many + Contable Plural",
          explanation: "¡Excepción importante!: 'Much' y 'Many' SÍ se usan en oraciones afirmativas cuando van precedidos por 'TOO' (demasiado/a/os/as).",
          examples: [
            { en: "There is too much network latency during peak hours.", es: "Hay demasiada latencia de red en horas pico. (Incontable)" },
            { en: "You have too many open browser tabs.", es: "Tienes demasiadas pestañas abiertas en el navegador. (Contable plural)" }
          ]
        },
        {
          name: "A lot of / Lots of",
          formula: "A lot of / Lots of + Contables Plurales O Incontables",
          explanation: "Se usan habitualmente en oraciones AFIRMATIVAS. 'Lots of' es más informal. Al final de la oración se usa 'a lot' o 'lots' (SIN 'of').",
          examples: [
            { en: "She spends a lot of time testing the API endpoints.", es: "Ella pasa mucho tiempo testeando los endpoints de la API." },
            { en: "We solved lots of difficult algorithmic problems.", es: "Resolvimos un montón de problemas algorítmicos difíciles." },
            { en: "‘Did you write code today?’ ‘Yes, I coded a lot.’", es: "‘¿Escribiste código hoy?’ ‘Sí, programé un montón.’ (Al final, sin 'of')" }
          ]
        },
        {
          name: "Few vs. A few  &  Little vs. A little",
          formula: "Few / A few (Contables)  |  Little / A little (Incontables)",
          explanation: "La presencia del artículo 'a' cambia radicalmente el significado:\n• CON 'A' (A few / A little) = Significado POSITIVO ('algunos/un poco, suficientes').\n• SIN 'A' (Few / Little) = Significado NEGATIVO ('casi nada, casi ninguno, insuficientes').",
          examples: [
            { en: "We have a few open tickets, so we can finish them today.", es: "Tenemos unos pocos tickets abiertos, así que podemos terminarlos hoy. (Positivo: suficientes/manejables)" },
            { en: "Few developers understand this legacy assembly code.", es: "Casi ningún desarrollador entiende este código assembly legacy. (Negativo: casi nadie)" },
            { en: "I have a little time before the meeting to review your PR.", es: "Tengo un poco de tiempo antes de la reunión para revisar tu PR. (Positivo: suficiente tiempo)" },
            { en: "There is little documentation for this library; we need more.", es: "Hay muy poca documentación para esta librería; necesitamos más. (Negativo: insuficiente)" }
          ]
        },
        {
          name: "Some vs. Any",
          formula: "Some en Afirmativas (+) y Pedidos/Ofertas  |  Any en Negativas (-) y Preguntas (?)",
          explanation: "Ambos se pueden usar con contables plurales o incontables. 'Some' se usa en interrogativas SOLAMENTE cuando ofrecemos o pedimos algo amablemente.",
          examples: [
            { en: "I found some critical vulnerabilities in the source code.", es: "Encontré algunas vulnerabilidades críticas en el código fuente. (Afirmativo)" },
            { en: "Does the repository have any automated test cases?", es: "¿Tiene el repositorio algún caso de prueba automatizado? (Pregunta)" },
            { en: "There aren't any available IP addresses in the subnet.", es: "No hay ninguna dirección IP disponible en la subred. (Negativo)" },
            { en: "Would you like some help with your Docker setup?", es: "¿Te gustaría algo de ayuda con tu configuración de Docker? (Ofrecimiento: se usa SOME)" },
            { en: "Can I have some more server bandwidth, please?", es: "¿Me darías más ancho de banda, por favor? (Petición: se usa SOME)" }
          ]
        }
      ]
    },
    vocabulary: {
      category: "Technology: Devices, Internet & IT Verbs",
      devices: [
        { term: "Laptop", definition: "A small computer that you can carry around.", translation: "Computadora portátil / laptop." },
        { term: "Desktop", definition: "A big computer that stays on a desk.", translation: "Computadora de escritorio." },
        { term: "Tablet", definition: "A small computer with a screen you touch to control it.", translation: "Tablet." },
        { term: "Smartphone", definition: "A mobile phone that works like a small computer.", translation: "Teléfono inteligente." },
        { term: "Screen", definition: "The flat part of a computer where you see images and words.", translation: "Pantalla / monitor." },
        { term: "Keyboard", definition: "The part with buttons where you type letters and numbers.", translation: "Teclado." },
        { term: "Touchscreen", definition: "A screen you can touch to control a device.", translation: "Pantalla táctil." },
        { term: "Touchpad", definition: "A small flat part on a laptop that you move with your finger.", translation: "Panel táctil / touchpad." },
        { term: "Mouse", definition: "A small device you move with your hand to control the computer.", translation: "Ratón / mouse." },
        { term: "Pen drive / Flash drive", definition: "A small device that stores files and can be plugged into a computer.", translation: "Memoria USB / pendrive." },
        { term: "Headphones", definition: "Devices you wear over your ears to listen to sound.", translation: "Auriculares." },
        { term: "Speaker", definition: "A device that makes sound louder on a computer.", translation: "Parlante / altavoz." }
      ],
      internet: [
        { term: "Website", definition: "A page or set of pages on the internet.", translation: "Sitio web." },
        { term: "URL", definition: "The web address you type to go to a website.", translation: "Dirección URL." },
        { term: "Browser", definition: "A program that helps you search and navigate the internet (Chrome, Firefox).", translation: "Navegador web." },
        { term: "Link", definition: "Some text or image you click to go to another web page.", translation: "Enlace / hipervínculo." },
        { term: "Tab", definition: "A section at the top of a browser that opens another page.", translation: "Pestaña del navegador." },
        { term: "Social media", definition: "Websites or apps where people communicate and share content.", translation: "Redes sociales." },
        { term: "Attachment", definition: "A file, photo or document sent with an email.", translation: "Archivo adjunto." },
        { term: "Streaming", definition: "Watching or listening to online video/audio without downloading first.", translation: "Transmisión en directo / streaming." }
      ],
      verbs: [
        { verb: "Plug in", definition: "Connect a device to a power source using a wire.", translation: "Enchufar / conectar." },
        { verb: "Unplug", definition: "Disconnect a device from electricity by removing a wire.", translation: "Desenchufar / desconectar." },
        { verb: "Charge", definition: "Connect a device to fill the battery with electrical power.", translation: "Cargar la batería." },
        { verb: "Switch on", definition: "Press a button to make a device start operating.", translation: "Encender / prender." },
        { verb: "Switch off", definition: "Press a button to stop a device from working.", translation: "Apagar." },
        { verb: "Sign in / Log in", definition: "Enter your username and password to start using an account.", translation: "Iniciar sesión." },
        { verb: "Sign out / Log out", definition: "Exit an account after using it.", translation: "Cerrar sesión." },
        { verb: "Go online", definition: "Connect to the internet.", translation: "Conectarse a internet." },
        { verb: "Upload", definition: "Copy a file from your device to the internet or cloud.", translation: "Subir / cargar un archivo." },
        { verb: "Download", definition: "Copy a file from the internet to your local device.", translation: "Descargar / bajar un archivo." },
        { verb: "Scroll up / down", definition: "Move the information on your screen vertically.", translation: "Desplazarse hacia arriba/abajo." },
        { verb: "Share", definition: "Make a file or link available for other people to see or use.", translation: "Compartir." }
      ]
    },
    reading: {
      title: "Reading: What Is Wearable Technology?",
      summary: "Wearable technology ('wearables') are electronic devices we wear as accessories, clothing, or implants. They are hands-free gadgets with microprocessors and internet connection. Early non-electronic examples were pocket watches and glasses. Modern wearables started with fitness trackers (like Fitbits in the 2010s). Health devices include 'iTBra' (breast cancer detection patch), 'Heartguide' (blood pressure smartwatch sharing data with doctors), and 'SmartSleep' (headband to track sleep patterns). Other wearables include smart jackets that hug someone from miles away, smart jewellery (rings/necklaces that send police alerts), and smart hats for listening to music without headphones.",
      keyQuestions: [
        { item: "Adam doesn't want to use headphones for music. He needs a...", answer: "smart hat" },
        { item: "A kind of wearable technology that is not electronic is...", answer: "glasses (or pocket watches)" },
        { item: "Alice is worried about breast cancer. She can wear an electronic...", answer: "patch (iTBra) inside her bra" },
        { item: "He wears a ... when running to count distance and calories called Fitbit.", answer: "fitness tracker" },
        { item: "Maria wants a headband called 'Smartsleep' to help her sleep. Device type:", answer: "headband" },
        { item: "Bob wears a kind of smartwatch that measures blood pressure called...", answer: "Heartguide" }
      ]
    },
    miniQuiz: [
      {
        q: "There aren't _____ bugs in the production release after our rigorous testing.",
        options: ["many", "much", "little", "lots"],
        correct: 0,
        exp: "'Bugs' es un sustantivo contable plural en oración negativa, por lo que lleva 'many'."
      },
      {
        q: "How _____ storage space is left on the server?",
        options: ["much", "many", "few", "any"],
        correct: 0,
        exp: "'Storage space' (espacio de almacenamiento) es incontable, por lo que se pregunta con 'How much'."
      },
      {
        q: "Would you like _____ assistance with configuring your database?",
        options: ["some", "any", "many", "little"],
        correct: 0,
        exp: "En ofrecimientos o solicitudes amables en interrogativo, se utiliza 'some' en lugar de 'any'."
      },
      {
        q: "We have _____ errors in the log file, so the deployment is considered safe.",
        options: ["few", "a few", "little", "much"],
        correct: 0,
        exp: "'Few' (sin 'a') tiene significado negativo ('casi ningún error'), denotando que prácticamente no hay fallos."
      },
      {
        q: "There is too _____ traffic on the API gateway right now.",
        options: ["much", "many", "few", "any"],
        correct: 0,
        exp: "'Traffic' es un sustantivo incontable. Con 'too' se forma 'too much'."
      },
      {
        q: "When you copy a file from your computer to the cloud server, you _____ it.",
        options: ["upload", "download", "unplug", "scroll"],
        correct: 0,
        exp: "'Upload' significa subir o transferir datos desde un dispositivo local a la nube o internet."
      },
      {
        q: "Which device is a patch worn inside a bra to detect breast cancer?",
        options: ["iTBra", "Heartguide", "SmartSleep", "Fitbit"],
        correct: 0,
        exp: "Según la lectura oficial de la Clase 8, el 'iTBra' es un parche electrónico para detectar cáncer de mama."
      },
      {
        q: "I have _____ free minutes before the sprint review; I can check your code.",
        options: ["a few", "few", "a little", "little"],
        correct: 0,
        exp: "'Minutes' es contable plural. 'A few' tiene sentido positivo: 'unos pocos minutos suficientes'."
      }
    ]
  },

  // ==========================================
  // CLASE 9: COMPARATIVES & SUPERLATIVES
  // ==========================================
  clase9: {
    id: "clase-9",
    classNumber: 9,
    title: "Clase 9: Comparativos, Superlativos & Comparación de Lenguajes IT",
    subtitle: "Reglas de adjetivos comparativos y superlativos, análisis de Python vs C, Java vs Go y JavaScript.",
    grammar: {
      topic: "Comparatives and Superlatives",
      definition: "Usamos la forma comparativa para comparar DOS cosas, lenguajes o entidades. Usamos la forma superlativa para destacar una entidad entre TRES o más.",
      comparativeRules: [
        {
          type: "Adjetivos Cortos (1 sílaba o 2 terminados en -y)",
          rule: "Añadir -er + than (o cambiar 'y' por -ier)",
          examples: ["clear -> clearer than", "fast -> faster than", "easy -> easier than", "hard -> harder than"]
        },
        {
          type: "Adjetivos Largos (2 o más sílabas)",
          rule: "More + Adjetivo + than",
          examples: ["readable -> more readable than", "powerful -> more powerful than", "useful -> more useful than", "common -> more common than"]
        },
        {
          type: "Adjetivos Irregulares",
          rule: "Formas especiales memorizadas",
          examples: ["good -> better than", "bad -> worse than", "far -> further / farther than"]
        },
        {
          type: "Estructura (not) as ... as",
          rule: "Tan ... como / No tan ... como (adjetivo en forma base)",
          examples: ["C is not as forgiving as Python.", "JavaScript is not as simple as Python for beginners."]
        },
        {
          type: "Modificadores de Grado",
          rule: "Much / A lot / A bit + Comparativo",
          examples: ["Python is much easier than C for data analysis.", "Cloud servers are a lot more expensive than local hardware."]
        }
      ],
      superlativeRules: [
        {
          type: "Adjetivos Cortos",
          rule: "The + Adjetivo + -est",
          examples: ["fast -> the fastest", "smart -> the smartest", "easy -> the easiest"]
        },
        {
          type: "Adjetivos Largos",
          rule: "The most + Adjetivo",
          examples: ["common -> the most common", "useful -> the most useful", "popular -> the most popular"]
        },
        {
          type: "Irregulares Superlativos",
          rule: "The best, The worst, The furthest",
          examples: ["good -> the best language for beginners", "bad -> the worst vulnerability"]
        },
        {
          type: "Uso de 'in' con Lugares / Grupos",
          rule: "The best IN the world / IN the class / IN the market (NO 'of')",
          examples: ["JavaScript is the most common language in the world for front-end."]
        },
        {
          type: "Superlativo + Ever + Present Perfect",
          rule: "The best / fastest code I have ever written",
          examples: ["This is the most efficient algorithm I have ever seen."]
        }
      ]
    },
    itComparisons: [
      {
        pair: "Python vs. C",
        summary: "Python es un lenguaje interpretado (se ejecuta línea por línea), lo que hace que depurar sea más sencillo (debugging easier), pero puede ralentizar el rendimiento en tareas complejas. Su sintaxis es simple y muy parecida al inglés ('forgiving'). Ideal para data science, machine learning y desarrollo rápido (rapid development). Por el contrario, C es un lenguaje compilado (super rápido y eficiente), permite manipulación de bajo nivel de memoria, pero su sintaxis es más compleja y menos tolerante a errores ('less forgiving'). Es la opción ideal para sistemas operativos y motores de videojuegos.",
        readingHighlights: [
          { feature: "Python", details: "Interpreted, simple syntax, forgiving, easier debugging, top choice for beginners, data science." },
          { feature: "C", details: "Compiled, super fast & efficient, low-level memory manipulation, harder to learn, operating systems & game engines." }
        ]
      },
      {
        pair: "Java vs. Go (Golang)",
        summary: "Java (desarrollado por Sun Microsystems) es orientado a objetos, verboso y corre sobre la JVM (Java Virtual Machine), lo que lo hace altamente portable. Destaca en aplicaciones empresariales de gran escala (enterprise applications) y posee un ecosistema y herramientas maduras (tooling). Go (desarrollado por Google) prioriza la simplicidad, la concurrencia nativa (goroutines) y la compilación veloz. Es ideal para microservicios y servicios en la nube (cloud services). Ambos ofrecen recolección de basura (garbage collection), pero Java usa abstracción e herencia, mientras Go prefiere composición y minimalismo.",
        readingHighlights: [
          { feature: "Java", details: "Developed by Sun Microsystems, runs on JVM, Object-Oriented, verbose, enterprise applications, mature tooling." },
          { feature: "Go", details: "Developed by Google, fast compilation, built-in concurrency (goroutines), lightweight for cloud & microservices, composition over inheritance." }
        ]
      },
      {
        pair: "Python vs. JavaScript",
        summary: "Python es más fácil de aprender y su código es más claro y legible. Es el mejor lenguaje para iniciarse y para ciencia de datos. JavaScript es más rápido en el navegador y es el más utilizado para el desarrollo frontend y sitios interactivos.",
        readingHighlights: [
          { feature: "Python", details: "Easier to learn, clearer code, best for data analysis & machine learning." },
          { feature: "JavaScript", details: "Faster in the browser, most common language for front-end development." }
        ]
      }
    ],
    glossary: [
      { term: "Concurrency", definition: "The ability of a program to run multiple tasks or processes at the same time (built-in in Go using goroutines).", translation: "Concurrencia." },
      { term: "Tooling", definition: "The set of development tools (debuggers, compilers, build systems) available for a language.", translation: "Herramientas de desarrollo / Tooling." },
      { term: "Garbage Collection", definition: "An automatic memory management feature that reclaims memory no longer in use to prevent memory leaks.", translation: "Recolección automática de basura / memoria." },
      { term: "Interpreted Language", definition: "A programming language executed instruction by instruction without prior compilation (e.g. Python).", translation: "Lenguaje interpretado." },
      { term: "Compiled Language", definition: "A language converted directly into machine code before execution for maximum speed (e.g. C, Go).", translation: "Lenguaje compilado." }
    ],
    miniQuiz: [
      {
        q: "Python code is _____ to read than C code for a beginner.",
        options: ["easier", "more easy", "easiest", "most easy"],
        correct: 0,
        exp: "'Easy' es un adjetivo de 2 sílabas terminado en '-y'; cambia por '-ier' en el comparativo: easier than."
      },
      {
        q: "JavaScript is the _____ common language for front-end web development.",
        options: ["most", "more", "much", "many"],
        correct: 0,
        exp: "'Common' es un adjetivo de 2 sílabas; su forma superlativa es 'the most common'."
      },
      {
        q: "Who developed the Go programming language?",
        options: ["Google", "Sun Microsystems", "Microsoft", "Oracle"],
        correct: 0,
        exp: "Según el texto oficial de la Clase 9, Go fue desarrollado por Google con foco en simplicidad y concurrencia."
      },
      {
        q: "Why is C better suited than Python for building operating systems?",
        options: ["Because it allows low-level memory control and maximum speed", "Because it is interpreted line by line", "Because its syntax reads like English", "Because it runs inside a browser"],
        correct: 0,
        exp: "C es un lenguaje compilado que permite manipulación de bajo nivel de memoria y ofrece máxima velocidad de ejecución."
      },
      {
        q: "Java applications run on top of which software platform?",
        options: ["JVM (Java Virtual Machine)", "V8 Engine", "Bare Metal only", "Docker exclusively"],
        correct: 0,
        exp: "Java corre sobre la JVM (Java Virtual Machine), lo que le otorga su alta portabilidad multiplataforma."
      },
      {
        q: "For many beginners, Python is the _____ language to start coding.",
        options: ["best", "better", "goodest", "most good"],
        correct: 0,
        exp: "El superlativo irregular de 'good' es 'the best'."
      },
      {
        q: "What is an automatic memory management feature in both Java and Go?",
        options: ["Garbage Collection", "Manual free() pointer control", "Synchronous blocking", "Interpreted bytecode"],
        correct: 0,
        exp: "'Garbage Collection' recupera automáticamente la memoria no utilizada para prevenir pérdidas de memoria (memory leaks)."
      },
      {
        q: "C's syntax is less _____ than Python's, meaning small errors cause failures.",
        options: ["forgiving", "forgiven", "forgive", "forgave"],
        correct: 0,
        exp: "En el texto oficial se describe la sintaxis de C como 'less forgiving' (menos tolerante / más estricta)."
      }
    ]
  },

  // ==========================================
  // CLASE 10: PRESENT PERFECT & WRITING A CV
  // ==========================================
  clase10: {
    id: "clase-10",
    classNumber: 10,
    title: "Clase 10: Present Perfect Tense & Redacción de CV para IT",
    subtitle: "Gramática de Present Perfect, contraste con Past Simple, CV de Martina López y 20 preguntas clave de vocabulario laboral.",
    grammar: {
      topic: "Present Perfect Tense",
      formula: "Sujeto + HAVE / HAS + Verbo en Pasado Participio (V3 / -ed)",
      rules: [
        {
          name: "1. Acciones iniciadas en el pasado que continúan en el presente",
          detail: "Se utiliza con 'SINCE' (punto específico de inicio) y 'FOR' (período de duración).",
          examples: [
            { en: "I have worked as a backend developer for three years.", es: "He trabajado como desarrollador backend durante tres años. (Sigo haciéndolo)" },
            { en: "She has lived in Buenos Aires since 2020.", es: "Ella ha vivido en Buenos Aires desde 2020." }
          ]
        },
        {
          name: "2. Experiencias de vida hasta el presente (sin especificar cuándo)",
          detail: "Común con 'EVER' (en preguntas: ¿alguna vez?) y 'NEVER' (nunca).",
          examples: [
            { en: "Have you ever deployed a production server on AWS?", es: "¿Alguna vez has desplegado un servidor de producción en AWS?" },
            { en: "I have never used COBOL in any real project.", es: "Nunca he usado COBOL en ningún proyecto real." },
            { en: "This is the cleanest code I have ever seen.", es: "Este es el código más limpio que jamás he visto." }
          ]
        },
        {
          name: "3. Acciones pasadas con resultado o relevancia en el presente",
          detail: "El foco está en la consecuencia actual, no en el momento exacto.",
          examples: [
            { en: "I can't log in to the database. I've lost my access token.", es: "No puedo iniciar sesión en la base de datos. He perdido mi token de acceso." },
            { en: "The server has crashed; we need to restart the container.", es: "El servidor se ha caído; necesitamos reiniciar el contenedor." }
          ]
        },
        {
          name: "4. Eventos recientes con marcadores de tiempo",
          detail: "Palabras clave: 'JUST' (hace un instante), 'ALREADY' (ya ocurrió antes de lo esperado), 'YET' (en preguntas y oraciones negativas), 'RECENTLY', 'THIS WEEK', 'TODAY'.",
          examples: [
            { en: "We have just pushed the latest commit to the repository.", es: "Acabamos de subir el último commit al repositorio." },
            { en: "Have you tested the responsive view yet?", es: "¿Ya has testeado la vista responsiva?" },
            { en: "The security team has recently discovered a new zero-day bug.", es: "El equipo de seguridad ha descubierto recientemente un nuevo bug de día cero." }
          ]
        },
        {
          name: "Diferencia Clave: 'Have been' vs. 'Have gone'",
          detail: "• Have/has been: La persona fue a un lugar Y YA REGRESÓ.\n• Have/has gone: La persona fue a un lugar Y TODAVÍA NO REGRESÓ.",
          examples: [
            { en: "Where have you been? - I've just been to the server room.", es: "¿Dónde has estado? - Recién estuve en la sala de servidores. (Ya volvió)" },
            { en: "Where is the tech lead? - She has gone to the client's office.", es: "¿Dónde está la líder técnica? - Se ha ido a la oficina del cliente. (Sigue allá)" }
          ]
        },
        {
          name: "Present Perfect vs. Past Simple: Regla de Oro",
          detail: "• PAST SIMPLE: Se usa OBLIGATORIAMENTE cuando hay marcadores de tiempo pasado FINALIZADO (yesterday, last week, two years ago, in 1998, when I was in college).\n• PRESENT PERFECT: Se usa con períodos de tiempo NO terminados (today, this week, so far) o sin tiempo específico.",
          examples: [
            { en: "CORRECTO: I saw the pull request yesterday. (Past Simple con yesterday)", es: "Vi el pull request ayer." },
            { en: "INCORRECTO: I have seen the pull request yesterday. ❌ (Error de parcial)", es: "No se usa Present Perfect con 'yesterday'." },
            { en: "CORRECTO: I have seen three pull requests today. (Present Perfect con today)", es: "He visto tres pull requests hoy. (El día sigue en curso)" }
          ]
        }
      ]
    },
    cvWriting: {
      topic: "English for IT: Writing a CV",
      essentialVerbs: [
        { verb: "Develop", meaning: "Desarrollar", example: "I develop web applications using JavaScript and React." },
        { verb: "Design", meaning: "Diseñar", example: "I design simple and user-friendly web interfaces." },
        { verb: "Manage", meaning: "Gestionar / Administrar", example: "I manage data in SQL databases." },
        { verb: "Maintain", meaning: "Mantener / Actualizar", example: "I maintain and update existing software." },
        { verb: "Solve", meaning: "Resolver", example: "I solve technical problems for users." },
        { verb: "Improve", meaning: "Mejorar", example: "I improve website performance and loading speed." },
        { verb: "Create", meaning: "Crear", example: "I create small projects and scripts using Python." },
        { verb: "Test", meaning: "Probar / Testear", example: "I test applications to find and fix errors." },
        { verb: "Collaborate", meaning: "Colaborar", example: "I collaborate with other developers on team projects." },
        { verb: "Support", meaning: "Dar soporte", example: "I support users with hardware and software problems." }
      ],
      keyVocabulary: [
        { term: "Qualifications", meaning: "Títulos y acreditaciones oficiales.", example: "I have relevant IT qualifications in programming." },
        { term: "Work experience", meaning: "Experiencia laboral práctica.", example: "I have practical work experience in technical support." },
        { term: "Skills", meaning: "Habilidades técnicas o blandas.", example: "My technical skills include Python, SQL, and Git." },
        { term: "Achievement", meaning: "Logro destacado.", example: "One achievement was creating a student management web app." },
        { term: "Responsibilities", meaning: "Responsabilidades y tareas del puesto.", example: "My responsibilities included database indexing and testing." },
        { term: "Degree", meaning: "Título universitario / terciario.", example: "I am studying for a degree in software development at UTN." },
        { term: "Internship", meaning: "Pasantía profesional.", example: "I am looking for an IT internship to gain work experience." },
        { term: "Deadline", meaning: "Fecha límite de entrega de un proyecto.", example: "I always organize my tasks to meet project deadlines." },
        { term: "Troubleshooting", meaning: "Diagnóstico y resolución de fallos técnicos.", example: "I have strong hardware and software troubleshooting skills." },
        { term: "Programming languages", meaning: "Lenguajes de programación.", example: "I know several programming languages including Java and C#." }
      ],
      sampleResume: {
        candidate: "Martina López",
        role: "Junior IT Developer",
        education: "Technical Degree in Software Development (in progress) at Instituto Superior de Tecnología.",
        skills: "HTML, CSS, JavaScript, SQL, Python; design user-friendly pages; testing and troubleshooting.",
        project: "Student Web Application Project (developed with 3 classmates to manage student records and meet deadlines).",
        volunteer: "Volunteer IT Support at Community Centre (supported users with basic issues, software installations, and improved communication skills)."
      }
    },
    miniQuiz: [
      {
        q: "Our software team will _____ a mobile application for the new corporate client.",
        options: ["develop", "deadline", "qualification", "troubleshooting"],
        correct: 0,
        exp: "El verbo de acción adecuado para crear software es 'develop' (desarrollar)."
      },
      {
        q: "I can _____ technical problems and find practical solutions for end users.",
        options: ["solve", "achievement", "internship", "degree"],
        correct: 0,
        exp: "'Solve technical problems' significa resolver problemas técnicos."
      },
      {
        q: "A university certificate in computer science is an example of a _____.",
        options: ["degree", "deadline", "skill", "troubleshooting"],
        correct: 0,
        exp: "Un certificado o diploma universitario es un 'degree' (título académico)."
      },
      {
        q: "The final date and time for completing a sprint or project is the _____.",
        options: ["deadline", "achievement", "internship", "qualification"],
        correct: 0,
        exp: "La fecha límite para entregar un proyecto se denomina 'deadline'."
      },
      {
        q: "She _____ (work) at this tech company since she graduated in 2021.",
        options: ["has worked", "worked", "is working", "works"],
        correct: 0,
        exp: "La preposición 'since' con un punto de inicio en el pasado requiere Present Perfect: 'has worked'."
      },
      {
        q: "A: 'Where is Martin?' B: 'He _____ to the client's office. He won't be back until 5 p.m.'",
        options: ["has gone", "has been", "went", "is going"],
        correct: 0,
        exp: "Como Martin fue y aún NO ha regresado, se usa 'has gone' (no 'has been')."
      },
      {
        q: "Which sentence is grammatically INCORRECT for a finished past time?",
        options: ["I have updated the production server yesterday.", "I updated the production server yesterday.", "I have updated the server today.", "We pushed the commits last night."],
        correct: 0,
        exp: "'I have updated... yesterday' es incorrecto porque el Present Perfect no puede combinarse con 'yesterday'."
      },
      {
        q: "Fixing network, hardware, or software problems through systematic analysis is called _____.",
        options: ["troubleshooting", "internship", "qualification", "responsibility"],
        correct: 0,
        exp: "'Troubleshooting' es el término técnico para el diagnóstico y resolución metódica de fallos."
      }
    ]
  },

  // ==========================================
  // CLASE 12: FUTURE (WILL & GOING TO) & INTERVIEWS
  // ==========================================
  clase12: {
    id: "clase-12",
    classNumber: 12,
    title: "Clase 12: Futuro (Will vs. Going to) & Consejos para Entrevistas Laborales",
    subtitle: "Predicciones y decisiones en futuro, 10 DOs y DON'Ts para estudiantes de IT y reporte de AI Smart Glasses.",
    grammar: {
      topic: "Future: Will vs. Be Going To",
      rules: [
        {
          aspect: "1. Predicciones sobre el Futuro",
          will: "Se usa WILL para predicciones basadas en lo que uno CREE, piensa u opina (opiniones subjetivas sin evidencia visual directa). Palabras comunes: 'I think...', 'I believe...', 'Probably...'.\nEj: 'I think AI will change software development completely.'",
          goingTo: "Se usa BE GOING TO para predicciones basadas en EVIDENCIA PRESENTE que se ve claramente en este momento.\nEj: 'Look at that syntax error on line 42! The build is going to fail.'",
          contrastExample: "• 'We need to hurry up; we'll be late.' (=Creo que llegaremos tarde)\n• 'The meeting starts in 1 minute and we are far away. We are going to be late!' (=Evidencia obvia)"
        },
        {
          aspect: "2. Decisiones",
          will: "Se usa WILL para decisiones ESPONTÁNEAS tomadas en el momento exacto en que se habla (instant decisions).\nEj: 'Oh, the server disk is full? Don't worry, I'll delete the cache right now.'",
          goingTo: "Se usa BE GOING TO para decisiones YA TOMADAS antes del momento de hablar (planes, intenciones previas).\nEj: 'Why did you open Visual Studio Code?' - 'Because I am going to develop a new React component.'",
          contrastExample: "• 'Sarah needs to talk to you.' - 'Oh, I didn't know. I'll call her now.' (Decisión en el momento)\n• 'Sarah needs to talk to you.' - 'Yes, I know. I'm going to call her this afternoon.' (Decidido previamente)"
        },
        {
          aspect: "3. Promesas, Ofertas y Peticiones",
          will: "• Ofertas: 'I'll carry that laptop bag for you.' / 'Shall I help you?'\n• Promesas: 'I will submit the pull request on time, I promise.'",
          goingTo: "No se usa comúnmente para ofertas espontáneas de ayuda."
        }
      ]
    },
    interviewGuide: {
      topic: "Job Interviews: 5 DOs and 5 DON'Ts for IT Students",
      introduction: "El currículum te ayuda a conseguir una entrevista laboral, pero tu desempeño en la entrevista te ayuda a conseguir el trabajo.",
      dos: [
        { number: 1, title: "Do your research", detail: "Averigua sobre la empresa, sus productos y el stack tecnológico que utiliza. Demuestra genuino interés por el puesto." },
        { number: 2, title: "Do talk about your skills", detail: "Explica qué lenguajes (Python, Java, SQL), frameworks y herramientas (Git) conoces, dando ejemplos prácticos de cómo los usaste." },
        { number: 3, title: "Do mention your achievements", detail: "Habla sobre proyectos completados en la facultad o por tu cuenta (ej: una app que programaste o una base de datos que diseñaste)." },
        { number: 4, title: "Do prepare answers to common questions", detail: "Practica cómo explicar tus fortalezas, áreas de mejora y objetivos de carrera. Conoce al detalle lo que pusiste en tu CV." },
        { number: 5, title: "Do ask questions", detail: "Pregunta sobre la dinámica del equipo, la arquitectura del software o posibilidades de desarrollo profesional (professional development)." }
      ],
      donts: [
        { number: 6, title: "Don't arrive late", detail: "Planifica el viaje o testea tu conexión a internet antes de una entrevista online. Conéctate unos minutos antes." },
        { number: 7, title: "Don't lie about your qualifications", detail: "Sé honesto si no conoces una tecnología. Explica que tienes la disposición y capacidad de aprenderla rápido." },
        { number: 8, title: "Don't speak negatively about previous employers or teachers", detail: "No hables mal de compañeros o jefes anteriores; enfócate en lo que aprendiste y cómo resolviste problemas." },
        { number: 9, title: "Don't give very short answers", detail: "No respondas con un simple sí o no. Explica tu rol en proyectos, las herramientas elegidas y los resultados obtenidos." },
        { number: 10, title: "Don't forget your body language", detail: "Evita mirar el celular o interrumpir. Escucha con atención, habla claro y mantén una actitud confiada y profesional." }
      ]
    },
    smartGlassesReading: {
      title: "Listening / Case Study: AI Smart Glasses",
      summary: "Empresas como Meta (Ray-Ban smart glasses), Snap (Specs) y Xiaomi compiten por la supremacía de la inteligencia artificial incorporando asistentes ópticos en anteojos cotidianos. Permiten grabar video en primera persona mientras experimentas la realidad, escuchar música sin auriculares y consultar al asistente de IA con comandos de voz. Mark Zuckerberg predice: 'Personal devices like glasses that can see what we see, hear what we hear, and interact with us throughout the day are going to become our main computing devices.'",
      vocabulary: [
        { en: "Betting", es: "Apostando" },
        { en: "Earnings call", es: "Llamada para informar sobre ganancias" },
        { en: "Throughout", es: "A lo largo de / a través de" },
        { en: "Down the road", es: "En el futuro" },
        { en: "To tout", es: "Pregonar / resaltar las ventajas de algo" },
        { en: "To demo", es: "Demostrar / hacer una demostración" },
        { en: "Embedded", es: "Incorporado / embebido" },
        { en: "Instead of", es: "En lugar de / en vez de" },
        { en: "And yet", es: "Y aun así / sin embargo" }
      ]
    },
    miniQuiz: [
      {
        q: "‘Oh, look! The cloud server CPU is at 100% and smoke is coming out!’ It _____ crash!",
        options: ["is going to", "will", "would", "going to"],
        correct: 0,
        exp: "Hay evidencia física directa e inmediata en el presente; se utiliza 'is going to'."
      },
      {
        q: "‘We don’t have any paper in the office printer.’ ‘Don’t worry, I _____ go and get some.’",
        options: ["will", "am going to", "going to", "would to"],
        correct: 0,
        exp: "Decisión instantánea y espontánea tomada en el momento de la conversación: se usa 'will'."
      },
      {
        q: "Why should an IT student research a company before attending a job interview?",
        options: ["To show genuine interest in the company and position", "To avoid answering technical questions", "To find the interviewer's private salary", "To skip the practical code test"],
        correct: 0,
        exp: "Investigar la empresa demuestra interés genuino, preparación y profesionalismo."
      },
      {
        q: "What should you do if an interviewer asks about a programming language you don't know?",
        options: ["Be honest and explain that you are willing and eager to learn it", "Pretend that you are a senior expert in it", "Refuse to answer any further questions", "Blame your university teachers"],
        correct: 0,
        exp: "La honestidad combinada con una actitud proactiva de aprendizaje es la recomendación oficial del texto."
      },
      {
        q: "According to the interview guide, what does 'professional development' refer to?",
        options: ["Learning new technical skills and advancing in your career", "Submitting a resignation letter", "Writing a resume with zero experience", "Taking prolonged vacations"],
        correct: 0,
        exp: "'Professional development' hace referencia al crecimiento profesional y adquisición de nuevas competencias."
      },
      {
        q: "Which company partnered with Ray-Ban to launch popular AI smart glasses?",
        options: ["Meta", "Apple", "Google", "Microsoft"],
        correct: 0,
        exp: "Meta se asoció con Ray-Ban para comercializar los anteojos inteligentes analizados en la Clase 12."
      }
    ]
  },

  // ==========================================
  // CLASE 13: BASIC CONNECTORS & OPENAI DEVICE
  // ==========================================
  clase13: {
    id: "clase-13",
    classNumber: 13,
    title: "Clase 13: Conectores Básicos & El Nuevo Dispositivo de OpenAI",
    subtitle: "Uso de And, But, Or, So, Because con paralelismo sintáctico, y análisis del dispositivo de hardware IA sin pantalla.",
    grammar: {
      topic: "Basic Connectors (And, But, Or, So, Because)",
      connectors: [
        {
          word: "AND (Y)",
          meaning: "Adición de información o ideas similares ('too' o 'in addition').",
          rules: "Cuando conectamos oraciones con el mismo sujeto, no es necesario repetirlo. Además, los elementos conectados deben compartir la misma categoría gramatical (paralelismo: verbo -ing con -ing, infinitivo con infinitivo).",
          examples: [
            { en: "My brother is a systems analyst, and my sister is a frontend designer.", es: "Mi hermano es analista de sistemas y mi hermana es diseñadora frontend." },
            { en: "She opened the terminal and started the local server.", es: "Ella abrió la terminal y levantó el servidor local. (Se omite el segundo 'she')" },
            { en: "CORRECTO: I like coding and designing interfaces.", es: "Ambos verbos con -ing (paralelismo)." }
          ]
        },
        {
          word: "BUT (Pero)",
          meaning: "Contraste u oposición de información diferente.",
          rules: "Introduce una objeción, sorpresa o restricción a lo expuesto en la primera cláusula.",
          examples: [
            { en: "I studied all night for the exam, but I found the SQL section challenging.", es: "Estudié toda la noche para el examen, pero encontré desafiante la sección de SQL." },
            { en: "The new framework is powerful, but its documentation is scarce.", es: "El nuevo framework es potente, pero su documentación es escasa." }
          ]
        },
        {
          word: "OR (O)",
          meaning: "Conectar alternativas o posibilidades.",
          rules: "¡Atención a oraciones negativas!: Se usa 'OR' (NO 'and') para indicar 'ni una cosa ni la otra'.",
          examples: [
            { en: "You can write the backend in Node.js or in Python.", es: "Puedes escribir el backend en Node.js o en Python. (Alternativas)" },
            { en: "I don't know Python or C. (INCORRECTO en inglés: 'I don't know Python and C' ❌)", es: "No sé ni Python ni C." }
          ]
        },
        {
          word: "SO (Por lo tanto / Así que)",
          meaning: "Introduce la consecuencia o el resultado de una acción previa.",
          rules: "Estructura: [Causa / Situación] + , so + [Resultado / Consecuencia].",
          examples: [
            { en: "The database query was very slow, so we created an index.", es: "La consulta a la base de datos era muy lenta, así que creamos un índice." },
            { en: "It was getting late, so the development team postponed the deployment.", es: "Se estaba haciendo tarde, por lo tanto el equipo pospuso el despliegue." }
          ]
        },
        {
          word: "BECAUSE (Porque)",
          meaning: "Introduce la causa, el motivo o la razón de algo.",
          rules: "Estructura: [Resultado] + because + [Causa / Motivo].",
          examples: [
            { en: "We created a database index because the query was too slow.", es: "Creamos un índice en la base de datos porque la consulta era demasiado lenta." },
            { en: "I am refactoring this function because it contains duplicate logic.", es: "Estoy refactorizando esta función porque contiene lógica duplicada." }
          ]
        }
      ]
    },
    reading: {
      title: "Reading: A New AI Device from OpenAI",
      summary: "OpenAI, la compañía creadora de ChatGPT, trabaja en un dispositivo físico de inteligencia artificial. Aún es un prototipo y su producción comercial podría comenzar en 2027. Será sumamente compacto (del tamaño de un antiguo iPod Shuffle) y no tendrá pantalla tradicional; en su lugar, utilizará cámaras y micrófonos para interactuar por voz con el entorno. Para su diseño de hardware, OpenAI adquirió la empresa 'io Products'. Para los programadores, este dispositivo será revolucionario: permitirá consultar verbalmente errores de código ('Can you explain this error?') o solicitar funciones en Python ('Please suggest a simple Python function') en tiempo real sin estar frente a una computadora.",
      vocabularyMatch: [
        { word: "Prototype", defEn: "A first version of something.", defEs: "Prototipo (primera versión de prueba)." },
        { word: "Portable", defEn: "Easy to carry around.", defEs: "Portátil (fácil de transportar)." },
        { word: "Hardware", defEn: "Physical parts of a computer or electronic device.", defEs: "Hardware (componentes físicos)." },
        { word: "Microphone", defEn: "A part that listens to sounds and voices.", defEs: "Micrófono." },
        { word: "Screen", defEn: "The flat part where you see text or visual images.", defEs: "Pantalla." }
      ]
    },
    miniQuiz: [
      {
        q: "The unit tests failed, _____ we did not push our code to the main branch.",
        options: ["so", "because", "but", "or"],
        correct: 0,
        exp: "'So' introduce el resultado o consecuencia directa del fallo de las pruebas."
      },
      {
        q: "We could not access the production database _____ the network was offline.",
        options: ["because", "so", "but", "and"],
        correct: 0,
        exp: "'Because' introduce la causa o motivo por el cual no se pudo acceder a la base."
      },
      {
        q: "I don't like writing frontend CSS _____ fixing UI layout bugs.",
        options: ["or", "and", "so", "because"],
        correct: 0,
        exp: "En oraciones negativas en inglés, para unir dos cosas que no se hacen o no gustan se usa 'or' (ni una cosa ni la otra)."
      },
      {
        q: "The new AI device from OpenAI will be portable _____ it might not have a screen.",
        options: ["and", "because", "so", "or"],
        correct: 0,
        exp: "Añade una característica complementaria similar: es portátil Y podría no tener pantalla."
      },
      {
        q: "What company did OpenAI purchase to assist with designing the hardware device?",
        options: ["io Products", "Snapchat", "Google", "DeepMind"],
        correct: 0,
        exp: "El texto oficial de la Clase 13 menciona expresamente la compra de la compañía 'io Products'."
      },
      {
        q: "How can coders use the screenless AI device while away from their desks?",
        options: ["By asking it to explain code errors or suggest functions via voice", "By connecting an external mechanical keyboard", "By replacing their fiber-optic internet", "By compiling assembly code manually"],
        correct: 0,
        exp: "Los desarrolladores podrán pedirle por voz que explique errores o sugiera funciones en tiempo real."
      }
    ]
  },

  // ==========================================
  // CLASE 14: ADVERBS OF MANNER & ALL TENSES REVIEW
  // ==========================================
  clase14: {
    id: "clase-14",
    classNumber: 14,
    title: "Clase 14: Adverbios de Modo & Repaso Integral de Todos los Tiempos Verbales",
    subtitle: "Uso y posición de adverbs of manner, adjetivos terminados en -ly, y tabla maestra comparativa de todos los tiempos verbales para el parcial.",
    grammar: {
      adverbsOfManner: {
        topic: "Adverbs of Manner and Adjectives",
        use: "Los adverbios de modo se usan para describir CÓMO ocurre una acción (describen al verbo). Los adjetivos, en cambio, describen a un sustantivo o van después del verbo 'to be'.",
        position: "Se colocan después del verbo principal o, si hay un objeto directo, DESPUÉS del objeto (Verbo + Objeto + Adverbio). NUNCA entre el verbo y el objeto.",
        examples: [
          { en: "He drives carefully. / She codes quickly.", es: "El adverbio describe cómo conduce o cómo programa (después del verbo)." },
          { en: "She plays the guitar well. (INCORRECTO: She plays well the guitar ❌)", es: "El adverbio va después del objeto 'the guitar'." },
          { en: "Robert is a good programmer. (Adjetivo describiendo al sustantivo programmer)", es: "Robert es un buen programador." },
          { en: "Robert programs well. (Adverbio de modo describiendo cómo programa)", es: "Robert programa bien." }
        ],
        qualifiers: "Se pueden intensificar con 'very', 'really' o 'quite' antes del adverbio (ej: 'He replies quite quickly').",
        spellingRules: [
          { rule: "Regla general: Añadir -ly al adjetivo", examples: ["quick -> quickly", "slow -> slowly", "careful -> carefully", "bad -> badly"] },
          { rule: "Terminados en consonante + 'y': Cambiar a -ily", examples: ["easy -> easily", "heavy -> heavily", "happy -> happily"] },
          { rule: "Terminados en -le: Cambiar por -ly", examples: ["simple -> simply", "terrible -> terribly"] },
          { rule: "Irregulares: Mismo formato o cambio especial", examples: ["good -> well", "fast -> fast", "hard -> hard", "late -> late"] }
        ],
        warningLyAdjectives: {
          title: "¡ALERTA DE EXAMEN!: Palabras terminadas en -ly que son ADJETIVOS, NO adverbios",
          words: ["friendly (amistoso)", "lovely (encantador)", "silly (tonto/disparatado)", "lonely (solitario)"],
          rule: "Estas palabras terminan en -ly pero son ADJETIVOS. NO se pueden transformar en adverbios de modo agregando otro -ly. Para usarlas adverbialmente se dice: 'in a friendly way'."
        }
      },
      allTensesMasterTable: [
        {
          tense: "Simple Present",
          uses: "Hábitos, rutinas, hechos universales y especificaciones técnicas permanentes.",
          formula: "Sujeto + Verbo Base (+ -s/-es en 3ra persona he/she/it). Neg: don't / doesn't + base.",
          markers: "always, usually, often, sometimes, never, every day, on Mondays."
        },
        {
          tense: "Present Continuous",
          uses: "Acciones en progreso ahora mismo, situaciones temporales y planes futuros confirmados.",
          formula: "Sujeto + am / is / are + Verbo-ING. Neg: am not / isn't / aren't + -ing.",
          markers: "now, right now, at the moment, currently, this week, today."
        },
        {
          tense: "Past Simple",
          uses: "Acciones concluidas en un momento cerrado y específico del pasado, e historias cronológicas.",
          formula: "Sujeto + Verbo en Pasado (-ed o irregular). Neg: didn't + Verbo en forma base.",
          markers: "yesterday, last night, two years ago, in 1998, when I was a child."
        },
        {
          tense: "Past Continuous",
          uses: "Acciones que estaban en curso en un momento determinado del pasado o contexto en relatos.",
          formula: "Sujeto + was / were + Verbo-ING. Neg: wasn't / weren't + -ing.",
          markers: "yesterday at 7 p.m., while I was coding, when the power went off."
        },
        {
          tense: "Present Perfect",
          uses: "Experiencias de vida hasta hoy, situaciones no terminadas (since/for) y eventos recientes.",
          formula: "Sujeto + have / has + Pasado Participio. Neg: haven't / hasn't + participio.",
          markers: "already, yet, just, recently, ever, never, so far, since, for, this week."
        },
        {
          tense: "Future: Will",
          uses: "Decisiones espontáneas en el momento de hablar, predicciones subjetivas, promesas y ofertas.",
          formula: "Sujeto + will + Verbo en forma base. Neg: won't + base.",
          markers: "I think, probably, tomorrow, next week, soon."
        },
        {
          tense: "Future: Be Going To",
          uses: "Planes e intenciones previas ya decididas, y predicciones con evidencia física visible.",
          formula: "Sujeto + am / is / are + going to + Verbo en base. Neg: am not / isn't / aren't going to.",
          markers: "Look at that!, tonight, this weekend, next year (planificado)."
        }
      ]
    },
    miniQuiz: [
      {
        q: "Our senior engineer writes unit tests very _____ to prevent production outages.",
        options: ["carefully", "careful", "carefulness", "caring"],
        correct: 0,
        exp: "Se requiere un adverbio de modo para describir cómo escribe ('carefully')."
      },
      {
        q: "Which of the following words ending in '-ly' is an ADJECTIVE and NOT an adverb?",
        options: ["friendly", "quickly", "badly", "easily"],
        correct: 0,
        exp: "'Friendly' es un adjetivo (amistoso), no un adverbio de modo."
      },
      {
        q: "Sara is a _____ typist; she types _____ on her mechanical keyboard.",
        options: ["fast / fast", "fast / fastly", "fastly / fast", "quick / quick"],
        correct: 0,
        exp: "'Fast' es tanto adjetivo como adverbio invariable. 'Fastly' NO existe en inglés."
      },
      {
        q: "‘Look at those dark storm clouds! It _____ rain.’",
        options: ["is going to", "will", "would", "shall"],
        correct: 0,
        exp: "Predicción basada en evidencia visual presente: se usa 'is going to'."
      },
      {
        q: "We _____ (not / meet) the client last Monday because of the national holiday.",
        options: ["didn't meet", "haven't met", "didn't met", "weren't meet"],
        correct: 0,
        exp: "'Last Monday' es pasado cerrado: requiere Past Simple 'didn't' + verbo en forma base 'meet'."
      },
      {
        q: "I _____ (never / see) such an innovative AI wearable device before.",
        options: ["have never seen", "never saw", "am never seeing", "has never seen"],
        correct: 0,
        exp: "Experiencia de vida con 'never' y 'before' requiere Present Perfect con 'I': 'have never seen'."
      }
    ]
  }
};

export const UNIT3_CLASSES = [
  {
    id: 8,
    key: 'clase8',
    label: 'Clase 8',
    title: 'Cuantificadores & Dispositivos IT',
    shortTitle: 'Cuantificadores',
    description: 'Much, many, few, little, some, any & Hardware IT',
    questionCount: 20,
    emoji: '⚖️',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 9,
    key: 'clase9',
    label: 'Clase 9',
    title: 'Comparativos & Present Perfect',
    shortTitle: 'Comparativos & Pres. Perfect',
    description: 'Python vs C vs Java vs Go & Present Perfect Tense (80% prioridad)',
    questionCount: 53,
    emoji: '🚀',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 10,
    key: 'clase10',
    label: 'Clase 10',
    title: 'Present Perfect & CV Profesional IT',
    shortTitle: 'Present Perfect & CV',
    description: '80% Present Perfect Tense (have/has, since/for, participios) & CV IT',
    questionCount: 52,
    emoji: '🎯',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 12,
    key: 'clase12',
    label: 'Clase 12',
    title: 'Futuro (Will / Going to) & Entrevistas',
    shortTitle: 'Futuro & Entrevistas',
    description: 'Will vs Going To, Smart Glasses, DOs & DONTs IT',
    questionCount: 16,
    emoji: '🔮',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 13,
    key: 'clase13',
    label: 'Clase 13',
    title: 'Conectores & Dispositivo OpenAI',
    shortTitle: 'Conectores & OpenAI',
    description: 'And, but, or, so, because, paralelismo y audio AI',
    questionCount: 12,
    emoji: '🔗',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 14,
    key: 'clase14',
    label: 'Clase 14',
    title: 'Adverbios & Repaso de Tiempos',
    shortTitle: 'Adverbios & Repaso',
    description: 'Adverbios de modo -ly, repaso Presente, Pasado y Futuro',
    questionCount: 14,
    emoji: '⚡',
    gradient: 'from-violet-500 to-fuchsia-500'
  }
];

