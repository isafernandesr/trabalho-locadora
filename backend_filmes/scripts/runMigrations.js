import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const migrationsDir = path.join(process.cwd(), 'database\\migrations');

const runSQLFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const command = `mysql -u ${process.env.USER_DB || "root"} -p${process.env.PASSWORD_DB || ""} ${process.env.NAME_DB || "backend_filmes"} < ${filePath}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar o arquivo ${filePath}: ${stderr}`);
                reject(error);
            } else {
                console.log(`Arquivo ${filePath} executado com sucesso: ${stdout}`);
                resolve();
            }
        });
    });
};

export const runMigrations = async () => {
    try {
        const files = fs.readdirSync(migrationsDir);
        const sqlFiles = files.filter(file => path.extname(file) === '.sql');

        sqlFiles.sort();

        for (const file of sqlFiles) {
            const filePath = path.join(migrationsDir, file);
            await runSQLFile(filePath);
        }

        console.log('Todas as migrations foram executadas com sucesso.');
    } catch (error) {
        console.error('Erro ao executar as migrations:', error);
    }
};

runMigrations();