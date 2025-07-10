export interface Task {
  id: string;
  projectId: string;
  name: string;
  status: string;
  accumulatedTime: number;
  rate?: number;
}

export interface ActiveTask {
  id: string;
  name: string;
  startedAt: number;
  accumulatedTime: number;
  isPaused: boolean;
  rate?: number;
}

export interface Project {
  id: string;
  name: string;
  rate: number;
  tasksCount: number;
  description?: string;
}

export interface ProjectStore {
  projects: Project[];
  tasks: Task[];
  activeTask: ActiveTask | null;

  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
  updateProject: (project: Project) => void;

  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;

  togglePause: () => void;
  startTask: (taskId: string) => void;
  stopTimer: () => void;

  updateActiveTaskTime: (time: number) => void;

  getProjectTasks: (projectId: string) => Task[];
}
