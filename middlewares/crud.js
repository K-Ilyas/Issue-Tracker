// create isuue
const assert = require("chai").assert;
// const object = require('lodash');



const filterParameters = (param) => {
    if ("open" in param)
        param.open = (param.open == "true" || param.open == "1") ? true : false;
    if ("_id" in param)
        param["_id"] = ObjectId(param["_id"]);
}

const { ObjectId } = require("mongodb");
async function createIssue(issue, project, myDataBase, done) {
    let { issue_title, issue_text, created_by } = issue;
    try {
        let query = await myDataBase.insertOne({
            project: project,
            issue_title: issue_title,
            issue_text: issue_text,
            created_by: created_by,
            created_on: new Date(),
            updated_on: new Date(),
            assigned_to: issue.assigned_to || '',
            status_text: issue.status_text || '',
            open: true,
        });
        const data = await myDataBase.findOne({ _id: query.insertedId }, { projection: { project: 0 } });
        done(null, data);
    }
    catch (e) {
        done(e);
    }
}


async function listOfIssues(project, query, myDataBase, done) {
    try {
        let filter = query;
        filterParameters(filter);
        let data = await myDataBase.find({
            ...filter,
            project: project,
        }, { projection: { project: 0 } }).toArray();
        done(null, data);
    }
    catch (e) {
        done(e);
    }
}

async function updateIssue(arguments, myDataBase, done) {
    try {
        let updates = arguments;
        filterParameters(updates);
        let data = await myDataBase.findOne({
            _id: updates._id,
        }, { projection: { project: 0, created_on: 0, updated_on: 0 } });
        if (!("open" in updates))
            delete data["open"];
        if (Object.keys(data).some((e) => e in updates && e != '_id')) {
            let update = await myDataBase.findOneAndUpdate({ _id: updates["_id"] }, { $set: { ...updates, updated_on: new Date() } }, { returnDocument: 'after' });
            done(null, { result: 'successfully updated', '_id': update.value._id });
        }
        else {
            done(null, { error: 'no update field(s) sent', '_id': arguments._id });
        }
    }
    catch (e) {
        done({ error: 'could not update', '_id': arguments._id });
    }

}


async function delteIssue(_id, myDataBase, done) {
    try {
        let deleted = await myDataBase.findOneAndDelete({ _id: ObjectId(_id) });
        if (deleted.value == null)
            throw new Error("can't delete the document!!");
        else
            done(null, { result: 'successfully deleted', '_id': deleted.value._id })
    }
    catch (e) {
        done({ error: 'could not delete', '_id': _id });
    }

}


exports.createIssue = createIssue;
exports.listOfIssues = listOfIssues;
exports.updateIssue = updateIssue;
exports.delteIssue = delteIssue;