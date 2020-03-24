import React from 'react'
import WirVsVirus from './wirvsvirus.png'

export function Footer() {
    return (
        <footer className="text-muted bg-secondary" >
            <div className="container" style={{ minHeight: "15vh" }}>
                <div className="row" style={{ minHeight: "15vh" }}>
                    <div className="col align-self-center mt-4 mb-4 text-center">
                        <p className="text-white text-center m-0 font-weight-bold">Corona Testing Information and Planning Plattform
                        </p>
                    </div>
                    <div className="col align-self-center mt-4 mb-4 text-center">
                        <a href="testcenter"><p className="text-white text-center m-0 font-weight-bold">Patientenübersicht-Demo</p></a>
                        <a href="booking"><p className="text-white text-center m-0 font-weight-bold">Buchungsprozess-Demo</p></a>
                        <a href="cases"><p className="text-white text-center m-0 font-weight-bold">Terminübersicht-Demo</p></a>
                        <a href="managedoctors"><p className="text-white text-center m-0 font-weight-bold">Ärzteverwaltung-Demo</p></a>
                        <a href="dashboard"><p className="text-white text-center m-0 font-weight-bold">Teststation-Dashboard</p></a>
                    </div>
                    <div className="col align-self-center mt-4 mb-4 text-center">
                        <a href="https://wirvsvirushackathon.org/"><img src={WirVsVirus} style={{ maxHeight: "8em" }} /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}