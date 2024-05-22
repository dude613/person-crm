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
exports.searchUsers = exports.deleteAllUsers = exports.deleteManyUsers = exports.deleteUser = exports.updateUser = exports.getUserbyId = exports.addUser = exports.getAllUsers = exports.getAllSocialPlatforms = exports.deleteSocialPlatform = exports.addSocialPlatform = void 0;
const db_1 = __importDefault(require("../../db"));
const constants_1 = require("./constants");
const addSocialPlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socialPlatforms = yield db_1.default.social.create({
            data: req.body,
        });
        res.status(200).json(socialPlatforms);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.addSocialPlatform = addSocialPlatform;
const deleteSocialPlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.social.delete({ where: { id: String(id) } });
        res.status(200).json({ message: constants_1.constants.SOCIAL_PLATFORM_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteSocialPlatform = deleteSocialPlatform;
const getAllSocialPlatforms = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socialPlatforms = yield db_1.default.social.findMany();
        res.status(200).json(socialPlatforms);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getAllSocialPlatforms = getAllSocialPlatforms;
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.default.person.findMany({
            include: { social: true, incidents: { orderBy: { createdAt: "desc" } } },
        });
        console.log({ users });
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getAllUsers = getAllUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.person.create({
            data: Object.assign(Object.assign({}, req.body), { createdBy: { connect: { id: res.locals.user.id } }, lastModifiedBy: { connect: { id: res.locals.user.id } } }),
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.addUser = addUser;
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield db_1.default.person.findUnique({
            where: { id: String(id) },
            include: {
                social: true,
                createdBy: true,
                lastModifiedBy: true,
            },
        });
        console.log(user);
        if (!user) {
            res.status(404).json({ message: constants_1.constants.USER_NOT_FOUND });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.getUserbyId = getUserbyId;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { social } = _a, rest = __rest(_a, ["social"]);
    console.log({ rest });
    try {
        const user = yield db_1.default.person.update({
            where: { id: String(id) },
            data: Object.assign(Object.assign({}, rest), { lastModifiedBy: { connect: { id: res.locals.user.id } } }),
        });
        for (const record of social) {
            yield db_1.default.social.update({
                where: {
                    id: record.id,
                },
                data: {
                    account: record.account,
                    platform: record.platform,
                },
            });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.person.delete({ where: { id: String(id) } });
        res.status(200).json({ message: constants_1.constants.ALL_USERS_DELETED });
    }
    catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ message: constants_1.constants.USER_NOT_FOUND });
            return;
        }
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteUser = deleteUser;
const deleteManyUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        yield db_1.default.person.deleteMany({ where: { id: { in: ids } } });
        res.status(204).json({ message: constants_1.constants.USERS_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteManyUsers = deleteManyUsers;
const deleteAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.person.deleteMany();
        res.status(204).json({ message: constants_1.constants.ALL_USERS_DELETED });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: constants_1.constants.INTERNAL_SERVER });
    }
});
exports.deleteAllUsers = deleteAllUsers;
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const users = yield db_1.default.person.findMany({
            where: {
                OR: [
                    { username: { contains: query } },
                    { TFF_ID: { contains: query } },
                    { fname: { contains: query } },
                    { mname: { contains: query } },
                    { lname: { contains: query } },
                    { address: { contains: query } },
                    { address2: { contains: query } },
                    { city: { contains: query } },
                    { state: { contains: query } },
                    { country: { contains: query } },
                    { title: { contains: query } },
                    { notes: { contains: query } },
                ],
            },
        });
        res.json(users);
    }
    catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ error: "An error occurred while searching users" });
    }
});
exports.searchUsers = searchUsers;
//# sourceMappingURL=index.js.map