export enum AuthMessages {
    UNAUTHORIZED = "Unauthorized: User ID missing",
    INVALID_TOKEN = "Invalid token provided",
    TOKEN_EXPIRED = "Session expired, please login again",
    FORBIDDEN = "Forbidden: You don’t have access to this resource",
    LOGIN_REQUIRED = "You must be logged in to access this route",
    USER_NOT_FOUND = "User not found",
    LOGIN_SUCCESS = "Login successful",
    LOGOUT_SUCCESS = "Logout successful",
    REGISTER_SUCCESS = "Registration successful",
    INVALID_CREDENTIALS = "Invalid email or password",
    ACCESS_TOKEN_REQUIRED = "Access token required",
    SESSION_EXPIRED = "Session expired. Please login again.",
    INVALID_OR_EXPIRED_TOKEN = "Invalid or expired token",
    AUTH_FAILED = "Authentication failed",
}


export enum AccountMessages {
    CREATED = "Account created successfully",
    UPDATED = "Account updated successfully",
    DELETED = "Account deleted successfully",
    NOT_FOUND = "Account not found",
    SEARCH_REQUIRED = "Search query is required",
}
