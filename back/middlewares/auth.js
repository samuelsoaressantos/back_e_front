import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "ipabinha";
const auth = (req, res, next) => {
   const token = req.headers.authorization;

   if (!token) {
       return res.status(401).json({ message: 'Acesso Negado' });
   }

   try {
       const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
       req.userID = decoded.id; // Salva o usuário decodificado na requisição
       next(); // Passa para o próximo middleware
   } catch (err) {
       console.error(err);
       return res.status(401).json({ message: 'Token Inválido', error: err.message });
   }
};




export default auth;