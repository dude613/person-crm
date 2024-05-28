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
exports.searchSchools = exports.deleteAllSchools = exports.deleteManySchools = exports.deleteSchool = exports.updateSchool = exports.getSchoolbyId = exports.getAllSchools = exports.createSchool = void 0;
const db_1 = __importDefault(require("../../db"));
const constants_1 = require("./constants");
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { headIds, organizationId } = _a, rest = __rest(_a, ["headIds", "organizationId"]);
        const school = yield db_1.default.school.create({
            data: Object.assign(Object.assign(Object.assign(Object.assign({}, rest), ((headIds === null || headIds === void 0 ? void 0 : headIds.length)
                ? { heads: { connect: headIds.map((id) => ({ id })) } }
                : {})), (req.body.organizationId
                ? { organization: { connect: { id: req.body.organizationId } } }
                : {})), { createdBy: { connect: { id: res.locals.user.id } }, lastModifiedBy: { connect: { id: res.locals.user.id } } }),
        });
        res.status(201).json(school);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.createSchool = createSchool;
const getAllSchools = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schools = yield db_1.default.school.findMany({
            include: {
                heads: true,
                organization: true,
                createdBy: true,
                lastModifiedBy: true,
            },
        });
        res.status(200).json(schools);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getAllSchools = getAllSchools;
const getSchoolbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const school = yield db_1.default.school.findUnique({
            where: { id: String(id) },
            include: {
                createdBy: true,
                lastModifiedBy: true,
                heads: true,
                organization: true,
            },
        });
        if (!school) {
            res.status(404).json({ message: constants_1.constants.SCHOOL_NOT_FOUND });
            return;
        }
        res.status(200).json(school);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getSchoolbyId = getSchoolbyId;
const updateSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { headIds, organizationId } = _b, rest = __rest(_b, ["headIds", "organizationId"]);
    try {
        const user = yield db_1.default.school.update({
            where: { id: String(id) },
            data: Object.assign(Object.assign(Object.assign(Object.assign({}, rest), (headIds.length
                ? { heads: { set: headIds.map((id) => ({ id })) } }
                : {})), (req.body.organizationId
                ? { organization: { connect: { id: req.body.organizationId } } }
                : {})), { lastModifiedBy: { connect: { id: res.locals.user.id } } }),
        });
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.updateSchool = updateSchool;
const deleteSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.school.delete({ where: { id: String(id) } });
        res.status(200).json({ message: constants_1.constants.ALL_SCHOOLS_DELETED });
    }
    catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ message: constants_1.constants.SCHOOL_NOT_FOUND });
            return;
        }
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteSchool = deleteSchool;
const deleteManySchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        yield db_1.default.school.deleteMany({ where: { id: { in: ids } } });
        res.status(204).json({ message: constants_1.constants.ALL_SCHOOLS_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteManySchools = deleteManySchools;
const deleteAllSchools = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.school.deleteMany();
        res.status(204).json({ message: constants_1.constants.ALL_SCHOOLS_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteAllSchools = deleteAllSchools;
const searchSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const schools = yield db_1.default.school.findMany({
            where: {
                OR: [
                    { name: { contains: String(query) } },
                    { city: { contains: String(query) } },
                    { state: { contains: String(query) } },
                    { notes: { contains: String(query) } },
                ],
            },
        });
        res.json(schools);
    }
    catch (error) {
        console.error("Error searching schools:", error);
        res
            .status(500)
            .json({ error: "An error occurred while searching schools" });
    }
});
exports.searchSchools = searchSchools;
//# sourceMappingURL=index.js.map