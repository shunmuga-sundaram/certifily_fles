
import 'dotenv/config'; // must be **first**
import { DataSource } from 'typeorm';
export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
   
});


export default async function getDataSource(): Promise<DataSource> {
    if (!dataSource.isInitialized) {
        await dataSource.initialize(); // <- must initialize
        console.log('DataSource initialized!');
    }
    return dataSource;
}
