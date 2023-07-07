export default function authHeader() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User:', user);
    if (user && user.accessToken) {
      return user.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}