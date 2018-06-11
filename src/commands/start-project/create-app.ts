import * as vscode from 'vscode';
import { exec } from 'child_process';


export async function createApp(p: vscode.Progress<{ message: string }>, repo: string, projectName: string, docs: string|undefined) {
    p.report({ message: `Cloning ${repo}... 💎` });
    await cloneApp(repo, projectName);
    p.report({ message: `Changing directories... 🏃‍` });
    await cdIntoNewApp(projectName);
    p.report({ message: `Preparing repo... ✂️` });
    await prepareRepo(docs);
    return projectName;
}


function cloneApp(repo: string, projectName: string) {
    return new Promise((resolve, reject) => {
        try {
            exec(`git clone https://github.com/${repo} "${projectName}" --branch master --single-branch --depth 1`, (error, stdout, stderr) => {
                if (error) {
                    reject(`Couldn't check out "${repo}"`);
                } else {
                    resolve();
                }
            });
        } catch (e) {
            reject(`Couldn't check out Stencil ${repo} into "${projectName}"`);
        }
    });
}

export function cdIntoNewApp(projectName: string) {
    return new Promise((resolve) => {
        process.chdir(`${projectName}`);
        resolve();
    });
}

function prepareRepo(docs?: string) {
    return new Promise((resolve) => {
        if (docs) {
            exec(`echo "${docs}" >> .stencilTools`);
        }
        exec(`rm -rf .git`, () => {
            resolve();
        });
    });
}

export function installPackages() {
    return new Promise((resolve, reject) => {
        exec(`npm i`, (error) => {
            if (error) {
                reject(`Unable to install packages. Try running "npm install" yourself!`);
            } else {
                resolve();
            }
        });
    });
}