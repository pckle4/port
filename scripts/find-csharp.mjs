
import * as icons from 'simple-icons';

const keys = Object.keys(icons);
console.log('C...s...:', keys.filter(k => k.startsWith('siC') && k.toLowerCase().includes('s')));
console.log('C...sharp...:', keys.filter(k => k.startsWith('siC') && k.toLowerCase().includes('sharp')));
