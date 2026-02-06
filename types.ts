
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  category: 'MERN' | 'Django' | 'AI';
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Language';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
