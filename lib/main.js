"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const core = __importStar(require("@actions/core"));
const State_1 = __importDefault(require("./classes/State"));
const Vercel_1 = __importDefault(require("./classes/Vercel"));
/**
 *  Initiates the Action
 */
const initAwaitForVercelDeployment = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stateObject = new State_1.default();
        const { sha, teamId, waitFor, baseUrl, projectId, accessToken } = stateObject;
        core.info(`Awaiting deployment for project with Id: ${projectId}`);
        core.info(`Ready with sha: ${sha}`);
        core.info(`Ready with teamId: ${teamId}`);
        core.info(`Ready with waitFor: ${waitFor}`);
        core.info(`Ready with baseUrl: ${baseUrl}`);
        const request = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        core.info(`Request built with token: ${accessToken}`);
        const vercelObject = new Vercel_1.default(request, {
            sha,
            teamId,
            waitFor,
            projectId,
        });
        core.info(`Vercel client ready`);
        const deployment = yield vercelObject.awaitDeployment();
        core.setOutput("deployment", deployment);
    }
    catch (error) {
        core.error(error);
        core.setFailed(error.message);
    }
});
initAwaitForVercelDeployment();
