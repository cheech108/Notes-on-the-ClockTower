<script setup>
import { ref,watch } from 'vue'
import { inject } from 'vue'

// Inject the global $cookies instance
const $cookies = inject('$cookies');

const players = ref($cookies.get('players')||[]);
let id = $cookies.get("id")||0;
const names = ref('');
let empty = ref(players.value.length == 0);

watch(players,(v)=>{
  $cookies.set('players',v,'1D')
  empty = (players.value.length == 0);
})

function writePlayers(){
  const lines = names.value.split(/\r?\n/);
  players.value = [];
  names.value = '';
  for (const name in lines){
    players.value.push({
      "id":id++,
      "name":lines[name],
      "main_role":[],
      "predicted_roles":[]
    })
  }
  $cookies.set('id',id,'1D')
}

function addPlayer(){
  players.value.push({
    "id":id++,
    "name":names.value,
    "main_role":[],
    "predicted_roles":[]
  })
  names.value = '';
  $cookies.set('id',id,'1D')
}

function removePlayer(player){
  players.value = players.value.filter((p) => p !== player)
}

function clearPlayers(){
  players.value = []
}

</script>

<template>
  <section v-if="empty">
    <textarea v-model="names"  placeholder="Type names here"></textarea>
    <button @click="writePlayers">subbmit</button>
  </section>
  <ul>
    <li v-for="player in players" :key="player.id">
      {{ player.name }}
      <button @click="removePlayer(player)">X</button>
    </li>
  </ul>
  <div class="flex">
    <input v-if="!empty" v-model="names" @keyup.enter="addPlayer">
    <button v-if="!empty" @click="clearPlayers">clear All</button>
  </div>
</template>
