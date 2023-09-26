
const StatusChart = function () {
    const TIMELINE_TITLE_ID = "sc-content-timeline-title";
    const TIMELINE_HEADER_BOX_ID = "sc-content-timeline-header-box";
    const TIMELINE_HEADER_ID = "sc-content-timeline-header";
    const TIMELINE_STATUS_ID = "sc-content-timeline-status";

    const LIST_BOX_ID = "sc-list-box";
    const LIST_HEAD_TITLE_ID = "sc-list-head-title";
    const LIST_HEAD_SUBTITLE_ID = "sc-list-head-subtitle";

    const CANVAS_BOX_ID = "sc-content-canvas-box";
    const CANVAS_ID = "sc-content-canvas";

    const LEFT_LEGEND_ID = "sc-legend-left";
    const RIGHT_LEGEND_ID = "sc-legend-right";


    const DEFAULT_CELL_WIDTH = 200;
    const DEFAULT_CELL_HEIGHT = 40;

    const dateTimeService = function () {

        function toMinutes(time: number) {
            return time / (60 * 1000);
        }
        function toTime(minutes: number) {
            return minutes * 60 * 1000;
        }
        return {
            toMinutes,
            toTime
        }
    }();

    const cssService = function () {
        const SC_CELL_WIDTH = "--sc-cell-width";
        const SC_CELL_HEIGHT = "--sc-cell-height";
        const SC_CELL_CONTENT_HEIGHT = "--sc-cell-content-height";
        const SC_SCROLL_WIDTH = "--sc-scroll-width";

        function getVariable(name: string) {
            return getComputedStyle(document.documentElement).getPropertyValue(name);
        }

        function setVariable(name: string, value: string) {
            document.documentElement.style.setProperty(name, value);
        }

        function getCellWidth() {
            return parseInt(getVariable(SC_CELL_WIDTH));
        }

        function setCellWidth(width: number) {
            setVariable(SC_CELL_WIDTH, `${width}px`);
        }

        function getCellHeight() {
            return parseInt(getVariable(SC_CELL_HEIGHT));
        }

        function setCellHeight(height: number) {
            setVariable(SC_CELL_HEIGHT, `${height}px`);
        }

        function getCellContentHeight() {
            return parseInt(getVariable(SC_CELL_CONTENT_HEIGHT));
        }

        function getScrollWidth() {
            return parseInt(getVariable(SC_SCROLL_WIDTH));
        }

        return {
            getVariable,
            getCellWidth,
            setCellWidth,
            getCellHeight,
            setCellHeight,
            getCellContentHeight,
            getScrollWidth
        }
    }();

    const legendService = function () {
        const SC_LEGEND_ITEM = "sc-legend-item";
        const SC_LEGEND_ITEM_ICON = "sc-legend-item-icon";
        const SC_LEGEND_ITEM_COLOR = "sc-legend-item-color";
        const SC_LEGEND_ITEM_LABEL = "sc-legend-item-label";

        function init(leftItems: LegendItem[], rightItems: LegendItem[]) {
            const left = document.getElementById(LEFT_LEGEND_ID);
            drawLegend(leftItems, left);

            const right = document.getElementById(RIGHT_LEGEND_ID);
            drawLegend(rightItems, right);
        }

        function drawLegend(items: LegendItem[], container: HTMLElement) {
            for (const item of items) {
                const box = document.createElement("div");
                box.classList.add(SC_LEGEND_ITEM);
                container.appendChild(box);

                if (item.icon) {
                    const icon = document.createElement("img");
                    icon.classList.add(SC_LEGEND_ITEM_ICON);
                    icon.src = item.icon;
                    box.appendChild(icon);
                } else {
                    const color = document.createElement("div");
                    color.classList.add(SC_LEGEND_ITEM_COLOR);
                    color.style.backgroundColor = item.color;
                    box.appendChild(color);
                }

                const label = document.createElement("div");
                label.classList.add(SC_LEGEND_ITEM_LABEL);
                label.innerText = item.label;
                box.appendChild(label);
            }
        }

        return {
            init
        }
    }();

    const timelineService = function () {
        const SC_CONTENT_TIMELINE_HEADER_ITEM = "sc-content-timeline-header-item";

        function setTitle(name: string) {
            const titleElement = document.getElementById(TIMELINE_TITLE_ID) as HTMLElement;
            titleElement.innerText = name;
        }

        /**
         * draw timeline headers
         * @param {Date} start start time of header
         * @param {Date} end end time of header
         */
        function drawHeaders(start: Date, end: Date, cellMinutes: number, cellWidth: number, cellHeight: number) {
            cssService.setCellWidth(cellWidth);
            cssService.setCellHeight(cellHeight);

            const headerElement = document.getElementById(TIMELINE_HEADER_ID) as HTMLElement;
            const headers: any = [];
            let time = start;

            while (time < end) {
                // TODO : add time format service
                headers.push(time.toLocaleTimeString([], {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                }));
                time = new Date(time.getTime() + dateTimeService.toTime(cellMinutes));
            }

            for (const data of headers) {
                const div = document.createElement("div");
                div.innerText = data;
                div.classList.add(SC_CONTENT_TIMELINE_HEADER_ITEM);
                headerElement.appendChild(div);
            }
            const canvasWidth = cssService.getCellWidth() * headers.length
            headerElement.style.width = `${canvasWidth + cssService.getScrollWidth()}px`;

            const canvasElement = document.getElementById(CANVAS_ID) as HTMLElement;
            canvasElement.style.width = `${canvasWidth}px`;

            const canvasBoxElement = document.getElementById(CANVAS_BOX_ID) as HTMLElement;
            const headerBoxElement = document.getElementById(TIMELINE_HEADER_BOX_ID) as HTMLElement;
            canvasBoxElement.addEventListener("scroll", (e) => {
                headerBoxElement.scrollLeft = canvasBoxElement.scrollLeft;
            });
        }

        return {
            setTitle,
            drawHeaders
        }
    }();

    const listService = function () {
        const SC_LIST_ITEM = "sc-list-item";

        function init(title: string, subTitle: string, entities: Entity[]) {
            setTitle(title);
            setSubTitle(subTitle);
            drawListItems(entities);
        }

        function setTitle(title: string) {
            const titleElement = document.getElementById(LIST_HEAD_TITLE_ID) as HTMLElement;
            titleElement.innerText = title;
        }

        function setSubTitle(subTitle: string) {
            const subTitleElement = document.getElementById(LIST_HEAD_SUBTITLE_ID) as HTMLElement;
            subTitleElement.innerText = subTitle;
        }

        function drawListItems(entities: Entity[]) {
            const listBox = document.getElementById(LIST_BOX_ID) as HTMLElement;
            const canvas = document.getElementById(CANVAS_ID) as HTMLElement;

            for (const entity of entities) {
                // list item
                const div = document.createElement("div");
                div.innerText = entity.name;
                div.classList.add(SC_LIST_ITEM);
                listBox.appendChild(div);
            }
            canvas.style.height = `${listBox.scrollHeight}px`;

            const canvasBox = document.getElementById(CANVAS_BOX_ID) as HTMLElement;
            canvasBox.addEventListener("scroll", (e) => {
                listBox.scrollTop = canvasBox.scrollTop;
            });
        }

        return {
            init
        };
    }();

    const canvasService = function () {
        const SC_CONTENT_CANVAS_ITEM = "sc-content-canvas-item";
        const SC_HLINE = "sc-hline";
        const SC_VLINE = "sc-vline";
        /**
         * 
         * @param {object} entities Entities to draw
         * @param {Date} startTime Start time of chart
         * @param {number} cellMinutes Minutes for each cell
         * @param {boolean} horizontalLine Whether to draw horizontal line
         * @param {boolean} vertialLine Whether to draw vertical line
         */
        function init(entities: Entity[], startTime: Date, cellMinutes: number,
            horizontalLine = true, vertialLine = true) {
            if (horizontalLine)
                drawHorizontalLines();
            if (vertialLine)
                drawVertialLines();

            let rowIndex = 0;
            for (const entity of entities) {
                drawEntityEvents(entity, rowIndex, startTime, cellMinutes);
                rowIndex++;
            }

            for(const event  of globalEvents){
                drawGlobalEvent(startTime, event.start, event.end, event.type, cellMinutes);
            }
        }

        function drawVertialLines() {
            const canvas = document.getElementById(CANVAS_ID) as HTMLElement;
            const canvasWidth = canvas.scrollWidth;
            const cellWidth = cssService.getCellWidth();
            const lineCount = Math.floor(canvasWidth / cellWidth);
            console.log(lineCount);
            for (let i = 0; i < lineCount; i++) {
                const line = document.createElement("div") as HTMLElement;
                line.classList.add(SC_VLINE);

                line.style.left = `${cellWidth * (i + 1) - 1}px`;
                line.style.height = `${canvas.scrollHeight}px`;
                canvas.appendChild(line);
            }

        }

        function drawHorizontalLines() {
            const canvas = document.getElementById(CANVAS_ID) as HTMLElement;
            const canvasHeight = canvas.scrollHeight;
            const cellHeight = cssService.getCellHeight();
            const lineCount = Math.floor(canvasHeight / cellHeight);
            for (let i = 0; i < lineCount; i++) {
                const line = document.createElement("div");
                line.classList.add(SC_HLINE);

                line.style.top = `${cellHeight * (i + 1) - 1}px`;
                line.style.width = `${canvas.scrollWidth}px`;
                canvas.appendChild(line);
            }
        }

        function drawEntityEvents(entity: Entity, rowIndex: number, startTime: Date, cellMinutes: number = 60) {
            if (rowIndex == null || rowIndex < 0)
                return;

            if (entity.events == null)
                return;

            const entityEvents = entity.events;
            for (const event of entityEvents) {
                const eventElement = document.createElement("div");
                eventElement.classList.add(SC_CONTENT_CANVAS_ITEM);

                const left = dateTimeService.toMinutes(event.start.valueOf() - startTime.valueOf()) * cssService.getCellWidth() / cellMinutes;
                // const left = cssService.getCellWidth() * event.start / cellMinutes;
                const top = (cssService.getCellHeight() * rowIndex)
                    + (cssService.getCellHeight() - cssService.getCellContentHeight()) / 2
                    - 1;
                const width = cssService.getCellWidth() * dateTimeService.toMinutes(event.end.valueOf() - event.start.valueOf()) / cellMinutes;
                const color = event.type === 1 ? "red" : event.type === 2 ? "blue" : "green";

                eventElement.style.left = `${left}px`;
                eventElement.style.top = `${top}px`;
                eventElement.style.width = `${width}px`;
                eventElement.style.backgroundColor = color;
                eventElement.style.zIndex = "3";
                eventElement.addEventListener("click", (e) => {
                    console.log(e);
                });

                const canvas = document.getElementById(CANVAS_ID) as HTMLElement;
                canvas.appendChild(eventElement);
            }
        }

        function drawGlobalEvent(chartStartTime: Date, eventStartTime: Date, eventEndTime: Date, eventType: any, cellMinutes: number) {
            const eventElement = document.createElement("div");
            eventElement.classList.add(SC_CONTENT_CANVAS_ITEM);

            const left = dateTimeService.toMinutes(eventStartTime.valueOf() - chartStartTime.valueOf()) * cssService.getCellWidth() / cellMinutes;
            const width = cssService.getCellWidth() * dateTimeService.toMinutes(eventEndTime.valueOf() - eventStartTime.valueOf()) / cellMinutes;
            const color = eventType === 1 ? "aqua" : eventType === 2 ? "coral" : "brown";

            eventElement.style.left = `${left}px`;
            eventElement.style.width = `${width}px`;
            eventElement.style.height = "100%";
            eventElement.style.backgroundColor = color;
            eventElement.style.opacity = "0.5";

            eventElement.addEventListener("click", (e) => {
                console.log(e);
            });

            const canvas = document.getElementById(CANVAS_ID) as HTMLElement;
            canvas.appendChild(eventElement);
        }

        return {
            init
        }
    }();

    function init({
        title,
        subTitle,
        startTime,
        endTime,
        cellMinutes,
        cellWidth = DEFAULT_CELL_WIDTH,
        cellHeight = DEFAULT_CELL_HEIGHT,
        leftLegends,
        rightLegends,
        entities
    }: StatusChartProps) {
        legendService.init(leftLegends, rightLegends);
        timelineService.setTitle("Time Line");
        timelineService.drawHeaders(startTime, endTime, cellMinutes, cellWidth, cellHeight);
        listService.init(title, subTitle, entities);
        canvasService.init(entities, startTime, cellMinutes);
    }

    return {
        init
    }
}();
window.addEventListener("load", () => {
    StatusChart.init({
        title: "XXX H/L LH Line 03",
        subTitle: "Serial No.",
        startTime: new Date(Date.parse("2020-01-01T00:00:00")),
        endTime: new Date(Date.parse("2020-01-02T00:00:00")),
        cellMinutes: 60,
        cellWidth: 200,
        cellHeight: 40,
        leftLegends: (window as any).leftLegendDatasource,
        rightLegends: (window as any).rightLegendDatasource,
        entities: (window as any).entities
    });

});