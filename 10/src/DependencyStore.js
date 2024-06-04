const { PrismaClient } = require('@prisma/client');
const redis = require('redis');
const jwt = require('jsonwebtoken');

class Dependency {
    /** @type { PrismaClient } */
    prisma;
    // /** @type { redis.RedisClientType } */
    // redis;
    /** @type { jwt } */
    jwt;
    /** @type { string } */
    accessTokenKey;
    /** @type { string } */
    refreshTokenKey;
}

module.exports = {
    Create: function (prisma, jwt, accessTokenKey, refreshTokenKey) {
        return { prisma, jwt, accessTokenKey, refreshTokenKey };
    },
    Dependency: Dependency.prototype
}