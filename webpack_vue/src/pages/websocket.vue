/*
 * @Author: wuchunyang 
 * @Date: 2019-06-06 16:34:37 
 * @Last Modified by: wuchunyang
 * @Last Modified time: 2019-07-24 15:47:47
 */
<template>
    <div id="chat">
        <div class="chat-room-btn" @click="isOpen">
            <div class="chat-room-content">
                <span v-if="!isShowChatRoom">收起</span>
                <span v-if="isShowChatRoom">展开</span>
                <span :class="{arrow:isShowChatRoom}">></span>
            </div>
        </div>
        <div class="chat" :class="{'chat-room':isShow}" :style="isShow?{}:{width: '0px'}">
            <div class="room-content" :style="isShow?{opacity:1,transition: 'opacity .2s ease-out'}:{opacity:0,transition: 'opacity 1s ease-out'}">
                <vue-scroll ref="vs">
                    <ul v-if="isGetToken">
                        <li ref="avator" class="list_item" v-for="(item,index) in chatDataList" :key="index">
                            <div class="avator" :style="{background: item.userProfile !== ''?'url('+ item.userProfile +')center center' : 'url('+ defaultUserPhoto +')center center', backgroundSize: 'contain', right:isLoginFlg&&(item.userId == userInfo.userId)?'0':'auto' }"></div>
                            <div class="message" 
                                 ref="chatMess" 
                                 :data-id="isLoginFlg&&(item.userId == userInfo.userId)?'1':'2'" 
                                 :style="{
                                     backgroundColor:isLoginFlg&&(item.userId == userInfo.userId)?'#2692FF':'#222',
                                     marginRight: isLoginFlg&&(item.userId == userInfo.userId)?'10px':'',
                                     marginLeft: isLoginFlg&&(item.userId == userInfo.userId)?'':'10px',
                                     left: isLoginFlg&&(item.userId == userInfo.userId)?'': '45px',
                                     right: isLoginFlg&&(item.userId == userInfo.userId)?'45px': ''
                                     }"
                                 >
                                <div class="useName"><span v-html="item.name || item.user.name">大头</span>:</div>
                                <div class="useMessage" v-if="item.content || item.msg" v-html="item.content || item.msg">库里</div>
                                <div class="gift" v-if="item.giftId">
                                    <p class="gift_des">送了{{item.count || item.giftNum}}个{{item.extend&&JSON.parse(item.extend)&&JSON.parse(item.extend).n || item.extendInfo.n}}</p>
                                    <img :src="'http://img.cmvideo.cn:8080/publish/pictures/gift/'+item.giftId+'_dynamic.gif'">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="not_login" v-else>
                        未登录的状态
                    </div>
                </vue-scroll>
            </div>
            <div class="send" v-show="isShow">
                <input maxlength="20" type="text" placeholder="来说两句吧~~" ref="inp" :data-msg="msg" v-model="msg" @keydown.enter="onKeyDown($event)"><span class="sendBtn" @click="readyChat">发送</span>
            </div>
        </div>
    </div>
</template>

