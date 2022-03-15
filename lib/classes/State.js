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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const config_1 = __importDefault(require("../config"));
/**
 * Contains the state for the action
 */
class State {
    constructor() {
        this.sha = this.validateSha();
        this.baseUrl = config_1.default.VERCEL_BASE_ENDPOINT;
        this.teamId = core.getInput("team-id");
        this.waitFor = +core.getInput("wait-for") * 1000;
        this.projectId = core.getInput("project-id", {
            required: true
        });
        this.accessToken = core.getInput("access-token", {
            required: true
        });
    }
    validateSha() {
        var _a, _b;
        const gh = github;
        if ((_a = gh.event) === null || _a === void 0 ? void 0 : _a.head_commit) {
            return gh.event.head_commit.id;
        }
        if ((_b = gh.event) === null || _b === void 0 ? void 0 : _b.pull_reques) {
            return gh.event.pull_request.head.sha;
        }
        throw new Error("SHA cannot be retrieved");
    }
}
exports.default = State;
