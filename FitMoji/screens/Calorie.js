import { Header } from "react-native/Libraries/NewAppScreen"

function MainHeader(){
    return(
        <div>\
            <h1 >Calorie Tracker</h1>
            <ul>
                <ol>Goal: </ol>
                <ol> Calories Today: </ol> 
                <ol>Reamining Calories</ol>
            </ul>
        </div>
    )
}

function CaloriesButton(){
    return(
        <button>Add Calories</button>
    )
}

function Footer(){
    return(
        <footer> 
        <small> ⓒ 2022 Fitmoji. All rights reserved</small>
        </footer>
    )
}

export default function CaloriePage(){
    return(
        <div>
            <MainHeader/>
            <CaloriesButton/>
            <Footer/>
        </div>
        
    )
}
ReactDOM.render(<CaloriePage/>)
//export default Calorie