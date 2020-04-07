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
            </Container>
        </>
    )
}


function Paragraph() {
    return (
        <div>
            <p className="text-justify"> In der Corona-Krise gilt es, den <b>Informationsfluss</b> zwischen <b>Teststationen</b>, <b>Gesundheitsämtern</b>, <b>(Haus-)Ärzten</b> und <b>Patienten</b> insoweit zu <b>automatisieren</b>, dass deren beschränkte Kapazitäten sinnvoll eingesetzt werden können. </p>
            <p className="text-justify">Dafür haben wir CoTip entwickelt — CoTip ist eine Webapp für den Datenaustausch rund um Corona Tests, die von Teststationen gehostet wird. Wir ermöglichen es Ärzten ihren Patienten einen Termin für einen Covid-19-Test im nächsten Testzentrum zu buchen, wobei sie Einblick in deren Auslastung erhalten. Testzentren erhalten einen Überblick über ihre Termine und können bei Bedarf Patienten umbuchen. Patienten werden vollautomatisch (per Telefon, SMS, Mail) über Ihren Terminstatus informiert.

Letztlich werden Gesundheitsämter eingebunden, sodass diese automatisch Daten von Teststationen beziehen können und Patienten über Testergebnisse informieren und mit Informationen versorgen können.
</p>
            <p className="text-justify"><b>CoTip vereint Datenmanagement, Terminbuchungsplattform & Massenbenachrichtigung.</b> CoTip ist vom Einrichtungsaufwand in etwa so kompliziert, wie das Registrieren einiger Online-Accounts. Dabei addressieren wir nur die ganz konkreten Probleme, die unsere Interessensgruppen haben. Unser Fokus liegt auf <i>Usability</i>, <i>Stabilität</i> und <i>Datensicherheit</i>. Die Interfaces sollen hierbei minimal gehalten werden. Der Datenexport und die Datenintegration in bestehende Tools ist jederzeit möglich. Wir stehen zur Verfügung, um an (technischen) Schnittstellen auszuhelfen. <b>CoTip</b> ist eine Software, die <b>funktioniert & skaliert!</b></p>


        </div>
    )
}

function JumboHeader() {
    return (
        <div className='jumbotron jumbotron-fluid bg-light p-2'>
            <div className='container'>
                <h1 className='display-4'>Eine kurze Erklärung von CoTip.</h1>
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
                        <Button style={{ minHeight: "62px" }} className="w-100">CoTip für <b>Teststationen</b></Button>
                    </Link>
                </Col>
                <Col sm className="mb-3">
                    <Link to="demo-arzt">
                        <Button style={{ minHeight: "62px" }} className="w-100">CoTip für <b>Ärzte / Praxen</b></Button>
                    </Link>
                </Col>
                <Col sm className="mb-3">
                    <Link to="demo-patient">
                        <Button style={{ minHeight: "62px" }} className="w-100 btn-secondary">CoTip für <b>Patienten</b></Button>
                    </Link>
                </Col>
                <Col sm className="mb-3">
                    <Link to="demo-gesundheitsamt">
                        <Button style={{ minHeight: "62px" }} className="w-100 btn-secondary">CoTip für <b>Gesundheitsämter</b></Button>
                    </Link>
                </Col>
                <Col sm className="mb-3">
                    <a href="https://drive.google.com/file/d/1qn5P_zjQdjoetIT7o1_RwRu4Iziu5b_7/view?usp=sharing">
                        <Button style={{ minHeight: "62px" }} className="w-100 btn-secondary">CoTip Whitepaper</Button>
                    </a>
                </Col>
            </Row>
        </>
    )
}
