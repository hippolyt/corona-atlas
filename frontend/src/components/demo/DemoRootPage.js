import React from 'react'
import { Button, Col, Container, Row, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FinalPresentation from './final_presentation.pdf'


export function DemoRootPage() {
    return (
        <>
            <JumboHeader />
            <Container>
                <DemoButtonGroup></DemoButtonGroup>
                <Paragraph />
                <div className='dropdown-divider mt-5 mb-5'></div>
            </Container>
        </>
    )
}


function Paragraph() {
    return (
        <div>
            <p> In der Corona-Krise gilt es, den <b>Informationsfluss</b> zwischen <b>Teststationen</b>, <b>Gesundheitsämtern</b>, <b>(Haus-)Ärzten</b> und <b>Patienten</b> insoweit zu <b>automatisieren</b>, dass deren beschränkte Kapazitäten sinnvoll eingesetzt werden können.<br /><br /> <b>Nicht sinnvoll</b> ist es, wenn: </p>
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-action">Praxen mit Teststationen hin- und hertelefonieren, um Patienten einen Testtermin zu buchen.</li>
                <li className="list-group-item list-group-item-action">Teststationen keine Möglichkeit haben, Testtermine zu verwalten.</li>
                <li className="list-group-item list-group-item-action">Patienten nicht über den Status(änderungen) ihres Testtermines unterricht werden.</li>
                <li className="list-group-item list-group-item-action">Gesundheitsämter sämtliche Patientendaten neu erheben, sobald Sie von den Laboren über Testergebnisse unterrichtet werden.</li>
                <li className="list-group-item list-group-item-action">Kein Informationsaustausch zwischen Gesundheitsämtern und Teststationen stattfindet.</li>
            </ul>
            <br />
            <p className="text-justify"> Nun gibt es natürlich viele Software-Lösungen, die diese Probleme addressieren können. Das Problem hierbei ist, dass bereits bestehende Softwarelösungen (bspw. Buchungstools, Datenmanagement-Webinterfaces), oft erst sinnvoll miteinandner kombiniert und aufwändig eingerichtet und verwaltet werden müssen. Hierfür haben die einzelnen Interessensgruppen - insbesondere in der momentanen Situation - keine Kapazitäten. Weiterhin erlauben viele Tools es nicht, DSGVO-konform mit Daten umzugehen. Bestehende Self-Hosting-Lösungen setzen oft IT-Expertise voraus. <br /><br />

                <b>cotip vereint Datenmanagement, Terminbuchungsplattform & Massenbenachrichtigung.</b> cotip ist vom Einrichtungsaufwand in etwa so kompliziert, wie das Registrieren einiger Online-Accounts. Dabei addressieren wir nur die ganz konkreten Probleme, die unsere Interessensgruppen haben. Unser Fokus liegt auf <i>Usability</i>, <i>Stabilität</i> und <i>Datensicherheit</i>. Die Interfaces sollen hierbei minimal gehalten werden. Der Datenexport und die Datenintegration in bestehende Tools ist jederzeit möglich. Wir stehen zur Verfügung, um an (technischen) Schnittstellen auszuhelfen. <b>cotip</b> ist eine Software, die <b>funktioniert & skaliert!</b></p>


        </div>
    )
}

function JumboHeader() {
    return (
        <div className='jumbotron jumbotron-fluid bg-light p-2'>
            <div className='container'>
                <h1 className='display-4'>Eine kurze Erklärung von cotip.</h1>
                <h2 className='display-5 text-info'> <b>Die</b> Webapp für den Datenaustausch rund um Corona-Tests.  </h2>
            </div>
        </div>
    )
}


function DemoButtonGroup() {
    return (
        <>
            <Row>
                <Col sm className="mb-5">
                    <Link to="demo-teststation">
                        <Button style={{ minHeight: "62px" }} className="w-100">cotip für <b>Teststationen</b></Button>
                    </Link>
                </Col>
                <Col sm className="mb-3">
                    <Link to="demo-arzt">
                        <Button style={{ minHeight: "62px" }} className="w-100">cotip für <b>Ärzte / Praxen</b></Button>
                    </Link>
                </Col>
                <Col sm className="mb-3">
                    <Link to="demo-patient">
                        <Button style={{ minHeight: "62px" }} className="w-100 btn-secondary">cotip für <b>Patienten</b></Button>
                    </Link>
                </Col>
                <Col sm className="mb-3">
                    <Link to="demo-gesundheitsamt">
                        <Button style={{ minHeight: "62px" }} className="w-100 btn-secondary">cotip für <b>Gesundheitsämter</b></Button>
                    </Link>
                </Col>
                <Col sm className="mb-3">
                    <a href={FinalPresentation}>
                        <Button style={{ minHeight: "62px" }} className="w-100 btn-secondary">cotip Whitepaper</Button>
                    </a>
                </Col>
            </Row>
        </>
    )
}
