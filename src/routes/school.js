"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schools_1 = require("../controllers/schools/index.js");
const auth_js_1 = require("../middlewares/auth.js");
const schoolRouter = express_1.default.Router();
schoolRouter.post("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), schools_1.createSchool);
schoolRouter.get("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), schools_1.getAllSchools);
schoolRouter.get("/search", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), schools_1.searchSchools);
schoolRouter.get("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), schools_1.getSchoolbyId);
schoolRouter.put("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), schools_1.updateSchool);
schoolRouter.delete("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), schools_1.deleteSchool);
schoolRouter.delete("/delete", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), schools_1.deleteManySchools);
schoolRouter.delete("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), schools_1.deleteAllSchools);
exports.default = schoolRouter;
//# sourceMappingURL=school.js.map