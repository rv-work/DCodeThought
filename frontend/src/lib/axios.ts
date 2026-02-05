const BASE_URL = "http://localhost:5000/api"; // CHANGE for production

const API = {
  auth: {
    signup: `${BASE_URL}/auth/signup`,
    login: `${BASE_URL}/auth/login`,
    google: `${BASE_URL}/auth/google`,
    me: `${BASE_URL}/auth/me`,
  },

  problems: {
    all: `${BASE_URL}/problems`,
    one: (slug: string) => `${BASE_URL}/problems/${slug}`,
  },

  potd: {
    today: `${BASE_URL}/potd/today`,
    old: `${BASE_URL}/potd/old`,
  },

  contests: {
    all: `${BASE_URL}/contest`,
    one: (id: string | number) => `${BASE_URL}/contest/${id}`,
  },

  solution: {
    forProblem: (id: string) => `${BASE_URL}/solution/${id}`,
  },

  comments: {
    base: `${BASE_URL}/comments`,
    add: `${BASE_URL}/comments/add`,
    reply: `${BASE_URL}/comments/reply`,
    like: `${BASE_URL}/comments/like`,
    dislike: `${BASE_URL}/comments/dislike`,
  },
};

export default API;
