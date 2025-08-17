export const navItems = [
    { name: "Home", link: "/" },
    { name: "Tech", link: "#technologies" },
    { name: "Experience", link: "#experience" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
];

export const availableToWork = false;

export const aboutParagraph = `
    I'm a software engineer currently building my career in the tech industry.
    I have a passion for learning and experience in full stack development.
    I am currently working as a Software Design Engineer Intern at Evertz Microsystems.
`;

export const skills = [
    {
        title: "Full-Stack Development",
        icon: "/ball1.png",
    },
    {
        title: "Responsive Web Design",
        icon: "/ball2.png",
    },
    {
        title: "API Integration and Development",
        icon: "/ball3.png",
    },
    {
        title: "Database Mangement",
        icon: "/ball4.png",
    },
];

export const fullStackProjects = [
    {
        id: 1,
        projectTitle: "Link Ripple",
        link: "https://link-ripple-nextjs.vercel.app",
        github: "https://github.com/JakieBoi77/link-ripple-nextjs",
        des: "An application for managing personalized landing pages with links to social profiles and online resources. Check out my link ripple at https://link-ripple-nextjs.vercel.app/JakieBoi77.",
        picList: [
            "/link-ripple-landing.png",
            "/link-ripple-dashboard.png",
            "/link-ripple-links.png",
        ],
        iconList: [
            "/next.svg",
            "/re.svg",
            "/ts.svg",
            "/tail.svg",
            "/mongodb.svg",
        ],
    },
    {
        id: 2,
        projectTitle: "Bankler",
        link: "https://banking.finlaytech.ca",
        github: "https://github.com/JakieBoi77/banking-app",
        des: "A modern banking platform with support for accounts, transactions, and real-time updates.",
        picList: [
            "/bankler-dashboard.png",
            "/bankler-my-banks.png",
            "/bankler-payment-transfer.png",
            "/bankler-transaction-history.png",
            "/bankler-sign-in.png",
        ],
        iconList: ["/next.svg", "/re.svg", "/ts.svg", "/tail.svg"],
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
                pic: "/quote-generator.png",
            },
            {
                title: "Markdown Previewer",
                des: "A tool that converts Markdown into formatted text in real time.",
                value: "markdown-previewer",
                pic: "/markdown-previewer.png",
            },
            {
                title: "Meme Soundboard",
                des: "An app for listening to your favorite memes at specific volumes. Yes, its as useful as it sounds.",
                value: "meme-soundboard",
                pic: "/meme-soundboard.png",
            },
            {
                title: "Calculator",
                des: "The project of all time. Every developer must make one at some point.",
                value: "calculator",
                pic: "/calculator.png",
            },
            {
                title: "Pomodoro Clock",
                des: "A Pomodoro Clock for studying. Plays the Vine boom sound when its time lock in.",
                value: "pomodoro-clock",
                pic: "/pomodoro-clock.png",
            },
        ],
        iconLists: ["/re.svg", "/js.svg", "/html.svg", "/css.svg"],
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
                pic: "/url-shortener.png",
            },
            {
                title: "File Metadata",
                des: "This one is cool, it tells you some stuff about any file you upload to it using an API.",
                value: "file-metadata-microservice",
                pic: "/file-metadata.png",
            },
            {
                title: "Timestamp",
                des: "Enter a date and it will tell you how many miliseconds have passed since January 1st, 1970. Using an API of course.",
                value: "timestamp-microservice",
                pic: "/timestamp.png",
            },
            {
                title: "Request Header Parser",
                des: "Tells you some stuff about the device your using. But with an API.",
                value: "request-header-parser-microservice",
                pic: "/request-header-parser.png",
            },
            {
                title: "Exercise Tracker",
                des: "Tracks exercises (with an API). Trust me its useful.",
                value: "exercise-tracker-microservice",
                pic: "/exercise-tracker.png",
            },
        ],
        iconLists: [
            "/npm.svg",
            "/express.svg",
            "/node.svg",
            "/mongodb.svg",
            "/mongoose.svg",
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
                pic: "/choropleth-map.png",
            },
            {
                title: "Treemap Diagram",
                des: "A treemap diagram which shows the 100 most sold video games grouped by console. Use the dropdown menu at the top to see other datasets.",
                value: "treemap-diagram",
                pic: "/treemap-diagram.png",
            },
            {
                title: "Heat Map",
                des: "A heat map of the monthly global land-surface temperature from 1753 to 2015. This is proof that global warming exists, assuming that the data I used is legitimate.",
                value: "heat-map",
                pic: "/heat-map.png",
            },
            {
                title: "Bar Chart",
                des: "A bar chart which shows the United States GDP froom 1947 to 2015. Shows the effects of the Great Recession of 2009.",
                value: "bar-chart",
                pic: "/bar-chart.png",
            },
            {
                title: "Scatterplot",
                des: "A scatter plot of the 35 fastest times to race up Alpe d'Heuz. There seems to be a correlation between doping alegations and faster times.",
                value: "scatter-plot",
                pic: "/scatter-plot.png",
            },
        ],
        iconLists: ["/js.svg", "/re.svg", "/d3.svg"],
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
                pic: "/legacy-portfolio.png",
            },
            {
                title: "Survey Form",
                des: "My first web development project. Dont judge, you gotta start somewhere you know. Its a recreation of the freeCodeCamp survey form.",
                value: "survey-form",
                pic: "/survey-form.png",
            },
            {
                title: "Tribute Page",
                des: "My second web deveopment project. Arguably worse than the first one. Showcases the legendary Obama Prism.",
                value: "tribute-page",
                pic: "/tribute-page.png",
            },
            {
                title: "Technical Documentation",
                des: "My third web development project. Now I was getting somewhere. Understood how to make things responsive on this one. Shows some technical documentation for HTML.",
                value: "technical-documentation",
                pic: "/technical-documentation.png",
            },
            {
                title: "Product Landing Page",
                des: "My fourth web development project. Not visually appealing but at least its responsive. This is where I sell Obamium. Don't forget to sign up for the newsletter!",
                value: "product-landing-page",
                pic: "/product-landing-page.png",
            },
        ],
        iconLists: ["/html.svg", "/css.svg"],
    },
];

