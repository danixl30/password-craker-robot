const initCharacter = 33
const lastCharacter = 123

const getNextCode = (code: number) => code + 1

function carryCharacters(characters: string[], index = 1): string[] {
    if (index === characters.length) {
        characters.push(String.fromCharCode(initCharacter))
        return characters
    }
    const code = characters[index].charCodeAt(0)
    const nextCode = getNextCode(code)
    if ((nextCode) % lastCharacter !== 0) {
        characters[index] = String.fromCharCode(nextCode)
        return characters
    } else {
        characters[index] = String.fromCharCode(initCharacter)
        return carryCharacters(characters, ++index)
    }

}

export function* generatePassword(maxLenght: number, minLenght = 1) {
    let characters: string[] = new Array(minLenght).fill(String.fromCharCode(initCharacter))
    while(characters.length <= maxLenght) {
        yield characters.join('')
        const code = characters[0].charCodeAt(0)
        const nextCode = getNextCode(code)
        if ((nextCode) % lastCharacter !== 0) {
            characters[0] = String.fromCharCode(nextCode)
        } else {
            characters[0] = String.fromCharCode(initCharacter)
            characters = carryCharacters(characters)
        }
    }
}

