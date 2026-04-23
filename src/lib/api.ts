import axios from 'axios';
import { Event, User } from '../types/types';

// Базове посилання вказує тільки на сам сервер (без слова /events)
const API_URL = 'http://localhost:3001';

export const eventApi = {
  getAll: async (search?: string) => {
    const url = search ? `${API_URL}/events?q=${search}` : `${API_URL}/events`;
    const { data } = await axios.get<Event[]>(url);
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get<Event>(`${API_URL}/events/${id}`);
    return data;
  },

  create: async (event: Omit<Event, 'id'>) => {
    const { data } = await axios.post<Event>(`${API_URL}/events`, event);
    return data;
  },

  getByOrganizer: async (userId: string) => {
    const { data } = await axios.get<Event[]>(`${API_URL}/events?organizerId=${userId}`);
    return data;
  },

  getUser: async (id: string) => {
    const { data } = await axios.get<User>(`${API_URL}/users/${id}`);
    return data;
  }
};

// НОВИЙ БЛОК ДЛЯ АВТОРИЗАЦІЇ (працює з json-server)
export const authApi = {
  login: async (email: string, password: string) => {
    // json-server шукає користувача за збігом email та пароля
    const { data } = await axios.get<User[]>(`${API_URL}/users?email=${email}&password=${password}`);
    if (data.length > 0) {
      return data[0]; // Повертаємо знайденого юзера
    }
    throw new Error("Невірний email або пароль");
  },
  
  register: async (user: Omit<User, 'id'>) => {
    // Перевіряємо, чи є вже такий email
    const { data: existingUsers } = await axios.get<User[]>(`${API_URL}/users?email=${user.email}`);
    if (existingUsers.length > 0) {
      throw new Error("Користувач з таким email вже існує");
    }
    // Якщо немає - створюємо нового юзера
    const { data } = await axios.post<User>(`${API_URL}/users`, user);
    return data;
  }
};