export const technologies = [
    {
        name: "HTML 5",
        icon: "/html.svg",
    },
    {
        name: "CSS 3",
        icon: "/css.svg",
    },
    {
        name: "JavaScript",
        icon: "/js.svg",
    },
    {
        name: "TypeScript",
        icon: "/ts.svg",
    },
    {
        name: "React JS",
        icon: "/re.svg",
    },
    {
        name: "Redux Toolkit",
        icon: "/redux.svg",
    },
    {
        name: "Tailwind CSS",
        icon: "/tail.svg",
    },
    {
        name: "Node JS",
        icon: "/node.svg",
    },
    {
        name: "MongoDB",
        icon: "/mongodb.svg",
    },
    {
        name: "Three JS",
        icon: "/three.svg",
    },
    {
        name: "Git",
        icon: "/git.svg",
    },
    {
        name: "Java",
        icon: "/java.svg",
    },
    {
        name: "Bash",
        icon: "/bash.svg",
    },
    {
        name: "Express",
        icon: "/express.svg",
    },
    {
        name: "Mongoose",
        icon: "/mongoose.svg",
    },
    {
        name: "PostgreSQL",
        icon: "/postgresql.svg",
    },
    {
        name: "Linux",
        icon: "/linux.svg",
    },
    {
        name: "NPM",
        icon: "/npm.svg",
    },
];

export const experiences = [
    {
        title: "Software Design Engineer Intern",
        companyName: "Evertz Microsystems",
        icon: "/evertz.svg",
        iconBg: "#ffffff",
        date: "May 2025 - Present",
        points: [
            "Currently working on MAGNUM OS, a full stack software that provides control, orchestration, monitoring, and analytics for customer's Evertz equipment.",
            "Developed a maintainable, scalable UI library for multiple Evertz projects by designing reusable components with TypeScript and Tailwind CSS.",
        ],
    },
    {
        title: "Systems Engineer Intern",
        companyName: "Superior Boiler Works and Welding Limited",
        icon: "/sbww.png",
        iconBg: "#ffffff",
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
        icon: "/scf.png",
        iconBg: "#ffffff",
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

export const links = [
    {
        id: 1,
        img: "/git.svg",
        link: "https://github.com/JakieBoi77",
    },
    {
        id: 2,
        img: "/mail.svg",
        link: "mailto:jakef7@icloud.com",
    },
    {
        id: 3,
        img: "/link.svg",
        link: "https://www.linkedin.com/in/jake-finlay-54145a253",
    },
    {
        id: 4,
        img: "/document.svg",
        link: "/resume/Jake Finlay Resume.pdf",
    },
];
