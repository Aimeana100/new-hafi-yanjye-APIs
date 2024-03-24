import { ReactElement } from "react";

export interface error {
    status: boolean;
    message: string
}
export interface navitem {
    page: string;
    link: string;
    icon: ReactElement;
    location: string
}
export interface img {
    data: string;
    url: string;
}
export interface user {
    fullname: string | null;
    email: string | null;
    telphone: string | null;
    id?: number | null;
    role?: string | null;
}
export interface image {
    link: string;
    id: number;
    product: string;
    name: string;
}

export interface product {
    cost: number;
    description: string;
    id: number;
    name: string;
    price: number;
    quatity: number;
    images?: image[];
    category: category;
}
export enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED",
    CONFIRMED = "CONFIRMED",
    COMPLETED = 'COMPLETED',
}

export interface order {
    id: number;
    orderId: string;
    orderDate: string;
    status: OrderStatus;
    orderDetails: OrderItem[];
    customer: customer;
}
export interface customer {
    id: number;
    fullName: string;
    telephone: string;
    role: string;
    orders: order[];
    email: string;
    password: string;
}

export type OrderItem = {
    id: number;
    product?: {
        id: number;
        name: string;
        description: string;
        price: number;
        cost: number;

    };
    quantity: number;

};
export interface agent {
    email: string;
    fullName: string;
    id: number;
    password?: string;
    role: string;
    telephone: string;
    tinNumber: string | null;
    location?: string;
    orderProcessor: [];
    orders?: order[];
}
export interface identityPerson {
    fullName: string;
    id: number;
}
export interface identityItem {
    name: string;
    id: number
}
export interface category {
    name: string;
    id: number;
    images: image[]
    products?: product[]
}


export interface IDiscount {
    id: number;
    startAt: Date;
    endAt: Date;
    rate: number;
    code: string;
    type: DiscountType;
    products?: product[];
    categories?: category[];
}

export enum DiscountType {
    ALL_PRODUCTS = 'ALL_PRODUCTS',
    CATEGORIES = 'CATEGORIES',
    PRODUCTS = "PRODUCTS"
}
export interface ICoupon {
    id?: number;
    code: string;
    startAt: Date;
    endAt: Date;
    rate: number;
    minItems: number;
    timeUsage?: number;
    minCost: number;
    products?: product[];
    order?: order
}

export interface OrderProcessI {
    id: number;
    orderItemId: number;
    agentId: number;
    processStatus: string;
    orderItem: {
        id: number;
        quantity: number;
        pricePerItem: number;
        order: {
            id: number;
            orderId: string;
            orderDate: string;
            total: number;
            status: OrderStatus;
        }
    }

}

export interface siteI {
    name: string;
    description: string;
    sector: number;
    price: number;
}

export interface siteFull {
    id: number;
    name: string;
    description: string;
    price?: number;
    sector: sector;
}

export interface province {
    id: number;
    name: string;
}
export interface district {
    id: number;
    name: string;
    province: province
}
export interface sector {
    id: number;
    name: string;
    district: district;
}