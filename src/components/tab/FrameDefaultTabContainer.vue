<template>
    <div>
        <v-container>
            <v-tabs centered v-model="activeTabIdx">
                <v-tab v-for="tab in this.pTabComponents" :key="tab.label">
                    {{ tab.label }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="activeTabIdx">
                <v-tab-item v-for="tab in this.pTabComponents" :key="tab.label">
                    <component 
                        :is="tab.component"
                        :pTabParams="pTabParams"
                    />
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>

<script>
	export default {
        props: {
            pTabComponents: {
                type: Array,
                default: () => []
            },
            pTabParams: {
                type: Object,
                default: () => {}
            },
        },
		data() {
			return {
				activeTabIdx: 0,
			};
		},
	};
</script>

<style lang="scss" scoped>

</style>
