const permissionsMap = {
    ADMIN: [
        // Users
        "view_users",
        "create_user",
        "edit_user",
        "delete_user",
        "manage_users",

        // Projects
        "view_project",
        "create_project",
        "edit_project",
        "delete_project",

        // Tasks
        "view_task",
        "create_task",
        "edit_task",
        "delete_task",
        "assign_task",

        // Teams
        "view_team",
        "create_team",
        "edit_team",
        "delete_team",

        // Reports
        "view_reports",
        "export_reports",

        // Dashboard
        "view_dashboard",

        // Settings
        "manage_settings",

        // Finance
        "view_finance",
        "manage_finance",

        // Notifications
        "send_notifications",

        // Activity logs
        "view_logs",
    ],

    MANAGER: [
        // Users
        "view_users",

        // Projects
        "view_project",
        "create_project",
        "edit_project",

        // Tasks
        "view_task",
        "create_task",
        "edit_task",
        "assign_task",

        // Teams
        "view_team",
        "create_team",
        "edit_team",

        // Reports
        "view_reports",

        // Dashboard
        "view_dashboard",

        // Notifications
        "send_notifications",
    ],

    DEVELOPER: [
        // Dashboard
        "view_dashboard",

        // Projects
        "view_project",

        // Tasks
        "view_task",

        // Teams
        "view_team",

        // Reports
        "view_reports",
    ],
};
module.exports = permissionsMap;