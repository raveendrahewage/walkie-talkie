<template>
    <div class="message" :class="{'from-user':owner}">
        <h4>{{message.text}}</h4>
        <audio v-if="message.audioURL" :src="message.audioURL" controls></audio>
        <hr>
        <span class="sender">from UID {{message.sender}}</span>
        <div class="field">
            <button class="button is-ghost has-text-danger" @click="deleteMessage(message.id)">Delete</button>
        </div>
    </div>
</template>

<script>
import {db} from './../firebase'
    export default {
        props:['message','owner','chatId'],
        methods:{
            deleteMessage(id){
                db.collection("chats").doc(this.chatId).collection('messages').doc(id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            },

        }
    }
</script>

<style scoped>
    .message {
    background: #dddddd;
    color: black;
    margin-left: 10px;
    margin-right: auto;
    border-radius: 5px;
    font-size: 20px;
    padding: 12px;
    display: inline-block;
    }
    .from-user {
    margin-right: 10px;
    margin-left: auto;
    background: #91bbff;
    }
    .sender {
    font-size: 15px;
    }
</style>