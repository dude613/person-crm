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
exports.searchOrganizations = exports.deleteAllOrganizations = exports.deleteManyOrganizations = exports.deleteOrganization = exports.updateOrganization = exports.getOrganizationbyId = exports.createOrganization = exports.getAllOrganizations = void 0;
const db_1 = __importDefault(require("../../db"));
const constants_1 = require("./constants");
const getAllOrganizations = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizations = yield db_1.default.organization.findMany({
            include: {
                createdBy: true,
                lastModifiedBy: true,
                heads: true,
                schools: true,
            },
        });
        res.status(200).json(organizations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getAllOrganizations = getAllOrganizations;
const createOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { headIds } = _a, rest = __rest(_a, ["headIds"]);
        const organization = yield db_1.default.organization.create({
            data: Object.assign(Object.assign(Object.assign({}, rest), ((headIds === null || headIds === void 0 ? void 0 : headIds.length)
                ? { heads: { connect: headIds.map((id) => ({ id })) } }
                : {})), { createdBy: { connect: { id: res.locals.user.id } }, lastModifiedBy: { connect: { id: res.locals.user.id } } }),
        });
        res.status(201).json(organization);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.createOrganization = createOrganization;
const getOrganizationbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { id } = req.params;
    try {
        const organization = yield db_1.default.organization.findUnique({
            where: { id: String(id) },
            include: {
                createdBy: true,
                lastModifiedBy: true,
                heads: true,
                schools: true,
            },
        });
        if ((_b = organization === null || organization === void 0 ? void 0 : organization.createdBy) === null || _b === void 0 ? void 0 : _b.password) {
            organization.createdBy.password = null;
        }
        if ((_c = organization === null || organization === void 0 ? void 0 : organization.lastModifiedBy) === null || _c === void 0 ? void 0 : _c.password) {
            organization.lastModifiedBy.password = null;
        }
        if (!organization) {
            res.status(404).json({ message: constants_1.constants.ORGANIZATION_NOT_FOUND });
            return;
        }
        res.status(200).json(organization);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getOrganizationbyId = getOrganizationbyId;
const updateOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _d = req.body, { headIds } = _d, rest = __rest(_d, ["headIds"]);
    try {
        const organization = yield db_1.default.organization.update({
            where: { id: String(id) },
            data: Object.assign(Object.assign(Object.assign({}, rest), ((headIds === null || headIds === void 0 ? void 0 : headIds.length)
                ? { heads: { set: headIds.map((id) => ({ id })) } }
                : {})), { lastModifiedBy: { connect: { id: res.locals.user.id } } }),
        });
        res.status(200).json(organization);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.updateOrganization = updateOrganization;
const deleteOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.organization.delete({ where: { id: String(id) } });
        res.status(200).json({ message: constants_1.constants.ALL_ORGANIZATIONS_DELETED });
    }
    catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ message: constants_1.constants.ORGANIZATION_NOT_FOUND });
            return;
        }
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteOrganization = deleteOrganization;
const deleteManyOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        yield db_1.default.organization.deleteMany({ where: { id: { in: ids } } });
        res.status(204).json({ message: constants_1.constants.ALL_ORGANIZATIONS_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteManyOrganizations = deleteManyOrganizations;
const deleteAllOrganizations = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.organization.deleteMany();
        res.status(204).json({ message: constants_1.constants.ALL_ORGANIZATIONS_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteAllOrganizations = deleteAllOrganizations;
const searchOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const organizations = yield db_1.default.organization.findMany({
            where: {
                OR: [
                    { name: { contains: String(query) } },
                    { city: { contains: String(query) } },
                    { notes: { contains: String(query) } },
                ],
            },
        });
        res.json(organizations);
    }
    catch (error) {
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.searchOrganizations = searchOrganizations;
//# sourceMappingURL=index.js.map