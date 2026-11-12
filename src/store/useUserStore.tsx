import { create } from "zustand";

type UserState = {
  navVisibility: boolean;
};

export const useUserStore = create<UserState>(() => {
  return {
    navVisibility: false,
  };
});

export function setNavOpaque() {
  useUserStore.setState({ navVisibility: true });
}

export function setNavTransparent() {
  useUserStore.setState({ navVisibility: false });
}
