export interface Product<TAttributes> {
  id: string;
  name: string;
  price: number;
  attributes: TAttributes;
}
