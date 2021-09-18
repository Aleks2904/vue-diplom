<template>
    <aside class="filter">
        <form class="filter__form form" @submit.prevent="submitHandler">
            <sortPrice
                v-model:minPrice="minPrice"
                v-model:maxPrice="maxPrice"
            />

            <select-sort
                :title="'количество товара для показа'"
                :arr="swohGoodsArr"
                v-model:model="productLimit"
            />

            <select-sort
                :title="'Категория'"
                :arr="sortsCategoryArr"
                v-model:model="sortCategory"
            />

            <castom-check-box
                :arr="sortsMaterialsArr"
                :title="'Материал'"
                v-model:value="sortMaterials"
            />

            <castom-check-box
                :arr="sortsSeasonsArr"
                :title="'Коллекция'"
                v-model:value="sortSeasons"
            />

            <button class="filter__submit button button--primery" type="submit">
                Применить
            </button>

            <button
                class="filter__reset button button--second"
                type="button"
                @click.prevent="reset"
            >
                Сбросить
            </button>
        </form>
    </aside>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { sortCategoryArr, sortMaterialsArr, sortSeasonsArr } from "@/api/sort";
import { useStore } from "vuex";
import castomCheckBox from "@/page/home/components/sortBlock/castomCheckBox";
import selectSort from "@/page/home/components/sortBlock/selectSort";
import sortPrice from "@/page/home/components/sortBlock/sortPrice";

export default {
    components: {
        castomCheckBox,
        selectSort,
        sortPrice,
    },
    setup() {
        const store = useStore();

        const productLimit = ref(store.state.product.productShow);

        const minPrice = ref(0);
        const maxPrice = ref(0);

        const sortCategory = ref(0);
        const sortsCategoryArr = ref();

        const sortMaterials = ref({});
        const sortsMaterialsArr = ref();

        const sortSeasons = ref({});
        const sortsSeasonsArr = ref();

        const swohGoodsArr = [
            {
                id: 3,
                title: "3 товара",
            },
            {
                id: 6,
                title: "6 товаров",
            },
            {
                id: 9,
                title: "9 товаров",
            },
            {
                id: 12,
                title: "12 товаров",
            },
            {
                id: 15,
                title: "15 товаров",
            },
            {
                id: 18,
                title: "18 товаров",
            },
        ];

        function changingArr(value) {
            let val = new Object(value);
            for (let key in val) {
                if (!val[key]) {
                    delete val[key];
                }
            }
            val = Object.keys(val).map(Number);
            return val;
        }

        function submitHandler() {
            store.commit("product/setPriceMin", minPrice.value);
            store.commit("product/setPriceMax", maxPrice.value);
            store.commit("product/setSortId", sortCategory.value);
            store.commit(
                "product/setMaterialId",
                changingArr(sortMaterials.value)
            );
            store.commit(
                "product/setCollectionId",
                changingArr(sortSeasons.value)
            );
            store.commit("product/setPage", 1);
            store.dispatch("product/getProducts");
        }

        function reset() {
            minPrice.value = 0;
            maxPrice.value = 0;
            sortCategory.value = 0;
            sortMaterials.value = {};
            sortSeasons.value = {};

            submitHandler();
        }

        watch(productLimit, () => {
            store.dispatch("product/getProducts");
        });

        onMounted(async () => {
            await sortCategoryArr().then((resp) => {
                if (resp.statusText === "OK") {
                    let data = resp.data.items;
                    data.unshift({
                        id: 0,
                        slug: "all goods",
                        title: "Все товары",
                    });
                    sortsCategoryArr.value = data;
                }
            });

            await sortMaterialsArr().then((resp) => {
                if (resp.statusText === "OK") {
                    sortsMaterialsArr.value = resp.data.items;
                }
            });

            await sortSeasonsArr().then((resp) => {
                if (resp.statusText === "OK") {
                    sortsSeasonsArr.value = resp.data.items;
                }
            });
        });

        return {
            productLimit,
            swohGoodsArr,
            minPrice,
            maxPrice,
            sortCategory,
            sortsCategoryArr,
            sortsMaterialsArr,
            sortMaterials,
            sortsSeasonsArr,
            sortSeasons,
            submitHandler,
            reset,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>