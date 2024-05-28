"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const incidents_1 = require("../controllers/incidents/index.js");
const auth_js_1 = require("../middlewares/auth.js");
const incidentRouter = express_1.default.Router();
incidentRouter.post("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), incidents_1.createIncident);
incidentRouter.get("/", auth_js_1.checkToken, incidents_1.getAllIncidents);
incidentRouter.get("/search", auth_js_1.checkToken, incidents_1.searchIncidents);
incidentRouter.get("/:id", auth_js_1.checkToken, incidents_1.getIncidentbyId);
incidentRouter.put("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), incidents_1.updateIncident);
incidentRouter.delete("/:id", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), incidents_1.deleteIncident);
incidentRouter.delete("/delete", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), incidents_1.deleteManyIncidents);
incidentRouter.delete("/", auth_js_1.checkToken, auth_js_1.requireAuth, (0, auth_js_1.allowRoles)("ADMIN"), incidents_1.deleteAllIncidents);
exports.default = incidentRouter;
//# sourceMappingURL=indicents.js.map