// API helper functions
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('admin_token')
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  }

  const response = await fetch(endpoint, config)
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'API call failed')
  }
  
  return data
}

// Auth helpers
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('admin_user')
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('admin_token')
}

export const logout = () => {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  window.location.href = '/admin/login'
}