import { runMigrations } from './runMigrations.js';

const setupDatabase = async () => {
    console.log('Executando migrations...');
    await runMigrations();

    console.log('Banco de dados configurado com sucesso!');
};

setupDatabase();