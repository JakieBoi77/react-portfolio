import { assets } from "./assets";

const { devIcons, fullstackPics, projectPics, socialIcons, workIcons } = assets;

const mcmasterSoftwareEngineeringProgramUrl =
    "https://academiccalendars.romcmaster.ca/preview_program.php?catoid=65&poid=33033";
const mcmasterSoftwareEngineeringCoursesUrl =
    "https://academiccalendars.romcmaster.ca/content.php?catoid=65&navoid=14802";

const mcmasterCourseDescriptionUrl = (courseId: number) =>
    `https://academiccalendars.romcmaster.ca/preview_course_nopop.php?catoid=65&coid=${courseId}`;

export const educationVisibleThroughSemester = "2026-winter";

export const navItems = [
    { name: "Home", link: "/" },
    { name: "Experience", link: "#experience" },
    { name: "Tech", link: "#technologies" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
];

export const availableToWork = false;

export const aboutParagraph = `
    I'm a software engineer building my career in the tech industry.
    I specialize in full stack development.
    I am currently working as a Software Design Engineer Intern at Evertz Microsystems.
`;

export const fullStackProjects = [
    {
        id: 1,
        projectTitle: "Link Ripple",
        link: "https://link-ripple-nextjs.vercel.app",
        github: "https://github.com/JakieBoi77/link-ripple-nextjs",
        des: "An application for managing personalized landing pages with links to social profiles and online resources. Check out my link ripple at https://link-ripple-nextjs.vercel.app/JakieBoi77.",
        picList: [
            fullstackPics.linkRippleLanding,
            fullstackPics.linkRippleDashboard,
            fullstackPics.linkRippleLinks,
        ],
        iconList: [
            devIcons.next,
            devIcons.react,
            devIcons.typescript,
            devIcons.tailwind,
            devIcons.mongodb,
        ],
    },
    {
        id: 2,
        projectTitle: "Bankler",
        link: "https://banking.finlaytech.ca",
        github: "https://github.com/JakieBoi77/banking-app",
        des: "A modern banking platform with support for accounts, transactions, and real-time updates.",
        picList: [
            fullstackPics.banklerDashboard,
            fullstackPics.banklerMyBanks,
            fullstackPics.banklerPaymentTransfer,
            fullstackPics.banklerTransactionHistory,
            fullstackPics.banklerSignIn,
        ],
        iconList: [
            devIcons.next,
            devIcons.react,
            devIcons.typescript,
            devIcons.tailwind,
        ],
    },
];

export const learningProjectCollections = [
    {
        id: 1,
        collectionTitle: "Front End Development Projects",
        folder: "front-end-dev",
        des: "Explore some of my recent front-end projects. In making these projects, I learned component-based architecture, state management, and responsive design techniques.",
        projects: [
            {
                title: "Quote Generator",
                des: "Generates a random inspirational quote. Try out the Fortnite mode!",
                value: "quote-generator",
                pic: projectPics.quoteGenerator,
            },
            {
                title: "Markdown Previewer",
                des: "A tool that converts Markdown into formatted text in real time.",
                value: "markdown-previewer",
                pic: projectPics.markdownPreviewer,
            },
            {
                title: "Meme Soundboard",
                des: "An app for listening to your favorite memes at specific volumes. Yes, its as useful as it sounds.",
                value: "meme-soundboard",
                pic: projectPics.memeSoundboard,
            },
            {
                title: "Calculator",
                des: "The project of all time. Every developer must make one at some point.",
                value: "calculator",
                pic: projectPics.calculator,
            },
            {
                title: "Pomodoro Clock",
                des: "A Pomodoro Clock for studying. Plays the Vine boom sound when its time lock in.",
                value: "pomodoro-clock",
                pic: projectPics.pomodoroClock,
            },
        ],
        iconLists: [
            devIcons.react,
            devIcons.javascript,
            devIcons.html,
            devIcons.css,
        ],
    },
    {
        id: 2,
        collectionTitle: "Back End Development Projects",
        folder: "back-end-dev",
        des: "Interact with some of my recent back-end projects and APIs. While making these projects, I learned package management, RESTful API design, and database integration.",
        projects: [
            {
                title: "URL Shortener",
                des: "Its a URL shortner. My API route is long so it might make your URL longer (my bad).",
                value: "url-shortener-microservice",
                pic: projectPics.urlShortener,
            },
            {
                title: "File Metadata",
                des: "This one is cool, it tells you some stuff about any file you upload to it using an API.",
                value: "file-metadata-microservice",
                pic: projectPics.fileMetadata,
            },
            {
                title: "Timestamp",
                des: "Enter a date and it will tell you how many miliseconds have passed since January 1st, 1970. Using an API of course.",
                value: "timestamp-microservice",
                pic: projectPics.timestamp,
            },
            {
                title: "Request Header Parser",
                des: "Tells you some stuff about the device your using. But with an API.",
                value: "request-header-parser-microservice",
                pic: projectPics.requestHeaderParser,
            },
            {
                title: "Exercise Tracker",
                des: "Tracks exercises (with an API). Trust me its useful.",
                value: "exercise-tracker-microservice",
                pic: projectPics.exerciseTracker,
            },
        ],
        iconLists: [
            devIcons.npm,
            devIcons.express,
            devIcons.node,
            devIcons.mongodb,
            devIcons.mongoose,
        ],
    },
    {
        id: 3,
        collectionTitle: "Data Visualization Projects",
        folder: "data-visualization",
        des: "Examine my data visualization projects. In making these projects, I learned d3.js and AJAX technologies.",
        projects: [
            {
                title: "Choropleth Map",
                des: "A chorpleth map created from the percentages of adults who have a bachelor's degree or higher in the United States.",
                value: "choropleth-map",
                pic: projectPics.choroplethMap,
            },
            {
                title: "Treemap Diagram",
                des: "A treemap diagram which shows the 100 most sold video games grouped by console. Use the dropdown menu at the top to see other datasets.",
                value: "treemap-diagram",
                pic: projectPics.treemapDiagram,
            },
            {
                title: "Heat Map",
                des: "A heat map of the monthly global land-surface temperature from 1753 to 2015. This is proof that global warming exists, assuming that the data I used is legitimate.",
                value: "heat-map",
                pic: projectPics.heatMap,
            },
            {
                title: "Bar Chart",
                des: "A bar chart which shows the United States GDP froom 1947 to 2015. Shows the effects of the Great Recession of 2009.",
                value: "bar-chart",
                pic: projectPics.barChart,
            },
            {
                title: "Scatterplot",
                des: "A scatter plot of the 35 fastest times to race up Alpe d'Heuz. There seems to be a correlation between doping alegations and faster times.",
                value: "scatter-plot",
                pic: projectPics.scatterPlot,
            },
        ],
        iconLists: [devIcons.javascript, devIcons.react, devIcons.d3],
    },
    {
        id: 4,
        collectionTitle: "Legacy Web Design Projects",
        folder: "legacy-web-design",
        des: "A collection of my initial web projects where I learned the basics of web design. Even through my initial projects are not very impressive, I keep them here to remeber how far I have come as a developer.",
        projects: [
            {
                title: "Legacy Portfolio",
                des: "The OG portfolio. Press F to pay respects.",
                value: "legacy-portfolio",
                pic: projectPics.legacyPortfolio,
            },
            {
                title: "Survey Form",
                des: "My first web development project. Dont judge, you gotta start somewhere you know. Its a recreation of the freeCodeCamp survey form.",
                value: "survey-form",
                pic: projectPics.surveyForm,
            },
            {
                title: "Tribute Page",
                des: "My second web deveopment project. Arguably worse than the first one. Showcases the legendary Obama Prism.",
                value: "tribute-page",
                pic: projectPics.tributePage,
            },
            {
                title: "Technical Documentation",
                des: "My third web development project. Now I was getting somewhere. Understood how to make things responsive on this one. Shows some technical documentation for HTML.",
                value: "technical-documentation",
                pic: projectPics.technicalDocumentation,
            },
            {
                title: "Product Landing Page",
                des: "My fourth web development project. Not visually appealing but at least its responsive. This is where I sell Obamium. Don't forget to sign up for the newsletter!",
                value: "product-landing-page",
                pic: projectPics.productLandingPage,
            },
        ],
        iconLists: [devIcons.html, devIcons.css],
    },
];

export const technologies = [
    {
        name: "HTML 5",
        icon: devIcons.html,
        homepage: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        description: "Structures pages and content.",
    },
    {
        name: "CSS 3",
        icon: devIcons.css,
        homepage: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        description: "Styles layouts and motion.",
    },
    {
        name: "JavaScript",
        icon: devIcons.javascript,
        homepage: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        description: "Adds browser behavior.",
    },
    {
        name: "TypeScript",
        icon: devIcons.typescript,
        homepage: "https://www.typescriptlang.org/",
        description: "Adds types to JavaScript.",
    },
    {
        name: "React JS",
        icon: devIcons.react,
        homepage: "https://react.dev/",
        description: "Builds reusable UI.",
    },
    {
        name: "Redux Toolkit",
        icon: devIcons.redux,
        homepage: "https://redux-toolkit.js.org/",
        description: "Manages shared app state.",
    },
    {
        name: "Tailwind CSS",
        icon: devIcons.tailwind,
        homepage: "https://tailwindcss.com/",
        description: "Styles components quickly.",
    },
    {
        name: "Node JS",
        icon: devIcons.node,
        homepage: "https://nodejs.org/",
        description: "Runs JavaScript on the server.",
    },
    {
        name: "GraphQL",
        icon: devIcons.graphql,
        homepage: "https://graphql.org/",
        description: "Queries APIs with typed schemas.",
    },
    {
        name: "Apollo GraphQL",
        icon: devIcons.apollo,
        homepage: "https://www.apollographql.com/",
        description: "Builds GraphQL clients and servers.",
    },
    {
        name: "Python",
        icon: devIcons.python,
        homepage: "https://www.python.org/",
        description: "Builds backend tools and scripts.",
    },
    {
        name: "MongoDB",
        icon: devIcons.mongodb,
        homepage: "https://www.mongodb.com/",
        description: "Stores flexible documents.",
    },
    {
        name: "Three JS",
        icon: devIcons.three,
        homepage: "https://threejs.org/",
        description: "Renders 3D web graphics.",
    },
    {
        name: "D3",
        icon: devIcons.d3,
        homepage: "https://d3js.org/",
        description: "Builds data visualizations.",
    },
    {
        name: "Framer Motion",
        icon: devIcons.fm,
        homepage: "https://motion.dev/",
        description: "Animates React interfaces.",
    },
    {
        name: "Git",
        icon: devIcons.git,
        homepage: "https://git-scm.com/",
        description: "Tracks code changes.",
    },
    {
        name: "Nx",
        icon: devIcons.nx,
        homepage: "https://nx.dev/",
        description: "Manages monorepos and builds.",
    },
    {
        name: "pnpm",
        icon: devIcons.pnpm,
        homepage: "https://pnpm.io/",
        description: "Installs packages efficiently.",
    },
    {
        name: "Java",
        icon: devIcons.java,
        homepage: "https://dev.java/",
        description: "Builds typed backend apps.",
    },
    {
        name: "C#",
        icon: devIcons.csharp,
        homepage: "https://dotnet.microsoft.com/en-us/languages/csharp",
        description: "Builds .NET applications.",
    },
    {
        name: "Bash",
        icon: devIcons.bash,
        homepage: "https://www.gnu.org/software/bash/",
        description: "Automates terminal tasks.",
    },
    {
        name: "PostgreSQL",
        icon: devIcons.postgresql,
        homepage: "https://www.postgresql.org/",
        description: "Stores relational data.",
    },
    {
        name: "Linux",
        icon: devIcons.linux,
        homepage: "https://www.kernel.org/",
        description: "Runs dev and server environments.",
    },
];

export const technologySkillTree = {
    root: {
        title: "Fullstack Development",
        quote: "A jack of all trades is a master of none, but oftentimes better than a master of one.",
    },
    branches: [
        {
            id: "frontend",
            title: "Frontend",
            summary: "UI and browser apps.",
            technologies: [
                "HTML 5",
                "CSS 3",
                "JavaScript",
                "TypeScript",
                "React JS",
                "Redux Toolkit",
                "Tailwind CSS",
            ],
        },
        {
            id: "backend",
            title: "Backend",
            summary: "APIs, services, and storage.",
            technologies: [
                "GraphQL",
                "Apollo GraphQL",
                "Node JS",
                "MongoDB",
                "PostgreSQL",
            ],
        },
        {
            id: "tooling",
            title: "Tooling",
            summary: "Git, scripts, packages, and Linux.",
            technologies: ["Git", "Nx", "pnpm", "Bash", "Linux"],
        },
        {
            id: "misc",
            title: "Misc",
            summary: "Additional experience.",
            technologies: [
                "Python",
                "Java",
                "C#",
                "Three JS",
                "D3",
                "Framer Motion",
            ],
        },
    ],
};

export const experiences = [
    {
        title: "Software Design Engineer Intern",
        companyName: "Evertz Microsystems",
        icon: workIcons.evertz,
        iconBg: "#ffffff",
        timelineAccent: "250 204 21",
        date: "May 2025 - Present",
        points: [
            "Currently working on MAGNUM OS, a full stack software that provides control, orchestration, monitoring, and analytics for customer's Evertz equipment.",
            "Developed a maintainable, scalable UI library for use in Evertz frontend monorepo by designing reusable components with TypeScript and Tailwind CSS.",
            "Resolved a large number bugfix and improvement tickets by collaborating with my team using Jira and GitHub.",
            "Collobarated with the validation team to confirm that ticket requirements were aligned with customer expecations while ensuring fixes and improvements met standard for our product.",
        ],
    },
    {
        title: "Systems Engineer Intern",
        companyName: "Superior Boiler Works and Welding Limited",
        icon: workIcons.sbww,
        iconBg: "#ffffff",
        timelineAccent: "34 197 94",
        date: "May 2023 - August 2023",
        points: [
            "My first co-op position where I was responsible for providing IT support and maintaining IT infrastructure.",
            "Implemented IT support strategies to resolve user technical issues, utilizing M365 Exchange Servers and PowerShell scripts.",
            "Managed Active Directory accounts for a team of 100 employees and reduced account setup time through streamlined GPO management.",
            "Collaborated with my team to implement security protocols and improve system efficiency.",
        ],
    },
    {
        title: "Warehouse Assistant",
        companyName: "Stoney Creek Furniture",
        icon: workIcons.scf,
        iconBg: "#ffffff",
        timelineAccent: "30 64 175",
        date: "July 2020 - September 2022",
        points: [
            "A weekend job where I was responsible for fulfilling customer pick-ups, organizing furniture for delivery, and keeping the warehouse clean.",
            "Gained valuable experience working with my co-workers to deliver the best possible experience for customers picking up furniture from the warehouse.",
            "Became certified on a Class 2 Forklift (also known as an Orderpicker) to access furniture stored within the racks of the warehouse.",
            "Operated various compactors to control the waste created from opening products in the warehouse.",
            "Learned how to use Storis, the furniture inventory management system, in order to complete my assigned tasks while still maintaining inventory accuracy.",
        ],
    },
];

export const education = [
    {
        school: "McMaster University",
        program: "Bachelor of Engineering, Software Engineering",
        location: "Hamilton, Ontario",
        status: "in-progress",
        summary:
            "Software Engineering at McMaster with coursework in software design, systems, algorithms, databases, testing, mathematics, and engineering practice.",
        links: [
            {
                label: "Program",
                href: mcmasterSoftwareEngineeringProgramUrl,
            },
            {
                label: "Courses",
                href: mcmasterSoftwareEngineeringCoursesUrl,
            },
        ],
        levels: [
            {
                level: "Level I",
                terms: [
                    {
                        term: "Term 1",
                        session: "Fall 2022",
                        semesterId: "2022-fall",
                        courses: [
                            {
                                code: "ENGINEER 1P13 A/B",
                                name: "Integrated Cornerstone Design Projects in Engineering",
                                href: mcmasterCourseDescriptionUrl(322754),
                                prerequisites: [],
                                learned:
                                    "Built design projects with team workflow, prototyping, programming, and engineering communication.",
                                spansTerms: true,
                            },
                            {
                                code: "PHYSICS 1D03",
                                name: "Introductory Mechanics",
                                href: mcmasterCourseDescriptionUrl(321331),
                                prerequisites: [],
                                learned:
                                    "Modeled motion, forces, energy, momentum, and mechanics problems.",
                            },
                            {
                                code: "MATH 1ZA3",
                                name: "Engineering Mathematics I",
                                href: mcmasterCourseDescriptionUrl(320291),
                                prerequisites: [],
                                learned:
                                    "Built calculus fundamentals for rates of change, integration, and engineering models.",
                            },
                            {
                                code: "CHEM 1E03",
                                name: "General Chemistry for Engineering I",
                                href: mcmasterCourseDescriptionUrl(321696),
                                prerequisites: [],
                                learned:
                                    "Applied chemistry fundamentals to materials, reactions, energy, and engineering problem solving.",
                            },
                            {
                                code: "ECON 1B03",
                                name: "Introductory Microeconomics",
                                href: mcmasterCourseDescriptionUrl(320935),
                                prerequisites: [],
                                learned:
                                    "Learned supply, demand, markets, incentives, and how economic choices shape systems.",
                            },
                        ],
                    },
                    {
                        term: "Term 2",
                        session: "Winter 2023",
                        semesterId: "2023-winter",
                        courses: [
                            {
                                code: "PHYSICS 1E03",
                                name: "Waves, Electricity and Magnetic Fields",
                                href: mcmasterCourseDescriptionUrl(321332),
                                prerequisites: [],
                                learned:
                                    "Learned waves, electric fields, magnetic fields, and circuit fundamentals.",
                            },
                            {
                                code: "MATH 1ZC3",
                                name: "Engineering Mathematics II-B",
                                href: mcmasterCourseDescriptionUrl(320293),
                                prerequisites: ["MATH 1ZA3"],
                                learned:
                                    "Worked with vectors, matrices, linear algebra, and multivariable calculus foundations.",
                            },
                            {
                                code: "MATH 1ZB3",
                                name: "Engineering Mathematics II-A",
                                href: mcmasterCourseDescriptionUrl(320292),
                                prerequisites: ["MATH 1ZA3"],
                                learned:
                                    "Extended calculus into integration techniques, sequences, series, and differential-equation foundations.",
                            },
                            {
                                code: "ECON 1BB3",
                                name: "Introductory Macroeconomics",
                                href: mcmasterCourseDescriptionUrl(320936),
                                prerequisites: [],
                                learned:
                                    "Studied inflation, growth, employment, interest rates, and fiscal and monetary policy.",
                            },
                        ],
                    },
                ],
            },
            {
                level: "Level II",
                terms: [
                    {
                        term: "Term 1",
                        session: "Fall 2023",
                        semesterId: "2023-fall",
                        courses: [
                            {
                                code: "SFWRENG 2DM3",
                                name: "Discrete Mathematics with Applications I",
                                href: mcmasterCourseDescriptionUrl(321601),
                                prerequisites: ["MATH 1ZC3"],
                                learned:
                                    "Learned logic, proof techniques, sets, relations, counting, and graph foundations.",
                            },
                            {
                                code: "SFWRENG 2OP3",
                                name: "Object-Oriented Programming",
                                href: mcmasterCourseDescriptionUrl(322792),
                                prerequisites: ["ENGINEER 1P13 A/B"],
                                learned:
                                    "Built object-oriented programs with encapsulation, inheritance, interfaces, and testing.",
                            },
                            {
                                code: "SFWRENG 2XC3",
                                name: "Software Engineering Practice and Experience: Development Basics",
                                href: mcmasterCourseDescriptionUrl(322793),
                                prerequisites: ["ENGINEER 1P13 A/B"],
                                learned:
                                    "Practiced Git, command-line tooling, Linux workflows, and team development habits.",
                            },
                            {
                                code: "MATH 2Z03",
                                name: "Engineering Mathematics III",
                                href: mcmasterCourseDescriptionUrl(320297),
                                prerequisites: ["MATH 1ZB3"],
                                learned:
                                    "Used differential equations, transforms, and modelling tools for engineering systems.",
                            },
                            {
                                code: "SFWRENG 2DA4",
                                name: "Digital Systems and Interfacing",
                                href: mcmasterCourseDescriptionUrl(321600),
                                prerequisites: [],
                                learned:
                                    "Connected memory, binary arithmetic, hierarchical design, hardware/software co-design, and device interfaces.",
                            },
                        ],
                    },
                    {
                        term: "Term 2",
                        session: "Winter 2024",
                        semesterId: "2024-winter",
                        courses: [
                            {
                                code: "SFWRENG 2C03",
                                name: "Data Structures and Algorithms",
                                href: mcmasterCourseDescriptionUrl(321599),
                                prerequisites: ["SFWRENG 2DM3"],
                                learned:
                                    "Implemented core data structures and analyzed algorithms for efficient software.",
                            },
                            {
                                code: "SFWRENG 2FA3",
                                name: "Discrete Mathematics and Applications II",
                                href: mcmasterCourseDescriptionUrl(321602),
                                prerequisites: ["SFWRENG 2DM3"],
                                learned:
                                    "Strengthened formal reasoning with predicate logic, grammars, automata, modular arithmetic, and proofs.",
                            },
                            {
                                code: "SFWRENG 2AA4",
                                name: "Software Design I - Introduction to Software Development",
                                href: mcmasterCourseDescriptionUrl(321598),
                                prerequisites: [
                                    "SFWRENG 2DM3",
                                    "SFWRENG 2OP3",
                                    "SFWRENG 2XC3",
                                ],
                                learned:
                                    "Learned requirements, design patterns, interfaces, implementation reviews, and verification.",
                            },
                            {
                                code: "SFWRENG 2GA3",
                                name: "Computer Architecture",
                                href: mcmasterCourseDescriptionUrl(321809),
                                prerequisites: ["SFWRENG 2DA4", "SFWRENG 2XC3"],
                                learned:
                                    "Studied CPU organization, assembly, memory, caches, and low-level program execution.",
                            },
                            {
                                code: "ENGINEER 2PX3",
                                name: "Engineering: Communications and Social Impact",
                                href: mcmasterCourseDescriptionUrl(322787),
                                prerequisites: [],
                                learned:
                                    "Practiced technical communication, design reporting, presentations, and social impact analysis.",
                            },
                            {
                                code: "SUSTAIN 1S03",
                                name: "Introduction to Sustainability",
                                href: mcmasterCourseDescriptionUrl(321811),
                                prerequisites: [],
                                learned:
                                    "Explored sustainability tradeoffs, climate impacts, and systems-level decision making.",
                            },
                        ],
                    },
                ],
            },
            {
                level: "Level III",
                terms: [
                    {
                        term: "Term 1",
                        session: "Fall 2024",
                        semesterId: "2024-fall",
                        courses: [
                            {
                                code: "SFWRENG 3O03",
                                name: "Linear Optimization",
                                href: mcmasterCourseDescriptionUrl(321890),
                                prerequisites: ["SFWRENG 2C03"],
                                learned:
                                    "Formulated optimization models and solved linear programs with constraints and sensitivity analysis.",
                            },
                            {
                                code: "SFWRENG 3DB3",
                                name: "Databases",
                                href: mcmasterCourseDescriptionUrl(321888),
                                prerequisites: ["SFWRENG 2C03", "SFWRENG 2DM3"],
                                learned:
                                    "Designed relational schemas, SQL queries, normalization, transactions, and database-backed apps.",
                            },
                            {
                                code: "SFWRENG 3RA3",
                                name: "Software Requirements and Security Considerations",
                                href: mcmasterCourseDescriptionUrl(321612),
                                prerequisites: ["SFWRENG 2AA4", "SFWRENG 2FA3"],
                                learned:
                                    "Worked through requirements, threat modeling, security considerations, and stakeholder analysis.",
                            },
                            {
                                code: "SFWRENG 3BB4",
                                name: "Software Design II - Concurrent System Design",
                                href: mcmasterCourseDescriptionUrl(321605),
                                prerequisites: ["SFWRENG 2AA4", "SFWRENG 2FA3"],
                                learned:
                                    "Built concurrent designs with threads, synchronization, scheduling, and correctness tradeoffs.",
                            },
                            {
                                code: "SFWRENG 3MX3",
                                name: "Signals and Systems",
                                href: mcmasterCourseDescriptionUrl(321810),
                                prerequisites: ["MATH 2Z03"],
                                learned:
                                    "Modeled signals and linear systems across time and frequency domains.",
                            },
                            {
                                code: "STATS 3Y03",
                                name: "Probability and Statistics for Engineering",
                                href: mcmasterCourseDescriptionUrl(321643),
                                prerequisites: [],
                                learned:
                                    "Applied probability, random variables, estimation, confidence intervals, and hypothesis testing.",
                            },
                        ],
                    },
                    {
                        term: "Term 2",
                        session: "Winter 2025",
                        semesterId: "2025-winter",
                        courses: [
                            {
                                code: "SFWRENG 3SH3",
                                name: "Operating Systems",
                                href: mcmasterCourseDescriptionUrl(321614),
                                prerequisites: ["SFWRENG 2AA4", "SFWRENG 2C03"],
                                learned:
                                    "Studied processes, threads, memory management, file systems, and OS-level concurrency.",
                            },
                            {
                                code: "SFWRENG 3DX4",
                                name: "Dynamic Systems and Control",
                                href: mcmasterCourseDescriptionUrl(321606),
                                prerequisites: ["SFWRENG 3MX3"],
                                learned:
                                    "Analyzed dynamic systems, feedback, stability, and control design.",
                            },
                            {
                                code: "SFWRENG 3A04",
                                name: "Software Design III - Large System Design",
                                href: mcmasterCourseDescriptionUrl(321604),
                                prerequisites: ["SFWRENG 3BB4"],
                                learned:
                                    "Designed larger systems with architecture, modularity, maintainability, and documentation.",
                            },
                            {
                                code: "SFWRENG 3S03",
                                name: "Software Testing",
                                href: mcmasterCourseDescriptionUrl(321613),
                                prerequisites: ["SFWRENG 3BB4"],
                                learned:
                                    "Practiced test design, coverage, unit and integration testing, and quality assurance strategy.",
                            },
                            {
                                code: "ENGINEER 3PX3",
                                name: "Engineering Economics",
                                href: mcmasterCourseDescriptionUrl(322788),
                                prerequisites: ["ENGINEER 2PX3"],
                                learned:
                                    "Studied cost estimation, project valuation, risk, and economic decision making for engineers.",
                            },
                        ],
                    },
                ],
            },
            {
                level: "Level IV",
                terms: [
                    {
                        term: "Term 0",
                        session: "Summer 2025 - Winter 2026",
                        semesterId: "2026-winter",
                        courses: [
                            {
                                code: "ENGINEER 2EC0",
                                name: "Engineering Work Term",
                                href: mcmasterCourseDescriptionUrl(321884),
                                prerequisites: ["ENGINEER 1EE0"],
                                learned:
                                    "Completed a 16-month software engineering co-op and applied engineering practice in industry.",
                            },
                            {
                                code: "MUSIC 2MT3",
                                name: "Introduction to the Practice of Music Therapy",
                                href: mcmasterCourseDescriptionUrl(321158),
                                prerequisites: [],
                                learned:
                                    "Explored music therapy practice, clinical applications, and how music supports care and rehabilitation.",
                            },
                            {
                                code: "SFWRENG 4C03",
                                name: "Computer Networks and Security",
                                href: mcmasterCourseDescriptionUrl(321617),
                                prerequisites: ["SFWRENG 3BB4", "SFWRENG 3SH3"],
                                learned:
                                    "Learned network layering, TCP/IP, switching, services, security threats, defensive techniques, and encryption.",
                            },
                            {
                                code: "ENGINEER 4A03",
                                name: "Ethics, Equity and Law in Engineering",
                                href: mcmasterCourseDescriptionUrl(321003),
                                prerequisites: [],
                                learned:
                                    "Studied engineering ethics, equity, professional responsibility, legal duties, contracts, and liability.",
                            },
                        ],
                    },
                    {
                        term: "Term 1",
                        session: "Fall 2026",
                        semesterId: "2026-fall",
                        courses: [
                            {
                                code: "SFWRENG 4G06 A/B",
                                name: "Software Design IV - Capstone Design Project",
                                href: mcmasterCourseDescriptionUrl(321621),
                                prerequisites: [],
                                learned:
                                    "Planned capstone project work covering requirements, design, documentation, implementation, testing, project management, and engineering constraints.",
                                spansTerms: true,
                                spanTermsCount: 2,
                            },
                            {
                                code: "SFWRENG 4AA4",
                                name: "Real-Time Systems and Control Applications",
                                href: mcmasterCourseDescriptionUrl(321616),
                                prerequisites: [
                                    "SFWRENG 3BB4",
                                    "SFWRENG 3SH3",
                                    "SFWRENG 3DX4",
                                ],
                                learned:
                                    "Planned coursework in real-time scheduling, safety classification, hazard analysis, clock synchronization, data acquisition, and control applications.",
                            },
                            {
                                code: "SFWRENG 4AL3",
                                name: "Applications of Machine Learning",
                                href: mcmasterCourseDescriptionUrl(323367),
                                prerequisites: [
                                    "SFWRENG 2C03",
                                    "SFWRENG 2AA4",
                                    "STATS 3Y03",
                                ],
                                learned:
                                    "Planned coursework in data engineering, supervised and unsupervised learning, neural networks, topic modelling, and reinforcement learning.",
                            },
                            {
                                code: "SFWRENG 4HC3",
                                name: "Human Computer Interfaces",
                                href: mcmasterCourseDescriptionUrl(321622),
                                prerequisites: [],
                                learned:
                                    "Planned coursework in interface design, user experience, inclusive design, cognition, graphics, mode awareness, help systems, and design tools.",
                            },
                            {
                                code: "SFWRENG 4X03",
                                name: "Scientific Computation",
                                href: mcmasterCourseDescriptionUrl(321893),
                                prerequisites: [
                                    "MATH 1ZB3",
                                    "MATH 1ZC3",
                                    "SFWRENG 2C03",
                                ],
                                learned:
                                    "Planned coursework in numerical methods, roundoff error, interpolation, integration, linear and nonlinear systems, eigenvalues, SVD, and ODEs.",
                            },
                        ],
                    },
                    {
                        term: "Term 2",
                        session: "Winter 2027",
                        semesterId: "2027-winter",
                        courses: [
                            {
                                code: "SFWRENG 4E03",
                                name: "Performance Analysis of Computer Systems",
                                href: mcmasterCourseDescriptionUrl(321619),
                                prerequisites: ["STATS 3Y03"],
                                learned:
                                    "Planned coursework in queueing models, simulation, Markov models, bottleneck analysis, storage and network modelling, and reliability.",
                            },
                            {
                                code: "ASTRON 2B03",
                                name: "The Big Questions",
                                href: mcmasterCourseDescriptionUrl(320461),
                                prerequisites: [],
                                learned:
                                    "Planned coursework surveying space-time, the Big Bang, black holes, elements, stars, planets, galaxies, and the structure of the cosmos.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const links = [
    {
        id: 1,
        label: "GitHub",
        img: socialIcons.git,
        link: "https://github.com/JakieBoi77",
    },
    {
        id: 2,
        label: "Email",
        img: socialIcons.mail,
        link: "mailto:jakef7@icloud.com",
    },
    {
        id: 3,
        label: "LinkedIn",
        img: socialIcons.link,
        link: "https://www.linkedin.com/in/jake-finlay-54145a253",
    },
    {
        id: 4,
        label: "Resume",
        img: socialIcons.document,
        link: assets.resume,
    },
];
