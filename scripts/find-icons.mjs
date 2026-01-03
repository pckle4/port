
import * as icons from 'simple-icons';

const keys = Object.keys(icons);
console.log('Sharp icons:', keys.filter(k => k.toLowerCase().includes('sharp')));
console.log('Dotnet icons:', keys.filter(k => k.toLowerCase().includes('dotnet')));
console.log('C icons:', keys.filter(k => k.toLowerCase().startsWith('sic')));
