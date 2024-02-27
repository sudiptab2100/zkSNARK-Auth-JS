import crypto from 'crypto';
import fs from 'fs';

function hashGen(a, b, c, k) {
    const ba = a.toString(16).padStart(34, '0').slice(2);
    const bb = b.toString(16).padStart(34, '0').slice(2);
    const bc = c.toString(16).padStart(34, '0').slice(2);
    const bk = k.toString(16).padStart(34, '0').slice(2);
    
    const bdata = ba + bb + bc + bk;
    const hash = crypto.createHash('sha256').update(Buffer.from(bdata, 'hex'));
    // const hx = hash.digest('hex');
    
    const hh = hash.digest();
    const i1 = hh.slice(0, 16);
    const i2 = hh.slice(16);
    const val1 = BigInt('0x' + i1.toString('hex'));
    const val2 = BigInt('0x' + i2.toString('hex'));
    
    return [val1, val2];
}

function zokIp(password, count) {
    const binPass = Buffer.from(password, 'utf-8').toString('hex').padStart(96, '0');
    const a = BigInt('0x' + binPass.slice(0, 32));
    const b = BigInt('0x' + binPass.slice(32, 64));
    const c = BigInt('0x' + binPass.slice(64));
    const k = count;
    
    const op = {
        password: password,
        a: a.toString(),
        b: b.toString(),
        c: c.toString(),
        k: k.toString()
    };
    
    console.log(`a: ${a}\nb: ${b}\nc: ${c}\nk: ${k}\n`);
    
    const [v1, v2] = hashGen(a, b, c, 0);
    console.log(`sha256([a, b, c, 0]) =>\n  ${v1}\n  ${v2}\n`);
    op.h = [v1.toString(), v2.toString()];
    
    const [vv1, vv2] = hashGen(a, b, c, k);
    console.log(`sha256([a, b, c, k]) =>\n  ${vv1}\n  ${vv2}\n`);
    op.hh = [vv1.toString(), vv2.toString()];
    
    fs.writeFileSync('files/hash_data.json', JSON.stringify(op, null, 4));
}

console.log("\nResults:\n");
zokIp("password", 1);
