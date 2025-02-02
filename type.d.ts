export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: "Electronics" | "Accessories" | "Wearables" | "Smart Home" | "Furniture" | "Personal Care" | "Storage";
    image: string;
    stock: number;
    quantity?: number;
}