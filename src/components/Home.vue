<template>
    <section>
        <User>
            <template v-slot:user="{user}">
                <div v-if="user">
                    <Chatlist :uid="user.uid"/>
                    <Userprofile :user="user"/>
                </div>
                <Login v-else/>
            </template>
        </User>
    </section>
</template>

<script>
import Login from './Login';
import User from './User'
import Userprofile from './Userprofile'
import Chatlist from './Chatlist'
    export default {
        components:{
            Login,
            User,
            Userprofile,
            Chatlist
        }
    }
</script>

<style>

</style>