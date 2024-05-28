"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchIncidents = exports.deleteAllIncidents = exports.deleteManyIncidents = exports.deleteIncident = exports.updateIncident = exports.getIncidentbyId = exports.createIncident = exports.getAllIncidents = void 0;
const db_1 = __importDefault(require("../../db"));
const constants_1 = require("./constants");
const getAllIncidents = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("yeaa");
    try {
        const incidents = yield db_1.default.incident.findMany({
            include: {
                createdBy: true,
                lastModifiedBy: true,
                organizations: true,
                persons: true,
                schools: true,
            },
            orderBy: { createdAt: "desc" },
        });
        console.log(incidents);
        res.status(200).json(incidents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getAllIncidents = getAllIncidents;
const createIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { personIds, schoolIds, organizationIds } = _a, rest = __rest(_a, ["personIds", "schoolIds", "organizationIds"]);
        const incident = yield db_1.default.incident.create({
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, rest), ((personIds === null || personIds === void 0 ? void 0 : personIds.length)
                ? { persons: { connect: personIds.map((id) => ({ id })) } }
                : {})), ((schoolIds === null || schoolIds === void 0 ? void 0 : schoolIds.length)
                ? { schools: { connect: schoolIds.map((id) => ({ id })) } }
                : {})), ((organizationIds === null || organizationIds === void 0 ? void 0 : organizationIds.length)
                ? {
                    organizations: {
                        connect: organizationIds.map((id) => ({ id })),
                    },
                }
                : {})), { createdBy: { connect: { id: res.locals.user.id } }, lastModifiedBy: { connect: { id: res.locals.user.id } } }),
        });
        res.status(201).json(incident);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.createIncident = createIncident;
const getIncidentbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { id } = req.params;
    try {
        const incidents = yield db_1.default.incident.findUnique({
            where: { id: String(id) },
            include: {
                createdBy: true,
                lastModifiedBy: true,
                organizations: true,
                persons: true,
                schools: true,
            },
        });
        if ((_b = incidents === null || incidents === void 0 ? void 0 : incidents.createdBy) === null || _b === void 0 ? void 0 : _b.password) {
            incidents.createdBy.password = null;
        }
        if ((_c = incidents === null || incidents === void 0 ? void 0 : incidents.lastModifiedBy) === null || _c === void 0 ? void 0 : _c.password) {
            incidents.lastModifiedBy.password = null;
        }
        if (!incidents) {
            res.status(404).json({ message: constants_1.constants.INCIDENT_NOT_FOUND });
            return;
        }
        res.status(200).json(incidents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getIncidentbyId = getIncidentbyId;
const updateIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _d = req.body, { personIds, schoolIds, organizationIds } = _d, rest = __rest(_d, ["personIds", "schoolIds", "organizationIds"]);
    try {
        const incident = yield db_1.default.incident.update({
            where: { id: String(id) },
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, rest), ((personIds === null || personIds === void 0 ? void 0 : personIds.length)
                ? { persons: { set: personIds.map((id) => ({ id })) } }
                : {})), ((schoolIds === null || schoolIds === void 0 ? void 0 : schoolIds.length)
                ? { schools: { set: schoolIds.map((id) => ({ id })) } }
                : {})), ((organizationIds === null || organizationIds === void 0 ? void 0 : organizationIds.length)
                ? {
                    organizations: {
                        set: organizationIds.map((id) => ({ id })),
                    },
                }
                : {})), { lastModifiedBy: { connect: { id: res.locals.user.id } } }),
        });
        res.status(200).json(incident);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.updateIncident = updateIncident;
const deleteIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.incident.delete({ where: { id: String(id) } });
        res.status(200).json({ message: constants_1.constants.ALL_INCIDENTS_DELETED });
    }
    catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ message: constants_1.constants.INCIDENT_NOT_FOUND });
            return;
        }
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteIncident = deleteIncident;
const deleteManyIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        yield db_1.default.incident.deleteMany({ where: { id: { in: ids } } });
        res.status(204).json({ message: constants_1.constants.ALL_INCIDENTS_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteManyIncidents = deleteManyIncidents;
const deleteAllIncidents = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.incident.deleteMany();
        res.status(204).json({ message: constants_1.constants.ALL_INCIDENTS_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteAllIncidents = deleteAllIncidents;
const searchIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const incidents = yield db_1.default.incident.findMany({
            where: {
                OR: [
                    { location: { contains: String(query) } },
                    { type: { contains: String(query) } },
                    { notes: { contains: String(query) } },
                    { time: { contains: String(query) } },
                ],
            },
            include: {
                createdBy: true,
                lastModifiedBy: true,
                organizations: true,
                persons: true,
                schools: true,
            },
        });
        res.json(incidents);
    }
    catch (error) {
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.searchIncidents = searchIncidents;
//# sourceMappingURL=index.js.map