interface IPosition {
  x: number;
  left: number;
}

interface ICard {
  id: number;
  title: string;
  image: string;
}

interface CardTrackProps {
  cards: ICard[];
}

const CardTrack: React.FC<CardTrackProps> = (props: CardTrackProps) => {
  const [mouseDown, setMouseDown] = React.useState<boolean>(false),
    [position, setPosition] = React.useState<IPosition>({ x: 0, left: 0 });
  
  const trackRef: any = React.useRef(null);
  
  const handleMouseUp = (): void => {
    setMouseDown(false);
  }
  
  const handleMouseDown = (e: any): void => {
    setPosition({ 
      ...position, 
      x: e.clientX, 
      left: trackRef.current.scrollLeft 
    });
    
    setMouseDown(true);
  }
  
  const handleMouseMove = (e: any): void => {
    if(mouseDown){
      const left: number = position.left + (position.x - e.clientX);
      
      trackRef.current.scrollLeft = left;
    }
  }
  
  const getCards = (): JSX.Element[] => {
    return props.cards.map((card: ICard) => {
      const getStyles = (): React.CSSProperties => {
        return {
          backgroundImage: `url(${card.image})`
        }
      }
      
      return(
        <button key={card.id} className="card" style={getStyles()}>
          <div className="content">
            <div className="title">
              <h1>{card.title}</h1>
            </div>
          </div>
        </button>
      )
    })
  }
  
  return(
    <div 
      id="card-track" 
      ref={trackRef} 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {getCards()}
    </div>
  )
}

interface AppProps {
  
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const cards: ICard[] = [
    { id: 1, title: "Gone fishin'", image: "https://i.imgur.com/XqJH9vD.jpeg" },
    { id: 2, title: "Spooky woods", image: "https://i.imgur.com/Xulubox.jpeg" },
    { id: 3, title: "Mountain city", image: "https://i.imgur.com/yxovJ4S.jpeg" },
    { id: 4, title: "Desert time", image: "https://i.imgur.com/JHHx0AD.jpeg" },
    { id: 5, title: "Field of nightmares", image: "https://i.imgur.com/Pboz5mG.jpeg" }
  ]
  
  const getCards = (): JSX.Element[] => {
    return cards.map((card: ICard) => {
      const getStyles = (): React.CSSProperties => {
        return {
          backgroundImage: `url(${card.image})`
        }
      }
      
      return(
        <button key={card.id} className="card" style={getStyles()}>
          <div className="content">
            <div className="title">
              <h1>{card.title}</h1>
            </div>
          </div>
        </button>
      )
    })
  }
  
  return(
    <div id="app">
      <CardTrack cards={cards} />
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"));