import path from 'path'
import fs from 'node:fs/promises'
import { __dirname } from '../path.js';
import { MINIMAZE } from '../path.js';
import { mkdir } from 'node:fs';

// const path = require('path')
// const fs = require('fs').promises

export const getLink = (...url) => path.join(__dirname, ...url);


export const getFile = async (...url) => {
  try {
    const link = getLink(...url)
    const length = url.length - 1;
    const filename = url[length]
    const  data = await fs.readFile(link, 'utf8');
    if (filename.includes('.json')) return { data: JSON.parse(data), ok : true }
    return { ok: true, data }
  } catch (error) {
    return { ok: false, e: error };
  }
}


export const setFileJSON = async (data, ...url) => {
  try {
    const link = getLink(...url);

    await fs.writeFile(link, JSON.stringify(data, null, MINIMAZE), 'utf8')
    return { ok: true, data }
  } catch (error) {
    return { ok: false, e: error };
  }
}

export const setFileDirJSON = async (data, ...url) => {
  try {
    const link = getLink(...url);
    const link2 = getLink(...url, 'user.json');
    console.log(link2,data)
    await fs.mkdir(link, {recursive : true})
   

    await fs.writeFile(link2, JSON.stringify(data, null, MINIMAZE), 'utf8')
    return { ok: true, data }
  } catch (error) {
    return { ok: false, e: error };
  }
}


//getData('data', 'data.json')
// const getLink = (url) => path.join(__dirname, 'data', 'data.json');

