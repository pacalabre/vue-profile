<template>
    <section>
        <img :src='picture'/>
        <p>{{ name }}</p>
        <h2>Background:</h2>
        <p>{{ bio }}<p/>
    </section>
</template>

<script>
export default {
    props: {
        name: String,
        picture: String,
        bio: String,
    },
}
</script>

<style scoped>

</style>