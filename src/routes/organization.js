"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organizations_1 = require("../controllers/organizations/index.js");
const auth_js_1 = require("../middlewares/auth.js");
const orgRouter = express_1.default.Router();
orgRouter.post("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), organizations_1.createOrganization);
orgRouter.get("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), organizations_1.getAllOrganizations);
orgRouter.get("/search", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), organizations_1.searchOrganizations);
orgRouter.get("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), organizations_1.getOrganizationbyId);
orgRouter.put("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), organizations_1.updateOrganization);
orgRouter.delete("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), organizations_1.deleteOrganization);
orgRouter.delete("/delete", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), organizations_1.deleteManyOrganizations);
orgRouter.delete("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), organizations_1.deleteAllOrganizations);
exports.default = orgRouter;
//# sourceMappingURL=organization.js.map