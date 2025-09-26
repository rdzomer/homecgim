import { CATEGORIES } from './constants';

export type Category = (typeof CATEGORIES)[number];

export interface Panel {
  id: string;
  name: string;
  category: Category;
  description: string;
  htmlContent: string;
  createdAt: string;
  userId: string;
}
