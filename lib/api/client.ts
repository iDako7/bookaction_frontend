import axios, { AxiosRequestConfig } from "axios";
import type {
  ModulesOverviewResponse,
  ModuleTheme,
  ConceptTutorial,
  ConceptQuizResponse,
  QuizSubmission,
  QuizSubmissionResponse,
  ConceptSummary,
  ModuleReflection,
  ReflectionSubmission,
  ReflectionSubmissionResponse,
  ProgressUpdate,
  ProgressResponse,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiResponse,
  AuthPayload,
  User,
} from "@/lib/types/api";
import { useAuthStore } from "@/lib/state/authStore";

const resolveApiBaseUrl = () => {
  const envBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envBaseUrl) {
    return envBaseUrl;
  }

  if (typeof window !== "undefined") {
    return "/api";
  }

  throw new Error("NEXT_PUBLIC_API_URL is not configured");
};

// Queue to store requests while refreshing token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

// Axios instance for API calls
const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
apiClient.interceptors.request.use(
  (config) => {
    // Keep baseURL in sync with env for SSR, browser, and tests
    config.baseURL = resolveApiBaseUrl();

    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = "Bearer " + token;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint
        const response = await axios.post(
          `${resolveApiBaseUrl()}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { newAccessToken } = response.data.data;

        // Update store
        const { user } = useAuthStore.getState();
        if (user) {
          useAuthStore.getState().login(user, newAccessToken);
        }

        // Update header for future requests
        apiClient.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;

        // Update header for this request
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        }

        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Logout and redirect
        useAuthStore.getState().logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * API Client
 */
export const api = {
  // Modules
  getModulesOverview: async (): Promise<ModulesOverviewResponse> => {
    const response = await apiClient.get<ModulesOverviewResponse>(
      "/modules/overview"
    );
    return response.data;
  },

  getModuleTheme: async (moduleId: number): Promise<ModuleTheme> => {
    const response = await apiClient.get<ModuleTheme>(
      `/modules/${moduleId}/theme`
    );
    return response.data;
  },

  getModuleReflection: async (moduleId: number): Promise<ModuleReflection> => {
    const response = await apiClient.get<ModuleReflection>(
      `/modules/${moduleId}/reflection`
    );
    return response.data;
  },

  submitModuleReflection: async (
    moduleId: number,
    submission: ReflectionSubmission
  ): Promise<ReflectionSubmissionResponse> => {
    const response = await apiClient.post<ReflectionSubmissionResponse>(
      `/modules/${moduleId}/reflection`,
      submission
    );
    return response.data;
  },

  // Concepts
  getConceptTutorial: async (conceptId: number): Promise<ConceptTutorial> => {
    const response = await apiClient.get<ConceptTutorial>(
      `/concepts/${conceptId}/tutorial`
    );
    return response.data;
  },

  getConceptQuiz: async (conceptId: number): Promise<ConceptQuizResponse> => {
    const response = await apiClient.get<ConceptQuizResponse>(
      `/concepts/${conceptId}/quiz`
    );
    return response.data;
  },

  getConceptSummary: async (conceptId: number): Promise<ConceptSummary> => {
    const response = await apiClient.get<ConceptSummary>(
      `/concepts/${conceptId}/summary`
    );
    return response.data;
  },

  updateConceptProgress: async (
    conceptId: number,
    update: ProgressUpdate
  ): Promise<ProgressResponse> => {
    const response = await apiClient.post<ProgressResponse>(
      `/concepts/${conceptId}/progress`,
      update
    );
    return response.data;
  },

  // Quiz
  submitQuizAnswer: async (
    quizId: number,
    submission: QuizSubmission
  ): Promise<QuizSubmissionResponse> => {
    const response = await apiClient.post<QuizSubmissionResponse>(
      `/concepts/quiz/${quizId}/answer`,
      submission
    );
    return response.data;
  },

  // Auth
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthPayload>>(
      "/auth/login",
      {
        emailOrUsername: data.emailOrUsername,
        password: data.password,
      }
    );
    return {
      user: response.data.data.user,
      token: response.data.data.accessToken,
    };
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthPayload>>(
      "/auth/register",
      data
    );
    return {
      user: response.data.data.user,
      token: response.data.data.accessToken,
    };
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  },
};

export default api;
