<template>
    <div class="flex">
        <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your
            Email</label>
        <button id="dropdown-button" data-dropdown-toggle="dropdown" @focus="openDropdown"
            @blur="closeDropdown"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button">
            <cryptoicon v-if="selected" :symbol="selected.symbol" size="20" class="my-auto" /> &nbsp;
            <span v-if="!selected" class="flex">
                <span class="my-auto">{{ listMessage }}</span>
            </span>
            <span v-else class="flex">
                <span class="my-auto">{{ selected.name }}</span>
            </span>

            <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
        </button>
        <div v-show="show" id="dropdown"
            class="z-10 w-44 relative bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
            :style="{ position: 'absolute', margin: '2.75em 0', overflowY: 'scroll', maxHeight: '10rem' }">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                <li v-for="(item, index) of list" :key="index">
                    <button type="button" @click="setSelected(item)"
                        class="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <cryptoicon :symbol="item.symbol" size="24" /> &nbsp;<span>{{ item.name }}</span>
                    </button>
                </li>

            </ul>
        </div>
        <div class="relative w-full">
            <input :disabled="loading" data-cy="currency-input" type="number" id="search-dropdown" :value="value" @input="input"
                class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Insert currency value" required>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CurrencyInput',
    props: {
        list: { type: Array, default: () => [] },
        listMessage: { type: String, default: '' },
        selected: { type: Object, default: () => ({}) },
        setSelected: { type: Function, default: () => () => { } },
        setPrice: { type: Function, default: () => () => { } },
        value: { type: [String, Number], default: 0 },
        loading: { type: Boolean, default: false },
    },
    data: () => ({
        show: false,
        searchKey: ''
    }),
    methods: {
        timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        openDropdown() {
            this.show = true;
        },
        async closeDropdown() {
            await this.timeout(150)
            this.show = false
            this.searchKey = ''
        },
        input(e) {
            this.setPrice(e.target.value);
            this.$emit('input', e.target);
        },
    },
}
</script>