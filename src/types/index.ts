export type Theme = 'dark' | 'light'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: 'fullstack' | 'aiml' | 'mobile'
  tags: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'other'
  years: number
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  tech: string[]
  logo?: string
}

export interface NavLink {
  label: string
  href: string
}
