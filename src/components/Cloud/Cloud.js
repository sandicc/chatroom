import React from 'react'; 
import cloud from './cloud-white.png';
import './Cloud.css';

class Cloud extends React.Component {
    constructor(props){
        super(props);
        this.clouds = createClouds(props.count)
    }

    render(){
        return (
            <div className='container'>
                {this.clouds}
            </div>
        )
    }
}

const createClouds = (count) => {
    let clouds = [];

    for(let i = 0; i < count; i++){
        let size = Math.random()*0.75+0.25;
        let duration = (Math.random()*30+200)*size;
        let style = {
            transform: `scale(${size}`,
            top: `${Math.random()*100}%`,
            animationDelay: `${-Math.random()*duration}s`,
            animationDuration: `${duration}s`,
            opacity: `${Math.random()*0.3+0.7}`
        }
        console.log(style)
        clouds.push(<div key={i} style={style} className="cloud">
                        <img alt='' src={cloud}/>
                    </div>
        );
    }
    return clouds;
}

export default Cloud;

