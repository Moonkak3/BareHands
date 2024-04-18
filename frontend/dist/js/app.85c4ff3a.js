(function(){"use strict";var t={2922:function(t,e,n){var i=n(5130),s=n(9005),r=n(6768);function o(t,e,n,i,s,o){const a=(0,r.g2)("HandCursor"),c=(0,r.g2)("LiveWebStream"),d=(0,r.g2)("DrawingCanvas");return(0,r.uX)(),(0,r.CE)(r.FK,null,[(0,r.bF)(a),(0,r.bF)(c,{msg:"Welcome to Your Vue.js App"}),(0,r.bF)(d)],64)}var a=n(4232);const c={class:"container"},d={class:"live-stream-container"},u={ref:"videoElement",autoplay:""},h={ref:"canvasElement"};function l(t,e,n,i,s,o){return(0,r.uX)(),(0,r.CE)("div",{class:"card",style:(0,a.Tr)({top:s.divTop+"px",left:s.divLeft+"px"}),onMousedown:e[0]||(e[0]=(...t)=>o.startDragging&&o.startDragging(...t)),onMousemove:e[1]||(e[1]=(...t)=>o.dragging&&o.dragging(...t)),onMouseup:e[2]||(e[2]=(...t)=>o.stopDragging&&o.stopDragging(...t))},[(0,r.Lk)("div",c,[(0,r.Lk)("div",d,[(0,r.Lk)("video",u,null,512),(0,r.Lk)("canvas",h,null,512)])]),(0,r.Lk)("h1",null,(0,a.v_)(s.gesture),1)],36)}var g=n(9395),v=n(8897),m=n(7861);class f{constructor(t,e,n=0){this.x=t,this.y=e,this.z=n}}function p(t,e,n=!0){let i=Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2);return n&&(i=Math.sqrt(i)),i}function w(t,e,n=!0){let i=Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2);return n&&(i=Math.sqrt(i)),i}function b(t,e){return t.x*e.x+t.y*e.y}function y(t,e,n=.5){return new f(t.x*n+e.x*(1-n),t.y*n+e.y*(1-n))}function k(t,e,n){let i=new f(e.x-t.x,e.y-t.y),s=new f(e.x-n.x,e.y-n.y),r=new f(n.x-t.x,n.y-t.y),o=p(t,n,!1);return!(Math.abs(b(i,r))>o||Math.abs(b(s,r))>o)}function x(t){const e=Math.max(p(t[5],t[17]),p(t[17],t[0]),p(t[0],t[1]),p(t[1],t[5]));if(k(t[0],t[12],t[10])&&k(t[0],t[16],t[14])&&k(t[0],t[20],t[18])){let n=w(t[4],t[8]),i=w(t[3],t[7]);return n<i&&n<e/4?"click":"unclick"}return"open"}function D(t){const e=y(t[4],t[8],.75),n=y(t[3],t[6],.5),i=y(e,n,.25);return[i.x,i.y]}var L={data(){return{handLandmarker:void 0,webcamRunning:!0,lastVideoTime:-1,results:void 0,gesture:void 0,history:[],isDown:!1,isDragging:!1,startX:0,startY:0,divTop:0,divLeft:0}},mounted(){this.enableWebcam(),this.createHandLandmarker()},methods:{async createHandLandmarker(){try{const t=await g.Ps.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");this.handLandmarker=await g.Vb.createFromOptions(t,{baseOptions:{modelAssetPath:"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",delegate:"GPU"},runningMode:"VIDEO",numHands:2}),console.log(this.handLandmarker),console.log("HandLandmarker initialized.")}catch(t){console.error("Error initializing HandLandmarker:",t)}},async enableWebcam(){const t=this.$refs.videoElement,e={video:{aspectRatio:16/9}};if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)try{const n=await navigator.mediaDevices.getUserMedia(e);t.srcObject=n,t.addEventListener("loadeddata",this.predictWebcam)}catch(n){console.error("Error accessing webcam:",n)}else console.error("getUserMedia() is not supported by your browser")},async predictWebcam(){if(!this.handLandmarker)return void console.log("HandLandmarker is not initialized yet.");const t=this.$refs.videoElement,e=this.$refs.canvasElement,n=e.getContext("2d");e.width=t.clientWidth,e.height=t.clientHeight,this.lastVideoTime!==t.currentTime&&(this.lastVideoTime=t.currentTime,this.results=await this.handLandmarker.detectForVideo(t,performance.now())),n.clearRect(0,0,e.width,e.height),this.results&&this.results.landmarks&&this.interpretLandMarks(this.results.landmarks,n),this.webcamRunning&&window.requestAnimationFrame(this.predictWebcam)},interpretLandMarks(t,e){for(const n of t){const t=n.map((t=>({...t,x:1-t.x})));(0,v.drawConnectors)(e,t,m.HAND_CONNECTIONS,{color:"#00FF00",lineWidth:2}),(0,v.drawLandmarks)(e,t,{color:"#FF0000",lineWidth:.5}),this.gesture=x(t),this.history.unshift(this.gesture);while(this.history.length>10)this.history.pop();let i=null;switch(this.gesture){case"click":i="mousedown";break;case"unclick":i="mouseup";break;case"open":i="mouseup";break;default:break}let[s,r]=D(t);s*=window.innerWidth,r*=window.innerHeight;let o=document.elementFromPoint(s,r)??document.body,a={bubbles:!0,cancelable:!0,clientX:s,clientY:r};const c=new MouseEvent("mousemove",a);if(o.dispatchEvent(c),this.isDown&&"mouseup"===i||!this.isDown&&"mousedown"===i){this.isDown=!this.isDown;const t=new MouseEvent(i,a);if(o.dispatchEvent(t),"mouseup"===i){const t=new MouseEvent("click",a);o.dispatchEvent(t)}}}},startDragging(t){this.isDragging=!0,this.startX=t.clientX-this.divLeft,this.startY=t.clientY-this.divTop,document.body.addEventListener("mousemove",this.dragging),document.body.addEventListener("mouseup",this.stopDragging)},dragging(t){this.isDragging&&(this.divLeft=t.clientX-this.startX,this.divTop=t.clientY-this.startY)},stopDragging(){this.isDragging=!1,document.body.removeEventListener("mousemove",this.dragging),document.body.removeEventListener("mouseup",this.stopDragging)}}},M=n(1241);const E=(0,M.A)(L,[["render",l],["__scopeId","data-v-0ad305fa"]]);var T=E;const O={class:"cursor"};function X(t,e,n,i,s,o){return(0,r.uX)(),(0,r.CE)("div",O)}var C={name:"HandCursor",mounted(){document.addEventListener("mousemove",this.handleMouseMove)},beforeUnmount(){document.removeEventListener("mousemove",this.handleMouseMove)},methods:{handleMouseMove(t){const e=document.querySelector(".cursor");e.style.left=t.clientX+"px",e.style.top=t.clientY+"px"}}};const W=(0,M.A)(C,[["render",X],["__scopeId","data-v-6f26dd2d"]]);var Y=W;function F(t,e,n,i,s,o){return(0,r.uX)(),(0,r.CE)("div",null,[(0,r.Lk)("canvas",{ref:"canvas",onMousedown:e[0]||(e[0]=(...t)=>o.startDrawing&&o.startDrawing(...t)),onMousemove:e[1]||(e[1]=(...t)=>o.draw&&o.draw(...t)),onMouseup:e[2]||(e[2]=(...t)=>o.stopDrawing&&o.stopDrawing(...t))},null,544)])}var H={data(){return{isDrawing:!1,context:null,lastX:0,lastY:0}},mounted(){this.$refs.canvas.width=window.innerWidth,this.$refs.canvas.height=window.innerHeight,this.context=this.$refs.canvas.getContext("2d")},methods:{startDrawing(t){this.isDrawing=!0,this.lastX=t.clientX-this.$refs.canvas.offsetLeft,this.lastY=t.clientY-this.$refs.canvas.offsetTop},draw(t){if(!this.isDrawing)return;console.log("darwing");const e=t.clientX-this.$refs.canvas.offsetLeft,n=t.clientY-this.$refs.canvas.offsetTop;this.context.beginPath(),this.context.moveTo(this.lastX,this.lastY),this.context.lineTo(e,n),this.context.strokeStyle="red",this.context.lineWidth=5,this.context.stroke(),this.lastX=e,this.lastY=n},stopDrawing(){this.isDrawing=!1}}};const _=(0,M.A)(H,[["render",F],["__scopeId","data-v-19c1b674"]]);var $=_,j={name:"App",components:{LiveWebStream:T,HandCursor:Y,DrawingCanvas:$}};const A=(0,M.A)(j,[["render",o]]);var V=A;const P=(0,s.Ey)(),z=(0,i.Ef)(V);z.use(P),z.mount("#app")}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,i,s,r){if(!i){var o=1/0;for(u=0;u<t.length;u++){i=t[u][0],s=t[u][1],r=t[u][2];for(var a=!0,c=0;c<i.length;c++)(!1&r||o>=r)&&Object.keys(n.O).every((function(t){return n.O[t](i[c])}))?i.splice(c--,1):(a=!1,r<o&&(o=r));if(a){t.splice(u--,1);var d=s();void 0!==d&&(e=d)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[i,s,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var s,r,o=i[0],a=i[1],c=i[2],d=0;if(o.some((function(e){return 0!==t[e]}))){for(s in a)n.o(a,s)&&(n.m[s]=a[s]);if(c)var u=c(n)}for(e&&e(i);d<o.length;d++)r=o[d],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(u)},i=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[504],(function(){return n(2922)}));i=n.O(i)})();
//# sourceMappingURL=app.85c4ff3a.js.map