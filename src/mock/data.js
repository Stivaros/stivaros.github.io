import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Efstathios Stivaros | Ruby on Rails Developer from London', // e.g: 'Name | Developer'
  lang: 'en-GB', // e.g: en, es, fr, jp
  description: 'Portfolio for Efstathios Stivaros, a Ruby on Rails developer from London', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: 'Hello, I am',
  name: 'Efstathios Stivaros',
  subtitle: 'A Ruby on Rails Developer from London',
  cta: 'About me',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne:
    "I'm a full-stack Ruby on Rails developer who has had the fortune of working both in-house (at both technical and non-technical companies) and at a consultancy. I enjoy working in teams, no matter the size, whether that be in a leadership role or as a team member.",
  paragraphTwo:
    'My focus is on writing clean, well-tested code that will delight the business and my fellow developers alike. I follow the DevOps philosophy and enjoy learning all things tech.',
  paragraphThree:
    "Below are some of the projects I've worked on, across the stack. Deployment, governance/policy and architecture are difficult to showcase so please get in touch to discuss.",
  curriculumVitae: 'https://s3.eu-west-2.amazonaws.com/stivaros.com/CV.pdf', // if no curriculumVitae, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'et3.webp',
    title: 'HMCTS Employment Tribunals - ET3 Form',
    info:
      "ET3 is the form an employer files in response to a claimant's ET1. The service had previously been digitised in PHP. Using the existing service I rewrote the service in RoR.",
    info2:
      'The service is fully tested (including docker-compose setup for an s3/blob store service locally), observes the GOVUK design principles and uses slim as its templating language.',
    url: 'https://tribunal-response.employmenttribunals.service.gov.uk/',
    repo: 'https://github.com/hmcts/et3', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: '',
  btn: '',
  email: '',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'twitter',
      url: '',
    },
    {
      id: nanoid(),
      name: 'codepen',
      url: '',
    },
    {
      id: nanoid(),
      name: 'linkedin',
      url: '',
    },
    {
      id: nanoid(),
      name: 'github',
      url: '',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: true, // set to false to disable the GitHub stars/fork buttons
};
