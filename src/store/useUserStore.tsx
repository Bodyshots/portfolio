import { create } from "zustand";

type UserState = {
  navVisibility: boolean;
  loading: boolean;
};

export const useUserStore = create<UserState>(() => {
  return {
    navVisibility: false,
    loading: false,
  };
});

export function setNavOpaque() {
  useUserStore.setState({ navVisibility: true });
}

export function setNavTransparent() {
  useUserStore.setState({ navVisibility: false });
}

export function enableUserLoading() {
  useUserStore.setState({ loading: true });
}

export function disableUserLoading() {
  useUserStore.setState({ loading: false });
}
