/**
 * Copyright 2013, 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/ 
 
 var browserify = require('browserify'),
 fs = require('fs');
 module.exports = function(RED) {
    "use strict";
    var fs = require("fs");
    function BrowserifyNode(n) {
        RED.nodes.createNode(this,n);
        this.filein = n.filein;
        this.fileout = n.fileout;
        this.appendNewline = n.appendNewline;
        this.overwriteFile = n.overwriteFile;
        var node = this;
        this.on("input",function(msg) {
            var b = browserify();

            b.add(node.filein);
            b.bundle().pipe(fs.createWriteStream(node.fileout));
        });
    }

    RED.nodes.registerType("browserify", BrowserifyNode);
};