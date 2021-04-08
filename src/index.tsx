import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';


createServer({

  models:{
    transaction: Model
  },
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'freelancer',
          type: "deposit",
          category: 'dev',
          amount: 400,
          createdAt: new Date('2020-03-12')
        },
        {
          id: 2,
          title: 'Desenvolvedor',
          type: "withdraw",
          category: 'Tech Lead',
          amount: 1500,
          createdAt: new Date('2020-03-11')
        }
      ]
    })
    
  },
  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
        return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {

      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);

    });
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
