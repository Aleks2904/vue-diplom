<template>
    <Header />
    <main class="content container">
        <div class="content__top">
            <div class="content__row">
                <h1 class="content__title">Каталог</h1>
                <span class="content__info">
                    {{
                        allGoods +
                        " " +
                        $filters.declOfNum(allGoods, allDeclination)
                    }}
                </span>
            </div>
        </div>

        <div class="content__catalog">
            <sort-block />
            <block-of-goods />
        </div>
    </main>
    <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import sortBlock from "@/page/home/components/sortBlock/sortBlock";
import blockOfGoods from "@/page/home/components/blockOfGoods";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    components: {
        Header,
        Footer,
        sortBlock,
        blockOfGoods,
    },

    setup() {
        const store = useStore();
        const allDeclination = ["товар", "товара", "товаров"];
        return {
            allGoods: computed(() => store.state.product.allGoods),
            allDeclination,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss" scoped>
</style>