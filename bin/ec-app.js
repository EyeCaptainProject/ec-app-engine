import * as readline from 'readline';
import {Template} from './Template.js'
import * as fs from 'fs';
import {join,resolve} from 'path';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const __dirname = resolve();
const flags = ['o']
let appRoot = undefined;


console.log('\x1b[36m', `
 _____           _____             _        _
|  ___|         /  __ \\           | |      (_)      
| |__ _   _  ___| /  \\/ __ _ _ __ | |_ __ _ _ _ __  
|  __| | | |/ _ \\ |    / _\` | '_ \\| __/ _\` | | '_ \\ 
| |__| |_| |  __/ \\__/\\ (_| | |_) | || (_| | | | | |
\\____/\\__, |\\___|\\____/\\__,_| .__/ \\__\\__,_|_|_| |_|
       __/ |                | |`)

const lastLine = 'AppEngine';
const version = packageJson.version;
const spaceLength = 17;
const lastLineLength = lastLine.length;
const startPoint = (spaceLength - lastLineLength) /2;
const extra = startPoint % 1 > 0


console.log(`      |___/${ ' '.repeat(startPoint) + lastLine + ' '.repeat(startPoint) + (extra ? ' ' : '') }|_|  v. ${version} \n\n`, '\x1b[0m')


function askQuestion(query) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	query = '\x1b[36m' + query + '\x1b[0m'
	return new Promise(resolve => rl.question(query, ans => {
		rl.close();
		resolve(ans);
	}))
}

function acceptCommand(argument, ...acceptableArguments){
	return acceptableArguments.includes(argument);
}

const args = process.argv.slice(2);

if (acceptCommand(args[0], 'create', 'c')) {


	// Create an app
	if (acceptCommand(args[1], 'app', 'a')) {
		let appName = undefined;
		if (args.length > 2)
			appName = args[2];
		createApp(appName)
	}

	// Create an screen
	if (acceptCommand(args[1], 'screen', 's')) {
		let appName = undefined;
		if (args.length > 2)
			appName = args[2];
		createApp(appName)
	}


}

async function createApp(appName){

	if (!appName){
		appName = await askQuestion('Please Enter the name of your App: ')
	}

	const appClassName = await askQuestion('Please Enter the name of your Main Class: ')

	appRoot = join(__dirname, appName)
	const srcRoot = join(appRoot, '/src')
	const assetsRoot = join(appRoot, '/assets')
	const layoutsRoot = join(appRoot, '/layouts')
	const screensRoot = join(srcRoot, '/screens')

	createDirectory(appRoot);
	createDirectory(srcRoot);
	createDirectory(assetsRoot);
	createDirectory(layoutsRoot);
	createDirectory(screensRoot);

	const appClassTemplate = new Template('/src/AppClassTemplate.ts')
		.fill('%CLASS_NAME%', appClassName)
		.write(srcRoot, appClassName)

	const appConfigTemplate = new Template('AppConfigTemplate.json')
		.fill('%CLASS_NAME%', appClassName)
		.fill('%APP_NAME%', appName)
		.fill('%APP_ICON%', 'appIcon.png')
		.write(appRoot, "AppConfig")

	const iconTemplatePath = join(__dirname, '/bin/templates/assets/', 'appIconTemplate.png')
	const destPath = join(assetsRoot + '/appIcon.png')
	fs.copyFileSync(iconTemplatePath, destPath)
	console.log('\x1b[32m', `\tCREATE: ${destPath}`, '\x1b[0m')


	const appMainScreenName = await askQuestion('Please Enter the name of your Main Screen Class: ')

	console.log('\x1b[32m')
	console.log('#'.repeat(process.stdout.columns));
	console.log(`Now cd into the folder using 'cd "${appRoot}"'`)
	console.log(`There you can run cli commands for that app.`)
	console.log(`To get a list of all commands run 'ec-app help'`)
	console.log('#'.repeat(process.stdout.columns), '\x1b[0m');

}

function deleteFolderRecursive(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file, index) => {
			const curPath = join(path, file);
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
				console.log('\x1b[31m', '\tRM: ' + curPath, '\x1b[0m')
			}
		});
		fs.rmdirSync(path);
		console.log('\x1b[31m', '\tRM: ' + path, '\x1b[0m')
	}
};

function createDirectory(dirPath){
	if (!fs.existsSync(dirPath)){
		fs.mkdirSync(dirPath);
		console.log('\x1b[32m', `\tMKDIR: ${dirPath}`, '\x1b[0m')
	} else {
		if (flags.includes('o')) {
			console.log('Overwriting folder at: ' + dirPath)
			deleteFolderRecursive(dirPath)
			createDirectory(dirPath)
		}
		else {
			throw Error('Folder already exists and overwrite flag was not specified');
		}
	}
}

