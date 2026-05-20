import { C as toDisplayString, S as normalizeClass, _ as openBlock, a as vShow, b as ref, c as Fragment, d as createCommentVNode, f as createElementBlock, g as onMounted, h as nextTick, i as vModelText, l as computed, m as defineComponent, n as createApp, o as withKeys, p as createVNode, r as vModelSelect, s as withModifiers, t as createPinia, u as createBaseVNode, v as renderList, x as unref, y as withDirectives } from "./vue_CxJ_mWdi.js";
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
async function WqxsimModule(moduleArg = {}) {
	var moduleRtn;
	var Module = moduleArg;
	var ENVIRONMENT_IS_WEB = true;
	var ENVIRONMENT_IS_WORKER = false;
	var arguments_ = [];
	var thisProgram = "./this.program";
	var quit_ = (status, toThrow) => {
		throw toThrow;
	};
	var _scriptName = import.meta.url;
	var scriptDirectory = "";
	function locateFile(path) {
		if (Module["locateFile"]) return Module["locateFile"](path, scriptDirectory);
		return scriptDirectory + path;
	}
	var readAsync, readBinary;
	if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
		try {
			scriptDirectory = new URL(".", _scriptName).href;
		} catch {}
		readAsync = async (url) => {
			var response = await fetch(url, { credentials: "same-origin" });
			if (response.ok) return response.arrayBuffer();
			throw new Error(response.status + " : " + response.url);
		};
	}
	var out = console.log.bind(console);
	var err = console.error.bind(console);
	var wasmBinary;
	var ABORT = false;
	var EXITSTATUS;
	var readyPromiseResolve, readyPromiseReject;
	var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
	var HEAP64, HEAPU64;
	var runtimeInitialized = false;
	function updateMemoryViews() {
		var b = wasmMemory.buffer;
		HEAP8 = new Int8Array(b);
		HEAP16 = new Int16Array(b);
		HEAPU8 = new Uint8Array(b);
		HEAPU16 = new Uint16Array(b);
		HEAP32 = new Int32Array(b);
		HEAPU32 = new Uint32Array(b);
		HEAPF32 = new Float32Array(b);
		HEAPF64 = new Float64Array(b);
		HEAP64 = new BigInt64Array(b);
		HEAPU64 = new BigUint64Array(b);
	}
	function preRun() {
		if (Module["preRun"]) {
			if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
			while (Module["preRun"].length) addOnPreRun(Module["preRun"].shift());
		}
		callRuntimeCallbacks(onPreRuns);
	}
	function initRuntime() {
		runtimeInitialized = true;
		if (!Module["noFSInit"] && !FS.initialized) FS.init();
		TTY.init();
		wasmExports["Vf"]();
		FS.ignorePermissions = false;
	}
	function preMain() {}
	function postRun() {
		if (Module["postRun"]) {
			if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
			while (Module["postRun"].length) addOnPostRun(Module["postRun"].shift());
		}
		callRuntimeCallbacks(onPostRuns);
	}
	function abort(what) {
		Module["onAbort"]?.(what);
		what = "Aborted(" + what + ")";
		err(what);
		ABORT = true;
		what += ". Build with -sASSERTIONS for more info.";
		var e = new WebAssembly.RuntimeError(what);
		readyPromiseReject?.(e);
		throw e;
	}
	var wasmBinaryFile;
	function findWasmBinary() {
		if (Module["locateFile"]) return locateFile("wqxsim.wasm");
		return new URL("" + new URL("wqxsim__p6iXkzd.wasm", import.meta.url).href, "" + import.meta.url).href;
	}
	function getBinarySync(file) {
		if (file == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
		if (readBinary) return readBinary(file);
		throw "both async and sync fetching of the wasm failed";
	}
	async function getWasmBinary(binaryFile) {
		if (!wasmBinary) try {
			var response = await readAsync(binaryFile);
			return new Uint8Array(response);
		} catch {}
		return getBinarySync(binaryFile);
	}
	async function instantiateArrayBuffer(binaryFile, imports) {
		try {
			var binary = await getWasmBinary(binaryFile);
			return await WebAssembly.instantiate(binary, imports);
		} catch (reason) {
			err(`failed to asynchronously prepare wasm: ${reason}`);
			abort(reason);
		}
	}
	async function instantiateAsync(binary, binaryFile, imports) {
		if (!binary) try {
			var response = fetch(binaryFile, { credentials: "same-origin" });
			return await WebAssembly.instantiateStreaming(response, imports);
		} catch (reason) {
			err(`wasm streaming compile failed: ${reason}`);
			err("falling back to ArrayBuffer instantiation");
		}
		return instantiateArrayBuffer(binaryFile, imports);
	}
	function getWasmImports() {
		return { a: wasmImports };
	}
	async function createWasm() {
		function receiveInstance(instance, module) {
			wasmExports = instance.exports;
			wasmExports = Asyncify.instrumentWasmExports(wasmExports);
			assignWasmExports(wasmExports);
			updateMemoryViews();
			return wasmExports;
		}
		function receiveInstantiationResult(result$1) {
			return receiveInstance(result$1["instance"]);
		}
		var info = getWasmImports();
		if (Module["instantiateWasm"]) return new Promise((resolve, reject) => {
			Module["instantiateWasm"](info, (inst, mod) => {
				resolve(receiveInstance(inst, mod));
			});
		});
		wasmBinaryFile ??= findWasmBinary();
		var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
		return receiveInstantiationResult(result);
	}
	class ExitStatus {
		name = "ExitStatus";
		constructor(status) {
			this.message = `Program terminated with exit(${status})`;
			this.status = status;
		}
	}
	var callRuntimeCallbacks = (callbacks) => {
		while (callbacks.length > 0) callbacks.shift()(Module);
	};
	var onPostRuns = [];
	var addOnPostRun = (cb) => onPostRuns.push(cb);
	var onPreRuns = [];
	var addOnPreRun = (cb) => onPreRuns.push(cb);
	var dynCalls = {};
	var dynCallLegacy = (sig, ptr, args) => {
		sig = sig.replace(/p/g, "i");
		var f = dynCalls[sig];
		return f(ptr, ...args);
	};
	var dynCall = (sig, ptr, args = [], promising = false) => {
		var rtn = dynCallLegacy(sig, ptr, args);
		function convert(rtn$1) {
			return rtn$1;
		}
		return convert(rtn);
	};
	var noExitRuntime = true;
	function setValue(ptr, value, type = "i8") {
		if (type.endsWith("*")) type = "*";
		switch (type) {
			case "i1":
				HEAP8[ptr] = value;
				break;
			case "i8":
				HEAP8[ptr] = value;
				break;
			case "i16":
				HEAP16[ptr >> 1] = value;
				break;
			case "i32":
				HEAP32[ptr >> 2] = value;
				break;
			case "i64":
				HEAP64[ptr >> 3] = BigInt(value);
				break;
			case "float":
				HEAPF32[ptr >> 2] = value;
				break;
			case "double":
				HEAPF64[ptr >> 3] = value;
				break;
			case "*":
				HEAPU32[ptr >> 2] = value;
				break;
			default: abort(`invalid type for setValue: ${type}`);
		}
	}
	var stackRestore = (val) => __emscripten_stack_restore(val);
	var stackSave = () => _emscripten_stack_get_current();
	var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
	var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
		var maxIdx = idx + maxBytesToRead;
		if (ignoreNul) return maxIdx;
		while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
		return idx;
	};
	var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
		var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
		if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
		var str = "";
		while (idx < endPtr) {
			var u0 = heapOrArray[idx++];
			if (!(u0 & 128)) {
				str += String.fromCharCode(u0);
				continue;
			}
			var u1 = heapOrArray[idx++] & 63;
			if ((u0 & 224) == 192) {
				str += String.fromCharCode((u0 & 31) << 6 | u1);
				continue;
			}
			var u2 = heapOrArray[idx++] & 63;
			if ((u0 & 240) == 224) u0 = (u0 & 15) << 12 | u1 << 6 | u2;
			else u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
			if (u0 < 65536) str += String.fromCharCode(u0);
			else {
				var ch = u0 - 65536;
				str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
			}
		}
		return str;
	};
	var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
	var ___assert_fail = (condition, filename, line, func) => abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [
		filename ? UTF8ToString(filename) : "unknown filename",
		line,
		func ? UTF8ToString(func) : "unknown function"
	]);
	class ExceptionInfo {
		constructor(excPtr) {
			this.excPtr = excPtr;
			this.ptr = excPtr - 24;
		}
		set_type(type) {
			HEAPU32[this.ptr + 4 >> 2] = type;
		}
		get_type() {
			return HEAPU32[this.ptr + 4 >> 2];
		}
		set_destructor(destructor) {
			HEAPU32[this.ptr + 8 >> 2] = destructor;
		}
		get_destructor() {
			return HEAPU32[this.ptr + 8 >> 2];
		}
		set_caught(caught) {
			caught = caught ? 1 : 0;
			HEAP8[this.ptr + 12] = caught;
		}
		get_caught() {
			return HEAP8[this.ptr + 12] != 0;
		}
		set_rethrown(rethrown) {
			rethrown = rethrown ? 1 : 0;
			HEAP8[this.ptr + 13] = rethrown;
		}
		get_rethrown() {
			return HEAP8[this.ptr + 13] != 0;
		}
		init(type, destructor) {
			this.set_adjusted_ptr(0);
			this.set_type(type);
			this.set_destructor(destructor);
		}
		set_adjusted_ptr(adjustedPtr) {
			HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
		}
		get_adjusted_ptr() {
			return HEAPU32[this.ptr + 16 >> 2];
		}
	}
	var exceptionLast = 0;
	var uncaughtExceptionCount = 0;
	var ___cxa_throw = (ptr, type, destructor) => {
		new ExceptionInfo(ptr).init(type, destructor);
		exceptionLast = ptr;
		uncaughtExceptionCount++;
		throw exceptionLast;
	};
	var syscallGetVarargI = () => {
		var ret = HEAP32[+SYSCALLS.varargs >> 2];
		SYSCALLS.varargs += 4;
		return ret;
	};
	var syscallGetVarargP = syscallGetVarargI;
	var PATH = {
		isAbs: (path) => path.charAt(0) === "/",
		splitPath: (filename) => {
			return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(filename).slice(1);
		},
		normalizeArray: (parts, allowAboveRoot) => {
			var up = 0;
			for (var i$1 = parts.length - 1; i$1 >= 0; i$1--) {
				var last = parts[i$1];
				if (last === ".") parts.splice(i$1, 1);
				else if (last === "..") {
					parts.splice(i$1, 1);
					up++;
				} else if (up) {
					parts.splice(i$1, 1);
					up--;
				}
			}
			if (allowAboveRoot) for (; up; up--) parts.unshift("..");
			return parts;
		},
		normalize: (path) => {
			var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
			path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
			if (!path && !isAbsolute) path = ".";
			if (path && trailingSlash) path += "/";
			return (isAbsolute ? "/" : "") + path;
		},
		dirname: (path) => {
			var result = PATH.splitPath(path), root = result[0], dir = result[1];
			if (!root && !dir) return ".";
			if (dir) dir = dir.slice(0, -1);
			return root + dir;
		},
		basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
		join: (...paths) => PATH.normalize(paths.join("/")),
		join2: (l, r) => PATH.normalize(l + "/" + r)
	};
	var initRandomFill = () => (view) => crypto.getRandomValues(view);
	var randomFill = (view) => {
		(randomFill = initRandomFill())(view);
	};
	var PATH_FS = {
		resolve: (...args) => {
			var resolvedPath = "", resolvedAbsolute = false;
			for (var i$1 = args.length - 1; i$1 >= -1 && !resolvedAbsolute; i$1--) {
				var path = i$1 >= 0 ? args[i$1] : FS.cwd();
				if (typeof path != "string") throw new TypeError("Arguments to path.resolve must be strings");
				else if (!path) return "";
				resolvedPath = path + "/" + resolvedPath;
				resolvedAbsolute = PATH.isAbs(path);
			}
			resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
			return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
		},
		relative: (from, to) => {
			from = PATH_FS.resolve(from).slice(1);
			to = PATH_FS.resolve(to).slice(1);
			function trim(arr) {
				var start = 0;
				for (; start < arr.length; start++) if (arr[start] !== "") break;
				var end = arr.length - 1;
				for (; end >= 0; end--) if (arr[end] !== "") break;
				if (start > end) return [];
				return arr.slice(start, end - start + 1);
			}
			var fromParts = trim(from.split("/"));
			var toParts = trim(to.split("/"));
			var length = Math.min(fromParts.length, toParts.length);
			var samePartsLength = length;
			for (var i$1 = 0; i$1 < length; i$1++) if (fromParts[i$1] !== toParts[i$1]) {
				samePartsLength = i$1;
				break;
			}
			var outputParts = [];
			for (var i$1 = samePartsLength; i$1 < fromParts.length; i$1++) outputParts.push("..");
			outputParts = outputParts.concat(toParts.slice(samePartsLength));
			return outputParts.join("/");
		}
	};
	var FS_stdin_getChar_buffer = [];
	var lengthBytesUTF8 = (str) => {
		var len = 0;
		for (var i$1 = 0; i$1 < str.length; ++i$1) {
			var c = str.charCodeAt(i$1);
			if (c <= 127) len++;
			else if (c <= 2047) len += 2;
			else if (c >= 55296 && c <= 57343) {
				len += 4;
				++i$1;
			} else len += 3;
		}
		return len;
	};
	var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
		if (!(maxBytesToWrite > 0)) return 0;
		var startIdx = outIdx;
		var endIdx = outIdx + maxBytesToWrite - 1;
		for (var i$1 = 0; i$1 < str.length; ++i$1) {
			var u = str.codePointAt(i$1);
			if (u <= 127) {
				if (outIdx >= endIdx) break;
				heap[outIdx++] = u;
			} else if (u <= 2047) {
				if (outIdx + 1 >= endIdx) break;
				heap[outIdx++] = 192 | u >> 6;
				heap[outIdx++] = 128 | u & 63;
			} else if (u <= 65535) {
				if (outIdx + 2 >= endIdx) break;
				heap[outIdx++] = 224 | u >> 12;
				heap[outIdx++] = 128 | u >> 6 & 63;
				heap[outIdx++] = 128 | u & 63;
			} else {
				if (outIdx + 3 >= endIdx) break;
				heap[outIdx++] = 240 | u >> 18;
				heap[outIdx++] = 128 | u >> 12 & 63;
				heap[outIdx++] = 128 | u >> 6 & 63;
				heap[outIdx++] = 128 | u & 63;
				i$1++;
			}
		}
		heap[outIdx] = 0;
		return outIdx - startIdx;
	};
	var intArrayFromString = (stringy, dontAddNull, length) => {
		var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
		var u8array = new Array(len);
		var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
		if (dontAddNull) u8array.length = numBytesWritten;
		return u8array;
	};
	var FS_stdin_getChar = () => {
		if (!FS_stdin_getChar_buffer.length) {
			var result = null;
			if (globalThis.window?.prompt) {
				result = window.prompt("Input: ");
				if (result !== null) result += "\n";
			}
			if (!result) return null;
			FS_stdin_getChar_buffer = intArrayFromString(result, true);
		}
		return FS_stdin_getChar_buffer.shift();
	};
	var TTY = {
		ttys: [],
		init() {},
		shutdown() {},
		register(dev, ops) {
			TTY.ttys[dev] = {
				input: [],
				output: [],
				ops
			};
			FS.registerDevice(dev, TTY.stream_ops);
		},
		stream_ops: {
			open(stream) {
				var tty = TTY.ttys[stream.node.rdev];
				if (!tty) throw new FS.ErrnoError(43);
				stream.tty = tty;
				stream.seekable = false;
			},
			close(stream) {
				stream.tty.ops.fsync(stream.tty);
			},
			fsync(stream) {
				stream.tty.ops.fsync(stream.tty);
			},
			read(stream, buffer, offset, length, pos) {
				if (!stream.tty || !stream.tty.ops.get_char) throw new FS.ErrnoError(60);
				var bytesRead = 0;
				for (var i$1 = 0; i$1 < length; i$1++) {
					var result;
					try {
						result = stream.tty.ops.get_char(stream.tty);
					} catch (e) {
						throw new FS.ErrnoError(29);
					}
					if (result === void 0 && bytesRead === 0) throw new FS.ErrnoError(6);
					if (result === null || result === void 0) break;
					bytesRead++;
					buffer[offset + i$1] = result;
				}
				if (bytesRead) stream.node.atime = Date.now();
				return bytesRead;
			},
			write(stream, buffer, offset, length, pos) {
				if (!stream.tty || !stream.tty.ops.put_char) throw new FS.ErrnoError(60);
				try {
					for (var i$1 = 0; i$1 < length; i$1++) stream.tty.ops.put_char(stream.tty, buffer[offset + i$1]);
				} catch (e) {
					throw new FS.ErrnoError(29);
				}
				if (length) stream.node.mtime = stream.node.ctime = Date.now();
				return i$1;
			}
		},
		default_tty_ops: {
			get_char(tty) {
				return FS_stdin_getChar();
			},
			put_char(tty, val) {
				if (val === null || val === 10) {
					out(UTF8ArrayToString(tty.output));
					tty.output = [];
				} else if (val != 0) tty.output.push(val);
			},
			fsync(tty) {
				if (tty.output?.length > 0) {
					out(UTF8ArrayToString(tty.output));
					tty.output = [];
				}
			},
			ioctl_tcgets(tty) {
				return {
					c_iflag: 25856,
					c_oflag: 5,
					c_cflag: 191,
					c_lflag: 35387,
					c_cc: [
						3,
						28,
						127,
						21,
						4,
						0,
						1,
						0,
						17,
						19,
						26,
						0,
						18,
						15,
						23,
						22,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0
					]
				};
			},
			ioctl_tcsets(tty, optional_actions, data) {
				return 0;
			},
			ioctl_tiocgwinsz(tty) {
				return [24, 80];
			}
		},
		default_tty1_ops: {
			put_char(tty, val) {
				if (val === null || val === 10) {
					err(UTF8ArrayToString(tty.output));
					tty.output = [];
				} else if (val != 0) tty.output.push(val);
			},
			fsync(tty) {
				if (tty.output?.length > 0) {
					err(UTF8ArrayToString(tty.output));
					tty.output = [];
				}
			}
		}
	};
	var mmapAlloc = (size) => {
		abort();
	};
	var MEMFS = {
		ops_table: null,
		mount(mount) {
			return MEMFS.createNode(null, "/", 16895, 0);
		},
		createNode(parent, name, mode, dev) {
			if (FS.isBlkdev(mode) || FS.isFIFO(mode)) throw new FS.ErrnoError(63);
			MEMFS.ops_table ||= {
				dir: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr,
						lookup: MEMFS.node_ops.lookup,
						mknod: MEMFS.node_ops.mknod,
						rename: MEMFS.node_ops.rename,
						unlink: MEMFS.node_ops.unlink,
						rmdir: MEMFS.node_ops.rmdir,
						readdir: MEMFS.node_ops.readdir,
						symlink: MEMFS.node_ops.symlink
					},
					stream: { llseek: MEMFS.stream_ops.llseek }
				},
				file: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr
					},
					stream: {
						llseek: MEMFS.stream_ops.llseek,
						read: MEMFS.stream_ops.read,
						write: MEMFS.stream_ops.write,
						mmap: MEMFS.stream_ops.mmap,
						msync: MEMFS.stream_ops.msync
					}
				},
				link: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr,
						readlink: MEMFS.node_ops.readlink
					},
					stream: {}
				},
				chrdev: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr
					},
					stream: FS.chrdev_stream_ops
				}
			};
			var node = FS.createNode(parent, name, mode, dev);
			if (FS.isDir(node.mode)) {
				node.node_ops = MEMFS.ops_table.dir.node;
				node.stream_ops = MEMFS.ops_table.dir.stream;
				node.contents = {};
			} else if (FS.isFile(node.mode)) {
				node.node_ops = MEMFS.ops_table.file.node;
				node.stream_ops = MEMFS.ops_table.file.stream;
				node.usedBytes = 0;
				node.contents = null;
			} else if (FS.isLink(node.mode)) {
				node.node_ops = MEMFS.ops_table.link.node;
				node.stream_ops = MEMFS.ops_table.link.stream;
			} else if (FS.isChrdev(node.mode)) {
				node.node_ops = MEMFS.ops_table.chrdev.node;
				node.stream_ops = MEMFS.ops_table.chrdev.stream;
			}
			node.atime = node.mtime = node.ctime = Date.now();
			if (parent) {
				parent.contents[name] = node;
				parent.atime = parent.mtime = parent.ctime = node.atime;
			}
			return node;
		},
		getFileDataAsTypedArray(node) {
			if (!node.contents) return new Uint8Array(0);
			if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
			return new Uint8Array(node.contents);
		},
		expandFileStorage(node, newCapacity) {
			var prevCapacity = node.contents ? node.contents.length : 0;
			if (prevCapacity >= newCapacity) return;
			newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < 1024 * 1024 ? 2 : 1.125) >>> 0);
			if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
			var oldContents = node.contents;
			node.contents = new Uint8Array(newCapacity);
			if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
		},
		resizeFileStorage(node, newSize) {
			if (node.usedBytes == newSize) return;
			if (newSize == 0) {
				node.contents = null;
				node.usedBytes = 0;
			} else {
				var oldContents = node.contents;
				node.contents = new Uint8Array(newSize);
				if (oldContents) node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
				node.usedBytes = newSize;
			}
		},
		node_ops: {
			getattr(node) {
				var attr = {};
				attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
				attr.ino = node.id;
				attr.mode = node.mode;
				attr.nlink = 1;
				attr.uid = 0;
				attr.gid = 0;
				attr.rdev = node.rdev;
				if (FS.isDir(node.mode)) attr.size = 4096;
				else if (FS.isFile(node.mode)) attr.size = node.usedBytes;
				else if (FS.isLink(node.mode)) attr.size = node.link.length;
				else attr.size = 0;
				attr.atime = new Date(node.atime);
				attr.mtime = new Date(node.mtime);
				attr.ctime = new Date(node.ctime);
				attr.blksize = 4096;
				attr.blocks = Math.ceil(attr.size / attr.blksize);
				return attr;
			},
			setattr(node, attr) {
				for (const key of [
					"mode",
					"atime",
					"mtime",
					"ctime"
				]) if (attr[key] != null) node[key] = attr[key];
				if (attr.size !== void 0) MEMFS.resizeFileStorage(node, attr.size);
			},
			lookup(parent, name) {
				if (!MEMFS.doesNotExistError) {
					MEMFS.doesNotExistError = new FS.ErrnoError(44);
					MEMFS.doesNotExistError.stack = "<generic error, no stack>";
				}
				throw MEMFS.doesNotExistError;
			},
			mknod(parent, name, mode, dev) {
				return MEMFS.createNode(parent, name, mode, dev);
			},
			rename(old_node, new_dir, new_name) {
				var new_node;
				try {
					new_node = FS.lookupNode(new_dir, new_name);
				} catch (e) {}
				if (new_node) {
					if (FS.isDir(old_node.mode)) for (var i$1 in new_node.contents) throw new FS.ErrnoError(55);
					FS.hashRemoveNode(new_node);
				}
				delete old_node.parent.contents[old_node.name];
				new_dir.contents[new_name] = old_node;
				old_node.name = new_name;
				new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
			},
			unlink(parent, name) {
				delete parent.contents[name];
				parent.ctime = parent.mtime = Date.now();
			},
			rmdir(parent, name) {
				for (var i$1 in FS.lookupNode(parent, name).contents) throw new FS.ErrnoError(55);
				delete parent.contents[name];
				parent.ctime = parent.mtime = Date.now();
			},
			readdir(node) {
				return [
					".",
					"..",
					...Object.keys(node.contents)
				];
			},
			symlink(parent, newname, oldpath) {
				var node = MEMFS.createNode(parent, newname, 41471, 0);
				node.link = oldpath;
				return node;
			},
			readlink(node) {
				if (!FS.isLink(node.mode)) throw new FS.ErrnoError(28);
				return node.link;
			}
		},
		stream_ops: {
			read(stream, buffer, offset, length, position) {
				var contents = stream.node.contents;
				if (position >= stream.node.usedBytes) return 0;
				var size = Math.min(stream.node.usedBytes - position, length);
				if (size > 8 && contents.subarray) buffer.set(contents.subarray(position, position + size), offset);
				else for (var i$1 = 0; i$1 < size; i$1++) buffer[offset + i$1] = contents[position + i$1];
				return size;
			},
			write(stream, buffer, offset, length, position, canOwn) {
				if (buffer.buffer === HEAP8.buffer) canOwn = false;
				if (!length) return 0;
				var node = stream.node;
				node.mtime = node.ctime = Date.now();
				if (buffer.subarray && (!node.contents || node.contents.subarray)) {
					if (canOwn) {
						node.contents = buffer.subarray(offset, offset + length);
						node.usedBytes = length;
						return length;
					} else if (node.usedBytes === 0 && position === 0) {
						node.contents = buffer.slice(offset, offset + length);
						node.usedBytes = length;
						return length;
					} else if (position + length <= node.usedBytes) {
						node.contents.set(buffer.subarray(offset, offset + length), position);
						return length;
					}
				}
				MEMFS.expandFileStorage(node, position + length);
				if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position);
				else for (var i$1 = 0; i$1 < length; i$1++) node.contents[position + i$1] = buffer[offset + i$1];
				node.usedBytes = Math.max(node.usedBytes, position + length);
				return length;
			},
			llseek(stream, offset, whence) {
				var position = offset;
				if (whence === 1) position += stream.position;
				else if (whence === 2) {
					if (FS.isFile(stream.node.mode)) position += stream.node.usedBytes;
				}
				if (position < 0) throw new FS.ErrnoError(28);
				return position;
			},
			mmap(stream, length, position, prot, flags) {
				if (!FS.isFile(stream.node.mode)) throw new FS.ErrnoError(43);
				var ptr;
				var allocated;
				var contents = stream.node.contents;
				if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
					allocated = false;
					ptr = contents.byteOffset;
				} else {
					allocated = true;
					ptr = mmapAlloc(length);
					if (!ptr) throw new FS.ErrnoError(48);
					if (contents) {
						if (position > 0 || position + length < contents.length) if (contents.subarray) contents = contents.subarray(position, position + length);
						else contents = Array.prototype.slice.call(contents, position, position + length);
						HEAP8.set(contents, ptr);
					}
				}
				return {
					ptr,
					allocated
				};
			},
			msync(stream, buffer, offset, length, mmapFlags) {
				MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
				return 0;
			}
		}
	};
	var FS_modeStringToFlags = (str) => {
		var flags = {
			r: 0,
			"r+": 2,
			w: 577,
			"w+": 578,
			a: 1089,
			"a+": 1090
		}[str];
		if (typeof flags == "undefined") throw new Error(`Unknown file open mode: ${str}`);
		return flags;
	};
	var FS_getMode = (canRead, canWrite) => {
		var mode = 0;
		if (canRead) mode |= 365;
		if (canWrite) mode |= 146;
		return mode;
	};
	var asyncLoad = async (url) => {
		var arrayBuffer = await readAsync(url);
		return new Uint8Array(arrayBuffer);
	};
	var FS_createDataFile = (...args) => FS.createDataFile(...args);
	var getUniqueRunDependency = (id) => id;
	var runDependencies = 0;
	var dependenciesFulfilled = null;
	var removeRunDependency = (id) => {
		runDependencies--;
		Module["monitorRunDependencies"]?.(runDependencies);
		if (runDependencies == 0) {
			if (dependenciesFulfilled) {
				var callback = dependenciesFulfilled;
				dependenciesFulfilled = null;
				callback();
			}
		}
	};
	var addRunDependency = (id) => {
		runDependencies++;
		Module["monitorRunDependencies"]?.(runDependencies);
	};
	var preloadPlugins = [];
	var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
		if (typeof Browser != "undefined") Browser.init();
		for (var plugin of preloadPlugins) if (plugin["canHandle"](fullname)) return plugin["handle"](byteArray, fullname);
		return byteArray;
	};
	var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
		var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
		var dep = getUniqueRunDependency(`cp ${fullname}`);
		addRunDependency(dep);
		try {
			var byteArray = url;
			if (typeof url == "string") byteArray = await asyncLoad(url);
			byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
			preFinish?.();
			if (!dontCreateFile) FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
		} finally {
			removeRunDependency(dep);
		}
	};
	var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
		FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
	};
	var FS = {
		root: null,
		mounts: [],
		devices: {},
		streams: [],
		nextInode: 1,
		nameTable: null,
		currentPath: "/",
		initialized: false,
		ignorePermissions: true,
		filesystems: null,
		syncFSRequests: 0,
		readFiles: {},
		ErrnoError: class {
			name = "ErrnoError";
			constructor(errno) {
				this.errno = errno;
			}
		},
		FSStream: class {
			shared = {};
			get object() {
				return this.node;
			}
			set object(val) {
				this.node = val;
			}
			get isRead() {
				return (this.flags & 2097155) !== 1;
			}
			get isWrite() {
				return (this.flags & 2097155) !== 0;
			}
			get isAppend() {
				return this.flags & 1024;
			}
			get flags() {
				return this.shared.flags;
			}
			set flags(val) {
				this.shared.flags = val;
			}
			get position() {
				return this.shared.position;
			}
			set position(val) {
				this.shared.position = val;
			}
		},
		FSNode: class {
			node_ops = {};
			stream_ops = {};
			readMode = 365;
			writeMode = 146;
			mounted = null;
			constructor(parent, name, mode, rdev) {
				if (!parent) parent = this;
				this.parent = parent;
				this.mount = parent.mount;
				this.id = FS.nextInode++;
				this.name = name;
				this.mode = mode;
				this.rdev = rdev;
				this.atime = this.mtime = this.ctime = Date.now();
			}
			get read() {
				return (this.mode & this.readMode) === this.readMode;
			}
			set read(val) {
				val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
			}
			get write() {
				return (this.mode & this.writeMode) === this.writeMode;
			}
			set write(val) {
				val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
			}
			get isFolder() {
				return FS.isDir(this.mode);
			}
			get isDevice() {
				return FS.isChrdev(this.mode);
			}
		},
		lookupPath(path, opts = {}) {
			if (!path) throw new FS.ErrnoError(44);
			opts.follow_mount ??= true;
			if (!PATH.isAbs(path)) path = FS.cwd() + "/" + path;
			linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
				var parts = path.split("/").filter((p) => !!p);
				var current = FS.root;
				var current_path = "/";
				for (var i$1 = 0; i$1 < parts.length; i$1++) {
					var islast = i$1 === parts.length - 1;
					if (islast && opts.parent) break;
					if (parts[i$1] === ".") continue;
					if (parts[i$1] === "..") {
						current_path = PATH.dirname(current_path);
						if (FS.isRoot(current)) {
							path = current_path + "/" + parts.slice(i$1 + 1).join("/");
							nlinks--;
							continue linkloop;
						} else current = current.parent;
						continue;
					}
					current_path = PATH.join2(current_path, parts[i$1]);
					try {
						current = FS.lookupNode(current, parts[i$1]);
					} catch (e) {
						if (e?.errno === 44 && islast && opts.noent_okay) return { path: current_path };
						throw e;
					}
					if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) current = current.mounted.root;
					if (FS.isLink(current.mode) && (!islast || opts.follow)) {
						if (!current.node_ops.readlink) throw new FS.ErrnoError(52);
						var link = current.node_ops.readlink(current);
						if (!PATH.isAbs(link)) link = PATH.dirname(current_path) + "/" + link;
						path = link + "/" + parts.slice(i$1 + 1).join("/");
						continue linkloop;
					}
				}
				return {
					path: current_path,
					node: current
				};
			}
			throw new FS.ErrnoError(32);
		},
		getPath(node) {
			var path;
			while (true) {
				if (FS.isRoot(node)) {
					var mount = node.mount.mountpoint;
					if (!path) return mount;
					return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
				}
				path = path ? `${node.name}/${path}` : node.name;
				node = node.parent;
			}
		},
		hashName(parentid, name) {
			var hash = 0;
			for (var i$1 = 0; i$1 < name.length; i$1++) hash = (hash << 5) - hash + name.charCodeAt(i$1) | 0;
			return (parentid + hash >>> 0) % FS.nameTable.length;
		},
		hashAddNode(node) {
			var hash = FS.hashName(node.parent.id, node.name);
			node.name_next = FS.nameTable[hash];
			FS.nameTable[hash] = node;
		},
		hashRemoveNode(node) {
			var hash = FS.hashName(node.parent.id, node.name);
			if (FS.nameTable[hash] === node) FS.nameTable[hash] = node.name_next;
			else {
				var current = FS.nameTable[hash];
				while (current) {
					if (current.name_next === node) {
						current.name_next = node.name_next;
						break;
					}
					current = current.name_next;
				}
			}
		},
		lookupNode(parent, name) {
			var errCode = FS.mayLookup(parent);
			if (errCode) throw new FS.ErrnoError(errCode);
			var hash = FS.hashName(parent.id, name);
			for (var node = FS.nameTable[hash]; node; node = node.name_next) {
				var nodeName = node.name;
				if (node.parent.id === parent.id && nodeName === name) return node;
			}
			return FS.lookup(parent, name);
		},
		createNode(parent, name, mode, rdev) {
			var node = new FS.FSNode(parent, name, mode, rdev);
			FS.hashAddNode(node);
			return node;
		},
		destroyNode(node) {
			FS.hashRemoveNode(node);
		},
		isRoot(node) {
			return node === node.parent;
		},
		isMountpoint(node) {
			return !!node.mounted;
		},
		isFile(mode) {
			return (mode & 61440) === 32768;
		},
		isDir(mode) {
			return (mode & 61440) === 16384;
		},
		isLink(mode) {
			return (mode & 61440) === 40960;
		},
		isChrdev(mode) {
			return (mode & 61440) === 8192;
		},
		isBlkdev(mode) {
			return (mode & 61440) === 24576;
		},
		isFIFO(mode) {
			return (mode & 61440) === 4096;
		},
		isSocket(mode) {
			return (mode & 49152) === 49152;
		},
		flagsToPermissionString(flag) {
			var perms = [
				"r",
				"w",
				"rw"
			][flag & 3];
			if (flag & 512) perms += "w";
			return perms;
		},
		nodePermissions(node, perms) {
			if (FS.ignorePermissions) return 0;
			if (perms.includes("r") && !(node.mode & 292)) return 2;
			else if (perms.includes("w") && !(node.mode & 146)) return 2;
			else if (perms.includes("x") && !(node.mode & 73)) return 2;
			return 0;
		},
		mayLookup(dir) {
			if (!FS.isDir(dir.mode)) return 54;
			var errCode = FS.nodePermissions(dir, "x");
			if (errCode) return errCode;
			if (!dir.node_ops.lookup) return 2;
			return 0;
		},
		mayCreate(dir, name) {
			if (!FS.isDir(dir.mode)) return 54;
			try {
				FS.lookupNode(dir, name);
				return 20;
			} catch (e) {}
			return FS.nodePermissions(dir, "wx");
		},
		mayDelete(dir, name, isdir) {
			var node;
			try {
				node = FS.lookupNode(dir, name);
			} catch (e) {
				return e.errno;
			}
			var errCode = FS.nodePermissions(dir, "wx");
			if (errCode) return errCode;
			if (isdir) {
				if (!FS.isDir(node.mode)) return 54;
				if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) return 10;
			} else if (FS.isDir(node.mode)) return 31;
			return 0;
		},
		mayOpen(node, flags) {
			if (!node) return 44;
			if (FS.isLink(node.mode)) return 32;
			else if (FS.isDir(node.mode)) {
				if (FS.flagsToPermissionString(flags) !== "r" || flags & 576) return 31;
			}
			return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
		},
		checkOpExists(op, err$1) {
			if (!op) throw new FS.ErrnoError(err$1);
			return op;
		},
		MAX_OPEN_FDS: 4096,
		nextfd() {
			for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) if (!FS.streams[fd]) return fd;
			throw new FS.ErrnoError(33);
		},
		getStreamChecked(fd) {
			var stream = FS.getStream(fd);
			if (!stream) throw new FS.ErrnoError(8);
			return stream;
		},
		getStream: (fd) => FS.streams[fd],
		createStream(stream, fd = -1) {
			stream = Object.assign(new FS.FSStream(), stream);
			if (fd == -1) fd = FS.nextfd();
			stream.fd = fd;
			FS.streams[fd] = stream;
			return stream;
		},
		closeStream(fd) {
			FS.streams[fd] = null;
		},
		dupStream(origStream, fd = -1) {
			var stream = FS.createStream(origStream, fd);
			stream.stream_ops?.dup?.(stream);
			return stream;
		},
		doSetAttr(stream, node, attr) {
			var setattr = stream?.stream_ops.setattr;
			var arg = setattr ? stream : node;
			setattr ??= node.node_ops.setattr;
			FS.checkOpExists(setattr, 63);
			setattr(arg, attr);
		},
		chrdev_stream_ops: {
			open(stream) {
				stream.stream_ops = FS.getDevice(stream.node.rdev).stream_ops;
				stream.stream_ops.open?.(stream);
			},
			llseek() {
				throw new FS.ErrnoError(70);
			}
		},
		major: (dev) => dev >> 8,
		minor: (dev) => dev & 255,
		makedev: (ma, mi) => ma << 8 | mi,
		registerDevice(dev, ops) {
			FS.devices[dev] = { stream_ops: ops };
		},
		getDevice: (dev) => FS.devices[dev],
		getMounts(mount) {
			var mounts = [];
			var check = [mount];
			while (check.length) {
				var m = check.pop();
				mounts.push(m);
				check.push(...m.mounts);
			}
			return mounts;
		},
		syncfs(populate, callback) {
			if (typeof populate == "function") {
				callback = populate;
				populate = false;
			}
			FS.syncFSRequests++;
			if (FS.syncFSRequests > 1) err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
			var mounts = FS.getMounts(FS.root.mount);
			var completed = 0;
			function doCallback(errCode) {
				FS.syncFSRequests--;
				return callback(errCode);
			}
			function done(errCode) {
				if (errCode) {
					if (!done.errored) {
						done.errored = true;
						return doCallback(errCode);
					}
					return;
				}
				if (++completed >= mounts.length) doCallback(null);
			}
			mounts.forEach((mount) => {
				if (!mount.type.syncfs) return done(null);
				mount.type.syncfs(mount, populate, done);
			});
		},
		mount(type, opts, mountpoint) {
			var root = mountpoint === "/";
			var pseudo = !mountpoint;
			var node;
			if (root && FS.root) throw new FS.ErrnoError(10);
			else if (!root && !pseudo) {
				var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
				mountpoint = lookup.path;
				node = lookup.node;
				if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
				if (!FS.isDir(node.mode)) throw new FS.ErrnoError(54);
			}
			var mount = {
				type,
				opts,
				mountpoint,
				mounts: []
			};
			var mountRoot = type.mount(mount);
			mountRoot.mount = mount;
			mount.root = mountRoot;
			if (root) FS.root = mountRoot;
			else if (node) {
				node.mounted = mount;
				if (node.mount) node.mount.mounts.push(mount);
			}
			return mountRoot;
		},
		unmount(mountpoint) {
			var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
			if (!FS.isMountpoint(lookup.node)) throw new FS.ErrnoError(28);
			var node = lookup.node;
			var mount = node.mounted;
			var mounts = FS.getMounts(mount);
			Object.keys(FS.nameTable).forEach((hash) => {
				var current = FS.nameTable[hash];
				while (current) {
					var next = current.name_next;
					if (mounts.includes(current.mount)) FS.destroyNode(current);
					current = next;
				}
			});
			node.mounted = null;
			var idx = node.mount.mounts.indexOf(mount);
			node.mount.mounts.splice(idx, 1);
		},
		lookup(parent, name) {
			return parent.node_ops.lookup(parent, name);
		},
		mknod(path, mode, dev) {
			var parent = FS.lookupPath(path, { parent: true }).node;
			var name = PATH.basename(path);
			if (!name) throw new FS.ErrnoError(28);
			if (name === "." || name === "..") throw new FS.ErrnoError(20);
			var errCode = FS.mayCreate(parent, name);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!parent.node_ops.mknod) throw new FS.ErrnoError(63);
			return parent.node_ops.mknod(parent, name, mode, dev);
		},
		statfs(path) {
			return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
		},
		statfsStream(stream) {
			return FS.statfsNode(stream.node);
		},
		statfsNode(node) {
			var rtn = {
				bsize: 4096,
				frsize: 4096,
				blocks: 1e6,
				bfree: 5e5,
				bavail: 5e5,
				files: FS.nextInode,
				ffree: FS.nextInode - 1,
				fsid: 42,
				flags: 2,
				namelen: 255
			};
			if (node.node_ops.statfs) Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
			return rtn;
		},
		create(path, mode = 438) {
			mode &= 4095;
			mode |= 32768;
			return FS.mknod(path, mode, 0);
		},
		mkdir(path, mode = 511) {
			mode &= 1023;
			mode |= 16384;
			return FS.mknod(path, mode, 0);
		},
		mkdirTree(path, mode) {
			var dirs = path.split("/");
			var d = "";
			for (var dir of dirs) {
				if (!dir) continue;
				if (d || PATH.isAbs(path)) d += "/";
				d += dir;
				try {
					FS.mkdir(d, mode);
				} catch (e) {
					if (e.errno != 20) throw e;
				}
			}
		},
		mkdev(path, mode, dev) {
			if (typeof dev == "undefined") {
				dev = mode;
				mode = 438;
			}
			mode |= 8192;
			return FS.mknod(path, mode, dev);
		},
		symlink(oldpath, newpath) {
			if (!PATH_FS.resolve(oldpath)) throw new FS.ErrnoError(44);
			var parent = FS.lookupPath(newpath, { parent: true }).node;
			if (!parent) throw new FS.ErrnoError(44);
			var newname = PATH.basename(newpath);
			var errCode = FS.mayCreate(parent, newname);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!parent.node_ops.symlink) throw new FS.ErrnoError(63);
			return parent.node_ops.symlink(parent, newname, oldpath);
		},
		rename(old_path, new_path) {
			var old_dirname = PATH.dirname(old_path);
			var new_dirname = PATH.dirname(new_path);
			var old_name = PATH.basename(old_path);
			var new_name = PATH.basename(new_path);
			var lookup = FS.lookupPath(old_path, { parent: true }), old_dir = lookup.node, new_dir;
			lookup = FS.lookupPath(new_path, { parent: true });
			new_dir = lookup.node;
			if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
			if (old_dir.mount !== new_dir.mount) throw new FS.ErrnoError(75);
			var old_node = FS.lookupNode(old_dir, old_name);
			var relative = PATH_FS.relative(old_path, new_dirname);
			if (relative.charAt(0) !== ".") throw new FS.ErrnoError(28);
			relative = PATH_FS.relative(new_path, old_dirname);
			if (relative.charAt(0) !== ".") throw new FS.ErrnoError(55);
			var new_node;
			try {
				new_node = FS.lookupNode(new_dir, new_name);
			} catch (e) {}
			if (old_node === new_node) return;
			var isdir = FS.isDir(old_node.mode);
			var errCode = FS.mayDelete(old_dir, old_name, isdir);
			if (errCode) throw new FS.ErrnoError(errCode);
			errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!old_dir.node_ops.rename) throw new FS.ErrnoError(63);
			if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) throw new FS.ErrnoError(10);
			if (new_dir !== old_dir) {
				errCode = FS.nodePermissions(old_dir, "w");
				if (errCode) throw new FS.ErrnoError(errCode);
			}
			FS.hashRemoveNode(old_node);
			try {
				old_dir.node_ops.rename(old_node, new_dir, new_name);
				old_node.parent = new_dir;
			} catch (e) {
				throw e;
			} finally {
				FS.hashAddNode(old_node);
			}
		},
		rmdir(path) {
			var parent = FS.lookupPath(path, { parent: true }).node;
			var name = PATH.basename(path);
			var node = FS.lookupNode(parent, name);
			var errCode = FS.mayDelete(parent, name, true);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!parent.node_ops.rmdir) throw new FS.ErrnoError(63);
			if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
			parent.node_ops.rmdir(parent, name);
			FS.destroyNode(node);
		},
		readdir(path) {
			var node = FS.lookupPath(path, { follow: true }).node;
			return FS.checkOpExists(node.node_ops.readdir, 54)(node);
		},
		unlink(path) {
			var parent = FS.lookupPath(path, { parent: true }).node;
			if (!parent) throw new FS.ErrnoError(44);
			var name = PATH.basename(path);
			var node = FS.lookupNode(parent, name);
			var errCode = FS.mayDelete(parent, name, false);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!parent.node_ops.unlink) throw new FS.ErrnoError(63);
			if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
			parent.node_ops.unlink(parent, name);
			FS.destroyNode(node);
		},
		readlink(path) {
			var link = FS.lookupPath(path).node;
			if (!link) throw new FS.ErrnoError(44);
			if (!link.node_ops.readlink) throw new FS.ErrnoError(28);
			return link.node_ops.readlink(link);
		},
		stat(path, dontFollow) {
			var node = FS.lookupPath(path, { follow: !dontFollow }).node;
			return FS.checkOpExists(node.node_ops.getattr, 63)(node);
		},
		fstat(fd) {
			var stream = FS.getStreamChecked(fd);
			var node = stream.node;
			var getattr = stream.stream_ops.getattr;
			var arg = getattr ? stream : node;
			getattr ??= node.node_ops.getattr;
			FS.checkOpExists(getattr, 63);
			return getattr(arg);
		},
		lstat(path) {
			return FS.stat(path, true);
		},
		doChmod(stream, node, mode, dontFollow) {
			FS.doSetAttr(stream, node, {
				mode: mode & 4095 | node.mode & -4096,
				ctime: Date.now(),
				dontFollow
			});
		},
		chmod(path, mode, dontFollow) {
			var node;
			if (typeof path == "string") node = FS.lookupPath(path, { follow: !dontFollow }).node;
			else node = path;
			FS.doChmod(null, node, mode, dontFollow);
		},
		lchmod(path, mode) {
			FS.chmod(path, mode, true);
		},
		fchmod(fd, mode) {
			var stream = FS.getStreamChecked(fd);
			FS.doChmod(stream, stream.node, mode, false);
		},
		doChown(stream, node, dontFollow) {
			FS.doSetAttr(stream, node, {
				timestamp: Date.now(),
				dontFollow
			});
		},
		chown(path, uid, gid, dontFollow) {
			var node;
			if (typeof path == "string") node = FS.lookupPath(path, { follow: !dontFollow }).node;
			else node = path;
			FS.doChown(null, node, dontFollow);
		},
		lchown(path, uid, gid) {
			FS.chown(path, uid, gid, true);
		},
		fchown(fd, uid, gid) {
			var stream = FS.getStreamChecked(fd);
			FS.doChown(stream, stream.node, false);
		},
		doTruncate(stream, node, len) {
			if (FS.isDir(node.mode)) throw new FS.ErrnoError(31);
			if (!FS.isFile(node.mode)) throw new FS.ErrnoError(28);
			var errCode = FS.nodePermissions(node, "w");
			if (errCode) throw new FS.ErrnoError(errCode);
			FS.doSetAttr(stream, node, {
				size: len,
				timestamp: Date.now()
			});
		},
		truncate(path, len) {
			if (len < 0) throw new FS.ErrnoError(28);
			var node;
			if (typeof path == "string") node = FS.lookupPath(path, { follow: true }).node;
			else node = path;
			FS.doTruncate(null, node, len);
		},
		ftruncate(fd, len) {
			var stream = FS.getStreamChecked(fd);
			if (len < 0 || (stream.flags & 2097155) === 0) throw new FS.ErrnoError(28);
			FS.doTruncate(stream, stream.node, len);
		},
		utime(path, atime, mtime) {
			var node = FS.lookupPath(path, { follow: true }).node;
			FS.checkOpExists(node.node_ops.setattr, 63)(node, {
				atime,
				mtime
			});
		},
		open(path, flags, mode = 438) {
			if (path === "") throw new FS.ErrnoError(44);
			flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
			if (flags & 64) mode = mode & 4095 | 32768;
			else mode = 0;
			var node;
			var isDirPath;
			if (typeof path == "object") node = path;
			else {
				isDirPath = path.endsWith("/");
				var lookup = FS.lookupPath(path, {
					follow: !(flags & 131072),
					noent_okay: true
				});
				node = lookup.node;
				path = lookup.path;
			}
			var created = false;
			if (flags & 64) if (node) {
				if (flags & 128) throw new FS.ErrnoError(20);
			} else if (isDirPath) throw new FS.ErrnoError(31);
			else {
				node = FS.mknod(path, mode | 511, 0);
				created = true;
			}
			if (!node) throw new FS.ErrnoError(44);
			if (FS.isChrdev(node.mode)) flags &= -513;
			if (flags & 65536 && !FS.isDir(node.mode)) throw new FS.ErrnoError(54);
			if (!created) {
				var errCode = FS.mayOpen(node, flags);
				if (errCode) throw new FS.ErrnoError(errCode);
			}
			if (flags & 512 && !created) FS.truncate(node, 0);
			flags &= -131713;
			var stream = FS.createStream({
				node,
				path: FS.getPath(node),
				flags,
				seekable: true,
				position: 0,
				stream_ops: node.stream_ops,
				ungotten: [],
				error: false
			});
			if (stream.stream_ops.open) stream.stream_ops.open(stream);
			if (created) FS.chmod(node, mode & 511);
			if (Module["logReadFiles"] && !(flags & 1)) {
				if (!(path in FS.readFiles)) FS.readFiles[path] = 1;
			}
			return stream;
		},
		close(stream) {
			if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
			if (stream.getdents) stream.getdents = null;
			try {
				if (stream.stream_ops.close) stream.stream_ops.close(stream);
			} catch (e) {
				throw e;
			} finally {
				FS.closeStream(stream.fd);
			}
			stream.fd = null;
		},
		isClosed(stream) {
			return stream.fd === null;
		},
		llseek(stream, offset, whence) {
			if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
			if (!stream.seekable || !stream.stream_ops.llseek) throw new FS.ErrnoError(70);
			if (whence != 0 && whence != 1 && whence != 2) throw new FS.ErrnoError(28);
			stream.position = stream.stream_ops.llseek(stream, offset, whence);
			stream.ungotten = [];
			return stream.position;
		},
		read(stream, buffer, offset, length, position) {
			if (length < 0 || position < 0) throw new FS.ErrnoError(28);
			if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
			if ((stream.flags & 2097155) === 1) throw new FS.ErrnoError(8);
			if (FS.isDir(stream.node.mode)) throw new FS.ErrnoError(31);
			if (!stream.stream_ops.read) throw new FS.ErrnoError(28);
			var seeking = typeof position != "undefined";
			if (!seeking) position = stream.position;
			else if (!stream.seekable) throw new FS.ErrnoError(70);
			var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
			if (!seeking) stream.position += bytesRead;
			return bytesRead;
		},
		write(stream, buffer, offset, length, position, canOwn) {
			if (length < 0 || position < 0) throw new FS.ErrnoError(28);
			if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
			if ((stream.flags & 2097155) === 0) throw new FS.ErrnoError(8);
			if (FS.isDir(stream.node.mode)) throw new FS.ErrnoError(31);
			if (!stream.stream_ops.write) throw new FS.ErrnoError(28);
			if (stream.seekable && stream.flags & 1024) FS.llseek(stream, 0, 2);
			var seeking = typeof position != "undefined";
			if (!seeking) position = stream.position;
			else if (!stream.seekable) throw new FS.ErrnoError(70);
			var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
			if (!seeking) stream.position += bytesWritten;
			return bytesWritten;
		},
		mmap(stream, length, position, prot, flags) {
			if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) throw new FS.ErrnoError(2);
			if ((stream.flags & 2097155) === 1) throw new FS.ErrnoError(2);
			if (!stream.stream_ops.mmap) throw new FS.ErrnoError(43);
			if (!length) throw new FS.ErrnoError(28);
			return stream.stream_ops.mmap(stream, length, position, prot, flags);
		},
		msync(stream, buffer, offset, length, mmapFlags) {
			if (!stream.stream_ops.msync) return 0;
			return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
		},
		ioctl(stream, cmd, arg) {
			if (!stream.stream_ops.ioctl) throw new FS.ErrnoError(59);
			return stream.stream_ops.ioctl(stream, cmd, arg);
		},
		readFile(path, opts = {}) {
			opts.flags = opts.flags || 0;
			opts.encoding = opts.encoding || "binary";
			if (opts.encoding !== "utf8" && opts.encoding !== "binary") abort(`Invalid encoding type "${opts.encoding}"`);
			var stream = FS.open(path, opts.flags);
			var length = FS.stat(path).size;
			var buf = new Uint8Array(length);
			FS.read(stream, buf, 0, length, 0);
			if (opts.encoding === "utf8") buf = UTF8ArrayToString(buf);
			FS.close(stream);
			return buf;
		},
		writeFile(path, data, opts = {}) {
			opts.flags = opts.flags || 577;
			var stream = FS.open(path, opts.flags, opts.mode);
			if (typeof data == "string") data = new Uint8Array(intArrayFromString(data, true));
			if (ArrayBuffer.isView(data)) FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
			else abort("Unsupported data type");
			FS.close(stream);
		},
		cwd: () => FS.currentPath,
		chdir(path) {
			var lookup = FS.lookupPath(path, { follow: true });
			if (lookup.node === null) throw new FS.ErrnoError(44);
			if (!FS.isDir(lookup.node.mode)) throw new FS.ErrnoError(54);
			var errCode = FS.nodePermissions(lookup.node, "x");
			if (errCode) throw new FS.ErrnoError(errCode);
			FS.currentPath = lookup.path;
		},
		createDefaultDirectories() {
			FS.mkdir("/tmp");
			FS.mkdir("/home");
			FS.mkdir("/home/web_user");
		},
		createDefaultDevices() {
			FS.mkdir("/dev");
			FS.registerDevice(FS.makedev(1, 3), {
				read: () => 0,
				write: (stream, buffer, offset, length, pos) => length,
				llseek: () => 0
			});
			FS.mkdev("/dev/null", FS.makedev(1, 3));
			TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
			TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
			FS.mkdev("/dev/tty", FS.makedev(5, 0));
			FS.mkdev("/dev/tty1", FS.makedev(6, 0));
			var randomBuffer = new Uint8Array(1024), randomLeft = 0;
			var randomByte = () => {
				if (randomLeft === 0) {
					randomFill(randomBuffer);
					randomLeft = randomBuffer.byteLength;
				}
				return randomBuffer[--randomLeft];
			};
			FS.createDevice("/dev", "random", randomByte);
			FS.createDevice("/dev", "urandom", randomByte);
			FS.mkdir("/dev/shm");
			FS.mkdir("/dev/shm/tmp");
		},
		createSpecialDirectories() {
			FS.mkdir("/proc");
			var proc_self = FS.mkdir("/proc/self");
			FS.mkdir("/proc/self/fd");
			FS.mount({ mount() {
				var node = FS.createNode(proc_self, "fd", 16895, 73);
				node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
				node.node_ops = {
					lookup(parent, name) {
						var fd = +name;
						var stream = FS.getStreamChecked(fd);
						var ret = {
							parent: null,
							mount: { mountpoint: "fake" },
							node_ops: { readlink: () => stream.path },
							id: fd + 1
						};
						ret.parent = ret;
						return ret;
					},
					readdir() {
						return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
					}
				};
				return node;
			} }, {}, "/proc/self/fd");
		},
		createStandardStreams(input, output, error) {
			if (input) FS.createDevice("/dev", "stdin", input);
			else FS.symlink("/dev/tty", "/dev/stdin");
			if (output) FS.createDevice("/dev", "stdout", null, output);
			else FS.symlink("/dev/tty", "/dev/stdout");
			if (error) FS.createDevice("/dev", "stderr", null, error);
			else FS.symlink("/dev/tty1", "/dev/stderr");
			FS.open("/dev/stdin", 0);
			FS.open("/dev/stdout", 1);
			FS.open("/dev/stderr", 1);
		},
		staticInit() {
			FS.nameTable = new Array(4096);
			FS.mount(MEMFS, {}, "/");
			FS.createDefaultDirectories();
			FS.createDefaultDevices();
			FS.createSpecialDirectories();
			FS.filesystems = { MEMFS };
		},
		init(input, output, error) {
			FS.initialized = true;
			input ??= Module["stdin"];
			output ??= Module["stdout"];
			error ??= Module["stderr"];
			FS.createStandardStreams(input, output, error);
		},
		quit() {
			FS.initialized = false;
			for (var stream of FS.streams) if (stream) FS.close(stream);
		},
		findObject(path, dontResolveLastLink) {
			var ret = FS.analyzePath(path, dontResolveLastLink);
			if (!ret.exists) return null;
			return ret.object;
		},
		analyzePath(path, dontResolveLastLink) {
			try {
				var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
				path = lookup.path;
			} catch (e) {}
			var ret = {
				isRoot: false,
				exists: false,
				error: 0,
				name: null,
				path: null,
				object: null,
				parentExists: false,
				parentPath: null,
				parentObject: null
			};
			try {
				var lookup = FS.lookupPath(path, { parent: true });
				ret.parentExists = true;
				ret.parentPath = lookup.path;
				ret.parentObject = lookup.node;
				ret.name = PATH.basename(path);
				lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
				ret.exists = true;
				ret.path = lookup.path;
				ret.object = lookup.node;
				ret.name = lookup.node.name;
				ret.isRoot = lookup.path === "/";
			} catch (e) {
				ret.error = e.errno;
			}
			return ret;
		},
		createPath(parent, path, canRead, canWrite) {
			parent = typeof parent == "string" ? parent : FS.getPath(parent);
			var parts = path.split("/").reverse();
			while (parts.length) {
				var part = parts.pop();
				if (!part) continue;
				var current = PATH.join2(parent, part);
				try {
					FS.mkdir(current);
				} catch (e) {
					if (e.errno != 20) throw e;
				}
				parent = current;
			}
			return current;
		},
		createFile(parent, name, properties, canRead, canWrite) {
			var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
			var mode = FS_getMode(canRead, canWrite);
			return FS.create(path, mode);
		},
		createDataFile(parent, name, data, canRead, canWrite, canOwn) {
			var path = name;
			if (parent) {
				parent = typeof parent == "string" ? parent : FS.getPath(parent);
				path = name ? PATH.join2(parent, name) : parent;
			}
			var mode = FS_getMode(canRead, canWrite);
			var node = FS.create(path, mode);
			if (data) {
				if (typeof data == "string") {
					var arr = new Array(data.length);
					for (var i$1 = 0, len = data.length; i$1 < len; ++i$1) arr[i$1] = data.charCodeAt(i$1);
					data = arr;
				}
				FS.chmod(node, mode | 146);
				var stream = FS.open(node, 577);
				FS.write(stream, data, 0, data.length, 0, canOwn);
				FS.close(stream);
				FS.chmod(node, mode);
			}
		},
		createDevice(parent, name, input, output) {
			var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
			var mode = FS_getMode(!!input, !!output);
			FS.createDevice.major ??= 64;
			var dev = FS.makedev(FS.createDevice.major++, 0);
			FS.registerDevice(dev, {
				open(stream) {
					stream.seekable = false;
				},
				close(stream) {
					if (output?.buffer?.length) output(10);
				},
				read(stream, buffer, offset, length, pos) {
					var bytesRead = 0;
					for (var i$1 = 0; i$1 < length; i$1++) {
						var result;
						try {
							result = input();
						} catch (e) {
							throw new FS.ErrnoError(29);
						}
						if (result === void 0 && bytesRead === 0) throw new FS.ErrnoError(6);
						if (result === null || result === void 0) break;
						bytesRead++;
						buffer[offset + i$1] = result;
					}
					if (bytesRead) stream.node.atime = Date.now();
					return bytesRead;
				},
				write(stream, buffer, offset, length, pos) {
					for (var i$1 = 0; i$1 < length; i$1++) try {
						output(buffer[offset + i$1]);
					} catch (e) {
						throw new FS.ErrnoError(29);
					}
					if (length) stream.node.mtime = stream.node.ctime = Date.now();
					return i$1;
				}
			});
			return FS.mkdev(path, mode, dev);
		},
		forceLoadFile(obj) {
			if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
			if (globalThis.XMLHttpRequest) abort("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
			else try {
				obj.contents = readBinary(obj.url);
			} catch (e) {
				throw new FS.ErrnoError(29);
			}
		},
		createLazyFile(parent, name, url, canRead, canWrite) {
			class LazyUint8Array {
				lengthKnown = false;
				chunks = [];
				get(idx) {
					if (idx > this.length - 1 || idx < 0) return;
					var chunkOffset = idx % this.chunkSize;
					var chunkNum = idx / this.chunkSize | 0;
					return this.getter(chunkNum)[chunkOffset];
				}
				setDataGetter(getter) {
					this.getter = getter;
				}
				cacheLength() {
					var xhr = new XMLHttpRequest();
					xhr.open("HEAD", url, false);
					xhr.send(null);
					if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort("Couldn't load " + url + ". Status: " + xhr.status);
					var datalength = Number(xhr.getResponseHeader("Content-length"));
					var header;
					var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
					var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
					var chunkSize = 1024 * 1024;
					if (!hasByteServing) chunkSize = datalength;
					var doXHR = (from, to) => {
						if (from > to) abort("invalid range (" + from + ", " + to + ") or no bytes requested!");
						if (to > datalength - 1) abort("only " + datalength + " bytes available! programmer error!");
						var xhr$1 = new XMLHttpRequest();
						xhr$1.open("GET", url, false);
						if (datalength !== chunkSize) xhr$1.setRequestHeader("Range", "bytes=" + from + "-" + to);
						xhr$1.responseType = "arraybuffer";
						if (xhr$1.overrideMimeType) xhr$1.overrideMimeType("text/plain; charset=x-user-defined");
						xhr$1.send(null);
						if (!(xhr$1.status >= 200 && xhr$1.status < 300 || xhr$1.status === 304)) abort("Couldn't load " + url + ". Status: " + xhr$1.status);
						if (xhr$1.response !== void 0) return new Uint8Array(xhr$1.response || []);
						return intArrayFromString(xhr$1.responseText || "", true);
					};
					var lazyArray = this;
					lazyArray.setDataGetter((chunkNum) => {
						var start = chunkNum * chunkSize;
						var end = (chunkNum + 1) * chunkSize - 1;
						end = Math.min(end, datalength - 1);
						if (typeof lazyArray.chunks[chunkNum] == "undefined") lazyArray.chunks[chunkNum] = doXHR(start, end);
						if (typeof lazyArray.chunks[chunkNum] == "undefined") abort("doXHR failed!");
						return lazyArray.chunks[chunkNum];
					});
					if (usesGzip || !datalength) {
						chunkSize = datalength = 1;
						datalength = this.getter(0).length;
						chunkSize = datalength;
						out("LazyFiles on gzip forces download of the whole file when length is accessed");
					}
					this._length = datalength;
					this._chunkSize = chunkSize;
					this.lengthKnown = true;
				}
				get length() {
					if (!this.lengthKnown) this.cacheLength();
					return this._length;
				}
				get chunkSize() {
					if (!this.lengthKnown) this.cacheLength();
					return this._chunkSize;
				}
			}
			if (globalThis.XMLHttpRequest) {
				if (!ENVIRONMENT_IS_WORKER) abort("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
				var properties = {
					isDevice: false,
					contents: new LazyUint8Array()
				};
			} else var properties = {
				isDevice: false,
				url
			};
			var node = FS.createFile(parent, name, properties, canRead, canWrite);
			if (properties.contents) node.contents = properties.contents;
			else if (properties.url) {
				node.contents = null;
				node.url = properties.url;
			}
			Object.defineProperties(node, { usedBytes: { get: function() {
				return this.contents.length;
			} } });
			var stream_ops = {};
			Object.keys(node.stream_ops).forEach((key) => {
				var fn = node.stream_ops[key];
				stream_ops[key] = (...args) => {
					FS.forceLoadFile(node);
					return fn(...args);
				};
			});
			function writeChunks(stream, buffer, offset, length, position) {
				var contents = stream.node.contents;
				if (position >= contents.length) return 0;
				var size = Math.min(contents.length - position, length);
				if (contents.slice) for (var i$1 = 0; i$1 < size; i$1++) buffer[offset + i$1] = contents[position + i$1];
				else for (var i$1 = 0; i$1 < size; i$1++) buffer[offset + i$1] = contents.get(position + i$1);
				return size;
			}
			stream_ops.read = (stream, buffer, offset, length, position) => {
				FS.forceLoadFile(node);
				return writeChunks(stream, buffer, offset, length, position);
			};
			stream_ops.mmap = (stream, length, position, prot, flags) => {
				FS.forceLoadFile(node);
				var ptr = mmapAlloc(length);
				if (!ptr) throw new FS.ErrnoError(48);
				writeChunks(stream, HEAP8, ptr, length, position);
				return {
					ptr,
					allocated: true
				};
			};
			node.stream_ops = stream_ops;
			return node;
		}
	};
	var SYSCALLS = {
		DEFAULT_POLLMASK: 5,
		calculateAt(dirfd, path, allowEmpty) {
			if (PATH.isAbs(path)) return path;
			var dir;
			if (dirfd === -100) dir = FS.cwd();
			else dir = SYSCALLS.getStreamFromFD(dirfd).path;
			if (path.length == 0) {
				if (!allowEmpty) throw new FS.ErrnoError(44);
				return dir;
			}
			return dir + "/" + path;
		},
		writeStat(buf, stat) {
			HEAPU32[buf >> 2] = stat.dev;
			HEAPU32[buf + 4 >> 2] = stat.mode;
			HEAPU32[buf + 8 >> 2] = stat.nlink;
			HEAPU32[buf + 12 >> 2] = stat.uid;
			HEAPU32[buf + 16 >> 2] = stat.gid;
			HEAPU32[buf + 20 >> 2] = stat.rdev;
			HEAP64[buf + 24 >> 3] = BigInt(stat.size);
			HEAP32[buf + 32 >> 2] = 4096;
			HEAP32[buf + 36 >> 2] = stat.blocks;
			var atime = stat.atime.getTime();
			var mtime = stat.mtime.getTime();
			var ctime = stat.ctime.getTime();
			HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
			HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
			HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
			HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
			HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
			HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
			HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
			return 0;
		},
		writeStatFs(buf, stats) {
			HEAPU32[buf + 4 >> 2] = stats.bsize;
			HEAPU32[buf + 60 >> 2] = stats.bsize;
			HEAP64[buf + 8 >> 3] = BigInt(stats.blocks);
			HEAP64[buf + 16 >> 3] = BigInt(stats.bfree);
			HEAP64[buf + 24 >> 3] = BigInt(stats.bavail);
			HEAP64[buf + 32 >> 3] = BigInt(stats.files);
			HEAP64[buf + 40 >> 3] = BigInt(stats.ffree);
			HEAPU32[buf + 48 >> 2] = stats.fsid;
			HEAPU32[buf + 64 >> 2] = stats.flags;
			HEAPU32[buf + 56 >> 2] = stats.namelen;
		},
		doMsync(addr, stream, len, flags, offset) {
			if (!FS.isFile(stream.node.mode)) throw new FS.ErrnoError(43);
			if (flags & 2) return 0;
			var buffer = HEAPU8.slice(addr, addr + len);
			FS.msync(stream, buffer, offset, len, flags);
		},
		getStreamFromFD(fd) {
			return FS.getStreamChecked(fd);
		},
		varargs: void 0,
		getStr(ptr) {
			return UTF8ToString(ptr);
		}
	};
	function ___syscall_fcntl64(fd, cmd, varargs) {
		SYSCALLS.varargs = varargs;
		try {
			var stream = SYSCALLS.getStreamFromFD(fd);
			switch (cmd) {
				case 0:
					var arg = syscallGetVarargI();
					if (arg < 0) return -28;
					while (FS.streams[arg]) arg++;
					return FS.dupStream(stream, arg).fd;
				case 1:
				case 2: return 0;
				case 3: return stream.flags;
				case 4:
					var arg = syscallGetVarargI();
					stream.flags |= arg;
					return 0;
				case 12:
					var arg = syscallGetVarargP();
					var offset = 0;
					HEAP16[arg + offset >> 1] = 2;
					return 0;
				case 13:
				case 14: return 0;
			}
			return -28;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	function ___syscall_ioctl(fd, op, varargs) {
		SYSCALLS.varargs = varargs;
		try {
			var stream = SYSCALLS.getStreamFromFD(fd);
			switch (op) {
				case 21509:
					if (!stream.tty) return -59;
					return 0;
				case 21505:
					if (!stream.tty) return -59;
					if (stream.tty.ops.ioctl_tcgets) {
						var termios = stream.tty.ops.ioctl_tcgets(stream);
						var argp = syscallGetVarargP();
						HEAP32[argp >> 2] = termios.c_iflag || 0;
						HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
						HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
						HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
						for (var i$1 = 0; i$1 < 32; i$1++) HEAP8[argp + i$1 + 17] = termios.c_cc[i$1] || 0;
						return 0;
					}
					return 0;
				case 21510:
				case 21511:
				case 21512:
					if (!stream.tty) return -59;
					return 0;
				case 21506:
				case 21507:
				case 21508:
					if (!stream.tty) return -59;
					if (stream.tty.ops.ioctl_tcsets) {
						var argp = syscallGetVarargP();
						var c_iflag = HEAP32[argp >> 2];
						var c_oflag = HEAP32[argp + 4 >> 2];
						var c_cflag = HEAP32[argp + 8 >> 2];
						var c_lflag = HEAP32[argp + 12 >> 2];
						var c_cc = [];
						for (var i$1 = 0; i$1 < 32; i$1++) c_cc.push(HEAP8[argp + i$1 + 17]);
						return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
							c_iflag,
							c_oflag,
							c_cflag,
							c_lflag,
							c_cc
						});
					}
					return 0;
				case 21519:
					if (!stream.tty) return -59;
					var argp = syscallGetVarargP();
					HEAP32[argp >> 2] = 0;
					return 0;
				case 21520:
					if (!stream.tty) return -59;
					return -28;
				case 21537:
				case 21531:
					var argp = syscallGetVarargP();
					return FS.ioctl(stream, op, argp);
				case 21523:
					if (!stream.tty) return -59;
					if (stream.tty.ops.ioctl_tiocgwinsz) {
						var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
						var argp = syscallGetVarargP();
						HEAP16[argp >> 1] = winsize[0];
						HEAP16[argp + 2 >> 1] = winsize[1];
					}
					return 0;
				case 21524:
					if (!stream.tty) return -59;
					return 0;
				case 21515:
					if (!stream.tty) return -59;
					return 0;
				default: return -28;
			}
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	function ___syscall_openat(dirfd, path, flags, varargs) {
		SYSCALLS.varargs = varargs;
		try {
			path = SYSCALLS.getStr(path);
			path = SYSCALLS.calculateAt(dirfd, path);
			var mode = varargs ? syscallGetVarargI() : 0;
			return FS.open(path, flags, mode).fd;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	function ___syscall_rmdir(path) {
		try {
			path = SYSCALLS.getStr(path);
			FS.rmdir(path);
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	function ___syscall_stat64(path, buf) {
		try {
			path = SYSCALLS.getStr(path);
			return SYSCALLS.writeStat(buf, FS.stat(path));
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	function ___syscall_unlinkat(dirfd, path, flags) {
		try {
			path = SYSCALLS.getStr(path);
			path = SYSCALLS.calculateAt(dirfd, path);
			if (!flags) FS.unlink(path);
			else if (flags === 512) FS.rmdir(path);
			else return -28;
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	var __abort_js = () => abort("");
	var AsciiToString = (ptr) => {
		var str = "";
		while (1) {
			var ch = HEAPU8[ptr++];
			if (!ch) return str;
			str += String.fromCharCode(ch);
		}
	};
	var awaitingDependencies = {};
	var registeredTypes = {};
	var typeDependencies = {};
	var BindingError = class BindingError$1 extends Error {
		constructor(message) {
			super(message);
			this.name = "BindingError";
		}
	};
	var throwBindingError = (message) => {
		throw new BindingError(message);
	};
	function sharedRegisterType(rawType, registeredInstance, options = {}) {
		var name = registeredInstance.name;
		if (!rawType) throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
		if (registeredTypes.hasOwnProperty(rawType)) if (options.ignoreDuplicateRegistrations) return;
		else throwBindingError(`Cannot register type '${name}' twice`);
		registeredTypes[rawType] = registeredInstance;
		delete typeDependencies[rawType];
		if (awaitingDependencies.hasOwnProperty(rawType)) {
			var callbacks = awaitingDependencies[rawType];
			delete awaitingDependencies[rawType];
			callbacks.forEach((cb) => cb());
		}
	}
	function registerType(rawType, registeredInstance, options = {}) {
		return sharedRegisterType(rawType, registeredInstance, options);
	}
	var integerReadValueFromPointer = (name, width, signed) => {
		switch (width) {
			case 1: return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
			case 2: return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
			case 4: return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
			case 8: return signed ? (pointer) => HEAP64[pointer >> 3] : (pointer) => HEAPU64[pointer >> 3];
			default: throw new TypeError(`invalid integer width (${width}): ${name}`);
		}
	};
	var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
		name = AsciiToString(name);
		const isUnsignedType = minRange === 0n;
		let fromWireType = (value) => value;
		if (isUnsignedType) {
			const bitSize = size * 8;
			fromWireType = (value) => BigInt.asUintN(bitSize, value);
			maxRange = fromWireType(maxRange);
		}
		registerType(primitiveType, {
			name,
			fromWireType,
			toWireType: (destructors, value) => {
				if (typeof value == "number") value = BigInt(value);
				return value;
			},
			readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType),
			destructorFunction: null
		});
	};
	var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
		name = AsciiToString(name);
		registerType(rawType, {
			name,
			fromWireType: function(wt) {
				return !!wt;
			},
			toWireType: function(destructors, o) {
				return o ? trueValue : falseValue;
			},
			readValueFromPointer: function(pointer) {
				return this.fromWireType(HEAPU8[pointer]);
			},
			destructorFunction: null
		});
	};
	var emval_freelist = [];
	var emval_handles = [
		0,
		1,
		,
		1,
		null,
		1,
		true,
		1,
		false,
		1
	];
	var __emval_decref = (handle) => {
		if (handle > 9 && 0 === --emval_handles[handle + 1]) {
			emval_handles[handle] = void 0;
			emval_freelist.push(handle);
		}
	};
	var Emval = {
		toValue: (handle) => {
			if (!handle) throwBindingError(`Cannot use deleted val. handle = ${handle}`);
			return emval_handles[handle];
		},
		toHandle: (value) => {
			switch (value) {
				case void 0: return 2;
				case null: return 4;
				case true: return 6;
				case false: return 8;
				default: {
					const handle = emval_freelist.pop() || emval_handles.length;
					emval_handles[handle] = value;
					emval_handles[handle + 1] = 1;
					return handle;
				}
			}
		}
	};
	function readPointer(pointer) {
		return this.fromWireType(HEAPU32[pointer >> 2]);
	}
	var EmValType = {
		name: "emscripten::val",
		fromWireType: (handle) => {
			var rv = Emval.toValue(handle);
			__emval_decref(handle);
			return rv;
		},
		toWireType: (destructors, value) => Emval.toHandle(value),
		readValueFromPointer: readPointer,
		destructorFunction: null
	};
	var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
	var floatReadValueFromPointer = (name, width) => {
		switch (width) {
			case 4: return function(pointer) {
				return this.fromWireType(HEAPF32[pointer >> 2]);
			};
			case 8: return function(pointer) {
				return this.fromWireType(HEAPF64[pointer >> 3]);
			};
			default: throw new TypeError(`invalid float width (${width}): ${name}`);
		}
	};
	var __embind_register_float = (rawType, name, size) => {
		name = AsciiToString(name);
		registerType(rawType, {
			name,
			fromWireType: (value) => value,
			toWireType: (destructors, value) => value,
			readValueFromPointer: floatReadValueFromPointer(name, size),
			destructorFunction: null
		});
	};
	var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
		name = AsciiToString(name);
		const isUnsignedType = minRange === 0;
		let fromWireType = (value) => value;
		if (isUnsignedType) {
			var bitshift = 32 - 8 * size;
			fromWireType = (value) => value << bitshift >>> bitshift;
			maxRange = fromWireType(maxRange);
		}
		registerType(primitiveType, {
			name,
			fromWireType,
			toWireType: (destructors, value) => value,
			readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0),
			destructorFunction: null
		});
	};
	var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
		var TA = [
			Int8Array,
			Uint8Array,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array,
			BigInt64Array,
			BigUint64Array
		][dataTypeIndex];
		function decodeMemoryView(handle) {
			var size = HEAPU32[handle >> 2];
			var data = HEAPU32[handle + 4 >> 2];
			return new TA(HEAP8.buffer, data, size);
		}
		name = AsciiToString(name);
		registerType(rawType, {
			name,
			fromWireType: decodeMemoryView,
			readValueFromPointer: decodeMemoryView
		}, { ignoreDuplicateRegistrations: true });
	};
	var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
	var __embind_register_std_string = (rawType, name) => {
		name = AsciiToString(name);
		var stdStringIsUTF8 = true;
		registerType(rawType, {
			name,
			fromWireType(value) {
				var length = HEAPU32[value >> 2];
				var payload = value + 4;
				var str;
				if (stdStringIsUTF8) str = UTF8ToString(payload, length, true);
				else {
					str = "";
					for (var i$1 = 0; i$1 < length; ++i$1) str += String.fromCharCode(HEAPU8[payload + i$1]);
				}
				_free(value);
				return str;
			},
			toWireType(destructors, value) {
				if (value instanceof ArrayBuffer) value = new Uint8Array(value);
				var length;
				var valueIsOfTypeString = typeof value == "string";
				if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) throwBindingError("Cannot pass non-string to std::string");
				if (stdStringIsUTF8 && valueIsOfTypeString) length = lengthBytesUTF8(value);
				else length = value.length;
				var base = _malloc(4 + length + 1);
				var ptr = base + 4;
				HEAPU32[base >> 2] = length;
				if (valueIsOfTypeString) if (stdStringIsUTF8) stringToUTF8(value, ptr, length + 1);
				else for (var i$1 = 0; i$1 < length; ++i$1) {
					var charCode = value.charCodeAt(i$1);
					if (charCode > 255) {
						_free(base);
						throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
					}
					HEAPU8[ptr + i$1] = charCode;
				}
				else HEAPU8.set(value, ptr);
				if (destructors !== null) destructors.push(_free, base);
				return base;
			},
			readValueFromPointer: readPointer,
			destructorFunction(ptr) {
				_free(ptr);
			}
		});
	};
	var UTF16Decoder = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0;
	var UTF16ToString = (ptr, maxBytesToRead, ignoreNul) => {
		var idx = ptr >> 1;
		var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
		if (endIdx - idx > 16 && UTF16Decoder) return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
		var str = "";
		for (var i$1 = idx; i$1 < endIdx; ++i$1) {
			var codeUnit = HEAPU16[i$1];
			str += String.fromCharCode(codeUnit);
		}
		return str;
	};
	var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
		maxBytesToWrite ??= 2147483647;
		if (maxBytesToWrite < 2) return 0;
		maxBytesToWrite -= 2;
		var startPtr = outPtr;
		var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
		for (var i$1 = 0; i$1 < numCharsToWrite; ++i$1) {
			var codeUnit = str.charCodeAt(i$1);
			HEAP16[outPtr >> 1] = codeUnit;
			outPtr += 2;
		}
		HEAP16[outPtr >> 1] = 0;
		return outPtr - startPtr;
	};
	var lengthBytesUTF16 = (str) => str.length * 2;
	var UTF32ToString = (ptr, maxBytesToRead, ignoreNul) => {
		var str = "";
		var startIdx = ptr >> 2;
		for (var i$1 = 0; !(i$1 >= maxBytesToRead / 4); i$1++) {
			var utf32 = HEAPU32[startIdx + i$1];
			if (!utf32 && !ignoreNul) break;
			str += String.fromCodePoint(utf32);
		}
		return str;
	};
	var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
		maxBytesToWrite ??= 2147483647;
		if (maxBytesToWrite < 4) return 0;
		var startPtr = outPtr;
		var endPtr = startPtr + maxBytesToWrite - 4;
		for (var i$1 = 0; i$1 < str.length; ++i$1) {
			var codePoint = str.codePointAt(i$1);
			if (codePoint > 65535) i$1++;
			HEAP32[outPtr >> 2] = codePoint;
			outPtr += 4;
			if (outPtr + 4 > endPtr) break;
		}
		HEAP32[outPtr >> 2] = 0;
		return outPtr - startPtr;
	};
	var lengthBytesUTF32 = (str) => {
		var len = 0;
		for (var i$1 = 0; i$1 < str.length; ++i$1) {
			if (str.codePointAt(i$1) > 65535) i$1++;
			len += 4;
		}
		return len;
	};
	var __embind_register_std_wstring = (rawType, charSize, name) => {
		name = AsciiToString(name);
		var decodeString, encodeString, lengthBytesUTF;
		if (charSize === 2) {
			decodeString = UTF16ToString;
			encodeString = stringToUTF16;
			lengthBytesUTF = lengthBytesUTF16;
		} else {
			decodeString = UTF32ToString;
			encodeString = stringToUTF32;
			lengthBytesUTF = lengthBytesUTF32;
		}
		registerType(rawType, {
			name,
			fromWireType: (value) => {
				var length = HEAPU32[value >> 2];
				var str = decodeString(value + 4, length * charSize, true);
				_free(value);
				return str;
			},
			toWireType: (destructors, value) => {
				if (!(typeof value == "string")) throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
				var length = lengthBytesUTF(value);
				var ptr = _malloc(4 + length + charSize);
				HEAPU32[ptr >> 2] = length / charSize;
				encodeString(value, ptr + 4, length + charSize);
				if (destructors !== null) destructors.push(_free, ptr);
				return ptr;
			},
			readValueFromPointer: readPointer,
			destructorFunction(ptr) {
				_free(ptr);
			}
		});
	};
	var __embind_register_void = (rawType, name) => {
		name = AsciiToString(name);
		registerType(rawType, {
			isVoid: true,
			name,
			fromWireType: () => void 0,
			toWireType: (destructors, o) => void 0
		});
	};
	var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	var MONTH_DAYS_LEAP_CUMULATIVE = [
		0,
		31,
		60,
		91,
		121,
		152,
		182,
		213,
		244,
		274,
		305,
		335
	];
	var MONTH_DAYS_REGULAR_CUMULATIVE = [
		0,
		31,
		59,
		90,
		120,
		151,
		181,
		212,
		243,
		273,
		304,
		334
	];
	var ydayFromDate = (date) => {
		return (isLeapYear(date.getFullYear()) ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE)[date.getMonth()] + date.getDate() - 1;
	};
	var INT53_MAX = 9007199254740992;
	var INT53_MIN = -9007199254740992;
	var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
	function __localtime_js(time, tmPtr) {
		time = bigintToI53Checked(time);
		var date = /* @__PURE__ */ new Date(time * 1e3);
		HEAP32[tmPtr >> 2] = date.getSeconds();
		HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
		HEAP32[tmPtr + 8 >> 2] = date.getHours();
		HEAP32[tmPtr + 12 >> 2] = date.getDate();
		HEAP32[tmPtr + 16 >> 2] = date.getMonth();
		HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
		HEAP32[tmPtr + 24 >> 2] = date.getDay();
		var yday = ydayFromDate(date) | 0;
		HEAP32[tmPtr + 28 >> 2] = yday;
		HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
		var start = new Date(date.getFullYear(), 0, 1);
		var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
		var winterOffset = start.getTimezoneOffset();
		var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
		HEAP32[tmPtr + 32 >> 2] = dst;
	}
	var __tzset_js = (timezone, daylight, std_name, dst_name) => {
		var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
		var winter = new Date(currentYear, 0, 1);
		var summer = new Date(currentYear, 6, 1);
		var winterOffset = winter.getTimezoneOffset();
		var summerOffset = summer.getTimezoneOffset();
		var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
		HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
		HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
		var extractZone = (timezoneOffset) => {
			var sign = timezoneOffset >= 0 ? "-" : "+";
			var absOffset = Math.abs(timezoneOffset);
			var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
			var minutes = String(absOffset % 60).padStart(2, "0");
			return `UTC${sign}${hours}${minutes}`;
		};
		var winterName = extractZone(winterOffset);
		var summerName = extractZone(summerOffset);
		if (summerOffset < winterOffset) {
			stringToUTF8(winterName, std_name, 17);
			stringToUTF8(summerName, dst_name, 17);
		} else {
			stringToUTF8(winterName, dst_name, 17);
			stringToUTF8(summerName, std_name, 17);
		}
	};
	var _emscripten_get_now = () => performance.now();
	var _emscripten_date_now = () => Date.now();
	var nowIsMonotonic = 1;
	var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
	function _clock_time_get(clk_id, ignored_precision, ptime) {
		ignored_precision = bigintToI53Checked(ignored_precision);
		if (!checkWasiClock(clk_id)) return 28;
		var now;
		if (clk_id === 0) now = _emscripten_date_now();
		else if (nowIsMonotonic) now = _emscripten_get_now();
		else return 52;
		var nsec = Math.round(now * 1e3 * 1e3);
		HEAP64[ptime >> 3] = BigInt(nsec);
		return 0;
	}
	var handleException = (e) => {
		if (e instanceof ExitStatus || e == "unwind") return EXITSTATUS;
		quit_(1, e);
	};
	var runtimeKeepaliveCounter = 0;
	var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
	var _proc_exit = (code) => {
		EXITSTATUS = code;
		if (!keepRuntimeAlive()) {
			Module["onExit"]?.(code);
			ABORT = true;
		}
		quit_(code, new ExitStatus(code));
	};
	var exitJS = (status, implicit) => {
		EXITSTATUS = status;
		_proc_exit(status);
	};
	var _exit = exitJS;
	var maybeExit = () => {
		if (!keepRuntimeAlive()) try {
			_exit(EXITSTATUS);
		} catch (e) {
			handleException(e);
		}
	};
	var callUserCallback = (func) => {
		if (ABORT) return;
		try {
			func();
			maybeExit();
		} catch (e) {
			handleException(e);
		}
	};
	function getFullscreenElement() {
		return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.msFullscreenElement;
	}
	var safeSetTimeout = (func, timeout) => setTimeout(() => {
		callUserCallback(func);
	}, timeout);
	var warnOnce = (text) => {
		warnOnce.shown ||= {};
		if (!warnOnce.shown[text]) {
			warnOnce.shown[text] = 1;
			err(text);
		}
	};
	var Browser = {
		useWebGL: false,
		isFullscreen: false,
		pointerLock: false,
		moduleContextCreatedCallbacks: [],
		workers: [],
		preloadedImages: {},
		preloadedAudios: {},
		getCanvas: () => Module["canvas"],
		init() {
			if (Browser.initted) return;
			Browser.initted = true;
			var imagePlugin = {};
			imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
				return !Module["noImageDecoding"] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
			};
			imagePlugin["handle"] = async function imagePlugin_handle(byteArray, name) {
				var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
				if (b.size !== byteArray.length) b = new Blob([new Uint8Array(byteArray).buffer], { type: Browser.getMimetype(name) });
				var url = URL.createObjectURL(b);
				return new Promise((resolve, reject) => {
					var img = new Image();
					img.onload = () => {
						var canvas$1 = document.createElement("canvas");
						canvas$1.width = img.width;
						canvas$1.height = img.height;
						canvas$1.getContext("2d").drawImage(img, 0, 0);
						Browser.preloadedImages[name] = canvas$1;
						URL.revokeObjectURL(url);
						resolve(byteArray);
					};
					img.onerror = (event$1) => {
						err(`Image ${url} could not be decoded`);
						reject();
					};
					img.src = url;
				});
			};
			preloadPlugins.push(imagePlugin);
			var audioPlugin = {};
			audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
				return !Module["noAudioDecoding"] && name.slice(-4) in {
					".ogg": 1,
					".wav": 1,
					".mp3": 1
				};
			};
			audioPlugin["handle"] = async function audioPlugin_handle(byteArray, name) {
				return new Promise((resolve, reject) => {
					var done = false;
					function finish(audio$1) {
						if (done) return;
						done = true;
						Browser.preloadedAudios[name] = audio$1;
						resolve(byteArray);
					}
					var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
					var url = URL.createObjectURL(b);
					var audio = new Audio();
					audio.addEventListener("canplaythrough", () => finish(audio), false);
					audio.onerror = function audio_onerror(event$1) {
						if (done) return;
						err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
						function encode64(data) {
							var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
							var PAD = "=";
							var ret = "";
							var leftchar = 0;
							var leftbits = 0;
							for (var i$1 = 0; i$1 < data.length; i$1++) {
								leftchar = leftchar << 8 | data[i$1];
								leftbits += 8;
								while (leftbits >= 6) {
									var curr = leftchar >> leftbits - 6 & 63;
									leftbits -= 6;
									ret += BASE[curr];
								}
							}
							if (leftbits == 2) {
								ret += BASE[(leftchar & 3) << 4];
								ret += PAD + PAD;
							} else if (leftbits == 4) {
								ret += BASE[(leftchar & 15) << 2];
								ret += PAD;
							}
							return ret;
						}
						audio.src = "data:audio/x-" + name.slice(-3) + ";base64," + encode64(byteArray);
						finish(audio);
					};
					audio.src = url;
					safeSetTimeout(() => {
						finish(audio);
					}, 1e4);
				});
			};
			preloadPlugins.push(audioPlugin);
			function pointerLockChange() {
				var canvas$1 = Browser.getCanvas();
				Browser.pointerLock = document.pointerLockElement === canvas$1;
			}
			var canvas = Browser.getCanvas();
			if (canvas) {
				document.addEventListener("pointerlockchange", pointerLockChange, false);
				if (Module["elementPointerLock"]) canvas.addEventListener("click", (ev) => {
					if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
						Browser.getCanvas().requestPointerLock();
						ev.preventDefault();
					}
				}, false);
			}
		},
		createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
			if (useWebGL && Module["ctx"] && canvas == Browser.getCanvas()) return Module["ctx"];
			var ctx;
			var contextHandle;
			if (useWebGL) {
				var contextAttributes = {
					antialias: false,
					alpha: false,
					majorVersion: typeof WebGL2RenderingContext != "undefined" ? 2 : 1
				};
				if (webGLContextAttributes) for (var attribute in webGLContextAttributes) contextAttributes[attribute] = webGLContextAttributes[attribute];
				if (typeof GL != "undefined") {
					contextHandle = GL.createContext(canvas, contextAttributes);
					if (contextHandle) ctx = GL.getContext(contextHandle).GLctx;
				}
			} else ctx = canvas.getContext("2d");
			if (!ctx) return null;
			if (setInModule) {
				Module["ctx"] = ctx;
				if (useWebGL) GL.makeContextCurrent(contextHandle);
				Browser.useWebGL = useWebGL;
				Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
				Browser.init();
			}
			return ctx;
		},
		fullscreenHandlersInstalled: false,
		lockPointer: void 0,
		resizeCanvas: void 0,
		requestFullscreen(lockPointer, resizeCanvas) {
			Browser.lockPointer = lockPointer;
			Browser.resizeCanvas = resizeCanvas;
			if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
			if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
			var canvas = Browser.getCanvas();
			function fullscreenChange() {
				Browser.isFullscreen = false;
				var canvasContainer$1 = canvas.parentNode;
				if (getFullscreenElement() === canvasContainer$1) {
					canvas.exitFullscreen = Browser.exitFullscreen;
					if (Browser.lockPointer) canvas.requestPointerLock();
					Browser.isFullscreen = true;
					if (Browser.resizeCanvas) Browser.setFullscreenCanvasSize();
					else Browser.updateCanvasDimensions(canvas);
				} else {
					canvasContainer$1.parentNode.insertBefore(canvas, canvasContainer$1);
					canvasContainer$1.parentNode.removeChild(canvasContainer$1);
					if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
					else Browser.updateCanvasDimensions(canvas);
				}
				Module["onFullScreen"]?.(Browser.isFullscreen);
				Module["onFullscreen"]?.(Browser.isFullscreen);
			}
			if (!Browser.fullscreenHandlersInstalled) {
				Browser.fullscreenHandlersInstalled = true;
				document.addEventListener("fullscreenchange", fullscreenChange, false);
				document.addEventListener("mozfullscreenchange", fullscreenChange, false);
				document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
				document.addEventListener("MSFullscreenChange", fullscreenChange, false);
			}
			var canvasContainer = document.createElement("div");
			canvas.parentNode.insertBefore(canvasContainer, canvas);
			canvasContainer.appendChild(canvas);
			canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
			canvasContainer.requestFullscreen();
		},
		exitFullscreen() {
			if (!Browser.isFullscreen) return false;
			(document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (() => {})).apply(document, []);
			return true;
		},
		safeSetTimeout(func, timeout) {
			return safeSetTimeout(func, timeout);
		},
		getMimetype(name) {
			return {
				jpg: "image/jpeg",
				jpeg: "image/jpeg",
				png: "image/png",
				bmp: "image/bmp",
				ogg: "audio/ogg",
				wav: "audio/wav",
				mp3: "audio/mpeg"
			}[name.slice(name.lastIndexOf(".") + 1)];
		},
		getUserMedia(func) {
			window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
			window.getUserMedia(func);
		},
		getMovementX(event$1) {
			return event$1["movementX"] || event$1["mozMovementX"] || event$1["webkitMovementX"] || 0;
		},
		getMovementY(event$1) {
			return event$1["movementY"] || event$1["mozMovementY"] || event$1["webkitMovementY"] || 0;
		},
		getMouseWheelDelta(event$1) {
			var delta = 0;
			switch (event$1.type) {
				case "DOMMouseScroll":
					delta = event$1.detail / 3;
					break;
				case "mousewheel":
					delta = event$1.wheelDelta / 120;
					break;
				case "wheel":
					delta = event$1.deltaY;
					switch (event$1.deltaMode) {
						case 0:
							delta /= 100;
							break;
						case 1:
							delta /= 3;
							break;
						case 2:
							delta *= 80;
							break;
						default: abort("unrecognized mouse wheel delta mode: " + event$1.deltaMode);
					}
					break;
				default: abort("unrecognized mouse wheel event: " + event$1.type);
			}
			return delta;
		},
		mouseX: 0,
		mouseY: 0,
		mouseMovementX: 0,
		mouseMovementY: 0,
		touches: {},
		lastTouches: {},
		calculateMouseCoords(pageX, pageY) {
			var canvas = Browser.getCanvas();
			var rect = canvas.getBoundingClientRect();
			var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
			var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
			var adjustedX = pageX - (scrollX + rect.left);
			var adjustedY = pageY - (scrollY + rect.top);
			adjustedX = adjustedX * (canvas.width / rect.width);
			adjustedY = adjustedY * (canvas.height / rect.height);
			return {
				x: adjustedX,
				y: adjustedY
			};
		},
		setMouseCoords(pageX, pageY) {
			const { x, y } = Browser.calculateMouseCoords(pageX, pageY);
			Browser.mouseMovementX = x - Browser.mouseX;
			Browser.mouseMovementY = y - Browser.mouseY;
			Browser.mouseX = x;
			Browser.mouseY = y;
		},
		calculateMouseEvent(event$1) {
			if (Browser.pointerLock) {
				if (event$1.type != "mousemove" && "mozMovementX" in event$1) Browser.mouseMovementX = Browser.mouseMovementY = 0;
				else {
					Browser.mouseMovementX = Browser.getMovementX(event$1);
					Browser.mouseMovementY = Browser.getMovementY(event$1);
				}
				Browser.mouseX += Browser.mouseMovementX;
				Browser.mouseY += Browser.mouseMovementY;
			} else {
				if (event$1.type === "touchstart" || event$1.type === "touchend" || event$1.type === "touchmove") {
					var touch = event$1.touch;
					if (touch === void 0) return;
					var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
					if (event$1.type === "touchstart") {
						Browser.lastTouches[touch.identifier] = coords;
						Browser.touches[touch.identifier] = coords;
					} else if (event$1.type === "touchend" || event$1.type === "touchmove") {
						var last = Browser.touches[touch.identifier];
						last ||= coords;
						Browser.lastTouches[touch.identifier] = last;
						Browser.touches[touch.identifier] = coords;
					}
					return;
				}
				Browser.setMouseCoords(event$1.pageX, event$1.pageY);
			}
		},
		resizeListeners: [],
		updateResizeListeners() {
			var canvas = Browser.getCanvas();
			Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
		},
		setCanvasSize(width, height, noUpdates) {
			var canvas = Browser.getCanvas();
			Browser.updateCanvasDimensions(canvas, width, height);
			if (!noUpdates) Browser.updateResizeListeners();
		},
		windowedWidth: 0,
		windowedHeight: 0,
		setFullscreenCanvasSize() {
			if (typeof SDL != "undefined") {
				var flags = HEAPU32[SDL.screen >> 2];
				flags = flags | 8388608;
				HEAP32[SDL.screen >> 2] = flags;
			}
			Browser.updateCanvasDimensions(Browser.getCanvas());
			Browser.updateResizeListeners();
		},
		setWindowedCanvasSize() {
			if (typeof SDL != "undefined") {
				var flags = HEAPU32[SDL.screen >> 2];
				flags = flags & -8388609;
				HEAP32[SDL.screen >> 2] = flags;
			}
			Browser.updateCanvasDimensions(Browser.getCanvas());
			Browser.updateResizeListeners();
		},
		updateCanvasDimensions(canvas, wNative, hNative) {
			if (wNative && hNative) {
				canvas.widthNative = wNative;
				canvas.heightNative = hNative;
			} else {
				wNative = canvas.widthNative;
				hNative = canvas.heightNative;
			}
			var w = wNative;
			var h = hNative;
			if (Module["forcedAspectRatio"] > 0) if (w / h < Module["forcedAspectRatio"]) w = Math.round(h * Module["forcedAspectRatio"]);
			else h = Math.round(w / Module["forcedAspectRatio"]);
			if (getFullscreenElement() === canvas.parentNode && typeof screen != "undefined") {
				var factor = Math.min(screen.width / w, screen.height / h);
				w = Math.round(w * factor);
				h = Math.round(h * factor);
			}
			if (Browser.resizeCanvas) {
				if (canvas.width != w) canvas.width = w;
				if (canvas.height != h) canvas.height = h;
				if (typeof canvas.style != "undefined") {
					canvas.style.removeProperty("width");
					canvas.style.removeProperty("height");
				}
			} else {
				if (canvas.width != wNative) canvas.width = wNative;
				if (canvas.height != hNative) canvas.height = hNative;
				if (typeof canvas.style != "undefined") if (w != wNative || h != hNative) {
					canvas.style.setProperty("width", w + "px", "important");
					canvas.style.setProperty("height", h + "px", "important");
				} else {
					canvas.style.removeProperty("width");
					canvas.style.removeProperty("height");
				}
			}
		}
	};
	var EGL = {
		errorCode: 12288,
		defaultDisplayInitialized: false,
		currentContext: 0,
		currentReadSurface: 0,
		currentDrawSurface: 0,
		contextAttributes: {
			alpha: false,
			depth: false,
			stencil: false,
			antialias: false
		},
		stringCache: {},
		setErrorCode(code) {
			EGL.errorCode = code;
		},
		chooseConfig(display, attribList, config, config_size, numConfigs) {
			if (display != 62e3) {
				EGL.setErrorCode(12296);
				return 0;
			}
			if (attribList) for (;;) {
				var param = HEAP32[attribList >> 2];
				if (param == 12321) {
					var alphaSize = HEAP32[attribList + 4 >> 2];
					EGL.contextAttributes.alpha = alphaSize > 0;
				} else if (param == 12325) {
					var depthSize = HEAP32[attribList + 4 >> 2];
					EGL.contextAttributes.depth = depthSize > 0;
				} else if (param == 12326) {
					var stencilSize = HEAP32[attribList + 4 >> 2];
					EGL.contextAttributes.stencil = stencilSize > 0;
				} else if (param == 12337) {
					var samples = HEAP32[attribList + 4 >> 2];
					EGL.contextAttributes.antialias = samples > 0;
				} else if (param == 12338) {
					var samples = HEAP32[attribList + 4 >> 2];
					EGL.contextAttributes.antialias = samples == 1;
				} else if (param == 12544) {
					var requestedPriority = HEAP32[attribList + 4 >> 2];
					EGL.contextAttributes.lowLatency = requestedPriority != 12547;
				} else if (param == 12344) break;
				attribList += 8;
			}
			if ((!config || !config_size) && !numConfigs) {
				EGL.setErrorCode(12300);
				return 0;
			}
			if (numConfigs) HEAP32[numConfigs >> 2] = 1;
			if (config && config_size > 0) HEAPU32[config >> 2] = 62002;
			EGL.setErrorCode(12288);
			return 1;
		}
	};
	var _eglBindAPI = (api) => {
		if (api == 12448) {
			EGL.setErrorCode(12288);
			return 1;
		}
		EGL.setErrorCode(12300);
		return 0;
	};
	var _eglChooseConfig = (display, attrib_list, configs, config_size, numConfigs) => EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs);
	var GLctx;
	var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
		var ext = ctx.getExtension("ANGLE_instanced_arrays");
		if (ext) {
			ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
			ctx["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
			ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
			return 1;
		}
	};
	var webgl_enable_OES_vertex_array_object = (ctx) => {
		var ext = ctx.getExtension("OES_vertex_array_object");
		if (ext) {
			ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
			ctx["deleteVertexArray"] = (vao) => ext["deleteVertexArrayOES"](vao);
			ctx["bindVertexArray"] = (vao) => ext["bindVertexArrayOES"](vao);
			ctx["isVertexArray"] = (vao) => ext["isVertexArrayOES"](vao);
			return 1;
		}
	};
	var webgl_enable_WEBGL_draw_buffers = (ctx) => {
		var ext = ctx.getExtension("WEBGL_draw_buffers");
		if (ext) {
			ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
			return 1;
		}
	};
	var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) => !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));
	var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));
	var webgl_enable_EXT_polygon_offset_clamp = (ctx) => !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));
	var webgl_enable_EXT_clip_control = (ctx) => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));
	var webgl_enable_WEBGL_polygon_mode = (ctx) => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));
	var webgl_enable_WEBGL_multi_draw = (ctx) => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));
	var getEmscriptenSupportedExtensions = (ctx) => {
		var supportedExtensions = [
			"ANGLE_instanced_arrays",
			"EXT_blend_minmax",
			"EXT_disjoint_timer_query",
			"EXT_frag_depth",
			"EXT_shader_texture_lod",
			"EXT_sRGB",
			"OES_element_index_uint",
			"OES_fbo_render_mipmap",
			"OES_standard_derivatives",
			"OES_texture_float",
			"OES_texture_half_float",
			"OES_texture_half_float_linear",
			"OES_vertex_array_object",
			"WEBGL_color_buffer_float",
			"WEBGL_depth_texture",
			"WEBGL_draw_buffers",
			"EXT_color_buffer_float",
			"EXT_conservative_depth",
			"EXT_disjoint_timer_query_webgl2",
			"EXT_texture_norm16",
			"NV_shader_noperspective_interpolation",
			"WEBGL_clip_cull_distance",
			"EXT_clip_control",
			"EXT_color_buffer_half_float",
			"EXT_depth_clamp",
			"EXT_float_blend",
			"EXT_polygon_offset_clamp",
			"EXT_texture_compression_bptc",
			"EXT_texture_compression_rgtc",
			"EXT_texture_filter_anisotropic",
			"KHR_parallel_shader_compile",
			"OES_texture_float_linear",
			"WEBGL_blend_func_extended",
			"WEBGL_compressed_texture_astc",
			"WEBGL_compressed_texture_etc",
			"WEBGL_compressed_texture_etc1",
			"WEBGL_compressed_texture_s3tc",
			"WEBGL_compressed_texture_s3tc_srgb",
			"WEBGL_debug_renderer_info",
			"WEBGL_debug_shaders",
			"WEBGL_lose_context",
			"WEBGL_multi_draw",
			"WEBGL_polygon_mode"
		];
		return (ctx.getSupportedExtensions() || []).filter((ext) => supportedExtensions.includes(ext));
	};
	var registerPreMainLoop = (f) => {
		typeof MainLoop != "undefined" && MainLoop.preMainLoop.push(f);
	};
	var GL = {
		counter: 1,
		buffers: [],
		mappedBuffers: {},
		programs: [],
		framebuffers: [],
		renderbuffers: [],
		textures: [],
		shaders: [],
		vaos: [],
		contexts: [],
		offscreenCanvases: {},
		queries: [],
		samplers: [],
		transformFeedbacks: [],
		syncs: [],
		byteSizeByTypeRoot: 5120,
		byteSizeByType: [
			1,
			1,
			2,
			2,
			4,
			4,
			4,
			2,
			3,
			4,
			8
		],
		stringCache: {},
		stringiCache: {},
		unpackAlignment: 4,
		unpackRowLength: 0,
		recordError: (errorCode) => {
			if (!GL.lastError) GL.lastError = errorCode;
		},
		getNewId: (table) => {
			var ret = GL.counter++;
			for (var i$1 = table.length; i$1 < ret; i$1++) table[i$1] = null;
			while (table[ret]) ret = GL.counter++;
			return ret;
		},
		genObject: (n, buffers, createFunction, objectTable) => {
			for (var i$1 = 0; i$1 < n; i$1++) {
				var buffer = GLctx[createFunction]();
				var id = buffer && GL.getNewId(objectTable);
				if (buffer) {
					buffer.name = id;
					objectTable[id] = buffer;
				} else GL.recordError(1282);
				HEAP32[buffers + i$1 * 4 >> 2] = id;
			}
		},
		MAX_TEMP_BUFFER_SIZE: 2097152,
		numTempVertexBuffersPerSize: 64,
		log2ceilLookup: (i$1) => 32 - Math.clz32(i$1 === 0 ? 0 : i$1 - 1),
		generateTempBuffers: (quads, context) => {
			var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
			context.tempVertexBufferCounters1 = [];
			context.tempVertexBufferCounters2 = [];
			context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex + 1;
			context.tempVertexBuffers1 = [];
			context.tempVertexBuffers2 = [];
			context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex + 1;
			context.tempIndexBuffers = [];
			context.tempIndexBuffers.length = largestIndex + 1;
			for (var i$1 = 0; i$1 <= largestIndex; ++i$1) {
				context.tempIndexBuffers[i$1] = null;
				context.tempVertexBufferCounters1[i$1] = context.tempVertexBufferCounters2[i$1] = 0;
				var ringbufferLength = GL.numTempVertexBuffersPerSize;
				context.tempVertexBuffers1[i$1] = [];
				context.tempVertexBuffers2[i$1] = [];
				var ringbuffer1 = context.tempVertexBuffers1[i$1];
				var ringbuffer2 = context.tempVertexBuffers2[i$1];
				ringbuffer1.length = ringbuffer2.length = ringbufferLength;
				for (var j = 0; j < ringbufferLength; ++j) ringbuffer1[j] = ringbuffer2[j] = null;
			}
			if (quads) {
				context.tempQuadIndexBuffer = GLctx.createBuffer();
				context.GLctx.bindBuffer(34963, context.tempQuadIndexBuffer);
				var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
				var quadIndexes = new Uint16Array(numIndexes);
				var i$1 = 0, v = 0;
				while (1) {
					quadIndexes[i$1++] = v;
					if (i$1 >= numIndexes) break;
					quadIndexes[i$1++] = v + 1;
					if (i$1 >= numIndexes) break;
					quadIndexes[i$1++] = v + 2;
					if (i$1 >= numIndexes) break;
					quadIndexes[i$1++] = v;
					if (i$1 >= numIndexes) break;
					quadIndexes[i$1++] = v + 2;
					if (i$1 >= numIndexes) break;
					quadIndexes[i$1++] = v + 3;
					if (i$1 >= numIndexes) break;
					v += 4;
				}
				context.GLctx.bufferData(34963, quadIndexes, 35044);
				context.GLctx.bindBuffer(34963, null);
			}
		},
		getTempVertexBuffer: (sizeBytes) => {
			var idx = GL.log2ceilLookup(sizeBytes);
			var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
			var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
			GL.currentContext.tempVertexBufferCounters1[idx] = GL.currentContext.tempVertexBufferCounters1[idx] + 1 & GL.numTempVertexBuffersPerSize - 1;
			var vbo = ringbuffer[nextFreeBufferIndex];
			if (vbo) return vbo;
			var prevVBO = GLctx.getParameter(34964);
			ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
			GLctx.bindBuffer(34962, ringbuffer[nextFreeBufferIndex]);
			GLctx.bufferData(34962, 1 << idx, 35048);
			GLctx.bindBuffer(34962, prevVBO);
			return ringbuffer[nextFreeBufferIndex];
		},
		getTempIndexBuffer: (sizeBytes) => {
			var idx = GL.log2ceilLookup(sizeBytes);
			var ibo = GL.currentContext.tempIndexBuffers[idx];
			if (ibo) return ibo;
			var prevIBO = GLctx.getParameter(34965);
			GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
			GLctx.bindBuffer(34963, GL.currentContext.tempIndexBuffers[idx]);
			GLctx.bufferData(34963, 1 << idx, 35048);
			GLctx.bindBuffer(34963, prevIBO);
			return GL.currentContext.tempIndexBuffers[idx];
		},
		newRenderingFrameStarted: () => {
			if (!GL.currentContext) return;
			var vb = GL.currentContext.tempVertexBuffers1;
			GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
			GL.currentContext.tempVertexBuffers2 = vb;
			vb = GL.currentContext.tempVertexBufferCounters1;
			GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
			GL.currentContext.tempVertexBufferCounters2 = vb;
			var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
			for (var i$1 = 0; i$1 <= largestIndex; ++i$1) GL.currentContext.tempVertexBufferCounters1[i$1] = 0;
		},
		getSource: (shader, count, string, length) => {
			var source = "";
			for (var i$1 = 0; i$1 < count; ++i$1) {
				var len = length ? HEAPU32[length + i$1 * 4 >> 2] : void 0;
				source += UTF8ToString(HEAPU32[string + i$1 * 4 >> 2], len);
			}
			return source;
		},
		calcBufLength: (size, type, stride, count) => {
			if (stride > 0) return count * stride;
			var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
			return size * typeSize * count;
		},
		usedTempBuffers: [],
		preDrawHandleClientVertexAttribBindings: (count) => {
			GL.resetBufferBinding = false;
			for (var i$1 = 0; i$1 < GL.currentContext.maxVertexAttribs; ++i$1) {
				var cb = GL.currentContext.clientBuffers[i$1];
				if (!cb.clientside || !cb.enabled) continue;
				GL.resetBufferBinding = true;
				var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
				var buf = GL.getTempVertexBuffer(size);
				GLctx.bindBuffer(34962, buf);
				GLctx.bufferSubData(34962, 0, HEAPU8.subarray(cb.ptr, cb.ptr + size));
				cb.vertexAttribPointerAdaptor.call(GLctx, i$1, cb.size, cb.type, cb.normalized, cb.stride, 0);
			}
		},
		postDrawHandleClientVertexAttribBindings: () => {
			if (GL.resetBufferBinding) GLctx.bindBuffer(34962, GL.buffers[GLctx.currentArrayBufferBinding]);
		},
		createContext: (canvas, webGLContextAttributes) => {
			if (!canvas.getContextSafariWebGL2Fixed) {
				canvas.getContextSafariWebGL2Fixed = canvas.getContext;
				function fixedGetContext(ver, attrs) {
					var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
					return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null;
				}
				canvas.getContext = fixedGetContext;
			}
			var ctx = webGLContextAttributes.majorVersion > 1 ? canvas.getContext("webgl2", webGLContextAttributes) : canvas.getContext("webgl", webGLContextAttributes);
			if (!ctx) return 0;
			return GL.registerContext(ctx, webGLContextAttributes);
		},
		registerContext: (ctx, webGLContextAttributes) => {
			var handle = GL.getNewId(GL.contexts);
			var context = {
				handle,
				attributes: webGLContextAttributes,
				version: webGLContextAttributes.majorVersion,
				GLctx: ctx
			};
			if (ctx.canvas) ctx.canvas.GLctxObject = context;
			GL.contexts[handle] = context;
			if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) GL.initExtensions(context);
			context.maxVertexAttribs = context.GLctx.getParameter(34921);
			context.clientBuffers = [];
			for (var i$1 = 0; i$1 < context.maxVertexAttribs; i$1++) context.clientBuffers[i$1] = {
				enabled: false,
				clientside: false,
				size: 0,
				type: 0,
				normalized: 0,
				stride: 0,
				ptr: 0,
				vertexAttribPointerAdaptor: null
			};
			GL.generateTempBuffers(false, context);
			return handle;
		},
		makeContextCurrent: (contextHandle) => {
			GL.currentContext = GL.contexts[contextHandle];
			Module["ctx"] = GLctx = GL.currentContext?.GLctx;
			return !(contextHandle && !GLctx);
		},
		getContext: (contextHandle) => GL.contexts[contextHandle],
		deleteContext: (contextHandle) => {
			if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
			if (typeof JSEvents == "object") JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
			if (GL.contexts[contextHandle]?.GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = void 0;
			GL.contexts[contextHandle] = null;
		},
		initExtensions: (context) => {
			context ||= GL.currentContext;
			if (context.initExtensionsDone) return;
			context.initExtensionsDone = true;
			var GLctx$1 = context.GLctx;
			webgl_enable_WEBGL_multi_draw(GLctx$1);
			webgl_enable_EXT_polygon_offset_clamp(GLctx$1);
			webgl_enable_EXT_clip_control(GLctx$1);
			webgl_enable_WEBGL_polygon_mode(GLctx$1);
			webgl_enable_ANGLE_instanced_arrays(GLctx$1);
			webgl_enable_OES_vertex_array_object(GLctx$1);
			webgl_enable_WEBGL_draw_buffers(GLctx$1);
			webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx$1);
			webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx$1);
			if (context.version >= 2) GLctx$1.disjointTimerQueryExt = GLctx$1.getExtension("EXT_disjoint_timer_query_webgl2");
			if (context.version < 2 || !GLctx$1.disjointTimerQueryExt) GLctx$1.disjointTimerQueryExt = GLctx$1.getExtension("EXT_disjoint_timer_query");
			getEmscriptenSupportedExtensions(GLctx$1).forEach((ext) => {
				if (!ext.includes("lose_context") && !ext.includes("debug")) GLctx$1.getExtension(ext);
			});
		}
	};
	var _eglCreateContext = (display, config, hmm, contextAttribs) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		var glesContextVersion = 1;
		for (;;) {
			var param = HEAP32[contextAttribs >> 2];
			if (param == 12440) glesContextVersion = HEAP32[contextAttribs + 4 >> 2];
			else if (param == 12344) break;
			else {
				EGL.setErrorCode(12292);
				return 0;
			}
			contextAttribs += 8;
		}
		if (glesContextVersion < 2 || glesContextVersion > 3) {
			EGL.setErrorCode(12293);
			return 0;
		}
		EGL.contextAttributes.majorVersion = glesContextVersion - 1;
		EGL.contextAttributes.minorVersion = 0;
		EGL.context = GL.createContext(Browser.getCanvas(), EGL.contextAttributes);
		if (EGL.context != 0) {
			EGL.setErrorCode(12288);
			GL.makeContextCurrent(EGL.context);
			Browser.useWebGL = true;
			Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
			GL.makeContextCurrent(null);
			return 62004;
		} else {
			EGL.setErrorCode(12297);
			return 0;
		}
	};
	var _eglCreateWindowSurface = (display, config, win, attrib_list) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		if (config != 62002) {
			EGL.setErrorCode(12293);
			return 0;
		}
		EGL.setErrorCode(12288);
		return 62006;
	};
	var _eglDestroyContext = (display, context) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		if (context != 62004) {
			EGL.setErrorCode(12294);
			return 0;
		}
		GL.deleteContext(EGL.context);
		EGL.setErrorCode(12288);
		if (EGL.currentContext == context) EGL.currentContext = 0;
		return 1;
	};
	var _eglDestroySurface = (display, surface) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		if (surface != 62006) {
			EGL.setErrorCode(12301);
			return 1;
		}
		if (EGL.currentReadSurface == surface) EGL.currentReadSurface = 0;
		if (EGL.currentDrawSurface == surface) EGL.currentDrawSurface = 0;
		EGL.setErrorCode(12288);
		return 1;
	};
	var _eglGetConfigAttrib = (display, config, attribute, value) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		if (config != 62002) {
			EGL.setErrorCode(12293);
			return 0;
		}
		if (!value) {
			EGL.setErrorCode(12300);
			return 0;
		}
		EGL.setErrorCode(12288);
		switch (attribute) {
			case 12320:
				HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 32 : 24;
				return 1;
			case 12321:
				HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 8 : 0;
				return 1;
			case 12322:
				HEAP32[value >> 2] = 8;
				return 1;
			case 12323:
				HEAP32[value >> 2] = 8;
				return 1;
			case 12324:
				HEAP32[value >> 2] = 8;
				return 1;
			case 12325:
				HEAP32[value >> 2] = EGL.contextAttributes.depth ? 24 : 0;
				return 1;
			case 12326:
				HEAP32[value >> 2] = EGL.contextAttributes.stencil ? 8 : 0;
				return 1;
			case 12327:
				HEAP32[value >> 2] = 12344;
				return 1;
			case 12328:
				HEAP32[value >> 2] = 62002;
				return 1;
			case 12329:
				HEAP32[value >> 2] = 0;
				return 1;
			case 12330:
				HEAP32[value >> 2] = 4096;
				return 1;
			case 12331:
				HEAP32[value >> 2] = 16777216;
				return 1;
			case 12332:
				HEAP32[value >> 2] = 4096;
				return 1;
			case 12333:
				HEAP32[value >> 2] = 0;
				return 1;
			case 12334:
				HEAP32[value >> 2] = 0;
				return 1;
			case 12335:
				HEAP32[value >> 2] = 12344;
				return 1;
			case 12337:
				HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 4 : 0;
				return 1;
			case 12338:
				HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 1 : 0;
				return 1;
			case 12339:
				HEAP32[value >> 2] = 4;
				return 1;
			case 12340:
				HEAP32[value >> 2] = 12344;
				return 1;
			case 12341:
			case 12342:
			case 12343:
				HEAP32[value >> 2] = -1;
				return 1;
			case 12345:
			case 12346:
				HEAP32[value >> 2] = 0;
				return 1;
			case 12347:
				HEAP32[value >> 2] = 0;
				return 1;
			case 12348:
				HEAP32[value >> 2] = 1;
				return 1;
			case 12349:
			case 12350:
				HEAP32[value >> 2] = 0;
				return 1;
			case 12351:
				HEAP32[value >> 2] = 12430;
				return 1;
			case 12352:
				HEAP32[value >> 2] = 4;
				return 1;
			case 12354:
				HEAP32[value >> 2] = 0;
				return 1;
			default:
				EGL.setErrorCode(12292);
				return 0;
		}
	};
	var _eglGetDisplay = (nativeDisplayType) => {
		EGL.setErrorCode(12288);
		if (nativeDisplayType != 0 && nativeDisplayType != 1) return 0;
		return 62e3;
	};
	var _eglGetError = () => EGL.errorCode;
	var _eglInitialize = (display, majorVersion, minorVersion) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		if (majorVersion) HEAP32[majorVersion >> 2] = 1;
		if (minorVersion) HEAP32[minorVersion >> 2] = 4;
		EGL.defaultDisplayInitialized = true;
		EGL.setErrorCode(12288);
		return 1;
	};
	var _eglMakeCurrent = (display, draw, read, context) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		if (context != 0 && context != 62004) {
			EGL.setErrorCode(12294);
			return 0;
		}
		if (read != 0 && read != 62006 || draw != 0 && draw != 62006) {
			EGL.setErrorCode(12301);
			return 0;
		}
		GL.makeContextCurrent(context ? EGL.context : null);
		EGL.currentContext = context;
		EGL.currentDrawSurface = draw;
		EGL.currentReadSurface = read;
		EGL.setErrorCode(12288);
		return 1;
	};
	var stringToNewUTF8 = (str) => {
		var size = lengthBytesUTF8(str) + 1;
		var ret = _malloc(size);
		if (ret) stringToUTF8(str, ret, size);
		return ret;
	};
	var _eglQueryString = (display, name) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		EGL.setErrorCode(12288);
		if (EGL.stringCache[name]) return EGL.stringCache[name];
		var ret;
		switch (name) {
			case 12371:
				ret = stringToNewUTF8("Emscripten");
				break;
			case 12372:
				ret = stringToNewUTF8("1.4 Emscripten EGL");
				break;
			case 12373:
				ret = stringToNewUTF8("");
				break;
			case 12429:
				ret = stringToNewUTF8("OpenGL_ES");
				break;
			default:
				EGL.setErrorCode(12300);
				return 0;
		}
		EGL.stringCache[name] = ret;
		return ret;
	};
	var _eglSwapBuffers = (dpy, surface) => {
		if (!EGL.defaultDisplayInitialized) EGL.setErrorCode(12289);
		else if (!GLctx) EGL.setErrorCode(12290);
		else if (GLctx.isContextLost()) EGL.setErrorCode(12302);
		else {
			EGL.setErrorCode(12288);
			return 1;
		}
		return 0;
	};
	var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
		MainLoop.func = iterFunc;
		MainLoop.arg = arg;
		var thisMainLoopId = MainLoop.currentlyRunningMainloop;
		function checkIsRunning() {
			if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
				maybeExit();
				return false;
			}
			return true;
		}
		MainLoop.running = false;
		MainLoop.runner = function MainLoop_runner() {
			if (ABORT) return;
			if (MainLoop.queue.length > 0) {
				var blocker = MainLoop.queue.shift();
				blocker.func(blocker.arg);
				if (MainLoop.remainingBlockers) {
					var remaining = MainLoop.remainingBlockers;
					var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
					if (blocker.counted) MainLoop.remainingBlockers = next;
					else {
						next = next + .5;
						MainLoop.remainingBlockers = (8 * remaining + next) / 9;
					}
				}
				MainLoop.updateStatus();
				if (!checkIsRunning()) return;
				setTimeout(MainLoop.runner, 0);
				return;
			}
			if (!checkIsRunning()) return;
			MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
			if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
				MainLoop.scheduler();
				return;
			} else if (MainLoop.timingMode == 0) MainLoop.tickStartTime = _emscripten_get_now();
			MainLoop.runIter(iterFunc);
			if (!checkIsRunning()) return;
			MainLoop.scheduler();
		};
		if (!noSetTiming) {
			if (fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps);
			else _emscripten_set_main_loop_timing(1, 1);
			MainLoop.scheduler();
		}
		if (simulateInfiniteLoop) throw "unwind";
	};
	var MainLoop = {
		running: false,
		scheduler: null,
		method: "",
		currentlyRunningMainloop: 0,
		func: null,
		arg: 0,
		timingMode: 0,
		timingValue: 0,
		currentFrameNumber: 0,
		queue: [],
		preMainLoop: [],
		postMainLoop: [],
		pause() {
			MainLoop.scheduler = null;
			MainLoop.currentlyRunningMainloop++;
		},
		resume() {
			MainLoop.currentlyRunningMainloop++;
			var timingMode = MainLoop.timingMode;
			var timingValue = MainLoop.timingValue;
			var func = MainLoop.func;
			MainLoop.func = null;
			setMainLoop(func, 0, false, MainLoop.arg, true);
			_emscripten_set_main_loop_timing(timingMode, timingValue);
			MainLoop.scheduler();
		},
		updateStatus() {
			if (Module["setStatus"]) {
				var message = Module["statusMessage"] || "Please wait...";
				var remaining = MainLoop.remainingBlockers ?? 0;
				var expected = MainLoop.expectedBlockers ?? 0;
				if (remaining) if (remaining < expected) Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
				else Module["setStatus"](message);
				else Module["setStatus"]("");
			}
		},
		init() {
			Module["preMainLoop"] && MainLoop.preMainLoop.push(Module["preMainLoop"]);
			Module["postMainLoop"] && MainLoop.postMainLoop.push(Module["postMainLoop"]);
		},
		runIter(func) {
			if (ABORT) return;
			for (var pre of MainLoop.preMainLoop) if (pre() === false) return;
			callUserCallback(func);
			for (var post of MainLoop.postMainLoop) post();
		},
		nextRAF: 0,
		fakeRequestAnimationFrame(func) {
			var now = Date.now();
			if (MainLoop.nextRAF === 0) MainLoop.nextRAF = now + 1e3 / 60;
			else while (now + 2 >= MainLoop.nextRAF) MainLoop.nextRAF += 1e3 / 60;
			var delay = Math.max(MainLoop.nextRAF - now, 0);
			setTimeout(func, delay);
		},
		requestAnimationFrame(func) {
			if (globalThis.requestAnimationFrame) requestAnimationFrame(func);
			else MainLoop.fakeRequestAnimationFrame(func);
		}
	};
	var _emscripten_set_main_loop_timing = (mode, value) => {
		MainLoop.timingMode = mode;
		MainLoop.timingValue = value;
		if (!MainLoop.func) return 1;
		if (!MainLoop.running) MainLoop.running = true;
		if (mode == 0) {
			MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
				var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
				setTimeout(MainLoop.runner, timeUntilNextTick);
			};
			MainLoop.method = "timeout";
		} else if (mode == 1) {
			MainLoop.scheduler = function MainLoop_scheduler_rAF() {
				MainLoop.requestAnimationFrame(MainLoop.runner);
			};
			MainLoop.method = "rAF";
		} else if (mode == 2) {
			if (!MainLoop.setImmediate) if (globalThis.setImmediate) MainLoop.setImmediate = setImmediate;
			else {
				var setImmediates = [];
				var emscriptenMainLoopMessageId = "setimmediate";
				var MainLoop_setImmediate_messageHandler = (event$1) => {
					if (event$1.data === emscriptenMainLoopMessageId || event$1.data.target === emscriptenMainLoopMessageId) {
						event$1.stopPropagation();
						setImmediates.shift()();
					}
				};
				addEventListener("message", MainLoop_setImmediate_messageHandler, true);
				MainLoop.setImmediate = (func) => {
					setImmediates.push(func);
					if (ENVIRONMENT_IS_WORKER) {
						Module["setImmediates"] ??= [];
						Module["setImmediates"].push(func);
						postMessage({ target: emscriptenMainLoopMessageId });
					} else postMessage(emscriptenMainLoopMessageId, "*");
				};
			}
			MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
				MainLoop.setImmediate(MainLoop.runner);
			};
			MainLoop.method = "immediate";
		}
		return 0;
	};
	var _eglSwapInterval = (display, interval) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		if (interval == 0) _emscripten_set_main_loop_timing(0, 0);
		else _emscripten_set_main_loop_timing(1, interval);
		EGL.setErrorCode(12288);
		return 1;
	};
	var _eglTerminate = (display) => {
		if (display != 62e3) {
			EGL.setErrorCode(12296);
			return 0;
		}
		EGL.currentContext = 0;
		EGL.currentReadSurface = 0;
		EGL.currentDrawSurface = 0;
		EGL.defaultDisplayInitialized = false;
		EGL.setErrorCode(12288);
		return 1;
	};
	var _eglWaitClient = () => {
		EGL.setErrorCode(12288);
		return 1;
	};
	var _eglWaitGL = _eglWaitClient;
	var _eglWaitNative = (nativeEngineId) => {
		EGL.setErrorCode(12288);
		return 1;
	};
	var readEmAsmArgsArray = [];
	var readEmAsmArgs = (sigPtr, buf) => {
		readEmAsmArgsArray.length = 0;
		var ch;
		while (ch = HEAPU8[sigPtr++]) {
			var wide = ch != 105;
			wide &= ch != 112;
			buf += wide && buf % 8 ? 4 : 0;
			readEmAsmArgsArray.push(ch == 112 ? HEAPU32[buf >> 2] : ch == 106 ? HEAP64[buf >> 3] : ch == 105 ? HEAP32[buf >> 2] : HEAPF64[buf >> 3]);
			buf += wide ? 8 : 4;
		}
		return readEmAsmArgsArray;
	};
	var runEmAsmFunction = (code, sigPtr, argbuf) => {
		var args = readEmAsmArgs(sigPtr, argbuf);
		return ASM_CONSTS[code](...args);
	};
	var _emscripten_asm_const_int = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);
	var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
		var args = readEmAsmArgs(sigPtr, argbuf);
		return ASM_CONSTS[emAsmAddr](...args);
	};
	var _emscripten_asm_const_int_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
	var _emscripten_asm_const_ptr_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
	var _emscripten_cancel_main_loop = () => {
		MainLoop.pause();
		MainLoop.func = null;
	};
	var JSEvents = {
		memcpy(target, src, size) {
			HEAP8.set(HEAP8.subarray(src, src + size), target);
		},
		removeAllEventListeners() {
			while (JSEvents.eventHandlers.length) JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
			JSEvents.deferredCalls = [];
		},
		inEventHandler: 0,
		deferredCalls: [],
		deferCall(targetFunction, precedence, argsList) {
			function arraysHaveEqualContent(arrA, arrB) {
				if (arrA.length != arrB.length) return false;
				for (var i$1 in arrA) if (arrA[i$1] != arrB[i$1]) return false;
				return true;
			}
			for (var call of JSEvents.deferredCalls) if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) return;
			JSEvents.deferredCalls.push({
				targetFunction,
				precedence,
				argsList
			});
			JSEvents.deferredCalls.sort((x, y) => x.precedence < y.precedence);
		},
		removeDeferredCalls(targetFunction) {
			JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
		},
		canPerformEventHandlerRequests() {
			if (navigator.userActivation) return navigator.userActivation.isActive;
			return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
		},
		runDeferredCalls() {
			if (!JSEvents.canPerformEventHandlerRequests()) return;
			var deferredCalls = JSEvents.deferredCalls;
			JSEvents.deferredCalls = [];
			for (var call of deferredCalls) call.targetFunction(...call.argsList);
		},
		eventHandlers: [],
		removeAllHandlersOnTarget: (target, eventTypeString) => {
			for (var i$1 = 0; i$1 < JSEvents.eventHandlers.length; ++i$1) if (JSEvents.eventHandlers[i$1].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i$1].eventTypeString)) JSEvents._removeHandler(i$1--);
		},
		_removeHandler(i$1) {
			var h = JSEvents.eventHandlers[i$1];
			h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
			JSEvents.eventHandlers.splice(i$1, 1);
		},
		registerOrRemoveHandler(eventHandler) {
			if (!eventHandler.target) return -4;
			if (eventHandler.callbackfunc) {
				eventHandler.eventListenerFunc = function(event$1) {
					++JSEvents.inEventHandler;
					JSEvents.currentEventHandler = eventHandler;
					JSEvents.runDeferredCalls();
					eventHandler.handlerFunc(event$1);
					JSEvents.runDeferredCalls();
					--JSEvents.inEventHandler;
				};
				eventHandler.target.addEventListener(eventHandler.eventTypeString, eventHandler.eventListenerFunc, eventHandler.useCapture);
				JSEvents.eventHandlers.push(eventHandler);
			} else for (var i$1 = 0; i$1 < JSEvents.eventHandlers.length; ++i$1) if (JSEvents.eventHandlers[i$1].target == eventHandler.target && JSEvents.eventHandlers[i$1].eventTypeString == eventHandler.eventTypeString) JSEvents._removeHandler(i$1--);
			return 0;
		},
		getNodeNameForTarget(target) {
			if (!target) return "";
			if (target == window) return "#window";
			if (target == screen) return "#screen";
			return target?.nodeName || "";
		},
		fullscreenEnabled() {
			return document.fullscreenEnabled || document.webkitFullscreenEnabled;
		}
	};
	var specialHTMLTargets = [
		0,
		document,
		window
	];
	var maybeCStringToJsString = (cString) => cString > 2 ? UTF8ToString(cString) : cString;
	var findEventTarget = (target) => {
		target = maybeCStringToJsString(target);
		return specialHTMLTargets[target] || document.querySelector(target);
	};
	var findCanvasEventTarget = findEventTarget;
	var _emscripten_get_canvas_element_size = (target, width, height) => {
		var canvas = findCanvasEventTarget(target);
		if (!canvas) return -4;
		HEAP32[width >> 2] = canvas.width;
		HEAP32[height >> 2] = canvas.height;
	};
	var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
	var stringToUTF8OnStack = (str) => {
		var size = lengthBytesUTF8(str) + 1;
		var ret = stackAlloc(size);
		stringToUTF8(str, ret, size);
		return ret;
	};
	var getCanvasElementSize = (target) => {
		var sp = stackSave();
		var w = stackAlloc(8);
		var h = w + 4;
		var targetInt = stringToUTF8OnStack(target.id);
		_emscripten_get_canvas_element_size(targetInt, w, h);
		var size = [HEAP32[w >> 2], HEAP32[h >> 2]];
		stackRestore(sp);
		return size;
	};
	var _emscripten_set_canvas_element_size = (target, width, height) => {
		var canvas = findCanvasEventTarget(target);
		if (!canvas) return -4;
		canvas.width = width;
		canvas.height = height;
		return 0;
	};
	var setCanvasElementSize = (target, width, height) => {
		if (!target.controlTransferredOffscreen) {
			target.width = width;
			target.height = height;
		} else {
			var sp = stackSave();
			var targetInt = stringToUTF8OnStack(target.id);
			_emscripten_set_canvas_element_size(targetInt, width, height);
			stackRestore(sp);
		}
	};
	var currentFullscreenStrategy = {};
	var registerRestoreOldStyle = (canvas) => {
		var canvasSize = getCanvasElementSize(canvas);
		var oldWidth = canvasSize[0];
		var oldHeight = canvasSize[1];
		var oldCssWidth = canvas.style.width;
		var oldCssHeight = canvas.style.height;
		var oldBackgroundColor = canvas.style.backgroundColor;
		var oldDocumentBackgroundColor = document.body.style.backgroundColor;
		var oldPaddingLeft = canvas.style.paddingLeft;
		var oldPaddingRight = canvas.style.paddingRight;
		var oldPaddingTop = canvas.style.paddingTop;
		var oldPaddingBottom = canvas.style.paddingBottom;
		var oldMarginLeft = canvas.style.marginLeft;
		var oldMarginRight = canvas.style.marginRight;
		var oldMarginTop = canvas.style.marginTop;
		var oldMarginBottom = canvas.style.marginBottom;
		var oldDocumentBodyMargin = document.body.style.margin;
		var oldDocumentOverflow = document.documentElement.style.overflow;
		var oldDocumentScroll = document.body.scroll;
		var oldImageRendering = canvas.style.imageRendering;
		function restoreOldStyle() {
			if (!getFullscreenElement()) {
				document.removeEventListener("fullscreenchange", restoreOldStyle);
				document.removeEventListener("webkitfullscreenchange", restoreOldStyle);
				setCanvasElementSize(canvas, oldWidth, oldHeight);
				canvas.style.width = oldCssWidth;
				canvas.style.height = oldCssHeight;
				canvas.style.backgroundColor = oldBackgroundColor;
				if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = "white";
				document.body.style.backgroundColor = oldDocumentBackgroundColor;
				canvas.style.paddingLeft = oldPaddingLeft;
				canvas.style.paddingRight = oldPaddingRight;
				canvas.style.paddingTop = oldPaddingTop;
				canvas.style.paddingBottom = oldPaddingBottom;
				canvas.style.marginLeft = oldMarginLeft;
				canvas.style.marginRight = oldMarginRight;
				canvas.style.marginTop = oldMarginTop;
				canvas.style.marginBottom = oldMarginBottom;
				document.body.style.margin = oldDocumentBodyMargin;
				document.documentElement.style.overflow = oldDocumentOverflow;
				document.body.scroll = oldDocumentScroll;
				canvas.style.imageRendering = oldImageRendering;
				if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
				if (currentFullscreenStrategy.canvasResizedCallback) ((a1, a2, a3) => dynCall_iiii(currentFullscreenStrategy.canvasResizedCallback, a1, a2, a3))(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
			}
		}
		document.addEventListener("fullscreenchange", restoreOldStyle);
		document.addEventListener("webkitfullscreenchange", restoreOldStyle);
		return restoreOldStyle;
	};
	var setLetterbox = (element, topBottom, leftRight) => {
		element.style.paddingLeft = element.style.paddingRight = leftRight + "px";
		element.style.paddingTop = element.style.paddingBottom = topBottom + "px";
	};
	var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {
		left: 0,
		top: 0
	};
	var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
		var restoreOldStyle = registerRestoreOldStyle(target);
		var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
		var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
		var rect = getBoundingClientRect(target);
		var windowedCssWidth = rect.width;
		var windowedCssHeight = rect.height;
		var canvasSize = getCanvasElementSize(target);
		var windowedRttWidth = canvasSize[0];
		var windowedRttHeight = canvasSize[1];
		if (strategy.scaleMode == 3) {
			setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
			cssWidth = windowedCssWidth;
			cssHeight = windowedCssHeight;
		} else if (strategy.scaleMode == 2) if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
			var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
			setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
			cssHeight = desiredCssHeight;
		} else {
			var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
			setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
			cssWidth = desiredCssWidth;
		}
		target.style.backgroundColor ||= "black";
		document.body.style.backgroundColor ||= "black";
		target.style.width = cssWidth + "px";
		target.style.height = cssHeight + "px";
		if (strategy.filteringMode == 1) {
			target.style.imageRendering = "optimizeSpeed";
			target.style.imageRendering = "-moz-crisp-edges";
			target.style.imageRendering = "-o-crisp-edges";
			target.style.imageRendering = "-webkit-optimize-contrast";
			target.style.imageRendering = "optimize-contrast";
			target.style.imageRendering = "crisp-edges";
			target.style.imageRendering = "pixelated";
		}
		var dpiScale = strategy.canvasResolutionScaleMode == 2 ? devicePixelRatio : 1;
		if (strategy.canvasResolutionScaleMode != 0) {
			var newWidth = cssWidth * dpiScale | 0;
			var newHeight = cssHeight * dpiScale | 0;
			setCanvasElementSize(target, newWidth, newHeight);
			if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
		}
		return restoreOldStyle;
	};
	var JSEvents_requestFullscreen = (target, strategy) => {
		if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) JSEvents_resizeCanvasForFullscreen(target, strategy);
		if (target.requestFullscreen) target.requestFullscreen();
		else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		else return JSEvents.fullscreenEnabled() ? -3 : -1;
		currentFullscreenStrategy = strategy;
		if (strategy.canvasResizedCallback) ((a1, a2, a3) => dynCall_iiii(strategy.canvasResizedCallback, a1, a2, a3))(37, 0, strategy.canvasResizedCallbackUserData);
		return 0;
	};
	var _emscripten_exit_fullscreen = () => {
		if (!JSEvents.fullscreenEnabled()) return -1;
		JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
		var d = specialHTMLTargets[1];
		if (d.exitFullscreen) d.fullscreenElement && d.exitFullscreen();
		else if (d.webkitExitFullscreen) d.webkitFullscreenElement && d.webkitExitFullscreen();
		else return -1;
		return 0;
	};
	var requestPointerLock = (target) => {
		if (target.requestPointerLock) target.requestPointerLock();
		else {
			if (document.body.requestPointerLock) return -3;
			return -1;
		}
		return 0;
	};
	var _emscripten_exit_pointerlock = () => {
		JSEvents.removeDeferredCalls(requestPointerLock);
		if (!document.exitPointerLock) return -1;
		document.exitPointerLock();
		return 0;
	};
	var __emscripten_runtime_keepalive_clear = () => {
		noExitRuntime = false;
		runtimeKeepaliveCounter = 0;
	};
	var _emscripten_force_exit = (status) => {
		__emscripten_runtime_keepalive_clear();
		_exit(status);
	};
	var _emscripten_get_device_pixel_ratio = () => devicePixelRatio;
	var _emscripten_get_element_css_size = (target, width, height) => {
		target = findEventTarget(target);
		if (!target) return -4;
		var rect = getBoundingClientRect(target);
		HEAPF64[width >> 3] = rect.width;
		HEAPF64[height >> 3] = rect.height;
		return 0;
	};
	var fillGamepadEventData = (eventStruct, e) => {
		HEAPF64[eventStruct >> 3] = e.timestamp;
		for (var i$1 = 0; i$1 < e.axes.length; ++i$1) HEAPF64[eventStruct + i$1 * 8 + 16 >> 3] = e.axes[i$1];
		for (var i$1 = 0; i$1 < e.buttons.length; ++i$1) if (typeof e.buttons[i$1] == "object") HEAPF64[eventStruct + i$1 * 8 + 528 >> 3] = e.buttons[i$1].value;
		else HEAPF64[eventStruct + i$1 * 8 + 528 >> 3] = e.buttons[i$1];
		for (var i$1 = 0; i$1 < e.buttons.length; ++i$1) if (typeof e.buttons[i$1] == "object") HEAP8[eventStruct + i$1 + 1040] = e.buttons[i$1].pressed;
		else HEAP8[eventStruct + i$1 + 1040] = e.buttons[i$1] == 1;
		HEAP8[eventStruct + 1104] = e.connected;
		HEAP32[eventStruct + 1108 >> 2] = e.index;
		HEAP32[eventStruct + 8 >> 2] = e.axes.length;
		HEAP32[eventStruct + 12 >> 2] = e.buttons.length;
		stringToUTF8(e.id, eventStruct + 1112, 64);
		stringToUTF8(e.mapping, eventStruct + 1176, 64);
	};
	var _emscripten_get_gamepad_status = (index, gamepadState) => {
		if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
		if (!JSEvents.lastGamepadState[index]) return -7;
		fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
		return 0;
	};
	var _emscripten_get_num_gamepads = () => JSEvents.lastGamepadState.length;
	var _emscripten_get_screen_size = (width, height) => {
		HEAP32[width >> 2] = screen.width;
		HEAP32[height >> 2] = screen.height;
	};
	var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
	var _emscripten_glActiveTexture = _glActiveTexture;
	var _glAttachShader = (program, shader) => {
		GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
	};
	var _emscripten_glAttachShader = _glAttachShader;
	var _glBeginQuery = (target, id) => {
		GLctx.beginQuery(target, GL.queries[id]);
	};
	var _emscripten_glBeginQuery = _glBeginQuery;
	var _glBeginQueryEXT = (target, id) => {
		GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id]);
	};
	var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;
	var _glBeginTransformFeedback = (x0) => GLctx.beginTransformFeedback(x0);
	var _emscripten_glBeginTransformFeedback = _glBeginTransformFeedback;
	var _glBindAttribLocation = (program, index, name) => {
		GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
	};
	var _emscripten_glBindAttribLocation = _glBindAttribLocation;
	var _glBindBuffer = (target, buffer) => {
		if (buffer && !GL.buffers[buffer]) {
			var b = GLctx.createBuffer();
			b.name = buffer;
			GL.buffers[buffer] = b;
		}
		if (target == 34962) GLctx.currentArrayBufferBinding = buffer;
		else if (target == 34963) GLctx.currentElementArrayBufferBinding = buffer;
		if (target == 35051) GLctx.currentPixelPackBufferBinding = buffer;
		else if (target == 35052) GLctx.currentPixelUnpackBufferBinding = buffer;
		GLctx.bindBuffer(target, GL.buffers[buffer]);
	};
	var _emscripten_glBindBuffer = _glBindBuffer;
	var _glBindBufferBase = (target, index, buffer) => {
		GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
	};
	var _emscripten_glBindBufferBase = _glBindBufferBase;
	var _glBindBufferRange = (target, index, buffer, offset, ptrsize) => {
		GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize);
	};
	var _emscripten_glBindBufferRange = _glBindBufferRange;
	var _glBindFramebuffer = (target, framebuffer) => {
		GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
	};
	var _emscripten_glBindFramebuffer = _glBindFramebuffer;
	var _glBindRenderbuffer = (target, renderbuffer) => {
		GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
	};
	var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;
	var _glBindSampler = (unit, sampler) => {
		GLctx.bindSampler(unit, GL.samplers[sampler]);
	};
	var _emscripten_glBindSampler = _glBindSampler;
	var _glBindTexture = (target, texture) => {
		GLctx.bindTexture(target, GL.textures[texture]);
	};
	var _emscripten_glBindTexture = _glBindTexture;
	var _glBindTransformFeedback = (target, id) => {
		GLctx.bindTransformFeedback(target, GL.transformFeedbacks[id]);
	};
	var _emscripten_glBindTransformFeedback = _glBindTransformFeedback;
	var _glBindVertexArray = (vao) => {
		GLctx.bindVertexArray(GL.vaos[vao]);
		var ibo = GLctx.getParameter(34965);
		GLctx.currentElementArrayBufferBinding = ibo ? ibo.name | 0 : 0;
	};
	var _emscripten_glBindVertexArray = _glBindVertexArray;
	var _emscripten_glBindVertexArrayOES = _glBindVertexArray;
	var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
	var _emscripten_glBlendColor = _glBlendColor;
	var _glBlendEquation = (x0) => GLctx.blendEquation(x0);
	var _emscripten_glBlendEquation = _glBlendEquation;
	var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
	var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;
	var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
	var _emscripten_glBlendFunc = _glBlendFunc;
	var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
	var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;
	var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);
	var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;
	var _glBufferData = (target, size, data, usage) => {
		if (GL.currentContext.version >= 2) {
			if (data && size) GLctx.bufferData(target, HEAPU8, usage, data, size);
			else GLctx.bufferData(target, size, usage);
			return;
		}
		GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
	};
	var _emscripten_glBufferData = _glBufferData;
	var _glBufferSubData = (target, offset, size, data) => {
		if (GL.currentContext.version >= 2) {
			size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
			return;
		}
		GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size));
	};
	var _emscripten_glBufferSubData = _glBufferSubData;
	var _glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);
	var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;
	var _glClear = (x0) => GLctx.clear(x0);
	var _emscripten_glClear = _glClear;
	var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);
	var _emscripten_glClearBufferfi = _glClearBufferfi;
	var _glClearBufferfv = (buffer, drawbuffer, value) => {
		GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, value >> 2);
	};
	var _emscripten_glClearBufferfv = _glClearBufferfv;
	var _glClearBufferiv = (buffer, drawbuffer, value) => {
		GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, value >> 2);
	};
	var _emscripten_glClearBufferiv = _glClearBufferiv;
	var _glClearBufferuiv = (buffer, drawbuffer, value) => {
		GLctx.clearBufferuiv(buffer, drawbuffer, HEAPU32, value >> 2);
	};
	var _emscripten_glClearBufferuiv = _glClearBufferuiv;
	var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
	var _emscripten_glClearColor = _glClearColor;
	var _glClearDepthf = (x0) => GLctx.clearDepth(x0);
	var _emscripten_glClearDepthf = _glClearDepthf;
	var _glClearStencil = (x0) => GLctx.clearStencil(x0);
	var _emscripten_glClearStencil = _glClearStencil;
	var _glClientWaitSync = (sync, flags, timeout) => {
		timeout = Number(timeout);
		return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
	};
	var _emscripten_glClientWaitSync = _glClientWaitSync;
	var _glClipControlEXT = (origin, depth) => {
		GLctx.extClipControl["clipControlEXT"](origin, depth);
	};
	var _emscripten_glClipControlEXT = _glClipControlEXT;
	var _glColorMask = (red, green, blue, alpha) => {
		GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
	};
	var _emscripten_glColorMask = _glColorMask;
	var _glCompileShader = (shader) => {
		GLctx.compileShader(GL.shaders[shader]);
	};
	var _emscripten_glCompileShader = _glCompileShader;
	var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
		if (GL.currentContext.version >= 2) {
			if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
				GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
				return;
			}
			GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
			return;
		}
		GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray(data, data + imageSize));
	};
	var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;
	var _glCompressedTexImage3D = (target, level, internalFormat, width, height, depth, border, imageSize, data) => {
		if (GLctx.currentPixelUnpackBufferBinding) GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
		else GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
	};
	var _emscripten_glCompressedTexImage3D = _glCompressedTexImage3D;
	var _glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
		if (GL.currentContext.version >= 2) {
			if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
				GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
				return;
			}
			GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8, data, imageSize);
			return;
		}
		GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8.subarray(data, data + imageSize));
	};
	var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;
	var _glCompressedTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) => {
		if (GLctx.currentPixelUnpackBufferBinding) GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data);
		else GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, HEAPU8, data, imageSize);
	};
	var _emscripten_glCompressedTexSubImage3D = _glCompressedTexSubImage3D;
	var _glCopyBufferSubData = (x0, x1, x2, x3, x4) => GLctx.copyBufferSubData(x0, x1, x2, x3, x4);
	var _emscripten_glCopyBufferSubData = _glCopyBufferSubData;
	var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
	var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;
	var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
	var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;
	var _glCopyTexSubImage3D = (x0, x1, x2, x3, x4, x5, x6, x7, x8) => GLctx.copyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8);
	var _emscripten_glCopyTexSubImage3D = _glCopyTexSubImage3D;
	var _glCreateProgram = () => {
		var id = GL.getNewId(GL.programs);
		var program = GLctx.createProgram();
		program.name = id;
		program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
		program.uniformIdCounter = 1;
		GL.programs[id] = program;
		return id;
	};
	var _emscripten_glCreateProgram = _glCreateProgram;
	var _glCreateShader = (shaderType) => {
		var id = GL.getNewId(GL.shaders);
		GL.shaders[id] = GLctx.createShader(shaderType);
		return id;
	};
	var _emscripten_glCreateShader = _glCreateShader;
	var _glCullFace = (x0) => GLctx.cullFace(x0);
	var _emscripten_glCullFace = _glCullFace;
	var _glDeleteBuffers = (n, buffers) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var id = HEAP32[buffers + i$1 * 4 >> 2];
			var buffer = GL.buffers[id];
			if (!buffer) continue;
			GLctx.deleteBuffer(buffer);
			buffer.name = 0;
			GL.buffers[id] = null;
			if (id == GLctx.currentArrayBufferBinding) GLctx.currentArrayBufferBinding = 0;
			if (id == GLctx.currentElementArrayBufferBinding) GLctx.currentElementArrayBufferBinding = 0;
			if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
			if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
		}
	};
	var _emscripten_glDeleteBuffers = _glDeleteBuffers;
	var _glDeleteFramebuffers = (n, framebuffers) => {
		for (var i$1 = 0; i$1 < n; ++i$1) {
			var id = HEAP32[framebuffers + i$1 * 4 >> 2];
			var framebuffer = GL.framebuffers[id];
			if (!framebuffer) continue;
			GLctx.deleteFramebuffer(framebuffer);
			framebuffer.name = 0;
			GL.framebuffers[id] = null;
		}
	};
	var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;
	var _glDeleteProgram = (id) => {
		if (!id) return;
		var program = GL.programs[id];
		if (!program) {
			GL.recordError(1281);
			return;
		}
		GLctx.deleteProgram(program);
		program.name = 0;
		GL.programs[id] = null;
	};
	var _emscripten_glDeleteProgram = _glDeleteProgram;
	var _glDeleteQueries = (n, ids) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var id = HEAP32[ids + i$1 * 4 >> 2];
			var query = GL.queries[id];
			if (!query) continue;
			GLctx.deleteQuery(query);
			GL.queries[id] = null;
		}
	};
	var _emscripten_glDeleteQueries = _glDeleteQueries;
	var _glDeleteQueriesEXT = (n, ids) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var id = HEAP32[ids + i$1 * 4 >> 2];
			var query = GL.queries[id];
			if (!query) continue;
			GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
			GL.queries[id] = null;
		}
	};
	var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;
	var _glDeleteRenderbuffers = (n, renderbuffers) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var id = HEAP32[renderbuffers + i$1 * 4 >> 2];
			var renderbuffer = GL.renderbuffers[id];
			if (!renderbuffer) continue;
			GLctx.deleteRenderbuffer(renderbuffer);
			renderbuffer.name = 0;
			GL.renderbuffers[id] = null;
		}
	};
	var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;
	var _glDeleteSamplers = (n, samplers) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var id = HEAP32[samplers + i$1 * 4 >> 2];
			var sampler = GL.samplers[id];
			if (!sampler) continue;
			GLctx.deleteSampler(sampler);
			sampler.name = 0;
			GL.samplers[id] = null;
		}
	};
	var _emscripten_glDeleteSamplers = _glDeleteSamplers;
	var _glDeleteShader = (id) => {
		if (!id) return;
		var shader = GL.shaders[id];
		if (!shader) {
			GL.recordError(1281);
			return;
		}
		GLctx.deleteShader(shader);
		GL.shaders[id] = null;
	};
	var _emscripten_glDeleteShader = _glDeleteShader;
	var _glDeleteSync = (id) => {
		if (!id) return;
		var sync = GL.syncs[id];
		if (!sync) {
			GL.recordError(1281);
			return;
		}
		GLctx.deleteSync(sync);
		sync.name = 0;
		GL.syncs[id] = null;
	};
	var _emscripten_glDeleteSync = _glDeleteSync;
	var _glDeleteTextures = (n, textures) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var id = HEAP32[textures + i$1 * 4 >> 2];
			var texture = GL.textures[id];
			if (!texture) continue;
			GLctx.deleteTexture(texture);
			texture.name = 0;
			GL.textures[id] = null;
		}
	};
	var _emscripten_glDeleteTextures = _glDeleteTextures;
	var _glDeleteTransformFeedbacks = (n, ids) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var id = HEAP32[ids + i$1 * 4 >> 2];
			var transformFeedback = GL.transformFeedbacks[id];
			if (!transformFeedback) continue;
			GLctx.deleteTransformFeedback(transformFeedback);
			transformFeedback.name = 0;
			GL.transformFeedbacks[id] = null;
		}
	};
	var _emscripten_glDeleteTransformFeedbacks = _glDeleteTransformFeedbacks;
	var _glDeleteVertexArrays = (n, vaos) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var id = HEAP32[vaos + i$1 * 4 >> 2];
			GLctx.deleteVertexArray(GL.vaos[id]);
			GL.vaos[id] = null;
		}
	};
	var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;
	var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArrays;
	var _glDepthFunc = (x0) => GLctx.depthFunc(x0);
	var _emscripten_glDepthFunc = _glDepthFunc;
	var _glDepthMask = (flag) => {
		GLctx.depthMask(!!flag);
	};
	var _emscripten_glDepthMask = _glDepthMask;
	var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
	var _emscripten_glDepthRangef = _glDepthRangef;
	var _glDetachShader = (program, shader) => {
		GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
	};
	var _emscripten_glDetachShader = _glDetachShader;
	var _glDisable = (x0) => GLctx.disable(x0);
	var _emscripten_glDisable = _glDisable;
	var _glDisableVertexAttribArray = (index) => {
		var cb = GL.currentContext.clientBuffers[index];
		cb.enabled = false;
		GLctx.disableVertexAttribArray(index);
	};
	var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;
	var _glDrawArrays = (mode, first, count) => {
		GL.preDrawHandleClientVertexAttribBindings(first + count);
		GLctx.drawArrays(mode, first, count);
		GL.postDrawHandleClientVertexAttribBindings();
	};
	var _emscripten_glDrawArrays = _glDrawArrays;
	var _glDrawArraysInstanced = (mode, first, count, primcount) => {
		GLctx.drawArraysInstanced(mode, first, count, primcount);
	};
	var _emscripten_glDrawArraysInstanced = _glDrawArraysInstanced;
	var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstanced;
	var _emscripten_glDrawArraysInstancedARB = _glDrawArraysInstanced;
	var _emscripten_glDrawArraysInstancedEXT = _glDrawArraysInstanced;
	var _emscripten_glDrawArraysInstancedNV = _glDrawArraysInstanced;
	var tempFixedLengthArray = [];
	var _glDrawBuffers = (n, bufs) => {
		var bufArray = tempFixedLengthArray[n];
		for (var i$1 = 0; i$1 < n; i$1++) bufArray[i$1] = HEAP32[bufs + i$1 * 4 >> 2];
		GLctx.drawBuffers(bufArray);
	};
	var _emscripten_glDrawBuffers = _glDrawBuffers;
	var _emscripten_glDrawBuffersEXT = _glDrawBuffers;
	var _emscripten_glDrawBuffersWEBGL = _glDrawBuffers;
	var _glDrawElements = (mode, count, type, indices) => {
		var buf;
		var vertexes = 0;
		if (!GLctx.currentElementArrayBufferBinding) {
			var size = GL.calcBufLength(1, type, 0, count);
			buf = GL.getTempIndexBuffer(size);
			GLctx.bindBuffer(34963, buf);
			GLctx.bufferSubData(34963, 0, HEAPU8.subarray(indices, indices + size));
			if (count > 0) for (var i$1 = 0; i$1 < GL.currentContext.maxVertexAttribs; ++i$1) {
				var cb = GL.currentContext.clientBuffers[i$1];
				if (cb.clientside && cb.enabled) {
					let arrayClass;
					switch (type) {
						case 5121:
							arrayClass = Uint8Array;
							break;
						case 5123:
							arrayClass = Uint16Array;
							break;
						case 5125:
							arrayClass = Uint32Array;
							break;
						default:
							GL.recordError(1282);
							return;
					}
					vertexes = new arrayClass(HEAPU8.buffer, indices, count).reduce((max, current) => Math.max(max, current)) + 1;
					break;
				}
			}
			indices = 0;
		}
		GL.preDrawHandleClientVertexAttribBindings(vertexes);
		GLctx.drawElements(mode, count, type, indices);
		GL.postDrawHandleClientVertexAttribBindings(count);
		if (!GLctx.currentElementArrayBufferBinding) GLctx.bindBuffer(34963, null);
	};
	var _emscripten_glDrawElements = _glDrawElements;
	var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
		GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
	};
	var _emscripten_glDrawElementsInstanced = _glDrawElementsInstanced;
	var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstanced;
	var _emscripten_glDrawElementsInstancedARB = _glDrawElementsInstanced;
	var _emscripten_glDrawElementsInstancedEXT = _glDrawElementsInstanced;
	var _emscripten_glDrawElementsInstancedNV = _glDrawElementsInstanced;
	var _glDrawRangeElements = (mode, start, end, count, type, indices) => {
		_glDrawElements(mode, count, type, indices);
	};
	var _emscripten_glDrawRangeElements = _glDrawRangeElements;
	var _glEnable = (x0) => GLctx.enable(x0);
	var _emscripten_glEnable = _glEnable;
	var _glEnableVertexAttribArray = (index) => {
		var cb = GL.currentContext.clientBuffers[index];
		cb.enabled = true;
		GLctx.enableVertexAttribArray(index);
	};
	var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;
	var _glEndQuery = (x0) => GLctx.endQuery(x0);
	var _emscripten_glEndQuery = _glEndQuery;
	var _glEndQueryEXT = (target) => {
		GLctx.disjointTimerQueryExt["endQueryEXT"](target);
	};
	var _emscripten_glEndQueryEXT = _glEndQueryEXT;
	var _glEndTransformFeedback = () => GLctx.endTransformFeedback();
	var _emscripten_glEndTransformFeedback = _glEndTransformFeedback;
	var _glFenceSync = (condition, flags) => {
		var sync = GLctx.fenceSync(condition, flags);
		if (sync) {
			var id = GL.getNewId(GL.syncs);
			sync.name = id;
			GL.syncs[id] = sync;
			return id;
		}
		return 0;
	};
	var _emscripten_glFenceSync = _glFenceSync;
	var _glFinish = () => GLctx.finish();
	var _emscripten_glFinish = _glFinish;
	var _glFlush = () => GLctx.flush();
	var _emscripten_glFlush = _glFlush;
	var emscriptenWebGLGetBufferBinding = (target) => {
		switch (target) {
			case 34962:
				target = 34964;
				break;
			case 34963:
				target = 34965;
				break;
			case 35051:
				target = 35053;
				break;
			case 35052:
				target = 35055;
				break;
			case 35982:
				target = 35983;
				break;
			case 36662:
				target = 36662;
				break;
			case 36663:
				target = 36663;
				break;
			case 35345:
				target = 35368;
				break;
		}
		var buffer = GLctx.getParameter(target);
		if (buffer) return buffer.name | 0;
		else return 0;
	};
	var emscriptenWebGLValidateMapBufferTarget = (target) => {
		switch (target) {
			case 34962:
			case 34963:
			case 36662:
			case 36663:
			case 35051:
			case 35052:
			case 35882:
			case 35982:
			case 35345: return true;
			default: return false;
		}
	};
	var _glFlushMappedBufferRange = (target, offset, length) => {
		if (!emscriptenWebGLValidateMapBufferTarget(target)) {
			GL.recordError(1280);
			err("GL_INVALID_ENUM in glFlushMappedBufferRange");
			return;
		}
		var mapping = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
		if (!mapping) {
			GL.recordError(1282);
			err("buffer was never mapped in glFlushMappedBufferRange");
			return;
		}
		if (!(mapping.access & 16)) {
			GL.recordError(1282);
			err("buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange");
			return;
		}
		if (offset < 0 || length < 0 || offset + length > mapping.length) {
			GL.recordError(1281);
			err("invalid range in glFlushMappedBufferRange");
			return;
		}
		GLctx.bufferSubData(target, mapping.offset, HEAPU8.subarray(mapping.mem + offset, mapping.mem + offset + length));
	};
	var _emscripten_glFlushMappedBufferRange = _glFlushMappedBufferRange;
	var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
		GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
	};
	var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;
	var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
		GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
	};
	var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;
	var _glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
		GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
	};
	var _emscripten_glFramebufferTextureLayer = _glFramebufferTextureLayer;
	var _glFrontFace = (x0) => GLctx.frontFace(x0);
	var _emscripten_glFrontFace = _glFrontFace;
	var _glGenBuffers = (n, buffers) => {
		GL.genObject(n, buffers, "createBuffer", GL.buffers);
	};
	var _emscripten_glGenBuffers = _glGenBuffers;
	var _glGenFramebuffers = (n, ids) => {
		GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
	};
	var _emscripten_glGenFramebuffers = _glGenFramebuffers;
	var _glGenQueries = (n, ids) => {
		GL.genObject(n, ids, "createQuery", GL.queries);
	};
	var _emscripten_glGenQueries = _glGenQueries;
	var _glGenQueriesEXT = (n, ids) => {
		for (var i$1 = 0; i$1 < n; i$1++) {
			var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
			if (!query) {
				GL.recordError(1282);
				while (i$1 < n) HEAP32[ids + i$1++ * 4 >> 2] = 0;
				return;
			}
			var id = GL.getNewId(GL.queries);
			query.name = id;
			GL.queries[id] = query;
			HEAP32[ids + i$1 * 4 >> 2] = id;
		}
	};
	var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;
	var _glGenRenderbuffers = (n, renderbuffers) => {
		GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
	};
	var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;
	var _glGenSamplers = (n, samplers) => {
		GL.genObject(n, samplers, "createSampler", GL.samplers);
	};
	var _emscripten_glGenSamplers = _glGenSamplers;
	var _glGenTextures = (n, textures) => {
		GL.genObject(n, textures, "createTexture", GL.textures);
	};
	var _emscripten_glGenTextures = _glGenTextures;
	var _glGenTransformFeedbacks = (n, ids) => {
		GL.genObject(n, ids, "createTransformFeedback", GL.transformFeedbacks);
	};
	var _emscripten_glGenTransformFeedbacks = _glGenTransformFeedbacks;
	var _glGenVertexArrays = (n, arrays) => {
		GL.genObject(n, arrays, "createVertexArray", GL.vaos);
	};
	var _emscripten_glGenVertexArrays = _glGenVertexArrays;
	var _emscripten_glGenVertexArraysOES = _glGenVertexArrays;
	var _glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
	var _emscripten_glGenerateMipmap = _glGenerateMipmap;
	var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
		program = GL.programs[program];
		var info = GLctx[funcName](program, index);
		if (info) {
			var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
			if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
			if (size) HEAP32[size >> 2] = info.size;
			if (type) HEAP32[type >> 2] = info.type;
		}
	};
	var _glGetActiveAttrib = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);
	var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;
	var _glGetActiveUniform = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);
	var _emscripten_glGetActiveUniform = _glGetActiveUniform;
	var _glGetActiveUniformBlockName = (program, uniformBlockIndex, bufSize, length, uniformBlockName) => {
		program = GL.programs[program];
		var result = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
		if (!result) return;
		if (uniformBlockName && bufSize > 0) {
			var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
			if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
		} else if (length) HEAP32[length >> 2] = 0;
	};
	var _emscripten_glGetActiveUniformBlockName = _glGetActiveUniformBlockName;
	var _glGetActiveUniformBlockiv = (program, uniformBlockIndex, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		program = GL.programs[program];
		if (pname == 35393) {
			var name = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
			HEAP32[params >> 2] = name.length + 1;
			return;
		}
		var result = GLctx.getActiveUniformBlockParameter(program, uniformBlockIndex, pname);
		if (result === null) return;
		if (pname == 35395) for (var i$1 = 0; i$1 < result.length; i$1++) HEAP32[params + i$1 * 4 >> 2] = result[i$1];
		else HEAP32[params >> 2] = result;
	};
	var _emscripten_glGetActiveUniformBlockiv = _glGetActiveUniformBlockiv;
	var _glGetActiveUniformsiv = (program, uniformCount, uniformIndices, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		if (uniformCount > 0 && uniformIndices == 0) {
			GL.recordError(1281);
			return;
		}
		program = GL.programs[program];
		var ids = [];
		for (var i$1 = 0; i$1 < uniformCount; i$1++) ids.push(HEAP32[uniformIndices + i$1 * 4 >> 2]);
		var result = GLctx.getActiveUniforms(program, ids, pname);
		if (!result) return;
		var len = result.length;
		for (var i$1 = 0; i$1 < len; i$1++) HEAP32[params + i$1 * 4 >> 2] = result[i$1];
	};
	var _emscripten_glGetActiveUniformsiv = _glGetActiveUniformsiv;
	var _glGetAttachedShaders = (program, maxCount, count, shaders) => {
		var result = GLctx.getAttachedShaders(GL.programs[program]);
		var len = result.length;
		if (len > maxCount) len = maxCount;
		HEAP32[count >> 2] = len;
		for (var i$1 = 0; i$1 < len; ++i$1) {
			var id = GL.shaders.indexOf(result[i$1]);
			HEAP32[shaders + i$1 * 4 >> 2] = id;
		}
	};
	var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;
	var _glGetAttribLocation = (program, name) => GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
	var _emscripten_glGetAttribLocation = _glGetAttribLocation;
	var writeI53ToI64 = (ptr, num) => {
		HEAPU32[ptr >> 2] = num;
		var lower = HEAPU32[ptr >> 2];
		HEAPU32[ptr + 4 >> 2] = (num - lower) / 4294967296;
	};
	var webglGetExtensions = () => {
		var exts = getEmscriptenSupportedExtensions(GLctx);
		exts = exts.concat(exts.map((e) => "GL_" + e));
		return exts;
	};
	var emscriptenWebGLGet = (name_, p, type) => {
		if (!p) {
			GL.recordError(1281);
			return;
		}
		var ret = void 0;
		switch (name_) {
			case 36346:
				ret = 1;
				break;
			case 36344:
				if (type != 0 && type != 1) GL.recordError(1280);
				return;
			case 34814:
			case 36345:
				ret = 0;
				break;
			case 34466:
				var formats = GLctx.getParameter(34467);
				ret = formats ? formats.length : 0;
				break;
			case 33309:
				if (GL.currentContext.version < 2) {
					GL.recordError(1282);
					return;
				}
				ret = webglGetExtensions().length;
				break;
			case 33307:
			case 33308:
				if (GL.currentContext.version < 2) {
					GL.recordError(1280);
					return;
				}
				ret = name_ == 33307 ? 3 : 0;
				break;
		}
		if (ret === void 0) {
			var result = GLctx.getParameter(name_);
			switch (typeof result) {
				case "number":
					ret = result;
					break;
				case "boolean":
					ret = result ? 1 : 0;
					break;
				case "string":
					GL.recordError(1280);
					return;
				case "object":
					if (result === null) switch (name_) {
						case 34964:
						case 35725:
						case 34965:
						case 36006:
						case 36007:
						case 32873:
						case 34229:
						case 36662:
						case 36663:
						case 35053:
						case 35055:
						case 36010:
						case 35097:
						case 35869:
						case 32874:
						case 36389:
						case 35983:
						case 35368:
						case 34068:
							ret = 0;
							break;
						default:
							GL.recordError(1280);
							return;
					}
					else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
						for (var i$1 = 0; i$1 < result.length; ++i$1) switch (type) {
							case 0:
								HEAP32[p + i$1 * 4 >> 2] = result[i$1];
								break;
							case 2:
								HEAPF32[p + i$1 * 4 >> 2] = result[i$1];
								break;
							case 4:
								HEAP8[p + i$1] = result[i$1] ? 1 : 0;
								break;
						}
						return;
					} else try {
						ret = result.name | 0;
					} catch (e) {
						GL.recordError(1280);
						err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
						return;
					}
					break;
				default:
					GL.recordError(1280);
					err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof result}!`);
					return;
			}
		}
		switch (type) {
			case 1:
				writeI53ToI64(p, ret);
				break;
			case 0:
				HEAP32[p >> 2] = ret;
				break;
			case 2:
				HEAPF32[p >> 2] = ret;
				break;
			case 4:
				HEAP8[p] = ret ? 1 : 0;
				break;
		}
	};
	var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
	var _emscripten_glGetBooleanv = _glGetBooleanv;
	var _glGetBufferParameteri64v = (target, value, data) => {
		if (!data) {
			GL.recordError(1281);
			return;
		}
		writeI53ToI64(data, GLctx.getBufferParameter(target, value));
	};
	var _emscripten_glGetBufferParameteri64v = _glGetBufferParameteri64v;
	var _glGetBufferParameteriv = (target, value, data) => {
		if (!data) {
			GL.recordError(1281);
			return;
		}
		HEAP32[data >> 2] = GLctx.getBufferParameter(target, value);
	};
	var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;
	var _glGetBufferPointerv = (target, pname, params) => {
		if (pname == 35005) {
			var ptr = 0;
			var mappedBuffer = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
			if (mappedBuffer) ptr = mappedBuffer.mem;
			HEAP32[params >> 2] = ptr;
		} else {
			GL.recordError(1280);
			err("GL_INVALID_ENUM in glGetBufferPointerv");
		}
	};
	var _emscripten_glGetBufferPointerv = _glGetBufferPointerv;
	var _glGetError = () => {
		var error = GLctx.getError() || GL.lastError;
		GL.lastError = 0;
		return error;
	};
	var _emscripten_glGetError = _glGetError;
	var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
	var _emscripten_glGetFloatv = _glGetFloatv;
	var _glGetFragDataLocation = (program, name) => GLctx.getFragDataLocation(GL.programs[program], UTF8ToString(name));
	var _emscripten_glGetFragDataLocation = _glGetFragDataLocation;
	var _glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
		var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
		if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) result = result.name | 0;
		HEAP32[params >> 2] = result;
	};
	var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;
	var emscriptenWebGLGetIndexed = (target, index, data, type) => {
		if (!data) {
			GL.recordError(1281);
			return;
		}
		var result = GLctx.getIndexedParameter(target, index);
		var ret;
		switch (typeof result) {
			case "boolean":
				ret = result ? 1 : 0;
				break;
			case "number":
				ret = result;
				break;
			case "object":
				if (result === null) switch (target) {
					case 35983:
					case 35368:
						ret = 0;
						break;
					default:
						GL.recordError(1280);
						return;
				}
				else if (result instanceof WebGLBuffer) ret = result.name | 0;
				else {
					GL.recordError(1280);
					return;
				}
				break;
			default:
				GL.recordError(1280);
				return;
		}
		switch (type) {
			case 1:
				writeI53ToI64(data, ret);
				break;
			case 0:
				HEAP32[data >> 2] = ret;
				break;
			case 2:
				HEAPF32[data >> 2] = ret;
				break;
			case 4:
				HEAP8[data] = ret ? 1 : 0;
				break;
			default: abort("internal emscriptenWebGLGetIndexed() error, bad type: " + type);
		}
	};
	var _glGetInteger64i_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 1);
	var _emscripten_glGetInteger64i_v = _glGetInteger64i_v;
	var _glGetInteger64v = (name_, p) => {
		emscriptenWebGLGet(name_, p, 1);
	};
	var _emscripten_glGetInteger64v = _glGetInteger64v;
	var _glGetIntegeri_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 0);
	var _emscripten_glGetIntegeri_v = _glGetIntegeri_v;
	var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
	var _emscripten_glGetIntegerv = _glGetIntegerv;
	var _glGetInternalformativ = (target, internalformat, pname, bufSize, params) => {
		if (bufSize < 0) {
			GL.recordError(1281);
			return;
		}
		if (!params) {
			GL.recordError(1281);
			return;
		}
		var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
		if (ret === null) return;
		for (var i$1 = 0; i$1 < ret.length && i$1 < bufSize; ++i$1) HEAP32[params + i$1 * 4 >> 2] = ret[i$1];
	};
	var _emscripten_glGetInternalformativ = _glGetInternalformativ;
	var _glGetProgramBinary = (program, bufSize, length, binaryFormat, binary) => {
		GL.recordError(1282);
	};
	var _emscripten_glGetProgramBinary = _glGetProgramBinary;
	var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
		var log = GLctx.getProgramInfoLog(GL.programs[program]);
		if (log === null) log = "(unknown error)";
		var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
		if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
	};
	var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;
	var _glGetProgramiv = (program, pname, p) => {
		if (!p) {
			GL.recordError(1281);
			return;
		}
		if (program >= GL.counter) {
			GL.recordError(1281);
			return;
		}
		program = GL.programs[program];
		if (pname == 35716) {
			var log = GLctx.getProgramInfoLog(program);
			if (log === null) log = "(unknown error)";
			HEAP32[p >> 2] = log.length + 1;
		} else if (pname == 35719) {
			if (!program.maxUniformLength) {
				var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
				for (var i$1 = 0; i$1 < numActiveUniforms; ++i$1) program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i$1).name.length + 1);
			}
			HEAP32[p >> 2] = program.maxUniformLength;
		} else if (pname == 35722) {
			if (!program.maxAttributeLength) {
				var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
				for (var i$1 = 0; i$1 < numActiveAttributes; ++i$1) program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i$1).name.length + 1);
			}
			HEAP32[p >> 2] = program.maxAttributeLength;
		} else if (pname == 35381) {
			if (!program.maxUniformBlockNameLength) {
				var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
				for (var i$1 = 0; i$1 < numActiveUniformBlocks; ++i$1) program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i$1).length + 1);
			}
			HEAP32[p >> 2] = program.maxUniformBlockNameLength;
		} else HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname);
	};
	var _emscripten_glGetProgramiv = _glGetProgramiv;
	var _glGetQueryObjecti64vEXT = (id, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		var query = GL.queries[id];
		var param;
		if (GL.currentContext.version < 2) param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
		else param = GLctx.getQueryParameter(query, pname);
		var ret;
		if (typeof param == "boolean") ret = param ? 1 : 0;
		else ret = param;
		writeI53ToI64(params, ret);
	};
	var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;
	var _glGetQueryObjectivEXT = (id, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		var query = GL.queries[id];
		var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
		var ret;
		if (typeof param == "boolean") ret = param ? 1 : 0;
		else ret = param;
		HEAP32[params >> 2] = ret;
	};
	var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;
	var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;
	var _glGetQueryObjectuiv = (id, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		var query = GL.queries[id];
		var param = GLctx.getQueryParameter(query, pname);
		var ret;
		if (typeof param == "boolean") ret = param ? 1 : 0;
		else ret = param;
		HEAP32[params >> 2] = ret;
	};
	var _emscripten_glGetQueryObjectuiv = _glGetQueryObjectuiv;
	var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;
	var _glGetQueryiv = (target, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		HEAP32[params >> 2] = GLctx.getQuery(target, pname);
	};
	var _emscripten_glGetQueryiv = _glGetQueryiv;
	var _glGetQueryivEXT = (target, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		HEAP32[params >> 2] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname);
	};
	var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;
	var _glGetRenderbufferParameteriv = (target, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname);
	};
	var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;
	var _glGetSamplerParameterfv = (sampler, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		HEAPF32[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
	};
	var _emscripten_glGetSamplerParameterfv = _glGetSamplerParameterfv;
	var _glGetSamplerParameteriv = (sampler, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		HEAP32[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
	};
	var _emscripten_glGetSamplerParameteriv = _glGetSamplerParameteriv;
	var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
		var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
		if (log === null) log = "(unknown error)";
		var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
		if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
	};
	var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;
	var _glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
		var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
		HEAP32[range >> 2] = result.rangeMin;
		HEAP32[range + 4 >> 2] = result.rangeMax;
		HEAP32[precision >> 2] = result.precision;
	};
	var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;
	var _glGetShaderSource = (shader, bufSize, length, source) => {
		var result = GLctx.getShaderSource(GL.shaders[shader]);
		if (!result) return;
		var numBytesWrittenExclNull = bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0;
		if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
	};
	var _emscripten_glGetShaderSource = _glGetShaderSource;
	var _glGetShaderiv = (shader, pname, p) => {
		if (!p) {
			GL.recordError(1281);
			return;
		}
		if (pname == 35716) {
			var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
			if (log === null) log = "(unknown error)";
			var logLength = log ? log.length + 1 : 0;
			HEAP32[p >> 2] = logLength;
		} else if (pname == 35720) {
			var source = GLctx.getShaderSource(GL.shaders[shader]);
			var sourceLength = source ? source.length + 1 : 0;
			HEAP32[p >> 2] = sourceLength;
		} else HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
	};
	var _emscripten_glGetShaderiv = _glGetShaderiv;
	var _glGetString = (name_) => {
		var ret = GL.stringCache[name_];
		if (!ret) {
			switch (name_) {
				case 7939:
					ret = stringToNewUTF8(webglGetExtensions().join(" "));
					break;
				case 7936:
				case 7937:
				case 37445:
				case 37446:
					var s = GLctx.getParameter(name_);
					if (!s) GL.recordError(1280);
					ret = s ? stringToNewUTF8(s) : 0;
					break;
				case 7938:
					var webGLVersion = GLctx.getParameter(7938);
					var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
					if (GL.currentContext.version >= 2) glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
					ret = stringToNewUTF8(glVersion);
					break;
				case 35724:
					var glslVersion = GLctx.getParameter(35724);
					var ver_num = glslVersion.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
					if (ver_num !== null) {
						if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
						glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
					}
					ret = stringToNewUTF8(glslVersion);
					break;
				default: GL.recordError(1280);
			}
			GL.stringCache[name_] = ret;
		}
		return ret;
	};
	var _emscripten_glGetString = _glGetString;
	var _glGetStringi = (name, index) => {
		if (GL.currentContext.version < 2) {
			GL.recordError(1282);
			return 0;
		}
		var stringiCache = GL.stringiCache[name];
		if (stringiCache) {
			if (index < 0 || index >= stringiCache.length) {
				GL.recordError(1281);
				return 0;
			}
			return stringiCache[index];
		}
		switch (name) {
			case 7939:
				var exts = webglGetExtensions().map(stringToNewUTF8);
				stringiCache = GL.stringiCache[name] = exts;
				if (index < 0 || index >= stringiCache.length) {
					GL.recordError(1281);
					return 0;
				}
				return stringiCache[index];
			default:
				GL.recordError(1280);
				return 0;
		}
	};
	var _emscripten_glGetStringi = _glGetStringi;
	var _glGetSynciv = (sync, pname, bufSize, length, values) => {
		if (bufSize < 0) {
			GL.recordError(1281);
			return;
		}
		if (!values) {
			GL.recordError(1281);
			return;
		}
		var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
		if (ret !== null) {
			HEAP32[values >> 2] = ret;
			if (length) HEAP32[length >> 2] = 1;
		}
	};
	var _emscripten_glGetSynciv = _glGetSynciv;
	var _glGetTexParameterfv = (target, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname);
	};
	var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;
	var _glGetTexParameteriv = (target, pname, params) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		HEAP32[params >> 2] = GLctx.getTexParameter(target, pname);
	};
	var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;
	var _glGetTransformFeedbackVarying = (program, index, bufSize, length, size, type, name) => {
		program = GL.programs[program];
		var info = GLctx.getTransformFeedbackVarying(program, index);
		if (!info) return;
		if (name && bufSize > 0) {
			var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
			if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
		} else if (length) HEAP32[length >> 2] = 0;
		if (size) HEAP32[size >> 2] = info.size;
		if (type) HEAP32[type >> 2] = info.type;
	};
	var _emscripten_glGetTransformFeedbackVarying = _glGetTransformFeedbackVarying;
	var _glGetUniformBlockIndex = (program, uniformBlockName) => GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
	var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;
	var _glGetUniformIndices = (program, uniformCount, uniformNames, uniformIndices) => {
		if (!uniformIndices) {
			GL.recordError(1281);
			return;
		}
		if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
			GL.recordError(1281);
			return;
		}
		program = GL.programs[program];
		var names = [];
		for (var i$1 = 0; i$1 < uniformCount; i$1++) names.push(UTF8ToString(HEAP32[uniformNames + i$1 * 4 >> 2]));
		var result = GLctx.getUniformIndices(program, names);
		if (!result) return;
		var len = result.length;
		for (var i$1 = 0; i$1 < len; i$1++) HEAP32[uniformIndices + i$1 * 4 >> 2] = result[i$1];
	};
	var _emscripten_glGetUniformIndices = _glGetUniformIndices;
	var jstoi_q = (str) => parseInt(str);
	var webglGetLeftBracePos = (name) => name.slice(-1) == "]" && name.lastIndexOf("[");
	var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
		var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i$1, j;
		if (!uniformLocsById) {
			program.uniformLocsById = uniformLocsById = {};
			program.uniformArrayNamesById = {};
			var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
			for (i$1 = 0; i$1 < numActiveUniforms; ++i$1) {
				var u = GLctx.getActiveUniform(program, i$1);
				var nm = u.name;
				var sz = u.size;
				var lb = webglGetLeftBracePos(nm);
				var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
				var id = program.uniformIdCounter;
				program.uniformIdCounter += sz;
				uniformSizeAndIdsByName[arrayName] = [sz, id];
				for (j = 0; j < sz; ++j) {
					uniformLocsById[id] = j;
					program.uniformArrayNamesById[id++] = arrayName;
				}
			}
		}
	};
	var _glGetUniformLocation = (program, name) => {
		name = UTF8ToString(name);
		if (program = GL.programs[program]) {
			webglPrepareUniformLocationsBeforeFirstUse(program);
			var uniformLocsById = program.uniformLocsById;
			var arrayIndex = 0;
			var uniformBaseName = name;
			var leftBrace = webglGetLeftBracePos(name);
			if (leftBrace > 0) {
				arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
				uniformBaseName = name.slice(0, leftBrace);
			}
			var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
			if (sizeAndId && arrayIndex < sizeAndId[0]) {
				arrayIndex += sizeAndId[1];
				if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) return arrayIndex;
			}
		} else GL.recordError(1281);
		return -1;
	};
	var _emscripten_glGetUniformLocation = _glGetUniformLocation;
	var webglGetUniformLocation = (location) => {
		var p = GLctx.currentProgram;
		if (p) {
			var webglLoc = p.uniformLocsById[location];
			if (typeof webglLoc == "number") p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
			return webglLoc;
		} else GL.recordError(1282);
	};
	var emscriptenWebGLGetUniform = (program, location, params, type) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		program = GL.programs[program];
		webglPrepareUniformLocationsBeforeFirstUse(program);
		var data = GLctx.getUniform(program, webglGetUniformLocation(location));
		if (typeof data == "number" || typeof data == "boolean") switch (type) {
			case 0:
				HEAP32[params >> 2] = data;
				break;
			case 2:
				HEAPF32[params >> 2] = data;
				break;
		}
		else for (var i$1 = 0; i$1 < data.length; i$1++) switch (type) {
			case 0:
				HEAP32[params + i$1 * 4 >> 2] = data[i$1];
				break;
			case 2:
				HEAPF32[params + i$1 * 4 >> 2] = data[i$1];
				break;
		}
	};
	var _glGetUniformfv = (program, location, params) => {
		emscriptenWebGLGetUniform(program, location, params, 2);
	};
	var _emscripten_glGetUniformfv = _glGetUniformfv;
	var _glGetUniformiv = (program, location, params) => {
		emscriptenWebGLGetUniform(program, location, params, 0);
	};
	var _emscripten_glGetUniformiv = _glGetUniformiv;
	var _glGetUniformuiv = (program, location, params) => emscriptenWebGLGetUniform(program, location, params, 0);
	var _emscripten_glGetUniformuiv = _glGetUniformuiv;
	var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
		if (!params) {
			GL.recordError(1281);
			return;
		}
		if (GL.currentContext.clientBuffers[index].enabled) err("glGetVertexAttrib*v on client-side array: not supported, bad data returned");
		var data = GLctx.getVertexAttrib(index, pname);
		if (pname == 34975) HEAP32[params >> 2] = data && data["name"];
		else if (typeof data == "number" || typeof data == "boolean") switch (type) {
			case 0:
				HEAP32[params >> 2] = data;
				break;
			case 2:
				HEAPF32[params >> 2] = data;
				break;
			case 5:
				HEAP32[params >> 2] = Math.fround(data);
				break;
		}
		else for (var i$1 = 0; i$1 < data.length; i$1++) switch (type) {
			case 0:
				HEAP32[params + i$1 * 4 >> 2] = data[i$1];
				break;
			case 2:
				HEAPF32[params + i$1 * 4 >> 2] = data[i$1];
				break;
			case 5:
				HEAP32[params + i$1 * 4 >> 2] = Math.fround(data[i$1]);
				break;
		}
	};
	var _glGetVertexAttribIiv = (index, pname, params) => {
		emscriptenWebGLGetVertexAttrib(index, pname, params, 0);
	};
	var _emscripten_glGetVertexAttribIiv = _glGetVertexAttribIiv;
	var _emscripten_glGetVertexAttribIuiv = _glGetVertexAttribIiv;
	var _glGetVertexAttribPointerv = (index, pname, pointer) => {
		if (!pointer) {
			GL.recordError(1281);
			return;
		}
		if (GL.currentContext.clientBuffers[index].enabled) err("glGetVertexAttribPointer on client-side array: not supported, bad data returned");
		HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname);
	};
	var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;
	var _glGetVertexAttribfv = (index, pname, params) => {
		emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
	};
	var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;
	var _glGetVertexAttribiv = (index, pname, params) => {
		emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
	};
	var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;
	var _glHint = (x0, x1) => GLctx.hint(x0, x1);
	var _emscripten_glHint = _glHint;
	var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
		var list = tempFixedLengthArray[numAttachments];
		for (var i$1 = 0; i$1 < numAttachments; i$1++) list[i$1] = HEAP32[attachments + i$1 * 4 >> 2];
		GLctx.invalidateFramebuffer(target, list);
	};
	var _emscripten_glInvalidateFramebuffer = _glInvalidateFramebuffer;
	var _glInvalidateSubFramebuffer = (target, numAttachments, attachments, x, y, width, height) => {
		var list = tempFixedLengthArray[numAttachments];
		for (var i$1 = 0; i$1 < numAttachments; i$1++) list[i$1] = HEAP32[attachments + i$1 * 4 >> 2];
		GLctx.invalidateSubFramebuffer(target, list, x, y, width, height);
	};
	var _emscripten_glInvalidateSubFramebuffer = _glInvalidateSubFramebuffer;
	var _glIsBuffer = (buffer) => {
		var b = GL.buffers[buffer];
		if (!b) return 0;
		return GLctx.isBuffer(b);
	};
	var _emscripten_glIsBuffer = _glIsBuffer;
	var _glIsEnabled = (x0) => GLctx.isEnabled(x0);
	var _emscripten_glIsEnabled = _glIsEnabled;
	var _glIsFramebuffer = (framebuffer) => {
		var fb = GL.framebuffers[framebuffer];
		if (!fb) return 0;
		return GLctx.isFramebuffer(fb);
	};
	var _emscripten_glIsFramebuffer = _glIsFramebuffer;
	var _glIsProgram = (program) => {
		program = GL.programs[program];
		if (!program) return 0;
		return GLctx.isProgram(program);
	};
	var _emscripten_glIsProgram = _glIsProgram;
	var _glIsQuery = (id) => {
		var query = GL.queries[id];
		if (!query) return 0;
		return GLctx.isQuery(query);
	};
	var _emscripten_glIsQuery = _glIsQuery;
	var _glIsQueryEXT = (id) => {
		var query = GL.queries[id];
		if (!query) return 0;
		return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
	};
	var _emscripten_glIsQueryEXT = _glIsQueryEXT;
	var _glIsRenderbuffer = (renderbuffer) => {
		var rb = GL.renderbuffers[renderbuffer];
		if (!rb) return 0;
		return GLctx.isRenderbuffer(rb);
	};
	var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;
	var _glIsSampler = (id) => {
		var sampler = GL.samplers[id];
		if (!sampler) return 0;
		return GLctx.isSampler(sampler);
	};
	var _emscripten_glIsSampler = _glIsSampler;
	var _glIsShader = (shader) => {
		var s = GL.shaders[shader];
		if (!s) return 0;
		return GLctx.isShader(s);
	};
	var _emscripten_glIsShader = _glIsShader;
	var _glIsSync = (sync) => GLctx.isSync(GL.syncs[sync]);
	var _emscripten_glIsSync = _glIsSync;
	var _glIsTexture = (id) => {
		var texture = GL.textures[id];
		if (!texture) return 0;
		return GLctx.isTexture(texture);
	};
	var _emscripten_glIsTexture = _glIsTexture;
	var _glIsTransformFeedback = (id) => GLctx.isTransformFeedback(GL.transformFeedbacks[id]);
	var _emscripten_glIsTransformFeedback = _glIsTransformFeedback;
	var _glIsVertexArray = (array) => {
		var vao = GL.vaos[array];
		if (!vao) return 0;
		return GLctx.isVertexArray(vao);
	};
	var _emscripten_glIsVertexArray = _glIsVertexArray;
	var _emscripten_glIsVertexArrayOES = _glIsVertexArray;
	var _glLineWidth = (x0) => GLctx.lineWidth(x0);
	var _emscripten_glLineWidth = _glLineWidth;
	var _glLinkProgram = (program) => {
		program = GL.programs[program];
		GLctx.linkProgram(program);
		program.uniformLocsById = 0;
		program.uniformSizeAndIdsByName = {};
	};
	var _emscripten_glLinkProgram = _glLinkProgram;
	var _glMapBufferRange = (target, offset, length, access) => {
		if ((access & 33) != 0) {
			err("glMapBufferRange access does not support MAP_READ or MAP_UNSYNCHRONIZED");
			return 0;
		}
		if ((access & 2) == 0) {
			err("glMapBufferRange access must include MAP_WRITE");
			return 0;
		}
		if ((access & 12) == 0) {
			err("glMapBufferRange access must include INVALIDATE_BUFFER or INVALIDATE_RANGE");
			return 0;
		}
		if (!emscriptenWebGLValidateMapBufferTarget(target)) {
			GL.recordError(1280);
			err("GL_INVALID_ENUM in glMapBufferRange");
			return 0;
		}
		var mem = _malloc(length), binding = emscriptenWebGLGetBufferBinding(target);
		if (!mem) return 0;
		binding = GL.mappedBuffers[binding] ??= {};
		binding.offset = offset;
		binding.length = length;
		binding.mem = mem;
		binding.access = access;
		return mem;
	};
	var _emscripten_glMapBufferRange = _glMapBufferRange;
	var _glPauseTransformFeedback = () => GLctx.pauseTransformFeedback();
	var _emscripten_glPauseTransformFeedback = _glPauseTransformFeedback;
	var _glPixelStorei = (pname, param) => {
		if (pname == 3317) GL.unpackAlignment = param;
		else if (pname == 3314) GL.unpackRowLength = param;
		GLctx.pixelStorei(pname, param);
	};
	var _emscripten_glPixelStorei = _glPixelStorei;
	var _glPolygonModeWEBGL = (face, mode) => {
		GLctx.webglPolygonMode["polygonModeWEBGL"](face, mode);
	};
	var _emscripten_glPolygonModeWEBGL = _glPolygonModeWEBGL;
	var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
	var _emscripten_glPolygonOffset = _glPolygonOffset;
	var _glPolygonOffsetClampEXT = (factor, units, clamp) => {
		GLctx.extPolygonOffsetClamp["polygonOffsetClampEXT"](factor, units, clamp);
	};
	var _emscripten_glPolygonOffsetClampEXT = _glPolygonOffsetClampEXT;
	var _glProgramBinary = (program, binaryFormat, binary, length) => {
		GL.recordError(1280);
	};
	var _emscripten_glProgramBinary = _glProgramBinary;
	var _glProgramParameteri = (program, pname, value) => {
		GL.recordError(1280);
	};
	var _emscripten_glProgramParameteri = _glProgramParameteri;
	var _glQueryCounterEXT = (id, target) => {
		GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target);
	};
	var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;
	var _glReadBuffer = (x0) => GLctx.readBuffer(x0);
	var _emscripten_glReadBuffer = _glReadBuffer;
	var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
		function roundedToNextMultipleOf(x, y) {
			return x + y - 1 & -y;
		}
		var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
		var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
		return height * alignedRowSize;
	};
	var colorChannelsInGlTextureFormat = (format) => {
		return {
			5: 3,
			6: 4,
			8: 2,
			29502: 3,
			29504: 4,
			26917: 2,
			26918: 2,
			29846: 3,
			29847: 4
		}[format - 6402] || 1;
	};
	var heapObjectForWebGLType = (type) => {
		type -= 5120;
		if (type == 0) return HEAP8;
		if (type == 1) return HEAPU8;
		if (type == 2) return HEAP16;
		if (type == 4) return HEAP32;
		if (type == 6) return HEAPF32;
		if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return HEAPU32;
		return HEAPU16;
	};
	var toTypedArrayIndex = (pointer, heap) => pointer >>> 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
	var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
		var heap = heapObjectForWebGLType(type);
		var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
		var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
		return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
	};
	var _glReadPixels = (x, y, width, height, format, type, pixels) => {
		if (GL.currentContext.version >= 2) {
			if (GLctx.currentPixelPackBufferBinding) {
				GLctx.readPixels(x, y, width, height, format, type, pixels);
				return;
			}
			var heap = heapObjectForWebGLType(type);
			var target = toTypedArrayIndex(pixels, heap);
			GLctx.readPixels(x, y, width, height, format, type, heap, target);
			return;
		}
		var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
		if (!pixelData) {
			GL.recordError(1280);
			return;
		}
		GLctx.readPixels(x, y, width, height, format, type, pixelData);
	};
	var _emscripten_glReadPixels = _glReadPixels;
	var _glReleaseShaderCompiler = () => {};
	var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;
	var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
	var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;
	var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);
	var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;
	var _glResumeTransformFeedback = () => GLctx.resumeTransformFeedback();
	var _emscripten_glResumeTransformFeedback = _glResumeTransformFeedback;
	var _glSampleCoverage = (value, invert) => {
		GLctx.sampleCoverage(value, !!invert);
	};
	var _emscripten_glSampleCoverage = _glSampleCoverage;
	var _glSamplerParameterf = (sampler, pname, param) => {
		GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
	};
	var _emscripten_glSamplerParameterf = _glSamplerParameterf;
	var _glSamplerParameterfv = (sampler, pname, params) => {
		var param = HEAPF32[params >> 2];
		GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
	};
	var _emscripten_glSamplerParameterfv = _glSamplerParameterfv;
	var _glSamplerParameteri = (sampler, pname, param) => {
		GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
	};
	var _emscripten_glSamplerParameteri = _glSamplerParameteri;
	var _glSamplerParameteriv = (sampler, pname, params) => {
		var param = HEAP32[params >> 2];
		GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
	};
	var _emscripten_glSamplerParameteriv = _glSamplerParameteriv;
	var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
	var _emscripten_glScissor = _glScissor;
	var _glShaderBinary = (count, shaders, binaryformat, binary, length) => {
		GL.recordError(1280);
	};
	var _emscripten_glShaderBinary = _glShaderBinary;
	var _glShaderSource = (shader, count, string, length) => {
		var source = GL.getSource(shader, count, string, length);
		GLctx.shaderSource(GL.shaders[shader], source);
	};
	var _emscripten_glShaderSource = _glShaderSource;
	var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
	var _emscripten_glStencilFunc = _glStencilFunc;
	var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
	var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;
	var _glStencilMask = (x0) => GLctx.stencilMask(x0);
	var _emscripten_glStencilMask = _glStencilMask;
	var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
	var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;
	var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
	var _emscripten_glStencilOp = _glStencilOp;
	var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
	var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;
	var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
		if (GL.currentContext.version >= 2) {
			if (GLctx.currentPixelUnpackBufferBinding) {
				GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
				return;
			}
			if (pixels) {
				var heap = heapObjectForWebGLType(type);
				var index = toTypedArrayIndex(pixels, heap);
				GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
				return;
			}
		}
		var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
		GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
	};
	var _emscripten_glTexImage2D = _glTexImage2D;
	var _glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
		if (GLctx.currentPixelUnpackBufferBinding) GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
		else if (pixels) {
			var heap = heapObjectForWebGLType(type);
			GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, heap, toTypedArrayIndex(pixels, heap));
		} else GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
	};
	var _emscripten_glTexImage3D = _glTexImage3D;
	var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
	var _emscripten_glTexParameterf = _glTexParameterf;
	var _glTexParameterfv = (target, pname, params) => {
		var param = HEAPF32[params >> 2];
		GLctx.texParameterf(target, pname, param);
	};
	var _emscripten_glTexParameterfv = _glTexParameterfv;
	var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
	var _emscripten_glTexParameteri = _glTexParameteri;
	var _glTexParameteriv = (target, pname, params) => {
		var param = HEAP32[params >> 2];
		GLctx.texParameteri(target, pname, param);
	};
	var _emscripten_glTexParameteriv = _glTexParameteriv;
	var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);
	var _emscripten_glTexStorage2D = _glTexStorage2D;
	var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);
	var _emscripten_glTexStorage3D = _glTexStorage3D;
	var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
		if (GL.currentContext.version >= 2) {
			if (GLctx.currentPixelUnpackBufferBinding) {
				GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
				return;
			}
			if (pixels) {
				var heap = heapObjectForWebGLType(type);
				GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, toTypedArrayIndex(pixels, heap));
				return;
			}
		}
		var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
		GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
	};
	var _emscripten_glTexSubImage2D = _glTexSubImage2D;
	var _glTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) => {
		if (GLctx.currentPixelUnpackBufferBinding) GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
		else if (pixels) {
			var heap = heapObjectForWebGLType(type);
			GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
		} else GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
	};
	var _emscripten_glTexSubImage3D = _glTexSubImage3D;
	var _glTransformFeedbackVaryings = (program, count, varyings, bufferMode) => {
		program = GL.programs[program];
		var vars = [];
		for (var i$1 = 0; i$1 < count; i$1++) vars.push(UTF8ToString(HEAP32[varyings + i$1 * 4 >> 2]));
		GLctx.transformFeedbackVaryings(program, vars, bufferMode);
	};
	var _emscripten_glTransformFeedbackVaryings = _glTransformFeedbackVaryings;
	var _glUniform1f = (location, v0) => {
		GLctx.uniform1f(webglGetUniformLocation(location), v0);
	};
	var _emscripten_glUniform1f = _glUniform1f;
	var miniTempWebGLFloatBuffers = [];
	var _glUniform1fv = (location, count, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count);
			return;
		}
		if (count <= 288) {
			var view = miniTempWebGLFloatBuffers[count];
			for (var i$1 = 0; i$1 < count; ++i$1) view[i$1] = HEAPF32[value + 4 * i$1 >> 2];
		} else var view = HEAPF32.subarray(value >> 2, value + count * 4 >> 2);
		GLctx.uniform1fv(webglGetUniformLocation(location), view);
	};
	var _emscripten_glUniform1fv = _glUniform1fv;
	var _glUniform1i = (location, v0) => {
		GLctx.uniform1i(webglGetUniformLocation(location), v0);
	};
	var _emscripten_glUniform1i = _glUniform1i;
	var miniTempWebGLIntBuffers = [];
	var _glUniform1iv = (location, count, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, value >> 2, count);
			return;
		}
		if (count <= 288) {
			var view = miniTempWebGLIntBuffers[count];
			for (var i$1 = 0; i$1 < count; ++i$1) view[i$1] = HEAP32[value + 4 * i$1 >> 2];
		} else var view = HEAP32.subarray(value >> 2, value + count * 4 >> 2);
		GLctx.uniform1iv(webglGetUniformLocation(location), view);
	};
	var _emscripten_glUniform1iv = _glUniform1iv;
	var _glUniform1ui = (location, v0) => {
		GLctx.uniform1ui(webglGetUniformLocation(location), v0);
	};
	var _emscripten_glUniform1ui = _glUniform1ui;
	var _glUniform1uiv = (location, count, value) => {
		count && GLctx.uniform1uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count);
	};
	var _emscripten_glUniform1uiv = _glUniform1uiv;
	var _glUniform2f = (location, v0, v1) => {
		GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
	};
	var _emscripten_glUniform2f = _glUniform2f;
	var _glUniform2fv = (location, count, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 2);
			return;
		}
		if (count <= 144) {
			count *= 2;
			var view = miniTempWebGLFloatBuffers[count];
			for (var i$1 = 0; i$1 < count; i$1 += 2) {
				view[i$1] = HEAPF32[value + 4 * i$1 >> 2];
				view[i$1 + 1] = HEAPF32[value + (4 * i$1 + 4) >> 2];
			}
		} else var view = HEAPF32.subarray(value >> 2, value + count * 8 >> 2);
		GLctx.uniform2fv(webglGetUniformLocation(location), view);
	};
	var _emscripten_glUniform2fv = _glUniform2fv;
	var _glUniform2i = (location, v0, v1) => {
		GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
	};
	var _emscripten_glUniform2i = _glUniform2i;
	var _glUniform2iv = (location, count, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 2);
			return;
		}
		if (count <= 144) {
			count *= 2;
			var view = miniTempWebGLIntBuffers[count];
			for (var i$1 = 0; i$1 < count; i$1 += 2) {
				view[i$1] = HEAP32[value + 4 * i$1 >> 2];
				view[i$1 + 1] = HEAP32[value + (4 * i$1 + 4) >> 2];
			}
		} else var view = HEAP32.subarray(value >> 2, value + count * 8 >> 2);
		GLctx.uniform2iv(webglGetUniformLocation(location), view);
	};
	var _emscripten_glUniform2iv = _glUniform2iv;
	var _glUniform2ui = (location, v0, v1) => {
		GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1);
	};
	var _emscripten_glUniform2ui = _glUniform2ui;
	var _glUniform2uiv = (location, count, value) => {
		count && GLctx.uniform2uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 2);
	};
	var _emscripten_glUniform2uiv = _glUniform2uiv;
	var _glUniform3f = (location, v0, v1, v2) => {
		GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
	};
	var _emscripten_glUniform3f = _glUniform3f;
	var _glUniform3fv = (location, count, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 3);
			return;
		}
		if (count <= 96) {
			count *= 3;
			var view = miniTempWebGLFloatBuffers[count];
			for (var i$1 = 0; i$1 < count; i$1 += 3) {
				view[i$1] = HEAPF32[value + 4 * i$1 >> 2];
				view[i$1 + 1] = HEAPF32[value + (4 * i$1 + 4) >> 2];
				view[i$1 + 2] = HEAPF32[value + (4 * i$1 + 8) >> 2];
			}
		} else var view = HEAPF32.subarray(value >> 2, value + count * 12 >> 2);
		GLctx.uniform3fv(webglGetUniformLocation(location), view);
	};
	var _emscripten_glUniform3fv = _glUniform3fv;
	var _glUniform3i = (location, v0, v1, v2) => {
		GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
	};
	var _emscripten_glUniform3i = _glUniform3i;
	var _glUniform3iv = (location, count, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 3);
			return;
		}
		if (count <= 96) {
			count *= 3;
			var view = miniTempWebGLIntBuffers[count];
			for (var i$1 = 0; i$1 < count; i$1 += 3) {
				view[i$1] = HEAP32[value + 4 * i$1 >> 2];
				view[i$1 + 1] = HEAP32[value + (4 * i$1 + 4) >> 2];
				view[i$1 + 2] = HEAP32[value + (4 * i$1 + 8) >> 2];
			}
		} else var view = HEAP32.subarray(value >> 2, value + count * 12 >> 2);
		GLctx.uniform3iv(webglGetUniformLocation(location), view);
	};
	var _emscripten_glUniform3iv = _glUniform3iv;
	var _glUniform3ui = (location, v0, v1, v2) => {
		GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2);
	};
	var _emscripten_glUniform3ui = _glUniform3ui;
	var _glUniform3uiv = (location, count, value) => {
		count && GLctx.uniform3uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 3);
	};
	var _emscripten_glUniform3uiv = _glUniform3uiv;
	var _glUniform4f = (location, v0, v1, v2, v3) => {
		GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
	};
	var _emscripten_glUniform4f = _glUniform4f;
	var _glUniform4fv = (location, count, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 4);
			return;
		}
		if (count <= 72) {
			var view = miniTempWebGLFloatBuffers[4 * count];
			var heap = HEAPF32;
			value = value >> 2;
			count *= 4;
			for (var i$1 = 0; i$1 < count; i$1 += 4) {
				var dst = value + i$1;
				view[i$1] = heap[dst];
				view[i$1 + 1] = heap[dst + 1];
				view[i$1 + 2] = heap[dst + 2];
				view[i$1 + 3] = heap[dst + 3];
			}
		} else var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
		GLctx.uniform4fv(webglGetUniformLocation(location), view);
	};
	var _emscripten_glUniform4fv = _glUniform4fv;
	var _glUniform4i = (location, v0, v1, v2, v3) => {
		GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
	};
	var _emscripten_glUniform4i = _glUniform4i;
	var _glUniform4iv = (location, count, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 4);
			return;
		}
		if (count <= 72) {
			count *= 4;
			var view = miniTempWebGLIntBuffers[count];
			for (var i$1 = 0; i$1 < count; i$1 += 4) {
				view[i$1] = HEAP32[value + 4 * i$1 >> 2];
				view[i$1 + 1] = HEAP32[value + (4 * i$1 + 4) >> 2];
				view[i$1 + 2] = HEAP32[value + (4 * i$1 + 8) >> 2];
				view[i$1 + 3] = HEAP32[value + (4 * i$1 + 12) >> 2];
			}
		} else var view = HEAP32.subarray(value >> 2, value + count * 16 >> 2);
		GLctx.uniform4iv(webglGetUniformLocation(location), view);
	};
	var _emscripten_glUniform4iv = _glUniform4iv;
	var _glUniform4ui = (location, v0, v1, v2, v3) => {
		GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3);
	};
	var _emscripten_glUniform4ui = _glUniform4ui;
	var _glUniform4uiv = (location, count, value) => {
		count && GLctx.uniform4uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 4);
	};
	var _emscripten_glUniform4uiv = _glUniform4uiv;
	var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
		program = GL.programs[program];
		GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
	};
	var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;
	var _glUniformMatrix2fv = (location, count, transpose, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 4);
			return;
		}
		if (count <= 72) {
			count *= 4;
			var view = miniTempWebGLFloatBuffers[count];
			for (var i$1 = 0; i$1 < count; i$1 += 4) {
				view[i$1] = HEAPF32[value + 4 * i$1 >> 2];
				view[i$1 + 1] = HEAPF32[value + (4 * i$1 + 4) >> 2];
				view[i$1 + 2] = HEAPF32[value + (4 * i$1 + 8) >> 2];
				view[i$1 + 3] = HEAPF32[value + (4 * i$1 + 12) >> 2];
			}
		} else var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
		GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
	};
	var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;
	var _glUniformMatrix2x3fv = (location, count, transpose, value) => {
		count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6);
	};
	var _emscripten_glUniformMatrix2x3fv = _glUniformMatrix2x3fv;
	var _glUniformMatrix2x4fv = (location, count, transpose, value) => {
		count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8);
	};
	var _emscripten_glUniformMatrix2x4fv = _glUniformMatrix2x4fv;
	var _glUniformMatrix3fv = (location, count, transpose, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 9);
			return;
		}
		if (count <= 32) {
			count *= 9;
			var view = miniTempWebGLFloatBuffers[count];
			for (var i$1 = 0; i$1 < count; i$1 += 9) {
				view[i$1] = HEAPF32[value + 4 * i$1 >> 2];
				view[i$1 + 1] = HEAPF32[value + (4 * i$1 + 4) >> 2];
				view[i$1 + 2] = HEAPF32[value + (4 * i$1 + 8) >> 2];
				view[i$1 + 3] = HEAPF32[value + (4 * i$1 + 12) >> 2];
				view[i$1 + 4] = HEAPF32[value + (4 * i$1 + 16) >> 2];
				view[i$1 + 5] = HEAPF32[value + (4 * i$1 + 20) >> 2];
				view[i$1 + 6] = HEAPF32[value + (4 * i$1 + 24) >> 2];
				view[i$1 + 7] = HEAPF32[value + (4 * i$1 + 28) >> 2];
				view[i$1 + 8] = HEAPF32[value + (4 * i$1 + 32) >> 2];
			}
		} else var view = HEAPF32.subarray(value >> 2, value + count * 36 >> 2);
		GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
	};
	var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;
	var _glUniformMatrix3x2fv = (location, count, transpose, value) => {
		count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6);
	};
	var _emscripten_glUniformMatrix3x2fv = _glUniformMatrix3x2fv;
	var _glUniformMatrix3x4fv = (location, count, transpose, value) => {
		count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12);
	};
	var _emscripten_glUniformMatrix3x4fv = _glUniformMatrix3x4fv;
	var _glUniformMatrix4fv = (location, count, transpose, value) => {
		if (GL.currentContext.version >= 2) {
			count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 16);
			return;
		}
		if (count <= 18) {
			var view = miniTempWebGLFloatBuffers[16 * count];
			var heap = HEAPF32;
			value = value >> 2;
			count *= 16;
			for (var i$1 = 0; i$1 < count; i$1 += 16) {
				var dst = value + i$1;
				view[i$1] = heap[dst];
				view[i$1 + 1] = heap[dst + 1];
				view[i$1 + 2] = heap[dst + 2];
				view[i$1 + 3] = heap[dst + 3];
				view[i$1 + 4] = heap[dst + 4];
				view[i$1 + 5] = heap[dst + 5];
				view[i$1 + 6] = heap[dst + 6];
				view[i$1 + 7] = heap[dst + 7];
				view[i$1 + 8] = heap[dst + 8];
				view[i$1 + 9] = heap[dst + 9];
				view[i$1 + 10] = heap[dst + 10];
				view[i$1 + 11] = heap[dst + 11];
				view[i$1 + 12] = heap[dst + 12];
				view[i$1 + 13] = heap[dst + 13];
				view[i$1 + 14] = heap[dst + 14];
				view[i$1 + 15] = heap[dst + 15];
			}
		} else var view = HEAPF32.subarray(value >> 2, value + count * 64 >> 2);
		GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
	};
	var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;
	var _glUniformMatrix4x2fv = (location, count, transpose, value) => {
		count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8);
	};
	var _emscripten_glUniformMatrix4x2fv = _glUniformMatrix4x2fv;
	var _glUniformMatrix4x3fv = (location, count, transpose, value) => {
		count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12);
	};
	var _emscripten_glUniformMatrix4x3fv = _glUniformMatrix4x3fv;
	var _glUnmapBuffer = (target) => {
		if (!emscriptenWebGLValidateMapBufferTarget(target)) {
			GL.recordError(1280);
			err("GL_INVALID_ENUM in glUnmapBuffer");
			return 0;
		}
		var buffer = emscriptenWebGLGetBufferBinding(target);
		var mapping = GL.mappedBuffers[buffer];
		if (!mapping || !mapping.mem) {
			GL.recordError(1282);
			err("buffer was never mapped in glUnmapBuffer");
			return 0;
		}
		if (!(mapping.access & 16)) if (GL.currentContext.version >= 2) GLctx.bufferSubData(target, mapping.offset, HEAPU8, mapping.mem, mapping.length);
		else GLctx.bufferSubData(target, mapping.offset, HEAPU8.subarray(mapping.mem, mapping.mem + mapping.length));
		_free(mapping.mem);
		mapping.mem = 0;
		return 1;
	};
	var _emscripten_glUnmapBuffer = _glUnmapBuffer;
	var _glUseProgram = (program) => {
		program = GL.programs[program];
		GLctx.useProgram(program);
		GLctx.currentProgram = program;
	};
	var _emscripten_glUseProgram = _glUseProgram;
	var _glValidateProgram = (program) => {
		GLctx.validateProgram(GL.programs[program]);
	};
	var _emscripten_glValidateProgram = _glValidateProgram;
	var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
	var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;
	var _glVertexAttrib1fv = (index, v) => {
		GLctx.vertexAttrib1f(index, HEAPF32[v >> 2]);
	};
	var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;
	var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);
	var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;
	var _glVertexAttrib2fv = (index, v) => {
		GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2]);
	};
	var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;
	var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);
	var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;
	var _glVertexAttrib3fv = (index, v) => {
		GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2]);
	};
	var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;
	var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
	var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;
	var _glVertexAttrib4fv = (index, v) => {
		GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2], HEAPF32[v + 12 >> 2]);
	};
	var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;
	var _glVertexAttribDivisor = (index, divisor) => {
		GLctx.vertexAttribDivisor(index, divisor);
	};
	var _emscripten_glVertexAttribDivisor = _glVertexAttribDivisor;
	var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisor;
	var _emscripten_glVertexAttribDivisorARB = _glVertexAttribDivisor;
	var _emscripten_glVertexAttribDivisorEXT = _glVertexAttribDivisor;
	var _emscripten_glVertexAttribDivisorNV = _glVertexAttribDivisor;
	var _glVertexAttribI4i = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4i(x0, x1, x2, x3, x4);
	var _emscripten_glVertexAttribI4i = _glVertexAttribI4i;
	var _glVertexAttribI4iv = (index, v) => {
		GLctx.vertexAttribI4i(index, HEAP32[v >> 2], HEAP32[v + 4 >> 2], HEAP32[v + 8 >> 2], HEAP32[v + 12 >> 2]);
	};
	var _emscripten_glVertexAttribI4iv = _glVertexAttribI4iv;
	var _glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);
	var _emscripten_glVertexAttribI4ui = _glVertexAttribI4ui;
	var _glVertexAttribI4uiv = (index, v) => {
		GLctx.vertexAttribI4ui(index, HEAPU32[v >> 2], HEAPU32[v + 4 >> 2], HEAPU32[v + 8 >> 2], HEAPU32[v + 12 >> 2]);
	};
	var _emscripten_glVertexAttribI4uiv = _glVertexAttribI4uiv;
	var _glVertexAttribIPointer = (index, size, type, stride, ptr) => {
		var cb = GL.currentContext.clientBuffers[index];
		if (!GLctx.currentArrayBufferBinding) {
			cb.size = size;
			cb.type = type;
			cb.normalized = false;
			cb.stride = stride;
			cb.ptr = ptr;
			cb.clientside = true;
			cb.vertexAttribPointerAdaptor = function(index$1, size$1, type$1, normalized, stride$1, ptr$1) {
				this.vertexAttribIPointer(index$1, size$1, type$1, stride$1, ptr$1);
			};
			return;
		}
		cb.clientside = false;
		GLctx.vertexAttribIPointer(index, size, type, stride, ptr);
	};
	var _emscripten_glVertexAttribIPointer = _glVertexAttribIPointer;
	var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
		var cb = GL.currentContext.clientBuffers[index];
		if (!GLctx.currentArrayBufferBinding) {
			cb.size = size;
			cb.type = type;
			cb.normalized = normalized;
			cb.stride = stride;
			cb.ptr = ptr;
			cb.clientside = true;
			cb.vertexAttribPointerAdaptor = function(index$1, size$1, type$1, normalized$1, stride$1, ptr$1) {
				this.vertexAttribPointer(index$1, size$1, type$1, normalized$1, stride$1, ptr$1);
			};
			return;
		}
		cb.clientside = false;
		GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
	};
	var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;
	var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
	var _emscripten_glViewport = _glViewport;
	var _glWaitSync = (sync, flags, timeout) => {
		timeout = Number(timeout);
		GLctx.waitSync(GL.syncs[sync], flags, timeout);
	};
	var _emscripten_glWaitSync = _glWaitSync;
	var _emscripten_has_asyncify = () => 1;
	var doRequestFullscreen = (target, strategy) => {
		if (!JSEvents.fullscreenEnabled()) return -1;
		target = findEventTarget(target);
		if (!target) return -4;
		if (!target.requestFullscreen && !target.webkitRequestFullscreen) return -3;
		if (!JSEvents.canPerformEventHandlerRequests()) {
			if (strategy.deferUntilInEventHandler) {
				JSEvents.deferCall(JSEvents_requestFullscreen, 1, [target, strategy]);
				return 1;
			}
			return -2;
		}
		return JSEvents_requestFullscreen(target, strategy);
	};
	var _emscripten_request_fullscreen_strategy = (target, deferUntilInEventHandler, fullscreenStrategy) => {
		var strategy = {
			scaleMode: HEAP32[fullscreenStrategy >> 2],
			canvasResolutionScaleMode: HEAP32[fullscreenStrategy + 4 >> 2],
			filteringMode: HEAP32[fullscreenStrategy + 8 >> 2],
			deferUntilInEventHandler,
			canvasResizedCallback: HEAP32[fullscreenStrategy + 12 >> 2],
			canvasResizedCallbackUserData: HEAP32[fullscreenStrategy + 16 >> 2]
		};
		return doRequestFullscreen(target, strategy);
	};
	var _emscripten_request_pointerlock = (target, deferUntilInEventHandler) => {
		target = findEventTarget(target);
		if (!target) return -4;
		if (!target.requestPointerLock) return -1;
		if (!JSEvents.canPerformEventHandlerRequests()) {
			if (deferUntilInEventHandler) {
				JSEvents.deferCall(requestPointerLock, 2, [target]);
				return 1;
			}
			return -2;
		}
		return requestPointerLock(target);
	};
	var getHeapMax = () => 2147483648;
	var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
	var growMemory = (size) => {
		var oldHeapSize = wasmMemory.buffer.byteLength;
		var pages = (size - oldHeapSize + 65535) / 65536 | 0;
		try {
			wasmMemory.grow(pages);
			updateMemoryViews();
			return 1;
		} catch (e) {}
	};
	var _emscripten_resize_heap = (requestedSize) => {
		var oldSize = HEAPU8.length;
		requestedSize >>>= 0;
		var maxHeapSize = getHeapMax();
		if (requestedSize > maxHeapSize) return false;
		for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
			var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
			overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
			var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
			if (growMemory(newSize)) return true;
		}
		return false;
	};
	var _emscripten_sample_gamepad_data = () => {
		try {
			if (navigator.getGamepads) return (JSEvents.lastGamepadState = navigator.getGamepads()) ? 0 : -1;
		} catch (e) {
			navigator.getGamepads = null;
		}
		return -1;
	};
	var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
		var beforeUnloadEventHandlerFunc = (e = event) => {
			var confirmationMessage = ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, 0, userData);
			if (confirmationMessage) confirmationMessage = UTF8ToString(confirmationMessage);
			if (confirmationMessage) {
				e.preventDefault();
				e.returnValue = confirmationMessage;
				return confirmationMessage;
			}
		};
		var eventHandler = {
			target: findEventTarget(target),
			eventTypeString,
			callbackfunc,
			handlerFunc: beforeUnloadEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_beforeunload_callback_on_thread = (userData, callbackfunc, targetThread) => {
		if (typeof onbeforeunload == "undefined") return -1;
		if (targetThread !== 1) return -5;
		return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload");
	};
	var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.focusEvent ||= _malloc(256);
		var focusEventHandlerFunc = (e = event) => {
			var nodeName = JSEvents.getNodeNameForTarget(e.target);
			var id = e.target.id ? e.target.id : "";
			var focusEvent = JSEvents.focusEvent;
			stringToUTF8(nodeName, focusEvent + 0, 128);
			stringToUTF8(id, focusEvent + 128, 128);
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, focusEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target: findEventTarget(target),
			eventTypeString,
			callbackfunc,
			handlerFunc: focusEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);
	var _emscripten_set_element_css_size = (target, width, height) => {
		target = findEventTarget(target);
		if (!target) return -4;
		target.style.width = width + "px";
		target.style.height = height + "px";
		return 0;
	};
	var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);
	var fillFullscreenChangeEventData = (eventStruct) => {
		var fullscreenElement = getFullscreenElement();
		var isFullscreen = !!fullscreenElement;
		HEAP8[eventStruct] = isFullscreen;
		HEAP8[eventStruct + 1] = JSEvents.fullscreenEnabled();
		var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
		var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
		var id = reportedElement?.id || "";
		stringToUTF8(nodeName, eventStruct + 2, 128);
		stringToUTF8(id, eventStruct + 130, 128);
		HEAP32[eventStruct + 260 >> 2] = reportedElement ? reportedElement.clientWidth : 0;
		HEAP32[eventStruct + 264 >> 2] = reportedElement ? reportedElement.clientHeight : 0;
		HEAP32[eventStruct + 268 >> 2] = screen.width;
		HEAP32[eventStruct + 272 >> 2] = screen.height;
		if (isFullscreen) JSEvents.previousFullscreenElement = fullscreenElement;
	};
	var registerFullscreenChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.fullscreenChangeEvent ||= _malloc(276);
		var fullscreenChangeEventhandlerFunc = (e = event) => {
			var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
			fillFullscreenChangeEventData(fullscreenChangeEvent);
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target,
			eventTypeString,
			callbackfunc,
			handlerFunc: fullscreenChangeEventhandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_fullscreenchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
		if (!JSEvents.fullscreenEnabled()) return -1;
		target = findEventTarget(target);
		if (!target) return -4;
		registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
		return registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
	};
	var registerGamepadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.gamepadEvent ||= _malloc(1240);
		var gamepadEventHandlerFunc = (e = event) => {
			var gamepadEvent = JSEvents.gamepadEvent;
			fillGamepadEventData(gamepadEvent, e["gamepad"]);
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, gamepadEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target: findEventTarget(target),
			allowsDeferredCalls: true,
			eventTypeString,
			callbackfunc,
			handlerFunc: gamepadEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_gamepadconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
		if (_emscripten_sample_gamepad_data()) return -1;
		return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
	};
	var _emscripten_set_gamepaddisconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
		if (_emscripten_sample_gamepad_data()) return -1;
		return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
	};
	var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.keyEvent ||= _malloc(160);
		var keyEventHandlerFunc = (e) => {
			var keyEventData = JSEvents.keyEvent;
			HEAPF64[keyEventData >> 3] = e.timeStamp;
			var idx = keyEventData >> 2;
			HEAP32[idx + 2] = e.location;
			HEAP8[keyEventData + 12] = e.ctrlKey;
			HEAP8[keyEventData + 13] = e.shiftKey;
			HEAP8[keyEventData + 14] = e.altKey;
			HEAP8[keyEventData + 15] = e.metaKey;
			HEAP8[keyEventData + 16] = e.repeat;
			HEAP32[idx + 5] = e.charCode;
			HEAP32[idx + 6] = e.keyCode;
			HEAP32[idx + 7] = e.which;
			stringToUTF8(e.key || "", keyEventData + 32, 32);
			stringToUTF8(e.code || "", keyEventData + 64, 32);
			stringToUTF8(e.char || "", keyEventData + 96, 32);
			stringToUTF8(e.locale || "", keyEventData + 128, 32);
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, keyEventData, userData)) e.preventDefault();
		};
		var eventHandler = {
			target: findEventTarget(target),
			eventTypeString,
			callbackfunc,
			handlerFunc: keyEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
	var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);
	var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
	var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
		var iterFunc = () => dynCall_v(func);
		setMainLoop(iterFunc, fps, simulateInfiniteLoop);
	};
	var fillMouseEventData = (eventStruct, e, target) => {
		HEAPF64[eventStruct >> 3] = e.timeStamp;
		var idx = eventStruct >> 2;
		HEAP32[idx + 2] = e.screenX;
		HEAP32[idx + 3] = e.screenY;
		HEAP32[idx + 4] = e.clientX;
		HEAP32[idx + 5] = e.clientY;
		HEAP8[eventStruct + 24] = e.ctrlKey;
		HEAP8[eventStruct + 25] = e.shiftKey;
		HEAP8[eventStruct + 26] = e.altKey;
		HEAP8[eventStruct + 27] = e.metaKey;
		HEAP16[idx * 2 + 14] = e.button;
		HEAP16[idx * 2 + 15] = e.buttons;
		HEAP32[idx + 8] = e["movementX"];
		HEAP32[idx + 9] = e["movementY"];
		var rect = getBoundingClientRect(target);
		HEAP32[idx + 10] = e.clientX - (rect.left | 0);
		HEAP32[idx + 11] = e.clientY - (rect.top | 0);
	};
	var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.mouseEvent ||= _malloc(64);
		target = findEventTarget(target);
		var mouseEventHandlerFunc = (e = event) => {
			fillMouseEventData(JSEvents.mouseEvent, e, target);
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target,
			allowsDeferredCalls: eventTypeString != "mousemove" && eventTypeString != "mouseenter" && eventTypeString != "mouseleave",
			eventTypeString,
			callbackfunc,
			handlerFunc: mouseEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);
	var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);
	var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);
	var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);
	var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);
	var fillPointerlockChangeEventData = (eventStruct) => {
		var pointerLockElement = document.pointerLockElement;
		HEAP8[eventStruct] = !!pointerLockElement;
		var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
		var id = pointerLockElement?.id || "";
		stringToUTF8(nodeName, eventStruct + 1, 128);
		stringToUTF8(id, eventStruct + 129, 128);
	};
	var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.pointerlockChangeEvent ||= _malloc(257);
		var pointerlockChangeEventHandlerFunc = (e = event) => {
			var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
			fillPointerlockChangeEventData(pointerlockChangeEvent);
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target,
			eventTypeString,
			callbackfunc,
			handlerFunc: pointerlockChangeEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
		if (!document.body?.requestPointerLock) return -1;
		target = findEventTarget(target);
		if (!target) return -4;
		return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
	};
	var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.uiEvent ||= _malloc(36);
		target = findEventTarget(target);
		var uiEventHandlerFunc = (e = event) => {
			if (e.target != target) return;
			var b = document.body;
			if (!b) return;
			var uiEvent = JSEvents.uiEvent;
			HEAP32[uiEvent >> 2] = 0;
			HEAP32[uiEvent + 4 >> 2] = b.clientWidth;
			HEAP32[uiEvent + 8 >> 2] = b.clientHeight;
			HEAP32[uiEvent + 12 >> 2] = innerWidth;
			HEAP32[uiEvent + 16 >> 2] = innerHeight;
			HEAP32[uiEvent + 20 >> 2] = outerWidth;
			HEAP32[uiEvent + 24 >> 2] = outerHeight;
			HEAP32[uiEvent + 28 >> 2] = pageXOffset | 0;
			HEAP32[uiEvent + 32 >> 2] = pageYOffset | 0;
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, uiEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target,
			eventTypeString,
			callbackfunc,
			handlerFunc: uiEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);
	var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.touchEvent ||= _malloc(1552);
		target = findEventTarget(target);
		var touchEventHandlerFunc = (e) => {
			var touches = {}, et = e.touches;
			for (let t of et) {
				t.isChanged = t.onTarget = 0;
				touches[t.identifier] = t;
			}
			for (let t of e.changedTouches) {
				t.isChanged = 1;
				touches[t.identifier] = t;
			}
			for (let t of e.targetTouches) touches[t.identifier].onTarget = 1;
			var touchEvent = JSEvents.touchEvent;
			HEAPF64[touchEvent >> 3] = e.timeStamp;
			HEAP8[touchEvent + 12] = e.ctrlKey;
			HEAP8[touchEvent + 13] = e.shiftKey;
			HEAP8[touchEvent + 14] = e.altKey;
			HEAP8[touchEvent + 15] = e.metaKey;
			var idx = touchEvent + 16;
			var targetRect = getBoundingClientRect(target);
			var numTouches = 0;
			for (let t of Object.values(touches)) {
				var idx32 = idx >> 2;
				HEAP32[idx32 + 0] = t.identifier;
				HEAP32[idx32 + 1] = t.screenX;
				HEAP32[idx32 + 2] = t.screenY;
				HEAP32[idx32 + 3] = t.clientX;
				HEAP32[idx32 + 4] = t.clientY;
				HEAP32[idx32 + 5] = t.pageX;
				HEAP32[idx32 + 6] = t.pageY;
				HEAP8[idx + 28] = t.isChanged;
				HEAP8[idx + 29] = t.onTarget;
				HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
				HEAP32[idx32 + 9] = t.clientY - (targetRect.top | 0);
				idx += 48;
				if (++numTouches > 31) break;
			}
			HEAP32[touchEvent + 8 >> 2] = numTouches;
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, touchEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target,
			allowsDeferredCalls: eventTypeString == "touchstart" || eventTypeString == "touchend",
			eventTypeString,
			callbackfunc,
			handlerFunc: touchEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);
	var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);
	var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);
	var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);
	var fillVisibilityChangeEventData = (eventStruct) => {
		var visibilityState = [
			"hidden",
			"visible",
			"prerender",
			"unloaded"
		].indexOf(document.visibilityState);
		HEAP8[eventStruct] = document.hidden;
		HEAP32[eventStruct + 4 >> 2] = visibilityState;
	};
	var registerVisibilityChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.visibilityChangeEvent ||= _malloc(8);
		var visibilityChangeEventHandlerFunc = (e = event) => {
			var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
			fillVisibilityChangeEventData(visibilityChangeEvent);
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target,
			eventTypeString,
			callbackfunc,
			handlerFunc: visibilityChangeEventHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_visibilitychange_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => registerVisibilityChangeEventCallback(specialHTMLTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread);
	var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
		JSEvents.wheelEvent ||= _malloc(96);
		var wheelHandlerFunc = (e = event) => {
			var wheelEvent = JSEvents.wheelEvent;
			fillMouseEventData(wheelEvent, e, target);
			HEAPF64[wheelEvent + 64 >> 3] = e["deltaX"];
			HEAPF64[wheelEvent + 72 >> 3] = e["deltaY"];
			HEAPF64[wheelEvent + 80 >> 3] = e["deltaZ"];
			HEAP32[wheelEvent + 88 >> 2] = e["deltaMode"];
			if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, wheelEvent, userData)) e.preventDefault();
		};
		var eventHandler = {
			target,
			allowsDeferredCalls: true,
			eventTypeString,
			callbackfunc,
			handlerFunc: wheelHandlerFunc,
			useCapture
		};
		return JSEvents.registerOrRemoveHandler(eventHandler);
	};
	var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
		target = findEventTarget(target);
		if (!target) return -4;
		if (typeof target.onwheel != "undefined") return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
		else return -1;
	};
	var _emscripten_set_window_title = (title) => document.title = UTF8ToString(title);
	var _emscripten_sleep = (ms) => Asyncify.handleSleep((wakeUp) => safeSetTimeout(wakeUp, ms));
	_emscripten_sleep.isAsync = true;
	var ENV = {};
	var getExecutableName = () => thisProgram || "./this.program";
	var getEnvStrings = () => {
		if (!getEnvStrings.strings) {
			var env = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: (typeof navigator == "object" && navigator.language || "C").replace("-", "_") + ".UTF-8",
				_: getExecutableName()
			};
			for (var x in ENV) if (ENV[x] === void 0) delete env[x];
			else env[x] = ENV[x];
			var strings = [];
			for (var x in env) strings.push(`${x}=${env[x]}`);
			getEnvStrings.strings = strings;
		}
		return getEnvStrings.strings;
	};
	var _environ_get = (__environ, environ_buf) => {
		var bufSize = 0;
		var envp = 0;
		for (var string of getEnvStrings()) {
			var ptr = environ_buf + bufSize;
			HEAPU32[__environ + envp >> 2] = ptr;
			bufSize += stringToUTF8(string, ptr, Infinity) + 1;
			envp += 4;
		}
		return 0;
	};
	var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
		var strings = getEnvStrings();
		HEAPU32[penviron_count >> 2] = strings.length;
		var bufSize = 0;
		for (var string of strings) bufSize += lengthBytesUTF8(string) + 1;
		HEAPU32[penviron_buf_size >> 2] = bufSize;
		return 0;
	};
	function _fd_close(fd) {
		try {
			var stream = SYSCALLS.getStreamFromFD(fd);
			FS.close(stream);
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return e.errno;
		}
	}
	var doReadv = (stream, iov, iovcnt, offset) => {
		var ret = 0;
		for (var i$1 = 0; i$1 < iovcnt; i$1++) {
			var ptr = HEAPU32[iov >> 2];
			var len = HEAPU32[iov + 4 >> 2];
			iov += 8;
			var curr = FS.read(stream, HEAP8, ptr, len, offset);
			if (curr < 0) return -1;
			ret += curr;
			if (curr < len) break;
			if (typeof offset != "undefined") offset += curr;
		}
		return ret;
	};
	function _fd_read(fd, iov, iovcnt, pnum) {
		try {
			var stream = SYSCALLS.getStreamFromFD(fd);
			var num = doReadv(stream, iov, iovcnt);
			HEAPU32[pnum >> 2] = num;
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return e.errno;
		}
	}
	function _fd_seek(fd, offset, whence, newOffset) {
		offset = bigintToI53Checked(offset);
		try {
			if (isNaN(offset)) return 61;
			var stream = SYSCALLS.getStreamFromFD(fd);
			FS.llseek(stream, offset, whence);
			HEAP64[newOffset >> 3] = BigInt(stream.position);
			if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return e.errno;
		}
	}
	var doWritev = (stream, iov, iovcnt, offset) => {
		var ret = 0;
		for (var i$1 = 0; i$1 < iovcnt; i$1++) {
			var ptr = HEAPU32[iov >> 2];
			var len = HEAPU32[iov + 4 >> 2];
			iov += 8;
			var curr = FS.write(stream, HEAP8, ptr, len, offset);
			if (curr < 0) return -1;
			ret += curr;
			if (curr < len) break;
			if (typeof offset != "undefined") offset += curr;
		}
		return ret;
	};
	function _fd_write(fd, iov, iovcnt, pnum) {
		try {
			var stream = SYSCALLS.getStreamFromFD(fd);
			var num = doWritev(stream, iov, iovcnt);
			HEAPU32[pnum >> 2] = num;
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return e.errno;
		}
	}
	var autoResumeAudioContext = (ctx, elements) => {
		if (!elements) elements = [document, document.getElementById("canvas")];
		[
			"keydown",
			"mousedown",
			"touchstart"
		].forEach((event$1) => {
			elements.forEach((element) => {
				element?.addEventListener(event$1, () => {
					if (ctx.state === "suspended") ctx.resume();
				}, { once: true });
			});
		});
	};
	var runAndAbortIfError = (func) => {
		try {
			return func();
		} catch (e) {
			abort(e);
		}
	};
	var runtimeKeepalivePush = () => {
		runtimeKeepaliveCounter += 1;
	};
	var runtimeKeepalivePop = () => {
		runtimeKeepaliveCounter -= 1;
	};
	var Asyncify = {
		instrumentWasmImports(imports) {
			var importPattern = /^(invoke_.*|__asyncjs__.*)$/;
			for (let [x, original] of Object.entries(imports)) if (typeof original == "function") original.isAsync || importPattern.test(x);
		},
		instrumentFunction(original) {
			var wrapper = (...args) => {
				Asyncify.exportCallStack.push(original);
				try {
					return original(...args);
				} finally {
					if (!ABORT) {
						Asyncify.exportCallStack.pop();
						Asyncify.maybeStopUnwind();
					}
				}
			};
			Asyncify.funcWrappers.set(original, wrapper);
			return wrapper;
		},
		instrumentWasmExports(exports) {
			var ret = {};
			for (let [x, original] of Object.entries(exports)) if (typeof original == "function") ret[x] = Asyncify.instrumentFunction(original);
			else ret[x] = original;
			return ret;
		},
		State: {
			Normal: 0,
			Unwinding: 1,
			Rewinding: 2,
			Disabled: 3
		},
		state: 0,
		StackSize: 4096,
		currData: null,
		handleSleepReturnValue: 0,
		exportCallStack: [],
		callstackFuncToId: /* @__PURE__ */ new Map(),
		callStackIdToFunc: /* @__PURE__ */ new Map(),
		funcWrappers: /* @__PURE__ */ new Map(),
		callStackId: 0,
		asyncPromiseHandlers: null,
		sleepCallbacks: [],
		getCallStackId(func) {
			if (!Asyncify.callstackFuncToId.has(func)) {
				var id = Asyncify.callStackId++;
				Asyncify.callstackFuncToId.set(func, id);
				Asyncify.callStackIdToFunc.set(id, func);
			}
			return Asyncify.callstackFuncToId.get(func);
		},
		maybeStopUnwind() {
			if (Asyncify.currData && Asyncify.state === Asyncify.State.Unwinding && Asyncify.exportCallStack.length === 0) {
				Asyncify.state = Asyncify.State.Normal;
				runAndAbortIfError(_asyncify_stop_unwind);
				if (typeof Fibers != "undefined") Fibers.trampoline();
			}
		},
		whenDone() {
			return new Promise((resolve, reject) => {
				Asyncify.asyncPromiseHandlers = {
					resolve,
					reject
				};
			});
		},
		allocateData() {
			var ptr = _malloc(12 + Asyncify.StackSize);
			Asyncify.setDataHeader(ptr, ptr + 12, Asyncify.StackSize);
			Asyncify.setDataRewindFunc(ptr);
			return ptr;
		},
		setDataHeader(ptr, stack, stackSize) {
			HEAPU32[ptr >> 2] = stack;
			HEAPU32[ptr + 4 >> 2] = stack + stackSize;
		},
		setDataRewindFunc(ptr) {
			var bottomOfCallStack = Asyncify.exportCallStack[0];
			var rewindId = Asyncify.getCallStackId(bottomOfCallStack);
			HEAP32[ptr + 8 >> 2] = rewindId;
		},
		getDataRewindFunc(ptr) {
			var id = HEAP32[ptr + 8 >> 2];
			return Asyncify.callStackIdToFunc.get(id);
		},
		doRewind(ptr) {
			var original = Asyncify.getDataRewindFunc(ptr);
			return Asyncify.funcWrappers.get(original)();
		},
		handleSleep(startAsync) {
			if (ABORT) return;
			if (Asyncify.state === Asyncify.State.Normal) {
				var reachedCallback = false;
				var reachedAfterCallback = false;
				startAsync((handleSleepReturnValue = 0) => {
					if (ABORT) return;
					Asyncify.handleSleepReturnValue = handleSleepReturnValue;
					reachedCallback = true;
					if (!reachedAfterCallback) return;
					Asyncify.state = Asyncify.State.Rewinding;
					runAndAbortIfError(() => _asyncify_start_rewind(Asyncify.currData));
					if (typeof MainLoop != "undefined" && MainLoop.func) MainLoop.resume();
					var asyncWasmReturnValue, isError = false;
					try {
						asyncWasmReturnValue = Asyncify.doRewind(Asyncify.currData);
					} catch (err$1) {
						asyncWasmReturnValue = err$1;
						isError = true;
					}
					var handled = false;
					if (!Asyncify.currData) {
						var asyncPromiseHandlers = Asyncify.asyncPromiseHandlers;
						if (asyncPromiseHandlers) {
							Asyncify.asyncPromiseHandlers = null;
							(isError ? asyncPromiseHandlers.reject : asyncPromiseHandlers.resolve)(asyncWasmReturnValue);
							handled = true;
						}
					}
					if (isError && !handled) throw asyncWasmReturnValue;
				});
				reachedAfterCallback = true;
				if (!reachedCallback) {
					Asyncify.state = Asyncify.State.Unwinding;
					Asyncify.currData = Asyncify.allocateData();
					if (typeof MainLoop != "undefined" && MainLoop.func) MainLoop.pause();
					runAndAbortIfError(() => _asyncify_start_unwind(Asyncify.currData));
				}
			} else if (Asyncify.state === Asyncify.State.Rewinding) {
				Asyncify.state = Asyncify.State.Normal;
				runAndAbortIfError(_asyncify_stop_rewind);
				_free(Asyncify.currData);
				Asyncify.currData = null;
				Asyncify.sleepCallbacks.forEach(callUserCallback);
			} else abort(`invalid state: ${Asyncify.state}`);
			return Asyncify.handleSleepReturnValue;
		},
		handleAsync: (startAsync) => Asyncify.handleSleep((wakeUp) => {
			startAsync().then(wakeUp);
		})
	};
	var getCFunc = (ident) => {
		return Module["_" + ident];
	};
	var writeArrayToMemory = (array, buffer) => {
		HEAP8.set(array, buffer);
	};
	var ccall = (ident, returnType, argTypes, args, opts) => {
		var toC = {
			string: (str) => {
				var ret$1 = 0;
				if (str !== null && str !== void 0 && str !== 0) ret$1 = stringToUTF8OnStack(str);
				return ret$1;
			},
			array: (arr) => {
				var ret$1 = stackAlloc(arr.length);
				writeArrayToMemory(arr, ret$1);
				return ret$1;
			}
		};
		function convertReturnValue(ret$1) {
			if (returnType === "string") return UTF8ToString(ret$1);
			if (returnType === "boolean") return Boolean(ret$1);
			return ret$1;
		}
		var func = getCFunc(ident);
		var cArgs = [];
		var stack = 0;
		if (args) for (var i$1 = 0; i$1 < args.length; i$1++) {
			var converter = toC[argTypes[i$1]];
			if (converter) {
				if (stack === 0) stack = stackSave();
				cArgs[i$1] = converter(args[i$1]);
			} else cArgs[i$1] = args[i$1];
		}
		var previousAsync = Asyncify.currData;
		var ret = func(...cArgs);
		function onDone(ret$1) {
			runtimeKeepalivePop();
			if (stack !== 0) stackRestore(stack);
			return convertReturnValue(ret$1);
		}
		var asyncMode = opts?.async;
		runtimeKeepalivePush();
		if (Asyncify.currData != previousAsync) return Asyncify.whenDone().then(onDone);
		ret = onDone(ret);
		if (asyncMode) return Promise.resolve(ret);
		return ret;
	};
	var cwrap = (ident, returnType, argTypes, opts) => {
		var numericArgs = !argTypes || argTypes.every((type) => type === "number" || type === "boolean");
		if (returnType !== "string" && numericArgs && !opts) return getCFunc(ident);
		return (...args) => ccall(ident, returnType, argTypes, args, opts);
	};
	var createContext = Browser.createContext;
	FS.createPreloadedFile = FS_createPreloadedFile;
	FS.preloadFile = FS_preloadFile;
	FS.staticInit();
	registerPreMainLoop(() => GL.newRenderingFrameStarted());
	Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
	Module["pauseMainLoop"] = MainLoop.pause;
	Module["resumeMainLoop"] = MainLoop.resume;
	MainLoop.init();
	for (let i$1 = 0; i$1 < 32; ++i$1) tempFixedLengthArray.push(new Array(i$1));
	var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
	for (var i = 0; i <= 288; ++i) miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
	var miniTempWebGLIntBuffersStorage = new Int32Array(288);
	for (var i = 0; i <= 288; ++i) miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
	if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
	if (Module["preloadPlugins"]) preloadPlugins = Module["preloadPlugins"];
	if (Module["print"]) out = Module["print"];
	if (Module["printErr"]) err = Module["printErr"];
	if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
	if (Module["arguments"]) arguments_ = Module["arguments"];
	if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
	if (Module["preInit"]) {
		if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
		while (Module["preInit"].length > 0) Module["preInit"].shift()();
	}
	Module["callMain"] = callMain;
	Module["ccall"] = ccall;
	Module["cwrap"] = cwrap;
	Module["createContext"] = createContext;
	Module["FS"] = FS;
	var ASM_CONSTS = {
		124808: ($0) => {
			var str = UTF8ToString($0) + "\n\nAbort/Retry/Ignore/AlwaysIgnore? [ariA] :";
			var reply = window.prompt(str, "i");
			if (reply === null) reply = "i";
			return reply.length === 1 ? reply.charCodeAt(0) : -1;
		},
		125023: () => {
			if (typeof AudioContext !== "undefined") return true;
			else if (typeof webkitAudioContext !== "undefined") return true;
			return false;
		},
		125170: () => {
			if (typeof navigator.mediaDevices !== "undefined" && typeof navigator.mediaDevices.getUserMedia !== "undefined") return true;
			else if (typeof navigator.webkitGetUserMedia !== "undefined") return true;
			return false;
		},
		125404: ($0) => {
			if (typeof Module["SDL2"] === "undefined") Module["SDL2"] = {};
			var SDL2 = Module["SDL2"];
			if (!$0) SDL2.audio = {};
			else SDL2.capture = {};
			if (!SDL2.audioContext) {
				if (typeof AudioContext !== "undefined") SDL2.audioContext = new AudioContext();
				else if (typeof webkitAudioContext !== "undefined") SDL2.audioContext = new webkitAudioContext();
				if (SDL2.audioContext) {
					if (typeof navigator.userActivation === "undefined") autoResumeAudioContext(SDL2.audioContext);
				}
			}
			return SDL2.audioContext === void 0 ? -1 : 0;
		},
		125956: () => {
			return Module["SDL2"].audioContext.sampleRate;
		},
		126024: ($0, $1, $2, $3) => {
			var SDL2 = Module["SDL2"];
			var have_microphone = function(stream) {
				if (SDL2.capture.silenceTimer !== void 0) {
					clearInterval(SDL2.capture.silenceTimer);
					SDL2.capture.silenceTimer = void 0;
					SDL2.capture.silenceBuffer = void 0;
				}
				SDL2.capture.mediaStreamNode = SDL2.audioContext.createMediaStreamSource(stream);
				SDL2.capture.scriptProcessorNode = SDL2.audioContext.createScriptProcessor($1, $0, 1);
				SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {
					if (SDL2 === void 0 || SDL2.capture === void 0) return;
					audioProcessingEvent.outputBuffer.getChannelData(0).fill(0);
					SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer;
					dynCall("vp", $2, [$3]);
				};
				SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode);
				SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination);
				SDL2.capture.stream = stream;
			};
			var no_microphone = function(error) {};
			SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate);
			SDL2.capture.silenceBuffer.getChannelData(0).fill(0);
			var silence_callback = function() {
				SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer;
				dynCall("vp", $2, [$3]);
			};
			SDL2.capture.silenceTimer = setInterval(silence_callback, $1 / SDL2.audioContext.sampleRate * 1e3);
			if (navigator.mediaDevices !== void 0 && navigator.mediaDevices.getUserMedia !== void 0) navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false
			}).then(have_microphone).catch(no_microphone);
			else if (navigator.webkitGetUserMedia !== void 0) navigator.webkitGetUserMedia({
				audio: true,
				video: false
			}, have_microphone, no_microphone);
		},
		127717: ($0, $1, $2, $3) => {
			var SDL2 = Module["SDL2"];
			SDL2.audio.scriptProcessorNode = SDL2.audioContext["createScriptProcessor"]($1, 0, $0);
			SDL2.audio.scriptProcessorNode["onaudioprocess"] = function(e) {
				if (SDL2 === void 0 || SDL2.audio === void 0) return;
				if (SDL2.audio.silenceTimer !== void 0) {
					clearInterval(SDL2.audio.silenceTimer);
					SDL2.audio.silenceTimer = void 0;
					SDL2.audio.silenceBuffer = void 0;
				}
				SDL2.audio.currentOutputBuffer = e["outputBuffer"];
				dynCall("vp", $2, [$3]);
			};
			SDL2.audio.scriptProcessorNode["connect"](SDL2.audioContext["destination"]);
			if (SDL2.audioContext.state === "suspended") {
				SDL2.audio.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate);
				SDL2.audio.silenceBuffer.getChannelData(0).fill(0);
				var silence_callback = function() {
					if (typeof navigator.userActivation !== "undefined") {
						if (navigator.userActivation.hasBeenActive) SDL2.audioContext.resume();
					}
					SDL2.audio.currentOutputBuffer = SDL2.audio.silenceBuffer;
					dynCall("vp", $2, [$3]);
					SDL2.audio.currentOutputBuffer = void 0;
				};
				SDL2.audio.silenceTimer = setInterval(silence_callback, $1 / SDL2.audioContext.sampleRate * 1e3);
			}
		},
		128892: ($0, $1) => {
			var SDL2 = Module["SDL2"];
			var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels;
			for (var c = 0; c < numChannels; ++c) {
				var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c);
				if (channelData.length != $1) throw "Web Audio capture buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!";
				if (numChannels == 1) for (var j = 0; j < $1; ++j) setValue($0 + j * 4, channelData[j], "float");
				else for (var j = 0; j < $1; ++j) setValue($0 + (j * numChannels + c) * 4, channelData[j], "float");
			}
		},
		129497: ($0, $1) => {
			var SDL2 = Module["SDL2"];
			var buf = $0 >>> 2;
			var numChannels = SDL2.audio.currentOutputBuffer["numberOfChannels"];
			for (var c = 0; c < numChannels; ++c) {
				var channelData = SDL2.audio.currentOutputBuffer["getChannelData"](c);
				if (channelData.length != $1) throw "Web Audio output buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!";
				for (var j = 0; j < $1; ++j) channelData[j] = HEAPF32[buf + (j * numChannels + c)];
			}
		},
		129986: ($0) => {
			var SDL2 = Module["SDL2"];
			if ($0) {
				if (SDL2.capture.silenceTimer !== void 0) clearInterval(SDL2.capture.silenceTimer);
				if (SDL2.capture.stream !== void 0) {
					var tracks = SDL2.capture.stream.getAudioTracks();
					for (var i$1 = 0; i$1 < tracks.length; i$1++) SDL2.capture.stream.removeTrack(tracks[i$1]);
				}
				if (SDL2.capture.scriptProcessorNode !== void 0) {
					SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {};
					SDL2.capture.scriptProcessorNode.disconnect();
				}
				if (SDL2.capture.mediaStreamNode !== void 0) SDL2.capture.mediaStreamNode.disconnect();
				SDL2.capture = void 0;
			} else {
				if (SDL2.audio.scriptProcessorNode != void 0) SDL2.audio.scriptProcessorNode.disconnect();
				if (SDL2.audio.silenceTimer !== void 0) clearInterval(SDL2.audio.silenceTimer);
				SDL2.audio = void 0;
			}
			if (SDL2.audioContext !== void 0 && SDL2.audio === void 0 && SDL2.capture === void 0) {
				SDL2.audioContext.close();
				SDL2.audioContext = void 0;
			}
		},
		130992: ($0, $1, $2) => {
			var w = $0;
			var h = $1;
			var pixels = $2;
			if (!Module["SDL2"]) Module["SDL2"] = {};
			var SDL2 = Module["SDL2"];
			if (SDL2.ctxCanvas !== Module["canvas"]) {
				SDL2.ctx = Browser.createContext(Module["canvas"], false, true);
				SDL2.ctxCanvas = Module["canvas"];
			}
			if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) {
				SDL2.image = SDL2.ctx.createImageData(w, h);
				SDL2.w = w;
				SDL2.h = h;
				SDL2.imageCtx = SDL2.ctx;
			}
			var data = SDL2.image.data;
			var src = pixels / 4;
			var dst = 0;
			var num;
			if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
				num = data.length;
				while (dst < num) {
					var val = HEAP32[src];
					data[dst] = val & 255;
					data[dst + 1] = val >> 8 & 255;
					data[dst + 2] = val >> 16 & 255;
					data[dst + 3] = 255;
					src++;
					dst += 4;
				}
			} else {
				if (SDL2.data32Data !== data) {
					SDL2.data32 = new Int32Array(data.buffer);
					SDL2.data8 = new Uint8Array(data.buffer);
					SDL2.data32Data = data;
				}
				var data32 = SDL2.data32;
				num = data32.length;
				data32.set(HEAP32.subarray(src, src + num));
				var data8 = SDL2.data8;
				var i$1 = 3;
				var j = i$1 + 4 * num;
				if (num % 8 == 0) while (i$1 < j) {
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
				}
				else while (i$1 < j) {
					data8[i$1] = 255;
					i$1 = i$1 + 4 | 0;
				}
			}
			SDL2.ctx.putImageData(SDL2.image, 0, 0);
		},
		132458: ($0, $1, $2, $3, $4) => {
			var w = $0;
			var h = $1;
			var hot_x = $2;
			var hot_y = $3;
			var pixels = $4;
			var canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			var ctx = canvas.getContext("2d");
			var image = ctx.createImageData(w, h);
			var data = image.data;
			var src = pixels / 4;
			var dst = 0;
			var num;
			if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
				num = data.length;
				while (dst < num) {
					var val = HEAP32[src];
					data[dst] = val & 255;
					data[dst + 1] = val >> 8 & 255;
					data[dst + 2] = val >> 16 & 255;
					data[dst + 3] = val >> 24 & 255;
					src++;
					dst += 4;
				}
			} else {
				var data32 = new Int32Array(data.buffer);
				num = data32.length;
				data32.set(HEAP32.subarray(src, src + num));
			}
			ctx.putImageData(image, 0, 0);
			var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto";
			var urlBuf = _malloc(url.length + 1);
			stringToUTF8(url, urlBuf, url.length + 1);
			return urlBuf;
		},
		133446: ($0) => {
			if (Module["canvas"]) Module["canvas"].style["cursor"] = UTF8ToString($0);
		},
		133529: () => {
			if (Module["canvas"]) Module["canvas"].style["cursor"] = "none";
		},
		133598: () => window.innerWidth,
		133628: () => window.innerHeight
	}, _main, _malloc, _free, __emscripten_stack_restore, __emscripten_stack_alloc, _emscripten_stack_get_current, dynCall_v, dynCall_iiii, _asyncify_start_unwind, _asyncify_stop_unwind, _asyncify_start_rewind, _asyncify_stop_rewind, wasmMemory;
	function assignWasmExports(wasmExports$1) {
		_main = Module["_main"] = wasmExports$1["Wf"];
		_malloc = wasmExports$1["Xf"];
		_free = wasmExports$1["Yf"];
		Module["_injectVirtualKeyEvent"] = wasmExports$1["Zf"];
		Module["_injectVirtualTextInput"] = wasmExports$1["_f"];
		__emscripten_stack_restore = wasmExports$1["$f"];
		__emscripten_stack_alloc = wasmExports$1["ag"];
		_emscripten_stack_get_current = wasmExports$1["bg"];
		dynCall_v = dynCalls["v"] = wasmExports$1["cg"];
		dynCalls["ii"] = wasmExports$1["dg"];
		dynCalls["iii"] = wasmExports$1["eg"];
		dynCalls["viii"] = wasmExports$1["fg"];
		dynCalls["vi"] = wasmExports$1["gg"];
		dynCalls["vii"] = wasmExports$1["hg"];
		dynCall_iiii = dynCalls["iiii"] = wasmExports$1["ig"];
		dynCalls["iiiiii"] = wasmExports$1["jg"];
		dynCalls["viiii"] = wasmExports$1["kg"];
		dynCalls["viiiii"] = wasmExports$1["lg"];
		dynCalls["iiiii"] = wasmExports$1["mg"];
		dynCalls["iiiiiiii"] = wasmExports$1["ng"];
		dynCalls["iiiiiiiiii"] = wasmExports$1["og"];
		dynCalls["iiiiiiiiiiiiiiff"] = wasmExports$1["pg"];
		dynCalls["iiiiiiiii"] = wasmExports$1["qg"];
		dynCalls["viiiiiii"] = wasmExports$1["rg"];
		dynCalls["viiiiiiiiiii"] = wasmExports$1["sg"];
		dynCalls["iiiiiidiiff"] = wasmExports$1["tg"];
		dynCalls["ji"] = wasmExports$1["ug"];
		dynCalls["jiji"] = wasmExports$1["vg"];
		dynCalls["i"] = wasmExports$1["wg"];
		dynCalls["vffff"] = wasmExports$1["xg"];
		dynCalls["vf"] = wasmExports$1["yg"];
		dynCalls["viiiiiiii"] = wasmExports$1["zg"];
		dynCalls["viiiiiiiii"] = wasmExports$1["Ag"];
		dynCalls["vff"] = wasmExports$1["Bg"];
		dynCalls["vfi"] = wasmExports$1["Cg"];
		dynCalls["viif"] = wasmExports$1["Dg"];
		dynCalls["vif"] = wasmExports$1["Eg"];
		dynCalls["viff"] = wasmExports$1["Fg"];
		dynCalls["vifff"] = wasmExports$1["Gg"];
		dynCalls["viffff"] = wasmExports$1["Hg"];
		dynCalls["viiiiii"] = wasmExports$1["Ig"];
		dynCalls["vfff"] = wasmExports$1["Jg"];
		dynCalls["viiiiiiiiii"] = wasmExports$1["Kg"];
		dynCalls["viifi"] = wasmExports$1["Lg"];
		dynCalls["iidiiii"] = wasmExports$1["Mg"];
		dynCalls["viijii"] = wasmExports$1["Ng"];
		dynCalls["iiiiiii"] = wasmExports$1["Og"];
		dynCalls["iiiiij"] = wasmExports$1["Pg"];
		dynCalls["iiiiid"] = wasmExports$1["Qg"];
		dynCalls["iiiiijj"] = wasmExports$1["Rg"];
		dynCalls["iiiiiijj"] = wasmExports$1["Sg"];
		_asyncify_start_unwind = wasmExports$1["Tg"];
		_asyncify_stop_unwind = wasmExports$1["Ug"];
		_asyncify_start_rewind = wasmExports$1["Vg"];
		_asyncify_stop_rewind = wasmExports$1["Wg"];
		wasmMemory = wasmExports$1["Uf"];
		wasmExports$1["__indirect_function_table"];
	}
	var wasmImports = {
		a: ___assert_fail,
		d: ___cxa_throw,
		N: ___syscall_fcntl64,
		_a: ___syscall_ioctl,
		$a: ___syscall_openat,
		Ra: ___syscall_rmdir,
		Qa: ___syscall_stat64,
		Sa: ___syscall_unlinkat,
		Oa: __abort_js,
		J: __embind_register_bigint,
		Ma: __embind_register_bool,
		Ka: __embind_register_emval,
		I: __embind_register_float,
		e: __embind_register_integer,
		b: __embind_register_memory_view,
		La: __embind_register_std_string,
		k: __embind_register_std_wstring,
		Na: __embind_register_void,
		Ta: __localtime_js,
		Ua: __tzset_js,
		ab: _clock_time_get,
		Vd: _eglBindAPI,
		Ke: _eglChooseConfig,
		cc: _eglCreateContext,
		yc: _eglCreateWindowSurface,
		nc: _eglDestroyContext,
		Jc: _eglDestroySurface,
		Ve: _eglGetConfigAttrib,
		Q: _eglGetDisplay,
		Tb: _eglGetError,
		oe: _eglInitialize,
		Uc: _eglMakeCurrent,
		Ib: _eglQueryString,
		dd: _eglSwapBuffers,
		od: _eglSwapInterval,
		ze: _eglTerminate,
		Kd: _eglWaitGL,
		zd: _eglWaitNative,
		xa: _emscripten_asm_const_int,
		c: _emscripten_asm_const_int_sync_on_main_thread,
		mb: _emscripten_asm_const_ptr_sync_on_main_thread,
		Ja: _emscripten_cancel_main_loop,
		O: _emscripten_date_now,
		Fa: _emscripten_exit_fullscreen,
		Xa: _emscripten_exit_pointerlock,
		Ia: _emscripten_force_exit,
		i: _emscripten_get_device_pixel_ratio,
		g: _emscripten_get_element_css_size,
		T: _emscripten_get_gamepad_status,
		K: _emscripten_get_now,
		ca: _emscripten_get_num_gamepads,
		xb: _emscripten_get_screen_size,
		ka: _emscripten_glActiveTexture,
		ja: _emscripten_glAttachShader,
		bd: _emscripten_glBeginQuery,
		Ba: _emscripten_glBeginQueryEXT,
		Ec: _emscripten_glBeginTransformFeedback,
		ia: _emscripten_glBindAttribLocation,
		ha: _emscripten_glBindBuffer,
		Bc: _emscripten_glBindBufferBase,
		Cc: _emscripten_glBindBufferRange,
		ga: _emscripten_glBindFramebuffer,
		fa: _emscripten_glBindRenderbuffer,
		Eb: _emscripten_glBindSampler,
		ea: _emscripten_glBindTexture,
		vb: _emscripten_glBindTransformFeedback,
		Kc: _emscripten_glBindVertexArray,
		sa: _emscripten_glBindVertexArrayOES,
		da: _emscripten_glBlendColor,
		ba: _emscripten_glBlendEquation,
		aa: _emscripten_glBlendEquationSeparate,
		$: _emscripten_glBlendFunc,
		_: _emscripten_glBlendFuncSeparate,
		Pc: _emscripten_glBlitFramebuffer,
		Z: _emscripten_glBufferData,
		Y: _emscripten_glBufferSubData,
		X: _emscripten_glCheckFramebufferStatus,
		W: _emscripten_glClear,
		bc: _emscripten_glClearBufferfi,
		dc: _emscripten_glClearBufferfv,
		fc: _emscripten_glClearBufferiv,
		ec: _emscripten_glClearBufferuiv,
		V: _emscripten_glClearColor,
		U: _emscripten_glClearDepthf,
		Sf: _emscripten_glClearStencil,
		Ob: _emscripten_glClientWaitSync,
		td: _emscripten_glClipControlEXT,
		Rf: _emscripten_glColorMask,
		Qf: _emscripten_glCompileShader,
		Pf: _emscripten_glCompressedTexImage2D,
		hd: _emscripten_glCompressedTexImage3D,
		Of: _emscripten_glCompressedTexSubImage2D,
		gd: _emscripten_glCompressedTexSubImage3D,
		$b: _emscripten_glCopyBufferSubData,
		Nf: _emscripten_glCopyTexImage2D,
		Mf: _emscripten_glCopyTexSubImage2D,
		id: _emscripten_glCopyTexSubImage3D,
		Lf: _emscripten_glCreateProgram,
		Kf: _emscripten_glCreateShader,
		Jf: _emscripten_glCullFace,
		If: _emscripten_glDeleteBuffers,
		Hf: _emscripten_glDeleteFramebuffers,
		Gf: _emscripten_glDeleteProgram,
		ed: _emscripten_glDeleteQueries,
		Da: _emscripten_glDeleteQueriesEXT,
		Ff: _emscripten_glDeleteRenderbuffers,
		Gb: _emscripten_glDeleteSamplers,
		Ef: _emscripten_glDeleteShader,
		Pb: _emscripten_glDeleteSync,
		Df: _emscripten_glDeleteTextures,
		ub: _emscripten_glDeleteTransformFeedbacks,
		Ic: _emscripten_glDeleteVertexArrays,
		ra: _emscripten_glDeleteVertexArraysOES,
		Cf: _emscripten_glDepthFunc,
		Bf: _emscripten_glDepthMask,
		Af: _emscripten_glDepthRangef,
		zf: _emscripten_glDetachShader,
		yf: _emscripten_glDisable,
		xf: _emscripten_glDisableVertexAttribArray,
		wf: _emscripten_glDrawArrays,
		Ub: _emscripten_glDrawArraysInstanced,
		na: _emscripten_glDrawArraysInstancedANGLE,
		db: _emscripten_glDrawArraysInstancedARB,
		qd: _emscripten_glDrawArraysInstancedEXT,
		eb: _emscripten_glDrawArraysInstancedNV,
		Xc: _emscripten_glDrawBuffers,
		nd: _emscripten_glDrawBuffersEXT,
		oa: _emscripten_glDrawBuffersWEBGL,
		vf: _emscripten_glDrawElements,
		Sb: _emscripten_glDrawElementsInstanced,
		ma: _emscripten_glDrawElementsInstancedANGLE,
		bb: _emscripten_glDrawElementsInstancedARB,
		cb: _emscripten_glDrawElementsInstancedEXT,
		pd: _emscripten_glDrawElementsInstancedNV,
		ld: _emscripten_glDrawRangeElements,
		uf: _emscripten_glEnable,
		tf: _emscripten_glEnableVertexAttribArray,
		ad: _emscripten_glEndQuery,
		Aa: _emscripten_glEndQueryEXT,
		Dc: _emscripten_glEndTransformFeedback,
		Rb: _emscripten_glFenceSync,
		sf: _emscripten_glFinish,
		rf: _emscripten_glFlush,
		Lc: _emscripten_glFlushMappedBufferRange,
		qf: _emscripten_glFramebufferRenderbuffer,
		pf: _emscripten_glFramebufferTexture2D,
		Nc: _emscripten_glFramebufferTextureLayer,
		of: _emscripten_glFrontFace,
		nf: _emscripten_glGenBuffers,
		lf: _emscripten_glGenFramebuffers,
		fd: _emscripten_glGenQueries,
		Ea: _emscripten_glGenQueriesEXT,
		kf: _emscripten_glGenRenderbuffers,
		Hb: _emscripten_glGenSamplers,
		jf: _emscripten_glGenTextures,
		tb: _emscripten_glGenTransformFeedbacks,
		Hc: _emscripten_glGenVertexArrays,
		qa: _emscripten_glGenVertexArraysOES,
		mf: _emscripten_glGenerateMipmap,
		hf: _emscripten_glGetActiveAttrib,
		gf: _emscripten_glGetActiveUniform,
		Wb: _emscripten_glGetActiveUniformBlockName,
		Xb: _emscripten_glGetActiveUniformBlockiv,
		Zb: _emscripten_glGetActiveUniformsiv,
		ff: _emscripten_glGetAttachedShaders,
		ef: _emscripten_glGetAttribLocation,
		df: _emscripten_glGetBooleanv,
		Jb: _emscripten_glGetBufferParameteri64v,
		cf: _emscripten_glGetBufferParameteriv,
		Yc: _emscripten_glGetBufferPointerv,
		bf: _emscripten_glGetError,
		af: _emscripten_glGetFloatv,
		pc: _emscripten_glGetFragDataLocation,
		$e: _emscripten_glGetFramebufferAttachmentParameteriv,
		Kb: _emscripten_glGetInteger64i_v,
		Mb: _emscripten_glGetInteger64v,
		Fc: _emscripten_glGetIntegeri_v,
		_e: _emscripten_glGetIntegerv,
		hb: _emscripten_glGetInternalformativ,
		pb: _emscripten_glGetProgramBinary,
		Ye: _emscripten_glGetProgramInfoLog,
		Ze: _emscripten_glGetProgramiv,
		ua: _emscripten_glGetQueryObjecti64vEXT,
		wa: _emscripten_glGetQueryObjectivEXT,
		ta: _emscripten_glGetQueryObjectui64vEXT,
		_c: _emscripten_glGetQueryObjectuiv,
		va: _emscripten_glGetQueryObjectuivEXT,
		$c: _emscripten_glGetQueryiv,
		ya: _emscripten_glGetQueryivEXT,
		Xe: _emscripten_glGetRenderbufferParameteriv,
		yb: _emscripten_glGetSamplerParameterfv,
		zb: _emscripten_glGetSamplerParameteriv,
		Ue: _emscripten_glGetShaderInfoLog,
		Te: _emscripten_glGetShaderPrecisionFormat,
		Se: _emscripten_glGetShaderSource,
		We: _emscripten_glGetShaderiv,
		Re: _emscripten_glGetString,
		ac: _emscripten_glGetStringi,
		Lb: _emscripten_glGetSynciv,
		Qe: _emscripten_glGetTexParameterfv,
		Pe: _emscripten_glGetTexParameteriv,
		zc: _emscripten_glGetTransformFeedbackVarying,
		Yb: _emscripten_glGetUniformBlockIndex,
		_b: _emscripten_glGetUniformIndices,
		Me: _emscripten_glGetUniformLocation,
		Oe: _emscripten_glGetUniformfv,
		Ne: _emscripten_glGetUniformiv,
		qc: _emscripten_glGetUniformuiv,
		wc: _emscripten_glGetVertexAttribIiv,
		vc: _emscripten_glGetVertexAttribIuiv,
		Ie: _emscripten_glGetVertexAttribPointerv,
		Le: _emscripten_glGetVertexAttribfv,
		Je: _emscripten_glGetVertexAttribiv,
		He: _emscripten_glHint,
		lb: _emscripten_glInvalidateFramebuffer,
		kb: _emscripten_glInvalidateSubFramebuffer,
		Ge: _emscripten_glIsBuffer,
		Fe: _emscripten_glIsEnabled,
		Ee: _emscripten_glIsFramebuffer,
		De: _emscripten_glIsProgram,
		cd: _emscripten_glIsQuery,
		Ca: _emscripten_glIsQueryEXT,
		Ce: _emscripten_glIsRenderbuffer,
		Fb: _emscripten_glIsSampler,
		Be: _emscripten_glIsShader,
		Qb: _emscripten_glIsSync,
		Ae: _emscripten_glIsTexture,
		sb: _emscripten_glIsTransformFeedback,
		Gc: _emscripten_glIsVertexArray,
		pa: _emscripten_glIsVertexArrayOES,
		ye: _emscripten_glLineWidth,
		xe: _emscripten_glLinkProgram,
		Mc: _emscripten_glMapBufferRange,
		rb: _emscripten_glPauseTransformFeedback,
		we: _emscripten_glPixelStorei,
		sd: _emscripten_glPolygonModeWEBGL,
		ve: _emscripten_glPolygonOffset,
		ud: _emscripten_glPolygonOffsetClampEXT,
		ob: _emscripten_glProgramBinary,
		nb: _emscripten_glProgramParameteri,
		za: _emscripten_glQueryCounterEXT,
		md: _emscripten_glReadBuffer,
		ue: _emscripten_glReadPixels,
		te: _emscripten_glReleaseShaderCompiler,
		se: _emscripten_glRenderbufferStorage,
		Oc: _emscripten_glRenderbufferStorageMultisample,
		qb: _emscripten_glResumeTransformFeedback,
		re: _emscripten_glSampleCoverage,
		Bb: _emscripten_glSamplerParameterf,
		Ab: _emscripten_glSamplerParameterfv,
		Db: _emscripten_glSamplerParameteri,
		Cb: _emscripten_glSamplerParameteriv,
		qe: _emscripten_glScissor,
		pe: _emscripten_glShaderBinary,
		ne: _emscripten_glShaderSource,
		me: _emscripten_glStencilFunc,
		le: _emscripten_glStencilFuncSeparate,
		ke: _emscripten_glStencilMask,
		je: _emscripten_glStencilMaskSeparate,
		ie: _emscripten_glStencilOp,
		he: _emscripten_glStencilOpSeparate,
		ge: _emscripten_glTexImage2D,
		kd: _emscripten_glTexImage3D,
		fe: _emscripten_glTexParameterf,
		ee: _emscripten_glTexParameterfv,
		de: _emscripten_glTexParameteri,
		ce: _emscripten_glTexParameteriv,
		jb: _emscripten_glTexStorage2D,
		ib: _emscripten_glTexStorage3D,
		be: _emscripten_glTexSubImage2D,
		jd: _emscripten_glTexSubImage3D,
		Ac: _emscripten_glTransformFeedbackVaryings,
		ae: _emscripten_glUniform1f,
		$d: _emscripten_glUniform1fv,
		_d: _emscripten_glUniform1i,
		Zd: _emscripten_glUniform1iv,
		oc: _emscripten_glUniform1ui,
		jc: _emscripten_glUniform1uiv,
		Yd: _emscripten_glUniform2f,
		Xd: _emscripten_glUniform2fv,
		Wd: _emscripten_glUniform2i,
		Ud: _emscripten_glUniform2iv,
		mc: _emscripten_glUniform2ui,
		ic: _emscripten_glUniform2uiv,
		Td: _emscripten_glUniform3f,
		Sd: _emscripten_glUniform3fv,
		Rd: _emscripten_glUniform3i,
		Qd: _emscripten_glUniform3iv,
		lc: _emscripten_glUniform3ui,
		hc: _emscripten_glUniform3uiv,
		Pd: _emscripten_glUniform4f,
		Od: _emscripten_glUniform4fv,
		Nd: _emscripten_glUniform4i,
		Md: _emscripten_glUniform4iv,
		kc: _emscripten_glUniform4ui,
		gc: _emscripten_glUniform4uiv,
		Vb: _emscripten_glUniformBlockBinding,
		Ld: _emscripten_glUniformMatrix2fv,
		Wc: _emscripten_glUniformMatrix2x3fv,
		Tc: _emscripten_glUniformMatrix2x4fv,
		Jd: _emscripten_glUniformMatrix3fv,
		Vc: _emscripten_glUniformMatrix3x2fv,
		Rc: _emscripten_glUniformMatrix3x4fv,
		Id: _emscripten_glUniformMatrix4fv,
		Sc: _emscripten_glUniformMatrix4x2fv,
		Qc: _emscripten_glUniformMatrix4x3fv,
		Zc: _emscripten_glUnmapBuffer,
		Hd: _emscripten_glUseProgram,
		Gd: _emscripten_glValidateProgram,
		Fd: _emscripten_glVertexAttrib1f,
		Ed: _emscripten_glVertexAttrib1fv,
		Dd: _emscripten_glVertexAttrib2f,
		Cd: _emscripten_glVertexAttrib2fv,
		Bd: _emscripten_glVertexAttrib3f,
		Ad: _emscripten_glVertexAttrib3fv,
		yd: _emscripten_glVertexAttrib4f,
		xd: _emscripten_glVertexAttrib4fv,
		wb: _emscripten_glVertexAttribDivisor,
		la: _emscripten_glVertexAttribDivisorANGLE,
		fb: _emscripten_glVertexAttribDivisorARB,
		rd: _emscripten_glVertexAttribDivisorEXT,
		gb: _emscripten_glVertexAttribDivisorNV,
		uc: _emscripten_glVertexAttribI4i,
		sc: _emscripten_glVertexAttribI4iv,
		tc: _emscripten_glVertexAttribI4ui,
		rc: _emscripten_glVertexAttribI4uiv,
		xc: _emscripten_glVertexAttribIPointer,
		wd: _emscripten_glVertexAttribPointer,
		vd: _emscripten_glViewport,
		Nb: _emscripten_glWaitSync,
		m: _emscripten_has_asyncify,
		Ga: _emscripten_request_fullscreen_strategy,
		P: _emscripten_request_pointerlock,
		Pa: _emscripten_resize_heap,
		n: _emscripten_sample_gamepad_data,
		o: _emscripten_set_beforeunload_callback_on_thread,
		A: _emscripten_set_blur_callback_on_thread,
		h: _emscripten_set_canvas_element_size,
		j: _emscripten_set_element_css_size,
		B: _emscripten_set_focus_callback_on_thread,
		r: _emscripten_set_fullscreenchange_callback_on_thread,
		S: _emscripten_set_gamepadconnected_callback_on_thread,
		R: _emscripten_set_gamepaddisconnected_callback_on_thread,
		u: _emscripten_set_keydown_callback_on_thread,
		s: _emscripten_set_keypress_callback_on_thread,
		t: _emscripten_set_keyup_callback_on_thread,
		Tf: _emscripten_set_main_loop,
		G: _emscripten_set_mousedown_callback_on_thread,
		E: _emscripten_set_mouseenter_callback_on_thread,
		D: _emscripten_set_mouseleave_callback_on_thread,
		H: _emscripten_set_mousemove_callback_on_thread,
		F: _emscripten_set_mouseup_callback_on_thread,
		v: _emscripten_set_pointerlockchange_callback_on_thread,
		q: _emscripten_set_resize_callback_on_thread,
		w: _emscripten_set_touchcancel_callback_on_thread,
		y: _emscripten_set_touchend_callback_on_thread,
		x: _emscripten_set_touchmove_callback_on_thread,
		z: _emscripten_set_touchstart_callback_on_thread,
		p: _emscripten_set_visibilitychange_callback_on_thread,
		C: _emscripten_set_wheel_callback_on_thread,
		Ha: _emscripten_set_window_title,
		l: _emscripten_sleep,
		Wa: _environ_get,
		Ya: _environ_sizes_get,
		f: _exit,
		L: _fd_close,
		Za: _fd_read,
		Va: _fd_seek,
		M: _fd_write
	};
	function callMain(args = []) {
		var entryFunction = _main;
		args.unshift(thisProgram);
		var argc = args.length;
		var argv = stackAlloc((argc + 1) * 4);
		var argv_ptr = argv;
		args.forEach((arg) => {
			HEAPU32[argv_ptr >> 2] = stringToUTF8OnStack(arg);
			argv_ptr += 4;
		});
		HEAPU32[argv_ptr >> 2] = 0;
		try {
			var ret = entryFunction(argc, argv);
			exitJS(ret, true);
			return ret;
		} catch (e) {
			return handleException(e);
		}
	}
	function run(args = arguments_) {
		if (runDependencies > 0) {
			dependenciesFulfilled = run;
			return;
		}
		preRun();
		if (runDependencies > 0) {
			dependenciesFulfilled = run;
			return;
		}
		function doRun() {
			Module["calledRun"] = true;
			if (ABORT) return;
			initRuntime();
			preMain();
			readyPromiseResolve?.(Module);
			Module["onRuntimeInitialized"]?.();
			if (!(Module["noInitialRun"] || true));
			postRun();
		}
		if (Module["setStatus"]) {
			Module["setStatus"]("Running...");
			setTimeout(() => {
				setTimeout(() => Module["setStatus"](""), 1);
				doRun();
			}, 1);
		} else doRun();
	}
	var wasmExports = await createWasm();
	run();
	if (runtimeInitialized) moduleRtn = Module;
	else moduleRtn = new Promise((resolve, reject) => {
		readyPromiseResolve = resolve;
		readyPromiseReject = reject;
	});
	return moduleRtn;
}
var wqxsim_default = WqxsimModule;
var _hoisted_1$2 = [
	"onMousedown",
	"onMouseup",
	"onTouchstart",
	"onTouchend"
];
var _hoisted_2$2 = { class: "key-label" };
var _hoisted_3$2 = {
	key: 0,
	class: "key-subscript"
};
var _hoisted_4$2 = {
	key: 1,
	class: "key-superscript"
};
var _hoisted_5$2 = {
	key: 1,
	class: "empty-key"
};
var VirtualKeyboard_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "VirtualKeyboard",
	props: { wasmInstance: {
		type: Object,
		default: () => {}
	} },
	setup(__props) {
		const props = __props;
		const keyboardRef = ref(null);
		const SDLKeycodes = {
			SDLK_F1: 1073741882,
			SDLK_F2: 1073741883,
			SDLK_F3: 1073741884,
			SDLK_F4: 1073741885,
			SDLK_F5: 1073741886,
			SDLK_F6: 1073741887,
			SDLK_F7: 1073741888,
			SDLK_F8: 1073741889,
			SDLK_F9: 1073741890,
			SDLK_F10: 1073741891,
			SDLK_F11: 1073741892,
			SDLK_F12: 1073741893,
			SDLK_ESCAPE: 27,
			SDLK_1: 49,
			SDLK_2: 50,
			SDLK_3: 51,
			SDLK_4: 52,
			SDLK_5: 53,
			SDLK_6: 54,
			SDLK_7: 55,
			SDLK_8: 56,
			SDLK_9: 57,
			SDLK_0: 48,
			SDLK_MINUS: 45,
			SDLK_EQUALS: 61,
			SDLK_BACKSPACE: 8,
			SDLK_TAB: 9,
			SDLK_q: 113,
			SDLK_w: 119,
			SDLK_e: 101,
			SDLK_r: 114,
			SDLK_t: 116,
			SDLK_y: 121,
			SDLK_u: 117,
			SDLK_i: 105,
			SDLK_o: 111,
			SDLK_p: 112,
			SDLK_LEFTBRACKET: 91,
			SDLK_RIGHTBRACKET: 93,
			SDLK_RETURN: 13,
			SDLK_a: 97,
			SDLK_s: 115,
			SDLK_d: 100,
			SDLK_f: 102,
			SDLK_g: 103,
			SDLK_h: 104,
			SDLK_j: 106,
			SDLK_k: 107,
			SDLK_l: 108,
			SDLK_SEMICOLON: 59,
			SDLK_QUOTE: 39,
			SDLK_BACKSLASH: 92,
			SDLK_z: 122,
			SDLK_x: 120,
			SDLK_c: 99,
			SDLK_v: 118,
			SDLK_b: 98,
			SDLK_n: 110,
			SDLK_m: 109,
			SDLK_COMMA: 44,
			SDLK_PERIOD: 46,
			SDLK_SLASH: 47,
			SDLK_SPACE: 32,
			SDLK_UP: 1073741906,
			SDLK_DOWN: 1073741905,
			SDLK_LEFT: 1073741904,
			SDLK_RIGHT: 1073741903,
			SDLK_LSHIFT: 256,
			SDLK_RSHIFT: 257
		};
		const emptyKey = {
			label: "",
			subscript: "",
			superscript: "",
			sdlKeys: [],
			classes: ["empty-key"]
		};
		const keyMatrix = [
			[
				{
					label: "ON/OFF",
					subscript: "",
					superscript: "",
					sdlKeys: ["SDLK_F12"]
				},
				emptyKey,
				emptyKey,
				emptyKey,
				emptyKey,
				emptyKey,
				{
					label: "F1",
					subscript: "",
					superscript: "插入",
					sdlKeys: ["SDLK_F1"]
				},
				{
					label: "F2",
					subscript: "",
					superscript: "删除",
					sdlKeys: ["SDLK_F2"]
				},
				{
					label: "F3",
					subscript: "",
					superscript: "查找",
					sdlKeys: ["SDLK_F3"]
				},
				{
					label: "F4",
					subscript: "",
					superscript: "修改",
					sdlKeys: ["SDLK_F4"]
				}
			],
			[
				{
					label: "发音",
					subscript: "",
					superscript: "",
					sdlKeys: ["SDLK_SEMICOLON"],
					classes: ["fun-key"]
				},
				{
					label: "报时",
					subscript: "",
					superscript: "",
					sdlKeys: ["SDLK_QUOTE"],
					classes: ["fun-key"]
				},
				emptyKey,
				{
					label: "英汉",
					subscript: "",
					superscript: "汉英",
					sdlKeys: ["SDLK_F5"],
					classes: ["fun-key"]
				},
				{
					label: "名片",
					subscript: "",
					superscript: "通讯",
					sdlKeys: ["SDLK_F6"],
					classes: ["fun-key"]
				},
				{
					label: "计算",
					subscript: "",
					superscript: "换算",
					sdlKeys: ["SDLK_F7"],
					classes: ["fun-key"]
				},
				{
					label: "行程",
					subscript: "",
					superscript: "记事",
					sdlKeys: ["SDLK_F8"],
					classes: ["fun-key"]
				},
				{
					label: "资料",
					subscript: "",
					superscript: "游戏",
					sdlKeys: ["SDLK_F9"],
					classes: ["fun-key"]
				},
				{
					label: "时间",
					subscript: "",
					superscript: "其他",
					sdlKeys: ["SDLK_F10"],
					classes: ["fun-key"]
				},
				{
					label: "网络",
					subscript: "",
					superscript: "",
					sdlKeys: ["SDLK_F11"],
					classes: ["fun-key"]
				}
			],
			[
				{
					label: "Q",
					subscript: "sin",
					superscript: "sin-1",
					sdlKeys: ["SDLK_q"]
				},
				{
					label: "W",
					subscript: "cos",
					superscript: "cos-1",
					sdlKeys: ["SDLK_w"]
				},
				{
					label: "E",
					subscript: "tan",
					superscript: "tan-1",
					sdlKeys: ["SDLK_e"]
				},
				{
					label: "R",
					subscript: "1/X",
					superscript: "hyp",
					sdlKeys: ["SDLK_r"]
				},
				{
					label: "T",
					subscript: "7",
					superscript: "",
					sdlKeys: ["SDLK_t", "SDLK_7"],
					classes: ["num-key"]
				},
				{
					label: "Y",
					subscript: "8",
					superscript: "",
					sdlKeys: ["SDLK_y", "SDLK_8"],
					classes: ["num-key"]
				},
				{
					label: "U",
					subscript: "9",
					superscript: "",
					sdlKeys: ["SDLK_u", "SDLK_9"],
					classes: ["num-key"]
				},
				{
					label: "I",
					subscript: "%",
					superscript: "",
					sdlKeys: ["SDLK_i"]
				},
				{
					label: "O",
					subscript: "÷",
					superscript: "#",
					sdlKeys: ["SDLK_o"]
				},
				{
					label: "P",
					subscript: "MC",
					superscript: "☎",
					sdlKeys: ["SDLK_p"]
				}
			],
			[
				{
					label: "A",
					subscript: "log",
					superscript: "10x",
					sdlKeys: ["SDLK_a"]
				},
				{
					label: "S",
					subscript: "ln",
					superscript: "ex",
					sdlKeys: ["SDLK_s"]
				},
				{
					label: "D",
					subscript: "Xʸ",
					superscript: "y√x",
					sdlKeys: ["SDLK_d"]
				},
				{
					label: "F",
					subscript: "√",
					superscript: "X²",
					sdlKeys: ["SDLK_f"]
				},
				{
					label: "G",
					subscript: "4",
					superscript: "",
					sdlKeys: ["SDLK_g", "SDLK_4"],
					classes: ["num-key"]
				},
				{
					label: "H",
					subscript: "5",
					superscript: "",
					sdlKeys: ["SDLK_h", "SDLK_5"],
					classes: ["num-key"]
				},
				{
					label: "J",
					subscript: "6",
					superscript: "",
					sdlKeys: ["SDLK_j", "SDLK_6"],
					classes: ["num-key"]
				},
				{
					label: "K",
					subscript: "±",
					superscript: "",
					sdlKeys: ["SDLK_k"]
				},
				{
					label: "L",
					subscript: "x",
					superscript: "*",
					sdlKeys: ["SDLK_l"]
				},
				{
					label: "输入",
					subscript: "MR",
					superscript: "",
					sdlKeys: ["SDLK_RETURN"],
					classes: ["enter-key"]
				}
			],
			[
				{
					label: "Z",
					subscript: "(",
					superscript: ")",
					sdlKeys: ["SDLK_z"]
				},
				{
					label: "X",
					subscript: "π",
					superscript: "X!",
					sdlKeys: ["SDLK_x"]
				},
				{
					label: "C",
					subscript: "EXP",
					superscript: "。'\"",
					sdlKeys: ["SDLK_c"]
				},
				{
					label: "V",
					subscript: "C",
					superscript: "",
					sdlKeys: ["SDLK_v"]
				},
				{
					label: "B",
					subscript: "1",
					superscript: "",
					sdlKeys: ["SDLK_b", "SDLK_1"],
					classes: ["num-key"]
				},
				{
					label: "N",
					subscript: "2",
					superscript: "",
					sdlKeys: ["SDLK_n", "SDLK_2"],
					classes: ["num-key"]
				},
				{
					label: "M",
					subscript: "3",
					superscript: "",
					sdlKeys: ["SDLK_m", "SDLK_3"],
					classes: ["num-key"]
				},
				{
					label: "↟",
					subscript: "税",
					superscript: "",
					sdlKeys: ["SDLK_COMMA"]
				},
				{
					label: "▲",
					subscript: "-",
					superscript: "",
					sdlKeys: ["SDLK_UP"]
				},
				{
					label: "↡",
					subscript: "M-",
					superscript: "",
					sdlKeys: ["SDLK_SLASH"]
				}
			],
			[
				{
					label: "求助",
					subscript: "",
					superscript: "",
					sdlKeys: ["SDLK_LEFTBRACKET"],
					classes: ["fun-key"]
				},
				{
					label: "中英数",
					subscript: "",
					superscript: "SHIFT",
					sdlKeys: ["SDLK_RIGHTBRACKET"]
				},
				{
					label: "输入法",
					subscript: "",
					superscript: "反查 CAPS",
					sdlKeys: ["SDLK_BACKSLASH"]
				},
				{
					label: "跳出",
					subscript: "AC",
					superscript: "",
					sdlKeys: ["SDLK_ESCAPE"]
				},
				{
					label: "符号",
					subscript: "0",
					superscript: "继续",
					sdlKeys: ["SDLK_0"],
					classes: ["num-key", "num-key-0"]
				},
				{
					label: ".",
					subscript: ".",
					superscript: "-",
					sdlKeys: ["SDLK_PERIOD"]
				},
				{
					label: "空格",
					subscript: "=",
					superscript: "✓",
					sdlKeys: ["SDLK_EQUALS", "SDLK_SPACE"]
				},
				{
					label: "◀",
					subscript: "",
					superscript: "",
					sdlKeys: ["SDLK_LEFT"]
				},
				{
					label: "▼",
					subscript: "+",
					superscript: "",
					sdlKeys: ["SDLK_DOWN"]
				},
				{
					label: "▶",
					subscript: "M+",
					superscript: "",
					sdlKeys: ["SDLK_RIGHT"]
				}
			]
		];
		function simulateSDLKeyEvent(sdlKeyNames, keyDown) {
			console.log("simulateSDLKeyEvent", sdlKeyNames, keyDown);
			if (!props.wasmInstance) {
				console.log("Module not ready yet");
				return;
			}
			let injectKeyFunction = null;
			try {
				injectKeyFunction = props.wasmInstance.cwrap("injectVirtualKeyEvent", null, ["number", "number"]);
			} catch (e) {
				console.log("Could not wrap injectVirtualKeyEvent function:", e);
				if (typeof props.wasmInstance._injectVirtualKeyEvent === "function") injectKeyFunction = (key, down) => props.wasmInstance._injectVirtualKeyEvent(key, down);
			}
			if (!injectKeyFunction) {
				console.log("SDL key simulation not ready yet - function not found");
				return;
			}
			sdlKeyNames.forEach((keyName$1) => {
				const sdlKeyCode$1 = SDLKeycodes[keyName$1];
				if (sdlKeyCode$1 !== void 0) injectKeyFunction(sdlKeyCode$1, keyDown ? 1 : 0);
				else console.warn(`Unknown SDL key: ${keyName$1}`);
			});
			const keyName = sdlKeyNames[0];
			if (!keyName) {
				console.warn(`Unknown SDL key: ${keyName}`);
				return;
			}
			const sdlKeyCode = SDLKeycodes[keyName];
			if (sdlKeyCode !== void 0) injectKeyFunction(sdlKeyCode, keyDown ? 1 : 0);
			else console.warn(`Unknown SDL key: ${keyName}`);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "keyboardRef",
				ref: keyboardRef,
				class: "virtual-keyboard"
			}, [(openBlock(), createElementBlock(Fragment, null, renderList(keyMatrix, (row, index) => {
				return createBaseVNode("div", {
					key: index,
					class: "keyboard-row"
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(row, (key) => {
					return openBlock(), createElementBlock(Fragment, { key: key.label }, [key.label ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass(["virtual-key", key.classes]),
						onMousedown: ($event) => simulateSDLKeyEvent(key.sdlKeys, true),
						onMouseup: ($event) => simulateSDLKeyEvent(key.sdlKeys, false),
						onTouchstart: ($event) => simulateSDLKeyEvent(key.sdlKeys, true),
						onTouchend: ($event) => simulateSDLKeyEvent(key.sdlKeys, false)
					}, [
						createBaseVNode("span", _hoisted_2$2, toDisplayString(key.label), 1),
						key.subscript ? (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString(key.subscript), 1)) : createCommentVNode("", true),
						key.superscript ? (openBlock(), createElementBlock("span", _hoisted_4$2, toDisplayString(key.superscript), 1)) : createCommentVNode("", true)
					], 42, _hoisted_1$2)) : (openBlock(), createElementBlock("div", _hoisted_5$2))], 64);
				}), 128))]);
			}), 64))], 512);
		};
	}
});
var __plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
var VirtualKeyboard_default = /* @__PURE__ */ __plugin_vue_export_helper_default(VirtualKeyboard_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fa4a3da2"]]);
var _hoisted_1$1 = { class: "file-manager" };
var _hoisted_2$1 = { class: "path-navigator" };
var _hoisted_3$1 = ["onClick"];
var _hoisted_4$1 = { class: "toolbar" };
var _hoisted_5$1 = { class: "file-list-container" };
var _hoisted_6$1 = { class: "file-list" };
var _hoisted_7$1 = { key: 0 };
var _hoisted_8$1 = ["onClick"];
var _hoisted_9$1 = ["onClick"];
var _hoisted_10$1 = ["onClick"];
var _hoisted_11$1 = ["onClick"];
var _hoisted_12$1 = ["onClick"];
var _hoisted_13$1 = ["onClick"];
var _hoisted_14$1 = ["onClick"];
var _hoisted_15$1 = {
	key: 0,
	class: "empty-message"
};
var _hoisted_16$1 = {
	key: 0,
	class: "status-text"
};
var _hoisted_17$1 = { class: "move-dialog-content" };
var _hoisted_18$1 = { class: "path-navigator" };
var _hoisted_19 = ["onClick"];
var _hoisted_20 = { class: "move-directories" };
var _hoisted_21 = ["onClick"];
var FileManager_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "FileManager",
	props: { wasmInstance: {
		type: Object,
		default: () => null
	} },
	setup(__props) {
		const props = __props;
		const currentPath = ref("/");
		const files = ref([]);
		const directories = ref([]);
		const statusMessage = ref("");
		const showRenameDialog = ref(false);
		const showCreateDirDialog = ref(false);
		const showMoveDialog = ref(false);
		const renamingItem = ref(null);
		const movingItem = ref(null);
		const newName = ref("");
		const newDirName = ref("");
		const movePath = ref("/");
		const moveDirectories = ref([]);
		const fileInput = ref(null);
		const renameInput = ref(null);
		const newDirInput = ref(null);
		const currentPathSegments = computed(() => {
			if (currentPath.value === "/") return [];
			return currentPath.value.split("/").filter(Boolean);
		});
		const movePathSegments = computed(() => {
			if (movePath.value === "/") return [];
			return movePath.value.split("/").filter(Boolean);
		});
		function buildPath(segments, length) {
			if (length === 0) return "/";
			return "/" + segments.slice(0, length).join("/");
		}
		function loadCurrentDirectory() {
			if (!props.wasmInstance) {
				statusMessage.value = "WASM实例未初始化，无法访问文件系统";
				return;
			}
			const FS = props.wasmInstance.FS;
			files.value = [];
			directories.value = [];
			statusMessage.value = "";
			try {
				try {
					const stat = FS.stat(currentPath.value);
					if (!FS.isDir(stat.mode)) {
						statusMessage.value = "当前路径不是目录";
						return;
					}
				} catch (e) {
					statusMessage.value = `无法访问目录 ${currentPath.value}: ${e.message}`;
					return;
				}
				const entries = FS.readdir(currentPath.value);
				for (const entry of entries) {
					if (entry === "." || entry === "..") continue;
					const fullPath = currentPath.value === "/" ? `/${entry}` : `${currentPath.value}/${entry}`;
					try {
						const stat = FS.stat(fullPath);
						if (FS.isFile(stat.mode)) files.value.push({
							path: fullPath,
							name: entry,
							size: stat.size,
							isDirectory: false
						});
						else if (FS.isDir(stat.mode)) directories.value.push({
							path: fullPath,
							name: entry,
							isDirectory: true
						});
					} catch (e) {
						if (e.errno !== 63 && e.errno !== 44) console.warn(`无法访问 ${fullPath}:`, e);
					}
				}
				directories.value.sort((a, b) => a.name.localeCompare(b.name));
				files.value.sort((a, b) => a.name.localeCompare(b.name));
			} catch (e) {
				console.error("加载目录内容时出错:", e);
				statusMessage.value = `加载目录失败: ${e.message}`;
			}
		}
		function refreshCurrentDirectory() {
			loadCurrentDirectory();
		}
		function navigateTo(path) {
			if (path.startsWith("/proc") || path.startsWith("/dev")) {
				statusMessage.value = "无法访问系统目录";
				return;
			}
			currentPath.value = path;
			loadCurrentDirectory();
		}
		function navigateUp() {
			if (currentPath.value === "/") return;
			const parentPath = currentPath.value.split("/").slice(0, -1).join("/") || "/";
			navigateTo(parentPath);
		}
		function formatFileSize(bytes) {
			if (bytes === 0) return "0 B";
			const k = 1024;
			const sizes = [
				"B",
				"KB",
				"MB",
				"GB"
			];
			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
		}
		function downloadFile(file) {
			if (!props.wasmInstance) {
				statusMessage.value = "WASM实例未初始化，请稍后再试";
				return;
			}
			try {
				const data = props.wasmInstance.FS.readFile(file.path);
				const blob = new Blob([data], { type: "application/octet-stream" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = file.name;
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					document.body.removeChild(a);
					URL.revokeObjectURL(url);
				}, 100);
				statusMessage.value = `已下载文件: ${file.name}`;
				setTimeout(() => statusMessage.value = "", 3e3);
			} catch (e) {
				console.error("下载文件时出错:", e);
				statusMessage.value = `下载文件失败: ${e.message}`;
			}
		}
		function triggerFileUpload() {
			fileInput.value?.click();
		}
		async function handleFileUpload(event$1) {
			const target = event$1.target;
			if (target.files && target.files.length > 0) {
				await uploadFilesToCurrentDirectory(target.files);
				target.value = "";
			}
		}
		async function uploadFilesToCurrentDirectory(filesToUpload) {
			if (!props.wasmInstance) {
				statusMessage.value = "WASM实例未初始化，请稍后再试";
				return;
			}
			const FS = props.wasmInstance.FS;
			let uploadedCount = 0;
			let failedCount = 0;
			statusMessage.value = "开始上传文件...";
			for (let i = 0; i < filesToUpload.length; i++) {
				const file = filesToUpload[i];
				try {
					if (file.size === 0) {
						console.warn(`跳过空文件: ${file.name}`);
						failedCount++;
						continue;
					}
					const arrayBuffer = await file.arrayBuffer();
					const uint8Array = new Uint8Array(arrayBuffer);
					const targetPath = currentPath.value === "/" ? `/${file.name}` : `${currentPath.value}/${file.name}`;
					FS.writeFile(targetPath, uint8Array);
					console.log(`已上传文件: ${targetPath} (${formatFileSize(file.size)})`);
					uploadedCount++;
					statusMessage.value = `上传进度: ${uploadedCount}/${filesToUpload.length}`;
				} catch (error) {
					console.error(`上传文件 ${file.name} 失败:`, error);
					failedCount++;
					statusMessage.value = `上传失败: ${file.name}`;
				}
			}
			if (failedCount === 0) statusMessage.value = `成功上传 ${uploadedCount} 个文件`;
			else statusMessage.value = `上传完成: ${uploadedCount} 成功, ${failedCount} 失败`;
			setTimeout(() => {
				loadCurrentDirectory();
				statusMessage.value = "";
			}, 1e3);
		}
		function renameItem(item) {
			renamingItem.value = item;
			newName.value = item.name;
			showRenameDialog.value = true;
			nextTick(() => {
				renameInput.value?.select();
				renameInput.value?.focus();
			});
		}
		function closeRenameDialog() {
			showRenameDialog.value = false;
			renamingItem.value = null;
			newName.value = "";
		}
		function confirmRename() {
			if (!renamingItem.value || !newName.value.trim()) {
				statusMessage.value = "名称不能为空";
				return;
			}
			if (!props.wasmInstance) {
				statusMessage.value = "WASM实例未初始化，请稍后再试";
				closeRenameDialog();
				return;
			}
			try {
				const FS = props.wasmInstance.FS;
				const oldPath = renamingItem.value.path;
				const parentPath = oldPath.substring(0, oldPath.lastIndexOf("/")) || "/";
				const newPath = parentPath === "/" ? `/${newName.value.trim()}` : `${parentPath}/${newName.value.trim()}`;
				try {
					FS.stat(newPath);
					statusMessage.value = "该名称已存在";
					return;
				} catch (e) {}
				FS.rename(oldPath, newPath);
				statusMessage.value = `已重命名为: ${newName.value.trim()}`;
				closeRenameDialog();
				loadCurrentDirectory();
				setTimeout(() => statusMessage.value = "", 3e3);
			} catch (e) {
				console.error("重命名失败:", e);
				statusMessage.value = `重命名失败: ${e.message}`;
			}
		}
		function deleteFile(filePath) {
			if (!confirm("确定要删除这个文件吗？此操作无法撤销。")) return;
			if (!props.wasmInstance) {
				statusMessage.value = "WASM实例未初始化，请稍后再试";
				return;
			}
			try {
				props.wasmInstance.FS.unlink(filePath);
				statusMessage.value = "文件已删除";
				loadCurrentDirectory();
				setTimeout(() => statusMessage.value = "", 3e3);
			} catch (e) {
				console.error("删除文件失败:", e);
				statusMessage.value = `删除文件失败: ${e.message}`;
			}
		}
		function deleteDirectory(dirPath) {
			if (!confirm("确定要删除这个目录吗？此操作无法撤销。")) return;
			if (!props.wasmInstance) {
				statusMessage.value = "WASM实例未初始化，请稍后再试";
				return;
			}
			try {
				const FS = props.wasmInstance.FS;
				if (FS.readdir(dirPath).length > 2) {
					if (!confirm("目录不为空，确定要删除所有内容吗？")) return;
					FS.rmdir(dirPath, { recursive: true });
				} else FS.rmdir(dirPath);
				statusMessage.value = "目录已删除";
				loadCurrentDirectory();
				setTimeout(() => statusMessage.value = "", 3e3);
			} catch (e) {
				console.error("删除目录失败:", e);
				statusMessage.value = `删除目录失败: ${e.message}`;
			}
		}
		function createNewDirectory() {
			newDirName.value = "";
			showCreateDirDialog.value = true;
			nextTick(() => {
				newDirInput.value?.focus();
			});
		}
		function closeCreateDirDialog() {
			showCreateDirDialog.value = false;
			newDirName.value = "";
		}
		function confirmCreateDir() {
			if (!newDirName.value.trim()) {
				statusMessage.value = "目录名称不能为空";
				return;
			}
			if (!props.wasmInstance) {
				statusMessage.value = "WASM实例未初始化，请稍后再试";
				closeCreateDirDialog();
				return;
			}
			try {
				const FS = props.wasmInstance.FS;
				const dirPath = currentPath.value === "/" ? `/${newDirName.value.trim()}` : `${currentPath.value}/${newDirName.value.trim()}`;
				try {
					FS.stat(dirPath);
					statusMessage.value = "该目录已存在";
					return;
				} catch (e) {}
				FS.mkdir(dirPath);
				statusMessage.value = `已创建目录: ${newDirName.value.trim()}`;
				closeCreateDirDialog();
				loadCurrentDirectory();
				setTimeout(() => statusMessage.value = "", 3e3);
			} catch (e) {
				console.error("创建目录失败:", e);
				statusMessage.value = `创建目录失败: ${e.message}`;
			}
		}
		function moveItem(item) {
			movingItem.value = item;
			movePath.value = "/";
			loadMoveDirectories();
			showMoveDialog.value = true;
		}
		function closeMoveDialog() {
			showMoveDialog.value = false;
			movingItem.value = null;
		}
		function loadMoveDirectories() {
			if (!props.wasmInstance) return;
			const FS = props.wasmInstance.FS;
			moveDirectories.value = [];
			try {
				const entries = FS.readdir(movePath.value);
				for (const entry of entries) {
					if (entry === "." || entry === "..") continue;
					const fullPath = movePath.value === "/" ? `/${entry}` : `${movePath.value}/${entry}`;
					try {
						const stat = FS.stat(fullPath);
						if (FS.isDir(stat.mode) && fullPath !== movingItem?.value?.path) moveDirectories.value.push({
							path: fullPath,
							name: entry,
							isDirectory: true
						});
					} catch (e) {}
				}
				moveDirectories.value.sort((a, b) => a.name.localeCompare(b.name));
			} catch (e) {
				console.error("加载目录列表时出错:", e);
			}
		}
		function navigateMoveTo(path) {
			if (path.startsWith("/proc") || path.startsWith("/dev")) return;
			movePath.value = path;
			loadMoveDirectories();
		}
		function navigateMoveUp() {
			if (movePath.value === "/") return;
			const parentPath = movePath.value.split("/").slice(0, -1).join("/") || "/";
			navigateMoveTo(parentPath);
		}
		function confirmMove() {
			if (!movingItem.value) return;
			if (!props.wasmInstance) {
				statusMessage.value = "WASM实例未初始化，请稍后再试";
				closeMoveDialog();
				return;
			}
			try {
				const FS = props.wasmInstance.FS;
				const oldPath = movingItem.value.path;
				const newPath = movePath.value === "/" ? `/${movingItem.value.name}` : `${movePath.value}/${movingItem.value.name}`;
				try {
					FS.stat(newPath);
					statusMessage.value = "目标位置已存在同名项目";
					return;
				} catch (e) {}
				FS.rename(oldPath, newPath);
				statusMessage.value = `已移动到: ${movePath.value}`;
				closeMoveDialog();
				loadCurrentDirectory();
				setTimeout(() => statusMessage.value = "", 3e3);
			} catch (e) {
				console.error("移动失败:", e);
				statusMessage.value = `移动失败: ${e.message}`;
			}
		}
		loadCurrentDirectory();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [
				_cache[12] || (_cache[12] = createBaseVNode("h3", null, "文件管理", -1)),
				createBaseVNode("div", _hoisted_2$1, [createBaseVNode("button", {
					onClick: _cache[0] || (_cache[0] = ($event) => navigateTo("/")),
					class: "path-item home"
				}, "/"), (openBlock(true), createElementBlock(Fragment, null, renderList(currentPathSegments.value, (segment, index) => {
					return openBlock(), createElementBlock(Fragment, { key: index }, [_cache[7] || (_cache[7] = createBaseVNode("span", { class: "path-separator" }, "/", -1)), createBaseVNode("button", {
						onClick: ($event) => navigateTo(buildPath(currentPathSegments.value, index + 1)),
						class: "path-item"
					}, toDisplayString(segment), 9, _hoisted_3$1)], 64);
				}), 128))]),
				createBaseVNode("div", _hoisted_4$1, [
					createBaseVNode("button", {
						onClick: refreshCurrentDirectory,
						class: "toolbar-button",
						title: "刷新"
					}, " 🔄 刷新 "),
					createBaseVNode("button", {
						onClick: createNewDirectory,
						class: "toolbar-button",
						title: "新建目录"
					}, " 📁 新建目录 "),
					createBaseVNode("button", {
						onClick: triggerFileUpload,
						class: "toolbar-button primary",
						title: "上传文件"
					}, " 📤 上传文件 "),
					createBaseVNode("input", {
						type: "file",
						ref_key: "fileInput",
						ref: fileInput,
						style: { "display": "none" },
						multiple: "",
						accept: "*/*",
						onChange: handleFileUpload
					}, null, 544)
				]),
				createBaseVNode("div", _hoisted_5$1, [createBaseVNode("table", _hoisted_6$1, [_cache[9] || (_cache[9] = createBaseVNode("thead", null, [createBaseVNode("tr", null, [
					createBaseVNode("th", null, "名称"),
					createBaseVNode("th", null, "大小"),
					createBaseVNode("th", null, "操作")
				])], -1)), createBaseVNode("tbody", null, [
					currentPath.value !== "/" ? (openBlock(), createElementBlock("tr", _hoisted_7$1, [createBaseVNode("td", { colspan: "3" }, [createBaseVNode("button", {
						onClick: navigateUp,
						class: "nav-item"
					}, " 📁 .. ")])])) : createCommentVNode("", true),
					(openBlock(true), createElementBlock(Fragment, null, renderList(directories.value, (dir) => {
						return openBlock(), createElementBlock("tr", {
							key: dir.path,
							class: "dir-item"
						}, [
							createBaseVNode("td", null, [createBaseVNode("button", {
								onClick: ($event) => navigateTo(dir.path),
								class: "nav-item"
							}, " 📁 " + toDisplayString(dir.name), 9, _hoisted_8$1)]),
							_cache[8] || (_cache[8] = createBaseVNode("td", null, "-", -1)),
							createBaseVNode("td", null, [createBaseVNode("button", {
								onClick: ($event) => renameItem(dir),
								class: "action-button",
								title: "重命名"
							}, " 重命名 ", 8, _hoisted_9$1), createBaseVNode("button", {
								onClick: ($event) => deleteDirectory(dir.path),
								class: "action-button delete",
								title: "删除"
							}, " 删除 ", 8, _hoisted_10$1)])
						]);
					}), 128)),
					(openBlock(true), createElementBlock(Fragment, null, renderList(files.value, (file) => {
						return openBlock(), createElementBlock("tr", {
							key: file.path,
							class: "file-item"
						}, [
							createBaseVNode("td", null, toDisplayString(file.name), 1),
							createBaseVNode("td", null, toDisplayString(formatFileSize(file.size || 0)), 1),
							createBaseVNode("td", null, [
								createBaseVNode("button", {
									onClick: ($event) => downloadFile(file),
									class: "action-button",
									title: "下载"
								}, " 下载 ", 8, _hoisted_11$1),
								createBaseVNode("button", {
									onClick: ($event) => renameItem(file),
									class: "action-button",
									title: "重命名"
								}, " 重命名 ", 8, _hoisted_12$1),
								createBaseVNode("button", {
									onClick: ($event) => deleteFile(file.path),
									class: "action-button delete",
									title: "删除"
								}, " 删除 ", 8, _hoisted_13$1),
								createBaseVNode("button", {
									onClick: ($event) => moveItem(file),
									class: "action-button",
									title: "移动"
								}, " 移动 ", 8, _hoisted_14$1)
							])
						]);
					}), 128))
				])]), directories.value.length === 0 && files.value.length === 0 && currentPath.value !== "/loading" ? (openBlock(), createElementBlock("div", _hoisted_15$1, " 目录为空 ")) : createCommentVNode("", true)]),
				statusMessage.value ? (openBlock(), createElementBlock("div", _hoisted_16$1, toDisplayString(statusMessage.value), 1)) : createCommentVNode("", true),
				showRenameDialog.value ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: "modal-overlay",
					onClick: closeRenameDialog
				}, [createBaseVNode("div", {
					class: "modal-content",
					onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"]))
				}, [
					createBaseVNode("h4", null, "重命名 " + toDisplayString(renamingItem.value?.name), 1),
					withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => newName.value = $event),
						type: "text",
						class: "rename-input",
						onKeyup: withKeys(confirmRename, ["enter"]),
						ref_key: "renameInput",
						ref: renameInput
					}, null, 544), [[vModelText, newName.value]]),
					createBaseVNode("div", { class: "modal-buttons" }, [createBaseVNode("button", {
						onClick: closeRenameDialog,
						class: "modal-button secondary"
					}, "取消"), createBaseVNode("button", {
						onClick: confirmRename,
						class: "modal-button primary"
					}, "确认")])
				])])) : createCommentVNode("", true),
				showCreateDirDialog.value ? (openBlock(), createElementBlock("div", {
					key: 2,
					class: "modal-overlay",
					onClick: closeCreateDirDialog
				}, [createBaseVNode("div", {
					class: "modal-content",
					onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
				}, [
					_cache[10] || (_cache[10] = createBaseVNode("h4", null, "新建目录", -1)),
					withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => newDirName.value = $event),
						type: "text",
						class: "rename-input",
						onKeyup: withKeys(confirmCreateDir, ["enter"]),
						ref_key: "newDirInput",
						ref: newDirInput,
						placeholder: "输入目录名称"
					}, null, 544), [[vModelText, newDirName.value]]),
					createBaseVNode("div", { class: "modal-buttons" }, [createBaseVNode("button", {
						onClick: closeCreateDirDialog,
						class: "modal-button secondary"
					}, "取消"), createBaseVNode("button", {
						onClick: confirmCreateDir,
						class: "modal-button primary"
					}, "确认")])
				])])) : createCommentVNode("", true),
				showMoveDialog.value ? (openBlock(), createElementBlock("div", {
					key: 3,
					class: "modal-overlay",
					onClick: closeMoveDialog
				}, [createBaseVNode("div", {
					class: "modal-content move-modal",
					onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
				}, [createBaseVNode("h4", null, "移动 " + toDisplayString(movingItem.value?.name), 1), createBaseVNode("div", _hoisted_17$1, [
					createBaseVNode("div", _hoisted_18$1, [createBaseVNode("button", {
						onClick: _cache[5] || (_cache[5] = ($event) => navigateMoveTo("/")),
						class: "path-item home"
					}, "/"), (openBlock(true), createElementBlock(Fragment, null, renderList(movePathSegments.value, (segment, index) => {
						return openBlock(), createElementBlock(Fragment, { key: index }, [_cache[11] || (_cache[11] = createBaseVNode("span", { class: "path-separator" }, "/", -1)), createBaseVNode("button", {
							onClick: ($event) => navigateMoveTo(buildPath(movePathSegments.value, index + 1)),
							class: "path-item"
						}, toDisplayString(segment), 9, _hoisted_19)], 64);
					}), 128))]),
					createBaseVNode("div", _hoisted_20, [movePath.value !== "/" ? (openBlock(), createElementBlock("button", {
						key: 0,
						onClick: navigateMoveUp,
						class: "nav-item"
					}, " 📁 .. ")) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(moveDirectories.value, (dir) => {
						return openBlock(), createElementBlock("button", {
							key: dir.path,
							onClick: ($event) => navigateMoveTo(dir.path),
							class: "nav-item"
						}, " 📁 " + toDisplayString(dir.name), 9, _hoisted_21);
					}), 128))]),
					createBaseVNode("div", { class: "modal-buttons" }, [createBaseVNode("button", {
						onClick: closeMoveDialog,
						class: "modal-button secondary"
					}, "取消"), createBaseVNode("button", {
						onClick: confirmMove,
						class: "modal-button primary"
					}, "移动到此处")])
				])])])) : createCommentVNode("", true)
			]);
		};
	}
});
var FileManager_default = /* @__PURE__ */ __plugin_vue_export_helper_default(FileManager_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-ee30505a"]]);
var _hoisted_1 = { class: "app" };
var _hoisted_2 = { class: "control-section" };
var _hoisted_3 = ["value"];
var _hoisted_4 = { class: "status-text" };
var _hoisted_5 = { class: "control-section" };
var _hoisted_6 = { class: "zoom-controls" };
var _hoisted_7 = ["value"];
var _hoisted_8 = { class: "zoom-display" };
var _hoisted_9 = { class: "checkbox-label" };
var _hoisted_10 = ["checked"];
var _hoisted_11 = { class: "header" };
var _hoisted_12 = { class: "status" };
var _hoisted_13 = { class: "spinner" };
var _hoisted_14 = { class: "emscripten" };
var _hoisted_15 = { class: "emscripten" };
var _hoisted_16 = ["value", "max"];
var _hoisted_17 = { class: "emscripten_border" };
var _hoisted_18 = { class: "screen_num" };
var app = createApp(/* @__PURE__ */ defineComponent({
	__name: "App",
	setup(__props) {
		const romConfigs = {
			"nc2000": {
				name: "nc2000/2600 官方3.5",
				args: [
					"--nc2000",
					"--rom",
					"roms/nc2000"
				],
				files: [
					{
						url: "roms/nc2000.nand",
						vfsPath: "/roms/nc2000.nand"
					},
					{
						url: "roms/nc2000.nand0",
						vfsPath: "/roms/nc2000.nand0"
					},
					{
						url: "roms/nc2000.nor",
						vfsPath: "/roms/nc2000.nor"
					}
				]
			},
			"nc2600c_fc42": {
				name: "nc2600c 非常4.2 by 41824984 - 24MB扩容",
				args: [
					"--nc2000",
					"--rom",
					"roms/fc42"
				],
				files: [
					{
						url: "roms/fc42.nand",
						vfsPath: "/roms/fc42.nand"
					},
					{
						url: "roms/fc42.nand0",
						vfsPath: "/roms/fc42.nand0"
					},
					{
						url: "roms/fc42.nor",
						vfsPath: "/roms/fc42.nor"
					}
				]
			}
		};
		const filesToLoad = [
			{
				url: "resource/lcdstripe_slice_w938.json",
				vfsPath: "/resource/lcdstripe_slice_w938.json"
			},
			{
				url: "resource/lcdstripe_slice_w1313.json",
				vfsPath: "/resource/lcdstripe_slice_w1313.json"
			},
			{
				url: "resource/lcdstripe_w938.bmp",
				vfsPath: "/resource/lcdstripe_w938.bmp"
			},
			{
				url: "resource/lcdstripe_w1313.bmp",
				vfsPath: "/resource/lcdstripe_w1313.bmp"
			},
			{
				url: "roms/nc2000.nand",
				vfsPath: "/roms/nc2000.nand"
			},
			{
				url: "roms/nc2000.nand0",
				vfsPath: "/roms/nc2000.nand0"
			},
			{
				url: "roms/nc2000.nor",
				vfsPath: "/roms/nc2000.nor"
			},
			{
				url: "roms/fc42.nand0",
				vfsPath: "/roms/fc42.nand0"
			},
			{
				url: "roms/fc42.nor",
				vfsPath: "/roms/fc42.nor"
			},
			{
				url: "roms/fc42.nand",
				vfsPath: "/roms/fc42.nand"
			}
		];
		const isDrawerOpen = ref(false);
		const currentRom = ref("nc2000");
		const currentZoom = ref(1);
		const isFitMode = ref(false);
		const autoFitEnabled = ref(false);
		const statusText = ref("Downloading...");
		const progressValue = ref(0);
		const progressMax = ref(0);
		const showProgress = ref(false);
		const showSpinner = ref(true);
		const outputText = ref("");
		const romStatusText = ref("");
		const canvasRef = ref(null);
		const zoomContainerRef = ref(null);
		const outputRef = ref(null);
		let wasmInstance = null;
		function toggleDrawer() {
			isDrawerOpen.value = !isDrawerOpen.value;
		}
		function closeDrawer() {
			isDrawerOpen.value = false;
		}
		function applyZoom(zoomLevel) {
			currentZoom.value = parseFloat(zoomLevel.toString());
			if (zoomContainerRef.value) zoomContainerRef.value.style.transform = `scale(${currentZoom.value})`;
		}
		function resetZoom() {
			applyZoom(1);
			isFitMode.value = false;
			autoFitEnabled.value = false;
		}
		function fitToScreen() {
			if (!zoomContainerRef.value) return;
			const viewportHeight = document.body.clientHeight;
			const viewportWidth = document.body.clientWidth;
			console.log("viewportWidth", viewportWidth);
			const containerRect = zoomContainerRef.value.getBoundingClientRect();
			const containerHeight = containerRect.height;
			const containerWidth = containerRect.width;
			const availableHeight = viewportHeight - 250;
			const availableWidth = viewportWidth - 20;
			const heightScale = availableHeight / containerHeight;
			const widthScale = availableWidth / containerWidth;
			const fitZoom = Math.min(heightScale, widthScale);
			console.log("fitZoom", fitZoom, availableWidth, containerWidth);
			applyZoom(fitZoom);
		}
		function setupZoomControls() {
			window.addEventListener("resize", () => {
				if (isFitMode.value || autoFitEnabled.value) fitToScreen();
			});
		}
		async function applyRomChange() {
			if (!wasmInstance) {
				romStatusText.value = "WASM模块尚未加载完成，请稍后再试";
				return;
			}
			try {
				romStatusText.value = "正在切换ROM...";
				await restartWithNewRom();
				const romConfig = romConfigs[currentRom.value];
				romStatusText.value = romConfig ? `已切换到: ${romConfig.name || ""}` : `已切换到未知 ROM`;
			} catch (error) {
				console.error("切换ROM时出错:", error);
				romStatusText.value = `切换ROM失败: ${error.message}`;
			}
		}
		async function restartWithNewRom() {
			if (!wasmInstance) throw new Error("WASM实例未初始化");
			const romConfig = romConfigs[currentRom.value];
			console.log("使用新ROM重新启动...");
			wasmInstance.callMain(romConfig?.args || []);
			console.log("wqxsim 已使用新ROM启动。");
		}
		function setUpScreenFit() {
			setupZoomControls();
			setTimeout(() => {
				fitToScreen();
				isFitMode.value = true;
				autoFitEnabled.value = true;
			}, 100);
		}
		async function loadAndRun() {
			try {
				const Module = {
					print: (...args) => {
						console.log(...args);
						if (outputRef.value) {
							const text = args.join(" ");
							outputText.value += text + "\n";
							outputRef.value.scrollTop = outputRef.value.scrollHeight;
						}
					},
					canvas: canvasRef.value,
					setStatus: (text) => {
						console.log("setStatus", text);
						if (text.includes("loading...")) showSpinner.value = true;
						else showSpinner.value = false;
						statusText.value = text;
					},
					totalDependencies: 0,
					monitorRunDependencies: function(left) {
						console.log("monitorRunDependencies", left);
						this.totalDependencies = Math.max(this.totalDependencies, left);
						this.setStatus(left ? "Preparing... (" + (this.totalDependencies - left) + "/" + this.totalDependencies + ")" : "All downloads complete.");
					},
					onRuntimeInitialized: function() {
						console.log("onRuntimeInitialized");
					}
				};
				Module.setStatus("Downloading...");
				window.onerror = () => {
					Module.setStatus("Exception thrown, see JavaScript console");
					showSpinner.value = false;
					Module.setStatus = (text) => {
						if (text) console.error("[post-exception status] " + text);
					};
					return false;
				};
				const instance = await wqxsim_default(Module);
				wasmInstance = instance;
				console.log("Wasm 模块已加载，准备文件系统...", instance);
				const FS = instance.FS;
				Module.setStatus(`Downloading ${filesToLoad.length} asset(s)...`);
				const fetchPromises = filesToLoad.map(async (file) => {
					const response = await fetch(file.url);
					if (!response.ok) throw new Error(`Failed to fetch ${file.url}: ${response.statusText}`);
					const data = await response.arrayBuffer();
					return {
						data: new Uint8Array(data),
						path: file.vfsPath
					};
				});
				const loadedFiles = await Promise.all(fetchPromises);
				Module.setStatus("Files downloaded. Writing to virtual file system...");
				for (const file of loadedFiles) {
					const lastSlashIndex = file.path.lastIndexOf("/");
					const dirPath = lastSlashIndex > 0 ? file.path.substring(0, lastSlashIndex) : ".";
					FS.mkdirTree(dirPath);
					FS.writeFile(file.path, file.data);
					console.log(`VFS: Wrote ${file.path}`);
				}
				console.log("文件系统已准备就绪。即将启动 main()...");
				Module.setStatus(" ");
				const romConfig = romConfigs[currentRom.value] || { args: [] };
				instance.callMain(romConfig.args);
				console.log("wqxsim 已启动。");
			} catch (err) {
				statusText.value = "Error during startup. See console.";
				console.error(err);
				showSpinner.value = false;
			}
		}
		function handleAutoFitChange(event$1) {
			autoFitEnabled.value = event$1.target.checked;
			if (autoFitEnabled.value) {
				fitToScreen();
				isFitMode.value = true;
			} else isFitMode.value = false;
		}
		function handleZoomSliderChange(event$1) {
			const target = event$1.target;
			applyZoom(parseFloat(target.value));
			isFitMode.value = false;
			autoFitEnabled.value = false;
		}
		onMounted(() => {
			setUpScreenFit();
			loadAndRun();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", { class: normalizeClass(["drawer", { open: isDrawerOpen.value }]) }, [
					_cache[6] || (_cache[6] = createBaseVNode("h2", null, "- ", -1)),
					createBaseVNode("div", _hoisted_2, [
						_cache[2] || (_cache[2] = createBaseVNode("h3", null, "ROM选择", -1)),
						withDirectives(createBaseVNode("select", {
							"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currentRom.value = $event),
							class: "full-width"
						}, [(openBlock(), createElementBlock(Fragment, null, renderList(romConfigs, (config, key) => {
							return createBaseVNode("option", {
								key,
								value: key
							}, toDisplayString(config.name), 9, _hoisted_3);
						}), 64))], 512), [[vModelSelect, currentRom.value]]),
						createBaseVNode("button", {
							onClick: applyRomChange,
							class: "primary-button full-width"
						}, "应用"),
						createBaseVNode("div", _hoisted_4, toDisplayString(romStatusText.value), 1)
					]),
					createBaseVNode("div", _hoisted_5, [
						_cache[5] || (_cache[5] = createBaseVNode("h3", null, "缩放控制", -1)),
						createBaseVNode("div", _hoisted_6, [
							_cache[3] || (_cache[3] = createBaseVNode("label", { for: "zoom-slider" }, "缩放:", -1)),
							createBaseVNode("input", {
								type: "range",
								id: "zoom-slider",
								min: "0.2",
								max: "3",
								step: "0.1",
								value: currentZoom.value,
								onInput: handleZoomSliderChange,
								class: "full-width"
							}, null, 40, _hoisted_7),
							createBaseVNode("div", _hoisted_8, [createBaseVNode("span", null, toDisplayString(Math.round(currentZoom.value * 100)) + "%", 1), createBaseVNode("button", {
								onClick: resetZoom,
								class: "secondary-button"
							}, "重置")])
						]),
						createBaseVNode("label", _hoisted_9, [createBaseVNode("input", {
							type: "checkbox",
							id: "auto-fit",
							checked: autoFitEnabled.value,
							onChange: handleAutoFitChange
						}, null, 40, _hoisted_10), _cache[4] || (_cache[4] = createBaseVNode("span", null, "自适应屏幕", -1))])
					]),
					createVNode(FileManager_default, { wasmInstance: unref(wasmInstance) }, null, 8, ["wasmInstance"])
				], 2),
				createBaseVNode("div", {
					class: normalizeClass(["drawer-overlay", { show: isDrawerOpen.value }]),
					onClick: closeDrawer
				}, null, 2),
				createBaseVNode("button", {
					class: "drawer-toggle",
					onClick: toggleDrawer
				}, "☰"),
				createBaseVNode("div", _hoisted_11, [_cache[7] || (_cache[7] = createBaseVNode("h1", null, "WQXSIM", -1)), createBaseVNode("div", _hoisted_12, [withDirectives(createBaseVNode("div", _hoisted_13, null, 512), [[vShow, showSpinner.value]]), createBaseVNode("div", _hoisted_14, toDisplayString(statusText.value), 1)])]),
				createBaseVNode("div", _hoisted_15, [withDirectives(createBaseVNode("progress", {
					value: progressValue.value,
					max: progressMax.value
				}, null, 8, _hoisted_16), [[vShow, showProgress.value]])]),
				createBaseVNode("div", {
					ref_key: "zoomContainerRef",
					ref: zoomContainerRef,
					class: "zoom-container"
				}, [
					createBaseVNode("div", _hoisted_17, [createBaseVNode("canvas", {
						ref_key: "canvasRef",
						ref: canvasRef,
						class: "emscripten",
						oncontextmenu: "event.preventDefault()",
						tabindex: "-1",
						width: "972",
						height: "435"
					}, null, 512), createBaseVNode("div", _hoisted_18, [(openBlock(), createElementBlock(Fragment, null, renderList([
						1,
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						9
					], (n) => {
						return createBaseVNode("span", null, toDisplayString(n), 1);
					}), 64))])]),
					withDirectives(createBaseVNode("textarea", {
						ref_key: "outputRef",
						ref: outputRef,
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => outputText.value = $event),
						rows: "8",
						style: { "display": "none" }
					}, null, 512), [[vModelText, outputText.value]]),
					createVNode(VirtualKeyboard_default, { wasmInstance: unref(wasmInstance) }, null, 8, ["wasmInstance"])
				], 512)
			]);
		};
	}
}));
app.use(createPinia());
app.mount("#app");
