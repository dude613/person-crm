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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = exports.requireAuth = exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided");
        return next();
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        const user = yield db_1.default.user.findUnique({
            where: { id: String(decoded.id) },
        });
        if (!user) {
            console.log("User not found");
            return next();
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        console.error("Error:", error);
        return next();
    }
});
exports.checkToken = checkToken;
const requireAuth = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user) {
        console.log("Unauthorized");
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    next();
});
exports.requireAuth = requireAuth;
const allowRoles = (...roles) => {
    return (_, res, next) => {
        if (!roles.includes(res.locals.user.role)) {
            console.log("Not Allowed");
            res.status(401).json({ message: "You donot have access" });
            return;
        }
        next();
    };
};
exports.allowRoles = allowRoles;
//# sourceMappingURL=auth.js.map