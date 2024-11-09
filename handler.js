const {
  WAMessageStubType,
  generateWAMessage,
  areJidsSameUser,
  proto,
  getAggregateVotesInPollMessage
 } = require("@whiskeysockets/baileys"),
 { smsg } = require('./lib/simple'),
 util = require('util'),
 moment = require('moment-timezone'),
 fs = require('fs'),
 chalk = require('chalk'),
 isNumber = x => typeof x === 'number' && !isNaN(x)

module.exports = {
   async handler(chatUpdate) {
      if (db.data == null) await loadDatabase()
      this.msgqueque = this.msgqueque || []
      if (!chatUpdate) return
      this.pushMessage(chatUpdate.messages).catch(console.error)
      let m = chatUpdate.messages[chatUpdate.messages.length - 1]
      if (!m) return
      if (m.message?.viewOnceMessageV2) m.message = m.message.viewOnceMessageV2.message
      if (m.message?.documentWithCaptionMessage) m.message = m.message.documentWithCaptionMessage.message
      if (m.message?.viewOnceMessageV2Extension) m.message = m.message.viewOnceMessageV2Extension.message
      try {
         m = smsg(this, m) || m
         if (!m) return
         m.exp = 0
         m.limit = false
      try {
        let user = db.data.users[m.sender]
        if (typeof user !== 'object') db.data.users[m.sender] = {}
        if (user) {
          if (!isNumber(user.exp)) user.exp = 100
          if (!isNumber(user.limit)) user.limit = limit.free
          if (!isNumber(user.joinlimit)) user.joinlimit = 1
          if (!isNumber(user.money)) user.money = 100
          if (!isNumber(user.bank)) user.bank = 100
          if (!isNumber(user.lastclaim)) user.lastclaim = 0
          if (!('registered' in user)) user.registered = false
          if (!user.registered) {
          if (!('name' in user)) user.name = m.name
          if (!isNumber(user.age)) user.age = 1
          if (!isNumber(user.regTime)) user.regTime = -1
          }
          if (!isNumber(user.afk)) user.afk = -1
          if (!('afkReason' in user)) user.afkReason = ''
          if (!('pasangan' in user)) user.pasangan = ''
          if (!('banned' in user)) user.banned = false
          if (!('premium' in user)) user.premium = false
          if (!('created' in user)) user.created = false
          if (!isNumber(user.premiumDate)) user.premiumDate = 0
          if (!isNumber(user.bannedDate)) user.bannedDate = 0
          if (!isNumber(user.warn)) user.warn = 0
          if (!isNumber(user.level)) user.level = 0
          if (!('role' in user)) user.role = ''
          if (!('relationship' in user)) user.relationship = ''
          if (!('autolevelup' in user)) user.autolevelup = true
          if (!('game' in user)) user.game = {}
          if (!isNumber(user.hit)) user.hit = 0
          if (!isNumber(user.lastseen)) user.lastseen = 0
          if (!isNumber(user.usebot)) user.usebot = 0
          if (!isNumber(user.health)) user.health = 100
          if (!isNumber(user.spammer)) user.spammer = 0
          if (!isNumber(user.limitspam)) user.limitspam = 0
          if (!isNumber(user.tiketcoin)) user.tiketcoin = 0
          if (!isNumber(user.lastclaim)) user.lastclaim = 0
        } else db.data.users[m.sender] = {
          exp: 100,
          limit: limit.free,
          joinlimit: 1,
          spammer: 0,
          limitspam: 0,
          money: 100,
          bank: 100,
          health: 100,
          tiketcoin: 0,
          lastclaim: 0,
          registered: false,
          name: m.name,
          age: -1,
          regTime: -1,
          afk: -1,
          afkReason: '',
          pasangan: '',
          banned: false,
          premium: false,
          created: false,
          warn: 0,
          level: 0,
          role: '',
          relationship: '',
          autolevelup: true,
          game: {},
          hit: 0,
          lastseen: 0,
          usebot: 0
        }        
                 // == Ai Respon == //
        let ai = db.data.users[m.sender].ai 
        if (typeof ai !== 'object') db.data.users[m.sender].ai = {}
        if (ai) {
           if (!isNumber(ai.respon)) ai.respon = 0                     } else db.data.users[m.sender].ai = {
           respon: 0
         }
        
        // == Chats Schema == //
        let chat = db.data.chats[m.chat]
        if (typeof chat !== 'object') db.data.chats[m.chat] = {}
        if (chat) {
          if (!('announcement' in chat)) chat.announcement = false
          if (!('antitoxic' in chat)) chat.antitoxic = false
          if (!('isBanned' in chat)) chat.isBanned = false
          if (!('welcome' in chat)) chat.welcome = false
          if (!('detect' in chat)) chat.detect = false
          if (!('delete' in chat)) chat.delete = false
          if (!('sWelcome' in chat)) chat.sWelcome = ''
          if (!('sBye' in chat)) chat.sBye = ''
          if (!('sPromote' in chat)) chat.sPromote = ''
          if (!('sDemote' in chat)) chat.sDemote = ''
          if (!('antiporn' in chat)) chat.antiporn = true
          if (!('antilink' in chat)) chat.antilink = false
          if (!('antisticker' in chat)) chat.antisticker = false
          if (!('autoSticker' in chat)) chat.autoSticker = false
          if (!('antibot' in chat)) chat.antibot = false
          if (!('antiFoto' in chat)) chat.antiFoto = false
          if (!('simi' in chat)) chat.simi = false
          if (!('nsfw' in chat)) chat.nsfw = false
          if (!('update' in chat)) chat.update = false
          if (!('Animeupdate' in chat)) chat.Animeupdate = false
          if (!('game' in chat)) chat.game = false
          if (!('rpg' in chat)) chat.rpg = false
          if (!isNumber(chat.expired)) chat.expired = 0
          if (!('member' in chat)) chat.member = {}
          if (!isNumber(chat.chat)) chat.chat = 0
          if (!isNumber(chat.lastchat)) chat.lastchat = 0
          if (!isNumber(chat.lastseen)) chat.lastseen = 0
          if (!isNumber(chat.lastTime)) chat.lastTime = 0
        } else db.data.chats[m.chat] = {
          announcement: false,
          antitoxic: false,
          isBanned: false,
          welcome: false,
          detect: false,
          delete: false,
          sWelcome: '',
          sBye: '',
          sPromote: '',
          sDemote: '',
          delete: true,
          antilink: false,
          antistiker: false,
          autoSticker: false,
          antiporn: false,
          antibot: false,
          antiFoto: false,
          simi: false,
          nsfw: false,
          update: false,
          Animeupdate: false,
          rpg: false,
          game: false,
          expired: 0,
          member: {},
          chat: 0,
          lastchat: 0,
          lastseen: 0,
          lastTime: 0
        }
        
        // ==Settings Schema== //
        let settings = db.data.settings[this.user.jid]
        if (typeof settings !== 'object') db.data.settings[this.user.jid] = {}
        if (settings) {
          if (!'autoread' in settings) settings.autoread = true
          if (!'anticall' in settings) settings.anticall = true
          if (!'grouponly' in settings) settings.grouponly = false
          if (!'autobio' in settings) settings.autobio = false
          if (!'backup' in settings) settings.backup = false
          if (!isNumber(settings.backupTime)) settings.backupTime = 0
          if (!isNumber(settings.style)) settings.style = 2
          if (!("blockcmd" in settings)) settings.blockcmd = []
          if (!'owners' in settings) settings.owners = ['62882007855266']
          if (!'moderator' in settings) settings.moderator = ['62882007855266']
          if (!'link' in settings) settings.link = set.gc
          if (!'cover' in settings) settings.cover = 'https://iili.io/JAt7vf4.jpg'
        } else db.data.settings[this.user.jid] = {
          autoread: true,
          anticall: true,
          grouponly: false,
          autobio: false,
          backup: false,
          backupTime: 0,
          style: 2,
          blockcmd: [],
          owners: ['62882007855266'],
          moderator: ['62882007855266'],
          link: set.gc,
          cover: '' || set.thumb
      }        
        let database = db.data?.database
        if (typeof database !== "object") db.data.database = {}
        let dbai = db.data?.dbai
        if (typeof dbai !== "object") db.data.dbai = {}
        let game = db.data?.game
        if (typeof game !== "object") db.data.game = {}
      } catch (e) {
        console.error(e)
      }
            
      const isROwner = [global.owner.number, this.decodeJid(this.user.jid).split`@` [0], ...db.data.settings[this.user.jid].owners].map(v => v + '@s.whatsapp.net').includes(m.sender)
      const isOwner = isROwner || m.fromMe
      const isMods = db.data.settings[this.user.jid].moderator 
      const isPrems = db.data.users[m.sender].premium || isROwner
      const isBans = db.data.users[m.sender].banned
      
      if (isROwner) {
        db.data.users[m.sender].premiumDate = "Permanent"
        db.data.users[m.sender].limit = limit.premium
        db.data.users[m.sender].money = "Unlimited"
        db.data.users[m.sender].ai.respon = 100000000
      } else if (isPrems) 
        db.data.users[m.sender].limit = limit.premium
      
      if (opts['queque'] && m.text && !(isMods || isPrems)) {
        let queque = this.msgqueque, time = 1000 * 5
        const previousID = queque[queque.length - 1]
        queque.push(m.id || m.key.id)
        setInterval(async function () {
          if (queque.indexOf(previousID) === -1) clearInterval(this)
          else await Func.delay(time)
        }, time)
      }

      let usedPrefix
      let _user = db.data && db.data.users && db.data.users[m.sender]      
      const groupMetadata = (m.isGroup ? (conn.chats[m.chat] || {}).metadata : {}) || {}
      const participants = (m.isGroup ? groupMetadata.participants : []) || []
      const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {}
      const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}
      const isRAdmin = user && user.admin == 'superadmin' || false
      const body = typeof m.text == 'string' ? m.text : false
      const isAdmin = isRAdmin || user && user.admin == 'admin' || false
      const isBotAdmin = bot && bot.admin || false
      const users = global.db.data.users[m.sender],
        chat = global.db.data.chats[m.chat],
        setting = global.db.data.settings[this.user.jid]

      if (db.data.settings[conn.user.jid].autoread) conn.readMessages([m.key])
      if (opts['nyimak']) return
      if (!m.fromMe && opts['self']) return
      if (opts['pconly'] && m.chat.endsWith('g.us')) return
      if (opts['gconly'] && !m.fromMe && !isPrems && !m.chat.endsWith('g.us') && !Object.values((await conn.groupMetadata(set.idgc)).participants).find(users => users.id == m.sender)) return m.reply(status.gconly)
      if (opts['swonly'] && m.chat !== 'status@broadcast') return
      if (typeof m.text !== 'string') m.text = ''

      if (users) {
        users.lastseen = Date.now()
      }
      if (chat) {
        chat.lastseen = Date.now()
        chat.chat += 1
      }
      if (m.isGroup && !m.fromMe) {
        let now = Date.now()
        if (!chat.member[m.sender]) {
          chat.member[m.sender] = {
            lastseen: now,
            blacklist: false
          }
        } else {
          chat.member[m.sender].lastseen = now,
          chat.member[m.sender].blacklist = false
        }
      }

      for (let name in global.plugins) {
            let plugin
            if (typeof plugins[name].run === 'function') {
               let spik = plugins[name]
               plugin = spik.run
               for (let prop in spik) {
                  if (prop !== 'run') {
                     plugin[prop] = spik[prop]
                  }
               }
            } else {
               plugin = plugins[name]
            }

            if (!plugin) continue
            if (plugin.disabled) continue
            if (typeof plugin.all === 'function') {
               try {
                  await plugin.all.call(this, m, chatUpdate)
               } catch (e) {
                  console.error(e)
               }
            }
                    
        let str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
        let match = (_prefix instanceof RegExp ?
          [[_prefix.exec(m.text), _prefix]] :
          Array.isArray(_prefix) ?
            _prefix.map(p => {
              let re = p instanceof RegExp ?
                p :
                new RegExp(str2Regex(p))
              return [re.exec(m.text), re]
            }) :
            typeof _prefix === 'string' ?
              [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
              [[[], new RegExp]]
        ).find(p => p[1])
        if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
        body, match, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, users, chat, setting, chatUpdate,
        })) continue
                
        if (typeof plugin !== 'function') continue
        if ((usedPrefix = (match[0] || '')[0])) {
          let noPrefix = m.text.replace(usedPrefix, '')
          let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
          args = args || []
          let _args = noPrefix.trim().split` `.slice(1)
          let text = _args.join` `
          let quoted = m.quoted ? m.quoted.text : text
          command = (command || '').toLowerCase()
          let fail = plugin.fail || global.mess
          let isAccept = plugin.command instanceof RegExp ?
          plugin.command.test(command) :
          Array.isArray(plugin.command) ?
          plugin.command.some(cmd => cmd instanceof RegExp ?
                cmd.test(command) :
                cmd === command
              ) :
              typeof plugin.command === 'string' ? // String?
                plugin.command === command :
                false
          if (!isAccept) continue

          users.hit += 1
          users.usebot = Date.now()
          console.log({ hit: users.hit, prefix: usedPrefix.trim() })

          m.plugin = name
          if (m.chat in db.data.chats || m.sender in db.data.users) {
            let chat = db.data.chats[m.chat]
            let user = db.data.users[m.sender]
            if (name != 'owner-unbanned.js' && chat && chat.isBanned && !isAdmin && !isROwner) return // Except this
            if (name != 'owner-unbanned.js' && user && user.banned) return
          }          
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
            // Both Owner
            m.reply(mess.owner)
            continue
          }
          if (plugin.rowner && !isROwner) {
            // Real Owner
            m.reply(mess.owner)
            continue
          }
          if (plugin.owner && !isOwner) { 
            // Number Owner
            m.reply(mess.owner)
            continue
          }
          if (plugin.mods && !isMods) { 
            // Moderator
            m.reply(mess.mods)
            continue
          }
          if (plugin.premium && !isPrems) { 
            // Premium
            m.reply(mess.premium)
            continue
          }
          if (plugin.group && !m.isGroup) { 
            // Group Only
            m.reply(mess.group)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) { 
            // You Admin
            m.reply(mess.botAdmin)
            continue
          } else if (plugin.admin && !isAdmin) { 
            // User Admin
            m.reply(mess.admin)
            continue
          }
          if (plugin.private && m.isGroup) { 
            // Private Chat Only
            m.reply(mess.private)
            continue
          }
          if (plugin.register == true && _user.registered == false) { 
            // Butuh daftar?
            m.reply(mess.unreg)
            continue
          }
          if (plugin.game && db.data.chats[m.chat].game == false) {
            // Game mode
            m.reply(mess.game)
            continue
          }
          if (plugin.rpg && db.data.chats[m.chat].rpg == false) {
            // RPG mode
            m.reply(mess.rpg)
            continue
          }
          if (plugin.nsfw && db.data.chats[m.chat].nsfw == false) {
            // Nsfw mode
            m.reply(mess.nsfw)
            continue
          }

          m.isCommand = true
          let xp = 'exp' in plugin ? parseInt(plugin.exp) : 20 // XP Earning per command
          if (xp > 99999) m.reply('Weladalah, Ngecit Rek :v')
          else m.exp += xp
          if (
            !isPrems &&
            plugin.limit &&
            global.db.data.users[m.sender].limit < plugin.limit * 1
          ) {
            let limit = 'Limit anda telah habis! silahkan tunggu 24 jam untuk mereset limit anda, atau upgrade ke premium untuk mendapatkan unlimited limit'
            conn.sendMessage(
              m.chat,
              {
                text: limit,
              },
              { quoted: m },
            )
            continue // Limit Entek
          }
         if (plugin.level > _user.level) {
	     this.sendMessage(m.chat, {
		 text: `[📃] Diperlukan level *${plugin.level}* untuk menggunakan perintah ini. Level kamu *${_user.level}🎋*\n*${plugin.level}* level is required to use this command. Your level is *${_user.level}🎋*`, mentions: [m.sender] }, { quoted: m })
	     continue
          }
          let extra = {
          quoted, body, match, usedPrefix, noPrefix, _args, args, command, text, conn: this, participants, groupMetadata, users, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, users, chat, setting, chatUpdate,
          }
          try {
            await plugin.call(this, m, extra)
            if (!isPrems) m.limit = m.limit || plugin.limit || false
          } catch (e) {
            m.error = e
            console.error(e)
            if (e) {
              let text = util.format(e)
              conn.logger.error(text)
              if (text.match("rate-overlimit")) return
              if (e.name)                   
              this.reply(owner.jid,
`*[ ⚠️ ]* Telah terjadi Error pada Bot, mohon untuk di perbaiki 

*• Nama Fitur :* ${command}
*• Nama Pengirim :* ${m.name} ${m.isGroup ? `*${await conn.getName(m.chat)}*` : ""}

「 *ERROR LOG* 」 
${text}`.trim(),
        fakes(Func.texted('italic', 'Report Eror Notification')),
         )
          }
            m.react('❌')       
          } finally {
            if (typeof plugin.after === 'function') {
              try {
                await plugin.after.call(this, m, extra)
              } catch (e) {
                console.error(e)
              }
            }
            // if (m.limit) m.reply(+ m.limit + ' Limit used')
          }
          break
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      if (opts['queque'] && m.text) {
        const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
        if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
      }
      let user, stats = db.data.stats
      if (m) {
        if (m.sender && (user = db.data.users[m.sender])) {
          user.exp += m.exp
          user.limit -= m.limit * 1
        }
        
        let stat
        if (m.plugin) {
          let now = + new Date
          if (m.plugin in stats) {
            stat = stats[m.plugin]
            if (!isNumber(stat.total)) stat.total = 1
            if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
            if (!isNumber(stat.last)) stat.last = now
            if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
          } else stat = stats[m.plugin] = {
            total: 1,
            success: m.error != null ? 0 : 1,
            last: now,
            lastSuccess: m.error != null ? 0 : now
          }
          stat.total += 1
          stat.last = now
          if (m.error == null) {
            stat.success += 1
            stat.lastSuccess = now
          }
        }
      }
  
      try {
        require('./lib/print')(m, this)
      } catch (e) {
        console.log(m, m.quoted, e)
      }
      if (opts["autoread"])
        await conn.chatRead(
          m.chat,
          m.isGroup ? m.sender : undefined,
          m.id || m.key.id,
        ).catch(() => {})
    }
  },
  async participantsUpdate({ id, participants, action }) {
    if (opts['self']) return
    if (global.isInit) return
    let chat = db.data.chats[id] || {}
    switch (action) {
      case 'add':
      case 'remove':
      case 'leave':
      case 'invite':
      case 'invite_v4':
    if (chat.welcome) {
          let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
          for (let user of participants) {
            let text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc.toString()) : (chat.sBye || this.bye || conn.bye || 'Goodbye, @user!')).replace('@user', '@' + user.split('@')[0])
            this.reply(id, text, null)
          }
        }
    }
  }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'handler.js'"))
  delete require.cache[file]
  if (global.reloadHandler) console.log(global.reloadHandler())
})
