export interface Product {
    id: string;
    brand: string;
    name: string;
    origin: string; // e.g., "made in vietnam"
    quality: string; // e.g., "High quality"
    sizes: string[]; // e.g., ["40", "41", "42", "43"]
    price: number;
    contactPhone: string; // e.g., "0980233823"
    telegramUsername: string; // e.g., "@Aynawaj1"
    images: string[]; // Array of image URLs
    createdAt: string; // ISO date string
}
