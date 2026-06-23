import { Router } from "express";
import { getAllNotifications, getPriorityInbox, getByType, } from "../controllers/notification.js";
const router = Router();
router.get("/notifications", getAllNotifications);
router.get("/notifications/priority", getPriorityInbox);
router.get("/notifications/type/:type", getByType);
export default router;
//# sourceMappingURL=router.js.map