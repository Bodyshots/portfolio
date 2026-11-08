import { create } from "zustand";
import type { Project } from "@/types";

type ProjectState = {
  loading: boolean;
  error: string;

  projects: Project[];
  selectedProject: Project | null;

  setProjects: (project: Project[]) => void;
  setSelectedProject: (id: number) => void;

  enableProjectsLoading: () => void;
  disableProjectsLoading: () => void;
  setProjectsError: (error: string) => void;
};

export const useProjectStore = create<ProjectState>(() => ({
  loading: false,
  error: "",
  projects: [],
  selectedProject: null,
  enableProjectsLoading,
  disableProjectsLoading,
  setProjectsError,
  setProjects,
  setSelectedProject,
}));

export function enableProjectsLoading() {
  useProjectStore.setState({ loading: true });
}

export function disableProjectsLoading() {
  useProjectStore.setState({ loading: false });
}

export function setProjectsError(error: string) {
  useProjectStore.setState({ error });
}

export function setProjects(projects: Project[]) {
  useProjectStore.setState({ projects });
}

export function setSelectedProject(id: number) {
  const { projects } = useProjectStore.getState();
  useProjectStore.setState({
    selectedProject: projects.find((project) => project.id === id) ?? null,
  });
}

export function resetProject() {
  useProjectStore.setState({ selectedProject: null });
}
