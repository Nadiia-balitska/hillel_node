export default async function authFetch(url, options = {}) {
  const token = sessionStorage.getItem('jwt');
  
  const headers = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
    'Content-Type': 'application/json',
  };

  const finalOptions = {
    ...options,
    headers,
  };

  return fetch(url, finalOptions);
}
