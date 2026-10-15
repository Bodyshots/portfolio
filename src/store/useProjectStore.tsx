import { create } from "zustand";

type ProjectState = {
  loading: boolean;
  error: string;

  shortDesc: string;
  longDesc: string;
  projVid: string;
  githubLink: string;
  projTitle: string;
  projImages: string[];
  imageAtts: string[];
  tools: string[];
};

export const useProjectStore = create<ProjectState>(() => ({
  loading: false,
  error: "",

  shortDesc: "",
  longDesc: "",
  projVid: "",
  githubLink: "",
  projTitle: "",
  projImages: [],
  imageAtts: [],
  tools: [],
}));

export function setShortDesc(shortDesc: string) {
  useProjectStore.setState({ shortDesc });
}

export function setLongDesc(longDesc: string) {
  useProjectStore.setState({ longDesc });
}

export function setProjVid(projVid: string) {
  useProjectStore.setState({ projVid });
}

export function setGithubLink(githubLink: string) {
  useProjectStore.setState({ githubLink });
}

export function setProjTitle(projTitle: string) {
  useProjectStore.setState({ projTitle });
}

export function setProjImages(projImages: string[]) {
  useProjectStore.setState({ projImages });
}

export function setImageAtts(imageAtts: string[]) {
  useProjectStore.setState({ imageAtts });
}

export function setTools(tools: string[]) {
  useProjectStore.setState({ tools });
}

export function enableLoading() {
  useProjectStore.setState({ loading: true });
}

export function disableLoading() {
  useProjectStore.setState({ loading: false });
}

export function setError(error: string) {
  useProjectStore.setState({ error });
}

export function resetProject() {
  useProjectStore.setState({
    shortDesc: "",
    longDesc: "",
    githubLink: "",
    projTitle: "",
    projVid: "",
    projImages: [],
    imageAtts: [],
    tools: [],
  });
}
