if (!window.jQuery) {
    var jQuery = Zepto;
    (function (a) {
        ["width", "height"].forEach(function (b) {
            a.fn[b] = function (e) {
                var g, c = document.body,
                    d = document.documentElement,
                    f = b.replace(/./, function (h) {
                        return h[0].toUpperCase()
                    });
                if (e === undefined) {
                        return this[0] == window ? d["client" + f] : this[0] == document ? Math.max(c["scroll" + f], c["offset" + f], d["client" + f], d["scroll" + f], d["offset" + f]) : (g = this.offset()) && g[b]
                    } else {
                        return this.each(function (h) {
                            a(this).css(b, e)
                        })
                    }
            }
        });
        ["width", "height"].forEach(function (c) {
            var d, b = c.replace(/./, function (e) {
                return e[0].toUpperCase()
            });
            a.fn["outer" + b] = function (h) {
                var g = this;
                if (g) {
                    var e = g[0]["offset" + b],
                        f = {
                            width: ["left", "right"],
                            height: ["top", "bottom"]
                        };
                    f[c].forEach(function (i) {
                            if (h) {
                                e += parseInt(g.css("margin-" + i), 10)
                            }
                        });
                    return e
                } else {
                    return null
                }
            }
        });
        ["width", "height"].forEach(function (c) {
            var d, b = c.replace(/./, function (e) {
                return e[0].toUpperCase()
            });
            a.fn["inner" + b] = function () {
                var g = this;
                if (g[0]["inner" + b]) {
                    return g[0]["inner" + b]
                } else {
                    var e = g[0]["offset" + b],
                        f = {
                            width: ["left", "right"],
                            height: ["top", "bottom"]
                        };
                    f[c].forEach(function (h) {
                            e -= parseInt(g.css("border-" + h + "-width"), 10)
                        });
                    return e
                }
            }
        });
        ["Left", "Top"].forEach(function (c, e) {
            var f = "scroll" + c;

            function b(g) {
                return g && typeof g === "object" && "setInterval" in g
            }
            function d(g) {
                return b(g) ? g : g.nodeType === 9 ? g.defaultView || g.parentWindow : false
            }
            a.fn[f] = function (i) {
                var g, h;
                if (i === undefined) {
                    g = this[0];
                    if (!g) {
                        return null
                    }
                    h = d(g);
                    return h ? ("pageXOffset" in h) ? h[e ? "pageYOffset" : "pageXOffset"] : h.document.documentElement[f] || h.document.body[f] : g[f]
                }
                this.each(function () {
                    h = d(this);
                    if (h) {
                        var k = !e ? i : a(h).scrollLeft(),
                            j = e ? i : a(h).scrollTop();
                        h.scrollTo(k, j)
                    } else {
                        this[f] = i
                    }
                })
            }
        });
        a.fn.prevUntil = function (b) {
            var d = this,
                c = [];
            while (d.length && !a(d).filter(b).length) {
                    c.push(d[0]);
                    d = d.prev()
                }
            return a(c)
        };
        a.fn.nextUntil = function (b) {
            var d = this,
                c = [];
            while (d.length && !d.filter(b).length) {
                    c.push(d[0]);
                    d = d.next()
                }
            return a(c)
        };
        a._extend = a.extend;
        a.extend = function () {
            arguments[0] = arguments[0] || {};
            return a._extend.apply(this, arguments)
        }
    })(jQuery)
}(function (g, e) {
    function i(o) {
        var n;
        for (n in o) {
            if (l[o[n]] !== e) {
                return true
            }
        }
        return false
    }
    function f() {
        var n = ["Webkit", "Moz", "O", "ms"],
            o;
        for (o in n) {
                if (i([n[o] + "Transform"])) {
                    return "-" + n[o].toLowerCase() + "-"
                }
            }
        return ""
    }
    function m(q, p, o) {
        var n = q;
        if (typeof p === "object") {
            return q.each(function () {
                if (a[this.id]) {
                    a[this.id].destroy()
                }
                new g.mobiscroll.classes[p.component || "Scroller"](this, p)
            })
        }
        if (typeof p === "string") {
            q.each(function () {
                var s, t = a[this.id];
                if (t && t[p]) {
                    s = t[p].apply(this, Array.prototype.slice.call(o, 1));
                    if (s !== e) {
                        n = s;
                        return false
                    }
                }
            })
        }
        return n
    }
    var d = +new Date(),
        a = {},
        k = g.extend,
        l = document.createElement("modernizr").style,
        j = i(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]),
        c = i(["flex", "msFlex", "WebkitBoxDirection"]),
        h = f(),
        b = h.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz");
    g.fn.mobiscroll = function (n) {
            k(this, g.mobiscroll.components);
            return m(this, n, arguments)
        };
    g.mobiscroll = g.mobiscroll || {
            version: "2.15.1",
            util: {
                prefix: h,
                jsPrefix: b,
                has3d: j,
                hasFlex: c,
                testTouch: function (n, o) {
                    if (n.type == "touchstart") {
                        g(o).attr("data-touch", "1")
                    } else {
                        if (g(o).attr("data-touch")) {
                            g(o).removeAttr("data-touch");
                            return false
                        }
                    }
                    return true
                },
                objectToArray: function (p) {
                    var n = [],
                        o;
                    for (o in p) {
                            n.push(p[o])
                        }
                    return n
                },
                arrayToObject: function (n) {
                    var p = {},
                        o;
                    if (n) {
                            for (o = 0; o < n.length; o++) {
                                p[n[o]] = n[o]
                            }
                        }
                    return p
                },
                isNumeric: function (n) {
                    return n - parseFloat(n) >= 0
                },
                isString: function (n) {
                    return typeof n === "string"
                },
                getCoord: function (o, p) {
                    var n = o.originalEvent || o;
                    return n.changedTouches ? n.changedTouches[0]["page" + p] : o["page" + p]
                },
                getPosition: function (q, o) {
                    var r = window.getComputedStyle ? getComputedStyle(q[0]) : q[0].style,
                        n, p;
                    if (j) {
                            g.each(["t", "webkitT", "MozT", "OT", "msT"], function (t, s) {
                                if (r[s + "ransform"] !== e) {
                                    n = r[s + "ransform"];
                                    return false
                                }
                            });
                            n = n.split(")")[0].split(", ");
                            p = o ? (n[13] || n[5]) : (n[12] || n[4])
                        } else {
                            p = o ? r.top.replace("px", "") : r.left.replace("px", "")
                        }
                    return p
                },
                constrain: function (p, o, n) {
                    return Math.max(o, Math.min(p, n))
                },
                vibrate: function (n) {
                    if ("vibrate" in navigator) {
                        navigator.vibrate(n || 50)
                    }
                }
            },
            tapped: false,
            autoTheme: "mobiscroll",
            presets: {
                scroller: {},
                numpad: {},
                listview: {},
                menustrip: {}
            },
            themes: {
                frame: {},
                listview: {},
                menustrip: {}
            },
            i18n: {},
            instances: a,
            classes: {},
            components: {},
            defaults: {
                context: "body",
                mousewheel: true,
                vibrate: true
            },
            setDefaults: function (n) {
                k(this.defaults, n)
            },
            presetShort: function (n, q, o) {
                this.components[n] = function (p) {
                    return m(this, k(p, {
                        component: q,
                        preset: o === false ? e : n
                    }), arguments)
                }
            }
        };
    g.mobiscroll.classes.Base = function (p, q) {
            var o, w, x, t, u, r, n = g.mobiscroll,
                v = this;
            v.settings = {};
            v._presetLoad = function () {};
            v._init = function (s) {
                    x = v.settings;
                    k(q, s);
                    if (v._hasDef) {
                        r = n.defaults
                    }
                    k(x, v._defaults, r, q);
                    if (v._hasTheme) {
                        u = x.theme;
                        if (u == "auto" || !u) {
                            u = n.autoTheme
                        }
                        if (u == "default") {
                            u = "mobiscroll"
                        }
                        q.theme = u;
                        t = n.themes[v._class][u]
                    }
                    if (v._hasLang) {
                        o = n.i18n[x.lang]
                    }
                    if (v._hasTheme) {
                        v.trigger("onThemeLoad", [o, q])
                    }
                    k(x, t, o, r, q);
                    if (v._hasPreset) {
                        v._presetLoad(x);
                        w = n.presets[v._class][x.preset];
                        if (w) {
                            w = w.call(p, v);
                            k(x, w, q)
                        }
                    }
                };
            v._destroy = function () {
                    v.trigger("onDestroy", []);
                    delete a[p.id];
                    v = null
                };
            v.trigger = function (z, y) {
                    var s;
                    y.push(v);
                    g.each([r, t, w, q], function (B, A) {
                        if (A && A[z]) {
                            s = A[z].apply(p, y)
                        }
                    });
                    return s
                };
            v.option = function (s, y) {
                    var z = {};
                    if (typeof s === "object") {
                        z = s
                    } else {
                        z[s] = y
                    }
                    v.init(z)
                };
            v.getInst = function () {
                    return v
                };
            q = q || {};
            if (!p.id) {
                    p.id = "mobiscroll" + (++d)
                }
            a[p.id] = v
        }
})(jQuery);
(function (f, i, n, h) {
    var c, s, o = f.mobiscroll,
        d = o.instances,
        a = o.util,
        q = a.jsPrefix,
        l = a.has3d,
        b = a.getCoord,
        p = a.constrain,
        m = a.isString,
        g = /android [1-3]/i.test(navigator.userAgent),
        k = /(iphone|ipod|ipad).* os 8_/i.test(navigator.userAgent),
        r = "webkitAnimationEnd animationend",
        j = function () {},
        e = function (t) {
            t.preventDefault()
        };
    o.classes.Frame = function (ab, ac, B) {
            var K, y, z, Y, T, G, x, t, A, J, N, W, af, D, U, I, M, P, ad, X, C, w, ae, u, S = this,
                R = f(ab),
                F = [],
                O = {};

            function E(ag) {
                    if (N) {
                        N.removeClass("dwb-a")
                    }
                    N = f(this);
                    if (!N.hasClass("dwb-d") && !N.hasClass("dwb-nhl")) {
                        N.addClass("dwb-a")
                    }
                    if (ag.type === "mousedown") {
                        f(n).on("mouseup", H)
                    }
                }
            function H(ag) {
                    if (N) {
                        N.removeClass("dwb-a");
                        N = null
                    }
                    if (ag.type === "mouseup") {
                        f(n).off("mouseup", H)
                    }
                }
            function Z(ag) {
                    if (ag.keyCode == 13) {
                        S.select()
                    } else {
                        if (ag.keyCode == 27) {
                            S.cancel()
                        }
                    }
                }
            function V(ag) {
                    if (!ag) {
                        x.focus()
                    }
                    S.ariaMessage(X.ariaMessage)
                }
            function aa(ah) {
                    var ak, aj, ai, ag = X.focusOnClose;
                    Y.remove();
                    if (c && !ah) {
                        setTimeout(function () {
                            if (ag === h || ag === true) {
                                s = true;
                                ak = c[0];
                                ai = ak.type;
                                aj = ak.value;
                                try {
                                    ak.type = "button"
                                } catch (al) {}
                                c.focus();
                                ak.type = ai;
                                ak.value = aj
                            } else {
                                if (ag) {
                                    if (d[f(ag).attr("id")]) {
                                        o.tapped = false
                                    }
                                    f(ag).focus()
                                }
                            }
                        }, 200)
                    }
                    S._isVisible = false;
                    af("onHide", [])
                }
            function v(ag) {
                    clearTimeout(O[ag.type]);
                    O[ag.type] = setTimeout(function () {
                        var ah = ag.type == "scroll";
                        if (ah && !C) {
                            return
                        }
                        S.position(!ah)
                    }, 200)
                }
            function L(ag) {
                    if (!x[0].contains(ag.target)) {
                        x.focus()
                    }
                }
            function Q(ah, ag) {
                    if (!o.tapped) {
                        if (ah) {
                            ah()
                        }
                        if (f(n.activeElement).is("input,textarea")) {
                            f(n.activeElement).blur()
                        }
                        c = ag;
                        S.show()
                    }
                    setTimeout(function () {
                        s = false
                    }, 300)
                }
            o.classes.Base.call(this, ab, ac, true);
            S.position = function (aF) {
                    var aq, az, au, an, ar, aC, ax, av, aA, ai, aB, ag, aD, aj, aE, ay, aH = 0,
                        am = 0,
                        ao = {},
                        aG = Math.min(t[0].innerWidth || t.innerWidth(), G.width()),
                        ak = t[0].innerHeight || t.innerHeight();
                    if ((ae === aG && u === ak && aF) || ad) {
                            return
                        }
                    if (S._isFullScreen || /top|bottom/.test(X.display)) {
                            x.width(aG)
                        }
                    if (af("onPosition", [Y, aG, ak]) === false || !U) {
                            return
                        }
                    aE = t.scrollLeft();
                    ay = t.scrollTop();
                    an = X.anchor === h ? R : f(X.anchor);
                    if (S._isLiquid && X.layout !== "liquid") {
                            if (aG < 400) {
                                Y.addClass("dw-liq")
                            } else {
                                Y.removeClass("dw-liq")
                            }
                        }
                    if (!S._isFullScreen && /modal|bubble/.test(X.display)) {
                            A.width("");
                            f(".mbsc-w-p", Y).each(function () {
                                aq = f(this).outerWidth(true);
                                aH += aq;
                                am = (aq > am) ? aq : am
                            });
                            aq = aH > aG ? am : aH;
                            A.width(aq).css("white-space", aH > aG ? "" : "nowrap")
                        }
                    I = S._isFullScreen ? aG : x.outerWidth();
                    M = S._isFullScreen ? ak : x.outerHeight(true);
                    C = M <= ak && I <= aG;
                    S.scrollLock = C;
                    if (X.display == "modal") {
                            az = Math.max(0, aE + (aG - I) / 2);
                            au = ay + (ak - M) / 2
                        } else {
                            if (X.display == "bubble") {
                                aj = true;
                                ai = f(".dw-arrw-i", Y);
                                ax = an.offset();
                                av = Math.abs(y.offset().top - ax.top);
                                aA = Math.abs(y.offset().left - ax.left);
                                ar = an.outerWidth();
                                aC = an.outerHeight();
                                az = p(aA - (x.outerWidth(true) - ar) / 2, aE + 3, aE + aG - I - 3);
                                au = av - M;
                                if ((au < ay) || (av > ay + ak)) {
                                    x.removeClass("dw-bubble-top").addClass("dw-bubble-bottom");
                                    au = av + aC
                                } else {
                                    x.removeClass("dw-bubble-bottom").addClass("dw-bubble-top")
                                }
                                aB = ai.outerWidth();
                                ag = p(aA + ar / 2 - (az + (I - aB) / 2), 0, aB);
                                f(".dw-arr", Y).css({
                                    left: ag
                                })
                            } else {
                                az = aE;
                                if (X.display == "top") {
                                    au = ay
                                } else {
                                    if (X.display == "bottom") {
                                        au = ay + ak - M
                                    }
                                }
                            }
                        }
                    au = au < 0 ? 0 : au;
                    ao.top = au;
                    ao.left = az;
                    x.css(ao);
                    G.height(0);
                    aD = Math.max(au + M, X.context == "body" ? f(n).height() : y[0].scrollHeight);
                    G.css({
                            height: aD
                        });
                    if (aj && ((au + M > ay + ak) || (av > ay + ak))) {
                            ad = true;
                            setTimeout(function () {
                                ad = false
                            }, 300);
                            t.scrollTop(Math.min(au + M - ak, aD - ak))
                        }
                    ae = aG;
                    u = ak
                };
            S.attachShow = function (ag, ah) {
                    F.push({
                        readOnly: ag.prop("readonly"),
                        el: ag
                    });
                    if (X.display !== "inline") {
                        if (w && ag.is("input")) {
                            ag.prop("readonly", true).on("mousedown.dw", function (ai) {
                                ai.preventDefault()
                            })
                        }
                        if (X.showOnFocus) {
                            ag.on("focus.dw", function () {
                                if (!s) {
                                    Q(ah, ag)
                                }
                            })
                        }
                        if (X.showOnTap) {
                            ag.on("keydown.dw", function (ai) {
                                if (ai.keyCode == 32 || ai.keyCode == 13) {
                                    ai.preventDefault();
                                    ai.stopPropagation();
                                    Q(ah, ag)
                                }
                            });
                            S.tap(ag, function () {
                                Q(ah, ag)
                            })
                        }
                    }
                };
            S.select = function () {
                    if (!U || S.hide(false, "set") !== false) {
                        S._fillValue();
                        af("onSelect", [S._value])
                    }
                };
            S.cancel = function () {
                    if (!U || S.hide(false, "cancel") !== false) {
                        af("onCancel", [S._value])
                    }
                };
            S.clear = function () {
                    af("onClear", [Y]);
                    if (U && !S.live) {
                        S.hide(false, "clear")
                    }
                    S.setVal(null, true)
                };
            S.enable = function () {
                    X.disabled = false;
                    if (S._isInput) {
                        R.prop("disabled", false)
                    }
                };
            S.disable = function () {
                    X.disabled = true;
                    if (S._isInput) {
                        R.prop("disabled", true)
                    }
                };
            S.show = function (ah, ag) {
                    var ai;
                    if (X.disabled || S._isVisible) {
                        return
                    }
                    if (W !== false) {
                        if (X.display == "top") {
                            W = "slidedown"
                        }
                        if (X.display == "bottom") {
                            W = "slideup"
                        }
                    }
                    S._readValue();
                    af("onBeforeShow", []);
                    ai = '<div lang="' + X.lang + '" class="mbsc-' + X.theme + (X.baseTheme ? " mbsc-" + X.baseTheme : "") + " dw-" + X.display + " " + (X.cssClass || "") + (S._isLiquid ? " dw-liq" : "") + (g ? " mbsc-old" : "") + (D ? "" : " dw-nobtn") + '"><div class="dw-persp">' + (U ? '<div class="dwo"></div>' : "") + "<div" + (U ? ' role="dialog" tabindex="-1"' : "") + ' class="dw' + (X.rtl ? " dw-rtl" : " dw-ltr") + '">' + (X.display === "bubble" ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : "") + '<div class="dwwr"><div aria-live="assertive" class="dw-aria dw-hidden"></div>' + (X.headerText ? '<div class="dwv">' + (m(X.headerText) ? X.headerText : "") + "</div>" : "") + '<div class="dwcc">';
                    ai += S._generateContent();
                    ai += "</div>";
                    if (D) {
                        ai += '<div class="dwbc">';
                        f.each(J, function (ak, aj) {
                            aj = m(aj) ? S.buttons[aj] : aj;
                            if (aj.handler === "set") {
                                aj.parentClass = "dwb-s"
                            }
                            if (aj.handler === "cancel") {
                                aj.parentClass = "dwb-c"
                            }
                            aj.handler = m(aj.handler) ? S.handlers[aj.handler] : aj.handler;
                            ai += "<div" + (X.btnWidth ? ' style="width:' + (100 / J.length) + '%"' : "") + ' class="dwbw ' + (aj.parentClass || "") + '"><div tabindex="0" role="button" class="dwb' + ak + " dwb-e " + (aj.cssClass === h ? X.btnClass : aj.cssClass) + (aj.icon ? " mbsc-ic mbsc-ic-" + aj.icon : "") + '">' + (aj.text || "") + "</div></div>"
                        });
                        ai += "</div>"
                    }
                    ai += "</div></div></div></div>";
                    Y = f(ai);
                    G = f(".dw-persp", Y);
                    T = f(".dwo", Y);
                    A = f(".dwwr", Y);
                    z = f(".dwv", Y);
                    x = f(".dw", Y);
                    K = f(".dw-aria", Y);
                    S._markup = Y;
                    S._header = z;
                    S._isVisible = true;
                    P = "orientationchange resize";
                    S._markupReady(Y);
                    af("onMarkupReady", [Y]);
                    if (U) {
                        f(i).on("keydown", Z);
                        if (X.scrollLock) {
                            Y.on("touchmove mousewheel wheel", function (aj) {
                                if (C) {
                                    aj.preventDefault()
                                }
                            })
                        }
                        if (q !== "Moz") {
                            f("input,select,button", y).each(function () {
                                if (!this.disabled) {
                                    f(this).addClass("dwtd").prop("disabled", true)
                                }
                            })
                        }
                        P += " scroll";
                        o.activeInstance = S;
                        Y.appendTo(y);
                        if (l && W && !ah) {
                            Y.addClass("dw-in dw-trans").on(r, function () {
                                Y.off(r).removeClass("dw-in dw-trans").find(".dw").removeClass("dw-" + W);
                                V(ag)
                            }).find(".dw").addClass("dw-" + W)
                        }
                    } else {
                        if (R.is("div") && !S._hasContent) {
                            R.html(Y)
                        } else {
                            Y.insertAfter(R)
                        }
                    }
                    af("onMarkupInserted", [Y]);
                    S.position();
                    t.on(P, v).on("focusin", L);
                    Y.on("selectstart mousedown", e).on("click", ".dwb-e", e).on("keydown", ".dwb-e", function (aj) {
                        if (aj.keyCode == 32) {
                            aj.preventDefault();
                            aj.stopPropagation();
                            f(this).click()
                        }
                    }).on("keydown", function (am) {
                        if (am.keyCode == 32) {
                            am.preventDefault()
                        } else {
                            if (am.keyCode == 9) {
                                var al = Y.find('[tabindex="0"]').filter(function () {
                                    return this.offsetWidth > 0 || this.offsetHeight > 0
                                }),
                                    aj = al.index(f(":focus", Y)),
                                    ak = al.length - 1,
                                    an = 0;
                                if (am.shiftKey) {
                                        ak = 0;
                                        an = -1
                                    }
                                if (aj === ak) {
                                        al.eq(an).focus();
                                        am.preventDefault()
                                    }
                            }
                        }
                    });
                    f("input", Y).on("selectstart mousedown", function (aj) {
                        aj.stopPropagation()
                    });
                    setTimeout(function () {
                        f.each(J, function (ak, aj) {
                            S.tap(f(".dwb" + ak, Y), function (al) {
                                aj = m(aj) ? S.buttons[aj] : aj;
                                aj.handler.call(this, al, S)
                            }, true)
                        });
                        if (X.closeOnOverlay) {
                            S.tap(T, function () {
                                S.cancel()
                            })
                        }
                        if (U && !W) {
                            V(ag)
                        }
                        Y.on("touchstart mousedown", ".dwb-e", E).on("touchend", ".dwb-e", H);
                        S._attachEvents(Y)
                    }, 300);
                    af("onShow", [Y, S._tempValue])
                };
            S.hide = function (ag, ah, ai) {
                    if (!S._isVisible || (!ai && !S._isValid && ah == "set") || (!ai && af("onClose", [S._tempValue, ah]) === false)) {
                        return false
                    }
                    if (Y) {
                        if (q !== "Moz") {
                            f(".dwtd", y).each(function () {
                                f(this).prop("disabled", false).removeClass("dwtd")
                            })
                        }
                        if (l && U && W && !ag && !Y.hasClass("dw-trans")) {
                            Y.addClass("dw-out dw-trans").find(".dw").addClass("dw-" + W).on(r, function () {
                                aa(ag)
                            })
                        } else {
                            aa(ag)
                        }
                        t.off(P, v).off("focusin", L)
                    }
                    if (U) {
                        f(i).off("keydown", Z);
                        delete o.activeInstance
                    }
                };
            S.ariaMessage = function (ag) {
                    K.html("");
                    setTimeout(function () {
                        K.html(ag)
                    }, 100)
                };
            S.isVisible = function () {
                    return S._isVisible
                };
            S.setVal = j;
            S._generateContent = j;
            S._attachEvents = j;
            S._readValue = j;
            S._fillValue = j;
            S._markupReady = j;
            S._processSettings = j;
            S._presetLoad = function (ag) {
                    ag.buttons = ag.buttons || (ag.display !== "inline" ? ["set", "cancel"] : []);
                    ag.headerText = ag.headerText === h ? (ag.display !== "inline" ? "{value}" : false) : ag.headerText
                };
            S.tap = function (al, ak, ai) {
                    var ah, ag, aj;
                    if (X.tap) {
                        al.on("touchstart.dw", function (am) {
                            if (ai) {
                                am.preventDefault()
                            }
                            ah = b(am, "X");
                            ag = b(am, "Y");
                            aj = false
                        }).on("touchmove.dw", function (am) {
                            if (Math.abs(b(am, "X") - ah) > 20 || Math.abs(b(am, "Y") - ag) > 20) {
                                aj = true
                            }
                        }).on("touchend.dw", function (an) {
                            var am = this;
                            if (!aj) {
                                an.preventDefault();
                                ak.call(am, an)
                            }
                            o.tapped = true;
                            setTimeout(function () {
                                o.tapped = false
                            }, 500)
                        })
                    }
                    al.on("click.dw", function (am) {
                        if (!o.tapped) {
                            ak.call(this, am)
                        }
                        am.preventDefault()
                    })
                };
            S.destroy = function () {
                    S.hide(true, false, true);
                    f.each(F, function (ah, ag) {
                        ag.el.off(".dw").prop("readonly", ag.readOnly)
                    });
                    S._destroy()
                };
            S.init = function (ag) {
                    S._init(ag);
                    S._isLiquid = (X.layout || (/top|bottom/.test(X.display) ? "liquid" : "")) === "liquid";
                    S._processSettings();
                    R.off(".dw");
                    W = g ? false : X.animate;
                    J = X.buttons || [];
                    U = X.display !== "inline";
                    w = X.showOnFocus || X.showOnTap;
                    t = f(X.context == "body" ? i : X.context);
                    y = f(X.context);
                    S.context = t;
                    S.live = true;
                    f.each(J, function (ai, ah) {
                        if (ah == "ok" || ah == "set" || ah.handler == "set") {
                            S.live = false;
                            return false
                        }
                    });
                    S.buttons.set = {
                        text: X.setText,
                        handler: "set"
                    };
                    S.buttons.cancel = {
                        text: (S.live) ? X.closeText : X.cancelText,
                        handler: "cancel"
                    };
                    S.buttons.clear = {
                        text: X.clearText,
                        handler: "clear"
                    };
                    S._isInput = R.is("input");
                    D = J.length > 0;
                    if (S._isVisible) {
                        S.hide(true, false, true)
                    }
                    af("onInit", []);
                    if (U) {
                        S._readValue();
                        if (!S._hasContent) {
                            S.attachShow(R)
                        }
                    } else {
                        S.show()
                    }
                    R.on("change.dw", function () {
                        if (!S._preventChange) {
                            S.setVal(R.val(), true, false)
                        }
                        S._preventChange = false
                    })
                };
            S.buttons = {};
            S.handlers = {
                    set: S.select,
                    cancel: S.cancel,
                    clear: S.clear
                };
            S._value = null;
            S._isValid = true;
            S._isVisible = false;
            X = S.settings;
            af = S.trigger;
            if (!B) {
                    S.init(ac)
                }
        };
    o.classes.Frame.prototype._defaults = {
            lang: "en",
            setText: "确定",
            selectedText: "Selected",
            closeText: "Close",
            cancelText: "取消",
            clearText: "Clear",
            disabled: false,
            closeOnOverlay: true,
            showOnFocus: false,
            showOnTap: true,
            display: "modal",
            scrollLock: true,
            tap: true,
            btnClass: "dwb",
            btnWidth: true,
            focusOnClose: !k
        };
    o.themes.frame.mobiscroll = {
            rows: 5,
            showLabel: false,
            headerText: false,
            btnWidth: false,
            selectedLineHeight: true,
            selectedLineBorder: 1,
            dateOrder: "MMddyy",
            weekDays: "min",
            checkIcon: "ion-ios7-checkmark-empty",
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
        };
    f(i).on("focus", function () {
            if (c) {
                s = true
            }
        });
    f(n).on("mouseover mouseup mousedown click", function (t) {
            if (o.tapped) {
                t.stopPropagation();
                t.preventDefault();
                return false
            }
        })
})(jQuery, window, document);
(function (i, l, m, f) {
    var g, c = i.mobiscroll,
        h = c.classes,
        j = c.util,
        b = j.jsPrefix,
        k = j.has3d,
        a = j.hasFlex,
        d = j.getCoord,
        n = j.constrain,
        e = j.testTouch;
    c.presetShort("scroller", "Scroller", false);
    h.Scroller = function (ak, am, G) {
            var aj, X, ae, an, aa, af, E, S, ab, t, P, w, J, ah, ao, N, q, U, Y, R, ad = this,
                ac = i(ak),
                Q = {},
                T = {},
                A = {},
                D = [];

            function F(p) {
                    if (e(p, this) && !g && !ab && !X && !H(this)) {
                        p.preventDefault();
                        p.stopPropagation();
                        g = true;
                        ae = af.mode != "clickpick";
                        q = i(".dw-ul", this);
                        u(q);
                        t = Q[U] !== f;
                        ah = t ? M(q) : T[U];
                        P = d(p, "Y");
                        w = new Date();
                        J = P;
                        ag(q, U, ah, 0.001);
                        if (ae) {
                            q.closest(".dwwl").addClass("dwa")
                        }
                        if (p.type === "mousedown") {
                            i(m).on("mousemove", I).on("mouseup", ai)
                        }
                    }
                }
            function I(p) {
                    if (g) {
                        if (ae) {
                            p.preventDefault();
                            p.stopPropagation();
                            J = d(p, "Y");
                            if (Math.abs(J - P) > 3 || t) {
                                ag(q, U, n(ah + (P - J) / an, ao - 1, N + 1));
                                t = true
                            }
                        }
                    }
                }
            function ai(av) {
                    if (g) {
                        var aq = new Date() - w,
                            ay = n(Math.round(ah + (P - J) / an), ao - 1, N + 1),
                            ap = ay,
                            ar, au, at = q.offset().top;
                        av.stopPropagation();
                        g = false;
                        if (av.type === "mouseup") {
                                i(m).off("mousemove", I).off("mouseup", ai)
                            }
                        if (k && aq < 300) {
                                ar = (J - P) / aq;
                                au = (ar * ar) / af.speedUnit;
                                if (J - P < 0) {
                                    au = -au
                                }
                            } else {
                                au = J - P
                            }
                        if (!t) {
                                var aw = Math.floor((J - at) / an),
                                    ax = i(i(".dw-li", q)[aw]),
                                    p = ax.hasClass("dw-v"),
                                    s = ae;
                                aq = 0.1;
                                if (S("onValueTap", [ax]) !== false && p) {
                                        ap = aw
                                    } else {
                                        s = true
                                    }
                                if (s && p) {
                                        ax.addClass("dw-hl");
                                        setTimeout(function () {
                                            ax.removeClass("dw-hl")
                                        }, 100)
                                    }
                                if (!aa && (af.confirmOnTap === true || af.confirmOnTap[U]) && ax.hasClass("dw-sel")) {
                                        ad.select();
                                        return
                                    }
                            } else {
                                ap = n(Math.round(ah - au / an), ao, N);
                                aq = ar ? Math.max(0.1, Math.abs((ap - ay) / ar) * af.timeUnit) : 0.1
                            }
                        if (ae) {
                                x(q, U, ap, 0, aq, true)
                            }
                    }
                }
            function L(p) {
                    X = i(this);
                    if (e(p, this)) {
                        W(p, X.closest(".dwwl"), X.hasClass("dwwbp") ? v : z)
                    }
                    if (p.type === "mousedown") {
                        i(m).on("mouseup", O)
                    }
                }
            function O(p) {
                    X = null;
                    if (ab) {
                        clearInterval(R);
                        ab = false
                    }
                    if (p.type === "mouseup") {
                        i(m).off("mouseup", O)
                    }
                }
            function B(p) {
                    if (p.keyCode == 38) {
                        W(p, i(this), z)
                    } else {
                        if (p.keyCode == 40) {
                            W(p, i(this), v)
                        }
                    }
                }
            function r() {
                    if (ab) {
                        clearInterval(R);
                        ab = false
                    }
                }
            function C(s) {
                    if (!H(this)) {
                        s.preventDefault();
                        s = s.originalEvent || s;
                        var ap = s.deltaY || s.wheelDelta || s.detail,
                            p = i(".dw-ul", this);
                        u(p);
                        ag(p, U, n(((ap < 0 ? -20 : 20) - A[U]) / an, ao - 1, N + 1));
                        clearTimeout(E);
                        E = setTimeout(function () {
                                x(p, U, Math.round(T[U]), ap > 0 ? 1 : 2, 0.1)
                            }, 200)
                    }
                }
            function W(aq, p, ap) {
                    aq.stopPropagation();
                    aq.preventDefault();
                    if (!ab && !H(p) && !p.hasClass("dwa")) {
                        ab = true;
                        var s = p.find(".dw-ul");
                        u(s);
                        clearInterval(R);
                        R = setInterval(function () {
                            ap(s)
                        }, af.delay);
                        ap(s)
                    }
                }
            function H(p) {
                    if (i.isArray(af.readonly)) {
                        var s = i(".dwwl", aj).index(p);
                        return af.readonly[s]
                    }
                    return af.readonly
                }
            function K(ar) {
                    var aq = '<div class="dw-bf">',
                        s = D[ar],
                        p = 1,
                        au = s.labels || [],
                        ap = s.values || [],
                        at = s.keys || ap;
                    i.each(ap, function (aw, av) {
                            if (p % 20 === 0) {
                                aq += '</div><div class="dw-bf">'
                            }
                            aq += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + at[aw] + '"' + (au[aw] ? ' aria-label="' + au[aw] + '"' : "") + ' style="height:' + an + "px;line-height:" + an + 'px;"><div class="dw-i"' + (Y > 1 ? ' style="line-height:' + Math.round(an / Y) + "px;font-size:" + Math.round(an / Y * 0.8) + 'px;"' : "") + ">" + av + "</div></div>";
                            p++
                        });
                    aq += "</div>";
                    return aq
                }
            function u(p) {
                    aa = p.closest(".dwwl").hasClass("dwwms");
                    ao = i(".dw-li", p).index(i(aa ? ".dw-li" : ".dw-v", p).eq(0));
                    N = Math.max(ao, i(".dw-li", p).index(i(aa ? ".dw-li" : ".dw-v", p).eq(-1)) - (aa ? af.rows - (af.mode == "scroller" ? 1 : 3) : 0));
                    U = i(".dw-ul", aj).index(p)
                }
            function o(p) {
                    var s = af.headerText;
                    return s ? (typeof s === "function" ? s.call(ak, p) : s.replace(/\{value\}/i, p)) : ""
                }
            function M(p) {
                    return Math.round(-j.getPosition(p, true) / an)
                }
            function y(s, p) {
                    clearTimeout(Q[p]);
                    delete Q[p];
                    s.closest(".dwwl").removeClass("dwa")
                }
            function ag(ap, p, au, at, ar) {
                    var s = -au * an,
                        aq = ap[0].style;
                    if (s == A[p] && Q[p]) {
                            return
                        }
                    A[p] = s;
                    if (k) {
                            aq[b + "Transition"] = j.prefix + "transform " + (at ? at.toFixed(3) : 0) + "s ease-out";
                            aq[b + "Transform"] = "translate3d(0," + s + "px,0)"
                        } else {
                            aq.top = s + "px"
                        }
                    if (Q[p]) {
                            y(ap, p)
                        }
                    if (at && ar) {
                            ap.closest(".dwwl").addClass("dwa");
                            Q[p] = setTimeout(function () {
                                y(ap, p)
                            }, at * 1000)
                        }
                    T[p] = au
                }
            function V(p, az, s, aB, av) {
                    var ar, ay = i('.dw-li[data-val="' + p + '"]', az),
                        aA = i(".dw-li", az),
                        ax = aA.index(ay),
                        ap = aA.length;
                    if (aB) {
                            u(az)
                        } else {
                            if (!ay.hasClass("dw-v")) {
                                var aw = ay,
                                    au = ay,
                                    at = 0,
                                    aq = 0;
                                while (ax - at >= 0 && !aw.hasClass("dw-v")) {
                                        at++;
                                        aw = aA.eq(ax - at)
                                    }
                                while (ax + aq < ap && !au.hasClass("dw-v")) {
                                        aq++;
                                        au = aA.eq(ax + aq)
                                    }
                                if (((aq < at && aq && s !== 2) || !at || (ax - at < 0) || s == 1) && au.hasClass("dw-v")) {
                                        ay = au;
                                        ax = ax + aq
                                    } else {
                                        ay = aw;
                                        ax = ax - at
                                    }
                            }
                        }
                    ar = ay.hasClass("dw-sel");
                    if (av) {
                            if (!aB) {
                                i(".dw-sel", az).removeAttr("aria-selected");
                                ay.attr("aria-selected", "true")
                            }
                            i(".dw-sel", az).removeClass("dw-sel");
                            ay.addClass("dw-sel")
                        }
                    return {
                            selected: ar,
                            v: aB ? n(ax, ao, N) : ax,
                            val: ay.hasClass("dw-v") ? ay.attr("data-val") : null
                        }
                }
            function al(ar, s, ap, p, aq) {
                    if (S("validate", [aj, s, ar, p]) !== false) {
                        i(".dw-ul", aj).each(function (aw) {
                            var av = i(this),
                                at = av.closest(".dwwl").hasClass("dwwms"),
                                ay = aw == s || s === f,
                                au = V(ad._tempWheelArray[aw], av, p, at, true),
                                ax = au.selected;
                            if (!ax || ay) {
                                    ad._tempWheelArray[aw] = au.val;
                                    ag(av, aw, au.v, ay ? ar : 0.1, ay ? aq : false)
                                }
                        });
                        S("onValidated", []);
                        ad._tempValue = af.formatValue(ad._tempWheelArray, ad);
                        if (ad.live) {
                            ad._hasValue = ap || ad._hasValue;
                            Z(ap, ap, 0, true)
                        }
                        ad._header.html(o(ad._tempValue));
                        if (ap) {
                            S("onChange", [ad._tempValue])
                        }
                    }
                }
            function x(ap, p, at, s, ar, aq) {
                    at = n(at, ao, N);
                    ad._tempWheelArray[p] = i(".dw-li", ap).eq(at).attr("data-val");
                    ag(ap, p, at, ar, aq);
                    setTimeout(function () {
                        al(ar, p, true, s, aq)
                    }, 10)
                }
            function v(p) {
                    var s = T[U] + 1;
                    x(p, U, s > N ? ao : s, 1, 0.1)
                }
            function z(p) {
                    var s = T[U] - 1;
                    x(p, U, s < ao ? N : s, 2, 0.1)
                }
            function Z(aq, ar, ap, s, p) {
                    if (ad._isVisible && !s) {
                        al(ap)
                    }
                    ad._tempValue = af.formatValue(ad._tempWheelArray, ad);
                    if (!p) {
                        ad._wheelArray = ad._tempWheelArray.slice(0);
                        ad._value = ad._hasValue ? ad._tempValue : null
                    }
                    if (aq) {
                        S("onValueFill", [ad._hasValue ? ad._tempValue : "", ar]);
                        if (ad._isInput) {
                            ac.val(ad._hasValue ? ad._tempValue : "")
                        }
                        if (ar) {
                            ad._preventChange = true;
                            ac.change()
                        }
                    }
                }
            h.Frame.call(this, ak, am, true);
            ad.setVal = ad._setVal = function (aq, ap, ar, p, s) {
                    ad._hasValue = aq !== null && aq !== f;
                    ad._tempWheelArray = i.isArray(aq) ? aq.slice(0) : af.parseValue.call(ak, aq, ad) || [];
                    Z(ap, ar === f ? ap : ar, s, false, p)
                };
            ad.getVal = ad._getVal = function (p) {
                    var s = ad._hasValue || p ? ad[p ? "_tempValue" : "_value"] : null;
                    return j.isNumeric(s) ? +s : s
                };
            ad.setArrayVal = ad.setVal;
            ad.getArrayVal = function (p) {
                    return p ? ad._tempWheelArray : ad._wheelArray
                };
            ad.setValue = function (aq, ap, s, p, ar) {
                    ad.setVal(aq, ap, ar, p, s)
                };
            ad.getValue = ad.getArrayVal;
            ad.changeWheel = function (p, ar, ap) {
                    if (aj) {
                        var s = 0,
                            aq = p.length;
                        i.each(af.wheels, function (au, at) {
                                i.each(at, function (aw, av) {
                                    if (i.inArray(s, p) > -1) {
                                        D[s] = av;
                                        i(".dw-ul", aj).eq(s).html(K(s));
                                        aq--;
                                        if (!aq) {
                                            ad.position();
                                            al(ar, f, ap);
                                            return false
                                        }
                                    }
                                    s++
                                });
                                if (!aq) {
                                    return false
                                }
                            })
                    }
                };
            ad.getValidCell = V;
            ad.scroll = ag;
            ad._generateContent = function () {
                    var ap, s = "",
                        p = 0;
                    i.each(af.wheels, function (ar, aq) {
                            s += '<div class="mbsc-w-p dwc' + (af.mode != "scroller" ? " dwpm" : " dwsc") + (af.showLabel ? "" : " dwhl") + '"><div class="dwwc"' + (af.maxWidth ? "" : ' style="max-width:600px;"') + ">" + (a ? "" : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');
                            i.each(aq, function (au, at) {
                                D[p] = at;
                                ap = at.label !== f ? at.label : au;
                                s += "<" + (a ? "div" : "td") + ' class="dwfl" style="' + (af.fixedWidth ? ("width:" + (af.fixedWidth[p] || af.fixedWidth) + "px;") : (af.minWidth ? ("min-width:" + (af.minWidth[p] || af.minWidth) + "px;") : "min-width:" + af.width + "px;") + (af.maxWidth ? ("max-width:" + (af.maxWidth[p] || af.maxWidth) + "px;") : "")) + '"><div class="dwwl dwwl' + p + (at.multiple ? " dwwms" : "") + '">' + (af.mode != "scroller" ? '<div class="dwb-e dwwb dwwbp ' + (af.btnPlusClass || "") + '" style="height:' + an + "px;line-height:" + an + 'px;"><span>+</span></div><div class="dwb-e dwwb dwwbm ' + (af.btnMinusClass || "") + '" style="height:' + an + "px;line-height:" + an + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + ap + '</div><div tabindex="0" aria-live="off" aria-label="' + ap + '" role="listbox" class="dwww"><div class="dww" style="height:' + (af.rows * an) + 'px;"><div class="dw-ul" style="margin-top:' + (at.multiple ? (af.mode == "scroller" ? 0 : an) : af.rows / 2 * an - an / 2) + 'px;">';
                                s += K(p) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' + (af.selectedLineHeight ? ' style="height:' + an + "px;margin-top:-" + (an / 2 + (af.selectedLineBorder || 0)) + 'px;"' : "") + "></div></div>" + (a ? "</div>" : "</td>");
                                p++
                            });
                            s += (a ? "" : "</tr></table>") + "</div></div>"
                        });
                    return s
                };
            ad._attachEvents = function (p) {
                    p.on("keydown", ".dwwl", B).on("keyup", ".dwwl", r).on("touchstart mousedown", ".dwwl", F).on("touchmove", ".dwwl", I).on("touchend", ".dwwl", ai).on("touchstart mousedown", ".dwwb", L).on("touchend", ".dwwb", O);
                    if (af.mousewheel) {
                        p.on("wheel mousewheel", ".dwwl", C)
                    }
                };
            ad._markupReady = function (p) {
                    aj = p;
                    al()
                };
            ad._fillValue = function () {
                    ad._hasValue = true;
                    Z(true, true, 0, true)
                };
            ad._readValue = function () {
                    var p = ac.val() || "";
                    if (p !== "") {
                        ad._hasValue = true
                    }
                    ad._tempWheelArray = ad._hasValue && ad._wheelArray ? ad._wheelArray.slice(0) : af.parseValue.call(ak, p, ad) || [];
                    Z()
                };
            ad._processSettings = function () {
                    af = ad.settings;
                    S = ad.trigger;
                    an = af.height;
                    Y = af.multiline;
                    ad._isLiquid = (af.layout || (/top|bottom/.test(af.display) && af.wheels.length == 1 ? "liquid" : "")) === "liquid";
                    if (af.formatResult) {
                        af.formatValue = af.formatResult
                    }
                    if (Y > 1) {
                        af.cssClass = (af.cssClass || "") + " dw-ml"
                    }
                    if (af.mode != "scroller") {
                        af.rows = Math.max(3, af.rows)
                    }
                };
            ad._selectedValues = {};
            if (!G) {
                    ad.init(am)
                }
        };
    h.Scroller.prototype = {
            _hasDef: true,
            _hasTheme: true,
            _hasLang: true,
            _hasPreset: true,
            _class: "scroller",
            _defaults: i.extend({}, h.Frame.prototype._defaults, {
                minWidth: 80,
                height: 40,
                rows: 3,
                multiline: 1,
                delay: 300,
                readonly: false,
                showLabel: true,
                confirmOnTap: true,
                wheels: [],
                mode: "scroller",
                preset: "",
                speedUnit: 0.0012,
                timeUnit: 0.08,
                formatValue: function (o) {
                    return o.join(" ")
                },
                parseValue: function (t, s) {
                    var u = [],
                        o = [],
                        p = 0,
                        r, q;
                    if (t !== null && t !== f) {
                            u = (t + "").split(" ")
                        }
                    i.each(s.settings.wheels, function (w, v) {
                            i.each(v, function (y, x) {
                                q = x.keys || x.values;
                                r = q[0];
                                i.each(q, function (z, A) {
                                    if (u[p] == A) {
                                        r = A;
                                        return false
                                    }
                                });
                                o.push(r);
                                p++
                            })
                        });
                    return o
                }
            })
        };
    c.themes.scroller = c.themes.frame
})(jQuery, window, document);
(function (b, c) {
    var a = b.mobiscroll;
    a.datetime = {
        defaults: {
            shortYearCutoff: "+10",
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
            amText: "上午",
            pmText: "下午",
            getYear: function (e) {
                return e.getFullYear()
            },
            getMonth: function (e) {
                return e.getMonth()
            },
            getDay: function (e) {
                return e.getDate()
            },
            getDate: function (n, e, l, k, g, j, f) {
                return new Date(n, e, l, k || 0, g || 0, j || 0, f || 0)
            },
            getMaxDayOfMonth: function (e, d) {
                return 32 - new Date(e, d, 32).getDate()
            },
            getWeekNumber: function (f) {
                f = new Date(f);
                f.setHours(0, 0, 0);
                f.setDate(f.getDate() + 4 - (f.getDay() || 7));
                var e = new Date(f.getFullYear(), 0, 1);
                return Math.ceil((((f - e) / 86400000) + 1) / 7)
            }
        },
        formatDate: function (p, e, f) {
            if (!e) {
                return null
            }
            var q = b.extend({}, a.datetime.defaults, f),
                n = function (h) {
                    var i = 0;
                    while (k + 1 < p.length && p.charAt(k + 1) == h) {
                        i++;
                        k++
                    }
                    return i
                },
                j = function (i, r, h) {
                    var s = "" + r;
                    if (n(i)) {
                        while (s.length < h) {
                            s = "0" + s
                        }
                    }
                    return s
                },
                g = function (h, t, r, i) {
                    return (n(h) ? i[t] : r[t])
                },
                k, m, d = "",
                o = false;
            for (k = 0; k < p.length; k++) {
                    if (o) {
                        if (p.charAt(k) == "'" && !n("'")) {
                            o = false
                        } else {
                            d += p.charAt(k)
                        }
                    } else {
                        switch (p.charAt(k)) {
                        case "d":
                            d += j("d", q.getDay(e), 2);
                            break;
                        case "D":
                            d += g("D", e.getDay(), q.dayNamesShort, q.dayNames);
                            break;
                        case "o":
                            d += j("o", (e.getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                            break;
                        case "m":
                            d += j("m", q.getMonth(e) + 1, 2);
                            break;
                        case "M":
                            d += g("M", q.getMonth(e), q.monthNamesShort, q.monthNames);
                            break;
                        case "y":
                            m = q.getYear(e);
                            d += (n("y") ? m : (m % 100 < 10 ? "0" : "") + m % 100);
                            break;
                        case "h":
                            var l = e.getHours();
                            d += j("h", (l > 12 ? (l - 12) : (l === 0 ? 12 : l)), 2);
                            break;
                        case "H":
                            d += j("H", e.getHours(), 2);
                            break;
                        case "i":
                            d += j("i", e.getMinutes(), 2);
                            break;
                        case "s":
                            d += j("s", e.getSeconds(), 2);
                            break;
                        case "a":
                            d += e.getHours() > 11 ? q.pmText : q.amText;
                            break;
                        case "A":
                            d += e.getHours() > 11 ? q.pmText.toUpperCase() : q.amText.toUpperCase();
                            break;
                        case "'":
                            if (n("'")) {
                                d += "'"
                            } else {
                                o = true
                            }
                            break;
                        default:
                            d += p.charAt(k)
                        }
                    }
                }
            return d
        },
        parseDate: function (v, n, x) {
            var k = b.extend({}, a.datetime.defaults, x),
                j = k.defaultValue || new Date();
            if (!v || !n) {
                    return j
                }
            if (n.getTime) {
                    return n
                }
            n = (typeof n == "object" ? n.toString() : n + "");
            var d = k.shortYearCutoff,
                f = k.getYear(j),
                z = k.getMonth(j) + 1,
                t = k.getDay(j),
                i = -1,
                w = j.getHours(),
                o = j.getMinutes(),
                g = 0,
                l = -1,
                r = false,
                m = function (s) {
                    var B = (e + 1 < v.length && v.charAt(e + 1) == s);
                    if (B) {
                        e++
                    }
                    return B
                },
                A = function (B) {
                    m(B);
                    var C = (B == "@" ? 14 : (B == "!" ? 20 : (B == "y" ? 4 : (B == "o" ? 3 : 2)))),
                        D = new RegExp("^\\d{1," + C + "}"),
                        s = n.substr(u).match(D);
                    if (!s) {
                            return 0
                        }
                    u += s[0].length;
                    return parseInt(s[0], 10)
                },
                h = function (C, E, B) {
                    var F = (m(C) ? B : E),
                        D;
                    for (D = 0; D < F.length; D++) {
                            if (n.substr(u, F[D].length).toLowerCase() == F[D].toLowerCase()) {
                                u += F[D].length;
                                return D + 1
                            }
                        }
                    return 0
                },
                q = function () {
                    u++
                },
                u = 0,
                e;
            for (e = 0; e < v.length; e++) {
                    if (r) {
                        if (v.charAt(e) == "'" && !m("'")) {
                            r = false
                        } else {
                            q()
                        }
                    } else {
                        switch (v.charAt(e)) {
                        case "d":
                            t = A("d");
                            break;
                        case "D":
                            h("D", k.dayNamesShort, k.dayNames);
                            break;
                        case "o":
                            i = A("o");
                            break;
                        case "m":
                            z = A("m");
                            break;
                        case "M":
                            z = h("M", k.monthNamesShort, k.monthNames);
                            break;
                        case "y":
                            f = A("y");
                            break;
                        case "H":
                            w = A("H");
                            break;
                        case "h":
                            w = A("h");
                            break;
                        case "i":
                            o = A("i");
                            break;
                        case "s":
                            g = A("s");
                            break;
                        case "a":
                            l = h("a", [k.amText, k.pmText], [k.amText, k.pmText]) - 1;
                            break;
                        case "A":
                            l = h("A", [k.amText, k.pmText], [k.amText, k.pmText]) - 1;
                            break;
                        case "'":
                            if (m("'")) {
                                q()
                            } else {
                                r = true
                            }
                            break;
                        default:
                            q()
                        }
                    }
                }
            if (f < 100) {
                    f += new Date().getFullYear() - new Date().getFullYear() % 100 + (f <= (typeof d != "string" ? d : new Date().getFullYear() % 100 + parseInt(d, 10)) ? 0 : -100)
                }
            if (i > -1) {
                    z = 1;
                    t = i;
                    do {
                        var p = 32 - new Date(f, z - 1, 32).getDate();
                        if (t <= p) {
                            break
                        }
                        z++;
                        t -= p
                    } while (true)
                }
            w = (l == -1) ? w : ((l && w < 12) ? (w + 12) : (!l && w == 12 ? 0 : w));
            var y = k.getDate(f, z - 1, t, w, o, g);
            if (k.getYear(y) != f || k.getMonth(y) + 1 != z || k.getDay(y) != t) {
                    return j
                }
            return y
        }
    };
    a.formatDate = a.datetime.formatDate;
    a.parseDate = a.datetime.parseDate
})(jQuery);
(function (d, f) {
    var b = d.mobiscroll,
        g = b.datetime,
        a = new Date(),
        e = {
            startYear: a.getFullYear() - 100,
            endYear: a.getFullYear() + 1,
            separator: " ",
            dateFormat: "mm/dd/yy",
            dateOrder: "mmddy",
            timeWheels: "hhiiA",
            timeFormat: "hh:ii A",
            dayText: "Day",
            monthText: "Month",
            yearText: "Year",
            hourText: "Hours",
            minuteText: "Minutes",
            ampmText: "&nbsp;",
            secText: "Seconds",
            nowText: "Now"
        },
        c = function (h) {
            var U = d(this),
                av = {},
                u;
            if (U.is("input")) {
                    switch (U.attr("type")) {
                    case "date":
                        u = "yy-mm-dd";
                        break;
                    case "datetime":
                        u = "yy-mm-ddTHH:ii:ssZ";
                        break;
                    case "datetime-local":
                        u = "yy-mm-ddTHH:ii:ss";
                        break;
                    case "month":
                        u = "yy-mm";
                        av.dateOrder = "mmyy";
                        break;
                    case "time":
                        u = "HH:ii:ss";
                        break
                    }
                    var aE = U.attr("min"),
                        w = U.attr("max");
                    if (aE) {
                            av.minDate = g.parseDate(u, aE)
                        }
                    if (w) {
                            av.maxDate = g.parseDate(u, w)
                        }
                }
            var X, W, P, B, q, v, Y, ae, j, ak, am = d.extend({}, h.settings),
                Q = d.extend(h.settings, b.datetime.defaults, e, av, am),
                r = 0,
                aA = [],
                E = [],
                ab = [],
                T = {},
                D = {},
                Z = {
                    y: M,
                    m: an,
                    d: ad,
                    h: L,
                    i: aq,
                    s: H,
                    u: m,
                    a: A
                },
                at = Q.invalid,
                G = Q.valid,
                S = Q.preset,
                l = Q.dateOrder,
                ac = Q.timeWheels,
                aD = l.match(/D/),
                I = ac.match(/a/i),
                ap = ac.match(/h/),
                ai = S == "datetime" ? Q.dateFormat + Q.separator + Q.timeFormat : S == "time" ? Q.timeFormat : Q.dateFormat,
                J = new Date(),
                R = Q.steps || {},
                aj = R.hour || Q.stepHour || 1,
                ag = R.minute || Q.stepMinute || 1,
                af = R.second || Q.stepSecond || 1,
                ay = R.zeroBased,
                t = Q.minDate || new Date(Q.startYear, 0, 1),
                au = Q.maxDate || new Date(Q.endYear, 11, 31, 23, 59, 59),
                F = ay ? 0 : t.getHours() % aj,
                C = ay ? 0 : t.getMinutes() % ag,
                y = ay ? 0 : t.getSeconds() % af,
                aC = z(aj, F, (ap ? 11 : 23)),
                az = z(ag, C, 59),
                ax = z(ag, C, 59);
            u = u || ai;
            if (S.match(/date/i)) {
                    d.each(["y", "m", "d"], function (k, i) {
                        X = l.search(new RegExp(i, "i"));
                        if (X > -1) {
                            ab.push({
                                o: X,
                                v: i
                            })
                        }
                    });
                    ab.sort(function (k, i) {
                        return k.o > i.o ? 1 : -1
                    });
                    d.each(ab, function (o, k) {
                        T[k.v] = o
                    });
                    q = [];
                    for (W = 0; W < 3; W++) {
                        if (W == T.y) {
                            r++;
                            B = [];
                            P = [];
                            v = Q.getYear(t);
                            Y = Q.getYear(au);
                            for (X = v; X <= Y; X++) {
                                P.push(X);
                                B.push((l.match(/yy/i) ? X : (X + "").substr(2, 2)) + (Q.yearSuffix || ""))
                            }
                            x(q, P, B, Q.yearText)
                        } else {
                            if (W == T.m) {
                                r++;
                                B = [];
                                P = [];
                                for (X = 0; X < 12; X++) {
                                    var aF = l.replace(/[dy]/gi, "").replace(/mm/, (X < 9 ? "0" + (X + 1) : X + 1) + (Q.monthSuffix || "")).replace(/m/, X + 1 + (Q.monthSuffix || ""));
                                    P.push(X);
                                    B.push(aF.match(/MM/) ? aF.replace(/MM/, '<span class="dw-mon">' + Q.monthNames[X] + "</span>") : aF.replace(/M/, '<span class="dw-mon">' + Q.monthNamesShort[X] + "</span>"))
                                }
                                x(q, P, B, Q.monthText)
                            } else {
                                if (W == T.d) {
                                    r++;
                                    B = [];
                                    P = [];
                                    for (X = 1; X < 32; X++) {
                                        P.push(X);
                                        B.push((l.match(/dd/i) && X < 10 ? "0" + X : X) + (Q.daySuffix || ""))
                                    }
                                    x(q, P, B, Q.dayText)
                                }
                            }
                        }
                    }
                    E.push(q)
                }
            if (S.match(/time/i)) {
                    ae = true;
                    ab = [];
                    d.each(["h", "i", "s", "a"], function (o, k) {
                        o = ac.search(new RegExp(k, "i"));
                        if (o > -1) {
                            ab.push({
                                o: o,
                                v: k
                            })
                        }
                    });
                    ab.sort(function (k, i) {
                        return k.o > i.o ? 1 : -1
                    });
                    d.each(ab, function (o, k) {
                        T[k.v] = r + o
                    });
                    q = [];
                    for (W = r; W < r + 4; W++) {
                        if (W == T.h) {
                            r++;
                            B = [];
                            P = [];
                            for (X = F; X < (ap ? 12 : 24); X += aj) {
                                P.push(X);
                                B.push(ap && X === 0 ? 12 : ac.match(/hh/i) && X < 10 ? "0" + X : X)
                            }
                            x(q, P, B, Q.hourText)
                        } else {
                            if (W == T.i) {
                                r++;
                                B = [];
                                P = [];
                                for (X = C; X < 60; X += ag) {
                                    P.push(X);
                                    B.push(ac.match(/ii/) && X < 10 ? "0" + X : X)
                                }
                                x(q, P, B, Q.minuteText)
                            } else {
                                if (W == T.s) {
                                    r++;
                                    B = [];
                                    P = [];
                                    for (X = y; X < 60; X += af) {
                                        P.push(X);
                                        B.push(ac.match(/ss/) && X < 10 ? "0" + X : X)
                                    }
                                    x(q, P, B, Q.secText)
                                } else {
                                    if (W == T.a) {
                                        r++;
                                        var K = ac.match(/A/);
                                        x(q, [0, 1], K ? [Q.amText.toUpperCase(), Q.pmText.toUpperCase()] : [Q.amText, Q.pmText], Q.ampmText)
                                    }
                                }
                            }
                        }
                    }
                    E.push(q)
                }
            function ao(p, k, o) {
                    if (T[k] !== f) {
                        return +p[T[k]]
                    }
                    if (D[k] !== f) {
                        return D[k]
                    }
                    if (o !== f) {
                        return o
                    }
                    return Z[k](J)
                }
            function x(p, o, i, s) {
                    p.push({
                        values: i,
                        keys: o,
                        label: s
                    })
                }
            function O(k, o, p, i) {
                    return Math.min(i, Math.floor(k / o) * o + p)
                }
            function M(i) {
                    return Q.getYear(i)
                }
            function an(i) {
                    return Q.getMonth(i)
                }
            function ad(i) {
                    return Q.getDay(i)
                }
            function L(k) {
                    var i = k.getHours();
                    i = ap && i >= 12 ? i - 12 : i;
                    return O(i, aj, F, aC)
                }
            function aq(i) {
                    return O(i.getMinutes(), ag, C, az)
                }
            function H(i) {
                    return O(i.getSeconds(), af, y, ax)
                }
            function m(i) {
                    return i.getMilliseconds()
                }
            function A(i) {
                    return I && i.getHours() > 11 ? 1 : 0
                }
            function aB(s) {
                    if (s === null) {
                        return s
                    }
                    var o = ao(s, "y"),
                        p = ao(s, "m"),
                        k = Math.min(ao(s, "d", 1), Q.getMaxDayOfMonth(o, p)),
                        i = ao(s, "h", 0);
                    return Q.getDate(o, p, k, ao(s, "a", 0) ? i + 12 : i, ao(s, "i", 0), ao(s, "s", 0), ao(s, "u", 0))
                }
            function z(o, k, i) {
                    return Math.floor((i - k) / o) * o + k
                }
            function al(aI, o) {
                    var p, s, k = false,
                        aH = false,
                        i = 0,
                        aJ = 0;
                    t = aB(aG(t));
                    au = aB(aG(au));
                    if (ah(aI)) {
                            return aI
                        }
                    if (aI < t) {
                            aI = t
                        }
                    if (aI > au) {
                            aI = au
                        }
                    p = aI;
                    s = aI;
                    if (o !== 2) {
                            k = ah(p);
                            while (!k && p < au) {
                                p = new Date(p.getTime() + 1000 * 60 * 60 * 24);
                                k = ah(p);
                                i++
                            }
                        }
                    if (o !== 1) {
                            aH = ah(s);
                            while (!aH && s > t) {
                                s = new Date(s.getTime() - 1000 * 60 * 60 * 24);
                                aH = ah(s);
                                aJ++
                            }
                        }
                    if (o === 1 && k) {
                            return p
                        }
                    if (o === 2 && aH) {
                            return s
                        }
                    return aJ <= i && aH ? s : p
                }
            function ah(i) {
                    if (i < t) {
                        return false
                    }
                    if (i > au) {
                        return false
                    }
                    if (V(i, G)) {
                        return true
                    }
                    if (V(i, at)) {
                        return false
                    }
                    return true
                }
            function V(s, p) {
                    var o, k, i;
                    if (p) {
                        for (k = 0; k < p.length; k++) {
                            o = p[k];
                            i = o + "";
                            if (!o.start) {
                                if (o.getTime) {
                                    if (s.getFullYear() == o.getFullYear() && s.getMonth() == o.getMonth() && s.getDate() == o.getDate()) {
                                        return true
                                    }
                                } else {
                                    if (!i.match(/w/i)) {
                                        i = i.split("/");
                                        if (i[1]) {
                                            if ((i[0] - 1) == s.getMonth() && i[1] == s.getDate()) {
                                                return true
                                            }
                                        } else {
                                            if (i[0] == s.getDate()) {
                                                return true
                                            }
                                        }
                                    } else {
                                        i = +i.replace("w", "");
                                        if (i == s.getDay()) {
                                            return true
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return false
                }
            function aa(s, aJ, k, aH, o, aK, i) {
                    var p, aI, aL;
                    if (s) {
                        for (p = 0; p < s.length; p++) {
                            aI = s[p];
                            aL = aI + "";
                            if (!aI.start) {
                                if (aI.getTime) {
                                    if (Q.getYear(aI) == aJ && Q.getMonth(aI) == k) {
                                        aK[Q.getDay(aI) - 1] = i
                                    }
                                } else {
                                    if (!aL.match(/w/i)) {
                                        aL = aL.split("/");
                                        if (aL[1]) {
                                            if (aL[0] - 1 == k) {
                                                aK[aL[1] - 1] = i
                                            }
                                        } else {
                                            aK[aL[0] - 1] = i
                                        }
                                    } else {
                                        aL = +aL.replace("w", "");
                                        for (W = aL - aH; W < o; W += 7) {
                                            if (W >= 0) {
                                                aK[W] = i
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            function aw(k, aX, aK, a3, aI, aR, a4, a7, aO) {
                    var a5, aT, aQ, a2, a1, aN, aL, s, o, aU, aS, aP, aM, a6, p, a0, aZ, aW, aH = {},
                        aY = {
                            h: aj,
                            i: ag,
                            s: af,
                            a: 1
                        },
                        aV = Q.getDate(aI, aR, a4),
                        aJ = ["a", "h", "i", "s"];
                    if (k) {
                            d.each(k, function (a8, a9) {
                                if (a9.start) {
                                    a9.apply = false;
                                    a5 = a9.d;
                                    aT = a5 + "";
                                    aQ = aT.split("/");
                                    if (a5 && ((a5.getTime && aI == Q.getYear(a5) && aR == Q.getMonth(a5) && a4 == Q.getDay(a5)) || (!aT.match(/w/i) && ((aQ[1] && a4 == aQ[1] && aR == aQ[0] - 1) || (!aQ[1] && a4 == aQ[0]))) || (aT.match(/w/i) && aV.getDay() == +aT.replace("w", "")))) {
                                        a9.apply = true;
                                        aH[aV] = true
                                    }
                                }
                            });
                            d.each(k, function (i, a8) {
                                aM = 0;
                                a6 = 0;
                                aS = 0;
                                aP = f;
                                aN = true;
                                aL = true;
                                p = false;
                                if (a8.start && (a8.apply || (!a8.d && !aH[aV]))) {
                                    a2 = a8.start.split(":");
                                    a1 = a8.end.split(":");
                                    for (aU = 0; aU < 3; aU++) {
                                        if (a2[aU] === f) {
                                            a2[aU] = 0
                                        }
                                        if (a1[aU] === f) {
                                            a1[aU] = 59
                                        }
                                        a2[aU] = +a2[aU];
                                        a1[aU] = +a1[aU]
                                    }
                                    a2.unshift(a2[0] > 11 ? 1 : 0);
                                    a1.unshift(a1[0] > 11 ? 1 : 0);
                                    if (ap) {
                                        if (a2[1] >= 12) {
                                            a2[1] = a2[1] - 12
                                        }
                                        if (a1[1] >= 12) {
                                            a1[1] = a1[1] - 12
                                        }
                                    }
                                    for (aU = 0; aU < aX; aU++) {
                                        if (aA[aU] !== f) {
                                            s = O(a2[aU], aY[aJ[aU]], j[aJ[aU]], ak[aJ[aU]]);
                                            o = O(a1[aU], aY[aJ[aU]], j[aJ[aU]], ak[aJ[aU]]);
                                            a0 = 0;
                                            aZ = 0;
                                            aW = 0;
                                            if (ap && aU == 1) {
                                                a0 = a2[0] ? 12 : 0;
                                                aZ = a1[0] ? 12 : 0;
                                                aW = aA[0] ? 12 : 0
                                            }
                                            if (!aN) {
                                                s = 0
                                            }
                                            if (!aL) {
                                                o = ak[aJ[aU]]
                                            }
                                            if ((aN || aL) && (s + a0 < aA[aU] + aW && aA[aU] + aW < o + aZ)) {
                                                p = true
                                            }
                                            if (aA[aU] != s) {
                                                aN = false
                                            }
                                            if (aA[aU] != o) {
                                                aL = false
                                            }
                                        }
                                    }
                                    if (!aO) {
                                        for (aU = aX + 1; aU < 4; aU++) {
                                            if (a2[aU] > 0) {
                                                aM = aY[aK]
                                            }
                                            if (a1[aU] < ak[aJ[aU]]) {
                                                a6 = aY[aK]
                                            }
                                        }
                                    }
                                    if (!p) {
                                        s = O(a2[aX], aY[aK], j[aK], ak[aK]) + aM;
                                        o = O(a1[aX], aY[aK], j[aK], ak[aK]) - a6;
                                        if (aN) {
                                            aS = ar(a7, s, ak[aK], 0)
                                        }
                                        if (aL) {
                                            aP = ar(a7, o, ak[aK], 1)
                                        }
                                    }
                                    if (aN || aL || p) {
                                        if (aO) {
                                            d(".dw-li", a7).slice(aS, aP).addClass("dw-v")
                                        } else {
                                            d(".dw-li", a7).slice(aS, aP).removeClass("dw-v")
                                        }
                                    }
                                }
                            })
                        }
                }
            function n(k, i) {
                    return d(".dw-li", k).index(d('.dw-li[data-val="' + i + '"]', k))
                }
            function ar(o, k, i, p) {
                    if (k < 0) {
                        return 0
                    }
                    if (k > i) {
                        return d(".dw-li", o).length
                    }
                    return n(o, k) + p
                }
            function aG(k, o) {
                    var i = [];
                    if (k === null || k === f) {
                        return k
                    }
                    d.each(["y", "m", "d", "a", "h", "i", "s", "u"], function (p, s) {
                        if (T[s] !== f) {
                            i[T[s]] = Z[s](k)
                        }
                        if (o) {
                            D[s] = Z[s](k)
                        }
                    });
                    return i
                }
            function N(k) {
                    var s, o, aH, p = [];
                    if (k) {
                        for (s = 0; s < k.length; s++) {
                            o = k[s];
                            if (o.start && o.start.getTime) {
                                aH = new Date(o.start);
                                while (aH <= o.end) {
                                    p.push(new Date(aH.getFullYear(), aH.getMonth(), aH.getDate()));
                                    aH.setDate(aH.getDate() + 1)
                                }
                            } else {
                                p.push(o)
                            }
                        }
                        return p
                    }
                    return k
                }
            h.getVal = function (i) {
                    return h._hasValue || i ? aB(h.getArrayVal(i)) : null
                };
            h.setDate = function (p, o, k, i, s) {
                    h.setArrayVal(aG(p), o, s, i, k)
                };
            h.getDate = h.getVal;
            h.format = ai;
            h.order = T;
            h.handlers.now = function () {
                    h.setDate(new Date(), false, 0.3, true, true)
                };
            h.buttons.now = {
                    text: Q.nowText,
                    handler: "now"
                };
            at = N(at);
            G = N(G);
            j = {
                    y: t.getFullYear(),
                    m: 0,
                    d: 1,
                    h: F,
                    i: C,
                    s: y,
                    a: 0
                };
            ak = {
                    y: au.getFullYear(),
                    m: 11,
                    d: 31,
                    h: aC,
                    i: az,
                    s: ax,
                    a: 1
                };
            return {
                    wheels: E,
                    headerText: Q.headerText ?
                    function () {
                        return g.formatDate(ai, aB(h.getArrayVal(true)), Q)
                    } : false,
                    formatValue: function (i) {
                        return g.formatDate(u, aB(i), Q)
                    },
                    parseValue: function (i) {
                        if (!i) {
                            D = {}
                        }
                        return aG(i ? g.parseDate(u, i, Q) : (Q.defaultValue || new Date()), !! i && !! i.getTime)
                    },
                    validate: function (k, aI, p, s) {
                        var o = al(aB(h.getArrayVal(true)), s),
                            aM = aG(o),
                            aK = ao(aM, "y"),
                            aH = ao(aM, "m"),
                            aL = true,
                            aJ = true;
                        d.each(["y", "m", "d", "a", "h", "i", "s"], function (aV, aS) {
                                if (T[aS] !== f) {
                                    var aR = j[aS],
                                        aU = ak[aS],
                                        aQ = 31,
                                        aN = ao(aM, aS),
                                        aX = d(".dw-ul", k).eq(T[aS]);
                                    if (aS == "d") {
                                            aQ = Q.getMaxDayOfMonth(aK, aH);
                                            aU = aQ;
                                            if (aD) {
                                                d(".dw-li", aX).each(function () {
                                                    var aY = d(this),
                                                        a0 = aY.data("val"),
                                                        i = Q.getDate(aK, aH, a0).getDay(),
                                                        aZ = l.replace(/[my]/gi, "").replace(/dd/, (a0 < 10 ? "0" + a0 : a0) + (Q.daySuffix || "")).replace(/d/, a0 + (Q.daySuffix || ""));
                                                    d(".dw-i", aY).html(aZ.match(/DD/) ? aZ.replace(/DD/, '<span class="dw-day">' + Q.dayNames[i] + "</span>") : aZ.replace(/D/, '<span class="dw-day">' + Q.dayNamesShort[i] + "</span>"))
                                                })
                                            }
                                        }
                                    if (aL && t) {
                                            aR = Z[aS](t)
                                        }
                                    if (aJ && au) {
                                            aU = Z[aS](au)
                                        }
                                    if (aS != "y") {
                                            var aP = n(aX, aR),
                                                aO = n(aX, aU);
                                            d(".dw-li", aX).removeClass("dw-v").slice(aP, aO + 1).addClass("dw-v");
                                            if (aS == "d") {
                                                    d(".dw-li", aX).removeClass("dw-h").slice(aQ).addClass("dw-h")
                                                }
                                        }
                                    if (aN < aR) {
                                            aN = aR
                                        }
                                    if (aN > aU) {
                                            aN = aU
                                        }
                                    if (aL) {
                                            aL = aN == aR
                                        }
                                    if (aJ) {
                                            aJ = aN == aU
                                        }
                                    if (aS == "d") {
                                            var aT = Q.getDate(aK, aH, 1).getDay(),
                                                aW = {};
                                            aa(at, aK, aH, aT, aQ, aW, 1);
                                            aa(G, aK, aH, aT, aQ, aW, 0);
                                            d.each(aW, function (aZ, aY) {
                                                    if (aY) {
                                                        d(".dw-li", aX).eq(aZ).removeClass("dw-v")
                                                    }
                                                })
                                        }
                                }
                            });
                        if (ae) {
                                d.each(["a", "h", "i", "s"], function (aP, aN) {
                                    var aR = ao(aM, aN),
                                        aQ = ao(aM, "d"),
                                        aO = d(".dw-ul", k).eq(T[aN]);
                                    if (T[aN] !== f) {
                                            aw(at, aP, aN, aM, aK, aH, aQ, aO, 0);
                                            aw(G, aP, aN, aM, aK, aH, aQ, aO, 1);
                                            aA[aP] = +h.getValidCell(aR, aO, s).val
                                        }
                                })
                            }
                        h._tempWheelArray = aM
                    }
                }
        };
    d.each(["date", "time", "datetime"], function (j, h) {
            b.presets.scroller[h] = c
        })
})(jQuery);
(function (a) {
    a.each(["date", "time", "datetime"], function (c, b) {
        a.mobiscroll.presetShort(b)
    })
})(jQuery);
(function (b, d) {
    var a = b.mobiscroll,
        c = {
            invalid: [],
            showInput: true,
            inputClass: ""
        };
    a.presets.scroller.list = function (h) {
            var g = b.extend({}, h.settings),
                A = b.extend(h.settings, c, g),
                G = A.layout || (/top|bottom/.test(A.display) ? "liquid" : ""),
                E = G == "liquid",
                D = A.readonly,
                k = b(this),
                v, y, C = this.id + "_dummy",
                B = 0,
                i = 0,
                t = {},
                r, l = [],
                p = A.wheelArray || x(k),
                H = u(B),
                o = F(p),
                q = f(o, B);

            function m(L, K, P, N) {
                    var w, M = 0;
                    while (M < K) {
                        var O = b(".dwwl" + M, L),
                            s = I(N, M, P);
                        for (w = 0; w < s.length; w++) {
                                b('.dw-li[data-val="' + s[w] + '"]', O).removeClass("dw-v")
                            }
                        M++
                    }
                }
            function I(N, K, O) {
                    var L = 0,
                        P, w = O,
                        s = [];
                    while (L < K) {
                            var M = N[L];
                            for (P in w) {
                                if (w[P].key == M) {
                                    w = w[P].children;
                                    break
                                }
                            }
                            L++
                        }
                    L = 0;
                    while (L < w.length) {
                            if (w[L].invalid) {
                                s.push(w[L].key)
                            }
                            L++
                        }
                    return s
                }
            function J(K, w) {
                    var s = [];
                    while (K) {
                        s[--K] = true
                    }
                    s[w] = false;
                    return s
                }
            function u(w) {
                    var s = [],
                        K;
                    for (K = 0; K < w; K++) {
                            s[K] = A.labels && A.labels[K] ? A.labels[K] : K
                        }
                    return s
                }
            function f(O, s, Q) {
                    var N = 0,
                        L, M, P, R = [
                            []
                    ],
                        K = p;
                    if (s) {
                            for (L = 0; L < s; L++) {
                                if (E) {
                                    R[0][L] = {}
                                } else {
                                    R[L] = [{}]
                                }
                            }
                        }
                    while (N < O.length) {
                            if (E) {
                                R[0][N] = j(K, H[N])
                            } else {
                                R[N] = [j(K, H[N])]
                            }
                            L = 0;
                            P = d;
                            while (L < K.length && P === d) {
                                if (K[L].key == O[N] && ((Q !== d && N <= Q) || Q === d)) {
                                    P = L
                                }
                                L++
                            }
                            if (P !== d && K[P].children) {
                                N++;
                                K = K[P].children
                            } else {
                                if ((M = e(K)) && M.children) {
                                    N++;
                                    K = M.children
                                } else {
                                    return R
                                }
                            }
                        }
                    return R
                }
            function e(L, w) {
                    if (!L) {
                        return false
                    }
                    var s = 0,
                        K;
                    while (s < L.length) {
                            if (!(K = L[s++]).invalid) {
                                return w ? s - 1 : K
                            }
                        }
                    return false
                }
            function j(K, L) {
                    var w = {
                        keys: [],
                        values: [],
                        label: L
                    },
                        s = 0;
                    while (s < K.length) {
                            w.values.push(K[s].value);
                            w.keys.push(K[s].key);
                            s++
                        }
                    return w
                }
            function n(s, w) {
                    b(".dwfl", s).css("display", "").slice(w).hide()
                }
            function F(M) {
                    var K = [],
                        N = M,
                        L, w = true,
                        s = 0;
                    while (w) {
                            L = e(N);
                            K[s++] = L.key;
                            w = L.children;
                            if (w) {
                                N = w
                            }
                        }
                    return K
                }
            function z(K, N) {
                    var Q = [],
                        s = p,
                        O = 0,
                        L = false,
                        w, P, M;
                    if (K[O] !== d && O <= N) {
                            w = 0;
                            P = K[O];
                            M = d;
                            while (w < s.length && M === d) {
                                if (s[w].key == K[O] && !s[w].invalid) {
                                    M = w
                                }
                                w++
                            }
                        } else {
                            M = e(s, true);
                            P = s[M].key
                        }
                    L = M !== d ? s[M].children : false;
                    Q[O] = P;
                    while (L) {
                            s = s[M].children;
                            O++;
                            L = false;
                            M = d;
                            if (K[O] !== d && O <= N) {
                                w = 0;
                                P = K[O];
                                M = d;
                                while (w < s.length && M === d) {
                                    if (s[w].key == K[O] && !s[w].invalid) {
                                        M = w
                                    }
                                    w++
                                }
                            } else {
                                M = e(s, true);
                                M = M === false ? d : M;
                                P = s[M].key
                            }
                            L = M !== d && e(s[M].children) ? s[M].children : false;
                            Q[O] = P
                        }
                    return {
                            lvl: O + 1,
                            nVector: Q
                        }
                }
            function x(s) {
                    var w = [];
                    B = B > i++ ? B : i;
                    s.children("li").each(function (M) {
                        var P = b(this),
                            Q = P.clone();
                        Q.children("ul,ol").remove();
                        var L = h._processMarkup ? h._processMarkup(Q) : Q.html().replace(/^\s\s*/, "").replace(/\s\s*$/, ""),
                            K = P.attr("data-invalid") ? true : false,
                            O = {
                                key: P.attr("data-val") === d || P.attr("data-val") === null ? M : P.attr("data-val"),
                                value: L,
                                invalid: K,
                                children: null
                            },
                            N = P.children("ul,ol");
                        if (N.length) {
                                O.children = x(N)
                            }
                        w.push(O)
                    });
                    i--;
                    return w
                }
            b("#" + C).remove();
            if (A.showInput) {
                    v = b('<input type="text" id="' + C + '" value="" class="' + A.inputClass + '" placeholder="' + (A.placeholder || "") + '" readonly />').insertBefore(k);
                    A.anchor = v;
                    h.attachShow(v)
                }
            if (!A.wheelArray) {
                    k.hide().closest(".ui-field-contain").trigger("create")
                }
            return {
                    width: 50,
                    wheels: q,
                    layout: G,
                    headerText: false,
                    formatValue: function (s) {
                        if (r === d) {
                            r = z(s, s.length).lvl
                        }
                        return s.slice(0, r).join(" ")
                    },
                    parseValue: function (s) {
                        return s ? (s + "").split(" ") : (A.defaultValue || o).slice(0)
                    },
                    onBeforeShow: function () {
                        var s = h.getArrayVal(true);
                        l = s.slice(0);
                        A.wheels = f(s, B, B);
                        y = true
                    },
                    onValueFill: function (s) {
                        r = d;
                        if (v) {
                            v.val(s)
                        }
                    },
                    onShow: function (s) {
                        b(".dwwl", s).on("mousedown touchstart", function () {
                            clearTimeout(t[b(".dwwl", s).index(this)])
                        })
                    },
                    onDestroy: function () {
                        if (v) {
                            v.remove()
                        }
                        k.show()
                    },
                    validate: function (L, K, O) {
                        var w = [],
                            N = h.getArrayVal(true),
                            M = (K || 0) + 1,
                            s, P;
                        if ((K !== d && l[K] != N[K]) || (K === d && !y)) {
                                A.wheels = f(N, null, K);
                                P = z(N, K === d ? N.length : K);
                                r = P.lvl;
                                for (s = 0; s < N.length; s++) {
                                    N[s] = P.nVector[s] || 0
                                }
                                while (M < P.lvl) {
                                    w.push(M++)
                                }
                                if (w.length) {
                                    A.readonly = J(B, K);
                                    clearTimeout(t[K]);
                                    t[K] = setTimeout(function () {
                                        y = true;
                                        n(L, P.lvl);
                                        l = N.slice(0);
                                        h.changeWheel(w, K === d ? O : 0, K !== d);
                                        A.readonly = D
                                    }, K === d ? 0 : O * 1000);
                                    return false
                                }
                            } else {
                                P = z(N, N.length);
                                r = P.lvl
                            }
                        l = N.slice(0);
                        m(L, P.lvl, p, N);
                        n(L, P.lvl);
                        y = false
                    }
                }
        }
})(jQuery);
(function (c) {
    var b = c.mobiscroll,
        a = b.presets.scroller;
    a.treelist = a.list;
    b.presetShort("list");
    b.presetShort("treelist")
})(jQuery);
(function (a) {
    a.mobiscroll.themes.frame["android-holo-light"] = {
        baseTheme: "android-holo",
        dateOrder: "Mddyy",
        rows: 5,
        minWidth: 76,
        height: 36,
        showLabel: false,
        selectedLineHeight: true,
        selectedLineBorder: 2,
        useShortLabels: true,
        icon: {
            filled: "star3",
            empty: "star"
        },
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down6",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up6"
    };
    a.mobiscroll.themes.listview["android-holo-light"] = {
        baseTheme: "android-holo"
    };
    a.mobiscroll.themes.menustrip["android-holo-light"] = {
        baseTheme: "android-holo"
    }
})(jQuery);
(function (a) {
    a.mobiscroll.i18n.zh = a.extend(a.mobiscroll.i18n.zh, {
        setText: "确定",
        cancelText: "取消",
        clearText: "明确",
        selectedText: "选",
        dateFormat: "yy/mm/dd",
        dateOrder: "yymmdd",
        dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        dayText: "日",
        hourText: "时",
        minuteText: "分",
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        monthText: "月",
        secText: "秒",
        timeFormat: "HH:ii",
        timeWheels: "HHii",
        yearText: "年",
        nowText: "当前",
        pmText: "下午",
        amText: "上午",
        dateText: "日",
        timeText: "时间",
        calendarText: "日历",
        closeText: "关闭",
        fromText: "开始时间",
        toText: "结束时间",
        wholeText: "合计",
        fractionText: "分数",
        unitText: "单位",
        labels: ["年", "月", "日", "小时", "分钟", "秒", ""],
        labelsShort: ["年", "月", "日", "点", "分", "秒", ""],
        startText: "开始",
        stopText: "停止",
        resetText: "重置",
        lapText: "圈",
        hideText: "隐藏",
        backText: "背部",
        undoText: "复原"
    })
})(jQuery);