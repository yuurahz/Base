if (process.argv.includes('--server')) require('./server')
const cluster = require('cluster'),
 path = require('path'),
 fs = require('fs'),
 package = require('./package.json'),
 CFonts = require('cfonts'),
 Readline = require('readline'),
 yargs = require('yargs'),
 rl = Readline.createInterface(process.stdin, process.stdout)

CFonts.say(`${package.name}`, {
        font: 'block',
        align: 'center',
        colors: 'magenta'
})
CFonts.say(`${package.description} By ${package.author}`, {
        font: 'console',
        align: 'center',
        colors: 'system'
})

var isRunning = false
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [path.join(__dirname, file), ...process.argv.slice(2)]
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['magenta']
  })
  CFonts.say('Memuat Source...', {
    font: 'console',
    align: 'center',
    colors: ['green']
  })
  CFonts.say('Memuat Plugins...', {
    font: 'console',
    align: 'center',
    colors: ['green']
  })
  CFonts.say('Succes..!', {
    font: 'console',
    align: 'center',
    colors: ['green']
  })
  cluster.setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  cluster.setupMaster({
    exec: path.join(__dirname, file),
    args: args.slice(1),
  })
  let p = cluster.fork()
  p.on('message', data => {
    console.log('[ RECEIVED ]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
      break
      case 'uptime':
        p.send(process.uptime())
      break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('[ ❗ ] Exited With Code:', code)
    if (code === 0) return
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
}
start('main.js')