<script>
import API from 'api'
import EventBus from 'utils/bus.js'
import { mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
        isShowChatRoom: false,
        isSend: false, // 发言开关（浏览器不支持WebSocket时启用）
        chatItem: 0, // 获取每一条的高度
        isSelfSend: 1, // 是不是自己发送的
        msg: '', // 发送的消息
        isScrollAuto: true, // 消息是否自动滚动到最新
        roomNum: 'room2019061706450075_SR11', // 房间号 room2019070918211115_SR11  room2018110717304515_SR11
        chatRoomDataList:null, // 聊天室初始化数据
        borderRadius: null, // 每一条数据的展现样式
        defaultUserPhoto: require('../../../../assets/index/defaultUserPhoto.png'),
        heartFlg: null, // 心跳开关
        faceImg:{
            surprised: require('@/hotword/hotword_surprised.png'),
            happy: require('@/hotword/hotword_happy.png'),
            angry: require('@/hotword/hotword_angry.png'),
            sadness: require('@/hotword/hotword_sadness.png'),
            contempt: require('@/hotword/hotword_contempt.png'),
            hate: require('@/hotword/hotword_hate.png'),
            neutral: require('@/hotword/hotword_neutral.png'),
            fear: require('@/hotword/hotword_fear.png'),
            doubt: require('@/hotword/hotword_doubt.png')
        }
    }
  },
  props:['data'],
  computed: {
      ...mapState('userdata',['userInfo','isLogin']),
      isShow(){
          return this.isShowChatRoom
      },
      roomId(){
          return this.data&&this.data.roomId
      },
      chatDataList(){
          if(this.chatRoomDataList){
            this.$nextTick(()=>{
                this.setListStyle()
            })
            this.chatRoomDataList.map(item=>{
                this.handlerAvator(item)
                if(item.userId === this.userInfo.userId){
                    item.isSelf = 1
                }
                if(item.isHotwords){
                    if(item.content){
                        item.content = this.imgFormat(item.content)
                    }else{
                        item.content = this.imgFormat(item.msg)
                    }
                }
            })
          }
            return this.chatRoomDataList
      },
      isLoginFlg(){
        this.$nextTick(()=>{
             this.setListStyle()
        })
        return this.isLogin
      },
      isGetToken(){
        if(!this.isSend){
            if(this.isLogin){
                this.websochetInit()
            }else{
                if(this.heartFlg){
                    clearInterval(this.heartFlg)
                }
            }
        }
        return this.isLogin
      }
  },
  created () {
    this.initChatRoomData()
  },
  mounted () {
    this.scrollTo()
    // setInterval(()=>{
    //     console.log(WebSocket.readyState)
    // },800)
  },
  methods: {
    isOpen(){
        this.isShowChatRoom = !this.isShowChatRoom
        EventBus.$emit('isShowChatRoom',this.isShowChatRoom)
    },
    goLogin(){
        EventBus.$emit('goLogin')
    },
    sendMsg(){
        this.isSend
        if(this.isSend){this.$Toast('浏览器不支持 WebSocket!');return}
        if(!this.isLogin){this.goLogin();return}
        if(!this.msg){this.$Toast('请输入内容~'); return}
        this.send(this.msg)
        var newMsg = {
                content: this.msg,
                userProfile: this.userInfo.picture,
                userId: this.userInfo.userId,
                name: this.userInfo.sname,
                isSelf: 1,
                time: new Date().getTime()
            }
        if(newMsg){
            this.chatRoomDataList.push(newMsg)
        }
        this.msg = ''
    },
    scrollTo(el,index) {
        this.$refs['vs'].scrollTo({
            y: '100%'
        })
    },
    onKeyDown (event) {
        if (!event) event = window.event;
        if ((event.keyCode || event.which) == 13) {
            event.preventDefault() // 阻止浏览器默认换行操作
            if(this.isLogin){
                this.sendMsg()
            }else{
                this.goLogin()
            }
        }
    },
    // 初始化聊天是数据
    async initChatRoomData(){
        try {
            const res = await this.$fetch(`${API.GET_MSG}${this.roomNum}`)
            if(res.code == 200){
                this.chatRoomDataList = res.body
            }
        } catch (error) {}
    },
    websochetInit(){
        if(this.isLogin){
            this.getToken()
        }
    },
    readyChat(){
        let this_ = this;
        if(WebSocket.readyState === 1){ // 连接成功，可以发送消息
            this_.sendMsg()
        }else if(WebSocket.readyState === 0){ // 正在连接   300ms 之后发送消息
            this.$Toast("正在努力连接中...");
            setTimeout(function(){
                this_.sendMsg()
            },300)
        }else{ // 连接未创建或者创建失败，则重新创建连接，并设置500ms后发送信息
            this.$Toast("短线重新连接中...");
            this_.websochetInit();
            setTimeout(function(){
                this_.sendMsg()
            },500)
        }
    },
    // 进入聊天室
    async getInChatRoom(){
        if(!this.isLogin)return
        console.log(this.userInfo)
        let data = {
            userId: this.userInfo&&this.userInfo.userId,
            roomNo: this.roomNum,
            userName: this.userInfo&&this.userInfo.sname,
            type:102,
            level:105
        }
        try {
            const res = await this.$fetch(API.GET_IN_ROOM,data)
            const { ret, wsUrl } = res
            if(ret == 'SUCC'){
                console.log(res)
            }
        } catch (error) {}
    },
    // 获取推送token
    async getToken(){
        let data = {
            uuid: '98e1a1bf-cefd-443b-9702-b8107c4da26e',
        }
        try {
            const res = await this.$fetch(API.GET_TOKEN,data)
            if(res.ret == "SUCC"){
                const {wsToken, wsUrl } = res
                this.createWebsocket({wsToken,wsUrl})
            }
        } catch (error) {}
    },
    // 创建一个websocket的
    createWebsocket(data){
        var _this = this
        if('WebSocket' in window){
            if(typeof WebSocket === 'object'){
                return 
            }
            // 打开一个 web socket
            WebSocket = new WebSocket(`${data.wsUrl}`);
            WebSocket.onopen = function(){
                _this.register(data)
                _this.getInChatRoom()
                _this.addPushGroup(data)
                _this.$Toast("连接成功，可以聊天了~");
                // console.log("数据发送中...");
            };          
            WebSocket.onmessage = function (evt){ 
                var received_msg = JSON.parse(evt.data);
                if(received_msg.msg){
                    if(received_msg.msgType == 0){
                        let mesg = received_msg.msg
                        let res = mesg.msg || mesg.gift
                        if(res){
                            if(res[0].user.id !== _this.userInfo.userId){
                                _this.chatRoomDataList.push(...res)
                            }
                        }
                    }
                }
            };
            WebSocket.onclose = function(){ 
                // 关闭 websocket
                alert("连接已关闭..."); 
            };
            _this.connectFail()

        }else{
            _this.isSend = true
            _this.$Toast("您的浏览器不支持 WebSocket!");
        }
    },
    // websocket 连接失败
    connectFail(){
       WebSocket.onerror = function() {
            this.$Toast("WebSocket连接发生错误!")
        }
    },
    // 注册
    register(data){
        var paramJson = {
            wsToken: data.wsToken,
            type: 1,
            userType: 1,
            param: {
                uuid: "98e1a1bf-cefd-443b-9702-b8107c4da26e",
                uToken: this.userInfo&&this.userInfo.userToken||"",
                uid: this.userInfo&&this.userInfo.userId||"",
                gtCid: "",
                phoneInfo: {
                    ip: "",
                    imei: "",
                    phoneNumber: "",
                    phoneModel: "",
                    network: "",
                    channel: "",
                    version: "",
                    plat: "",
                    optType: "0"
                }
            }
        }
         WebSocket.send(JSON.stringify(paramJson))
    },
    // 加入推送组
    addPushGroup(data){
        var wsData = {
            domainName: 'PushSvrChat',
            groupId: this.roomNum,
            wsToken: data.wsToken,
            type: 6
        }
        WebSocket.send(JSON.stringify(wsData));
        // 保持心跳
        this.heartFlg = setInterval(()=>{
            this.keepHeart()
        },60000)
    },
    // 发言
    async send(datastr){
        var data = {
            // isHotwords: false,
            roomNo: this.roomNum,
            msg: datastr || '',
            userId: this.userInfo&&this.userInfo.userId,
            userProfile:JSON.stringify({avator:this.userInfo&&this.userInfo.picture}),
            extend: JSON.stringify({f:1})
        }
        try {
            const res = await this.$post(API.SPEAK,data)
        } catch (error) {}
    },
    // 保持心跳 1分钟执行一次 {"type":8,"ts":1562577763013}
    keepHeart(){
        var temp = {
            type: 8,
            ts: new Date().getTime()
        }
        WebSocket&&WebSocket.send(JSON.stringify(temp));
    },
    // 处理消息的样式
    setListStyle(){
        if(this.$refs.chatMess){
            this.$refs.chatMess.forEach(el => {
                let height = el.offsetHeight;
                if(el.getAttribute('data-id') === '1'){
                    if(height >= 74){
                        height += 10;
                        el.style.borderRadius = '35px 35px 0 35px';
                    }else{
                        el.style.borderRadius = `${height}px ${height}px 0 ${height}px`;
                    }
                }else{
                    if(height >= 74){
                        height += 10;
                        el.style.borderRadius = '35px 35px 35px 0';
                    }else{
                        el.style.borderRadius = `${height}px ${height}px ${height}px 0`;
                    }
                }
                $(el).parent().height(height)
            })
        }
    },
    // 处理头像
    handlerAvator(item){
        if(item.isSelf !== 1){ // 过滤出不是自己发的
            if(item.userProfile !== "{}" || item.userProfile !== "" ){ // 拉取的消息列表 和 自己发的 言
                try{
                    var temp = item.userProfile?JSON.parse(item.userProfile):{}
                    if(temp.avatar){
                        item.userProfile = `http://img.cmvideo.cn:8080/publish/voms2/uic_service/picture${temp.avatar}`
                    }else{
                        item.userProfile = ''
                        if(this.isLogin&&item.userId === this.userInfo.userId){
                            item.userProfile = this.userInfo.picture
                        }
                    }
                }catch(err){
                    if(this.isLogin&&item.userId === this.userInfo.userId){
                        item.userProfile = this.userInfo.picture
                    }
                }
            }
            if(item.user){ // 长连接收到的消息
                if(item.user.profile&&item.user.profile.avatar){
                    item.userProfile = `http://img.cmvideo.cn:8080/publish/voms2/uic_service/picture${item.user.profile.avatar}`
                }
            }
        }
    },
    // 表情处理
    imgFormat(str){
      let format ={'[开心]':`<img src="${this.faceImg.happy}" />`,
                 '[生气]':`<img src="${this.faceImg.angry}" />`,
                 '[蔑视]':`<img src="${this.faceImg.contempt}" />`,
                 '[悲伤]':`<img src="${this.faceImg.sadness}" />`,
                 '[厌恶]':`<img src="${this.faceImg.hate}" />`,
                 '[中立]':`<img src="${this.faceImg.neutral}" />`,
                 '[惊喜]':`<img src="${this.faceImg.surprised}" />`,
                 '[害怕]':`<img src="${this.faceImg.fear}" />`,
                 '[疑惑]':`<img src="${this.faceImg.doubt}" />`,
                }
      let reg = /\[.+?\]/g; 
      let formatstr = str; 
      formatstr = formatstr.replace(reg,function(a,b){ 
        return format[a]; 
      }); 
      return formatstr
    },
  },
  updated () {
    if(this.isScrollAuto){
        this.scrollTo()
    }
    this.$nextTick(()=>{
        this.setListStyle()
    })
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import url('../../../../css/common/threeSize.less');
@import "../../../../css/group/sports/chatRoom.less";
</style>