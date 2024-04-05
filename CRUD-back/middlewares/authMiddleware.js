const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  let token = req.headers.cookie;
  
  if (token && token.includes('Bearer=')) {
      token = token.split('Bearer=')[1];
    }

  if (!token)
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });

  jwt.verify(token, '976455d8ca83c51969f1579b3f7427b8c5c493d1d2941c021199566bb9f7862a', (err, decoded) => {
    if (err)
      return res.status(401).json({ message: 'Token inválido' });

    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;