import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {ProjectStore} from './types';
import {zustandStorage} from '@app/storage';

const store: StateCreator<ProjectStore> = (set, get) => ({
  projects: [],
  tasks: [],
  activeTask: null,

  addProject: project =>
    set(state => ({projects: [...state.projects, project]})),
  removeProject: id =>
    set(state => ({projects: state.projects.filter(p => p.id !== id)})),
  updateProject: project =>
    set(state => ({
      projects: state.projects.map(p => (p.id === project.id ? project : p)),
    })),

  createTask: task =>
    set(state => ({
      tasks: [...state.tasks, task],
      projects: state.projects.map(p =>
        p.id === task.projectId ? {...p, tasksCount: p.tasksCount + 1} : p,
      ),
    })),
  updateTask: task =>
    set(state => ({
      tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
    })),
  deleteTask: taskId =>
    set(state => ({
      tasks: state.tasks.filter(t => t.id !== taskId),
      projects: state.projects.map(p =>
        p.id === taskId ? {...p, tasksCount: p.tasksCount - 1} : p,
      ),
    })),

  startTask: taskId => {
    const {tasks, activeTask} = get();

    if (activeTask && activeTask.id === taskId) return;

    if (activeTask && !activeTask.isPaused) {
      const totalAccumulatedTime =
        activeTask.accumulatedTime +
        Math.floor((Date.now() - activeTask.startedAt) / 1000);

      set({
        tasks: tasks.map(t => {
          if (t.id === activeTask.id) {
            return {
              ...t,
              accumulatedTime: totalAccumulatedTime,
            };
          }
          return t;
        }),
      });
    }

    const task = tasks.find(t => t.id === taskId);

    if (task) {
      set({
        activeTask: {
          ...task,
          isPaused: false,
          startedAt: Date.now(),
        },
      });
    }
  },
  togglePause: () => {
    const {activeTask} = get();

    if (!activeTask) return;

    const updatedActiveTask = {...activeTask};

    if (!activeTask.isPaused) {
      const elapsed = Math.floor((Date.now() - activeTask.startedAt) / 1000);

      updatedActiveTask.isPaused = true;
      updatedActiveTask.accumulatedTime += elapsed;
    } else {
      updatedActiveTask.isPaused = false;
      updatedActiveTask.startedAt = Date.now();
    }

    set({
      activeTask: updatedActiveTask,
    });
  },
  stopTimer: () => {
    const {activeTask, tasks} = get();

    if (!activeTask) return;

    const totalAccumulatedTime =
      activeTask.accumulatedTime +
      Math.floor((Date.now() - activeTask.startedAt) / 1000);

    set(() => ({
      activeTask: null,
      tasks: tasks.map(t => {
        if (t.id === activeTask.id) {
          return {
            ...t,
            accumulatedTime: totalAccumulatedTime,
          };
        }
        return t;
      }),
    }));
  },
  updateActiveTaskTime: time =>
    set(state => {
      if (state.activeTask) {
        return {
          activeTask: {
            ...state.activeTask,
            accumulatedTime: state.activeTask.accumulatedTime + time,
          },
        };
      }
      return {};
    }),

  getProjectTasks: projectId =>
    get().tasks.filter(t => t.projectId === projectId),
});

export const useProjectStore = create<ProjectStore>()(
  persist(store, {
    name: 'task-tracker-storage',
    storage: createJSONStorage(() => zustandStorage),
  }),
);

export const selectProjectById = (state: ProjectStore, projectId: string) =>
  state.projects.find(p => p.id === projectId);
