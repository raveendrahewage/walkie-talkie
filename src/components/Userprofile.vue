<template>
    <section class="is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-two-fifths box has-background-grey-lighter">
                        <div class="field">
                            Logged in as {{user.uid}}
                        </div>
                        <div class="field">
                            <button class="button is-danger" @click="auth.signOut()">Sign Out</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {auth} from './../firebase'
    export default {
        data(){
            return {
                auth
            }
        },
        props:['user']
    }
</script>

<style>

</style>