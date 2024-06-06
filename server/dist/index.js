"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // express 객체 받아옴
app.get("/", (req, res, next) => {
    res.send("헬로우 차징!");
}); // HTTP GET method 정의
app.listen("8000", () => {
    console.log(`
    #############################################
        🛡️ Server listening on port: 8000 🛡️
    #############################################    
    `);
}); // 8000번 포트에서 서버 실행
