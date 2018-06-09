export default [
    {
        name: 'prop',
        description: 'Add a new Prop decorator. Components need to explicitly declare the Props it expects to receive using the Prop decorator. Props can be a number, string, boolean, or even an Object. By default, when a member decorated with Prop decorator is set, the component will efficiently re-render.',
        body: "@Prop() ${1:newProp}: ${2|any,string,boolean,number|};",
        preview: "@Prop() newProp: any;",
        autoImport: 'Prop'
    },
    {
        name: 'watch',
        body: [
            "@Watch('${1:myProp}')",
            "${2:watchHandler}(newValue) {",
            "\t${0:console.log('The value of ${1:myProp} is: ', newValue);}",
            "}"
        ],
        preview: [
            "@Watch('myProp')",
            "watchHandler(newValue) {",
            "\tconsole.log('The value of ${1:myProp} is: ', newValue);",
            "}"
        ],
        description: "Add a new watch decorator to make the function be invoked immediately before and after a member decorated with Prop is changed.",
        autoImport: 'Watch'
    },
    {
        name: 'state',
        body: "@State() ${1:newState}: ${2|any,string,boolean,number|};",
        preview: "@State() newState: any",
        description: "Add a new State decorator to manage internal state. Decorating a class member with State will trigger efficient re-renders when the value is set, but it won't be accessible through the Element.",
        autoImport: 'State'
    },
    {
        name: 'method',
        body: [
            "@Method()",
            "${1:publicMethod}() {",
            "\t$0",
            "}"
        ],
        preview: [
            "@Method()",
            "publicMethod() {",
            "\t|",
            "}"
        ],
        description: "Add a Method decorator to expose the function on the public API. Functions decorated with the @Method() decorator can be called directly from the element.",
        autoImport: 'Method'
    },
    {
        name: 'element',
        body: "@Element() ${1:element}: HTMLElement;",
        preview: "@Element() element: HTMLElement;",
        description: "Add a new Element decorator to get access to the host element within the class instance.",
        autoImport: 'Element'
    },
    {
        name: 'event',
        body: "@Event() ${1:newCustomEvent}: EventEmitter;",
        preview: "@Event() newCustomEvent: EventEmitter;",
        description: "Add a new Event emitter to dispatch Custom DOM events up for other components to handle.",
        autoImport: 'Event, EventEmitter'
    },
    {
        name: 'listen',
        body: [
            "@Listen('${1:myCustomEvent}')",
            "customEventHandler(event) {",
            "\t${0:console.log('Received the custom event: ', event);}",
            "}"
        ],
        preview: [
            "@Listen('myCustomEvent')",
            "customEventHandler(event) {",
            "\tconsole.log('Received the custom event: ', event);",
            "}"
        ],
        description: "Add a new Listen decorator. The Listen decorator is for listening and responding to DOM events from a child.",
        autoImport: 'Listen'
    }
];