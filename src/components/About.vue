<template>
    <section class="bio-sidebar">
        <img class="bio-sidebar-img" :src='picture'/>
        <p class="bio-sidebar-name">{{ name }}</p>
        <h2 class="bio-sidebar-h2">Background:</h2>
        <p class="bio-sidebar-bio">{{ bio }}<p/>
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

    .bio-sidebar {
        display: flex;
        background: #00173d;
        flex-direction: column;
        height: 100vh;
        overflow: scroll;
    }

    .bio-sidebar-img {
        height: 250px;
        width: 250px;
        border-radius: 50%;
        margin: auto;
        padding: 20px 0;
    }

    .bio-sidebar-name, .bio-sidebar-h2, .bio-sidebar-bio {
        color: white;
    }

</style>