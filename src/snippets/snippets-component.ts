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
        description: 'Props are custom attribute/properties exposed publicly on the element that developers can provide values for.',
        body: "@Prop() ${1:propName}: ${2|any,string,boolean,number|};",
        preview: "@Prop() newProp: any;",
        autoImport: 'Prop'
    },
    {
        name: 'watch',
        description: "When a user updates a property, Watch will fire what ever method it's attached to and pass that methd the new value of the prop along with the old value.",
        body: [
            "@Watch('${1:propName}')",
            "${1}Changed() {",
            "\tconst { $1 } = this;",
            "\t${0:console.log('$1 changed to ', $1);}",
            "}"
        ],
        preview: [
            "@Watch('propName')",
            "propNameChanged() {",
            "\tconst { propName } = this;",
            "\tconsole.log('propName changed to ', propName);",
            "}"
        ],
        autoImport: 'Watch'
    },
    {
        name: 'state',
        description: "The @State() decorator can be used to manage internal data for a component. Any changes to a @State() property will cause the components render function to be called again.",
        body: "@State() ${1:stateName}: ${2|any,string,boolean,number|};",
        preview: "@State() stateName: any",
        autoImport: 'State'
    },
    {
        name: 'method',
        body: [
            "@Method()",
            "${1:methodName}($2) {",
            "\t$0",
            "}"
        ],
        preview: [
            "@Method()",
            "methodName() {",
            "\t",
            "}"
        ],
        description: "The @Method() decorator is used to expose methods on the public API. Functions decorated with the @Method() decorator can be called directly from the element.",
        autoImport: 'Method'
    },
    {
        name: 'element',
        description: "The @Element() decorator is how to get access to the host element within the class instance. This returns an instance of an HTMLElement, so standard DOM methods/events can be used here.",
        body: "@Element() ${1:element}: HTMLElement;",
        preview: "@Element() element: HTMLElement;",
        autoImport: 'Element'
    },
    {
        name: 'event',
        body: "@Event() ${1:eventName}: EventEmitter<${2:any}>;",
        preview: "@Event() eventName: EventEmitter<any>;",
        description: "The @Event() decorator allows a Component to dispatch Custom DOM events for other components to handle.",
        autoImport: 'Event, EventEmitter'
    },
    {
        name: 'listen',
        body: [
            "@Listen('${1:eventName}')",
            "protected ${2:${1}Handler}(event) {",
                "\t${0:console.log('Received the \"$1\" event: ', event);}",
            "}"
        ],
        preview: [
            "@Listen('eventName')",
            "protected eventNameHandler(event) {",
            "\tconsole.log('Received the \"$1\" event: ', event);",
            "}"
        ],
        description: "The Listen() decorator is for handling events dispatched from @Events.",
        autoImport: 'Listen'
    }
];