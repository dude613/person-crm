"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth/index.js");
const auth_js_1 = require("../middlewares/auth.js");
const authRouter = express_1.default.Router();
authRouter.post("/register", auth_1.registerController);
authRouter.post("/login", auth_1.loginController);
authRouter.get("/me", auth_js_1.checkToken, auth_js_1.requireAuth, auth_1.getMe);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map