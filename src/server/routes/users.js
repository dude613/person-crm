"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const persons_1 = require("../controllers/persons/index.js");
const auth_js_1 = require("../middlewares/auth.js");
const personRouter = express_1.default.Router();
personRouter.get("/", auth_js_1.checkToken, persons_1.getAllUsers);
personRouter.delete("/social/:id", auth_js_1.checkToken, persons_1.deleteSocialPlatform);
personRouter.post("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), persons_1.addUser);
personRouter.get("/social", auth_js_1.checkToken, persons_1.getAllSocialPlatforms);
personRouter.post("/social", auth_js_1.checkToken, persons_1.addSocialPlatform);
personRouter.get("/search", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), persons_1.searchUsers);
personRouter.get("/:id", auth_js_1.checkToken, persons_1.getUserbyId);
personRouter.put("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), persons_1.updateUser);
personRouter.delete("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), persons_1.deleteUser);
personRouter.delete("/delete", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), persons_1.deleteManyUsers);
personRouter.delete("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), persons_1.deleteAllUsers);
exports.default = personRouter;
//# sourceMappingURL=users.js.map