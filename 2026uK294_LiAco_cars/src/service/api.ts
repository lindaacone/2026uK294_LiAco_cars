import axios from "axios";

export interface Car {
  id?: number;
  name: string;
  year: number;
  milesPerGallon?: number;
  cylinders?: number;
  displacement?: number;
  horsepower?: number;
  weightInLbs?: number;
  acceleration?: number;
  origin?: string;
}

const API_URL = "http://localhost:3030";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function getCars() {
  const response = await api.get<Car[]>("/cars");
  return response.data;
}

export async function getCar(id: string) {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
}

export async function createCar(car: Car) {
  const response = await api.post<Car>("/cars", car);
  return response.data;
}

export async function updateCar(id: string, car: Car) {
  const response = await api.put<Car>(`/cars/${id}`, car);
  return response.data;
}

export async function deleteCar(id: number) {
  await api.delete(`/cars/${id}`);
}

export async function login(email: string, password: string) {
  const response = await api.post<{ accessToken: string }>("/login", {
    email,
    password,
  });

  return response.data;
}