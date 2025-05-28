import { createContext } from "react";
type SelectedChapterIndexContextType = {
  selectedChapterIndex: number;
  setSelectedChapterIndex: React.Dispatch<React.SetStateAction<number>>;
};
export const SelectedChapterIndex = createContext<SelectedChapterIndexContextType>({
  selectedChapterIndex: 0,
  setSelectedChapterIndex: () => {},
});