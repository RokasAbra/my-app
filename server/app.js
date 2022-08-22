const express = require('express')
const app = express()
const port = 3003

const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bandomasis",
});


const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) { // admin
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length || results[0].role !== 'admin') {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login') || 0 === req.url.indexOf('/')) {
      next();
  } else { 
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  }
}
app.use(doAuth)

// AUTH
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
      requests = [req.headers['authorization'] || '', req.query.role];
  } else {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
      requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok' });
      }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
});


app.post("/register", (req, res) => {
  const key = uuid.v4();
  const sql = `
  INSERT INTO users
  (name, email, pass, session)
  VALUES (?, ?, ?, ?)
`;
  con.query(sql, [req.body.user, req.body.email, md5(req.body.pass), key], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});
//Create Story

app.post("/story", (req, res) => {
    const sql = `
    INSERT INTO stories
    (title, text, sum_need, picture, sum_left)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.title, req.body.text, req.body.sum, req.body.picture, req.body.sum_remained], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new and shiny product was created', type: 'success' } });
    });
});

// Read  Story
app.get("/story", (req, res) => {
    const sql = `
    SELECT stories.id, stories.title, stories.text, stories.picture, stories.sum_need AS sum, approved, stories.sum_donated AS sumDonated, stories.sum_left AS sumRemained
    FROM stories
    ORDER BY sumRemained desc
    
`
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result); 
    });
});

// Read Back Story
app.get("/admin/story", (req, res) => {
    const sql = `
    SELECT stories.id, stories.title, stories.text, stories.picture, stories.sum_need AS sum, approved
    FROM stories
    ORDER BY title
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//Delete Story

app.delete("/admin/story/:id", (req, res) => {
    const sql = `
    DELETE FROM stories
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
    });
  });  
 
  //Edit Story
app.put("/admin/story/:id", (req, res) => {
    const sql = `
    UPDATE stories
    SET approved = ? 
    WHERE id = ?
    `;
    con.query(sql, [req.body.approved, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
    });
  });

//READ DONORS
app.get("/donors", (req, res) => {
    const sql = `
  SELECT donator.id, donator.name, donator.surname, donator.sum_donated AS donation, donator.story_id
  FROM donator 
  LEFT JOIN stories
  ON stories.id = donator.story_id 
  ORDER BY name
  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  //CREATE DONOR
  app.post("/donors", (req, res) => {
    const sql = `
    INSERT INTO donator
    (name, surname, sum_donated, story_id)
    VALUES (?, ?, ?, ?)
    `;
    con.query(
      sql,
      [
        req.body.name,
        req.body.surname,
        req.body.donation,
        req.body.story
        
      ],
      (err, result) => {
        if (err) throw err;
        res.send({
          result,
          msg: { text: "OK, new and shiny product was created", type: "success" },
        });
      }
    );
  });
  //EDIT STORIES
  app.put("/story/:id", (req, res) => {
    const sql = `
          UPDATE stories
          SET sum_donated = sum_donated + ?, sum_left = sum_left -?
          WHERE id = ?
      `;
    con.query(sql, [req.body.donation, req.body.donation, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "Tu prabalsavai", type: "danger" } });
    });
  });



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Portas ${port} klauso!`)
})
