var leftLegendDatasource = [
    { color: "#92d050", label: "Op 10" },
    { color: "#00b0f0", label: "Op 20" },
    { color: "#ffc000", label: "Op 30" },
    { color: "#7030a0", label: "Op 40" },
    { color: "#5a6cf9", label: "Op 50" }
];
var rightLegendDatasource = [
    { color: "#d9d9d9", label: "계획정지" },
    { color: "#7f7f7f", label: "비가동" },
    { color: "#cc00ff", label: "네트워크이상" },
    { color: "#081fda", label: "바코드누락" },
    { icon: "asset/image/warning.png", label: "설비이상" },
    { icon: "asset/image/error.png", label: "품질이상" },
];

var entities: Entity[] = [
    {
        id: 1,
        name: "H34A2900001",
        events: [
            {
                type: 1,
                start: new Date(Date.parse("2020-01-01T01:00:00")),
                end: new Date(Date.parse("2020-01-01T03:00:00")),
            },
            {
                type: 2,
                start: new Date(Date.parse("2020-01-01T03:00:00")),
                end: new Date(Date.parse("2020-01-01T04:00:00")),
            },
            {
                type: 3,
                start: new Date(Date.parse("2020-01-01T06:00:00")),
                end: new Date(Date.parse("2020-01-01T07:00:00")),
            },
        ]
    },
    {
        id: 2,
        name: "H34A2900002",
        events: [
            {
                type: 3,
                start: new Date(Date.parse("2020-01-01T06:00:00")),
                end: new Date(Date.parse("2020-01-01T07:00:00")),
            },
        ]
    },
    {
        id: 3,
        name: "H34A2900003",
        events: [
            {
                type: 3,
                start: new Date(Date.parse("2020-01-01T03:00:00")),
                end: new Date(Date.parse("2020-01-01T04:00:00")),
            },
            {
                type: 2,
                start: new Date(Date.parse("2020-01-01T06:00:00")),
                end: new Date(Date.parse("2020-01-01T07:00:00")),
            },
        ]
    },
    {
        id: 4,
        name: "H34A2900004",
        events: [
            {
                type: 3,
                start: new Date(Date.parse("2020-01-01T22:00:00")),
                end: new Date(Date.parse("2020-01-01T23:00:00")),
            },
            {
                type: 1,
                start: new Date(Date.parse("2020-01-01T23:00:00")),
                end: new Date(Date.parse("2020-01-01T23:50:00")),
            },
        ]
    },
    { id: 5, name: "H34A2900005" },
    { id: 6, name: "H34A2900006" },
    { id: 7, name: "H34A2900007" },
    { id: 8, name: "H34A2900008" },
    { id: 9, name: "H34A2900009" },
    { id: 10, name: "H34A2900010" },
    { id: 11, name: "H34A2900011" },
    { id: 12, name: "H34A2900012" },
    { id: 13, name: "H34A2900013" },
    { id: 14, name: "H34A2900014" },
    { id: 15, name: "H34A2900015" },
    { id: 16, name: "H34A2900016" },

]

var globalEvents : GlobalEvent[] = [
    {
        type: 1,
        start: new Date(Date.parse("2020-01-01T01:00:00")),
        end: new Date(Date.parse("2020-01-01T03:30:00")),
    },
    {
        type: 2,
        start: new Date(Date.parse("2020-01-01T05:30:00")),
        end: new Date(Date.parse("2020-01-01T06:30:00")),
    },
    {
        type: 3,
        start: new Date(Date.parse("2020-01-01T22:30:00")),
        end: new Date(Date.parse("2020-01-01T23:30:00")),
    }
];