import * as z from "zod";

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Please, provide a title for the task."
        }).min(1),
        description: z.string({
            required_error: "Please, provide a description for the task."
        }).min(1),
        dueDate: z.date({
            required_error: "Please, provide a valid date for the task."
        }),
        status: z.enum(["pending", "completed", "in progress"]),
        userId: z.string({
            required_error: "Please, provide a userId."
        }).uuid("Please, provide a valid UUID.")
    })
})

export const getTaskSchema = z.object({
    params: z.object({
        taskId: z.string({
            required_error: "Please, provide a userId."
        }).uuid("Please, provide a valid UUID.")
    })
})

export const updateTaskSchema = z.object({
    params: z.object({
        taskId: z.string({
            required_error: "Please, provide a userId."
        }).uuid("Please, provide a valid UUID.")
    }),
    body: z.object({
        title: z.string({
            required_error: "Please, provide a title for the task."
        }).min(1),
        description: z.string({
            required_error: "Please, provide a description for the task."
        }).min(1),
        dueDate: z.date({
            required_error: "Please, provide a valid date for the task."
        }),
        status: z.enum(["pending", "completed", "in progress"]),
        userId: z.string({
            required_error: "Please, provide a userId."
        }).uuid("Please, provide a valid UUID.")
    })
})

export const deleteTaskSchema = z.object({
    params: z.object({
        taskId: z.string({
            required_error: "Please, provide a userId."
        }).uuid("Please, provide a valid UUID.")
    })
})