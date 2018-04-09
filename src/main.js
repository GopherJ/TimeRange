/* eslint-disable */
import TimeRange from './components/TimeRange/TimeRange';
import TimeRangeStore from './store/TimeRange';

const install = (Vue, options = {}) => {
    if (options.store) {
        options.store.registerModule('TimeRange', TimeRangeStore);
    }

    Vue.component(TimeRange.name, TimeRange);
};

export default {
    install,

    TimeRange,
    TimeRangeStore,
};

