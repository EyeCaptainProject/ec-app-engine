import * as fs from 'fs';
import {join, resolve} from 'path';

export class Template {

	constructor(templateName){
		const __dirname = resolve();
		this.templatePath = join('./bin/templates', templateName);
		this.fileType = templateName.match(/\.[0-9a-z]+$/i)[0]

		try {
			this.fileContent = fs.readFileSync(this.templatePath,'utf8');
		} catch(e){
			console.error(e);
		}
	}

	fill(key, value){
		const regEx = new RegExp(key, 'g')
		this.fileContent = this.fileContent.replace(regEx, value);
		return this;
	}

	async write(folderPath, filename){
		const path = join(folderPath, filename + this.fileType)
		console.log('\x1b[32m', `\tCREATE: ${path}`, '\x1b[0m')
		await fs.writeFileSync(path, this.fileContent, 'utf-8');
	}
}
