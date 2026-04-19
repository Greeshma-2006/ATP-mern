import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  // ================= LOGIN =================
  login: async (userCredWithRole) => {
    const { ROLE, ...userCredObj } = userCredWithRole;

    try {
      set({ loading: true, error: null });

      const res = await axios.post(
        "https://name-blogapp-backend.onrender.com/common-api/login",
        userCredObj,
        { withCredentials: true }
      );

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
        error: null,
      });

    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Login failed",
      });
    }
  },

  // ================= LOGOUT =================
  logout: async () => {
    try {
      set({ loading: true, error: null });

      await axios.get(
        "https://name-blogapp-backend.onrender.com/common-api/logout",
        { withCredentials: true }
      );

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: null,
      });

    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },

  // ================= RESTORE LOGIN =================
  checkAuth: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(
        "https://name-blogapp-backend.onrender.com/common-api/check-auth",
        { withCredentials: true }
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

    } catch {
      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    }
  },
}));