
const baseUrl = "https://se-register-api.en.tripleten-services.com/v1";

async function fetchData (endpoint, options = {}) {
  const res = await fetch(`${baseUrl}${endpoint}`, options);
  return res.ok ? res.json() : Promise.reject(res.status);
}

const auth = {
  
    async register(email, password) {
         return await fetchData("/signup", 
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email, password })
            })
      },

      async authorize(email, password) {
        return await fetchData("/signin", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
          })
      },

      async checkToken(token) {
        return await fetchData("/users/me", 
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          })

      }
}
 export default auth;
