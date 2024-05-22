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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./db/index.js"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const indicents_js_1 = __importDefault(require("./routes/indicents.js"));
const organization_js_1 = __importDefault(require("./routes/organization.js"));
const school_js_1 = __importDefault(require("./routes/school.js"));
const users_js_1 = __importDefault(require("./routes/users.js"));
if (process.env.NODE_ENV !== "production") {
    (0, dotenv_1.config)();
}
const app = (0, express_1.default)();
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? JSON.parse(process.env.ALLOWED_ORIGINS)
    : ["*"];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.get("/", (_, res) => {
    res.send("Hello, Express with TypeScript!");
});
const api = express_1.default.Router();
app.use("/api", api);
api.get("/all-counts", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personCount = yield index_js_1.default.person.count();
        const schoolCount = yield index_js_1.default.school.count();
        const organizationCount = yield index_js_1.default.organization.count();
        const incidentCount = yield index_js_1.default.incident.count();
        res
            .status(200)
            .json({ personCount, schoolCount, incidentCount, organizationCount });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
api.use("/auth", auth_js_1.default);
api.use("/person", users_js_1.default);
api.use("/school", school_js_1.default);
api.use("/incident", indicents_js_1.default);
api.use("/organization", organization_js_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});
//# sourceMappingURL=index.js.map