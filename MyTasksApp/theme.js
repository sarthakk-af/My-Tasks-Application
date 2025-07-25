// theme.js

export const theme = {
  colors: {
    primary: "#4A90E2",      
    secondary: "#34C759",   
    accent: "#F59E0B",       
    error: "#EF4444",        

    background: "#F8FAFC",   
    surface: "#FFFFFF",      

    textPrimary: "#1F2937",  
    textSecondary: "#6B7280" 
  },

  typography: {
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: "#1F2937", 
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "500",
      color: "#6B7280",
    },
    body: {
      fontSize: 14,
      fontWeight: "400",
      color: "#1F2937",
    },
  },

  spacing: {
    xs: 4,   
    sm: 8,   
    md: 16,  
    lg: 24,  
    xl: 32,  
  },

  borderRadius: {
    small: 8,
    medium: 12,
    large: 20,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};
