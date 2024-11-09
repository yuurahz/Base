(async () => {
require('./config')
const { default: useSingleFileAuthState, useMultiFileAuthState, makeInMemoryStore, makeWALegacySocket, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, PHONENUMBER_MCC } = require('@whiskeysockets/baileys'),
 WebSocket = require('ws'),
 path = require('path'),
 pino = require('pino'),
 fs = require('fs'),
 yargs = require('yargs'),
 cp = require('child_process'),
 { promisify } = require('util'),
 exec = promisify(cp.exec).bind(cp),
 _ = require('lodash'),
 syntaxerror = require('syntax-error'),
 os = require('os'),
 { randomBytes } = require('crypto'),
 moment = require("moment-timezone"),
 time = moment.tz('Asia/Makassar').format('HH:mm:ss'),
 chalk = require('chalk'),
 { color } = require('./lib/color'),
 NodeCache = require('node-cache'),
 simple = require('./lib/simple')
 var low
 try {
  low = require('lowdb')
 } catch (e) {
  low = require('./lib/lowdb')
 }
const { Low, JSONFile } = low
const { cloudDBAdapter } = require('./lib/cloudDBAdapter')
const { mongoDB, mongoDBV2 } = require('./lib/mongoDB')

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

global.timestamp = {
  start: new Date
}

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.prefix = new RegExp('^[' + (opts['prefix'] || '‎!./@¿‽?#\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

const dbInstance = !process.env.DATABASE_URL ? new JSONFile('db.json') : /^https?:\/\//.test(process.env.DATABASE_URL) ? new cloudDBAdapter(process.env.DATABASE_URL) : /^mongodb(\+srv)?:\/\//i.test(process.env.DATABASE_URL) && opts.db ? new mongoDB(process.env.DATABASE_URL) : /^mongodb(\+srv)?:\/\//i.test(process.env.DATABASE_URL) && opts.dbv2 ? new mongoDBV2(process.env.DATABASE_URL) : new JSONFile('db.json')
  global.db = new Low(dbInstance)
  global.DATABASE = global.db
  global.loadDatabase = async function loadDatabase() {
  return db.READ ? new Promise(resolve => {
    const intervalId = setInterval(async () => {
      if (!db.READ) {
        clearInterval(intervalId)
        resolve(db.data === null ? await loadDatabase() : db.data);
      }
    }, 1 * 1e3)
  }) : db.data === null ? (db.READ = true, await db.read()?.catch(console.error), db.READ = null, db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    menfess: {},
    game: {},
    ...db.data
  }, db.chain = _.chain(db.data), null) : null
  }
  await loadDatabase()

const usePairingCode = !process.argv.includes('--pairing')
const question = function(text) {
   return new Promise(function(resolve) {
   rl.question(text, resolve)
  })
}

const rl = require('readline').createInterface(process.stdin, process.stdout)

const store = makeInMemoryStore({
  logger: pino({ level: "silent", stream: "store" }),
})

const { 
   version, 
   isLatest 
} = await fetchLatestBaileysVersion()
const { 
   state, 
   saveCreds 
} = await useMultiFileAuthState(path.resolve('./session'))
const msgRetryCounterCache = new NodeCache()
const connectionOptions = {
        version,
        logger: pino({ level: 'silent' }), 
        printQRInTerminal: !usePairingCode, 
        browser: ['Ubuntu', 'Edge', '110.0.1587.56'],  
        auth: {
         creds: state.creds, 
         keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
             level: 'silent', 
             stream: 'store' 
         })), 
     },
     getMessage: async key => {
    		const messageData = await store.loadMessage(key.remoteJid, key.id)
    		return messageData?.message || undefined
	},
     generateHighQualityLinkPreview: true, 
	 patchMessageBeforeSending: (message) => {
     const requiresPatch = !!(
                    message.buttonsMessage 
                    || message.templateMessage
                    || message.listMessage
                )
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    }
                }

               return message
            }, 
       msgRetryCounterCache,
   defaultQueryTimeoutMs: undefined,
  }
  
  global.conn = simple.makeWASocket(connectionOptions)
  conn.isInit = false	
	
  if (usePairingCode && !conn.authState.creds.registered) {
   const { registration } = { registration: {} }
   const phoneNumber = await question(chalk.blueBright('Input a Valid number start with region code. Example : 62xxx:\n'))
  rl.close()
  console.log(chalk.bgWhite(chalk.blue('Generating Code...')))
  setTimeout(async () => {
  const code = await conn?.requestPairingCode(phoneNumber)
  const codes = code?.match(/.{1,4}/g)?.join('-') || code
  console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(codes)))
	}, 3000)
  }
	
  function clearTmp() {
		const tmp = [os.tmpdir(), path.join(__dirname, './tmp')]
		const filename = []
		tmp.forEach(dirname => fs.readdirSync(dirname).forEach(file => filename.push(path.join(dirname, file))))
		filename.map(file => (
			stats = fs.statSync(file),
			stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3) ?
			fs.unlinkSync(file) :
		null))
  }
  
  setInterval(async () => {
	await clearTmp()
    console.log(
      chalk.cyanBright(
        `\n╭───────────────────·»\n│\n` +
          `│  Storage Clear Successfull \n│\n` +
          `╰───❲ ${set.footer} ❳\n`
      )
    )
  }, 5 * 60 * 1000)
	
 function restartLimitAndBalance() {
   setInterval(async () => {
    const currentDate = new Date()
    const autoRestart = bot.autoRestartLimitAndBalance
    if (autoRestart) {
      if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0) {
        const users = Object.keys(db.data.users)
        for (const user of users) {
          db.data.users[user].limit = limit.free               
        }
      }
    } else {
      console.log('Automatic restart of limit and balance is turned off.')
    }
   }, 60 * 1000) 
 }
 restartLimitAndBalance()
 	
 async function connectionUpdate(update) {
        const { 
           connection, 
           lastDisconnect, 
           isNewLogin 
        } = update
		if (connection == 'connecting') console.log(chalk.yellowBright('Trying To Connect..'))
		if (connection == 'close') console.log(chalk.red('Connection lost..'))
		if (isNewLogin) conn.isInit = true
		if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
		timestamp.connect = new Date
	}
	if (db.data == null) await loadDatabase()
	console.log(JSON.stringify(update, null, 4))
    }        
	process.on('uncaughtException', console.error)
	let isInit = true,
    handler = require('./handler')
    reloadHandler = function(restatConn) {
	let Handler = require('./handler')
	if (Object.keys(Handler || {}).length) handler = Handler
	if (restatConn) {
			try {
			   conn.ws.close()
			} catch {}
			    conn = {
				...conn,
				...simple.makeWASocket(connectionOptions)
			}
		}
  if (!isInit) {
  conn.ev.off('messages.upsert', conn.handler)
  conn.ev.off('call', async (node) => require('./lib/anticall')(conn, node))
  conn.ev.off('group-participants.update', conn.onParticipantsUpdate)
  conn.ev.off('connection.update', conn.connectionUpdate)
  conn.ev.off('creds.update', conn.credsUpdate)
      }  
  conn.welcome = `Welcome @user (ʘᴗʘ✿)\n${Func.readMore()}\n@desc`
  conn.bye = "Sayonara @user (ー_ー゛)"
  conn.spromote = "@user telah naik jabatan o(〃＾▽＾〃)o"
  conn.sdemote = "@user telah turun jabatan ٩(๑꒦ິȏ꒦ິ๑)۶"
  conn.handler = handler.handler.bind(conn)
  conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn)
  conn.connectionUpdate = connectionUpdate.bind(conn)
  conn.credsUpdate = saveCreds.bind(conn)
  
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('call', async (node) => require('./lib/anticall')(conn, node))
  conn.ev.on('group-participants.update', conn.onParticipantsUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
	}
  reloadHandler()
  let pluginFolder = path.join(__dirname, 'plugins')
  let pluginFilter = filename => /\.js$/.test(filename)
  plugins = {}
  for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
	  plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
	 conn.logger.error(e)
	 delete plugins[filename]
	}
  }	
  console.log(Object.keys(plugins))	
  reload = (_ev, filename) => {
		if (pluginFilter(filename)) {
			let dir = path.join(pluginFolder, filename)
			if (dir in require.cache) {
				delete require.cache[dir]
				if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
				else {
					conn.logger.warn(`deleted plugin '${filename}'`)
					return delete plugins[filename]
				}
			} else conn.logger.info(`requiring new plugin '${filename}'`)
			let err = syntaxerror(fs.readFileSync(dir), filename)
			if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
			else try {
				plugins[filename] = require(dir)
			} catch (e) {
				conn.logger.error(`error require plugin '${filename}\n${e}'`)
			} finally {
				plugins = Object.fromEntries(Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b)))
			}
		}
	}
	Object.freeze(reload)
	fs.watch(path.join(__dirname, 'plugins'), reload)
	async function _quickTest() {
		let test = await Promise.all([
			cp.spawn('ffmpeg'),
			cp.spawn('ffprobe'),
			cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
			cp.spawn('convert'),
			cp.spawn('magick'),
			cp.spawn('gm'),
			cp.spawn('find', ['--version'])
		].map(p => {
			return Promise.race([
				new Promise(resolve => {
					p.on('close', code => {
						resolve(code !== 127)
					})
				}),
				new Promise(resolve => {
					p.on('error', _ => resolve(false))
				})
			])
		}))
		let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
		console.log(test)
		let s = support = {
			ffmpeg,
			ffprobe,
			ffmpegWebp,
			convert,
			magick,
			gm,
			find
		}
		Object.freeze(support)
		if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
		if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
		if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
	}
_quickTest().then(() => conn.logger.info('Quick Test Done')).catch(console.error)
console.log(color(time, "white"), color("Connecting...", "aqua"))
})()
