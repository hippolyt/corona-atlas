import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export function DemoPage(props) {
    const groupName = { arzt: "Ärzte", patient: "Patienten", gesundheitsamt: "Gesundheitsämter", teststation: "Teststationen" };
    const links = { arzt: "booking", patient: "/", gesundheitsamt: "/", teststation: "simpledashboard" };
    return (
        <>
            <JumboHeader who={groupName[props.type]} />
            <Container>
                <DemoButton link={links[props.type]} who={groupName[props.type]} />
                <Paragraph />
                <Video></Video>
            </Container>
        </>
    )
}



const lorizzle = <p>Da bomb ipsizzle dolizzle cool amizzle, uhuh ... yih! adipiscing elit. Ghetto sapizzle velizzle, ghetto volutpizzle, suscipizzle quis, gravida vizzle, owned. Pellentesque own yo' tortizzle. Sizzle erizzle. For sure izzle dolor dapibus turpizzle tempizzle stuff. Mauris sizzle nibh izzle turpizzle. Shizznit izzle tortizzle. Rizzle owned rhoncizzle get down get down. In hac habitasse platea dictumst. Fo shizzle my nizzle dapibizzle. Curabitur tellizzle ghetto, pretium eu, mattizzle ac, eleifend vitae, da bomb. Mofo go to hizzle. Integizzle semper crackalackin sizzle away.</p>
const lorizzleList = <ul className="list-group list-group-flush">
    <li className="list-group-item list-group-item-action">Vestibulizzle ante rizzle boofron izzle brizzle orci luctizzle et go to hizzle shit nizzle.</li>
    <li className="list-group-item list-group-item-action">Nam scelerisque. Sure magna erizzle, dignissim vitae, porttitizzle black, imperdizzle egestizzle, tellivizzle.</li>
    <li className="list-group-item list-group-item-action">Integer ac owned shiznit arcu fo shizzle my nizzle aliquizzle.</li>
</ul>

const htmlText = {
    aerzte: { paragraph: lorizzle, benefits: lorizzleList },
    patienten: { paragraph: lorizzle, benefits: lorizzleList },
    gesundheitsaemter: { paragraph: lorizzle, benefits: lorizzleList },
    teststationen: { paragraph: lorizzle, benefits: lorizzleList },
}

function JumboHeader(props) {
    return (
        <div className='jumbotron jumbotron-fluid bg-light p-2'>
            <div className='container'>
                <h1 className='display-4'>cotip für {props.who}</h1>
                <h2 className='display-5 text-info'> <b>Die</b> Webapp für den Datenaustausch rund um Corona-Tests.  </h2>
            </div>
        </div>
    )
}

function Paragraph() {
    return (
        <div>
            {lorizzle}
            {lorizzleList}
        </div>
    )
}

function Video() {
    return (
        <div className="embed-responsive embed-responsive-16by9 mt-4 mb-4">
            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowFullScreen></iframe>
        </div>
    )
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
