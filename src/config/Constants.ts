export const BASE_COLORS = {
  main: {
    primary: 'rgba(46, 50, 52, 1)',
    primary20: 'rgba(46, 50, 52, 0.2)',
    secondary: 'rgba(93, 115, 126, 1)',
    accent: 'rgba(255, 107, 107, 1)',
    white: 'rgba(255, 255, 255, 1)',
    success: 'rgba(76, 175, 80, 1)',
    warning: 'rgba(255, 193, 7, 1)',
    error: 'rgba(239, 83, 80, 1)',
  },
  ui: {
    shading: 'rgba(34, 48, 90, 0.75)',
    background: 'rgba(248, 249, 250, 1)',
    borders: 'rgba(224, 224, 224, 1)',
    lightText: 'rgba(154, 165, 177, 1)',
  },
};

export const SCREEN_NAMES = {
  HomeScreen: 'HomeScreen',
  ProjectsScreen: 'ProjectsScreen',
  ReportsScreen: 'ReportsScreen',
  ProjectDetailsScreen: 'ProjectDetailsScreen',
  TasksScreen: 'TasksScreen',
  TaskScreen: 'TaskScreen',
} as const;

export const TABBAR_HEIGHT = 72;

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
  rate: number;
}

export interface Task {
  id: number;
  name: string;
  status: string;
  rate?: number;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    name: 'Project 1',
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        status: 'backlog',
        rate: 50,
      },
      {
        id: 2,
        name: 'Task 2',
        status: 'complete',
      },
    ],
    rate: 100,
  },
  {
    id: 2,
    name: 'Project 2',
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        status: 'backlog',
      },
      {
        id: 2,
        name: 'Task 2',
        status: 'complete',
      },
    ],
    rate: 200,
  },
  {
    id: 3,
    name: 'Project 3',
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        status: 'backlog',
      },
      {
        id: 2,
        name: 'Task 2',
        status: 'complete',
      },
    ],
    rate: 1000,
  },
  {
    id: 4,
    name: 'Project 4',
    tasks: [],
    rate: 100,
  },
  {
    id: 5,
    name: 'Project 5',
    tasks: [],
    rate: 100,
  },
  {
    id: 6,
    name: 'Project 6',
    tasks: [],
    rate: 100,
  },
  {
    id: 7,
    name: 'Project 7',
    tasks: [],
    rate: 100,
  },
  {
    id: 8,
    name: 'Project 8',
    tasks: [],
    rate: 100,
  },
  {
    id: 9,
    name: 'Project 9',
    tasks: [],
    rate: 100,
  },
  {
    id: 10,
    name: 'Project 10',
    tasks: [],
    rate: 100,
  },
  {
    id: 11,
    name: 'Project 11',
    tasks: [],
    rate: 100,
  },
];
