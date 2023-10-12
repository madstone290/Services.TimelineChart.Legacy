window.addEventListener("load", () => {
    const entityPointEventRender = function (error: PointEvent, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const divElement = document.createElement("div");
        divElement.style.width = "100%";
        divElement.style.height = "100%";
        divElement.style.backgroundColor = "red";

        containerElement.appendChild(divElement);
    };

    const entityRangeEventRender = function (event: RangeEvent, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const divElement = document.createElement("div");
        divElement.style.backgroundColor = "orange";
        divElement.style.width = "100%";
        divElement.style.height = "100%";

        containerElement.appendChild(divElement);
    };

    const timelinePointEventRender = function (event: PointEvent, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const divElement = document.createElement("div");
        divElement.style.width = "20px";
        divElement.style.height = "20px";
        divElement.style.backgroundColor = "blue";

        containerElement.appendChild(divElement);
    };

    const globalRangeEventRender = (event: RangeEvent, canvasElement: HTMLElement, containerElement: HTMLElement) => {
        const divElement = document.createElement("div");
        divElement.style.width = "100%";
        divElement.style.height = "100%";
        divElement.style.backgroundColor = "pink";
        divElement.style.opacity = "0.5";

        containerElement.appendChild(divElement);
    };

    const cellMinutes = 60;
    const cellWidth = 200;
    const cellHeight = 40;

    const container = document.getElementById("sc-container");
    const tc = TimelineChart();
    tc.create(container);

    tc.setSettings({
        chartStartTime: new Date(Date.parse("2020-01-01T00:00:00")),
        chartEndTime: new Date(Date.parse("2020-01-02T00:00:00")),
        cellMinutes: cellMinutes,
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        timelinePointEventRender: timelinePointEventRender,
        entityPointEventRender: entityPointEventRender,
        entityRangeEventRender: entityRangeEventRender,
        globalRangeEventRender: globalRangeEventRender,
        canAutoFit: true,
        hasHorizontalLine: true,
        hasVerticalLine: true,
    })

    tc.setData((window as any).DEMO_ENTITIES,
        (window as any).TIMELINE_POINT_EVENTS,
        (window as any).GLOBAL_RANGE_EVENTS,
        "Main title",
        "Sub title",
        "Timeline title");

    tc.initLayout();
    tc.drawTimelineCanvas();
    tc.drawEntityList();
    tc.drawMainCanvas();

});