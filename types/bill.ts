export interface BillItem {
    id: string;
    name: string;
    price: number;
}

export interface ExtractedBill {
    restaurantName: string;
    items: BillItem[];
    serviceChargePercent: number;
    currency: string;
}