const corsMiddleware = (req, res, next) => {
    console.log('CORS middleware executed');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 
      'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version,Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  };
  module.exports = corsMiddleware;
  