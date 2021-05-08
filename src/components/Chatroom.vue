<template>
    <section class="is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-full box has-background-grey-lighter">
                        <div class="field">
                            <h2>ChatRoom - {{chatId}}</h2>
                        </div>
                        <div class="field is-justify-content-right">
                            <button class="button is-small" @click="scrollToEnd()">Bottom</button>
                        </div>
                        <div class="field">
                            <User>
                                <template #user="{user}">
                                    <div id="chat-field" class="field chat-box-overflow">
                                        <ul>
                                            <li v-for="message in messages" :key="message.id">
                                                <Chatmessage :message="message" :chatId="chatId" :owner="user.uid===message.sender"/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="field is-four-fifths">
                                        <input v-model="newMessageText" type="text" class="input">
                                    </div> 
                                    <hr>
                                    <div class="feild">
                                        <button :disabled="recorder" @click="record()" class="button is-info mx-3">Voice</button>
                                        <button :disabled="!recorder" class="button is-danger mx-3" @click="stop()">Stop</button>
                                        <button class="button is-success mx-3" :disabled="(!newMessageText && !newAudio)|| loading" @click="addMessage(user.uid)">Send</button>
                                    </div>
                                    <div v-if="newAudio" class="field my-3">
                                        <audio :src="newAudioURL" controls></audio>
                                        <button class="button is-danger mx-3 mt-2" @click="newAudio=null">&#10006;</button>
                                    </div>
                                </template>
                            </User>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import User from './User'
import Chatmessage from './Chatmessage'
import {db,storage} from './../firebase'
    export default {
        components:{
            User,
            Chatmessage
        },
        data(){
            return {
                newMessageText:'',
                loading:false,
                voice:false,
                messages:[],
                newAudio:null,
                recorder:null,
            }
        },
        computed:{
            chatId(){
                return this.$route.params.id;
            },
            messagesCollection(){
                return db.doc('chats/'+this.chatId).collection('messages');
            },
            newAudioURL(){
                return URL.createObjectURL(this.newAudio);
            }
        },
        firestore(){
            return {
                messages:this.messagesCollection.orderBy('createdAt').limitToLast(10)
            }
        },
        methods:{
            async addMessage(uid){
                this.loading=true;
                let audioURL=null;

                const {id:messageId}=this.messagesCollection.doc();

                if(this.newAudio){
                    const storageRef=storage.ref('chats').child(this.chatId).child(messageId+'.wav');
                    await storageRef.put(this.newAudio);
                    audioURL=await storageRef.getDownloadURL();
                }

                await this.messagesCollection.doc(messageId).set({
                    text:this.newMessageText,
                    sender:uid,
                    createdAt:Date.now(),
                    audioURL
                });

                this.loading=false;
                this.newMessageText='';
                this.voice=false;
                this.newAudio=null;
            },
            async record(){
                this.newAudio=null;

                const stream=await navigator.mediaDevices.getUserMedia({
                    audio:true,
                    video:false
                });

                const options={mimeType:"audio/webm"};
                const recordedChunks=[];
                this.recorder=new MediaRecorder(stream,options);

                this.recorder.addEventListener("dataavailable",e=>{
                    if(e.data.size>0){
                        recordedChunks.push(e.data);
                    }
                });

                this.recorder.addEventListener("stop",()=>{
                    this.newAudio=new Blob(recordedChunks);
                    console.log(this.newAudio);
                });
                this.recorder.start();
            },
            async stop(){
                this.recorder.stop();
                this.recorder=null;
            },
            async scrollToEnd() {
                var container = document.getElementById("chat-field");
                var scrollHeight = container.scrollHeight;
                container.scrollTop = scrollHeight;
            },
        }
    }
</script>

<style scoped>
    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 0;
    }

    li{
        display: flex;
        margin-top: 10px;
    }

    .chat-box-overflow{
        background: #efefef;
        height: 500px;
        overflow: auto;
    }
</style>