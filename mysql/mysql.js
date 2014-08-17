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

var RED = require(process.env.NODE_RED_HOME+"/red/red");
var mysql = require('mysql');
var util = require('util');

function RedisNode(n) {
    RED.nodes.createNode(this,n);
    
    this.arguments = n.arguments;
    this.command = n.command;
    this.server =  RED.nodes.getNode(n.server);
    var node = this;
    this.on("input", function(msg) {
		
        server.query(node.command, function(err, rows, fields){
            msg.payload = {rows:rows||err,fields:fields};
            node.send(msg);
        });    
        
    });
}


RED.nodes.registerType("mysql",RedisNode);

function RedisServerNode(n) {
    RED.nodes.createNode(this,n);
    
    this.host = n.host;
    this.port = n.port;
    this.user = n.username;
    this.password = n.password;
    this.connectionLimit = n.connectionLimit;
    
    this.server =  mysqlConnectionPool.createPool(this);   
    this.server = mysqlConnectionPool.getConnection();
}

RED.nodes.registerType("mysql-server",RedisServerNode);

