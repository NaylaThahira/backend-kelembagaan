const express = require("express");
const router = express.Router();
const {
    getNotifikasiByUser,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotifikasi,
} = require("../controllers/notifikasiController");


router.get("/user/:userId", getNotifikasiByUser);
router.get("/user/:userId/unread-count", getUnreadCount);
router.put("/:id/read", markAsRead);
router.put("/user/:userId/read-all", markAllAsRead);
router.delete("/:id", deleteNotifikasi);

module.exports = router;
