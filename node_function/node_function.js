/**
 * Copyright 2013 IBM Corp.
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

module.exports = function(RED) {
    "use strict";
    var util = require("util");
    var vm = require("vm");
    var fs = require('fs');
    var fspath = require('path');

    function FunctionNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.func = n.func;
        var functionText = "var results = (function(msg){"+this.func+"\n})(msg);";
        this.topic = n.topic;
        this.context = {global:RED.settings.functionGlobalContext || {}};
        try {
            this.script = vm.createScript(functionText);
            this.on("input", function(msg) {
                if (msg != null) {
                    var sandbox = {node:this,require:require,msg:msg,console:console,util:util,Buffer:Buffer,context:this.context};
                    try {
                        this.script.runInNewContext(sandbox);


                    } catch(err) {
                        this.error(err.toString());
                    }
                }
            });
        } catch(err) {
            this.error(err);
        }
    }

    RED.nodes.registerType("node_function",FunctionNode);
    RED.library.register("functions");
}
