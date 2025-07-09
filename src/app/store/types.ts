export interface Task {
  id: number;
  name: string;
  status: string;
  rate?: number;
}

export interface Project {
  id: number;
  name: string;
  rate: number;
  tasks: Task[];
  description?: string;
}

export interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (id: number) => void;
  updateProject: (project: Project) => void;
  selectProjectById: (id: number) => void;
}
