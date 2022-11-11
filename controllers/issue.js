const empty = require('is-empty');

exports.postController = function (req, res, next) {
    let { issue_title, issue_text, created_by } = req.body;
    if ((issue_title && !empty(issue_title)) && (issue_text && !empty(issue_text)) && (created_by && !empty(created_by)))
        next();
    else
        return res.status(200).json({ error: 'required field(s) missing' });
}

exports.idController = function (req, res, next) {
    let { _id } = req.body;
    if ((_id && !empty(_id)))
        next();
    else
        return res.status(200).json({ error: 'missing _id' });
}