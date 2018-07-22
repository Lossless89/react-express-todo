const app = require('../app');
const db = require('../db/connection');

db.connection.on('error',(err)=>{
  console.error(err);
})

db.connection.once('open', function() {
  console.log('DB is connected!');
});

app.listen(3000,()=>{
  console.log('Hello! App is started!');
})