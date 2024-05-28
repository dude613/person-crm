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
exports.getMe = exports.loginController = exports.registerController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fName, mName, lName, address } = req.body;
    try {
        if (!username || !password || !fName || !lName) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }
        if (!username.includes("@")) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const userExist = yield db_1.default.user.findUnique({ where: { username } });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        let pass = bcryptjs_1.default.hashSync(password, 10);
        const user = yield db_1.default.user.create({
            data: Object.assign(Object.assign(Object.assign({ username, password: pass, fname: fName }, (mName ? { mname: mName } : {})), { lname: lName }), (address ? { address } : {})),
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "7d",
        });
        return res.status(201).json({ token });
    }
    catch (error) {
        console.log(error);
        if (error.code === "P2002") {
            return res.status(400).json({ message: "Username already exists" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            res
                .status(400)
                .json({ message: "Please provide both username and password" });
            return;
        }
        const user = yield db_1.default.user.findUnique({ where: { username } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "7d",
        });
        if (user.password) {
            delete user.password;
        }
        res.status(200).json({ user, token });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.loginController = loginController;
const getMe = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete res.locals.user.password;
    res.status(200).json(res.locals.user);
});
exports.getMe = getMe;
//# sourceMappingURL=index.js.map