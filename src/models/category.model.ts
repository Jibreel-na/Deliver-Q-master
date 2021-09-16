export interface CategoryModel {
  _id: string;
  icon: string;
  active: boolean;
  weight: string;
  price: number;
  title: string;
  SubCategories: SubCategoryModel[];

}


export interface SubCategoryModel {
  _id: string;
  icon: string;
  title: string;
  active: boolean;
  note: string;
  other?: number;
  categoryObj?: CategoryModel;
}
