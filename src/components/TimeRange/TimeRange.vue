<template>
    <!-- eslint-disable -->
    <b-collapse class="panel" :open.sync="isOpen">
        <div slot="trigger" class="panel-heading" v-if="labelPanel !== null">
            <strong>
                {{ labelPanel }}
                <span class="subtitle" v-html="subtitle"></span>
            </strong>
        </div>

        <div :class="{ 'panel-block': !!labelPanel}">
            <section class="section" :class="{ 'control' : !!labelPanel }">
                    <div class="columns">
                        <!--mode buttons-->
                        <div class="column is-one-fifth">
                            <div class="field" style="margin-bottom: 1.5rem;">
                                <button class="button is-outlined is-primary" @click.stop="modeQuick">Quick</button>
                            </div>

                            <div class="field">
                                <button
                                    class="button is-outlined is-primary"
                                    @click.stop="modeAbsolute">
                                    Absolute
                                </button>
                            </div>
                        </div>

                        <!--dateTimeStart picker container-->
                        <div class="column is-two-fifths" v-show="mode === 'absolute'">
                            <!--dateTimeStart picker label-->
                            <div class="level">
                                <div class="level-left">
                                    <label for="b-datepicker-start"
                                           class="cursor-pointer label tag is-primary is-medium"
                                           v-text="labelStart">
                                    </label>
                                </div>

                                <div class="level-right subtitle">
                                    <button class="button is-light" @click.stop="setToNowStart">Set To Now</button>
                                </div>
                            </div>

                            <!--dateTimeStart picker-->
                            <div class="columns field has-addons is-gapless">
                                <b-datepicker
                                    v-model="SD"
                                    id="b-datepicker-start"
                                    icon="calendar-today"
                                    class="control column is-three-fifths"
                                    indicators="dots"
                                    :date-formatter="dateFormatter"
                                    :date-parser="dateParser"
                                    :events="eventsStart"
                                    :max-date="maxDate"
                                    rounded>
                                </b-datepicker>
                                <b-timepicker
                                    v-model="ST"
                                    icon="clock"
                                    :readonly="false"
                                    class="control column is-two-fifths"
                                    :max-time="maxTime"
                                    rounded
                                    hour-format="24">
                                </b-timepicker>
                            </div>
                        </div>
                        <div class="column is-two-fifths" v-show="mode === 'absolute'">
                            <!--dateTimeEnd picker label-->
                            <div class="level">
                                <div class="level-left">
                                    <label for="b-datepicker-end"
                                           class="cursor-pointer label tag is-primary is-medium"
                                           v-text="labelEnd">
                                    </label>
                                </div>
                                <div class="level-right subtitle">
                                    <button class="button is-light" @click.stop="setToNowEnd">Set To Now</button>
                                </div>
                            </div>

                            <!--dateTimeEnd picker-->
                            <div class="columns field has-addons is-gapless">
                                <b-datepicker
                                    v-model="ED"
                                    icon="calendar-today"
                                    id="b-datepicker-end"
                                    class="control column is-three-fifths"
                                    :date-formatter="dateFormatter"
                                    :date-parser="dateParser"
                                    indicators="dots"
                                    :events="eventsEnd"
                                    :min-date="minDate"
                                    rounded>
                                </b-datepicker>
                                <b-timepicker
                                    v-model="ET"
                                    icon="clock"
                                    :readonly="false"
                                    class="control column is-two-fifths"
                                    rounded
                                    :min-time="minTime"
                                    hour-format="24">
                                </b-timepicker>
                            </div>

                        </div>

                        <!--mode quick tags-->
                        <div class="column is-four-fifths" v-show="mode === 'quick'">
                            <b-taglist>
                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_THISDAYSOFAR(); modeAbsolute(); fold(); $emit('tag-click');">
                                    This day so far
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_TODAY(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Today
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_YESTERDAY(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Yesterday
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_DAYBEFOREYESTERDAY(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Day before yesterday
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_THISWEEK(); modeAbsolute(); fold(); $emit('tag-click');">
                                    This week
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_PREVIOUSWEEK(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Previous week
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_THISMONTH(); modeAbsolute(); fold(); $emit('tag-click');">
                                    This month
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_PREVIOUSMONTH(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Previous month
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_THISYEAR(); modeAbsolute(); fold(); $emit('tag-click');">
                                    This year
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_PREVIOUSYEAR(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Previous year
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_WEEKTODATE(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Week to date
                                </button>
                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_MONTHTODATE(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Month to date
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_YEARTODATE(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Year to date
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST15MINUTES(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 15 minutes
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST30MINUTES(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 30 minutes
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST45MINUTES(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 45 minutes
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST1HOUR(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 1 hour
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST4HOURS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 4 hours
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST12HOURS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 12 hours
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST24HOURS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 24 hours
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST7DAYS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 7 days
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST30DAYS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 30 days
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST60DAYS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 60 days
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST90DAYS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 90 days
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST6MONTHS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 6 months
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST1YEAR(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 1 year
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST2YEARS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 2 years
                                </button>

                                <button class="tag is-outlined is-primary button"
                                        @click.stop="EDIT_LAST5YEARS(); modeAbsolute(); fold(); $emit('tag-click');">
                                    Last 5 years
                                </button>
                            </b-taglist>
                        </div>
                    </div>
            </section>
        </div>
    </b-collapse>
</template>

<script>
    /* eslint-disable */
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import moment from 'moment';

    const RANDOM_COLOR = () => {
        const colors = [
            'is-info',
            'is-danger',
            'is-success',
            'is-link',
            'is-warning',
            'is-info',
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    };

    export default {
        name: 'time-range',
        data() {
            return {
                eventsStart: [],
                eventsEnd: [],
                mode: 'absolute',
                isOpen: true,
            };
        },
        props: {
            labelStart: {
                type: String,
                default: () => ('From'),
            },
            labelEnd: {
                type: String,
                default: () => ('To'),
            },
            labelPanel: {
                type: String,
                default: () => (null),
            },
            autoFold: {
                type: Boolean,
                default: () => (false),
            },
        },
        watch: {
            ED(n) {
                const timeStampOfDay = 24 * 60 * 60 * 1000;

                const timeStampEnd = new Date(
                    n.getFullYear(),
                    n.getMonth(),
                    n.getDate(),
                ).valueOf();

                const timeStampStart = new Date(
                    this.dateTimeStart.getFullYear(),
                    this.dateTimeStart.getMonth(),
                    this.dateTimeStart.getDate(),
                ).valueOf();

                const arr = [];
                for (let i = timeStampStart; i <= timeStampEnd; i += timeStampOfDay) {
                    arr.push({
                        date: new Date(i),
                        type: RANDOM_COLOR(),
                    });
                }
                this.eventsStart = arr;
                this.eventsEnd = arr;
            },
            SD(n) {
                const timeStampOfDay = 24 * 60 * 60 * 1000;

                const timeStampStart = new Date(
                    n.getFullYear(),
                    n.getMonth(),
                    n.getDate(),
                ).valueOf();

                const timeStampEnd = new Date(
                    this.dateTimeEnd.getFullYear(),
                    this.dateTimeEnd.getMonth(),
                    this.dateTimeEnd.getDate(),
                ).valueOf();

                const arr = [];
                for (let i = timeStampStart; i <= timeStampEnd; i += timeStampOfDay) {
                    arr.push({
                        date: new Date(i),
                        type: RANDOM_COLOR(),
                    });
                }

                this.eventsStart = arr;
                this.eventsEnd = arr;
            },
        },
        methods: {
            ...mapMutations('TimeRange', [
                'EDIT_DATE_TIME_START',
                'EDIT_DATE_TIME_END',

                'EDIT_LAST15MINUTES',
                'EDIT_LAST30MINUTES',
                'EDIT_LAST45MINUTES',
                'EDIT_LAST1HOUR',
                'EDIT_LAST4HOURS',
                'EDIT_LAST12HOURS',
                'EDIT_LAST24HOURS',
                'EDIT_LAST7DAYS',
                'EDIT_LAST30DAYS',
                'EDIT_LAST60DAYS',
                'EDIT_LAST90DAYS',
                'EDIT_LAST6MONTHS',
                'EDIT_LAST1YEAR',
                'EDIT_LAST2YEARS',
                'EDIT_LAST5YEARS',
                'EDIT_THISDAYSOFAR',
                'EDIT_TODAY',
                'EDIT_YESTERDAY',
                'EDIT_THISWEEK',
                'EDIT_THISMONTH',
                'EDIT_THISYEAR',
                'EDIT_WEEKTODATE',
                'EDIT_MONTHTODATE',
                'EDIT_YEARTODATE',
                'EDIT_DAYBEFOREYESTERDAY',
                'EDIT_PREVIOUSWEEK',
                'EDIT_PREVIOUSMONTH',
                'EDIT_PREVIOUSYEAR'
            ]),
            modeQuick() {
                this.mode = 'quick';
            },
            setToNowStart() {
                const date = new Date();
                this.EDIT_DATE_TIME_START(new Date(date.valueOf() - 1000 * 15 * 60));
            },
            setToNowEnd() {
                this.EDIT_DATE_TIME_END(new Date());
            },
            modeAbsolute() {
                this.mode = 'absolute';
            },
            fold() {
                const autoFold = this.autoFold;

                if (autoFold) {
                    this.isOpen = false;
                }
            },
            warningStart() {
                this.$snackbar.open({
                    message: 'The time start must be smaller than the time end in this situation',
                    type: 'is-warning',
                    position: 'is-top',
                });
            },
            warningEnd() {
                this.$snackbar.open({
                    message: 'The time end must be larger than the time start in this situation',
                    type: 'is-warning',
                    position: 'is-top',
                });
            },
            dateFormatter(d) {
                const [Y, M, D] = [d.getFullYear(), d.getMonth(), d.getDate()];

                return `${D.toString().padStart(2, '0')}/${(M + 1).toString().padStart(2, '0')}/${Y}`;
            },
            dateParser(d) {
                const [D, M, Y] = d.split('/').map(x => +x);

                return new Date(Y, M - 1, D);
            }
        },
        computed: {
            ...mapState('TimeRange', [
                'dateTimeStart',
                'dateTimeEnd',
            ]),
            ...mapGetters('TimeRange', [
                'hourStart',
                'minuteStart',
                'secondStart',
                'yearStart',
                'monthStart',
                'dayStart',
                'hourEnd',
                'minuteEnd',
                'secondEnd',
                'yearEnd',
                'monthEnd',
                'dayEnd',
            ]),
            subtitle: {
                get() {
                    const dateTimeStart = this.dateTimeStart;
                    const dateTimeEnd = this.dateTimeEnd;
                    const FORMAT = 'YYYY-MM-DD HH:mm:ss';

                    return `From ${moment(dateTimeStart).format(FORMAT)} To ${moment(dateTimeEnd).format(FORMAT)}`;
                },
            },
            SD: {
                get() {
                    return this.dateTimeStart;
                },
                set(n) {
                    const y = n.getFullYear();
                    const m = n.getMonth();
                    const d = n.getDate();

                    if (
                        y === this.yearStart &&
                        m === this.monthStart &&
                        d === this.dayStart
                    ) {
                        return;
                    }

                    this.EDIT_DATE_TIME_START(
                        new Date(
                            y,
                            m,
                            d,
                            this.hourStart,
                            this.minuteStart,
                            0),
                    );
                },
            },
            ST: {
                get() {
                    return this.dateTimeStart;
                },
                set(n) {
                    const h = n.getHours();
                    const m = n.getMinutes();

                    if (
                        h === this.hourStart &&
                        m === this.minuteStart
                    ) {
                        return;
                    }

                    const s = new Date(
                        this.yearStart,
                        this.monthStart,
                        this.dayStart,
                        h,
                        m,
                        0
                    );

                    const e = new Date(
                        this.yearEnd,
                        this.monthEnd,
                        this.dayEnd,
                        this.hourEnd,
                        this.minuteEnd,
                        0
                    );

                    if (s < e) {
                        this.EDIT_DATE_TIME_START(s);
                    } else {
                        this.warningStart();
                    }
                },
            },
            ED: {
                get() {
                    return this.dateTimeEnd;
                },
                set(n) {
                    const y = n.getFullYear();
                    const m = n.getMonth();
                    const d = n.getDate();

                    if (
                        y === this.yearEnd &&
                        m === this.monthEnd &&
                        d === this.dayEnd
                    ) {
                        return;
                    }

                    this.EDIT_DATE_TIME_END(
                        new Date(
                            y,
                            m,
                            d,
                            this.hourEnd,
                            this.minuteEnd,
                            0),
                    );
                },
            },
            ET: {
                get() {
                    return this.dateTimeEnd;
                },
                set(n) {
                    const h = n.getHours();
                    const m = n.getMinutes();

                    if (
                        h === this.hourEnd &&
                        m === this.minuteEnd
                    ) {
                        return;
                    }

                    const s = new Date(
                        this.yearStart,
                        this.monthStart,
                        this.dayStart,
                        this.hourStart,
                        this.minuteStart,
                        0
                    );

                    const e = new Date(
                        this.yearEnd,
                        this.monthEnd,
                        this.dayEnd,
                        h,
                        m,
                        0
                    );

                    if (s < e) {
                        this.EDIT_DATE_TIME_END(e);
                    } else {
                        this.warningEnd();
                    }
                },
            },
            minDate() {
                return new Date(
                    this.yearStart,
                    this.monthStart,
                    this.dayStart - 1,
                    this.hourStart,
                    this.minuteStart,
                    0,
                );
            },
            minTime() {
                if (
                    this.yearStart === this.yearEnd &&
                    this.monthStart === this.monthEnd &&
                    this.dayStart === this.dayEnd
                ) {
                    return new Date(
                        this.yearStart,
                        this.monthStart,
                        this.dayStart,
                        this.hourStart,
                        this.minuteStart,
                        0,
                    );
                }
            },
            maxDate() {
                return new Date(
                    this.yearEnd,
                    this.monthEnd,
                    this.dayEnd,
                    this.hourEnd,
                    this.minuteEnd,
                    0,
                );
            },
            maxTime() {
                if (
                    this.yearStart === this.yearEnd &&
                    this.monthStart === this.monthEnd &&
                    this.dayStart === this.dayEnd
                ) {
                    return new Date(
                        this.yearEnd,
                        this.monthEnd,
                        this.dayEnd,
                        this.hourEnd,
                        this.minuteEnd,
                        0,
                    );
                }
            },

        },
        mounted() {
            this.unwatch = this.$watch(vm => [
                vm.dateTimeStart.valueOf(),
                vm.dateTimeEnd.valueOf()
            ].join('-'), function (n, o) {
                const TimeRangeOld = o.split('-')
                    .map(el => Number.parseInt(el, 10))
                    .map(timestamp => new Date(timestamp));

                const TimeRangeNew = n.split('-')
                    .map(el => Number.parseInt(el, 10))
                    .map(timestamp => new Date(timestamp));

                this.$emit('time-range-change', TimeRangeNew, TimeRangeOld);
            });
        },
        beforeDestroy() {
            this.unwatch();
        }
    };
</script>

<style scoped>
    .min-height {
        min-height: 6rem;
    }

    .subtitle {
        font-weight: 400;
        font-size: 0.75rem;
        opacity: .75;
    }

    .cursor-pointer {
        cursor: pointer;
    }
</style>
