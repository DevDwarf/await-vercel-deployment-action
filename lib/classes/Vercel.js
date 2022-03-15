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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
/**
 * Vercel API connector
 */
class Vercel {
    constructor(request, { sha, teamId, waitFor, projectId, }) {
        this.sha = sha;
        this.teamId = teamId;
        this.request = request;
        this.waitFor = waitFor;
        this.projectId = projectId;
    }
    wait(time) {
        return new Promise(resolve => setTimeout(resolve, time * 1000));
    }
    awaitDeployment() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const cutOffTime = new Date().getTime() + this.waitFor;
            while (new Date().getTime() < cutOffTime) {
                const response = this.request.get('/v6/deployments', {
                    params: Object.assign({ projectId: this.projectId, "meta-githubCommitSha": this.sha }, (this.teamId && { teamId: this.teamId }))
                });
                const data = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.deployments) || [];
                const hasNoData = data.length < 1;
                const isStillBuilding = data[0].buildingAt === data[0].ready;
                if (hasNoData || isStillBuilding) {
                    console.log("Deployment not yet ready, will retry in 2 seconds");
                    yield this.wait(2);
                    continue;
                }
                core.info(`Deployment found`);
                return data[0];
            }
            throw new Error(`Timeout limit was reached before a deployment was found`);
        });
    }
}
exports.default = Vercel;
