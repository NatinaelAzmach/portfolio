import type { Project, Skill, Experience, NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Power Outage Utility App',
    description: 'Android app helping communities track and cope with scheduled power outages.',
    longDescription:
      'A Kotlin-based Android app that aggregates power outage schedules from local utilities, sends push notifications before outages, and lets users report unscheduled cuts. Includes an offline-first architecture so it works even when connectivity is limited during outages.',
    category: 'mobile',
    tags: ['Kotlin', 'Android', 'Firebase', 'Room DB', 'WorkManager'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    githubUrl: 'https://github.com/NatinaelAzmach/meh',
    featured: true,
  },
  {
    id: '2',
    title: 'UniMatch — Student Social Platform',
    description: 'Social platform connecting university students for study groups, events, and networking.',
    longDescription:
      'A full-stack social platform built for university students to form study groups, share resources, organize campus events, and connect with peers across departments. Features real-time chat, a feed algorithm, and department-based communities.',
    category: 'fullstack',
    tags: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Tailwind'],
    image: 'unimatch-screenshot.png', // <-- REPLACE THIS WITH YOUR OWN PHOTO
    demoUrl: 'https://uni-match-n.vercel.app', // <-- REPLACE THIS WITH YOUR LINK
    githubUrl: 'https://github.com/NatinaelAzmach/meh',
    featured: true,
  },
  {
    id: '3',
    title: 'City Administration Portal',
    description: 'Civic engagement web platform for city residents to interact with local government.',
    longDescription:
      'A web platform that bridges the gap between city administrations and residents. Citizens can report issues, track service requests, view public announcements, and participate in local polls. Built with a PHP/MySQL backend and a React frontend.',
    category: 'fullstack',
    tags: ['React', 'PHP', 'MySQL', 'Tailwind', 'TypeScript'],
    image: 'Negele borana.png',
    demoUrl: 'https://negele-borana.vercel.app',
    githubUrl: 'https://github.com/NatinaelAzmach/meh',
    featured: true,
  },
  {
    id: '4',
    title: 'Real Estate Marketplace',
    description: 'Mobile-first platform streamlining property listings and transactions in emerging markets.',
    longDescription:
      'A React Native app and Node.js backend designed for real estate transactions in emerging markets where traditional listing platforms fall short. Features property search with map integration, agent profiles, in-app messaging, and a simplified offer flow.',
    category: 'mobile',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'TypeScript'],
    image: 'gojo.png',
    demoUrl: 'https://gojo-et.vercel.app',
    githubUrl: 'https://github.com/NatinaelAzmach/meh',
    featured: false,
  },
  {
    id: '5',
    title: 'Smart Study Scheduler',
    description: 'AI-assisted study planner that adapts to student performance and deadlines.',
    longDescription:
      'A Python-powered backend with a React frontend that analyzes a student\'s course load, past performance, and upcoming deadlines to generate optimized study schedules. Uses a simple ML model to predict which subjects need more focus.',
    category: 'aiml',
    tags: ['Python', 'React', 'Node.js', 'MongoDB', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    githubUrl: 'https://github.com/NatinaelAzmach/meh',
    featured: false,
  },
  {
    id: '6',
    title: 'Community Issue Tracker',
    description: 'Hyperlocal app for neighborhoods to report and resolve community problems.',
    longDescription:
      'A Kotlin Android app that lets community members pin issues on a map (potholes, broken streetlights, waste), upvote problems, and track resolution status. Integrates with local authority APIs where available.',
    category: 'mobile',
    tags: ['Kotlin', 'Android', 'Firebase', 'Google Maps SDK', 'Python'],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    githubUrl: 'https://github.com/NatinaelAzmach/meh',
    featured: false,
  },
]

export const SKILLS: Skill[] = [
  { name: 'React / React Native', level: 90, category: 'frontend', years: 3 },
  { name: 'TypeScript', level: 85, category: 'frontend', years: 2 },
  { name: 'Tailwind CSS', level: 88, category: 'frontend', years: 2 },
  { name: 'Node.js', level: 82, category: 'backend', years: 3 },
  { name: 'Python', level: 78, category: 'backend', years: 3 },
  { name: 'PHP', level: 75, category: 'backend', years: 2 },
  { name: 'MySQL', level: 76, category: 'backend', years: 3 },
  { name: 'MongoDB', level: 74, category: 'backend', years: 2 },
  { name: 'Firebase', level: 80, category: 'devops', years: 3 },
  { name: 'Kotlin / Android', level: 55, category: 'other', years: 1 },
]

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: 'Personal Project',
    role: 'Lead Developer — UniMatch',
    period: '2024 – 2025',
    description: 'Designed and built a full-stack social platform for university students as a personal project.',
    achievements: [
      'Architected the full system from database schema to React UI',
      'Implemented real-time chat using Firebase and WebSockets',
      'Shipped a working product used by students across campus',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Tailwind'],
  },
  {
    id: '2',
    company: 'Freelance / Independent',
    role: 'Full Stack & Mobile Developer',
    period: '2022 – Present',
    description: 'Built real-world apps solving community problems — from power outage trackers to civic platforms.',
    achievements: [
      'Shipped Power Outage Utility app used by local community members',
      'Delivered city administration portal improving resident-government communication',
      'Built real estate marketplace tailored to emerging market constraints',
    ],
    tech: ['Kotlin', 'React', 'React Native', 'Node.js', 'PHP', 'MySQL', 'Firebase'],
  },
  {
    id: '3',
    company: 'Self-Directed Learning',
    role: 'CS Student & Open Source Contributor',
    period: '2021 – Present',
    description: 'Continuously expanding skills across mobile, web, and backend development through projects and coursework.',
    achievements: [
      'Completed 10+ personal projects spanning Android, web, and AI',
      'Contributed to open source tools used in the local dev community',
      'Mentored junior students in Android development at university coding club',
    ],
    tech: ['Python', 'TypeScript', 'Android', 'React Native', 'MongoDB'],
  },
]
