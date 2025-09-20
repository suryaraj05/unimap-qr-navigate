import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'host' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fake user database
const fakeUsers = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.student@university.edu',
    password: 'password123',
    role: 'student' as const,
    avatar: '👨‍🎓'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.host@university.edu',
    password: 'password123',
    role: 'host' as const,
    avatar: '👩‍🏫'
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    email: 'michael.admin@university.edu',
    password: 'password123',
    role: 'admin' as const,
    avatar: '👨‍💼'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.student@university.edu',
    password: 'password123',
    role: 'student' as const,
    avatar: '👩‍🎓'
  },
  {
    id: '5',
    name: 'Prof. Lisa Wang',
    email: 'lisa.host@university.edu',
    password: 'password123',
    role: 'host' as const,
    avatar: '👩‍🏫'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('unimap_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = fakeUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };
      
      setUser(userData);
      localStorage.setItem('unimap_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unimap_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
