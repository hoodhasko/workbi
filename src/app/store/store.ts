import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {ProjectStore} from './types';
import {zustandStorage} from '@app/storage';

const store: StateCreator<ProjectStore> = (set, get) => ({
  projects: [],
  addProject: project =>
    set(state => ({projects: [...state.projects, project]})),
  removeProject: id =>
    set(state => ({projects: state.projects.filter(p => p.id !== id)})),
  updateProject: project =>
    set(state => ({
      projects: state.projects.map(p => (p.id === project.id ? project : p)),
    })),
  selectProjectById: id => get().projects.find(p => p.id === id),
});

export const useProjectStore = create<ProjectStore>()(
  persist(store, {
    name: 'task-tracker-storage',
    storage: createJSONStorage(() => zustandStorage),
  }),
);

export const selectProjectById = (state: ProjectStore, id: number) =>
  state.projects.find(p => p.id === id);
