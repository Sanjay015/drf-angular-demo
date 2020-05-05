type TourPackageRating = 'easy' | 'medium' | 'hard';

export class TourPackage {
  constructor(
    public id: number | null,
    public category: string,
    public name: string,
    public promo: string,
    public price: number,
    public rating: TourPackageRating,
    public tourLength: number,
    public start: Date
  ) { }
}

export interface TourPackagePage {
  count: number;
  results: TourPackage[];
}

export const defaultEmptyTourPackage: TourPackage = {
  category: 'uncategorized',
  id: null,
  name: 'Tour Package',
  price: 100.0,
  promo: 'promo',
  tourLength: 1,
  rating: 'easy',
  start: new Date()
};
