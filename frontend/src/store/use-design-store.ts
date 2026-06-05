import { create } from "zustand";

export type ServiceKey = "web" | "mobile" | "product" | "growth";

type DesignState = {
  selectedService: ServiceKey;
  setSelectedService: (service: ServiceKey) => void;
};

export const useDesignStore = create<DesignState>((set) => ({
  selectedService: "web",
  setSelectedService: (selectedService) => set({ selectedService })
}));
