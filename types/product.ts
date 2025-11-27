export interface Variant {
    id: string;
    discount: number;
    price: number;
    stock: number;
}

export interface Product {
    id: string;
    category: string;
    name: string;
    description: string;
    image: string[];
    variants: Variant[];
    createdAt: string;
}

export interface ProductsClientProps {
    products: Product[];
}