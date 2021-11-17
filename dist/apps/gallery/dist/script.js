"use strict";
const CardTrack = (props) => {
    const [mouseDown, setMouseDown] = React.useState(false), [position, setPosition] = React.useState({ x: 0, left: 0 });
    const trackRef = React.useRef(null);
    const handleMouseUp = () => {
        setMouseDown(false);
    };
    const handleMouseDown = (e) => {
        setPosition(Object.assign(Object.assign({}, position), { x: e.clientX, left: trackRef.current.scrollLeft }));
        setMouseDown(true);
    };
    const handleMouseMove = (e) => {
        if (mouseDown) {
            const left = position.left + (position.x - e.clientX);
            trackRef.current.scrollLeft = left;
        }
    };
    const getCards = () => {
        return props.cards.map((card) => {
            const getStyles = () => {
                return {
                    backgroundImage: `url(${card.image})`
                };
            };
            return (React.createElement("button", { key: card.id, className: "card", style: getStyles() },
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "title" },
                        React.createElement("h1", null, card.title)))));
        });
    };
    return (React.createElement("div", { id: "card-track", ref: trackRef, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, onMouseMove: handleMouseMove }, getCards()));
};
const App = (props) => {
    const cards =[
    { id: 1, title: "", image: "https://i.pinimg.com/236x/f2/d8/40/f2d8402bc18f6839980ba34adefa68c7.jpg" },
    { id: 2, title: "", image: "https://i.pinimg.com/236x/94/f2/72/94f2721146d391cdc0a8d1064125952f.jpg" },
    { id: 3, title: "", image: "https://i.pinimg.com/236x/2b/1b/33/2b1b3346bd897b081931afb10956c76c.jpg" },
    { id: 4, title: "", image: "https://i.pinimg.com/236x/5d/7e/ea/5d7eea13aa68355c1d51ec665a9499f7.jpg" },
    { id: 5, title: "", image: "https://i.pinimg.com/236x/c9/fa/95/c9fa95645bd399083193d2e13566c456.jpg" },
    { id: 6, title: "", image: "https://i.pinimg.com/236x/55/7a/6b/557a6b56226c58e541ea303b86406b41.jpg" },
{ id: 7, title: "", image: "https://i.pinimg.com/236x/df/20/72/df207206bcec5091fc980cbefa300f0a.jpg" },
{ id: 8, title: "", image: "https://i.pinimg.com/236x/c8/be/54/c8be54174b7d257f473da5c55c1fb23f.jpg" },
{ id: 9, title: "", image: "https://i.pinimg.com/236x/a4/78/10/a47810fd11ea4750bbd4d8c9c0770908.jpg" },
{ id: 10, title: "", image: "https://i.pinimg.com/236x/c0/e7/e3/c0e7e3ca41aacb8e41d411f58b964117.jpg" },
{ id: 11, title: "", image: "https://i.pinimg.com/236x/b0/c8/0b/b0c80bbc1ed6515433d09360f068aac3.jpg" },
{ id: 12, title: "", image: "https://i.pinimg.com/236x/f9/01/75/f9017560e5da0e4eb95924554d74ca8f.jpg" },
{ id: 13, title: "", image: "https://i.pinimg.com/236x/79/27/d7/7927d7a281ed65fa4c803eb461fa7a8d.jpg" },
{ id: 14, title: "", image: "https://i.pinimg.com/originals/2f/b3/ee/2fb3ee9f0bc991c4324d48a64973b398.jpg" },
{ id: 15, title: "", image: "https://i.pinimg.com/originals/9a/34/45/9a3445e02bc3cdb163e58289cee52e11.jpg" },
    { id: 1, title: "", image: "https://i.pinimg.com/236x/f2/d8/40/f2d8402bc18f6839980ba34adefa68c7.jpg" },
    { id: 2, title: "", image: "https://i.pinimg.com/236x/94/f2/72/94f2721146d391cdc0a8d1064125952f.jpg" },
    { id: 3, title: "", image: "https://i.pinimg.com/236x/2b/1b/33/2b1b3346bd897b081931afb10956c76c.jpg" },
    { id: 4, title: "", image: "https://i.pinimg.com/236x/5d/7e/ea/5d7eea13aa68355c1d51ec665a9499f7.jpg" },
    { id: 5, title: "", image: "https://i.pinimg.com/236x/c9/fa/95/c9fa95645bd399083193d2e13566c456.jpg" },
    { id: 6, title: "", image: "https://i.pinimg.com/236x/55/7a/6b/557a6b56226c58e541ea303b86406b41.jpg" },
{ id: 7, title: "", image: "https://i.pinimg.com/236x/df/20/72/df207206bcec5091fc980cbefa300f0a.jpg" },
{ id: 8, title: "", image: "https://i.pinimg.com/236x/c8/be/54/c8be54174b7d257f473da5c55c1fb23f.jpg" },
{ id: 9, title: "", image: "https://i.pinimg.com/236x/a4/78/10/a47810fd11ea4750bbd4d8c9c0770908.jpg" },
{ id: 10, title: "", image: "https://i.pinimg.com/236x/c0/e7/e3/c0e7e3ca41aacb8e41d411f58b964117.jpg" },
{ id: 11, title: "", image: "https://i.pinimg.com/236x/b0/c8/0b/b0c80bbc1ed6515433d09360f068aac3.jpg" },
{ id: 12, title: "", image: "https://i.pinimg.com/236x/f9/01/75/f9017560e5da0e4eb95924554d74ca8f.jpg" },
{ id: 13, title: "", image: "https://i.pinimg.com/236x/79/27/d7/7927d7a281ed65fa4c803eb461fa7a8d.jpg" },
{ id: 14, title: "", image: "https://i.pinimg.com/originals/2f/b3/ee/2fb3ee9f0bc991c4324d48a64973b398.jpg" },
{ id: 15, title: "", image: "https://i.pinimg.com/originals/9a/34/45/9a3445e02bc3cdb163e58289cee52e11.jpg" },
  ];
    const getCards = () => {
        return cards.map((card) => {
            const getStyles = () => {
                return {
                    backgroundImage: `url(${card.image})`
                };
            };
            return (React.createElement("button", { key: card.id, className: "card", style: getStyles() },
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "title" },
                        React.createElement("h1", null, card.title)))));
        });
    };
    return (React.createElement("div", { id: "app" },
        React.createElement(CardTrack, { cards: cards })));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));