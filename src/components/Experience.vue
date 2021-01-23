<template>
    <section>
        <ul>
            <li v-for="(role, index) in experience" :key="index">
                {{role.company}}
                {{role.title}}
                {{role.description}}
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        experience: Array
    },
}
</script>

<style scoped>

</style>