export type QuestionItem = {
  question: string;
  category: string;
  description: string;
  voters: number;
  yesX: number;
  noX: number;
  activeButton: 'yes' | 'no';
  onFire: 'yes' | 'no' | 'none';
  graphData: {
    percentage: number;
    type: 'yes' | 'no';
    img: string;
  };
  yesPercentage: number;
  noPercentage: number;
  img: string;
  rules: string;
  volume: number;
};

export type GistResponse = {
  questions: QuestionItem[];
};
