import bcrypt from 'bcryptjs';

function hash(s: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(s, salt);
}

function compare(s: string, h: string) {
    return bcrypt.compareSync(s, h);
}

export {hash, compare}