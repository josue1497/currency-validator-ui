<template>
    <div
        class="p-10 bg-white text-center rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div>
            <slot name="title"></slot>
        </div>
        <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <slot name="body"></slot>
        </div>
        <div
            class="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-300 rounded-lg dark:bg-blue-900 ">
            <slot name="action"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Card',
}
</script>
    