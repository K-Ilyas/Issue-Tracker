module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["project", "issue_title", "issue_text", "created_by", "created_on", "updated_on"],
            properties: {
                project: {
                    bsonType: "string",
                    description: "The project name - Required."
                },
                issue_title: {
                    bsonType: "string",
                    description: "The issue title- Required."
                },
                issue_text: {
                    bsonType: "string",
                    description: "The issue text- Required."
                }
                , created_by: {
                    bsonType: "string",
                    description: "The author of the issue- Required."
                },
                created_on: {
                    bsonType: "date",
                    description: "The date of creation- Required."
                },
                updated_on: {
                    bsonType: "date",
                    description: "The date of update- Required."
                },
                assigned_to: {
                    bsonType: "string",
                    description: "The assigned_to - optional."
                },
                status_text: {
                    bsonType: "string",
                    description: "The status text - optional."
                },
                open: {
                    bsonType: "bool",
                    description: "The open - optional."
                }
            }
        }
    }
};



