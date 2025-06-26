import axios from 'axios';
import { User, Post, Album } from '../types/User';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Get posts by user ID
  getUserPosts: async (userId: number): Promise<Post[]> => {
    const response = await api.get<Post[]>(`/users/${userId}/posts`);
    return response.data;
  },

  // Get albums by user ID
  getUserAlbums: async (userId: number): Promise<Album[]> => {
    const response = await api.get<Album[]>(`/users/${userId}/albums`);
    return response.data;
  },

  // Search users by name or email
  searchUsers: async (query: string): Promise<User[]> => {
    const users = await userService.getUsers();
    return users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export default api; 