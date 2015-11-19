import $ from 'jquery';
import ExecutionEnvironment from 'exenv';
var visible = require('visible-element')($);

export default class {
    constructor(component, listElementString) {
        this.component = component;
        this.listElementString = listElementString;
        this.watchScroll();
    };

    watchScroll() {
        self = this;
        if (ExecutionEnvironment.canUseDOM) {
            $(document).scroll('scroll', function () {
                self.handleScrollLoad.call(self)
            });
            this.handleScrollLoad()
        }
    }

    lastListItemVisible() {
        var lastLi = $(`${this.listElementString} li`).last();
        return lastLi[0] && visible.inViewport(lastLi);
    }

    loadMore() {
        this.component.props.relay.setVariables({
            count: this.component.props.relay.variables.count + 10
        });
    }

    handleScrollLoad() {
        if (ExecutionEnvironment.canUseDOM && this.lastListItemVisible()) {
            this.loadMore();
        }
    }
}