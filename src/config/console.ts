import chalk from "chalk";

class Console {
    moduleName: string;

    constructor(moduleName: string) {
        this.moduleName = moduleName;
    }

    async success(message: string) {
        console.log(`${chalk.bgGreen('[' + this.moduleName + ']')} ${chalk.gray(new Date().toUTCString())} ${message}`);
    }

    async warning(message: string) {
        console.log(`${chalk.bgYellow('[' + this.moduleName + ']')} ${chalk.gray(new Date().toUTCString())} ${message}`);
    }

    async error(message: string) {
        console.log(`${chalk.bgRed('[' + this.moduleName + ']')} ${chalk.gray(new Date().toUTCString())} ${message}`);
    }
}

export { Console };
