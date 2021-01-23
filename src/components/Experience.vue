<template>
    <section class="experience-section">
        <h2 class="experience=section-title">Experience</h2>
        <ul class="experience-list">
            <li class="experience-list-item" v-for="(role, index) in experience" :key="index">
                <h3 class="experience-company">{{role.company}}</h3>
                <div class="experience-title-dates-container">
                    <h4>{{role.title}}</h4>
                    <p>{{role.dates}}</p>
                </div>
                <p class="experience-description">{{role.description}}</p>
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

.experience-section {
    background: white;
    display: flex;
    flex-direction: column;
}

.experience-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.experience-list-item {
    display: flex;
    flex-direction: column;
    list-style: none;
    border-bottom: 2px solid rgb(230, 229, 229);
    padding: 0 20px;
}

.experience-title-dates-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.experience-company, .experience-description {
    text-align: left;
}

</style>