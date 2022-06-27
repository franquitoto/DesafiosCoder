import { setMaxListeners } from 'connect-mongo';
import log4js, { Logger } from 'log4js';


    log4js.configure({
        appenders: {
            fileAppender: { type: 'file', filename: './logs/logs.log' },
            warnAppender: { type: 'file', filename: './logs/warn.log' },
            errorAppender: { type: 'file', filename: './logs/error.log' },
            consola: { type: 'console' },
        },
        categories: {
            default: {appenders: ['fileAppender', 'consola'], level: 'trace'},
            warn: {appenders: ['warnAppender'], level: 'warn', maxLevel: 'warn'},
            error: {appenders: ['errorAppender'], level: 'error'}
        },
    });
    export const logger = log4js.getLogger()
   