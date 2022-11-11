const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    // POST handler Test
    test("Create an issue with every field: POST", function (done) {
        chai
            .request(server)
            .post("/api/issues/apitest")
            .send({
                "issue_title": "Fix error in posting data",
                "issue_text": "When we post data it has an error.",
                "created_by": "Joe",
                "assigned_to": "Joe",
                "status_text": "In QA"
            })
            .end(function (err, res) {
                assert.equal(res.status, 201, "Response status should be 200");
                assert.property(res.body, "_id", "the response must include an _id");
                assert.strictEqual(res.body.issue_title, "Fix error in posting data", "issue_title must be Fix error in posting data");
                assert.strictEqual(res.body.issue_text, "When we post data it has an error.", "issue_text must be When we post data it has an error.");
                assert.strictEqual(res.body.created_by, "Joe", "created_by must be Joe");
                assert.strictEqual(res.body.assigned_to, "Joe", "assigned_to must be Joe");
                assert.strictEqual(res.body.status_text, "In QA", "status_text must In QA");
                assert.strictEqual(res.body.created_on, res.body.updated_on, "created_on and updated_on must be equal");
                done();
            })
    });
    test("Create an issue with only required fields: POST", function (done) {
        chai
            .request(server)
            .post("/api/issues/apitest")
            .send({
                "issue_title": "Fix error in posting data",
                "issue_text": "When we post data it has an error.",
                "created_by": "Joe"
            })
            .end(function (err, res) {
                assert.equal(res.status, 201, "Response status should be 200");
                assert.property(res.body, "_id", "the response must include an _id");
                assert.strictEqual(res.body.issue_title, "Fix error in posting data", "issue_title must be Fix error in posting data");
                assert.strictEqual(res.body.issue_text, "When we post data it has an error.", "issue_text must be When we post data it has an error.");
                assert.strictEqual(res.body.created_by, "Joe", "created_by must be Joe");
                assert.strictEqual(res.body.assigned_to, "", "assigned_to must be empty");
                assert.strictEqual(res.body.status_text, "", "status_text must In empty");
                assert.strictEqual(res.body.created_on, res.body.updated_on, "created_on and updated_on must be equal");
                done();
            })
    });
    test("Create an issue with missing required fields: POST", function (done) {
        chai
            .request(server)
            .post("/api/issues/apitest")
            .send({})
            .end(function (err, res) {
                assert.equal(res.status, 200, "Response status should be 200");
                assert.strictEqual(res.body.error, "required field(s) missing", "can't create an issue without required fields");
                done();
            })
    });


});
