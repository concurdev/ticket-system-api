"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireIntEnv = exports.requireEnv = void 0;
function requireEnv(name, defaultVal) {
    const envValue = process.env[name];
    if (!envValue) {
        if (defaultVal !== undefined)
            return defaultVal;
        throw new Error(`CONFIG.REQUIRED_VAR_NOT_SET: ${name}`);
    }
    return envValue;
}
exports.requireEnv = requireEnv;
function requireIntEnv(name, defaultVal) {
    const defaultStr = defaultVal !== undefined ? defaultVal.toString() : undefined;
    const valueStr = requireEnv(name, defaultStr);
    const value = Number(valueStr);
    if (!Number.isInteger(value)) {
        throw new Error(`CONFIG.VALUE_NOT_AN_INT: ${name}: ${valueStr}`);
    }
    return value;
}
exports.requireIntEnv = requireIntEnv;
//# sourceMappingURL=env.js.map