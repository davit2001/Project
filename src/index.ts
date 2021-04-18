import startServer from './loaders';
import {log} from 'console';

startServer().then(() => {
    log("All Success")
});