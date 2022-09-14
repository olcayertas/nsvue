<template>
    <Page actionBarHidden="true">
        <StackLayout class="root">
            ...
            <FlexboxLayout class="bottom" flexDirection="column">
                ...
                <RadCartesianChart class="chart" ref="chart">
                    <LinearAxis v-tkCartesianHorizontalAxis hidden="true"/>
                    <LinearAxis v-tkCartesianVerticalAxis hidden="true"/>
                    <AreaSeries
                        :items="items"
                        valueProperty="value"
                        categoryProperty="date"
                        v-tkCartesianSeries
                    />
                </RadCartesianChart>
            </FlexboxLayout>
        </StackLayout>
    </Page>
</template>