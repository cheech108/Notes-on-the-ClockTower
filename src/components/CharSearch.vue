<script setup>
    import { ref, onMounted } from 'vue'
    import { inject } from 'vue'

    // Inject the global $cookies instance
    const $cookies = inject('$cookies');

    const roles = ref([]);
    const towns = ref([]);
    const outsiders = ref([]);
    const minions = ref([]);
    const demons = ref([]);
    const travellers = ref([]);
    const loading = ref(true)
    const error = ref('');
    async function repopulate() {
        towns.value = [];
        outsiders.value = [];
        minions.value = [];
        demons.value = [];
        travellers = [];
        const chars = roles.value;
        for (const itemNum in chars){
            const item = chars[itemNum];
            if (item.team == "townsfolk"){
                towns.value.push(item)
            }
            if (item.team == "outsider"){
                outsiders.value.push(item)
            }
            if (item.team == "minion"){
                minions.value.push(item)
            }
            if (item.team == "demon"){
                demons.value.push(item)
            }
            if (item.team == "traveller"){
                travellers.value.push(item)
            }
        }
    }
    async function fetchData() {
        try {
            const response = await fetch('https://release.botc.app/resources/data/roles.json')
            
            // fetch() does not throw on HTTP errors (like 404 or 500), so check manually
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const chars = await response.json();
            for (const itemNum in chars){
                const item = chars[itemNum];
                if (item.team == "townsfolk"){
                    towns.value.push(item)
                }
                if (item.team == "outsider"){
                    outsiders.value.push(item)
                }
                if (item.team == "minion"){
                    minions.value.push(item)
                }
                if (item.team == "demon"){
                    demons.value.push(item)
                }
                if (item.team == "traveller"){
                    travellers.value.push(item)
                }
            }
            roles.value = chars;
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
    onMounted(() => {
        fetchData()
    })
</script>

<template>
    <h2>Towns</h2>
    <hr />
    <p v-if="loading">Loading data...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-if="!loading" class="grid grid-cols-4 lg:grid-cols-8 justify-items-center">
        <li v-for="town in towns" :key="town.id">
            <img :src="`https://release.botc.app/resources/characters/${town.edition}/${town.id}_g.webp`" class="w-25">
            <p>{{ town.name }}</p>
        </li>
    </ul>
    <h2>Outsiders</h2>
    <hr />
    <p v-if="loading">Loading data...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-if="!loading" class="grid grid-cols-4 lg:grid-cols-8 justify-items-center">
        <li v-for="town in outsiders" :key="town.id">
            <img :src="`https://release.botc.app/resources/characters/${town.edition}/${town.id}_g.webp`" class="w-25">
            <p>{{ town.name }}</p>
        </li>
    </ul>
    <h2>Minions</h2>
    <hr />
    <p v-if="loading">Loading data...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-if="!loading" class="grid grid-cols-4 lg:grid-cols-8 justify-items-center">
        <li v-for="town in minions" :key="town.id">
            <img :src="`https://release.botc.app/resources/characters/${town.edition}/${town.id}_e.webp`" class="w-25">
            <p>{{ town.name }}</p>
        </li>
    </ul>
    <h2>Demons</h2>
    <hr />
    <p v-if="loading">Loading data...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-if="!loading" class="grid grid-cols-4 lg:grid-cols-8 justify-items-center">
        <li v-for="town in demons" :key="town.id">
            <img :src="`https://release.botc.app/resources/characters/${town.edition}/${town.id}_e.webp`" class="w-25">
            <p>{{ town.name }}</p>
        </li>
    </ul>
</template>