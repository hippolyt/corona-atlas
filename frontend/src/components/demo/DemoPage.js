import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export function DemoPage(props) {
    const groupName = { arzt: "Ärzte", patient: "Patienten", gesundheitsamt: "Gesundheitsämter", teststation: "Teststationen" };
    const links = { arzt: "booking", patient: "/", gesundheitsamt: "/", teststation: "simpledashboard" };
    const ytlinks = { arzt: "https://www.youtube.com/embed/oPEsq0fhr24", patient: "https://www.youtube.com/embed/uGVQv8QmrRc", gesundheitsamt: "", teststation: "https://www.youtube.com/embed/k8StyFmwb6o" };
    return (
        <>
            <JumboHeader who={groupName[props.type]} />
            <Container>
                <DemoButton link={links[props.type]} who={groupName[props.type]} />
                <Paragraph who={props.type} />
                <Video link={ytlinks[props.type]}></Video>
            </Container>
        </>
    )
}

const teststation_text = <div><p>Teststationen können in erster Linie Termine einsehen und Patienten über Ihren Terminstatus informieren. Gängige Funktionen sind dementsprechend: </p>
    <ul className="list-group list-group-flush">
        <li className="list-group-item list-group-item-action">Übersicht über den Terminkalender.</li>
        <li className="list-group-item list-group-item-action">Patienten als “getestet” markieren.</li>
        <li className="list-group-item list-group-item-action">Patienten automatisiert per Telefon, Email oder Mail kontaktieren.</li>
        <li className="list-group-item list-group-item-action">Die Patientenakte verwalten.</li>
    </ul>
    <br />
    <p>Im Folgenden Video werden diese Funktionen näher erläutert. Durch einen Klick auf den Knopf "Zur Demo für Teststationen" können Sie die App selbst ausprobieren.</p>
</div>

const patient_text = <div><p>Patienten werden von CoTip vollautomatisch über ihren Terminstatus unterrichtet. Sobald ein Arzt einen Termin für einen Patienten bucht, werden die Kontaktdaten des Patienten erfasst (soweit dies vom Patienten gestattet ist). Verschiebt die Teststation den Termin oder möchte den Patienten anderweitig benachrichtigen, erfolgt dies komplett digital. </p><p>Das folgende Video stellt den Kontakt zwischen Teststation und Patient dar:</p></div>

const gesundheitsamt_text = <div><p>Für Gesundheitsämter besteht einerseits die Möglichkeit, Daten von Teststationen zu importieren und somit Covid-19-Tests direkt in Ihre Datenerfassungsprozesse einzubinden. Weiterhin besteht die Möglichkeit, das Testergebnis in der Webapp festzuhalten, und tausende Patienten mit Informationen und individuellen Testergebnissen per Telefon (elektronischer Anruf), Email oder SMS zu versorgen.</p><p>Die Teststation hat hierbei alleinigen Zugriff auf sämtliche Daten (insbesondere Testergebnisse).</p></div>

const arzt_text = <div><p>Ärzte müssen zuerst von der Teststation für Buchungen freigeschaltet werden. Sobald dies erfolgt ist, können Ärzte Ihren Patienten digital Termine zu einem Covid-19 Test buchen. Sämtliche weitere Terminabsprache erfolgt danach digital zwischen Ärzten und Teststationen und der Arzt wird somit von weiteren Verwaltungsaufgaben entbunden.</p>
    <p>Im Folgenden Video wird der Buchungsprozess für Ärzte näher dargestellt. Durch einen Klick auf den Knopf "Zur Demo für Ärzte" können Sie die App selbst ausprobieren.</p></div>


const htmlText = {
    arzt: arzt_text,
    patient: patient_text,
    gesundheitsamt: gesundheitsamt_text,
    teststation: teststation_text
}

function JumboHeader(props) {
    return (
        <div className='jumbotron jumbotron-fluid bg-light p-2'>
            <div className='container'>
                <h1 className='display-4'>CoTip für {props.who}</h1>
                <h2 className='display-5 text-info'> <b>Die</b> Webapp für den Datenaustausch rund um Corona-Tests.  </h2>
            </div>
        </div>
    )
}

function Paragraph(props) {
    return (
        <div>
            {htmlText[props.who]}
        </div>
    )
}

function Video(props) {
    if (props.link) {
        return (
            <div className="embed-responsive embed-responsive-16by9 mt-4 mb-4">
                <iframe className="embed-responsive-item" src={props.link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        )
    } else {
        return(<></>);
    }
}



function DemoButton(props) {
    return (
        <>
            <Row className={`${(props.link === "/") ? "d-none" : ""} mb-4`}>
                <Col>
                    <Link to={props.link}>
                        <Button style={{ minHeight: "62px" }} className="w-100 font-weight-bold">Zur Demo für {props.who}</Button>
                    </Link>
                </Col>
            </Row>
        </>
    )
}
