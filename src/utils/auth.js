const auth = {

    async register(email, password) {
        try {
          const res = await fetch("https://se-register-api.en.tripleten-services.com/v1/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
      
        return res.ok ? res.json() : Promise.reject(`${res.status}`);
      
        } catch (err) {
         throw err
       }
      },
    
      async authorize(email, password) {
        try {
          const res = await fetch("https://se-register-api.en.tripleten-services.com/v1/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
      
        return res.ok ? res.json() : Promise.reject(`${res.status}`);
      
        } catch (err) {
         throw err
       }
      },
}
 export default auth;
