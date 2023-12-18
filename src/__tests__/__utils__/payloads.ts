import { TaskStatus } from "@/models/task.model";
import { getFutureDate } from "./get-date";

export const dummyUserId = "5cd1a1ef-e02c-43c3-9686-dde7ec953bd2";
export const dummyTaskId = "c85f37bd-67e5-429d-9c2f-46f34d404a6e";

export const userPayload = {
    id: dummyUserId,
    username: "testuser",
    email: "testuser@gmail.com",
    password: "testuserpassword"
}

export const updatedUserPayload = {
    id: dummyUserId,
    username: "updated_testuser",
    email: "updated_testuser@gmail.com",
    password: "updated_testuserpassword"
}

export const taskPayload = {
    id: dummyTaskId,
    title: "Test Task",
    description: "A Test Description",
    dueDate: getFutureDate(),
    status: TaskStatus.Pending,
    
    userId: dummyUserId,
}

export const updatedTaskPayload = {
    id: dummyTaskId,
    title: "Updated_Test Task",
    description: "Updated_A Test Description",
    dueDate: getFutureDate(),
    status: TaskStatus.Completed,
    
    userId: dummyUserId,
}