# Project: Task Management System

## 1. Database Tables:
**Users:**
    
    Attributes:
        user_id (Primary Key)
        username
        password_hash
        email
        created_at
        updated_at
        
**Tasks:**
    
    Attributes:
        task_id (Primary Key)
        title
        description
        due_date
        status (e.g., "pending," "completed," "in progress")
        user_id (Foreign Key referencing Users table)
        created_at
        updated_at
    
## 2. Relations:

**Users <-> Tasks:**

One-to-Many relationship between Users and Tasks (A user can have multiple tasks, but each task belongs to one user).
    
## 3. RESTful API Endpoints:

**User Endpoints:**
    
POST /api/users: Create a new user.
GET /api/users/:id: Retrieve user details.
PUT /api/users/:id: Update user details.
DELETE /api/users/:id: Delete a user.
    
**Task Endpoints:**
    
POST /api/tasks: Create a new task.
GET /api/tasks/:id: Retrieve task details.
PUT /api/tasks/:id: Update task details.
DELETE /api/tasks/:id: Delete a task.
GET /api/tasks/user/:id: Retrieve all tasks for a specific user.
    
## 4. Back Office:

The back office should include functionalities for admin users to manage users and tasks. This could include CRUD operations for both users and tasks, as well as a dashboard to view task statistics, user activity, etc.

## 5. Front Office:

The front office is the user interface for regular users to interact with their tasks. It should include features such as:

User authentication and registration.
View, add, update, and delete tasks.
Mark tasks as completed or in progress.
Filter tasks based on status or due date.

## 6. Additional Features (Optional):
    
Task categories or tags.
Priority levels for tasks.
Task comments or attachments.
Notifications for upcoming due dates.