import React from 'react'
import WirVsVirus from './wirvsvirus.png'

export function Footer() {
    return (
        <footer className="text-muted bg-secondary" style={{ height: "20vh" }}>
            <div className="container">
                <div className="row">
                    <div className="col-sm align-self-center mt-4 mb-4 text-center">
                        <p className="text-white text-center m-0 font-weight-bold">Corona Testing Information and Planning Plattform</p>
                        
                    </div>
                    <div className="col-sm align-self-center mt-4 mb-4 text-center">
                    <p className="text-white m-0">
                        Check out our project on <a href="https://www.youtube.com/watch?v=UYhM87C_xqA" className="text-success">Youtube</a><br />
                        Check out our project on <a href="https://devpost.com/software/corona-atlas-de" className="text-success">Devpost</a><br />
                        Check out our project on <a href="https://github.com/hippolyt/corona-atlas" className="text-success">Github</a></p>
                    </div>
                    <div className="col-sm align-self-center mt-4 mb-4 text-center">
                        <a href="https://wirvsvirushackathon.org/"><img alt="WirVsVirus Hackathon Logo" src={WirVsVirus} className="img-fluid" style={{ maxWidth: "300px" }} /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
