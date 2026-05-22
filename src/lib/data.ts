export type Metric = {
  label: string;
  value: string;
  note: string;
  tone: "brand" | "emerald" | "violet" | "orange";
  trend?: "up" | "down";
};

export type Movement = {
  id: number;
  product: string;
  category: string;
  quantity: number;
  time: string;
};

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
};

export type ProductRow = {
  code: string;
  name: string;
  brand: string;
  type: string;
  country: string;
  date: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out Stock";
};

export type HistoryRow = {
  menu: string;
  action: "UPDATE" | "CREATE" | "DELETE" | "REVERT" | "MODIFY";
  actor: string;
  description: string;
};

const delay = () => new Promise((resolve) => setTimeout(resolve, 30));

export async function getDashboardData() {
  await delay();

  return {
    metrics: [
      { label: "Product Ready", value: "1,248", note: "12.5% vs yesterday", tone: "brand", trend: "up" },
      { label: "Product Outstock", value: "968", note: "8.3% vs yesterday", tone: "emerald", trend: "down" },
      { label: "Total Products", value: "5,430", note: "All products", tone: "violet" }
    ] satisfies Metric[],
    charts: {
      ready: [44, 62, 58, 75, 92, 81, 104],
      outstock: [36, 48, 53, 64, 58, 72, 86],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    inbound: [
      { id: 1, product: "Industrial Compressor V2", category: "Compressor", quantity: 60, time: "09:15 AM" },
      { id: 2, product: "Surface Pro 9", category: "Electronics", quantity: 40, time: "10:30 AM" },
      { id: 3, product: "Safety Valve 3000", category: "Parts", quantity: 25, time: "11:45 AM" },
      { id: 4, product: "Pressure Sensor X1", category: "Electronics", quantity: 35, time: "01:20 PM" },
      { id: 5, product: "Air Tank 500L", category: "Equipment", quantity: 50, time: "02:40 PM" }
    ] satisfies Movement[],
    outbound: [
      { id: 1, product: "Industrial Compressor V2", category: "Compressor", quantity: 45, time: "09:25 AM" },
      { id: 2, product: "Surface Pro 9", category: "Electronics", quantity: 30, time: "10:50 AM" },
      { id: 3, product: "Safety Valve 3000", category: "Parts", quantity: 20, time: "12:10 PM" },
      { id: 4, product: "Pressure Sensor X1", category: "Electronics", quantity: 25, time: "01:35 PM" },
      { id: 5, product: "Air Tank 500L", category: "Equipment", quantity: 40, time: "03:15 PM" }
    ] satisfies Movement[]
  };
}

export async function getUsersData() {
  await delay();

  return {
    metrics: [
      { label: "Total Users", value: "1,284", note: "12% from last month", tone: "brand", trend: "up" },
      { label: "Active Sessions", value: "432", note: "Live user activity", tone: "emerald" },
      { label: "Pending Approvals", value: "18", note: "Needs review", tone: "orange" },
      { label: "Admin Accounts", value: "24", note: "Global access", tone: "violet" }
    ] satisfies Metric[],
    users: [
      { id: "USR-0001", name: "Sarah Connor", email: "sarah.connor@coreadmin.com", role: "Administrator", status: "Active" },
      { id: "USR-0002", name: "James Wilson", email: "james.wilson@coreadmin.com", role: "Manager", status: "Active" },
      { id: "USR-0003", name: "Elena Rodriguez", email: "elena.rodriguez@coreadmin.com", role: "Inventory Staff", status: "Pending" },
      { id: "USR-0004", name: "Michael Chen", email: "michael.chen@coreadmin.com", role: "Auditor", status: "Inactive" }
    ] satisfies UserRow[]
  };
}

export async function getProductsData() {
  await delay();

  return {
    metrics: [
      { label: "Total Tools Incoming (MTD)", value: "1,248 Units", note: "12.5% from last month", tone: "brand", trend: "up" },
      { label: "Total Tools Out (MTD)", value: "968 Units", note: "8.3% from last month", tone: "emerald", trend: "down" }
    ] satisfies Metric[],
    products: [
      { code: "AL-101", name: "Surface Studio 2+", brand: "Microsoft", type: "Workstation", country: "USA", date: "Oct 24, 2023", quantity: 15, status: "In Stock" },
      { code: "AL-102", name: "Spectrophotometer", brand: "Shimadzu", type: "Lab Analysis", country: "Japan", date: "Oct 26, 2023", quantity: 8, status: "Low Stock" },
      { code: "AL-103", name: "Industrial Compressor V2", brand: "Atlas Copco", type: "Compressor", country: "Sweden", date: "Oct 29, 2023", quantity: 36, status: "In Stock" },
      { code: "AL-104", name: "Pressure Sensor X1", brand: "Omron", type: "Electronics", country: "Japan", date: "Nov 2, 2023", quantity: 0, status: "Out Stock" }
    ] satisfies ProductRow[]
  };
}

export async function getHistoryData() {
  await delay();

  return {
    rows: [
      { menu: "Inventory", action: "UPDATE", actor: "Sarah Connor", description: "Updated stock levels for Industrial Compressor V2." },
      { menu: "User", action: "CREATE", actor: "James Wilson", description: "Added new staff member Elena Rodriguez." },
      { menu: "System", action: "DELETE", actor: "Admin System", description: "Purged temporary logs older than 90 days." },
      { menu: "Inventory", action: "REVERT", actor: "Michael Chen", description: "Reverted transaction #INV-9780 due to error." },
      { menu: "Product", action: "MODIFY", actor: "Sarah Connor", description: "Changed product category for Surface Pro 9." }
    ] satisfies HistoryRow[]
  };
}
