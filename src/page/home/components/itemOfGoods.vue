<template>
    <li v-for="item in product" :key="item.id" class="catalog__item">
        <router-link
            class="catalog__pic"
            :to="{ name: 'item', params: { id: item.id } }"
        >
            <img
                :src="
                    productColor[item.id].gallery
                        ? productColor[item.id].gallery[0].file.url
                        : 'error'
                "
                :alt="item.title"
            />
        </router-link>

        <h3 class="catalog__title">
            <router-link :to="{ name: 'item', params: { id: item.id } }">
                {{ item.title }}
            </router-link>
        </h3>

        <span class="catalog__price">
            {{ $filters.numberFormat(item.price) }} ₽
        </span>

        <div class="color-bar-container">
            <ul class="colors colors--black">
                <li
                    v-for="color in item.colors"
                    :key="color.id"
                    class="colors__item"
                >
                    <label class="colors__label" :title="color.color.title">
                        <input
                            class="colors__radio sr-only"
                            type="radio"
                            :value="color"
                            v-model.number="productColor[item.id]"
                        />
                        <span
                            class="colors__value"
                            :style="{ backgroundColor: color.color.code }"
                        >
                        </span>
                    </label>
                </li>
            </ul>

            <button class="btn-add-goods" @click.prevent="submit(item)">
                <btn-basket />
            </button>
        </div>
    </li>
</template>

<script>
import { ref } from "vue";
import { computed, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import btnBasket from "@/page/home/components/btnBasket";

export default {
    components: { btnBasket },
    setup() {
        const store = useStore();

        const product = computed(() => {
            return store.state.product.products;
        });

        const productColor = ref({});

        function productColorStart() {
            productColor.value = {};

            product.value.forEach((element) => {
                productColor.value[element.id] = element.colors[0];
            });
        }

        async function submit(item) {
            const goodsArr = {};
            const data = {
                goodsArr: goodsArr,
            };

            await store.dispatch("basket/product", item.id).then((resp) => {
                const product = resp.data;

                data.product = product;
                goodsArr.id = product.id;
                goodsArr.sizeId = product.sizes[0].id;
                goodsArr.quantity = 1;
                goodsArr.colorId = productColor.value[item.id].color.id;
            });

            await store.dispatch("basket/submit", data);
        }

        watch(product, productColorStart);
        onBeforeMount(productColorStart);

        return { product, productColor, submit };
    },
};
</script>

<style lang="scss" scoped>
.color-bar-container {
    display: grid;
    grid-template-columns: 65% 30%;
    justify-content: space-between;
}
.btn-add-goods {
    width: 30px;
    height: 30px;
    margin-left: auto;

    border: none;
    outline: none;
    background: transparent;

    cursor: pointer;
}
</style>