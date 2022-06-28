<template>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 fixed w-full">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <a href="#" class="flex items-center">
                <Logo class="h-5 w-5 text-blue-500 mx-2" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Josue Martinez</span>
            </a>
            <div class="flex items-center md:order-2">
                <span v-if="serviceOn"
                    class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Conectado</span>
                <span v-else
                    class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Sin
                    servicio</span>
                <label for="toggleB" class="flex items-center cursor-pointer ml-2">
                    <div class="relative">
                        <input type="checkbox" id="toggleB" class="sr-only" v-model="darkMode">
                        <div
                            class="block dark:bg-white bg-gray-800 border border-gray-800 dark:border-white  w-16 h-9 rounded-full">
                        </div>
                        <div
                            class="dot absolute left-1 top-1 bg-white w-7 h-7 rounded-full transition flex justify-center items-center">
                            <div v-if="!darkMode">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <div v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#fff">
                                    <path fill-rule="evenodd"
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </label>

            </div>
        </div>
    </nav>
</template>

<script>
import Logo from '../Icons/Logo.vue';
import { createConnection } from '../../services/WebSocket';

export default {
    components: { Logo },
    data: () => ({
        darkMode: false,
        connection: null,
        serviceOn: false,
        interval: null
    }),
    async created() {
        const vm = this;
        this.connection = await createConnection();
        this.connection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            vm.serviceOn = data.connected;
        }
        this.connection.onopen = () => console.log('connection stablished');
        this.connection.onclose = () => console.log('connection closed');
        this.connection.onerror = (error) => console.log('connection error', error.message);

        this.interval = setInterval(() => {
            vm.sendMessage();
        }, 5000);
    },
    methods: {
        sendMessage(message = 'ping') {
            this.connection.send(message);
        }
    },
    watch: {
        darkMode(val) {
            document.body.classList.toggle('dark', val);
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>

<style lang="css" scoped>
input:checked~.dot {
    transform: translateX(100%);
    background-color: #232531;
}
</style>