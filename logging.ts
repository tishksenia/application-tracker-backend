import morgan from 'morgan';
import fs from 'fs';
import { app } from './app';

const configureLogging = () => {
    switch (app.get('env')) {
        case 'development':
            app.use(morgan('dev'));
            break;
        case 'production':
            const stream = fs.createWriteStream(__dirname + '/access.log', {
                flags: 'a+',
            });
            app.use(morgan('combined', { stream }));
            break;
    }
};

export { configureLogging };
