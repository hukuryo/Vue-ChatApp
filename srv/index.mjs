import express from 'express';

export default (app, http) => {
  app.use(express.json());
  console.log(http)
  
  app.get('/foo', (req, res) => {
    res.json({msg: 'foo'});
  });
  
  app.post('/bar', (req, res) => {
    res.json(req.body);
  });
}
