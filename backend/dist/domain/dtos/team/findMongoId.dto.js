"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMongoIdDto = void 0;
const utils_1 = require("../../../utils");
class FindMongoIdDto {
    constructor(id) {
        this.id = id;
    }
    static create(object) {
        const { id, password } = object;
        if (!id)
            return ['Missing id'];
        if (!utils_1.regularExps.mongoId.test(id))
            return ['id is not valid'];
        return [undefined, new FindMongoIdDto(id)];
    }
}
exports.FindMongoIdDto = FindMongoIdDto;
