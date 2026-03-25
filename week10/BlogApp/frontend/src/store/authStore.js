import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  isAuthenticated: false,
  currentUser: null,
  token: null,
  loading: false,

  login: async (userCred) => {
    try {
      set({ loading: true });

      const res = await axios.post(
        `http://localhost:5000/${userCred.role}-api/login`,
        userCred,
        { withCredentials: true }
      );

      set({
        isAuthenticated: true,
        currentUser: res.data.payload, // ✅ full user
        token: res.data.token,
        loading: false,
      });

    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  logout: () => {
    set({
      isAuthenticated: false,
      currentUser: null,
      token: null,
    });
  },
}));