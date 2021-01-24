<template>
    <section class="bio-sidebar">
        <img alt="profile image" class="bio-sidebar-img" :src='picture'/>
        <h2 class="bio-sidebar-name">{{ name }}</h2>
        <h3 class="bio-sidebar-bio-title">Background:</h3>
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
    }

    .bio-sidebar-img {
        height: 150px;
        width: 150px;
        border-radius: 50%;
        margin: 70px auto 40px auto;
    }

    .bio-sidebar-name, .bio-sidebar-bio-title, .bio-sidebar-bio {
        color: white;
    }

    .bio-sidebar-bio-title {
        margin: 10px;
    }

    .bio-sidebar-bio {
        padding: 0 15px;
        margin-bottom: 30px;
    }

    @media screen and (min-width: 768px) {
        .bio-sidebar {
            overflow: scroll;
            max-width: 400px;
        } 
    }

</style>