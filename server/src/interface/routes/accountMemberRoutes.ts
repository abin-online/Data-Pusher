import { Router } from "express";
import { authMiddleware } from "./dependencyInjection/authentication";
import { accountMemberController } from "./dependencyInjection/accountMember";
import { validateMember, validateRoleUpdate } from "../middleware/validation";

export const createAccountMemberRoutes = (): Router => {
  const router = Router();
  const authenticate = authMiddleware.authenticate;
    const isAdmin = authMiddleware.isAdmin

  // Get all members of an account
  router.get("/:accountId/members",  accountMemberController.getMembers);
    // Get all accounts a user belongs to
  router.get("/user/accounts", accountMemberController.getUserAccounts);



  // Add a member to the account
  router.post("/:accountId/members", authenticate, isAdmin, validateMember,  accountMemberController.addMember);

  // Update a member's role
  router.put("/:accountId/members/:userId/role", isAdmin, validateRoleUpdate,  accountMemberController.updateMemberRole);

  // Remove a member from the account
  router.delete("/:accountId/members/:userId", isAdmin, accountMemberController.removeMember);


  return router;
};
