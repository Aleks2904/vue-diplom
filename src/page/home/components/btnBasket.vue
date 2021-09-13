<template>
    <div class="btn-add-goods-icon"></div>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.btn-add-goods-icon {
    width: 30px;
    height: 30px;
    margin-left: auto;

    background: url("/img/svg/basket.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    border: none;
    outline: none;

    cursor: pointer;

    opacity: 0.5;
    transition: opacity 0.3s;
}

.btn-add-goods:hover > .btn-add-goods-icon,
.btn-add-goods:focus > .btn-add-goods-icon {
    opacity: 1;
    transition: opacity 0.3s;
}
</style>