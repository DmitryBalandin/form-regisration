import { useMutation, type UseMutationResult } from '@tanstack/react-query';

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
    { email: 'info@mail.com', password: '123456', name: 'User' },
    { email: 'test@mail.com', password: '123456', name: 'Dmitry' }
];


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const checkNetworkConnection = (): boolean => {
    return navigator.onLine;
};

export const loginUser = async (credentials: LoginFormData): Promise<AuthResponse> => {
    if (!checkNetworkConnection()) {
        throw {
            code: 'NO_CONNECTION',
            message: 'No internet connection',
            details: 'Please check your network connection and try again'
        };
    }


    const randomError = Math.random();
    if (randomError < 0.1) {
        throw {
            code: 'NETWORK_ERROR',
            message: 'Network request failed',
            details: 'Unable to connect to the server. Please try again later.'
        };
    }

    await delay(1000);

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

    const user = mockUsers.find(u => u.email === credentials.email);

    if (!user) {
        throw {
            code: 'USER_NOT_FOUND',
            message: 'User with this email does not exist',
            details: 'Please check your email address or sign up for a new account'
        };
    }

    if (credentials.email === 'locked@example.com') {
        throw {
            code: 'ACCOUNT_LOCKED',
            message: 'Account temporarily locked',
            details: 'Too many failed attempts. Try again in 15 minutes.'
        };
    }


    if (user.password !== credentials.password) {
        throw {
            code: 'INVALID_PASSWORD',
            message: 'Invalid password',
            details: 'The password you entered is incorrect. Please try again.'
        };
    }

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

export const useLogin = (): UseMutationResult<AuthResponse, AuthError, LoginFormData> => {
    return useMutation({
        mutationFn: loginUser,
        mutationKey: ['login'],
        retry: (failureCount, error: AuthError) => {
            if (['VALIDATION_ERROR', 'USER_NOT_FOUND', 'INVALID_PASSWORD', 'ACCOUNT_LOCKED'].includes(error.code)) {
                return false;
            }

            return failureCount < 2;
        },
    });
};