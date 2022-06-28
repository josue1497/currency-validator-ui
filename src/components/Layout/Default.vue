<template>
    <div class="flex bg-white dark:bg-gray-600">
        <Navbar></Navbar>
        <Container class="flex justify-center items-center">
            <slot></slot>
        </Container>
    </div>
</template>
<script>
import Navbar from './Navbar.vue';
import Container from './Container.vue';
export default {
    name: 'Default',
    components: {
        Navbar,
        Container,
    }
}
</script>