import { sha256 } from "js-sha256"
import { generatePassword } from "./craker"
import { generatePasswordByDictionary } from "./dictionary-craker"

const password = '123,'
const hash = sha256(password)
console.log('Cracker started...')
let counter = 0
const initial = new Date()

const gen = process.argv.includes('--dictionary') ? generatePasswordByDictionary(15) :  generatePassword(15)
while(true) {
    counter++
    const current = gen.next()
    if (current.done)
    break
    if (sha256(current.value) === hash) {
        console.log(current.value)
        console.log('Found in attemp: ', counter)
        console.log('Time:', new Date().getTime() - initial.getTime(), 'ms')
        break
    }
}

