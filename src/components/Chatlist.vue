<template>
    <section class="is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-two-fifths box has-background-grey-lighter">
                        <div class="field" v-for="chat in chats" :key="chat.id">
                                <button class="button is-light is-centered my-1">
                                    <router-link :to="{name:'chat',params:{id:chat.id}}">{{chat.id}}</router-link>
                                </button>
                                <button class="button is-danger is-centered my-1 mx-1" @click="deleteChatroom(chat.id)">Delete</button>
                                <button class="button is-info my-1 mx-1" @click="getLink(chat.id)">Get Link</button>
                                <input class="input" v-if="chatLink && chatId==chat.id" type="text" v-model="chatLink" id="link" @click="copyLink()">
                        </div>
                        <div class="field">
                            <button class="button is-warning" @click="createChatRoom()">Create New Chat Room</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {db} from './../firebase'
    export default {
        data(){
            return {
                chats:[],
                chatLink:'',
                chatId:''
            }
        },
        firestore(){
            return {
                chats : db.collection('chats').where('owner','==',this.uid)
            }
        },
        methods:{
            async createChatRoom(){
                    await db.collection('chats').add({
                    createdAt:Date.now(),
                    owner:this.uid,
                    members:[this.uid]
                });
            },
            async deleteChatroom(chatId){
                db.collection("chats").doc(chatId).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            },
            async getLink(id){
                this.chatId=id;
                this.chatLink='https://walki-talkie-1729a.web.app/#/chats/'+id;
            },
            async copyLink(){
                var copyText = document.getElementById("link");
                copyText.select();
                copyText.setSelectionRange(0, 99999)
                document.execCommand("copy");
                alert("Copied the text: " + copyText.value);
            }
        },
        props:['uid']
        
    }
</script>

<style>

</style>