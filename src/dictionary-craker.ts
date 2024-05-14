import { readFileSync } from "node:fs"
import { join } from "node:path"

export function* generatePasswordByDictionary(maxLenght: number, minLenght = 1) {
    const passwords = readFileSync(join(process.cwd(), './dictionary.txt'), {
        encoding: 'utf8'
    }).split('\n')
    for (const password of passwords) {
        if (password.length > maxLenght || password.length < minLenght)
        continue
        yield password
    }
}
