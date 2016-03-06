//

function myConsoleLog(log){
	self.port.emit("console.log",log);
}

exportFunction(myConsoleLog, unsafeWindow, {defineAs: "myConsoleLog"});