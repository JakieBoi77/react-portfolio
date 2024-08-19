export const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "#about" },
  { name: "Technologies", link: "#technologies" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const aboutParagraph = `I'm a skilled software developer with experience in TypeScript and JavaScript, and expertise in frameworks like React, Node.js, and Next.js.
  I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems.`;

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
    projectTitle: "Money Manager",
    link: "https://banking.finlaytech.ca",
    des: "",
    picList: [],
    iconList: [],
  }
]

export const learningProjectCollections = [
  {
    id: 1,
    collectionTitle: "Front End Development Projects",
    folder: "front-end-dev",
    des: "Explore some of my recent front-end projects. In making these projects, I learned component-based architecture, state management, and responsive design techniques.",
    projects: [
      { 
        title: "Quote Generator",
        value: "quote-generator",
        pic: "/quote-generator.png",
      },
      {
        title: "Markdown Previewer",
        value: "markdown-previewer",
        pic: "/markdown-previewer.png",
      },
      {
        title: "Meme Soundboard",
        value: "meme-soundboard",
        pic: "/meme-soundboard.png",
      },
      {
        title: "Calculator",
        value: "calculator",
        pic: "/calculator.png",
      },
      {
        title: "Pomodoro Clock",
        value: "pomodoro-clock",
        pic: "/pomodoro-clock.png",
      }
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
        title: "URL Shortener Microservice",
        value: "url-shortener-microservice",
        pic: "/url-shortener.png",
      },
      {
        title: "Exercise Tracker Microservice",
        value: "exercise-tracker-microservice",
        pic: "/exercise-tracker.png",
      },
      {
        title: "File Metadata Microservice",
        value: "file-metadata-microservice",
        pic: "/file-metadata.png",
      },
      { 
        title: "Timestamp Microservice",
        value: "timestamp-microservice",
        pic: "/timestamp.png",
      },
      {
        title: "Request Header Parser Microservice",
        value: "request-header-parser-microservice",
        pic: "/request-header-parser.png",
      },
    ],
    iconLists: ["/npm.svg", "/express.svg", "/node.svg", "/mongodb.svg", "/mongoose.svg"],
  },
  {
    id: 3,
    collectionTitle: "Data Visualization Projects",
    folder: "data-visualization",
    des: "Examine my data visualization projects. In making these projects, I learned d3.js and AJAX technologies.",
    projects: [
      { 
        title: "Choropleth Map",
        value: "choropleth-map",
        pic: "/choropleth-map.png",
      },
      { 
        title: "Treemap Diagram",
        value: "treemap-diagram",
        pic: "/treemap-diagram.png",
      },
      { 
        title: "Heat Map",
        value: "heat-map",
        pic: "/heat-map.png",
      },
      { 
        title: "Bar Chart",
        value: "bar-chart",
        pic: "/bar-chart.png",
      },
      { 
        title: "Scatterplot",
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
        value: "legacy-portfolio",
        pic: "/legacy-portfolio.png",
      },
      { 
        title: "Survey Form",
        value: "survey-form",
        pic: "/survey-form.png",
      },
      {
        title: "Tribute Page",
        value: "tribute-page",
        pic: "/tribute-page.png",
      },
      {
        title: "Technical Documentation",
        value: "technical-documentation",
        pic: "/technical-documentation.png",
      },
      {
        title: "Product Landing Page",
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
]

export const experiences = [
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
      "Learned how to use Storis, the furniture inventory management system, in order to complete my assigned tasks while still maintaining inventory accuracy."
    ]
  },
  {
    title: "System Engineering Intern",
    companyName: "Superior Boiler Works and Welding Limited",
    icon: "/sbww.png",
    iconBg: "#ffffff",
    date: "May 2023 - August 2023",
    points: [
      "My first co-op position where I was responsible for providing IT support and maintaining IT infrastructure.",
      "Implemented IT support strategies to resolve user technical issues, utilizing M365 Exchange Servers and PowerShell scripts.",
      "Managed Active Directory accounts for a team of 100 employees and reduced account setup time through streamlined GPO management.",
      "Collaborated with my team to implement security protocols and improve system efficiency.",
    ]
  },
]

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/JakieBoi77"
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/jake-finlay-54145a253"
  },
];