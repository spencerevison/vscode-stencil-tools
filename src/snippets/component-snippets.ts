import { Snippet } from "./interface";

export const LIFECYCLE_SNIPPETS: Snippet[] = [
    {
        name: 'component-will-load',
        title: 'Component Lifecycle: componentWillLoad',
        description: [
            "The component is about to load and it has not rendered yet.\n",
            "This is the best place to make any data updates before the first render.\n",
            "`componentWillLoad` will only be called once."
        ],
        body: [
            "componentWillLoad() {",
            "\t${0:console.log('Component is about to be rendered');}",
            "}"
        ]
    },
    {
        name: 'component-did-load',
        title: 'Component Lifecycle: componentDidLoad',
        description: [
            "The component has loaded and has already rendered.\n",
            "Updating data in this method will cause the component to re-render.\n",
            "`componentDidLoad` will only be called once."
        ],
        body: [
            "componentDidLoad() {",
            "\t${0:console.log('Component has been rendered');}",
            "}"
        ]
    },
    {
        name: 'component-will-update',
        title: 'Component Lifecycle: componentWillUpdate',
        description: [
            "The component is about to update and re-render.\n",
            "Called multiple times throughout the life of the component as it updates.\n",
            "`componentWillUpdate` is not called on the first render."
        ],
        body: [
            "componentWillUpdate() {",
            "\t${0:console.log('Component will update and re-render');}",
            "}"
        ]
    },
    {
        name: 'component-did-update',
        title: 'Component Lifecycle: componentWillUpdate',
        description: [
            "The component has updated and re-rendered.\n",
            "Called multiple times throughout the life of the component as it updates.\n",
            "`componentDidUpdate` is not called on the first render."
        ],
        body: [
            "componentDidUpdate() {",
            "\t${0:console.log('Component did update');}",
            "}"
        ]
    },
    {
        name: 'component-did-unload',
        title: 'Component Lifecycle: componentDidUnload',
        description: "The component did unload and the element will be destroyed.",
        body: [
            "componentDidUnload() {",
            "\t${0:console.log('Component removed from the DOM');}",
            "}"
        ]
    }
]
export const COMPONENT_SNIPPETS: Snippet[] = [
    ...LIFECYCLE_SNIPPETS,
    {
        name: 'prop',
        description: 'Props are custom attribute/properties exposed publicly on the element that developers can provide values for',
        body: "@Prop() ${1:propName}: ${2|any,string,boolean,number|};",
        preview: "@Prop() newProp: any;",
        autoImport: 'Prop'
    },
    {
        name: 'watch',
        description: "Add a new watch decorator to make the function be invoked immediately before and after a member decorated with Prop is changed.",
        body: [
            "@Watch('${1:myProp}')",
            "${1}Changed() {",
            "\tconst { $1 } = this;",
            "\t${0:console.log('${1:myProp} changed to ', $1)}",
            "}"
        ],
        preview: [
            "@Watch('myProp')",
            "watchHandler(newValue) {",
            "\tconsole.log('The value of ${1:myProp} is: ', newValue);",
            "}"
        ],
        autoImport: 'Watch'
    },
    {
        name: 'state',
        description: "Add a new State decorator to manage internal state. Decorating a class member with State will trigger efficient re-renders when the value is set, but it won't be accessible through the Element.",
        body: "@State() ${1:stateName}: ${2|any,string,boolean,number|};",
        preview: "@State() newState: any",
        autoImport: 'State'
    },
    {
        name: 'method',
        body: [
            "@Method()",
            "${1:methodName}($2): ${3:any} {",
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
        description: "Add a new Element decorator to get access to the host element within the class instance.",
        body: "@Element() ${1:element}: HTMLElement;",
        preview: "@Element() element: HTMLElement;",
        autoImport: 'Element'
    },
    {
        name: 'event',
        body: "@Event() ${1:eventName}: EventEmitter<${2:any}>;",
        preview: "@Event() newCustomEvent: EventEmitter;",
        description: "Add a new Event emitter to dispatch Custom DOM events up for other components to handle.",
        autoImport: 'Event, EventEmitter'
    },
    {
        name: 'listen',
        body: [
            "@Listen('${1:eventName}')",
                "protected ${2:on$1}() {",
                "\t${0:console.log('$1 Recieved');}",
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