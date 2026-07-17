fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin'
  })
}).then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
