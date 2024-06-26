export const navItems = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" }
];

export const projectCollections = [
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
        title: "Timestamp Microservice",
        value: "timestamp-microservice",
        pic: "/under-construction.png",
      },
      {
        title: "Request Header Parser Microservice",
        value: "request-header-parser-microservice",
        pic: "/under-construction.png",
      },
      {
        title: "URL Shortener Microservice",
        value: "url-shortener-microservice",
        pic: "/under-construction.png",
      },
      {
        title: "Exercise Tracker Microservice",
        value: "exercise-tracker-microservice",
        pic: "/under-construction.png",
      },
      {
        title: "File Metadata Microservice",
        value: "file-metadata-microservice",
        pic: "/under-construction.png",
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
    des: "A collection of my initial web projects where I learned web design basics and some responsive web design.",
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