import Fastify from "fastify"
import fastifyStatic from "@fastify/static"
import { join } from 'node:path'
import { Options } from "selenium-webdriver/chrome"
import { Builder, By, until } from "selenium-webdriver"
import { generatePassword } from "./craker"
import { generatePasswordByDictionary } from "./dictionary-craker"

const fastify = Fastify()

fastify.register(fastifyStatic, {
    root: join(process.cwd(), 'public'),
    prefix: '/public/'
})

fastify.get('/', (_request, reply) => {
    reply.sendFile('index.html')
})

async function bootstrap() {
    await fastify.listen({
        port: 4000
    })
    const options = new Options()
    options.addArguments('--disable-dev-shm-usage')
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
    await driver.get('http://localhost:4000')
    const usernameInput = await driver.findElement(By.xpath('//*[@id="input-username"]'))
    await usernameInput.sendKeys('user1')
    const gen = process.argv.includes('--dictionary') ? generatePasswordByDictionary(15) :  generatePassword(15)
    console.log('Cracker started...')
    const initial = new Date()
    while(true) {
        const pass = gen.next()
        if (pass.done || !pass.value) {
            console.log('Could not found password...')
            break
        }
        console.log(pass.value)
        const passwordInput = await driver.findElement(By.xpath('//*[@id="input-password"]'))
        await passwordInput.clear()
        await passwordInput.sendKeys(pass.value)
        await driver.findElement(By.xpath('/html/body/button')).click()
        const postLoginText = await driver.findElement(By.xpath('//*[@id="text-post-login"]/h5'))
        await driver.wait(until.elementIsVisible(postLoginText), 1000)
        if ((await postLoginText.getText()) === 'Login successfull') {
            console.log('Password found!!!')
            console.log(pass.value)
            console.log('Time:', new Date().getTime() - initial.getTime(), 'ms')
            break
        }
    }
    process.exit(0)
}
bootstrap()
