// Base de datos de Verbos Irregulares para el buscador interactivo
// Incluye todos los verbos de las Clases 5 y 6, verbos frecuentes en desarrollo de software
// y una lista integral para aprendizaje de inglés.

export const IRREGULAR_VERBS = [
  {
    base: "be",
    past: "was / were",
    participle: "been",
    translation: "ser / estar",
    example: "Margaret Hamilton was the lead software engineer for Apollo 11.",
    category: "common",
    itContext: "The server was overloaded during the launch event."
  },
  {
    base: "become",
    past: "became",
    participle: "become",
    translation: "convertirse / volverse",
    example: "Brin and Page became billionaires when Google went public.",
    category: "common",
    itContext: "Python became one of the most popular programming languages."
  },
  {
    base: "begin",
    past: "began",
    participle: "begun",
    translation: "empezar / comenzar",
    example: "The research project began at Stanford University in 1996.",
    category: "common",
    itContext: "The automated test suite began running at midnight."
  },
  {
    base: "break",
    past: "broke",
    participle: "broken",
    translation: "romper / descomponer",
    example: "The unexpected input broke the database connection.",
    category: "it_frequent",
    itContext: "The recent update broke backwards compatibility."
  },
  {
    base: "bring",
    past: "brought",
    participle: "brought",
    translation: "traer / aportar",
    example: "The new UX design brought higher user satisfaction.",
    category: "common",
    itContext: "She brought innovative ideas to the agile retrospective."
  },
  {
    base: "build",
    past: "built",
    participle: "built",
    translation: "construir / compilar",
    example: "The development team built the flight software in assembly code.",
    category: "it_frequent",
    itContext: "We built a scalable microservice architecture."
  },
  {
    base: "buy",
    past: "bought",
    participle: "bought",
    translation: "comprar",
    example: "In 2006, Google bought YouTube for $1.65 billion.",
    category: "common",
    itContext: "The company bought high-end cloud compute instances."
  },
  {
    base: "catch",
    past: "caught",
    participle: "caught",
    translation: "atrapar / capturar (excepciones)",
    example: "The try-catch block caught the null pointer exception safely.",
    category: "it_frequent",
    itContext: "The QA team caught three critical bugs before release."
  },
  {
    base: "choose",
    past: "chose",
    participle: "chosen",
    translation: "elegir / seleccionar",
    example: "They chose Python because of its clean syntax and simplicity.",
    category: "common",
    itContext: "The team chose React for the web application frontend."
  },
  {
    base: "come",
    past: "came",
    participle: "come",
    translation: "venir / llegar",
    example: "The solution came after hours of debugging the memory leak.",
    category: "common",
    itContext: "News of their acquisition came out several months later."
  },
  {
    base: "cost",
    past: "cost",
    participle: "cost",
    translation: "costar",
    example: "The cloud database migration cost less than anticipated.",
    category: "no_change",
    itContext: "Downtime during peak hours cost thousands of dollars."
  },
  {
    base: "cut",
    past: "cut",
    participle: "cut",
    translation: "cortar / reducir",
    example: "We cut loading times by 50% using asset minification.",
    category: "no_change",
    itContext: "The startup cut server costs using serverless functions."
  },
  {
    base: "do",
    past: "did",
    participle: "done",
    translation: "hacer",
    example: "What did the software engineer do in the 1960s?",
    category: "common",
    itContext: "The automated script did all the backups properly."
  },
  {
    base: "draw",
    past: "drew",
    participle: "drawn",
    translation: "dibujar / trazar",
    example: "The UI designer drew the wireframes on Figma.",
    category: "common",
    itContext: "The architect drew the system flow diagram."
  },
  {
    base: "drink",
    past: "drank",
    participle: "drunk",
    translation: "beber",
    example: "The developer drank three cups of coffee during the sprint.",
    category: "common",
    itContext: "We drank coffee before the morning standup."
  },
  {
    base: "drive",
    past: "drove",
    participle: "driven",
    translation: "conducir / impulsar",
    example: "User feedback drove the next iteration of the app.",
    category: "common",
    itContext: "Test-driven development drove our engineering culture."
  },
  {
    base: "eat",
    past: "ate",
    participle: "eaten",
    translation: "comer",
    example: "The team ate lunch together after deploying the hotfix.",
    category: "common",
    itContext: "Memory leaks ate up all available server RAM."
  },
  {
    base: "fall",
    past: "fell",
    participle: "fallen",
    translation: "caer",
    example: "Server response times fell significantly after caching was added.",
    category: "common",
    itContext: "The website fell offline for 5 minutes during maintenance."
  },
  {
    base: "feel",
    past: "felt",
    participle: "felt",
    translation: "sentir",
    example: "The engineers felt confident after passing all integration tests.",
    category: "common",
    itContext: "Users felt the new interface was much faster."
  },
  {
    base: "find",
    past: "found",
    participle: "found",
    translation: "encontrar",
    example: "I found the perfect remote programming job two years ago.",
    category: "it_frequent",
    itContext: "The static analysis tool found syntax errors in the PR."
  },
  {
    base: "fly",
    past: "flew",
    participle: "flown",
    translation: "volar",
    example: "The Apollo 11 astronauts flew safely to the Moon.",
    category: "common",
    itContext: "She flew to Silicon Valley for the developer conference."
  },
  {
    base: "forget",
    past: "forgot",
    participle: "forgotten",
    translation: "olvidar",
    example: "The developer forgot to update the environment variables.",
    category: "common",
    itContext: "Never forgot to commit changes before switching branches."
  },
  {
    base: "get",
    past: "got",
    participle: "got / gotten",
    translation: "obtener / conseguir",
    example: "She got a degree in computer science from University of Maryland.",
    category: "common",
    itContext: "The HTTP GET request got a 200 OK response."
  },
  {
    base: "give",
    past: "gave",
    participle: "given",
    translation: "dar / otorgar",
    example: "The CTO gave the team permission to refactor the legacy module.",
    category: "common",
    itContext: "The terminal gave clear error diagnostics."
  },
  {
    base: "go",
    past: "went",
    participle: "gone",
    translation: "ir",
    example: "The founders went on to create Alphabet in 2015.",
    category: "common",
    itContext: "The website went live yesterday afternoon."
  },
  {
    base: "have",
    past: "had",
    participle: "had",
    translation: "tener / haber",
    example: "Google Glass had limited success in the commercial market.",
    category: "common",
    itContext: "The previous server version had critical vulnerabilities."
  },
  {
    base: "hear",
    past: "heard",
    participle: "heard",
    translation: "oír / escuchar",
    example: "Have you heard about the pioneer women in technology?",
    category: "common",
    itContext: "The manager heard the developers' concerns about deadlines."
  },
  {
    base: "hide",
    past: "hid",
    participle: "hidden",
    translation: "ocultar / esconder",
    example: "The CSS property hid the modal container from view.",
    category: "it_frequent",
    itContext: "They hid sensitive API keys inside .env configuration."
  },
  {
    base: "hold",
    past: "held",
    participle: "held",
    translation: "sostener / llevar a cabo",
    example: "Google held its Initial Public Offering in August 2004.",
    category: "common",
    itContext: "The engineering team held a retrospective meeting."
  },
  {
    base: "keep",
    past: "kept",
    participle: "kept",
    translation: "mantener / guardar",
    example: "They kept all user logs securely encrypted in cloud buckets.",
    category: "common",
    itContext: "We kept the codebase modular and clean."
  },
  {
    base: "know",
    past: "knew",
    participle: "known",
    translation: "saber / conocer",
    example: "The programmers knew how to handle asynchronous operations.",
    category: "common",
    itContext: "Nobody knew about the hidden Easter egg in the software."
  },
  {
    base: "lead",
    past: "led",
    participle: "led",
    translation: "liderar / guiar",
    example: "Margaret Hamilton led the team that created Apollo flight software.",
    category: "common",
    itContext: "Her leadership led the startup to great commercial success."
  },
  {
    base: "leave",
    past: "left",
    participle: "left",
    translation: "dejar / salir",
    example: "The senior engineer left detailed documentation for the onboarding team.",
    category: "common",
    itContext: "He left comments explaining complex regular expressions."
  },
  {
    base: "lose",
    past: "lost",
    participle: "lost",
    translation: "perder",
    example: "We never lost any user data during database maintenance.",
    category: "common",
    itContext: "The connection lost ping packets due to network jitter."
  },
  {
    base: "make",
    past: "made",
    participle: "made",
    translation: "hacer / fabricar",
    example: "Google's IPO made Larry Page and Sergey Brin billionaires.",
    category: "common",
    itContext: "The front-end developer made the layout fully responsive."
  },
  {
    base: "meet",
    past: "met",
    participle: "met",
    translation: "conocer / encontrarse",
    example: "Sergey Brin met Larry Page while studying at Stanford University.",
    category: "it_frequent",
    itContext: "The project met all client requirements on time."
  },
  {
    base: "pay",
    past: "paid",
    participle: "paid",
    translation: "pagar",
    example: "The enterprise paid for annual cloud server licenses.",
    category: "common",
    itContext: "The company paid bonuses to top-performing developers."
  },
  {
    base: "put",
    past: "put",
    participle: "put",
    translation: "poner / colocar",
    example: "The DevOps engineer put the application inside Docker containers.",
    category: "no_change",
    itContext: "She put breakpoints throughout the debugging session."
  },
  {
    base: "read",
    past: "read",
    participle: "read",
    translation: "leer (se pronuncia 'red' en pasado)",
    example: "The parser read 10,000 JSON records in under two seconds.",
    category: "no_change",
    itContext: "The programmer read the API documentation thoroughly."
  },
  {
    base: "run",
    past: "ran",
    participle: "run",
    translation: "ejecutar / correr",
    example: "The CI/CD pipeline ran all unit and integration tests successfully.",
    category: "it_frequent",
    itContext: "The background cron job ran at 3:00 AM every Sunday."
  },
  {
    base: "say",
    past: "said",
    participle: "said",
    translation: "decir",
    example: "Grace Hopper said that computers should be easy to use for everyone.",
    category: "common",
    itContext: "The error message said 'Connection timeout on port 5432'."
  },
  {
    base: "see",
    past: "saw",
    participle: "seen",
    translation: "ver",
    example: "We saw immediate performance improvements after optimizing queries.",
    category: "common",
    itContext: "The analytics dashboard saw a surge in traffic."
  },
  {
    base: "sell",
    past: "sold",
    participle: "sold",
    translation: "vender",
    example: "Two years ago I sold my startup for 4 million dollars.",
    category: "it_frequent",
    itContext: "They sold software licenses to multinational clients."
  },
  {
    base: "send",
    past: "sent",
    participle: "sent",
    translation: "enviar",
    example: "Margaret Hamilton's software sent astronauts safely to the Moon.",
    category: "it_frequent",
    itContext: "The notification service sent webhook alerts to Slack."
  },
  {
    base: "set",
    past: "set",
    participle: "set",
    translation: "configurar / establecer",
    example: "The system administrator set the firewall rules.",
    category: "no_change",
    itContext: "We set up authentication with JSON Web Tokens."
  },
  {
    base: "sit",
    past: "sat",
    participle: "sat",
    translation: "sentarse",
    example: "He sat in a café while writing code on his laptop.",
    category: "common",
    itContext: "The development team sat together in the open workspace."
  },
  {
    base: "speak",
    past: "spoke",
    participle: "spoken",
    translation: "hablar",
    example: "The tech lead spoke at the international developer summit.",
    category: "common",
    itContext: "She spoke about asynchronous programming patterns."
  },
  {
    base: "spend",
    past: "spent",
    participle: "spent",
    translation: "gastar / pasar tiempo",
    example: "We spent two weeks refactoring the legacy authentication flow.",
    category: "common",
    itContext: "The company spent funds on high-availability cloud storage."
  },
  {
    base: "stand",
    past: "stood",
    participle: "stood",
    translation: "estar de pie / mantenerse",
    example: "The system stood resilient under extreme high-traffic load.",
    category: "common",
    itContext: "COBOL stood the test of time in banking institutions."
  },
  {
    base: "take",
    past: "took",
    participle: "taken",
    translation: "tomar / tardar",
    example: "The build took only 45 seconds with Vite's lightning fast bundler.",
    category: "common",
    itContext: "He took care of the frontend user interface."
  },
  {
    base: "teach",
    past: "taught",
    participle: "taught",
    translation: "enseñar",
    example: "Grace Hopper taught young people how to program computers.",
    category: "common",
    itContext: "The mentor taught best design patterns for state management."
  },
  {
    base: "tell",
    past: "told",
    participle: "told",
    translation: "contar / decir",
    example: "The project manager told the developers about the new milestone.",
    category: "common",
    itContext: "The compiler told us exactly which line had the syntax error."
  },
  {
    base: "think",
    past: "thought",
    participle: "thought",
    translation: "pensar",
    example: "The engineers thought of an asynchronous scheduling solution.",
    category: "common",
    itContext: "We thought the bug was in the CSS, but it was in the state hook."
  },
  {
    base: "throw",
    past: "threw",
    participle: "thrown",
    translation: "lanzar / arrojar (errores)",
    example: "The backend server threw a 500 Internal Error on invalid payloads.",
    category: "it_frequent",
    itContext: "The validator function threw a custom validation error."
  },
  {
    base: "understand",
    past: "understood",
    participle: "understood",
    translation: "entender / comprender",
    example: "The team understood the importance of priority display warnings.",
    category: "common",
    itContext: "She understood complex algorithms effortlessly."
  },
  {
    base: "wear",
    past: "wore",
    participle: "worn",
    translation: "usar / vestir",
    example: "Early testers wore Google Glass in experimental trials.",
    category: "common",
    itContext: "Tech enthusiasts wore smart glasses in 2012."
  },
  {
    base: "win",
    past: "won",
    participle: "won",
    translation: "ganar",
    example: "Margaret Hamilton won the Presidential Medal of Freedom in 2016.",
    category: "common",
    itContext: "Our hackathon team won first prize for best open-source project."
  },
  {
    base: "write",
    past: "wrote",
    participle: "written",
    translation: "escribir / programar",
    example: "She wrote safe code that helped Apollo 11 astronauts land on the Moon.",
    category: "it_frequent",
    itContext: "The developer wrote modular React components with TypeScript."
  }
];
