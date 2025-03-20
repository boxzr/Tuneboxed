// Simple localStorage-based data management system
// This replaces Firebase with a local storage approach

// User data type
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Simple analytics tracking
export const trackPageView = (pagePath: string) => {
  // Log page view to localStorage for basic analytics
  try {
    const pageViews = JSON.parse(localStorage.getItem('tuneboxed_pageviews') || '[]');
    pageViews.push({
      path: pagePath,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent
    });
    localStorage.setItem('tuneboxed_pageviews', JSON.stringify(pageViews));
    console.log('Page view tracked:', pagePath);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  // Create a unique ID
  const userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
  
  // Create user object
  const user: User = {
    id: userId,
    email,
    name,
    createdAt: new Date().toISOString()
  };
  
  // Store in localStorage
  try {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('tuneboxed_users') || '[]');
    
    // Check if email already exists
    if (users.some((u: User) => u.email === email)) {
      throw new Error('Email already in use');
    }
    
    // Add new user
    users.push(user);
    localStorage.setItem('tuneboxed_users', JSON.stringify(users));
    
    // Store current user
    localStorage.setItem('tuneboxed_current_user', JSON.stringify(user));
    
    console.log('User registered:', user);
    return { user };
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

// Sign in with email (simplified - no real auth)
export const signInWithEmail = async (email: string, password: string) => {
  try {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('tuneboxed_users') || '[]');
    
    // Find user by email
    const user = users.find((u: User) => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, we would check the password here
    // For demo purposes, we'll just log the user in
    localStorage.setItem('tuneboxed_current_user', JSON.stringify(user));
    
    console.log('User signed in:', user);
    return { user };
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  try {
    const userString = localStorage.getItem('tuneboxed_current_user');
    if (!userString) return null;
    return JSON.parse(userString);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Sign out
export const signOut = () => {
  localStorage.removeItem('tuneboxed_current_user');
  console.log('User signed out');
};

// Get all users (admin function)
export const getAllUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('tuneboxed_users') || '[]');
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Get page view analytics (admin function)
export const getPageViews = () => {
  try {
    return JSON.parse(localStorage.getItem('tuneboxed_pageviews') || '[]');
  } catch (error) {
    console.error('Error getting page views:', error);
    return [];
  }
};

// Export simplified auth object for compatibility
export const auth = {
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    // Check local storage for current user
    const user = getCurrentUser();
    callback(user);
    return () => {}; // Return dummy unsubscribe function
  },
  currentUser: getCurrentUser()
};

// Export simple object for compatibility
export const db = {
  collection: (collectionName: string) => ({
    // No-op function for compatibility
    addDoc: async (data: any) => {
      console.log(`Would add to ${collectionName}:`, data);
      return { id: 'local-id' };
    },
    // Get documents from local storage
    getDocs: async () => {
      if (collectionName === 'users') {
        return { docs: getAllUsers().map((u: User) => ({ id: u.id, data: () => u })) };
      }
      return { docs: [] };
    }
  })
};

// Analytics mock
export const analytics = {
  logEvent: (eventName: string, params: any) => {
    console.log('Analytics event:', eventName, params);
  }
}; 