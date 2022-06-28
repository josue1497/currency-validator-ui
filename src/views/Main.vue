<template>
    <Default>
        <Card class="flex flex-col w-3/4">
            <template v-slot:title>
                <h1 class="mx-auto text-blue-500 font-bold">Crypto - Fiat Converter</h1>
            </template>
            <template v-slot:body>
                <div class="flex flex-col items-start">
                    <h2 class="font-regular">Bitcoin to Dollar</h2>
                    <h3 class="font-light">(BTC/USD)</h3>
                </div>
            </template>
            <template v-slot:action>
                <div class="w-full flex flex-row justify-around m-5">
                    <CurrencyInput :list="cryptoList" list-message="Coins" :selected="selectedA"
                        :set-selected="setSelectedA" :set-price="calculatorA" :value="priceA"></CurrencyInput>
                    <SwitchHorizontal class="h-5 w-5 text-blue-500 my-auto hover:cursor-pointer" />
                    <CurrencyInput :list="fiatList" list-message="Fiat" :selected="selectedB"
                        :set-selected="setSelectedB" :set-price="calculatorB" :value="priceB">
                    </CurrencyInput>
                </div>
            </template>

        </Card>

    </Default>
</template>
<script>
import Default from '@/components/Layout/Default.vue';
import converter from '../services/converter';
import CurrencyInput from '../components/Converter/CurrencyInput.vue';
import SwitchHorizontal from '../components/Icons/SwitchHorizontal.vue';
import Card from '../components/Layout/Card.vue';

import { mapState, mapActions } from 'vuex'

export default {
    name: 'Main',
    components: {
        Default,
        CurrencyInput,
        SwitchHorizontal, Card
    },
    data: () => ({
        cryptoList: [],
        fiatList: [],
    }),
    async mounted() {
        await this.listCryptoCurrencies();
        await this.listFiatCurrencies();

        this.setDefaults()
    },
    methods: {
        ...mapActions(["setSelectedA", "setSelectedB", "setPriceA", "setPriceB"]),
        async listCryptoCurrencies() {
            const { status, data: { data } } = await converter.listCryptoCurrencies();
            if (status === 200) {
                this.cryptoList = data;
            }
        },
        async listFiatCurrencies() {
            const { status, data: { data } } = await converter.listFiatCurrencies();
            if (status === 200) {
                this.fiatList = data;
            }
        },
        setDefaults() {
            this.setSelectedA(this.cryptoList.find(({ symbol }) => symbol.toUpperCase() === 'BTC'))
            this.setSelectedB(this.fiatList.find(({ symbol }) => symbol.toUpperCase() === 'USD'))
        },
        convertFiat(price) {
            return this.toFixedFive(price * this.selectedB.current_price)
        },
        calculatorA(value) {
            const price = this.toFixedFive(value)
            const priceConverted = this.convertFiat(this.selectedA.current_price)
            this.setPriceA(value)
            this.setPriceB(this.toFixedFive(price * priceConverted))
        },
        calculatorB(value) {
            const price = this.toFixedFive(value)
            const priceConverted = this.convertFiat(this.selectedA.current_price)
            this.setPriceA(this.toFixedFive(price / priceConverted))
            this.setPriceB(value)
        },
        toFixedFive(value) {
            return parseFloat(value).toFixed(5)
        }
    },
    computed: {
        ...mapState({
            selectedA: ({ selectedA }) => selectedA,
            selectedB: ({ selectedB }) => selectedB,
            priceA: ({ priceA }) => priceA,
            priceB: ({ priceB }) => priceB,
        }),
    },
    watch: {
        selectedB() {
            this.setPriceB(this.convertFiat(this.priceB))
        },
    }
}
</script>