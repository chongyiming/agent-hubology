
export interface Transaction {
  id: string;
  date: string;
  propertyId: string;
  property?: {
    title: string;
    address?: {
      city?: string;
      state?: string;
    };
  };
  commission: number;
  status: string;
  price?: number;
  transactionValue?: number;
  agent?: {
    name?: string;
    id?: string;
  };
  buyer_name?: string;
  seller_name?: string;
}
