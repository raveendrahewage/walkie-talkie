<template>
    <section class="is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-two-fifths box has-background-grey-lighter">
                        <div class="field">
                            <label for="" class="label">Sign in Anonymously</label>
                            <button class="button is-success" @click="auth.signInAnonymously()">Sign In</button>
                        </div>
                        <div class="field"  v-if="newUser">
                            <label for="" class="label">New Account</label>
                            <a @click="newUser=false">Returning User?</a>
                        </div>
                        <div class="field" v-else>
                            <label for="" class="label">Sign In</label>
                            <a @click="newUser=true">New User?</a>
                        </div>
                        <div class="field">
                            <label for="" class="label">Email</label>
                            <div class="control has-icons-left">
                                <input v-model="email" type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="label">Password</label>
                            <div class="control has-icons-left">
                                <input v-model="password" type="password" placeholder="*******" class="input" required>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <button class="button is-info" :class="{'is-loading':loading}" @click="signInOrCreateUser()">{{newUser?'Sign Up' : "Log In"}}</button>
                        </div>
                        <div class="field">
                            <p class="has-text-danger" v-if="errorMessage">{{errorMessage}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {auth} from '../firebase';
    export default {
        data(){
            return{
                auth,
                newUser:false,
                email:'',
                password:'',
                loading:false,
                errorMessage:''
            }
        },
        methods:{
            async signInOrCreateUser(){
                this.loading=true;
                this.errorMessage='';
                try{
                    if(this.newUser){
                        await auth.createUserWithEmailAndPassword(this.email,this.password);
                    }else{
                        await auth.signInWithEmailAndPassword(this.email,this.password);
                    }
                }catch(error){
                    this.errorMessage=error.message;
                }
                this.loading=false;
            }
        } 
    }
</script>

<style>

</style>