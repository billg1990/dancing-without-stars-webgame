webpackJsonp([1],{"87im":function(e,t){},NHnr:function(e,t,i){"use strict";function s(e){i("xfsC")}function r(e){i("rswz")}function a(e){i("87im")}Object.defineProperty(t,"__esModule",{value:!0});var n=i("7+uW"),o=i("zL8q"),h=i.n(o),l=(i("tvR6"),{name:"app"}),c=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},u=[],d={render:c,staticRenderFns:u},p=d,m=i("VU/8"),f=s,v=m(l,p,!1,f,null,null),g=v.exports,T=i("/ocq"),y={name:"Tile",props:["tileLength","content","index","tileClicked","tileType"],methods:{getContentColor:function(e){var t=["#483D8B","#8B0000","#4B0082","#0000CD","#808000","#8B4513"];if("#"===e||""===e)return"black";var i=parseInt(e);return i<=8?t[i-1]:"black"},getBtnType:function(){return 0===this.tileType?"primary":1===this.tileType?"success":2===this.tileType?"info":"warning"},handleClick:function(e){this.tileClicked(e.target.value)}}},b=function(){var e=this,t=e.$createElement;return(e._self._c||t)("el-button",{staticClass:"Tile",style:{width:this.tileLength+"px",height:this.tileLength+"px",fontSize:.6*this.tileLength+"px",color:e.getContentColor(this.content),marginLeft:"0px"},attrs:{type:e.getBtnType(),value:e.index},on:{click:e.handleClick}},[e._v(e._s(this.content))])},k=[],x={render:b,staticRenderFns:k},S=x,w=i("VU/8"),_=r,B=w(y,S,!1,_,null,null),C=B.exports,F={name:"Board",props:["boardLength","tiles","tileTypes","tileClicked"],components:{Tile:C}},M=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-button-group",{staticClass:"Board",style:{width:this.boardLength+1*Math.sqrt(this.tiles.length)+2+"px",height:this.boardLength+2*Math.sqrt(this.tiles.length)+1+"px"}},e._l(e.tiles,function(t,s){return i("Tile",{key:s,attrs:{tile:t,index:s,tileLength:e.boardLength/Math.sqrt(e.tiles.length),content:t,tileClicked:e.tileClicked,tileType:e.tileTypes[s]}})}))},P=[],D={render:M,staticRenderFns:P},L=D,I=i("VU/8"),A=a,O=I(F,L,!1,A,null,null),z=O.exports,G=i("lHA8"),E=i.n(G),R=i("c/Tr"),N=i.n(R),V=i("ifoU"),j=i.n(V),W=i("Zrlr"),$=i.n(W),H=i("wxAW"),U=i.n(H),q=function e(t,i){$()(this,e),this.row=t,this.col=i},J=q,Y=function(){function e(t,i,s){$()(this,e),this.n=t,this.c=i,this.k=s,this.board=[],this.tileTypes=[];for(var r=0;r<t*t;r++)this.board.push(""),this.tileTypes.push(0);this.dancerGenerated=!1,this.stars=[],this.step=0,this.picked=-1,this.numMoved=0,this.moved=new j.a}return U()(e,[{key:"getRandomIntInclusive",value:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}},{key:"posToIndex",value:function(e){return e.row*this.n+e.col}},{key:"indexToPos",value:function(e){var t=Math.floor(e/this.n),i=Math.floor(e%this.n);return new J(t,i)}},{key:"manhattanDistance",value:function(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)}},{key:"okToPlaceAStar",value:function(e){if(this.stars.length>=this.k)return!1;var t=this.posToIndex(e);if(!this.insideBoard(e))return!1;if(""!==this.board[t])return!1;for(var i=!0,s=0;s<this.stars.length;s++)if(this.manhattanDistance(this.stars[s],e)<this.c+1){i=!1;break}return i}},{key:"insideBoard",value:function(e){return e.row>=0&&e.col>=0&&this.n>e.row&&this.n>e.col}},{key:"checkChoreographerFinish",value:function(){var e=new j.a;for(var t in this.board)if(""!==this.board[t]&&"#"!==this.board[t]){var i=this.explore(this.indexToPos(t),new j.a);if(i){i=N()(i),i=i.sort();var s=i.join();e.set(s,i)}}var r=[];return e.forEach(function(e,t,i){r.push(e)}),this.checkResultLines(r,N()(this.board))}},{key:"checkResultLines",value:function(e,t){if(!t||!e)return!1;if(0===e.length){var i=!0;for(var s in t)if(""!==t[s]&&"#"!==t[s]){i=!1;break}return i}var r=e.pop(),a=this.checkResultLines(e,this.removeLineFromBoard(r,t));return!!a||!!(a=this.checkResultLines(e,t))}},{key:"removeLineFromBoard",value:function(e,t){var i=N()(t);for(var s in e){if(""===i[e[s]]||"#"===i[e[s]]){i=null;break}i[e[s]]=""}return i}},{key:"explore",value:function(e,t){var i=this;if(""===this.board[this.posToIndex(e)]||"#"===this.board[this.posToIndex(e)])return null;var s=this.board[this.posToIndex(e)];if(t.get(s))return null;var r=new j.a(t);if(r.set(s,this.posToIndex(e)),r.size===this.c){var a=new E.a;return r.forEach(function(e,t,i){a.add(e)}),a}var n=new J(e.row-1,e.col);if(this.insideBoard(n)){var o=!1;if(t.forEach(function(e,t,s){e===i.posToIndex(n)&&(o=!0)}),!o){var h=this.explore(n,r);if(h)return h}}var l=new J(e.row+1,e.col);if(this.insideBoard(l)){var c=!1;if(t.forEach(function(e,t,s){e===i.posToIndex(l)&&(c=!0)}),!c){var u=this.explore(l,r);if(u)return u}}var d=new J(e.row,e.col-1);if(this.insideBoard(d)){var p=!1;if(t.forEach(function(e,t,s){e===i.posToIndex(d)&&(p=!0)}),!p){var m=this.explore(d,r);if(m)return m}}var f=new J(e.row,e.col+1);if(this.insideBoard(f)){var v=!1;if(t.forEach(function(e,t,s){e===i.posToIndex(f)&&(v=!0)}),!v){var g=this.explore(f,r);if(g)return g}}return null}},{key:"generateDancers",value:function(){if(!this.dancerGenerated){for(var e=0;e<this.c;e++)for(var t=0;t<this.k;){var i=this.getRandomIntInclusive(0,this.n*this.n-1);""===this.board[i]&&(this.board[i]=(e+1).toString(),this.tileTypes[i]=2,t++)}this.dancerGenerated=!0}}},{key:"placeAStar",value:function(e){var t=this.posToIndex(e);this.board[t]="#",this.stars.push(e)}},{key:"cancelAStar",value:function(e){var t=this.posToIndex(e);if("#"===this.board[t]){this.board[t]="";var i=-1;for(var s in this.stars)if(e.row===this.stars[s].row&&e.col===this.stars[s].col){i=s;break}i>-1&&this.stars.splice(i,1)}}},{key:"toggleStar",value:function(e){var t=this.indexToPos(e);if("#"===this.board[e]){this.cancelAStar(t);for(var i in this.tileTypes)"#"===this.board[i]?this.tileTypes[i]=1:this.okToPlaceAStar(this.indexToPos(i))?this.tileTypes[i]=0:this.tileTypes[i]=2;return-1}if(this.okToPlaceAStar(t)){this.placeAStar(t);for(var s in this.tileTypes)"#"===this.board[s]?this.tileTypes[s]=1:this.okToPlaceAStar(this.indexToPos(s))?this.tileTypes[s]=0:this.tileTypes[s]=2;return 1}return 0}},{key:"donePose",value:function(){for(var e in this.tileTypes)this.tileTypes[e]=0}},{key:"startSolve",value:function(){for(var e in this.tileTypes)"#"===this.board[e]&&(this.tileTypes[e]=2)}},{key:"toggleDancer",value:function(e){if(-1===this.picked)""===this.board[e]||"#"===this.board[e]||(this.moved.get(e)?(this.cancelDancerMove(e),this.updateDancerTileTypes()):(this.picked=e,this.updateDancerTileTypes()));else if("#"===this.board[e]||this.moved.get(e));else if(this.insideBoard(this.indexToPos(e)))if(this.manhattanDistance(this.indexToPos(this.picked),this.indexToPos(e))>1);else{""===this.board[e]?(this.numMoved+=1,this.moved.set(e,this.picked)):this.picked===e?(this.numMoved+=1,this.moved.set(e,this.picked)):(this.numMoved+=2,this.moved.set(e,this.picked),this.moved.set(this.picked,e));var t=this.board[e];if(this.board[e]=this.board[this.picked],this.board[this.picked]=t,this.picked=-1,this.updateDancerTileTypes(),this.numMoved===this.c*this.k)return this.gotoNextStep(),this.checkChoreographerFinish()}else;return!1}},{key:"cancelDancerMove",value:function(e){var t=e,i=this.moved.get(t);if(""===this.board[i]){this.numMoved-=1,this.moved.delete(t);var s=this.board[t];this.board[t]=this.board[i],this.board[i]=s}else if(this.moved.get(i)===t){this.numMoved-=2,this.moved.delete(t),this.moved.delete(i);var r=this.board[t];this.board[t]=this.board[i],this.board[i]=r}else{this.cancelDancerMove(i),this.numMoved-=1,this.moved.delete(t);var a=this.board[t];this.board[t]=this.board[i],this.board[i]=a}}},{key:"updateDancerTileTypes",value:function(){for(var e in this.tileTypes)-1===this.picked?this.moved.get(e)?this.tileTypes[e]=3:"#"===this.board[e]?this.tileTypes[e]=2:this.tileTypes[e]=0:this.moved.get(e)?this.tileTypes[e]=2:"#"===this.board[e]?this.tileTypes[e]=2:this.picked===e?this.tileTypes[e]=1:1===this.manhattanDistance(this.indexToPos(this.picked),this.indexToPos(e))?this.tileTypes[e]=0:this.tileTypes[e]=2}},{key:"gotoNextStep",value:function(){this.step+=1,this.numMoved=0,this.moved.clear(),this.updateDancerTileTypes()}},{key:"getBoard",value:function(){return this.board}},{key:"getTileTypes",value:function(){return this.tileTypes}},{key:"getNumStep",value:function(){return this.step}}]),e}(),Z=Y,K={name:"Game",components:{Board:z},data:function(){return{spoiler:"",choreographer:"",aboutDialogVisible:!1,gamePanelVisible:!1,gameStatus:"Initialized",mainBtnText:"GO!",disableMainBtn:!1,gameLevel:0,game:null,step:0,numOfStars:0,maxNumOfStars:0,time:120,timer:null,timerOn:!1,startTime:null,tiles:[],tileTypes:[]}},methods:{openGamePanel:function(){if(""===this.spoiler.trim()||""===this.choreographer.trim())this.$message({message:"Type your names first.",type:"warning"});else{var e=this.getGameParams();this.game=new Z(e.size,e.groups,e.dancers),this.maxNumOfStars=this.game.k,this.refreshBoard(),this.gamePanelVisible=!0}},refreshBoard:function(){this.tileTypes=this.game.getTileTypes();var e=[];for(var t in this.game.getBoard())e.push(this.game.getBoard()[t]);this.tiles=e},handleMainBtn:function(){"Initialized"===this.gameStatus?this.startPose():"Spoiler"===this.gameStatus?0===this.numOfStars?this.$message({message:"You haven't placed any star.",type:"warning"}):(this.stopTimer(),this.donePose()):"SpoilerFinish"===this.gameStatus?(this.resetTimer(),this.startChoreographer()):"Finish"===this.gameStatus&&this.resetGame()},handleCancel:function(e){this.resetGame(),e()},levelFormatTooltip:function(e){return 0===e?"easy":1===e?"intermediate":2===e?"hard":"hell"},vhTOpx:function(e){var t=window,i=document,s=i.documentElement,r=i.getElementsByTagName("body")[0];return(t.innerHeight||s.clientHeight||r.clientHeight)*e/100},tileClicked:function(e){if("Spoiler"===this.gameStatus){var t=this.game.toggleStar(e);this.numOfStars+=t,this.refreshBoard()}else if("Choreographer"===this.gameStatus){var i=this.game.toggleDancer(e);this.step=this.game.getNumStep(),this.refreshBoard(),i&&this.choreoFinish()}},getGameParams:function(){return 0===this.gameLevel?{size:5,groups:2,dancers:2}:1===this.gameLevel?{size:10,groups:2,dancers:4}:2===this.gameLevel?{size:10,groups:4,dancers:4}:{size:15,groups:5,dancers:5}},startPose:function(){this.gameStatus="Spoiler",this.game.generateDancers(),this.refreshBoard(),this.mainBtnText="FINISH",this.startTimer()},donePose:function(){this.gameStatus="SpoilerFinish",this.game.donePose(),this.refreshBoard(),this.mainBtnText="Dance!"},startChoreographer:function(){this.disableMainBtn=!0,this.gameStatus="Choreographer",this.game.startSolve(),this.refreshBoard(),this.startTimer()},choreoFinish:function(){this.stopTimer(),this.gameStatus="Finish",this.disableMainBtn=!1,this.mainBtnText="A new game!"},resetGame:function(){this.gameStatus="Initialized",this.mainBtnText="GO!",this.disableMainBtn=!1,this.step=0,this.numOfStars=0,this.resetTimer();var e=this.getGameParams();this.game=new Z(e.size,e.groups,e.dancers),this.refreshBoard()},resetTimer:function(){this.stopTimer(),this.time=120,this.timer=null,this.timerOn=!1,this.startTime=null},startTimer:function(){var e=this;this.timerOn=!0,this.startTime=Date.now(),this.timer=setInterval(function(){e.time=120-(Date.now()-e.startTime)/1e3,e.time<=0&&e.handleTimeOut()},10)},stopTimer:function(){this.timer&&(clearInterval(this.timer),this.timerOn=!1)},handleTimeOut:function(){"Spoiler"===this.gameStatus?(this.choreoFinish(),this.$message.error("Spoiler timeout."),this.step="Spoiler timeout"):"Choreographer"===this.gameStatus&&(this.choreoFinish(),this.$message.error("Choreographer timeout."),this.step="Choreographer timeout")}}},Q=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"Game"},[s("div",[s("el-container",[s("el-main",[s("img",{staticStyle:{width:"85%",height:"65%"},attrs:{src:i("j73W")}})]),e._v(" "),s("el-main",[s("div",{staticClass:"block"},[s("el-row",[s("el-col",{style:{fontWeight:"bold",color:"#006400"}},[e._v("easy - 5 x 5, 2 color groups, 2 dancers each group")]),e._v(" "),s("el-col",{style:{fontWeight:"bold",color:"#FFD700"}},[e._v("intermediate - 10 x 10, 2 color groups, 4 dancers each group")]),e._v(" "),s("el-col",{style:{fontWeight:"bold",color:"#FFA500"}},[e._v("hard - 10 x 10, 4 color groups, 4 dancers each group")]),e._v(" "),s("el-col",{style:{fontWeight:"bold",color:"#A52A2A"}},[e._v("hell - 15 x 15, 5 color groups, 5 dancers each group")])],1)],1),e._v(" "),s("el-form",[s("el-form-item",[s("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[s("el-col",{attrs:{span:6}},[s("el-slider",{attrs:{max:3,"format-tooltip":e.levelFormatTooltip,"show-stops":""},model:{value:e.gameLevel,callback:function(t){e.gameLevel=t},expression:"gameLevel"}})],1)],1)],1),e._v(" "),s("el-form-item",[s("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[s("el-col",{attrs:{span:6}},[s("el-input",{attrs:{placeholder:"Spoiler"},model:{value:e.spoiler,callback:function(t){e.spoiler=t},expression:"spoiler"}})],1)],1)],1),e._v(" "),s("el-form-item",[s("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[s("el-col",{attrs:{span:6}},[s("el-input",{attrs:{placeholder:"Choreographer"},model:{value:e.choreographer,callback:function(t){e.choreographer=t},expression:"choreographer"}})],1)],1)],1),e._v(" "),s("el-form-item",[s("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[s("el-col",{attrs:{span:6}},[s("el-button",{staticStyle:{width:"20vw","background-color":"#2F4F4F"},attrs:{size:"large",type:"primary"},on:{click:e.openGamePanel}},[e._v("ENTER")])],1)],1)],1)],1)],1),e._v(" "),s("el-footer",[s("el-button",{attrs:{type:"text"},on:{click:function(t){e.aboutDialogVisible=!0}}},[s("h3",{staticStyle:{color:"#2c3e50"}},[e._v("About")])]),e._v(" "),s("h3",{staticStyle:{color:"#00FFFF"}},[e._v("Use a mouse for better experience.")])],1)],1)],1),e._v(" "),s("div",[s("el-dialog",{attrs:{title:"About",visible:e.aboutDialogVisible,width:"40%",height:"70%"},on:{"update:visible":function(t){e.aboutDialogVisible=t}}},[s("div",[e._v("\n        Dancing without the stars 2017.\n      ")]),e._v(" "),s("div",[e._v("License: MIT")])])],1),e._v(" "),s("el-dialog",{attrs:{title:e.gameStatus,visible:e.gamePanelVisible,fullscreen:!0,"before-close":e.handleCancel},on:{"update:visible":function(t){e.gamePanelVisible=t}}},[s("el-container",[s("el-header",[s("el-row",{staticStyle:{"font-weight":"bold"},attrs:{gutter:20}},[s("el-col",{attrs:{span:6}},[s("span",{staticStyle:{color:"#A52A2A"}},[e._v("timer: "+e._s(e.time>0?e.time.toFixed(2):"0.00"))])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("span",{staticStyle:{color:"#D2691E"}},[e._v("stars: "+e._s(e.numOfStars)+"/"+e._s(e.maxNumOfStars))])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("span",{staticStyle:{color:"#556B2F"}},[e._v("step: "+e._s(e.step))])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("el-button",{attrs:{type:"success",size:"large",disabled:e.disableMainBtn,round:""},on:{click:function(t){e.handleMainBtn()}}},[e._v(e._s(e.mainBtnText)+"\n            ")])],1)],1)],1),e._v(" "),s("el-main",[s("Board",{attrs:{boardLength:e.vhTOpx(70),tiles:e.tiles,tileTypes:e.tileTypes,tileClicked:e.tileClicked}})],1)],1)],1)],1)},X=[],ee={render:Q,staticRenderFns:X},te=ee,ie=i("VU/8"),se=ie(K,te,!1,null,null,null),re=se.exports;n.default.use(T.a);var ae=new T.a({routes:[{path:"/",name:"Game",component:re}]});n.default.use(h.a),n.default.config.productionTip=!1,new n.default({el:"#app",router:ae,template:"<App/>",components:{App:g}})},j73W:function(e,t,i){e.exports=i.p+"static/img/1200px-Dancing_without_the_Stars_Title_Logo.svg.b6d8c45.png"},rswz:function(e,t){},tvR6:function(e,t){},xfsC:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.46763d28b9b595ceddc6.js.map