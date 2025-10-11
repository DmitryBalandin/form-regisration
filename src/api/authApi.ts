import { useMutation,type UseMutationResult } from '@tanstack/react-query';

interface LoginFormData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  username: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface AuthError {
  code: string;
  message: string;
  details?: string;
}
const mockUsers = [
  { email: 'info@mail.com', password: '123456', name: 'User' }
];

// Имитация задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Моковая функция авторизации
export const loginUser = async (credentials: LoginFormData): Promise<AuthResponse> => {
  await delay(1000); // Имитация сетевой задержки

  // Имитация различных ошибок API
  if (!credentials.email || !credentials.password) {
    throw {
      code: 'VALIDATION_ERROR',
      message: 'Email and password are required',
      details: 'Please fill in all required fields'
    };
  }

  if (!credentials.email.includes('@')) {
    throw {
      code: 'VALIDATION_ERROR',
      message: 'Invalid email format',
      details: 'Please enter a valid email address'
    };
  }

  const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
  
  if (!user) {
    throw {
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password',
      details: 'Please check your credentials and try again'
    };
  }

  // Имитация блокировки аккаунта после нескольких попыток
  if (credentials.email === 'locked@example.com') {
    throw {
      code: 'ACCOUNT_LOCKED',
      message: 'Account temporarily locked',
      details: 'Too many failed attempts. Try again in 15 minutes.'
    };
  }

  // Имитация необходимости верификации email
  if (credentials.email === 'unverified@example.com') {
    throw {
      code: 'EMAIL_NOT_VERIFIED',
      message: 'Email not verified',
      details: 'Please verify your email before logging in'
    };
  }

  // Успешный ответ
  return {
    token: 'mock_jwt_token_' + Math.random().toString(36).substr(2),
    username: user.name,
    user: {
      id: 'user_' + Math.random().toString(36).substr(2),
      email: user.email,
      name: user.name
    }
  };
};

// React Query хук для авторизации
export const useLogin = (): UseMutationResult<AuthResponse, AuthError, LoginFormData> => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ['login']
  });
};