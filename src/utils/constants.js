const UserRoleEnum = {
    ADMIN: "admin",
    PROJECT_MANAGER: "project_manager",
    USER: "user",
};

const AvailableUserRoles = Object.values(UserRoleEnum);

const TaskStatusEnum = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
};

const AvailableTaskStatuses = Object.values(TaskStatusEnum);

export {
    UserRoleEnum,
    AvailableUserRoles,
    TaskStatusEnum,
    AvailableTaskStatuses,
};
