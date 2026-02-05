const BASE_URL = "http://localhost:5000/api"; // CHANGE for production

export const API = {
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
    set: `${BASE_URL}/potd/set`,
    byDate: (date: string) => `${BASE_URL}/potd/${date}`,
  },

  contest: {
    all: `${BASE_URL}/contest/all`,
    create: `${BASE_URL}/contest/create`,
    one: (id: string) => `${BASE_URL}/contest/${id}`,
    update: (id: string) => `${BASE_URL}/contest/${id}`,
    delete: (id: string) => `${BASE_URL}/contest/${id}`,
  },

  solution: {
    all: `${BASE_URL}/solution/all`,
    create: `${BASE_URL}/solution/create`,
    delete: (id: string) => `${BASE_URL}/solution/${id}`,
    update: (id: string) => `${BASE_URL}/solution/${id}`,
    one: (id: string) => `${BASE_URL}/solution/${id}`,
    forProblem: (id: string) => `${BASE_URL}/solution/problem/${id}`,
  },

  comments: {
    base: `${BASE_URL}/comments`,
    add: `${BASE_URL}/comments/add`,
    reply: `${BASE_URL}/comments/reply`,
    like: `${BASE_URL}/comments/like`,
    dislike: `${BASE_URL}/comments/dislike`,
  },

  user: {
    all: `${BASE_URL}/user/all`,
    delete: (id: string) => `${BASE_URL}/user/${id}`,
    updateRole: (id: string) => `${BASE_URL}/user/${id}/role`,
  },

  stats: {
    all: `${BASE_URL}/stats`,
  },
};
