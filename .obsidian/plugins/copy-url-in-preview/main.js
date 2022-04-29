/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const SUCCESS_TIMEOUT = 1500;
function withTimeout(ms, promise) {
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject(`timed out after ${ms} ms`);
        }, ms);
    });
    return Promise.race([
        promise,
        timeout
    ]);
}
// https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
// option?: https://www.npmjs.com/package/html-to-image
function copyImage(imgSrc) {
    return __awaiter(this, void 0, void 0, function* () {
        const loadImage = () => {
            return new Promise((resolve, reject) => {
                let image = new Image();
                image.crossOrigin = 'anonymous';
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);
                    canvas.toBlob((blob) => {
                        // @ts-ignore
                        const data = new ClipboardItem({ [blob.type]: blob });
                        // @ts-ignore
                        navigator.clipboard.write([data])
                            .then(new obsidian.Notice("Image copied to the clipboard!", SUCCESS_TIMEOUT));
                    });
                    resolve(true);
                };
                image.onerror = () => {
                    fetch(image.src, { 'mode': 'no-cors' })
                        .then(() => reject(true))
                        .catch(() => {
                        new obsidian.Notice("Error, could not copy the image!");
                        reject(false);
                    });
                };
                image.src = imgSrc;
            });
        };
        return withTimeout(5000, loadImage());
    });
}
function onElement(el, event, selector, listener, options) {
    el.on(event, selector, listener, options);
    return () => el.off(event, selector, listener, options);
}
class CopyUrlInPreview extends obsidian.Plugin {
    onload() {
        this.register(onElement(document, "contextmenu", "a.external-link", this.onClick.bind(this)));
        if (obsidian.Platform.isDesktop) {
            this.register(onElement(document, "contextmenu", "img", this.onClick.bind(this)));
        }
    }
    // Android gives a PointerEvent, a child to MouseEvent.
    // Positions are not accurate from PointerEvent.
    // There's also TouchEvent
    // The event has target, path, toEvent (null on Android) for finding the link
    onClick(event) {
        event.preventDefault();
        const target = event.target;
        const imgType = target.localName;
        const menu = new obsidian.Menu(this.app);
        switch (imgType) {
            case 'img':
                const image = target.currentSrc;
                const thisURL = new URL(image);
                const Proto = thisURL.protocol;
                switch (Proto) {
                    case 'app:':
                    case 'data:':
                    case 'http:':
                    case 'https:':
                        menu.addItem((item) => item.setIcon("image-file")
                            .setTitle("Copy image to clipboard")
                            .onClick(() => __awaiter(this, void 0, void 0, function* () {
                            yield copyImage(image)
                                .catch((cors) => __awaiter(this, void 0, void 0, function* () {
                                if (cors == true) {
                                    // console.log('possible CORS violation, falling back to allOrigins proxy');
                                    // https://github.com/gnuns/allOrigins
                                    yield copyImage(`https://api.allorigins.win/raw?url=${encodeURIComponent(image)}`);
                                }
                            }));
                        })));
                        break;
                    default:
                        new obsidian.Notice(`no handler for ${Proto} protocol`);
                        return;
                }
                break;
            case 'a':
                let link = target.href;
                menu.addItem((item) => item.setIcon("link")
                    .setTitle("Copy URL")
                    .onClick(() => {
                    navigator.clipboard.writeText(link);
                    new obsidian.Notice("URL copied to your clipboard", SUCCESS_TIMEOUT);
                }));
                break;
            default:
                new obsidian.Notice("No handler for this image type!");
                return;
        }
        menu.register(onElement(document, "keydown", "*", (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                menu.hide();
            }
        }));
        menu.showAtPosition({ x: event.pageX, y: event.pageY });
        this.app.workspace.trigger("copy-url-in-preview:contextmenu", menu);
    }
}

module.exports = CopyUrlInPreview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbIk5vdGljZSIsIlBsdWdpbiIsIlBsYXRmb3JtIiwiTWVudSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFT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
