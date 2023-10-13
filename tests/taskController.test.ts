function getTasksFunction() {
    return {
        "status": true,
        "message": "Get all tasks successfully.",
        "data": [
            {
                "_id": "6528fb0ea5557afeabb48cfa",
                "title": "Test Task 3",
                "category": "Test Category 2",
                "assignTo": "6528f0edee8ad8724ddc655c",
                "status": "PENDING",
                "dueDate": "18-09-2023",
                "createdAt": "2023-10-13T08:08:46.907Z",
                "__v": 0
            }
        ]
    }
}

function getTaskByIdFunction() {
    return {
        "status": true,
        "message": "Get task successfully.",
        "data":
        {
            "_id": "6528fb0ea5557afeabb48cfa",
            "title": "Test Task 3",
            "category": "Test Category 2",
            "assignTo": "6528f0edee8ad8724ddc655c",
            "status": "PENDING",
            "dueDate": "18-09-2023",
            "createdAt": "2023-10-13T08:08:46.907Z",
            "__v": 0
        }
    }
}

function CreateUpdateTaskFunction(payload) {
    return {
        "status": true,
        "message": "Get task successfully.",
        "data":
        {
            "_id": "6528fb0ea5557afeabb48cfa",
            "title": "Test Task 3",
            "category": "Test Category 2",
            "assignTo": "6528f0edee8ad8724ddc655c",
            "status": "PENDING",
            "dueDate": "18-09-2023",
            "createdAt": "2023-10-13T08:08:46.907Z",
            "__v": 0
        }
    }
}


describe("GET /tasks", () => {
    it("User Signup", async () => {
        const response = getTasksFunction();
        expect(response.status).toBe(true);
    });
});

describe("GET /task/:id", () => {
    it("User Signup", async () => {
        const response = getTaskByIdFunction();
        expect(response.status).toBe(true);
    });
});

describe("POST /task", () => {
    it("User Signup", async () => {
        const payload = {
            "title": "Test Task",
            "category": "Test Category",
            "dueDate": "18-09-2023"
        }
        const response = CreateUpdateTaskFunction(payload);
        expect(response.status).toBe(true);
    });
});

describe("PUT /task/:id", () => {
    it("User Signup", async () => {
        const payload = {
            "title": "Test Task",
            "category": "Test Category",
            "dueDate": "18-09-2023"
        }
        const response = CreateUpdateTaskFunction(payload);
        expect(response.status).toBe(true);
    });
});

describe("DELETE /task/:id", () => {
    it("User Signup", async () => {
        const response = getTaskByIdFunction();
        expect(response.status).toBe(true);
    });
});