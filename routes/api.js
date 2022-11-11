'use strict';

const { postController, idController } = require("../controllers/issue");
const { createIssue, listOfIssues, updateIssue, delteIssue } = require("../middlewares/crud");


module.exports = function (app, myDataBase) {

  app.route('/api/issues/:project')
    .get(function (req, res) {
      listOfIssues(req.params.project, req.query, myDataBase, (err, issues) => {
        if (err)
          res.status(200).json({ error: err });
        if (issues)
          res.status(200).json(issues);
      })
    })

    .post(postController, function (req, res) {
      createIssue(req.body, req.params.project, myDataBase, (err, issue) => {
        if (err)
          res.status(200).json({ error: err });
        if (issue)
          res.status(201).json(issue);
      })
    })

    .put(idController, function (req, res) {
      updateIssue(req.body, myDataBase, (err, updated) => {
        if (err)
          res.status(200).json(err);
        if (updated)
          res.status(200).json(updated);
      })
    })

    .delete(idController, function (req, res) {
      delteIssue(req.body._id, myDataBase, (err, deleted) => {
        if (err)
          res.status(200).json(err);
        if (deleted)
          res.status(200).json(deleted);
      })
    });

  //404 Not Found Middleware
  app.use(function (req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
  });
};
