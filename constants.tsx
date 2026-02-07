
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ParentConnect',
    description: 'Multilingual Parent-Teacher Communication Portal. Implemented real-time language switching (English, Hindi, Marathi) and a dynamic parent dashboard for tracking progress.',
    tech: ['Python', 'Django', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    image: 'https://picsum.photos/id/1011/1920/1080',
    category: 'Django'
  },
  {
    id: '2',
    title: 'Dream Forge API',
    description: 'Developed scalable backend APIs and managed database integrations during an internship, focusing on front-end and back-end synergy using Python ecosystems.',
    tech: ['Python', 'Django', 'REST API', 'MongoDB'],
    image: 'https://picsum.photos/id/1015/1920/1080',
    category: 'Django'
  },
  {
    id: '3',
    title: 'GenAI Project Planner',
    description: 'A conceptual AI-driven planning tool inspired by AWS Generative AI training, focused on streamlining development workflows.',
    tech: ['React', 'Node.js', 'Generative AI', 'AWS'],
    image: 'https://picsum.photos/id/1027/1920/1080',
    category: 'AI'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Python', icon: 'fa-brands fa-python', level: 90, category: 'Language' },
  { name: 'Django', icon: 'fa-solid fa-server', level: 85, category: 'Backend' },
  { name: 'JavaScript', icon: 'fa-brands fa-square-js', level: 80, category: 'Language' },
  { name: 'Java', icon: 'fa-brands fa-java', level: 75, category: 'Language' },
  { name: 'C / C++', icon: 'fa-solid fa-code', level: 85, category: 'Language' },
  { name: 'MongoDB', icon: 'fa-solid fa-database', level: 75, category: 'Backend' },
  { name: 'MySQL', icon: 'fa-solid fa-database', level: 80, category: 'Backend' },
  { name: 'React', icon: 'fa-brands fa-react', level: 70, category: 'Frontend' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', level: 70, category: 'Backend' },
  { name: 'HTML / CSS', icon: 'fa-brands fa-css3-alt', level: 90, category: 'Frontend' },
];

export const EXPERIENCE = [
  {
    id: '1',
    role: 'Software Developer Intern',
    company: 'YSM Info Solutions',
    period: '2026 - Present',
    description: 'Spearheaded the development of scalable backend APIs using Django and Python. Optimized database queries for MongoDB, reducing latency by 40%. Collaborated with frontend teams to integrate RESTful services.',
    type: 'work'
  },
  {
    id: '2',
    role: 'Master of Computer Applications (MCA)',
    company: 'Dr. Moonje Institute, Nashik',
    period: '2023 - 2025',
    description: 'Specializing in Full Stack Development and AI. Leading the student developer club and organizing hackathons.',
    type: 'education'
  },
  {
    id: '3',
    role: 'Bachelor of Computer Applications (BCA)',
    company: 'Sandip University',
    period: '2020 - 2023',
    description: 'Graduated with Distinction. Built "ParentConnect" as a final year capstone project.',
    type: 'education'
  }
];

export const DEV_BIO = `
I am Shoaib Khatik, a motivated and detail-oriented software developer based in Nashik, currently pursuing my MCA. 
With a strong foundation in Python, Django, and Java, I specialize in building efficient and scalable web applications. 
My experience includes multilingual portal development and professional database management across SQL and NoSQL environments.
`;
