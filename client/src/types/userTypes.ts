// src/types/userTypes.ts

export interface Transaction {
  _id: string;
  type: "debit" | "credit";
  amount: number;
  from: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt?: string;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "INFO" | "ALERT" | "TRANSACTION" | "SECURITY" | "PROMOTION";
  status: "UNREAD" | "READ";
  createdAt?: string;
}

export interface Achievement {
  name: string;
  icon: string;
  amount: number;
}

export interface Wallet {
  _id: string;
  name: string;
  balance: number;
  accountNumber: string;
  transactions: Transaction[];
  owner: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InventoryItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  inStockAmount: number;
  images: string[];
  isProductSoldOut: boolean;
  category: "clothing" | "food" | "gadgets" | "books" | "others";
  seller: string;
  createdAt?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  wallet: Wallet;
  productsSold: number;
  productsBought: number;
  achievements: Achievement[];
  inventory: InventoryItem[];
  products: Product[];
  notifications: Notification[];
  createdAt?: string;
  updatedAt?: string;
}
